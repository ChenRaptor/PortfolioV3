"use client"
import Heading from '@/components/Display/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import styles from './page.module.scss';
import Disposer from '@/components/Layout/Section/Disposer/main';
import Display from '@/components/Layout/Section/Display/main';

function ProjectsPage() {


  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection options={{display_activity: true}}>
            <div className={styles.printer}>
                <div>
                    <h1 className={styles.AnnoncerTitle}>Welcome to my projects!</h1>
                    <p>Here I present an overview of my most exciting projects and expertise in the web field.</p>
                </div>
                <Heading type='h2'>Last article</Heading>
                <Display/>
            </div>
        </ClassicLayout.FirstSection>
        <ClassicLayout.Section>

            <Heading type='h2'>Other article</Heading>
            <Disposer type='projects'/>

        </ClassicLayout.Section>
    </ClassicLayout>
  );
}

export default ProjectsPage;