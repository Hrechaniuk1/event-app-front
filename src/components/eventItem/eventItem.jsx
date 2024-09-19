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
        if(isOpen) {
            document.addEventListener('keydown', keyDownHandler);
            return () => {
                document.removeEventListener('keydown', keyDownHandler);
            };
        }
    }, [isOpen, keyDownHandler])

    return (
        <div className={css.card}>
            <h3 className={css.title}>{data.title}</h3>
            <p className={css.description}>{data.description}</p>
            <p>{data.organizer}</p>
            <p>{data.eventDate}</p>
            <ul className={css.btnList}>
                <li><button onClick={openModal} className={css.regBtn}>Register</button></li>
                <li>
                    <Link to={`${data._id}`}>View</Link>
                    </li>
            </ul>
            {isOpen ? <Modal id={data._id}></Modal> : <></>}
        </div>
    )
}

export default EventItem