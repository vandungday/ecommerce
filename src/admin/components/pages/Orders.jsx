import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../commom/const.api";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { axiosPrivate } from "../../../apis/configHttp";
import { toast } from "react-toastify";
import {
  ORDER_STATUS_MAP,
  PAYMENT_METHOD_MAP,
  numberFormatText,
} from "../../../constant/common.constant";
const Orders = () => {
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [idOrder, setIdOrder] = useState("");
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosPrivate.get(`${API}/orders/list`);
        setOrder(res.data.data.orders);
      } catch {
        console.log("err");
      }
    };
    fetchOrder();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      await axiosPrivate.put(`${API}/orders/${orderId}/change-status`, {
        status: "success",
      });

      toast.success("Xác nhận đơn thành công");
      window.location.reload();
    } catch {
      toast.error("Xác nhận đơn hàng thất bại");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axiosPrivate.put(`${API}/orders/${orderId}/change-status`, {
        status: "reject",
      });
      toast.success("Hủy đơn thành công");
      window.location.reload();
    } catch {
      toast.error("Hủy đơn hàng thất bại");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Đơn hàng</h1>
      <div>
        <table className="table-auto h-auto w-auto  ml-10 mt-10">
          <thead>
            <tr>
              <th className="bg-blue-300 border  px-4 py-2">Người mua </th>
              <th className="bg-blue-300 border  px-4 py-2">
                Địa chỉ nhận hàng
              </th>
              <th className="bg-blue-300 border  px-4 py-2">Người nhận</th>
              <th className="bg-blue-300 border  px-4 py-2">
                Trạng thái đơn hàng
              </th>
              <th className="bg-blue-300 border  px-4 py-2">Điện thoại</th>
              <th className="bg-blue-300 border  px-4 py-2">Thành tiền</th>
              <th className="bg-blue-300 border  px-4 py-2">Tổng số lượng</th>
              <th className="bg-blue-300 border  px-4 py-2">
                Phương thức thanh toán
              </th>
              <th className="bg-blue-300 border  px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-200 hover:scale-[1.01] transition"
              >
                <td align="center" className="border px-4 py-2 ">
                  {item.user.email}{" "}
                </td>
                <td align="center" className="border px-4 py-2 ">
                  {item.address}{" "}
                </td>
                <td align="center" className="border px-4 py-2 ">
                  {" "}
                  {item.receiver}
                </td>
                {/* //text-green-500 */}
                {item.status === "waiting_confirm" && (
                  <td
                    align="center"
                    className="border px-4 py-2 text-yellow-500"
                  >
                    {ORDER_STATUS_MAP[item.status]}{" "}
                  </td>
                )}
                {item.status === "success" && (
                  <td
                    align="center"
                    className="border px-4 py-2 text-green-500"
                  >
                    {" "}
                    {ORDER_STATUS_MAP[item.status]}{" "}
                  </td>
                )}

                {item.status === "reject" && (
                  <td align="center" className="border px-4 py-2 text-red-500">
                    {" "}
                    {ORDER_STATUS_MAP[item.status]}{" "}
                  </td>
                )}

                <td align="center" className="border px-4 py-2 ">
                  {" "}
                  {item.phone}{" "}
                </td>
                <td align="right" className="border px-4 py-2 ">
                  {" "}
                  {numberFormatText(item.totalPrice)} đ{" "}
                </td>
                <td align="center" className="border px-4 py-2 ">
                  {" "}
                  {numberFormatText(item.totalAmount)}{" "}
                </td>
                <td align="center" className="border px-4 py-2 ">
                  {" "}
                  {PAYMENT_METHOD_MAP[item.paymentType]}{" "}
                </td>
                <td
                  align="center"
                  className="border px-4 py-2  text-white rounded-sm flex"
                >
                  <button
                    className="mr-6 bg-primary px-4 py-2"
                    onClick={() => handleConfirm(item.id)}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="bg-red-500 px-4 py-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
