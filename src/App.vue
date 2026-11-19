<script setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import AuroraBackground from './components/AuroraBackground.vue'
import CharacterPortfolio from './components/CharacterPortfolio.vue'
import CharacterSelect from './components/CharacterSelect.vue'
import DetailPage from './components/DetailPage.vue'
import TopNavbar from './components/TopNavbar.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import { CHARACTERS } from './data/characters'

const viewMode = ref('welcome') // 'welcome' | 'select' | 'portfolio' | 'detail'
const selectedId = ref(null)
const pendingSection = ref('')
const activeSection = ref('about')
const hoverAccentRgb = ref('139, 92, 246')
const portfolioRef = ref(null)

const detailState = reactive({
  kind: 'experience', // 'experience' | 'project' | 'certificate'
  index: 0,
  returnSection: 'experience',
})

const selectedCharacter = computed(
  () => CHARACTERS.find((item) => item.id === selectedId.value) ?? null
)

const auroraAccentRgb = computed(() => {
  if ((viewMode.value === 'portfolio' || viewMode.value === 'detail') && selectedCharacter.value) {
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
  } else if (viewMode.value === 'detail' && selectedCharacter.value) {
    const displayName = selectedCharacter.value.fullName || selectedCharacter.value.name
    document.title = `${displayName} — Details`
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

function handleOpenDetail({ kind, index }) {
  detailState.kind = kind
  detailState.index = index
  detailState.returnSection =
    kind === 'experience' ? 'experience' : kind === 'project' ? 'projects' : 'certificates'
  viewMode.value = 'detail'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleNavigateDetailItem(newIndex) {
  detailState.index = newIndex
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleBackFromDetail() {
  pendingSection.value = detailState.returnSection
  viewMode.value = 'portfolio'
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
    <AuroraBackground
      :accent-rgb="auroraAccentRgb"
      :intensity="viewMode === 'detail' ? 'portfolio' : viewMode"
    />

    <TopNavbar
      v-if="viewMode === 'welcome' || viewMode === 'portfolio'"
      :mode="viewMode"
      :active-section="activeSection"
      :accent-hex="selectedCharacter?.accentHex || '#a855f7'"
      :has-certificates="Boolean(selectedCharacter?.certificates?.length)"
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
          @open-detail="handleOpenDetail"
        />

        <DetailPage
          v-else-if="viewMode === 'detail' && selectedCharacter"
          :key="`detail-${detailState.kind}-${detailState.index}`"
          :character="selectedCharacter"
          :kind="detailState.kind"
          :index="detailState.index"
          @back="handleBackFromDetail"
          @navigate-item="handleNavigateDetailItem"
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
