const cotizador = new API('628902e5e4f235f94f70d034f9433479ea8c34418b3bfec5e518f05878aec2d9');
const ui = new Interfaz ();

// leer el formulario
const formulario  = document.querySelector('#formulario');
// eventListener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options
    [monedaSelect.selectedIndex].value;

     // leer la moneda seleccionada
     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options
     [criptoMonedaSelect.selectedIndex].value;
    
    // comprobar que ambos campos tengan algo seleccionado

    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        
        // Alerta de error en la validacion
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');

    } else {

        // Validacion correcta
        // consultar api

        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data =>{
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, 
                    criptoMonedaSeleccionada)                
            })
        
    }

    
})