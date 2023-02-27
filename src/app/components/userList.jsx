import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from './userPage'
import Users from './users'

const UserList = () => {
    const userId = useParams()
    if (userId) {
        return (
            <>
                <UserPage userId={userId} />
            </>
        )
    } else {
        return (
            <>
                <Users />
            </>
        )
    }
}

export default UserList
