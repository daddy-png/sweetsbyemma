import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {getProduct} from './products.js';
import formatCurrency from '../scripts/utils/money.js';
import {calculateShippingDate, getShippingOption} from './shippingOptions.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function makeOrder(cart) {
  const order = {
    id: '',
    orderTime: '',
    totalCostCents: '',
    products: []
  };

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const shippingOption = getShippingOption(cartItem.shippingOptionId);
    shippingPriceCents += shippingOption.priceCents;

    order.products.push({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      ETA: calculateShippingDate(shippingOption)
    })
  });

  const totalBeforetax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforetax * 0.1;
  const totalCents = totalBeforetax + taxCents;


  order.id = crypto.randomUUID();
  order.orderTime = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
  order.totalCostCents = formatCurrency(totalCents);

  return order;
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
} 