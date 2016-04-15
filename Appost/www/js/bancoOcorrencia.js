//function errorDBSalvarOcorrencia(tx, err) {
 //   navigator.notification.alert('Problema ao salvar Ocorrencia!', null, 'Erro!', 'OK');
//    console.log("Error processing SQL: "+ JSON.stringify(err));
//}



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
    
    var tipo = $('#inputtipooc').val();
    var momento = $('#inputmomentooc').val();
    var data = $('#inputdataoc').val();
    var hora = $('#inputhoraoc').val();
    var desc = $('#inputdescoc').val();
    var evidencia = $('#inputevidenciaoc').val();
    var localiz = $('#inputlocalizoc').val();
    var anonimato = $('#inputanonimatooc').val();
    var notif = $('#inputnotifoc').val();
    
    if((tipo !== '') && (momento !== '') && (data !== '') && (hora !== '') && (anonimato !== '')){
        
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO Ocorrencia (id, tipooc, momentooc, dataoc, horaoc, descoc, evidenciaoc, localizoc, anonimatooc, notifoc)') VALUES (?,?,?,?,?,?,?,?,?,?)", [localStorage.getItem("id"), tipooc, momentooc, dataoc, horaoc, descoc, evidenciaoc, localizoc, anonimatooc, notifoc, "Nao Enviado"], function(tx) {
            
                $('#inputtipooc').val('');
                $('#inputmomentooc').val('');
                $('#inputdataoc').val('');
                $('#inputhoraoc').val('');
                $('#inputdescoc').val('');
                $('#inputevidenciaoc').val('');
                $('#inputlocalizoc').val('');
                $('#inputanonimatooc').val('');
                $('#inputnotifoc').val('');
             
            });
        }  
    
    else {
        navigator.notification.alert('Preencha os campos Tipo de Ocorrencia, Momento, Data, Hora, Localizacao da Ocorrencia e Anonimato da Denuncia!', null, 'Campos em branco!', 'OK');
    }
}
