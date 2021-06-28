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
            <h2 class="text-center"><b>O que são CC e VME?</b></h2>
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

    <section class="anime" id="equacoes">
        <h2 class="text-center"><b>Equações</b></h2>

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
            <img src="../calculadora/img/cc.png" class="img-fluid" alt="Imagem responsiva">
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
            <img src="../calculadora/img/vme.png" class="img-fluid" alt="Imagem responsiva">
        </div>

    </section>

    <!-- Divider -->
    <hr class="sidebar-divider my-0"><h1></h1>
    <section class="anime" id="comopreencher">
        <div class="grid-img img-right"></div>
        <div class="grid-text">
            <h2 class="text-center"><b>Como Preencher</b></h2>
            <p class="text-justify">1. Inserir carregamento padronizado no item</p>
            <p class="text-justify">2. Com base no carregamento padronizado é estimado a variância do erro (ɛ=1-λ²)</p>
            <p class="text-justify">3. Com base no carregamento padronizado é estimado o valor do R-quadrado (r²=λ²=1-ɛ)</p>
            <p class="text-justify">4. Clique em ADICIONAR para continuar a inserir o carregamento padronizado para cada item</p>
            <p class="text-justify">5. A cada item adicionado é mostrado a numeração</p>
            <p class="text-justify">6. Clique em EXCLUIR para remover qualquer item</p>
            <p class="text-justify">7. É mostrado os valores totais da CC e VME</p>
            <p class="text-justify">8. Clique em LIMPAR, caso queira redefinir a calculadora</p>
        </div>
        <div class="p-3 mb-2 bg-primary text-white">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="../calculadora/img/calc1.png" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc2.png" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc3.png" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc4.png" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc5.png" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc6.png" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc7.png" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../calculadora/img/calc8.png" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
@stop
<script src="{{asset('calculadora/jquery.min.js')}}"></script>
