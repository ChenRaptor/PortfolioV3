"use client"
import WrapperPage from '@/components/WrapperPage/main';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

function Blog() {
  const [markdownContent, setMarkdownContent] = useState('');
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    // Chargez le contenu du fichier .md ici
    fetch('skills_MMI2_DWDI.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.log(error));
  }, []);

  return (
    <WrapperPage namePage="projects">
    <main className={styles.main}>
        <section className={styles.section} id='portfolio'>
            <nav>
                <Link href="/">
                Home
                </Link>
                <a>About me</a>

                <Link href="/projects">
                Projects
                </Link>

                <Link className={styles.activated} href="/blog">
                Blog
                </Link>
                <a>Contact</a>
                {session?.user?.role === 'admin' ? 
                <Link href="/dashboard/overview">
                Dashboard
                </Link> 
                : null }
            </nav>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </section>
    </main>
    </WrapperPage>
  );
}

export default Blog;