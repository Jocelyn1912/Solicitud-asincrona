const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

//Evento del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});


//Creando objeto XHR
function getNews() {
  const articleRequest = new XMLHttpRequest();
  // Abriendo conección con .open, en este caso toma como parametro el metodo GET (se utiliza para recuperar datos/ POST = envía datos) y la URL para la solicitud
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a0d7f5594d134b0c8483bf3df55bbbd3`);
  // .onload Maneja la respuesta exitosa a nuestra solicitud XHR
  articleRequest.onload = addNews;
  // eN CASO DE QUE NO SE PUEDA EJECUTAR LA SOLICITUD USAMOS . onerror y así sabremos que es lo que está fallando
  articleRequest.onerror = handleError;
  // con .send enviamos la solicitud al servidor
  articleRequest.send();
}

// Función encargada de la respuesta
function addNews() {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}

// Función de error
function handleError() {
  console.log('se ha presentado un error');
}