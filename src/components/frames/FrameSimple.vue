<template>
  <div class="frame-root">
    <svg
      viewBox="0 0 1000 1225"
      preserveAspectRatio="xMidYMid slice"
      class="frame-svg"
      role="img"
      aria-hidden
    >
      <rect x="0" y="0" width="1000" height="1225" fill="#000" />
      <rect x="25" y="25" rx="70" ry="70" width="950" height="950" fill="#fff" />
      <rect x="0" y="975" rx="70" ry="70" width="1000" height="250" fill="#000" />
    </svg>

    <div class="qr-slot">
      <slot name="qr-code"></slot>
    </div>

    <div class="frame-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ label?: string }>(), { label: 'SCAN ME' })
const { label } = props
</script>

<style scoped>
.frame-root {
  position: relative;
  width: 280px;
  height: 340px;
  display: inline-block;
}
.frame-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.qr-slot {
  position: absolute;
  left: 6.5%;
  top: 6.5%;
  width: 87%;
  height: 78%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.frame-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3%;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
}
</style>
