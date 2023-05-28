"use client"
import Button from '@/components/Button/main';
import Font from '@/components/Font/main';
import Heading from '@/components/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import { Parallax } from 'react-scroll-parallax';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';

const CSRCanvas = dynamic(
  () => import('@/components/scene3D/scene3D'),
  { ssr: false }
)

function HomePage() {
  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection currentPage='home'>
            <div className={styles.canvas}><CSRCanvas/></div>
            <Parallax startScroll={0} endScroll={400} translateX={['0px', '-100px']} opacity={[1,0]} scale={[1,0.9]} easing='easeIn'>
                <Heading type='h1'>
                    <div><span>Hi</span><Font color='color-orange'>visitor<span>,</span></Font></div>
                    <div><span>I</span><span>am</span><span>Antoine</span><span>Bonneau</span></div>
                    <div><span>Future</span><Font color='color-cyan'>web</Font><Font color='color-cyan'>developer</Font></div>
                </Heading>
            </Parallax>
            <Parallax startScroll={0} endScroll={400} translateX={['0px', '-100px']} opacity={[1,0]} scale={[1,0.9]} easing='easeInOut'>
                <Button noflex>Read more</Button>
            </Parallax>
        </ClassicLayout.FirstSection>
    </ClassicLayout>
  );
}


export default HomePage;