export function getProduct (productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products = [
  {
    id: "db7ee1de-60fe-4952-a995-fd075a07609e",
    image: "images/dessert-pictures/cheesecake-bites.jpg",
    name: "Cheesecake Bites",
    priceCents: 2499,
    keyword: [
      "cheesecake",
      "bites",
      "cinnamon"
    ]
  },
  {
    id: "7fc12670-e461-4aa1-8e3a-c6b64164c6ad",
    image: "images/dessert-pictures/churro-cheesecake.jpg",
    name: "Churro Cheesecake",
    priceCents: 3099,
    keyword: [
      "cheesecake",
      "slices",
      "cinnamon",
      "cake",
      "churro"
    ]
  },
  {
    id: "6076bd36-90ff-4d5e-9d83-215e4b39497c",
    image: "images/dessert-pictures/cheesecake-strawberry.jpg",
    name: "Stawberry and Churro Cheesecake",
    priceCents: 3499,
    keyword: [
      "cheesecake",
      "slices",
      "cinnamon",
      "cake",
      "strawberry",
      "fruit"
    ]
  },
  {
    id: "ff0c6107-5180-44e7-b656-ed98d8340813",
    image: "images/dessert-pictures/creamcheese-strawberry.jpg",
    name: "Strawberry Cream Cake",
    priceCents: 2199,
    keyword: [
      "cheesecake",
      "slices",
      "filled",
      "cake",
      "strawberry",
      "fruit"
    ]
  },
  {
    id: "ddb70e71-700f-4870-b302-5b82c4681e83",
    image: "images/dessert-pictures/cupcake-2.jpg",
    name: "Sitch Cupcakes Two",
    priceCents: 2199,
    keyword: [
      "cupcakes",
      "cupcake",
      "cake",
      "filled"
    ]
  },
  {
    id: "8e7772e8-9ff5-4e35-b04d-28a452928690",
    image: "images/dessert-pictures/cupcake.jpg",
    name: "Stitch Cupcakes",
    priceCents: 2199,
    keyword: [
      "cupcakes",
      "cupcake",
      "cake",
      "filled"
    ]
  },
  {
    id: "3735e10c-b49e-41d6-97fc-88bb398ebac9",
    image: "images/dessert-pictures/filled-strawberry.jpg",
    name: "Dipped and Filled Strawberry",
    priceCents: 2399,
    keyword: [
      "strawberry",
      "filled",
      "dipped",
      "chocolate",
      "shortcake",
      "fruit"
    ]
  },
  {
    id: "e946d3c5-cdec-416f-86fc-7347dde5ea1c",
    image: "images/dessert-pictures/banana-pudding.jpg",
    name: "Banana Pudding",
    priceCents: 1899,
    keyword: [
      "banana",
      "pudding",
      "cups",
      "waffers",
      "fruit"
    ]
  },
  {
    id: "2af3b431-47bc-4d78-bb2d-d4f3940f8524",
    image: "images/dessert-pictures/pink-cake-pops.jpg",
    name: "Pink Cake Pops",
    priceCents: 1499,
    keyword: [
      "Cake",
      "pops",
      "cake pops"
    ]
  },
  {
    id: "27e2eb59-28eb-40bf-934a-252bf21f8de1",
    image: "images/dessert-pictures/white-chocolate-dipped-strawberries.jpg",
    name: "White Chocolate Dipped Strawberries",
    priceCents: 2499,
    keyword: [
      "chocolate",
      "white",
      "dipped",
      "strawberries",
      "strawberry",
      "fruit"
    ]
  },
  {
    id: "0a4332f5-5d44-4838-a1f6-0fa372017be8",
    image: "images/dessert-pictures/chocolate-strawberry-cake-singles.jpg",
    name: "Chocolate Strawberry Cake Singles",
    priceCents: 2299,
    keyword: [
      "chocolate",
      "cake",
      "strawberries",
      "strawberry",
      "fruit",
      "single",
      "serve"
    ]
  },
  {
    id: "d7860a77-bfd5-4072-b838-ab13bfffeac2",
    image: "images/dessert-pictures/white-cake-pops.jpg",
    name: "White Cake Pops",
    priceCents: 1499,
    keyword: [
      "Cake",
      "pops",
      "cake pops",
      "white",
      "chocolate"
    ]
  }
]

