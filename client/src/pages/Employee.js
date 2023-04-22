import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import Axios from "axios"
import { useState } from "react"

export const Employee = () => {
    const employee = useSelector((state) => state.employee.value.employeeDetails)
    const [conversation, setConversation] = useState({})
    const [userInput, setUserInput] = useState("")
    const [hideBar, setHideBar] = useState(false)

    const { data, isLoading, refetch } = useQuery(["allTickets"], async () => {
        return await Axios.get('http://localhost:3500/conversations').then(res => res.data)
    })

    if(isLoading) {
        return (
            <div> Loading... </div>
        )
    }

    const unAssignTicket = async (ticketNumber) => {
        await Axios.patch(`http://localhost:3500/employees/${employee}`, {
            userID: ticketNumber
        }).then(refetch)
    }

    const assignTicket = async (ticketNumber) => {
        await Axios.post(`http://localhost:3500/employees/${employee.employeeID}`, {
            userID: ticketNumber
        }).then(refetch)
    }

    const showConversation = async (ticketNumber) => {
        await Axios.get(`http://localhost:3500/conversations/${ticketNumber}`)
            .then((res) => setConversation(res.data))
            .then(setHideBar(true))
    }

    const sendNewMessage = async () => {
        await Axios.patch('http://localhost:3500/conversations', {
            userID: conversation.userID, 
            employeeID: employee.employeeID,
            date: Date.now, 
            message: userInput
        }).then((res) => setConversation(res.data))
        .then(setUserInput(""))
    }

    const closeConversation = async (ticketNumber) => { // Important, delete axios requests need the data keyword to send the request body payload.
        await Axios.delete('http://localhost:3500/conversations', {
            data: {
                userID: ticketNumber,
                employeeID: employee.employeeID
            }
        }).then(refetch)
    }

    return (
        <div className="EmployeeContainer">
            <div className="Tickets">
                <div className="YourTicketsContainer">
                    <h3 id="YourTickets"> Your Tickets </h3>
                    {data?.map((ticket) => {
                        return (
                            <div className="indYourTicketsContainer">
                                {(employee.employeeID === ticket.employeeID) && <p id="indYourTickets" style={{ color: ticket.isImportant ? "red" : "white" }} onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {(employee.employeeID === ticket.employeeID) && <button id="ticketButtonsUnassign" onClick={() => unAssignTicket(ticket.userID)}> Unassign </button>}
                                {(employee.employeeID === ticket.employeeID) && <button id="ticketButtonsUnassign" onClick={() => closeConversation(ticket.userID)}> Close </button>}
                            </div>
                        )
                    })}
                </div>
                <div className="OpenTicketsContainer">
                    {data?.length && <h3 id="OpenTickets"> Open Tickets </h3>}
                    {data?.map((ticket) => {
                        return (
                            <div className="indOpenTicketsContainer">
                                {!(employee.employeeID === ticket.employeeID) && <p id="indOpenTickets" style={{ color: ticket.isImportant ? "red" : "white" }} onClick={() => showConversation(ticket.userID)}> {ticket.userID} </p>}
                                {!(employee.employeeID === ticket.employeeID) && <button id="ticketButtonsAssign" disabled={ticket.employeeID !== null} onClick={() => assignTicket(ticket.userID)}> Assign </button>}
                                {!(employee.employeeID === ticket.employeeID) && <button id="ticketButtonsAssign" onClick={() => closeConversation(ticket.userID)} disabled={ticket.employeeID !== null}> Close </button>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="Conversation">
                {
                    hideBar && 
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
                }
                <div>
                    {hideBar && <input placeholder="Type here" disabled={!(conversation?.employeeID === employee.employeeID)} value={userInput} id="empInputBox" onChange={(event) => setUserInput(event.target.value)}/>}
                    {hideBar && <button id="empSendButton" disabled={!(conversation?.employeeID === employee.employeeID)} onClick={sendNewMessage}> Send Message </button>}
                </div>
            </div>
        </div>
    );
}