// Toggle create menu
document.getElementById("createButton").addEventListener("click", () => {
  document.getElementById("createMenu").classList.toggle("hidden");
});

// Google linking logic
document.addEventListener("DOMContentLoaded", async () => {
  const config = await fetch("https://foxurl2.github.io/api.json").then(r => r.json());

  const googleNotLinked = document.getElementById("googleNotLinked");
  const googleTools = document.getElementById("googleTools");

  // If user has linked Google before, Apps Script will redirect them
  // We detect linking by checking if the user has visited the Apps Script endpoint
  const linked = localStorage.getItem("googleLinked") === "true";

  if (linked) {
    googleNotLinked.classList.add("hidden");
    googleTools.classList.remove("hidden");
  }

  // Link Google button
  document.getElementById("linkGoogleBtn").addEventListener("click", () => {
    localStorage.setItem("googleLinked", "true");
    window.open(config.google.endpoint, "_blank");
    googleNotLinked.classList.add("hidden");
    googleTools.classList.remove("hidden");
  });
});
