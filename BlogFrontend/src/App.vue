<template>
  <NavBar/>
  <main class="mt-5h-full ">
    <router-view></router-view>
  </main>
  <Footer/>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>
