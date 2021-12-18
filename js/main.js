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
// const request = new XMLHttpRequest();
// const requestURL = "data/data.json";
// $(".button-buy").on("click", (e) => {

$(document).ready(function objetojson() {
  $.getJSON("data.json", function (response) {
    console.log(JSON.stringify(response));
    for (let i = 0; i < carts.length; i++) {
      carts[i].addEventListener("click", () => {
        cartNumbers(response[i]);
        totalCost(response[i]);
      });
    }
  });
});

// const products = [
//   {
//     id: 1,
//     name: "Hoddie",
//     tag: "hoddie",
//     price: 70,
//     inCart: 0,
//     image: ".//img/hoddie.jpg",
//   },
//   {
//     id: 2,
//     name: "White Pants",
//     tag: "pantalones2",
//     price: 50,
//     inCart: 0,
//     image: ".//img/pantalones2.jpg",
//   },

//   {
//     id: 3,
//     name: "Black Shirt",
//     tag: "shirt",
//     price: 30,
//     inCart: 0,
//     image: ".//img/shirt.jpg",
//   },
//   {
//     id: 4,
//     name: "Women's Black Shirt",
//     tag: "mujershirt",
//     price: 30,
//     inCart: 0,
//     image: ".//img/mujershirt.jpg",
//   },
// ];

// const request = new XMLHttpRequest();
// request.open("GET", "requestURL");
// request.responseType = "json";
// request.send();
// request.onload = function () {
//   const products = request.response;
//   showproducts(products);
// };
// function showproducts(jsonObj) {
//   const products = jsonObj;
// }

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action) {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
    console.log("action running");
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    let currentProduct = product.tag;

    if (cartItems[currentProduct] == undefined) {
      cartItems = {
        ...cartItems,
        [currentProduct]: product,
      };
    }
    cartItems[currentProduct].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cart = localStorage.getItem("totalCost");

  if (action) {
    cart = parseInt(cart);

    localStorage.setItem("totalCost", cart - product.price);
  } else if (cart != null) {
    cart = parseInt(cart);
    localStorage.setItem("totalCost", cart + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cart = localStorage.getItem("totalCost");
  cart = parseInt(cart);

  let productContainer = document.querySelector(".products");
  {
    console.log("running");
  }

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item, index) => {
      productContainer.innerHTML += `<div class="product">
      <ion-icon name="close-circle"></ion-icon></ion-icon><img src="../img/${
        item.tag
      }.jpg" />
              <span class="sm-hide">${item.tag}</span>
          </div>
          <div class="price sm-hide">$${item.price},00</div>
          <div class="quantity">
          <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                  <span>${item.inCart}</span>
                  <ion-icon class= "increase" name="arrow-dropright-circle"></ion-icon></ion-icon>   
          </div>
          <div class="total">$${item.inCart * item.price},00 </div>`;
    });

    productContainer.innerHTML += `
          <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">
              Basket Total
              </h4>
              <h4 class="basketTotal">
              $${cart},00
              </h4>
              <button id="finish-btn" class="btn-gradient col-3 small cart-btns rounded-pill border-white">Checkout</button>
          </div>`;

    deleteButtons();
    manageQuantity();
  }
}
function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let currentQuantity = 0;
  let currentProduct = "";
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      console.log(cartItems);
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });

    increaseButtons[i].addEventListener("click", () => {
      console.log(cartItems);
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);
      currentProduct = increaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}
function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".product ion-icon");
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productName;
  console.log(cartItems);

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.textContent
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();

      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );
      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}
// let productNumbers = localStorage.getItem("cartNumbers");
// let cartCost = localStorage.getItem("totalCost");
// let cartItems = localStorage.getItem("productsInCart");
// cartItems = JSON.parse(cartItems);
// let productName;
// console.log(cartItems);

// if (cartItems < 1) {
//   cartItems = cartItems - 1;
//   cartItems = 0;
//   delete cartItems;
//   onLoadCartNumbers();
//   toastr["warning"](`You have succesfully removed ${item.tag} from the cart`);
// }

// function deleteItem(id) {
//   let productNumbers = localStorage.getItem("cartNumbers");
//   let cartCost = localStorage.getItem("totalCost");
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);
//   let productName;
//   console.log(cartItems);
//   let repeated = cartItems.find((prodR) => prodR.id == id);

//   if (repeated.cartItems > 1) {
//     repeated.cartItems = repeated.cartItems - 1;
//     displayCart();
//   } else {
//     repeated.cartItems = 0;
//     $.getJSON(URLJSON, function (answer, status) {
//       if (status === "success") {
//         let stock = answer;
//         let item = stock.find((prod) => prod.id == id);
//         delete cartItems[productName];
//         localStorage.setItem("productsInCart", JSON.stringify(cartItems));

//         cartItems = cartItems.filter((prodE) => prodE.id != item.id);
//         displayCart();
//         toastr["warning"](
//           `You have succesfully removed ${item.name} from the cart`
//         );
//       }
//     });
//   }
// }

$(document).ready(function () {
  $(".button-buy").click(function () {
    Swal.fire("Good job!", "The product has been added!", "success");
  });
});
onLoadCartNumbers();

displayCart();

const openCart = document.getElementById("cart-button");
const closeCart = document.getElementById("cartClose");

const modalCart = document.getElementsByClassName("modal-cart")[0];
const modalContainer2 = $(".modal-container2")[0];

$("#finish-btn").click(() => {
  modalContainer2.classList.toggle("modal-active2");
});

$(".modal-cart2").click((e) => {
  e.stopPropagation();
});

$(".modal-container2").click(() => {
  $("#closeCart2").trigger("click");
});
function checkoutPay() {
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("needs-validation");

      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              event.stopPropagation();
              console.log("productsinCart");
              $("productsinCart").remove();
              cartNumbers = [];
              onLoadCartNumbers();
              modalContainer2.classList.toggle("modal-active2");
              toastr["success"](
                "Thanks for your payment! Our page grows when you buy here"
              );
              setTimeout(() => {
                location.reload();
              }, 2000);
              window.localStorage.clear();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
}

checkoutPay();
