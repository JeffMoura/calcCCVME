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
<h6 class="m-0 font-weight-bold text-primary">Calculadora de Confiabilidade Composta e Variância Média Extraída</h6>
@stop


<!-- Seção do conteúdo -->
@section('conteudo')

<div class="table-responsive">
    <div class="signup-content">
        <form method="post" class="signup-form" action="" autocomplete="off" onsubmit="return false;" id="calculadora">
            <table class="table table-borderless ">
                <thead>
                    <tr>
                        <th>Nº Item</th>
                        <th>Carga Fatorial</th>
                        <th>Variância de Erro</th>
                        <th>Carga Fatorial ²</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="itemlist">
                    <tr class="item_linha">
                            <td class="item_coluna">
                                <input type="number" class="item form-control"  value="1" id="item_calc" readonly="readonly"/>
                            </td>
                            <td class="item_coluna">
                                <input type="text" class="carregando form-control" autofocus='true'  id="carga_fatorial1" placeholder="Digite Aqui"/>
                            </td>
                            <td class="item_coluna">
                                <input type="text" class="var_erro form-control" id="variancia_erro1" readonly="readonly" />
                            </td>
                            <td class="item_coluna">
                                <input type="text" class="rquadrado form-control"  id="cf_quadrado1" readonly="readonly" />
                            </td>
                            <td class="button_column"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr class="form-group">
                        <td colspan="2">
                        <input class="btn btn-success" name="Submit" id="adicionar" value="Adicionar" type="button"/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="form-group">
                        <td colspan="3" style=" text-align:right">Confiabilidade Composta:&nbsp;&nbsp;</td>
                        <td><input class="form-input form-control" readonly="readonly" name="totalcc" id="totalcc" readonly="readonly" type="text"></td>
                    </tr>
                    <tr class="form-group">
                        <td colspan="3" style=" text-align:right" >Variância Média Extraída:&nbsp;&nbsp;</td>
                        <td><input class="form-input form-control" readonly="readonly" name="totalvme" id="totalvme" readonly="readonly" type="text"></td>
                    </tr>

                    <tr class="form-group">
                        <td colspan="3">&nbsp;</td>
                        <td><input type="button" id="btn_limpar" class="btn btn-warning" value="Limpar"></td>
                    </tr>
                    </div>
                </tfoot>
            </table>
        </form>
    </div>

</div>
@stop
