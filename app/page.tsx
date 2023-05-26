"use client"
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import { Parallax } from 'react-scroll-parallax'
import WrapperPage from '@/components/WrapperPage/main';
import NavBar from '@/components/NavBar/main';
import Font from '@/components/Font/main';
import Button from '@/components/Button/main';
import Heading from '@/components/Heading/main';

const CSRCanvas = dynamic(
  () => import('../components/scene3D/scene3D'),
  { ssr: false }
)




function HomePage () {

  return (
    <WrapperPage namePage='home'>
        <main className={styles.main}>
            <section className={styles.section} id='home'>
                <NavBar currentPage='home'/>
                <div className={styles['index-section']}>
                    <div className={styles.canvas}><CSRCanvas/></div>

                    <aside>
                        <Parallax startScroll={0} endScroll={400} translateX={['0px', '-100px']} opacity={[1,0]} scale={[1,0.9]} easing='easeIn'>
                            <Heading type='h1'>
                                <div><span>Hi</span><Font color='color-orange'>visitor<span>,</span></Font></div>
                                <div><span>I</span><span>am</span><span>Antoine</span><span>Bonneau</span></div>
                                <div><span>Future</span><Font color='color-cyan'>web</Font><Font color='color-cyan'>developer</Font></div>
                            </Heading>
                        </Parallax>
                        <Parallax startScroll={0} endScroll={400} translateX={['0px', '-100px']} opacity={[1,0]} scale={[1,0.9]} easing='easeInOut'>
                            <Button>Read more</Button>
                        </Parallax>
                    </aside>

                    <div></div>
                    
                </div>
            </section>

            <section className={styles.section} id='grid'>
                <div className={styles['board-section']}>
                <div className={styles.container}>
                    <div className={styles['last-activity']}>

                    </div>
                    <div className={styles.p1}>

                    </div>
                    <div className={styles.p2}></div>
                    <div className={styles.p3}></div>
                    <div className={styles.p4}></div>
                </div>
                </div>
            </section>


            <section className={styles.section} id='grid2'>
                <div className={styles['portfolio-section']}>

                </div>
            </section>
        </main>
    </WrapperPage>
   )
}

export default HomePage;