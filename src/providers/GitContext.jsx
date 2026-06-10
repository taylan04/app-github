import React, { createContext, useContext, useState } from 'react';
import { buscarUsuarioGithub, buscarRepositoriosGithub, buscarIssuesGithub, atualizarStatusIssue } from '../services/githubService';

const GitContext = createContext(null);

export function useGit() {
    const context = useContext(GitContext);
    if (!context) {
        throw new Error("useGit precisa estar dentro de um GitProvider");
    }
    return context;
}

export default function GitProvider({ children }) {
    const [token, setToken] = useState("");
    const [usuarioGithub, setUsuarioGithub] = useState(null);
    const [repositorios, setRepositorios] = useState([]);
    const [issues, setIssues] = useState([]);

    function getHeaders(userToken = token) {
        return { Authorization: `Bearer ${userToken}`, Accept: "application/vnd.github+json", };
    }

    async function carregarDadosGithub(userToken) {
        setToken(userToken);
        await buscarUsuarioGithub(userToken);
        await buscarRepositoriosGithub(1, userToken);
        await buscarIssuesGithub(userToken);
    }

    return (
        <GitContext.Provider
            value={{
                token,
                usuarioGithub,
                setUsuarioGithub,
                repositorios,
                issues,
                setToken,
                buscarUsuarioGithub,
                atualizarStatusIssue,
                buscarRepositoriosGithub,
                buscarIssuesGithub,
                carregarDadosGithub
            }}
        >{children}</GitContext.Provider>
    );
}