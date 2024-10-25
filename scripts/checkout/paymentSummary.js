import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getShippingOption} from '../../data/shippingOptions.js';
import {formatCurrency} from '../utils/money.js';
import {renderOrderSummary} from './orderSummary.js';
import {addOrder, makeOrder} from '../../data/orders.js';

export function renderPaymentSummary () {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const shippingOption = getShippingOption(cartItem.shippingOptionId);
    shippingPriceCents += shippingOption.priceCents;
  });

  const totalBeforetax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforetax * 0.1;
  const totalCents = totalBeforetax + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>
    <div class="promo-code-container">
      <div class="promo-code-text">Promo code</div>
      <input class="promo-code-input" type="text" placeholder="Enter Promo Code here">
    </div>
    <div class="payment-summary-row">
      <div>Subtotal</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated Tax</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order Total</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>
    <div class="place-order-button-container">
      <button class="place-order-button js-place-order-button">Place Order</button>
    </div>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order-button')
    .addEventListener('click', () => {
      const order = makeOrder(cart);
      addOrder(order);
      window.location.href = 'orders.html';
    })
}