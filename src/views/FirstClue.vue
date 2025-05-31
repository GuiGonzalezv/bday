<template>
  <div class="container">
    <div v-if="step === 'quiz'" class="quiz">
      <h2>Pergunta {{ currentQuestionIndex + 1 }}/{{ questions.length }}</h2>
      <p>{{ currentQuestion.question }}</p>
      <ul class="options">
        <li
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click="selectOption(index)"
          :class="{ correct: isCorrect(index), wrong: isWrong(index) }"
        >
          {{ option }}
        </li>
      </ul>
    </div>

    <div v-else-if="step === 'password'" class="password-step">
      <h2>✨ Último passo!</h2>
      <p>
        Dica : 🗝️ O tempo é um livro aberto — e nosso segredo, a primeira
        página.
      </p>
      <input
        v-model="enteredPassword"
        maxlength="45"
        placeholder="Digite a senha"
      />
      <button @click="checkPassword">Tentar</button>
      <p v-if="wrongPassword" class="error">Senha incorreta. Tente de novo!</p>
    </div>

    <div v-else-if="step === 'reward'" class="reward">
      <div class="ticket">
        <h1>🎟️ Vale Presente</h1>
        <p class="vale">Vale uma <strong>capa teclado do iPad</strong></p>
        <p class="mensagem">Porque você merece o melhor 💝</p>
        <p class="love-message">Te amo muito! 💖</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const questions = [
  {
    question: "Em que mês a gente começou a namorar?",
    options: ["Janeiro", "Março", "Maio"],
    answerIndex: 0,
    digit: "2",
  },
  {
    question: "Qual foi nosso primeiro passeio juntos?",
    options: ["Praia", "Campos", "Hotel Fazenda"],
    answerIndex: 0,
    digit: "1",
  },
  {
    question: "Como se chama a sapatilha usada no balé clássico?",
    options: ["Tênis", "Sandália", "Pointe "],
    answerIndex: 2,
    digit: "0",
  },
  {
    question: "Qual compositor é autor do balé O Lago dos Cisnes?",
    options: ["Beethoven", "Tchaikovsky", "Mozart"],
    answerIndex: 1,
    digit: "1",
  },
  {
    question:
      "Qual é o nome do movimento clássico em que a bailarina gira em uma perna só?",
    options: ["Jeté", "Pirouette", "Relevé"],
    answerIndex: 1,
    digit: "2",
  },
  {
    question: "Qual dessas áreas pertence à psicologia humanista",
    options: ["Psicanálise", "Comportamentalismo", "Abraham Maslow"],
    answerIndex: 2,
    digit: "2",
  },
];

const currentQuestionIndex = ref(0);
const selectedOption = ref<number | null>(null);
const answerDigits = ref<string[]>([]);
const step = ref<"quiz" | "password" | "reward">("quiz");
const enteredPassword = ref("");
const wrongPassword = ref(false);

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

function selectOption(index: number) {
  if (selectedOption.value !== null) return;

  selectedOption.value = index;
  const isCorrect = index === currentQuestion.value.answerIndex;

  if (isCorrect) {
    answerDigits.value.push(currentQuestion.value.digit);
    setTimeout(() => {
      selectedOption.value = null;
      if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++;
      } else {
        step.value = "password";
      }
    }, 1000);
  } else {
    setTimeout(() => {
      selectedOption.value = null;
    }, 1000);
  }
}

function isCorrect(index: number) {
  return (
    selectedOption.value === index &&
    index === currentQuestion.value.answerIndex
  );
}

function isWrong(index: number) {
  return (
    selectedOption.value === index &&
    index !== currentQuestion.value.answerIndex
  );
}

function checkPassword() {
  if (enteredPassword.value === answerDigits.value.join("")) {
    step.value = "reward";
  } else {
    wrongPassword.value = true;
  }
}
</script>

<style scoped>
.quiz,
.password-step,
.reward {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.options {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.options li {
  background: #fce4ec;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.options li.correct {
  background-color: #c8e6c9;
}

.options li.wrong {
  background-color: #ffcdd2;
}

input {
  padding: 0.5rem;
  font-size: 1.2rem;
  margin-top: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 10px 20px;
  background: #ff69b4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #e91e63;
}

.error {
  color: #e53935;
  margin-top: 1rem;
}

.ticket {
  border: 3px dashed #ff69b4;
  padding: 2rem;
  border-radius: 16px;
  background: white;
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
}

.ticket::before {
  left: -20px;
}

.ticket::after {
  right: -20px;
}

.gift-image {
  max-width: 100%;
  border-radius: 12px;
  margin: 1rem 0;
}

.vale {
  font-size: 1.4rem;
  color: #e91e63;
  font-weight: bold;
}

.love-message {
  font-weight: bold;
  font-size: 1rem;
  color: #ff4081;
}
</style>
