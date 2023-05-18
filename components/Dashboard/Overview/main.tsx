import styles from './main.module.css'

export default function OverviewSection () {
    return (
        <section className={styles.section}>
            <div>
                <div className={styles.opp}>
                    <p className={styles.breadcrumb}>Dashbord - Overview</p>
                    <p>Tuesday, 11 september, 2023</p>
                </div>
                <div className={styles.welcomer}>
                    <span>Welcome back,</span><span className={styles.bold}>ChenRaptor</span>
                </div>
                {/*
                <div className={styles.opp}>
                    <p style={{color: '#525b62'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur voluptas veniam pariatur recusandae dicta eum, odit unde neque ad dolor ipsam magni at veritatis.</p>
                    <div></div>
                </div>
                */}
            </div>

            {/*
            <div className={styles.container}>
                <div className={styles.a1}></div>
                <div className={styles.a2}></div>
                <div className={styles.a3}></div>
                <div className={styles.a4}></div>
                <div className={styles.a5}></div>
                <div className={styles.a6}></div>
                <div className={styles.a7}></div>
                <div className={styles.a8}></div>
                <div className={styles.a9}></div>
                <div className={styles.a10}></div>
            </div>
            */}
        </section>
    )
}