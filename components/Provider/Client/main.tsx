"use client"
import { createContext, useEffect, useMemo, useState } from 'react';
import { ClientContextType } from './main.d'
import { useWindowSize } from 'usehooks-ts';

const ClientContext = createContext<ClientContextType | null>(null);

function ClientProvider ({children} : any) {
    const {width, height} = useWindowSize()

    // const widthReal = useMemo(() => {
    //     if (width !== 0) {
    //         return width
    //     }
    // },[width])


    // // const [data, setData] = useState({
    // //     window: {
    // //         width: useMemo(() => {
    // //             if (width !== 0) {
    // //                 return width
    // //             }
    // //         height, 
    // //     }
    // // })

    

    // // useEffect(() => {
    // //     setData((prevState) => {
    // //         return {...prevState, window: {width: widthReal ?? , height}}
    // //     })
    // // },[width, height])
    
    return <ClientContext.Provider value={{...{window: { width, height }}}}>{children}</ClientContext.Provider>
};


export type {
    ClientContextType
}

export {
    ClientContext
}

export default ClientProvider;
