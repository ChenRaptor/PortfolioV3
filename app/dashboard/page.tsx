"use client"
import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { signOut, useSession } from 'next-auth/react';
const inter = Inter({ subsets: ['latin'] })




function Dashboard() {

  const { data: session, status: sessionStatus } = useSession();

  return (
    <main className={styles.main}>
      <section className={styles.section} id='overview'>
      <div className={styles.container2}>
        <div className={styles.logged}>
          <div>
            <span>logged in:</span><span>{session?.user?.username}</span>
          </div>
          <button className='btn-cta' onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
        <div className={styles.stats}></div>
      </div>
      </section>
      <section className={styles.section} id='insights'>

      </section>
      <section className={styles.section} id='deployed_code'>
      <div className={styles.container}>
        <div className={styles['project-array']}>
          <div>
            <div></div>
          </div>
          <div>
            
          </div>
          <div>
          
          </div>
        </div>
        <div className={styles.form}>
            <input type='text' className='input f8'></input>
            <button className='btn f1'>Language</button>
            <button className='btn f1'>Sort</button>
            <button className='btn-cta f2'>Add project</button>
        </div>
        <div className={styles.other}></div>
      </div>
      </section>
    </main>
  )
}

export default Dashboard;