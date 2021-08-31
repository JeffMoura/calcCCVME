<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalcController extends Controller
{
    public function inicio(){
        return view(view:'paginas.home');
    }
    public function sobre(){
        return view(view: 'paginas.sobre');
    }
    public function instrucao(){
        return view(view: 'paginas.instrucao');
    }
}
