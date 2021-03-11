import React, {useState} from 'react'
import {useAuth0} from "@auth0/auth0-react"

export default function Profile() {
    const {user, isAuthenticated} = useAuth0()

    // componentDidMount () {

    // }

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
