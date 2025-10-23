<template>
  <div class="card">
    <img :src="auto.imagen" :alt="auto.nombre" />
    <h3>{{ auto.nombre }}</h3>
    <p>Precio actual: <strong>\${{ auto.precio }}</strong></p>
    <p class="timer">⏰ Tiempo restante: {{ auto.tiempo }}</p>
    <a href="#" class="btn">Pujar</a>
  </div>
</template>

<script setup>
defineProps({
  auto: Object
});
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.timer {
  font-weight: 600;
  color: #0077ff;
}
</style>
