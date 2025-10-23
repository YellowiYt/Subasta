<template>
  <Navbar />
  <router-view />
  <footer>
    <p>© 2025 SubastaAutos. Todos los derechos reservados.</p>
  </footer>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
@import './assets/subasta.css';
</style>
