import { Formik, Form, Field } from "formik";

import css from './sortBar.module.css'

function SortBar({onSort}) {

    const initial = {
        sortBy: '',
        sortOrder: ''
    }

    function submitHandler(values) {
        onSort(values)
    }

    return (

        <div className={css.sortBar}>
            <p className={css.title}>Sortation</p>
            <Formik
            initialValues={initial}
            onSubmit={submitHandler}
            >
                <Form className={css.formContainer}>
                    <div className={css.form}>
                    <div className={css.selectBox}>
                    <label htmlFor="sortBy">Sort events by...</label>
                    <Field className={css.option} id='sortBy' as='select' name='sortBy'>
                        <option value=""></option>
                        <option value="organizer" label="Sort by organizer"></option>
                        <option value="title" label="Sort by title"></option>
                        <option value="eventDate" label="Sort by event date"></option>
                    </Field>
                    </div>
                    <div className={css.selectBox}>
                    <label htmlFor="sortOrder">Sort order...</label>
                    <Field className={css.option} id='sortOrder' as='select' name='sortOrder'>
                        <option value=""></option>
                        <option value="asc" label="ASC"></option>
                        <option value="desc" label="DESC"></option>
                    </Field>
                    </div>
                    </div>
                    <button className={css.btn} type="submit" >Sort</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SortBar