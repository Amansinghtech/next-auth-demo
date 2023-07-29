'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'

function Login() {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
	}>()

	const onSubmit = handleSubmit((data) => {
		signIn('credentials', {
			...data,
			redirect: false,
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	})

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '80vh',
			}}
		>
			<div className="flex flex-col space-y-10">
				<h1>Login Page </h1>

				<form onSubmit={onSubmit}>
					<div className="flex flex-col space-y-4">
						<input
							{...register('email')}
							type="email"
							placeholder="email"
							className="border-2 border-gray-700 rounded-md p-2 bg-black"
						/>

						<input
							{...register('password')}
							type="password"
							placeholder="password"
							className="border-2 border-gray-700 rounded-md p-2 bg-black"
						/>
						<input type="submit" value="Login" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
