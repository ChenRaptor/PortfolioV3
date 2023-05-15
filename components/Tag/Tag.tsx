import styles from './Tag.module.css'

interface AppStyle extends React.CSSProperties {
    '--tagColor': string;
    '--tagBackgroundColor': string
}

interface TagProperties {
    name: string,
    color: string,
    backcolor: string
}




export default function Tag ({name,color,backcolor} : TagProperties) {
    const style: AppStyle = {
        '--tagColor': color,
        '--tagBackgroundColor': backcolor,
    };
    

    return (
        <div style={style} className={styles.main}>
            {name}
        </div>
    )
}