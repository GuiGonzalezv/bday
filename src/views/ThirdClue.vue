<template>
  <div class="container">
    <h2>🔍 Pista 3: Onde está... o presente?</h2>
    <p>Clique no lugar certo da imagem! 👀</p>
    <div class="image-wrapper" @click="handleClick">
      <img :src="foto" ref="imgRef" />
    </div>
    <p v-if="message">{{ message }}</p>
    <button v-if="success" @click="router.push('/final')">
      Ver o presente! 🎁
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import foto from "../../public/whreisgift.png";
const imgRef = ref<HTMLImageElement | null>(null);
const router = useRouter();
const message = ref("");
const success = ref(false);

// Coordenadas do local secreto (em porcentagem da imagem)
const secret = { x: 45, y: 78 }; // ex: 42% da largura e 58% da altura

function handleClick(event: MouseEvent) {
  const img = imgRef.value;
  if (!img) return;

  const rect = img.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  const dx = xPercent - secret.x;
  const dy = yPercent - secret.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5) {
    success.value = true;
    message.value = "Você encontrou o lugar certo! 🎉";
  } else {
    message.value = "Hmm... tente de novo!";
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.image-wrapper {
  display: inline-block;
  position: relative;
  cursor: crosshair;
}
.image-wrapper img {
  max-width: 90%;
  border: 2px solid pink;
}
</style>
