"use client"
import { ParallaxProvider } from "react-scroll-parallax";
import ClientOption from "../../ClientOption/ClientOption";
import NavAsideHome from "../../NavAside/NavAsideHome";
import Logo from "../../Logo/Logo";
import NavAsideDashboard from "@/components/NavAside/NavAsideDashboard";

export default function WrapperClient({children,segment} : any) {

    let listMenu : { [key: string] : () => JSX.Element } = {
      __PAGE__: NavAsideHome,
      dashboard: NavAsideDashboard
    }

    let listIndex : { [key: string] : JSX.Element } = {
      __PAGE__: 
      <>
        <div><p><span>SCROLL</span><span>DOWN</span></p></div>
        <div></div>
        <div></div>
      </>,
      dashboard: 
      <>
        <div><p><span>OVERVIEW</span></p></div>
        <div><p><span>INSIGHTS</span></p></div>
        <div><p><span>CONTENTS</span></p></div>
      </>,
    }

    return (
        <ParallaxProvider>
        <div className='main-app'>
          <div className='main-app-whitespace menu'>
            <Logo/>
            {(listMenu[segment])()}
          </div>
          {children}
          <div className='main-app-whitespace index'>
            <ClientOption/>
            {listIndex[segment]}
          </div>
        </div>
        </ParallaxProvider>
    )
}
