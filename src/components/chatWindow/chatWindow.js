import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import ChatItem from './chatItem/chatItem'
import './chatWindow.scss'
import MessageItem from './messageItem/messageItem'
import { collection, addDoc, onSnapshot} from "firebase/firestore"; 
import { db } from '../../firebase'
import axios from 'axios'
import { query } from 'firebase/firestore'
import { orderBy } from 'firebase/firestore'
import { useEffect } from 'react'

const ChatWindow = () => {

    const { userData, allChats, axiosRequestChatsHandler } = useContext(AppContext)

    let [ searchFriend, setSearchFriend ] = useState('')
    let [ chosenFriend, setChosenFriend ] = useState('')
    let [ message, setMessage] = useState('')
    let [ allMessages, setAllMessages] = useState([])
    let [ numberOfChat, setNumberOfChat] = useState()
    
    const sendMessage = async (event) => {
        event.preventDefault()
        if(message){
            setMessage('')
            try {
                await addDoc(collection(db, `${allChats[numberOfChat].user1}-${allChats[numberOfChat].user2}`), {
                    messege: message,
                    login: userData.login,
                    date: {
                        hour: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        sec: new Date().getSeconds(),
                        day: new Date().getDate(),
                        month: new Date().getMonth(),
                        year: new Date().getFullYear(),
                    },
                    createdAt: Date.now()
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }else{
            alert('Сообщение не должно быть пустым')
        }
    }
    
    const readMessagesRealTime = (user1, user2) => {

        const q = query(collection(db, `${user1}-${user2}`), orderBy("createdAt"));

        onSnapshot(q, (querySnapshot) => {
            setAllMessages([])
            querySnapshot.forEach((doc) => {
                setAllMessages(oldArr => [...oldArr, doc.data()])
            });
        });
    }
    useEffect(() => {
        readMessagesRealTime()
    }, [chosenFriend])
    const createNewChat = async () => {
        let chatExist = false
        await axios.get(`https://messenger2-fcb59-default-rtdb.firebaseio.com/chats.json`)
            .then(response => {
                let users = response.data
                let usersCellName = []
                let i = 0

                if(response.data){
                    Object.keys(users).map(item => {
                        usersCellName[i] = item
                        ++i
                    })
    
                    for(let b = 0; ; b++){
                        if(b === usersCellName.length){
                            chatExist = true
                            break
                        }
                        if(users[usersCellName[b]].chatName === `${searchFriend}-${userData.login}` || users[usersCellName[b]].chatName === `${userData.login}-${searchFriend}`){
                            alert('Такой чат уже существует')
                            break
                        }
                    }
                }else{
                    chatExist = true
                }
            })
        if(chatExist){
            await axios.post(`https://messenger2-fcb59-default-rtdb.firebaseio.com/chats.json`, {
                chatName: `${userData.login}-${searchFriend}`,
                user1: userData.login,
                user2: searchFriend
            })
            console.log(`${userData.login}-${searchFriend}`,userData.login,searchFriend )
            axiosRequestChatsHandler()
        }
        setSearchFriend('')
    }

    const addNewFriend = async (event) => {
        event.preventDefault()

        await axios.get(`https://messenger2-fcb59-default-rtdb.firebaseio.com/userData.json`)
        .then(response => {
            let users = response.data
            let usersCellName = []
            let i = 0
            Object.keys(users).map(item => {
                usersCellName[i] = item
                ++i
            })
            
            for(let b = 0; ; b++){
                if( b === usersCellName.length){
                    console.log('Кто это,ты что,дурак блеа?')
                    break
                }
                if(users[usersCellName[b]].login === searchFriend && userData.login !== searchFriend){
                    createNewChat()
                    break
                }
            }
        })
    }

    return(
        <div className="chatWindow">
            <div className="chatWindow_container _container">
                <div className="chatWindow_body">
                    <div className="chatWindow_search-block search">
                        <form action="#" className="search-form" onSubmit={(event) => {
                                addNewFriend(event)

                            }}>
                            <input type="text" className="search-input" placeholder="Login of the person you want to chat with" value = {searchFriend} onChange = {event => {
                                setSearchFriend(event.target.value)
                            }}/>
                            <button className="search-button">Search</button>
                        </form>
                    </div>
                    <div className="chatWindow_bottom-block bottom">
                        <div className="bottom-friends">
                            {allChats.map((item, key) => {
                                return <ChatItem setNumberOfChat = {setNumberOfChat} number ={key} friendLogin = {item.user1 === userData.login ? item.user2 : item.user1} readMessagesRealTime={readMessagesRealTime} setChosenFriend={setChosenFriend} key={0} />
                            })}
                            
                        </div>
                        <div className="bottom-chat">
                            <div className="bottom-writeMes writeMes">
                                <div className="writeMes-top_block">
                                    {allMessages.map((item, key) => {
                                        return <MessageItem  key = {key} message={item.messege} position={item.login === userData.login ? 'right' : 'left'}/>
                                    })}
                                </div>
                                
                                {chosenFriend && <form className="writeMes-form" onSubmit={sendMessage}>
                                    <input type="text" className="writeMes_input" placeholder='Your message' value={message} onChange={event => setMessage(event.target.value)}/>
                                    <button type='submit' className="writeMes_button" >Send</button>
                                </form>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow