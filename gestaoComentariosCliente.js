var listaComentariosCliente = [];

function validaFormulario(){

    var stateRadio1 = document.getElementById("1estrela").checked;
    var stateRadio2 = document.getElementById("2estrelas").checked;
    var stateRadio3 = document.getElementById("3estrelas").checked;
    var stateRadio4 = document.getElementById("4estrelas").checked;
    var stateRadio5 = document.getElementById("5estrelas").checked;

    var comments = document.getElementById("comments").value.trim();

    var radio_error = document.getElementById("radio_Error");
    var comments_error = document.getElementById("comments_Error");

    var value = true;
        
    cleanErrorMessages();
    
    if ((stateRadio1==false) && (stateRadio2==false) && (stateRadio3==false) && (stateRadio4==false) && (stateRadio5==false)){
        radio_error.style.display = "block";
        value = false;
    }
    if (comments.length < 30) {
        comments_error.style.display = "block";
        value = false;
    }

    if (value==true){

        // reset form
        document.getElementById("1estrela").checked = false;
        document.getElementById("2estrelas").checked = false;
        document.getElementById("3estrelas").checked = false;
        document.getElementById("4estrelas").checked = false;
        document.getElementById("5estrelas").checked = false;
        document.getElementById("comments").value = "";


        // inserir novo comentário na local storage
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
                var data = d + "/" + m + "/" + y;

                var avaliacao = 0
                if (stateRadio1==true){
                    avaliacao = avaliacao + 1;
                }
                else if (stateRadio2==true){
                    avaliacao = avaliacao + 2;
                }
                else if (stateRadio3==true){
                    avaliacao = avaliacao + 3;
                }
                else if (stateRadio4==true){
                    avaliacao = avaliacao + 4;
                }
                else{
                    avaliacao = avaliacao + 5;
                }

                var submissaoComentario = { 'firstName': firstName, 'lastName': lastName, 'ID': ID, 'date': data, 'avaliacao': avaliacao, 'comments':comments, 'tipo':'comentário'};

                // se este comentário for um rascunho, apagar dos rascunhos
                // for (i=0; i<localStorage.length; i++){
                //     var item = localStorage.getItem(localStorage.key(i));
                //     var itemName = localStorage.key(i);
                //     if (item.includes('"tipo":"rascunho"')){
                //         if (itemName.includes('submissaoComentario/Cliente' + ID)){
                //         }
                //     }
                // }

                var numeroComentario = 0;
                for (i=0; i<localStorage.length; i++){
                    var item = localStorage.getItem(localStorage.key(i));
                    var itemName = localStorage.key(i);
                    if (item.includes('"tipo":"comentário"')){
                        if (itemName.includes('submissaoComentario/Cliente' + ID)){
                            if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroComentario){
                                numeroComentario = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                            }
                        }
                    }
                }
                if (numeroComentario==0){
                    localStorage.setItem('submissaoComentario/Cliente' + ID + '/nº1', JSON.stringify(submissaoComentario));
                    var retrievedObject = localStorage.getItem('submissaoComentario/Cliente' + ID + '/nº1');
                    // console.log('submissaoComentario/Cliente' + ID + '/nº1', JSON.parse(retrievedObject));
                }
                else{
                    localStorage.setItem('submissaoComentario/Cliente' + ID + '/nº' + numeroComentario, JSON.stringify(submissaoComentario));
                    var retrievedObject = localStorage.getItem('submissaoComentario/Cliente' + ID + '/nº' + numeroComentario);
                    // console.log('submissaoComentario/Cliente' + ID + '/nº' + numeroComentario, JSON.parse(retrievedObject));
                }
            }
        }
    }
    displayComentarios();
}

