import React from "react";
import Button from "@/components/Button/main";
import styles from './main.module.css'
export default function SpanGroup ({children,textButton} : {children: React.ReactNode, textButton: string}) {
    return (
        <div className={styles.main}><div>{children}</div><Button>{textButton}</Button></div>
    )
}