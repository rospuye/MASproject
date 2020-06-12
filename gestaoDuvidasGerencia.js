// var duvidaCounter = 0;

function loadData(){

    var nenhumaDuvidaFlag = 0;
    var duvidaCounter = 0;

    var listaDuvidas = [];
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName.includes('submissaoDuvida/Cliente')){
            nenhumaDuvidaFlag = 1;
            duvidaCounter++;
            listaDuvidas.push(item);

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

            var newDiv = document.createElement("div");
            newDiv.id = "duvida" + duvidaCounter.toString();
            newDiv.className = "duvida";
            newDiv.style = "display: block; background-color: #cb98e9; margin-left: 10%; margin-right: 10%; margin-bottom: 2%; padding: 2%";

            var title = document.createElement("h5");
            title.style = "padding-bottom: 2%;";
            title.innerText = "Dúvida #" + duvidaCounter.toString();
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
            p2.id = "data" + duvidaCounter.toString();
            p2.className = "duvidasElement";
            p2.innerText = item.substring(indexArray[0]+2, indexArray2[0]-1) + " " + item.substring(indexArray[1]+2, indexArray2[1]-1);
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
            p4.id = "avaliacao" + duvidaCounter.toString();
            p4.className = "duvidasElement";
            p4.innerHTML = item.substring(indexArray[2]+2, indexArray2[2]-1);
            rowDiv2.appendChild(p4);

            newDiv.appendChild(rowDiv2);

            var p5 = document.createElement("p");
            var b3 = document.createElement("b");
            b3.innerText = "Conteúdo: ";
            p5.appendChild(b3);
            newDiv.appendChild(p5);

            var p6 = document.createElement("p");
            p6.id = "conteudo" + duvidaCounter.toString();
            p6.innerText = item.substring(indexArray[4]+2, indexArray2[4]-1);
            newDiv.appendChild(p6);

            var btn = document.createElement("button");
            btn.setAttribute("id", "responder" + duvidaCounter.toString());
            btn.setAttribute("type", "button");
            btn.setAttribute("class", "btn btn-light");
            btn.getAttribute("data-toggle", "modal");
            btn.setAttribute("data-target", "#modal" + duvidaCounter.toString());
            console.log("#modal" + duvidaCounter.toString());
            newDiv.appendChild(btn);

            document.getElementById("listaDeDuvidas").appendChild(newDiv);
            document.querySelector('#responder' + duvidaCounter.toString()).innerHTML = 'Responder';
        }
    }
    if (nenhumaDuvidaFlag==0){
        document.getElementById("nenhumaDuvida").style.display = "block";
    }
    else{
        document.getElementById("nenhumaDuvida").style.display = "none";
    }

}