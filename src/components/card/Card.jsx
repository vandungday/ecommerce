import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cartActions } from "../../store/slices/cartSlice";
import IconCart from "../../icons/IconCart";
import Button from "../button/Button";
import axios from "axios";
import { API } from "../../commom/const.api";
import storageService from "../../services/storage.service";
import { axiosPrivate } from "../../apis/configHttp";
import { numberFormatText } from "../../constant/common.constant";

const Card = ({ item }) => {
  const { id, name, category, images, price, rating } = item;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const remainder = Math.round(5 % rating);
  const rate = Math.floor(rating);
  const idUser = localStorage.getItem("tumi_id");
  const [idCart, setIdCart] = useState("");

  //   console.log(config);
  // useEffect(()=>{
  //     async function fetchData(){
  //         try{
  //             // const res = await axios.post(`${API}/carts/${idUser}`)token
  //             const res = await axios.get(`${API}/carts/${idUser}/cart-user`, config)
  //             setIdCart(res.data.data.id)
  //         }catch(err){
  //             console.log(err);
  //         }
  //     }
  //     fetchData()
  // },[])

  // storageService.set('idCart', idCart)
  const addToCart = async () => {
    try {
      const productToAdd = {
        id: item.id, // Assuming `id` is the unique identifier for the product
        amount: 1, // Setting the amount to 1
      };

      const res = await axiosPrivate.post(`${API}/orders/add-cart`, {
        products: [productToAdd],
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    dispatch(
      cartActions.addItem({
        id,
        productName: name,
        image: images[0].url,
        price,
      })
    );
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
  };
  return (
    <div className="shadow-lg shadow-indigo-500/50 overflow-hidden transition-all card w-full h-full rounded-lg hover:scale-105 ">
      <div className="relative w-full h-[300px] overflow-hidden p-2">
        <img
          src={images[0].url}
          alt="image"
          className="object-cover w-full h-full mb-4 rounded-lg transition-all cursor-pointer"
          onClick={() => navigate(`/product/${id}`)}
        />
      </div>
      <div className="flex flex-col p-5 justify-between gap-y-3 card-content">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text2">{category.name}</p>
        </div>
        <h3 className="font-semibold w-full h-[2rem] flex items-center">
          {name}
        </h3>
        <div className="flex justify-between items-center gap-x-5">
          <p className="font-semibold text-error text-lg">
            {numberFormatText(price)} đ
          </p>
          <div className="flex gap-x-2">
            <div
              className="rounded-md bg-orange-400 text-white p-2 cursor-pointer flex items-center justify-center"
              onClick={addToCart}
            >
              <IconCart></IconCart>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate(`/product/${id}`)}>Chi tiết</Button>
      </div>
    </div>
  );
};

export default Card;
