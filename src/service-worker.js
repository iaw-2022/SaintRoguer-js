/* eslint-disable no-restricted-globals */
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    // Custom `matchCallback` function
    ({ event }) => event.request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'image',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [200] }),
            new workbox.rangeRequests.RangeRequestsPlugin(),
            new workbox.expiration.Plugin({
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


