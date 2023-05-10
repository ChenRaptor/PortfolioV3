"use client"
import { ParallaxProvider } from "react-scroll-parallax";
import ClientOption from "../../ClientOption/ClientOption";
import NavAside from "../../NavAside/NavAside";
import Logo from "../../Logo/Logo";
//import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "../Buttons/Buttons";

export default function WrapperClient({children} : any) {
    return (
        <ParallaxProvider>
        <div className='main-app'>
          {/* <div className='popup'>
            <form>
              <input type='text'></input>
              <input type='password'></input>
            </form>
          </div> */}
          <div className='main-app-whitespace menu'>
            <Logo/>
            <NavAside/>
            {/* <LoginButton />
            <RegisterButton />
            <LogoutButton />
            <ProfileButton /> */}
          </div>
          {children}
          <div className='main-app-whitespace index'>
            <ClientOption/>
            <div><p><span>SCROLL</span><span>DOWN</span></p></div>
            <div></div>
            <div></div>
          </div>
        </div>
        </ParallaxProvider>
    )
}