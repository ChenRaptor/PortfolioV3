import styles from './main.module.scss'

export default function Button ({children, cta, onClick} : {children: React.ReactElement | string, cta?: boolean, onClick?: any}) {
    return (
        <button onClick={onClick} className={`${styles.main} ${cta ? styles.cta : ''}`}>{children}</button>
    )
}