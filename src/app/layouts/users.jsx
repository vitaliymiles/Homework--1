import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import Edit from './edit'
const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    console.log(userId, edit)
    if (userId) {
        return (
            <>
                <UserPage userId={userId} />
            </>
        )
    }
    if (userId && edit) {
        return (
            <>
                <Edit userId={userId} />
            </>
        )
    } else {
        return (
            <>
                <UsersListPage />
            </>
        )
    }
}

export default Users
