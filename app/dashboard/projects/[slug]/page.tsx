"use client"
import styles from './page.module.css'
import { useContext, useEffect, useState } from 'react';
import { ProjectsContext, ProjectsContextType } from '@/components/Provider/Projects/main';
import SpanGroup from '@/components/Display/SpanGroup/main';
import ChartDonut from '@/components/Chart/ChartDonut/main';
import Font from '@/components/Display/Font/main';

export default function ProjectPage({ params }: { params: { slug: string } }) {

    const [data, setData] = useState<any>()
    const context = useContext<ProjectsContextType | null>(ProjectsContext)

    useEffect(() => {
        context?.getOneData(params.slug).then(val => {console.log(val); setData(val)})
    },[context])

    return (
        <section className={styles.section}>
            <h2>{params.slug}</h2>

            <span>{data?.description}</span>

            <div className={styles.row}>
                <div className={styles.block}>
                    <h2>Information</h2>
                    <div>
                        <div className={styles.container}>
                            <SpanGroup textButton='Make it visible'><span>Visibility:</span><Font color='fade'>private (default: private)</Font></SpanGroup>
                            <SpanGroup onClick={() => {} /*fetch(`/api/deploy?name=${params.slug}`)*/} textButton='Deploy now'><span>Status:</span><Font color='fade'>not deployed</Font></SpanGroup>
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <h2>Languages</h2>
                    <div>
                        { data?.languages_distribution ? <ChartDonut chartID='languagesChart' data={data?.languages_distribution}/> : null }
                    </div>
                </div>
            </div>
        </section>
    );
}