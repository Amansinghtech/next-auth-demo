import { NextResponse } from 'next/server'
import startDb from '@main/app/helper/db'
import UserModal from '@main/models/users'

interface NewUserRequest {
	name: string
	email: string
	password: string
}

interface NewUserResponse {
	id: string
	name: string
	email: string
	role: string
}

type NewResponse = NextResponse<{
	user?: NewUserResponse
	error?: string
}>

export const POST = async (req: Request): Promise<NewResponse> => {
	const body = (await req.json()) as NewUserRequest

	await startDb()

	const oldUser = await UserModal.findOne({ email: body.email })
	if (oldUser) {
		return NextResponse.json(
			{ error: 'User already exists' },
			{ status: 422 }
		)
	}

	const newUser = await UserModal.create({ ...body })
	return NextResponse.json(
		{
			user: {
				id: newUser._id.toString(),
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
			},
		},
		{ status: 201 }
	)
}
