//-------------------- local storage -----------------------------//
var cart = JSON.parse(localStorage.getItem("commande"));
var empty = document.getElementById("empty");


//------------------ hydrating the cart --------------------------//
( () => {
     if ( cart.length == 0){
          empty.textContent = "Votre panier est vide";
          console.log("ok")
     }else{
          for (i = 0; i < cart.length; i++) {
          let line = cart[i]
          displayLines(line);
          }
     }
})()

          //-------- display the articles : methode template -----//
function displayLines(line) {
    const templateElt = document.getElementById("templateLine");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("data").dataset.id = line.recup_Id;
    cloneElt.getElementById("data").dataset.color = line.color;
    cloneElt.getElementById("data").dataset.index = i;
    cloneElt.getElementById("img").src = line.image;
    cloneElt.getElementById("img").alt = line.alt;
    cloneElt.getElementById("name").textContent = line.name;
    cloneElt.getElementById("color").textContent = line.color;
    cloneElt.getElementById("price").textContent  =  line.price;
    cloneElt.getElementById("quantity").value  = line.quantity;

    document.getElementById("cart__items").appendChild(cloneElt);
}

//-- calcul du total des quantités à la sortie de la page produit --//

// let totalQuantity = 0;
// for (line of cart){
//      totalQuantity = (totalQuantity + line.quantity)
// }
// document.getElementById("totalQuantity").textContent  =  totalQuantity;

//-- calcul du prix total à la sortie de la page produit   ---------//

// let totalPrice = 0
// for (line of cart){
//      totalPrice = totalPrice + (line.price * line.quantity)
// }
// document.getElementById("totalPrice").textContent  =  totalPrice + ",00 €";



//-------------------- calcul dynamique du total des quantités et affichage sur la page --------------------//
let totalQuantity = 0;
let totalPrice = 0;
let totalOrder = document.querySelectorAll("article");
let pricePerLine = 0;

function showTotal () {for (i = 0; i < totalOrder.length; i++){
     
     let quantityPerLine = totalOrder[i].lastElementChild.lastElementChild.firstElementChild.lastElementChild.valueAsNumber;
     // another way to get quantity :
     //let quantity = parseInt(totalOrder[i].lastElementChild.lastElementChild.firstElementChild.lastElementChild.valueAsNumber);
    
     let price = parseInt(totalOrder[i].lastElementChild.firstElementChild.lastElementChild.lastElementChild.textContent);
     
     pricePerLine = price * quantityPerLine;

     totalQuantity = totalQuantity + quantityPerLine;
     totalPrice = totalPrice + pricePerLine;
}}

showTotal()
document.getElementById("totalQuantity").textContent  =  totalQuantity;
document.getElementById("totalPrice").textContent  =  totalPrice + ",00 €";


//-------------------- changer la quantité --------------------//

var input = document.querySelectorAll('.itemQuantity');


for (j = 0; j < input.length; j++){
     let k = cart.indexOf(cart[j]);
     let lineTochange = cart[j];

     input[j].onchange = (e) =>{

          let newQuantity = parseInt(e.target.value);
          cart[k] = {
               alt: lineTochange.alt,
               color: lineTochange.color,
               image:lineTochange.image,
               name: lineTochange.name,
               price: lineTochange.price,
               quantity: newQuantity,
               recup_Id: lineTochange.recup_Id,   
          };

     localStorage.setItem("commande", JSON.stringify(cart));
     window.location.href = "cart.html"        
     }
}


//-------------- function delete ------------------------//

let articleBtn = document.querySelectorAll(".deleteItem");

for (i=0; i < articleBtn.length; i++){
     
     let idArticleDelete = articleBtn[i].parentNode.parentNode.parentNode.parentNode.dataset.index;
     articleBtn[i].onclick = (event) => {
          event.preventDefault();
          cart = cart.filter(elt => cart.indexOf(elt) != idArticleDelete);
          if(window.confirm(`L'article va être retiré de votre panier. Veuillez appuyer sur OK pour continuer.`))
          {
               localStorage.setItem("commande", JSON.stringify(cart));
               window.location.href = "cart.html"
          } else {
               window.location.href = `cart.html`;
          }
}
}

