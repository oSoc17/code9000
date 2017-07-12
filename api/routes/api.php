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

    // Route = api/
    Route::get('documentation', 'DocumentationController@index');
    Route::post('deploy', 'GithubWebhookController@deploy');

    // Route = api/auth
    Route::prefix('auth')->group(function () {
        Route::post('/', 'AuthController@auth');

        Route::get('facebook', 'AuthSocialiteController@redirectToProvider');
        Route::get('facebook/callback', 'AuthSocialiteController@handleProviderCallback');

        Route::post('register', 'AuthController@register');
        Route::post('refresh', 'AuthController@refresh');
    });

    // Authenticated url's for Installation devices
    Route::group(['middleware' => 'auth.installation'], function () {
        Route::post('observations', 'ObservationController@store');
    });

    // Route = api/observations
    Route::prefix('observations')->group(function () {
        Route::get('/', 'ObservationController@index');
        Route::get('{id}', 'ObservationController@show');
        Route::get('{id}/picture', 'ObservationController@getPicture');
    });

    // JWT-Authenticated url's
    Route::group(['middleware' => 'jwt.auth'], function () {

        // Route = api/auth
        Route::prefix('auth')->group(function () {
            Route::get('me', 'AuthController@me');
            Route::get('observations', 'ObservationController@forUser');

            Route::post('logout', 'AuthController@logout');
        });

        // Route = api/
        Route::post('votes', 'VotesController@store');

        // Only admins
        Route::group(['middleware' => 'auth.admin'], function () {
            Route::resource('installations', 'InstallationController', ['only' => ['index', 'update', 'destroy']]);
        });
    });
});
