//window.addEventListener('Load', carregado);

var dbNome = 'appost.db';
var dbVersao = '1.0';
var dbDescricao = 'Appost DB';
var dbSize = 50*1024*1024;


    db = window.openDatabase(dbNome, dbVersao, dbDescricao, dbSize);
    db.transaction(function (tx) {
		
       

        tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (cpf NUMBER PRIMARY KEY, nome TEXT, telefone TEXT, email TEXT,  login TEXT, senha TEXT)');

        tx.executeSql('CREATE TABLE IF NOT EXISTS ocorrencia (idocorrencia INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT, momento TEXT, endereco TEXT, data DATE, hora TIME, descricao TEXT, anonimato BOOLEAN, notificacoes BOOLEAN)');

        tx.executeSql('CREATE TABLE IF NOT EXISTS evidencia (id_Evidencias INTEGER PRIMARY KEY, tipo TEXT, Arquivo_Evidencia BLOB, NomeArquivo_Evidencia TEXT)');


    });


    // function carregado(){

    // documentElementById('env_oco').addEventListener('click',enviar);

    //}

function salvarUsuario() {

		var cpf = document.getElementById('cpfcad').value;
		var nome = document.getElementById('nomecad').value;
		var telefone = document.getElementById('telcad').value;
		var email = document.getElementById('emailcad').value;
		var login = document.getElementById('logincad').value;
		var senha = document.getElementById('senhacad').value;
		


    db.transaction(function (tx) {

        tx.executeSql("INSERT INTO usuario (cpf, nome, telefone, email,  login, senha) VALUES (?,?,?,?,?,?)",
            [cpf, nome, telefone, email,  login, senha]);
    });

}





    function salvarOcorrencia() {

        var tipo = document.getElementById('tipooc').value;
		var momento = document.getElementById('momentooc').value;
		var endereco = document.getElementById('enderecoc').value;
		var data = document.getElementById('dataoc').value;
		var hora = document.getElementById('horaoc').value;
		var descricao = document.getElementById('descoc').value;
		var anonimato = document.getElementById('anonimatooc').value;
		var notificacoes = document.getElementById('notifoc').value;
        
		
		console.log("Tipo pegando" + endereco);

        db.transaction(function (tx) {

            tx.executeSql("INSERT INTO ocorrencia ( tipo, momento, endereco, data, hora, descricao, anonimato, notificacoes) VALUES (?,?,?,?,?,?,?,?)",
                [ tipo, momento, endereco, data, hora, descricao, anonimato, notificacoes]);
        });

    }



/*var tipo = document.getElementById('tipooc').value;
    var data = document.getElementById('dataoc').value;
    var hora = document.getElementById('horaoc').value;
    var desc = document.getElementById('descoc').value;
    var anonimato = document.getElementById('anonimatooc').value;
    var notif = document.getElementById('notifoc').value;

    db.transaction(function (tx) {

        tx.executeSql('INSERT INTO Ocorrencia (Tipo_Ocorrencia, Data_Ocorrencia, Hora_Ocorrencia, Descricao_Ocorrencia, Anonimato_Ocorrencia, Notificacoes_Ocorrencia) VALUES (?,?,?,?,?,?,?,?)', [ tipo, data, hora, desc, anonimato, notif]);


        })
}*/