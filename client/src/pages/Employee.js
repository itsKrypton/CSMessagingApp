import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import Axios from "axios"
import { useState } from "react"

export const Employee = () => {
    const employee = useSelector((state) => state.employee.value.employeeDetails)
    const [conversation, setConversation] = useState({})
    const [userInput, setUserInput] = useState("")
    const [hideBar, setHideBar] = useState(false)

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
        await Axios.patch('http://localhost:3500/employees', {
            userID: ticketNumber,
            employeeID: employee.employeeID
        }).then(() => alert(`Ticket #${ticketNumber} has been assigned.`))
    }

    const showConversation = async (ticketNumber) => {
        await Axios.get('http://localhost:3500/users/conversation', {
            params: {
                userID: ticketNumber
            }
        }).then((res) => {
            setHideBar(true)
            setConversation(res.data)
        })
    }

    const sendNewMessage = async () => {
        await Axios.patch('http://localhost:3500/employees/conversation', {
            userID: conversation.userID, 
            employeeID: employee.employeeID,
            date: Date.now, 
            message: userInput
        }).then((res) => setConversation(res.data))
    }

    const closeConversation = async (ticketNumber) => { // Important, delete axios requests need the data keyword to send the request body payload.
        await Axios.delete('http://localhost:3500/employees/conversation', {
            data: {
                userID: ticketNumber,
                employeeID: employee.employeeID
            }
        }).then(() => alert(`Ticket #${ticketNumber} has been closed.`))
    }

    return (
        <div className="EmployeeContainer">
            <div className="Tickets">
                <div>
                    {(employee.assignedTickets?.length > 1) && <h3> Your Tickets </h3>}
                    {data?.map((ticket) => {
                        return (
                            <div>
                                {(employee.employeeID === ticket.employeeID) && <p style={{ color: ticket.isImportant ? "red" : "black" }} onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {(employee.employeeID === ticket.employeeID) && <button onClick={() => unAssignTicket(ticket.userID)}> Unassign </button>}
                                {(employee.employeeID === ticket.employeeID) && <button onClick={() => closeConversation(ticket.userID)}> Close </button>}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {data?.length && <h3> Open Tickets </h3>}
                    {data?.map((ticket) => {
                        return (
                            <div>
                                {!(employee.employeeID === ticket.employeeID) && <p style={{ color: ticket.isImportant ? "red" : "black" }} onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {!(employee.employeeID === ticket.employeeID) && <button disabled={ticket.employeeID !== null} onClick={() => assignTicket(ticket.userID)}> Assign </button>}
                                {!(employee.employeeID === ticket.employeeID) && <button onClick={() => closeConversation(ticket.userID)} disabled={ticket.employeeID !== null}> Close </button>}
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
                    {hideBar && <input placeholder="Type here" disabled={!(conversation?.employeeID === employee.employeeID)} id="userInputBox" onChange={(event) => setUserInput(event.target.value)}/>}
                    {hideBar && <button id="userSendButton" disabled={!(conversation?.employeeID === employee.employeeID)} onClick={sendNewMessage}> Send Message </button>}
                </div>
            </div>
        </div>
    );
}