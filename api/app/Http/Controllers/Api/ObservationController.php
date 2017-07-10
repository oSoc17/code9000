<?php

namespace App\Http\Controllers\Api;

use App\Observation;
use App\Http\Controllers\Controller;
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
        return Observation::all();
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
        $request['picture_storage'] = Storage::putFile('observations', $file);

        return Observation::create($request->all());
    }
}
