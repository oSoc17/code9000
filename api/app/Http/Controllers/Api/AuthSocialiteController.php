<?php

namespace App\Http\Controllers\Api;

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

        $user = User::where('email', $facebookUser->email)
            ->where('provider', $this->driver)
            ->where('provider_id', $facebookUser->id)
            ->first();

        if (is_null($user)) {
            $user = $this->createUser($facebookUser);
        }

        $token = JWTAuth::fromUser($user);
        $redirectUrl = sprintf('%s/login/callback/%s/%s', config('app.url_front_end'), $this->driver, $token);

        return redirect()->to($redirectUrl);
    }

    private function createUser($facebookUser)
    {
        $user = new User;
        $user->fill(['name' => $facebookUser->name, 'email' => $facebookUser->email]);

        $user->provider = $this->driver;
        $user->provider_id = $facebookUser->id;
        $user->provider_token = $facebookUser->token;

        $user->save();

        return $user;
    }
}
