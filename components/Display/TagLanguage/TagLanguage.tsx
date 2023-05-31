import styles from './TagLanguage.module.css'

interface AppStyle extends React.CSSProperties {
    '--backcolor': string;
    '--color': string
}

interface TagLanguageProperties {
    language: string,
}


const languages : {
    [key: string] : {color: string, backcolor: string}
} = {
    TypeScript: {
        backcolor: '#0066ff30',
        color: '#92b9ff'
    },
    JavaScript: {
        backcolor: '#efff0030',
        color: '#e4ff92'
    },
    CSS: {
        backcolor: '#0066ff30',
        color: '#92b9ff'
    },
    PHP: {
        backcolor: '#49dae130',
        color: '#09ffdd'
    }
}



export default function TagLanguage ({language} : TagLanguageProperties) {
    const style: AppStyle = {
        '--backcolor': languages[language].backcolor,
        '--color': languages[language].color,
    };
    

    return (
        <div style={style} className={styles.main}>
            {language}
        </div>
    )
}