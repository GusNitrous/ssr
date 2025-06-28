<script setup>
import { ref, onMounted, inject } from 'vue'

const serverProducts = inject('products', null)
const products = ref(serverProducts ?? [])

onMounted(async () => {
  if (!serverProducts) {
    const res = await fetch('https://fakestoreapi.com/products?limit=6')
    products.value = await res.json()
  }
})
</script>

<template>
    <div>
      <h1>Store</h1>
      <div className="products">
        <div v-for="p in products" :key="p.id" className="product">
          <img :src="p.image" :alt=p.title />
          <h2>{{ p.title }}</h2>
          <p>
            <strong>{{ p.price }}</strong>
          </p>
          <a :href="'/product/' + p.id">View</a>
        </div>
      </div>
    </div>
</template>
