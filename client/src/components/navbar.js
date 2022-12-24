import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../pages/storeUser"
import { logoutEmployee } from "../pages/storeEmployee"

export const Navbar = () => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.value.username)
    const employeeName = useSelector((state) => state.employee.value.employeeName)
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/" onClick={() => {
                    username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
                }} id="logo"> CS Messaging App </Link>
                <Link to="/" onClick={() => {
                    username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
                }}> Home </Link>
                <Link to="/" onClick={() => {
                    username ? dispatch(logoutUser()) : dispatch(logoutEmployee())
                }}> Logout </Link> 
            </div>
            <div className="user">
                <p> {username ? username : employeeName} </p>
            </div>
        </div>
    );
}
