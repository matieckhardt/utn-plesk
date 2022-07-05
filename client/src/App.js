import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from './components/Nav/Nav.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/auth/Login';
import Register from './components/auth/register/Register';
import Dashboard from './components/Dashboard/index';
import { AppContext } from "./context/store";
import { globalReducer } from './redux/reducers/globalReducer';
import { useReducer } from 'react';


function AppPrincipal() {
  
  return (
    <div className="App">
      <div> <Nav/> </div>
      <div> <Home/> </div>
    </div>
  );
}

export default function App(){
  const [globalStore, setGlobalStore] = useReducer(globalReducer, {
    darkTheme: false,
    isLoggedIn: false,
  });

  const {isLoggedIn } = globalStore;

  const store = {

    isLoggedIn,
    dispatch: setGlobalStore
  };
    return(
      <AppContext.Provider value={store}>
      <BrowserRouter>
      
  <Routes>
    <Route path='/' element={<AppPrincipal/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path='/Register' element={<Register/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
  </AppContext.Provider>
    )
    }

