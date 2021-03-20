class API {

    async obtenerDATOS(){
        const total = 1000;
        // obtener los datos desde la api
         const datos = await 
         fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`)
        
         // retornar datos como json
         const repuestaJSON = await datos.json();
         
         return{
            repuestaJSON
         }
    }

}