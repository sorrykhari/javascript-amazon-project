export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'id1',
    quantity: 3,
    deliveryOptionId: '1'
  },
  {
    productId: 'id2',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function findMatchingProduct(productId) {
  let matchedItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchedItem = cartItem;
    }
  });

  return matchedItem;
}

export function addToCart(productId, quantity) {
    // Check if product object exists in cart array already
    let matchedItem;
    matchedItem = findMatchingProduct();

    // If exists add quantity selected
    if (matchedItem) {
      matchedItem.quantity += quantity;
    }
    // If not create product object
    else {
      cart.push({
        productId,
        quantity,
        deliveryOpttionId: '1'
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

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {  
    cartQuantity += cartItem.quantity     
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  
  let matchedItem;
  // Find product in cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchedItem = cartItem;
      // Make quantity the new quantity input in inbox
      matchedItem.quantity = newQuantity;
    }

    saveToStorage();
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchedItem;
  matchedItem = findMatchingProduct(productId);

  matchedItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}