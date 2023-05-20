"use client"
import styles from './page.module.css'
import Link from "next/link";
import { useSession } from "next-auth/react";
import WrapperPage from "@/components/WrapperPage/main";

export default function ProjectsPage () {
    const { data: session, status: sessionStatus } = useSession();
    return (
        <WrapperPage namePage="projects">
            <main className={styles.main}>
                <section className={styles.section} id='portfolio'>
                    <nav>
                        <Link href="/">
                        Home
                        </Link>
                        <a>About me</a>

                        <Link className={styles.activated} href="/projects">
                        Projects
                        </Link>

                        <a>Blog</a>
                        <a>Contact</a>
                        {session?.user?.role === 'admin' ? 
                        <Link href="/dashboard/overview">
                        Dashboard
                        </Link> 
                        : null }
                    </nav>
                    <div className={styles.glassmorphism}>

                    </div>
                </section>
            </main>
        </WrapperPage>
    )
}
