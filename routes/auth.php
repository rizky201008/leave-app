<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::group(['middleware' => 'auth'], function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    });
    Route::group(['middleware' => 'guest'], function () {
        Route::get('login', [AuthController::class, 'loginPage'])->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('login-post');
    });
});
