<script setup>
import CharacterAvatar from '../CharacterAvatar.vue'
import { useRevealGrid } from '../../composables/useRevealGrid'

/**
 * Welcome-screen layout "shards": four irregular glass-shard panels (top-left, top-right, bottom,
 * big on the right) with a shattered red centre between them, like the Persona 5 splash art.
 * Idle = red shard with a silhouette and "?"; hover = the picture only.
 * Sits next to the "columns" layout (see WelcomeScreen.vue).
 *
 * All geometry is in percent of the zone, so the composition scales with the viewport.
 */
defineProps({
  characters: { type: Array, required: true },
})

// Interactive shards. box = position/size in % of the zone, poly = clip polygon in % of the box,
// r = resting tilt (deg), es = emblem scale (fallback image), flip = silhouette facing,
// from = where the shard flies in from (px).
const SHARDS = [
  { x: 0, y: 12, w: 46, h: 32, poly: '0 16%, 60% 0, 100% 36%, 74% 100%, 5% 86%', r: -3, es: 1.5, flip: 1, sil: 68, from: [-90, -60] },
  { x: 43, y: 9, w: 38, h: 42, poly: '22% 0, 100% 13%, 87% 69%, 51% 100%, 0 45%', r: 2.5, es: 1.45, flip: -1, sil: 74, from: [70, -90] },
  { x: 16, y: 55, w: 44, h: 39, poly: '0 36%, 55% 0, 100% 42%, 81% 100%, 13% 83%', r: -2, es: 1.5, flip: 1, sil: 64, from: [-20, 100] },
  { x: 64, y: 24, w: 36, h: 64, poly: '32% 0, 100% 10%, 100% 100%, 20% 92%, 0 30%', r: 3, es: 1.85, flip: -1, sil: 104, from: [100, 10] },
]

// Decorative fragments between the shards (not interactive).
const FRAGS = [
  { x: 28, y: 36, w: 26, h: 28, c: '#7a0009', poly: '0 42%, 48% 0, 100% 28%, 72% 100%, 18% 90%' },
  { x: 0, y: 44, w: 30, h: 30, c: '#b8000f', poly: '0 0, 100% 22%, 82% 100%, 8% 78%' },
  { x: 48, y: 46, w: 28, h: 30, c: '#e60012', poly: '22% 0, 100% 38%, 58% 100%, 0 68%' },
  { x: 62, y: 4, w: 22, h: 26, c: '#7a0009', poly: '0 0, 100% 34%, 72% 100%, 10% 70%' },
  { x: 66, y: 60, w: 34, h: 38, c: '#b8000f', poly: '30% 0, 100% 18%, 84% 100%, 0 72%' },
  { x: 0, y: 68, w: 26, h: 30, c: '#7a0009', poly: '0 28%, 100% 0, 72% 100%' },
  { x: 34, y: 88, w: 34, h: 12, c: '#b8000f', poly: '0 0, 100% 40%, 80% 100%, 10% 90%' },
  { x: 33, y: 4, w: 16, h: 22, c: '#b8000f', poly: '0 100%, 40% 0, 100% 60%' },
  // long thin spikes: the cracks radiating out of the centre
  { x: 26, y: 50, w: 50, h: 5, c: '#7a0009', poly: '0 60%, 100% 0, 92% 100%' },
  { x: 40, y: 28, w: 6, h: 36, c: '#b8000f', poly: '30% 0, 100% 100%, 0 82%' },
  { x: 54, y: 6, w: 22, h: 4, c: '#7a0009', poly: '0 100%, 100% 0, 80% 100%' },
]

function shardStyle(i) {
  const s = SHARDS[i % SHARDS.length]
  return {
    '--i': i,
    '--x': `${s.x}%`,
    '--y': `${s.y}%`,
    '--w': `${s.w}%`,
    '--h': `${s.h}%`,
    '--poly': s.poly,
    '--r': `${s.r}deg`,
    '--es': s.es,
    '--flip': s.flip,
    '--sil': `${s.sil}cqw`,
    '--ix': `${s.from[0]}px`,
    '--iy': `${s.from[1]}px`,
  }
}

function fragStyle(f, k) {
  return {
    '--k': k,
    '--x': `${f.x}%`,
    '--y': `${f.y}%`,
    '--w': `${f.w}%`,
    '--h': `${f.h}%`,
    '--poly': f.poly,
    '--c': f.c,
  }
}

const { openIndex, photoFailed, hasPhoto, onTileEnter, onTileLeave, onTileFocus, onTileBlur, onTileClick } =
  useRevealGrid()
