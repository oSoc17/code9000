<?php

namespace App\Events;

use App\Observation;
use Illuminate\Queue\SerializesModels;

class ObservationIsValid
{
    use SerializesModels;

    /**
     * @var \App\Observation
     */
    public $observation;

    /**
     * Create a new event instance.
     *
     * @param \App\Observation $observation
     */
    public function __construct(Observation $observation)
    {
        $this->observation = $observation;
    }
}
