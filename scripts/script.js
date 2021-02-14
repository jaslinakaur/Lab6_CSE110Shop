// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  var localStorage = window.localStorage;

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
  var products = [];
  if (localStorage.getItem("products")) {
    //console("from local storage");
    products = JSON.parse(localStorage.getItem('products')) || [];
  } else {
    products = await getProducts();
    localStorage.setItem("products", JSON.stringify(products));
  }

  let container = document.querySelector('#product-list');

  
  console.log("SIZE OF PRODUCTS =" + products.length);

  products.forEach(product => {
      console.log(product.image);
      var prd = document.createElement('product-item');
      prd.setAttribute("id", product.id );
      prd.setAttribute("prod-title", product.title);
      prd.setAttribute("prod-img", product.image);
      prd.setAttribute("prod-price", product.price);

      container.appendChild(prd);
      
  });

    

//console.log(products);
}

