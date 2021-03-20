//Variables
const listaTweets = document.querySelector('#lista-tweets');


// Event Listeners

eventListeners();

function eventListeners(){
    // Cuando se envia el formulario
    document.querySelector('#formulario')
    .addEventListener('submit', agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet)

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)


}

// Funciones
//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault()
    //leer el valor del textarea
    const tweet = document.querySelector('#tweet').value

    //Crear boton de eliminar
    const btn_borrar = document.createElement('a');
    btn_borrar.classList = 'borrar-tweet';
    btn_borrar.innerText = 'X'; 



    //Crear elemento y añadir a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar al tweet
    li.appendChild(btn_borrar);
    // añade el boton a la lista
    listaTweets.appendChild(li);

    // añadir a local storage
    agregarTweetLocalStorage(tweet);
    
}

// Borrar tweet del dom
function borrarTweet(e){
    e.preventDefault;
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        //Borrar tweet del local storage
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }
    
}

// Mostrar datos del local storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetLocalStorage();
    
    //console.log(tweets);
    
    tweets.forEach(function(tweet){
        //Crear boton de eliminar
        const btn_borrar = document.createElement('a');
        btn_borrar.classList = 'borrar-tweet';
        btn_borrar.innerText = 'X'; 



        //Crear elemento y añadir a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el boton de borrar al tweet
        li.appendChild(btn_borrar);
        // añade el boton a la lista
        listaTweets.appendChild(li);

    })
}

// agrega tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetLocalStorage();
    // añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//Comprobar que haya elementos en el localStorage, retorna arreglo. 
function obtenerTweetLocalStorage(){
    let tweets;
    //revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Borrar tweet del local estorage funcion
function borrarTweetLocalStorage(tweet){
    
    let tweets, tweetBorrar;
    // Elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar == tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
    

    
}