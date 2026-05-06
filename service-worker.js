// Minimal service worker required for PWA install prompt
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
});
