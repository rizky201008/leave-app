<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function profilePage(Request $request)
    {
        return Inertia::render("Profile");
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);
        $user = $request->user();
        if (!Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors(['error' => 'Password anda salah']);
        }

        $user->password = bcrypt($request->newPassword);
        $user->save();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('login'))->with(['success' => 'Password diubah, silahkan login kembali']);
    }
}
