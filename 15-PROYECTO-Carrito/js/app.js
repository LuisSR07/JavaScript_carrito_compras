            // VARIABLES

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // ELIMINAR CURSOS DEL CARRITO
    carrito.addEventListener('click', eliminarCurso)

    //VACIAR EL CARRITO
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // RESETEAMOS EL ARREGLO

        limpiarHTML(); // ELIMINAMOS TODO EL HTML
    })
}


            // FUNCIONES

function agregarCurso(e) {
    e.preventDefault(); // con esto prevenimos la acción por default al dar click, en este caso ir hacia arriba de la página
    
    if(e.target.classList.contains('agregar-carrito')) {
       const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    //console.log(e.target.classList) // esto sirve para ver en que parte del código estamos dando click y hacer referencia en el
}

            //ELIMINAR CURSO DEL CARRITO
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) { 
        // console.log(e.target.classList) // 1 -para ver desde que clase (boton x) tengo que eliminar en este caso 'borrar curso'
        // console.log(e.target.getAttribute('data-id')); // 2- con esto vemos el id de cada uno de los cursos a eliminar
        const cursoId = e.target.getAttribute('data-id');

        //ELIMINAR DEL ARREGLO DE articulosCarrito POR EL id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        // console.log(articulosCarrito); // CON ESTO VERIFICAMOS SI ESTÁ FUNCIONANDO EL CÓDIGO QUE HEMOS PUESTO ARRIBA

        carritoHTML(); // ITERAR SOBRE EL CARRITO Y MOSTRAR EL HTML
    }
}

            // LEER EL CONTENIDO DEL HTML AL QUE LE DEMOS CLICK Y EXTRAER SU INFORMACIÓN
function leerDatosCurso(curso) {
    console.log(curso);

    // CREACIÓN DE UN ONJETO CON EL CONTENIDO DEL CURSO SELECCIONADO
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1

    }
            // REVISAR SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // ACTUALIZAMOS LA CANTIDAD
        const cursos = articulosCarrito.map ( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //AGREGA ELEMENTOS AL ARREGLO DEL CARRITO
        articulosCarrito =[...articulosCarrito, infoCurso];
    }
    

            // AGREGAR LOS ELEMENTOS AL ARREGLO DE CARRITO
        //articulosCarrito =[...articulosCarrito, infoCurso];
        
        console.log(articulosCarrito);

        carritoHTML();
}

            // MOSTRAR EL CARRITO DE COMPRAS EN EL HTML
function carritoHTML() {

    // LIMPIAR EL HTML PARA NO REPETIRSE EN EL CARRITO
    limpiarHTML();

    // RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>  <img src="${imagen}" width ='100'>  </td>
        <td>  ${titulo} </td>
        <td>  ${precio} </td>
        <td>  ${cantidad} </td>
        <td>
            <a href='#' class= 'borrar-curso'  data-id='${id}'> X </a>
        </td>
        `;

        // AGREGAR EL HTML DEL CARRITO AL TBODY
        contenedorCarrito.appendChild(row);
    })

}

            // ELIMINA LOS CURSOS DEL TBODY PARA QUE NO SE REPITAN EN EL CARRITO
function limpiarHTML() {
       //FORMA LENTA DE LIMPIAR 
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}