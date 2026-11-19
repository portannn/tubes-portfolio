<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import CharacterAvatar from './CharacterAvatar.vue'
import { CHARACTERS } from '../data/characters'

const emit = defineEmits(['enter'])

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

// Mystery grid: slight tilt / offset per tile, same language as the select screen
const TILE_LAYOUT = [
  { tilt: -3, lift: 6 },
  { tilt: 2.5, lift: -8 },
  { tilt: 2, lift: 8 },
  { tilt: -2.5, lift: -6 },
]

function letterStyle(i) {
  const l = LETTER_STYLE[i % LETTER_STYLE.length]
  return { '--i': i, '--r': `${l.r}deg`, '--y': `${l.y}px` }
}

function tileStyle(i) {
  const l = TILE_LAYOUT[i % TILE_LAYOUT.length]
  return { '--i': i, '--tilt': `${l.tilt}deg`, '--lift': `${l.lift}px` }
}

function nameLetters(character) {
  return Array.from(character.name.toUpperCase())
}

// ---- reveal state: only one tile is open at a time ------------------------
// mouse hover, keyboard focus, or (touch) first tap opens a tile
const openIndex = ref(-1)
const photoFailed = ref({})

function hasPhoto(character) {
  return Boolean(character.avatarUrl) && !photoFailed.value[character.id]
}

function onTileEnter(i, event) {
  if (event.pointerType === 'mouse') openIndex.value = i
}

function onTileLeave(i, event) {
  if (event.pointerType === 'mouse' && openIndex.value === i) openIndex.value = -1
}

function onTileFocus(i, event) {
  if (event.target.matches(':focus-visible')) openIndex.value = i
}

function onTileBlur(i) {
  if (openIndex.value === i) openIndex.value = -1
}

