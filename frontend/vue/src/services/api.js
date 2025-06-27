const BASE_URL = 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('token');
}

export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function listUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  });
  return await res.json();
}

export async function getUserDetail(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
  });
  return await res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}
