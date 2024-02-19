import React, { useEffect, useRef, useState } from 'react'
import './ChatContainer.css'
import Logout from '../Logout/Logout'
import ChatInput from '../ChatInput/ChatInput'
import Message from '../Message/Message'
import { v4 as uuidv4 } from "uuid"
import { getMsgRoute, sendMsgRoute } from '../../helper/helper'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        if (currentChat && currentUser) {
            async function fetchInfo() {

                // if (currentChat && currentUser) {
                let senderInfo = {
                    from: currentUser.id,
                    to: currentChat.id
                }
                const messageRoutes = await getMsgRoute(senderInfo)
                return messageRoutes
                // }
            }
            return () => {
                fetchInfo().then((response) => {
                    setMessages(response.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }, [currentChat])
    const handleSendMsg = async (msg) => {

        if (currentChat && currentUser) {
            let senderData = {
                from: currentUser.id,
                to: currentChat.id,
                message: msg
            }
            await sendMsgRoute(senderData)
            socket.current.emit('send-msg', {
                to: currentChat.id,
                from: currentUser.id,
                message: msg
            })

            const msgs = [...messages]
            msgs.push({ fromSelf: true, message: msg })
            setMessages(msgs)
        }



    }
    useEffect(() => {
        console.log("dfvn", socket.current)
        // console.log(scrollRef)
        if (socket.current) {
            console.log("hii")
            socket.current.on("msg-received", (msg) => {
                // console.log("hii")
                console.log("ghbvjc", msg)
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }

    }, [socket.current])
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <>
            {
                currentChat && (
                    <div className='chat-message-container'>
                        <div className='chat-header'>
                            <div className='user-details'>
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                                </div>
                                <div className='username'>
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        {/* <Message /> */}
                        <div className='chat-messages'>

                            {
                                messages.map((message) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4()}>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className='content'>
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }



                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer