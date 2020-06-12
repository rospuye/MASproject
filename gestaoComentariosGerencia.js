var listaComentariosCliente = [];
var listaNomesComentariosCliente = [];
var aceitarComentarioCounter = 0;

function displayComentarios(){
    var nenhumComentarioFlag = 0;
    console.log("CALL: displayComentarios...");
    listaComentariosCliente = [];
    listaNomesComentariosCliente = [];

    var displayComentariosCounter = 0;
    
    // display de comentários
    var numeracaoComentarios = [];
    var comentarioCounter = 0;
    var clientIDs = [];
    var clientFirstNames = [];
    var clientLastNames = [];

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"comentário"')){
            nenhumComentarioFlag = 1;
            console.log(itemName, item);
            if (itemName.includes('submissaoComentario/Cliente')){
                comentarioCounter++;
                listaComentariosCliente.push(item);
                listaNomesComentariosCliente.push(itemName);
                var numeroComentario = comentarioCounter;
                numeracaoComentarios.push(numeroComentario);

                var clientID = itemName.substring(27,33);
                clientIDs.push(clientID);

                for (j=0; j<localStorage.length;j++){
                    var item2 = localStorage.getItem(localStorage.key(j));
                    if (item2.includes('"tipo":"conta"') && item2.includes('"ID":"' + clientID + '"')){
                        var list = [];
                        var list2 = [];
                        for (k = 0; k < item.length; k++) {
                            if (item2.charAt(k)==':'){
                                list.push(k);
                            }
                            if (item2.charAt(k)==','){
                                list2.push(k);
                            }
                        }
                        var clientFirstName = item2.substring(list[0]+2, list2[0]-1);
                        var clientLastName = item2.substring(list[1]+2, list2[1]-1)
                        clientFirstNames.push(clientFirstName);
                        clientLastNames.push(clientLastName);
                    }
                }
            }
        }
    }
    if (nenhumComentarioFlag==0){
        document.getElementById("nenhumComentario").style.display = "block";
    }
    else{
        document.getElementById("nenhumComentario").style.display = "none";
    }
    console.log(listaComentariosCliente);
    console.log("NUMERACAO COMENTARIOS", numeracaoComentarios);

    var max= 0;
    for (i=0; i<=numeracaoComentarios.length;i++){
        if (numeracaoComentarios[i]>max) {
            var max = numeracaoComentarios[i];
        }
    }

    console.log("LISTA COMENTARIOS CLIENTE:")

    for (i=0; i<max; i++){
        for (j=0; j<numeracaoComentarios.length; j++){
            console.log(i+1,numeracaoComentarios[j]);
            if ((i+1)==numeracaoComentarios[j]){
                
                console.log(item);

                var item = listaComentariosCliente[j];
                var numero = numeracaoComentarios[j];

                var indexArray = [];
                var indexArray2 = [];
                for (k = 0; k < item.length; k++) {
                    if (item.charAt(k)==':'){
                        indexArray.push(k);
                    }
                    if (item.charAt(k)==','){
                        indexArray2.push(k);
                    }
                }

                if (document.getElementById("comentario" + numero.toString())!=null){
                    var myobj = document.getElementById("comentario" + numero.toString());
                    myobj.remove();
                }

                displayComentariosCounter++;
                
                // colocar o comentário em display na página
                var newDiv = document.createElement("div");
                newDiv.id = "comentario" + numero.toString();
                newDiv.className = "comentario";
                newDiv.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 10%; margin-top: 1%; margin-bottom: 1%; padding: 2%";

                var title = document.createElement("h5");
                title.style = "padding-bottom: 2%;";
                title.innerText = "Comentário #" + displayComentariosCounter;
                newDiv.appendChild(title);

                var rowDiv3 = document.createElement("div");
                rowDiv3.className = "row";

                var p7 = document.createElement("p");
                p7.style = "padding-left: 2%; padding-right: 1%";
                var b4 = document.createElement("b");
                b4.innerText = "Submetido por: ";
                p7.appendChild(b4);
                rowDiv3.appendChild(p7);

                var p8 = document.createElement("p");   
                p8.id = "data" + numero.toString();
                p8.className = "comentariosElement";
                p8.innerText = clientFirstNames[j] + " " + clientLastNames[j];
                rowDiv3.appendChild(p8);

                newDiv.appendChild(rowDiv3);

                var rowDiv = document.createElement("div");
                rowDiv.className = "row";

                var p1 = document.createElement("p");
                p1.style = "padding-left: 2%; padding-right: 1%";
                var b1 = document.createElement("b");
                b1.innerText = "Submetido em: ";
                p1.appendChild(b1);
                rowDiv.appendChild(p1);

                var p2 = document.createElement("p");   
                p2.id = "data" + numero.toString();
                p2.className = "comentariosElement";
                p2.innerText = item.substring(indexArray[3]+2, indexArray2[3]-1);
                rowDiv.appendChild(p2);

                newDiv.appendChild(rowDiv);

                var rowDiv2 = document.createElement("div");
                rowDiv2.className = "row";

                var p3 = document.createElement("p");
                p3.style = "padding-left: 2%; padding-right: 1%";
                var b2 = document.createElement("b");
                b2.innerText = "Avaliação do serviço: ";
                p3.appendChild(b2);
                rowDiv2.appendChild(p3);

                var p4 = document.createElement("p");
                p4.id = "avaliacao" + numero.toString();
                p4.className = "comentariosElement";
                var star = "&#9733";
                var numStars = parseInt(item.substring(indexArray[4]+2, indexArray2[4]-1));
                p4.innerHTML = star.repeat(numStars);
                rowDiv2.appendChild(p4);

                newDiv.appendChild(rowDiv2);

                var p5 = document.createElement("p");
                var b3 = document.createElement("b");
                b3.innerText = "Conteúdo: ";
                p5.appendChild(b3);
                newDiv.appendChild(p5);

                var p6 = document.createElement("p");
                p6.id = "conteudo" + numero.toString();
                p6.innerText = item.substring(indexArray[5]+2, indexArray2[5]-1);
                newDiv.appendChild(p6);

                var btn = document.createElement("INPUT");
                btn.setAttribute("id", "aceitarComentario" + numero.toString());
                btn.setAttribute("type", "button");
                btn.setAttribute("value", "Aceitar Comentário");
                btn.setAttribute("class", "btn btn-light");
                btn.setAttribute("style", "margin-right: 1%")
                newDiv.appendChild(btn);

                var btn2 = document.createElement("INPUT");
                btn2.setAttribute("id", "rejeitarComentario" + numero.toString());
                btn2.setAttribute("type", "button");
                btn2.setAttribute("value", "Rejeitar Comentário");
                btn2.setAttribute("class", "btn btn-light");
                newDiv.appendChild(btn2);

                var currentDiv = document.getElementById("todosOsComentarios"); 
                currentDiv.appendChild(newDiv);

                document.getElementById("aceitarComentario" + numero.toString()).onclick = function() {aceitarComentario(listaNomesComentariosCliente[parseInt(this.id.substring(17))-1], clientIDs[parseInt(this.id.substring(17))-1])};
                document.getElementById("rejeitarComentario" + numero.toString()).onclick = function() {rejeitarComentario(listaNomesComentariosCliente[parseInt(this.id.substring(18))-1])};
                break;
            }            
        }
    }
    console.log("COMPRIMENTO DA LISTA:", listaComentariosCliente.length);
}

