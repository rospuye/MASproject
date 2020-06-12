function validarMensagem(){

    var mensagem = document.getElementById("msg").value.trim();
    var mensagem_error = document.getElementById("msg_Error");

    var value = true;
        
    cleanErrorMessages();

    if (mensagem.length==0 || mensagem==null){
        mensagem_error.style.display = "block";
        value = false;
    }

    if (value==true){

        // determinar ID do organizador
        var funcID;
        for (a=0; a<localStorage.length; a++){
            var object = localStorage.getItem(localStorage.key(a));
            var objectName = localStorage.key(a);
            if (objectName.includes('receiverID')){
                funcID = object;
            }
        }

        // inserir nova mensagem na local storage
        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);
            if (item.includes('"tipo":"login"')){
                var indexArray = [];
                var indexArray2 = [];

                for (j = 0; j < item.length; j++) {
                    if (item.charAt(j)==':'){
                        indexArray.push(j);
                    }
                    if (item.charAt(j)==','){
                        indexArray2.push(j);
                    }
                }

                var clientID = item.substring(indexArray[5]+2,indexArray2[5]-1);

                n =  new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                var dataEnvio = d + "/" + m + "/" + y;
                var horaEnvio = new Date().toLocaleTimeString();

                var novaMensagem = {"dataEnvio": dataEnvio,
                                    "horaEnvio": horaEnvio,
                                    "sender": clientID,
                                    "mensagem": mensagem};

                var numeroMensagem = 0;
                for (i=0; i<localStorage.length; i++){
                    var item = localStorage.getItem(localStorage.key(i));
                    var itemName = localStorage.key(i);
                    if (itemName.includes('Mensagem/' + clientID + "/" + funcID)){
                        if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroMensagem){
                            numeroMensagem = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                        }
                    }
                }
                console.log(funcID);
                if (numeroMensagem==0){
                    localStorage.setItem('Mensagem/' + clientID + "/" + funcID + '/nº1', JSON.stringify(novaMensagem));
                    var retrievedObject = localStorage.getItem('Mensagem/' + clientID + "/" + funcID + '/nº1');
                    console.log('Mensagem/' + clientID + "/" + funcID + '/nº1', JSON.parse(retrievedObject));
                }
                else{
                    localStorage.setItem('Mensagem/' + clientID + "/" + funcID + '/nº' + numeroMensagem, JSON.stringify(novaMensagem));
                    var retrievedObject = localStorage.getItem('Mensagem/' + clientID + "/" + funcID + '/nº' + numeroMensagem);
                    console.log('Mensagem/' + clientID + "/" + funcID + '/nº' + numeroMensagem, JSON.parse(retrievedObject));
                }
            }
        }
    }
    location.reload();
}

function cleanErrorMessages() {
    msg_Error.style.display = "none";
}

