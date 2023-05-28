import { useState } from 'react'
import ExpandMore from '../Icons/ExpandMore/main'
import styles from './main.module.scss'
import { useBoolean } from 'usehooks-ts'

function NewSelect ({defaultValues = 'Acended', options} : {defaultValues?: string, options: string[]}) {

    defaultValues ??= options[0]

    const [select, setSelect] = useState<string>(defaultValues)
    const { value, toggle } = useBoolean(false)

    return (
        <div className={styles.main}>

            <div className={styles['main-select-btn']} onClick={toggle}>
                <span>{select ? select : defaultValues}</span>
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
                                <li key={option} onClick={() => setSelect(option)}>{option}</li>
                            )
                        }
                    </ul>
                </div> : null
            }
        </div>
    )
}

export default NewSelect