// variables 

const presupuestoUsuario = prompt('Cual es tu presupuesto semanal');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


// Class

class Presupuesto{
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto); 
        this.restante = Number(presupuesto);
    }
    // Metodo pare restar del presupuesto actual

    presupuestoRestante( cantidad = 0 ){
        return this.restante -= Number(cantidad);

    }
}

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
        
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        
        //Insert en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // quitar el alert despues de 3 segundos
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Inserta los gastos a la lista 
    agregarGastoListado(nombre, cantidad){
        const gastosListados = document.querySelector('#gastos ul');

        //Crear un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar el gasto
        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill" >
                $ ${cantidad} 
           </span> 
        `;
        // insertar al html
        gastosListados.appendChild(li);

    }

    // comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = 
        cantidadPresupuesto.presupuestoRestante(cantidad);
        
        restante.innerHTML = `${presupuestoRestanteUsuario}`

        this.comprobarPresupuesto();
    }
    // Cambia de color el presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // compronar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }

}

// Event Listeners

document.addEventListener('DOMContentLoaded', function(){
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    }else{
        // Instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

        
    }
})

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    //console.log(cantidadGasto);
    
    // instaciar la ui

    const ui = new Interfaz();

    //comprobar que los compos no esten vacios

    if (nombreGasto === '' || cantidadGasto === '') {
        
        // 2 parametros mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');

    } else {
        //insertar en elhtml
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);

        
    }

    
});