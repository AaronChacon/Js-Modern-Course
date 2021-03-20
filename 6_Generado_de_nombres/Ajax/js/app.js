document.querySelector('#generar-nombre')
.addEventListener('submit', cargarNombres);

// Llamado Ajax e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();
    
    // leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    
    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    //console.log(cantidad);
    

    let url = ''
    url += 'http://uinames.com/api/?';
    
    //Si hay origen agregarlo a la URL

    if (origenSeleccionado !== '' ) {
        url += `region=${origenSeleccionado}&`;
    }

    if (generoSeleccionado !== '' ) {
        url += `gender=${generoSeleccionado}&`;
    }
    
    if (cantidad !== '' ) {
        url += `amount=${cantidad}&`;
    }

    //console.log(url);
    
    //Conectar con ajax
    //Iniciar XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Abrimos la conexion 
    xhr.open('GET', url, true);
    // Datos e imprimimos del template
    xhr.onload = function() {
       if(this.status=='200'){
        const nombres = JSON.parse(this.responseText);
        let htmlNombres =`<h2>Nombres Generados</h2>`
        // No terminado
       }
    }
    //Enviar el request
    xhr.send();

}