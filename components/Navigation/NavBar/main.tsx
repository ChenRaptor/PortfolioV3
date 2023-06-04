"use client"
import Link from 'next/link'
import styles from './main.module.scss'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { useState } from 'react';

const NavBar = function NavBar() {
    const { data: session, status: sessionStatus } = useSession();
    const matches = useMediaQuery('(min-width: 1000px)')

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen);
    };



    const pathname = usePathname();
    const path = pathname.split('/')

    return (
        <>
            { matches ? 
                <nav className={styles.main}>
                    <Link 
                        href="/"          
                        className={path[1] === 'home' ? styles.activated : undefined}
                    >Home</Link>
                    <Link 
                        href="/"          
                        className={path[1] === 'aboutme' ? styles.activated : undefined}
                    >About me</Link>
                    <Link 
                        href="/projects"          
                        className={path[1] === 'projects' ? styles.activated : undefined}
                    >Projects</Link>
                    <Link 
                        href="/blog"          
                        className={path[1] === 'blog' ? styles.activated : undefined}
                    >Blog</Link>
                    <Link 
                        href="/"          
                        className={path[1] === 'contact' ? styles.activated : undefined}
                    >Contact</Link>
        
                    {session?.user?.role === 'admin' ? 
                    <Link href="/dashboard/overview">Dashboard</Link> 
                    : null }
                </nav>
            :
            <>
                <button className={styles.navButton} onClick={handleClick}>Menu</button>
                {
                    isOpen ? 
                    <nav className={styles.nav}>
                        <Link href="/">Home</Link>
                        <Link href="/">About me</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/">Contact</Link>
                    </nav>
                    : null
                }
            </>
            }
        
        </>
    )
}

export default NavBar