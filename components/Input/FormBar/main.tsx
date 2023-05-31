import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './main.module.scss'

export default function Form({defaultValues, children, onSubmit, submitOnChange, flex } : {
  defaultValues?: any, 
  children: React.ReactNode, 
  onSubmit: SubmitHandler<any>, 
  submitOnChange?: boolean
  flex?: boolean
}) {
    const { handleSubmit, register, watch, control } = useForm({ defaultValues });


    useEffect(() => {
      if(submitOnChange) {
        // TypeScript users 
        // const subscription = watch(() => handleSubmit(onSubmit)())
        const subscription = watch(handleSubmit(onSubmit));
        return () => subscription.unsubscribe();
      }
    }, [handleSubmit, watch])




    return (
      <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => 
          { return child.props.name
                ? React.createElement(child.type, {
                    ...{
                        ...child.props,
                        control,
                        register,
                        key: child.props.name
                      }
                })
                : child;
            })
          : children}
      </form>
    );
}