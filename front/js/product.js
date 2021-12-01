//-------------- déclaration des variables ------------------//
var canapeId = null;
var canape = null;

var colors = document.getElementById("colors");
var choosenColor = null;
var choosenQuantity = null;

//----------- main function -------------//
(async () => {
  canapeId = getCanapeId();
  canape = await getCanape(canapeId);
  fillCanape(canape);
})();

//---- subfunction : first, get the article's id -----//
function getCanapeId() {
  return new URL(window.location.href).searchParams.get("id");
}
//---- subfunction : second, get the article's infos -------//
function getCanape(canapeId) {
  return fetch(`http://localhost:3000/api/products/${canapeId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (canapeJson) {
      return canapeJson;
    })
    .catch(function (error) {
      alert(error);
    });
}
// question : quelle autre méthode ?
// mettre dans le session storage
// ou dans un autre storage?

//---- subfunction : finally, hydrate the article's html ------------//
function fillCanape(canape) {
  // Display main info
  document.getElementById("img").src = canape.imageUrl;
  document.getElementById("name").textContent = canape.name;
  document.getElementById("price").textContent = canape.price + ",00 €";
  document.getElementById("description").textContent = canape.description;

  // step 1 : get the list, and each item of it
  canape.colors.forEach((color) => {
    //step 2 : create an option
    const option = document.createElement("option");

    // step 3 : complete it with the usefull info
    option.value = color;
    option.textContent = color;

    // step 4 : push the option to the select
    document.getElementById("colors").add(option);
  });
}

//----------- message alerte si pas couleur et/ou quantité      -------------//
function messageColor() {
  window.confirm(`Veuillez choisir une couleur`);
  // window.location.href = `product.html?id=${canapeId}`;
}
function messageQuantity() {
  window.confirm(`Veuillez choisir une quantité`);
  // window.location.href = `product.html?id=${canapeId}`;
}
function messageCetQ() {
  window.confirm(`Veuillez choisir une couleur et une quantité`);
  // window.location.href = `product.html?id=${canapeId}`;
}

//----------- variables de stockage---------------//
//----------- LS = LocalStorage ------------------//

var commandeLS = JSON.parse(localStorage.getItem("commande"));

function sendToCart(canape, commandeLS, choosenColor, choosenQuantity) {
  var KanapOptions = {
    image: canape.imageUrl,
    alt: canape.altTxt,
    name: canape.name,
    productId: canape._id,
    color: choosenColor,
    quantity: choosenQuantity,
    price: canape.price,
  };
  //------ things already in the localStorage ----------------//
  if (commandeLS) {
    const isPresent = (elt) =>
      elt.productId == KanapOptions.productId &&
      elt.color == KanapOptions.color;
    let t = commandeLS.findIndex(isPresent);

    if (t != -1) {
      let newQuantity = commandeLS[t].quantity + choosenQuantity;
      commandeLS[t] = {
        image: canape.imageUrl,
        alt: canape.altTxt,
        name: canape.name,
        productId: canape._id,
        color: choosenColor,
        quantity: newQuantity,
        price: canape.price,
      };
    } else {
      commandeLS.push(KanapOptions);
    }
    //------ things not yet in the localStorage ----------------//
  } else {
    commandeLS = [];
    commandeLS.push(KanapOptions);
  }
  //-----   envoi des choix au localStorage

  localStorage.setItem("commande", JSON.stringify(commandeLS));
  console.log(commandeLS);
  window.location.href = "cart.html";
}

//----------- pop up de confirmation (ou pas) pour plusieurs exemplaires -------------//
//----------- et  envoi au panier-----------------------------------------------------//
function confirmation(message) {
  if (window.confirm(message)) {
    sendToCart(canape, commandeLS, choosenColor, choosenQuantity);
  } else {
    window.location.href = `index.html`;
  }
}

function checkAndSend(canape, choosenQuantity, choosenColor) {
  if (choosenQuantity == 0 && choosenColor == "") {
    messageCetQ();
  } else if (choosenQuantity != 0 && choosenColor == "") {
    messageColor();
  } else if (choosenQuantity == 0 && choosenColor != "") {
    messageQuantity();
  } else if (choosenQuantity >= 1 && choosenColor != "") {
    if (choosenQuantity == 1) {
      //----------- pop up de confirmation (ou pas) pour 1 seul exemplaire     -------------//
      confirmation(`L'article ${canape.name} option: ${choosenColor} va être ajouté à votre panier en ${choosenQuantity} exemplaire.
              Veuillez appuyer sur OK pour voir le panier ou ANNULER pour retourner à l'accueil`);
    } else {
      //----------- pop up de confirmation (ou pas) pour plusieurs exemplaires     -------------//
      confirmation(`L'article ${canape.name} option: ${choosenColor} va être ajouté à votre panier en ${choosenQuantity} exemplaires.
          Veuillez appuyer sur OK pour voir le panier ou ANNULER pour retourner à l'accueil`);
    }
  } else {
    alert("Ooops, il s'est passé quelquechose de bizarre");
  }
}

//------------------ Add to cart -----------------//

document.getElementById("addToCart").onclick = (event) => {
  choosenColor = colors.options[colors.selectedIndex].value;
  choosenQuantity = parseInt(document.getElementById("quantity").value);
  //Pour ne pas réactualiser la page
  event.preventDefault();
  console.log("test1");
  checkAndSend(canape, choosenQuantity, choosenColor);
};
