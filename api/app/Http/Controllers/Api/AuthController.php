<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /**
     * Authenticate the user and create a token.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function auth(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        return response()->json(compact('token'));
    }

    /**
     * Return the current authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return response()->json(auth()->user());
    }

    /**
     * Refresh the JWT token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);

        return response()->json(compact('newToken'));
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken()));
    }
}
