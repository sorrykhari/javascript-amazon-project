import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js"; 
import { findMatchingProduct, products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { caluclateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  renderCheckoutHeader();

  cart.forEach((cartItem) => {
    const { productId } = cartItem;

    let matchingProduct = findMatchingProduct(productId); 

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = caluclateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}"> 

          <div class="cart-item-details">
            <div class="product-name
            js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price
            js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
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
              js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
      
      const dateString = caluclateDeliveryDate(deliveryOption);

      // Use ternary statement
      const priceString = deliveryOption.priceCents
      === 0
      ? 'Free'
      : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html+= `
        <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id=${matchingProduct.id}
        data-delivery-option-id=${deliveryOption.id}>
          <input type="radio"
            ${isChecked ? 'checked' : '' }
            class="delivery-option-input
            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
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

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });


    // Reveals quantity input box and save link when clicked.
    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const { productId } = link.dataset;
          const originalQuantity = document.querySelector(`.js-original-quantity-${productId}`);
          const inputBox = document.querySelector(`.js-quantity-input-${productId}`);
          const saveLink = document.querySelector(`.js-save-quantity-link-${productId}`);
          const newQuantityValue = document.querySelector(`.js-quantity-label-${productId}`);
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
              newQuantityValue.innerText = newQuantity;
              updateQuantity(productId,newQuantity);
              renderCheckoutHeader();
              //renderOrderSummary();
              renderPaymentSummary();
            }
            
            // Update product quantity label based on input

            // Update header checkout when product quantity changed in input
            renderCheckoutHeader();
            //renderOrderSummary();
            renderPaymentSummary();
          });
        });
      });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        // Get data attached to html attributes
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    }); 
} 



