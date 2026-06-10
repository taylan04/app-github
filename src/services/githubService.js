export function getHeaders(userToken) {
        return { Authorization: `Bearer ${userToken}`, Accept: "application/vnd.github+json", };
    }

export async function buscarUsuarioGithub(userToken) {
    try {
        const response = await fetch("https://api.github.com/user", { headers: getHeaders(userToken) });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário do GitHub");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export async function buscarRepositoriosGithub(page = 1, userToken) {
    try {
        const response = await fetch(`https://api.github.com/user/repos?page=${page}`, { headers: getHeaders(userToken) });
        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function buscarIssuesGithub(userToken) {
    try {
        const response = await fetch("https://api.github.com/issues?filter=assigned&state=all", {
            headers: getHeaders(userToken)
        });
        if (!response.ok) throw new Error("Erro ao buscar issues");

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export async function atualizarStatusIssue(issue, novoStatus, userToken) {
    try {
        const [owner, repoName] = issue.repository.full_name.split('/');
        const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues/${issue.number}`,
            {
                method: 'PATCH',
                headers: { ...getHeaders(userToken), 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: novoStatus }),
            }
        );
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return [];
    }
}