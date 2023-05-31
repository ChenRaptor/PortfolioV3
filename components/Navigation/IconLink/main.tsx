import Link from "next/link";
import icons from "../../Icons/main";
import { IconType } from "../../Icons/type";
import styles from './main.module.css'

export default function IconLink ({icon, link} : {icon: IconType, link: string}) {
    return (
        <Link className={styles.main} href={link}>
            <div>
                {(icons[icon])()}
            </div>
        </Link>
    )
}