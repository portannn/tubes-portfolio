<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import CertificatePreview from './CertificatePreview.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
  kind: {
    type: String,
    required: true, // 'experience' | 'project' | 'certificate'
  },
  index: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['back', 'navigateItem'])

const itemsList = computed(() => {
  if (props.kind === 'experience') return props.character.experience || []
  if (props.kind === 'project') return props.character.projects || []
  if (props.kind === 'certificate') return props.character.certificates || []
  return []
})

const item = computed(() => itemsList.value[props.index] || null)

const kindLabel = computed(() => {
  if (props.kind === 'experience') return 'Experience Detail'
  if (props.kind === 'project') return 'Project Detail'
  return 'Certificate Detail'
})

const itemTitle = computed(() => {
  if (!item.value) return ''
  return item.value.title || ''
})

const itemSubtitle = computed(() => {
  if (!item.value) return ''
  if (props.kind === 'experience') return item.value.organization
  if (props.kind === 'project') return item.value.category
  return item.value.issuer
})

const itemBadges = computed(() => {
  if (!item.value) return []
  const list = []
  if (props.kind === 'experience') {
    if (item.value.type) list.push(item.value.type)
    if (item.value.period) list.push(item.value.period)
  } else if (props.kind === 'project') {
    if (item.value.role) list.push(item.value.role)
    if (item.value.period) list.push(item.value.period)
  } else if (props.kind === 'certificate') {
    if (item.value.year) list.push(`Issued ${item.value.year}`)
    if (item.value.competenceField) list.push(item.value.competenceField)
  }
  return list
})

const detailSections = computed(() => {
  if (!item.value) return []
  if (item.value.details?.length) return item.value.details
  return [
    {
      heading: 'Overview',
      paragraphs: [item.value.description || 'Details coming soon.'],
    },
  ]
})

const tags = computed(() => {
  if (!item.value) return []
  if (props.kind === 'experience') return item.value.tools || []
  if (props.kind === 'project') return item.value.tech || []
  return []
})

const hasPrev = computed(() => props.index > 0)
const hasNext = computed(() => props.index < itemsList.value.length - 1)
const prevItem = computed(() => (hasPrev.value ? itemsList.value[props.index - 1] : null))
const nextItem = computed(() => (hasNext.value ? itemsList.value[props.index + 1] : null))

