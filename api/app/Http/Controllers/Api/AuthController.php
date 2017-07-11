<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserLogin;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use App\Http\Requests\Api\PasswordResetModel;
use App\Http\Requests\Api\UserRegistrationModel;
use App\Http\Requests\Api\PasswordResetModel;

class AuthController extends Controller
{
    /**
     * Authenticate the user and create a token.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function auth(UserLogin $request)
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
        $user = auth()->user();

        return response()->json($user);
    }

    /**
     * Refresh the JWT token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($token);

            return response()->json(compact('newToken'));
        } catch (TokenBlacklistedException $exception) {
            return response()->json(['error' => 'token_blacklisted'], $exception->getStatusCode());
        }
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    /**
     * Register a new User.
     *
     * @param \App\Http\Requests\Api\UserRegistrationModel $request
     *
     * @return mixed
     */
    public function register(UserRegistrationModel $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }

    /**
     * Send a mail for resetting the password.
     *
     * @param \App\Http\Requests\Api\PasswordResetModel $request
     *
     * @return mixed
     */
    public function sendResetMail(PasswordResetModel $request)
    {
        // TODO: Get current user_id
        // TODO: Generate key
        // TODO: Generate URL
        // TODO: Send email
        // TODO: Only send reset password mail once an hour
        // TODO: Handle email response and reset email
    }

    /**
     * Send a mail for resetting the password.
     *
     * @param \App\Http\Requests\Api\PasswordResetModel $request
     *
     * @return mixed
     */
    public function sendResetMail(PasswordResetModel $request)
    {
        // TODO: Get current user_id
        // TODO: Generate key
        // TODO: Generate URL
        // TODO: Send email
        // TODO: Only send reset password mail once an hour
        // TODO: Handle email response and reset email
    }
}
