"use strict";
console.log("Hello, world!");
window.onload = main;
const btnA = document.getElementById("aBtn");
const btnB = document.getElementById("bBtn");
const distanceInfo = document.getElementById("info");
const btnWrapHorizontal = document.querySelector(".container--horizontal");
console.log(btnWrapHorizontal);
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
    location.innerHTML = `Your location is: <br><span class="locationFont">
  Latitude: ${CURRENT_COORDINATES.latitude.toFixed(4)}<br> Longitude: ${CURRENT_COORDINATES.longitude.toFixed(4)}
  </span>`;
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
        btnA.innerHTML = `${A.latitude.toFixed(4)}<br>${A.longitude.toFixed(4)}`;
        btnA.classList.add("locationFont");
    }
    if (B != null) {
        btnB.innerHTML = `${B.latitude.toFixed(4)}<br>${B.longitude.toFixed(4)}`;
        btnB.classList.add("locationFont");
        btnWrapHorizontal.style.setProperty("--gap-btn", `1rem`);
    }
    if (A !== null && B !== null) {
        // let distance = `?`;
        let distance = getDistance(A, B);
        distanceInfo.innerHTML = `distance<br>------<br> ${Math.round(distance)} meters`;
    }
}
// endregion: --- Update Buttons
// region:    --- Get Distance
// Gets points in xyz
function latlonToXYZ(latlon, RADIUS_EARTH) {
    const xyz = { x: 0.0, y: 0.0, z: 0.0 }; // center of earth's core
    xyz.y = Math.sin(degToRad(latlon.latitude)) * RADIUS_EARTH;
    const radius = Math.cos(degToRad(latlon.latitude)) * RADIUS_EARTH;
    xyz.x = Math.sin(degToRad(latlon.longitude)) * radius;
    xyz.z = Math.cos(degToRad(latlon.longitude)) * radius;
    return xyz;
}
// Converts degrees to Radians
function degToRad(degree) {
    return (degree * Math.PI) / 180;
}
function getDistance(latlon1, latlon2) {
    const RADIUS_EARTH = 6371 * 1000; // in meters approx
    const xyz1 = latlonToXYZ(latlon1, RADIUS_EARTH);
    const xyz2 = latlonToXYZ(latlon2, RADIUS_EARTH);
    const euclideanDistance = euclidean(xyz1, xyz2);
    return euclideanDistance;
}
// Euclidean Distance Calculator
// Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)
function euclidean(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2) +
        Math.pow(p1.z - p2.z, 2));
}
// endregion: --- Get Distance
// region:    --- Button Events
btnA === null || btnA === void 0 ? void 0 : btnA.addEventListener("click", setA);
btnB === null || btnB === void 0 ? void 0 : btnB.addEventListener("click", setB);
// endregion: --- Button Events
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