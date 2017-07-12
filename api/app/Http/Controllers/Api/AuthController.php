<?php

namespace App\Http\Controllers\Api;

use Webpatser\Uuid\Uuid;
use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserLogin;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use App\Http\Requests\Api\PasswordResetModel;
use App\Http\Requests\Api\UserRegistrationModel;

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
        $user_email = $request->email;
        $user = User::where('email', $user_email)->first();
        if ($user) {
            $uuid_token = Uuid::generate(4);
            $data = [
                'user_id' => $user->id, 
                'token' => $uuid_token,
                'created_at' => date('Y-m-d H:i:s'),
            ];
            PasswordReset::create($data);
            // TODO: Check URL
            $url = config('app.url_front_end') . '/reset/' . $uuid_token;
            echo $url;
            // TODO: Send email (if fail -> what?)
            // TODO: Only send reset password mail once an hour
            // TODO: Handle email response and reset password (used token = delete?)
        }
    }
}
