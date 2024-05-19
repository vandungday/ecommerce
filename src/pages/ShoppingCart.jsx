import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cartActions } from "../store/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import IconChevronLeft from "../icons/IconChevronLeft";
import { toast } from "react-toastify";
import IconLeft from "../icons/IconLeft";
import { numberFormatText } from "../constant/common.constant";

const ShoppingCart = () => {
  const navigate = useNavigate();
  let cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const navigateShop = () => {
    navigate("/shop");
    window.scrollTo(0, 0);
  };
  let user = localStorage.getItem("accessToken");
  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      toast.warn("You need to login before paying", {
        theme: "colored",
      });
    } else {
      navigate("/checkout");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="my-[80px]">
      <div className="container p-5">
        <div className="w-full h-[180px] bg-primary flex flex-col gap-5 items-center justify-center text-white rounded-lg">
          <p>Trang chủ / Giỏ hàng</p>
          <h3 className="md:text-[40px] text-[30px] font-semibold">Giỏ hàng</h3>
        </div>
        <div className="my-5">
          <div className="w-full py-5 flex justify-between items-center relative">
            <div
              onClick={navigateShop}
              className="sm:hidden absolute top-2/4 -translate-y-2/4 left-0 flex justify-center items-center gap-x-2 rounded-lg border font-medium w-10 h-10 bg-[#f8f8f8] hover:bg-primary hover:text-white transition-all"
            >
              <IconChevronLeft></IconChevronLeft>
            </div>
            <h3 className="md:text-[40px] sm:text-[30px] text-[22px] font-semibold max-sm:flex-1 text-center">
              Giỏ hàng
            </h3>
            <NavLink
              to={"/shop"}
              className="max-sm:hidden flex justify-between items-center gap-x-2 rounded-lg border font-medium py-3 px-5 hover:bg-primary hover:text-white transition-all"
            >
              <IconLeft></IconLeft>
              Tiếp tục mua hàng
            </NavLink>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <h2 className="flex items-center justify-center text-[20px] md:text-[30px] font-semibold">
            Chưa có sản phẩm được thêm
          </h2>
        ) : (
          <div className="w-full md:grid grid-cols-[2fr,1fr] flex flex-col gap-10">
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="w-full grid grid-cols-[2fr,2fr,1fr,1fr,1fr] py-5 border-0 border-b-[1px] text-center max-sm:hidden">
                    <th className="text-left">Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <CartItem item={item} key={index}></CartItem>
                  ))}
                </tbody>
              </table>
            </div>
            {totalAmount > 0 && (
              <div className="bg-text3 bg-opacity-5 rounded-lg p-5 pb-10 w-full h-fit">
                <div className="flex justify-between mb-5">
                  <p className="text-[22px] font-semibold ">Thành tiền</p>
                  <span className="text-error font-semibold text-lg">
                    {numberFormatText(totalAmount)} đ
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">
                    Thông tin phí vận chuyển
                  </h3>
                  <div className="flex flex-col gap-3 text-text3 text-sm">
                    <p className="flex gap-x-2 font-medium">
                      <span className=" font-medium text-primary">
                        Miễn phí vận chuyển
                      </span>
                    </p>
                  </div>
                </div>
                <p className="my-5 text-text3">
                  Thuế và vận chuyển sẽ được tính khi thanh toán
                </p>
                <div className="flex flex-col gap-5">
                  <button className="w-full py-4 bg-primary rounded-md text-white hover:bg-error transition-all">
                    <NavLink to={"/shop"}>Tiếp tục mua sắm</NavLink>
                  </button>
                  <button
                    className="w-full py-4 bg-primary rounded-md text-white hover:bg-error transition-all"
                    onClick={handleCheckout}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr
      className="w-full h-[140px] grid sm:grid-cols-[2fr,2fr,1fr,1fr,1fr] grid-cols-[1fr,2fr] max-sm:gap-x-4 text-center items-center py-[10px] border-0 border-b-[1px] relative"
      key={item.id}
    >
      <td className="flex item-center justify-start max-sm:row-[1/4]">
        <img
          src={item.image}
          alt=""
          className="sm:w-[100px] w-full h-[100px] object-cover rounded-md"
        />
      </td>
      <td className="text-lg font-semibold max-sm:text-left">
        {item.productName}
      </td>
      <td className="text-error font-semibold max-sm:text-left">
        {numberFormatText(item.price)} đ
      </td>
      <td className="max-sm:text-left"> x {numberFormatText(item.quantity)}</td>
      <td className="flex items-center justify-center max-sm:justify-start max-sm:absolute right-0 bottom-[20px]">
        <img
          src="/delete.png"
          alt=""
          className="w-5 h-5 cursor-pointer"
          onClick={deleteProduct}
        />
      </td>
    </tr>
  );
};
export default ShoppingCart;
