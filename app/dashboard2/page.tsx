"use client"
import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { signOut, useSession } from 'next-auth/react';
import WrapperPage from '@/components/Wrapper/Page/main';
import { useContext, useEffect } from 'react';
import { ProjectsContext } from '@/components/Provider/ProjectsProvider/main';
import TagLanguage from '@/components/TagLanguage/TagLanguage';

const inter = Inter({ subsets: ['latin'] })

const languages = {
    TypeScript: {
        color: 0x0066ff30,
        backcolor: 0x92b9ff
    },
    JavaScript: {
        color: 0x0066ff30,
        backcolor: 0x92b9ff
    },
    CSS: {
        color: 0x0066ff30,
        backcolor: 0x92b9ff
    },
    PHP: {
        color: 0x49dae130,
        backcolor: 0x09ffdd
    }
}

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
    <WrapperPage namePage='dashboard'>
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


            {(projectsContext?.projects ?? []).map((project: any, index: any) => 
                <div key={index}>
                    <h3 className={styles['project-heading']}>
                        {`${project.name} (${project.visibility})`}
                    </h3>
                    <div>
                        {project.description}
                    </div>
                    <div className={styles.tags}>
                        { project.language ? <TagLanguage language={project.language}/> : null }<p>{`Updated at: ${project.updated_at}`}</p>
                    </div>
                </div>
            )}


          <div>
            
          </div>
          <div>
          
          </div>
        </div>
        <div className={styles.form}>
            <input type='text' className='input f8'></input>
            <button className='btn f1'>Language</button>
            <button className='btn f1'>Sort</button>
            <button className='btn-cta f2' onClick={getMyRepositories}>Actualise</button>
        </div>
        <div className={styles.other}>
          <h2>Add new project</h2>
        </div>
      </div>
      </section>
    </main>
    </WrapperPage>
  )
}

export default Dashboard;