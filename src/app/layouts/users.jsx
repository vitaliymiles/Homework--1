import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import Edit from './edit'
const Users = () => {
    const { userId, edit } = useParams()
    console.log('id', userId)
    console.log('edit', edit)
    if (userId && !edit) {
        return (
            <>
                <UserPage userId={userId} />
            </>
        )
    }
    if (edit) {
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
