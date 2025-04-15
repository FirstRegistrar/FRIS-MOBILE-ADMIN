document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.createElement("button");

    toggleBtn.innerHTML = "&#9776;";
    toggleBtn.classList.add("sidebar-toggle");
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("show");
    });
});
