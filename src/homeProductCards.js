import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector('#productContainer');
const productTemplate = document.querySelector('#productTemplate');

export const showProductContainer = (products) => {
    if(!products){
        return false;
    }

    products.forEach((curProd) => {
        const {id, name, category, brand, price, stock, description, image} = curProd;

        const productClone = document.importNode(productTemplate.content, true);

        productClone.querySelector('#cardValue').setAttribute("id", `card${id}`);

        productClone.querySelector('.productName').textContent = name;
        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('.productImage').src = image;
        productClone.querySelector('.productImage').alt = name;
        productClone.querySelector('.productPrice').textContent = `₹${price}`;
        productClone.querySelector('.productActualPrice').textContent = `₹${price * 4}`;
        productClone.querySelector('.productStock').textContent = stock;
        productClone.querySelector('.productDesription').textContent = description;

        productClone.querySelector('.stockElement').addEventListener('click', (e) => {
            homeQuantityToggle(e, id, stock);
        });

        productClone.querySelector('.add-to-cart-button').addEventListener('click', (e) => {
            addToCart(e, id, stock);
        });

        productContainer.append(productClone);
    });
};