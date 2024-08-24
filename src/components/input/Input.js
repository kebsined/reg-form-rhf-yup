import React, { forwardRef } from 'react';
import styles from './Input.module.css';
export const Input = forwardRef(({ register, name, ...props }, ref) => {
	return <input {...props} ref={ref} className={styles.input} {...register} />;
});
