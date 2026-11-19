<script setup>
import { computed } from 'vue'
import { NAV_ITEMS } from '../data/characters'

const props = defineProps({
  activeSection: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'welcome', // 'welcome' | 'select' | 'portfolio'
  },
  accentHex: {
    type: String,
    default: '#a855f7',
  },
  hasCertificates: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navigate'])

const visibleItems = computed(() => {
  if (props.mode === 'portfolio' && props.hasCertificates) {
    const items = [...NAV_ITEMS]
    items.splice(5, 0, { id: 'certificates', label: 'Certificates' })
    return items
  }
  return NAV_ITEMS
})
</script>

<template>
  <header class="navbar-wrapper" :class="{ 'is-welcome': mode === 'welcome' }">
    <nav class="navbar-pill" aria-label="Primary navigation">
      <ul class="nav-list">
        <li v-for="item in visibleItems" :key="item.id">
          <button
            type="button"
            class="nav-link"
            :class="{ 'is-active': mode === 'portfolio' && activeSection === item.id }"
            :style="{ '--nav-accent': accentHex }"
            @click="emit('navigate', item.id)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 26px;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}

.navbar-pill {
  pointer-events: auto;
  width: min(760px, 100%);
  padding: 13px 38px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.44);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.065);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav-link {
  position: relative;
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: 0.015em;
  color: rgba(210, 210, 224, 0.54);
  padding: 4px 6px;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: rgba(255, 255, 255, 0.96);
  outline: none;
}

.nav-link.is-active {
  color: #ffffff;
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.35);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  transform: translateX(-50%);
  width: 14px;
  height: 2px;
  border-radius: 9999px;
  background: var(--nav-accent, #a855f7);
  box-shadow: 0 0 10px var(--nav-accent, #a855f7);
}

/* ---- welcome mode: Persona 5 slab (portfolio navbar is unchanged) ------- */
.is-welcome .navbar-pill {
  border-radius: 0;
  background: #0f0f0f;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: 2px solid #f5f5f5;
  box-shadow: 5px 5px 0 #e60012;
  transform: skewX(-10deg);
  animation: navDrop 520ms cubic-bezier(0.22, 1, 0.36, 1) 120ms backwards;
}

.is-welcome .nav-link {
  font-family: 'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f5f5f5;
  padding: 3px 10px;
  transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.is-welcome .nav-link:hover,
.is-welcome .nav-link:focus-visible {
  background: #e60012;
  color: #f5f5f5;
  transform: translateY(-2px);
}

.is-welcome .nav-link:focus-visible {
  outline: 2px dashed #f5f5f5;
  outline-offset: 3px;
}

@keyframes navDrop {
  from {
    opacity: 0;
    transform: translateY(-26px) skewX(-10deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-welcome .navbar-pill {
    animation: none;
  }

  .is-welcome .nav-link:hover,
  .is-welcome .nav-link:focus-visible {
    transform: none;
  }
}

@media (max-width: 640px) {
  .navbar-wrapper {
    top: 16px;
  }

  .navbar-pill {
    padding: 10px 18px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .navbar-pill::-webkit-scrollbar {
    display: none;
  }

  .nav-list {
    justify-content: flex-start;
    gap: 18px;
    min-width: max-content;
  }

  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
