import React, { useEffect, useState } from 'react'
import API from '../../../api'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'
import { validator } from '../../../utils/validator'
import PropTypes from 'prop-types'

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({ userId: '', content: '' })
    const [users, setUsers] = useState({}) // получение юзеров, кто должен писать коментарий
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    const validatorConfig = {
        userId: {
            isRequired: {
                message:
                    'Выберете пользователя от кого вы хотите написать сообщение'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не модет быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        API.users.fetchAll().then(setUsers)
    }, [])

    const clearForm = () => {
        setData({ userId: '', content: '' })
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        onSubmit(data)
        clearForm()
    } // После отправки комментария, форма отчищается.

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        })) // трансформируем юзеров из массива в объекта и передаем в селектфилд

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    defaultOption="Выберете пользователя"
                    options={arrayOfUsers}
                    name="userId"
                    onChange={handleChange}
                    value={data.userId}
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success">Опубликовать</button>
                </div>
            </form>
        </div>
    )
}
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}
export default AddCommentForm
