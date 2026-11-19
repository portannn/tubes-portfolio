<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import CharacterAvatar from './CharacterAvatar.vue'

/**
 * Persona 5 style character card.
 *
 * Structure (3D):
 *   .card            wrapper: resting tilt / scale / dim "slide back" (perspective comes from the parent)
 *     .tilt          preserve-3d, pivots toward the mouse (rotateX / rotateY, mouse only)
 *       .flip        preserve-3d, spins on the Y axis
 *         .front     <button aria-pressed>  — number, icon, name, role
 *         .back      photo, name label, role tag, VIEW PORTFOLIO
 *
 * Parent contract (CSS custom properties, all optional):
 *   --tilt, --lift, --push, --z, --stagger, --card-w, --card-s
 * Enter animation: the parent wraps cards in <TransitionGroup name="card" appear>.
 */
const props = defineProps({
  character: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  dimmed: { type: Boolean, default: false },
})

// `select` = toggle this card (flip / flip back). `open` = VIEW PORTFOLIO.
const emit = defineEmits(['select', 'open'])

const frontRef = ref(null)
const photoFailed = ref(false)

watch(
  () => props.character.avatarUrl,
  () => {
    photoFailed.value = false
  }
)

const hasPhoto = computed(() => Boolean(props.character.avatarUrl) && !photoFailed.value)

const initials = computed(() => {
  const words = (props.character.name || '').trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  const raw = words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)
  return raw.toUpperCase()
})

const letters = computed(() => Array.from((props.character.name || '').toUpperCase()))

// ---- mouse tilt ------------------------------------------------------------
// Cursor near an edge -> that edge pivots away from the viewer ("pressed in"),
// proportional to how far the cursor is from the centre. To invert (edge
// pops toward you) negate both values in applyTilt().
const MAX_TILT = 14 // degrees, resting / dimmed cards
const MAX_TILT_SELECTED = 7 // calmer on the back face so the button stays easy to hit

const hostRef = ref(null)
const tiltRef = ref(null)
const tilting = ref(false)

const reduceMotion =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

let rafId = 0
let lastPointer = null

function setTilt(rx, ry) {
  const el = tiltRef.value
  if (!el) return
  el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
  el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
}

function applyTilt() {
  rafId = 0
  const host = hostRef.value
  if (!host || !lastPointer) return
  // the wrapper is not rotated by .tilt, so its rect is stable while tilting
  const rect = host.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  const nx = (lastPointer.x - rect.left) / rect.width // 0 = left, 1 = right
  const ny = (lastPointer.y - rect.top) / rect.height // 0 = top,  1 = bottom
  const max = props.selected ? MAX_TILT_SELECTED : MAX_TILT
  const clamp = (v) => Math.max(-max, Math.min(max, v))
  setTilt(clamp((0.5 - ny) * 2 * max), clamp((nx - 0.5) * 2 * max))
}

function onPointerMove(event) {
  if (event.pointerType !== 'mouse' || reduceMotion?.matches) return
  lastPointer = { x: event.clientX, y: event.clientY }
  tilting.value = true
  if (!rafId) rafId = requestAnimationFrame(applyTilt) // at most one update per frame
}

function onPointerLeave() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = 0
  lastPointer = null
  tilting.value = false
  setTilt(0, 0) // settles back with a springy ease (see .tilt)
}

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

defineExpose({
  focus: () => frontRef.value?.focus(),
})
</script>

