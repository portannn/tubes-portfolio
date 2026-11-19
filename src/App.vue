<script setup>
import { computed, ref, watchEffect } from 'vue'
import AuroraBackground from './components/AuroraBackground.vue'
import CharacterPortfolio from './components/CharacterPortfolio.vue'
import CharacterSelect from './components/CharacterSelect.vue'
import TopNavbar from './components/TopNavbar.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import { CHARACTERS } from './data/characters'

const viewMode = ref('welcome') // 'welcome' | 'select' | 'portfolio'
const selectedId = ref(null)
const pendingSection = ref('')
const activeSection = ref('about')
const hoverAccentRgb = ref('139, 92, 246')
const portfolioRef = ref(null)

const selectedCharacter = computed(
  () => CHARACTERS.find((item) => item.id === selectedId.value) ?? null
)

const auroraAccentRgb = computed(() => {
  if (viewMode.value === 'portfolio' && selectedCharacter.value) {
    return selectedCharacter.value.accentRgb
  }
  if (viewMode.value === 'select') {
    return hoverAccentRgb.value
  }
  return '139, 92, 246'
})

watchEffect(() => {
  if (viewMode.value === 'welcome') {
    document.title = 'Portfolio — Welcome'
  } else if (viewMode.value === 'select') {
    document.title = 'Portfolio — Select Your Character'
  } else if (selectedCharacter.value) {
    const displayName = selectedCharacter.value.fullName || selectedCharacter.value.name
    document.title = `${displayName} — Portfolio`
  }
})

function enterSelectScreen() {
  pendingSection.value = ''
  hoverAccentRgb.value = '139, 92, 246'
  viewMode.value = 'select'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleNavbarNavigate(sectionId) {
  if (viewMode.value === 'welcome') {
    pendingSection.value = sectionId
    viewMode.value = 'select'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (viewMode.value === 'portfolio') {
    portfolioRef.value?.scrollToSection(sectionId)
  }
}

function handleSelectCharacter(characterId) {
  selectedId.value = characterId
  viewMode.value = 'portfolio'
  if (!pendingSection.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleSwitchCharacter(characterId) {
  pendingSection.value = ''
  selectedId.value = characterId
}

function backToWelcome() {
  pendingSection.value = ''
  selectedId.value = null
  viewMode.value = 'welcome'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function backToSelect() {
  pendingSection.value = ''
  hoverAccentRgb.value = '139, 92, 246'
  viewMode.value = 'select'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="app-shell">
    <AuroraBackground :accent-rgb="auroraAccentRgb" :intensity="viewMode" />

    <TopNavbar
      v-if="viewMode !== 'select'"
      :mode="viewMode"
      :active-section="activeSection"
      :accent-hex="selectedCharacter?.accentHex || '#a855f7'"
      @navigate="handleNavbarNavigate"
    />

    <main class="main-stage">
      <Transition name="screen-fade" mode="out-in">
        <WelcomeScreen
          v-if="viewMode === 'welcome'"
          key="welcome"
          @enter="enterSelectScreen"
        />

        <CharacterSelect
          v-else-if="viewMode === 'select'"
          key="select"
          :characters="CHARACTERS"
          :pending-section="pendingSection"
          @select="handleSelectCharacter"
          @back="backToWelcome"
          @hover="(rgb) => (hoverAccentRgb = rgb)"
        />

        <CharacterPortfolio
          v-else-if="viewMode === 'portfolio' && selectedCharacter"
          ref="portfolioRef"
          key="portfolio"
          :character="selectedCharacter"
          :all-characters="CHARACTERS"
          :initial-section="pendingSection"
          @back-to-select="backToSelect"
          @switch-character="handleSwitchCharacter"
          @active-section-change="(sec) => (activeSection = sec)"
        />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}

.main-stage {
  position: relative;
  z-index: 1;
}
</style>
