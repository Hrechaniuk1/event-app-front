import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import User from "../user/user";
import css from './userList.module.css'
import PerDay from "../perDay/perDay";

function UserList(){

    const {id} = useParams();
    const [info, setInfo] = useState([])

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
        {info.length > 0 ? <ul className={css.list}>
            {info.map(item => (<li key={item._id}><User data={item}></User></li>))}
        </ul> : <p>There are no registrations yet. You can be the very first</p>}
        </div>
    )
}

export default UserList