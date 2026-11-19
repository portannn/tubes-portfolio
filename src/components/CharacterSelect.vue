<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import CharacterAvatar from './CharacterAvatar.vue'

const props = defineProps({
  characters: {
    type: Array,
    required: true,
  },
  pendingSection: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select', 'back', 'hover'])

const activeIndex = ref(-1)

function onCardEnter(character, idx) {
  activeIndex.value = idx
  emit('hover', character.accentRgb)
}

function onCardLeave() {
  activeIndex.value = -1
  emit('hover', '139, 92, 246')
}

function selectCharacter(character) {
  emit('select', character.id)
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    emit('back')
    return
  }

  const num = Number(event.key)
  if (num >= 1 && num <= props.characters.length) {
    selectCharacter(props.characters[num - 1])
    return
  }

  if (event.key === 'ArrowRight') {
    activeIndex.value = (activeIndex.value + 1) % props.characters.length
    emit('hover', props.characters[activeIndex.value].accentRgb)
  } else if (event.key === 'ArrowLeft') {
    activeIndex.value =
      activeIndex.value <= 0 ? props.characters.length - 1 : activeIndex.value - 1
    emit('hover', props.characters[activeIndex.value].accentRgb)
  } else if (event.key === 'Enter' && activeIndex.value >= 0) {
    const focused = document.activeElement
    if (!focused || focused.tagName !== 'BUTTON') {
      selectCharacter(props.characters[activeIndex.value])
    }
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
  <section class="select-screen" aria-label="Select your character">
    <div class="select-topbar">
      <button type="button" class="back-pill" @click="emit('back')">
        <svg viewBox="0 0 20 20" fill="none" class="back-icon" aria-hidden="true">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Welcome</span>
      </button>

      <div class="roster-pill">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span>04 PROFILES READY</span>
      </div>
    </div>

    <div class="select-header">
      <p class="select-eyebrow">PORTFOLIO COLLECTIVE</p>
      <h1 class="select-title">SELECT YOUR CHARACTER</h1>
      <p class="select-subtitle">
        Choose a member to explore their background, experience, projects, and skills.
      </p>

      <div v-if="pendingSection" class="pending-notice">
        Selecting a character will open their
        <strong class="pending-highlight">{{ pendingSection }}</strong> section
      </div>
    </div>

    <div class="character-grid" role="list">
      <button
        v-for="(character, index) in characters"
        :key="character.id"
        type="button"
        role="listitem"
        class="character-card"
        :class="{ 'is-highlighted': activeIndex === index }"
        :style="{
          '--card-accent': character.accentHex,
          '--card-secondary': character.secondaryHex,
          '--card-rgb': character.accentRgb,
          '--stagger': `${index * 80}ms`,
        }"
        @mouseenter="onCardEnter(character, index)"
        @mouseleave="onCardLeave"
        @focus="onCardEnter(character, index)"
        @blur="onCardLeave"
        @click="selectCharacter(character)"
      >
        <div class="card-glow-layer" aria-hidden="true"></div>
        <div class="card-top-bar">
          <span class="card-code">{{ character.code }}</span>
          <span class="card-class">{{ character.classTitle }}</span>
        </div>

        <div class="card-avatar-wrap">
          <CharacterAvatar :character="character" size="md" />
        </div>

        <div class="card-identity">
          <h2 class="card-name">{{ character.name }}</h2>
          <p class="card-role">{{ character.role }}</p>
          <p class="card-tagline">{{ character.tagline }}</p>
        </div>

        <div class="card-stats">
          <div v-for="stat in character.stats" :key="stat.label" class="stat-row">
            <div class="stat-meta">
              <span class="stat-label">{{ stat.label }}</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
            <div class="stat-track">
              <div class="stat-fill" :style="{ width: `${stat.value}%` }"></div>
            </div>
          </div>
        </div>

        <div class="card-tags">
          <span v-for="skill in character.topSkills.slice(0, 3)" :key="skill" class="skill-chip">
            {{ skill }}
          </span>
        </div>

        <div class="card-cta">
          <span>ENTER AS {{ character.name.toUpperCase() }}</span>
          <svg viewBox="0 0 20 20" fill="none" class="cta-arrow" aria-hidden="true">
            <path
              d="M4.5 10H15.5M15.5 10L11 5.5M15.5 10L11 14.5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>

    <p class="keyboard-hint">
      Tip: Click any card or press <kbd>1</kbd> – <kbd>4</kbd> to select a character
    </p>
  </section>
</template>

<style scoped>
.select-screen {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 24px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
}

.select-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.back-pill,
.roster-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.56);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(226, 226, 238, 0.78);
  letter-spacing: 0.04em;
  transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.back-pill:hover,
.back-pill:focus-visible {
  outline: none;
  color: #ffffff;
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateX(-2px);
}

.back-icon {
  width: 15px;
  height: 15px;
}

.roster-pill {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: rgba(212, 212, 224, 0.65);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow: 0 0 10px #a855f7;
  animation: dotPulse 2s ease-in-out infinite;
}

.select-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.select-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: rgba(192, 132, 252, 0.85);
  margin-bottom: 10px;
}

