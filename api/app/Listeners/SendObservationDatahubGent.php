<?php

namespace App\Listeners;

use App\Services\DatahubGent\DatahubGent;
use App\Events\ObservationUploadedToImgur;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendObservationDatahubGent implements ShouldQueue
{
    private $datahubGent;

    /**
     * Create the event listener.
     *
     * @param \App\Services\DatahubGent\DatahubGent $datahubGent
     */
    public function __construct(DatahubGent $datahubGent)
    {
        $this->datahubGent = $datahubGent;
    }

    /**
     * Handle the event.
     *
     * @param  ObservationUploadedToImgur  $event
     * @return void
     */
    public function handle(ObservationUploadedToImgur $event)
    {
        $observation = $event->observation;

        $this->datahubGent->store($observation);
    }
}
