var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.page-header__toggle');
var mapLeaflet = document.querySelector('.map')


navMain.classList.remove('main-nav--nojs');
navToggle.classList.remove('page-header__toggle--nojs');
mapLeaflet.classList.remove('map--nojs');


navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--opened')) {
    //Если меню открыто то:
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.add('page-header__toggle--closed');
    navToggle.classList.remove('page-header__toggle--opened');
  } else {
    // Если не открыто:
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.remove('page-header__toggle--closed');
    navToggle.classList.add('page-header__toggle--opened');
  }
})

const map = L.map('map')
  .setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 17);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker({
  lat: 59.96831,
  lng: 30.31748,
}, );

marker.addTo(map);
