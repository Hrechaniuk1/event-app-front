import { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";

import css from './eventItem.module.css'

function EventItem({data}) {

    const eventDataInfo = {
        day: 0,
        time: 0,
    }

    function getTime() {
        eventDataInfo.day = data.eventDate.split('T')[0]
        const date = new Date(data.eventDate)
        const hours = date.getUTCHours().toString().padStart(2, '0'); 
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        eventDataInfo.time = `${hours}:${minutes}`
    }
    getTime()

    return (
        <div className={css.card}>
            <div> 
            <h3 className={css.title}>{data.title}</h3>
            <div className={css.descContainer}>
                <p className={css.minTitle}>Description:</p>
                <p className={css.description}>{data.description}</p>
            </div>
            <div className={css.descContainer}>
                <p className={css.minTitle}>Organizer of the event:</p>
                <p>{data.organizer}</p>
            </div>
            <p><span className={css.span}>Day:</span> {eventDataInfo.day}</p>
            <p><span className={css.span}>Time:</span> {eventDataInfo.time}</p>
            </div>
            <ul className={css.btnList}>
                <li><Link to={'/signup'} state={{id: data._id, title: data.title}}  className={css.regBtn}>Register</Link></li>
                <li>
                    <Link className={css.viewBtn} to={`${data._id}`}>View</Link>
                    </li>
            </ul>
        </div>
    )
}

export default EventItem