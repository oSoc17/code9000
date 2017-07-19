<?php

namespace App\Http\Controllers\Api;

use Mail;
use App\User;
use Carbon\Carbon;
use App\PasswordReset;
use Webpatser\Uuid\Uuid;
use Illuminate\Http\Request;
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
        if ($user && ! $this->isSpamming($user, $passwordResetMinutes)) {
            // User exists and had no request < app.password_reset_minutes
            $token = Uuid::generate(4).'-'.str_random(40);
            $this->sendPasswordResetMail([
                'email' => $user->email,
                'url' => url('/reset-password/'.$token),
                'name' => $user->name,
            ]);
            // Store in database
            PasswordReset::create([
                'user_id' => $user->id,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);
        }
    }

    private function isSpamming(User $user, $minutes)
    {
        $lastPasswordReset = $user->passwordResets->first();
        if (! $lastPasswordReset) {
            // No request were stored yet
            return false;
        }

        return $this->isInsideInterval($lastPasswordReset->created_at, $minutes);

        return false;
    }

    private function isInsideInterval($lastTime, $minutes)
    {
        $now = Carbon::now();
        $diff = $now->diffInMinutes($lastTime);

        return $diff <= $minutes;
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
        if ($passwordReset && $this->isInsideInterval($passwordReset->created_at, $passwordResetMinutes)) {
            $user = $passwordReset->user();
            $user->password = bcrypt($request->password);
            $user->save();
        } else {
            return response()->json(['error' => 'unvalid'], 404);
        }
    }

    public function sendPasswordResetMail($mailData)
    {
        Mail::to($mailData['email'])->send(new PasswordResetMail($mailData));
    }
}
