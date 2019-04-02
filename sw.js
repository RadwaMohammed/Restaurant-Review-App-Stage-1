// List of URLs to cache
let urlsToCache = [
	'/',
	'index.html',
	'restaurant.html',
	'css/styles.css',
	'js/main.js',
	'js/restaurant_info.js',
	'js/dbhelper.js',
	'data/restaurants.json',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
	'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
	'https://fonts.googleapis.com/css?family=Open+Sans',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];
let staticCacheName = 'restaurant-review-v1';

// Cache all pages and assets required for offline app
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache){
			return cache.addAll(urlsToCache);
		})
	);
});

// Delete old caches as we add new cache
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-review-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

// Fetch files from cache or network
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
});