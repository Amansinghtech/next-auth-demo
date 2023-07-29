'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

function SignUp() {
	const { register, handleSubmit } = useForm<{
		name: string
		email: string
		password: string
	}>()

	const onSubmit = handleSubmit(async (data) => {
		const res = await fetch('/api/auth/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err))
		console.log(res)
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
				<h1>Sign Up</h1>

				<form onSubmit={onSubmit}>
					<div className="flex flex-col space-y-4">
						<input
							{...register('name')}
							type="text"
							placeholder="name"
							className="border-2 border-gray-700 rounded-md p-2 bg-black"
						/>
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
						<input type="submit" value="Sign Up" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp
