//-------------------- Local storage
var cart = JSON.parse(localStorage.getItem("commande"));
var empty = document.getElementById("empty")

console.log(cart)

if ( cart.length === 0){
     empty.textContent = "Votre panier est vide";
     console.log("ok")
}else{
     for (line of cart) {
     displayLines(line);
}
}

//-------- display the articles : methode template -----//
function displayLines() {
    const templateElt = document.getElementById("templateLine");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("data").dataset.id = line.recup_Id;
    cloneElt.getElementById("data").dataset.color = line.color;
    cloneElt.getElementById("img").src = line.image;
    cloneElt.getElementById("img").alt = line.alt;
    cloneElt.getElementById("name").textContent = line.name;
    cloneElt.getElementById("color").textContent = line.color;
    cloneElt.getElementById("price").textContent  =  line.price;
    cloneElt.getElementById("quantity").value  = line.quantity;

    document.getElementById("cart__items").appendChild(cloneElt);
}

//-------------------- calcul du total des quantités à la sortie de la page produit --------------------//

let totalQuantity = 0;
for (line of cart){
     totalQuantity = (totalQuantity + line.quantity)
}
document.getElementById("totalQuantity").textContent  =  totalQuantity;

//-------------------- calcul du prix total à la sortie de la page produit --------------------//

let totalPrice = 0
for (line of cart){
     totalPrice = totalPrice + (line.price * line.quantity)
}
document.getElementById("totalPrice").textContent  =  totalPrice + ",00 €";



//-------------------- calcul dynamique du total des quantités --------------------//
// let totalQuantity = 0;
// let totalPrice = 0;
// let totalOrder = document.getElementById("cart__items");
// let pricePerLine = 0;

// console.log (totalOrder);

// document.getElementById(dataset.id});

// console.log (article);

// for (article in totalOrder){
//      let quantity = parseInt(document.getElementById("quantity").value);
//      console.log("xxx" + quantity)
//      let price = document.getElementById("price").value;
//      console.log("xxx" + price)
//      pricePerLine = price * quantity;
// }

// totalQuantity = totalQuantity + quantity;
// totalPrice = totalPrice + pricePerLine;
// document.getElementById("totalQuantity").textContent  =  totalQuantity;
// document.getElementById("totalPrice").textContent  =  totalPrice + ",00 €";





//-------------- function delete ------------------------//

let elementList = document.querySelectorAll(".deleteItem");
console.log(elementList);

// document.getElementById("delete").onclick = (event)=> {
//      event.preventDefault();
//      if (window.confirm("Voulez-vous vraiment supprimer cet article de votre panier?")){

//           elementList = parentNode.querySelectorAll(article);
//           console.log(elementList);
     
//      //methode filter pour supprimer btn cliqué
//           cart = cart.filter(elt => elt.recup_id !== btnSupprimer);
//           localStorage.setItem("commande", JSON.stringify(commande));
//           alert("Article(s) supprimé(s) du panier");
//      //rechargement page
//           window.location.href="cart.html";


//      }else{
//           window.location.href = `cart.html`;;
//      }
// }

     




