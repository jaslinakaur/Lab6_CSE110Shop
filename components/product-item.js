// product-item.js

var localStorage = window.localStorage;
var products = [];
var selectedProducts = [];
var cartCount = 0;


const template = document.createElement('template');
template.innerHTML = `
<style>
.price {
  color: green;
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
}

.product {
  align-items: center;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-areas: 
  'image'
  'title'
  'price'
  'add';
  grid-template-rows: 67% 11% 11% 11%;
  height: 450px;
  filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
  margin: 0 30px 30px 0;
  padding: 10px 20px;
  width: 200px;
}

.product > button {
  background-color: rgb(255, 208, 0);
  border: none;
  border-radius: 5px;
  color: black;
  justify-self: center;
  max-height: 35px;
  padding: 8px 20px;
  transition: 0.1s ease all;
}

.product > button:hover {
  background-color: rgb(255, 166, 0);
  cursor: pointer;
  transition: 0.1s ease all;
}

.product > img {
  align-self: center;
  justify-self: center;
  width: 100%;
}

.title {
  font-size: 1.1em;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title:hover {
  font-size: 1.1em;
  margin: 0;
  white-space: wrap;
  overflow: auto;
  text-overflow: unset;
}


</style>

<div class="product-item">
<li class="product">
<img id="pimage" width=200></img>
<p id="title" class="title"></p>
<p id="price" class="price"></p>
<button id="addproduct">Add to Cart</button>
</li>
</div>`;


  

class ProductItem extends HTMLElement {
  constructor() {
    
    super();

   //console.log("prod-item");
    
    //Create a shadow root

    this.root = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
 
    this.shadowRoot.querySelector('#pimage').src = this.getAttribute("prod-img");
    this.shadowRoot.querySelector('#pimage').alt = this.getAttribute("prod-title");
    
    this.shadowRoot.querySelector('#title').innerText = this.getAttribute("prod-title");
    this.shadowRoot.querySelector('#price').innerText = '$ ' +this.getAttribute("prod-price");

    const prodButton = this.shadowRoot.querySelector('#addproduct');
  
    if (localStorage.getItem("selprod")) {
      selectedProducts = JSON.parse(localStorage.getItem("selprod"));
    }

    var addTrue = selectedProducts.includes(this.getAttribute("id"));
  
    if (addTrue) {
      prodButton.innerText = "Remove from Cart";    
    } else {
      prodButton.innerText = "Add to Cart";    
    }
      
  
  }

  

  addRemoveProduct() {
    var prodid = this.getAttribute("id");
    //console.log("id =" + prodid);

    var selectedProducts = [];

    if (localStorage.getItem("selprod")) {
      selectedProducts = JSON.parse(localStorage.getItem("selprod"));
    }

    console.log("selectedProducts =" + selectedProducts);
    var hasId = selectedProducts.includes(prodid);
    
    var prodButton = this.shadowRoot.querySelector('#addproduct');
    if (hasId) {
     prodButton.innerText = "Add to Cart";
      const index = selectedProducts.indexOf(prodid);
      if (index > -1) {
         selectedProducts.splice(index, 1);
       }
      
    } else {
      selectedProducts.push(prodid);
      prodButton.innerText = "Remove from Cart";
      
    }
    
    localStorage.setItem("selprod", JSON.stringify(selectedProducts) );
    localStorage.setItem("cartcount", selectedProducts.length);
    updateCart(selectedProducts.length);

  }


  connectedCallback() {
   this.shadowRoot.querySelector('#addproduct').addEventListener('click', () => this.addRemoveProduct());
  }


}

window.customElements.define('product-item', ProductItem);

function updateCart(numItems) {
             document.getElementById('cart-count').textContent = numItems ;
    
}


    