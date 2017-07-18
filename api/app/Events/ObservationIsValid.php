<?php

namespace App\Events;

use App\Observation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

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
