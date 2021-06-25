$(function(){
	var ECF = {
		addRow: function(){
			var rowCount = ECF.numItemRows(), row = ECF.itemListTbody.insertRow(rowCount), cell, input;
			rowCount++;
			row.className = 'item_row';
			row.id = 'item_row' + rowCount;
			input = $('<input class="item form-control" readonly="readonly" type="text" id="itemno' + rowCount + '" name="itemno' + rowCount + '" value="' + rowCount + '">');
			$(row.insertCell()).addClass('item_column').append(input);
			input = $('<input class="loading form-control" type="text" id="sl' + rowCount + '" name="sl' + rowCount + '" placeholder="Digite Aqui">');
			input.keyup(ECF.onkeyup).attr("autocomplete", "off");;
			ECF.initPlaceHolder(input);
			$(row.insertCell()).addClass('loading_column').append(input);
			input = $('<input class="errorvar form-control"  readonly="readonly" type="text" id="ev' + rowCount + '"name="ev' + rowCount + '">');
			$(row.insertCell()).addClass('error_column').append(input);
			input = $('<input class="rsquare form-control"  readonly="readonly" type="text" id="rs' + rowCount + '"name="rs' + rowCount + '">');
			$(row.insertCell()).addClass('rsquare_column').append(input);
			input = $('<input type="button"  readonly="readonly" class="removebutton" name="del_row' + rowCount + '" value="Excluir" id="del_row' + rowCount + '">');
			input.click(ECF.onclickDeleteButton);
			$(row.insertCell()).addClass('button_column').append(input);
			$(row).children('input[type="text"]').attr("autocomplete", "off");
		},
        //função para cálculo de cada linha (Carregamento Padronizado, erro de mensuração e R-quadrado)
		calcRow: function(rowNumber){
			var sl = document.getElementById('sl' + rowNumber), ev = document.getElementById('ev' +rowNumber), rs = document.getElementById('rs' + rowNumber), qty;
			if((sl.value === '') || (sl.value === '.')){
				ev.value = '';
				rs.value ='';
			}
			else{
				qty = parseFloat(sl.value); //recebe o campo de carregamento padronizado
				ev.value = (1 - (qty * qty)).toFixed(3); //erro de mensuração
				rs.value = (qty * qty).toFixed(3); //R-Quadrado
			}
		},
		calcTotal: function(){
			var sumsl = 0, sumslsq = 0, sumevar = 0, denominator = 0, comprel = 0, rowcount, s1Val;
			for(rowcount = ECF.numItemRows(); rowcount >= 1; rowcount--){
				s1Val = parseFloat(document.getElementById('sl' + rowcount).value);
				if(!isNaN(s1Val)){
                    // calcula o quadrado das cargas fatoriais e depois soma
					sumslsq += parseFloat(document.getElementById('sl' + rowcount).value) * parseFloat(document.getElementById('sl' + rowcount).value);
					//soma dos erros de mensuração
                    sumevar += parseFloat(document.getElementById('ev' + rowcount).value);
                    //recebe a soma das cargas fatoriais elevada ao quadrado + soma dos erros de mensuração
					denominator = sumslsq + sumevar;
                    //VME = soma das cargas fatoriais ao quadrado dividido pelo denominador acima
					comprel = sumslsq / denominator;
				}
			}
			document.getElementById('total').value = (comprel === 0.0 ? '' : comprel.toFixed(3));
			return true;
		},
		form: document.getElementById('energyCalculator'),
		getRowNo: function(item){
			return typeof item === 'number' ? item : $(item).parents('tr')[0].rowIndex;
		},
		initPlaceHolder: function(input){
			$(input).focus(function (){$(this).attr('placeholder','');}).blur(function(){$(this).attr('placeholder','Digite Aqui')});
		},
		isNumberKey: function(evt){
			var charCode = (evt.which) ? evt.which : event.keyCode
			return !(charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46);
		},
		itemListTbody: document.getElementById('itemlist'),
		numItemRows: function(){return ECF.itemListTbody.rows.length;},
		onclickDeleteButton: function (evt){
			evt = evt || window.event;
			var targ = evt.target || evt.srcElement;
			ECF.removeRow(targ);
		},
		onkeyup: function(evt){
			var targ = evt.target || evt.srcElement;
			if(targ.nodeName && (targ.nodeName.toLowerCase() === 'input')){
				while((targ.value !== '') && (targ.value.match(/^[\d]*\.?[\d]*$/) === null)){targ.value = targ.value.substring(0,targ.value.length - 1);}
				ECF.calcRow(ECF.getRowNo(targ));
				ECF.calcTotal();
			}
		},
		removeRow: function(item){
			$('#item_row' + ECF.getRowNo(item)).remove();
			ECF.renumberRows();
			ECF.calcTotal();
		},
		renumberRows: function(){
			var rowCount = rowCount = ECF.numItemRows(), rowIndex, row, cellIndex, cell, childIndex, child, rowNum;
			for(rowIndex = 1; rowIndex < rowCount; rowIndex++){
				rowNum = rowIndex + 1;
				row = ECF.itemListTbody.rows[rowIndex];
				row.id = 'item_row' + rowNum;
				for(cellIndex = 0; cellIndex < row.cells.length; cellIndex++){
					cell = row.cells[cellIndex];
					for(childIndex = 0; childIndex < cell.childNodes.length; childIndex++){
						child = cell.childNodes[childIndex];
						if(child.tagName && (child.tagName.toLowerCase() === 'input') && child.className){
							switch(child.className.toLowerCase()){
								case 'item':
									child.id = 'itemno' + rowNum;
									child.name = child.id;
									child.value = rowNum;
								break;
								case 'loading':
									child.id = 'sl' + rowNum;
									child.name = child.id;
								break;
								case 'errorvar':
									child.id = 'ev' + rowNum;
									child.name = child.id;
								break;
								case 'rsquare':
									child.id = 'rs' + rowNum;
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
		resetForm: function(){
			var rowNumber;
			for(rowNumber = ECF.itemListTbody.rows.length; rowNumber > 1; rowNumber--){ECF.removeRow(rowNumber);}
			$('#total').val('');
			$('#sl1').val('');
			$('#ev1').val('');
			$('#rs1').val('');
		}
	};

	$('#additem').click(ECF.addRow);
	$('input.loading').keyup(ECF.onkeyup).attr("autocomplete", "off");
	ECF.initPlaceHolder($('input.loading'));
	$('.removebutton').click(ECF.onclickDeleteButton);
	$('#FormRefresh').click(ECF.resetForm);

	// This where you can set the focus to the first sl field onload
	$('#sl1').focus();
});