function displayComentarios(){
    console.log("CALL: displayComentarios...");
    listaComentariosCliente = [];

    var displayComentariosCounter = 0;

    var clientFirstName = "";
    var clientLastName = "";
    var clientID = "";

    // recolha das informações da conta do cliente
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        // console.log(itemName, item);
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
            clientFirstName = clientFirstName + item.substring(indexArray[0]+2,indexArray2[0]-1);
            clientLastName = clientLastName + item.substring(indexArray[1]+2,indexArray2[1]-1);
            clientID = clientID + item.substring(indexArray[5]+2,indexArray2[5]-1);
            break;
        }
    }
    
    // display de comentários
    var numeracaoComentarios = [];
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"comentário"')){
            console.log("ITEM: ", item);
            if (itemName.includes('submissaoComentario/Cliente' + clientID)){
                // comentarioCounter++;
                listaComentariosCliente.push(item);
                var numeroComentario = parseInt(itemName.substring(36));
                numeracaoComentarios.push(numeroComentario);
            }
        }
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
                if (listaComentariosCliente.length!=0){
                    document.getElementById("semComentarios").style.display = "none";
                }

                var newDiv = document.createElement("div");
                newDiv.id = "comentario" + numero.toString();
                newDiv.className = "comentario";
                newDiv.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 10%; margin-bottom: 2%; padding: 2%";

                var title = document.createElement("h5");
                title.style = "padding-bottom: 2%;";
                title.innerText = "Comentário #" + displayComentariosCounter;
                newDiv.appendChild(title);

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
                btn.setAttribute("id", "eliminarComentario" + numero.toString());
                btn.setAttribute("type", "button");
                btn.setAttribute("value", "Eliminar Comentário");
                btn.setAttribute("class", "btn btn-light");
                newDiv.appendChild(btn);

                var currentDiv = document.getElementById("todosOsComentarios"); 
                currentDiv.appendChild(newDiv);
                // document.body.insertBefore(newDiv, currentDiv);

                console.log("DADOS PARA FUNC ELIMINAR COM: ID: ", clientID, " NUM: ", document.getElementById("eliminarComentario" + numero.toString()).id.substring(18))
                document.getElementById("eliminarComentario" + numero.toString()).onclick = function() {eliminarComentario(clientID, this.id.substring(18))};
                break;
            }            
        }
    }
    console.log("COMPRIMENTO DA LISTA:", listaComentariosCliente.length);
}

function eliminarComentario(id, numero){
    console.log("CALL: eliminarComentario(id, num)...");
    console.log("NUMERO:", numero);
    console.log(localStorage.getItem('submissaoComentario/Cliente' + id + '/nº' + numero));

    document.getElementById("comentario" + numero.toString()).style.display = "none";
    localStorage.removeItem('submissaoComentario/Cliente' + id + '/nº' + numero);

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"comentário"')){
            if (itemName.includes('submissaoComentario/Cliente' + id)){
                if (parseInt(itemName.substring(36))>numero){
                    var newNum = parseInt(itemName.substring(36)) - 1;
                    console.log("NEWNUM: ", newNum);
                    var newItemName = itemName.substring(0,36) + newNum.toString();
                    console.log("NEWITEMName: ", newItemName);
                    var newItem = item;
                    console.log("NEWITEM: ", newItem);
                    localStorage.removeItem(itemName);
                    localStorage.setItem(newItemName, newItem);
                }
            }
        }
    }

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"comentário"')){
            if (itemName.includes('submissaoComentario/Cliente' + id)){
                console.log(itemName, item);
            }
        }
    }
    
    location.reload();
}

// RASCUNHOS...

function validaRascunho(){

    var stateRadio1 = document.getElementById("1estrela").checked;
    var stateRadio2 = document.getElementById("2estrelas").checked;
    var stateRadio3 = document.getElementById("3estrelas").checked;
    var stateRadio4 = document.getElementById("4estrelas").checked;
    var stateRadio5 = document.getElementById("5estrelas").checked;

    var comments = document.getElementById("comments").value.trim();

    // var radio_error = document.getElementById("radio_Error");
    var comments_error2 = document.getElementById("comments_Error2");

    if (comments.length==0){
        comments_error2.style.display = "block";
        return;
    }

    // reset form
    document.getElementById("1estrela").checked = false;
    document.getElementById("2estrelas").checked = false;
    document.getElementById("3estrelas").checked = false;
    document.getElementById("4estrelas").checked = false;
    document.getElementById("5estrelas").checked = false;
    document.getElementById("comments").value = "";

    cleanErrorMessages();

    // inserir novo comentário na local storage
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
            var data = d + "/" + m + "/" + y;

            var avaliacao = 0
            if (stateRadio1==true){
                avaliacao = avaliacao + 1;
            }
            else if (stateRadio2==true){
                avaliacao = avaliacao + 2;
            }
            else if (stateRadio3==true){
                avaliacao = avaliacao + 3;
            }
            else if (stateRadio4==true){
                avaliacao = avaliacao + 4;
            }
            else if (stateRadio5==true){
                avaliacao = avaliacao + 5;
            }

            var submissaoRascunho = { 'firstName': firstName, 'lastName': lastName, 'ID': ID, 'date': data, 'avaliacao': avaliacao, 'comments':comments, 'tipo':'rascunho'};

            var numeroRascunho = 0;
            for (i=0; i<localStorage.length; i++){
                var item = localStorage.getItem(localStorage.key(i));
                var itemName = localStorage.key(i);
                if (item.includes('"tipo":"rascunho"')){
                    if (itemName.includes('submissaoRascunho/Cliente' + ID)){
                        if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroRascunho){
                            numeroRascunho = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                        }
                    }
                }
            }
            if (numeroRascunho==0){
                localStorage.setItem('submissaoRascunho/Cliente' + ID + '/nº1', JSON.stringify(submissaoRascunho));
                var retrievedObject = localStorage.getItem('submissaoRascunho/Cliente' + ID + '/nº1');
                // console.log('submissaoRascunho/Cliente' + ID + '/nº1', JSON.parse(retrievedObject));
            }
            else{
                localStorage.setItem('submissaoRascunho/Cliente' + ID + '/nº' + numeroRascunho, JSON.stringify(submissaoRascunho));
                var retrievedObject = localStorage.getItem('submissaoRascunho/Cliente' + ID + '/nº' + numeroRascunho);
                // console.log('submissaoRascunho/Cliente' + ID + '/nº' + numeroRascunho, JSON.parse(retrievedObject));
            }
        }
    }
    displayRascunhos();
}

