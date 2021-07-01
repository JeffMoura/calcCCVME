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
        <h2 class="text-center"><b>Equipe</b></h2>
        <p class="text-justify">Elencar projeto/equipe</p>
    </div>
</section>
<section class="anime" id="apoio">
    <div class="grid-text">
        <h2 class="text-center"><b>Apoio</b></h2>
        <p class="text-justify">Universidade Estadual de Montes Claros</p>
    </div>
</section>
<section class="anime" id="desenvolvimento">
    <div class="grid-text">
        <h2 class="text-center"><b>Ferramentas de Desenvolvimento</b></h2>
        <div class="grid-img">
            <img src="../calculadora/img/php.png" class="img-fluid"  height="20%" width="20%"  alt="Imagem responsiva"/>
            <img src="../calculadora/img/laravel.png" class="img-fluid" height="20%" width="20%" alt="Imagem responsiva"/>
            <img src="../calculadora/img/bootstrap.png" class="img-fluid" height="20%" width="20%" alt="Imagem responsiva"/>
            <img src="../calculadora/img/javascript.png" class="img-fluid" height="20%" width="20%" alt="Imagem responsiva"/>

        </div>
    </div>
</section>
@stop
