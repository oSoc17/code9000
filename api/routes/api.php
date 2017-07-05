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
    Route::get('/', function () {
        return 'GET api';
    });
    Route::get('observations', function () {
        return 'GET api/observations';
    });
    Route::get('observations/{id}', function ($id) {
        return 'GET api/observations/'.$id;
    });
    Route::get('observations/{id}', function ($id) {
        return 'GET api/observations/'.$id;
    });
    Route::get('observations/{id}/picture', function ($id) {
        return 'GET api/observations/'.$id.'/picture';
    });

    /*
     * POST
     */
    Route::post('observations', function (Request $request) {
        if ($request->hasFile('image') && $request->has('longitude') && $request->has('latitude') && $request->has('captured_at')) {
            $file = $request->file('image');
            if ($file->extension() == 'jpeg') {
                $picture_storage = Storage::putFile('observation', $file);
                $request['picture_storage'] = $picture_storage;
            }

            Observation::create($request->all());
        }
    });
    Route::post('observations/vote', function (Request $request) {
        return 'POST api/observations/vote'.asset('storage/observations/');
    });
});
