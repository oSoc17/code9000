<?php

namespace App\Http\Controllers\Api;

use App\Provider;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class AuthSocialiteController extends Controller
{
    private $driver = 'facebook';

    public function redirectToProvider()
    {
        return Socialite::driver($this->driver)->stateless()->redirect();
    }

    public function handleProviderCallback()
    {
        $facebookUser = Socialite::driver($this->driver)->stateless()->user();

        $user = $this->firstOrCreateUser($facebookUser);
        
        $this->firstOrCreateProvider($user, $facebookUser);
        
        $token = JWTAuth::fromUser($user);
        $redirectUrl = sprintf('%s/login/callback/%s/%s', config('app.url_front_end'), $this->driver, $token);

        return redirect()->to($redirectUrl);
    }

    private function firstOrCreateUser($facebookUser)
    {
        return User::firstOrCreate(['email' => $facebookUser->email], ['name' => $facebookUser->name]);
    }
    
    private function firstOrCreateProvider($user, $facebookUser) {
        return Provider::updateOrCreate(
            ['user_id' => $user->id, 'provider' => $this->driver],
            ['provider_id' => $facebookUser->id, 'provider_token' => $facebookUser->token]
        );
    }
}
