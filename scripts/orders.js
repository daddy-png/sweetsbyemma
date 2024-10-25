import {orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {products, getProduct} from "../data/products.js";
import {addToCart, cart, calculateCartQuantity} from "../data/cart.js";

function loadPage() {
  let ordersHTML = ``;

  orders.forEach((order) => {
    const orderDateString = dayjs(order.orderTime).format('MMM D, YYYY')
    
    ordersHTML += `
      <div class="order-container">
        <div class="header-grid">
          <div class="header-left">
            <div class="order-date">
              <div class="bold-header">Order Date:</div>
              <div>${orderDateString}</div>
            </div>
            <div class="order-total">
              <div class="bold-header">Order Total:</div>
              <div>$${order.totalCostCents}</div>
            </div>
          </div>
          <div class="header-right">
            <div class="bold-header">Order #:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="product-info-grid">
        ${loadProducts(order)}
        </div>
      </div>
    `;
  });

  function loadProducts(order) {
    let productsHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      productsHTML += `
        <div class="product-image-cont">
        <img class="product-image" src="${product.image}">
        </div>
        <div class="middle-section">
          <div class="order-info product-name">${product.name}</div>
          <div class="order-info">Estimate Delivery Date: ${dayjs(productDetails.ETA).format('MMM D, YYYY')}</div>
          <div class="order-info">Quantity: ${productDetails.quantity}</div>
        </div>
        <div>
          <div><button class="button js-buy-again"
          data-product-id="${product.id}">Buy Again</button></div>
          <div>
            <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
              <button class="button">Track Package</button>
            </a>
          </div>
        </div>
      `;
    })

    return productsHTML;
  }

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersHTML;
  
  document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.productId);

        button.innerHTML = 'Added';
        setTimeout(() => {
          button.innerHTML = `
            Buy Again
          `
        }, 1000)
      });
    });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
  
    document.querySelector('.js-cart-text')
      .innerHTML = `(${cartQuantity}) Cart`;
  }
  updateCartQuantity();
}
loadPage();