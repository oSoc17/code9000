<?php

namespace App\Listeners;

use App\Events\ObservationIsValid;
use App\Services\Facebook\Facebook;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendObservationToFacebook implements ShouldQueue
{
    /**
     * @var \App\Services\Facebook\Facebook
     */
    private $facebook;

    /**
     * Create the event listener.
     *
     * @param \App\Services\Facebook\Facebook $facebook
     */
    public function __construct(Facebook $facebook)
    {
        $this->facebook = $facebook;
    }

    /**
     * Handle the event.
     *
     * @param \App\Events\ObservationIsValid $event
     */
    public function handle(ObservationIsValid $event)
    {
        $observation = $event->observation;

        $message = [
            'BIRD OF TODAY!',
            '',
            'Spot your bird of the day at www.birds.today!',
            '',
            'Location: Houtdok',
            '',
            '#birds #commonTern #visdief #birdwatching #biodiversity #birds_adored #birds_matter #birds_love #oSoc17 #CODE9000 #openknowledgebe #opendata',
        ];

        $this->facebook->postImage($observation, implode("\n", $message));
    }
}
