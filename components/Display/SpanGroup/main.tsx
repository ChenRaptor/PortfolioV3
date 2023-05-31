import React from "react";
import Button from "@/components/input/Button/main";
import styles from './main.module.css'
export default function SpanGroup ({children, textButton, onClick} : {children: React.ReactNode, textButton: string, onClick?: any}) {
    return (
        <div className={styles.main}><div>{children}</div><Button onClick={onClick}>{textButton}</Button></div>
    )
}