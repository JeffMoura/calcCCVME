
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
            //inicia o formulário com marcador no campo Carga Fatorial "digite aqui"
			$(input).focus(function (){$(this).attr('placeholder','');}).blur(function(){$(this).attr('placeholder','Digite Aqui')});
		},
        //restringe o campo para entrada apenas de número e casas decimais
		isNumberKey: function(event){
			var charCode = (event.which) ? event.which : event.keyCode
			return !(charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46);
		},

        //a lista geral recebe o id itemlist que pertece a todo corpo da tabela
		lista_itens_geral: document.getElementById('itemlist'),
        //função que retorna o tamanho/comprimento da lista de itens
		numItemLinhas: function(){return CALC.lista_itens_geral.rows.length;},
		//função com evento para remover linha quando clicar no botão
        botao_excluir: function (event){
			event = event || window.event;
			var targ = event.target || event.srcElement;
			CALC.removeLinha(targ);
		},
        //função para remover linha
        removeLinha: function(item){
            /*pega a classe correspondente a linha com o parâmetro repassado e a remove, renumerando
            posteriormente a quantidade de linhas e atualizando os cálculos*/
            $('#item_linha' + CALC.getRowNo(item)).remove();
            CALC.renumerarLinhas();
            CALC.calcTotalCC();
            CALC.calcTotalVme();
        },
        onkeyup: function(event){
			var targ = event.target || event.srcElement;
			if(targ.nodeName && (targ.nodeName.toLowerCase() === 'input')){
				while((targ.value !== '') && (targ.value.match(/^[\d]*\.?[\d]*$/) === null)){
					targ.value = targ.value.substring(0,targ.value.length - 1);
					}
				CALC.calcular_linha(CALC.getRowNo(targ));
				CALC.calcTotalCC();
                CALC.calcTotalVme();
			}
		},

        //função para adicionar novos itens (linhas)
		adicionar_linha: function(){
            //cria a variável linhaCont e atribui a quantidade de linhas do formulário
			var linhaCont = CALC.numItemLinhas();
            //cria a variável linha e insere um nova linha
            var linha = CALC.lista_itens_geral.insertRow(linhaCont);
            //cria a variável input para receber os novos campos
            var input;
            //incrementa
			linhaCont++;
            //recebe a classe item_linha
			linha.className = 'item_linha';
            //recebe o id da classe item_linha e adiciona o incrementador
			linha.id = 'item_linha' + linhaCont;
            //entrada de um novo campo id
			input = $('<input class="item form-control" readonly="readonly" type="text" id="item_calc' + linhaCont + '" name="item_calc' + linhaCont + '" value="' + linhaCont + '">');
			$(linha.insertCell()).append(input);
             //entrada de um novo campo carga fatorial
			input = $('<input class="carregando form-control" type="text" id="carga_fatorial' + linhaCont + '" name="carga_fatorial' + linhaCont + '" placeholder="Digite Aqui">');
			input.keyup(CALC.onkeyup).attr("autocomplete", "off");;
			CALC.initPlaceHolder(input);
			$(linha.insertCell()).append(input);
             //entrada de um novo campo variância de erro
			input = $('<input class="var_erro form-control"  readonly="readonly" type="text" id="variancia_erro' + linhaCont + '"name="variancia_erro' + linhaCont + '">');
            $(linha.insertCell()).append(input);
			 //entrada de um novo campo carga fatorial ao quadrado
            input = $('<input class="rquadrado form-control"  readonly="readonly" type="text" id="cf_quadrado' + linhaCont + '"name="cf_quadrado' + linhaCont + '">');
			$(linha.insertCell()).append(input);
			//entrada de um novo campo botão de excluir
            input = $('<input type="button"  readonly="readonly" class="btn btn-danger remover_botao" name="deletar_linha' + linhaCont + '" value="Excluir" id="deletar_linha' + linhaCont + '">');
			input.click(CALC.botao_excluir);
			$(linha.insertCell()).append(input);
			$(linha).children('input[type="text"]').attr("autocomplete", "off");
		},

        //função para renumerar e apagar todas as linhas, resetando o formulário completo
        renumerarLinhas: function(){
            //cria variável que recebe a função do número de linhas da lista
			var linhaCont = CALC.numItemLinhas();
            //variáveis
            var indice_linha, linha, indice_celula, celula, childIndex, child, numero_linha;
            //o índice inicia com valor 1 e para cada indice menor que o tamanho da lista, incrementa
            for(indice_linha = 1; indice_linha < linhaCont; indice_linha++){
                //variável numero de linha recebe o índice da linha incrementado
				numero_linha = indice_linha + 1;
				/*variável linha recebe o índice_linha da lista de itens geral*/
                linha = CALC.lista_itens_geral.rows[indice_linha];

				linha.id = 'item_linha' + numero_linha;
                //o índice da celula inicia com valor 0 e para cada indice menor que o tamanho das celulas, incrementa
				for(indice_celula = 0; indice_celula < linha.cells.length; indice_celula++){
                    celula = linha.cells[indice_celula];
					for(childIndex = 0; childIndex < celula.childNodes.length; childIndex++){
						child = celula.childNodes[childIndex];
						if(child.tagName && (child.tagName.toLowerCase() === 'input') && child.className){
							switch(child.className.toLowerCase()){
								case 'item':
									child.id = 'item_calc' + numero_linha;
									child.name = child.id;
									child.value = numero_linha;
								break;
								case 'carregando':
									child.id = 'carga_fatorial' + numero_linha;
									child.name = child.id;
								break;
								case 'var_erro':
									child.id = 'variancia_erro' + numero_linha;
									child.name = child.id;
								break;
								case 'rquadrado':
									child.id = 'cf_quadrado' + numero_linha;
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

        //função para limpar  os campos da lista
		limpar_campos: function(){
            /*cria uma variável que receberá o tamanho de linhas da lista, sempre que o tamanho da lista for maior que 1, linha chama
            a função removelinha, que utilizará a variável numero_linha criada como parâmetro. Após a exclusão das linhas, atualiza
            todos os campos como vazios*/
			var numero_Linha;
			for(numero_Linha = CALC.lista_itens_geral.rows.length; numero_Linha > 1; numero_Linha--){
                CALC.removeLinha(numero_Linha);
            }
			$('#totalcc').val('');
            $('#totalvme').val('');
			$('#carga_fatorial1').val('');
			$('#variancia_erro1').val('');
			$('#cf_quadrado1').val('');
		},

        /*----------------------- CALCULOS --------------------------------*/

        //função para cálculo de cada linha (Carga Fatorial, Variância de erro e CF-quadrado)
		calcular_linha: function(numero_Linha){
            //variáveis que recebem o elemento Carga Fatorial, variância de erro, carga fatorial ao quadrado
			var carga_fatorial = document.getElementById('carga_fatorial' + numero_Linha);
            var variancia_erro = document.getElementById('variancia_erro' +numero_Linha);
            var cf_quadrado = document.getElementById('cf_quadrado' + numero_Linha);

			//se o campo CF for vazio ou conter apenas o ponto, os campos de variância de erro e CF-quadrado ficarão vazios
            if((carga_fatorial.value === '') || (carga_fatorial.value === '.')){
				variancia_erro.value = '';
				cf_quadrado.value = '';
			}
			else{
				lambda = parseFloat(carga_fatorial.value); //recebe o campo de Carga Fatorial (λ)
				variancia_erro.value = (1 - Math.pow(lambda, 2)).toFixed(4); //calcula o erro de mensuração (ɛ=1-λ²)
				cf_quadrado.value = Math.pow(lambda, 2).toFixed(4); //calcula a carga fatorial ao quadrado com base na Carga Fatorial (r²=λ²=1-ɛ)
			}
		},

        //FUNÇÃO CALCULAR CC
		calcTotalCC: function(){
			var soma_CF = 0, soma_CF_exp = 0, soma_erro_var = 0, calculo_cc = 0, linhaCont, CF;
			for(linhaCont = CALC.numItemLinhas(); linhaCont >= 1; linhaCont--){
                //recebe o item do campo carga fatorial e converte para float
				CF = parseFloat(document.getElementById('carga_fatorial' + linhaCont).value);
				if(!isNaN(CF)){
                    // soma as cargas fatoriais
					soma_CF += parseFloat(document.getElementById('carga_fatorial' + linhaCont).value);
					// calcula o quadrado das cargas fatoriais
                    soma_CF_exp = Math.pow(soma_CF, 2);
                    //soma dos erros de mensuração
					soma_erro_var += parseFloat(document.getElementById('variancia_erro' + linhaCont).value);
					/*o calculo da CC recebe a soma das cargas fatoriais elevada ao quadrado (soma_CF_exp), dividido pelo denominador
					somatório da soma das cargas fatoriais elevada ao quadrado com soma dos erros de mensuração */
					calculo_cc = soma_CF_exp / (soma_CF_exp + soma_erro_var)
				}
			}
			//O campo total CC recebe o resultado da equação acima
			if (calculo_cc === 0.0) {
				//se o resultado do calculo for zero, o campo total será vazio
				document.getElementById('totalcc').value = ''
			} else {
				//senão o campo total receberá o cálculo da CC
				document.getElementById('totalcc').value =  calculo_cc.toFixed(4)
			}


		},


        //FUNÇÃO CALCULAR VME
        calcTotalVme: function(){
			var exp_CF_soma = 0, soma_erro_var = 0, calculo_vme = 0, linhaCont, CF;
			for(linhaCont = CALC.numItemLinhas(); linhaCont >= 1; linhaCont--){
                //recebe o item do carga fatorial e converte para float
				CF = parseFloat(document.getElementById('carga_fatorial' + linhaCont).value);
				if(!isNaN(CF)){
                    // calcula o quadrado das cargas fatoriais e depois soma
					exp_CF_soma += Math.pow(CF, 2);
                    //soma dos erros de mensuração
                    soma_erro_var += parseFloat(document.getElementById('variancia_erro' + linhaCont).value);
                    /*o calculo da VME recebe a soma do quadrado das cargas fatoriais (exp_CF_soma), dividido pelo denominador
					somatório da soma do quadrado das cargas fatoriais com soma dos erros de mensuração */
					calculo_vme = exp_CF_soma / (exp_CF_soma + soma_erro_var)
				}
			}
            //O campo total VME recebe o resultado da equação
			if (calculo_vme === 0.0) {
				//se o resultado do calculo for zero, o campo total será vazio
				document.getElementById('totalvme').value = ''
			} else {
				//senão o campo total receberá o cálculo da VME
				document.getElementById('totalvme').value =  calculo_vme.toFixed(4)
			}

		},
	};

	$('#adicionar').click(CALC.adicionar_linha); //chama a função adicionar linha quando clica no botão  adicionar
	$('input.carregando').keyup(CALC.onkeyup).attr("autocomplete", "off"); //Desabilitando o autocompletar
	$('.remover_botao').click(CALC.botao_excluir); //chama a função deletar linha quando clica no botão remover
	$('#btn_limpar').click(CALC.limpar_campos); //chama a função para reseter o formulário quando clica no botão limpar

});