.select-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.8vw, 2.75rem);
  font-weight: 500;
  letter-spacing: 0.22em;
  padding-left: 0.22em;
  color: #ffffff;
  text-shadow: 0 0 32px rgba(147, 51, 234, 0.25);
  margin-bottom: 12px;
}

.select-subtitle {
  font-size: 0.92rem;
  color: rgba(214, 214, 228, 0.68);
  line-height: 1.65;
}

.pending-notice {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 16px;
  border-radius: 9999px;
  background: rgba(147, 51, 234, 0.14);
  border: 1px solid rgba(168, 85, 247, 0.35);
  font-size: 0.78rem;
  color: rgba(233, 213, 255, 0.9);
}

.pending-highlight {
  text-transform: capitalize;
  color: #ffffff;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.character-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 22px 20px 20px;
  border-radius: 22px;
  background: linear-gradient(
    180deg,
    rgba(20, 15, 32, 0.72) 0%,
    rgba(10, 8, 16, 0.86) 100%
  );
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  animation: cardStagger 0.65s cubic-bezier(0.22, 1, 0.36, 1) var(--stagger) both;
  transition:
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.32s ease,
    box-shadow 0.32s ease,
    background 0.32s ease;
}

.card-glow-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 14%,
    rgba(var(--card-rgb), 0.18) 0%,
    transparent 62%
  );
  opacity: 0.35;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.character-card:hover,
.character-card:focus-visible,
.character-card.is-highlighted {
  outline: none;
  transform: translateY(-8px);
  border-color: rgba(var(--card-rgb), 0.7);
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.65),
    0 0 36px rgba(var(--card-rgb), 0.22);
}

.character-card:hover .card-glow-layer,
.character-card:focus-visible .card-glow-layer,
.character-card.is-highlighted .card-glow-layer {
  opacity: 1;
}

.character-card:hover :deep(.avatar-frame),
.character-card:focus-visible :deep(.avatar-frame) {
  transform: scale(1.06);
  border-color: rgba(var(--card-rgb), 0.72);
  box-shadow: 0 0 34px rgba(var(--card-rgb), 0.38);
}

.character-card:hover :deep(.avatar-ring),
.character-card:focus-visible :deep(.avatar-ring) {
  transform: rotate(35deg);
  border-color: rgba(var(--card-rgb), 0.65);
}

.card-top-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.card-code {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--card-accent);
}

.card-class {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(var(--card-rgb), 0.12);
  border: 1px solid rgba(var(--card-rgb), 0.25);
  color: rgba(244, 244, 252, 0.88);
}

.card-avatar-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.card-identity {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 18px;
}

.card-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #ffffff;
  margin-bottom: 4px;
}

.card-role {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--card-accent);
  margin-bottom: 8px;
}

.card-tagline {
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(212, 212, 224, 0.65);
  min-height: 36px;
}

.card-stats {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 14px;
}

.stat-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.71rem;
  color: rgba(212, 212, 224, 0.7);
}

.stat-value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.stat-track {
  width: 100%;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, var(--card-secondary), var(--card-accent));
  box-shadow: 0 0 10px rgba(var(--card-rgb), 0.45);
  transition: width 0.5s ease;
}

.card-tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.skill-chip {
  font-size: 0.68rem;
  padding: 4px 9px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(226, 226, 238, 0.75);
}

.card-cta {
  position: relative;
  z-index: 1;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.71rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(244, 244, 252, 0.88);
  transition: background 0.28s ease, border-color 0.28s ease, color 0.28s ease;
}

.cta-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.28s ease;
}

.character-card:hover .card-cta,
.character-card:focus-visible .card-cta {
  background: rgba(var(--card-rgb), 0.22);
  border-color: rgba(var(--card-rgb), 0.7);
  color: #ffffff;
}

.character-card:hover .cta-arrow,
.character-card:focus-visible .cta-arrow {
  transform: translateX(3px);
}

.keyboard-hint {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(161, 161, 178, 0.56);
}

.keyboard-hint kbd {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: inherit;
  font-size: 0.7rem;
  color: rgba(226, 226, 238, 0.85);
}

@keyframes cardStagger {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

@media (max-width: 1080px) {
  .character-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .character-grid {
    grid-template-columns: 1fr;
  }

  .select-title {
    letter-spacing: 0.14em;
    padding-left: 0.14em;
  }
}
</style>
