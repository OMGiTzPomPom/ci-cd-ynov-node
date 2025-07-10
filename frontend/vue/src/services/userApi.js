// API Python FastAPI + MySQL pour la gestion des utilisateurs
const BASE_URL = import.meta.env.VITE_PYTHON_API_URL || 'https://ci-cd-ynov-back-lanzafame.vercel.app';

function getToken() {
  return localStorage.getItem('token');
}

export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/v1/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.email,
      password: user.password,
      name: user.fullname?.split(' ')[0] || '',
      lastName: user.fullname?.split(' ').slice(1).join(' ') || '',
      birthdate: user.birthdate || null,
      city: user.city || null,
      postalCode: user.postalCode || null
    }),
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  return data;
}

export async function listUsers() {
  const res = await fetch(`${BASE_URL}/v1/users`);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  
  // Adapter les données pour le frontend (route publique)
  return data.utilisateurs.map(user => ({
    id: user._id,
    email: user.username,
    fullname: `${user.name || ''} ${user.lastName || ''}`.trim(),
    role: user.role,
    createdAt: user.createdAt
  }));
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/v1/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return await res.json();
}

export async function getUserDetail(id) {
  const res = await fetch(`${BASE_URL}/v1/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const user = await res.json();
  
  return {
    id: user._id,
    email: user.username || user.email,
    fullname: `${user.name || ''} ${user.lastName || ''}`.trim(),
    role: user.role || 'user',
    birthdate: user.birthdate,
    city: user.city,
    postalCode: user.postalCode,
    createdAt: user.createdAt
  };
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.email,
      password: credentials.password
    }),
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
}

// Récupérer les utilisateurs avec informations sensibles (admin uniquement)
export async function listUsersSensitive() {
  const res = await fetch(`${BASE_URL}/v1/users-sensitive`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  
  return data.utilisateurs.map(user => ({
    id: user._id,
    email: user.username,
    fullname: `${user.name || ''} ${user.lastName || ''}`.trim(),
    role: user.role,
    birthdate: user.birthdate,
    city: user.city,
    postalCode: user.postalCode,
    createdAt: user.createdAt
  }));
}

// Récupérer le profil de l'utilisateur connecté
export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/v1/profile`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const user = await res.json();
  
  return {
    id: user._id,
    email: user.username,
    fullname: `${user.name || ''} ${user.lastName || ''}`.trim(),
    role: user.role,
    birthdate: user.birthdate,
    city: user.city,
    postalCode: user.postalCode,
    createdAt: user.createdAt
  };
}
