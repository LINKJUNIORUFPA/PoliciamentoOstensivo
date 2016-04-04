function errorDBSalvarOcorrencia(tx, err) {
    navigator.notification.alert('Problema ao salvar Ocorrencia!', null, 'Erro!', 'OK');
    console.log("Error processing SQL: "+ JSON.stringify(err));
}



/* Vamos precisar desta parte para o histórico ------->>

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
*/

function SalvarOcorrencia() {
    
    var tipo = $('#inputtipo_oc').val();
    var momento = $('#inputmomento_oc').val();
    var data = $('#inputdata_oc').val();
    var hora = $('#inputhora_oc').val();
    var desc = $('#inputdesc_oc').val();
    var evidencia = $('#inputevidencia_oc').val();
    var localiz = $('#inputlocaliz_oc').val();
    var anonimato = $('#inputanonimato_oc').val();
    var notif = $('#inputnotif_oc').val();
    
    if((tipo !== '') && (momento !== '') && (data !== '') && (hora !== '') && (localiz !== '') && (anonimato !== '')){
        
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Ocorrencia (id, tipo_oc, momento_oc, data_oc, hora_oc, desc_oc, evidencia_oc, localiz_oc, anonimato_oc, notif_oc) VALUES (?,?,?,?,?,?,?,?,?,?)", [localStorage.getItem("id"), tipo_oc, momento_oc, data_oc, hora_oc, desc_oc, evidencia_oc, localiz_oc, anonimato_oc, notif_oc, "Nao Enviado"], function(tx, res) {
            
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
        navigator.notification.alert('Preencha os campos Tipo de Ocorrencia, Momento, Data, Hora, Localizacao da Ocorrencia e Anonimato da Denuncia!', null, 'Campos em branco!', 'OK');
    }
}
