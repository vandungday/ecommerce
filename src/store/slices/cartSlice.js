import { createSlice } from "@reduxjs/toolkit";


// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng nếu không có dữ liệu trong localStorage
const cartLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];


const quantityCart = () => {
  let number;
  if (cartLocalStorage.length === 0) {
    number = 0;
  } else {
    number = cartLocalStorage.reduce(
      (total, item) => total + Number(item.quantity),
      0
    );
  }
  return number;
};

const totalAmountStorage = () => {
  const total = cartLocalStorage.reduce(
    (total, item) => total + Number(item.totalPrice) * Number(item.quantity),
    0
  );
  return total;
};

const initialState = {
  cartItems: cartLocalStorage,
  totalAmount: totalAmountStorage(),
  totalQuantity: quantityCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, actions) => {
      const newItem = actions.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      // Lưu trạng thái giỏ hàng vào localStorage sau mỗi lần thay đổi
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    deleteItem: (state, actions) => {
      const id = actions.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      // Lưu trạng thái giỏ hàng vào localStorage sau mỗi lần thay đổi
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    deleteProductCheckout: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      // Lưu trạng thái giỏ hàng vào localStorage sau mỗi lần thay đổi
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
