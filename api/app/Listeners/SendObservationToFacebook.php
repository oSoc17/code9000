<?php

namespace App\Listeners;

use App\Events\ObservationUploaded;
use App\Services\Facebook\Facebook;

class SendObservationToFacebook
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
     * @param  ObservationUploaded  $event
     * @return void
     */
    public function handle(ObservationUploaded $event)
    {
        $observation = $event->observation;
        
        $message = [
            'BIRD OF TODAY!',
            '',
            'Spot your bird of the day at www.birds.today!',
            '',
            'Location: Houtdok',
            'Date: '.$observation->captured_at->format('d-m-Y H:i'),
            '',
            '#birds #commonTern #visdief #birdwatching #biodiversity #birds_adored #birds_matter #birds_love #oSoc17 #CODE9000 #openknowledgebe #opendata',
        ];
        
        $this->facebook->postImage($event->observation, implode("\n", $message));
    }
}
