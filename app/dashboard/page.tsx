"use client"
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import { ProjectsContext } from '@/components/Provider/ProjectsProvider/main';
import styles from './page.module.css'
const inter = Inter({ subsets: ['latin'] })



function Dashboard() {

  const { data: session, status: sessionStatus } = useSession();
  const projectsContext = useContext<any | null>(ProjectsContext) as any

  useEffect(() => {
    console.log(projectsContext.projects)
  },[projectsContext])



  const getMyRepositories = () => {
    fetch('/api/github/get_my_repositories');
  }

  return (
    <main className={styles.main}>
        <aside>
            <div className={styles.wrapperlogo}>
                <div>
                    <button className={styles.btn}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 896 160 576l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/></svg>
                    </button>
                    <div className={styles.logo}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M450 902V593L180 437v309l270 156Zm60 0 270-156V436L510 592.838V902Zm-30-360 266-155-266-154-267 154 267 155ZM150 798q-14.25-8.426-22.125-22.213T120 746V406q0-16 7.875-29.787Q135.75 362.426 150 354l300-173q14.328-8 30.164-8Q496 173 510 181l300 173q14.25 8.426 22.125 22.213T840 406v340q0 16-7.875 29.787Q824.25 789.574 810 798L510 971q-14.328 8-30.164 8Q464 979 450 971L150 798Zm330-222Z"/></svg>
                    </div>
                    <p>Dashboard</p>
                </div>
            </div>
            <p className={`${inter.className} ${styles.category}`}>ADMINISTRATOR</p>
            <div className={styles.mainbutton}>
                <button onClick={(e) => {e.preventDefault; location.replace('/#home')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
                    <span className={`${inter.className} ${styles.subcategory}`}>Overview</span>
                </button>
                <button onClick={(e) => {e.preventDefault; location.replace('/#grid')}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 566Zm-30-385q14.328-8 30.164-8Q496 173 510 181l300 173q14.25 8.426 22.125 22.213T840 406v157q-13.655-10.156-28.828-17.578Q796 538 780 532v-96l-149 87q-59 14-106.5 51T450 664v-71L180 437v309l265 153q10 21 23.5 40.5T499 976q-12 5-25 3.5t-24-8.5L150 798q-14.25-8.426-22.125-22.213T120 746V406q0-16 7.875-29.787Q135.75 362.426 150 354l300-173Zm30 52L213 387l267 155 266-155-266-154Zm220 667 113-113-21-21-77 77V672h-30v171l-77-77-21 21 113 113Zm-10 76q-78 0-134-55.399-56-55.4-56-134Q500 708 556 652t134-56q78 0 134 55.867Q880 707.735 880 787q0 78.435-56 133.718Q768 976 690 976Z"></path></svg>
                <span className={`${inter.className} ${styles.subcategory}`}>Projects</span>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140 371v465h680V371L480 594Zm0-60 336-218H145l335 218ZM140 371v-55 520-465Z"/></svg>
                    <span className={`${inter.className} ${styles.subcategory}`}>Messages</span>
                </button>
            </div>
            <p className={`${inter.className} ${styles.category}`}>SETTINGS</p>
        </aside>
        <section>

        </section>
    </main>
  )
}

export default Dashboard;

/*
transform: scale(0.5);
    fill: #ffffff;

color: #ffffff;
padding: 0.25rem 2rem;
font-size: 0.8rem;
cursor: pointer;*/