// products variable is comming from /data/products.js file because we included it in the script element in our amazon.html file

// get from another file:
import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

// load products first
loadProducts(renderProductsGrid);
// remember: http requests are asynchronous (loadProduct will send request to backend but it takes time for the request to return response)
// it will send the request and to the rest of tke code below, response has not loaded yet, so porducts are not loaded yet
// products is still empty
// to solve this problem, we need to wait for the http request to finish first and for the response to come back
// and then we can run the rest of the code

// to render code on our page, we will put the code bellow inside renderProductsGrid function and pass this function inside loadProduct as a parameter

// function that we provide to loadProducts is called callback (we are giving the function to run in the future/call in the future)

function renderProductsGrid() {
  // to combine all this html together
  let productsHtml = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  console.log("products :>> ", products);

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHtml += `
    <div class="product-container">
        <div class="product-image-container">
            <img
            class="product-image"
            src=${product.image}
            />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img
            class="product-rating-stars"
            src="${product.getStartsUrl()}" // we are defining this using the method we defined inside Product class instead of directly inside html
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${
          product.name
        }" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHtml;

  // this function will not be moved to cart.js because it is updating the page where the cart is displyed and not the actual cart
  const updateCartQuantity = () => {
    // update total cart quantity
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    // add cart quantity to page (in shopping cart)
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  };

  const displayMessageAdded = () => {
    // to prevent message being shown and disapearing quickly after one more press of add to cart button
    clearTimeout(timeoutId);

    // show message added
    const messageAdded = document.querySelector(`.js-added-to-cart`);
    messageAdded.classList.add(`added-to-cart-visible`);

    timeoutId = setTimeout(() => {
      messageAdded.classList.remove("added-to-cart-visible");
    }, 2000);
  };

  let timeoutId;
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      // add product to a cart
      // we can just push product object with data we want to load
      // however, when we clik this button how will we know whict product to add?
      // to solve this product we are gonna learn a feature of html called Data Attribute

      // Data Attribute is jus another html attribute
      // the purpose of data attribute is to attach any information to an element
      // exampele of data-attribute is in add to cart button above
      // we add data attribute after the class attribute

      // Data attributes have to start the name with data-, and then after dash, we can add any name we want (like in the example above -> data-procuct-name)w

      // .dataset -> gives us all data attributes that are attaced to this button
      // const productName = button.dataset.productName;
      // const productId = button.dataset.productId;

      // destructuring productName and productId
      // .dataset -> gives us all data attributes that are attaced to this button
      const { productId, productName } = button.dataset;

      const selectElement = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const selectedValue = selectElement.value;

      // to clean our code
      addToCart(productId, productName, selectedValue);
      updateCartQuantity();
      displayMessageAdded();
    });
  });

  updateCartQuantity();
}

document.querySelector(".js-search-button").addEventListener("click", () => {
  const search = document.querySelector(".js-search-bar").value;
  window.location.href = `amazon.html?search=${search}`;
});
