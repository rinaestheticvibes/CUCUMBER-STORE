// SideBar Overlay Function
function toggleSidebar() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'flex';
  document.querySelector('.menu').classList.add('open');
}

function closeSidebar() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  document.querySelector('.menu').classList.remove('open');
}

// Click outside to close, but not inside sidebar
document.addEventListener('click', function (event) {
  const overlay = document.getElementById('overlay');
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.menu');

  const clickedInsideSidebar = sidebar.contains(event.target);
  const clickedHamburgerButton = menu.contains(event.target);

  if (overlay.style.display === 'flex' && !clickedInsideSidebar && !clickedHamburgerButton) {
    closeSidebar();
  }
});

// Prevent sidebar click from closing it (stops event bubbling)
document.getElementById('sidebar').addEventListener('click', function (event) {
  event.stopPropagation();
});


  function toggleMenu() {
    const menu = document.getElementById("logoMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  // Optional: Close when clicking outside
  window.addEventListener("click", function (e) {
    const menu = document.getElementById("logoMenu");
    const trigger = document.querySelector(".menu-trigger");

    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = "none";
    }
  });