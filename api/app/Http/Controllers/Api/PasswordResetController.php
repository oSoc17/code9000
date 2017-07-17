<?php

namespace App\Http\Controllers\Api;

use Mail;
use App\User;
use Carbon\Carbon;
use App\PasswordReset;
use Webpatser\Uuid\Uuid;
use App\Mail\PasswordResetMail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\NewPasswordModel;
use App\Http\Requests\Api\PasswordResetModel;

class PasswordResetController extends Controller
{
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
        if ($user && ! $this->isSpamming($user, config('app.password_reset_minutes'))) {
            // User exists and had no request < app.password_reset_minutes
            $token = Uuid::generate(4) . '-' . str_random(40);
            $this->sendPasswordResetMail([
                'email' => $userEmail, 
                'url' => url('/reset-password/'.$token), 
                'name' => $user->name 
            ]);
            // Store in database
            $data = [
                'user_id' => $user->id,
                'token' => $token,
                'created_at' => Carbon::now(),
            ];
            PasswordReset::create($data);
        }
    }

    private function isSpamming(User $user, $minutes)
    {
        if ($user) {
            $last_password_request = PasswordReset::where('user_id', $user->id)->orderBy('created_at', 'desc')->first();
            if (! $last_password_request) {
                // No request were stored yet
                return false;
            }
            $last_password_request_time = $last_password_request->created_at;
            return $this->isInsideInterval($last_password_request_time, $minutes);
        }

        return false;
    }

    private function isInsideInterval($lastTime, $minutes)
    {
        $now = Carbon::now();
        $diff = $now->diffInMinutes(Carbon::parse($lastTime));
        if ($diff <= $minutes) {
            return true;
        }

        return false;
    }

    /**
     * Store the new password in the database if token is valid and time < app.password_reset_minutes.
     *
     * @param \App\Http\Requests\Api\NewPasswordModel $request
     * @param string $token
     */
    public function resetPassword(NewPasswordModel $request, $token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();
        if ($passwordReset && $this->isInsideInterval($passwordReset->created_at, config('app.password_reset_minutes'))) {
            $user = $passwordReset->user()->first();
            $user->password = bcrypt($request->password);
            $user->save();
        }
    }

    public function sendPasswordResetMail($mailData)
    {
        $content = [
            'name'=> $mailData['name'],
            'url' => $mailData['url'],
        ];
        Mail::to($mailData['email'])->send(new PasswordResetMail($content));
    }
}
