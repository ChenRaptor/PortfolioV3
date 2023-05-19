"use client"
import WrapperPage from '@/components/Wrapper/Page/main'
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import { Parallax } from 'react-scroll-parallax'
import { useSession } from 'next-auth/react';
import Link from 'next/link'

const CSRCanvas = dynamic(
  () => import('../components/scene3D/scene3D'),
  { ssr: false }
)




function Home() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <WrapperPage namePage='home'>
    <main className={styles.main}>
      <section className={styles.section} id='home'>
        <nav>
            <a>About me</a>
            <a>Projects</a>
            <a>Blog</a>
            <a>Contact</a>
            {session?.user?.role === 'admin' ? 
            <Link href="/dashboard/overview">
              Dashboard
            </Link> 
            : null }
        </nav>
        <div className={styles['index-section']}>
          <div className={styles.canvas}><CSRCanvas/></div>
          <aside>
            <Parallax 
                startScroll={0}
                endScroll={400}
                translateX={['0px', '-100px']}
                opacity={[1,0]}
                scale={[1,0.9]}
                easing='easeIn'
            >
            <div>
              <h1 className={styles.title}>
                <div><span>Hi</span><span className={styles['color-orange']}>visitor<span className={styles['color-white']}>,</span></span></div>
                <div><span>I</span><span>am</span><span>Antoine</span><span>Bonneau</span></div>
                <div><span>Future</span><span className={styles['color-cyan']}>web</span><span className={styles['color-cyan']}>developer</span></div>
              </h1>
            </div>
           </Parallax>
           <Parallax
                startScroll={0}
                endScroll={400}
                translateX={['0px', '-100px']}
                opacity={[1,0]}
                scale={[1,0.9]}
                easing='easeInOut'
           >
            <div>
              <button className='btn'>Read more</button>
            </div>
           </Parallax>
          </aside>
          <div>

          </div>
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

export default Home;