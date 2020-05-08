(function () {

    function reducer(state, action) {
        if (!state) state = initialState;

        switch (action.type) {
            case 'NAVIGATE':
                return Object.assign(state, {
                    selectedScreen: action.screen,
                });
            case 'LOAD_APP':
                return Object.assign(state, {
                    isLoading: false
                });
            case 'THANKS':
                return Object.assign(state, {
                    isLoading: false
                });
            default:
                return state;
        }
    }

    // Permite crear un storage para el estado de la aplicación, los storage nos
    // dejan hacer y escuchar acciones
    function createStore(reducer) {
        var state = reducer(null, {});
        var subscriptions = [];

        function Store() { }

        Store.prototype.dispatch = function (action) {
            state = reducer(state, action);
            subscriptions.forEach(function (subscription) { subscription(state); });
        };

        Store.prototype.subscribe = function (subscription) {
            subscriptions.push(subscription);

            return function () {
                subscriptions = subscriptions.filter(function (item) {
                    return item !== subscription;
                });
            };
        };

        Store.prototype.getState = function () {
            return state;
        };

        return new Store();
    }

    // Store principal de la aplicación
    var store = createStore(reducer);


    // Estado inicial del app
    var initialState = {
        selectedScreen: 'connection',
        isLoading: true,
    };

    // Función que inicializa todo
    function main() {

        // Pantallas de la aplicación referenciadas en un objeto
        var screens = {
            home: document.getElementById('homeScreen'),
            refuge: document.getElementById('refugeScreen'),
            instruction: document.getElementById('instructionScreen'),
            store: document.getElementById('storeScreen'),
            map: document.getElementById('mapScreen'),
            bookfront: document.getElementById('bookfrontScreen'),
            bookopen: document.getElementById('bookopenScreen'),
            info: document.getElementById('infoScreen'),
            credits: document.getElementById('creditsScreen'),
            tepa: document.getElementById('tepaScreen'),
            connection: document.getElementById('loginScreen'),
            signup: document.getElementById('signupScreen'),
            restaurant: document.getElementById('restaurantScreen'),
            park: document.getElementById('parkScreen'),
            awards: document.getElementById('awardScreen'),
            downtown: document.getElementById('downtownScreen')
        };

        // Escuchador de cambio de estado, en este caso para cuando el app deje de  
        // recargar, cuando se realiza esta acción el subscriptor desaparece
        var loadingUnsubscribe = store.subscribe(function (state) {
            if (!state.isLoading) {
              var thanksScreen = document.getElementById('thanksScreen');
              thanksScreen.classList.remove('loading');
              thanksScreen.addEventListener('transitionend', function (event) {
                if (event.propertyName === 'opacity') {
                    thanksScreen.parentElement.removeChild(thanksScreen);
                }
              });
              loadingUnsubscribe();
            }
          });

        // Escuchador que se encargará de mostrar las páginas seleccionadas
        store.subscribe(function (state) {
            Object.keys(screens).forEach(function (screen) {
                if (screen === state.selectedScreen) {
                    screens[screen].classList.add('active');
                    return;
                }

                screens[screen].classList.remove('active');
            });
        });
    
        //Funcion timer para llevar el tiempo de los splash screens
        setTimeout(function () {
            store.dispatch({ type: 'LOAD_APP' });
            var loadingUnsubscribe = store.subscribe(function (state) {
                if (!state.isLoading) {
                  var splashScreen = document.getElementById('splashScreen');
                  splashScreen.classList.remove('loading');
                  splashScreen.addEventListener('transitionend', function (event) {
                    if (event.propertyName === 'opacity') {
                      splashScreen.parentElement.removeChild(splashScreen);
                    }
                  });
                  loadingUnsubscribe();
                }
              });
            setTimeout(function () {
                store.dispatch({ type: 'THANKS' });
            }, 4000);
        }, 10000);

        navigate = function (screen) {
            store.dispatch({ type: 'NAVIGATE', screen: screen });
        };
    }
    

    // Escuchador del evento onload del window
    window.onload = main;
    //document.addEventListener('deviceready', main, false);
})();