<template>
  <div
    ref="hostRef"
    class="card"
    :class="{ 'is-selected': selected, 'is-dimmed': dimmed }"
    :data-character-id="character.id"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div ref="tiltRef" class="tilt" :class="{ 'is-tilting': tilting }">
      <div class="flip">
        <!-- FRONT -->
        <button
          ref="frontRef"
          type="button"
          class="face front"
          :aria-pressed="selected"
          :aria-label="`${character.name}, ${character.role}`"
          @click="emit('select', character.id)"
        >
          <span class="frame" aria-hidden="true"></span>

          <span class="num" aria-hidden="true">{{ character.code }}</span>

          <span class="icon" aria-hidden="true">
            <span class="icon-inner"><CharacterAvatar :character="character" size="md" /></span>
          </span>

          <span class="front-text" aria-hidden="true">
            <span class="name">
              <span v-for="(letter, i) in letters" :key="i" class="ltr">{{ letter }}</span>
            </span>
            <span class="role">{{ character.role }}</span>
          </span>

          <span class="dim dim-sat" aria-hidden="true"></span>
          <span class="dim dim-ink" aria-hidden="true"></span>
        </button>

        <!-- BACK (inert while hidden so its button is not tabbable) -->
        <div
          class="face back"
          :inert="!selected"
          :aria-hidden="selected ? null : 'true'"
          @click="emit('select', character.id)"
        >
          <div class="back-inner">
            <div class="photo">
              <div class="photo-inner">
                <img
                  v-if="hasPhoto"
                  class="photo-img"
                  :src="character.avatarUrl"
                  :alt="`Photo of ${character.name}`"
                  draggable="false"
                  @error="photoFailed = true"
                />
                <div v-else class="fallback" role="img" :aria-label="`${character.name} initials`">
                  <span>{{ initials }}</span>
                </div>
              </div>
            </div>

            <div class="meta">
              <span class="label">{{ character.name }}</span>
              <span class="tag">{{ character.role }}</span>
            </div>

            <button
              type="button"
              class="view-btn"
              :aria-label="`View ${character.name}'s portfolio`"
              @click.stop="emit('open', character.id)"
            >
              VIEW PORTFOLIO
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  --red: #e60012;
  --ink: #0f0f0f;
  --paper: #f5f5f5;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  /* slight overshoot, then settle */
  --ease-spin: cubic-bezier(0.2, 1.3, 0.4, 1);
  --s: var(--card-s, 1);
  --font-p5: 'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
  --halftone: radial-gradient(circle, rgba(230, 0, 18, 0.4) 1.4px, transparent 1.9px);

  position: relative;
  flex: none;
  width: var(--card-w, 240px);
  aspect-ratio: 3 / 4.3;
  z-index: var(--z, 1);
  transform-style: preserve-3d;
  transform: translate3d(0, var(--lift, 0px), 0) rotate(var(--tilt, 0deg)) scale(1);
  transition:
    transform 340ms var(--ease),
    z-index 0s linear 220ms; /* drop behind only after the flip-back is under way */
  will-change: transform, opacity;
  -webkit-tap-highlight-color: transparent;
}

/* ---- state: selected / dimmed ------------------------------------------ */
.card.is-selected {
  z-index: 20;
  transform: translate3d(0, calc(-22px * var(--s)), 0) rotate(0deg) scale(1.12);
  transition:
    transform 300ms var(--ease),
    z-index 0s;
}

.card.is-dimmed {
  transform: translate3d(var(--push, 0px), calc(var(--lift, 0px) + 10px), -70px)
    rotate(var(--tilt, 0deg)) scale(0.96);
}

@media (hover: hover) {
  .card:not(.is-selected):hover {
    transform: translate3d(var(--push, 0px), calc(var(--lift, 0px) - 10px), 0)
      rotate(var(--tilt, 0deg)) scale(1.04);
  }
}

/* visible keyboard focus: dashed ring around the whole card */
.card:has(.front:focus-visible) {
  outline: 3px dashed var(--paper);
  outline-offset: 10px;
}

/* ---- enter (TransitionGroup name="card" appear) ------------------------- */
.card-enter-from {
  opacity: 0;
  transform: translate3d(0, 56px, 0) rotate(calc(var(--tilt, 0deg) - 5deg)) scale(0.9);
}

