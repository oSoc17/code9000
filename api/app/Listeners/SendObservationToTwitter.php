<?php

namespace App\Listeners;

use App\Events\ObservationIsValid;
use Thujohn\Twitter\Facades\Twitter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendObservationToTwitter implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param \App\Events\ObservationIsValid $event
     */
    public function handle(ObservationIsValid $event)
    {
        $observation = $event->observation;

        $uploaded_media = Twitter::uploadMedia(['media' => Storage::get($observation->picture_storage)]);

        $message = [
            'Spot your bird of the day at www.birds.today! #birds #commonTern #visdief #biodiversity #oSoc17 #CODE9000 #openknowledgebe #opendata',
        ];

        Twitter::postTweet(['status' => $message, 'media_ids' => $uploaded_media->media_id_string]);
    }
}
