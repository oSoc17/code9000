<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Observation;


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

    public function store(Request $request)
    {
     	if ($request->hasFile('image') && $request->has('longitude') && $request->has('latitude') && $request->has('captured_at')) {
            $file = $request->file('image');
            if ($file->extension() == 'jpeg') {
                $picture_storage = Storage::putFile('observation', $file);
                $request['picture_storage'] = $picture_storage;
            }
            Observation::create($request->all());
        }
    }
}
