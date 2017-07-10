<?php

namespace App\Http\Middleware;

use Closure;
use App\Installation;

class AuthenticateInstallation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $installation = Installation::firstOrCreate(['token' => $request->token]);

        if ($installation->active === 1) {
            return $next($request);
        }

        return response()->json('This device has not (yet) access', 401);
    }
}
