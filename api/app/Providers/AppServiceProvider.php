<?php

namespace App\Providers;

use GuzzleHttp\Client;
use App\Services\Imgur\ImgurApi;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use App\Services\DatahubGent\DatahubGent;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(ImgurApi::class, function ($app) {
            return new ImgurApi(
                $app->make(Client::class),
                config('services.imgur.api_url'),
                config('services.imgur.client_id')
            );
        });

        $this->app->singleton(DatahubGent::class, function ($app) {
            return new DatahubGent(
                $app->make(Client::class),
                config('services.datahubGent.api_url'),
                config('services.datahubGent.publicHash'),
                config('services.datahubGent.privateHash')
            );
        });
    }
}
