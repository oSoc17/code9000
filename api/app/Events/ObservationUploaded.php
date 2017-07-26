<?php

namespace App\Events;

use App\Observation;
use Illuminate\Queue\SerializesModels;

class ObservationUploaded
{
    use SerializesModels;

    /**
     * @var \App\Observation
     */
    public $observation;

    /**
     * ObservationUploaded constructor.
     *
     * @param \App\Observation $observation
     */
    public function __construct(Observation $observation)
    {
        $this->observation = $observation;
    }
}
