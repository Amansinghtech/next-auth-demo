'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

function Header() {
	const { data: session, status } = useSession()
	return (
		<div className="flex flex-row justify-between bg-neutral-900 p-4 items-center">
			<h1>Next Auth Demo </h1>

			{status === 'authenticated' ? (
				<div className="flex flex-row space-x-2 items-center">
					<Image
						alt="profile"
						src={session.user?.image || ''}
						width={32}
						height={32}
						className="rounded-full"
					/>

					<p className="text-neutral-300">
						Welcome! {session?.user?.name}
					</p>
					<button
						onClick={() =>
							signOut({
								redirect: true,
								callbackUrl: '/login',
							})
						}
						className="bg-neutral-600 hover:bg-primary-600 text-white py-2 px-4 rounded-full hover:bg-neutral-700"
					>
						Sign Out
					</button>
				</div>
			) : (
				<button
					onClick={() => signIn('github')}
					className="bg-neutral-600 hover:bg-primary-600 text-white py-2 px-4 rounded-full hover:bg-neutral-700"
				>
					Sign In
				</button>
			)}
		</div>
	)
}

export default Header
