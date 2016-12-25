//Подключение svg-спрайта

;(function(window, document) {
  'use strict';
  var file = 'img/symbols.svg',
    revision = 1;
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
    request,
    data,
    insertIT = function() {
      document.body.insertAdjacentHTML('afterbegin', data);
    },
    insert = function() {
      if (document.body) insertIT();
      else document.addEventListener('DOMContentLoaded', insertIT);
    };
  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      return true;
    }
  }
  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  } catch (e) {}
}(window, document));

//Выпадающее меню в мобильной версии

var navMain = document.querySelector('.page-header__nav');
var navToggle = document.querySelector('.page-header__toggle');

navMain.classList.remove('page-header__nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('page-header__nav--closed')) {
    navMain.classList.remove('page-header__nav--closed');
    navMain.classList.add('page-header--opened');
  } else {
    navMain.classList.add('page-header__nav--closed');
    navMain.classList.remove('page-header--opened');
  }
});

//Модальное окно

//Открыть модальное окно

function toMakeOrder(){
  var makeOrder = document.querySelectorAll('.make-order');
  var modalWindow = document.querySelector('.modal');
  var modalShadow = document.querySelector('.modal-shadow');

  for ( var i = 0; i < makeOrder.length; i++){
    makeOrder[i].addEventListener('click', function(e){
      e.preventDefault();
      modalWindow.classList.remove('element-invisible');
      modalShadow.classList.remove('element-invisible');
    })
  }
}
toMakeOrder();

//Закрыть модальное окно

var modalWindow = document.querySelector('.modal');
var modalShadow = document.querySelector('.modal-shadow');

modalShadow.addEventListener('click', function() {
  modalWindow.classList.add('element-invisible');
  modalShadow.classList.add('element-invisible');
});
