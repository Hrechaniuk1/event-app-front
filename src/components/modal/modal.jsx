import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import ReactDOM from 'react-dom';
import axios from 'axios';

import css from './modal.module.css'


function Modal({id, closeModal}) {

    const initial = {
        name: '',
        email: '',
        dateOfBirth: '',
        howUKnow: 'Found myself'
    }

    async function registerOnEvent(data) {
        axios.defaults.baseURL = 'http://localhost:14000'
        await axios.patch(`/events/${id}`, data)
    }

    function submitHandler(values) {
        const today = new Date()
        registerOnEvent({...values, dateOfRegistration: today})
        closeModal()

    }

    const Schema = Yup.object().shape({
        name: Yup.string().min(2, 'Name should contain at least 2 letters').max(20, 'There is a lot of letters. Max - 20').required('Name is required'),
        email: Yup.string().email('Should be a valid email').required('Email is required'),
        dateOfBirth: Yup.date().required('Date is required').typeError('Please enter a valid date'),
           
    });

    return ReactDOM.createPortal(
        <div className={css.layout}>
        <div className={css.modal}>
            <Formik
            initialValues={initial}
            onSubmit={submitHandler}
            validationSchema={Schema}
            >
                <Form className={css.form}>
                    <h2>Event registration</h2>
                    <label htmlFor='fullName'>Full name</label>
                    <Field id='fullName' name='name'></Field>
                    <ErrorMessage className={css.error} name='name' component='span'></ErrorMessage>
                    <label htmlFor='email'>Email</label>
                    <Field id='email' name='email'></Field>
                    <ErrorMessage className={css.error} component='span' name='email'></ErrorMessage>
                    <label htmlFor='dateOfBirth'>Date of birth</label>
                    <Field id='dateOfBirth' type='date' name='dateOfBirth'></Field>
                    <ErrorMessage className={css.error} component='span' name='dateOfBirth'></ErrorMessage>
                    <label>Where did you hear about this event?</label>
                    <div>
                        <label>
                            Social media
                            <Field type='radio' value='Social media' name='howUKnow'></Field>
                        </label>
                        <label>
                            Friends
                            <Field type='radio' value='Friends' name='howUKnow'></Field>
                        </label>
                        <label>
                            Found by myself
                            <Field type='radio' value='Found myself' name='howUKnow'></Field>
                        </label>
                    </div>
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal