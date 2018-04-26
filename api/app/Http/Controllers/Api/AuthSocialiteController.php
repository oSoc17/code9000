<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Provider;
use App\User;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        return User::updateOrCreate(['email' => $facebookUser->email], ['name' => $facebookUser->name, 'avatar_url' => $facebookUser->avatar]);
    }

    private function firstOrCreateProvider($user, $facebookUser)
    {
        return Provider::updateOrCreate(
            ['user_id' => $user->id, 'provider' => $this->driver],
            ['provider_id' => $facebookUser->id, 'provider_token' => $facebookUser->token]
        );
    }
}
