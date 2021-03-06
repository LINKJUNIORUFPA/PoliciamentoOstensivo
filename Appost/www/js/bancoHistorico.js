function errorDBSalvarIndicado(tx, err) {
    navigator.notification.alert('Problema ao salvar indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBAtualizarIndicado(tx, err) {
    navigator.notification.alert('Problema ao atualizar indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBExcluirIndicado(tx, err) {
    navigator.notification.alert('Problema ao excluir indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBListarIndicados(tx, err) {
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBEnviarIndicado(tx, err) {
    navigator.notification.alert('Problema ao enviar indicado!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}



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



function setValueIndicado(id, celular, nome, email, status){
    
    localStorage.setItem("idIndicado", id);
    localStorage.setItem("celularIndicado", celular);
    localStorage.setItem("nomeIndicado", nome);
    localStorage.setItem("emailIndicado", email);
    localStorage.setItem("statusIndicado", status);  
}


function getValueIndicado(){
        
    $('#inputTelefoneIndicadoB').val(localStorage.getItem("celularIndicado"));
    $('#inputNomeIndicadoB').val(localStorage.getItem("nomeIndicado"));   
    $('#inputEmailIndicadoB').val(localStorage.getItem("emailIndicado"));

    if(localStorage.getItem("statusIndicado") === 'Enviado'){
        $('.btnCrud').addClass('disabled'); 
        $('.btnsEnviar').removeClass('disabled');
        $('#idTextoAlterarIndicado').addClass('invisivel');
    }
    else {
        $('.btnCrud').removeClass('disabled'); 
        $('.btnsEnviar').addClass('disabled');
        $('#idTextoAlterarIndicado').removeClass('invisivel');
    }    
}



function salvarIndicado(indicado) {
    
    var telefone = $('#inputTelefoneIndicado').val();
    var nome = $('#inputNomeIndicado').val();
    var email = $('#inputEmailIndicado').val();
    
    if((telefone !== '') && (nome !== '')){
        
        db.transactio(function(tx) {
            tx.executeSql("INSERT INTO indicado (ideleitor, celular, nome, email, status) VALUES (?,?,?,?,?)", 
            [localStorage.getItem("idEleitor"), telefone, nome, email, "Não Enviado"], function(tx, res) {
            
                $('#inputTelefoneIndicado').val('');
                $('#inputNomeIndicado').val('');
                $('#inputEmailIndicado').val('');
              //  setTimeout(function() {
               //     listIndicacoes();
               // }, 200);
            });
        }, errorDBSalvarIndicado);   
    }
    else {
        navigator.notification.alert('Preencha os campos TELEFONE, NOME!', null, 'Campos em branco!', 'OK');
    }
}


function excluirIndicado() {
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
    
   $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Enviando...'
    });
    
    var telefone = $('#inputTelefoneIndicadoB').val();
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
            
            $ionicPopup.alert({
                title: 'ERRO!',
                template: jqxhr.responseText
            }); *//*
        }).always(function() {
           // $ionicLoading.hide();
        });
        
    }
    
    else {
      //  $ionicLoading.hide();
        navigator.notification.alert('Preencha os campos TELEFONE, NOME!', null, 'Campos em branco!', 'OK');
    }

}
