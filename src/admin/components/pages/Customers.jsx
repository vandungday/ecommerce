import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

import { API } from "../../../commom/const.api";
import { axiosPrivate } from "../../../apis/configHttp";

const Customers = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    async function fetchCustomer() {
      const res = await axiosPrivate.get(`${API}/users`);
      const users = res.data.data.users || [];

      const customers = users.filter((item) => item.role === 0);
      setCustomer(customers);
    }
    fetchCustomer();
  }, []);

  const handleInactiveUser = async (id) => {
    try {
      await axiosPrivate.put(`${API}/users/${id}/change-status`);
      toast.success("Khóa thành công");

      window.location.reload();
    } catch {
      toast.error("Thất bại");
    }
  };

  const handleActiveUser = async (id) => {
    try {
      await axiosPrivate.put(`${API}/users/${id}/change-status`);
      toast.success("Mở khóa thành công");

      window.location.reload();
    } catch {
      toast.error("Thất bại");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 mt-5">Khách hàng</h1>
      <table className="table-auto h-auto w-auto ml-10">
        <thead>
          <tr>
            <th className="bg-blue-300 border  px-4 py-2">Tên khách hàng</th>
            <th className="bg-blue-300 border  px-4 py-2">Email</th>
            <th className="bg-blue-300 border  px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-blue-200 hover:scale-[1.01] transition"
            >
              <td className="border text-left  px-4 py-2">{item.username}</td>
              <td className="border px-4 py-2">{item.email}</td>

              {item.isActive && (
                <td className="border text-left px-4 py-2 flex justify-center">
                  <div className="mx-3 cursor-pointer">
                    <LockIcon
                      className="hover:text-white"
                      onClick={() => handleInactiveUser(item.id)}
                    ></LockIcon>
                  </div>
                </td>
              )}

              {!item.isActive && (
                <td className="border text-left px-4 py-2 flex justify-center">
                  <div className="mx-3 cursor-pointer">
                    <LockOpenIcon
                      className="hover:text-white"
                      onClick={() => handleActiveUser(item.id)}
                    ></LockOpenIcon>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
