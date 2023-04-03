import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserForm from '../components/ui/editUserForm'
const Users = () => {
    const { userId, edit } = useParams()
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
                <EditUserForm userId={userId} />
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
