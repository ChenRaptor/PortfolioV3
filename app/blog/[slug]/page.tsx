"use client"
import ClassicLayout from '@/components/Layout/Classic/main';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm'
import { BlogContext, BlogContextType } from '@/components/Provider/Blog/main';
import styles from './page.module.scss'
import remarkGemoji from 'remark-gemoji'

function BlogArticlePage({ params }: { params: { slug: string } }) {
  // const { data: session, status: sessionStatus } = useSession();

  const [data, setData] = useState<any>()
  const context = useContext<BlogContextType | null>(BlogContext)

  useEffect(() => {
      context?.getOneData(params.slug).then(val => {
        val.content = decodeURIComponent(escape(window.atob(val?.content))); 
        setData(val)
      })
  },[context])


  // const decodedString = atob(base64String)


  return (
    <ClassicLayout>
        <ClassicLayout.FirstSection>
          <div className={styles['markdown-wrapper']}>
            {
              data?.content ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkGemoji]}>
                {data?.content}
              </ReactMarkdown> : null
            }
          </div>
        </ClassicLayout.FirstSection>
    </ClassicLayout>
  );
}

export default BlogArticlePage;