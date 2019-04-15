// UI ELEMENTS
const openSearch = document.getElementById('open-search-form');
const searchForm = document.getElementById('search-form');
const openMenu = document.getElementById('open-menu');
const globalMenu = document.getElementById('global-menu');
const menuOverlay = document.getElementById('menu-overlay');
const closeMenu = document.getElementById('menu-close');

// EVENT LISTENERS
openSearch.addEventListener('click', showSearch);
openMenu.addEventListener('click', showMenu);

menuOverlay.addEventListener('click', hideMenu);
closeMenu.addEventListener('click', hideMenu);

// EVENT FUNCTIONS
function showSearch() {
  searchForm.classList.add('search--is-open');
}

function showMenu() {
  globalMenu.classList.add('menu--is-open');
  menuOverlay.classList.add('menu__overlay--is-shown');
}

function hideMenu() {
  globalMenu.classList.remove('menu--is-open');
  menuOverlay.classList.remove('menu__overlay--is-shown');
}
