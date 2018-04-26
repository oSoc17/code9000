<?php

namespace App\Services\Facebook;

use App\Observation;
use Illuminate\Support\Facades\Storage;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;

class Facebook
{
    /**
     * @var \SammyK\LaravelFacebookSdk\LaravelFacebookSdk
     */
    private $facebookSdk;

    /**
     * @var string
     */
    private $facebookId;

    /**
     * @var string
     */
    private $token;

    /**
     * Facebook constructor.
     *
     * @param \SammyK\LaravelFacebookSdk\LaravelFacebookSdk $facebookSdk
     */
    public function __construct(LaravelFacebookSdk $facebookSdk)
    {
        $this->facebookSdk = $facebookSdk;

        $this->facebookId = config('services.facebook.page_id');
        $this->token = config('services.facebook.page_token');
    }

    public function postImage(Observation $observation, $message)
    {
        $photoLink = Storage::disk('local')->getDriver()->getAdapter()->applyPathPrefix($observation->picture_storage);

        $data = [
            'message' => $message,
            'source'  => $this->facebookSdk->fileToUpload($photoLink),
        ];

        $this->facebookSdk->post('/me/photos', $data, $this->token);
    }
}
