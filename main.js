"use strict";
console.log("Hello, world!");
window.onload = main;
let CURRENT_COORDINATES = null;
function main() {
    console.log("It works on load!");
    let geolocation = null;
    if (window.navigator && window.navigator.geolocation) {
        geolocation = window.navigator.geolocation;
        console.dir(geolocation);
        console.log("Geolocation is available!");
    }
    if (geolocation) {
        geolocation.watchPosition(onLocationUpdate, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            // timeout: 5000
        });
    }
    else {
        alert("Cannot access location");
    }
}
function onLocationUpdate(event) {
    console.log("Location updated!"); // console.log(event);
    // every time we get a new location,
    // we update the global coordinates to new coordinates
    CURRENT_COORDINATES = event.coords;
    const location = document.getElementById("loc");
    // Error, some.expr may be null or undefined ---> Object is possibly 'null'.ts(2531) -> https://stackoverflow.com/a/40350534
    // Suppress the error with a ! --> ! - Non-null assertion operator
    location.innerHTML = `Your location is: <br>
    Latitude: ${CURRENT_COORDINATES.latitude}<br> Longitude: ${CURRENT_COORDINATES.longitude}`;
}
function onError(err) {
    console.log(err);
}
/*
 ___  ________   ________ ________
|\  \|\   ___  \|\  _____\\   __  \
\ \  \ \  \\ \  \ \  \__/\ \  \|\  \
 \ \  \ \  \\ \  \ \   __\\ \  \\\  \
  \ \  \ \  \\ \  \ \  \_| \ \  \\\  \
   \ \__\ \__\\ \__\ \__\   \ \_______\
    \|__|\|__| \|__|\|__|    \|_______|
                                       
 */
/** $ console.dir(geolocation)

Geolocation {  }
 ​
<prototype>: GeolocationPrototype { getCurrentPosition: getCurrentPosition(), watchPosition: watchPosition(), clearWatch: clearWatch(), … }
clearWatch: function clearWatch()
constructor: function ()
getCurrentPosition: function getCurrentPosition()
watchPosition: function watchPosition()
Symbol(Symbol.toStringTag): "Geolocation"
<prototype>: Object { … }
*/
/** GeolocationPositionError { code: 1, message: "User denied geolocation prompt" }
 *
 */
//# sourceMappingURL=main.js.map