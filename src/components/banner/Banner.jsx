import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconRight from "../../icons/IconRight";

const imgSlice = ["/dongho1.png", "/dongho2.png", "/dongho3.png"];

const Banner = () => {
  const [sliceShow, setSliceShow] = useState("");
  const handleSlice = (e) => {
    setSliceShow(e.target.src);
  };
  return (
    <div className="w-full h-[500px] lg:h-[700px] md:h-[500px] bg-blueDark bg-opacity-90 mb-10 z-0">
      <div className="container h-full relative md:grid md:grid-cols-2 max-md:flex items-center z-0 p-5 pt-[80px] banner ">
        <h3 className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 lg:text-[400px] md:text-[250px] sm:text-[200px] text-[100px] font-semibold text-blueDark text-opacity-30">
          TECH
        </h3>
        <div className="py-5 sm:pl-10 w-full h-full flex flex-col gap-y-[10px] items-start lg:justify-center justify-start text-white z-10">
          <h3 className="lg:text-[80px] md:text-[50px] text-[45px] font-semibold leading-[1.2] lg:mb-5">
            JUST
            <br />
            DO
            <br />
            IT
          </h3>
          <p className="w-[52%] leading-[1.5] lg:mb-10 md:text-sm max-md:hidden">
            Bạn sẽ ngạc nhiên khi tìm thấy thiết kế di động tốt nhất
          </p>
          <NavLink
            to={"/shop"}
            className="flex gap-x-2 items-center lg:p-4 lg:pl-8 md:p-3 md:pl-5 bg-error bg-opacity-90 rounded-[30px] font-medium md:relative max-md:hidden btn"
          >
            <span className="z-10">Bắt đầu mua sắm</span>
            <div className="absolute top-2/4 -translate-y-2/4 right-2 lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] bg-blueDark bg-opacity-90 rounded-full circle"></div>
            <div className="z-10 pl-3 ">
              <IconRight></IconRight>
            </div>
          </NavLink>
        </div>
        <div className="py-5 sm:pr-10 w-full h-full flex flex-col lg:gap-y-[60px] md:gap-y-[40px] gap-y-[15px] items-end justify-center max-md:justify-end text-white z-10">
          {imgSlice.map((item, index) => (
            <img
              src={item}
              key={index}
              alt=""
              className="lg:w-[130px] lg:h-[130px] md:w-[80px] md:h-[80px] sm:w-[70px] sm:h-[70px] w-[65px] h-[65px] cursor-pointer hover:scale-110 transition-all"
              onClick={handleSlice}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center w-full banner-product">
          <img
            src={sliceShow === "" ? "/garmin.webp" : sliceShow}
            alt=""
            className="lg:w-[32%] md:w-[35%] sm:w-[40%] w-[60%] z-10 transition-all banner-product-img"
          />
        </div>
        <div className="circle-effect"></div>
      </div>
    </div>
  );
};

export default Banner;
