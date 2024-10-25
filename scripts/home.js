import {products} from '../data/products.js';
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {formatCurrency} from './utils/money.js'


  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
  
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="price-checkmark-grid">
            <div class="product-price">
            $${formatCurrency(product.priceCents)}
            </div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img class="checkmark"src="images/icons/checkmark.png">
              Added to Cart
            </div>
          </div>
  
          <button class="add-to-cart-button js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-text')
      .innerHTML = `(${cartQuantity}) Cart`;
  }
  updateCartQuantity();

  document.querySelectorAll(`.js-add-to-cart`)
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-visible')

        setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible')
        }, 2000)
      });
    });
