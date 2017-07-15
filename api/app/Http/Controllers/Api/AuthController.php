<?php

namespace App\Http\Controllers\Api;

use App\User;
use DateTime;
use App\PasswordReset;
use Webpatser\Uuid\Uuid;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserLogin;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use App\Http\Requests\Api\NewPasswordModel;
use App\Http\Requests\Api\PasswordResetModel;
use App\Http\Requests\Api\UserRegistrationModel;

class AuthController extends MailController
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
        if ($user && $this->notSpamming($user, env('PASSWORD_RESET_MINUTES', 30))) {
            // User exists and had no request < PASSWORD_RESET_MINUTES
            $uuid_token = Uuid::generate(4);
            $url = url('/reset/'.$uuid_token);
            $request->request->add(['url' => $url]);
            $request->request->add(['name' => $user->name]);
            $this->sendPasswordResetMail($request);
            // Store in database
            $data = [
                'user_id' => $user->id,
                'token' => $uuid_token,
                'created_at' => date('Y-m-d H:i:s'),
            ];
            PasswordReset::create($data);
        }
    }

    private function notSpamming(User $user, $minutes)
    {
        if ($user) {
            $last_password_request = PasswordReset::where('user_id', $user->id)->orderBy('created_at', 'desc')->first();
            if (! $last_password_request) {
                // No request were stored yet
                return true;
            }
            $last_password_request_time = $last_password_request->created_at;
            $this->isInsideInterval($last_password_request_time, $minutes);
        }

        return false;
    }

    private function isInsideInterval($lastTime, $minutes)
    {
        $now_DateTime = new DateTime();
        $last_DateTime = new DateTime($lastTime);
        $interval = $now_DateTime->diff($last_DateTime)->i;
        if ($interval >= $minutes) {
            return true;
        }

        return false;
    }

    /**
     * Store the new password in the database if token is valid and time < PASSWORD_RESET_MINUTES.
     *
     * @param \App\Http\Requests\Api\NewPasswordModel $request
     * @param string $token
     */
    public function resetPassword(NewPasswordModel $request, $token)
    {
        $password_reset = PasswordReset::where('token', $token)->first();
        if ($password_reset && $this->isInsideInterval($password_reset->created_at, env('PASSWORD_RESET_MINUTES', 30))) {
            $user = User::find($password_reset->user_id);
            $user->password = bcrypt($request->password);
            $user->save();
        }
    }
}
