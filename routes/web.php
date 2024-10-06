<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::group(['middleware' => 'auth'], function () {
    Route::middleware(RoleMiddleware::class.":hrd & GA")->group(function () {
        Route::get('pending-leave', [LeaveController::class, 'pendingLeavePage'])->name('pending-leave');
        Route::put('pending-leave', [LeaveController::class, 'updateLeave'])->name('pending-leave-put');
    });
    Route::get('home', [HomeController::class, 'homePage'])->name('home');
    Route::get('leave-request', [LeaveController::class, 'leaveRequestPage'])->name('leave-request');
    Route::post('leave-request', [LeaveController::class, 'leaveRequest'])->name('leave-request-post');
    Route::get('leaves', [LeaveController::class, 'getLeaveRequests'])->name('leaves');
    Route::get('profile', [ProfileController::class, 'profilePage'])->name('profile');
    Route::put('update-password', [ProfileController::class, 'updatePassword'])->name('update-password');
});

require __DIR__ . '/auth.php';
