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
        $content = [
            'title'=> 'Reset your password',
            'body'=> 'The body of your message.',
            'button' => 'Reset your password',
        ];
        Mail::to($request->email)->send(new PasswordReset($content));
    }
}
