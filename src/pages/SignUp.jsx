import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonLoading from "../components/button/ButtonLoading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/input/Input";
import InputPassword from "../components/input/InputPassword";
import axios from "axios";
import { API } from "../commom/const.api";

const schema = yup.object({
  username: yup
    .string()
    .max(20, "Tên tài khoản không được quá 20 ký tự")
    .required("Vui lòng nhập tên tài khoản"),
  email: yup
    .string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),
  password: yup
    .string()
    .min(6, "Mật khẩu của bạn phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập nhập khẩu"),
});


const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`${API}/auth/sign-up`, {
        username: values.username,
        email: values.email,
        password: values.password,
    });

      if (res.data.statusCode === 200) {
        toast.error(res.data.message);
      } else {
        toast.success("Tạo tài khoản thành công !");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  return (
    <div className="login-box w-full h-screen bg-primary bg-opacity-10">
      <div className="container w-full h-full px-5 sm:py-12 py-[70px] relative flex flex-col justify-center items-center">
        <NavLink to="/" className={"absolute top-5 left-5"}>
          <img src="/qora.png" alt="" className="w-[50px] h-[50px]" />
        </NavLink>
        <div className="login max-w-[500px] w-full h-auto mx-auto sm:p-10 p-5 flex flex-col items-center relative shadow-2xl rounded-lg">
          <h4 className="text-xl font-semibold mb-2 z-10 text-center">
            Chào mừng bạn đã tới với chúng tôi
          </h4>
          <p className="mb-2 text-sm font-medium z-10">
            Bạn đã có tài khoản?{" "}
            <NavLink to={"/login"} className="sm:text-primary text-error">
              Đăng nhập
            </NavLink>
          </p>

          <h3 className="text-2xl font-semibold mb-2 z-10">Đăng ký</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex flex-col gap-3 w-[90%] z-10"
          >
            <Input
              text={"Tên tài khoản*"}
              type="text"
              name="username"
              placeholder="vandungday"
              control={control}
              error={errors.username?.message}
            ></Input>
            <Input
              text="Email*"
              type="text"
              name="email"
              placeholder="example@gmail.com"
              control={control}
              error={errors.email?.message}
            ></Input>
            <InputPassword
            name="password"
              control={control}
              error={errors.password?.message}
            ></InputPassword>
            <ButtonLoading disable={isSubmitting} loading={isSubmitting}>
              Tạo tài khoản
            </ButtonLoading>
          </form>
          <div className="absolute -left-[250px] -bottom-[150px] w-[450px] h-[450px] -z-10">
            <svg
              id="10015.io"
              viewBox="0 0 480 480"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#474bff"
                d="M364,309Q320,378,225.5,403.5Q131,429,105.5,334.5Q80,240,106,147Q132,54,222.5,83.5Q313,113,360.5,176.5Q408,240,364,309Z"
              />
            </svg>
          </div>
          <div className="absolute -top-[150px] -right-[250px]  w-[450px] h-[450px] -z-10">
            <svg
              id="10015.io"
              viewBox="0 0 480 480"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#474bff"
                d="M396.5,307.5Q318,375,229.5,393Q141,411,113.5,325.5Q86,240,123,171Q160,102,254.5,76.5Q349,51,412,145.5Q475,240,396.5,307.5Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
