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
Route::get('/cc', function(){
    return view('paginas/calcCC');
});
Route::get('/vme', function(){
    return view('paginas/calcVME');
});
Route::get('/sobre', function(){
    return view('pagina/sobre');
});
Route::get('/instrucao', function(){
});
/*
Route::get('/','CalcController@inicio');
Route::get('sobre','CalcController@sobre');
*/
