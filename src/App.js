import { useEffect, useState } from 'react';
import Header from './components/Header/header';
import AppContext from './context/AppContext';
import './App.css'
import RegLogin from './components/RegLogin/RegLogin';
import ChatWindow from './components/chatWindow/chatWindow';
import axios from 'axios';

function App() {
  const [state, setState] = useState({
    isAuth: false,
    isAuthWindowOpen: false,
  })

  const [userData, setUserData] = useState({
    email: '',
    login: '',
    password: ''
})

  let [allChats, setAllChats] = useState([])

  const isAuthHandler = () => {
    setState(prev => {
    return {
        ...prev,
        isAuth: !state.isAuth
      }
  })
  }

  const authWindowOpenHandler = () => {
    setState(prev => {
      return {
        ...prev,
        isAuthWindowOpen: !state.isAuthWindowOpen
      }
  })
  }

  const axiosRequestLoginHandler = async () => {
    await axios.get(`https://messenger2-fcb59-default-rtdb.firebaseio.com/userData.json`)
        .then(response => {
            let users = response.data
            let usersCellName = []
            let i = 0
            Object.keys(users).map(item => {
                usersCellName[i] = item
                ++i
            })
            
            for(let b = 0; b < usersCellName.length; b++){
                if(users[usersCellName[b]].email === userData.email){
                    setUserData({
                        ...userData,
                        login: users[usersCellName[b]].login
                    })
                }
            }
        })
  }

  const axiosRequestChatsHandler = async () => {
    await axios.get(`https://messenger2-fcb59-default-rtdb.firebaseio.com/chats.json`)
        .then(response => {
            let users = response.data
            let usersCellName = []
            let i = 0
            Object.keys(users).map(item => {
                usersCellName[i] = item
                ++i
            })
            let iterForAllChats = 0
            for(let b = 0; b < usersCellName.length; b++){
                if(users[usersCellName[b]].user1 === userData.login || users[usersCellName[b]].user2 === userData.login){
                  setAllChats(oldArr => [...oldArr, users[usersCellName[b]]])
                  // allChats[iterForAllChats] = users[usersCellName[b]]
                    // iterForAllChats++
                }
            }
            console.log(allChats)
        })
  }

  useEffect(() => {
    if(state.isAuth && userData.login){
      axiosRequestChatsHandler()
    }
  }, [state.isAuth, userData.login])

  return (
    <div className='App'>
      <AppContext.Provider value = {{state,authWindowOpenHandler,userData,setUserData,isAuthHandler,axiosRequestLoginHandler,axiosRequestChatsHandler, allChats}} >
        <Header />
        {state.isAuthWindowOpen ? <RegLogin /> : null}
        {state.isAuth ? <ChatWindow /> : <div className='_container'>Login to your account to start chatting</div>}
        {/* <ChatWindow /> */}
      </AppContext.Provider>
    </div>
  );
}

export default App;