import React from 'react'
import { useHistory } from 'react-router-dom'

const BackHistoryButton = () => {
    const history = useHistory()

    return (
        <button className="btn btn-success" onClick={() => history.goBack()}>
            <i className="bi bi-caret-left">Назад</i>
        </button>
    )
}

export default BackHistoryButton
