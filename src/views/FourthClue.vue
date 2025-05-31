<template>
  <div class="puzzle-container">
    <h2 class="mb-4 text-xl font-bold">
      Monte a imagem para desbloquear a próxima pista 🎁
    </h2>

    <div
      class="grid grid-cols-3 gap-1 w-[300px] h-[300px]"
      style="grid-template-rows: repeat(3, 100px)"
    >
      <div
        v-for="tile in tiles"
        :key="tile.originalIndex"
        class="tile"
        :style="{
          ...tile.style,
          gridRowStart: Math.floor(tile.currentIndex / size) + 1,
          gridColumnStart: (tile.currentIndex % size) + 1,
        }"
        :draggable="tile.currentIndex !== emptyPosition"
        @dragstart="onDragStart(tile.currentIndex)"
        @dragover.prevent="onDragOver(tile.currentIndex)"
        @drop="onDrop(tile.currentIndex)"
      ></div>
    </div>

    <div v-if="isSolved" class="mt-4 text-green-600 font-bold">
      Parabéns! Puzzle resolvido! 🎉
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

const imageSrc = new URL("../../public/us.jpeg", import.meta.url).href;
const size = 3;

type Tile = {
  originalIndex: number; // posição correta da peça
  currentIndex: number; // posição atual na grade
  style: Record<string, string>;
};

const tiles = ref<Tile[]>([]);
const emptyPosition = ref<number>(size * size - 1); // posição vazia

let draggedTileIndex = ref<number | null>(null);

function shuffleArray<T>(arr: T[]): T[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function initPuzzle() {
  const tileSize = 100; // px
  const allTiles: Tile[] = [];

  for (let i = 0; i < size * size; i++) {
    const x = (i % size) * tileSize;
    const y = Math.floor(i / size) * tileSize;
    allTiles.push({
      originalIndex: i,
      currentIndex: i,
      style: {
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${tileSize * size}px ${tileSize * size}px`,
        backgroundPosition: `-${x}px -${y}px`,
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        border: "1px solid #ccc",
        boxSizing: "border-box",
        cursor: "pointer",
      },
    });
  }

  // remove last tile to be the empty space
  allTiles[emptyPosition.value].style.backgroundImage = "none";
  allTiles[emptyPosition.value].style.backgroundColor = "#eee";
  allTiles[emptyPosition.value].style.cursor = "default";

  tiles.value = shuffleArray(allTiles);

  // atualiza emptyPosition para refletir onde está o tile vazio após embaralhar
  emptyPosition.value = tiles.value.find(
    (t) => t.style.backgroundImage === "none"
  )!.currentIndex;
}

function getNeighbors(index: number) {
  const row = Math.floor(index / size);
  const col = index % size;
  const neighbors = [];

  if (row > 0) neighbors.push(index - size);
  if (row < size - 1) neighbors.push(index + size);
  if (col > 0) neighbors.push(index - 1);
  if (col < size - 1) neighbors.push(index + 1);

  return neighbors;
}

function onDragStart(pos: number) {
  draggedTileIndex.value = pos;
}

function onDragOver(pos: number) {
  // Só permitir drop se a posição estiver na vizinhança da posição vazia
  // Evita permitir drop em posições inválidas
  if (!getNeighbors(emptyPosition.value).includes(pos)) {
    return;
  }
}

function onDrop(pos: number) {
  if (draggedTileIndex.value === null) return;

  const draggedPos = draggedTileIndex.value;
  const emptyPos = emptyPosition.value;

  // Só troca se o local de drop for vizinho do vazio
  if (!getNeighbors(emptyPos).includes(pos)) {
    draggedTileIndex.value = null;
    return;
  }

  // Encontrar os índices no array tiles pelo currentIndex
  const draggedTileArrayIndex = tiles.value.findIndex(
    (t) => t.currentIndex === draggedPos
  );
  const emptyTileArrayIndex = tiles.value.findIndex(
    (t) => t.currentIndex === emptyPos
  );

  // Troca as posições
  tiles.value[draggedTileArrayIndex].currentIndex = emptyPos;
  tiles.value[emptyTileArrayIndex].currentIndex = draggedPos;

  // Atualiza a posição vazia
  emptyPosition.value = draggedPos;

  draggedTileIndex.value = null;
}

const isSolved = computed(() =>
  tiles.value.every((tile) => tile.currentIndex === tile.originalIndex)
);

onMounted(() => {
  initPuzzle();
});
</script>

<style scoped>
.puzzle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tile {
  user-select: none;
}

.grid {
  display: grid;
}
</style>
