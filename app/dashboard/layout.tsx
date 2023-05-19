"use client"
import styles from './layout.module.css'
import DashboardLink from '@/components/DashboardLink/main';
import DashboardLinkWrapper from '@/components/DashboardLinkWrapper/main';
import BoxIcon from '@/components/Icons/box/main';
import IconLink from '@/components/IconLink/main';


export default function DashboardLayout ({children} : {children: React.ReactNode}) {
    return (
        <main className={styles.main}>
            <aside>
                <div className={styles.wrapperlogo}>
                    <IconLink icon='arrowleft' link='/'/>
                    <div className={styles.logo}>
                        <BoxIcon/>
                    </div>
                    <p>Dashboard</p>
                </div>


                <DashboardLinkWrapper sectionName='ADMINISTRATOR'>
                    <DashboardLink icon='home' link='/dashboard/overview' name='Overview'/>
                    <DashboardLink icon='project' link='/dashboard/projects' name='Projects'/>
                    <DashboardLink icon='message' link='/dashboard/messages' name='Messages'/>
                </DashboardLinkWrapper>

                <DashboardLinkWrapper sectionName='SETTINGS'> </DashboardLinkWrapper>

            </aside>
            {children}
        </main>
    )
}