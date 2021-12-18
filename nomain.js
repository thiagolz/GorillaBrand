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

function deleteItem(id) {
  let repeated = cartItems.find((prodR) => prodR.id == id);
  if (repeated.productNumbers > 1) {
    repeated.productNumbers = repeated.productNumbers - 1;
    document.getElementsByClassName(
      `decrease${repeated.id}`
    ).innerHTML = `<p id="decrease${repeated.id}">Quantity: ${repeated.Quantity}</p>`;
    cartItems();
  } else {
    repeated.productNumbers = 0;
    $.getJSON(URLJSON, function (answer, status) {
      if (status === "success") {
        let stock = answer;
        let item = stock.find((prod) => prod.id == id);
        let deleteItem = document.getElementById(`decrease${item.id}`);
        deleteItem.parentElement.remove();
        cartItems = cartItems.filter((prodE) => prodE.id != item.id);
        updateCart();
        toastr["warning"](
          `You have succesfully removed ${item.name} from the cart`
        );
      }
    });
  }
}

if (cartItems < 1) {
  productNumbers = productNumbers - 1;
  displayCart();
} else {
  productNumbers = 0;
  onLoadCartNumbers();
  toastr["warning"](`You have succesfully removed ${item.name} from the cart`);
}
