import { cart } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { findMatchingProduct } from "../../data/products.js";
 
export function renderPaymentSummary() {
	
	let productPriceCents = 0;
	let shippingPriceCents = 0;

	cart.forEach((cartItem) => {
		const product = findMatchingProduct(cartItem.productId);
 		productPriceCents += product.priceCents * Number(cartItem.quantity);

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});

	console.log(productPriceCents);
	console.log(shippingPriceCents);

}