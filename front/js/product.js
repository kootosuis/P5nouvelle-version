
var article = null;
var articleId = null;

//----------- main function -------------// 
(async () => {
  articleId = getArticleId();
  article = await getArticle(articleId);
  fillArticle(article);
})();

//---- subfunction : first, get the article's id -----//
function getArticleId() {
  return new URL(window.location.href).searchParams.get('id')
}

//---- subfunction : second, get the article's infos -------//
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (article) {
      console.log(article);
      return article;
    })
    .catch(function (error) {
      alert(error);
    });  
}

//---- subfunction : finally, hydrate the article's html ------------//
function fillArticle(article) {

  // Display main info
  document.getElementById("img").src = article.imageUrl;
  document.getElementById("name").textContent = article.name;
  document.getElementById("price").textContent = article.price + ",00 €";
  document.getElementById("description").textContent = article.description;

  // step 1 : get the list, and each item of it
  article.colors.forEach((color)=>{

    //step 2 : create an option
    const option = document.createElement("option");
    
    // step 3 : complete it with the usefull info
    option.value = color;
    option.textContent = color;
    
    // step 4 : push the option to the select
    document.getElementById("colors").add(option);
  })

  console.log(article);
  return article
}

//-------- function to change the picture when choice made -----//

// function changePicture() {
//   var selectBox = document.getElementById("colors");
//   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
//   alert(selectedValue);
//   const state = { 'page_id': 1, 'user_id': 5 }
//   const title = `${selectedValue}`
//   const url = `./products.html?id=${ArtId}${selectedValue}`;
//   window.history.pushState(state, title, url)  
//  }

document.getElementById('addToCart').onclick =  (event)=> {
//Pour ne pas réactualiser la page
  event.preventDefault();

  //--------- stockage des choix -----//
  let colors = document.getElementById("colors");
  let choosenColor = colors.options[colors.selectedIndex].value;
  console.log("couleur choisie " + choosenColor);
  let choosenQuantity = parseInt(document.getElementById("quantity").value);
  console.log("quantité " + choosenQuantity);
 
    let KanapOptions = {
      image:article.imageUrl,
      alt:article.altTxt,
      name: article.name,
      recup_Id: article._id,
      color: choosenColor,
      quantity: choosenQuantity,
      price: article.price,
    };
    console.log("xxx" + KanapOptions);

    //----------- pop up de confirmation (ou pas) pour plusieurs exemplaires -------------//
    let messageConf = () => {
      if(window.confirm(
        `L'article ${article.name} option: ${choosenColor} va être ajouté à votre panier 
        en ${choosenQuantity} exemplaires.
        Veuillez appuyer sur OK pour voir le panier ou ANNULER 
        pour retourner à l'accueil`)){
        confirmation ()
      }
      else {
      window.location.href = `index.html`;
      }
      }
    //----------- pop up de confirmation (ou pas) pour 1 seul exemplaire     -------------//
    let messageConf1 = () => {
      if(window.confirm(
        `L'article ${article.name} option: ${choosenColor} va être ajouté à votre panier 
        en ${choosenQuantity} exemplaire.
        Veuillez appuyer sur OK pour voir le panier ou ANNULER 
        pour retourner à l'accueil`)){
        confirmation ()
      }
      else {
        window.location.href = `index.html`;;
      }
      }

    //----------- message alerte si pas couleur et/ou quantité      -------------//
    let messageColor = () => {
      window.confirm(`Veuillez choisir une couleur`);
      window.location.href = `product.html?id=${articleId}`;
    }
    let messageQuantity = () => {
      window.confirm(`Veuillez choisir une quantité`);
      window.location.href = `product.html?id=${articleId}`;
    }
    let messageCetQ = () => {
      window.confirm(`Veuillez choisir une couleur et une quantité`);
      window.location.href = `product.html?id=${articleId}`;
    }

    //-----fonction confirmation et envoi des choix au localStorage
    
    function confirmation () {
      let commandeLS = JSON.parse(localStorage.getItem("commande"))
      console.log(commandeLS)
    
      //------ things already in the localStorage ----------------//
      if (commandeLS){
        console.log("ok")
        commandeLS.push(KanapOptions);
        localStorage.setItem("commande", JSON.stringify(commandeLS));

      //------ things not yet in the localStorage ----------------//
      }else{
        commandeLS = []
        commandeLS.push(KanapOptions);
        localStorage.setItem("commande", JSON.stringify(commandeLS));
      }
      console.log(commandeLS);
      window.location.href = "cart.html";  
    }


    
    //------------ procédure de confirmation (ou pas)           ----------------//

    if(choosenQuantity == 0 && choosenColor == ""){
      messageCetQ ();
    }else if(choosenQuantity != 0 && choosenColor == ""){
      messageColor();
    }else if(choosenQuantity == 0 && choosenColor != ""){
      messageQuantity();
    }else if(choosenQuantity >= 1 && choosenColor != ""){

       if(choosenQuantity == 1){
        messageConf1();
      }
      else{
        messageConf()
      }
    }
    else{
      alert("Ooops, il s'est passé quelquechose de bizarre")
    }
    
}