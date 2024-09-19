import User from "../user/user";
import css from './userList.module.css'
import PerDay from "../perDay/perDay";

function UserList(){
    return (
        <div>
            <p>Registrations per day</p>
            <PerDay></PerDay>
        <ul className={css.list}>
            <li><User></User></li>
            <li><User></User></li>
            <li><User></User></li>
            <li><User></User></li>
            <li><User></User></li>
        </ul>
        </div>
    )
}

export default UserList