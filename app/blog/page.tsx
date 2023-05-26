"use client"
import WrapperPage from '@/components/WrapperPage/main';
import styles from './page.module.scss'
import NavBar from '@/components/NavBar/main';
import Heading from '@/components/Heading/main';
import Font from '@/components/Font/main';

function Blog() {

  return (
    <WrapperPage namePage="blog">
    <main className={styles.main}>
        <section className={styles.section} id='portfolio'>
            <NavBar currentPage='blog'/>
            <Heading type='h1'>
                <div><span>My</span><Font color='color-orange'>Blog</Font></div>
            </Heading>
            <div className={styles.container}>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
                <div className={styles.glassmorphism}></div>
            </div>
        </section>
    </main>
    </WrapperPage>
  );
}

export default Blog;