import { useState } from 'react';
import Header from './components/Header/header';
import AppContext from './context/AppContext';
import './App.css'
import RegLogin from './components/RegLogin/RegLogin';

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
  
  return (
    <div className='App'>
      <AppContext.Provider value = {{state,authWindowOpenHandler,userData,setUserData,isAuthHandler}} >
        <Header />
        {state.isAuthWindowOpen ? <RegLogin /> : null}
      </AppContext.Provider>
    </div>
  );
}

export default App;