//----------------------- Regex Checks -------------------------// 
let regexText = (value) => {
     console.log("rgt" + value)
     // https://regex101.com/r/gY7rO4/14
     console.log(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value))
     return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
};
let regexAddress = (value) =>{
     console.log("rga" + value)
 // Cette regex accepte minimum de trois caractères 
 // et il n'y a pas de limite max de caractères. 
 //L'input peut inclure a-z, A-Z, des alphabets, des espaces, des virgules(,),
 // point(.), apostrophe ( ' ) et le tiret(-) des symboles.
 console.log(/^[a-zA-Z0-9À-ÿ\s,.'-]{3,}$/.test(value))
     return /^[a-zA-Z0-9À-ÿ\s,.'-]{3,}$/.test(value);
};
let regexZip = (value) =>{
     console.log("rgZ" + value)
 //    Code postal au format 31 100 ou 31100
      return /^([A-Z]+[A-Z]?\-)?[0-9]{1,2} ?[0-9]{3}$/.test(value);
};
let regexEmail = (value) =>{
     console.log("rgE" + value)
 //    Adresse e-mail au format contact@montrezvous.net
       return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(value);
};
 
//---------------- Validation et envoi formulaire au LocalStorage -------------------//

var contact = "";
let orderBtn = document.querySelector('#order');

function check() {
      
     if( document.getElementById("firstName").value == "" ) {
          document.getElementById("firstNameErrorMsg").textContent = "Veuillez renseigner un prénom";
          // document.getElementById("firstName").focus() ;
          return false;
     }
     if( regexText(document.getElementById("firstName").value) == false) {
          document.getElementById("firstNameErrorMsg").textContent = "Veuillez corriger le champ, sans chiffres ni caractères spéciaux";
          // document.getElementById("firstName").focus() ;
          return false;
     }
     if( document.getElementById("lastName").value == "" ) {
          document.getElementById("lastNameErrorMsg").textContent = "Veuillez renseigner un nom";
          // document.getElementById("lastName").focus() ;
          return false;
     }
     if( regexText(document.getElementById("lastName").value) == false) {
          document.getElementById("lastNameErrorMsg").textContent = "Veuillez renseigner un nom valide, sans chiffres ni caractères spéciaux";
          // document.getElementById("lastName").focus() ;
          return false;
     }
     if( document.getElementById("address").value == "" ) {
          document.getElementById("addressErrorMsg").textContent = "Veuillez renseigner une adresse";
          // alert( "Veuillez renseigner une adresse" );
          // document.getElementById("address").focus() ;
          return false;
     }
     if( regexAddress(document.getElementById("address").value) == false) {
          document.getElementById("addressErrorMsg").textContent = "Veuillez renseigner une adresse valide";
          // alert( "Veuillez renseigner une adresse valide" );
          // document.getElementById("address").focus() ;
          return false;
     }
     if( document.getElementById("zip").value == "" ) {
          document.getElementById("zipErrorMsg").textContent = "Veuillez renseigner un code postal";
          // alert( "Veuillez renseigner un code postal" );
          // document.getElementById("zip").focus() ;
          return false;
     }
     if( regexZip(document.getElementById("zip").value) == false) {
          document.getElementById("zipErrorMsg").textContent = "Veuillez renseigner un code postal valide";
          // alert( "Veuillez renseigner un code postal valide" );
          // document.getElementById("zip").focus() ;
          return false;
     }
     if( document.getElementById("city").value == "" ) {
          document.getElementById("cityErrorMsg").textContent = "Veuillez renseigner un nom de ville";
          // alert( "Veuillez renseigner un nom de ville" );
          // document.getElementById("city").focus() ;
          return false;
     }
     if( regexText(document.getElementById("city").value) == false) {
          document.getElementById("cityErrorMsg").textContent = "Veuillez renseigner un nom de ville valide";
          // alert( "Veuillez renseigner un nom de ville valide" );
           document.getElementById("city").focus() ;
          return false;
     }
     if( document.getElementById("email").value == "" ) {
          document.getElementById("emailErrorMsg").textContent = "Veuillez renseigner un email";
          // alert( "Veuillez renseigner un email" );
          document.getElementById("email").focus() ;
          return false;
     }
     if( regexEmail(document.getElementById("email").value) == false) {
          document.getElementById("emailErrorMsg").textContent = "Veuillez renseigner un email valide";
          // alert( "Veuillez renseigner un email valide" );
          document.getElementById("email").focus() ;
          return false;
     }
     return( true );
}


orderBtn.onclick = (event) => {
     //---------- Pour ne pas réactualiser la page ---------//
     event.preventDefault();
     
     if (check()){
     contact = {
          firstName : document.getElementById("firstName").value.toUpperCase(),
          lastName : document.getElementById("lastName").value.toUpperCase(),
          address : document.getElementById("address").value.toUpperCase(),
          city : document.getElementById("zip").value + ' ' + document.getElementById("city").value.toUpperCase(),
          email : document.getElementById("email").value   
     };}else{
          alert("Veuillez compléter le formulaire")
     }
     console.log(contact)

     var sumup = {
          cart,
          contact,
          totalQuantity,
          totalPrice
  };
  
  console.log(sumup);
}
