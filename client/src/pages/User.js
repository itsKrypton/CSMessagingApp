import { useQuery } from "@tanstack/react-query"
import Axios from "axios"
import { useSelector } from "react-redux"
import { useState } from "react"

export const User = () => {
    const username = useSelector((state) => state.user.value.username)
    const [userInput, setUserInput] = useState("")

    var { data, isLoading } = useQuery(["userConversation"], () => {
        return Axios.get('http://localhost:3500/users/conversation', {
            params: {
                userID: username
            }
        }).then(res => res.data.messages)
    })

    const sendNewMessage = () => {
            Axios.post('http://localhost:3500/users/conversation', {
            userID: username, 
            date: Date.now, 
            message: userInput
        }).then((res) => alert("Message Sent!"))
    }

    if(isLoading) {
        return (
            <div> Loading... </div>
        )
    }

    return (
        <div className="UserContainer">
            <div className="YourConversation"> <h1> Your Conversation </h1> </div>
            <div className="UserChatBox">  
                {data?.map((conversation) => {
                    return (
                        <div className="Messages"> 
                            <p id="Sender"> {conversation?.sender} </p>
                            <p id="Message"> {conversation.message} </p>
                        </div>
                    )
                })}
            </div>
            <div className="SendBox">
                <input placeholder="Type here" id="userInputBox" onChange={(event) => setUserInput(event.target.value)}/>
                <button id="userSendButton" onClick={sendNewMessage}> Send Message </button>
            </div>
        </div>
    );
}