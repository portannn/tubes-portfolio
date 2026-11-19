<script setup>
import { computed } from 'vue'

const props = defineProps({
  accentRgb: {
    type: String,
    default: '139, 92, 246',
  },
  intensity: {
    type: String,
    default: 'welcome', // 'welcome' | 'select' | 'portfolio'
  },
})

const auroraStyle = computed(() => ({
  '--dynamic-accent-rgb': props.accentRgb,
}))
</script>

<template>
  <div class="aurora-stage" :class="`mode-${intensity}`" :style="auroraStyle" aria-hidden="true">
    <!-- Primary top smoky purple nebula matching reference image -->
    <div class="nebula nebula-top-center"></div>
    <div class="nebula nebula-top-left"></div>
    <div class="nebula nebula-top-right"></div>
    <div class="nebula nebula-accent-bloom"></div>
    <div class="vignette"></div>
  </div>
</template>

<style scoped>
.aurora-stage {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: #030206;
}

.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(88px);
  will-change: transform, opacity;
  transition: background 0.7s ease, opacity 0.7s ease;
}

/* Main top smoky purple glow behind the pill navbar */
.nebula-top-center {
  top: -190px;
  left: 50%;
  width: min(920px, 95vw);
  height: 500px;
  transform: translateX(-46%);
  background: radial-gradient(
    ellipse at 52% 45%,
    rgba(126, 34, 206, 0.42) 0%,
    rgba(88, 28, 135, 0.28) 38%,
    rgba(46, 16, 101, 0.12) 65%,
    transparent 82%
  );
  animation: driftCenter 18s ease-in-out infinite alternate;
}

.nebula-top-left {
  top: -120px;
  left: 16%;
  width: 480px;
  height: 400px;
  background: radial-gradient(
    circle at center,
    rgba(76, 29, 149, 0.34) 0%,
    rgba(59, 7, 100, 0.14) 55%,
    transparent 80%
  );
  animation: driftLeft 22s ease-in-out infinite alternate;
}

.nebula-top-right {
  top: -150px;
  right: 8%;
  width: 520px;
  height: 380px;
  background: radial-gradient(
    circle at center,
    rgba(109, 40, 217, 0.24) 0%,
    rgba(59, 7, 100, 0.1) 58%,
    transparent 82%
  );
  animation: driftRight 24s ease-in-out infinite alternate;
}

/* Reactive character aura bloom on select / portfolio views */
.nebula-accent-bloom {
  top: 12%;
  left: 50%;
  width: min(820px, 90vw);
  height: 440px;
  transform: translateX(-50%);
  opacity: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--dynamic-accent-rgb), 0.18) 0%,
    rgba(var(--dynamic-accent-rgb), 0.05) 55%,
    transparent 80%
  );
}

.mode-select .nebula-accent-bloom {
  opacity: 0.9;
}

.mode-portfolio .nebula-accent-bloom {
  opacity: 0.72;
  top: -80px;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 35%,
    transparent 35%,
    rgba(2, 1, 5, 0.65) 100%
  );
}

@keyframes driftCenter {
  0% {
    transform: translateX(-48%) translateY(0px) scale(1);
  }
  100% {
    transform: translateX(-42%) translateY(18px) scale(1.06);
  }
}

@keyframes driftLeft {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(34px, 22px) scale(1.08);
  }
}

@keyframes driftRight {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-30px, 16px) scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nebula {
    animation: none;
  }
}
</style>
