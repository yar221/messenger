import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import ChatItem from './chatItem/chatItem'
import './chatWindow.scss'
import MessageItem from './messageItem/messageItem'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase'
import axios from 'axios'

const ChatWindow = () => {

    const { userData, state, allChats } = useContext(AppContext)

    let [ searchFriend, setSearchFriend ] = useState('')
    let [ chosenFriend, setChosenFriend ] = useState('')
    

    const aa = async (event) => {
        event.preventDefault()
        
        try {
            const docRef = await addDoc(collection(db, `${userData.login}-${chosenFriend}`), {
                messege: '',
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
    }

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
        }
        
        setSearchFriend('')
    }

    const a = async (event) => {
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
                        <form action="#" className="search-form" onSubmit={a}>
                            <input type="text" className="search-input" placeholder="Login of the person you want to chat with" value = {searchFriend} onChange = {event => {
                                setSearchFriend(event.target.value)
                            }}/>
                            <button className="search-button">Search</button>
                        </form>
                    </div>
                    <div className="chatWindow_bottom-block bottom">
                        <div className="bottom-friends">
                            {allChats.map((item, key) => {
                                return <ChatItem key={key} friendLogin = {item.user1 === userData.login ? item.user2 : item.user1}/>
                            })}
                            
                        </div>
                        <div className="bottom-chat">
                            <div className="bottom-writeMes writeMes">
                                <form className="writeMes-form" >
                                    <input type="text" className="writeMes_input" placeholder='Your message'/>
                                    <button type='submit' className="writeMes_button" >Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow