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
            'name'=> $request->name,
            'url' => $request->url,
        ];
        Mail::to($request->email)->send(new PasswordReset($content));
    }
}
