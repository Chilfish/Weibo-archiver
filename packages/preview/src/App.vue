<template>
  <app-main>
    <ui-header />

    <suspense>
      <router-view class="mt-14" />
    </suspense>

    <img-viewer />
  </app-main>
</template>
