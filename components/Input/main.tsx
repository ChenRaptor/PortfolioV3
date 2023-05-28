import { UseFormRegister } from 'react-hook-form';
import styles from './main.module.scss'

export default function Input({ register, name, flex, ...rest } : { register?: UseFormRegister<any>, flex?: number, name: string }) {
    const style = {
        flex: flex ? flex : '1 1 0%',
    }
    return <input style={style} className={styles.main} {...(register as UseFormRegister<any>)(name)} {...rest} />;
}