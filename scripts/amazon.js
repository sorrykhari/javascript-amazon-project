// 1. Import variables from Module and load product data
import { cart, addToCart, calculateCartQuantity, loadCartFetch } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);


// 2. Use data to generate HTML
function renderProductsGrid () {

  let productsHTML = '';

  updateCartQuantity(); // Update cart as page loads

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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
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

          ${product.extraInfoHTML()}

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
    innerHTML = productsHTML; // Puts generated HTML in products grid container 

    // 3. Make it interactive

    let intervalId; // Create interval id for added message

    

  function updateCartQuantity() {
    
    let cartQuantity = calculateCartQuantity();
      
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  }

  function addedMessage(productId, intervalId) {
      const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
      addedElement.classList.add('was-added');

      
      clearInterval(intervalId);
      intervalId = setTimeout(() => {
        addedElement.classList.remove('was-added');
      }, 2000)
    }

  document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          // Initializing button data
          const { productId } = button.dataset; // button.dataset.productId - destructed & name gets converted from kebab case to camel case
          
          // Get amount from selector dropdown
          const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
          let quantity = Number(selectElement.value);
          
          // Create green added pop up and remove after two seconds
          addedMessage(productId, intervalId);
          
          // Add product object to cart array
          addToCart(productId, quantity);

          //Change cart quantity on top right of page
          updateCartQuantity();
        });
      });
 loadCartFetch();
  }

