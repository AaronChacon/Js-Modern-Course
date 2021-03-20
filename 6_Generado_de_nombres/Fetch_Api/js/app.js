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

    //crear fetch
    fetch(url)
    .then(function(res) {
            return res.json();
    })
    .then(function(data) {

        let html ='<h2>Nombres Generados</h2>';
        html += 
        `<ul class="lista">`
        data.forEach(function(nombre){
            html +=`
                <li>${nombre.name}</li>
            `
        });        
        html +=`</ul>`;
        document.getElementById('resultado').innerHTML= html;
    })
    .catch(function(error) {
        console.log(error);
        document.getElementById('resultado').innerHTML= error;
    })

    
    

}