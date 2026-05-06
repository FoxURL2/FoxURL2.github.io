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
