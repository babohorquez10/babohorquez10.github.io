let llamado = false;
let terminoExp = false;
let terminaron = 0;
let arrBool = [];
const divLeng = document.getElementById("divHabilidades");
const divExp = document.getElementById("divExperiencia");
const arrSecciones = document.getElementsByClassName("seccion");
const arrLinks = document.getElementsByClassName("nav-item");
let arrCartas = document.getElementsByClassName("carta-experiencia");
let linkActivo = document.getElementById("link-perfil");
let seccionActual = document.getElementById("divPerfil");

function moveSlider(slider, valor) {
  let width = 10;

  let id = setInterval(frame, 30);

  function frame() {
    if(width >= valor) {
      clearInterval(id);
    } else {
      width++;
      let texto = width + "%"
      slider.style.width = texto;
      slider.textContent = width;
    }
  }
}

function moverCarta(carta) {
  let opac = 0.1;

  let id = setInterval(frame, 20);

  function frame() {
    if(opac >= 1) {
      clearInterval(id);
    } else {
      opac += 0.01;
      carta.style.opacity = opac;
    }
  }
}

function activarLink(divSeccion) {
  for (var i = 0; i < arrLinks.length; i++) {

    let itemActual = arrLinks.item(i);
    let nombreDiv = itemActual.querySelector("a").href.split("#");

    if(nombreDiv[nombreDiv.length - 1] === divSeccion.id)
    {
      if(linkActivo) linkActivo.classList.remove("active");
      itemActual.classList.add("active");
      linkActivo = itemActual;
    }
  }
}

function verSeccionActual( ) {
  let mayor = arrSecciones.item(0);

  for (var i = 1; i < arrSecciones.length; i++) {
    let actual = arrSecciones.item(i);
    if(window.scrollY + 20 >= actual.offsetTop && actual.offsetTop > mayor.offsetTop) mayor = actual;
  }

  if(mayor !== seccionActual) {
    seccionActual = mayor;
    activarLink(seccionActual);
  }
}

function scrollEvents( ) {
  verSeccionActual();

  if(!llamado && window.scrollY >= (divLeng.offsetTop - window.innerHeight * 0.4) ) {
    slidersLenguajes();
    llamado = true;
  }

  let cartaActual;

  for (let i = 0; !terminoExp && i < arrBool.length; i++) {
    cartaActual = arrCartas.item(i);

    // Alternativo.
    // if(!arrBool[i] && window.scrollY >= (divExp.offsetTop + cartaActual.offsetTop - window.innerHeight * 0.5))

    if(!arrBool[i] && window.scrollY >= (divExp.offsetTop + cartaActual.parentNode.offsetTop - window.innerHeight * 0.5)) {
      moverCarta(cartaActual);
      arrBool[i] = true;
      terminaron++;
      terminoExp = terminaron === arrCartas.length;
    }
  }
}

function agregarEventosNavLinks( ) {

  for (var i = 0; i < arrLinks.length; i++) {
    arrLinks.item(i).addEventListener("click", function () {
      if(linkActivo) linkActivo.classList.remove("active");
      this.classList.add("active");
      linkActivo = this;
    });
  }
}

function agregarEventos() {

  agregarEventosNavLinks();

  for (let i = 0; i < arrCartas.length; i++) {
    arrBool.push(false);
  }

  scrollEvents();
  window.addEventListener("scroll", scrollEvents);
}

function slidersLenguajes( ) {
  moveSlider(document.getElementById("sliderJava-pg"), 90);
  moveSlider(document.getElementById("sliderJS-pg"), 85);
  moveSlider(document.getElementById("sliderKotlin-pg"), 70);
  moveSlider(document.getElementById("sliderSQL-pg"), 60);
  moveSlider(document.getElementById("sliderPython-pg"), 60);
  moveSlider(document.getElementById("sliderCS-pg"), 75);
}

agregarEventos();