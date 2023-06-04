"use client"
import Disposer from '@/components/Layout/Section/Disposer/main'
import styles from './page.module.scss'
export default function ProjectsSection () {

    return (
        <section className={styles.section}>
            <div>
                <Disposer type='projects' dashboardLink />
            </div>
        </section>
    )
}