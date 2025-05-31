const CACHE_NAME = 'investment-comparator-v16'; // NEW VERSION (must match script.js)
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Add your icon paths here:
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  // Add image paths for service worker cache
  './images/sml.jpeg', // Changed from .png
  './images/vfl.jpeg', // Changed from .png
  './images/snl.jpeg'  // Changed from .png
];

// ... rest of your sw.js code ...