</script>

<template>
  <div class="shards" :class="{ 'has-open': openIndex >= 0 }" role="group" aria-label="Team members">
    <span v-for="(f, k) in FRAGS" :key="`f${k}`" class="frag" :style="fragStyle(f, k)" aria-hidden="true"></span>

    <div
      v-for="(character, i) in characters"
      :key="character.id"
      class="shard-slot"
      :class="{ 'is-open': openIndex === i }"
      :style="shardStyle(i)"
    >
      <button
        type="button"
        class="shard"
        :aria-label="`${character.name}, ${character.role}`"
        @pointerenter="onTileEnter(i, $event)"
        @pointerleave="onTileLeave(i, $event)"
        @focus="onTileFocus(i, $event)"
        @blur="onTileBlur(i)"
        @click="onTileClick(i, $event)"
      >
        <span class="s-body">
          <!-- idle: silhouette + question mark -->
          <span class="mystery" aria-hidden="true">
            <span class="halftone"></span>
            <span class="sil-wrap">
              <!-- contour first, ink fill on top: only the outer outline is drawn -->
              <svg class="sil" viewBox="0 0 120 140" focusable="false">
                <g class="sil-edge">
                  <circle cx="60" cy="46" r="25" />
                  <rect x="51" y="66" width="18" height="24" />
                  <path d="M6 140 C8 100 32 82 60 82 C88 82 112 100 114 140 Z" />
                </g>
                <g class="sil-fill">
                  <circle cx="60" cy="46" r="25" />
                  <rect x="51" y="66" width="18" height="24" />
                  <path d="M6 140 C8 100 32 82 60 82 C88 82 112 100 114 140 Z" />
                </g>
              </svg>
              <span class="q">?</span>
            </span>
          </span>

          <!-- hover: just the picture, no text. Uses avatarUrl; the emblem stands in until a photo is set. -->
          <span class="reveal" aria-hidden="true">
            <img
              v-if="hasPhoto(character)"
              class="r-photo"
              :src="character.avatarUrl"
              :alt="''"
              draggable="false"
              @error="photoFailed[character.id] = true"
            />
            <template v-else>
              <span class="r-glow"></span>
              <span class="r-emblem">
                <CharacterAvatar :character="character" size="md" />
              </span>
            </template>
          </span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* The zone: right side of the screen, full height. Everything inside is positioned in percent. */
.shards {
  --zone-x: max(44vw, 600px);
  --ol: 2px; /* white outline width */
  --drop: 8px; /* hard black shadow offset */

  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--zone-x);
  right: 0;
  z-index: 0;
  pointer-events: none; /* only the clipped shards take hits */
}

/* decorative glass fragments */
.frag {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--w);
  height: var(--h);
  background: var(--c);
  clip-path: polygon(var(--poly));
  animation: fragIn 640ms var(--ease) backwards;
  animation-delay: calc(200ms + var(--k) * 60ms);
}

.shard-slot {
  position: absolute;
  z-index: 2;
  left: var(--x);
  top: var(--y);
  width: var(--w);
  height: var(--h);
  transform: translate(0, 0) rotate(var(--r)) scale(1);
  transition: transform 340ms var(--ease);
  /* a thin white outline that follows the polygon, then a hard black drop shadow */
  filter: drop-shadow(var(--ol) 0 0 var(--paper)) drop-shadow(calc(-1 * var(--ol)) 0 0 var(--paper))
    drop-shadow(0 var(--ol) 0 var(--paper)) drop-shadow(0 calc(-1 * var(--ol)) 0 var(--paper))
    drop-shadow(var(--drop) calc(var(--drop) * 1.1) 0 var(--ink));
  animation: shardIn 720ms var(--ease) backwards;
  animation-delay: calc(380ms + var(--i) * 110ms);
  will-change: transform;
}

.shard-slot.is-open {
  z-index: 8;
  transform: translate(0, 0) rotate(0deg) scale(1.07);
}

/* the red outline for keyboard focus (an outline on the button would be clipped) */
.shard-slot:has(.shard:focus-visible) {
  filter: drop-shadow(var(--ol) 0 0 var(--red)) drop-shadow(calc(-1 * var(--ol)) 0 0 var(--red))
    drop-shadow(0 var(--ol) 0 var(--red)) drop-shadow(0 calc(-1 * var(--ol)) 0 var(--red))
    drop-shadow(var(--drop) calc(var(--drop) * 1.1) 0 var(--ink));
}

