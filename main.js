// Load favicon, Apple Touch Icons, and manifest for PWA behavior

(function loadIconsAndManifest() {
  // Favicon
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "icon.png";
  document.head.appendChild(favicon);

  // Apple Touch Icon
  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = "icon.png";
  document.head.appendChild(appleIcon);

  // High‑res Apple icon
  const appleIcon180 = document.createElement("link");
  appleIcon180.rel = "apple-touch-icon";
  appleIcon180.sizes = "180x180";
  appleIcon180.href = "icon.png";
  document.head.appendChild(appleIcon180);

  // Manifest for PWA
  const manifest = document.createElement("link");
  manifest.rel = "manifest";
  manifest.href = "manifest.json";
  document.head.appendChild(manifest);

  // iOS standalone mode
  const iosMeta = document.createElement("meta");
  iosMeta.name = "apple-mobile-web-app-capable";
  iosMeta.content = "yes";
  document.head.appendChild(iosMeta);

  const iosStatusBar = document.createElement("meta");
  iosStatusBar.name = "apple-mobile-web-app-status-bar-style";
  iosStatusBar.content = "black-translucent";
  document.head.appendChild(iosStatusBar);

  console.log("App icons + manifest loaded by main.js");
})();
// Register service worker for Chrome PWA install support
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service worker registered"))
    .catch(err => console.error("SW registration failed:", err));
}
// Chrome PWA install button
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Create install button
  const btn = document.createElement("button");
  btn.textContent = "Install FoxURL";
  btn.id = "installButton";
  btn.style = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 12px 18px;
    background: white;
    color: #ff7a00;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  `;
  document.body.appendChild(btn);

  btn.addEventListener("click", async () => {
    btn.remove();
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("Install choice:", choice.outcome);
    deferredPrompt = null;
  });
});
