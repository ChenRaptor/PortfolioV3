import { useContext } from "react";
import { DateContext, DateContextType } from "../Provider/DateProvider/main";
import styles from './main.module.css'

export default function DateTime () {
    const dateContext = useContext<DateContextType | null>(DateContext) as DateContextType;

    const holiday = dateContext.isOffDay();
    return (
        <div className={styles.main}>
            <time dateTime={dateContext.getNumericDate()}>{dateContext.getFullDate()}</time>
            { holiday ? <p>{ holiday }</p> : null }
        </div>
    )
}