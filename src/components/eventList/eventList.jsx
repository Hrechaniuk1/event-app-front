import { useEffect, useState } from "react";
import axios from "axios";

import EventItem from "../eventItem/eventItem";
import css from './eventList.module.css'

function EventList() {
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function getEvents() {
            axios.defaults.baseURL = 'http://localhost:14000'
            const result = await axios.get('/events',{params: {perPage: 10, page,}})
            if(page === 1) {
                setEvents(result.data.data.data)
            } else {
            setEvents(prevEvents => [...prevEvents, ...result.data.data.data]);
            }
        }
        getEvents()
    }, [page])


    return (
        <ul className={css.eventList}>
             {events.map(item => (<li key={item._id}><EventItem data={item}></EventItem></li>))}
         </ul>
    )
}

export default EventList