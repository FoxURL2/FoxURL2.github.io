// Load favicon, Apple Touch Icons, and manifest for PWA behavior

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
