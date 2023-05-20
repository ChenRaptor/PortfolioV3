import styles from './page.module.css'

export default function ProjectPage({ params }: { params: { slug: string } }) {
    return (
        <section className={styles.section}>
            <h2>{params.slug}</h2>
            <span>Status: No deployed</span>
        </section>
    );
}