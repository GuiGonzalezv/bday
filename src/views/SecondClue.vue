<template>
  <div class="container">
    <h2>🧠 Pista 2: Jogo da Memória</h2>
    <div class="grid">
      <div
        class="card"
        v-for="card in cards"
        :key="card.id"
        :class="{ flipped: isFlipped(card) || card.matched }"
        @click="flipCard(card)"
      >
        <img v-if="isFlipped(card) || card.matched" :src="card.img" />
        <div v-else class="back">🎁</div>
      </div>
    </div>
    <button
      v-if="matchedCards.length === cards.length"
      @click="router.push('/clue3')"
    >
      Próxima pista!
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

type Card = {
  id: number;
  img: string;
  matched: boolean;
};

const baseImages = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
];
const cards = ref<Card[]>(
  shuffle(
    [...baseImages, ...baseImages].map((img, i) => ({
      id: i,
      img,
      matched: false,
    }))
  )
);

const flipped = ref<Card[]>([]);

function shuffle(array: Card[]) {
  return array.sort(() => Math.random() - 0.5);
}

function isFlipped(card: Card) {
  return flipped.value.includes(card);
}

function flipCard(card: Card) {
  if (
    flipped.value.length < 2 &&
    !card.matched &&
    !flipped.value.includes(card)
  ) {
    flipped.value.push(card);

    if (flipped.value.length === 2) {
      const [a, b] = flipped.value;
      if (a.img === b.img) {
        a.matched = true;
        b.matched = true;
      }
      setTimeout(() => (flipped.value = []), 800);
    }
  }
}

const matchedCards = computed(() => cards.value.filter((c) => c.matched));
</script>

<style scoped>
.container {
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.card {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.back {
  font-size: 2rem;
}
.flipped {
  box-shadow: 0 0 8px pink;
}
</style>
