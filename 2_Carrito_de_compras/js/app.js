//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//Listeners
cargarEventListeners()

function cargarEventListeners(){

    //Dispara cuando se preciona "Agregar carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina el curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    
    // Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar documento mostrar localStorage
    document.addEventListener('DOMContentLoaded', LeerLocalStorage );

}

// Funciones

//Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tener sus datos
        LeerDatosCurso(curso);
    }
}

// Lee los datos del curso

function LeerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    
    <td> 
        <img src="${curso.imagen}" width="150">
    </td>
    <td>
        ${curso.titulo}
    </td>
    <td>
        ${curso.precio}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">
        X
        </a>
        
    </td>
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso, cursoId;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoId);
    
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito(){
    // Forma lenta
    //listaCursos.innerHTML = ''
    // Forma rapida (recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    // vaciar localstorage
    vaciarLocalStorage();

    return false;
}

//Almacena Cursos en el carrito
function guardarCursoLocalStorage(curso){
    let cursos; 
    
    //toma el valor de un arreglo con datos o vacio
    cursos = obtenerCusosLocalStorage();
    
    //el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
    
}

//Comprueba que haya elementos en el local storage
function obtenerCusosLocalStorage(){
    let cursosLs;

    //Comprobamos si hay algo en localstorage
    if(localStorage.getItem('cursos') === null){
        cursosLs = [];
    }else{
        cursosLs = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLs;
}

// Imprime los cursos del local storage en el carrito
function LeerLocalStorage(){
    let cursosLS;

    //
    cursosLS = obtenerCusosLocalStorage();

    cursosLS.forEach(function(curso) {
        //costruir el template
        const row = document.createElement('tr');
            row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width="150">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">
                X
                </a>
                
            </td>
            `;
            listaCursos.appendChild(row);
    });
    
}

//Eliminar el curso por el id del local storage
function eliminarCursoLocalStorage(curso){
    let cursosLS;
    // obtenemos el arreglo de cursos
    cursosLS = obtenerCusosLocalStorage();
    
    //iteramos comparando el id del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }        
    });
    // Añadimos el arreglo actual al storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
    
}

//Elimina todos los cursos del local storage
function vaciarLocalStorage(){
    localStorage.clear();
}