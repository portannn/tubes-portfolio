<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import CharacterCard from './CharacterCard.vue'
import { useCharacterSelection } from '../composables/useCharacterSelection'

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

// `select` is the existing event that opens a character's portfolio (see App.vue).
const emit = defineEmits(['select', 'back', 'hover'])

const DEFAULT_ACCENT_RGB = '139, 92, 246'

// Per-card layout: tilted, staggered, overlapping.
const LAYOUT = [
  { tilt: -5, lift: 10 },
  { tilt: 3, lift: -8 },
  { tilt: -2.5, lift: 6 },
  { tilt: 5, lift: -10 },
]

const { selectedId, toggle, select, clear } = useCharacterSelection()
// Always start the screen with nothing flipped.
clear()

const selectedIndex = computed(() =>
  props.characters.findIndex((c) => c.id === selectedId.value)
)
const selectedCharacter = computed(() => props.characters[selectedIndex.value] ?? null)

function cardStyle(index) {
  const layout = LAYOUT[index % LAYOUT.length]
  const style = {
    '--tilt': `${layout.tilt}deg`,
    '--lift': `${layout.lift}px`,
    '--stagger': `${index * 60}ms`,
    '--z': index + 1,
  }
  if (index > 0) style.marginLeft = 'var(--overlap)'
  if (selectedIndex.value >= 0 && index !== selectedIndex.value) {
    // dimmed cards slide away from the selected one
    style['--push'] = index < selectedIndex.value ? 'calc(var(--push-amt) * -1)' : 'var(--push-amt)'
  }
  return style
}

const slashStyle = computed(() => ({
  // used on the 2x2 mobile grid to sit on the selected card's row
  '--sel-row': Math.floor(Math.max(selectedIndex.value, 0) / 2),
}))

const liveMessage = computed(() =>
  selectedCharacter.value
    ? `${selectedCharacter.value.name} selected. Press Escape to flip back.`
    : ''
)

function openPortfolio(characterId) {
  emit('select', characterId)
}

function onCardEnter(character) {
  emit('hover', character.accentRgb)
}

function onCardLeave() {
  emit('hover', selectedCharacter.value?.accentRgb ?? DEFAULT_ACCENT_RGB)
}

watch(selectedCharacter, (character) => {
  emit('hover', character?.accentRgb ?? DEFAULT_ACCENT_RGB)
})

// --- keyboard -----------------------------------------------------------
const cardRefs = []

function setCardRef(el, index) {
  cardRefs[index] = el
}

function moveFocus(direction) {
  const count = props.characters.length
  const current = cardRefs.findIndex((c) => c?.$el?.contains(document.activeElement))
  let next
  if (current === -1) {
    next = selectedIndex.value >= 0 ? selectedIndex.value : direction > 0 ? 0 : count - 1
  } else {
    next = (current + direction + count) % count
  }
  cardRefs[next]?.focus()
}

function handleKeydown(event) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return

  if (event.key === 'Escape') {
    if (selectedId.value) clear()
    else emit('back')
    return
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    moveFocus(event.key === 'ArrowRight' ? 1 : -1)
    return
  }

  const num = Number(event.key)
  if (Number.isInteger(num) && num >= 1 && num <= props.characters.length) {
    select(props.characters[num - 1].id)
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

    <div class="stage" role="group" aria-label="Team members">
      <!-- red shard sweeping in behind the selected card -->
      <Transition name="slash">
        <div v-if="selectedId" :key="selectedId" class="slash" :style="slashStyle" aria-hidden="true"></div>
      </Transition>

      <TransitionGroup name="card" tag="div" class="cards" appear>
        <CharacterCard
          v-for="(character, index) in characters"
          :key="character.id"
          :ref="(el) => setCardRef(el, index)"
          :character="character"
          :selected="selectedId === character.id"
          :dimmed="selectedId !== null && selectedId !== character.id"
          :style="cardStyle(index)"
          @select="toggle"
          @open="openPortfolio"
          @mouseenter="onCardEnter(character)"
          @mouseleave="onCardLeave"
          @focusin="onCardEnter(character)"
          @focusout="onCardLeave"
        />
      </TransitionGroup>
    </div>

    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>

    <p class="keyboard-hint">
      Tap a card to flip it · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>Enter</kbd> /
      <kbd>Space</kbd> select · <kbd>1</kbd> – <kbd>4</kbd> jump · <kbd>Esc</kbd> back
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
  border-color: #f5f5f5;
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
  background: #e60012;
  box-shadow: 0 0 10px #e60012;
  animation: dotPulse 2s ease-in-out infinite;
}

