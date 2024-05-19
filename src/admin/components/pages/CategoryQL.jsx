import axios from "axios";
import { useEffect } from "react";
import { API } from "../../../commom/const.api";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../apis/configHttp";
const CategoryQL = () => {
  const [category, setCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [nameCategory, setNameCategory] = useState("");

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [values, setValues] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const getCatagory = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategory(res.data.data.categories);
      } catch {
        console.log("Err");
      }
    };
    getCatagory();
  }, []);

  const handleEditCategory = (index, name) => {
    setIdCategory(index);
    setNameCategory(name);
    setShowModalEdit(true);
    setValues({
      id: index,
      name: name,
    });
  };

  const handleInput = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      ["name"]: e.target.value,
    });
  };
  const handleUpdateCategory = async () => {
    try {
      await axiosPrivate.patch(`${API}/categories/${idCategory}`, {
        name: values.name,
      });

      toast.success("Câp nhật danh mục thành công");
      setShowModalEdit(false);
      window.location.reload();
    } catch (error) {
      toast.error("Thất bại");
    }
  };
  const handleDelete = (index) => {
    setIdCategory(index);
    setShowModalDelete(true);
  };

  const hanedleDeleteCategory = async () => {
    try {
      await axiosPrivate.delete(`${API}/categories/${idCategory}`);
      toast.success("Xóa danh mục thành công");
      setShowModalDelete(false);
      window.location.reload();
    } catch (error) {
      toast.error("Thất bại");
    }
  };

  const handleAddCategory = async () => {
    try {
      await axiosPrivate.post(`${API}/categories`, {
        name: values.name,
      });
      toast.success("Thêm danh mục thành công");
      setShowModalAdd(false);
      window.location.reload();
    } catch (error) {
      toast.error("Thất bại");
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl">Danh mục</h1>
      <button
        onClick={() => setShowModalAdd(true)}
        className="self-end w-[100px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Thêm
      </button>
      <table className="table-auto  h-auto  ">
        <thead>
          <tr>
            <th className="bg-blue-300 border font-bold text-xl  px-4 py-2">
              Tên danh mục
            </th>
            <th className="bg-blue-300 border font-bold text-xl  px-4 py-2">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-blue-200 hover:scale-[1.01] transition"
            >
              <td className="border px-4 py-2 font-bold">{item.name}</td>
              <td className="border text-left px-4 py-2 flex justify-center">
                <div
                  className="mx-3 cursor-pointer"
                  onClick={() => handleEditCategory(item.id, item.name)}
                >
                  <ModeEditIcon className="hover:text-white"></ModeEditIcon>
                </div>
                <div className="mx-3 cursor-pointer">
                  <DeleteIcon
                    className="hover:text-white"
                    onClick={() => handleDelete(item.id)}
                  ></DeleteIcon>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModalEdit && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
              <div className="modal-header flex justify-between items-center pb-3">
                <p className="font-bold text-2xl">Sửa danh mục</p>
                <button
                  className="text-black close-modal"
                  onClick={() => setShowModalEdit(false)}
                >
                  <svg
                    className="fill-current text-black hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Tên danh mục:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
              </div>

              <div className="modal-footer flex justify-end pt-2">
                <button
                  onClick={handleUpdateCategory}
                  className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                >
                  Gửi
                </button>
                <button
                  className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowModalEdit(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalDelete && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
              <div className="modal-header flex justify-between items-center pb-3">
                <p className="font-bold text-2xl">Xóa danh mục</p>
                <button
                  className="text-black close-modal"
                  onClick={() => setShowModalDelete(false)}
                >
                  <svg
                    className="fill-current text-black hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <h2 className="text-xl mb-4 ">Bạn chắc chắn xóa?</h2>
              </div>

              <div className="modal-footer flex justify-end pt-2">
                <button
                  onClick={hanedleDeleteCategory}
                  className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                >
                  Có
                </button>
                <button
                  className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowModalDelete(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalAdd && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
              <div className="modal-header flex justify-between items-center pb-3">
                <p className="font-bold text-2xl">Thêm danh mục</p>
                <button
                  className="text-black close-modal"
                  onClick={() => setShowModalAdd(false)}
                >
                  <svg
                    className="fill-current text-black hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Tên danh mục:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
              </div>

              <div className="modal-footer flex justify-end pt-2">
                <button
                  onClick={handleAddCategory}
                  className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                >
                  Gửi
                </button>
                <button
                  className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowModalAdd(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryQL;
