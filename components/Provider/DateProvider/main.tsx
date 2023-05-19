"use client"

import { createContext, useEffect, useState } from 'react';
import { DateContextType } from './type';

const DateContext = createContext<DateContextType | null>(null);

function DateProvider ({children} : any) {

  const [value, setValue] = useState<DateContextType['value']>({
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    offdays: {
      "2025-01-01": "Jour de l'an",
      "2025-04-21": "Lundi de Pâques",
      "2025-05-01": "Fête du Travail",
      "2025-05-08": "Victoire des alliés",
      "2025-05-29": "Ascension",
      "2025-06-09": "Lundi de Pentecôte",
      "2025-07-14": "Fête Nationale",
      "2025-08-15": "Assomption",
      "2025-11-01": "Toussaint",
      "2025-11-11": "Armistice",
      "2025-12-25": "Noël"
    },
    dateObject: new Date(),
  })

  // CALL API DAYOFF

  // useEffect(() => {
  //   (async () => await (await  fetch(`https://calendrier.api.gouv.fr/jours-feries/metropole/${value.dateObject.getFullYear()}.json`)).json())().then((val) => 
  //   setValue((prevState : any) => {return {...prevState, offdays: val}}))
  // },[])
  



  const getFullDate = () => {
    return `${value.days[value.dateObject.getDay() - 1]}, ${value.dateObject.getDate()} ${value.months[value.dateObject.getMonth()]}, ${value.dateObject.getFullYear()}`;
  }

  const isOffDay = () => {
    return value.offdays[`${value.dateObject.getFullYear()}-${(value.dateObject.getMonth() + 1).toString().length === 2 ? (value.dateObject.getMonth() + 1) : '0' + (value.dateObject.getMonth() + 1)}-${(value.dateObject.getDate()).toString().length === 2 ? value.dateObject.getDate() : '0' + value.dateObject.getDate()}` as any];
  }

  const getNumericDate = () => {{
    return `${value.dateObject.getFullYear()}-${(value.dateObject.getMonth() + 1).toString().length === 2 ? (value.dateObject.getMonth() + 1) : '0' + (value.dateObject.getMonth() + 1)}-${(value.dateObject.getDate()).toString().length === 2 ? value.dateObject.getDate() : '0' + value.dateObject.getDate()}`
  }}

  return <DateContext.Provider value={{value, getFullDate, isOffDay, getNumericDate}}>{children}</DateContext.Provider>;
};


export type {
  DateContextType
}

export {
  DateContext
}

export default DateProvider;
