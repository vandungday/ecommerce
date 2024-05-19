import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/slices/cartSlice";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useSWR from "swr";
import { fetcher } from "../apiConfig";
import Heading from "../components/heading/Heading";
import SimilarProduct from "../components/product/SimilarProduct";
import IconCheck from "../icons/IconCheck";
import { toast } from "react-toastify";
import { API } from "../commom/const.api";
import axios from "axios";
import storageService from "../services/storage.service";
import { Rating } from "@mui/material";
import { axiosPrivate } from "../apis/configHttp";
import { numberFormatText } from "../constant/common.constant";
const icons = ["/instagram.png", "/twitter.png", "/slack.png", "/meta.png"];

const ProductDetailPage = () => {
  const [idCart, setIdCart] = useState("");
  storageService.set("idCart", idCart);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data } = useSWR(`${API}/products/${slug}`, fetcher);
  const quantity = useSelector((state) => state.cart.quantity);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  if (!data) return;

  const {
    id,
    name,
    description,
    price,
    rating,
    category,
    thumbnail,
    images,
    stockAmount,
    brand,
    branch,
  } = data.data;

  const categories = category;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addToCart = async () => {
    try {
      const productToAdd = {
        id: id,
        amount: 1,
      };

      const res = await axiosPrivate.post(`${API}/orders/add-cart`, {
        products: [productToAdd],
      });
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
    <div className="mt-[80px]">
      <div className="container">
        <div className="bg-primary w-full p-10 text-center text-white">
          {/* <h3 className="text-[30px] font-medium">{categories}</h3> */}
          <div className="flex gap-x-2 items-center justify-center mt-5">
            <p>Cửa hàng</p>
            <span>/</span>
            <p>{name}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-10 gap-[50px] justify-center w-full py-10 sm:px-[100px] px-5">
          <div className="flex overflow-hidden items-center justify-center">
            <Slider {...settings} className="slider-product-detail">
              {images.length &&
                images.map((item, index) => (
                  <div key={index} className="w-full h-full">
                    <img
                      src={item.url}
                      alt=""
                      className="w-[100%] h-[410px] overflow-hidden object-contain"
                    />
                  </div>
                ))}
            </Slider>
          </div>
          <div className="flex-1 flex flex-col gap-y-5 items-start">
            <h3 className="lg:text-[35px] md:text-[30px] sm:text-[28px] max-sm:text-[35px] font-semibold">
              {name}
            </h3>
            <p className="text-2xl font-medium ">{description || ""}</p>

            <p className="text-2xl font-medium text-error ">
              {numberFormatText(price)} đ
            </p>
            <div className="flex flex-col gap-y-[2px] text-primary text-sm font-medium">
              <p className="flex gap-x-1 items-center">
                <IconCheck></IconCheck>
                <span>Còn hàng</span>
              </p>
              <p className="flex gap-x-1 items-center">
                <IconCheck></IconCheck>
                <span>Miễn phí vận chuyển</span>
              </p>
            </div>
            {/* <p className="text-sm font-medium text-text1 text-start">{description}</p> */}
            <div className="flex max-md:flex-col gap-4">
              <button
                className="min-w-[200px] w-[250px] rounded-md py-4 bg-primary text-white font-medium"
                onClick={addToCart}
              >
                Thêm vào giỏ
              </button>
            </div>
            <p className="text-sm flex gap-x-3 text-dark">
              <span className="font-semibold">Số lượng trong kho :</span>
              <span>{numberFormatText(stockAmount)}</span>
            </p>
            <div className="flex gap-x-2 text-sm">
              <span className="font-semibold">Dòng sản phẩm:</span>
              <span>{category.name}</span>
            </div>
            <div className="flex gap-x-2 text-sm">
              <span className="font-semibold">Hãng:</span>
              <span>{branch.name}</span>
            </div>
            <div className="text-sm font-semibold flex gap-x-5 items-center">
              <span>Share:</span>
              <div className="flex gap-x-2">
                {icons.map((icon, index) => (
                  <span
                    className="w-8 h-8 rounded-full bg-dark flex items-center justify-center socials"
                    key={index}
                  >
                    <img src={icon} alt="" className="w-[50%] h-[50%]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="my-10 px-5">
                    <Heading>Sản phẩm liên quan</Heading>
                    <SimilarProduct categories={category} id={id}></SimilarProduct>
                </div> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
