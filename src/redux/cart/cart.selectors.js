import { createSelector } from "reselect";

// AN INPUT SELECTOR = it is a function that takes the whole state and only returns a slice of it

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

//above is a memois selector

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);


//it helps so that when you sign out, your cart does not re render but it stays the same 