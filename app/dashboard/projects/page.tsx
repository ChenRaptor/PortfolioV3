"use client"
import Input from '@/components/Input/TextField/main'
import styles from './page.module.css'
import Button from '@/components/Input/Button/main'
import { useContext, useEffect } from 'react'
import { ProjectsContext } from '@/components/Provider/Projects/main'
import TagLanguage from '@/components/Display/TagLanguage/TagLanguage'
import { useRouter } from 'next/navigation';

export default function ProjectsSection () {
    const projectsContext = useContext<any | null>(ProjectsContext) as any

    const router = useRouter();
    useEffect(() => {
        console.log(projectsContext.projects)
      },[projectsContext])

    return (
        <section className={styles.section}>
            <div>
                <div className={styles.search}>
                    <Button>Language</Button>
                    <Button>Sort</Button>
                    <Button cta>Actualise</Button>
                </div>
            </div>

            <div className={styles.container}>
            {(projectsContext?.projects ?? []).map((project: any, index: number) => 
                    <div key={index} onClick={() => router.push(`/dashboard/projects/${project.name}`)}>
                        <div>
                            <h3>{`${project.name} (${project.visibility})`}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className={styles.tags}>
                            { project.language ? <TagLanguage language={project.language}/> : null }<p className={styles.updated}>{`Updated at: ${project.updated_at}`}</p>
                        </div>
                    </div>
            )}
            </div>
        </section>
    )
}