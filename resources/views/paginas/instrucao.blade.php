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
            <h2><b>O que são CC e VME?</b></h2>
            <p class="text-justify">A CC e a VME são, primordialmente, indicadores que
                podem ser utilizados para avaliar a qualidade do modelo
                estrutural de um instrumento psicométrico (Hair, Black,
                Babin, Anderson, & Tatham, 2009; Fornell & Larcker, 1981).
                Para tanto, os cálculos da CC e VME são realizados com
                base nos parâmetros estimados por meio da Modelagem
                por Equações Estruturais (MEE).</p>
        </div>

    </section>

    <!-- Divider -->
    <hr class="sidebar-divider my-0"><h1></h1>
    <section class="anime" id="comopreencher">
        <div class="grid-img img-right"></div>
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
            <p class="text-justify">As equações de CC e VME são semelhantes e ambas são calculadas a partir das cargas
                fatoriais e do erro (ou variância residual) apenas. A única diferença entre as duas equações reside no fato de que, para
                a CC, deve-se somar todas as cargas fatoriais antes de elevar a soma ao quadrado (∑λ)²; e, para a VME, deve-se calcular
                o quadrado das cargas fatoriais antes de somá-las ∑(λ²). Embora essa diferença nas equações não represente uma
                alteração substancial do ponto de vista teórico-psicométrico, os valores de CC e VME sofrem distintas interferências das
                cargas fatoriais e do número de itens do modelo.</p>
            </div>
        <div class="grid-text">
            <h4> Confiabilidade Composta</h4>
            <p class="text-justify">CC é a confiabilidade composta; ∑ʎ representa
                a soma das cargas fatoriais (ou coeficientes de regressão
                entre a variável latente e o item); e ∑ɛ é a soma dos erros
                de mensuração (ou variância residual).</p>
        </div>
        <div class="grid-img">
            <img src="../calculadora/img/cc.png" alt="Img 3">
        </div>
        <div class="grid-text">
            <h4> Variância Média Extraída</h4>
            <p class="text-justify">VME é a Variância Média Extraída; λ2
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
