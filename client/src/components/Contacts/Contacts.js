import React, { useState, useEffect } from 'react'
import { GrGroup } from "react-icons/gr";
import './Contacts.css'
const Contacts = ({ contacts, currentUser, changeChat, onlineUsers }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])
    const changedCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <div className='contact-container'>
                        <div className='brand'>
                            <GrGroup className='brand-logo' />
                            <h3>Communicate to each other</h3>
                        </div>
                        <div className='contacts'>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact  ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changedCurrentChat(index, contact)}>
                                            <div className='avatar'>
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                                            </div>
                                            <div className='username'>
                                                <h3>{contact.username}</h3>
                                            </div>
                                            {
                                                onlineUsers.some((online) => online.userId === contact.id) ? <span class="online"></span> : ""
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='current-user'>
                            <div className='avatar'>
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
                            </div>
                            <div className='username'>
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Contacts