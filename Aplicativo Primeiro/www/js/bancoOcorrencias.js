function errorDBSalvarOcorrencia(tx, err) {
    navigator.notification.alert('Problema ao salvar Ocorrência!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}

/*function errorDBAtualizarIndicado(tx, err) {
    navigator.notification.alert('Problema ao atualizar indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}

function errorDBExcluirIndicado(tx, err) {
    navigator.notification.alert('Problema ao excluir indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}

function errorDBListarIndicados(tx, err) {
    console.log("Error processing SQL: "+ JSON.stringify(err));
}*/

function errorDBEnviarOcorrencia(tx, err) {
    navigator.notification.alert('Problema ao enviar Ocorrência!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}

/*

function listIndicacoes() {

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM indicado WHERE ideleitor = ?', [localStorage.getItem("idEleitor")], function(tx, results){  
           
            $("#idListIndicacoes").empty();
    
	       var list = " ";
            
            for(var i=0; i<results.rows.length; i++) {
                 if(results.rows.item(i).status === "Não Enviado"){
                     list += '<a onclick="setValueIndicado(\''+ results.rows.item(i).id +'\',\''+ results.rows.item(i).celular +'\',\''+ results.rows.item(i).nome +'\',\''+  results.rows.item(i).email +'\',\''+ results.rows.item(i).status +'\');" class="item item-avatar" href="#/app/indica/alterarindicado"> <img src="./images/avatar.jpg"> <h2 class="listasUl">'+ results.rows.item(i).nome +' <i class="fa fa-times-circle-o" style="float: right;"></i></h2> <p class="listasUl">'+ results.rows.item(i).status +'!</p>  </a>';
                 }

                else {
                    list += '<a onclick="setValueIndicado(\''+ results.rows.item(i).id +'\',\''+ results.rows.item(i).celular +'\',\''+ results.rows.item(i).nome +'\',\''+  results.rows.item(i).email +'\',\''+ results.rows.item(i).status +'\');" class="item item-avatar" href="#/app/indica/alterarindicado"> <img src="./images/avatar.jpg"> <h2 class="listasUl">'+ results.rows.item(i).nome +' <i class="fa fa-arrow-circle-o-up" style="float: right;"></i></h2> <p class="listasUl">'+ results.rows.item(i).status +'!</p>  </a>';
                } 
            } 
                
            $("#idListIndicacoes").append(list);

        }, errorDBListarIndicados);
    }); 
}

*/

function setValueOcorrencia(id, tipo, momento, data, hota, desc, evidencia, localiz, anonimato, notif){
    
    localStorage.setItem("idOcorrencia", id);
    localStorage.setItem("tipooc", tipo);
    localStorage.setItem("momentooc", momento);
    localStorage.setItem("dataoc", data);
    localStorage.setItem("horaoc", hora);
    localStorage.setItem("descoc", desc);
    localStorage.setItem("evidenciaoc", evidencia);
    localStorage.setItem("localizoc", localiz);
    localStorage.setItem("anonimatooc", anonimato);
    localStorage.setItem("notifoc", notif);
}


function getValueOcorrencia(){
    
    //$('#inputtipo_oc').val(localStorage.getItem("tipooc"));
    
    $('#inputdesc_oc').val(localStorage.getItem("descoc"));   
    $('#inputevidencia_oc').val(localStorage.getItem("evidenciaoc"));

    if(localStorage.getItem("tipoc") === 'Selecione:'){
        navigator.notification.alert('Selecione o Tipo da Ocorrência!', null, 'Erro!', 'OK');
        
        /*$('.btnCrud').addClass('disabled'); 
        $('.btnsEnviar').removeClass('disabled');
        $('#idTextoAlterarIndicado').addClass('invisivel');*/
        
    }
    else { 
        //alguma funçãozinha de continuar com o processo --->.
        
        $('.btnCrud').removeClass('disabled'); 
        $('.btnsEnviar').addClass('disabled');
        $('#idTextoAlterarIndicado').removeClass('invisivel');
    }    
    
    //vários outros if´s e else´s para os outros id --->
    
}



function salvarOcorrencia(ocorrencia) {
    
    var tipo = $('#inputtipo_oc').val();
    var momento = $('#inputmomento_oc').val();
    var data = $('#inputdata_oc').val();
    var hora = $('#inputhora_oc').val();
    var desc = $('#inputdesc_oc').val();
    var evidencia = $('#inputevidencia_oc').val();
    var localiz = $('#inputlocaliz_oc').val();
    var anonimato = $('#inputanonimato_oc').val();
    var notif = $('#inputnotif_oc').val();
    
    if((tipo !== '') && (momento !== '')){
        
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO ocorrencia (id, tipo_oc, momento_oc, data_oc, hora_oc, desc_oc, evidencia_oc, localiz_oc, anonimato_oc, notif_oc) VALUES (?,?,?,?,?,?,?,?,?,?)", [localStorage.getItem("id"), tipo_oc, momento_oc, data_oc, hora_oc, desc_oc, evidencia_oc, localiz_oc, anonimato_oc, notif_oc, "Não Enviado"], function(tx, res) {
            
                $('#inputtipo_oc').val('');
                $('#inputmomento_oc').val('');
                $('#inputdata_oc').val('');
                $('#inputhora_oc').val('');
                $('#inputdesc_oc').val('');
                $('#inputevidencia_oc').val('');
                $('#inputlocaliz_oc').val('');
                $('#inputanonimato_oc').val('');
                $('#inputnotif_oc').val('');
             
            });
        }, errorDBSalvarOcorrencia);   
    }
    else {
        navigator.notification.alert('Preencha os campos TELEFONE, NOME!', null, 'Campos em branco!', 'OK');
    }
}


/*function excluirIndicado() {
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM indicado WHERE id=?;", [localStorage.getItem("idIndicado")], function(tx, res) {
             setTimeout(function() {
                 
                listIndicacoes();
            }, 200);
        });
         
    }, errorDBExcluirIndicado);        
    
}


function atualizarIndicado() {
    
    var inputTelefoneIndicado = $('#inputTelefoneIndicadoB').val();
    var inputNomeIndicado = $('#inputNomeIndicadoB').val();
    var inputEmailIndicado = $('#inputEmailIndicadoB').val();
    
    if((inputTelefoneIndicado !== '') && (inputNomeIndicado !== '')){
        db.transaction(function(tx) {
            tx.executeSql("UPDATE indicado SET celular = ?, nome = ?, email = ? WHERE id = ?", [inputTelefoneIndicado, inputNomeIndicado, inputEmailIndicado, localStorage.getItem("idIndicado")], function(tx, res) {
                
                setTimeout(function() {
                  //  navigator.notification.alert('Indicado Atualizado!', null, 'Sucesso!', 'OK');
                
                    listIndicacoes();
                }, 200);
            });
        }, errorDBAtualizarIndicado);
    }
    else {
        navigator.notification.alert('Preencha os campos TELEFONE, NOME!', null, 'Campos em branco!', 'OK');
    }
}


function enviarIndicado() {
    
 /*   $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Enviando...'
    });
    */
/*    var telefone = $('#inputTelefoneIndicadoB').val();
    var nome = $('#inputNomeIndicadoB').val();
    var email = $('#inputEmailIndicadoB').val();
   
    
    if((telefone !== '') && (nome !== '')){
        
        var ideleitor = localStorage.getItem("idEleitor");
        
        $.ajax({
            type: "POST",
            url: urlConviteNovo,
            contentType: "application/x-www-form-urlencoded",
            data: {
                idEleitor: ideleitor,
                celular: telefone,
                nome: nome,
                email: email             
            },
            success: function(data){
                
                db.transaction(function(tx) {
                    tx.executeSql("UPDATE indicado SET status = ? WHERE id = ?", ['Enviado', localStorage.getItem("idIndicado")], function(tx, res) {
                         setTimeout(function() {
                            $('.btnCrud').addClass('disabled'); 
                            $('.btnsEnviar').removeClass('disabled');

                            listIndicacoes();
                        }, 200);
                    });
                }, errorDBEnviarIndicado);

            }

        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log("erro urlConviteNovo: " + err );
            
           /* $ionicPopup.alert({
                title: 'ERRO!',
                template: jqxhr.responseText
            }); */
        /*}).always(function() {
           // $ionicLoading.hide();
        });
        
    }
    
    else {
      //  $ionicLoading.hide();
        navigator.notification.alert('Preencha os campos TELEFONE, NOME!', null, 'Campos em branco!', 'OK');
    }*/

}
