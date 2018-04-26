<?php

namespace App\Http\Middleware;

use App\Installation;
use Closure;

class AuthInstallationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $installation = Installation::firstOrCreate(['token' => $request->token]);

        if ($installation->active) {
            return $next($request);
        }

        return response()->json('The device is not authorized.', 401);
    }
}
