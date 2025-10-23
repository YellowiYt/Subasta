<template>
  <div class="subasta-container">
    <h1>Subasta de Autos</h1>

    <div class="autos-grid">
      <div v-for="auto in autos" :key="auto.id" class="auto-card">
        <img :src="auto.imagen" alt="auto" class="auto-img" />

        <h3>{{ auto.nombre }}</h3>
        <p>Precio actual: ${{ auto.precioActual }}</p>

        <p>Tiempo restante: {{ formatTiempo(auto.tiempoRestante) }}</p>

        <div class="puja-container">
          <input
            type="number"
            v-model.number="pujas[auto.id]"
            placeholder="Monto de puja"
            min="auto.precioActual + 1"
          />
          <button @click="enviarPuja(auto.id)">Pujar</button>
        </div>

        <router-link :to="`/detalle/${auto.id}`">Ver detalle</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 🔹 Simulación inicial de autos
const autos = ref([
  {
    id: 1,
    nombre: 'Toyota Corolla Híbrido',
    precioActual: 12000,
    tiempoRestante: 180, // segundos
    imagen: 'https://via.placeholder.com/300x200?text=Toyota+Corolla',
  },
  {
    id: 2,
    nombre: 'Honda CR-V 2023',
    precioActual: 25000,
    tiempoRestante: 300,
    imagen: 'https://via.placeholder.com/300x200?text=Honda+CRV',
  },
])

const pujas = ref({})

// 🔹 WebSocket (cambiar esta URL cuando el backend esté activo)
let socket

onMounted(() => {
  socket = new WebSocket('ws://localhost:3000') // cambiar por el puerto real del backend

  socket.onopen = () => console.log('✅ Conectado al servidor WebSocket')

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    // Actualiza precios y tiempo en tiempo real
    if (data.type === 'update') {
      const auto = autos.value.find((a) => a.id === data.autoId)
      if (auto) {
        auto.precioActual = data.precioActual
        auto.tiempoRestante = data.tiempoRestante
      }
    }
  }

  // Temporizador local
  const interval = setInterval(() => {
    autos.value.forEach((a) => {
      if (a.tiempoRestante > 0) a.tiempoRestante--
    })
  }, 1000)

  onUnmounted(() => {
    clearInterval(interval)
    socket.close()
  })
})

function enviarPuja(autoId) {
  const monto = pujas.value[autoId]
  if (!monto || monto <= 0) return alert('Ingrese un monto válido')

  // Enviar puja al servidor
  socket.send(JSON.stringify({ type: 'puja', autoId, monto }))
  pujas.value[autoId] = ''
}

function formatTiempo(segundos) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.subasta-container {
  padding: 2rem;
}

.autos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.auto-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
}

.auto-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.puja-container {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
