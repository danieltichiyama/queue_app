// The code saved here will be added to build/service-worker.js when running the npm run build command.  Take a look in the package.json and you should see a change the build script, an addition of: && cat src/custom-service-worker.js >> build/service-worker.js, which copies the content from the src custom-service-worker to the build service worker file.

// This file's functionality can only be tested on a build of the app:
// npm run build && server -s build

self.addEventListener("install", ()=>{
    console.log('Hello');
})