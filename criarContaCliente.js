var contaCounter = 0;

function validaFormulario() {

    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var numeroTelemovel = document.getElementById("numeroTelemovel").value.trim();
    var password = document.getElementById("password").value.trim();

    var firstName_error = document.getElementById("firstName_Error");
    var lastName_error = document.getElementById("lastName_Error");
    var email_error = document.getElementById("email_Error");
    var numeroTelemovel_error = document.getElementById("numeroTelemovel_Error");
    var password_error = document.getElementById("password_Error");

    var value = true;
        
    cleanErrorMessages();

    if (!(allLetter(firstName)) || firstName.length < 3) {
        firstName_error.style.display = "block";
        value = false;
    }

    if (!(allLetter(lastName)) || lastName.length < 3) {
        lastName_error.style.display = "block";
        value = false;
    }

    if (!(validateEmail(email))) {
        email_error.style.display = "block";
        value = false;
    }

    if (!(allNumber(numeroTelemovel)) || numeroTelemovel.length < 9) {
        numeroTelemovel_error.style.display = "block";
        value = false;
    }

    password.type = "text";
    if (password.length < 8) {
        password_error.style.display = "block";
        value = false;
    }

    if (value==true){

        // reset form
        document.getElementById("formCriarConta").reset();

        // inserir nova conta na local storage
        var numeroConta = 0;
        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);
            if (item.includes('"tipo":"conta"')){
                if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroConta){
                    numeroConta = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                }
            }
        }

        // criação de ID de cliente (se houver espaço)
        var numeroLength = numeroConta.toString().length;
        var IDCliente;
        if (numeroLength<6){
            if (numeroConta==0){
                IDCliente = "#00001";
            }
            else{
                var zero = "0";
                var zeros = zero.repeat(5-numeroLength);
                var IDNumber = zeros + numeroConta.toString();
                IDCliente = "#" + IDNumber.toString();
            }
        }
        else{
            alert("Não há espaço para mais clientes!");
            return;
        }

        var submissaoConta = { 'firstName': firstName, 'lastName': lastName, 'email': email, 'numeroTelemovel':numeroTelemovel, 'password':password, 'ID':IDCliente, 'tipo':'conta' };

        if (numeroConta==0){
            localStorage.setItem('submissaoConta/Cliente/nº1', JSON.stringify(submissaoConta));
            var retrievedObject = localStorage.getItem('submissaoConta/Cliente/nº1');
            console.log('submissaoConta/Cliente/nº1', JSON.parse(retrievedObject));
            alert("Conta criada! Para entrar na zona do cliente, faça login.");
        }
        else{
            localStorage.setItem('submissaoConta/Cliente/nº' + numeroConta, JSON.stringify(submissaoConta));
            var retrievedObject = localStorage.getItem('submissaoConta/Cliente/nº' + numeroConta);
            console.log('submissaoConta/Cliente/nº' + numeroConta, JSON.parse(retrievedObject));
            alert("Conta criada! Para entrar na zona do cliente, faça login.");
        }
    }
}

function cleanErrorMessages() {
    firstName_Error.style.display = "none";
    lastName_Error.style.display = "none";
    email_Error.style.display = "none";
    numeroTelemovel_Error.style.display = "none";
    password_Error.style.display = "none";
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