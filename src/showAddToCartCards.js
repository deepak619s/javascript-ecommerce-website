import products from "../api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// To update the addToCart page
const cartElement = document.querySelector('#productCartContainer');
const templateContainer = document.querySelector('#productCartTemplate');


const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        let productClone = document.importNode(templateContainer.content, true);
        let lSActualData = fetchQuantityFromCartLS(id, price);

        const quantityElement = productClone.querySelector('.productQuantity');
        const priceElement = productClone.querySelector('.productPrice');

        productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('.productName').textContent = name;
        productClone.querySelector('.productImage').src = image;

        quantityElement.textContent = lSActualData.quantity;
        priceElement.textContent = lSActualData.price;

        // Handle increment and decrement button
        productClone.querySelector('.stockElement').addEventListener('click', (e) => incrementDecrement(e, id, stock, price));

        productClone.querySelector('.remove-to-cart-button').addEventListener('click', () => {
            removeProdFromCart(id);
        });

        cartElement.append(productClone);
    });
};

// Showing the cartProducts
showCartProduct();


// Calculating teh acrd rotal in our cartProducts page
updateCartProductTotal();