import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from "axios";

const providers = [
    Providers.Credentials({
        id: "email-pass",
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            try{

                const res = await axios.post('/auth/login', credentials);
                if (res) {
                    return res.data;
                }
                return null
            }catch(err){
                return null;
            }
            // If no error and we have user data, return it
            // Return null if user data could not be retrieved
        }
    }),
    Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })    
]

// use below command to bind local http to remote https (facebook testing):
// ngrok http -bind-tls=true --host-header="localhost:80" 4200
// use ngrok https domain as facebook only accepts req from https domains

const callbacks = {
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
}

const options = {
    providers,
    // callbacks,
    pages:{
        error:'/'
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

