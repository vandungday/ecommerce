import axios from "axios";
import { useEffect } from "react";
import { API } from "../../../commom/const.api";
import { useState } from "react";
import IconArrowRight from "../../../icons/IconArrowRight";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../apis/configHttp";
import { numberFormatText } from "../../../constant/common.constant";
import { set } from "react-hook-form";
const Products = () => {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [selectedValueCategory, setSelectedValueCategory] = useState("1");
  const [selectedValueBranch, setSelectedValueBranch] = useState("1");
  const [dataId, setDataId] = useState([]);

  const handleFileChange = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get(`${API}/products?page=${skip}&limit=10`);
      setProducts(res.data.data.products);
    }
    fetchProducts();
  }, [skip]);

  const styleArrow = `flex gap-x-2 items-center justify-center font-semibold px-4 py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all rounded-lg`;

  const handleEdit = (id) => {
    setIdProduct(id);
    setShowModalEdit(true);
  };

  const [values, setValues] = useState({
    id: "",
    name: "",
    stock: "",
    price: "",
    brand: "",
    category: "",
    file: selectedFile,
  });
  const handleInput = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setDataId({ ...dataId, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", selectedValueCategory);
      formData.append("branchId", selectedValueBranch);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stockAmount", values.stock);
      const response = await axiosPrivate.patch(
        `${API}/products/${idProduct}`,
        formData
      );
      toast.success("Update product done");
      setShowModalEdit(false);
      window.location.reload();
    } catch (error) {
      toast.error("Fail");
    }
  };

  const handleDelete = (id) => {
    setIdProduct(id);
    setShowDeleteProduct(true);
  };

  const handleDeleteProduct = async () => {
    try {
      const data = axiosPrivate.delete(`${API}/products/${idProduct}`);
      setShowDeleteProduct(false);
      toast.success("Delete product done");
      window.location.reload();
    } catch {
      toast.error("Fail");
    }
  };

  const handleChangeCategory = (event) => {
    setSelectedValueCategory(event.target.value);
  };

  const handleChangeBranch = (event) => {
    setSelectedValueBranch(event.target.value);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", selectedValueCategory);
      formData.append("branchId", selectedValueBranch);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stockAmount", values.stock);
      formData.append("type", values.type);
      formData.append("files", selectedFile);
      const response = await axiosPrivate.post(`${API}/products`, formData, {
        headers: {
          Accept: "application/json",
          type: "formData",
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Add product done");
      setShowModalAdd(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Fail");
    }
  };

  useEffect(() => {
    const getCatagory = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategory(res.data.data.categories);
      } catch {
        toast.error("Fail");
      }
    };
    getCatagory();
  }, []);

  useEffect(() => {
    const getBranch = async () => {
      try {
        const res = await axios.get(`${API}/branches`);
        setBranches(res.data.data.branches);
      } catch {
        console.log("Err");
      }
    };
    getBranch();
  }, []);

  const handleShopify = async () => {
    try {
      await axiosPrivate.get(`${API}/shopify/sync`);
      toast.success("Chờ đồng bộ từ Shopify");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      toast.error("Đồng bộ từ Shopify thất bại");
    }
  };

  const handleShopBase = async () => {
    try {
      await axiosPrivate.get(`${API}/shopbase/sync`);
      toast.success("Chờ đồng bộ từ ShopBase");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      toast.error("Đồng bộ từ ShopBase thất bại");
    }
  };

  useEffect(() => {
    const feactDataOne = async () => {
      const res = await axiosPrivate.get(`${API}/products/${idProduct}`);
      setDataId(res.data.data);
      console.log(res.data.data);
    };
    feactDataOne();
  }, [idProduct]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Sản phẩm</h1>
      <button
        onClick={handleShopify}
        className=" float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Đồng bộ Shopify
      </button>
      <button
        onClick={handleShopBase}
        className=" float-right bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Đồng bộ ShopBase
      </button>
      <button
        onClick={() => setShowModalAdd(true)}
        className=" float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Thêm sản phẩm
      </button>
      {showModalAdd && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
              <div className="modal-header flex justify-between items-center pb-3">
                <p className="font-bold text-2xl">Thêm sản phẩm</p>
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
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Tên:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Tồn kho:
                  </label>
                  <input
                    type="text"
                    id="stock"
                    name="stock"
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Giá:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    Hãng:
                  </label>
                  <select
                    className="bg-gray-100 text-gray-700 text-sm w-full p-1"
                    value={selectedValueBranch}
                    onChange={handleChangeBranch}
                    name="category"
                    id="category"
                  >
                    {branches.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    Danh mục:
                  </label>

                  <select
                    className="bg-gray-100 text-gray-700 text-sm w-full p-1"
                    value={selectedValueCategory}
                    onChange={handleChangeCategory}
                    name="category"
                    id="category"
                  >
                    {category.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="text-left block text-gray-700 font-bold mb-2"
                    >
                      Ảnh :
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleFileChange}
                      className="border border-gray-400 p-2 w-full rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer flex justify-end pt-2">
                <button
                  onClick={handleAddProduct}
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
      <table className="table-auto h-auto w-full">
        <thead>
          <tr>
            <th className="bg-blue-300 border  px-4 py-2">Tên sản phẩm</th>
            <th className="bg-blue-300 border  px-4 py-2">Tồn kho</th>
            <th className="bg-blue-300 border  px-4 py-2">Giá</th>
            <th className="bg-blue-300 border  px-4 py-2">Hãng</th>
            <th className="bg-blue-300 border  px-4 py-2">Danh mục</th>
            <th className="bg-blue-300 border  px-4 py-2">Đồng bộ</th>
            <th className="bg-blue-300 border  ">Ảnh</th>
            <th className="bg-blue-300 border  px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="hover:bg-blue-200 hover:scale-[1.01] transition"
            >
              <td className="border text-left px-4 py-2">{product.name}</td>
              <td className="border text-left px-4 py-2">
                {product.stockAmount}
              </td>
              <td className="border text-left px-4 py-2">
                <span>{numberFormatText(product.price)} đ</span>
              </td>
              <td className="border text-left px-4 py-2">
                {product.branch.name}
              </td>
              <td className="border text-left px-4 py-2">
                {product.category.name}
              </td>
              <td className="border text-left px-4 py-2">
                {product.shopifyId && "Shopify"}
                {product.shopBaseId && "Shop Base"}
              </td>

              <td className="border text-left px-4 py-2">
                <img src={product.images[0].url} className="w-7 h-6" alt="a" />
              </td>
              <td className="border text-left px-4 py-2 flex">
                <div
                  className="mx-3 cursor-pointer "
                  // onClick={() => setShowModalEdit(true)}
                  onClick={() => handleEdit(product.id)}
                >
                  <ModeEditIcon className="hover:text-white"></ModeEditIcon>
                </div>
                <div
                  className="mx-3 cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  <DeleteIcon className="hover:text-white"></DeleteIcon>
                </div>
              </td>
            </tr>
          ))}
          {showModalEdit && (
            <div className="modal fixed z-10 inset-0 overflow-y-auto ">
              <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
              <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                  <div className="modal-header flex justify-between items-center pb-3">
                    <p className="font-bold text-2xl">Cập nhật sản phẩm</p>
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
                    {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                    <div className="mb-4">
                      <label className="text-left block text-gray-700 font-bold mb-2">
                        Tên sản phẩm:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={dataId.name}
                        onChange={handleInput}
                        className="border border-gray-400 p-2 w-full rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left block text-gray-700 font-bold mb-2">
                        Tồn kho:
                      </label>
                      <input
                        type="text"
                        id="stock"
                        name="stock"
                        value={dataId.stockAmount}
                        onChange={handleInput}
                        className="border border-gray-400 p-2 w-full rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left block text-gray-700 font-bold mb-2">
                        Giá:
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={numberFormatText(dataId.price)}
                        onChange={handleInput}
                        className="border border-gray-400 p-2 w-full rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className=" text-left block text-gray-700 font-bold mb-2">
                        Hãng:
                      </label>
                      <select
                        className="bg-gray-100 text-gray-700 text-sm w-full p-1"
                        value={selectedValueBranch}
                        onChange={handleChangeBranch}
                        name="category"
                        id="category"
                      >
                        {branches.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className=" text-left block text-gray-700 font-bold mb-2">
                        Danh mục:
                      </label>

                      <select
                        className="bg-gray-100 text-gray-700 text-sm w-full p-1"
                        value={selectedValueCategory}
                        onChange={handleChangeCategory}
                        name="category"
                        id="category"
                      >
                        {category.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer flex justify-end pt-2">
                    <button
                      onClick={handleUpdateProduct}
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
          {showDeleteProduct && (
            <div className="modal fixed z-10 inset-0 overflow-y-auto ">
              <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
              <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                  <div className="modal-header flex justify-between items-center pb-3">
                    <p className="font-bold text-2xl">Xóa sản phẩm</p>
                    <button
                      className="text-black close-modal"
                      onClick={() => setShowDeleteProduct(false)}
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

                  <div className="modal-body py-6">
                    Bạn có chắc chắn xóa sản phẩm không?
                  </div>

                  <div className="modal-footer flex justify-end pt-2">
                    <button
                      onClick={handleDeleteProduct}
                      className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                    >
                      Gửi
                    </button>
                    <button
                      className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100"
                      onClick={() => setShowDeleteProduct(false)}
                    >
                      Hủy{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>

      <div className="flex gap-x-5 mt-5">
        {skip < 1 ? (
          <span
            aria-disabled
            className={`cursor-not-allowed opacity-50 ${styleArrow}`}
          >
            Trước
          </span>
        ) : (
          <span
            className={`cursor-pointer ${styleArrow}`}
            onClick={() => {
              setSkip(skip - 1);

              document.documentElement.scrollTop = 0;
            }}
          >
            Trước
          </span>
        )}

        {skip >= 3 ? (
          <span
            aria-disabled
            className={`cursor-not-allowed opacity-50 ${styleArrow}`}
          >
            Sau <IconArrowRight></IconArrowRight>
          </span>
        ) : (
          <span
            className={`cursor-pointer ${styleArrow}`}
            onClick={() => {
              setSkip(skip + 1);

              document.documentElement.scrollTop = 0;
            }}
          >
            Sau <IconArrowRight></IconArrowRight>
          </span>
        )}
      </div>
    </div>
  );
};

export default Products;
