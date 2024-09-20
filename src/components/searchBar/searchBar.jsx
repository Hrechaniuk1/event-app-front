import css from './searchBar.module.css'

function SearchBar ({value, changeHandler}) {

    return (
        <div className={css.input}>
            <label htmlFor="search">Search trough the list of participants</label>
            <input id="search" onChange={changeHandler} value={value} type="text" name='search' placeholder='Enter name or email to find a user'/>
        </div>
    )
}

export default SearchBar