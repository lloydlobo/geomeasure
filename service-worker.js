importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

workbox.routing.registerRoute(({ request }) => {
  return request.destination === "image";
}, new workbox.strategies.CacheFirst());
