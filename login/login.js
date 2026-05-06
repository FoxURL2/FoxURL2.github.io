document.getElementById("loginBtn").addEventListener("click", foxLogin);

async function foxLogin() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.classList.add("hidden");

  if (!email || !pass) {
    errorBox.textContent = "Please enter email and password";
    errorBox.classList.remove("hidden");
    return;
  }

  // Load API config
  const api = await fetch("https://foxurl2.github.io/api.json").then(r => r.json());
  const csvURL = api.accounts.sheet;

  // Fetch CSV
  const res = await fetch(csvURL);
  const text = await res.text();
  const rows = text.split("\n").slice(1); // skip header

  let found = false;

  rows.forEach(row => {
    const cols = row.split(",");

    const sheetEmail = cols[0];
    const sheetPass = cols[1];

    if (sheetEmail === email && sheetPass === pass) {
      found = true;

      // Save login state
      localStorage.setItem("foxurl_logged_in", "true");
      localStorage.setItem("foxurl_email", sheetEmail);
    }
  });

  if (!found) {
    errorBox.textContent = "Invalid email or password";
    errorBox.classList.remove("hidden");
    return;
  }

  // Redirect to dashboard
  window.location.href = "https://foxurl2.github.io/dashboard/";
}
