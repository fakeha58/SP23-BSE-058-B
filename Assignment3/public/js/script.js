// Toggle Menu
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

// Menu Tab Switching
const menuLinks = document.querySelectorAll('.horizontal-menu a');
const menuContents = document.querySelectorAll('.menu-content');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Hide all menu contents
    menuContents.forEach(content => content.classList.remove('active'));

    // Show the target menu content
    const target = document.getElementById(link.dataset.target);
    target.classList.add('active');
  });
});

// Submenu Toggle
const toggleSubmenuLinks = document.querySelectorAll('.toggle-submenu');

toggleSubmenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const submenu = link.nextElementSibling;
    submenu.classList.toggle('open');
  });
});

const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');

// Toggle the search overlay
searchToggle.addEventListener('click', () => {
  searchOverlay.style.display = 'flex';
});

// Close the search overlay when clicking outside the search bar
searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) {
    searchOverlay.style.display = 'none';
  }
});