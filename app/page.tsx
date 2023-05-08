import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, Environment } from '@react-three/drei'
import { useMemo, useState, useTransition } from 'react'
import { Stats } from '@react-three/drei'
import * as THREE from 'three'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'
import styles from './page.module.css'

import dynamic from 'next/dynamic'

const CSRCanvas = dynamic(
  () => import('../components/scene3D/scene3D'),
  { ssr: false }
)


export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles['index-section']}>
          <div className={styles.canvas}><CSRCanvas/></div>
          <aside>
            <div>
              <h1 className={styles.title}>
                <div><span>Hi</span><span className={styles['color-orange']}>visitor<span className={styles['color-white']}>,</span></span></div>
                <div><span>I</span><span>am</span><span>Antoine</span><span>Bonneau</span></div>
                <div><span>Future</span><span className={styles['color-cyan']}>web</span><span className={styles['color-cyan']}>developer</span></div>
              </h1>
            </div>
            <div>
              <button className='btn'>Read more</button>
            </div>
          </aside>
          <div>

          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles['board-section']}>

        </div>
      </section>
    </main>
  )
}