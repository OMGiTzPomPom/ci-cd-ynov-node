const BASE_URL = import.meta.env.VITE_PYTHON_API_URL || 'https://ci-cd-ynov-back-lanzafame.vercel.app';

function getToken() {
    return localStorage.getItem('token');
}

// Créer un post de blog
export async function createPost(post) {
    const res = await fetch(`${BASE_URL}/v1/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(post)
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la création du post');
    }

    return await res.json();
}

// Récupérer tous les posts de blog
export async function listPosts() {
    const res = await fetch(`${BASE_URL}/v1/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

    if (!res.ok) {
        throw new Error('Erreur lors du chargement des posts');
    }

    return await res.json();
}
