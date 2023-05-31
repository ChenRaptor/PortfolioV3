"use client"
import styles from './page.module.css'
import SpanGroup from '@/components/display/SpanGroup/main';
import Font from '@/components/display/Font/main';
import { useContext, useEffect, useState } from 'react';
import ChartDonut from '@/components/chart/ChartDonut/main';
import { ProjectsContext } from '@/components/Provider/ProjectsProvider/main';

export default function ProjectPage({ params }: { params: { slug: string } }) {

    const [languages, setLanguages] = useState<{value: number, category: string}[]>()
    const projectsContext = useContext<any | null>(ProjectsContext) as any;

    const project = (projectsContext?.projects ?? []).filter((project:any) => project.name === params.slug)[0]

    const getLanguages = async () => {
        const languagesObject = await (await fetch(`/api/github/getLanguages?repos=${params.slug}`)).json();
        const languagesData = []
        for (const key in languagesObject) {
            languagesData.push({
                value: languagesObject[key], 
                category: key
            })
        }
        setLanguages(languagesData)
    }

    useEffect(() => {
        getLanguages()
    },[])

    return (
        <section className={styles.section}>
            <h2>{params.slug}</h2>

            <span>{project?.description}</span>

            <div className={styles.row}>
                <div className={styles.block}>
                    <h2>Information</h2>
                    <div>
                        <div className={styles.container}>
                            <SpanGroup textButton='Make it visible'><span>Visibility:</span><Font color='fade'>private (default: private)</Font></SpanGroup>
                            <SpanGroup onClick={() => fetch(`/api/deploy?name=${params.slug}`)} textButton='Deploy now'><span>Status:</span><Font color='fade'>not deployed</Font></SpanGroup>
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <h2>Languages</h2>
                    <div>
                        { languages ? <ChartDonut chartID='languagesChart' data={languages}/> : null }
                    </div>
                </div>
            </div>
        </section>
    );
}