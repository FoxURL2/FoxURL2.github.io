document.getElementById("createButton").addEventListener("click", () => {
  document.getElementById("createMenu").classList.toggle("hidden");
});

document.getElementById("foxLoginBtn").addEventListener("click", () => {
  window.location.href = "https://foxurl2.github.io/login/";
});

document.addEventListener("DOMContentLoaded", async () => {

  // 1. Check FoxURL login
  const loggedIn = localStorage.getItem("foxurl_logged_in") === "true";

  const loginBox = document.getElementById("foxLoginBox");
  const allSections = document.querySelectorAll(".section");

  if (!loggedIn) {
    loginBox.classList.remove("hidden");
    allSections.forEach(sec => sec.classList.add("disabled-section"));
    return;
  }

  loginBox.classList.add("hidden");

  // 2. Fetch account data
  const api = await fetch("https://foxurl2.github.io/api.json").then(r => r.json());
  const csvURL = api.accounts.sheet;

  const email = localStorage.getItem("foxurl_email");

  const res = await fetch(csvURL);
  const text = await res.text();
  const rows = text.split("\n").slice(1);

  let googleAuth = "false";
  let microsoftAuth = "false";

  rows.forEach(row => {
    const cols = row.split(",");
    if (cols[0] === email) {
      googleAuth = cols[2];
      microsoftAuth = cols[3];
    }
  });

  // 3. Update Google section
  if (googleAuth === "true") {
    document.getElementById("googleNotLinked").classList.add("hidden");
    document.getElementById("googleTools").classList.remove("hidden");
  } else {
    document.getElementById("googleNotLinked").classList.remove("hidden");
    document.getElementById("googleTools").classList.add("hidden");
  }

  // Microsoft stays greyed out for now
});
