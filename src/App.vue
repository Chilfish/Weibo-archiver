<template>
  <main p="x-4 y-10" text="center" font-sans>
    <button @click="toggleDark()">
      {{ isDark }}
    </button>
    <RouterView />
  </main>
</template>
