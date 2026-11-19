<script setup>
/**
 * Persona 5 style backdrop shared by the welcome and character select screens.
 * Pure CSS, static, decorative. Mounted once in App.vue (not inside a screen, so
 * the screen-fade transform doesn't affect its `fixed` positioning). z-index 0 and
 * later in the DOM than the aurora, so it paints over it and under .main-stage.
 */
</script>

<template>
  <div class="p5-bg" aria-hidden="true">
    <div class="panel-red"></div>
    <div class="edge edge-main"></div>
    <div class="edge edge-thin"></div>
    <div class="hatch"></div>
  </div>
</template>

<style scoped>
.p5-bg {
  --red: #e60012;
  --ink: #0f0f0f;
  --paper: #f5f5f5;
  /* where the main diagonal meets the top / bottom of the viewport */
  --top-x: 44%;
  --bottom-x: 19%;

  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 78% 38%, rgba(255, 255, 255, 0.05), transparent 55%),
    var(--ink);
}

/* red halftone panel on the left */
.panel-red {
  position: absolute;
  inset: 0;
  background-color: var(--red);
  background-image: radial-gradient(circle, rgba(15, 15, 15, 0.38) 2.2px, transparent 2.9px);
  background-size: 18px 18px;
  clip-path: polygon(0 0, var(--top-x) 0, var(--bottom-x) 100%, 0 100%);
}

.edge {
  position: absolute;
  inset: 0;
  background: var(--paper);
}

/* thick white stripe riding the red/black boundary */
.edge-main {
  clip-path: polygon(
    var(--top-x) 0,
    calc(var(--top-x) + 8px) 0,
    calc(var(--bottom-x) + 8px) 100%,
    var(--bottom-x) 100%
  );
}

/* thinner parallel stripe further right */
.edge-thin {
  clip-path: polygon(66% 0, calc(66% + 5px) 0, calc(41% + 5px) 100%, 41% 100%);
  opacity: 0.92;
}

/* dark-red hatch lines in the lower right */
.hatch {
  position: absolute;
  left: 36%;
  right: 0;
  top: 64%;
  bottom: 0;
  background: repeating-linear-gradient(
    -30deg,
    rgba(230, 0, 18, 0.3) 0 3px,
    transparent 3px 18px
  );
  clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 45%);
  mask-image: linear-gradient(to bottom, transparent, #000 45%);
}

@media (max-width: 600px) {
  .p5-bg {
    --top-x: 56%;
    --bottom-x: 24%;
  }

  .panel-red {
    background-size: 14px 14px;
  }
}
</style>
