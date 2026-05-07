let accountRow = null;

document.getElementById("nextBtn").addEventListener("click", checkEmail);
document.getElementById("loginBtn").addEventListener("click", checkPassword);

async function checkEmail() {
  const email = document.getElementById("email").value.trim();
  const errorBox = document.getElementById("error");
  const connecting = document.getElementById("connecting");

  errorBox.classList.add("hidden");

  if (!email) {
    errorBox.textContent = "Enter your email";
    errorBox.classList.remove("hidden");
    return;
  }

  // Show animation
  connecting.classList.remove("hidden");

  // Load API config
  const api = await fetch("../api.json").then(r => r.json());
  const csvURL = api.accounts.sheet;

  // Fetch CSV
  const res = await fetch(csvURL);
  const text = await res.text();
  const rows = text.split("\n").slice(1);

  accountRow = null;

  rows.forEach(row => {
    const cols = row.split(",").map(c => c.trim());
    if (cols[0] === email) {
      accountRow = cols;
    }
  });

  connecting.classList.add("hidden");

  if (!accountRow) {
    errorBox.textContent = "Account not found";
    errorBox.classList.remove("hidden");
    return;
  }

  // Move to password step
  document.getElementById("emailStep").classList.add("hidden");
  document.getElementById("passwordStep").classList.remove("hidden");
  document.getElementById("emailDisplay").textContent = email;
}

function checkPassword() {
  const pass = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.classList.add("hidden");

  if (!pass) {
    errorBox.textContent = "Enter your password";
    errorBox.classList.remove("hidden");
    return;
  }

  const sheetPass = accountRow[1];

  if (pass !== sheetPass) {
    errorBox.textContent = "Incorrect password";
    errorBox.classList.remove("hidden");
    return;
  }

  // Login success
  localStorage.setItem("foxurl_logged_in", "true");
  localStorage.setItem("foxurl_email", accountRow[0]);

  window.location.href = "../dashboard/";
}
