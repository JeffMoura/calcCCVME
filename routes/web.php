<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/
Route::get('/', function(){
    return view('paginas/home');
});
Route::get('/sobre', function(){
    return view('paginas/sobre');
});
Route::get('/instrucao', function(){
    return view('paginas/instrucao');
});
/*
Route::get('/sobre','CalcController@sobre')->name('pagina.sobre');
Route::get('/instrucao','CalcController@instrucao')->name('pagina.instrucao');
*/
