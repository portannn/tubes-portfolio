<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { CHARACTERS } from '../data/characters'
import ColumnsGrid from './welcome/ColumnsGrid.vue'
import ShardsGrid from './welcome/ShardsGrid.vue'

const emit = defineEmits(['enter'])

// ---- team grid layout ---------------------------------------------------------
// 'shards'  = four irregular glass-shard panels around a shattered red centre (default)
// 'columns' = four slanted full-height columns drawn on the background
// Switch by changing DEFAULT_LAYOUT, passing the `layout` prop, or opening the site with ?layout=columns
const DEFAULT_LAYOUT = 'shards'
const LAYOUTS = { shards: ShardsGrid, columns: ColumnsGrid }

const props = defineProps({
  layout: { type: String, default: '' },
})

const queryLayout =
  typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('layout') : null

const GridComponent = computed(() => {
  const name = props.layout || queryLayout || DEFAULT_LAYOUT
  return LAYOUTS[name] ?? LAYOUTS[DEFAULT_LAYOUT]
})

// Ransom-note lettering: per-letter tilt and vertical offset
const TITLE = Array.from('WELCOME')
const LETTER_STYLE = [
  { r: -4, y: 0 },
  { r: 3, y: -4 },
  { r: -2, y: 3 },
  { r: 4, y: -2 },
  { r: -3, y: 4 },
  { r: 2, y: -3 },
  { r: -5, y: 1 },
]

function letterStyle(i) {
  const l = LETTER_STYLE[i % LETTER_STYLE.length]
  return { '--i': i, '--r': `${l.r}deg`, '--y': `${l.y}px` }
}

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

      <h1 class="welcome-title">
        <span class="sr-only">Welcome</span>
        <span class="ransom" aria-hidden="true">
          <span v-for="(letter, i) in TITLE" :key="i" class="ltr" :style="letterStyle(i)">
            {{ letter }}
          </span>
        </span>
      </h1>

      <p class="slab">developers save <em>THE WORLD.</em></p>

      <p class="welcome-description">
        Passionate web developers focused on crafting beautiful, interactive, and highly
        performant digital experiences. We bring ideas to life through modern technologies,
        elegant design, and seamless user interfaces.
      </p>

      <div class="enter-action">
        <button type="button" class="start-btn" @click.stop="handleEnter">
          <span class="start-label">PRESS START</span>
          <span class="key" aria-hidden="true">ENTER</span>
        </button>
      </div>
    </div>

    <!-- The team grid. Two layouts are available; see DEFAULT_LAYOUT. -->
    <component :is="GridComponent" :characters="CHARACTERS" />
  </section>
</template>

<style scoped>
.welcome-section {
  --red: #e60012;
  --ink: #0f0f0f;
  --paper: #f5f5f5;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --font-p5: 'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;

  position: relative;
  z-index: 10;
  min-height: 100vh;
  overflow-x: clip; /* the columns run off the right edge on purpose */
  /* same inset as a centred 1400px column, but the section itself spans the viewport */
  padding: 64px max(48px, calc((100vw - 1400px) / 2 + 48px)) 64px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  position: relative;
  z-index: 1; /* above the column layer */
}

/* ---- text blocks -------------------------------------------------------- */
.eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  padding: 6px 14px 6px calc(14px + 0.28em);
  margin-bottom: 14px;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--paper);
  transform: skewX(-12deg);
  animation: eyebrowIn 440ms var(--ease) 80ms backwards;
}

.welcome-title {
  margin: 0 0 20px;
}

.ransom {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-family: var(--font-p5);
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 1;
}

.ltr {
  display: inline-block;
  padding: 0.06em 0.14em 0.02em;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 4px 4px 0 rgba(15, 15, 15, 0.7);
  transform: translateY(var(--y)) rotate(var(--r));
  /* drops in with a slight overshoot, staggered per letter */
  animation: letterDrop 560ms cubic-bezier(0.22, 1.4, 0.36, 1) backwards;
  animation-delay: calc(160ms + var(--i) * 55ms);
}

.ltr:nth-child(3n + 2) {
  background: var(--red);
  color: var(--paper);
}

.ltr:nth-child(3n + 3) {
  background: var(--ink);
  color: var(--paper);
  outline: 3px solid var(--paper);
}

