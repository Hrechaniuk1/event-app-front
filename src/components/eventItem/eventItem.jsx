import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import css from './eventItem.module.css'
import Modal from '../modal/modal'

function EventItem({data}) {
    const [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    function keyDawnHandler(event) {
        if(event.key === 'Escape') { 
            closeModal()
            document.removeEventListener('keydown', keyDawnHandler)
        }
    }

    useEffect(() => {
        if(isOpen) {
            document.addEventListener('keydown', keyDawnHandler);
            return () => {
                document.removeEventListener('keydown', keyDawnHandler);
            };
        }
    }, [isOpen])

    return (
        <div className={css.card}>
            <h3 className={css.title}>Title</h3>
            <p className={css.description}>Description</p>
            <ul className={css.btnList}>
                <li><button onClick={openModal} className={css.regBtn}>Register</button></li>
                <li>
                    <Link to={'/55555'}>View</Link>
                    </li>
            </ul>
            {isOpen ? <Modal></Modal> : <></>}
        </div>
    )
}
import UserList from '../userList/userList';

export default EventItem