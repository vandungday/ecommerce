import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ButtonLoading from '../components/button/ButtonLoading'
import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/input/Input";
import axios from 'axios';
import { API } from '../commom/const.api';
const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter your email address"),
});

const ForgotPassword = () => {
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const onSubmit = async (values) => {
        console.log(values.email);
        try {
            const res = await axios.post(`${API}/auth/reset-password?email=${values.email}`)
            toast.success("Succes and check email!");
            navigate("/login")
        } catch (error) {
            toast.error("Something went wrong!");
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    };
    return (
        <div className='forgot-password w-full h-screen bg-primary bg-opacity-10'>
            <div className='container w-full h-full px-5 sm:py-12 py-[70px] relative flex flex-col justify-center items-center'>
                <NavLink to="/" className={"absolute top-5 left-5"}>
                    <img src="/qora.png" alt="" className="w-[50px] h-[50px]" />
                </NavLink>
                <div className="forgot-password max-w-[500px] w-full h-auto mx-auto sm:p-10 p-5 flex flex-col items-center relative shadow-2xl rounded-lg">
                    <h4 className="text-xl font-semibold mb-2 z-10 text-center">
                        Chào mừng trở lại!
                    </h4>
                    <p className="mb-2 text-sm font-medium z-10">
                        Bạn đã có tài khoản?{" "}
                        <NavLink to={"/login"} className="sm:text-primary text-error">
                            Đăng nhập
                        </NavLink>
                    </p>
                    <h3 className="text-2xl font-semibold mb-2 z-10">Quên mật khẩu</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                        className="flex flex-col gap-3 w-[90%] z-10"
                    >
                        <Input
                            text="Email*"
                            type="text"
                            name="email"
                            placeholder="example@gmail.com"
                            control={control}
                            error={errors.email?.message}
                        ></Input>

                        <ButtonLoading disable={isSubmitting} loading={isSubmitting}>
                            Xác nhận
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
    )
}

export default ForgotPassword