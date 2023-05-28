import { UseFormRegister } from 'react-hook-form';
import styles from './main.module.scss'

export function Select({ flex, register, options, name, ...rest }: { register?: UseFormRegister<any>, flex?: number, name: string, options: string[] }) {
    const style = {
        flex: flex ? flex : '1 1 0%',
    }
    return (
      <select className={styles.main} style={style} {...(register as UseFormRegister<any>)(name)} {...rest}>
        {options.map((value) => (
          <option key={`${name}-${value}`} value={value}>{value}</option>
        ))}
      </select>
    );
}