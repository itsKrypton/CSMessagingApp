import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Axios from "axios"
import { loginUser } from "./storeUser"
import { useDispatch } from "react-redux"
import { loginEmployee } from "./storeEmployee"

export const Home = () => {
    const [userInput, setUserInput] = useState(0)
    const [employeeInput, setEmployeeInput] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInAsUser = async () => {
        await Axios.get(`http://localhost:3500/users/${userInput}`)
            .then(res => dispatch(loginUser({ username: res.data.userID })))

        navigate('/users')
    }

    const signInAsEmp = async () => {
        await Axios.get(`http://localhost:3500/employees/${employeeInput}`)
            .then(res => dispatch(loginEmployee({ employeeDetails: res.data })))

        navigate('/employees')
    }

    return (
        <div className="HomeContainer"> 
            <div className="UserLogin"> 
                <h1 style={{color: "slateblue"}}> User </h1>
                <input type="number" inputMode="numeric" id="HomeInputBox" placeholder="Enter your UserID" onChange={(event) => setUserInput(event.target.value)}/>
                <button id="HomeButton" onClick={signInAsUser}> Login as User </button>
            </div>
            <div className="EmployeeLogin"> 
                <h1 style={{color: "slateblue"}}> Employee </h1>
                <input placeholder="Enter your EmployeeID" id="HomeInputBox" onChange={(event) => setEmployeeInput(event.target.value)}/>
                <button id="HomeButton" onClick={signInAsEmp}> Login as Employee </button>
            </div>
        </div>
    );
}