function displayRascunhos(){

    console.log("CALL: displayRascunhos...");
    listaRascunhosCliente = [];

    var displayRascunhosCounter = 0;

    var clientFirstName = "";
    var clientLastName = "";
    var clientID = "";

    // recolha das informações da conta do cliente
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        // console.log(itemName, item);
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
            clientFirstName = clientFirstName + item.substring(indexArray[0]+2,indexArray2[0]-1);
            clientLastName = clientLastName + item.substring(indexArray[1]+2,indexArray2[1]-1);
            clientID = clientID + item.substring(indexArray[5]+2,indexArray2[5]-1);
            break;
        }
    }
    
    // display de rascunhos
    var numeracaoRascunhos = [];
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"rascunho"')){
            console.log("ITEM: ", item);
            if (itemName.includes('submissaoRascunho/Cliente' + clientID)){
                listaRascunhosCliente.push(item);
                var numeroRascunho = parseInt(itemName.substring(34));
                numeracaoRascunhos.push(numeroRascunho);
            }
        }
    }
    console.log(listaRascunhosCliente);
    console.log("NUMERACAO RASCUNHOS", numeracaoRascunhos);

    var max= 0;
    for (i=0; i<=numeracaoRascunhos.length;i++){
        if (numeracaoRascunhos[i]>max) {
            var max = numeracaoRascunhos[i];
        }
    }

    console.log("LISTA RASCUNHOS CLIENTE:")

    for (i=0; i<max; i++){
        for (j=0; j<numeracaoRascunhos.length; j++){ // PROBLEM IS HERE (numeração comentários)
            console.log(i+1,numeracaoRascunhos[j]);
            if ((i+1)==numeracaoRascunhos[j]){
                
                console.log(item);

                var item = listaRascunhosCliente[j];
                var numero = numeracaoRascunhos[j];

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

                if (document.getElementById("rascunho" + numero.toString())!=null){
                    var myobj = document.getElementById("rascunho" + numero.toString());
                    myobj.remove();
                }

                displayRascunhosCounter++;
                
                // colocar o rascunho em display na página
                if (listaRascunhosCliente.length!=0){
                    document.getElementById("semRascunhos").style.display = "none";
                }

                var newDivR = document.createElement("div");
                newDivR.id = "rascunho" + numero.toString();
                newDivR.className = "rascunho";
                newDivR.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 10%; margin-bottom: 2%; padding: 2%";

                var titleR = document.createElement("h5");
                titleR.style = "padding-bottom: 2%;";
                titleR.innerText = "Rascunho #" + displayRascunhosCounter;
                newDivR.appendChild(titleR);

                var rowDivR = document.createElement("div");
                rowDivR.className = "row";

                var p1R = document.createElement("p");
                p1R.style = "padding-left: 2%; padding-right: 1%";
                var b1R = document.createElement("b");
                b1R.innerText = "Submetido em: ";
                p1R.appendChild(b1R);
                rowDivR.appendChild(p1R);

                var p2R = document.createElement("p");   
                p2R.id = "data" + numero.toString();
                p2R.className = "rascunhosElement";
                p2R.innerText = item.substring(indexArray[3]+2, indexArray2[3]-1);
                rowDivR.appendChild(p2R);

                newDivR.appendChild(rowDivR);

                var rowDiv2R = document.createElement("div");
                rowDiv2R.className = "row";

                var p3R = document.createElement("p");
                p3R.style = "padding-left: 2%; padding-right: 1%";
                var b2R = document.createElement("b");
                b2R.innerText = "Avaliação do serviço: ";
                p3R.appendChild(b2R);
                rowDiv2R.appendChild(p3R);

                var p4R = document.createElement("p");
                p4R.id = "avaliacao" + numero.toString();
                p4R.className = "rascunhosElement";
                var starR = "&#9733";
                var numStarsR = parseInt(item.substring(indexArray[4]+2, indexArray2[4]-1));
                p4R.innerHTML = starR.repeat(numStarsR);
                rowDiv2R.appendChild(p4R);

                newDivR.appendChild(rowDiv2R);

                var p5R = document.createElement("p");
                var b3R = document.createElement("b");
                b3R.innerText = "Conteúdo: ";
                p5R.appendChild(b3R);
                newDivR.appendChild(p5R);

                var p6R = document.createElement("p");
                p6R.id = "conteudo" + numero.toString();
                p6R.innerText = item.substring(indexArray[5]+2, indexArray2[5]-1);
                newDivR.appendChild(p6R);

                var btnR = document.createElement("INPUT");
                btnR.setAttribute("id", "eliminarRascunho" + numero.toString());
                btnR.setAttribute("type", "button");
                btnR.setAttribute("value", "Eliminar Rascunho");
                btnR.setAttribute("class", "btn btn-light");
                newDivR.appendChild(btnR);

                var btnR2 = document.createElement("INPUT");
                btnR2.setAttribute("id", "editarRascunho" + numero.toString());
                btnR2.setAttribute("type", "button");
                btnR2.setAttribute("value", "Editar Rascunho");
                btnR2.setAttribute("class", "btn btn-light");
                btnR2.setAttribute("style", "margin-left: 1%")
                newDivR.appendChild(btnR2);

                document.getElementById("listaDeRascunhos").appendChild(newDivR);

                console.log("DADOS PARA FUNC ELIMINAR RAS: ID: ", clientID, " NUM: ", document.getElementById("eliminarRascunho" + numero.toString()).id.substring(16))
                document.getElementById("eliminarRascunho" + numero.toString()).onclick = function() {eliminarRascunho(clientID, this.id.substring(16))};
                document.getElementById("editarRascunho" + numero.toString()).onclick = function() {editarRascunho(clientID, this.id.substring(14))};
                break;
            }            
        }
    }
    console.log("COMPRIMENTO DA LISTA:", listaRascunhosCliente.length);
}

