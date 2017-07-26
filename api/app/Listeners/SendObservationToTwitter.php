<?php

namespace App\Listeners;

use App\Events\ObservationUploaded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendObservationToTwitter
{
    /**
     * Handle the event.
     *
     * @param  ObservationUploaded  $event
     */
    public function handle(ObservationUploaded $event)
    {
        $observation = $event->observation;
        
        $uploaded_media = Twitter::uploadMedia(['media' => Storage::get($observation->picture_storage)]);
    
        Twitter::postTweet(['status' => 'Hello birds', 'media_ids' => $uploaded_media->media_id_string]);
    }
}
