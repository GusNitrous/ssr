<script setup>
  import { onMounted, ref, inject } from 'vue'

  const serverProducts = inject('products', null)
  const location = inject('location', null)
  const id = location.pathname.split('/').at(-1)
  const product = ref(null ?? serverProducts[id])

  onMounted(async () => {
    if (!product) {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      product.value = await res.json()
    }
  })
</script>

<template>
  <div v-if="product">
    <a href="/">← Back</a>
    <h1>{{ product.title }}</h1>
    <img :src="product.image" width="150" />
    <p>{{ product.description }}</p>
    <p>
      <strong>{{ product.price }}</strong>
    </p>
  </div>
</template>
