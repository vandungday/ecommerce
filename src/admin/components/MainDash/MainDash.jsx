import { useEffect, useState } from "react";

import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import { API } from "../../../commom/const.api";
import { axiosPrivate } from "../../../apis/configHttp";
import { numberFormatText } from "../../../constant/common.constant";
import "./MainDash.css";

const MainDash = () => {
  const [total, setTotal] = useState("");
  const [yearSelect, setYearSelect] = useState(new Date().getFullYear());
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1);
  const [revenueByMonthOfYear, setRevenueByMonthOfYear] = useState([]); // [ { month: 1, year: 2021, totalPrice: 1000 }
  const [totalDate, setTotalDate] = useState([]);

  const handleMonthSelect = (e) => {
    e.preventDefault();
    const month = e.target.value;
    setMonthSelect(month);
  };

  const handleYearSelect = (e) => {
    e.preventDefault();
    const year = e.target.value;
    setYearSelect(year);
  };

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const currentMonth = new Date().getMonth() + 1;
  const curentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axiosPrivate.get(`${API}/dashboard/revenue`);
        const revenueByMonthOfYear = res.data?.data?.revenueByMonthOfYear || [];
        const revenue = res.data?.data?.revenue || 0;

        const totalDate = revenueByMonthOfYear.find(
          (item) => item.month === currentMonth && item.year === curentYear
        );

        setTotalDate(totalDate?.totalPrice || 0);
        setRevenueByMonthOfYear(revenueByMonthOfYear);
        setTotal(revenue);
      } catch {
        console.log(
          "[ERROR]: lấy dữ liệu không thành công [MainDash.jsx][fetchTotal]"
        );
      }
    };
    fetchTotal();
  }, []);

  const fecthTotalDate = () => {
    try {
      const total =
        revenueByMonthOfYear.find(
          (item) =>
            item.month === Number(monthSelect) &&
            item.year === Number(yearSelect)
        ) || {};

      setTotalDate(total?.totalPrice || 0);
    } catch {
      console.log(
        "[ERROR]: lấy dữ liệu không thành công [MainDash.jsx][fecthTotalDate]"
      );
    }
  };

  return (
    <div className="MainDash ml-12">
      <h1 className="font-bold text-3xl">Thống kê / Báo cáo</h1>
      <div className="flex">
        <div className="w-[300px] h-[160px] bg-red-200 rounded-xl hover:bg-blue-200 hover:tran  flex flex-col justify-center text-center mr-10">
          <div className=" mb-4 font-bold text-2xl">Tổng doanh thu</div>
          <div className="font-bold text-blue-600 text-2xl">
            {numberFormatText(total)} đ
          </div>
        </div>
        <div className="w-[300px] h-[160px] bg-blue-200 rounded-xl hover:bg-red-200 hover:tran  flex flex-col justify-center text-center mr-6">
          <div className=" mb-4 font-bold text-2xl">Tìm kiếm theo tháng</div>
          <div>
            <div className=" mb-4">
              <label className="font-bold text-right mr-5" htmlFor="in">
                Tháng
              </label>
              <select name="monthSelect" onChange={handleMonthSelect}>
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={index + 1}
                    selected={index + 1 === currentMonth}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-right mr-5" htmlFor="in">
                Năm
              </label>
              <select name="yearSelect" onChange={handleYearSelect}>
                {years.map((year, index) => (
                  <option
                    key={index}
                    value={year}
                    selected={year === curentYear}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              className="mt-2 bg-yellow-200 px-3 py-2 font-semibold rounded-xl hover:bg-blue-300"
              onClick={fecthTotalDate}
            >
              Tính
            </button>
          </div>
        </div>
        <div className="w-[300px] h-[160px] bg-red-200 rounded-xl hover:bg-blue-200 hover:tran  flex flex-col justify-center text-center mr-10">
          <div className=" mb-4 font-bold text-2xl">
            Doanh thu theo tháng/năm
          </div>
          <div className="font-bold text-blue-600 text-2xl">
            {numberFormatText(totalDate)} đ
          </div>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default MainDash;
