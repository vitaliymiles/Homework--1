import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();
const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function LogIn({ email, passwod }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    passwod,
                    returnSecureToken: true
                }
            );
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error("Пароль или Email не коректны");

                    default:
                        throw new Error("МНОГО ПОПЫТОК");
                }
            }
        }
    }

    async function signUp({ email, passwod, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                passwod,
                returnSecureToken: true
            });
            setTokens(data);

            await createUser({ _id: data.localId, email, ...rest });
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const erroeObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw erroeObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, LogIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthContext.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
