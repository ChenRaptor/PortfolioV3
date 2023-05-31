import Link from 'next/link'
import styles from './NavAside.module.scss'

export default function NavAsideProjects() {
    return (
        <div className={styles.main}>
            <button onClick={(e) => {e.preventDefault; location.replace('/#home')}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
            </button>
            <button onClick={(e) => {e.preventDefault; location.replace('/#grid')}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h160V716H180v160Zm220 0h160V716H400v160Zm220 0h160V716H620v160ZM180 656h160V496H180v160Zm220 0h160V496H400v160Zm220 0h160V496H620v160ZM180 436h160V276H180v160Zm220 0h160V276H400v160Zm220 0h160V276H620v160Z"/></svg>
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140 371v465h680V371L480 594Zm0-60 336-218H145l335 218ZM140 371v-55 520-465Z"/></svg>
            </button>
        </div>
    )
}