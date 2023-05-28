import styles from './main.module.scss'

function Flex ({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.main}>
            {children}
        </div>
    )
}

export default Flex