'use strict'

// ++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++
// DATA SETUP
// ++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++

// DOM variables
// -----------------
var picContainer = document.getElementById('pic_container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var clickButton = document.getElementById('clickButton');
var showChart = document.getElementById('chart');
var storedData = JSON.stringify(allProducts); // convert and assign all products into string


// Global variables
// -----------------
var allProducts = [];
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water_can', 'wine_glass'];

//before pageload, use IF statement to validate that local storage exists, then retrieve data, convert, and put it back into array. Else, run the code as normal
if (storedData !== '') {
  var retrievedData = localStorage.getItem('storedData');
  localStorage.retrievedData = JSON.parse('retrievedData');
  localStorage.setItem ('storedData', JSON.stringify('storedData'));
}


// Constructor
// -----------------
function Product(name) {
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

Product.prototype.render = function () {
  // alert("name: " + this.name + "\nclicks: " + this.clicks + "\nviews: " + this.views );
};

// Instances
// -----------------
for(var i = 0; i < names.length; i++) {
  new Product(names[i]);
}
// console.table(allProducts);

// ++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++
// DECLARE FUNCTIONS
// (DEFINE ACTIONS)
// ++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++

function rand() {
  // generate a random number between 0 and allProducts.length
  return Math.floor(Math.random() * allProducts.length);
}

// -----------------------------------------------------------------------------

var newPicsArray = [];
var oldPicsArray = [];
var clickCounter = 0;

// Make a function to prevent duplicates
function makeArrayOfThreeNumbers() {
//set oldPicsArray equals to newPicsArray because we need to prevent each time the code runs it would wipe out the previous array.  The "For" loops (set up later in the code) will helps this run.  This essentially turn new array into old array and so on as it runs through the loop.
  oldPicsArray[0] = newPicsArray[0];
  oldPicsArray[0] = newPicsArray[0];
  oldPicsArray[0] = newPicsArray[0];

// Below is the logic to prevent duplicates with prior set of images (compare newPicsArray with newPicsArray) and within current set of images (compare newPicsArray with oldPicsArray)

  // set initial array to a random set to 3 numbers with indexes [0], [1], [2]
  newPicsArray[0] = rand();
  // while loop to rule out duplicate between new array index [0] and the old("next") array index [0] , [1] and [2]
  while (newPicsArray[0] === oldPicsArray[0] || newPicsArray[0] === oldPicsArray[1] || newPicsArray[0] === oldPicsArray[2]) {
    // console.log(newPicsArray);
    //after it has ruled out that there is no duplicate, set the array index [0] to a random number
    newPicsArray[0] = rand();
  }

  newPicsArray[1] = rand();
  // first: validate within the new array that there's no duplicate between index [0] and [1].  Note: we didnt' have to worry about that for the newPicsArray[0] above because there wasn't any number generated prior to it.
  //second: rule out duplicate between new array index [1] and the old("next") array index [0], [1], [2]
  while (newPicsArray[1] === newPicsArray[0] || newPicsArray[1] === oldPicsArray[0] || newPicsArray[1] === oldPicsArray[1] || newPicsArray[1] === oldPicsArray[2]) {
    //after it has ruled out that there is no duplicate, set the array index [1] to a random number
    newPicsArray[1] = rand();
  }

  newPicsArray[2] = rand();
  //first: validate within the new array that there's no duplicate between index [0] and [1] and [2]. That is index [2] # [0] # [1]
  //second: rule out duplicate between new array index [2] and the old("next") array index [0], [1], [2]
  while (newPicsArray[2] === newPicsArray[0] || newPicsArray[2] === newPicsArray[1] || newPicsArray[2] === oldPicsArray[0] || newPicsArray[2] === oldPicsArray[1] || newPicsArray[2] === oldPicsArray[2]) {
    //after it has ruled out that there is no duplicate, set the array index [2] to a random number
    newPicsArray[2] = rand();
  }

}

// ---------------------------------------------------------------------

// this will place three new images on the page and get view clicks
function showThreePics() {
  makeArrayOfThreeNumbers(); // call function from above

  left.src = allProducts[newPicsArray[0]].filepath;  // this will place first image on the left
  allProducts[newPicsArray[0]].views +=1;  // add 1 to the view of each image clicked on

  center.src = allProducts[newPicsArray[1]].filepath; // this will place second image in the center
  allProducts[newPicsArray[1]].views +=1; // add 1 to the view of each image clicked on

  right.src = allProducts[newPicsArray[2]].filepath; // this will place first image on the right
  allProducts[newPicsArray[2]].views +=1; // add 1 to the view of each image clicked on
}


var clicks = [];
var views = [];

function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    clicks[i] = allProducts[i].clicks;
    views[i] = allProducts[i].views;
  }
}


