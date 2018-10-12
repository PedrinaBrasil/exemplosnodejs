//Cria evento para quando o documento estiver pronto
$(document).ready(function(){
	//Cria evento para quando o formulario for submetido/enviado
	$("form").submit(
		//Cria reação ao evento do formulario
		function(form){
			//Previne que a página seja recarregada
			form.preventDefault();
			//cria os dados a ser enviado na msg
			json = {
				//atributo : valor
				mat: $("#mat").val(),
				b1: $("#b1").val(),
				b2: $("#b2").val(),
				b3: $("#b3").val(),
				b4: $("#b4").val()
			};
			//Chama funcao para fazer requisicao ao servidor
			ajaxCalcular(json);
		}
	);
});

function ajaxCalcular(msg){
	//Cria msg de ajax
	$.ajax({
		//define metodo de comunicacao POST para enviar os dados no corpo da msg 
		method:"POST",
		//define url (endereço) da requisição a ser feita ao servidor 
		url:"http://localhost:8080",
		//define os dados a serem enviados no corpo da msg
		data: JSON.stringify(msg),
		//define reação do cliente ao receber a resposta positiva do servidor
		success:function(resp){
			console.log(resp)
			//converte a resp para json
			json = resp;
			//Exibe caixa de alerta ao usuário, informando matricula, situacao e media do aluno
			alert("Aluno: " + msg.mat+"\nSituacao: "+ json.situacao+"\nMedia: "+json.media);
			//Reseta o formulario
			//$("form")[0].reset();
		}
	});
}