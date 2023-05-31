import styles from './main.module.scss'

function Spinner ({} : {}) {
    return (
        <div className={styles.go}>
            <div className={styles['lds-ripple']}><div></div><div></div></div>
            <p>Loading</p>
        </div>
    )
}

export default Spinner