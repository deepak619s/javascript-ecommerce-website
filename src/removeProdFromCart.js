import { getCartProductFromLS } from "./getCartProducts"
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
    let cartProducts = getCartProductFromLS();

    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    // Update the localStorage after removing the item
    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

    // Remove the div on click
    let removeDiv = document.getElementById(`card${id}`);

    if(removeDiv){
        removeDiv.remove();

        // Show toast when product added to the cart
        showToast("delete", id);
    }

    updateCartValue(cartProducts);
};