function aceitarComentario(name, id){
    aceitarComentarioCounter++;
    console.log("aceitarComentarioCounter: ", aceitarComentarioCounter);

    var nome;
    var sobrenome;
    var avaliacao;
    var comentario;

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName==name){

            var indexArray = [];
            var indexArray2 = [];
            for (k = 0; k < item.length; k++) {
                if (item.charAt(k)==':'){
                    indexArray.push(k);
                }
                if (item.charAt(k)==','){
                    indexArray2.push(k);
                }
            }
            nome = item.substring(indexArray[0]+2, indexArray2[0]-1);
            sobrenome = item.substring(indexArray[1]+2, indexArray2[1]-1);
            avaliacao = item.substring(indexArray[4]+2, indexArray2[4]-1);
            comentario = item.substring(indexArray[5]+2, item.length-22);
        }
    }
    
    var flag = 0;
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName == ("comentarioDisplay" + aceitarComentarioCounter.toString())){
            flag = 1;
            localStorage.removeItem(itemName);
            var newComentarioDisplay = {"firstName": nome, "lastName": sobrenome, "ID": id, "avaliacao": avaliacao, "comment": comentario};
            localStorage.setItem(itemName, JSON.stringify(newComentarioDisplay));
        }
    }
    if (flag==0){
        var newComentarioDisplay = {"firstName": nome, "lastName": sobrenome, "ID": id, "avaliacao": avaliacao, "comment": comentario};
        localStorage.setItem("comentarioDisplay" + aceitarComentarioCounter.toString(), JSON.stringify(newComentarioDisplay));
    }

    if (aceitarComentarioCounter==5){
        aceitarComentarioCounter = 0;
    }
}

function rejeitarComentario(name){

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName==name){
            localStorage.removeItem(itemName);
        }
    }
    location.reload();
}