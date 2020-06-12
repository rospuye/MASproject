function logout(){
    for (i=0; i<localStorage.length; i++){
        var item = localStorage.getItem(localStorage.key(i));
        var itemName = localStorage.key(i);
        if (item.includes('"tipo":"login"')){

            // mudar "tipo" do item de "login" para "cliente"
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
            var firstPart = item.substring(0,indexArray[6]+2);
            var lastPart = item.substring(item.length-2);
            var newItem = firstPart + "conta" + lastPart;
            localStorage.removeItem(item);
            localStorage.setItem(itemName, newItem);
            console.log(newItem);

            location.replace("home.html");
        }
    }
}