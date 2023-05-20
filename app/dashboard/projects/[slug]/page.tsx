"use client"
import styles from './page.module.css'
import SpanGroup from '@/components/SpanGroup/main';
import Font from '@/components/Font/main';
import { useEffect, useState } from 'react';
import ChartDonut from '@/components/ChartDonut/main';

export default function ProjectPage({ params }: { params: { slug: string } }) {

    const [languages, setLanguages] = useState<{value: number, category: string}[]>()

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

            <span>Languages</span>
            <div className={styles.languages}>
                { languages ? <ChartDonut chartID='oklp' data={languages}/> : null}
            </div>
            <SpanGroup textButton='Make it visible'><span>Visibility:</span><Font color='fade'>private (default: private)</Font></SpanGroup>
            <SpanGroup textButton='Deploy now'><span>Status:</span><Font color='fade'>not deployed</Font></SpanGroup>
        </section>
    );
}