function eliminarRascunho(id, numero){
    console.log("CALL: eliminarRascunho(id, num)...");
    console.log("NUMERO:", numero);
    console.log(localStorage.getItem('submissaoRascunho/Cliente' + id + '/nº' + numero));

    document.getElementById("rascunho" + numero.toString()).style.display = "none";
    localStorage.removeItem('submissaoRascunho/Cliente' + id + '/nº' + numero);

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"rascunho"')){
            if (itemName.includes('submissaoRascunho/Cliente' + id)){
                if (parseInt(itemName.substring(36))>numero){
                    var newNum = parseInt(itemName.substring(36)) - 1;
                    console.log("NEWNUM: ", newNum);
                    var newItemName = itemName.substring(0,36) + newNum.toString();
                    console.log("NEWITEMName: ", newItemName);
                    var newItem = item;
                    console.log("NEWITEM: ", newItem);
                    localStorage.removeItem(itemName);
                    localStorage.setItem(newItemName, newItem);
                }
            }
        }
    }

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"rascunho"')){
            if (itemName.includes('submissaoRascunho/Cliente' + id)){
                console.log(itemName, item);
            }
        }
    }
    location.reload();
}

function editarRascunho(id, numero){
    // reset form
    document.getElementById("1estrela").checked = false;
    document.getElementById("2estrelas").checked = false;
    document.getElementById("3estrelas").checked = false;
    document.getElementById("4estrelas").checked = false;
    document.getElementById("5estrelas").checked = false;
    document.getElementById("comments").value = "";

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"rascunho"')){
            if (itemName.includes('submissaoRascunho/Cliente' + id + '/nº' + numero)){
                
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
                var avaliacao = item.substring(indexArray[4]+2, indexArray2[4]-1);
                var comments = item.substring(indexArray[5]+2, indexArray2[5]-1);
                if (avaliacao==0){

                }
                else if (avaliacao==1){
                    document.getElementById("1estrela").checked = true;
                }
                else{
                    document.getElementById(avaliacao.toString() + "estrelas").checked = true;
                }
                document.getElementById("comments").value = comments;
            }
        }
    }
}

function generateCode() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function cleanErrorMessages(){
    radio_Error.style.display = "none";
    comments_Error.style.display = "none";
    comments_Error2.style.display = "none";
}