<?php

namespace App\Http\Controllers\Api;

use App\Observation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Api\ObservationModel;

class ObservationController extends Controller
{
    public function index()
    {
        return Observation::all();
    }

    public function show($id)
    {
        $observation = Observation::find($id);

        return $observation->toJson();
    }

    public function getPicture($id)
    {
        $observation = Observation::find($id);
        $image = Storage::get($observation->picture_storage);

        return response($image)->header('Content-Type', 'image/jpeg');
    }

    public function store(ObservationModel $request)
    {
        $file = $request->file('image');
        $request['picture_storage'] = Storage::putFile('observations', $file);

        return Observation::create($request->all());
    }
}
