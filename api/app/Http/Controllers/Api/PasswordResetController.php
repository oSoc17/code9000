<?php

namespace App\Http\Controllers\Api;

use Mail;
use App\User;
use Carbon\Carbon;
use App\PasswordReset;
use App\Mail\PasswordResetMail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NewPasswordModel;
use App\Http\Requests\Api\PasswordResetModel;

class PasswordResetController extends Controller
{
    private $passwordResetMinutes;

    public function __construct()
    {
        $this->passwordResetMinutes = config('app.password_reset_minutes');
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
        $userEmail = $request->email;

        $user = User::where('email', $userEmail)->first();

        if ($user && ! $this->isSpamming($user)) {
            $token = str_random(150);
            
            $this->sendPasswordResetMail([
                'email' => $user->email,
                'url' => sprintf('%s/reset-password/%s', config('app.url_front_end'), $token), // Redirect to front-end
                'name' => $user->name,
            ]);

            PasswordReset::create([
                'user_id' => $user->id,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);
        }
    }

    private function isSpamming(User $user)
    {
        $lastPasswordReset = $user->passwordResets()->first();

        if (! $lastPasswordReset) {
            return false;
        }

        return $this->isInsideInterval($lastPasswordReset->created_at);
    }

    /**
     * Store the new password in the database if token is valid and time <
     * app.password_reset_minutes.
     *
     * @param \App\Http\Requests\Api\NewPasswordModel $request
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(NewPasswordModel $request, $token)
    {
        $passwordReset = PasswordReset::with('user')->where('token', $token)->first();

        if ($passwordReset && $this->isInsideInterval($passwordReset->created_at)) {

            $passwordReset->user->password = bcrypt($request->password);
            $passwordReset->user->save();
            
            $passwordReset->delete();

            return response()->json(['success' => 'ok']);
        }

        return response()->json(['error' => 'invalid'], 404);
    }

    public function sendPasswordResetMail($mailData)
    {
        Mail::to($mailData['email'])->send(new PasswordResetMail($mailData));
    }
    
    private function isInsideInterval($passwordResetDate) {
        return Carbon::now()->diffInMinutes($passwordResetDate) <= $this->passwordResetMinutes;
    }
}
