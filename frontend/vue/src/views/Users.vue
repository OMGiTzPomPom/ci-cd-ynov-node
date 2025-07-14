<template>
    <div>
        <router-link to="/">Home</router-link><br/>
        <router-link to="/admin">Login Admin</router-link>
        <h1>User blog</h1>
        <form @submit.prevent="submitPost">
            <input v-model="postForm.title" placeholder="Titre du post" required />
            <br />
            <textarea v-model="postForm.content" placeholder="Contenu du post" required rows="6" cols="50"></textarea>
            <br />
            <button type="submit">Publier</button>
        </form>
        <p>{{ postStatus }}</p>

        <hr />

        <h2>Posts récents</h2>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>
                <small>Publié le {{ new Date(post.createdAt).toLocaleString() }}</small>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createPost, listPosts } from '../services/postApi.js'

const postForm = ref({
    title: '',
    content: ''
})

const posts = ref([])
const postStatus = ref('')

// Charger les posts existants
const loadPosts = async () => {
    posts.value = await listPosts()
}

onMounted(() => {
    loadPosts()
})

// Créer un nouveau post
const submitPost = async () => {
    try {
        await createPost(postForm.value)
        postStatus.value = 'Post créé avec succès !'
        postForm.value.title = ''
        postForm.value.content = ''
        loadPosts()
    } catch (err) {
        postStatus.value = 'Erreur lors de la création du post.'
        console.error(err)
    }
}
</script>
