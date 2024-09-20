import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import User from "../user/user";
import SearchBar from "../searchBar/searchBar";
import css from './userList.module.css'
import PerDay from "../perDay/perDay";

function UserList(){

    const {id} = useParams();
    const [info, setInfo] = useState([])
    const [value, setValue] = useState('')

    const filteredUsers = () =>  info.filter(item => item.name.toLowerCase().includes(value.toLocaleLowerCase().trim()) || item.email.toLowerCase().includes(value.toLowerCase().trim()) )
    

    function changeHandler(event) {
        setValue(event.target.value)
    }

    useEffect(() => {
        async function getUsers() {
            axios.defaults.baseURL = 'http://localhost:14000'
            const result = await axios.get(`/events/${id}`)
            setInfo(result.data.data.participants)
        }
        getUsers()
    }, [id])


    return (
        <div>
            <p>Registrations per day</p>
            <PerDay></PerDay>
            <SearchBar value={value} changeHandler={changeHandler}></SearchBar>
        {info.length > 0 ? <ul className={css.list}>
            {filteredUsers().map(item => (<li key={item._id}><User data={item}></User></li>))}
        </ul> : <p>There are no registrations yet. You can be the very first</p>}
        </div>
    )
}

export default UserList