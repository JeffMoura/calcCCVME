
$(function(){
    //variável recebe as funções
	var CALC = {
        //função para adicionar novos itens (linhas)
		adicionar_linha: function(){
			var linhaCont = CALC.numItemRows(), linha = CALC.itemListTbody.insertRow(linhaCont), cell, input;
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
			input = $('<input type="button"  readonly="readonly" class="removebutton" name="del_row' + linhaCont + '" value="Excluir" id="del_row' + linhaCont + '">');
			input.click(CALC.onclickDeleteButton);
			$(linha.insertCell()).addClass('button_column').append(input);
			$(linha).children('input[type="text"]').attr("autocomplete", "off");
		},
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
			for(linhaCont = CALC.numItemRows(); linhaCont >= 1; linhaCont--){
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
			for(linhaCont = CALC.numItemRows(); linhaCont >= 1; linhaCont--){
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

        //recebe o formulário da calculadora
		form: document.getElementById('calculadora'),
        getRowNo: function(item){
            //retorna a var item se o tipo dele for número
			return typeof item === 'number' ? item : $(item).parents('tr')[0].rowIndex;
		},
		initPlaceHolder: function(input){
            //coloca no campo Carregamento Padronizado o marcador "digite aqui" se estiver vazio
			$(input).focus(function (){$(this).attr('placeholder','');}).blur(function(){$(this).attr('placeholder','Digite Aqui')});
		},
		isNumberKey: function(evt){
			var charCode = (evt.which) ? evt.which : event.keyCode
			return !(charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46);
		},
		itemListTbody: document.getElementById('itemlist'),
		numItemRows: function(){return CALC.itemListTbody.rows.length;},
		onclickDeleteButton: function (evt){
			evt = evt || window.event;
			var targ = evt.target || evt.srcElement;
			CALC.removeRow(targ);
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
		removeRow: function(item){
			$('#item_linha' + CALC.getRowNo(item)).remove();
			CALC.renumberRows();
			CALC.calcTotalCC();
            CALC.calcTotalVme();
		},
		renumberRows: function(){
			var linhaCont = linhaCont = CALC.numItemRows(), rowIndex, row, cellIndex, cell, childIndex, child, rowNum;
			for(rowIndex = 1; rowIndex < linhaCont; rowIndex++){
				rowNum = rowIndex + 1;
				row = CALC.itemListTbody.rows[rowIndex];
				row.id = 'item_linha' + rowNum;
				for(cellIndex = 0; cellIndex < row.cells.length; cellIndex++){
					cell = row.cells[cellIndex];
					for(childIndex = 0; childIndex < cell.childNodes.length; childIndex++){
						child = cell.childNodes[childIndex];
						if(child.tagName && (child.tagName.toLowerCase() === 'input') && child.className){
							switch(child.className.toLowerCase()){
								case 'item':
									child.id = 'item_calc' + rowNum;
									child.name = child.id;
									child.value = rowNum;
								break;
								case 'carregando':
									child.id = 'carregamento_padronizado' + rowNum;
									child.name = child.id;
								break;
								case 'var_erro':
									child.id = 'variancia_erro' + rowNum;
									child.name = child.id;
								break;
								case 'rquadrado':
									child.id = 'r_quadrado' + rowNum;
									child.name = child.id;
								break;
								case 'removebutton':
									child.id = 'del_row' + rowNum;
									child.name = child.id;
								break;
							}
						}
					}
				}
			}
		},
		limpar_tudo: function(){
			var numero_Linha;
			for(numero_Linha = CALC.itemListTbody.rows.length; numero_Linha > 1; numero_Linha--){CALC.removeRow(numero_Linha);}
			$('#totalcc').val('');
            $('#totalvme').val('');
			$('#carregamento_padronizado1').val('');
			$('#variancia_erro1').val('');
			$('#r_quadrado1').val('');
		}
	};

	$('#additem').click(CALC.adicionar_linha);
	$('input.carregando').keyup(CALC.onkeyup).attr("autocomplete", "off");
	CALC.initPlaceHolder($('input.carregando'));
	$('.removebutton').click(CALC.onclickDeleteButton);
	$('#btn_limpar').click(CALC.limpar_tudo);

	// define o foco para o campo de carregamento padronizado
	$('#carregamento_padronizado1').focus();
});
