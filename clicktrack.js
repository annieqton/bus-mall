'use strict'

var img0 = 'bag.jpg';
var img1 = 'banana.jpg';
var img2 = 'boot.jpg';
var img3 = 'breakfast.jpg';
var img4 = 'bubblegum.jpg';
var img5 = 'chair.jpg';
var img6 = 'cthulhu.jpg';
var img7 = 'dog-duck.jpg';
var img8 = 'dragon.jpg';
var img9 = 'pen.jpg';
var img10 = 'pen.jpg';
var img11 = 'pet-sweep.jpg';
var img12 = 'scissors.jpg';
var img13 = 'shark.jpg';
var img14 = 'sweep.jpg';
var img15 = 'tauntaun.jpg';
var img16 = 'unicorn.jpg';
var img17 = 'usb.jpg';
var img18 = 'water-can';
var img19 = 'wine-glass';

var product = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19];
// var index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var groupOfProducts = [product, product, product];
var allProducts = [];
var clickCount = 0;
var clickTally = 0;

//-------------------------------------------------------
// write function to select 3 random product images
function selectRandomProduct(product) {
  this.product = product;
  this.randomProductArray = [];

  for (var i = 0; i < product.length; i++) {
    this.randomProductArray.push(Math.floor(Math.random() * product.length));
  }
};
