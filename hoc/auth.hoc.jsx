import { useSession,getSession } from "next-auth/client"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const [auth, setAuth] = useState(false);
        useEffect(async () => {
                const session = await getSession();
                if (session) {
                    console.log("session",session.user);
                    if(!session?.user.user.hasBusiness && Router.pathname !== '/new'){
                        Router.replace("/new")
                    }else{
                        setAuth(true);
                    }
                } else {
                    Router.replace("/");
                }

        }, []);

        if (auth) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withAuth;