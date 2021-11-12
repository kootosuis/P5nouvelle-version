//----------- main function -------------// 
(async () => {
  const articleId = getArticleId();
  let article = await getArticle(articleId);
  fillArticle(article);
})();

//faut-il mettre cela dans la page panier?
const commande = [];
localStorage.setItem("commande", JSON.stringify(commande));

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
      // console.log("article : " + article.name);
      // console.log("article : " + article + " id : " + article._id)
      // console.log(article)
      // console.log(article._id)
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

  // Display all varnishes
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

  // if pas choisi de couleur veuillez choisir une couleur
  // if pas choisi de quantité veuillez indiquez une quantité

  // else

  // stockage des choix
  let colors = document.getElementById("colors");
  let choosenColor = colors.options[colors.selectedIndex].value;
  console.log("couleur choisie " + choosenColor);
  let choosenQuantity = document.getElementById("quantity").value;
  console.log("quantité " + choosenQuantity);

  //-----compilation des choix avec les infos de l'article
  let KanapId = new URL(window.location.href).searchParams.get('id');
  console.log(KanapId);
  let Kanap = getArticle(KanapId);
  Kanap = Promise.resolve(Kanap);
  
  Kanap.then((res) => {
    console.log(res)
    let KanapOptions = {
      image:res.imageUrl,
      alt:res.altTxt,
      name: res.name,
      recup_Id: res._id,
      color: choosenColor,
      quantity: choosenQuantity,
      price: res.price,
    };
    console.log(KanapOptions);

    //----------- pop up de confirmation pour plusieurs exemplaires -------------//
    let messageConf = () => {
    if(window.confirm(
      `L'article ${res.name} option: ${choosenColor} est dans votre panier 
      en ${choosenQuantity} exemplaires.
      Veuillez appuyer sur OK pour voir le panier ou ANNULER 
      pour retourner sur la page`)){
    window.location.href = "cart.html";
    }
    else {
    window.location.href = `product.html?id=${articleId}`;
    }
    }

    //----------- pop up de confirmation pour 1 seul exemplaire -------------//

    let messageConf1 = () => {
      if(window.confirm(
        `L'article ${res.name} option: ${choosenColor} est dans votre panier 
        en ${choosenQuantity} exemplaire.
        Veuillez appuyer sur OK pour voir le panier ou ANNULER 
        pour retourner sur la page`)){
      window.location.href = "cart.html";
      }
      else {
      window.location.href = `product.html?id=${articleId}`;
      }
    }

    //----------- message alerte si pas couleur et/ou quantité -------------//
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
    
    //------------ procédure de confirmation (ou pas) ----------------//

    if(commande && choosenQuantity == 0 && choosenColor == ""){
      messageCetQ ();
    }else if(commande && choosenQuantity != 0 && choosenColor == ""){
      messageColor();
    }else if(commande && choosenQuantity == 0 && choosenColor != ""){
      messageQuantity();
    }else if(commande && choosenQuantity == 1 && choosenColor != ""){
    //-----envoi des choix au localStorage
    commande.push(KanapOptions);
    localStorage.setItem("commande", JSON.stringify(commande));
    messageConf1();
    }else if(commande && choosenQuantity > 1 && choosenColor != null){
    //-----envoi des choix au localStorage
    commande.push(KanapOptions);
    localStorage.setItem("commande", JSON.stringify(commande));
    messageConf();
  }

    
  });

  console.log(commande);

}



