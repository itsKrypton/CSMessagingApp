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
        await Axios.get('http://localhost:3500/users', {
            params: {
                userID: userInput
            }
        }).then(res => dispatch(loginUser({ username: res.data[0].userID })))

        navigate('/users')
    }

    const signInAsEmp = async () => {
        console.log("Inside fun")
        await Axios.get('http://localhost:3500/employees', {
            params: {
                employeeID: employeeInput
            }
        }).then(res => dispatch(loginEmployee({ employeeDetails: res.data })))

        navigate('/employees')
    }

    return (
        <div className="HomeContainer"> 
            <div className="UserLogin"> 
                <h1> User </h1>
                <input type="number" placeholder="Enter your UserID" onChange={(event) => setUserInput(event.target.value)}/>
                <button onClick={signInAsUser}> Login as User </button>
            </div>
            <div className="EmployeeLogin"> 
                <h1> Employee </h1>
                <input placeholder="Enter your EmployeeID" onChange={(event) => setEmployeeInput(event.target.value)}/>
                <button onClick={signInAsEmp}> Login as Employee </button>
            </div>
        </div>
    );
}