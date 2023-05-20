"use client"
import WrapperPage from "@/components/Wrapper/Page/main";
import { ParallaxProvider } from "react-scroll-parallax";
import styles from './page.module.css'
import Link from "next/link";
import { useSession } from "next-auth/react";

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
                </section>
            </main>
        </WrapperPage>
    )
}
