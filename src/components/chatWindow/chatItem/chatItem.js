import './chatItem.scss'
import krest from "../../../img/krest.png"
import { useContext } from 'react'
import AppContext from '../../../context/AppContext'

const ChatItem = (props) => {
    
    const {friendLogin,setChosenFriend,readMessagesRealTime, number, setNumberOfChat} = props
    
    const {axiosRequestDeleteChat, allChats} = useContext(AppContext)
console.log(number)
    return (
        <div className="chatItem" onClick={() => {
            setChosenFriend(friendLogin)
            readMessagesRealTime(allChats[number].user1, allChats[number].user2)
            setNumberOfChat(number)
            
        }}>
            <div className="chatItem_body">
                <span className="chatItem-friendLogin">{friendLogin}</span>
                <img src={krest} alt="delete" className='chatItem-delete' onClick={event =>{
                        axiosRequestDeleteChat(event, friendLogin)
                    }}/>
            </div>
        </div>
    )
}

export default ChatItem