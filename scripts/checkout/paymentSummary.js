import { calculateCartQuantity, cart } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { findMatchingProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
 
export function renderPaymentSummary() {[]
	
	let productPriceCents = 0;
	let shippingPriceCents = 0;
	let cartQuantity = 0;
	

	cart.forEach((cartItem) => {
		const product = findMatchingProduct(cartItem.productId);
 		productPriceCents += product.priceCents * Number(cartItem.quantity);

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;

		cartQuantity = calculateCartQuantity();
	});

	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = totalBeforeTaxCents * .10;
	const totalCents = totalBeforeTaxCents + taxCents;
	 
	const paymentSummaryHTML = 
	`
		<div class="payment-summary">
				<div class="payment-summary-title">
					Order Summary
				</div>

				<div class="payment-summary-row">
					<div class="js-payment-summary-quantity">Items (${cartQuantity}):</div>
					<div class="payment-summary-money">
					$${formatCurrency(productPriceCents)}
					</div>
				</div>

				<div class="payment-summary-row
				js-shipping-payment">
					<div>Shipping &amp; handling:</div>
					<div class="payment-summary-money">
					$${formatCurrency(shippingPriceCents)}
					</div>
				</div>

				<div class="payment-summary-row subtotal-row">
					<div>Total before tax:</div>
					<div class="payment-summary-money">
					$${formatCurrency(totalBeforeTaxCents)}
					</div>
				</div>

				<div class="payment-summary-row">
					<div>Estimated tax (10%):</div>
					<div class="payment-summary-money">
					$${formatCurrency(taxCents)}
					</div>
				</div>

				<div class="payment-summary-row total-row">
					<div>Order total:</div>
					<div class="payment-summary-money
					js-order-total">
					$${formatCurrency(totalCents)}
					</div>
				</div>

				<button class="place-order-button button-primary
				js-place-order">
					Place your order
				</button>
			</div>
`;

document.querySelector('.js-payment-summary')
	.innerHTML = paymentSummaryHTML;

document.querySelector('.js-place-order')
	.addEventListener('click', async () => {
		try{
			const response = await fetch('https://supersimplebackend.dev/orders', { //waits for fetch
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cart: cart
				})
			});
	
			const order = await response.json();
			addOrder(order);
		}
		catch (error) {
			console.log(`Bruh you fucked up lol ${error}.`);
		}

		window.location.href = 'orders.html'; // changes filepath to the orders page
		
	});
}