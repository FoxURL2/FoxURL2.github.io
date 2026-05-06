// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("sidebarToggle");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Search widget logic
(async () => {
  const input = document.getElementById("foxurl-search-input");
  const resultsBox = document.getElementById("foxurl-search-results");

  let pages = [];

  try {
    const res = await fetch("layout.json");
    pages = await res.json();
  } catch {
    resultsBox.innerHTML = "<p style='color:red;'>Could not load layout.json</p>";
  }

  let selectedIndex = -1;

  function renderResults(query) {
    resultsBox.innerHTML = "";
    selectedIndex = -1;
    if (!query.trim()) return;

    const q = query.toLowerCase();
    const matches = pages.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags || []).some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 7);

    matches.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "result-item";
      item.style = `
        padding:10px;
        border:1px solid #ffa64d;
        border-radius:10px;
        margin-bottom:10px;
        cursor:pointer;
        background:#fff6ec;
        transition:0.15s;
      `;

      item.innerHTML = `
        <strong style="color:#ff7a00;">${p.name}</strong><br>
        <span style="font-size:14px;">${p.description}</span>
      `;

      item.addEventListener("click", () => window.location = p.link);
      resultsBox.appendChild(item);
    });
  }

  input.addEventListener("input", () => renderResults(input.value));
})();
