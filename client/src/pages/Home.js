import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Axios from "axios"

export const Home = () => {
    const [userInput, setUserInput] = useState(0)
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()

    const signInAsUser = async () => {
        await Axios.get('http://localhost:3500/users', {
                params: {
                    userID: userInput
                }
            }).then(res => setUserData(res.data))

        navigate('/users')
    }

    const signInAsEmp = () => {
        navigate('/employees')
    }

    return (
        <div className="Header"> 
            <h1> CS Messaging App </h1>
            <div className="User"> 
                <h1> User </h1>
                <input type="number" onChange={(event) => setUserInput(event.target.value)}/>
                <button onClick={signInAsUser}> Login as User </button>
            </div>
            <div className="Employee"> 
                <h1> Employee </h1>
                <input />
                <button onClick={signInAsEmp}> Login as Employee </button>
            </div>
        </div>
    );
}