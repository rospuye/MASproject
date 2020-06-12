var duvidaCounter = 0;

function validaFormulario() {

    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var comments = document.getElementById("comments").value.trim();

    var firstName_error = document.getElementById("firstName_Error");
    var lastName_error = document.getElementById("lastName_Error");
    var email_error = document.getElementById("email_Error");
    var comments_error = document.getElementById("comments_Error");

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

    if (comments.length < 30) {
        comments_error.style.display = "block";
        value = false;
    }

    if (value==true){

        // reset form
        document.getElementById("formDuvidas").reset();


        // inserir nova dúvida na local storage
        for (i=0; i<localStorage.length; i++){
            var item = localStorage.getItem(localStorage.key(i));
            var itemName = localStorage.key(i);
            if ((item.includes('"tipo":"login"') || (item.includes('"tipo":"conta"')))){
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
                //var firstName = item.substring(indexArray[0]+2,indexArray2[0]-1);
                //var lastName = item.substring(indexArray[1]+2,indexArray2[1]-1);
                //var ID = item.substring(indexArray[5]+2,indexArray2[5]-1);

                n =  new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                var dataSubmissao = d + "/" + m + "/" + y;

                var submissaoDuvida = { 'firstName': firstName,
                                        'lastName': lastName,
                                        'date': dataSubmissao,
                                        'email': email,
                                        'comments': comments,
                                        'tipo': 'dúvida'};

                var numeroDuvida = 0;
                for (i=0; i<localStorage.length; i++){
                    var item = localStorage.getItem(localStorage.key(i));
                    var itemName = localStorage.key(i);
                    if (item.includes('"tipo":"dúvida"')){
                        if (itemName.includes('submissaoDuvida/Cliente' + firstName)){
                            if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroDuvida){
                                numeroDuvida = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                            }
                        }
                    }
                }
                if (numeroDuvida==0){
                    localStorage.setItem('submissaoDuvida/Cliente' + firstName + '/nº1', JSON.stringify(submissaoDuvida));
                    var retrievedObject = localStorage.getItem('submissaoDuvida/Cliente' + firstName + '/nº1');
                    console.log('submissaoDuvida/Cliente' + firstName + '/nº1', JSON.parse(retrievedObject));
                }
                else{
                    localStorage.setItem('submissaoDuvida/Cliente' + firstName + '/nº' + numeroDuvida, JSON.stringify(submissaoDuvida));
                    var retrievedObject = localStorage.getItem('submissaoDuvida/Cliente' + firstName + '/nº' + numeroDuvida);
                    console.log('submissaoDuvida/Cliente' + firstName + '/nº' + numeroDuvida, JSON.parse(retrievedObject));
                }
            }
        }
        alert("Dúvida submetida!");
    }
}

function cleanErrorMessages() {
    firstName_Error.style.display = "none";
    lastName_Error.style.display = "none";
    email_Error.style.display = "none";
    comments_Error.style.display = "none";
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