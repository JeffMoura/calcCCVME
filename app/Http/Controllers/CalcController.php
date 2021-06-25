<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalcController extends Controller
{
    public function inicio(){
        return view('home');
    }
    public function sobre(){
        return view('sobre');
    }
}
