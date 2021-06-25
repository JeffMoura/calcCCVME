@extends('layout.layout')


<!-- Javascrip -->
<script src="{{asset('calculadora/jquery.min.js')}}"></script>
<script src="../calculadora/calculos.js"></script>


<!-- Styles-->
<link rel="stylesheet" href="{{ url('calculadora/style_calculadora.css')}}">
<!-- Bootstrap-->
<link rel="stylesheet" href="{{ asset('calculadora/bootstrap.css')}}">

<!-- Seção do cabeçalho da página -->
@section('titulo_pagina')
<h6 class="m-0 font-weight-bold text-primary">Calculadora de Confiabilidade Composta</h6>
@stop


<!-- Seção do conteúdo -->
@section('conteudo')

<div class="table-responsive">
    <div class="signup-content">
        <form method="post" class="signup-form" action="" autocomplete="off" onsubmit="return false;" id="energyCalculator">
            <table class="table table-borderless ">
                <thead>
                    <tr>
                        <th scope="col" class="column1">Nº Item</th>
                        <th scope="col" class="column2">Carregamento padronizado</th>
                        <th scope="col" class="column3">Variância de Erro</th>
                        <th scope="col" class="column4">Item R-quadrado</th>
                        <th scope="col" class="column5"></th>
                    </tr>
                </thead>
                <tbody id="itemlist">
                    <tr class="item_row" id="item_row1">
                            <td class="item_column">
                                <input type="number" class="item form-control" name="itemno1" value="1" id="itemno1" readonly="readonly"/>
                            </td>
                            <td class="item_column">
                                <input type="text" class="loading form-control" name="sl1" id="sl1" placeholder="Inserir"/>
                            </td>
                            <td class="item_column">
                                <input type="text" class="errorvar form-control" name="ev1" id="ev1" readonly="readonly" />
                            </td>
                            <td class="item_column">
                                <input type="text" class="rsquare form-control" name="rs1" id="rs1" readonly="readonly" />
                            </td>
                            <td class="button_column"></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr class="form-group">
                        <td colspan="2">
                        <input class="btn btn-success" name="Submit" id="additem" value="Adicionar" type="button"/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="form-group">
                        <td colspan="3" class="crtitle">Confiabilidade Composta:&nbsp;&nbsp;</td>
                        <td><input class="form-input form-control" readonly="readonly" name="total" id="total" readonly="readonly" type="text"></td>
                    </tr>

                    <tr class="form-group">
                        <td colspan="3">&nbsp;</td>
                        <td><input type="button" id="FormRefresh" class="btn btn-warning" value="Limpar"></td>
                    </tr>
                    </div>
                </tfoot>
            </table>
        </form>
    </div>

</div>
@stop
