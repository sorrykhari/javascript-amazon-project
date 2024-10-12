import { addToCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { findMatchingProduct, products } from "../data/products.js";
// initialize some variables
let orderHeaderHTML = '';
let orderDetailHTML = '';
let cartQuantity = calculateCartQuantity();

// loop through each order to create unique header
orders.forEach((order) => {
  let matchedProduct;
  const orderDate = formatDate(order.orderTime);

  orderHeaderHTML += 
  `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${order.getPrice()}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
        </div>
      </div>
    </div>
  `;
  
  // loop through products of each order to place inside container 
  order.products.forEach((product) => {
    const { quantity, estimatedDeliveryTime, productId } = product;
    matchedProduct = findMatchingProduct(productId);
    const { name, image } = matchedProduct;
    const deliveryDate = formatDate(estimatedDeliveryTime)
    
    orderDetailHTML += 
    `
    <div class="product-image-container">
              <img src="${image}">
            </div>

            <div class="product-details">
              <div class="product-name">
              ${name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary
              js-buy-again-button"
              data-product-id="${productId}"
              data-quantity = ${quantity}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
  });
});

document.querySelector('.js-order-container')
  .innerHTML = orderHeaderHTML;

document.querySelector('.js-order-details-grid')
  .innerHTML = orderDetailHTML;

document.querySelector('.js-cart-quantity')
  .innerText = cartQuantity;

document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, quantity } = button.dataset;
      console.log(productId);
      console.log(Number(quantity));
      addToCart(productId, Number(quantity));
    });

});
function formatDate(date) {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString('en-US', {month: 'long', day: '2-digit'});
  return formattedDate;
}