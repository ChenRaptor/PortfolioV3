"use client"
import { createContext, useEffect, useState } from 'react';

const ProjectsContext = createContext<any | null>(null);




function ProjectsProvider ({children} : any) {
  
  
  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async () => await (await fetch('/api/db')).json())().then((val) => setProjects(val))
  },[])

  return <ProjectsContext.Provider value={{projects}}>{children}</ProjectsContext.Provider>;

};


export type {

}

export {
  ProjectsContext
}

export default ProjectsProvider;
