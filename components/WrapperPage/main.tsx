"use client"
import { ParallaxProvider } from "react-scroll-parallax";
import NavAsideDashboard from "@/components/NavAside/NavAsideDashboard";
import NavAsideProjects from "@/components/NavAside/NavAsideProjects";
import NavAsideHome from "@/components/NavAside/NavAsideHome";
import ClientOption from "@/components/ClientOption/ClientOption";
import Logo from "@/components/Logo/Logo";
import styles from './main.module.css'

interface customCSSProperties extends React.CSSProperties {
    '--height': string;
}

const lib : {[key: string] : {
    component1: () => JSX.Element, 
    component2: JSX.Element,
    height: '1' | '2' | '3' | '4'
}} = {
    home: {
        component1: NavAsideHome,
        component2:         
        <>
            <div><p><span>SCROLL</span><span>DOWN</span></p></div>
            <div></div>
            <div></div>
        </>,
        height: '3',
    },
    projects: {
        component1: NavAsideProjects,
        component2: <></>,
        height: '1',
    },
    dashboard: {
        component1: NavAsideDashboard,
        component2: <></>,
        height: '3',
    }
}

function WrapperPage( { children, namePage } : {
    children: React.ReactElement,
    namePage: string
}) {

    const style: customCSSProperties = {
        '--height': lib[namePage].height,
    };

    return (
        <ParallaxProvider>
            <div className={styles.main} style={style}>
                <div>
                    <Logo/>
                    {(lib[namePage].component1)()}
                </div>
                {children}
                <div>
                    <ClientOption/>
                    {lib[namePage].component2}
                </div>
            </div>
        </ParallaxProvider>
    )

}


export default WrapperPage;