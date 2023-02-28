const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEntradas = document.querySelector('.entradas');
const btnEspeciales = document.querySelector('.especial');
const btnSopas = document.querySelector('.sopa');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded', () => {
  eventos();
  platillos();
});
const eventos = () => {
  menu.addEventListener('click', abrirMenu);

}

const abrirMenu = () => {
  navegacion.classList.remove('ocultar');
  botonCerrar();
}
const botonCerrar = () => {
  const btnCerrar = document.createElement('p');
  const overlay = document.createElement('div');
  overlay.classList.add('pantalla-completa');
  const body = document.querySelector('body');
  if (document.querySelectorAll('.pantalla-completa').length > 0) return;
  body.appendChild(overlay);
  btnCerrar.textContent = 'x';
  btnCerrar.classList.add('btn-cerrar');

  // while(navegacion.children[5]){
  //  navegacion.removechild(navegacion.children[5]);
  // }
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
}
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

imagenes.forEach(imagen => {

  imagen.src = imagen.dataset.src;
})
const cerrarMenu = (boton, overlay) => {
  boton.addEventListener('click', () => {
    navegacion.classList.add('ocultar');
    overlay.remove();
    boton.remove();
  });
  overlay.onclick = function () {
    overlay.remove();
    navegacion.classList.add('ocultar');
    boton.remove();
  }
}

const platillos = () => {
  let platillosArreglo = [];
  const platillos = document.querySelectorAll('.platillo');

  platillos.forEach(platillo => platillosArreglo = [...platillosArreglo, platillo]);

  const entradas = platillosArreglo.filter(entrada => entrada.getAttribute('data-platillo') === 'entrada');
  const especial = platillosArreglo.filter(especial => especial.getAttribute('data-platillo') === 'especial');
  const sopa = platillosArreglo.filter(sopa => sopa.getAttribute('data-platillo') === 'sopa');
  const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');

  mostrarPlatillos(entradas, especial, sopa, postres, platillosArreglo);

}

const mostrarPlatillos = (entradas, especial, sopa, postres, todos) => {
  btnEntradas.addEventListener('click', () => {
    limpiarHtml(contenedorPlatillos);
    entradas.forEach(entrada => contenedorPlatillos.appendChild(entrada));
  });

  btnEspeciales.addEventListener('click', () => {
    limpiarHtml(contenedorPlatillos);
    especial.forEach(especial => contenedorPlatillos.appendChild(especial));
  });

  btnSopas.addEventListener('click', () => {
    limpiarHtml(contenedorPlatillos);
    sopa.forEach(sopa => contenedorPlatillos.appendChild(sopa));
  });
  btnPostres.addEventListener('click', () => {
    limpiarHtml(contenedorPlatillos);
    postres.forEach(postre => contenedorPlatillos.appendChild(postre));
  });
  btnTodos.addEventListener('click', () => {
    limpiarHtml(contenedorPlatillos);
    todos.forEach(todo => contenedorPlatillos.appendChild(todo));
  });
}

const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}