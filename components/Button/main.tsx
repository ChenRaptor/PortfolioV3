import styles from './main.module.css'

export default function Button ({children, cta} : {children: React.ReactElement | string, cta?: boolean}) {
    return (
        <button className={`${styles.main} ${cta ? styles.cta : ''}`}>{children}</button>
    )
}