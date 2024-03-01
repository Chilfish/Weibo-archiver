<script setup lang="tsx">
function ThemeItem(props: { theme: string }) {
  const dark = props.theme === 'Dark'
  const bg = dark ? 'bg-zinc-800' : 'bg-white'
  const color = dark ? 'bg-zinc-600' : 'bg-zinc-200'
  const border = dark ? 'border-zinc-600' : 'border-zinc-200'

  const selected = dark === isDark.value

  return (
    <div class="w-full">
      <button
        class={`grid w-full gap-2 border rounded-xl p-2 ${bg} ${border} ${selected ? 'ring-2' : ''}`}
        onClick={() => isDark.value = dark}
      >
        <div class="flex justify-end">
          <div class="h-6 w-9/12 rounded-xl bg-p-1" />
        </div>
        <div class={` h-6 w-9/12 rounded-xl ${color}`} />
      </button>

      <div class="mt-1 text-center text-4">
        {props.theme}
      </div>
    </div>
  )
}
</script>

<template>
  <div class="w-80 flex gap-6">
    <ThemeItem theme="Light" />
    <ThemeItem theme="Dark" />
  </div>
</template>
