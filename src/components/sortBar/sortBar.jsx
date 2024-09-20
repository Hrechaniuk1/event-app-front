import { Formik, Form, Field } from "formik";

function SortBar({onSort}) {

    const initial = {
        sortBy: '',
        sortOrder: ''
    }

    function submitHandler(values) {
        onSort(values)
    }

    return (

        <div>
            <Formik
            initialValues={initial}
            onSubmit={submitHandler}
            >
                <Form>
                    <Field as='select' name='sortBy'>
                        <option value=""></option>
                        <option value="organizer" label="Sort by organizer"></option>
                        <option value="title" label="Sort by title"></option>
                        <option value="eventDate" label="Sort by event date"></option>
                    </Field>
                    <Field as='select' name='sortOrder'>
                        <option value=""></option>
                        <option value="asc" label="ASC"></option>
                        <option value="desc" label="DESC"></option>
                    </Field>
                    <button type="submit" >Sort</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SortBar