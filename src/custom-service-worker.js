// The code saved here will be added to build/service-worker.js when running the npm run build command.  Take a look in the package.json and you should see a change the build script, an addition of: && cat src/custom-service-worker.js >> build/service-worker.js, which copies the content from the src custom-service-worker to the build service worker file.

// This file's functionality can only be tested on a build of the app:
// npm run build && server -s build

const DATA_CACHE_NAME = 'data-cache-v1';


// Install the service worker
self.addEventListener('install', function() {
  console.log("Service worker installed...")
});

// Activate the service worker and remove old data from the cache
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== "workbox-precache-v2-http://localhost:5000/" || key !== DATA_CACHE_NAME) {
            //! added this thinking that it wouldn't delete the workbox-precache database but it's still breaking...
            console.log('Removing old cache data', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Intercept fetch requests
self.addEventListener('fetch', function(e) {

 console.log("Service worker intercepting fetch request...")
  if (e.request.url.includes('/api/')) {
    e.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(e.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(e.request.url, response.clone());
              }

              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(e.request);
            });
        })
        .catch(err => console.log(err))
    );

    return;
  }

});
