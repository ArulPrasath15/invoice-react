import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

export default NextAuth({
    pages: {
        signIn: '/',
    },
    callbacks: {
        async signIn(user, account, profile) {
            return user
        },
        async redirect(url, baseUrl) {
            return baseUrl
        },
        async session(session, user) {
            session.user=user;
            // session.token=user.token;
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            const isUserSignedIn = !!user;
            if(isUserSignedIn) {
                token.jwt = user.token.toString();
            }
            return Promise.resolve(token);
        }
    },
    providers: [
        Providers.Credentials({
            id: "email-pass",
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await axios.post('/auth/login', credentials);
                // If no error and we have user data, return it
                console.log("Login response",res.data);
                if (res) {
                    return res.data;
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
        // ...add more providers here
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    jwt: {
        secret: "secret",
        encryption: true
    },
})