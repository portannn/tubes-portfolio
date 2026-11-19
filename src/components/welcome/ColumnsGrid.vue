<script setup>
import CharacterAvatar from '../CharacterAvatar.vue'
import { useRevealGrid } from '../../composables/useRevealGrid'

/**
 * Welcome-screen layout "columns": four slanted columns drawn straight onto the background,
 * a white line on each left edge, the character standing inside. Idle = silhouette + "?",
 * hover = the picture only. Kept as an option next to "shards" (see WelcomeScreen.vue).
 */
defineProps({
  characters: { type: Array, required: true },
})

// Horizontal nudge of each silhouette inside its column, so the four don't stand in a rigid row
const SIL_DX = [-18, 10, -8, 16]

function colStyle(i) {
  return { '--i': i, '--dx': `${SIL_DX[i % SIL_DX.length]}px` }
}

const { openIndex, photoFailed, hasPhoto, onTileEnter, onTileLeave, onTileFocus, onTileBlur, onTileClick } =
  useRevealGrid()
</script>

<template>
  <div class="strips" :class="{ 'has-open': openIndex >= 0 }" role="group" aria-label="Team members">
    <button
      v-for="(character, i) in characters"
      :key="character.id"
      type="button"
      class="col"
      :class="{ 'is-open': openIndex === i }"
      :style="colStyle(i)"
      :aria-label="`${character.name}, ${character.role}`"
      @pointerenter="onTileEnter(i, $event)"
      @pointerleave="onTileLeave(i, $event)"
      @focus="onTileFocus(i, $event)"
      @blur="onTileBlur(i)"
      @click="onTileClick(i, $event)"
    >
      <span class="col-inner">
        <!-- idle: silhouette + question mark -->
        <span class="mystery" aria-hidden="true">
          <span class="glow"></span>
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
            <span class="glow"></span>
            <span class="r-emblem">
              <CharacterAvatar :character="character" size="md" />
            </span>
</template>
      </span>
    </span>
  </button>
</div>
</template>

<style scoped>
/* ---- slanted columns drawn on the background ---------------------------- */
/* A full-height layer on the right. Each column is a skewX(-12deg) box with no fill of its own:
   only a white line on its left edge, so the lines divide the page background itself and the
   characters stand directly on it. */
.strips {
  --zone-x: max(46vw, 620px); /* left line position at mid-height */
  --cw: calc((100vw - var(--zone-x)) / 4); /* width of one column (the four fit the viewport at mid-height) */
  --es: 2.1; /* emblem scale (fallback image) */
  /* The visible part of a leaning column drifts left the lower you go. Things standing in the lower
     half shift left by (their height fraction - 0.5) * tan(12deg) * column height to stay centred. */
  --shift: 4.5vh;

  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--zone-x);
  right: 0;
  z-index: 0;
  display: flex;
  pointer-events: none; /* only the columns take hits */
}

.col {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden; /* clips the character to the slanted shape */
  pointer-events: auto;
  cursor: pointer;
  background: transparent;
  transform: skewX(-12deg);
  transition: opacity 300ms var(--ease);
  animation: colIn 700ms var(--ease) backwards;
  animation-delay: calc(300ms + var(--i) * 100ms);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* the grid line: white by default, red on the open column */
.col::before,
.col::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: max(3px, 0.3vw);
  background: var(--paper);
  pointer-events: none;
}

.col::after {
  background: var(--red);
  opacity: 0;
  transition: opacity 240ms var(--ease);
}

.col.is-open::after {
  opacity: 1;
}

.col:focus-visible {
  outline: 3px dashed var(--paper);
  outline-offset: -10px;
}

/* with one column open, the others recede */
.strips.has-open .col:not(.is-open) {
  opacity: 0.55;
}

/* upright content: counter-skew and overscan so the slanted clip never shows an edge */
.col-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -80%; /* generous: a tall column leans by up to ~70% of its own width at the top/bottom */
  right: -80%;
  transform: skewX(12deg);
}

/* idle: silhouette on a red glow rising from the bottom (it blends into the background hatch) */
.mystery,
.reveal {
  position: absolute;
  inset: 0;
  transition:
    opacity 320ms ease-out,
    transform 420ms var(--ease);
}

.glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle, rgba(15, 15, 15, 0.5) 2px, transparent 2.6px) 0 0 / 14px 14px,
    radial-gradient(ellipse at 50% 100%, rgba(230, 0, 18, 0.8), rgba(230, 0, 18, 0) 72%);
  -webkit-mask-image: linear-gradient(to top, #000 8%, transparent 88%);
  mask-image: linear-gradient(to top, #000 8%, transparent 88%);
}

/* wider than the column on purpose: shoulders cropped like a close-up portrait */
.sil-wrap {
  position: absolute;
  left: 50%;
  bottom: -3%;
  width: calc(var(--cw) * 1.7);
  aspect-ratio: 120 / 140;
  margin-left: calc(var(--dx, 0px) - var(--shift));
  transform: translateX(-50%);
}

.sil {
  display: block;
  width: 100%;
  height: 100%;
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
  font-size: calc(var(--cw) * 0.62);
  line-height: 1;
  color: var(--paper);
  text-shadow: 4px 4px 0 var(--ink);
  transform: translate(-50%, -50%) rotate(-6deg);
  animation: qPulse 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: calc(var(--i) * -0.55s);
}

/* hover: the picture only */
.reveal {
  opacity: 0;
  transform: translateY(5%);
}

.col.is-open .reveal {
  opacity: 1;
  transform: translateY(0);
}

.col.is-open .mystery {
  opacity: 0;
  transform: translateY(4%) scale(0.97);
}

/* fills the whole column; the top fades into the background so there is no hard frame */
.r-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 14%;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 16%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 16%);
  user-select: none;
}

/* stand-in until a photo is set */
.r-emblem {
  position: absolute;
  left: 50%;
  bottom: 20%;
  display: block;
  width: 96px;
  height: 96px;
  margin-left: calc(-48px - var(--shift) * 0.85);
  transform: scale(var(--es));
  transform-origin: 50% 100%;
}

/* ---- keyframes ---------------------------------------------------------- */
@keyframes colIn {
  from {
    opacity: 0;
    transform: skewX(-12deg) translateY(90px);
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

/* ---- responsive --------------------------------------------------------- */
@media (max-width: 1100px) {
  .strips {
    --es: 1.7;
  }
}

@media (max-width: 900px) {
  /* below the text, four columns across. The lean pushes the lower half of every column to the
     left, so the block starts ~24px in; otherwise the first column's face falls off the screen. */
  .strips {
    --zone-x: 4px; /* column width = (100vw - 4px) / 4 */
    --es: 1.5;
    --shift: 19px;
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    justify-self: start;
    width: calc(100vw - var(--zone-x));
    height: 420px;
    margin: 0 0 0 4px; /* 20px section padding + 4px = 24px from the screen edge */
  }
}

@media (max-width: 480px) {
  .strips {
    --es: 1;
    --shift: 16px;
    height: 360px;
  }
}

/* ---- reduced motion ----------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .col,
  .q {
    animation: none;
  }

  .strips {
    animation: fadeOnly 240ms ease-out;
  }

  .col {
    transition: none;
  }

  /* no slide: the silhouette and the picture simply crossfade */
  .mystery,
  .reveal {
    transform: none;
    transition: opacity 180ms ease-out;
  }

  .col.is-open .reveal,
  .col.is-open .mystery {
    transform: none;
  }

  @keyframes fadeOnly {
    from {
      opacity: 0;
    }
  }
}
</style>
