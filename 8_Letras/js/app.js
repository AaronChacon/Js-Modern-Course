import {API} from './api.js'
import * as UI from './interfaz.js';

console.log(UI);
UI.formularioBuscar.addEventListener('submit', (e)=>{
    e.preventDefault();

    // obtener datos del formulario
    const artista = document.querySelector('#artista').value,
            cancion = document.querySelector('#cancion').value;

        if (artista === '' || cancion === '') {
            // Si el usuario deja los campos vacios mostrar error
            UI.divMensajes.innerHTML = 'Error.... Todos los campos son obligatorios';
            UI.divMensajes.classList.add('error')
            setTimeout(() => {
                UI.divMensajes.innerHTML = '';
                UI.divMensajes.classList.remove('error')
            }, 3000);
        }else{
            // El formulario esta completo consultar a la api
            const api = new API(artista, cancion);
            api.consultarAPI()
                .then(data =>{
                    console.log(data);
                    if (data.repuesta.lyrics) {
                        console.log('si existe');
                        //La cancion existe
                        const letra = data.repuesta.lyrics

                        UI.divResultado.textContent = letra
                        
                    }else{
                        console.log('no existe');
                        // La cancion no existe
                        UI.divMensajes.innerHTML = 'La cancion no existe - Intentalo de nuevo';
                        UI.divMensajes.classList.add('error')
                        setTimeout(() => {
                            UI.divMensajes.innerHTML = '';
                            UI.divMensajes.classList.remove('error')
                            UI.formularioBuscar.reset();
                        }, 3000);
                    }
                })
        }
    
})