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
        selectedScreen: 'home',
        isLoading: true,
    };


    // Función que inicializa todo
    function main() {

        // Pantallas de la aplicación referenciadas en un objeto
        var screens = {
            home: document.getElementById('homeScreen'),
            instruction: document.getElementById('instructionScreen'),
            store: document.getElementById('storeScreen'),
            map: document.getElementById('mapScreen'),
            book: document.getElementById('bookScreen'),
            setting: document.getElementById('settingScreen'),
            credits: document.getElementById('creditsScreen'),
            tepa: document.getElementById('tepaScreen'),
            connection: document.getElementById('loginScreen')
        };

        // Escuchador de cambio de estado, en este caso para cuando el app deje de  
        // recargar, cuando se realiza esta acción el subscriptor desaparece
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

        setTimeout(function () { store.dispatch({ type: 'LOAD_APP' }); }, 2000);

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
var navigate = function (screen) { };

"use strict";