import { Inter } from 'next/font/google'
import styles from './main.module.css'
const inter = Inter({ subsets: ['latin'] })


export default function DashboardLinkWrapper ({children,sectionName} : {children: React.ReactNode, sectionName: string}) {
    return (
        <div className={styles.main}>
            <p className={inter.className}>{sectionName}</p>
            <div className={styles.mainbutton}>
                {children}
            </div>
        </div>

    )
}