function onTileClick(i, event) {
  // Touch has no hover: the first tap reveals, a second tap (or any other tap) starts.
  if (window.matchMedia('(hover: none)').matches && openIndex.value !== i) {
    event.stopPropagation()
    openIndex.value = i
  }
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
      <p class="eyebrow">PORTFOLIO COLLECTIVE</p>

      <h1 class="welcome-title">
        <span class="sr-only">Welcome</span>
        <span class="ransom" aria-hidden="true">
          <span v-for="(letter, i) in TITLE" :key="i" class="ltr" :style="letterStyle(i)">
            {{ letter }}
          </span>
        </span>
      </h1>

      <p class="slab">CHOOSE YOUR <em>DEVELOPER.</em></p>

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

      <p class="hint">Press <kbd>Enter</kbd> or click anywhere</p>
    </div>

    <div class="grid" role="group" aria-label="Team members">
      <button
        v-for="(character, i) in CHARACTERS"
        :key="character.id"
        type="button"
        class="tile"
        :class="{ 'is-open': openIndex === i }"
        :style="tileStyle(i)"
        :aria-label="`${character.name}, ${character.role}`"
        @pointerenter="onTileEnter(i, $event)"
        @pointerleave="onTileLeave(i, $event)"
        @focus="onTileFocus(i, $event)"
        @blur="onTileBlur(i)"
        @click="onTileClick(i, $event)"
      >
        <span class="tile-float">
          <span class="tile-body">
            <!-- hidden identity: silhouette + question mark -->
            <span class="mystery" aria-hidden="true">
              <svg class="sil" viewBox="0 0 120 140" focusable="false">
                <circle cx="60" cy="46" r="25" />
                <rect x="51" y="66" width="18" height="24" />
                <path d="M6 140 C8 100 32 82 60 82 C88 82 112 100 114 140 Z" />
              </svg>
              <span class="q">?</span>
            </span>

            <!-- the persona, wiped in on hover / focus / tap -->
            <span class="reveal" aria-hidden="true">
              <span class="r-icon pop" style="--d: 120ms">
                <img
                  v-if="hasPhoto(character)"
                  class="r-photo"
                  :src="character.avatarUrl"
                  :alt="''"
                  draggable="false"
                  @error="photoFailed[character.id] = true"
                />
                <span v-else class="r-icon-inner">
                  <CharacterAvatar :character="character" size="md" />
                </span>
              </span>
              <span class="r-name">
                <span
                  v-for="(letter, li) in nameLetters(character)"
                  :key="li"
                  class="r-ltr"
                  :style="{ '--li': li }"
                >
                  {{ letter }}
                </span>
              </span>
              <span class="r-role pop" style="--d: 300ms">{{ character.role }}</span>
            </span>
          </span>
          <span class="t-num" aria-hidden="true">{{ character.code }}</span>
        </span>
      </button>
    </div>
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 48px 64px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: 24px;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
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

/* ---- 2x2 mystery grid --------------------------------------------------- */
.grid {
  --cell: 240px;
  --ts: 1;
  display: grid;
  grid-template-columns: repeat(2, var(--cell));
  gap: 26px 24px;
  justify-content: center;
  align-content: center;
}

.tile {
  position: relative;
  z-index: 1;
  display: block;
  width: var(--cell);
  aspect-ratio: 1 / 1.1;
  padding: 0;
  cursor: pointer;
  transform: translate3d(0, var(--lift, 0px), 0) rotate(var(--tilt, 0deg)) scale(1);
  transition: transform 320ms var(--ease);
  animation: teaserIn 600ms var(--ease) backwards;
  animation-delay: calc(380ms + var(--i) * 90ms);
  will-change: transform;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.tile.is-open {
  z-index: 5;
  transform: translate3d(0, calc(var(--lift, 0px) - 8px), 0) rotate(0deg) scale(1.05);
}

.tile:focus-visible {
  outline: 3px dashed var(--paper);
  outline-offset: 8px;
}

/* idle bob on an inner wrapper so it never fights the entrance / open transforms */
.tile-float {
  position: absolute;
  inset: 0;
  animation: float 4.4s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: calc(var(--i) * -1s);
}

.tile.is-open .tile-float {
  animation-play-state: paused;
}

.tile-body {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background: var(--ink);
  border: max(3px, calc(4px * var(--ts))) solid var(--paper);
  box-shadow: calc(-6px * var(--ts)) calc(6px * var(--ts)) 0 #5c0008;
}

.t-num {
  position: absolute;
  top: calc(10px * var(--ts));
  left: calc(10px * var(--ts));
  z-index: 3;
  padding: 0.1em 0.35em 0.05em;
  font-family: var(--font-p5);
  font-size: max(18px, calc(32px * var(--ts)));
  line-height: 1;
  letter-spacing: 0.04em;
  background: var(--red);
  color: var(--paper);
  transform: skewX(-12deg) rotate(-3deg);
  box-shadow: 3px 3px 0 var(--paper);
  pointer-events: none;
}

/* hidden identity */
.mystery {
  position: absolute;
  inset: 0;
  background-color: var(--red);
  background-image: radial-gradient(circle, rgba(15, 15, 15, 0.4) 2px, transparent 2.6px);
  background-size: 14px 14px;
  transition:
    transform 360ms var(--ease),
    opacity 220ms ease-out;
}

.mystery::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(118deg, transparent 0 56%, rgba(15, 15, 15, 0.85) 56% 68%, transparent 68%);
}

.sil {
  position: absolute;
  left: 50%;
  bottom: -2%;
  width: 74%;
  transform: translateX(-50%);
  fill: var(--ink);
}

.q {
  position: absolute;
  left: 50%;
  top: 32%;
  font-family: var(--font-p5);
  font-size: calc(92px * var(--ts));
  line-height: 1;
  color: var(--paper);
  text-shadow: 4px 4px 0 var(--ink);
  transform: translateX(-50%) rotate(-6deg);
  animation: qPulse 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: calc(var(--i) * -0.55s);
}

.tile.is-open .mystery {
  transform: translateX(10%);
  opacity: 0;
}

/* the persona: wipes in from the left behind a red/white diagonal edge */
.reveal {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: calc(10px * var(--ts));
  padding: calc(38px * var(--ts)) calc(12px * var(--ts)) calc(16px * var(--ts));
  background: var(--ink);
  transform: translateX(-125%);
  transition: transform 360ms var(--ease);
}

.reveal::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(118deg, transparent 0 54%, var(--red) 54% 68%, transparent 68%),
    radial-gradient(circle, rgba(230, 0, 18, 0.4) 1.4px, transparent 1.9px) 0 0 / 9px 9px;
}

.reveal::after {
  content: '';
  position: absolute;
  top: -6%;
  bottom: -6%;
  right: -28px;
  width: 22px;
  background: var(--red);
  box-shadow: 8px 0 0 var(--paper);
  transform: skewX(-12deg);
}

