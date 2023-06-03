import styles from './main.module.scss'

function Disposer ({object} : {object: any}) {
    return (
        <div className={styles.main}>
            { (object ?? []).map((item: any) => <div key={item.id}>{item.name}</div>)}
        </div>
    )
}

export default Disposer