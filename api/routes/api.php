<?php

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

Route::group(['namespace' => 'Api'], function () {
    Route::post('auth', 'AuthController@auth');

    Route::get('observations', 'ObservationController@index');
    Route::get('observations/{id}', 'ObservationController@show');
    Route::get('observations/{id}/picture', 'ObservationController@getPicture');

    Route::get('documentation', 'DocumentationController@index');

    Route::post('observations', 'ObservationController@store');
    // Authenticated url's
    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::prefix('auth')->group(function () {
            Route::post('me', 'AuthController@me');
            Route::post('refresh', 'AuthController@refresh');
            Route::post('logout', 'AuthController@logout');

            Route::get('observations', 'ObservationController@forUser');
        });

        Route::post('votes', 'VotesController@store');
    });

    Route::post('deploy', 'GithubWebhookController@deploy');
});
