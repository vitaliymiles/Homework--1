import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const [showPassword, setsHowPassword] = useState(false)
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }
    const toggleShowPassword = () => {
        setsHowPassword((prevState) => !prevState)
    }

    return (
        <div className="mb-4">
            <label htmlFor="email">{label}</label>{' '}
            <div className="input-group has-validation">
                <input
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getInputClasses()}
                    placeholder={placeholder}
                />
                {type === 'password' && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                'bi bi-eye' + (showPassword ? '-slash' : '')
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
TextField.defaultProps = {
    type: 'text'
}

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
}
export default TextField
