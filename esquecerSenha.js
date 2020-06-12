function mandarMail() {
    // var newPassword = generatePassword();
    var emailAddress = document.getElementById("email").value.trim();
    // var emailBody = "A sua nova senha é a seguinte: "
    // var wholeEmail = emailBody + newPassword;

    var accountExists = 0;
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        // var itemName = localStorage.key(i);
        if (item.includes('"tipo":"conta"')){
            if (item.includes('"email":"' + emailAddress + '"')){
                accountExists = 1;

                // // mudar a password na memória
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
                alert("A sua senha é " + item.substring(indexArray[4]+2,indexArray2[4]-1));
                // var firstPart = item.substring(0,indexArray[4]+2);
                // var lastPart = item.substring(indexArray2[4]-1);
                // var newItem = firstPart + newPassword + lastPart;
                // localStorage.removeItem(item);
                // localStorage.setItem(itemName, JSON.stringify(newItem));
               
            }
        }
    }
    if (accountExists==0){
        alert("não há nenhuma conta com esse e-mail!");
        return;
    }
 }

//  // gerar uma nova password aleatória
// function generatePassword() {
//     var length = 8,
//         charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//         retVal = "";
//     for (var i = 0, n = charset.length; i < length; ++i) {
//         retVal += charset.charAt(Math.floor(Math.random() * n));
//     }
//     return retVal;
// }