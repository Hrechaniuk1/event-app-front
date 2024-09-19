import css from './user.module.css'

function User({data}) {
    return (
        <div className={css.user}>
            <h4>Name</h4>
            <p>Email</p>
        </div>
    )
}

export default User