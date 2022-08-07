/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);

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


