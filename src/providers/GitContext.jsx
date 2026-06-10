import React, { createContext, useContext, useReducer } from 'react';
import { buscarUsuarioGithub, buscarRepositoriosGithub, buscarIssuesGithub, atualizarStatusIssue } from '../services/githubService';

const GitContext = createContext(null);

export function useGit() {
    const context = useContext(GitContext);
    if (!context) {
        throw new Error("useGit precisa estar dentro de um GitProvider");
    }
    return context;
}

const valoresIniciais = {
    token: "",
    usuarioGithub: null,
    repositorios: [],
    issues: []
};

function gitReducer(valores, action) {
    switch (action.type) {
        case "set_token":
            return { ...valores, token: action.payload };
        case "set_usuario_github":
            return { ...valores, usuarioGithub: action.payload };
        case "set_repositorios":
            return { ...valores, repositorios: action.payload.page === 1 ? action.payload.repositorios : [...valores.repositorios, ...action.payload.repositorios] };
        case "set_issues":
            return { ...valores, issues: action.payload };
        default:
            return valores;
    }
}

export default function GitProvider({ children }) {

    const [valores, dispatch] = useReducer(gitReducer, valoresIniciais);

    function handleSetToken(token) {
        dispatch({ type: "set_token", payload: token });
    }

    async function carregarUsuario(token) {
        const data = await buscarUsuarioGithub(token);

        if (data) {
            dispatch({
                type: "set_usuario_github",
                payload: data,
            });
        }
    }

    async function carregarRepositorios(token, page = 1) {
        const data = await buscarRepositoriosGithub(page, token);

        dispatch({
            type: "set_repositorios",
            payload: {
                repositorios: data,
                page,
            },
        });
    }

    async function carregarIssues(token) {
        const data = await buscarIssuesGithub(token);

        dispatch({
            type: "set_issues",
            payload: data,
        });
    }

    async function handleAtualizarStatus(issue, novoStatus) {
        await atualizarStatusIssue(
            issue,
            novoStatus,
            valores.token
        );

        await carregarIssues(valores.token);
    }

    async function carregarDadosGithub(userToken) {
        handleSetToken(userToken);
        await carregarUsuario(userToken);
        await carregarRepositorios(userToken);
        await carregarIssues(userToken);
    }

    return (
        <GitContext.Provider
            value={{
                token: valores.token,
                usuarioGithub: valores.usuarioGithub,
                repositorios: valores.repositorios,
                issues: valores.issues,
                carregarDadosGithub,
                carregarRepositorios,
                carregarIssues,
                atualizarStatusIssue: handleAtualizarStatus,
            }}
        >{children}</GitContext.Provider>
    );
}