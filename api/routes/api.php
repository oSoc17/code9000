<?php

use App\Observation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth', 'Api\AuthController@auth');

Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api'], function () {
    Route::post('auth/me', 'AuthController@me');
    Route::post('auth/refresh', 'AuthController@refresh');
});

Route::group(['middleware' => 'api'], function () {

    /*
     * GET
     */
    Route::get('observations', function () {
        return Observation::all();
    });
    Route::get('observations/{id}', function ($id) {
        $observation = Observation::find($id);
        return $observation->toJson();
    });
    Route::get('observations/{id}/picture', function ($id) {
        $observation = Observation::find($id);
        $image = Storage::get($observation->picture_storage);
        return response($image)->header('Content-Type', 'image/jpeg');
    });

    /*
     * POST
     */
    Route::post('observations', function (Request $request) {
    	if ($request->hasFile('image') && $request->has('longitude') && $request->has('latitude') && $request->has('captured_at')) {
	    	$file = $request->file('image');
	    	if($file->extension()=='jpeg'){
	    		$picture_storage = Storage::putFile('observation', $file);
	    		$request['picture_storage'] = $picture_storage;
	    	}
	    	Observation::create($request->all());
		}
    });
    Route::post('observations/vote', function (Request $request) {
        return 'not yet implemented';
    });
});
