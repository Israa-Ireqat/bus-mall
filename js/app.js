'use strict';

let products = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','ptt-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass']

const contentSection =document.getElementById('contentSection');
const firstImg =document.getElementById('firstImg');
const secondImg =document.getElementById('secondImg');
const thirdImg =document.getElementById('thirdImg');

let firstProductIndex=0;
let secondProductIndex=0;
let thirdProductIndex=0;
const clicksNumber=25;

function Product(name){
    this.name= name;
    this.image = `./img/${name}.jpg`;
    this.click= 0;
    this.shown= 0;
    Product.all.push(this);
}
Product.all= [];
Product.counter= 0;

for (let i=0; i< products.length;i++){
    new Product (products[i]);
}
function renderNewProduct(){
    let firstIndex= randomNumber(0,Product.all.length -1);
    firstImg.src= Product.all[firstIndex].image;
    firstImg.alt= Product.all[firstIndex].name;
    firstProductIndex= firstIndex;
    let secondIndex;
    do{
        secondIndex= randomNumber(0,Product.all.length -1);
    }while (firstIndex===secondIndex);
    secondImg.src= Product.all[secondIndex].image;
    secondImg.alt= Product.all[secondIndex].name;
    secondProductIndex= secondIndex;
    let thirdIndex;
    do{ thirdIndex= randomNumber(0,Product.all.length-1);
    }while (firstIndex===thirdIndex || secondIndex===thirdIndex);
    thirdImg.src= Product.all[thirdIndex].image;
    thirdImg.alt= Product.all[thirdIndex].name;
    thirdProductIndex= thirdIndex;

    Product.all[firstIndex].shown++;
    Product.all[secondIndex].shown++;
    Product.all[thirdIndex].shown++;
}
function theClick (event){
    if (Product.counter<=clicksNumber){
        const clickedProduct= event.target;
        if (clickedProduct.id=='firstImg'|| clickedProduct.id=='secondImg'|| clickedProduct.id=='thirdImg'){
            if (clickedProduct.id=='firstImg'){
               Product.all[firstIndex].clicks++;
            }
            if(clickedProduct.id=='secondImg'){
               Product.all[secondIndex].clicks++;
            }
            if (clickedProduct.id=='thirdImg'){
                Product.all[thirdIndex].clicks++;
            }
            product.counter++;
            renderNewProduct();
        }
    }
}
contentSection.addEventListener( 'click', theClick );
console.log( Product.all );
function randomNumber( min, max ) {
     return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    renderNewProduct();
