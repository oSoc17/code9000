<?php

namespace App\Http\Controllers\Api;

use Mail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\PasswordReset;

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
    		'button' => 'Reset your password'
		];
    	Mail::to($request->email)->send(new PasswordReset($content));
    }
}
