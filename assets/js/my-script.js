function toggleSidebar() {
    const sidebar = document.getElementById("header");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("sidebar-open");
    overlay.classList.toggle("active");
}