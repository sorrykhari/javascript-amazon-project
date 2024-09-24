// 1. Save the data 2. Generate the HTML 3. Make it interactive
import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js"; 
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js"; // single dot means current folder
import  dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js"

let cartSummaryHTML = '';

updateCheckoutQuantity();

cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct; 

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'day'
  );
  const dateString = deliveryDate.format('dddd, MMMM, D');

  cartSummaryHTML += `
    <div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}"> 

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity
          js-product-quantity-${matchingProduct.id}">
          <span class="original-quantity
          js-original-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
            <span>
              Quantity: <span class="quantity-label
              js-quantity-label-${matchingProduct.id}"></span>
            </span>
            <span class="update-quantity-link link-primary
            js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input hidden
            js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link hidden
            link-primary
            js-save-quantity-link-${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary
            js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;1
});

// Put generated HTML on page
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'day'
    );
    const dateString = deliveryDate.format('dddd, MMMM, D');

    // Use ternary statement
    const priceString = deliveryOption.priceCents
    === 0
    ? 'Free'
    : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html+= `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked' : '' }
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
    `
  });

  return html;
}

function updateCheckoutQuantity() {
  
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)`;
}

function updateQuantityLabel(productId, newQuantity) {
  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabel.innerText = newQuantity;
}


document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      updateCheckoutQuantity();

      const container = document
      .querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    });
  });


  // Reveals quantity input box and save link when clicked.
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;

        const inputBox = document.querySelector(`.js-quantity-input-${productId}`);
        const saveLink = document.querySelector(`.js-save-quantity-link-${productId}`);
        const originalQuantity = document.querySelector(`.js-original-quantity-${productId}`);
        inputBox.classList.remove('hidden');
        saveLink.classList.remove('hidden');
        link.classList.add('hidden');
        
        // Removes input box and save link when clicked
        saveLink.addEventListener('click', () => {
          const newQuantity = Number(inputBox.value);
          
          // Quantity validation
          if (newQuantity <= 0) {
            alert('Quantity can be no less than 1. Select a different value.');
          } 
          else if (newQuantity >= 1000) {
            alert('Quantity cannot exceed 1000. Select a different value.');
          }
          else if (isNaN(newQuantity)) {
            alert('Quantity entered was not a number. Select a different value.');
          }
          else{
            inputBox.classList.add('hidden');
            saveLink.classList.add('hidden');
            link.classList.remove('hidden');
            originalQuantity.innerText = '';
            updateQuantity(productId,newQuantity);
          }
          
          // Update product quantity label based on input
          updateQuantityLabel(productId, newQuantity);

          // Update header checkout when product quantity changed in input
          updateCheckoutQuantity();
        });
      });
    });
  


