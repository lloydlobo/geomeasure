console.log("Hello, world!");
window.onload = main;

const btnA = document.getElementById("aBtn") as HTMLButtonElement | null;
const btnB = document.getElementById("bBtn") as HTMLButtonElement | null;
const distanceInfo = document.getElementById("info") as HTMLElement | null;

const btnWrapHorizontal = document.querySelector(
  ".container--horizontal"
) as HTMLDivElement;
console.log(btnWrapHorizontal);
let CURRENT_COORDINATES: { latitude: any; longitude: any } | null = null;
let A: { latitude: any; longitude: any } | null = null;
let B: { latitude: any; longitude: any } | null = null;

function main() {
  console.log("It works on load!");
  let geolocation = null;
  if (window.navigator && window.navigator.geolocation) {
    geolocation = window.navigator.geolocation;
    // console.dir(geolocation);
    // console.log("Geolocation is available!");
  }
  if (geolocation) {
    geolocation.watchPosition(onLocationUpdate, onError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      // timeout: 5000
    });
  } else {
    alert("Cannot access location");
  }
}

function onLocationUpdate(event: { coords: any }) {
  // console.log("Location updated!"); // console.log(event);

  // every time we get a new location,
  // we update the global coordinates to new coordinates
  CURRENT_COORDINATES = event.coords;
  const location = document.getElementById("loc") as HTMLElement | null;
  // Suppress the error with a ! --> ! - Non-null assertion operator
  location!.innerHTML = `Your location is: <br><span class="locationFont">
  Latitude: ${CURRENT_COORDINATES!.latitude.toFixed(
    4
  )}<br> Longitude: ${CURRENT_COORDINATES!.longitude.toFixed(4)}
  </span>`;
}

function onError(err: any) {
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
    btnA!.innerHTML = `${A.latitude.toFixed(4)}<br>${A.longitude.toFixed(4)}`;
    btnA!.classList.add("locationFont");
  }

  if (B != null) {
    btnB!.innerHTML = `${B.latitude.toFixed(4)}<br>${B.longitude.toFixed(4)}`;
    btnB!.classList.add("locationFont");
    btnWrapHorizontal!.style.setProperty("--gap-btn", `1rem`);
  }

  if (A !== null && B !== null) {
    // let distance = `?`;
    let distance = getDistance(A, B);
    distanceInfo!.innerHTML = `distance<br>------<br> ${Math.round(
      distance
    )} meters`;
  }
}

// endregion: --- Update Buttons

// region:    --- Get Distance

// Gets points in xyz
function latlonToXYZ(
  latlon: { latitude: number; longitude: number },
  RADIUS_EARTH: number
) {
  const xyz = { x: 0.0, y: 0.0, z: 0.0 }; // center of earth's core
  xyz.y = Math.sin(degToRad(latlon.latitude)) * RADIUS_EARTH;
  const radius = Math.cos(degToRad(latlon.latitude)) * RADIUS_EARTH;
  xyz.x = Math.sin(degToRad(latlon.longitude)) * radius;
  xyz.z = Math.cos(degToRad(latlon.longitude)) * radius;
  return xyz;
}

// Converts degrees to Radians
function degToRad(degree: number) {
  return (degree * Math.PI) / 180;
}

function getDistance(latlon1: any, latlon2: any) {
  const RADIUS_EARTH = 6371 * 1000; // in meters approx
  const xyz1 = latlonToXYZ(latlon1, RADIUS_EARTH);
  const xyz2 = latlonToXYZ(latlon2, RADIUS_EARTH);
  const euclideanDistance = euclidean(xyz1, xyz2);
  return euclideanDistance;
}

// Euclidean Distance Calculator
// Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)
function euclidean(
  p1: { x: any; y: any; z: any },
  p2: { x: any; y: any; z: any }
) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
      Math.pow(p1.y - p2.y, 2) +
      Math.pow(p1.z - p2.z, 2)
  );
}
// endregion: --- Get Distance

// region:    --- Button Events

btnA?.addEventListener("click", () => {
  setA();
  const timeA = Date.now();
  // console.log(timeA);
});
btnB?.addEventListener("click", () => {
  setB();
  const timeB = Date.now();
  // console.log(timeB);
});
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
