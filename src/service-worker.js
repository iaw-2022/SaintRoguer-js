/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { RangeRequestsPlugin } from "workbox-range-requests";

clientsClaim();

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);

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

registerRoute(
    // Custom `matchCallback` function
    ({ event }) => event.request.destination === 'image',
    new CacheFirst({
        cacheName: 'image',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] }),
            new RangeRequestsPlugin(),
            new ExpirationPlugin({
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            }),
        ],
        matchOptions: {
            ignoreSearch: true,
            ignoreVary: true
        }
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

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
})

