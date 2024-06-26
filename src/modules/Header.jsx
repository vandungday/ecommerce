import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useToggle from "../hooks/useToggle";
import axios from "axios";
import { API } from "../commom/const.api";
const menuLinks = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Cửa hàng",
    path: "/shop",
  },
  {
    title: "Giỏ hàng",
    path: "/cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { toggle, handleToggle } = useToggle();
  const [showMenu, setShowMenu] = useState(false);
  const [hasLogin, setHasLogin] = useState(false);
  const [customer, setCustomer] = useState([]);
  let user = localStorage.getItem("accessToken");
  let id = localStorage.getItem("tumi_id");
  let email = localStorage.getItem("tumi_email");
  let fullName = localStorage.getItem("tumi_name");
  // useEffect(() => {

  //     async function fetchData() {
  //         const result = await axios.get(`${API}/users/${id}`,{
  //             headers: {
  //                 Authorization: `Bearer ${user}`
  //             }
  //         });
  //         setCustomer(result.data);
  //     }
  //     fetchData();
  // }, []);

  useEffect(() => {
    if (user) {
      setHasLogin(true);
    } else {
      setHasLogin(false);
    }
  }, []);
  const handleNavigate = () => {
    window.scrollTo(0, 0);
  };
  const handleScrollHeader = () => {
    const header = document.querySelector(".header");
    const scrollTop = window.scrollY;
    scrollTop > 90
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const totalQuantity = useSelector((state) => state?.cart?.totalQuantity);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollHeader);
    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
    };
  });

  const navigateToCart = () => {
    navigate("/cart");
    window.scrollTo(0, 0);
  };
  const handleNavigateMobile = () => {
    window.scrollTo(0, 0);
    setShowMenu(false);
  };
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative ">
      <div className="fixed top-0 left-0 w-full z-10 isolate header bg-white">
        <div className="container mx-auto px-5 max-sm:px-3 py-3 md:grid md:grid-cols-3 flex items-center justify-between w-full h-[70px] max-sm:bg-white max-sm:shadow-lg">
          <NavLink to="/" className={"w-[50px] h-[50px]"}>
            <img src="/qora.png" alt="" className="" />
          </NavLink>
          <div className="max-md:hidden flex gap-x-2 items-center justify-center">
            {menuLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.title}
                className={`font-semibold text-[16px] text-dark py-3 px-5 lg:h-[85%] sm:h-[90%] flex items-center justify-center rounded-[30px] active-tablet`}
                onClick={handleNavigate}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center justify-end cursor-pointer gap-x-5">
            <div className="relative">
              <button onClick={navigateToCart}>
                <img
                  src="/cart.png"
                  alt=""
                  className="sm:w-[50px] sm:h-[50px] w-10 h-10"
                />
              </button>
              <span className="absolute -top-1 -right-1 w-[20px] h-[20px] bg-error text-white rounded-full text-sm flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>
            <div className="max-md:hidden">
              {user && hasLogin ? (
                <div className="relative" onClick={() => handleToggle()}>
                  <div className="flex items-center text-white">
                    <img
                      src="/user.png"
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <NavLink
                  to={"/login"}
                  className="rounded-md bg-primary bg-opacity-80 text-white py-3 px-6"
                >
                  Đăng nhập
                </NavLink>
              )}
            </div>
            {/* Menu under tabler */}
            <div className="md:hidden">
              <img
                src="/menu.png"
                alt="menu"
                className="sm:w-[40px] sm:h-[40px] w-9 h-9"
                onClick={() => setShowMenu(true)}
              />
              {showMenu && (
                <div className="z-50 isolute fixed right-0 top-0 sm:w-[40%] h-full bg-white shadow-lg py-[100px] px-10 dropdown">
                  <img
                    src="/cancel.png"
                    alt=""
                    className="w-10 h-10 absolute top-5 left-5"
                    onClick={() => setShowMenu(false)}
                  />
                  {user && (
                    <div className="flex gap-x-5 items-center justify-center mb-10">
                      <img
                        src="/user.png"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-text3">Xin chào!</p>
                        <p className="font-medium">{user.displayName}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-5 items-center">
                    {menuLinks.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        className={`font-medium text-[15px] text-dark py-3 px-5 lg:h-[85%] sm:h-[90%] flex items-center justify-center rounded-[30px] active-tablet`}
                        onClick={handleNavigateMobile}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                    {user ? (
                      <>
                        <NavLink
                          to={`/user/${id}`}
                          className="rounded-md bg-primary text-white flex items-center justify-center gap-x-2 py-3 px-4"
                        >
                          Trang cá nhân
                        </NavLink>
                        <NavLink
                          to={"/login"}
                          onClick={handleSignOut}
                          className="max-w-[200px] w-full h-10 rounded-md bg-primary text-white flex items-center justify-center"
                        >
                          Đăng xuất
                        </NavLink>
                      </>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="max-w-[200px] w-full h-10 rounded-md bg-primary text-white"
                      >
                        Đăng nhập
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="max-md:hidden z-50 isolute fixed top-[75px] right-5 bg-white text-black rounded-lg p-5 flex flex-col gap-5">
          <p className="flex gap-2">
            <span>Tên tài khoản:</span>{" "}
            <span className="font-medium">{fullName}</span>
          </p>
          <p className="flex gap-2">
            <span>Email:</span>
            <span className="font-medium">{email}</span>
          </p>
          <NavLink
            to={`/user/${id}`}
            className="rounded-md bg-primary text-white flex items-center justify-center gap-x-2 py-3 px-4"
          >
            Trang cá nhân
          </NavLink>
          <NavLink
            to={"/login"}
            onClick={handleSignOut}
            className="rounded-md bg-primary text-white flex items-center justify-center gap-x-2 py-3 px-4"
          >
            Đăng xuất
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