function displayMensagens(){

    // determine sender and receiver data (IDs and names)
    var idF;
    var idC;
    var nomeC;
    var nomeF;
    for (a=0; a<localStorage.length; a++){
        var object = localStorage.getItem(localStorage.key(a));
        var objectName = localStorage.key(a);
        if (objectName.includes('receiverID')){
            idF = object;
        }
        if (object.includes('"tipo":"login"')){
            var indexArray = [];
            var indexArray2 = [];

            for (j = 0; j < object.length; j++) {
                if (object.charAt(j)==':'){
                    indexArray.push(j);
                }
                if (object.charAt(j)==','){
                    indexArray2.push(j);
                }
            }

            idC = object.substring(indexArray[5]+2,indexArray2[5]-1);
            nomeC = object.substring(indexArray[0]+2,indexArray2[0]-1) + " " + object.substring(indexArray[1]+2,indexArray2[1]-1);
        }
    }
    for (a=0; a<localStorage.length; a++){
        var object = localStorage.getItem(localStorage.key(a));
        var objectName = localStorage.key(a);
        if (object.includes('"tipo":"conta"') && object.includes('"ID":"' + idF + '"')){
            var indexArray = [];
            var indexArray2 = [];

            for (j = 0; j < object.length; j++) {
                if (object.charAt(j)==':'){
                    indexArray.push(j);
                }
                if (object.charAt(j)==','){
                    indexArray2.push(j);
                }
            }
            nomeF = object.substring(indexArray[0]+2,indexArray2[0]-1) + " " + object.substring(indexArray[1]+2,indexArray2[1]-1);
        }
    }
    
    var titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";
    titleDiv.className = "titleDiv";
    titleDiv.style = "line-height: 10px; background-color: #6d158f; padding-top: 60px!important; padding-bottom: 20px; padding-top: 20px; color: #cb98e9; text-align: center; font-weight: bold; font-family: amaranth; font-size: 35px; text-shadow: 2px 2px 1px #3c0750;";
    var titleSpan = document.createElement("span");
    titleSpan.innerText = "Conversa com " + nomeF;
    titleDiv.appendChild(titleSpan);
    var currentDiv2 = document.getElementById("mensagensAqui"); 
    document.body.insertBefore(titleDiv, currentDiv2);

    var numMsgs = 0;
    for (a=0; a<localStorage.length; a++){
        var objectName = localStorage.key(a);
        if (objectName.includes('Mensagem/' + idC + "/" + idF)){
            numMsgs++;
        }
    }
    for (i=0; i<=numMsgs; i++){
        for (a=0; a<localStorage.length; a++){
            var object = localStorage.getItem(localStorage.key(a));
            var objectName = localStorage.key(a);
            if (objectName == ('Mensagem/' + idC + "/" + idF + '/nº' + i)){
                // the sender is the client
                if (object.includes('"sender":"' + idC + '"')){

                    var newDiv = document.createElement("div");
                    newDiv.id = "caixaMsg" + numMsgs;
                    newDiv.className = "caixaMsg";
                    newDiv.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 50%; margin-bottom: 2%; margin-top: 1%; padding: 2%";

                    var title = document.createElement("h5");
                    title.style = "padding-bottom: 2%;";
                    title.innerText = nomeC.toLowerCase() + " (eu)";
                    newDiv.appendChild(title);

                    var p1 = document.createElement("p");   
                    p1.id = "msg" + numMsgs;
                    p1.className = "msg";
                    p1.innerText = object.substring(78, object.length-2);
                    newDiv.appendChild(p1);

                    var p2 = document.createElement("p");   
                    p2.id = "dataHora" + numMsgs;
                    p2.className = "dataHora";
                    p2.innerText = object.substring(14,23) + " " + object.substring(38,46);
                    p2.style = "font-size: 70%; text-align: right;";
                    newDiv.appendChild(p2);

                    var currentDiv = document.getElementById("mensagensAqui"); 
                    document.body.insertBefore(newDiv, currentDiv);

                }
                // the sender is the employee
                else{

                    var newDiv = document.createElement("div");
                    newDiv.id = "caixaMsg" + numMsgs;
                    newDiv.className = "caixaMsg";
                    newDiv.style = "display: block; background-color: #6d158f; margin-left: 50%; margin-right: 10%; margin-bottom: 2%; margin-top: 1%; padding: 2%";

                    var title = document.createElement("h5");
                    title.style = "padding-bottom: 2%; color: white;";
                    title.innerText = nomeF.toLowerCase() + " (organizador)";
                    newDiv.appendChild(title);

                    var p1 = document.createElement("p");   
                    p1.id = "msg" + numMsgs;
                    p1.className = "msg";
                    p1.innerText = object.substring(78, object.length-2);
                    p1.style = "color: white;";
                    newDiv.appendChild(p1);

                    var p2 = document.createElement("p");   
                    p2.id = "dataHora" + numMsgs;
                    p2.className = "dataHora";
                    p2.innerText = object.substring(14,23) + " " + object.substring(38,46);
                    p2.style = "font-size: 70%; color: white; text-align: right;";
                    newDiv.appendChild(p2);

                    var currentDiv = document.getElementById("mensagensAqui"); 
                    document.body.insertBefore(newDiv, currentDiv);

                }
            }
        }
    }
}