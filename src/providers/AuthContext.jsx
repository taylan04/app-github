import React, { createContext, useContext, useState, useReducer } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const valoresIniciais = {
    user: null,
    registeredUser: null,
}

function authReducer(valores, action) {
    switch(action.type) {
        case "set_user":
            return {...valores, user: action.payload};
        case "set_resgisteredUser":
            return {...valores, registeredUser: action.payload};
        default:
            return valores;
    }
} 

export default function AuthProvider({ children }) {
    
    const [valores, dispatch] = useReducer(authReducer, valoresIniciais);

    const register = (nome, telefone, email, password) => dispatch({type: "set_user", payload: {nome, telefone, email, password}});

    const updateUser = (nome, telefone, email) => dispatch({type: "set_user", payload: {nome, telefone, email}});

    /*const login = (email, password) => {
        if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
            setUser({nome: registeredUser.nome, email: email, telefone: registeredUser.telefone});
            return true;
        }

        return false;
    };*/

    const login = (email, password) => {
        if (email === "taylansilva0402@gmail.com" && password === "tay") {
            //setUser({ nome: "Taylan", email: email, telefone: "123456789" });
            dispatch({type: "set_user", payload: { nome: "Taylan", email: "taylansilva0402@gmail.com", senha: "tay"}});
            return true;
        }
        return false;
    };

    const logout = () => {
        dispatch({type: "set_user", payload: null});
    };

    return (
        <AuthContext.Provider value={{ user, registeredUser, register, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
