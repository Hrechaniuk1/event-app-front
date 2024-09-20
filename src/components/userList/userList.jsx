import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import User from "../user/user";
import SearchBar from "../searchBar/searchBar";
import css from './userList.module.css'
import PerDay from "../perDay/perDay";
import Error from "../error/error";

function UserList(){

    const {id} = useParams();
    const [info, setInfo] = useState([])
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const filteredUsers = info.filter(item => item.name.toLowerCase().includes(value.toLocaleLowerCase().trim()) || item.email.toLowerCase().includes(value.toLowerCase().trim()) )

    function countRegistrationsPerDay() {
        const perDay = []
        const registrationDates = info.map(item => item.dateOfRegistration.split('T')[0])
        const countDates = registrationDates.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1; 
            return acc;
        }, {});
        for(const item of Object.values(countDates)) {
            perDay.push(item)
        }
        perDay.sort((a,b) => b - a)
        return perDay[0]
    }

    const perDay = countRegistrationsPerDay()

    function changeHandler(event) {
        setValue(event.target.value)
    }

    useEffect(() => {
        async function getUsers() {
            setError(false)
            axios.defaults.baseURL = 'https://event-app-toi1.onrender.com'
            const result = await axios.get(`/events/${id}`)
            setInfo(result.data.data.participants)
        }

        try {
            getUsers()
        } catch {
            setError(true)
        }


    }, [id])


    return (
     !error ? <div>
            <p>Registrations per day</p>
            <PerDay perDay={perDay}></PerDay>
            <SearchBar value={value} changeHandler={changeHandler}></SearchBar>
        {info.length > 0 ? <ul className={css.list}>
            {filteredUsers.map(item => (<li key={item._id}><User data={item}></User></li>))}
        </ul> : <p>There are no registrations yet. You can be the very first</p>}
        </div> : <Error></Error>
    )
}

export default UserList