function slugify(text, idx) {
  return `detail-sec-${idx}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function scrollToDetailSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    emit('back')
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
  <article
    v-if="item"
    class="detail-page"
    :style="{
      '--char-accent': character.accentHex,
      '--char-secondary': character.secondaryHex,
      '--char-rgb': character.accentRgb,
    }"
  >
    <!-- Top action bar -->
    <div class="detail-topbar">
      <button type="button" class="back-btn" @click="emit('back')">
        <svg viewBox="0 0 20 20" fill="none" class="btn-icon" aria-hidden="true">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Back to {{ character.fullName || character.name }}</span>
      </button>

      <div class="kind-pill">
        <span class="kind-dot" aria-hidden="true"></span>
        <span>{{ kindLabel.toUpperCase() }}</span>
      </div>
    </div>

    <!-- Hero header card -->
    <header class="detail-hero">
      <div class="hero-badges">
        <span v-for="badge in itemBadges" :key="badge" class="meta-badge">
          {{ badge }}
        </span>
      </div>

      <h1 class="detail-title">{{ itemTitle }}</h1>
      <p class="detail-subtitle">{{ itemSubtitle }}</p>

      <div v-if="tags.length" class="hero-tags">
        <span v-for="tag in tags" :key="tag" class="tag-chip">{{ tag }}</span>
      </div>

      <!-- Certificate preview & credential grid inside hero -->
      <div v-if="kind === 'certificate'" class="certificate-hero-layout">
        <div class="certificate-visual-box">
          <CertificatePreview :certificate="item" expanded />
        </div>
        <div class="certificate-meta-grid">
          <div v-if="item.recipient" class="cred-item">
            <span class="cred-label">Recipient</span>
            <span class="cred-value">{{ item.recipient }}</span>
          </div>
          <div v-if="item.credentialNo" class="cred-item">
            <span class="cred-label">Certificate No.</span>
            <span class="cred-value">{{ item.credentialNo }}</span>
          </div>
          <div v-if="item.registrationNo" class="cred-item">
            <span class="cred-label">Registration No.</span>
            <span class="cred-value">{{ item.registrationNo }}</span>
          </div>
          <div v-if="item.qualification" class="cred-item">
            <span class="cred-label">Qualification</span>
            <span class="cred-value">{{ item.qualification }}</span>
          </div>
          <div v-if="item.hostInstitution" class="cred-item">
            <span class="cred-label">Host Institution</span>
            <span class="cred-value">{{ item.hostInstitution }}</span>
          </div>
          <div v-if="item.duration" class="cred-item">
            <span class="cred-label">Duration</span>
            <span class="cred-value">{{ item.duration }}</span>
          </div>
          <div v-if="item.validity" class="cred-item">
            <span class="cred-label">Validity</span>
            <span class="cred-value">{{ item.validity }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick jump pills when multiple sections exist -->
    <nav
      v-if="detailSections.length > 1"
      class="section-jump-bar"
      aria-label="Detail sections"
    >
      <button
        v-for="(sec, idx) in detailSections"
        :key="sec.heading"
        type="button"
        class="jump-pill"
        @click="scrollToDetailSection(slugify(sec.heading, idx))"
      >
        <span class="jump-num">{{ String(idx + 1).padStart(2, '0') }}</span>
        <span>{{ sec.heading }}</span>
      </button>
    </nav>

    <!-- Full-page detailed sections -->
    <div class="detail-sections">
      <section
        v-for="(sec, idx) in detailSections"
        :id="slugify(sec.heading, idx)"
        :key="sec.heading"
        class="detail-section-card"
      >
        <div class="sec-header">
          <span class="sec-index">{{ String(idx + 1).padStart(2, '0') }}</span>
          <h2 class="sec-heading">{{ sec.heading }}</h2>
        </div>

        <div class="sec-body">
          <p v-for="(paragraph, pIdx) in sec.paragraphs" :key="pIdx" class="sec-paragraph">
            {{ paragraph }}
          </p>
        </div>
      </section>
    </div>

    <!-- Prev / Next switcher within same category -->
    <footer class="detail-footer-nav">
      <button
        v-if="hasPrev"
        type="button"
        class="pager-btn prev"
        @click="emit('navigateItem', index - 1)"
      >
        <span class="pager-dir">← Previous</span>
        <span class="pager-title">{{ prevItem.title }}</span>
      </button>
      <div v-else></div>

      <button
        v-if="hasNext"
        type="button"
        class="pager-btn next"
        @click="emit('navigateItem', index + 1)"
      >
        <span class="pager-dir">Next →</span>
        <span class="pager-title">{{ nextItem.title }}</span>
      </button>
    </footer>
  </article>
</template>

<style scoped>
.detail-page {
  position: relative;
  z-index: 10;
  max-width: 960px;
  margin: 0 auto;
  padding: 36px 24px 96px;
}

.detail-topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 28px;
}

.back-btn,
.kind-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.62);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  font-size: 0.8rem;
  color: rgba(226, 226, 238, 0.86);
  transition: all 0.25s ease;
}

.back-btn:hover,
.back-btn:focus-visible {
  outline: none;
  color: #ffffff;
  border-color: rgba(var(--char-rgb), 0.65);
  transform: translateX(-3px);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.kind-pill {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: rgba(212, 212, 224, 0.72);
}

.kind-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--char-accent);
  box-shadow: 0 0 10px var(--char-accent);
}

.detail-hero {
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(22, 16, 36, 0.76), rgba(9, 7, 15, 0.9));
  backdrop-filter: blur(18px);
  border: 1px solid rgba(var(--char-rgb), 0.28);
  box-shadow: 0 24px 52px rgba(0, 0, 0, 0.52),
    0 0 40px rgba(var(--char-rgb), 0.12);
  margin-bottom: 24px;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.meta-badge {
  font-size: 0.74rem;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.14);
  border: 1px solid rgba(var(--char-rgb), 0.3);
  color: rgba(244, 244, 252, 0.92);
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.8vw, 2.7rem);
  font-weight: 600;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 8px;
}

.detail-subtitle {
  font-size: 1.02rem;
  font-weight: 500;
  color: var(--char-accent);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.tag-chip {
  font-size: 0.74rem;
  padding: 5px 12px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: rgba(226, 226, 238, 0.85);
}

.certificate-hero-layout {
  margin-top: 26px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 24px;
  align-items: center;
}

.certificate-meta-grid {
  display: grid;
  gap: 12px;
}

.cred-item {
  padding: 12px 15px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cred-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 161, 178, 0.65);
}

.cred-value {
  font-size: 0.86rem;
  font-weight: 500;
  color: rgba(244, 244, 252, 0.94);
}

.section-jump-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.jump-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.56);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  color: rgba(212, 212, 224, 0.78);
  transition: all 0.22s ease;
}

.jump-pill:hover {
  color: #ffffff;
  border-color: rgba(var(--char-rgb), 0.55);
  background: rgba(var(--char-rgb), 0.14);
}

.jump-num {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--char-accent);
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.detail-section-card {
  scroll-margin-top: 28px;
  padding: 26px 28px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(20, 15, 32, 0.7), rgba(10, 8, 16, 0.85));
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.42);
}

.sec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.sec-index {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--char-accent);
}

.sec-heading {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.sec-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sec-paragraph {
  font-size: 0.94rem;
  line-height: 1.78;
  color: rgba(220, 220, 232, 0.8);
}

.detail-footer-nav {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.pager-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  border-radius: 16px;
  background: rgba(16, 12, 24, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.pager-btn.prev {
  text-align: left;
  align-items: flex-start;
}

.pager-btn.next {
  text-align: right;
  align-items: flex-end;
}

.pager-btn:hover {
  border-color: rgba(var(--char-rgb), 0.6);
  background: rgba(var(--char-rgb), 0.14);
  transform: translateY(-2px);
}

.pager-dir {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--char-accent);
}

.pager-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
}

@media (max-width: 760px) {
  .certificate-hero-layout,
  .detail-footer-nav {
    grid-template-columns: 1fr;
  }

  .detail-hero,
  .detail-section-card {
    padding: 22px 20px;
  }
}
</style>
