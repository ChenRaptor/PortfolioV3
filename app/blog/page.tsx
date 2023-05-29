"use client"
import Button from '@/components/Button/main';
import Heading from '@/components/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input/main';
import Select from '@/components/Select/main';
import FormBar from '@/components/FormBar/main';


const CSRCanvas = dynamic(
  () => import('@/components/scene3D/scene3D'),
  { ssr: false }
)

function BlogPage() {
  const { data: session, status: sessionStatus } = useSession();

  const onSubmit = (e:any) => {e.preventDefault; console.log(e)};

  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection currentPage='blog' controls={
          <div className={styles.controller}>
            <p>Last Activity: <time>5 days ago</time></p>
            {
              session?.user ? <Button style={{minWidth: '12rem'}}>Create a new article</Button> : null
            }
          </div>
        }>
          <h1 className={styles.AnnoncerTitle}>Welcome to my blog!</h1>

          <p>This is where I share my web development journey, my thoughts and experiences in the exciting world of website and web application creation.</p>
        <Heading type='h2'>Last article</Heading>
        <div className={styles.container}>
          <div className={styles.a1}></div>
          <div className={styles.a2}></div>
          <div className={styles.a3}></div>
          <div className={styles.a4}></div>
        </div>
        </ClassicLayout.FirstSection>
        <ClassicLayout.Section>
          <Heading type='h2'>Other article</Heading>
          <FormBar onSubmit={onSubmit} submitOnChange>
            <Input flex={5} placeholder='search' name="search" />
            <Select flex={1} options={[{
                value: 'female',
                label: 'Female' 
                },{
                value:'male',
                label:'Male'
                },{
                value: 'other',
                label: 'Other'
            }]}
            name="sort"/>
            <Select flex={1} options={[{
                value: 'female',
                label: 'Female' 
                },{
                value:'male',
                label:'Male'
                },{
                value: 'other',
                label: 'Other'
            }]}
            name="keyword"/>
            <input hidden type="submit" />
        </FormBar>
        <div className={styles['flex-container']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.pagination}>
            <div></div>
        </div>

        </ClassicLayout.Section>
    </ClassicLayout>
  );
}

export default BlogPage;

//submitOnChange