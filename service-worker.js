const CACHE_NAME = "consulta-chip-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./app.js",
    "./dados.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    ARQUIVOS
                );

            })

        );

    }
);

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            ).then(

                response => {

                    return (
                        response ||
                        fetch(
                            event.request
                        )
                    );

                }

            )

        );

    }
);