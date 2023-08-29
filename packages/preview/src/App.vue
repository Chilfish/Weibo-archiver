<template>
  <app-main>
    <ui-header />

    <suspense>
      <router-view />
    </suspense>

    <img-viewer />
  </app-main>
</template>
