@extends('layout.layout')


<!-- Styles-->
<link rel="stylesheet" href="{{ url('calculadora/style_calculadora.css')}}">
<!-- Bootstrap-->
<link rel="stylesheet" href="{{ asset('calculadora/bootstrap.css')}}">

<!-- Seção do cabeçalho da página -->
@section('titulo_pagina')
<h6 class="m-0 font-weight-bold text-primary">Instruções</h6>
@stop


<!-- Seção do conteúdo -->
@section('conteudo')

    <section class="anime" id="oquee">
        <div class="grid-text">
            <h2><b>O que é?</b></h2>
            <p>No curso de JavaScript e jQuery você irá aprender como manipular os elementos do DOM a partir de interações do usuário. Primeiro eu começo com os fundamentos do JS, ensinando a sintaxe, variáveis, funções, objetos e outros elementos básicos.</p>
            <a target="_blank" href="https://www.origamid.com/cursos/javascript-e-jquery/">Ver Mais</a>
        </div>

    </section>

    <!-- Divider -->
    <hr class="sidebar-divider my-0"><h1></h1>
    <section class="anime" id="comopreencher">
        <div class="grid-img img-right">
            <img src="img/img2.png" alt="Img 2">
        </div>
        <div class="grid-text">
            <h2><b>Como Funciona</b></h2>
            <p>A calculadora funciona</p>
            <a target="_blank" href="https://www.origamid.com/cursos/ux-design-heuristicas/">Ver Mais</a>
        </div>
    </section>

    <!-- Divider -->
    <hr class="sidebar-divider my-0"><h1></h1>

    <section class="anime" id="equacoes">
        <h2><b>Equações</b></h2>
        <div class="grid-text">

            <h4> Confiabilidade Composta</h4>
            <p>CC é a confiabilidade composta; ∑ʎ representa
                a soma das cargas fatoriais (ou coeficientes de regressão
                entre a variável latente e o item); e ∑ɛ é a soma dos erros
                de mensuração (ou variância residual).</p>
        </div>
        <div class="grid-img">
            <img src="../calculadora/img/cc.png" alt="Img 3">
        </div>
        <div class="grid-text">
            <h4> Variância Média Extraída</h4>
            <p>Na qual, VME é a Variância Média Extraída; λ2
                representa a carga fatorial elevada ao quadrado; consequentemente,
               ∑(λ2) indica a soma das cargas fatoriais elevadas ao quadrado;
               e ∑ɛ é a soma dos erros de mensuração. Ressalta-se que, para
               o cálculo da VME, devem ser utilizadas as cargas fatoriais
               padronizadas.</p>
        </div>
        <div class="grid-img">
            <img src="../calculadora/img/vme.png" alt="Img 3">
        </div>
    </section>


@stop