.card-enter-active {
  transition:
    transform 420ms var(--ease) var(--stagger, 0ms),
    opacity 240ms var(--ease) var(--stagger, 0ms);
}

/* ---- mouse tilt (--rx / --ry are written by JS) ------------------------- */
.tilt {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  /* leaving: springy settle back to flat */
  transition: transform 520ms cubic-bezier(0.22, 1.3, 0.36, 1);
  will-change: transform;
}

/* following the cursor: short, snappy catch-up */
.tilt.is-tilting {
  transition: transform 110ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* ---- flip --------------------------------------------------------------- */
.flip {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 450ms var(--ease-spin);
  will-change: transform;
}

/* 540deg = 1.5 turns: spins and lands on the back face */
.is-selected .flip {
  transform: rotateY(540deg);
}

.face {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* ---- front -------------------------------------------------------------- */
.front {
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: calc(14px * var(--s)) calc(12px * var(--s)) calc(16px * var(--s));
  background: var(--ink);
  color: var(--paper);
  text-align: center;
  cursor: pointer;
  touch-action: manipulation;
  box-shadow: calc(-6px * var(--s)) calc(6px * var(--s)) 0 #5c0008;
}

.front::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(118deg, transparent 0 54%, var(--red) 54% 68%, transparent 68%),
    var(--halftone) 0 0 / 9px 9px;
  opacity: 0.9;
}

.frame {
  position: absolute;
  inset: 0;
  border: max(3px, calc(4px * var(--s))) solid var(--paper);
  pointer-events: none;
}

.num {
  position: relative;
  align-self: flex-start;
  font-family: var(--font-p5);
  font-size: max(20px, calc(34px * var(--s)));
  line-height: 1;
  letter-spacing: 0.04em;
  padding: 0.1em 0.35em 0.05em;
  background: var(--red);
  color: var(--paper);
  transform: skewX(-12deg) rotate(-3deg);
  box-shadow: 3px 3px 0 var(--paper);
}

.icon {
  position: relative;
  width: calc(96px * var(--s));
  height: calc(96px * var(--s));
  margin-top: calc(4px * var(--s));
}

.icon::before {
  content: '';
  position: absolute;
  inset: -12%;
  background: var(--red);
  transform: skewX(-12deg) rotate(4deg);
  box-shadow: 5px 5px 0 var(--paper);
}

.icon-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  transform: scale(var(--s));
}

.front-text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(8px * var(--s));
  max-width: 100%;
}

/* ransom-note lettering */
.name {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  font-family: var(--font-p5);
  font-size: max(18px, calc(28px * var(--s)));
  line-height: 1;
}

.ltr {
  display: inline-block;
  padding: 0.08em 0.16em 0.02em;
  background: var(--paper);
  color: var(--ink);
}

.ltr:nth-child(3n + 2) {
  background: var(--red);
  color: var(--paper);
  transform: rotate(-4deg) translateY(-2px);
}

.ltr:nth-child(3n + 3) {
  background: var(--ink);
  color: var(--paper);
  outline: 2px solid var(--paper);
  transform: rotate(3deg) translateY(1px);
}

.ltr:nth-child(3n + 1) {
  transform: rotate(-1.5deg);
}

.role {
  max-width: 100%;
  font-size: max(10px, calc(12px * var(--s)));
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3em 0.9em;
  background: var(--paper);
  color: var(--ink);
  transform: skewX(-12deg);
}

/* dim = darken + desaturate, via two overlays whose opacity is animated */
.dim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 240ms var(--ease);
}

.dim-sat {
  background: #808080;
  mix-blend-mode: saturation;
}

.dim-ink {
  background: var(--ink);
}

.is-dimmed .dim-sat {
  opacity: 0.9;
}

.is-dimmed .dim-ink {
  opacity: 0.55;
}

