<?php

namespace App\Services\Imgur;

use GuzzleHttp\Client;

class ImgurApi {
    
    /**
     * @var \GuzzleHttp\Client
     */
    private $client;
    
    private $apiUrl;
    
    private $clientId;
    
    public function __construct(Client $client, $apiUrl, $clientId)
    {
        $this->client = $client;
        $this->apiUrl = $apiUrl;
        $this->clientId = $clientId;
    }
    
    public function upload($file)
    {
        $response = $this->client->post($this->apiUrl . '/image', [
            'form_params' => [
                'image' => $file,
                'type' => 'file',
            ],
            'headers' => [
                'authorization' => 'Client-ID '.$this->clientId,
            ]
        ]);
    
        return $this->formatResponse($response);
    }
    
    private function formatResponse($response)
    {
        $json = json_decode($response->getBody(), true);
        
        return array_get($json, 'data');
    }
    
}