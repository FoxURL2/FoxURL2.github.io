// Load favicon, Apple Touch Icons, and manifest for PWA behavior

(function loadIconsAndManifest() {
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "icon.png";
  document.head.appendChild(favicon);

  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = "icon.png";
  document.head.appendChild(appleIcon);

  const manifest = document.createElement("link");
  manifest.rel = "manifest";
  manifest.href = "manifest.json";
  document.head.appendChild(manifest);

  const iosMeta = document.createElement("meta");
  iosMeta.name = "apple-mobile-web-app-capable";
  iosMeta.content = "yes";
  document.head.appendChild(iosMeta);
})();

// Register service worker (required for Chrome install button)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service worker registered"))
    .catch(err => console.error("SW registration failed:", err));
}
