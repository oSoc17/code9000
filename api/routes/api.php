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

Route::post('auth', 'Api\AuthController@auth');

Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api'], function() {
    Route::post('auth/me', 'AuthController@me');
    Route::post('auth/refresh', 'AuthController@refresh');
});
