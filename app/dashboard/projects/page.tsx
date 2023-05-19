"use client"
import Input from '@/components/Input/main'
import styles from './page.module.css'
import Button from '@/components/Button/main'
import { useContext } from 'react'
import { ProjectsContext } from '@/components/Provider/ProjectsProvider/main'
import TagLanguage from '@/components/TagLanguage/TagLanguage'

export default function ProjectsSection () {
    const projectsContext = useContext<any | null>(ProjectsContext) as any

    return (
        <section className={styles.section}>
            <div>
                <div className={styles.search}>
                    <Input/>
                    <Button>Language</Button>
                    <Button>Sort</Button>
                    <Button cta>Actualise</Button>
                </div>
            </div>

            <div className={styles.container}>
            {(projectsContext?.projects ?? []).map((project: any, index: any) => 
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
            </div>
        </section>
    )
}