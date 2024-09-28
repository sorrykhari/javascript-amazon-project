import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });


    it('adds an existing product to the cart', () => {
        

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: '1'
              }]);
        });
        loadFromStorage();

        addToCart('id1', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('id1');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'id1',
            quantity: 2,
            deliveryOptionId: '1'
          }]));
    });

    it('adds a new product to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
 
        addToCart('id1', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('id1');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'id1',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: 'id1',
          quantity: 1,
          deliveryOptionId: '1'
        }]);
    });
  });
  
  it('remove existing product from cart', () => {
    // Loads cart from local storage
    loadFromStorage();
    // Removes cart, length of cart should be 0
    removeFromCart('id1');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  
  it('attempts to remove product from cart that doesn\'t exist', () => {
    loadFromStorage();
    removeFromCart('id2');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('id1');
  });
});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: 'id1',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
   });
  });
  
  it('changes delivery option', () => {
    loadFromStorage();
    updateDeliveryOption('id1','3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].productId).toEqual('id1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'id1',
      quantity: 1,
      deliveryOptionId: '3'
    }]));   
  });

  it('edge case: product id not in cart', () => {
    loadFromStorage();
    updateDeliveryOption('id2','3');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].productId).toEqual('id1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('edge case: delivery option doesn\'t exist', () => {
    loadFromStorage();
    updateDeliveryOption('id1','4');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].productId).toEqual('id1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});