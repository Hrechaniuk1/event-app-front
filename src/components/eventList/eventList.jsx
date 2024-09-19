import EventItem from "../eventItem/eventItem";
import css from './eventList.module.css'

function EventList({data}) {
    return (
        <ul className={css.eventList}>
            <li><EventItem></EventItem></li>
            <li><EventItem></EventItem></li>
            <li><EventItem></EventItem></li>         
            <li><EventItem></EventItem></li>      
            <li><EventItem></EventItem></li>
            <li><EventItem></EventItem></li>
            <li><EventItem></EventItem></li>         
            <li><EventItem></EventItem></li>   
         </ul>
    )
}

export default EventList