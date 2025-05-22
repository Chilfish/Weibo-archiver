<script setup>
import DefaultTheme from 'vitepress/theme'
import Giscus from './Giscus.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <Giscus />
    </template>
  </Layout>
</template>
