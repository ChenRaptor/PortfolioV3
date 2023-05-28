"use client"
import NavBar from '@/components/NavBar/main';
import styles from './main.module.scss'
import Heading from '@/components/Heading/main';

function FirstSection ({children} : {children: React.ReactNode}) {
    return (
      <section className={styles.firstsection}>
          <NavBar currentPage='home'/>
          <div>
              <Heading type='title-page'>Home</Heading>
          </div>
          { children }
      </section>
    );
  };

export default FirstSection