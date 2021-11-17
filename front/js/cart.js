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
let regexTexte = (value) => {
     console.log(value)
     return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
     };
 let regexAdresse = (value) =>{
     return /^[0-9]\ ([A-Za-z]*)$/.test(value);
 };
 let regexZip = (value) =>{
      return /^[0-9]{,5}/.test(value);
  };
 let regexEmail = (value) =>{
 //     return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(value);
       return /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z0-9_-]+){2,4}$/.test(value);
 };
 
 //----------------------- Regex Checks : first name -------------------------// 
 function firstNameCheck (contact) {
      let firstName = contact.firstName;
      if (regexTexte(firstName)) {
      document.getElementById("firstNameErrorMsg").textContent= ""
      return true;
      }else{
      document.getElementById("firstNameErrorMsg").textContent= "Veuillez un prénom";
      return false;
      }
 };
 //----------------------- Regex Checks : last name -------------------------// 
 function lastNameCheck (contact) {
      let lastName = contact.lastName;
      if (regexTexte(lastName)) {
      document.getElementById("lastNameErrorMsg").textContent= ""
      return true;
      }else{
      document.getElementById("lastNameErrorMsg").textContent= "Veuillez renseigner un nom de famille"
      return false;
      }
 };  
 //----------------------- Regex Checks : adress -------------------------// 
 function adressCheck (contact) {
     let address = contact.address;
 if (regexAdresse(address)) {
     document.getElementById("addressErrorMsg").textContent= ""
     return true;
 }else{
     document.getElementById("addressErrorMsg").textContent= "Veuillez renseigner un numéro de voie"
     return false;
 }
 };
 //----------------------- Regex Checks : zip -------------------------// 
 function zipCheck (contact) {
      let zip = contact.zip;
  if (regexZip(zip)) {
      document.getElementById("zipErrorMsg").textContent= ""
      return true;
  }else{
      document.getElementById("zipErrorMsg").textContent= "Veuillez renseigner un numéro de code postal"
      return false;
  }
  };
 //----------------------- Regex Checks : city -------------------------// 
 function cityCheck (contact) {
      let city = contact.city;
      if (regexPrenomNomVille(city)) {    
      document.getElementById("cityErrorMsg").textContent= ""
      return true;
      }else{
      document.getElementById("cityErrorMsg").textContent= "Veuillez renseigner un nom de ville"
      return false;
      }
 };
 //----------------------- Regex Checks : email -------------------------// 
 function emailCheck (contact) {
     let email = contact.email;
 if (regexEmail(email)) {
     document.getElementById("emailErrorMsg").textContent= ""
     return true;
 }else{
     document.getElementById("emailErrorMsg").textContent= "Veuillez renseigner un email valide"
     return false;
 }  
 };


