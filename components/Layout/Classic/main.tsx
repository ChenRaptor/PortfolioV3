"use client"
import NavBar from '@/components/Navigation/NavBar/main';
import styles from './main.module.scss';
import { ParallaxProvider } from 'react-scroll-parallax';
import Heading from '@/components/Display/Heading/main';
import { usePathname } from 'next/navigation';
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


ClassicLayout.FirstSection = function FirstSection ({children, currentPage, controls} : {children: React.ReactNode, currentPage: 'home' | 'blog' | 'projects', controls?: (React.ReactNode)[]}) {
  const pathname = usePathname();
  const path = pathname.split('/')



  return (
    <section className={styles.firstsection}>
      <div>
        <NavBar currentPage={currentPage}/>
        <div className={styles.indicator}>
            <Heading type='title-page'>{path.map((item,index) => {
                return (
                  <>
                    <span key={index*2}>{item}</span>
                    { path[index + 1] && index > 0? <span key={index*2 + 1}>/</span> : null }
                  </>
                )
            })}</Heading>
            {controls ? controls[0] : null}
        </div>
        <div>
            {controls ? controls[1] : null}
        </div>
      </div>
        {children}
    </section>
  );
};

ClassicLayout.Section = function Section ({children} : {children: React.ReactNode}) {
  return (
    <section className={styles.section}>
      <div>
        {children}
      </div>
    </section>
  );
};


export default ClassicLayout;