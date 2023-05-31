"use client"
import Button from '@/components/Input/Button/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import { useSession } from 'next-auth/react';
import styles from './page.module.scss';

function BlogArticlePage() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection currentPage='blog' controls={[
            <div key='fefrgth58' className={styles.controller}>
                <p>Last Activity: <time>5 days ago</time></p>
                { session?.user ? <Button style={{minWidth: '12rem'}}>Create a new article</Button> : null }
            </div>
        ]}>
        </ClassicLayout.FirstSection>
    </ClassicLayout>
  );
}

export default BlogArticlePage;