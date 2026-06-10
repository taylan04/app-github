export async function buscarUsuarioGithub(userToken = token) {
    try {
        const response = await fetch("https://api.github.com/user", { headers: getHeaders(userToken) });

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

export async function buscarRepositoriosGithub(page = 1, userToken = token) {
    try {
        const response = await fetch(`https://api.github.com/user/repos?page=${page}`, { headers: getHeaders(userToken) });
        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios");
        }
        const data = await response.json();
        setRepositorios(prev => page === 1 ? data : [...prev, ...data]);
        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function buscarIssuesGithub(userToken = token) {
    try {
        const response = await fetch("https://api.github.com/issues?filter=assigned&state=all", {
            headers: getHeaders(userToken)
        });
        if (!response.ok) throw new Error("Erro ao buscar issues");
        const data = await response.json();
        setIssues(data);
        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function atualizarStatusIssue(issue, novoStatus) {
    try {
        const [owner, repoName] = issue.repository.full_name.split('/');
        await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues/${issue.number}`,
            {
                method: 'PATCH',
                headers: { ...getHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: novoStatus }),
            }
        );
        await buscarIssuesGithub();
    } catch (error) {
        console.error(error.message);
    }
}