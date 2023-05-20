"use client"
import { ParallaxProvider } from "react-scroll-parallax";
import ClientOption from "../../ClientOption/ClientOption";
import NavAsideHome from "../../NavAside/NavAsideHome";
import Logo from "../../Logo/Logo";
import NavAsideDashboard from "@/components/NavAside/NavAsideDashboard";
import NavAsideProjects from "@/components/NavAside/NavAsideProjects";




export default function WrapperPage({children,namePage} : any) {

    const listMenu : { [key: string] : () => JSX.Element } = {
      home: NavAsideHome,
      dashboard: NavAsideDashboard,
      projects: NavAsideProjects,
      dashboard_addproject: () => <></>,
    }

    const listIndex : { [key: string] : JSX.Element } = {
        home: 
        <>
            <div><p><span>SCROLL</span><span>DOWN</span></p></div>
            <div></div>
            <div></div>
        </>,
        projects: 
        <>
          <div></div>
        </>,
        dashboard: 
        <>
            <div><p><span>OVERVIEW</span></p></div>
            <div><p><span>INSIGHTS</span></p></div>
            <div><p><span>CONTENTS</span></p></div>
        </>,
        dashboard_addproject: <></>,
    }

    return (
        <ParallaxProvider>
        <div className='main-app'>
          <div className='main-app-whitespace menu'>
            <Logo/>
            {(listMenu[namePage])()}
          </div>
          {children}
          <div className='main-app-whitespace index'>
            <ClientOption/>
            {listIndex[namePage]}
          </div>
        </div>
        </ParallaxProvider>
    )
}
