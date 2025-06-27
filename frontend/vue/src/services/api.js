const BASE_URL = 'http://localhost:4000';

export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function listUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
}

export async function deleteUser(id, admin) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'email': admin.email,
      'password': admin.password
    },
  });
  return await res.json();
}

export async function getUserDetail(id, admin) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      'email': admin.email,
      'password': admin.password
    },
  });
  return await res.json();
}
