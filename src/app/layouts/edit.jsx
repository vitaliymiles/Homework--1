import React from 'react'
import RegisterForm from '../components/ui/registerForm'

const Edit = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <>
                        <RegisterForm />
                    </>
                    <button>Изменить</button>
                </div>
            </div>
        </div>
    )
}

export default Edit
// user={user}
