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

            mediumDiv.appendChild(smallDiv);
            mediumDiv.appendChild(imgElement);
            mediumDiv.appendChild(brElement);
            mediumDiv.appendChild(spanElement);
            mediumDiv.appendChild(brElement2);

            var currentDiv = document.getElementById("todasAsParcerias"); 
            currentDiv.appendChild(mediumDiv);

        }
    }
    if (nenhumParceiroFlag==0){
        document.getElementById("nenhumParceiro").style.display = "block";
    }
    else{
        document.getElementById("nenhumParceiro").style.display = "none";
    }
}