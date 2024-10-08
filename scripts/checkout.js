import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// async makes function return promise
async function loadPage() {
  try {
    // throw 'This is the error.';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'This is also an error.';
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });
  } catch (error) {
    console.log(`Unexpected error. Please try again later. ${error}`);
  }

  

  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
});

/*new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
});

loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderCheckoutHeader();
    renderPaymentSummary();
  });
});*/

