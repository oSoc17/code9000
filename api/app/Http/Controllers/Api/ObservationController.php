<?php

namespace App\Http\Controllers\Api;

use App\Observation;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Api\ObservationModel;

class ObservationController extends Controller
{
    /**
     * Return all observations.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return Observation::jsonPaginate();
    }

    public function forUser()
    {
        // TODO: only get observations that aren't validated
        return Observation::whereDoesntHave('votes', function ($query) {
            $query->where('user_id', auth()->user()->id);
        })
            ->orderBy('captured_at', 'ASC') // TODO: change to caputred_at
            ->jsonPaginate();
    }

    /**
     * Get the observation metadata with an id.
     *
     * @param $id
     *
     * @return mixed
     */
    public function show($id)
    {
        $observation = Observation::find($id);

        return $observation->toJson();
    }

    /**
     * Return the picture that is stored.
     *
     * @param $id
     *
     * @return mixed
     */
    public function getPicture($id)
    {
        $observation = Observation::find($id);
        $image = Storage::get($observation->picture_storage);

        return response($image)->header('Content-Type', 'image/jpeg');
    }

    /**
     * Create a new observation.
     *
     * @param \App\Http\Requests\Api\ObservationModel $request
     *
     * @return mixed
     */
    public function store(ObservationModel $request)
    {
        $file = $request->file('image');

        // Create a file name
        $path = $file->hashName('observations');

        // Resize the image
        $image = Image::make($file);
        $image->resize(750, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        // Store the image
        Storage::put($path, $image->stream());
        $request['picture_storage'] = $path;

        return Observation::create($request->all());
    }
}
