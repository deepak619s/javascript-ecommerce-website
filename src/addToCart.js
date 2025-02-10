import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (e, id, stock) => {
    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity = parseInt(currentProdElem.querySelector('.productQuantity').innerText, 10);
    let price = parseFloat(currentProdElem.querySelector('.productPrice').innerText.replace('₹', ''));

    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    if (existingProd) {
        // Update quantity and price for existing product
        existingProd.quantity += quantity;
        existingProd.price = existingProd.quantity * price;

        arrLocalStorageProduct = arrLocalStorageProduct.map((curProd) => curProd.id === id ? existingProd : curProd);

        localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
        updateCartValue(arrLocalStorageProduct);

        // Show toast when product added to the cart
        showToast("add", id);

        return;
    }

    // Add new product to the cart
    const newProduct = { id, quantity, price: quantity * price };
    arrLocalStorageProduct.push(newProduct);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    // Update the cart button value
    updateCartValue(arrLocalStorageProduct);

    // Show toast when product added to the cart
    showToast("add", id);
};
