function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if(!this.cartItems){
        this.cartItems = [{
          productId: 'id1',
          quantity: 1,
          deliveryOptionId: '1'
        }, 
        {
          productId: 'id2',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart(productId, quantity) {
      // Check if product object exists in cart array already
      const matchedItem = this.findInCart(productId);
  
      // If exists add quantity selected
      if (matchedItem) {
        matchedItem.quantity += quantity;
      }
      // If not create product object
      else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
  
    findInCart(productId) {
      let matchedItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchedItem = cartItem;
        }
      });
      return matchedItem;
    },
  
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {  
        cartQuantity += cartItem.quantity     
      });
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity) {
    
      let matchedItem;
      // Find product in cart
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchedItem = cartItem;
          // Make quantity the new quantity input in inbox
          matchedItem.quantity = newQuantity;
        }
        this.saveToStorage();
      });
    },
  
    updateQuantity(productId, newQuantity) {
    
      let matchedItem;
      // Find product in cart
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchedItem = cartItem;
          // Make quantity the new quantity input in inbox
          matchedItem.quantity = newQuantity;
        }
    
        this.saveToStorage();
      });
    },
  
    updateQuantity(productId, newQuantity) {
    
      let matchedItem;
      // Find product in cart
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchedItem = cartItem;
          // Make quantity the new quantity input in inbox
          matchedItem.quantity = newQuantity;
        }
    
        this.saveToStorage();
      });
    },
  
    updateDeliveryOption(productId, deliveryOptionId) {
      const matchedItem = findInCart(productId);
      if (matchedItem && ['1', '2', '3'].includes(deliveryOptionId)) {
        matchedItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
 
cart.loadFromStorage();
 
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);