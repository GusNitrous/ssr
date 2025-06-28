<script setup lang="ts">
import { inject } from 'vue';
import ProductList from "./pages/ProductsList.vue";
import ProductPage from "./pages/ProductPage.vue";

const location = inject('location', null)
const { pathname } = location;

const isMainPath = /(\/$)|(^$)/.test(pathname);
const isProductPath = /\/product\/.*$\/?/.test(pathname);
</script>

<template>
  <ProductList v-if="isMainPath" />
  <ProductPage v-if="isProductPath" />
</template>
