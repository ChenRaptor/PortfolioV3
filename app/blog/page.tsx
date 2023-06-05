"use client"
import Button from '@/components/Input/Button/main';
import Heading from '@/components/Display/Heading/main';
import ClassicLayout from '@/components/Layout/Classic/main';
import styles from './page.module.scss';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input/TextField/main';
import Select from '@/components/Input/Select/main';
import FormBar from '@/components/Input/FormBar/main';
import { useEffect, useState } from 'react';
import Disposer from '@/components/Layout/Section/Disposer/main'

function BlogPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [blogs, setBlogs] = useState()

  const onSubmit = (e:any) => {console.log(e)};

  useEffect(() => {
    (async () => await (await fetch('/api/mongodb/getters/blog')).json())().then((res) => setBlogs(res))
  },[])

  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection>

            
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
          <Disposer type="blog"/>
        </ClassicLayout.Section>
    </ClassicLayout>
  );
}

export default BlogPage;

//submitOnChange