import { useSession } from 'next-auth/react';
import styles from './main.module.css'
import DateTime from '@/components/Display/DateTime/main';

export default function OverviewSection () {
    const { data: session, status: sessionStatus } = useSession();

    return (
        <section className={styles.section}>
            <div>
                <div className={styles.opp}>
                    <p className={styles.breadcrumb}>Dashbord - Overview</p>
                    <DateTime/>
                </div>
                <div className={styles.welcomer}>
                    <span>Welcome back,</span><span className={styles.bold}>{session?.user?.username}</span>
                </div>
            </div>
        </section>
    )
}
