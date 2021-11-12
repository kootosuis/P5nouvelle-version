//----------- main function -------------// 
(async () => {
  const articles = await getArticles();
  for (article of articles) {
    displayArticles(article);
  }
})();

//---- subfunction : first, get the articles-----//
function getArticles() {
  return fetch("http://localhost:3000/api/products")
    .then(function (response) {
      console.log("response :" + response);
      console.log(response);
      return response.json();
    })
    .then(function (articles) {
      console.log("article :" + articles);
      console.log(articles);
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

//---- subfunction : second, display the articles : methode template -----//
function displayArticles() {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("img").src = article.imageUrl;
  cloneElt.getElementById("img").alt = article.altTxt;
  cloneElt.getElementById("name").textContent = article.name;
  // cloneElt.getElementById("card__info__price").textContent =
  //   article.price / ",00 €";
  cloneElt.getElementById("description").textContent =
    article.description;
  cloneElt.getElementById("link").href += `?id=${article._id}`;

  document.getElementById("items").appendChild(cloneElt);
}

//------------------variante non explorée : methode innerHTML --------------//
// function displayArticles (){
//     document.getElementById("products").innerHTML += `
//     <article class="product">
//                         <a href="http://localhost:3000/api/furniture.${article.id}">
//                             <div class="card">

//                                 <div class="card__image">
//                                     <div class="card__image__img">
//                                             <img
//                                             src="${article.imageUrl}"
//                                             alt="description de la photo"/>
//                                     </div>
//                                 </div>

//                                 <div class="card__info">
//                                     <h3 class="card__info__name">${article.name}</h3>
//                                     <div class="card__info__price">${article.price}</div>
//                                     <div class="card__info__stars">
//                                             <img class="icon card__info--starng" src="icons/star-regular.svg" alt="icon">
//                                             <img class="icon card__info--starok" src="icons/star-solid.svg" alt="icon">
//                                     </div>
//                                     <div class="card__info__description">
//                                             <p>${article.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </a>
//     </article>`
// }
