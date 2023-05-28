"use client"
import Button from '@/components/Button/main';
import Font from '@/components/Font/main';
import Heading from '@/components/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import { Parallax } from 'react-scroll-parallax';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import DateTime from '@/components/DateTime/main';
import { useSession } from 'next-auth/react';
import Flex from '@/components/Flex/main';
import Input from '@/components/Input/main';
import { Form } from '@/components/Form/main';
import { Select } from '@/components/Select/main';
import NewSelect from '@/components/NewSelect/main';

const CSRCanvas = dynamic(
  () => import('@/components/scene3D/scene3D'),
  { ssr: false }
)

function BlogPage() {
  const { data: session, status: sessionStatus } = useSession();

  const onSubmit = (data:any) => console.log(data);

  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection currentPage='blog' controls={
          <div className={styles.controller}>
            <p>Last Activity: <time>5 days ago</time></p>
            {
              session?.user ? <Button cta style={{minWidth: '12rem'}}>Create a new article</Button> : null
            }
          </div>
        }>
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
            <Form flex onSubmit={onSubmit} submitOnChange>
              <Input flex={5} name="search" />
              <Select flex={2} name="sex" options={["female", "male"]} />
              <button>Submit</button>
            </Form>
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
            <NewSelect options={['Opt1','Opt2','Opt3']}/>

        </ClassicLayout.Section>
        <ClassicLayout.Section>

        </ClassicLayout.Section>
    </ClassicLayout>
  );
}

export default BlogPage;