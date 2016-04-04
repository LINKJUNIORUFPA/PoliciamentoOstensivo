var dbNome = "appost.db";
var dbVersao = "1.0";
var dbDescricao = "Appost DB";
var dbSize = 50*1024*1024;

var db = null;

$(document).ready(function () { 
    
    db = window.sqlitePlugin.openDatabase({name: dbNome});
    db = window.openDatabase( dbNome, dbVersao, dbDescricao, dbSize);
    db.transaction(function(tx) {
    
        tx.executeSql('CREATE TABLE IF NOT EXISTS Usuario (CPF_Usuario TEXT PRIMARY KEY, Nome_Usuario TEXT, Telefone_Usuario TEXT, Email_Usuario TEXT, Senha_Usuario TEXT, Login_Usuario TEXT'); 
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS Ocorrencia (id_Ocorrencia INTEGER PRIMARY KEY AUTOINCREMENT, Tipo_Ocorrencia TEXT, Data_Ocorrencia DATE, Hora_Ocorrencia TIME, Descricao_Ocorrencia TEXT, Latitude_Ocorrencia TEXT, Longitude_Ocorrencia TEXT, Anonimato_Ocorrencia BOOLEAN, Notificacoes_Ocorrencia BOOLEAN'); 
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS Evidencia (id_Evidencias INTEGER PRIMARY KEY, Tipo_Evidencia TEXT, Arquivo_Evidencia BLOB, NomeArquivo_Evidencia TEXT'); 
              
        
    }, function(err) {
        console.log('Open database ERROR: ' + JSON.stringify(err));
    });
});