export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'id1',
    quantity: 3
  },
  {
    productId: 'id2',
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
    // Check if product object exists in cart array already
    let matchedItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchedItem = cartItem;
      }
    });

    // If exists add quantity selected
    if (matchedItem) {
      matchedItem.quantity += quantity;
    }
    // If not create product object
    else {
      cart.push({
        productId,
        quantity
      });
    }

    saveToStorage();
  }

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}