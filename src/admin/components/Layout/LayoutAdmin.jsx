import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'


const LayoutAdmin = () => {
  return (
    <>
        <Sidebar></Sidebar>
        <Outlet></Outlet>
    </>
  )
}

export default LayoutAdmin