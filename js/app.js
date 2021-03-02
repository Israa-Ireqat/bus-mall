'use strict';

let products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg']

const result = document.getElementById('result')
const contentSection = document.getElementById('contentSection');
const firstImg = document.getElementById('firstImg');
const secondImg = document.getElementById('secondImg');
const thirdImg = document.getElementById('thirdImg');

let firstProductIndex = 0;
let secondProductIndex = 0;
let thirdProductIndex = 0;
const clicksNumber = 24;
Product.all = [];
Product.counter = 0;
//my product
function Product(name) {
    this.name = name.split('.').slice(0, -1).join('.');
    this.image = `./img/${name}`;
    this.clicks = 0;
    this.shown = 0;
    Product.all.push(this);
}

//
for (let i = 0; i < products.length; i++) {
    new Product(products[i]);
}
//No repeating Images:
let noRepeatArray =[];

//rendering function:
function renderNewProduct() {
    let firstIndex = randomNumber(0, Product.all.length - 1);
    firstImg.src = Product.all[firstIndex].image;
    firstImg.alt = Product.all[firstIndex].name;
    firstProductIndex = firstIndex;
    noRepeatArray.push(firstIndex);
    let secondIndex;
    do {
        secondIndex = randomNumber(0, Product.all.length - 1);
    } while (firstIndex === secondIndex);
    noRepeatArray.push(secondIndex);
    secondImg.src = Product.all[secondIndex].image;
    secondImg.alt = Product.all[secondIndex].name;
    secondProductIndex = secondIndex;
    
    let thirdIndex;
    do {
        thirdIndex = randomNumber(0, Product.all.length - 1);
    } while (firstIndex === thirdIndex || secondIndex === thirdIndex);
    noRepeatArray.push(thirdIndex);
    thirdImg.src = Product.all[thirdIndex].image;
    thirdImg.alt = Product.all[thirdIndex].name;
    thirdProductIndex = thirdIndex;

    Product.all[firstIndex].shown++;
    Product.all[secondIndex].shown++;
    Product.all[thirdIndex].shown++;
    //
    
}
//listener
//contentSection.addEventListener('click', handelClick);
function handelClick(event) {
    if (Product.counter <= clicksNumber) {
        const clickedProduct = event.target;
        if (clickedProduct.id == 'firstImg' || clickedProduct.id == 'secondImg' || clickedProduct.id == 'thirdImg') {
            if (clickedProduct.id == 'firstImg') {
                Product.all[firstProductIndex].clicks++;
            }
            if (clickedProduct.id == 'secondImg') {
                Product.all[secondProductIndex].clicks++;
            }
            if (clickedProduct.id == 'thirdImg') {
                Product.all[thirdProductIndex].clicks++;
            }
            Product.counter++;
            renderNewProduct();
        }
        removeEventListener('click', handelClick);
        result.addEventListener('click', handelButtonClick);
        //else {
           // result.style.display = 'block';
        //}
    } //else {
        
        
    //}

}

function handelButtonClick() {
    const resultSection = document.getElementById('resultSection');
    const ulElement = document.createElement('ul');
    resultSection.appendChild(ulElement);
    for (let i = 0; i < Product.all.length; i++) {
        const liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = `${Product.all[i].name} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].shown} times.`;
    }
    drawChart();
    result.removeEventListener('click', handelButtonClick);
    result.onclick = function(){
        location.reload();
    };

}
firstImg.addEventListener( 'click',handelClick );
secondImg.addEventListener( 'click',handelClick );
thirdImg.addEventListener( 'click',handelClick );

//console.log(Product.all);
//
function randomNumber(min, max) {
    let theIndex = Math.floor(Math.random()* ( max - min +1)) + min;
    for( let i =0; i<noRepeatArray.length;i++){
       if(theIndex === noRepeatArray[i]){
        theIndex = Math.floor(Math.random()* ( max - min +1)) + min; 
       } 
    }
    return ( theIndex);
}
renderNewProduct();
//chart function:
function drawChart(){
let ProductArray= [];
let viewsArray= [];
let votesArray=[];
for (let i = 0; i < Product.all.length; i++) {
    ProductArray.push(Product.all[i].name);
    viewsArray.push(Product.all[i].shown);
    votesArray.push(Product.all[i].clicks);
    
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
     labels: ProductArray,
        datasets: [
            {
                label: 'Votes',
                data: votesArray,
                backgroundColor: 'yellow',
                borderColor:'black',
                borderWidth: 1
            },
            {
                label: 'Times shown',
                data: viewsArray,
                backgroundColor: 'pink',
                borderColor:'black',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}