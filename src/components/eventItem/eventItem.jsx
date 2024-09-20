import { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";

import css from './eventItem.module.css'
import Modal from '../modal/modal'

function EventItem({data}) {
    const [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const keyDownHandler = useCallback((event) => {
        if (event.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [closeModal]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', keyDownHandler);
        } else {
            document.removeEventListener('keydown', keyDownHandler);
        }
    
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [isOpen, keyDownHandler])

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
                <li><button onClick={openModal} className={css.regBtn}>Register</button></li>
                <li>
                    <Link className={css.viewBtn} to={`${data._id}`}>View</Link>
                    </li>
            </ul>
            {isOpen ? <Modal id={data._id} closeModal={closeModal}></Modal> : <></>}
        </div>
    )
}

export default EventItem