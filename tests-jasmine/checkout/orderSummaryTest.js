import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js"
import { loadFromStorage, cart } from "../../data/cart.js";


describe('test suite: renderOrderSummary', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
		document.querySelector('.js-test-container').innerHTML = `
		<div class="js-order-summary"></div>
		<div class="js-payment-summary"></div>
		<div class="js-checkout-header-middle-section"></div>
		`;

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
				productId: 'id1',
				quantity: 1,
				deliveryOptionId: '1'
				},
				{
					productId: 'id2',
					quantity: 1,
					deliveryOptionId: '2'
				}]);
		});
		loadFromStorage();

		renderOrderSummary();
	})

	it('displays the cart', () => {
		
		expect(
			document.querySelectorAll('.js-cart-item-container').length
		).toEqual(2);
		
		expect(
			document.querySelector('.js-product-quantity-id1').innerText
		).toContain('1 Quantity:');

		expect(
			document.querySelector('.js-product-quantity-id2').innerText
		).toContain('1 Quantity:');

		document.querySelector('.js-test-container').innerHTML = '';
	});

	it('removes a product', () => {
		
		document.querySelector('.js-delete-link-id1').click()
		
		expect(
			document.querySelectorAll('.js-cart-item-container').length
		).toEqual(1);

		expect(
			document.querySelector('.js-cart-item-container-id1')
		).toEqual(null);

		expect(
			document.querySelector('.js-cart-item-container-id2')
		).not.toEqual(null);
		
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual('id2');

		document.querySelector('.js-test-container').innerHTML = '';
	});
});
