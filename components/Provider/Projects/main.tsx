"use client"
import { createContext, useEffect, useState } from 'react';
import { ProjectsContextType } from './main.d'

const ProjectsContext = createContext<ProjectsContextType | null>(null);

function ProjectsProvider ({children} : any) {
    const [data, setData] = useState<ProjectsContextType['data']>({
        value: [],
        valid: null,
        total: null

    })

    const getDataFromDb = async (page: number = 0, nbByPage: number = 30) => {
        const response = await (await fetch(`/api/mongodb/getters/repos?page=${page}&&nbByPage=${nbByPage}`,{cache: 'no-store'})).json()
        setData(response)
    }

    const getData = async (page: number = 0, nbByPage: number = 12, optionsSearch?: any) => {
        return await (await fetch(`/api/mongodb/getters/repos?page=${page}&&nbByPage=${nbByPage}${optionsSearch.regex ? `&&regex=${optionsSearch.regex}` : ''}`,{cache: 'no-store'})).json() 
    }

    const getOneData = async (repo: string) => {
        return await (await fetch(`/api/mongodb/getters/repos/${repo}`,{cache: 'no-store'})).json()
    }




    useEffect(() => {
        getDataFromDb()
    },[])

    return <ProjectsContext.Provider value={{data, getDataFromDb, getData, getOneData}}>{children}</ProjectsContext.Provider>;

};


export type {
    ProjectsContextType
}

export {
  ProjectsContext
}

export default ProjectsProvider;
