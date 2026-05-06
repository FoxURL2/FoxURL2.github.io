// Simple search: opens Google with the query
document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const query = e.target.value.trim();
        if (query.length > 0) {
            window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
        }
    }
});
