import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import Axios from "axios"
import { useState } from "react"

export const Employee = () => {
    const employee = useSelector((state) => state.employee.value.employeeDetails)
    const [conversation, setConversation] = useState({})
    const [userInput, setUserInput] = useState("")

    const { data, isLoading } = useQuery(["allTickets"], () => {
        return Axios.get('http://localhost:3500/employees/conversation').then(res => res.data)
    })

    if(isLoading) {
        return (
            <div> Loading... </div>
        )
    }

    const unAssignTicket = async (ticketNumber) => {
        Axios.patch('http://localhost:3500/employees/unattach', {
            userID: ticketNumber,
            employeeID: employee.employeeID
        }).then(() => alert(`Ticket #${ticketNumber} has been unassigned.`))
    }

    const assignTicket = async (ticketNumber) => {
        Axios.patch('http://localhost:3500/employees', {
            userID: ticketNumber,
            employeeID: employee.employeeID
        }).then(() => alert(`Ticket #${ticketNumber} has been assigned.`))
    }

    const showConversation = async (ticketNumber) => {
        await Axios.get('http://localhost:3500/users/conversation', {
            params: {
                userID: ticketNumber
            }
        }).then((res) => setConversation(res.data))
    }

    const sendNewMessage = async () => {
        await Axios.patch('http://localhost:3500/employees/conversation', {
            userID: conversation.userID, 
            employeeID: employee.employeeID,
            date: Date.now, 
            message: userInput
        }).then((res) => setConversation(res.data))
    }

    return (
        <div className="EmployeeContainer">
            <div className="Tickets">
                <div>
                    {data?.length && <h3> Your Tickets </h3>}
                    {data?.map((ticket) => {
                        return (
                            <div>
                                {/* !employee.assignedTickets.includes(ticket.userID) && <p> {ticket.userID} </p> */}
                                {(employee.employeeID === ticket.employeeID) && <p onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {(employee.employeeID === ticket.employeeID) && <button onClick={() => unAssignTicket(ticket.userID)}> Unassign </button>}
                                {(employee.employeeID === ticket.employeeID) && <button> Close </button>}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {data?.length && <h3> Open Tickets </h3>}
                    {data?.map((ticket) => {
                        return (
                            <div>
                                {/* !employee.assignedTickets.includes(ticket.userID) && <p> {ticket.userID} </p> */}
                                {!(employee.employeeID === ticket.employeeID) && <p onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {!(employee.employeeID === ticket.employeeID) && <button onClick={() => assignTicket(ticket.userID)}> Assign </button>}
                                {!(employee.employeeID === ticket.employeeID) && <button> Close </button>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="Conversation">
                <div className="EmployeeChatBox">
                    {conversation.messages?.map((data) => {
                        return (
                            <div> 
                                <p id="Sender"> {data.sender} </p>
                                <p id="Message"> {data.message} </p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <input placeholder="Type here" id="userInputBox" onChange={(event) => setUserInput(event.target.value)}/>
                    <button id="userSendButton" onClick={sendNewMessage}> Send Message </button>
                </div>
            </div>
        </div>
    );
}