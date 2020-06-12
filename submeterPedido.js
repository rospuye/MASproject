function validaFormulario(){
    console.log("CALL: validaFormulario()...");

    var dataInicio = document.getElementById("datepicker").value.trim();
    var dataTermino = document.getElementById("datepicker2").value.trim();
    var lotacao = document.getElementById("lotacao").value.trim();
    var localizacao = document.getElementById("localizacao").value.trim();
    var descricaoPedido = document.getElementById("descricao").value.trim();
    var orcamento = document.getElementById("orcamento").value.trim();

    var dataInicio_error = document.getElementById("dataInicio_Error");
    var dataTermino_error = document.getElementById("dataTermino_Error");
    var lotacao_error = document.getElementById("lotacao_Error");
    var localizacao_error = document.getElementById("localizacao_Error");
    var descricao_error = document.getElementById("descricao_Error");
    var orcamento_error = document.getElementById("orcamento_Error");
    var option1_error = document.getElementById("option1_Error");
    var option2_error = document.getElementById("option2_Error");
    var option3_error = document.getElementById("option3_Error");
    var option4_error = document.getElementById("option4_Error");
    var option5_error = document.getElementById("option5_Error");
    var option6_error = document.getElementById("option6_Error");
    var option7_error = document.getElementById("option7_Error");
    var detalhes1_error = document.getElementById("detalhes1_Error");
    var detalhes2_error = document.getElementById("detalhes2_Error");
    var detalhes3_error = document.getElementById("detalhes3_Error");
    var detalhes4_error = document.getElementById("detalhes4_Error");
    var detalhes5_error = document.getElementById("detalhes5_Error");
    var detalhes6_error = document.getElementById("detalhes6_Error");
    var detalhes7_error = document.getElementById("detalhes7_Error");

    var options = [];
    var detalhes = [];
    for (i=0; i<7; i++){
        if (document.getElementById("option" + (i+1).toString() + "sim").checked==true){
            options[i] = "sim";
            detalhes[i] = document.getElementById("detalhes" + (i+1).toString()).value.trim();
        }
        else{
            if (document.getElementById("option" + (i+1).toString() + "nao").checked==true){
                options[i] = "nao";
                detalhes[i] = "";
            }
            else{
                options[i] = "erro";
                detalhes[i] = "";
            }
        }
    }

    var value = true;
        
    cleanErrorMessages();

    if (dataInicio==""){
        dataInicio_error.style.display = "block";
        value = false;
    }
    if (dataTermino==""){
        dataTermino_error.style.display = "block";
        value = false;
    }
    if ((!allNumber(lotacao)) || lotacao==null){
        lotacao_error.style.display = "block";
        value = false;
    }
    if (localizacao.length<5){
        localizacao_error.style.display = "block";
        value = false;
    }
    if (descricaoPedido.length<30){
        descricao_error.style.display = "block";
        value = false;
    }
    if ((!allNumber(orcamento)) || lotacao==null){
        orcamento_error.style.display = "block";
        value = false;
    }
    for (i=0; i<7; i++){
        if (options[i]=="erro"){
            document.getElementById("option" + (i+1).toString() + "_Error").style.display = "block";
            value = false;
        }
        else if (options[i]=="sim" && detalhes[i]<30){
            document.getElementById("detalhes" + (i+1).toString() + "_Error").style.display = "block";
            value = false;
        }
    }

    if (value==true){

        // reset form
        document.getElementById("form_pedido").reset();


        // inserir novo pedido na local storage
        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);
            if (item.includes('"tipo":"login"')){
                var indexArray = [];
                var indexArray2 = [];

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }
                var firstName = item.substring(indexArray[0]+2,indexArray2[0]-1);
                var lastName = item.substring(indexArray[1]+2,indexArray2[1]-1);
                var ID = item.substring(indexArray[5]+2,indexArray2[5]-1);

                n =  new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                var dataSubmissao = d + "/" + m + "/" + y;

                var horaSubmissao = new Date().toLocaleTimeString();

                var submissaoPedido = { 'firstName': firstName,
                                        'lastName': lastName,
                                        'ID': ID,
                                        'date': dataSubmissao,
                                        'time': horaSubmissao,
                                        'dataInicio': dataInicio,
                                        'dataTermino': dataTermino,
                                        'lotacao': lotacao,
                                        'localizacao': localizacao,
                                        'orcamento': orcamento,
                                        'areasAtuacao': options,
                                        'descricoesAreasAtuacao': detalhes,
                                        'tipo': 'pedido',
                                        'estado': 'porconfirmar',
                                        'descricaoPedido': descricaoPedido};

                var numeroPedido = 0;
                for (i=0; i<localStorage.length; i++){
                    var item = localStorage.getItem(localStorage.key(i));
                    var itemName = localStorage.key(i);
                    if (item.includes('"tipo":"pedido"')){
                        if (itemName.includes('submissaoPedido/Cliente')){
                            if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroPedido){
                                numeroPedido = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                            }
                        }
                    }
                }
                if (numeroPedido==0){
                    localStorage.setItem('submissaoPedido/Cliente' + ID + '/nº1', JSON.stringify(submissaoPedido));
                    var retrievedObject = localStorage.getItem('submissaoPedido/Cliente' + ID + '/nº1');
                    console.log('submissaoPedido/Cliente' + ID + '/nº1', JSON.parse(retrievedObject));
                }
                else{
                    localStorage.setItem('submissaoPedido/Cliente' + ID + '/nº' + numeroPedido, JSON.stringify(submissaoPedido));
                    var retrievedObject = localStorage.getItem('submissaoPedido/Cliente' + ID + '/nº' + numeroPedido);
                    console.log('submissaoPedido/Cliente' + ID + '/nº' + numeroPedido, JSON.parse(retrievedObject));
                }
            }
        }
        alert("Pedido submetido!");
    }
}

function allNumber(inputtxt){
    var numbers = /^\d+$/;
    if(inputtxt.match(numbers)){
        return true;
    }
    else{
        return false;
    }
}

function cleanErrorMessages(){
    dataInicio_Error.style.display = "none";
    dataTermino_Error.style.display = "none";
    lotacao_Error.style.display = "none";
    localizacao_Error.style.display = "none";
    descricao_Error.style.display = "none";
    orcamento_Error.style.display = "none";
    option1_Error.style.display = "none";
    option2_Error.style.display = "none";
    option3_Error.style.display = "none";
    option4_Error.style.display = "none";
    option5_Error.style.display = "none";
    option6_Error.style.display = "none";
    option7_Error.style.display = "none";
    detalhes1_Error.style.display = "none";
    detalhes2_Error.style.display = "none";
    detalhes3_Error.style.display = "none";
    detalhes4_Error.style.display = "none";
    detalhes5_Error.style.display = "none";
    detalhes6_Error.style.display = "none";
    detalhes7_Error.style.display = "none";
}