// crear los años
const years = document.createElement('option');
const  max = new Date().getFullYear();
let  min = max - 10;

for(let i = max; i >  min; i--) {
    let option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}
// Datos autos
function obtenerAutos(){
    return [
        {
            marca: 'BMW',
            modelo: 'Serie 3',
            year: 2012,
            precio: 30000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A4', year: 2018, precio: 40000, puertas: 4, color: 'Negro', transmision: 'automatico' },
        {
            marca: 'Ford',
            modelo: 'Mustang',
            year: 2015,
            precio: 20000,
            puertas: 2,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A6', year: 2010, precio: 35000, puertas: 4, color: 'Negro', transmision: 'automatico' },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2016,
            precio: 70000,
            puertas: 4,
            color: 'Rojo',
            transmision: 'automatico'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2015,
            precio: 25000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        {
            marca: 'Chevrolet',
            modelo: 'Camaro',
            year: 2018,
            precio: 60000,
            puertas: 2,
            color: 'Rojo',
            transmision: 'manual'
        },
        { marca: 'Ford', modelo: 'Mustang', year: 2019, precio: 80000, puertas: 2, color: 'Rojo', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2017,
            precio: 40000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A3', year: 2017, precio: 55000, puertas: 2, color: 'Negro', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2012,
            precio: 25000,
            puertas: 2,
            color: 'Rojo',
            transmision: 'manual'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2018,
            precio: 45000,
            puertas: 4,
            color: 'Azul',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2019,
            precio: 90000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Ford', modelo: 'Mustang', year: 2017, precio: 60000, puertas: 2, color: 'Negro', transmision: 'manual' },
        {
            marca: 'Dodge',
            modelo: 'Challenger',
            year: 2015,
            precio: 35000,
            puertas: 2,
            color: 'Azul',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 3',
            year: 2018,
            precio: 50000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        {
            marca: 'BMW',
            modelo: 'Serie 5',
            year: 2017,
            precio: 80000,
            puertas: 4,
            color: 'Negro',
            transmision: 'automatico'
        },
        {
            marca: 'Mercedes Benz',
            modelo: 'Clase C',
            year: 2018,
            precio: 40000,
            puertas: 4,
            color: 'Blanco',
            transmision: 'automatico'
        },
        { marca: 'Audi', modelo: 'A4', year: 2016, precio: 30000, puertas: 4, color: 'Azul', transmision: 'automatico' }
    ];
}

// Datos para la busqueda
let datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision:'',
    color: '',
}

//Event Listener DOM Loaded
const autos = obtenerAutos();
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);
})

//Event Listener para el formulario

//mandar llamar la funcion de filtrar autos por marca
const marca  = document.querySelector('#marca');
marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por year
const year  = document.querySelector('#year');
year.addEventListener('input', e => {
    datosBusqueda.year = Number(e.target.value)

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por precio minimo
const minimo  = document.querySelector('#minimo');
minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value)

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por precio maximo
const maximo  = document.querySelector('#maximo');
maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value)

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por puertas
const puertas  = document.querySelector('#puertas');
puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value)

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por transmision
const transmision  = document.querySelector('#transmision');
transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value

    filtrarAuto();
})

//mandar llamar la funcion de filtrar autos por color
const color  = document.querySelector('#color');
color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value

    filtrarAuto();
})

function limpiarHTML(){
    
    // leer el elemento resultado
    const contenedor = document.querySelector('#resultado');

    //limpiar los resultados anteriores
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }    
}

// agrega elcontenido al ui
function mostrarAutos(autos){

    limpiarHTML();

    // leer el elemento resultado
    const contenedor = document.querySelector('#resultado');

    //Costruir el html de los autos
    autos.forEach(auto => {
        console.log(auto);
        const autoHTML = document.createElement('div');
        autoHTML.classList.add('table')
        autoHTML.innerHTML = `
        
            <table style="width:100%">
                <thead>
                    <th>N# </tr>
                </thead>
                <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Transmision</th>
                <th>Puertas</th>
                <th>Año</th>
                <th>Precio</th>
                </tr>
                <tr>
                <td>${auto.marca}</td>
                <td>${auto.modelo}</td>
                <td>${auto.color}</td>
                <td>${auto.transmision}</td>
                <td>${auto.puertas}</td>
                <td>${auto.year}</td>
                <td>${auto.precio}</td>
                </tr>
            </table>
        `;

        contenedor.appendChild(autoHTML);
    });
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.appendChild(document.createTextNode('No hay resultados')); 
    document.querySelector('#resultado').appendChild(noResultado);
}

//
function filtrarAuto(){
    const resultado = 
    obtenerAutos()
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)
    ;

    if (resultado.length) {
        mostrarAutos(resultado);
        console.log({resultado});
        
    } else {
        //alert('Actualmente no tenemos resultado para tu busqueda, intenta nuevamente')
        noResultado();
    }
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    } else {
        return auto;
    }
}

function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    } else {
        return auto;
    }
}

function filtrarMaximo(auto) {
    if (datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    } else {
        return auto;
    }
}

