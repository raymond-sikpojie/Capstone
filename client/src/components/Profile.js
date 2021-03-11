import React, {useEffect} from 'react'
import {useAuth0} from "@auth0/auth0-react"



export default function Profile() {
    const {user, isAuthenticated} = useAuth0()

    useEffect(() => {

        if (isAuthenticated) {
         console.log("component did mount")
        
        //  const request = await fetch("https://5y0jnmttzk.execute-api.us-east-1.amazonaws.com/dev/loan", {
        //     method: "POST",
        //     credentials: "same-origin",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(user),
        //   });
        
        //   const responseData = await request.json();
        
        //   if (request.status === 200) {
        //       console.log(responseData)
        //   }

        const getLoans = async () => {
            const request = await fetch("https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan", {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.sub
                },
            
            })
            const responseData = await request.json()
            console.log(responseData);
        }

        getLoans()

        }
        


    })

    

    return (
        isAuthenticated ? 
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.sub}</p>
            {JSON.stringify(user)}
        </div>: null
    )
}
