console.log("Hello, world!");
window.onload = main;

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
  } else {
    alert("Cannot access location");
  }
}

function onLocationUpdate(event: any) {
  console.log("Location updated!");
  console.log(event);
}

function onError(err: any) {
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

/* 

Geolocation {  }
​
<prototype>: GeolocationPrototype { getCurrentPosition: getCurrentPosition(), watchPosition: watchPosition(), clearWatch: clearWatch(), … }
clearWatch: function clearWatch()
constructor: function ()
getCurrentPosition: function getCurrentPosition()
watchPosition: function watchPosition()
​​
Symbol(Symbol.toStringTag): "Geolocation"
​​
<prototype>: Object { … }

*/
