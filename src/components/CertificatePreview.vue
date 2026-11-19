<script setup>
defineProps({
  certificate: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="cert-stage"
    :class="[
      `type-${certificate.previewType || 'landscape'}`,
      { 'is-expanded': expanded },
    ]"
  >
    <img
      v-if="certificate.imageUrl"
      :src="certificate.imageUrl"
      :alt="certificate.title"
      class="cert-real-image"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.cert-stage {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 6, 14, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
}

.cert-stage.is-expanded {
  aspect-ratio: auto;
  min-height: 280px;
  max-height: 480px;
  padding: 10px;
  border-radius: 18px;
  background: rgba(8, 6, 14, 0.85);
}

.cert-real-image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: contain;
}

.type-prakerin:not(.is-expanded) .cert-real-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.type-csa:not(.is-expanded) {
  padding: 6px;
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}

.type-csa:not(.is-expanded) .cert-real-image {
  height: 100%;
  width: auto;
  border-radius: 10px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.55);
}

.is-expanded.type-csa .cert-real-image {
  max-height: 460px;
  width: auto;
}

.is-expanded.type-prakerin .cert-real-image {
  width: 100%;
  height: auto;
}
</style>
