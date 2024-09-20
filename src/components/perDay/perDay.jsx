import { useState, useEffect } from 'react';

import css from './perDay.module.css'


function PerDay({perDay}) {
    const [currentRegistrations, setCurrentRegistrations] = useState(0);
    const [maxRegistrations, setMaxRegistrations] = useState(10);

    useEffect(() => {
        setCurrentRegistrations(perDay)
    }, [perDay])


    const progressPercentage = Math.min((currentRegistrations / maxRegistrations) * 100, 100);

    return (
        <div className={css.progressContainer}>
        <div className={css.progressBar}style={{ width: `${progressPercentage}%` }}>{currentRegistrations}</div>
    </div>
    )
}

export default PerDay