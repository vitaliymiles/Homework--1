import React from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
    const { edit } = useParams()
    if (edit) {
        return <h1>Edit</h1>
    }
}

export default Edit
