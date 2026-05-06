// ===============================
// FoxURL Global Script (main.js)
// ===============================

// -------------------------------
// 1. Load favicon + PWA manifest
// -------------------------------
(function loadIconsAndManifest() {
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "https://foxurl2.github.io/logo.png";
  document.head.appendChild(favicon);

  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = "https://foxurl2.github.io/logo.png";
  document.head.appendChild(appleIcon);

  const appleIcon180 = document.createElement("link");
  appleIcon180.rel = "apple-touch-icon";
  appleIcon180.sizes = "180x180";
  appleIcon180.href = "https://foxurl2.github.io/logo.png";
  document.head.appendChild(appleIcon180);

  const manifest = document.createElement("link");
  manifest.rel = "manifest";
  manifest.href = "manifest.json";
  document.head.appendChild(manifest);

  const iosMeta = document.createElement("meta");
  iosMeta.name = "apple-mobile-web-app-capable";
  iosMeta.content = "yes";
  document.head.appendChild(iosMeta);
})();


// -------------------------------
// 2. Register service worker (PWA)
// -------------------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service worker registered"))
    .catch(err => console.error("SW registration failed:", err));
}


// -------------------------------
// 3. Chrome Install Button Support
// -------------------------------
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

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
    z-index: 9999;
  `;
  document.body.appendChild(btn);

  btn.addEventListener("click", async () => {
    btn.remove();
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
});


// -------------------------------
// 4. Load API URL from api.txt
// -------------------------------
let FOXURL_API = null;

async function loadApiUrl() {
  if (FOXURL_API) return FOXURL_API;

  const res = await fetch("https://foxurl2.github.io/api.txt");
  FOXURL_API = (await res.text()).trim();
  return FOXURL_API;
}


// -------------------------------
// 5. Send file‑creation requests
// -------------------------------
async function foxurlCreate(type, title) {
  const api = await loadApiUrl();

  const res = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: type, title })
  });

  const data = await res.json();
  if (data.url) {
    window.open(data.url, "_blank");
  } else {
    console.error("FoxURL API error:", data);
  }
}


// -------------------------------
// 6. Expose creation helpers
// -------------------------------
window.FoxURL = {
  createDoc: (t) => foxurlCreate("createDoc", t),
  createSheet: (t) => foxurlCreate("createSheet", t),
  createSlide: (t) => foxurlCreate("createSlide", t),
  createForm: (t) => foxurlCreate("createForm", t),
  createDrawing: (t) => foxurlCreate("createDrawing", t),
  createPython: (t) => foxurlCreate("createPython", t),
  createColab: (t) => foxurlCreate("createColab", t),
  createScript: (t) => foxurlCreate("createScript", t)
};

console.log("FoxURL main.js loaded");
