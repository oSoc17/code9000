<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\ObservationIsValid' => [
            'App\Listeners\SendObservationImgur',
            'App\Listeners\SendObservationToFacebook',
            'App\Listeners\SendObservationToTwitter',
        ],
        'App\Events\ObservationUploadedToImgur' => [
            'App\Listeners\SendObservationDatahubGent',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
