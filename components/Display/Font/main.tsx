import styles from './main.module.css'

export default function Font ({color, embed, children} : {color: string, embed?: boolean, children: React.ReactNode}) {
    return (
        <span className={`${styles[color]} ${embed ? styles.embed : null}`}>{children}</span>
    )
}