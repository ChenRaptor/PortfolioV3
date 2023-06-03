"use client"
import { createContext, useEffect, useState } from 'react';
import { ClientContextType } from './main.d'
import { useWindowSize } from 'usehooks-ts';

const ClientContext = createContext<ClientContextType | null>(null);

function ClientProvider ({children} : any) {
    const {width, height} = useWindowSize()
    const [data, setData] = useState({
        window: {
            width,
            height, 
        }
    })

    

    useEffect(() => {
        setData((prevState) => {
            return {...prevState, window: {width, height}}
        })
    },[width, height])
    
    return <ClientContext.Provider value={{...data}}>{children}</ClientContext.Provider>
};


export type {
    ClientContextType
}

export {
    ClientContext
}

export default ClientProvider;
