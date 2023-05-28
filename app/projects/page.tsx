"use client"
import styles from './page.module.scss'
import WrapperPage from "@/components/WrapperPage/main";
import NavBar from '@/components/NavBar/main';

export default function ProjectsPage () {

    return (
        <WrapperPage namePage="projects">
            <main className={styles.main}>
                <section className={styles.section} id='portfolio'>
                    <NavBar currentPage='projects'/>
                    <div className={styles.glassmorphism}>

                    </div>
                </section>
            </main>
        </WrapperPage>
    )
}
