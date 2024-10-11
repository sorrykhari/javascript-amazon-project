import formatCurrency from "../scripts/utils/money.js";

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export class Order {
  id;
  orderTime;
  totalCostCents;
  products;

  constructor(order) {
    this.id = order.id;
    this.orderTime = order.orderTime;
    this.totalCostCents = order.totalCostCents;
    this.products = order.products;
  }

  getPrice() {
    return `$${formatCurrency(this.totalCostCents)}`;
  }

}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}


function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

orders = orders.map((order) => {
  return new Order(order);
});   