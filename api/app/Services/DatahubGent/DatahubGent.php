<?php

namespace App\Services\DatahubGent;

use App\Observation;
use GuzzleHttp\Client;

class DatahubGent
{
    /**
     * @var \GuzzleHttp\Client
     */
    private $client;

    private $apiUrl;
    private $publicHash;
    private $privateHash;

    public function __construct(Client $client, $apiUrl, $publicHash, $privateHash)
    {
        $this->client = $client;
        $this->apiUrl = $apiUrl;
        $this->publicHash = $publicHash;
        $this->privateHash = $privateHash;
    }

    /**
     * Write data to a stream for which we know the private hash.
     */
    public function store(Observation $observation)
    {
        $this->client->post($this->getEndpoint('/input'), [
            'form_params' => [
                'captured_at' => $observation->captured_at,
                'imgur_url'   => $observation->imgur,
                'latitude'    => $observation->latitude,
                'longitude'   => $observation->longitude,
                'specie'      => 'Common Tern',
            ],
            'headers' => [
                'Phant-Private-Key' => $this->privateHash,
                'Content-type' => 'application/x-www-form-urlencoded',
            ],
        ]);
    }

    private function getEndpoint($endpoint)
    {
        return $this->apiUrl.$endpoint.'/'.$this->publicHash;
    }
}