.tile.is-open .reveal {
  transform: translateX(0);
}

.r-icon {
  position: relative;
  flex: none;
  width: calc(96px * var(--ts));
  height: calc(96px * var(--ts));
}

.r-icon::before {
  content: '';
  position: absolute;
  inset: -12%;
  background: var(--red);
  transform: skewX(-12deg) rotate(4deg);
  box-shadow: 4px 4px 0 var(--paper);
}

.r-icon-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  transform: scale(var(--ts));
}

.r-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid var(--paper);
  box-shadow: 4px 4px 0 var(--red);
  transform: skewX(-6deg) rotate(2deg);
}

.r-name {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  font-family: var(--font-p5);
  font-size: max(16px, calc(28px * var(--ts)));
  line-height: 1;
}

.r-ltr {
  --lr: -1.5deg;
  display: inline-block;
  padding: 0.08em 0.16em 0.02em;
  background: var(--paper);
  color: var(--ink);
  opacity: 0;
  transform: translateY(12px) rotate(var(--lr));
  transition:
    transform 260ms var(--ease),
    opacity 160ms ease-out;
}

.r-ltr:nth-child(3n + 2) {
  --lr: -4deg;
  background: var(--red);
  color: var(--paper);
}

.r-ltr:nth-child(3n + 3) {
  --lr: 3deg;
  background: var(--ink);
  color: var(--paper);
  outline: 2px solid var(--paper);
}

.r-role {
  position: relative;
  max-width: 100%;
  padding: 0.3em 0.9em;
  font-size: max(10px, calc(12px * var(--ts)));
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  background: var(--paper);
  color: var(--ink);
  transform: skewX(-12deg);
}

/* icon + role pop up after the wipe; delay only applies while opening */
.pop {
  opacity: 0;
  transition:
    transform 260ms var(--ease),
    opacity 160ms ease-out;
}

.r-icon.pop {
  transform: translateY(14px) scale(0.9);
}

.r-role.pop {
  transform: translateY(10px) skewX(-12deg);
}

.tile.is-open .r-icon.pop {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: var(--d);
}

.tile.is-open .r-role.pop {
  opacity: 1;
  transform: translateY(0) skewX(-12deg);
  transition-delay: var(--d);
}

.tile.is-open .r-ltr {
  opacity: 1;
  transform: translateY(0) rotate(var(--lr));
  transition-delay: calc(140ms + var(--li) * 35ms);
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

@keyframes teaserIn {
  from {
    opacity: 0;
    transform: translate3d(0, 90px, 0) rotate(calc(var(--tilt, 0deg) - 8deg)) scale(0.9);
  }
}

@keyframes qPulse {
  from {
    transform: translateX(-50%) rotate(-6deg) scale(1);
  }
  to {
    transform: translateX(-50%) rotate(-3deg) scale(1.09);
  }
}

@keyframes float {
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(7px);
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
  .grid {
    --cell: 190px;
    --ts: 0.8;
  }
}

@media (max-width: 900px) {
  .welcome-section {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    gap: 40px;
    padding: 104px 20px 48px;
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

  .grid {
    --cell: 190px;
    --ts: 0.8;
  }
}

@media (max-width: 480px) {
  .grid {
    --cell: 148px;
    --ts: 0.62;
    gap: 22px 18px;
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
  .tile,
  .tile-float,
  .q,
  .key,
  .start-btn::after {
    animation: none;
  }

  .welcome-content,
  .grid {
    animation: fadeOnly 240ms ease-out;
  }

  .start-btn,
  .tile {
    transition: none;
  }

  /* no wipe: crossfade mystery <-> persona */
  .reveal {
    transform: none;
    opacity: 0;
    transition: opacity 180ms ease-out;
  }

  .reveal::after {
    display: none;
  }

  .tile.is-open .reveal {
    opacity: 1;
  }

  .tile.is-open .mystery {
    transform: none;
    opacity: 0;
  }

  .mystery {
    transition: opacity 180ms ease-out;
  }

  .r-ltr,
  .pop,
  .tile.is-open .r-ltr,
  .tile.is-open .r-icon.pop,
  .tile.is-open .r-role.pop {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .r-role.pop,
  .tile.is-open .r-role.pop {
    transform: skewX(-12deg);
  }

  @keyframes fadeOnly {
    from {
      opacity: 0;
    }
  }
}
</style>
