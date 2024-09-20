import { useEffect, useState } from "react";
import axios from "axios";

import EventItem from "../eventItem/eventItem";
import SortBar from "../sortBar/sortBar";
import css from './eventList.module.css'

function EventList() {
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const [sortOrder, setSortOrder] = useState('asc')
    const [hasMore, setHasMore] = useState(false)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        async function getEvents() {
            if(page > totalPages) return
            axios.defaults.baseURL = 'http://localhost:14000'
            const result = await axios.get('/events',{params: {perPage: 15, page, sortBy, sortOrder}})
            setTotalPages(result.data.data.totalPages)
            if(page === 1) {
                setEvents(result.data.data.data)
            } else {
                if(result.data.data.data.length === 0) return
            setEvents(prevEvents => [...prevEvents, ...result.data.data.data]);
            }
            if(result.data.data.hasNextPage) {
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        }
        getEvents()
    }, [page, sortBy, sortOrder, totalPages])

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ hasMore]);

    function onSort(values) {
        setSortBy(values.sortBy)
        setSortOrder(values.sortOrder)
        setPage(1)
    }
    

    return (
        <div>
            <SortBar onSort={onSort}></SortBar>
            <ul className={css.eventList}>
             {events.map(item => (<li key={item._id}><EventItem data={item}></EventItem></li>))}
         </ul>
        </div>
    )
}

export default EventList