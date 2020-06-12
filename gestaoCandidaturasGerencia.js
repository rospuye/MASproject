var listaCandidaturas = [];
var listaNomesCandidaturas = [];

function displayCandidaturas(){
    var nenhumaCandidaturaFlag = 0;
    console.log("CALL: displayCandidaturas...");
    listaCandidaturas = [];
    listaNomesCandidaturas = [];

    var displayCandidaturasCounter = 0;
    
    // display de candidaturas
    var numeracaoCandidaturas = [];
    var candidaturaCounter = 0;
    var clientIDs = [];
    var clientFirstNames = [];
    var clientLastNames = [];

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"candidatura"')){
            nenhumaCandidaturaFlag = 1;
            console.log(itemName, item);
            if (itemName.includes('submissaoCandidatura/Cliente')){
                candidaturaCounter++;
                listaCandidaturas.push(item);
                listaNomesCandidaturas.push(itemName);
                var numeroCandidatura = candidaturaCounter;
                numeracaoCandidaturas.push(numeroCandidatura);

                var clientID = itemName.substring(28,34);
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
    if (nenhumaCandidaturaFlag==0){
        document.getElementById("nenhumaCandidatura").style.display = "block";
    }
    else{
        document.getElementById("nenhumaCandidatura").style.display = "none";
    }
    console.log(listaCandidaturas);
    console.log("NUMERACAO CANDIDATURAS", numeracaoCandidaturas);

    var max= 0;
    for (i=0; i<=numeracaoCandidaturas.length;i++){
        if (numeracaoCandidaturas[i]>max) {
            var max = numeracaoCandidaturas[i];
        }
    }

    console.log("LISTA CANDIDATURAS CLIENTE:")

    for (i=0; i<max; i++){
        for (j=0; j<numeracaoCandidaturas.length; j++){
            console.log(i+1,numeracaoCandidaturas[j]);
            if ((i+1)==numeracaoCandidaturas[j]){
                
                console.log(item);

                var item = listaCandidaturas[j];
                var numero = numeracaoCandidaturas[j];

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

                if (document.getElementById("candidatura" + numero.toString())!=null){
                    var myobj = document.getElementById("candidatura" + numero.toString());
                    myobj.remove();
                }

                displayCandidaturasCounter++;
                
                // colocar a candidatura em display na página
                var newDiv = document.createElement("div");
                newDiv.id = "candidatura" + numero.toString();
                newDiv.className = "candidatura";
                newDiv.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 10%; margin-top: 1%; margin-bottom: 1%; padding: 2%";

                var title = document.createElement("h5");
                title.style = "padding-bottom: 2%;";
                title.innerText = "Candidatura #" + displayCandidaturasCounter;
                newDiv.appendChild(title);

                var rowDiv = document.createElement("div");
                rowDiv.className = "row";

                var p1 = document.createElement("p");
                p1.style = "padding-left: 2%; padding-right: 1%";
                var b1 = document.createElement("b");
                b1.innerText = "Submetido por: ";
                p1.appendChild(b1);
                rowDiv.appendChild(p1);

                var p2 = document.createElement("p");   
                p2.id = "nome" + numero.toString();
                p2.className = "candidaturasElement";
                p2.innerText = clientFirstNames[j] + " " + clientLastNames[j];
                rowDiv.appendChild(p2);

                newDiv.appendChild(rowDiv);

                var rowDiv2 = document.createElement("div");
                rowDiv2.className = "row";

                var p3 = document.createElement("p");
                p3.style = "padding-left: 2%; padding-right: 1%";
                var b2 = document.createElement("b");
                b2.innerText = "Submetido em: ";
                p3.appendChild(b2);
                rowDiv2.appendChild(p3);

                var p4 = document.createElement("p");   
                p4.id = "data" + numero.toString();
                p4.className = "candidaturasElement";
                p4.innerText = item.substring(indexArray[3]+2, indexArray2[3]-1) + " " + item.substring(indexArray[4]+2, indexArray2[4]-1);
                rowDiv2.appendChild(p4);

                newDiv.appendChild(rowDiv2);

                var rowDiv3 = document.createElement("div");
                rowDiv3.className = "row";

                var p5 = document.createElement("p");
                p5.style = "padding-left: 2%; padding-right: 1%";
                var b3 = document.createElement("b");
                b3.innerText = "Nome da organização: ";
                p5.appendChild(b3);
                rowDiv3.appendChild(p5);

                var p6 = document.createElement("p");   
                p6.id = "nomeOrg" + numero.toString();
                p6.className = "candidaturasElement";
                p6.innerText = item.substring(indexArray[7]+2, indexArray2[5]-1);
                rowDiv3.appendChild(p6);

                newDiv.appendChild(rowDiv3);

                var rowDiv4 = document.createElement("div");
                rowDiv4.className = "row";

                var p7 = document.createElement("p");
                p7.style = "padding-left: 2%; padding-right: 1%";
                var b4 = document.createElement("b");
                b4.innerText = "E-mail: ";
                p7.appendChild(b4);
                rowDiv4.appendChild(p7);

                var p8 = document.createElement("p");   
                p8.id = "email" + numero.toString();
                p8.className = "candidaturasElement";
                p8.innerText = item.substring(indexArray[8]+2, indexArray2[6]-1);
                rowDiv4.appendChild(p8);

                newDiv.appendChild(rowDiv4);

                var rowDiv5 = document.createElement("div");
                rowDiv5.className = "row";

                var p9 = document.createElement("p");
                p9.style = "padding-left: 2%; padding-right: 1%";
                var b5 = document.createElement("b");
                b5.innerText = "Contacto telefónico: ";
                p9.appendChild(b5);
                rowDiv5.appendChild(p9);

                var p10 = document.createElement("p");   
                p10.id = "telefone" + numero.toString();
                p10.className = "candidaturasElement";
                p10.innerText = item.substring(indexArray[9]+2, indexArray2[7]-1);
                rowDiv5.appendChild(p10);

                newDiv.appendChild(rowDiv5);

                var rowDiv6 = document.createElement("div");
                rowDiv6.className = "row";

                var p11 = document.createElement("p");
                p11.style = "padding-left: 2%; padding-right: 1%";
                var b6 = document.createElement("b");
                b6.innerText = "Morada da sede: ";
                p11.appendChild(b6);
                rowDiv6.appendChild(p11);

                var p12 = document.createElement("p");   
                p12.id = "morada" + numero.toString();
                p12.className = "candidaturasElement";
                p12.innerText = item.substring(indexArray[10]+2, indexArray2[8]-1);
                rowDiv6.appendChild(p12);

                newDiv.appendChild(rowDiv6);

                var rowDiv7 = document.createElement("div");
                rowDiv7.className = "row";

                var p13 = document.createElement("p");
                p13.style = "padding-left: 2%; padding-right: 1%";
                var b7 = document.createElement("b");
                b7.innerText = "Website da empresa: ";
                p13.appendChild(b7);
                rowDiv7.appendChild(p13);

                var p14 = document.createElement("p");   
                p14.id = "website" + numero.toString();
                p14.className = "candidaturasElement";
                p14.innerText = item.substring(indexArray[11]+2, indexArray2[9]-1);
                rowDiv7.appendChild(p14);

                newDiv.appendChild(rowDiv7);

                var rowDiv8 = document.createElement("div");
                rowDiv8.className = "row";

                var p15 = document.createElement("p");
                p15.style = "padding-left: 2%; padding-right: 1%";
                var b8 = document.createElement("b");
                b8.innerText = "Portfólio: ";
                p15.appendChild(b8);
                rowDiv8.appendChild(p15);

                var p16 = document.createElement("p");   
                p16.id = "portfolio" + numero.toString();
                p16.className = "candidaturasElement";
                p16.innerText = item.substring(indexArray[12]+2, indexArray2[10]-1);
                rowDiv8.appendChild(p16);

                newDiv.appendChild(rowDiv8);

                var rowDiv9 = document.createElement("div");
                rowDiv9.className = "row";

                var p17 = document.createElement("p");
                p17.style = "padding-left: 2%; padding-right: 1%";
                var b9 = document.createElement("b");
                b9.innerText = "Área de atuação: ";
                p17.appendChild(b9);
                rowDiv9.appendChild(p17);

                var p18 = document.createElement("p");   
                p18.id = "areaAtuacao" + numero.toString();
                p18.className = "candidaturasElement";
                p18.innerText = item.substring(indexArray[13]+2, indexArray2[11]-1);
                rowDiv9.appendChild(p18);

                newDiv.appendChild(rowDiv9);



                var btn = document.createElement("INPUT");
                btn.setAttribute("id", "aceitarCandidatura" + numero.toString());
                btn.setAttribute("type", "button");
                btn.setAttribute("value", "Aceitar Candidatura");
                btn.setAttribute("class", "btn btn-light");
                btn.setAttribute("style", "margin-right: 1%")
                newDiv.appendChild(btn);

                var btn2 = document.createElement("INPUT");
                btn2.setAttribute("id", "rejeitarCandidatura" + numero.toString());
                btn2.setAttribute("type", "button");
                btn2.setAttribute("value", "Rejeitar Candidatura");
                btn2.setAttribute("class", "btn btn-light");
                newDiv.appendChild(btn2);

                var currentDiv = document.getElementById("todasAsCandidaturas"); 
                currentDiv.appendChild(newDiv);

                document.getElementById("aceitarCandidatura" + numero.toString()).onclick = function() {aceitarCandidatura(listaNomesCandidaturas[parseInt(this.id.substring(18))-1], clientIDs[parseInt(this.id.substring(18))-1])};
                document.getElementById("rejeitarCandidatura" + numero.toString()).onclick = function() {rejeitarCandidatura(listaNomesCandidaturas[parseInt(this.id.substring(19))-1])};
                break;
            }            
        }
    }
    console.log("COMPRIMENTO DA LISTA:", listaCandidaturas.length);
}

function rejeitarCandidatura(name){

    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName==name){
            localStorage.removeItem(itemName);
        }
    }
    location.reload();
}

function aceitarCandidatura(name, id){
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName==name){
            // mudar "tipo" do item de "candidatura" para "parceria"
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

            var firstPart = item.substring(0,indexArray[14]+2);
            var lastPart = item.substring(item.length-2);
            var newItem = firstPart + "parceria" + lastPart;
            localStorage.removeItem(item);
            localStorage.setItem(itemName, newItem);
            console.log(newItem);
        }
    }
    location.reload();
}