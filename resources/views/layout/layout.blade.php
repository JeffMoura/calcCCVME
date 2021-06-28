<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ URL::asset('calculadora/img/calculadora.png') }}" type="image/x-icon"/>
    <title>Calculadora CC e VME</title>

</head>
<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper" >
        <!-- Menu lateral -->
         @include('layout.menu')

        <!--  Content -->
        <div class="container-fluid">
            <!-- espaço -->
            <h1></h1>

            <!-- CONTAINER -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    @yield('titulo_pagina')
                </div>
                <div class="card-body">

                        @yield('conteudo')
                        @include('layout.rodape')
                </div>
            </div>
            <!-- Scroll to Top Button-->
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
    </div>
</body>

<!--  scripts -->
<script src="{{asset('calculadora/js/sb-admin-2.min.js')}}"></script>
<script src="{{asset('calculadora/js/jquery-easing/jquery.easing.min.js')}}"></script>
<script src="{{asset('calculadora/jquery.min.js')}}"></script>
<script src="{{asset('calculadora/bootstrap.min.js')}}"></script>
<script src="{{asset('calculadora/bootstrap.bundle.min.js')}}"></script>
</html>
