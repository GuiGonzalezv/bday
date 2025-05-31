<template>
  <div class="container">
    <h1>🎉 Feliz Aniversário, meu amor!</h1>
    <p>Prepare-se para uma aventura cheia de amor 💖</p>
    <button @click="goToClue">Começar 🗺️</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const goToClue = () => router.push("/clue1");
</script>

<style scoped>
.container {
  text-align: center;
  padding: 2rem;
}
button {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  background-color: #ff8fa3;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
