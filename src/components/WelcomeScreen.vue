<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['enter'])

function handleEnter() {
  emit('enter')
}

function handleStageClick() {
  const selection = window.getSelection()?.toString()
  if (selection) return
  handleEnter()
}

function handleKeydown(event) {
  if (event.key === 'Enter' && document.activeElement === document.body) {
    handleEnter()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section class="welcome-section" aria-label="Welcome screen" @click="handleStageClick">
    <div class="welcome-content">
      <h1 class="welcome-title">WELCOME</h1>

      <p class="welcome-description">
        Passionate web developers focused on crafting beautiful, interactive, and highly
        performant digital experiences. We bring ideas to life through modern technologies,
        elegant design, and seamless user interfaces.
      </p>

      <div class="enter-action">
        <button type="button" class="enter-button" @click.stop="handleEnter">
          <span class="enter-button-glow" aria-hidden="true"></span>
          <span class="enter-button-text">CLICK TO ENTER</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px 48px;
}

.welcome-content {
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: heroRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.welcome-title {
  font-family: var(--font-sans);
  font-size: clamp(2.15rem, 4.6vw, 3.25rem);
  font-weight: 400;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  color: #ffffff;
  margin-bottom: 24px;
  text-shadow: 0 0 36px rgba(168, 85, 247, 0.16);
}

.welcome-description {
  max-width: 540px;
  font-size: clamp(0.86rem, 1.35vw, 0.94rem);
  font-weight: 400;
  line-height: 1.75;
  color: rgba(224, 224, 235, 0.72);
  margin-bottom: 36px;
}

.enter-action {
  display: flex;
  justify-content: center;
}

.enter-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 34px;
  border-radius: 9999px;
  background: rgba(12, 10, 18, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #f8fafc;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  overflow: hidden;
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.28s ease,
    box-shadow 0.28s ease,
    background 0.28s ease;
}

.enter-button-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(168, 85, 247, 0.24) 0%,
    transparent 72%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.enter-button-text {
  position: relative;
  z-index: 1;
}

.enter-button:hover,
.enter-button:focus-visible {
  outline: none;
  transform: translateY(-2px) scale(1.02);
  border-color: rgba(168, 85, 247, 0.65);
  background: rgba(22, 14, 36, 0.85);
  box-shadow: 0 0 28px rgba(147, 51, 234, 0.32),
    0 8px 24px rgba(0, 0, 0, 0.55);
}

.enter-button:hover .enter-button-glow,
.enter-button:focus-visible .enter-button-glow {
  opacity: 1;
}

.enter-button:active {
  transform: translateY(0) scale(0.99);
}

@keyframes heroRise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .welcome-title {
    letter-spacing: 0.28em;
    padding-left: 0.28em;
  }

  .enter-button {
    padding: 12px 28px;
  }
}
</style>
