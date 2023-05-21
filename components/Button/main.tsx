import { ArrowFunction } from 'typescript'
import styles from './main.module.css'

export default function Button ({children, cta, onClick} : {children: React.ReactElement | string, cta?: boolean, onClick?: any}) {
    return (
        <button onClick={onClick} className={`${styles.main} ${cta ? styles.cta : ''}`}>{children}</button>
    )
}