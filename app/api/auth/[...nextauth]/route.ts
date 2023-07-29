import startDb from '@main/app/helper/db'
import UserModal from '@main/models/users'
import NextAuth, { User } from 'next-auth'
import CredentialsProvider, {
	CredentialInput,
} from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		session: async ({ session, token, newSession, user }) => {
			console.log(user)
			return Promise.resolve(session)
		},
		jwt: async ({ token, user, account, profile }) => {
			return Promise.resolve(token)
		},
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				await startDb()
				const existingUser = await UserModal.findOne({
					email: credentials?.email,
				})
				console.log('authorize', credentials, existingUser)
				if (!existingUser) {
					return Promise.reject(new Error('No User Found'))
				}

				const passwordTest = await existingUser.comparePassword(
					credentials?.password!
				)
				if (!passwordTest) {
					return Promise.reject(new Error('Invalid Password'))
				}

				return {
					id: existingUser._id.toString(),
					email: existingUser.email,
					name: existingUser.name,
					image: existingUser.image,
					role: existingUser.role,
				}
			},
		}),
		// ...add more providers here
	],
})

export { handler as GET, handler as POST }
