import { useSession,getSession } from "next-auth/client"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//TODO: check if the new business in available in hoc
const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [auth, setAuth] = useState(false);
        useEffect( () => {
            (async ()=>{
                const session = await getSession();
                console.log(session);
                if (session) {
                    // if(router.pathname !== '/new'){
                    //     await router.replace("/new")
                    // }else{
                        setAuth(true);
                    // }
                } else {
                    await router.replace("/");
                }
            })();
        }, [router]);

        if (auth) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withAuth;