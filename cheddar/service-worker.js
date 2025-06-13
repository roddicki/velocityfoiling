var cacheName = 'Version1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        'index.html',
       'css/onsenui-core.min.css',
       'css/onsen-css-components.min.css',
       'css/styles.css',
       'js/chart.min.js',
       'js/onsenui.min.js',
       'js/chartjs-plugin-annotation.js',
       'js/index-chart.js',
       'js/index.js',
       'js/jquery.min.js',
       'bluehelmet-hires.png',
       'img/wave-icon.png',
       'img/arrow.png',
       'img/bgimg.png',
       'img/bluehelmet.png',
       'img/broken-clouds.png',
       'img/clear-skies.png',
       'img/few-clouds.png',
       'img/night.png',
       'img/nodata.png',
       'img/nodir.png',
       'img/overcast.png',
       'img/scattered-clouds.png',
       'img/startup-ipadmini-landscape.png',
       'img/startup-ipadmini-portrait.png',
       'img/startup-iphone5.png',
       'img/startup-iphone6.png',
       'img/startup-iphone6plus.png',
       'img/startup-iphonex.png',
       'img/startup-iphonexr.png',
       'img/startup-iphonexs.png',
       'img/undefined.png',
       'img/variable.png',
       'img/vertical-visibility.png',
       'img/wind_nodata.png',
       'img/ios-share.png',
       'img/ios-addhomescreen.png'
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
    //delete old cache
    caches.delete('Version1');
    /*caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });*/
  }
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