function handleClick(event) {
  if (clickCounter >= 25) {
    // No more clicks should be allowed, we have already hit the total number.
    return;
  }

  // tally the number of clicks
  clickCounter += 1;
  // console.log(clickCounter, 'total clicks so far');

  event.preventDefault();
  // identify who was clicked
  // console.log(event.target.src, 'was clicked');
  // alert for clicks not on images
  if (event.target.id === 'pic_container'){
    return alert ('Please click on a picture, not the background.');
  }

  // tally the click
  if(event.target.id === 'left') {
    allProducts[newPicsArray[0]].clicks +=1;
    // console.log(allProducts[newPicsArray[0]]);
    updateChartArrays();
  }

  if(event.target.id === 'center') {
    allProducts[newPicsArray[1]].clicks +=1;
    // console.log(allProducts[newPicsArray[1]]);
    updateChartArrays();
  }

  if(event.target.id === 'right') {
    allProducts[newPicsArray[2]].clicks +=1;
    // console.log(allProducts[newPicsArray[2]]);
    updateChartArrays();
  }


  // View Result button only appears when total clicks have reached 25 clicks.
  if (clickCounter >= 25) {
    showButton();
  } else {
    showThreePics();
  }
}

// function for button behavior
function showButton() {
  var myButton = document.getElementById('clickButton');
  myButton.style.display = 'block';
}

  // list display of product names and # of views and clicks for each product
function displayList() {
  var picList = document.getElementById('picList');
  picList.innerHTML = '';
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    var liEl2 = document.createElement('li');
    liEl.textContent = allProducts[i].name + ' has been clicked ' + allProducts[i].clicks + ' times';
    liEl2.textContent = allProducts[i].name + ' has been viewed ' + allProducts[i].views + ' times';
    picList.appendChild(liEl);
    picList.appendChild(liEl2);
  }
  drawChart();
}



// emptying the chart and update values we put into it
function displayChart() {
  var chart = document.getElementsByClassName('chart');
  chart.innerHTML = '';
  updateChartArrays();
}

// CHART -----------------------------------------------------------------------------------------------------------------

//declare global variables for chart
var tallyChart;
var chartDrawn = false;



// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: names,  // product names array we declared earlier
  datasets: [
    {
      label: 'Clicks',  //clicks array we declared earlier
      data: clicks,
      backgroundColor:
        'blue',
      hoverBackgroundColor:
        'lightblue'
    },

    {
      label: 'Views',  //clicks array we declared earlier
      data: views,
      backgroundColor:
        'green',
      hoverBackgroundColor:
        'lightgreen'
    }]
};

function drawChart() {
  var ctx = document.getElementById('click-chart').getContext('2d'); // needs to attach to canvas id in html
  tallyChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero: true
      }
    }]
  });
  chartDrawn = true;
}


// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++


document.getElementById('click-chart').addEventListener('click', function(){
  drawChart();
});

if (chartDrawn) {
  tallyChart.update();
}


// display 3 new images
showThreePics();
clickButton.addEventListener('click', displayList);
picContainer.addEventListener('click', handleClick);
showChart.addEventListener('click', showChart);
