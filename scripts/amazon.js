// 1. Save the data -Load data structure from data/products.js

// 2. Use data to generate HTML
let productsHTML = '';


products.forEach((product) => {
  productsHTML += ` 
  <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary
        js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
});

document.querySelector('.js-products-grid').
  innerHTML = productsHTML;

  // 3. Make it interactive

  let intervalId; // Create interval id for added message
  
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        // Initializing button data
        const { productId } = button.dataset; // button.dataset.productId - destructed & name gets converted from kebab case to camel case
        
        // Get amount from selector dropdown
        selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
        quantity = Number(selectElement.value);
        
        // Create green added pop up and remove after two seconds
        addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
        addedElement.classList.add('was-added');

        
        clearInterval(intervalId);
        intervalId = setTimeout(() => {
          addedElement.classList.remove('was-added');
        }, 2000)
        
        // Check if product object exists in cart arrayww already
        let matchedItem;

        cart.forEach((item) => {
          if (productId === item.productId) {
            matchedItem = item;
          }
        });

        // If exists add quantity selected
        if (matchedItem) {
          matchedItem.quantity += quantity;
        }
        // If not create product object
        else {
          cart.push({
            productId,
            quantity
          });
        }

        //Change cart quantity on top right of page
        let cartQuantity = 0;

        cart.forEach((item) => {  
          cartQuantity += item.quantity     
        });
        
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
      });
    });