/* with one shard open, the others recede: a dark layer fades in (opacity on the shard itself
   would make it see-through and show the fragments behind it) */
.s-body::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  background: var(--ink);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms var(--ease);
}

.shards.has-open .shard-slot:not(.is-open) .s-body::after {
  opacity: 0.5;
}

.shard {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  display: block;
  pointer-events: auto; /* the clip-path below also shapes the hit area */
  cursor: pointer;
  background: var(--ink);
  clip-path: polygon(var(--poly));
  outline: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* a container, so the contents can size themselves relative to this shard (cqw) */
.s-body {
  position: absolute;
  inset: 0;
  display: block;
  container-type: size;
}

/* ---- idle: silhouette on a red shard ------------------------------------ */
.mystery,
.reveal {
  position: absolute;
  inset: 0;
  transition:
    opacity 320ms ease-out,
    transform 420ms var(--ease);
}

.mystery {
  background-color: var(--red);
}

.mystery::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(118deg, transparent 0 54%, rgba(15, 15, 15, 0.78) 54% 66%, transparent 66%);
}

.halftone {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(15, 15, 15, 0.45) 2px, transparent 2.6px) 0 0 / 14px 14px;
  -webkit-mask-image: linear-gradient(to top, #000 6%, transparent 92%);
  mask-image: linear-gradient(to top, #000 6%, transparent 92%);
}

.sil-wrap {
  position: absolute;
  left: 50%;
  bottom: -5%;
  width: var(--sil, 78cqw);
  aspect-ratio: 120 / 140;
  transform: translateX(-50%);
}

.sil {
  display: block;
  width: 100%;
  height: 100%;
  transform: scaleX(var(--flip, 1)); /* faces left or right, so the four are not copies of each other */
}

.sil-edge * {
  fill: var(--paper);
  stroke: var(--paper);
  stroke-width: 3;
  stroke-linejoin: round;
}

.sil-fill * {
  fill: var(--ink);
}

.q {
  position: absolute;
  left: 50%;
  top: 33%; /* head centre in the 120x140 viewBox: 46 / 140 */
  font-family: var(--font-p5);
  font-size: 32cqw;
  line-height: 1;
  color: var(--paper);
  text-shadow: 4px 4px 0 var(--ink);
  transform: translate(-50%, -50%) rotate(-6deg);
  animation: qPulse 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: calc(var(--i) * -0.55s);
}

.shard-slot.is-open .mystery {
  opacity: 0;
  transform: scale(0.96);
}

/* ---- hover: the picture only --------------------------------------------- */
.reveal {
  opacity: 0;
  transform: scale(1.08);
  background: var(--ink);
}

.shard-slot.is-open .reveal {
  opacity: 1;
  transform: scale(1);
}

.r-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  user-select: none;
}

/* stand-in until a photo is set */
.r-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 55%, rgba(230, 0, 18, 0.85), rgba(230, 0, 18, 0) 70%);
}

.r-emblem {
  position: absolute;
  left: 50%;
  top: 52%;
  display: block;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  transform: scale(var(--es));
}

/* ---- keyframes (transform + opacity only) --------------------------------- */
@keyframes shardIn {
  from {
    opacity: 0;
    transform: translate(var(--ix), var(--iy)) rotate(calc(var(--r) - 14deg)) scale(0.8);
  }
}

@keyframes fragIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes qPulse {
  from {
    transform: translate(-50%, -50%) rotate(-6deg) scale(1);
  }
  to {
    transform: translate(-50%, -50%) rotate(-3deg) scale(1.09);
  }
}

/* ---- small screens: below the text, same composition, full width ---------- */
@media (max-width: 900px) {
  .shards {
    --ol: 1.5px;
    --drop: 5px;
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    justify-self: stretch;
    width: auto;
    height: auto;
    margin: 0 -20px; /* undo the section padding: full bleed */
    aspect-ratio: 5 / 6;
  }
}

/* ---- reduced motion: no flying in, no tilt, no scale; just a crossfade ---- */
@media (prefers-reduced-motion: reduce) {
  .frag,
  .shard-slot,
  .q {
    animation: none;
  }

  .shards {
    animation: fadeOnly 240ms ease-out;
  }

  .shard-slot,
  .shard-slot.is-open {
    transform: rotate(var(--r));
    transition: none;
  }

  .mystery,
  .reveal,
  .shard-slot.is-open .mystery,
  .shard-slot.is-open .reveal {
    transform: none;
    transition: opacity 180ms ease-out;
  }

  @keyframes fadeOnly {
    from {
      opacity: 0;
    }
  }
}
</style>
