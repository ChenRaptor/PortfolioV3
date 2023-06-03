"use client"
import Button from '@/components/Input/Button/main';
import Heading from '@/components/Display/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import styles from './page.module.scss';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input/TextField/main';
import Select from '@/components/Input/Select/main';
import FormBar from '@/components/Input/FormBar/main';
import { useEffect, useState } from 'react';
import TagLanguage from '@/components/Display/TagLanguage/TagLanguage';
import Disposer from '@/components/Layout/Section/Disposer/main';

function BlogPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [repos, setRepos] = useState()
  const onSubmit = (e:any) => {console.log(e)};


  useEffect(() => {
    (async () => await (await fetch('/api/mongodb/getters/repos')).json())().then((res) => setRepos(res.value))
  },[])

  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection currentPage='projects' controls={[
            <div key='fefrgth58c' className={styles.controller}>
                <p>Last Activity: <time>5 days ago</time></p>
            </div>,
            <>
                <h1 key='fefrgth58cd' className={styles.AnnoncerTitle}>Welcome to my projects!</h1>
                <p key='fefrgth58cdd'>Here I present an overview of my most exciting projects and expertise in the web field.</p>
            </>
        ]}>

            
        <Heading type='h2'>Last article</Heading>
        <div className={styles.container}>
          <div className={styles.a1}></div>
          <div className={styles.a2}></div>
          <div className={styles.a3}></div>
          <div className={styles.a4}></div>
        </div>
        </ClassicLayout.FirstSection>
        <ClassicLayout.Section>
          <Heading type='h2'>Other article</Heading>
            <Disposer type='projects'/>



        {/* <div className={styles['flex-container']}>
        {(repos ?? []).map((project: any, index: number) => 
                    <div key={index}>
                        <div>
                            <h3>{`${project.name} (${project.visibility})`}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className={styles.tags}>
                            { project.language ? <TagLanguage language={project.language}/> : null }<p className={styles.updated}>{`Updated at: ${project.updated_at}`}</p>
                        </div>
                    </div>
            )}
        </div> */}


        </ClassicLayout.Section>
    </ClassicLayout>
  );
}

export default BlogPage;