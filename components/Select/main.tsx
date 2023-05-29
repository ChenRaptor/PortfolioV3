"use client"
import { useState } from 'react'
import ExpandMore from '../Icons/ExpandMore/main'
import styles from './main.module.scss'
import { useBoolean } from 'usehooks-ts'
import { Controller } from "react-hook-form";

function Select ({defaultValues, options, control, name, flex} : {flex?: number, defaultValues?: string, options: {value: string, label: string}[], control?: any, name: string }) {

    defaultValues ??= options[0].value
    const [select, setSelect] = useState<string>(defaultValues)
    const { value, toggle } = useBoolean(false)

    return (
            <Controller
            render={({ field }) => (
            <div className={styles.main} style={flex ? {flex: flex} : {}}>

                <input {...field} type="hidden" value={select}/>

                <div className={styles['main-select-btn']} onClick={toggle}>
                    <span>{ options.filter((option) => option.value === select)[0].label }</span>
                    <ExpandMore/>
                </div>
                {
                    value ?
                    <div className={styles['main-content']}>
                        <div className={styles.search}>
                            <input type="text" placeholder="Search"/>
                        </div>
                        <ul className={styles.options}>
                            {
                                (options ?? []).map(option => 
                                    <li key={option.value} onClick={() => { field.onChange(option.value); setSelect(option.value) }}>{option.label}</li>
                                )
                            }
                        </ul>
                    </div> : null
                }
            </div>)}
            name={name}
            control={control}
            defaultValue={defaultValues}
            />


    )

}

export default Select

// <Controller
// render={({ field }) => (
//   <Select field={field} options={[{
//     value: 'female',
//     label: 'Female' 
//   },{
//     value:'male',
//     label:'Male'
//   },{
//     value: 'other',
//     label: 'Other'
//   }]}/>
// )}
// name="select"
// control={control}
// />