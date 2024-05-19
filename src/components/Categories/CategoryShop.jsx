import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../apiConfig";
import IconMinus from "../../icons/IconMinus";
import IconPlus from "../../icons/IconPlus";
import { API } from "../../commom/const.api";
import axios from "axios";
const CategoryShop = ({ onClick = () => { } }) => {
  const [category, setCategory] = useState([])
  // const { data } = useSWR(`${API}/categories`, fetcher);

  useEffect(()=>{
    const fetchData = async () => {
      const data = await axios.get(`${API}/categories`)
      setCategory(data.data.data.categories);
    }
    fetchData()
  },[])

  const [showCategories, setShowCategories] = useState(false);

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  // if (!data) return;

  return (
    <div className="relative w-[200px]">
      <h3
        className=" w-full flex items-center justify-between border rounded-md px-5 py-2 text-sm font-semibold text-dark cursor-pointer"
        onClick={handleShowCategories}
      >
        <span className="select-none">Dòng sản phẩm</span>
        <span>
          {showCategories ? <IconMinus className={"w-4 h-4"}></IconMinus> : <IconPlus className={"w-4 h-4"}></IconPlus>}
        </span>
      </h3>
      {showCategories && (
        <div className="absolute left-0 border w-full h-auto overflow-y-scroll mt-1 rounded-md bg-white z-10 py-3 categories-item">
          {category.length > 0 &&
            category.map((category, index) => (
              <p
                className="flex gap-x-2 text-sm items-center py-2 px-5 text-dark font-medium cursor-pointer hover:text-primary"
                key={index}
              >
                <span onClick={onClick}>{category.name}</span>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryShop;
