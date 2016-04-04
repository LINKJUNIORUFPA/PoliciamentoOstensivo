/*function errorDBSalvar(tx, err) {
    navigator.notification.alert('Problema ao salvar Dados!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBFavoritar(tx, err) {
    console.log("Error processing SQL: "+ JSON.stringify(err));
}
function errorDBListar(tx, err) {
    console.log("Error processing SQL: "+ JSON.stringify(err));
}

function getForunsURL(){
    
    /*
    
var cpf_cad = $('#cpfcad').val();
var nome_cad = $('#nomecad').val();
var tel_cad = $('#telcad').val();
var email_cad = $('#emailcad').val();
var hora_oc = $('#horaoc').val();
var desc_oc = $('#descoc').val();
var evidencia_oc = $('#evidenciaoc').val();
var localiz_oc = $('#localizoc').val();
var anonimato_oc = $('#anonimatooc').val();
var notif_oc = $('#notifoc').val();
    */
    
    
   /* $.getJSON(urlTodosForuns, function(data){
    
        console.log(data);
		
        if(data.length > 0){
			
			 db.transaction(function(tx) {
                 for(var i=0; i<data.length; i++) {
                    var id = data[i].id; 
                    var assunto = data[i].assunto; 
                    var descricao = data[i].descricao; 
                    var ativo = data[i].ativo; 
                    var dataDeCriacaoFormatada = data[i].dataDeCriacaoFormatada; 
                    var numMensagens = data[i].numMensagens; 
                    var numParticipantes = data[i].numParticipantes;
                    var apagavel = data[i].apagavel; 
                    var tipo = data[i].tipo; 

                    tx.executeSql("INSERT OR REPLACE INTO forum (idforum, assunto, descricao, ativo, datadecriacaoformatada, nummensagens, numparticipantes, apagavel, tipo) VALUES (?,?,?,?,?,?,?,?,?)", [id, assunto, descricao, ativo, dataDeCriacaoFormatada, numMensagens, numParticipantes, apagavel, tipo], function(tx, res) {
                        console.log("INSERT forum");
                    });

                }
                 
                 listForuns();
                 
             }, errorDBSalvarForum);  

		}
        else {
            $("#idListForuns").empty();
            $("#idListForuns").append('<p align="center" style="margin-top:10px;">Você não tem fóruns!</p>');
        }

    }).fail(function() {     
        navigator.notification.alert('Verifique sua conexão e tente novamente!', null, 'Problemas de conexão!', 'OK');   
    });    
}


function getForunsRefreshURL($scope){
    
    
    
    
    $.getJSON(urlTodosForuns, function(data){
    
        console.log(data);
		
        if(data.length > 0){
			
			 db.transaction(function(tx) {
                 for(var i=0; i<data.length; i++) {
                    var id = data[i].id; 
                    var assunto = data[i].assunto; 
                    var descricao = data[i].descricao; 
                    var ativo = data[i].ativo; 
                    var dataDeCriacaoFormatada = data[i].dataDeCriacaoFormatada; 
                    var numMensagens = data[i].numMensagens; 
                    var numParticipantes = data[i].numParticipantes;
                    var apagavel = data[i].apagavel; 
                    var tipo = data[i].tipo; 

                    tx.executeSql("INSERT OR REPLACE INTO forum (idforum, assunto, descricao, ativo, datadecriacaoformatada, nummensagens, numparticipantes, apagavel, tipo) VALUES (?,?,?,?,?,?,?,?,?)", [id, assunto, descricao, ativo, dataDeCriacaoFormatada, numMensagens, numParticipantes, apagavel, tipo], function(tx, res) {
                        console.log("INSERT forum");
                    });

                }
                 
                 listForuns();
                 
             }, errorDBSalvarForum);  
            
		}
        else {
            $("#idListForuns").empty();
            $("#idListForuns").append('<p align="center" style="margin-top:10px;">Você não tem fóruns!</p>');
        }

    }).fail(function() {     
        navigator.notification.alert('Verifique sua conexão e tente novamente!', null, 'Problemas de conexão!', 'OK');      
    }).always(function() {
        $scope.$broadcast('scroll.refreshComplete');
    });
    
}

function listForuns() {

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM forum', [], function(tx, results){  

            $("#LINKDOIDO").empty();
            $("#idListForuns").empty();
            
            var list = "";
            
            console.log("LISTING FORUM");
            
            for(var i=0; i<results.rows.length; i++) {

                if(results.rows.item(i).ativo==="true"){ 
                    list += '<a onclick="setValueDetalhesForum(\''+ results.rows.item(i).idforum +'\',\''+ results.rows.item(i).assunto +'\',\''+ results.rows.item(i).descricao +'\',\''+ results.rows.item(i).datadecriacaoformatada +'\',\''+ results.rows.item(i).nummensagens +'\',\''+ results.rows.item(i).numparticipantes +'\');" class="item item-thumbnail-left espacoListaForuns" href="#app/forum/detalhesforum">'+
                            '<img class="invisivel">'+
                            '<h2 class="listasUl">'+ results.rows.item(i).assunto +'</h2> '+
                            '<p class="listasUl">Descrição: '+ results.rows.item(i).descricao +'</p> '+
                        '</a>';
                }
            } 
             
            $("#idListForuns").append(list);

        }, errorDBListarForuns);
    });  

}


function listForunsFavoritos() {

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM forum', [], function(tx, results){  
           
            $("#idListForunsFavoritos").empty();
            
            var list = "";
            
            for(var i=0; i<results.rows.length; i++) {
                if(results.rows.item(i).favorito === 1){ 

                    list += '<a onclick="setValueDetalhesForum(\''+ results.rows.item(i).id +'\',\''+ results.rows.item(i).titulo +'\',\''+ results.rows.item(i).proposta +'\',\''+ results.rows.item(i).datacriacao +'\',\''+ results.rows.item(i).foto +'\',\''+ results.rows.item(i).favorito +'\');" class="item item-thumbnail-left" href="#app/forum/detalhesforum"> <img src="'+ results.rows.item(i).foto +'"> <h2 class="listasUl">'+ results.rows.item(i).titulo +' <i class="fa fa-heart iconFavorito" style="float: right;"></i></h2> <p class="listasUl">Temática: '+ results.rows.item(i).tematica +' <br/>Propósito: '+ results.rows.item(i).proposta +'</p> </a>';
        
                }
            } 
    
	       $("#idListForunsFavoritos").append(list);

        }, errorDBListarForuns);
    });  
}


function setValueDetalhesForum(id, assunto, descricao, dataDeCriacaoFormatada, numMensagens, numParticipantes){
    console.log("Setando idForum "+id);
    localStorage.setItem("idForum", id);
    localStorage.setItem("assuntoForum", assunto);
    localStorage.setItem("descricaoForum", descricao);
    localStorage.setItem("dataDeCriacaoFormatadaForum", dataDeCriacaoFormatada);  
    localStorage.setItem("numMensagensForum", numMensagens);
    localStorage.setItem("numParticipantesForum", numParticipantes); 
}



function getValueDetalhesForum(){
   // $('#idFotoDetalhesForum').attr("src", localStorage.getItem("fotoForum"));
        
    $('#idAssuntoDetalhesForum').empty();
    $('#idAssuntoDetalhesForum').append(localStorage.getItem("assuntoForum"));
        
	$('#idDataDeCriacaoFormatada').empty();
    $('#idDataDeCriacaoFormatada').append(localStorage.getItem("dataDeCriacaoFormatadaForum"));
		
    $('#idNumParticipantesForum').empty();
    $('#idNumParticipantesForum').append(localStorage.getItem("numParticipantesForum"));
	
	$('#idNumMensagensForum').empty();
    $('#idNumMensagensForum').append(localStorage.getItem("numMensagensForum"));
        
    $('#idDescricaoForum').empty();
    $('#idDescricaoForum').append(localStorage.getItem("descricaoForum"));
    
   /* if(localStorage.getItem("favoritoForum") === '1') {
        $('#idBtnFavoritarForum').removeClass('fa fa-heart-o');
        $('#idBtnFavoritarForum').addClass('fa fa-heart iconCorVermelho');
    }
    else {
        $('#idBtnFavoritarForum').removeClass('fa fa-heart iconCorVermelho');
        $('#idBtnFavoritarForum').addClass('fa fa-heart-o');
        
    }*/
}
/*

function getIconForum(tipo) {
    console.log(" BUSCANDO ICONE" +tipo);
    if(tipo === 'SEGURANCA' )
    {
        return 'fa-stethoscope';
    }else if(tipo === 'EDUCACAO' )
    {
        return 'fa-graduation-cap';
    }else if(tipo === 'SEGURANCA' )
    {
        return 'fa-lock';
    }else if(tipo === 'SUSTENTABILIDADE' )
    {
        return 'fa-recycle';
    }else {
        return 'fa-comments-o';
    }
}



function favoritarForum() {
    db.transaction(function(tx) {
        tx.executeSql("SELECT favorito FROM forum WHERE id=?", [localStorage.getItem("idForum")], querySetFavorito, errorDBFavoritarForum);

    }, errorDBFavoritarForum);
}

function querySetFavorito(tx, results) {
    
    if(results.rows.item(0).favorito === 1){        
        tx.executeSql("UPDATE forum SET favorito = ? WHERE id = ?", [0, localStorage.getItem("idForum")]);
        
        $('#idBtnFavoritarForum').removeClass('fa fa-heart iconCorVermelho');
        $('#idBtnFavoritarForum').addClass('fa fa-heart-o');
    } 
    else{          
        tx.executeSql("UPDATE forum SET favorito = ? WHERE id = ?", [1, localStorage.getItem("idForum")]); 
        
        $('#idBtnFavoritarForum').removeClass('fa fa-heart-o');
        $('#idBtnFavoritarForum').addClass('fa fa-heart iconCorVermelho');
    }
    
    
    setTimeout(function() {
        listForuns();
        listForunsFavoritos();
    }, 400);
}