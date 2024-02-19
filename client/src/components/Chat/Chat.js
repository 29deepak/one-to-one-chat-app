import React, { useEffect, useState, useRef } from 'react'
import './Chat.css'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { allUsersRoute, decodeUserToken, host } from '../../helper/helper';
import { Socket, io } from 'socket.io-client'
import Contacts from '../Contacts/Contacts';
import Welcome from '../Welcome/Welcome';
import ChatContainer from '../ChatContainer/ChatContainer';
const Chat = () => {
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // in future you try it-------------------------------

    // const [socket,setSocket] =useState("")
    // useEffect(()=>{
    //     const newSocket =io(host)
    //     setSocket(newSocket)
    //     return ()=>{
    //         newSocket.disconnect()
    //     }

    // },[socket])
    //-------------------after that this one --------------------------------------
    // useEffect(() => {


    //     socket.current.emit("add-user", currentUser.id);

    //     socket.current.on("online-users-list", (data) => {
    //         setOnlineUsers(data)
    //     })


    //     return () => {
    //         // Remove the event listener when the component unmounts


    //         socket.current.off("online-users-list");
    //     }

    // }, [currentUser])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        async function fetchData() {
            const user = await decodeUserToken()
            const allUser = await allUsersRoute(user.userId)
            return allUser

        }

        return (() => {
            fetchData().then((response) => {

                setCurrentUser(response.data.loginusers)
                setContacts(response.data.users)
                setIsLoaded(true)
            }).catch((err) => {
                toast.error(err)
            })

        })

    }, [])
    // emit --which data send to server side
    //on---server side data get to client side
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            socket.current = io(host);
            console.log(currentUser.id)
            socket.current.emit("add-user", currentUser.id);
            console.log("fghhgfdz", socket)
            // socket.on('user-list', (userList) => {
            //     console.log("uuuuuu", userList)
            // });
            socket.current.on("online-users-list", (data) => {
                setOnlineUsers(data)
            })

        }
        // return () => {
        //     // Remove the event listener when the component unmounts

        //     if (socket.current) {
        //         socket.current.disconnect()
        //         console.log("fvnmc,x")
        //         socket.current.off("online-users-list")
        //     }
        // };
    }, [currentUser])
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.isAvatarImageSet) {
                navigate('/setAvatar')
            }
        }
    }, [currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return (
        <>
            <div className='chat-container'>
                <div className='chat-container-content'>
                    <Contacts contacts={contacts} currentUser={currentUser} onlineUsers={onlineUsers} changeChat={handleChatChange} />
                    {isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />}


                </div>

            </div>
        </>
    )
}

export default Chat