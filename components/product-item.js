// product-item.js

const template = document.createElement('template');
template.innerHTML = `
<style>
@import "../styles/styles.css";
</style>
<li></li>`;


class ProductItem extends HTMLElement {
  constructor() {
    
    super();
    
    //Create a shadow root

    this.root = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
 
    

    const prod = document.createElement('li');
    prod.setAttribute('class','product');

    const img = prod.appendChild(document.createElement('img'));
    img.src = this.getAttribute("prod-img");
    img.width = 200;
    img.alt = this.getAttribute("prod-title");


    const title = prod.appendChild(document.createElement('p'));
    title.setAttribute('class','title');
    title.innerText = this.getAttribute("prod-title");

    const price = prod.appendChild(document.createElement('p'));
    price.setAttribute('class','price');
    price.innerText = this.getAttribute("prod-price");
    
    const prodButton = prod.appendChild(document.createElement('button'));
    prodButton.setAttribute("id", "add-product");
    //prodButton.innerText("Add to Cart");
    

  }

  addRemoveProduct() {
    var prodid = this.getAttribute("id");
    var cartItems = [];
    cartItems = localStorage.getItem("cartitems");
    var hasId = cartItems.includes(prodid);
    
    const prodButton = this.shadowRoot.querySelecter('#add-product');
    if (hasId) {
      prodButton.innerText("Add to Cart");
      const index = cartItems.indexOf(prodid);
      if (index > -1) {
         cartItems.splice(index, 1);
       }
      
    } else {
      prodButton.innerText("Remove from Cart");
      cartItems.push(prodid);
    }
    localStorage.setItem("cartitems", cartItems);
  }


  connectedCallback() {
    this.shadowRoot.querySelector("#add-product");
    addEventListener('click', () => this.addRemoveProduct());
  }

}

customElements.define('product-item', ProductItem);



    