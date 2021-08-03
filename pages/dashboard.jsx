import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

 function Dashboard() {

     const router = useRouter()
     useEffect(() => {
         router.prefetch('/Client')
         router.prefetch('/Invoice')
         router.prefetch('/Auth')
     }, [router])

     return (
        <div>
                <h1 align={"center"} style={{paddingTop:'40vh'}}>I'm Dashboard</h1>
        </div>
    );
}

export default Dashboard