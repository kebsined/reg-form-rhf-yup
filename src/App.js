import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './components/input/Input';
import styles from './App.module.css';
import { useEffect, useRef } from 'react';

const validateScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[(\w_@.){6,}]*$/,
			'Invalid email! Valid symbols are: @, _, numbers, letters.',
		),

	password: yup
		.string()
		.matches(
			/^(((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).{8,})*$/,
			'Invalid password! It should be 8 or more symbols: at least one lowercase letter, one uppercase letter and number.',
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Entered passwords dont`t match.'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
		reset,
	} = useForm({
		defaultValues: { email: '', password: '', confirmPassword: '' },
		resolver: yupResolver(validateScheme),
		mode: 'onChange',
	});

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	const sendData = (formData) => {
		console.log(formData);
		reset();
	};

	return (
		<div className={styles.App}>
			<div className={styles.runLineTop}>RESULT SCHOOL</div>
			<form className={styles.form} onSubmit={handleSubmit(sendData)}>
				<Input
					type="email"
					name="email"
					placeholder="Enter your email..."
					register={register('email')}
					required="Email is required"
					onBlur={() => trigger('email')}
				/>
				{errors.email && (
					<span className={styles.error}>{errors.email.message}</span>
				)}
				<Input
					type="password"
					name="password"
					placeholder="Enter your password..."
					register={register('password')}
					required="Password is required"
					onBlur={() => trigger('password')}
				/>
				{errors.password && (
					<span className={styles.error}>{errors.password.message}</span>
				)}
				<Input
					type="password"
					name="confirmPassword"
					placeholder="Confirm your password..."
					register={register('confirmPassword')}
					required="Confirmed password is required"
					onBlur={() => trigger('confirmPassword')}
				/>
				{errors.confirmPassword && (
					<span className={styles.error}>{errors.confirmPassword.message}</span>
				)}
				<button
					type="submit"
					disabled={errors.message}
					className={styles.button}
					ref={submitButtonRef}
				>
					Create account
				</button>
			</form>
			<div className={styles.runLineBot}>RESULT SCHOOL</div>
		</div>
	);
};
