import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import QualityService from '../services/quality.service'

const QualitiesContex = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContex)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await QualityService.fetchAll()
                setQualities(content)
                setLoading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    }, [])

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <QualitiesContex.Provider
            value={{
                qualities,
                getQuality,
                isLoading
            }}
        >
            {children}
        </QualitiesContex.Provider>
    )
}
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
