import {cart, removeFromCart, calculateCartQuantity, addOneQuantity, subtractOneQuantity, calculateProductQuantity, updateShippingOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {shippingOptions, calculateShippingDate} from '../../data/shippingOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary () {

	let cartSummaryHTML = '';

	cart.forEach((cartItem) => {
		const productId = cartItem.productId;

		const matchingProduct = getProduct(productId);


		cartSummaryHTML += `
		<div class="cart-item-container 
		js-cart-item-container-${matchingProduct.id}">
			<div class="product-image-container">
				<img class="product-image" src="${matchingProduct.image}">
			</div>
			<div class="cart-item-details-grid">
				<div class="product-name">${matchingProduct.name}</div>
				<div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
				<div class="product-quantity-grid">
					<div class="quantity-label js-quantity-label-${matchingProduct.id}">Quantity ${cartItem.quantity}</div>
					<button class="quantity-plus-button js-quantity-plus-button" data-product-id="${matchingProduct.id}">+</button>
					<button class="quantity-minus-button js-quantity-minus-button" data-product-id="${matchingProduct.id}">-</button>
					<span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
				</div>
				<div class="shipping-options-title">
						Shipping Options
				</div>
				<div class="shipping-prices-grid js-shipping-prices-grid">
					${shippingOptionsHTML(matchingProduct, cartItem)}
				</div>
			</div>
		</div>
		`;
	})

	function shippingOptionsHTML (matchingProduct, cartItem) {
		let html = '';

		shippingOptions.forEach((shippingOption) => {
			const dateString = calculateShippingDate(shippingOption);

			const priceString = shippingOption.priceCents === 0
			? 'Free'
			: `${formatCurrency(shippingOption.priceCents)}`;

			const isChecked = shippingOption.id === cartItem.shippingOptionId;

			html += `
				<div class="shipping-options-container js-shipping-option"
					data-product-id="${matchingProduct.id}"
					data-shipping-option-id="${shippingOption.id}">
					<input type="radio" 
					${isChecked ? 'checked' : ''}
					class="shipping-option-input" name="shipping-option-${matchingProduct.id}">
					<div class="shipping-option-date">${dateString}</div>
					<div class="shipping-option-price">${priceString}</div>
				</div>
			`
		});

		return html;
	}

	document.querySelector('.js-order-summary')
	.innerHTML = cartSummaryHTML;

	document.querySelectorAll('.js-delete-link')
		.forEach((link) => {
			link.addEventListener('click', () => {
				const productId = link.dataset.productId;
				removeFromCart(productId);

				renderOrderSummary();
				updateCartQuantity();
				renderPaymentSummary();
			})
		})

	function updateCartQuantity() {
		const cartQuantity = calculateCartQuantity();

		document.querySelector('.js-cart-text')
			.innerHTML = `(${cartQuantity}) Cart`;
	}
	updateCartQuantity();

	document.querySelectorAll('.js-quantity-plus-button')
		.forEach((link) => {
			link.addEventListener('click', () => {
				const productId = link.dataset.productId;

				addOneQuantity(productId);

				const newQuantity = calculateProductQuantity(productId);

				const quantityLabel = document.querySelector(
					`.js-quantity-label-${productId}`
				);
				quantityLabel.innerHTML = `Quantity ${newQuantity}`;

				updateCartQuantity();
			});
		});

	document.querySelectorAll('.js-quantity-minus-button')
		.forEach((link) => {
			link.addEventListener('click', () => {
				const productId = link.dataset.productId;

				subtractOneQuantity(productId);

				const newQuantity = calculateProductQuantity(productId);

				const quantityLabel = document.querySelector(
					`.js-quantity-label-${productId}`
				);
				quantityLabel.innerHTML = `Quantity ${newQuantity}`;

				updateCartQuantity();
			})
		})

		document.querySelectorAll('.js-shipping-option')
			.forEach((element) => {
				element.addEventListener('click', () => {
					const {productId, shippingOptionId} = element.dataset;
					updateShippingOption(productId, shippingOptionId);
					renderOrderSummary();
					renderPaymentSummary()
				});
			});
}