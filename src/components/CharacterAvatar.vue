<script setup>
defineProps({
  character: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
  },
})
</script>

<template>
  <div
    class="avatar-frame"
    :class="`size-${size}`"
    :style="{
      '--char-accent': character.accentHex,
      '--char-secondary': character.secondaryHex,
      '--char-rgb': character.accentRgb,
    }"
  >
    <div class="avatar-ring" aria-hidden="true"></div>
    <img
      v-if="character.avatarUrl"
      :src="character.avatarUrl"
      :alt="character.name"
      class="avatar-photo"
    />

    <svg
      v-else
      viewBox="0 0 120 120"
      class="avatar-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :aria-label="`${character.name} emblem`"
    >
      <defs>
        <linearGradient :id="`grad-${character.id}`" x1="18" y1="12" x2="102" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" :stop-color="character.accentHex" stop-opacity="0.95" />
          <stop offset="100%" :stop-color="character.secondaryHex" stop-opacity="0.85" />
        </linearGradient>
        <radialGradient :id="`glow-${character.id}`" cx="50%" cy="45%" r="50%">
          <stop offset="0%" :stop-color="character.accentHex" stop-opacity="0.32" />
          <stop offset="100%" :stop-color="character.accentHex" stop-opacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="52" :fill="`url(#glow-${character.id})`" />

      <!-- Dio: Architect visor & hexagonal node -->
      <template v-if="character.id === 'dio'">
        <polygon
          points="60,12 100,35 100,85 60,108 20,85 20,35"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="1.6"
          stroke-opacity="0.55"
        />
        <path
          d="M32 95C35 76 46 68 60 68C74 68 85 76 88 95"
          :fill="`url(#grad-${character.id})`"
          fill-opacity="0.22"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="60"
          cy="47"
          r="15"
          fill="rgba(12, 9, 20, 0.85)"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
        />
        <path d="M51 47H69" :stroke="character.accentHex" stroke-width="2.6" stroke-linecap="round" />
        <circle cx="60" cy="21" r="2.6" :fill="character.accentHex" />
      </template>

      <!-- Fahmi: Motion arcs & sleek kinetic crest -->
      <template v-else-if="character.id === 'fahmi'">
        <path
          d="M22 60C22 39 39 22 60 22C81 22 98 39 98 60"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="1.6"
          stroke-dasharray="6 5"
          stroke-linecap="round"
        />
        <path
          d="M28 70C36 86 48 94 60 94C72 94 84 86 92 70"
          :stroke="character.accentHex"
          stroke-width="1.4"
          stroke-opacity="0.45"
          stroke-linecap="round"
        />
        <path
          d="M32 95C36 77 46 68 60 68C74 68 84 77 88 95"
          :fill="`url(#grad-${character.id})`"
          fill-opacity="0.22"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="60"
          cy="47"
          r="15"
          fill="rgba(12, 9, 20, 0.85)"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
        />
        <path d="M52 46L60 42L68 46" :stroke="character.accentHex" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      </template>

      <!-- Triztan: Sentinel shield frame & twin nodes -->
      <template v-else-if="character.id === 'triztan'">
        <path
          d="M60 14L96 30V58C96 80 79 97 60 105C41 97 24 80 24 58V30L60 14Z"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="1.6"
          stroke-opacity="0.55"
        />
        <path
          d="M33 93C37 76 47 68 60 68C73 68 83 76 87 93"
          :fill="`url(#grad-${character.id})`"
          fill-opacity="0.22"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="60"
          cy="47"
          r="15"
          fill="rgba(12, 9, 20, 0.85)"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
        />
        <circle cx="55" cy="47" r="2.2" :fill="character.accentHex" />
        <circle cx="65" cy="47" r="2.2" :fill="character.accentHex" />
      </template>

      <!-- Seto: Visual artisan diamond halo & prism -->
      <template v-else>
        <rect
          x="29"
          y="29"
          width="62"
          height="62"
          rx="12"
          transform="rotate(45 60 60)"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="1.6"
          stroke-opacity="0.55"
        />
        <path
          d="M33 94C36 76 46 68 60 68C74 68 84 76 87 94"
          :fill="`url(#grad-${character.id})`"
          fill-opacity="0.22"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="60"
          cy="47"
          r="15"
          fill="rgba(12, 9, 20, 0.85)"
          :stroke="`url(#grad-${character.id})`"
          stroke-width="2"
        />
        <polygon points="60,40 65,47 60,54 55,47" :fill="character.accentHex" />
      </template>
    </svg>
  </div>
</template>

<style scoped>
.avatar-frame {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--char-rgb), 0.14) 0%,
    rgba(10, 8, 18, 0.9) 70%
  );
  border: 1px solid rgba(var(--char-rgb), 0.28);
  box-shadow: 0 0 28px rgba(var(--char-rgb), 0.18),
    inset 0 0 18px rgba(var(--char-rgb), 0.08);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.size-sm {
  width: 44px;
  height: 44px;
}

.size-md {
  width: 96px;
  height: 96px;
}

.size-lg {
  width: 124px;
  height: 124px;
}

.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px dashed rgba(var(--char-rgb), 0.26);
  pointer-events: none;
  transition: transform 0.6s ease, border-color 0.35s ease;
}

.avatar-svg,
.avatar-photo {
  width: 84%;
  height: 84%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
