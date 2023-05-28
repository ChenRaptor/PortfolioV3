import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export function Form({ flex, defaultValues, children, onSubmit, submitOnChange } : {defaultValues?: any, flex?: boolean, children: React.ReactNode, onSubmit: SubmitHandler<any>, submitOnChange?: boolean}) {
    const { handleSubmit, register, watch } = useForm({ defaultValues });
    const style = {
        display: flex ? 'flex' : undefined,
        gap: '20px'
    }

    submitOnChange ?
    useEffect(() => {
        // TypeScript users 
        // const subscription = watch(() => handleSubmit(onSubmit)())
        const subscription = watch(handleSubmit(onSubmit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])
    : null

    return (
      <form style={style} onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
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