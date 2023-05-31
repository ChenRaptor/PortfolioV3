"use client"
import Spinner from '@/components/Display/Spinner/main';
import { useSession } from 'next-auth/react';

function BlogPage() {
    const { data: session, status: sessionStatus } = useSession();
  return (
    <Spinner/>
  );

}

export default BlogPage;