.select-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}

.select-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  padding: 6px 14px 6px calc(14px + 0.28em);
  margin-bottom: 14px;
  background: #0f0f0f;
  color: #f5f5f5;
  border: 2px solid #f5f5f5;
  transform: skewX(-12deg);
}

.select-title {
  display: inline-block;
  font-family: 'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(1.9rem, 4.4vw, 3.2rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.06em;
  padding: 0.12em 0.5em 0.06em;
  color: #0f0f0f;
  background: #f5f5f5;
  box-shadow: 6px 6px 0 #e60012;
  transform: skewX(-10deg) rotate(-1.5deg);
  margin-bottom: 18px;
}

.select-subtitle {
  display: inline-block;
  max-width: 100%;
  padding: 10px 16px;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(245, 245, 245, 0.92);
  background: rgba(15, 15, 15, 0.86);
  border-left: 4px solid #e60012;
}

.pending-notice {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 16px;
  background: #0f0f0f;
  border: 2px solid #f5f5f5;
  border-left: 4px solid #e60012;
  font-size: 0.78rem;
  color: #f5f5f5;
}

.pending-highlight {
  text-transform: capitalize;
  color: #ffffff;
}

/* ---- card stage --------------------------------------------------------- */
.stage {
  --card-w: 240px;
  --card-s: 1;
  --overlap: -24px;
  --push-amt: 16px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 44px 16px 40px;
  perspective: 1400px; /* parent of the 3D cards */
  /* full-bleed so the slash can run edge to edge and be clipped at the viewport */
  align-self: center;
  width: 100vw;
  overflow-x: clip;
}

/* TransitionGroup wrapper: layout-transparent so cards and the slash share one stacking context */
.cards {
  display: contents;
}

/* ---- red slash / shard -------------------------------------------------- */
.slash {
  position: absolute;
  z-index: 0;
  left: -40%; /* wide enough to run off both sides of the viewport (body clips x-overflow) */
  width: 180%;
  top: 21%; /* centred: (100% - height) / 2 — percent margins would use width, so no margin-top */
  height: 58%;
  background: #e60012;
  clip-path: polygon(0 14%, 100% 0, 100% 86%, 0 100%);
  transform: rotate(-7deg) skewX(-16deg) translateX(0);
  pointer-events: none;
  will-change: transform, opacity;
}

.slash::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(15, 15, 15, 0.35) 2px, transparent 2.6px) 0 0 / 12px 12px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 45%);
  mask-image: linear-gradient(90deg, transparent, #000 45%);
}

.slash::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 72%;
  height: 6px;
  background: #f5f5f5;
}

.slash-enter-active {
  transition:
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.slash-leave-active {
  transition:
    transform 240ms cubic-bezier(0.5, 0, 0.9, 0.4),
    opacity 200ms cubic-bezier(0.5, 0, 0.9, 0.4);
}

.slash-enter-from {
  opacity: 0;
  transform: rotate(-7deg) skewX(-16deg) translateX(-70%);
}

.slash-leave-to {
  opacity: 0;
  transform: rotate(-7deg) skewX(-16deg) translateX(60%);
}

.keyboard-hint {
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 6px 14px;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(245, 245, 245, 0.8);
  background: rgba(15, 15, 15, 0.86);
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

@media (max-width: 900px) {
  .stage {
    --card-w: 180px;
    --card-s: 0.75;
    --overlap: -22px;
    --push-amt: 12px;
  }
}

/* phones: 2x2 grid, no overlap, cards fill their cell */
@media (max-width: 600px) {
  .stage {
    --card-w: 100%;
    --card-s: 0.68;
    --overlap: 0px;
    --push-amt: 6px;

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 14px;
    justify-items: center;
    padding: 28px 16px 32px;
  }

  .stage :deep(.card) {
    max-width: 200px;
  }

  .slash {
    top: calc(10% + var(--sel-row, 0) * 50%);
    height: 30%;
  }

  .select-title {
    letter-spacing: 0.14em;
    padding-left: 0.14em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slash {
    display: none;
  }

  .slash-enter-active,
  .slash-leave-active {
    transition: none;
  }

  .back-pill:hover,
  .back-pill:focus-visible {
    transform: none;
  }
}
</style>
