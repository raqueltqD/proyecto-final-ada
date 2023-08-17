// necesitamos un elemento de html
// hacer el pedido fetch
// link de la api
// Elementos del HTML, el signo $ es para saber que es de html

let $contenedorCajas = document.getElementById('contenedor-cajas');
let $totalPersonajes = document.getElementById('total-personajes');
let $todos = document.getElementById('todos');
let $mujer = document.getElementById('mujer');
let $hombre = document.getElementById('hombre');
let $sinGenero = document.getElementById('sin-genero');
let $desconocido = document.getElementById('desconocido');
let $paginado = document.getElementById('paginado');
let $primeraPagina = document.getElementById('primera-pagina');
let $paginaAnterior = document.getElementById('pagina-anterior');
let $paginaSiguiente = document.getElementById('pagina-siguiente');
let $ultimaPagina = document.getElementById('ultima-pagina');
// Variables
let todosPersonajes = [];
let totalPaginas;
let pagina = 1;
$paginaAnterior.disabled = true;
$primeraPagina.disabled = true;

// fetch
function usarFetch(numeroPagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`)
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        todosPersonajes = data.results;
        totalPaginas = data.info.pages;
        console.log(totalPaginas);
        console.log(todosPersonajes);
        $paginado.innerHTML = `<p>Página actual: ${pagina} - ${totalPaginas}</p>`;
        mostrarPersonajes(todosPersonajes);
    });
};

usarFetch(pagina);

// Mostrar personajes en el HTML
function mostrarPersonajes(array) {

    $contenedorCajas.innerHTML = "";
    if(array.length < 1) $contenedorCajas.innerHTML = `<div id="caja-vacia"></div>`;
    
    $totalPersonajes.innerHTML = `<p>Total de personajes: ${array.length} </p>`
    for(let i=0; i<array.length; i++ ){
        let caja = document.createElement("div");
        caja.innerHTML += `
        <div class="caja">
            <div class="caja-imagen"> 
                <img src= "${array[i].image}"> 
            </div>

            <div class="caja-contenido"> 
                <p>Nombre: ${array[i].name}</p>
                <p>Género:  ${array[i].gender}</p>
                <p>Especie:  ${array[i].species}</p>
                <p>Estado:  ${array[i].status}</p>
                <p>Origen:  ${array[i].origin.name}</p>
                <p>Locación: ${array[i].location.name}</p>
            </div>

            <div class="caja-pie"> 
                <button id='ver-mas'>Ver más...</button>
            </div>
        </div>`

    $contenedorCajas.appendChild(caja)
    }
}

function mostrarTodos() {
    mostrarPersonajes(todosPersonajes);
    
}
$todos.addEventListener('click',mostrarTodos);

function mostrarMujeres() {
    let mujeres = todosPersonajes.filter((personaje) => personaje.gender === 'Female')
    mostrarPersonajes(mujeres);
}
$mujer.addEventListener('click', mostrarMujeres);

function mostrarHombres() {
    let hombres = todosPersonajes.filter((personaje) => personaje.gender === 'Male')
    mostrarPersonajes(hombres);
}
$hombre.addEventListener('click', mostrarHombres);

function mostrarSinGenero() {
    let sinGenero = todosPersonajes.filter((personaje) => personaje.gender === 'Genderless')
    mostrarPersonajes(sinGenero);
}
$sinGenero.addEventListener('click', mostrarSinGenero);

function mostrarDesconocidos() {
    let desconocidos = todosPersonajes.filter((personaje) => personaje.gender === 'unknown')
    mostrarPersonajes(desconocidos);
}

$desconocido.addEventListener('click', mostrarDesconocidos);

function irPrimeraPagina() {
    $paginaAnterior.disabled = true;
    $primeraPagina.disabled = true;
    $paginaSiguiente.disabled = false;
    $ultimaPagina.disabled = false;

    pagina = 1;
    $paginado.innerHTML = `<p>Página actual: ${pagina} - ${totalPaginas}</p>`;
    usarFetch(pagina);
}

function irPaginaAnterior() {
    pagina--;
    if(pagina > 1) {
        $paginaSiguiente.disabled = false;
        $ultimaPagina.disabled = false;
    }
    if(pagina === 1) {
        $paginaAnterior.disabled = true;
        $primeraPagina.disabled = true;
    }
    else {
        $paginaAnterior.disabled = false;
        $primeraPagina.disabled = false;
    }
    $paginado.innerHTML = `<p>Página actual: ${pagina} - ${totalPaginas}</p>`;
    usarFetch(pagina);
}

function irPaginaSiguiente() {
    pagina++;
    if(pagina > 1) {
        $paginaAnterior.disabled = false;
        $primeraPagina.disabled = false;
    }
    if(pagina === totalPaginas) {
        $paginaSiguiente.disabled = true;
        $ultimaPagina.disabled = true;
    } else {
        $paginaSiguiente.disabled = false;
        $ultimaPagina.disabled = false;
    }
    $paginado.innerHTML = `<p>Página actual: ${pagina} - ${totalPaginas}</p>`;
    usarFetch(pagina);
}

function irUltimaPagina() {
    $paginaSiguiente.disabled = true;
    $ultimaPagina.disabled = true;
    $paginaAnterior.disabled = false;
    $primeraPagina.disabled = false;

    pagina = totalPaginas;
    $paginado.innerHTML = `<p>Página actual: ${pagina} - ${totalPaginas}</p>`;
    usarFetch(pagina);
}

$primeraPagina.addEventListener('click', () => irPrimeraPagina(pagina));
$paginaAnterior.addEventListener('click', irPaginaAnterior);
$paginaSiguiente.addEventListener('click', irPaginaSiguiente);
$ultimaPagina.addEventListener('click', irUltimaPagina);

