import { useState } from 'react';
import Header from './components/Header/header';
import AppContext from './context/AppContext';
import './App.css'

function App() {
  const [state, setState] = useState({
    isAuth: false,
  })
  
  return (
    <div>
      <AppContext.Provider value = {{state}} >
        <Header />
      </AppContext.Provider>
    </div>
  );
}

export default App;