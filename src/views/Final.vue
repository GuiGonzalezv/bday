<template>
  <div class="container">
    <div class="ticket">
      <h1>🎟️ Vale Presente</h1>
      <p class="vale">Vale uma <strong>capa teclado do iPad</strong></p>
      <p class="mensagem">Porque você merece o melhor 💝</p>
      <p class="love-message">Te amo muito! 💖</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.ticket {
  background: white;
  border: 3px dashed #ff69b4;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.ticket::before,
.ticket::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fff0f5;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.ticket::before {
  left: -20px;
}

.ticket::after {
  right: -20px;
}

h1 {
  color: #ff69b4;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.vale {
  font-size: 1.4rem;
  font-weight: bold;
  color: #e91e63;
  margin: 1rem 0;
}

.mensagem {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
}

.gift-image {
  max-width: 100%;
  border-radius: 12px;
  margin: 1rem 0;
}

.love-message {
  font-weight: bold;
  font-size: 1rem;
  color: #ff4081;
}
</style>
