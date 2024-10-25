import {getOrder} from "../data/orders.js";
import {getProduct, products} from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function loadPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails = '';
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const trackingHTML = `
    <a class="back-to-orders-link" href="orders.html">
      Back to Orders
    </a>
    <div class="delivery-date">
      Arriving on ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-name">
      ${product.name}
    </div>
    <div class="product-quantity">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    
    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-tracking-page').innerHTML = trackingHTML;
}
loadPage();