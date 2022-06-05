"use strict";
console.log("Hello, world!");
window.onload = main;
const btnA = document.getElementById("aBtn");
const btnB = document.getElementById("bBtn");
const distanceInfo = document.getElementById("info");
let CURRENT_COORDINATES = null;
let A = null;
let B = null;
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
    // Suppress the error with a ! --> ! - Non-null assertion operator
    location.innerHTML = `Your location is: <br>
  Latitude: ${CURRENT_COORDINATES.latitude}<br> Longitude: ${CURRENT_COORDINATES.longitude}`;
}
function onError(err) {
    console.log(err);
}
// region:    --- Update Buttons
function setA() {
    A = CURRENT_COORDINATES;
    updateInfo();
}
function setB() {
    B = CURRENT_COORDINATES;
    updateInfo();
}
function updateInfo() {
    if (A !== null) {
        btnA.innerHTML = `${A.latitude}<br>${A.longitude}`;
    }
    if (B !== null) {
        btnB.innerHTML = `${B.latitude}<br>${B.longitude}`;
    }
    if (A !== null && B !== null) {
        let distance = `?`;
        distanceInfo.innerHTML = `distance: ${distance} meters`;
    }
}
// endregion  --- Update Buttons
// region  --- Button Events
btnA === null || btnA === void 0 ? void 0 : btnA.addEventListener("click", setA);
btnB === null || btnB === void 0 ? void 0 : btnB.addEventListener("click", setB);
// endregion  --- Button Events
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
// Error, some.expr may be null or undefined ---> Object is possibly 'null'.ts(2531) -> https://stackoverflow.com/a/40350534
//# sourceMappingURL=main.js.map