"use client"
import Link from 'next/link'
import styles from './main.module.scss'
import { useSession } from 'next-auth/react';
import { memo } from 'react';


const NavBar = memo(function NavBar({currentPage} : {currentPage: string}) {
    const { data: session, status: sessionStatus } = useSession(); 

    return (
        <nav className={styles.main}>
            <Link 
                href="/"          
                className={currentPage === 'home' ? styles.activated : undefined}
            >Home</Link>
            <Link 
                href="/"          
                className={currentPage === 'aboutme' ? styles.activated : undefined}
            >About me</Link>
            <Link 
                href="/projects"          
                className={currentPage === 'projects' ? styles.activated : undefined}
            >Projects</Link>
            <Link 
                href="/blog"          
                className={currentPage === 'blog' ? styles.activated : undefined}
            >Blog</Link>
            <Link 
                href="/"          
                className={currentPage === 'contact' ? styles.activated : undefined}
            >Contact</Link>

            {session?.user?.role === 'admin' ? 
            <Link href="/dashboard/overview">Dashboard</Link> 
            : null }
        </nav>
    )
})

export default NavBar