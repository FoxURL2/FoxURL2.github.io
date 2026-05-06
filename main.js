// Automatically load the FoxURL favicon on all pages that include main.js

(function loadFavicon() {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "logo.png"; // your favicon source
  document.head.appendChild(link);

  console.log("Favicon loaded by main.js");
})();
