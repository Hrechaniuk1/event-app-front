import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import EventList from './components/eventList/eventList'
import UserList from './components/userList/userList';

import './App.css'

function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<EventList></EventList>} ></Route>
            <Route path='/:id' element={<UserList></UserList>}></Route>
        </Routes>
    </div>
  )
}

export default App
