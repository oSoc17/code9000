<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mail;

class MailController extends Controller
{
    /**
     * Show the application sendMail.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendPasswordResetMail($receiverAddress)
    {
    	$content = [
    		'title'=> 'Reset your password', 
    		'body'=> 'The body of your message.',
    		'button' => 'Reset your password'
    		];

    	Mail::to($receiverAddress)->send(new PasswordReset($content));
    }
}
