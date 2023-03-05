import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'
const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErros] = useState({})

    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязателенн для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        password: {
            isRequired: { message: 'Пароль обязателен для заполнения' },
            isCapitalSymbol: {
                message: 'Пароль должен иметь хотябы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен иметь хотябы одну цифру'
            },
            min: {
                message: 'Пароль должен иметь 8 или больше символов',
                value: 8
            }
        }
    }
    useEffect(() => {
        validata()
    }, [data])

    const validata = () => {
        const errors = validator(data, validatorConfig)

        setErros(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validata()
        if (!isValid) return
        console.log(data)
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Элуктронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className=" btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
