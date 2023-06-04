"use client"
import { createContext, useEffect, useState } from 'react';
import { BlogContextType } from './main.d'

const BlogContext = createContext<BlogContextType | null>(null);

function BlogProvider ({children} : any) {
    const [data, setData] = useState<BlogContextType['data']>({
        value: [],
        valid: null,
        total: null
    })

    const getDataFromDb = async () => {
        const response = await (await fetch(`/api/mongodb/getters/blog`)).json()
        setData(response)
    }

    const getData = async (page: number = 0, nbByPage: number = 12, optionsSearch?: any) => {
        return await (await fetch(`/api/mongodb/getters/blog?page=${page}&&nbByPage=${nbByPage}${optionsSearch.regex ? `&&regex=${optionsSearch.regex}` : ''}`)).json() 
    }

    useEffect(() => {
        getDataFromDb()
    },[])


    return <BlogContext.Provider value={{data, getData}}>{children}</BlogContext.Provider>;

};


export type {
    BlogContextType
}

export {
    BlogContext
}

export default BlogProvider;