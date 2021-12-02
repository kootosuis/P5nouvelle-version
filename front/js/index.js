//----------- main function -------------// 
(async () => {
  const canapes = await getCatalogue();
  for (canape of canapes) {
    displayCatalogue(canape);
  }
})();

//---- subfunction : first, get the articles-----//
function getCatalogue() {
  return fetch("http://localhost:3000/api/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      return responseJson;
    })
    .catch(function (error) {
      alert(error);
    });
}

//---- subfunction : second, display the articles : methode template -----//
function displayCatalogue(canape) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("img").src = canape.imageUrl;
  cloneElt.getElementById("img").alt = canape.altTxt;
  cloneElt.getElementById("name").textContent = canape.name;
  cloneElt.getElementById("description").textContent = canape.description;
  cloneElt.getElementById("link").href += `?id=${canape._id}`;

  document.getElementById("items").appendChild(cloneElt);
}

//------------------ innerHTML method --------------//
// function displayArticles (canape){
//     document.getElementById("items").innerHTML += `
    
//       <a id="link" href="product.html?id=${canape._id}">
//         <article>
//             <img src="${canape.imageUrl}"
//                  alt="${canape.altTxT}"/>
//             <h3 id="name" class="productName">${canape.name}</h3>
//             <p>${canape.price},00 €</p>
//             <p id="description" class="productDescription">${canape.description}</p>
//         </article>
//       </a>`
// }
