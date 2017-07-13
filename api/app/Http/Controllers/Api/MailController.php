<?php

namespace App\Http\Controllers\Api;

use Mail;
use App\Mail\PasswordReset;
use App\Http\Controllers\Controller;

class MailController extends Controller
{
    /**
     * Show the application sendMail.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendPasswordResetMail($request)
    {
        $body[] = 'Hi '.$request->name.',';
        $body[] = 'Please click the link below to reset your password.';
        $body[] = 'If you have not requested a new password, please ignore this email.';
        $content = [
            'title'=> 'Reset your password',
            'body'=> $body,
            'button' => 'Reset your password!',
            'url' => $request->url,
        ];
        Mail::to($request->email)->send(new PasswordReset($content));
    }
}
