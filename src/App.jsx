import { Routes, Route } from "react-router-dom";

import css from './App.module.css'
import EventList from './components/eventList/eventList'
import UserList from './components/userList/userList';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import RegistrationPage from "./components/modal/registrationPage";

function App() {
  return (<div className={css.container}>
  <Header></Header>
  <div className={css.app}>
        <Routes>
            <Route path='/' element={<EventList></EventList>} ></Route>
            <Route path='/:id' element={<UserList></UserList>}></Route>
            <Route path='/signup' element={<RegistrationPage></RegistrationPage>}></Route>
        </Routes>
    </div>
    <Footer></Footer>
  </div>
  )
}

export default App
