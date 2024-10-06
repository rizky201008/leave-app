<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function loginPage(Request $request)
    {
        return Inertia::render("Login");
    }

    public function login(Request $request)
    {
        $request->validate([
            'id' => 'required|numeric',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('id', 'password'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('home'));
        } else {
            return back()->withErrors(['error' => 'ID atau password tidak sesuai!']);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('login'));
    }
}
