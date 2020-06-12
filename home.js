function displayComentarios(){
    console.log("CALL: displayComentarios()...");
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (itemName.includes("comentarioDisplay")){
            var numero = itemName.substring(17);
            console.log(numero);

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
            id = item.substring(indexArray[2]+2, indexArray2[2]-1);
            avaliacao = item.substring(indexArray[3]+2, indexArray2[3]-1);
            comentario = item.substring(indexArray[4]+2, item.length-2);
            console.log(nome, sobrenome, id, avaliacao, comentario);

            document.getElementById("nome+ID" + numero).innerText = nome + " " + sobrenome + " " + id;
            document.getElementById("comentario" + numero).innerText = comentario;
            document.getElementById("avaliacao" + numero).innerHTML = "&#9733".repeat(parseInt(avaliacao));

        }
    }
}

function facaUmPedido(){
    var flag = 0;
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        if (item.includes('"tipo":"login"')){
            flag = 1;
            location.replace("submeterpedido.html");
            break;
        }
    }
    if (flag==0){
        location.replace("login.html");
    }
}
function torneSeFornecedor(){
    var flag = 0;
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        if (item.includes('"tipo":"login"')){
            flag = 1;
            location.replace("candidaturafornecedor.html");
            break;
        }
    }
    if (flag==0){
        location.replace("login.html");
    }
}