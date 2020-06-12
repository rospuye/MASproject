function main(){
    var indexArray = [];
    var indexArray2 = [];
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        console.log(item);
        if (item.includes('"tipo":"login"')){

            for (i = 0; i < item.length; i++) {
                if (item.charAt(i)==':'){
                    indexArray.push(i);
                }
                if (item.charAt(i)==','){
                    indexArray2.push(i);
                }
            }

            var name = item.substring(indexArray[0]+2,indexArray2[0]-1);
            document.getElementById("firstName").innerText = name;
            var lastName = item.substring(indexArray[1]+2,indexArray2[1]-1);
            document.getElementById("lastName").innerText = lastName;
            var email = item.substring(indexArray[2]+2,indexArray2[2]-1);
            document.getElementById("email").innerText = email;
            var contacto = item.substring(indexArray[3]+2,indexArray2[3]-1);
            document.getElementById("contacto").innerText = contacto;
            var ID = item.substring(indexArray[5]+2,indexArray2[5]-1);
            document.getElementById("ID").innerText = ID;
        }
    }
}

function alterarNome(){

    var newName = document.getElementById("firstNameChange").value.trim();
    if (!(allLetter(newName)) || newName.length < 3) {
        alert("Novo nome inválido!");
    }
    else{
        var indexArray = [];
        var indexArray2 = [];

        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);

            if (item.includes('"tipo":"login"')){

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }
                var firstPart = item.substring(0,indexArray[0]+2);
                var lastPart = item.substring(indexArray2[0]-1);
                var newItem = firstPart + newName + lastPart;
                localStorage.removeItem(item);
                localStorage.setItem(itemName, newItem);
                console.log(newItem);
            }
        }
        location.reload();
    }
}
function alterarSobrenome(){
    var newLastName = document.getElementById("lastNameChange").value.trim();
    if (!(allLetter(newLastName)) || newLastName.length < 3) {
        alert("Novo sobrenome inválido!");
    }
    else{
        var indexArray = [];
        var indexArray2 = [];

        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);

            if (item.includes('"tipo":"login"')){

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }
                var firstPart = item.substring(0,indexArray[1]+2);
                var lastPart = item.substring(indexArray2[1]-1);
                var newItem = firstPart + newLastName + lastPart;
                localStorage.removeItem(item);
                localStorage.setItem(itemName, newItem);
                console.log(newItem);
            }
        }
        location.reload();
    }
}
function alterarEmail(){
    var newEmail = document.getElementById("emailChange").value.trim();
    if (!(validateEmail(newEmail))){
        alert("Novo e-mail inválido!");
    }
    else{
        var indexArray = [];
        var indexArray2 = [];

        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);

            if (item.includes('"tipo":"login"')){

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }
                var firstPart = item.substring(0,indexArray[2]+2);
                var lastPart = item.substring(indexArray2[2]-1);
                var newItem = firstPart + newEmail + lastPart;
                localStorage.removeItem(item);
                localStorage.setItem(itemName, newItem);
                console.log(newItem);
            }
        }
        location.reload();
    }
}
function alterarContacto(){
    var newContacto = document.getElementById("contactoChange").value.trim();
    if (!(allNumber(newContacto)) || newContacto.length < 9){
        alert("Novo contacto inválido!");
    }
    else{
        var indexArray = [];
        var indexArray2 = [];

        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);

            if (item.includes('"tipo":"login"')){

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }
                var firstPart = item.substring(0,indexArray[3]+2);
                var lastPart = item.substring(indexArray2[3]-1);
                var newItem = firstPart + newContacto + lastPart;
                localStorage.removeItem(item);
                localStorage.setItem(itemName, newItem);
                console.log(newItem);
            }
        }
        location.reload();
    }
}
function alterarSenha(){
    var senha1 = document.getElementById("senhaChange").value.trim();
    senha1.type = "text";
    var senha2 = document.getElementById("senhaChange2").value.trim();
    senha2.type = "text";

    if (senha1=="" || senha2==""){
        alert("Por favor, preencha os dois campos!");
    }
    else if (senha1.length<8 || senha2.length<8){
        alert("A nova senha deve conter um mínimo de 8 caracteres!");
    }
    else if (senha1==senha2){

        var indexArray = [];
        var indexArray2 = [];

        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);

            if (item.includes('"tipo":"login"')){

                for (i = 0; i < item.length; i++) {
                    if (item.charAt(i)==':'){
                        indexArray.push(i);
                    }
                    if (item.charAt(i)==','){
                        indexArray2.push(i);
                    }
                }

                var firstPart = item.substring(0,indexArray[4]+2);
                var lastPart = item.substring(indexArray2[4]-1);
                var newItem = firstPart + senha1 + lastPart;
                localStorage.removeItem(item);
                localStorage.setItem(itemName, newItem);
                console.log(newItem);
            }
        }
        alert("Senha alterada!");
        location.reload();
    }
    else{
        alert("As senhas não são iguais!");
    }
}

function apagarConta(){
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);

        if (item.includes('"tipo":"login"')){
            localStorage.removeItem(itemName);
        }
    }
    location.replace("home.html");
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function allLetter(inputtxt){
    var letters = /^[A-zÀ-ú]+$/;
    if(inputtxt.match(letters)){
        return true;
    }
    else{
        return false;
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