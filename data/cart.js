export const cart = [];

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
  }