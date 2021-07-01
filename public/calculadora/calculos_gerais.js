
$(function(){
    //variável recebe as funções
	var CALC = {
        //recebe o formulário da calculadora
		form: document.getElementById('calculadora'),
        getRowNo: function(item){
            //retorna a var item se o tipo dele for número
			return typeof item === 'number' ? item : $(item).parents('tr')[0].rowIndex;
		},
		initPlaceHolder: function(input){
            //inicia o formulário com marcador no campo Carregamento Padronizado "digite aqui"
			$(input).focus(function (){$(this).attr('placeholder','');}).blur(function(){$(this).attr('placeholder','Digite Aqui')});
		},
        //restringe o campo para entrada apenas de número e casas decimais
		isNumberKey: function(evt){
			var charCode = (evt.which) ? evt.which : event.keyCode
			return !(charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46);
		},

        //seleciona o id de item da lista do corpo da tabela
		itemListTbody: document.getElementById('itemlist'),
        //função que retorna o tamanho/comprimento da lista de itens
		numItemLinhas: function(){return CALC.itemListTbody.rows.length;},
		//função para remover linha quando clicar no botão
        onclickDeleteButton: function (evt){
			evt = evt || window.event;
			var targ = evt.target || evt.srcElement;
			CALC.removeLinha(targ);
		},
        //função para remover linha
        removeLinha: function(item){
            $('#item_linha' + CALC.getRowNo(item)).remove();
            CALC.renumerarLinhas();
            CALC.calcTotalCC();
            CALC.calcTotalVme();
        },
        onkeyup: function(evt){
			var targ = evt.target || evt.srcElement;
			if(targ.nodeName && (targ.nodeName.toLowerCase() === 'input')){
				while((targ.value !== '') && (targ.value.match(/^[\d]*\.?[\d]*$/) === null)){targ.value = targ.value.substring(0,targ.value.length - 1);}
				CALC.calcular_linha(CALC.getRowNo(targ));
				CALC.calcTotalCC();
                CALC.calcTotalVme();
			}
		},

        //função para adicionar novos itens (linhas)
		adicionar_linha: function(){
			var linhaCont = CALC.numItemLinhas(), linha = CALC.itemListTbody.insertRow(linhaCont), input;
			linhaCont++;
			linha.className = 'item_linha';
			linha.id = 'item_linha' + linhaCont;
			input = $('<input class="item form-control" readonly="readonly" type="text" id="item_calc' + linhaCont + '" name="item_calc' + linhaCont + '" value="' + linhaCont + '">');
			$(linha.insertCell()).addClass('item_coluna').append(input);
			input = $('<input class="carregando form-control" type="text" id="carregamento_padronizado' + linhaCont + '" name="carregamento_padronizado' + linhaCont + '" placeholder="Digite Aqui">');
			input.keyup(CALC.onkeyup).attr("autocomplete", "off");;
			CALC.initPlaceHolder(input);
			$(linha.insertCell()).addClass('carregando_column').append(input);
			input = $('<input class="var_erro form-control"  readonly="readonly" type="text" id="variancia_erro' + linhaCont + '"name="variancia_erro' + linhaCont + '">');
			$(linha.insertCell()).addClass('error_column').append(input);
			input = $('<input class="rquadrado form-control"  readonly="readonly" type="text" id="r_quadrado' + linhaCont + '"name="r_quadrado' + linhaCont + '">');
			$(linha.insertCell()).addClass('rquadrado_column').append(input);
			input = $('<input type="button"  readonly="readonly" class="btn btn-danger remover_botao" name="deletar_linha' + linhaCont + '" value="Excluir" id="deletar_linha' + linhaCont + '">');
			input.click(CALC.onclickDeleteButton);
			$(linha.insertCell()).addClass('button_column').append(input);
			$(linha).children('input[type="text"]').attr("autocomplete", "off");
		},

        //função para renumerar e apagar todas as linhas, resetando o formulário completo
        renumerarLinhas: function(){
			var linhaCont = linhaCont = CALC.numItemLinhas(), linha_Index, linha, celula_index, cell, childIndex, child, numero_linha;
            for(linha_Index = 1; linha_Index < linhaCont; linha_Index++){
				numero_linha = linha_Index + 1;
				linha = CALC.itemListTbody.rows[linha_Index];
				linha.id = 'item_linha' + numero_linha;
				for(celula_index = 0; celula_index < linha.cells.length; celula_index++){
					cell = linha.cells[celula_index];
					for(childIndex = 0; childIndex < cell.childNodes.length; childIndex++){
						child = cell.childNodes[childIndex];
						if(child.tagName && (child.tagName.toLowerCase() === 'input') && child.className){
							switch(child.className.toLowerCase()){
								case 'item':
									child.id = 'item_calc' + numero_linha;
									child.name = child.id;
									child.value = numero_linha;
								break;
								case 'carregando':
									child.id = 'carregamento_padronizado' + numero_linha;
									child.name = child.id;
								break;
								case 'var_erro':
									child.id = 'variancia_erro' + numero_linha;
									child.name = child.id;
								break;
								case 'rquadrado':
									child.id = 'r_quadrado' + numero_linha;
									child.name = child.id;
								break;
								case 'remover_botao':
									child.id = 'deletar_linha' + numero_linha;
									child.name = child.id;
								break;
							}
						}
					}
				}
			}
		},

        //função para limpar os campos
		limpar_campos: function(){
			var numero_Linha;
			for(numero_Linha = CALC.itemListTbody.rows.length; numero_Linha > 1; numero_Linha--){CALC.removeLinha(numero_Linha);}
			$('#totalcc').val('');
            $('#totalvme').val('');
			$('#carregamento_padronizado1').val('');
			$('#variancia_erro1').val('');
			$('#r_quadrado1').val('');
		},

        /*----------------------- CALCULOS --------------------------------*/

        //função para cálculo de cada linha (Carregamento Padronizado, erro de mensuração e R-quadrado)
		calcular_linha: function(numero_Linha){
            //variável recebe o elemento carregamento padronizado
			var carregamento_padronizado = document.getElementById('carregamento_padronizado' + numero_Linha), variancia_erro = document.getElementById('variancia_erro' +numero_Linha), r_quadrado = document.getElementById('r_quadrado' + numero_Linha), qty;
			//se o campo CP for vazio ou conter apenas o ponto, os campos de variâncie de erro e r-quadrado ficarão vazios
            if((carregamento_padronizado.value === '') || (carregamento_padronizado.value === '.')){
				variancia_erro.value = '';
				r_quadrado.value ='';
			}
			else{
				lambda = parseFloat(carregamento_padronizado.value); //recebe o campo de carregamento padronizado (λ)
				variancia_erro.value = (1 - Math.pow(lambda, 2)).toFixed(3); //calcula o erro de mensuração (ɛ=1-λ²)
				r_quadrado.value = Math.pow(lambda, 2).toFixed(3); //calcula o R-Quadrado com base no carregamento padronizado (r²=λ²=1-ɛ)
			}
		},

        //FUNÇÃO CALCULAR CC
		calcTotalCC: function(){
			var soma_cp = 0, soma_cp_exp = 0, soma_erro_var = 0, denominador = 0, calculo_cc = 0, linhaCont, cp;
			for(linhaCont = CALC.numItemLinhas(); linhaCont >= 1; linhaCont--){
                //recebe o item do campo carreg. padroni. e converte para float
				cp = parseFloat(document.getElementById('carregamento_padronizado' + linhaCont).value);
				if(!isNaN(cp)){
                    // soma as cargas fatoriais
					soma_cp += parseFloat(document.getElementById('carregamento_padronizado' + linhaCont).value);
					// calcula o quadrado das cargas fatoriais
                    soma_cp_exp = Math.pow(soma_cp, 2);
                    //soma dos erros de mensuração
					soma_erro_var += parseFloat(document.getElementById('variancia_erro' + linhaCont).value);
                    //recebe a soma das cargas fatoriais ao quadrado + soma dos erros de mensuração
					denominador = soma_cp_exp + soma_erro_var;
                    //CC = soma das cargas fatoriais ao quadrado dividido pelo denominador acima
					calculo_cc = soma_cp_exp / denominador;
				}
			}
            //O campo total CC recebe o resultado da equação acima
			document.getElementById('totalcc').value = (calculo_cc === 0.0 ? '' : calculo_cc.toFixed(3));
			return true;
		},


        //FUNÇÃO CALCULAR VME
        calcTotalVme: function(){
			var exp_cp_soma = 0, soma_erro_var = 0, denominador = 0, calculo_vme = 0, linhaCont, cp;
			for(linhaCont = CALC.numItemLinhas(); linhaCont >= 1; linhaCont--){
                //recebe o item do campo carreg. padroni. e converte para float
				cp = parseFloat(document.getElementById('carregamento_padronizado' + linhaCont).value);
				if(!isNaN(cp)){
                    // calcula o quadrado das cargas fatoriais e depois soma
					exp_cp_soma += Math.pow(cp, 2);
                    //soma dos erros de mensuração
                    soma_erro_var += parseFloat(document.getElementById('variancia_erro' + linhaCont).value);
                    //recebe a soma das cargas fatoriais elevada ao quadrado + soma dos erros de mensuração
					denominador = exp_cp_soma + soma_erro_var;
                    //VME = soma das cargas fatoriais ao quadrado dividido pelo denominador acima
					calculo_vme = exp_cp_soma / denominador;
				}
			}
            //O campo total VME recebe o resultado da equação acima
			document.getElementById('totalvme').value = (calculo_vme === 0.0 ? '' : calculo_vme.toFixed(3));
			return true;
		},
	};

	$('#additem').click(CALC.adicionar_linha); //chama a função adicionar linha quando clica no botão  adicionar
	$('input.carregando').keyup(CALC.onkeyup).attr("autocomplete", "off"); //chama o campo CP sem o autocompletar do teclado
	CALC.initPlaceHolder($('input.carregando')); //iniciar o marcador no campo CP
	$('.remover_botao').click(CALC.onclickDeleteButton); //chama a função deletar linha quando clica no botão remover
	$('#btn_limpar').click(CALC.limpar_campos); //chama a função para reseter o formulário quando clica no botão limpar

	// define o foco para o campo de carregamento padronizado
	$('#carregamento_padronizado1').focus();
});
