//Local storage
//json.parse pour convertir donnees au format JSON qui sont dans local storage en objet js
let commande = JSON.parse(localStorage.getItem("commande"));

for (line of commande) {
     displayLines(line);
}

//-------- display the articles : methode template -----//
function displayLines() {
    const templateElt = document.getElementById("templateLine");
    const cloneElt = document.importNode(templateElt.content, true);

    // cloneElt.getElementById("data").data-id = line.recup_Id;
    // cloneElt.getElementById("data").data-color = line.color;
    cloneElt.getElementById("img").src = line.image;
    cloneElt.getElementById("img").alt = line.alt;
    cloneElt.getElementById("name").textContent = line.name;
    cloneElt.getElementById("color").textContent = line.color;
    cloneElt.getElementById("price").textContent  =  line.price + ",00 €";
    cloneElt.getElementById("quantity").value  = line.quantity;
    
  
    document.getElementById("cart__items").appendChild(cloneElt);
  }


































