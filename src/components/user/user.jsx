import css from './user.module.css'

function User({data}) {
    return (
        <div className={css.user}>
            <h4>{data.name}</h4>
            <p>{data.email}</p>
        </div>
    )
}

export default User