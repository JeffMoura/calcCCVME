@extends('layout.layout')


<!-- Javascrip -->
<script src="{{asset('calculadora/jquery.min.js')}}"></script>
<script src="../calculadora/calculos_gerais.js"></script>


<!-- Styles-->
<link rel="stylesheet" href="{{ url('calculadora/style_calculadora.css')}}">
<!-- Bootstrap-->
<link rel="stylesheet" href="{{ asset('calculadora/bootstrap.css')}}">

<!-- Seção do cabeçalho da página -->
@section('titulo_pagina')
<h6 class="m-0 font-weight-bold text-primary">Sobre</h6>
@stop


<!-- Seção do conteúdo -->
@section('conteudo')
<section class="anime" id="equipe">
    <div class="grid-text">
        <h2><b>Equipe</b></h2>
        <p class="text-justify">Jefferson Moura....</p>
    </div>
</section>
<section class="anime" id="apoio">
    <div class="grid-text">
        <h2><b>Apoio</b></h2>
        <p class="text-justify">Universidade Estadual de Montes Claros</p>
    </div>
</section>
<section class="anime" id="desenvolvimento">
    <div class="grid-text">
        <h2><b>Ferramentas de Desenvolvimento</b></h2>
        <p class="text-justify">PHP Laravel, JavaScript</p>
    </div>
</section>
@stop
