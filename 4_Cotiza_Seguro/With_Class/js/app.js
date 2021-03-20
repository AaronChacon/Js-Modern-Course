// Preparativos
//Agrega las opciones en el selector de años

const max = new Date().getFullYear(),
      min = max - 20;
const selectAnios = document.getElementById('anio')

for (let i =max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);    
}

/////Comienzo de app
//Cotizador constructor

class Seguro{
    constructor (marca, anio, tipo){
        
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        /* 
            1 = Americano = 1.15
            2 = Asiatico = 1.05
            3 = Europeo = 1.35
        */
        let cantidad;
        const base = 2000;
        switch(this.marca) {
            case '1':
                cantidad = base * 1.15
                break;
            case '2':
                cantidad = base * 1.05
                break;
            case '3':
                cantidad = base * 1.35
                break;
        }
        //leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        
        // cada año de diferencia se reduce 3% el valor del suguro
        cantidad -= ((diferencia * 3 ) * cantidad / 100)
        /*
            Si el seguro es basico se multiplica por 30% mas
            Si el seguro es completo 50% mas
        */
       if(this.tipo === 'basico'){
           cantidad *= 1.30;
       }else{
            cantidad *= 1.50;
       }
        
       return cantidad
    
    }
}



//Todo lo que se muestra
class Interfaz{

    //Mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div')
    
        if(tipo === 'error'){
            div.classList.add('mensaje','error')    
        }else{
            div.classList.add('mensaje','correcto') 
        }
    
        div.innerHTML = `${mensaje}`;
    
        formulario.insertBefore(div, document.querySelector('.form-group'));
    
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
        
    }
    // Imprime el resultado de la cotizacion
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1': 
                marca = 'Americano';
                break
            case '2': 
                marca = 'Asiatico';
                break
            case '3': 
                marca = 'Europeo';
                break
        }
        //crear un div
        const div = document.createElement('div');
        // insertar informacion
        div.innerHTML = `
           <p class="header" > Tu Cotizacion: </p>
           <p> Marca: ${marca} </p>
           <p> Año: ${seguro.anio} </p>
           <p> Tipo: ${seguro.tipo} </p>
           <p> Total: $ ${total} </p>
        `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block'
    
        setTimeout(() => {
            spinner.style.display = 'none'
            resultado.appendChild(div)
        }, 3000);
    
        
    
    }
}



//EventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.options.selectedIndex]
    .value;

    //leer el año seleccionado
    const anio = document.getElementById('anio')
    const anioSeleccionado = anio.options[anio.options.selectedIndex]
    .value;

    //leer el valor del radio bottom
    const tipo = document.querySelector('input[name="tipo"]:checked')
    .value;

    //Crear nstancia de interfaz
    const interfaz = new Interfaz();

    //Comprobar esten los inpusts seleccionados
    if (marcaSeleccionada === '' || anioSeleccionado == '' 
        || tipo === '' ) {
        //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario e intentalo nuevamente', 'error')

    }else{

        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');

        if (resultados != null) {
            resultados.remove();
        }

        //instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
        // cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        // mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Cotizando...', 'exito')

        
        
    }


});

//