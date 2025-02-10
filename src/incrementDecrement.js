import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (e, id, stock, price) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    const productQuantity = currentCardElement.querySelector('.productQuantity');
    const productPrice = currentCardElement.querySelector('.productPrice');

    // Getting data from localStorage
    let arrLocalStorageProduct = getCartProductFromLS();
    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    let quantity = existingProd ? existingProd.quantity : 1;
    let localStoragePrice = existingProd ? existingProd.price : price;

    // Increment or Decrement logic
    if (e.target.classList.contains("cartIncrement")) {
        if (quantity < stock) {
            quantity += 1;
        }
    }

    if (e.target.classList.contains("cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        }
    }

    // Update localStorage price
    localStoragePrice = price * quantity;

    // Update the localStorage array
    let updatedCart = arrLocalStorageProduct.map((curProd) => {
        return curProd.id === id
            ? { ...curProd, quantity, price: localStoragePrice }
            : curProd;
    });

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

    // Reflect changes in the DOM
    productQuantity.textContent = quantity;
    productPrice.textContent = localStoragePrice.toFixed(2);

    // Calculating teh acrd rotal in our cartProducts page
    updateCartProductTotal();
};

