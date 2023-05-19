import { Inter } from "next/font/google";
import Link from "next/link";
import styles from './main.module.css'
import { IconType } from "../Icons/type";
import icons from "../Icons/main";

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLink ({icon, link, name} : {icon: IconType, link: string, name: string}) {
    return (
        <Link className={styles.main} href={link}>
            <div>
                {(icons[icon])()}
                <span className={`${inter.className}`}>{name}</span>
            </div>
        </Link>
    )
}