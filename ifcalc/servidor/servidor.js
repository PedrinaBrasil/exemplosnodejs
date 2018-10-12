//Importa o módulo http (padrao)
var http = require("http");
//Cria o servidor recebendo req e enviando resp (padrao)
var servidor = http.createServer(
	function(req, resp){
		//Configurações do cabecalho da msg resp (padrao)
		resp.writeHead(200,{
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});	
		//Cria variaveis para armazenar os valores a ser calculados
		var _media = 0;
		var _situacao = '';

		//Define evento para quando a requisição receber os dados (padrao)
		req.on('data', function (data) {
         	//Extrai os dados da requisição e converte para json
         	json = JSON.parse(data);
         	
         	//Precisa-se converter as notas para Real
         	json.b1 = parseFloat(json.b1);
         	json.b2 = parseFloat(json.b2);
         	json.b3 = parseFloat(json.b3);
         	json.b4 = parseFloat(json.b4);
        	
        	//Calcula a media acessando os atributos do json
         	_media = (json.b1+json.b2+json.b3+json.b4)/4;
         	
         	//Verifica se _media é maior que 6.0
         	if(_media >= 6.0){
         		_situacao = "APROVADO";
         	}else if(_media <=2){
         		_situacao = "REPROVADO";
         	}else{
				_situacao = "RECUPERACAO";
         	}
        });

        //Define evento para quando terminar de ler a requisicao (padrao)
		req.on('end', function(){
			//Prepara dados de resposta como json (muda de aplicação para aplicacao)
			conteudo = {
				media: _media,
				situacao:  _situacao
			}
			//Converte conteudo para string com stringfy (padrao)
			conteudo = JSON.stringify(conteudo);
			//Escreve o conteudo na resp (padrao)
			resp.write(conteudo);
			//Finaliza a resp - enviando a msg (padrao)
			resp.end();
		});
	}
);
//Identifica a porta que o servidor vai escutar (padrao)
servidor.listen(8080, function(){
	console.log("Servidor Ativado");
});


