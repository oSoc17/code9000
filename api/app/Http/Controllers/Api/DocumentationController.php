<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Route;
use ReflectionMethod;

class DocumentationController extends Controller
{
    /**
     * List all the routes with metadata.
     */
    public function index()
    {
        $routeCollection = Route::getRoutes();

        $data = collect($routeCollection)->map(function ($route) {
            return [
                'url'         => $this->getRouteUri($route),
                'description' => $this->getRouteDescription($route),
                'methods'     => $this->getRouteMethods($route),
                'middleware'  => $this->getRouteMiddleware($route),
                'parameters'  => $this->getRouteParameters($route),
            ];
        })->sortBy('url');

        return $data->values()->all();
    }

    /**
     * Get all the middleware (of the constructors and routes) of an route.
     *
     * @param $route
     *
     * @return array
     */
    private function getRouteMiddleware($route)
    {
        return $route->gatherMiddleware();
    }

    /**
     * Get the route URI.
     *
     * @param $route
     *
     * @return string
     */
    private function getRouteUri($route)
    {
        return $route->uri;
    }

    /**
     * Get the documentation block of the action method.
     *
     * @param $route
     *
     * @return string
     */
    private function getRouteDescription($route)
    {
        list($controller, $action) = explode('@', $route->getActionName());

        $routeMethod = new ReflectionMethod($controller, $action);

        $documentationLines = preg_split("/\r\n|\n|\r/", $routeMethod->getDocComment());

        return $this->formatDescription($documentationLines);
    }

    /**
     * Format the documentation block, to get only the rule that starts with 'Description: '.
     *
     * @param $documentationLines
     *
     * @return string
     */
    private function formatDescription($documentationLines)
    {
        $removeCharsAtStart = [
            '/**',
            '*/',
            '*',
        ];

        return trim(collect($documentationLines)
            ->map(function ($line) use ($removeCharsAtStart) {
                $formatted = trim($line);

                $formatted = trim(str_replace($removeCharsAtStart, '', $formatted));

                return starts_with($formatted, '@') ? '' : $formatted;
            })
            ->filter(function ($line) {
                return $line !== '' && $line !== null;
            })
            ->reduce(function ($carry, $item) {
                return sprintf('%s %s', $carry, $item);
            }));
    }

    /**
     * Get the HTTP methods (GET, HEAD, POST, PUT, ...).
     *
     * @param $route
     *
     * @return array
     */
    private function getRouteMethods($route)
    {
        return $route->methods;
    }

    /**
     * Get the parameters of the action method and check if it's a Form Request Validation class
     * If so, return the rules.
     *
     * @param $route
     *
     * @return array;
     */
    private function getRouteParameters($route)
    {
        list($controller, $action) = explode('@', $route->getActionName());

        $routeMethod = new ReflectionMethod($controller, $action);

        $parameters = $routeMethod->getParameters();

        if (is_null($parameters) || count($parameters) <= 0) {
            return [];
        }

        return $this->mapParameters($parameters)->all();
    }

    /**
     * Map the parameters, and flat them to one single object.
     * The single object will be the rules provided in a Form Request Validation class.
     *
     * @param $parameters
     *
     * @return array;
     */
    private function mapParameters($parameters)
    {
        return collect($parameters)
            ->flatMap(function ($item) {
                return $this->getFormRouteParameters($item);
            });
    }

    /**
     * If the parameter is an instance of a Form Request Validation,
     * return the rules.
     *
     * @param $parameter
     *
     * @return array
     */
    private function getFormRouteParameters($parameter)
    {
        $class = $parameter->getClass();

        //
        if (is_null($class) || $class->getParentClass()->name !== FormRequest::class) {
            return;
        }

        $instanceOfParameter = $class->newInstanceWithoutConstructor();

        return $instanceOfParameter->rules();
    }
}
