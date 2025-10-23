<template>
  <section class="productos">
    <h2>Autos en Subasta</h2>
    <div class="grid">
      <AutoCard 
        v-for="auto in autos" 
        :key="auto.id" 
        :auto="auto"
        @click="verDetalle(auto.id)"
      />
    </div>
  </section>
</template>

<script setup>
import AutoCard from '../components/AutoCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const autos = ref([]);
const router = useRouter();

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/autos');
  autos.value = await res.json();
});

function verDetalle(id) {
  router.push(`/detalle/${id}`);
}
</script>
