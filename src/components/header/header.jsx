import { Link } from "react-router-dom";

import css from './header.module.css'

function Header() {
    return (
        <header className={css.header}>
        <Link to="/">Logo</Link>
        </header>
    )
}

export default Header