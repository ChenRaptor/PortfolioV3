"use client"
import NavBar from '@/components/NavBar/main';
import styles from './main.module.scss';
import { ParallaxProvider } from 'react-scroll-parallax';
import Heading from '@/components/Heading/main';

function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider>
        <div className={styles.main}>
            <aside></aside>
            <div>{children}</div>
            <aside></aside>
        </div>
    </ParallaxProvider>
  );
}


ClassicLayout.FirstSection = ({children, currentPage, controls} : {children: React.ReactNode, currentPage: 'home' | 'blog', controls?: React.ReactNode}) => {
  return (
    <section className={styles.firstsection}>
        <NavBar currentPage={currentPage}/>
        <div className={styles.indicator}>
            <Heading type='title-page'>{currentPage}</Heading>
            {controls}
        </div>
        {children}
    </section>
  );
};

ClassicLayout.Section = ({children} : {children: React.ReactNode}) => {
  return (
    <section className={styles.section}>
      <div>
        {children}
      </div>
    </section>
  );
};


export default ClassicLayout;