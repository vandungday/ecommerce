import { axiosPrivate } from '../configHttp'
import { toast } from 'react-toastify'

export const postLogin = async (email,password) => {
  try{
    const resData = axiosPrivate.post('/api/v1/auth/sign-in', {email,password})
    return (await resData).data
  }catch(error){
    toast.error("Email hoặc mật khẩu không chính xác")
  }
}


