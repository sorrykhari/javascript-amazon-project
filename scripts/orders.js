import { orders } from "../data/orders.js";
import { findMatchingProduct, products } from "../data/products.js";

//1. Save Data
//2. Generate HTML
//3. Make interactive
let orderHeaderHTML = '';
let orderDetailHTML = '';


orders.forEach((order) => {
  let matchedProduct;
  const d = new Date(order.orderTime);
  const orderDate = d.toLocaleDateString('en-US', {month: 'long', day: '2-digit'});
  console.log(order);
  console.log(order.getPrice());
  console.log(orderDate);

  orderHeaderHTML += 
  `
       <div class="orders-grid">
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$35.06</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
            
          </div>
        </div>

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

          <div class="order-details-grid">
            
          </div>
        </div>
      </div>
  `;

  order.products.forEach((product) => {
    matchedProduct = findMatchingProduct(product.productId);
    orderDetailHTML = 
    `
    <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
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