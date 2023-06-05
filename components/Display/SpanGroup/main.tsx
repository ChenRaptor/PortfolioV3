import React from "react";
import styles from './main.module.css'
import Button from "@/components/Input/Button/main";
export default function SpanGroup ({children, textButton, onClick} : {children: React.ReactNode, textButton: string, onClick?: any}) {
    return (
        <div className={styles.main}><div>{children}</div><Button onClick={onClick}>{textButton}</Button></div>
    )
}