/**
 * Navega entre diferentes pantallas, luego se sobreescribe su valor
 */
// eslint-disable-next-line no-unused-vars
var navigate = function (screen) {
    
 };
 var winProbability = 0.2;
 var attempts = 5;
var animalsImages = [['img/Artboard_1Animals.svg','img/Artboard_2Animals.svg','img/Artboard_3Animals.svg'],
    ['img/Artboard_4Animals.svg','img/Artboard_6Animals.svg','img/Artboard_7Animals.svg'],
    ['img/Artboard_8Animals.svg','img/Artboard_9Animals.svg','img/Artboard_10Animals.svg'],
    ['img/Artboard_11Animals.svg','img/Artboard_12Animals.svg','img/Artboard_13Animals.svg'],
    ['img/Artboard_14Animals.svg','img/Artboard_15Animals.svg','img/Artboard_16Animals.svg'],
    ['img/Artboard_17Animals.svg','img/Artboard_18Animals.svg','img/Artboard_19Animals.svg'],
    ['img/Artboard_20Animals.svg','img/Artboard_21Animals.svg','img/Artboard_22Animals.svg'],
    ['img/Artboard_23Animals.svg','img/Artboard_24Animals.svg','img/Artboard_25Animals.svg']];
var animalesGanados = [];

function reloadImages(containerObjects,previousImage,animal){
    if(animal != null && animal != undefined){
        var animalFound = document.getElementById(animal).style.backgroundImage = 'url('+previousImage+')'; 
    }
    for (let index = 0; index < containerObjects.length; index++) {
        containerObjects[index].style.display = "block";
    }
}

function refillRefuge(){
    var animals = JSON.parse(localStorage.getItem('animals'));
    var count = 0;
    var animalElement,shelter;
    animals.forEach(animal => {
        count++;
        animalElement = document.getElementById('animal'+count);
        shelter = document.getElementById('shelter-'+count);
        shelter.style.visibility = 'visible';
        animalElement.setAttribute('src',animal.imageURL);
    });
}

function processObject(name,container){
    var object = document.getElementById(name);
    var containerObjects = document.getElementById(container).getElementsByTagName("DIV");
    var topSignEspecific = container.split('-');
    var topSignText = document.getElementById('topSignText-'+topSignEspecific[0]);
    if(attempts > 0){
        var aleatorio = Math.random();
        if(aleatorio <= winProbability){
            console.log('ganaste');
            console.log(object);
            var fila = Math.floor(Math.random()*animalsImages.length);
            var columna = Math.floor(Math.random()*(2-1)+1);
            var mapName = container.split('-');
            var animalAge = Math.floor(Math.random()*(15-1)+1);
            var backgroundImageSplit = window.getComputedStyle(object).getPropertyValue("background-image").split('www');
            var previousImage = '../www'+backgroundImageSplit[1].substring(0,backgroundImageSplit[1].length-2);
            console.log(previousImage);
            object.style.backgroundImage = 'url(\''+animalsImages[fila][columna]+'\')';
            animalGanado = {
                imageURL: animalsImages[fila][0],
                name: 'Rocky',
                found: mapName[0],
                age: animalAge,
                race: 'Mixed'
            };
            animalesGanados.push(animalGanado);
            window.localStorage.setItem('animals',JSON.stringify(animalesGanados));
            winProbability = 0.2;
            attempts = 5;
            refillRefuge();
            reloadImages(containerObjects,previousImage,object.id);
            navigate('refuge');
        }else{
            attempts--;
            winProbability+=0.1;
            object.style.display = 'none';
        }
        topSignText.placeholder = 'Tries left: '+attempts;
    }else{
        refillRefuge();
        reloadImages(containerObjects,previousImage,null);
        window.alert('No more attempts available');
        winProbability = 0.2;
        attempts = 5;
        navigate('refuge');
    }
    
}
"use strict";