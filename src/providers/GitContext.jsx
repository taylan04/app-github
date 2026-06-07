import React, { createContext, useContext, useState } from 'react';

const GitContext = createContext(null);

export function useGit() {
    const context = useContext(GitContext);
    if (!context) {
    throw new Error("useGit precisa estar dentro de um GitProvider");}
    return context;
}

export default function GitProvider({ children }) {
    const [token, setToken] = useState("");
    const [usuarioGithub, setUsuarioGithub] = useState(null);
    const [repositorios, setRepositorios] = useState([]);
    const [issues, setIssues] = useState([]);

    function getHeaders(userToken = token) {
        return {Authorization: `Bearer ${userToken}`, Accept: "application/vnd.github+json",};
    }

    async function salvarTokenGithub(userToken) {
        setToken(userToken);
    }

    async function buscarUsuarioGithub(userToken = token) {
        try {
            const response = await fetch("https://api.github.com/user", {headers: getHeaders(userToken)});

            if (!response.ok) {
                throw new Error("Erro ao buscar usuário do GitHub");
            }

            const data = await response.json();
            setUsuarioGithub(data);
            return data;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async function buscarRepositoriosGithub(page = 1, userToken = token) {
        try {
            const response = await fetch(`https://api.github.com/user/repos?page=${page}`,{headers: getHeaders(userToken)});
            if (!response.ok) {
                throw new Error("Erro ao buscar repositórios");
            }
            const data = await response.json();
            setRepositorios(data);
            return data;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async function buscarIssuesGithub(userToken = token) {
        try {
            const response = await fetch("https://api.github.com/issues", {headers: getHeaders(userToken)});
            if (!response.ok) {
                throw new Error("Erro ao buscar issues");
            }
            const data = await response.json();
            setIssues(data);
            return data;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async function carregarDadosGithub(userToken) {
        await salvarTokenGithub(userToken);
        await buscarUsuarioGithub(userToken);
        await buscarRepositoriosGithub(1, userToken);
        await buscarIssuesGithub(userToken);
    }

    return (
        <GitContext.Provider
            value={{
                token,
                usuarioGithub,
                repositorios,
                issues,
                salvarTokenGithub,
                buscarUsuarioGithub,
                buscarRepositoriosGithub,
                buscarIssuesGithub,
                carregarDadosGithub
            }}
        >{children}</GitContext.Provider>
    );
}