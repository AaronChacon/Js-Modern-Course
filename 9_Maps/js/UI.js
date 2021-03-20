class UI {
    constructor() {

        // instanciar api
        this.api = new API();

        // crear los markers con layerGroup
        this.markers = new L.LayerGroup(); 

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDATOS()
            .then(datos=>{
              const resultados = datos.repuestaJSON.results;
              
              // ejecutar la funcion para mostrar los pines
                this.mostrarPines(resultados);
            })
    }

    mostrarPines(datos){
        console.log(datos);
        // limpiar los markers
        this.markers.clearLayers();

        // recorrer los establecimientos
        datos.forEach(datos => {

            // destructuring
            const {latitude, longitude, calle, regular, premium} = datos;

            // crear popup
            const opcionesPopUp = L.popup()
                .setContent(`
                    <p>Calle: ${calle}</p>
                    <p>Regular:<b> $ ${regular} </b></p>
                    <p>Premium:<b> $ ${premium} </b></p>
                `);

            // agregar el pine
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);

            this.markers.addLayer(marker);
        });

        this.markers.addTo(this.mapa);
    }

    //buscador

    obtenerSugerencias(busqueda){
        this.api.obtenerDATOS()
            .then(datos => {
                
                // obtener datos
                const resultados = datos.repuestaJSON.results;
                
                // enviar el Json y la busqieda para el filtrado
                this.filtrarSugerencia(resultados, busqueda);

            })
    }

    // filtra las sugerencis en base al input
    filtrarSugerencia(resultado, busqueda){
        
        // filtrar con .filter
        const filtro =  resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        console.log(filtro);
        
        // mostrar los pines 
        this.mostrarPines(filtro);

    }

}