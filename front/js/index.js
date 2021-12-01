//----------- main function -------------// 
(async () => {
  const canapes = await getArticles();
  for (canape of canapes) {
    displayArticles(canape);
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
    .then(function (responseJson) {
      console.log("article :" +responseJson);
      console.log(responseJson);
      return responseJson;
    })
    .catch(function (error) {
      alert(error);
    });
}

//---- subfunction : second, display the articles : methode template -----//
function displayArticles(canape) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("img").src = canape.imageUrl;
  cloneElt.getElementById("img").alt = canape.altTxt;
  cloneElt.getElementById("name").textContent = canape.name;
  cloneElt.getElementById("description").textContent = canape.description;
  cloneElt.getElementById("link").href += `?id=${canape._id}`;

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
