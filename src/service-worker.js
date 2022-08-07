/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";

clientsClaim();


// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);
// por esta otra:
// const desactivarPrecache = self.__WB_MANIFEST;
// para más info: https://cra.link/PWA



registerRoute(
    ({ event }) => event.request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15,
            }),
        ],
    })
);

registerRoute(
    new RegExp('https://trailerama-api.herokuapp.com/(.*)'),
    new CacheFirst({
        cacheName: 'api-data',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ],
        method: 'GET',
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);

registerRoute(
    new RegExp('https://imdb-api.com/(.*)'),
    new CacheFirst({
        cacheName: 'IMDB-data',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 15 * 24 * 60 * 60
            })
        ],
        method: 'GET',
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);


const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
    // Return false to exempt requests from being fulfilled by index.html.
    ({ request, url }) => {
        // If this isn't a navigation, skip.
        if (request.mode !== "navigate") {
            return false;
        } // If this is a URL that starts with /\_, skip.
        if (url.pathname.startsWith("/_")) {
            return false;
        } // If this looks like a URL for a resource, because it contains // a file extension, skip.
        if (url.pathname.match(fileExtensionRegexp)) {
            return false;
        } // Return true to signal that we want to use the handler.
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);
//Cache all images


/*

registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) =>
        url.origin === self.location.origin && (url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg")), // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [
            // Ensure that once this runtime cache reaches a maximum size the
            // least-recently used images are removed.
            new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 15 }),
        ],
    })
);
*/





self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

