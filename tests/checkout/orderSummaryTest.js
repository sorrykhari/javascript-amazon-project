import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js"
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";


describe('test suite: renderOrderSummary', () => {
	const productName1 = 'Pokemon Center: Sitting Cuties: Mewtwo Plush # 150 - Generation 1';
	const productName2 = 'Frog Dragon I Nick Michel Skateboard Deck - Black - 8.25';

	beforeAll((done) => {
		loadProductsFetch().then(() => {
			done();
		});
	});


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
	});

	afterEach(() => {
		document.querySelector('.js-test-container').innerHTML = '';
	});

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

		
	});

	it('check product name on page', () => {
		
		expect(
			document.querySelector('.js-product-name-id1').innerText
		).toEqual(productName1);

		expect(
			document.querySelector('.js-product-name-id2').innerText
		).toEqual(productName2);
	});

	it('check if prices are correct on page', () => {
		expect(
			document.querySelector('.js-product-price-id1').innerText
		).toEqual('$39.99');

		expect(
			document.querySelector('.js-product-price-id2').innerText
		).toEqual('$76.95');
	});

	it('check if delivery option is updating', () => {
		document.querySelector('.js-delivery-option-id1-3').click();
		const option3 = document.querySelector('.js-delivery-option-input-id1-3').checked;
		
		expect(option3).toEqual(true);
		expect(cart.length).toEqual(2);
		expect(cart[0].productId).toEqual('id1');
		expect(cart[0].deliveryOptionId).toEqual('3');
		expect(document.querySelector('.js-shipping-payment')
			.innerText).toContain('$14.98');
		expect(document.querySelector('.js-order-total')
		.innerText).toContain('$145.11');
	});
});
