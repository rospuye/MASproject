function validarCandidatura(){
    console.log("CALL: validaCandidatura()...");

    var nomeOrganizacao = document.getElementById("organizacao").value.trim();
    var email = document.getElementById("email").value.trim();
    var contactoTelefonico = document.getElementById("telemovel").value.trim();
    var moradaSede = document.getElementById("localizacao").value.trim();
    var siteEmpresa = document.getElementById("site").value.trim();
    var portfolio = document.getElementById("portfolio").value.trim();

    var nomeOrganizacao_error = document.getElementById("nomeOrganizacao_Error");
    var email_error = document.getElementById("email_Error");
    var contactoTelefonico_error = document.getElementById("contactoTelefonico_Error");
    var moradaSede_error = document.getElementById("moradaSede_Error");
    var site_error = document.getElementById("site_Error");
    var portfolio_error = document.getElementById("portfolio_Error");
    var areaAtuacao_error = document.getElementById("areaAtuacao_Error");

    var areaAtuacao;
    if (document.getElementById("fotografia").checked==true){
        areaAtuacao = "Fotografia e Filmografia";
    }
    else if (document.getElementById("iluminacao").checked== true){
        areaAtuacao = "Iluminação e Cenografia";
    }
    else if (document.getElementById("som").checked== true){
        areaAtuacao = "Sistemas de Som";
    }
    else if (document.getElementById("instalacao").checked== true){
        areaAtuacao = "Instalação e Manutenção de Equipamentos";
    }
    else if (document.getElementById("seguranca").checked== true){
        areaAtuacao = "Segurança";
    }
    else if (document.getElementById("saude").checked== true){
        areaAtuacao = "Primeiros Socorros";
    }
    else if (document.getElementById("bilheteria").checked== true){
        areaAtuacao = "Bilheteria";
    }
    else{
        areaAtuacao = "none";
    }

    var value = true;
        
    cleanErrorMessages();

    if (nomeOrganizacao.length<5){
        nomeOrganizacao_error.style.display = "block";
        value = false;
    }
    if (!(validateEmail(email))) {
        email_error.style.display = "block";
        value = false;
    }
    if (!(allNumber(contactoTelefonico)) || contactoTelefonico.length < 9) {
        contactoTelefonico_error.style.display = "block";
        value = false;
    }
    if (moradaSede.length<5){
        moradaSede_error.style.display = "block";
        value = false;
    }
    if (!validateURL(siteEmpresa)){
        site_error.style.display = "block";
        value = false;
    }
    if (portfolio.length<5){
        portfolio_error.style.display = "block";
        value = false;
    }
    if (areaAtuacao=="none"){
        areaAtuacao_error.style.display = "block";
        value = false;
    }

    if (value==true){
        // reset form
        document.getElementById("form_fornecedor").reset();

        // inserir nova candidatura na local storage
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
                var dataSubmissao = d + "/" + m + "/" + y;

                var horaSubmissao = new Date().toLocaleTimeString();

                var submissaoCandidatura = { 'firstName': firstName,
                                        'lastName': lastName,
                                        'ID': ID,
                                        'date': dataSubmissao,
                                        'time': horaSubmissao,
                                        'nomeOrganizacao': nomeOrganizacao,
                                        'email': email,
                                        'contactoTelefonico': contactoTelefonico,
                                        'moradaSede': moradaSede,
                                        'siteEmpresa': siteEmpresa,
                                        'portfolio': portfolio,
                                        'areaAtuacao': areaAtuacao,
                                        'tipo': 'candidatura'};

                var numeroCandidatura = 0;
                for (i=0; i<localStorage.length; i++){
                    var item = localStorage.getItem(localStorage.key(i));
                    var itemName = localStorage.key(i);
                    if (item.includes('"tipo":"candidatura"') || item.includes('"tipo":"parceria"')){
                        if (itemName.includes('submissaoCandidatura/Cliente')){
                            if (parseInt(itemName.substring(itemName.indexOf("º") + 1))>=numeroCandidatura){
                                numeroCandidatura = parseInt(itemName.substring(itemName.indexOf("º") + 1)) + 1;
                            }
                        }
                    }
                }
                if (numeroCandidatura==0){
                    localStorage.setItem('submissaoCandidatura/Cliente' + ID + '/nº1', JSON.stringify(submissaoCandidatura));
                    var retrievedObject = localStorage.getItem('submissaoCandidatura/Cliente' + ID + '/nº1');
                    console.log('submissaoCandidatura/Cliente' + ID + '/nº1', JSON.parse(retrievedObject));
                }
                else{
                    localStorage.setItem('submissaoCandidatura/Cliente' + ID + '/nº' + numeroCandidatura, JSON.stringify(submissaoCandidatura));
                    var retrievedObject = localStorage.getItem('submissaoCandidatura/Cliente' + ID + '/nº' + numeroCandidatura);
                    console.log('submissaoCandidatura/Cliente' + ID + '/nº' + numeroCandidatura, JSON.parse(retrievedObject));
                }
            }
        }
        alert("Candidatura submetida!");
    }

}

function cleanErrorMessages(){
    nomeOrganizacao_Error.style.display = "none";
    email_Error.style.display = "none";
    contactoTelefonico_Error.style.display = "none";
    moradaSede_Error.style.display = "none";
    site_Error.style.display = "none";
    portfolio_Error.style.display = "none";
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

function validateURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }