

/*Funcion que inicia el juego */
document.addEventListener("DOMContentLoaded", () => { 
  const h3 = document.querySelector('h3');
  const h2 = document.querySelector('h2');
  const INICIO = document.getElementById('inicio');
  const REINICIO= document.getElementById('reiniciar');
  const botonFacil=document.getElementById('Facil');
  const botonMedio=document.getElementById('Intermedio');
  const botonDificil=document.getElementById('Dificil');
   REINICIO.style.display = 'none';
   INICIO.style.display = 'none';
   // Cantidad de pares para cada nivel
    const nivelFacil=3;
    const nivelIntermedio=6;
    const nivelDificil= 9;

let tarjetas = [
    {
      nombre: "Tony Stark",
      imagen:
      'imagenes/tonyStark.png'
    },
    {
      nombre: "Capitan America",
      imagen: 'imagenes/CapitanAmerica.png'
    },
    {
      nombre: "Viuda Negra",
      imagen:
      'imagenes/viudaNegra.png'
    },
    {
      nombre: "Thor",
      imagen:
      'imagenes/thor.png'
    },
    {
      nombre: "Halcon",
      imagen:
      'imagenes/OjodeHalcon.png'
    },
    {
      nombre: "Dr Strange",
      imagen:
      'imagenes/DrStrange.png'

    },
    {
      nombre: "Ant man",
      imagen:
      'imagenes/ant-man.png'

    },
    {
      nombre: "Bucky",
      imagen:
      'imagenes/Bucky.png'

    },
    {
      nombre: "Gamora",
      imagen:
      'imagenes/gamora.png'

    },
    {
      nombre: "Loki",
      imagen:
      'imagenes/Loki.png'

    },
    {
      nombre: "Rocket y Groot",
      imagen:
      'imagenes/rocketandgroot.png'

    },
    {
      nombre: "Peter",
      imagen:
      'imagenes/star-Lord.png'

    },
    {
      nombre: "Wanda",
      imagen:
      'imagenes/wanda.png'

    },
  ];

  const grid = document.getElementById("grid");
   var cartasSeleccionadas = []; //va a ser un array de los índices de cada tarjeta seleccionada
   var contadorGanados = 0;
  const resultado = document.getElementById("resultado"); //para mostrar los resultados a medida se encuentran los pares

//este es el algoritmo de mezcla Fisher-Yates
function revolverTarjetas(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];    //para el intercambio se utiliza una variable auxiliar
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

 
  function armarTablero() {
    for (let i = 0; i < tarjetas.length; i++) {
//creamos un elemento de tipo <img />
const tarjeta = document.createElement("img");
//seteamos la imagen de patron por defecto
tarjeta.setAttribute(
  "src",
  "Fondos/foto.png"
);
tarjeta.setAttribute("data-index", i);

//esto es para agregar las clases al objeto "tarjeta"
tarjeta.classList.add("imagen");
tarjeta.setAttribute("name", tarjetas[i].nombre);

tarjeta.addEventListener("click", voltearTarjeta);
// agregamos el elemento creado a la grilla

grid.appendChild(tarjeta)
}
}

function voltearTarjeta() {
    let index = this.getAttribute("data-index");
    cartasSeleccionadas.push(index);
    this.setAttribute("src", tarjetas[index].imagen);
    if (cartasSeleccionadas.length === 2) {
        setTimeout(validarTarjetasSeleccionadas, 500);
      }
}
//Valida las tarjetas 
function validarTarjetasSeleccionadas() {
    const listaTarjetas = document.querySelectorAll("img");
    const primeraTarjetaSeleccionadaIndex = cartasSeleccionadas[0];
const segundaTarjetaSeleccionadaIndex = cartasSeleccionadas[1];
if (primeraTarjetaSeleccionadaIndex == segundaTarjetaSeleccionadaIndex) {
    alert("¡Es la misma tarjeta!");
    //ponemos de vuelva a ambas la imagen del patron por defecto
    listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
      "src",
      "Fondos/foto.png"
    );
    listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
      "src",
      "Fondos/foto.png"
    );
  }else if (listaTarjetas[primeraTarjetaSeleccionadaIndex].name === listaTarjetas[segundaTarjetaSeleccionadaIndex].name) {
    //el atributo "name" guarda el nombre de la ficha
    alert("¡Correcto!");
    //cambiar la imagen por la del patron de finalizacion
    listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
      "src",
      "Fondos/par.jpg"
    );
    listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
      "src",
      "Fondos/par.jpg"
    );
    //evitamos que se pueda volver a hacer click en las mismas
    listaTarjetas[primeraTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
    listaTarjetas[segundaTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
    contadorGanados = contadorGanados + 2; //sumamos 2 porque fueron 2 las cartas correctas
}else {
        listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
          "src",
          "Fondos/foto.png"
        );
        listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
          "src",
          "Fondos/foto.png"
        );
  }
 
  cartasSeleccionadas = [];
if (contadorGanados === tarjetas.length) {
  resultado.textContent = "¡Felicidades! ¡Los encontraste a todos!";
  INICIO.style.display = 'none';
  REINICIO.style.display = 'block';
} else {
  resultado.textContent = (contadorGanados / 2)+" aciertos"; 
}
}
// Funcion para configurar los niveles
function jugarNivel(nivel){
  //en auxiliar se van a guardar la cantidad de imagenes necesarias segun el nivel
  const aux= [];
  for (let i = 0; i < nivel; i++) {
    //obtiene un indice aleatorio del arreglo original de imagenes
    const obtenerIndice = Math.floor(Math.random() * tarjetas.length);
    //Guarda en aux la imagen que tiene en ese indice obtenido
    aux.push(tarjetas[obtenerIndice]);
    tarjetas.splice(obtenerIndice, 1);
  }
  
  tarjetas = aux;
  tarjetas = tarjetas.concat(tarjetas); //duplicamos los elementos del array
  tarjetas = revolverTarjetas(tarjetas);
  }
//Funcion inicioJuego
function inicioJuego(){
INICIO.addEventListener('click', () => {
  INICIO.style.display = 'none';
  h2.style.display="none";
  h3.style.display="block"
  armarTablero();
});}
//Eventos para iniciar el juego segun Niveles
botonFacil.addEventListener('click', () => {
  h2.style.display="none";
  INICIO.style.display = 'block';
  botonFacil.style.display = 'none';
  botonMedio.style.display = 'none';
  botonDificil.style.display = 'none';
 jugarNivel(nivelFacil);
 inicioJuego();
});
botonMedio.addEventListener('click', () => {
  h2.style.display="none";
  INICIO.style.display = 'block';
  botonFacil.style.display = 'none';
  botonMedio.style.display = 'none';
  botonDificil.style.display = 'none';
  jugarNivel(nivelIntermedio);
  inicioJuego();
});
botonDificil.addEventListener('click', () => {
  h2.style.display="none";
  INICIO.style.display = 'block';
  botonFacil.style.display = 'none';
  botonMedio.style.display = 'none';
  botonDificil.style.display = 'none';
  jugarNivel(nivelDificil);
  inicioJuego();
});
//Evento para reiniciar
REINICIO.addEventListener('click', () => {
  location.reload();
});
// Mostrar la informacion
const AYUDA = document.getElementById("ayuda");
const INFORMACION = document.getElementById("informacion");
const MODALAYUDA= document.getElementById("modal-ayuda");
const MODALBENEFICIOS = document.getElementById("modal-beneficios");

//Para cerrar las ventanas emergentes
const CERRARAYUDA = MODALAYUDA.querySelector(".cerrar");
const CERRAR = MODALBENEFICIOS.querySelector(".cerrar");
// Agregar evento de clic al botón de ayuda para mostrar el modal de ayuda
AYUDA.addEventListener("click", ()=> {
  MODALAYUDA.style.display = "block";
});

// Agregar evento de clic al botón de beneficios para mostrar el modal de beneficios
INFORMACION.addEventListener("click", ()=> {
  MODALBENEFICIOS.style.display = "block";
});

// Agregar evento de clic al elemento de cierre de ayuda para ocultar el modal de ayuda
CERRARAYUDA.addEventListener("click", ()=> {
  MODALAYUDA.style.display = "none";
});

CERRAR.addEventListener("click", ()=> {
  MODALBENEFICIOS.style.display = "none";
});
});