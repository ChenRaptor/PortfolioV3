import styles from './Display.module.scss'

function Display ({} : {}) {
    return (
        <div className={styles.container}>
            <div className={styles.a1}></div>
            <div className={styles.a2}></div>
            <div className={styles.a3}></div>
            <div className={styles.a4}></div>
        </div>
    )
}

export default Display