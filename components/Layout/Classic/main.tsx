"use client"
import NavBar from '@/components/Navigation/NavBar/main';
import styles from './main.module.scss';
import { ParallaxProvider } from 'react-scroll-parallax';
import Heading from '@/components/Display/Heading/main';
import { usePathname } from 'next/navigation';
import NavAsideHome from '@/components/Navigation/NavAside/NavAsideHome';
import Logo from '@/components/Icons/Logo/Logo';
function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider>
        <div className={styles.main}>
            <aside>
              <div>
                <Logo/><NavAsideHome/>
              </div>
            </aside>
            <div>{children}</div>
            <aside></aside>
        </div>
    </ParallaxProvider>
  );
}


ClassicLayout.FirstSection = function FirstSection ({children, options} : {children: React.ReactNode, options?: {display_activity: boolean}}) {
  const pathname = usePathname();
  const path = pathname.split('/')



  return (
    <section className={styles.firstsection}>
      <div>
        <NavBar/>
        <div className={styles.indicator}>
            <Heading type='title-page'>{path.map((item,index) => {
                return (
                  <>
                    { item ? <span key={index*2}>{item}</span> : null }
                    { path[index + 1] && index > 0? <span key={index*2 + 1}>/</span> : null }
                  </>
                )
            })}</Heading>
            <div className={styles.controller}>
              { options?.display_activity ? <p>Last Activity: <time>5 days ago</time></p> : null}
            </div>
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