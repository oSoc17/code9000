<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key'    => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model'  => App\User::class,
        'key'    => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'facebook' => [
        'client_id' => env('FACEBOOK_CLIENT_ID'),
        'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
        'redirect' => config('app.url').'/api/auth/facebook/callback',
    ],

    'imgur' => [
        'api_url' => env('IMGUR_API_URL', 'https://api.imgur.com/3'),
        'client_id' => env('IMGUR_CLIENT_ID'),
    ],
    
    'datahubGent' => [
        'api_url' => env('DATAHUBGENT_API_URL', 'http://datahub.gent.be'),
        'publicHash' => env('DATAHUBGENT_PUBLIC_HASH'),
        'privateHash' => env('DATAHUBGENT_PRIVATE_HASH'),
    ]

];
