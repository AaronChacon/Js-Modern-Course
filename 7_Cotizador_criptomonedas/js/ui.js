// Creamos clase para la interfaz
class Interfaz {

    constructor(){
        this.init();
    }
    init(){
        console.time()
        this.construirSelect();
        console.timeEnd()
    }
    
    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas =>{
                
                // Creamos el select de las criptomonedas con las opciones de la api 
                const select = document.querySelector('#criptomoneda')
                // itera por los reasultados de la api
                for( const[key, value] of Object.entries(monedas.monedas.Data) ){
                    // añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);       
                }
                
            })
    }

    // creamos mensaje para mostrar mensajes al usuario
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases; 
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensaje
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        // mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
        
    }

    // imprime el resultado de la cotizacion de la criptomoneda
    mostrarResultado(resultado, moneda, crypto){

        //En caso que ya exista un resultado

        const resultadoAnterior = document.querySelector('#resultado > div')

        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }
        
        const datosMoneda = resultado[crypto][moneda];

        // minimizar digitos de 
        let precio = datosMoneda.PRICE.toFixed(2);
        let variacion = datosMoneda.CHANGEPCTDAY.toFixed(6);
        let actualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-PE');

        // construir el template 
        let templateHTML = `

            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title"> Resultado: </h2>
                    <p > 
                        El precio de ${datosMoneda.FROMSYMBOL} a moneda 
                        ${datosMoneda.TOSYMBOL} es de: $${precio}
                    </p>
                    <p>
                        Variacion ultimo dia: % ${variacion} 
                    </p>
                    <p>
                        Ultima Actualizacion <br> ${actualizacion} 
                    </p>
                </div>
            </div>
        `
        this.onOffSpinner('block');

        // insertar el resultado 

        setTimeout(() => {
            this.onOffSpinner('none');
            document.querySelector('#resultado').innerHTML = templateHTML
        }, 3000);

    }

    onOffSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }

}