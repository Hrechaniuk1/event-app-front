import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';

import * as Yup from 'yup'
import axios from 'axios';

import css from './registrationPage.module.css'
import { useLocation } from 'react-router-dom';


function RegistrationPage() {
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)

    const initial = {
        name: '',
        email: '',
        dateOfBirth: '',
        howUKnow: 'Found myself'
    }

    const {state} = useLocation()

    async function registerOnEvent(data) {
    axios.defaults.baseURL = 'https://event-app-u9tk.onrender.com'
    await axios.patch(`/events/${state.id}`, data)
        
    }

    function submitHandler(values) {
        try {
        const today = new Date()
        registerOnEvent({...values, dateOfRegistration: today})
        setSubmit(true)

        } catch {
            setError(true)
        }

    }

    const Schema = Yup.object().shape({
        name: Yup.string().min(2, 'Name should contain at least 2 letters').max(20, 'There is a lot of letters. Max - 20').required('Name is required'),
        email: Yup.string().email('Should be a valid email').required('Email is required'),
        dateOfBirth: Yup.date()
        .required('Date is required')
        .typeError('Please enter a valid date')
        .test('age', 'You must be at least 16 years old to visit an event on your own', value => {
            if (!value) return false; 
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                return age > 16;
            }
            return age >= 16; 
        }),
           
    });

    return (
        <div>
        {!error ? <div className={css.modal}>
            {!submit ? <Formik
            initialValues={initial}
            onSubmit={submitHandler}
            validationSchema={Schema}
            >
                <Form className={css.form}>
                    <h2>Registration on {state.title}</h2>
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
                    <div className={css.radioGroup}>
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
                    <button className={css.btn} type='submit'>Register</button>
                </Form>
            </Formik> : <p>Thank you for registration. Check your information on event page!</p>}
        </div> : <div className={css.modal}><p>Oops, try again in one minute</p></div>}
        </div>
    )
}

export default RegistrationPage