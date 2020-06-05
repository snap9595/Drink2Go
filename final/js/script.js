var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

var link = document.querySelector('.js-login');
var popup = document.querySelector('.modal');
var close = popup.querySelector('.modal__button--close');
var form = popup.querySelector('form');
var login = popup.querySelector('[name=login]');
var password = popup.querySelector('[name=password]');

var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('login');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('modal--show');

  if (storage) {
    login.value = storage;
    password.focus();
  } else {
    login.focus();
  }
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal--show');
  popup.classList.remove('modal--error');
});

form.addEventListener('submit', function (evt) {
  if (!login.value || !password.value) {
    evt.preventDefault();
    popup.classList.remove('modal--error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('login', login.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup.classList.contains('modal--show')) {
      popup.classList.remove('modal--show');
      popup.classList.remove('modal--error');
    }
  }
});