.slab {
  margin: 0 0 22px;
  padding: 0.15em 0.7em 0.1em;
  font-family: var(--font-p5);
  font-size: clamp(1.4rem, 2.8vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: 0.03em;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 6px 6px 0 var(--red);
  transform: skewX(-12deg) rotate(-1.5deg);
  animation: slabIn 520ms var(--ease) 560ms backwards;
}

.slab em {
  font-style: normal;
  color: var(--red);
}

.welcome-description {
  max-width: 520px;
  padding: 12px 18px;
  font-size: clamp(0.86rem, 1.35vw, 0.94rem);
  line-height: 1.7;
  color: rgba(245, 245, 245, 0.92);
  background: rgba(15, 15, 15, 0.86);
  border-left: 4px solid var(--red);
  animation: riseIn 520ms var(--ease) 700ms backwards;
}

/* ---- start button ------------------------------------------------------- */
.enter-action {
  margin-top: 30px;
}

.start-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.9em;
  padding: 0.5em 1.1em 0.45em 1.3em;
  font-family: var(--font-p5);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  letter-spacing: 0.06em;
  background: var(--ink);
  color: var(--paper);
  border: 3px solid var(--paper);
  box-shadow: 6px 6px 0 var(--red);
  transform: skewX(-10deg);
  transition: transform 180ms var(--ease);
  animation: btnIn 520ms var(--ease) 860ms backwards;
  touch-action: manipulation;
}

/* periodic diagonal sheen */
.start-btn::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 28%;
  background: rgba(245, 245, 245, 0.3);
  transform: translateX(-250%) skewX(-20deg);
  animation: sheen 3.8s cubic-bezier(0.45, 0, 0.2, 1) 1.8s infinite;
  pointer-events: none;
}

.start-label {
  position: relative;
}

.key {
  position: relative;
  padding: 0.35em 0.6em;
  font-family: var(--font-sans);
  font-size: 0.45em;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: var(--red);
  color: var(--paper);
  animation: blink 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

.start-btn:hover,
.start-btn:focus-visible {
  background: var(--paper);
  color: var(--ink);
  transform: skewX(-10deg) translate(-3px, -3px);
}

.start-btn:active {
  transform: skewX(-10deg) translate(3px, 3px);
}

.start-btn:focus-visible {
  outline: 3px dashed var(--paper);
  outline-offset: 6px;
}

.hint {
  margin-top: 22px;
  padding: 6px 12px;
  font-size: 0.75rem;
  color: rgba(245, 245, 245, 0.8);
  background: rgba(15, 15, 15, 0.86);
  animation: riseIn 520ms var(--ease) 1000ms backwards;
}

.hint kbd {
  display: inline-block;
  padding: 1px 6px;
  font-family: inherit;
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--paper);
}

/* ---- accessibility helper ---------------------------------------------- */
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

/* ---- keyframes (transform + opacity only) ------------------------------ */
@keyframes eyebrowIn {
  from {
    opacity: 0;
    transform: translateX(-30px) skewX(-12deg);
  }
}

@keyframes letterDrop {
  from {
    opacity: 0;
    transform: translateY(-70px) rotate(calc(var(--r) - 22deg)) scale(1.25);
  }
}

@keyframes slabIn {
  from {
    opacity: 0;
    transform: translateX(-70px) skewX(-12deg) rotate(-1.5deg);
  }
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes btnIn {
  from {
    opacity: 0;
    transform: translateX(-50px) skewX(-10deg);
  }
}

@keyframes sheen {
  0% {
    transform: translateX(-250%) skewX(-20deg);
  }
  55%,
  100% {
    transform: translateX(650%) skewX(-20deg);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

/* ---- responsive --------------------------------------------------------- */
@media (max-width: 1100px) {
  .welcome-content {
    max-width: 540px;
  }
}

@media (max-width: 900px) {
  .welcome-section {
    justify-items: center;
    gap: 40px;
    padding: 48px 20px 0;
  }

  .welcome-content {
    align-items: center;
    text-align: center;
  }

  .ransom {
    justify-content: center;
  }

  .welcome-description {
    border-left: 0;
    border-top: 4px solid var(--red);
  }
}

/* ---- reduced motion: static layout, a single gentle fade --------------- */
@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .ltr,
  .slab,
  .welcome-description,
  .start-btn,
  .hint,
  .key,
  .start-btn::after {
    animation: none;
  }

  .welcome-content {
    animation: fadeOnly 240ms ease-out;
  }

  .start-btn {
    transition: none;
  }

  @keyframes fadeOnly {
    from {
      opacity: 0;
    }
  }
}
</style>
