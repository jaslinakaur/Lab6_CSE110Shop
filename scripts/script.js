// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  var localStorage = window.localStorage;

  displayProducts();

    /* li from the HTML document:
    <!-- li class="product">
    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
    <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
    <p class="price">$109.95</p>
    <button onclick="alert('Added to Cart!')">Add to Cart</button>
    </li -->
    */

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

  console.log(products);
}

