import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		session: async ({ session, token, newSession, user }) => {
			console.log('session', session)
			return Promise.resolve(session)
		},
		jwt: async ({ token, user, account, profile }) => {
			console.log('jwt', token)
			return Promise.resolve(token)
		},
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		// ...add more providers here
	],
})

export { handler as GET, handler as POST }
