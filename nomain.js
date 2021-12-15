let carts = document.querySelectorAll(".button-buy");

class product {
  constructor(item) {
    this.id = item.id;
    this.tag = item.tag;
    this.image = item.image;
    this.price = item.price;
    this.name = item.name;
    this.inCart = item.inCart;
  }
}

const products = [
  {
    id: 1,
    name: "Hoddie",
    tag: "hoddie",
    price: 70,
    inCart: 0,
    image: ".//img/hoddie.jpg",
  },
  {
    id: 2,
    name: "White Pants",
    tag: "pantalones2",
    price: 50,
    inCart: 0,
    image: ".//img/pantalones2.jpg",
  },

  {
    id: 3,
    name: "Black Shirt",
    tag: "shirt",
    price: 30,
    inCart: 0,
    image: ".//img/shirt.jpg",
  },
  {
    id: 4,
    name: "Women's Black Shirt",
    tag: "mujershirt",
    price: 30,
    inCart: 0,
    image: ".//img/mujershirt.jpg",
  },
];
