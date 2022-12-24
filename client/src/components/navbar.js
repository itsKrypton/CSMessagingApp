import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../pages/store"

export const Navbar = () => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.value.username)
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/" onClick={() => dispatch(logoutUser())} id="logo"> CS Messaging App </Link>
                <Link to="/" onClick={() => dispatch(logoutUser())}> Home </Link>
                <Link to="/" onClick={() => dispatch(logoutUser())}> Logout </Link> 
            </div>
            <div className="user">
                <p> {username} </p>
            </div>
        </div>
    );
}
