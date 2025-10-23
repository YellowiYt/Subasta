<template>
  <div class="detalle">
    <h2>{{ auto?.nombre }}</h2>
    <img :src="auto?.imagen" :alt="auto?.nombre" />
    <p>{{ auto?.descripcion }}</p>
    <p>Precio actual: <strong>\${{ auto?.precio }}</strong></p>

    <form @submit.prevent="pujar">
      <input type="number" v-model="monto" placeholder="Tu oferta" />
      <button type="submit">Pujar</button>
    </form>

    <button @click="volver">⬅ Volver</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auto = ref(null);
const monto = ref('');

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/api/autos/${route.params.id}`);
  auto.value = await res.json();
});

function volver() {
  router.push('/');
}

async function pujar() {
  alert(`Tu puja de $${monto.value} fue enviada`);
  monto.value = '';
}
</script>

<style scoped>
.detalle {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}
.detalle img {
  width: 100%;
  border-radius: 10px;
}
input {
  margin-top: 1rem;
  padding: 8px;
}
button {
  margin: 10px;
  padding: 8px 16px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
