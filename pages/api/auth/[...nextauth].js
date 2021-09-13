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
                    console.log("Auth successful")
                    return res.data;
                }
                return Promise.reject('?authError=failed');
            }catch(err){
                console.log(err)
                return Promise.reject('?authError=Server Error! Please try again later');

            }
            // If no error and we have user data, return it
            // Return null if user data could not be retrieved
        }
    }),
    Providers.Google({
        id: "google",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        async profile(profile, tokens) {
            let params = {token:tokens.idToken,email:profile.email}
            try{
                const res = await axios.post(`${process.env.SERVER_URL}/auth/oauth/google`,params);
                if(res.status === 200){
                    let {user,token} = res.data;
                    return {
                        id: user._id,
                        name: user._fname,
                        email: user.email,
                        token:token,
                        user:JSON.stringify(user)
                    }
                }
                return null;
            }catch (e) {
                console.log(e);
                return null;
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
            if(typeof user.user === typeof "")
                token.user = JSON.parse(user.user);
            else
                token.user = user.user;
        }
        return Promise.resolve(token);
    },
}

const options = {
    providers,
    callbacks,
    pages:{
        signIn:'/auth',
        signOut: '/logout',
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

