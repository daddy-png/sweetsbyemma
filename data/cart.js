export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'ddb70e71-700f-4870-b302-5b82c4681e83',
    quantity: 2,
    shippingOptionId: '1'
  },  {
    productId: 'db7ee1de-60fe-4952-a995-fd075a07609e',
    quantity: 1,
    shippingOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
      
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      shippingOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart (productId) {
  const newCart = [];
    
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function  calculateCartQuantity() {
  let cartQuantity = 0;

	cart.forEach((cartItem) => {
		cartQuantity+=cartItem.quantity;
	});

  return cartQuantity;
}

export function addOneQuantity(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity += 1;

  saveToStorage();
}

export function subtractOneQuantity(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem.quantity -1 === 0) {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  } else {
    matchingItem.quantity -= 1
  }

  saveToStorage();
}

export function calculateProductQuantity (productId) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartQuantity = cartItem.quantity;
    }
  });

  return cartQuantity;
}

export function updateShippingOption (productId, shippingOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.shippingOptionId = shippingOptionId;

  saveToStorage();
}