<script setup>
import { ref, onMounted } from 'vue'
import { registerUser, listUsers } from '../services/userApi.js'

const form = ref({ fullname: '', email: '', password: '' })
const users = ref([])

const loadUsers = async () => {
  users.value = await listUsers()
}

const submitForm = async () => {
  await registerUser(form.value)
  form.value = { fullname: '', email: '', password: '' }
  loadUsers()
}

onMounted(loadUsers)
</script>


<template>
  <div>
    <router-link to="/admin">Login Admin</router-link><br/>
    <router-link to="/users">Login Users</router-link>
      <h1>Inscription</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.fullname" placeholder="Nom complet" required />
      <input v-model="form.email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Envoyer</button>
    </form>

    <h2>Utilisateurs inscrits</h2>
    <ul>
      <li v-for="u in users" :key="u.id">{{ u.email }}</li>
    </ul>
  </div>
</template>