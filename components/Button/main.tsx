import { CSSProperties } from 'react'
import styles from './main.module.scss'

export default function Button ({children, cta, onClick, noflex, style} : {children: React.ReactElement | string, cta?: boolean, onClick?: any, noflex?: boolean, style?: CSSProperties}) : React.ReactElement {
    return (
        <button onClick={onClick} style={style} className={`${noflex ? styles.main2 : styles.main} ${cta ? styles.cta : ''}`}>{children}</button>
    )
}