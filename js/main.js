let carts = document.querySelectorAll(".button-buy");

let products = [
  {
    name: "Black Hoodie",
    tag: "blackhoodie",
    price: 20,
    inCart: 0,
  },

  {
    name: "White Pants",
    tag: "whitepants",
    price: 20,
    inCart: 0,
  },
  {
    name: "Black Shirt",
    tag: "blackshirt",
    price: 15,
    inCart: 0,
  },
  {
    name: "Women's Black Shirt",
    tag: "blackhoodie",
    price: 15,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector(".cart span")= productNumbers;
    }
}



function cartNumbers(product) {

  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems);
  

  if(cartItems != null){
    if(cartItems[product.tag] == undefined){
      cartItems = { 
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  console.log("Inside of SetItems Funtion");
  console.log("My product is", product);
  product.inCart = 1;
  cartItems = { 
    [product.tag]: product
  }
  
  localStorage.setItem("productsInCart", JSON.stringify (cartItems))
}

onLoadCartNumbers();