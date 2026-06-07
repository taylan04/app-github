import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [registeredUser, setRegisteredUser] = useState(null);
    const [user, setUser] = useState(null);

    const register = (nome, telefone, email, password) => {
        setRegisteredUser({ nome, telefone, email, password });
    }

    const updateUser = (nome, telefone, email) => {
        setUser({ nome, telefone, email });
    }

    /*const login = (email, password) => {
        if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
            setUser({nome: registeredUser.nome, email: email, telefone: registeredUser.telefone});
            return true;
        }

        return false;
    };*/

    const login = (email, password) => {
        if (email === "taylansilva0402@gmail.com" && password === "tay") {
            setUser({ nome: "Taylan", email: email, telefone: "123456789" });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, registeredUser, register, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