/* ---- back --------------------------------------------------------------- */
.back {
  transform: rotateY(180deg);
  background: var(--ink);
  outline: max(3px, calc(4px * var(--s))) solid var(--red);
  box-shadow: calc(10px * var(--s)) calc(10px * var(--s)) 0 var(--paper);
  cursor: pointer;
}

.back-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: calc(6px * var(--s));
  padding: max(5px, calc(8px * var(--s)));
  background: var(--halftone) 0 0 / 9px 9px;
}

/* cut-out photo: white outer shape + inner shape with the same jagged edge */
.photo {
  --cut: polygon(0 4%, 97% 0, 100% 95%, 3% 100%);
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  background: var(--paper);
  clip-path: var(--cut);
}

.photo-inner {
  position: absolute;
  inset: max(3px, calc(6px * var(--s)));
  overflow: hidden;
  background: var(--ink);
  clip-path: var(--cut);
}

.photo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  user-select: none;
}

.fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--red);
  background-image: radial-gradient(circle, rgba(15, 15, 15, 0.55) 2px, transparent 2.6px);
  background-size: 10px 10px;
}

.fallback span {
  font-family: var(--font-p5);
  font-size: max(44px, calc(84px * var(--s)));
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--paper);
  text-shadow: 4px 4px 0 var(--ink);
  transform: skewX(-10deg) rotate(-4deg);
}

.meta {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  margin-top: calc(-24px * var(--s));
  padding-left: calc(4px * var(--s));
}

.label {
  max-width: 100%;
  font-family: var(--font-p5);
  font-size: max(18px, calc(30px * var(--s)));
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 0.1em 0.45em 0.06em;
  background: var(--paper);
  color: var(--ink);
  transform: skewX(-12deg) rotate(-2deg);
  box-shadow: 4px 4px 0 var(--red);
}

.tag {
  max-width: 100%;
  margin: -2px 0 0 calc(16px * var(--s));
  font-size: max(10px, calc(12px * var(--s)));
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25em 0.8em;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--paper);
  transform: skewX(-12deg);
}

.view-btn {
  display: block;
  width: 100%;
  min-height: 40px;
  padding: 0.55em 0.4em;
  font-family: var(--font-p5);
  font-size: max(13px, calc(16px * var(--s)));
  letter-spacing: 0.08em;
  line-height: 1.1;
  background: var(--red);
  color: var(--paper);
  transform: skewX(-8deg);
  box-shadow: 3px 3px 0 var(--paper);
  touch-action: manipulation;
  transition: transform 160ms var(--ease);
}

.view-btn:hover,
.view-btn:focus-visible {
  background: var(--paper);
  color: var(--red);
  transform: skewX(-8deg) translate(-2px, -2px);
}

.view-btn:active {
  transform: skewX(-8deg) translate(2px, 2px);
}

.view-btn:focus-visible {
  outline: 3px solid var(--paper);
  outline-offset: 3px;
}

/* ---- small screens ------------------------------------------------------ */
@media (max-width: 600px) {
  .card.is-selected {
    transform: translate3d(0, -10px, 0) rotate(0deg) scale(1.12);
  }
}

/* ---- reduced motion: no spin, no travel — crossfade the faces ----------- */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card.is-selected {
    transition: opacity 140ms ease-out;
  }

  .card-enter-from {
    transform: translate3d(0, var(--lift, 0px), 0) rotate(var(--tilt, 0deg)) scale(1);
  }

  .card-enter-active {
    transition: opacity 160ms ease-out var(--stagger, 0ms);
  }

  .tilt {
    transform: none;
    transition: none;
  }

  .flip,
  .is-selected .flip {
    transform: none;
    transition: none;
  }

  .back {
    transform: none;
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease-out;
  }

  .front {
    transition: opacity 160ms ease-out;
  }

  .is-selected .back {
    opacity: 1;
    pointer-events: auto;
  }

  .is-selected .front {
    opacity: 0;
  }

  .view-btn {
    transition: none;
  }
}
</style>
