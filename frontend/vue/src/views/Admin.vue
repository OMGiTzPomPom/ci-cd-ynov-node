<script setup>
import { ref } from 'vue'
import { listUsers, deleteUser, getUserDetail, loginUser } from '../services/userApi.js'

const admin = ref({ email: '', password: '' })
const users = ref([])
const details = ref(null)

const loadUsers = async () => {
  users.value = await listUsers()
}

const loadDetails = () => {
  loadUsers()
}

const removeUser = async (id) => {
  await deleteUser(id, admin.value)
  loadUsers()
}

const showDetail = async (id) => {
  details.value = await getUserDetail(id, admin.value)
}
</script>

<template>
  <div>
      <router-link to="/">Home</router-link><br/>
      <router-link to="/users">Login Users</router-link>
    <h1>Admin</h1>
    <form @submit.prevent="loadDetails">
      <input v-model="admin.email" placeholder="Email admin" />
      <input v-model="admin.password" type="password" placeholder="Mot de passe" />
      <button>Connexion</button>
    </form>

    <ul>
      <li v-for="u in users" :key="u.id">
        {{ u.email }}
        <button @click="showDetail(u.id)">Détails</button>
        <button @click="removeUser(u.id)">Supprimer</button>
      </li>
    </ul>

    <div v-if="details">
      <h2>Détails</h2>
      <pre>{{ details }}</pre>
    </div>
  </div>
</template>