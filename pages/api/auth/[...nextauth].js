import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

const providers = [
    Providers.Credentials({
        id: "email-pass",
        credentials: {
            email: { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {

            try{
                const res = await axios.post(`${process.env.SERVER_URL}/auth/login`, req.query);
                if (res.data!==null) {
                    return res.data;
                }
                return Promise.reject('?authError=failed');
            }catch(err){

                return Promise.reject('?authError=Server Error! Please try again later');

            }
            // If no error and we have user data, return it
            // Return null if user data could not be retrieved
        }
    }),
    Providers.Google({
        id: "google",
        clientId: "58284380920-nsvt55760duphe8j5hsg4ngadb68jar1.apps.googleusercontent.com",
        clientSecret: "X-BhSI5Qfq1HAOEBKgVw9iTV",
        async profile(profile, tokens) {
            return {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                token:"sgjengijneijgegrehdrtyt"
            }
        },

    })
]

const callbacks = {
    async signIn(user, account, profile) {
        return user;
    },
    async session(session, user) {
        session.user=user;
        return session
    },
    async jwt(token, user) {
        if (user) {
            token.token = user.token;
            token.user = user.user;
        }
        return Promise.resolve(token);
    },
}

const options = {
    providers,
    callbacks,
    pages:{
        signIn:'/auth'
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    jwt: {
        secret: "secret",
        encryption: true
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options)

