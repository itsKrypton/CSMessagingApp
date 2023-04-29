import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../pages/storeUser"
import { logoutEmployee } from "../pages/storeEmployee"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { AccountCircle } from "@mui/icons-material"
import { MobileNav, IconButton } from "@material-tailwind/react";


export const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false)
        )
      }, [])

    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.value.username)
    const employeeName = useSelector((state) => state.employee.value.employeeDetails.employeeID)

    const navList = (
        <ul className="flex flex-col lg:flex-row lg:gap-6">
            <Link className="text-xl lg:text-2xl font-bold text-white py-2 px-4 lg:px-2 lg:py-0" to="/" onClick={() => {
                username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
            }}> Home </Link>
            <Link className="text-xl lg:text-2xl font-bold text-white py-2 px-4 lg:px-2 lg:py-0" to="/" onClick={() => {
                username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
            }}> Logout </Link> 
            {username ? <div className="flex gap-2 py-2 px-4 lg:px-2 lg:py-0"> 
                { username && <AccountCircle fontSize="large" sx={{ color: "white" }} /> }
                <p className="text-xl lg:text-2xl lg:pr-4 font-bold text-white cursor-default" > { username } </p>
            </div> : <div className="flex gap-2 py-2 px-4 lg:px-2 lg:py-0">
                { employeeName && <AccountCircle fontSize="large" sx={{ color: "white" }} /> }
                <p className="text-xl lg:text-2xl lg:pr-4 font-bold text-white cursor-default" > { employeeName } </p>
            </div>} 
        </ul>
    )

    return (
        <div className="bg-[#6a5acd] lg:flex-row p-4 shadow-md">
            <div className="flex items-center justify-between">
                <Link className="text-2xl lg:text-3xl px-4 font-bold text-white" to="/" onClick={() => {
                    username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
                }} id="logo"> CS Messaging App </Link>
                <div className="hidden lg:flex">
                    {navList}
                </div>
                <IconButton
                variant="text"
                className="text-2xl mr-3 font-bold text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                /* ripple={false} */
                onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <CloseIcon fontSize="large" />
                    ) : (
                        <MenuIcon fontSize="large" />
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                {navList}
            </MobileNav>
        </div>
    );
}
