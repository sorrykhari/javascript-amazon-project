import { orders } from "../data/orders.js";
import { findMatchingProduct, products } from "../data/products.js";

//1. Save Data
//2. Generate HTML
//3. Make interactive

orders.forEach((order) => {
    let matchedProduct;
    
    order.products.forEach((product) => {
        matchedProduct = findMatchingProduct(product.productId);
        console.log(matchedProduct);
    });
});