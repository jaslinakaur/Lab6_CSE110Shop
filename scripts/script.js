// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  /*var localStorage = window.localStorage;
  var products = [];
  var selectedProducts = [];
  var cartCount = 0;

  localStorage.setItem("selprod", selectedProducts );
  localStorage.setItem("cartcount", selectedProducts.length);
  */

  displayProducts();

});

async function getProducts() {
  let url = 'https://fakestoreapi.com/products';
  try {
      let res = await fetch(url);     
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function displayProducts() {
  
  if (localStorage.getItem("products")) {
    //console("from local storage");
    products = JSON.parse(localStorage.getItem('products')) || [];
  } else {
    products = await getProducts();
    localStorage.setItem("products", JSON.stringify(products));
  }

  let container = document.querySelector('#product-list');

  
 // console.log("SIZE OF PRODUCTS =" + products.length);

  products.forEach(product => {
      //console.log(product.image);

      var prd = document.createElement('div');
      prd.innerHTML = '<product-item id = "' + product.id + '" prod-title="'+ product.title + 
      '" prod-img="' + product.image + '" prod-price="' + product.price + '"></product-item>';

      

      console.log(prd);

      container.appendChild(prd);
     // console.log("added element");

      
  });

   selectedProducts = JSON.parse(localStorage.getItem("selprod"));
   updateCart(selectedProducts.length) ;

//console.log(products);
}





        


