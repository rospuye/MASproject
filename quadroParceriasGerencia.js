var listaNomesParcerias = [];

function displayParcerias(){
    var nenhumParceiroFlag = 0;
    console.log("CALL: displayParcerias()...");
    var parceriaCounter = 0;
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"parceria"')){
            nenhumParceiroFlag = 1;
            parceriaCounter++;
            listaNomesParcerias.push(itemName);

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

            var nomeOrg = item.substring(indexArray[7]+2, indexArray2[5]-1);
            var areaAtuacao = item.substring(indexArray[13]+2, indexArray2[11]-1);
            var clientID = item.substring(indexArray[2]+2, indexArray2[2]-1);

            var imgAreaAtuacao;
            if (areaAtuacao=="Fotografia e Filmografia"){
                imgAreaAtuacao = "https://i.imgur.com/uAkgqgh.png";
            }
            else if (areaAtuacao=="Iluminação e Cenografia"){
                imgAreaAtuacao = "https://i.imgur.com/sWXjnQx.png";
            }
            else if (areaAtuacao=="Sistemas de Som"){
                imgAreaAtuacao = "https://i.imgur.com/qJxaDq4.png";
            }
            else if (areaAtuacao=="Instalação e Manutenção de Equipamentos"){
                imgAreaAtuacao = "https://i.imgur.com/tBYsxza.png";
            }
            else if (areaAtuacao=="Segurança"){
                imgAreaAtuacao = "https://i.imgur.com/Kg8cpxg.png";
            }
            else if (areaAtuacao=="Primeiros Socorros"){
                imgAreaAtuacao = "https://i.imgur.com/SHdqDfs.png";
            }
            else{
                imgAreaAtuacao = "https://i.imgur.com/ZTjo1h6.png";
            }

            // colocar a parceria em display na página
            var mediumDiv = document.createElement("div");
            mediumDiv.id = "card__2";
            mediumDiv.className = "col-md-6 col-lg-2 col-sm-12 text-center";

            var smallDiv = document.createElement("div");
            smallDiv.style = "text-align:right; color: #bbb";

            var iElement = document.createElement("i");
            iElement.id = "iElement" + parceriaCounter.toString();
            iElement.className = "fa fa-plus";

            smallDiv.appendChild(iElement);

            var imgElement = document.createElement("img");
            imgElement.id = "imgElement" + parceriaCounter.toString();
            imgElement.style = "width:70%; opacity: 1.0; filter: grayscale(40%);";
            imgElement.src = imgAreaAtuacao;

            var brElement = document.createElement("br");

            var spanElement = document.createElement("span");
            spanElement.id = "spanElement" + parceriaCounter.toString();
            spanElement.style = "color: #bbb; font-weight: bold; text-align: justify; font-family: montserrat; font-size: 16px;"
            spanElement.innerText = nomeOrg;

            var brElement2 = document.createElement("br");

            var btn = document.createElement("INPUT");
            btn.setAttribute("id", "contactarCliente" + parceriaCounter.toString());
            btn.setAttribute("type", "button");
            btn.setAttribute("value", "Contactar Parceiro");
            btn.setAttribute("class", "btn btn-light");
            btn.setAttribute("style", "margin-top: 1%")
            btn.setAttribute("name", clientID);
            
            var brElement3 = document.createElement("br");

            var btn2 = document.createElement("INPUT");
            btn2.setAttribute("id", "eliminarParceiro" + parceriaCounter.toString());
            btn2.setAttribute("type", "button");
            btn2.setAttribute("value", "Eliminar Parceiro");
            btn2.setAttribute("class", "btn btn-light");
            btn2.setAttribute("style", "margin-top: 2%")
            
            
            var brElement4 = document.createElement("br");

            mediumDiv.appendChild(smallDiv);
            mediumDiv.appendChild(imgElement);
            mediumDiv.appendChild(brElement);
            mediumDiv.appendChild(spanElement);
            mediumDiv.appendChild(brElement4);
            mediumDiv.appendChild(brElement2);
            mediumDiv.appendChild(btn);
            mediumDiv.appendChild(brElement3);
            mediumDiv.appendChild(btn2);

            var currentDiv = document.getElementById("todasAsParcerias"); 
            currentDiv.appendChild(mediumDiv);

            document.getElementById("contactarCliente" + parceriaCounter.toString()).onclick = function() {
                var flag = 0;
                for (a=0; a<localStorage.length; a++){
                    var object = localStorage.getItem(localStorage.key(a));
                    var objectName = localStorage.key(a);
                    if (object.includes('receiverID')){
                        flag = 1;

                        var firstHalf = object.substring(0, 16);
                        var secondHalf = object.substring(16);
                        var newReceiverID = this.name;
                        var newObject = firstHalf + newReceiverID + secondHalf;
                        localStorage.removeItem(objectName);
                        localStorage.setItem(objectName, newObject);
                        console.log(newObject);
                        break;
                    }
                }
                if (flag==0){
                    var newReceiverID = this.name;
                    var object = {"receiverID": newReceiverID};
                    localStorage.setItem("receiverID", newReceiverID);
                    console.log(localStorage.getItem("receiverID"));
                }
                window.location.replace("mensagensFuncCliente.html");
            };

            document.getElementById("eliminarParceiro" + parceriaCounter.toString()).onclick = function() {eliminarParceiro(listaNomesParcerias[parseInt(this.id.substring(16))-1])};

        }
    }
    if (nenhumParceiroFlag==0){
        document.getElementById("nenhumParceiro").style.display = "block";
    }
    else{
        document.getElementById("nenhumParceiro").style.display = "none";
    }
}

function eliminarParceiro(name){
    for (i=0; i<localStorage.length; i++){
        var itemName = localStorage.key(i);
        if (itemName==name){
            localStorage.removeItem(itemName);
        }
    }
    location.reload();
}