<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import CharacterAvatar from './CharacterAvatar.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
  allCharacters: {
    type: Array,
    required: true,
  },
  initialSection: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['backToSelect', 'switchCharacter', 'activeSectionChange'])

const form = reactive({
  name: '',
  email: '',
  message: '',
})
const sentSuccess = ref(false)
let observer = null
let resetTimer = null

function scrollToSection(sectionId) {
  const el = document.getElementById(`section-${sectionId}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  emit('activeSectionChange', sectionId)
}

function submitMessage() {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
  sentSuccess.value = true
  form.name = ''
  form.email = ''
  form.message = ''
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    sentSuccess.value = false
  }, 4000)
}

function setupObserver() {
  if (observer) observer.disconnect()
  const sectionIds = ['about', 'experience', 'education', 'projects', 'skills', 'contact']
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('section-', '')
          emit('activeSectionChange', id)
        }
      }
    },
    { rootMargin: '-32% 0px -52% 0px', threshold: 0.05 }
  )

  for (const id of sectionIds) {
    const el = document.getElementById(`section-${id}`)
    if (el) observer.observe(el)
  }
}

onMounted(async () => {
  await nextTick()
  setupObserver()
  if (props.initialSection) {
    setTimeout(() => scrollToSection(props.initialSection), 120)
  } else {
    emit('activeSectionChange', 'about')
  }
})

watch(
  () => props.character.id,
  async () => {
    sentSuccess.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await nextTick()
    setupObserver()
    emit('activeSectionChange', 'about')
  }
)

onUnmounted(() => {
  if (observer) observer.disconnect()
  clearTimeout(resetTimer)
})

defineExpose({ scrollToSection })
</script>

<template>
  <div
    class="portfolio-page"
    :style="{
      '--char-accent': character.accentHex,
      '--char-secondary': character.secondaryHex,
      '--char-rgb': character.accentRgb,
    }"
  >
    <!-- Switcher bar below fixed top pill navbar -->
    <div class="switcher-bar">
      <button type="button" class="switch-back" @click="emit('backToSelect')">
        <svg viewBox="0 0 20 20" fill="none" class="switch-icon" aria-hidden="true">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Select Character</span>
      </button>

      <div class="quick-roster" role="group" aria-label="Switch character">
        <button
          v-for="item in allCharacters"
          :key="item.id"
          type="button"
          class="roster-chip"
          :class="{ 'is-current': item.id === character.id }"
          :style="{ '--chip-rgb': item.accentRgb, '--chip-hex': item.accentHex }"
          @click="emit('switchCharacter', item.id)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>

    <!-- ABOUT / HERO SECTION -->
    <section id="section-about" class="section-block hero-about">
      <div class="about-grid">
        <div class="about-avatar-col">
          <CharacterAvatar :character="character" size="lg" />
          <div class="availability-badge">
            <span class="badge-dot" aria-hidden="true"></span>
            <span>{{ character.about.status }}</span>
          </div>
        </div>

        <div class="about-info-col">
          <div class="hero-meta-row">
            <span class="hero-code">CHARACTER {{ character.code }}</span>
            <span class="hero-class">{{ character.classTitle }}</span>
          </div>
          <h1 class="hero-name">{{ character.fullName || character.name }}</h1>
          <p class="hero-role">{{ character.role }}</p>
          <p class="hero-headline">{{ character.about.headline }}</p>
          <div v-if="character.about.paragraphs?.length" class="hero-bio-stack">
            <p v-for="(paragraph, pIdx) in character.about.paragraphs" :key="pIdx" class="hero-bio">
              {{ paragraph }}
            </p>
          </div>
          <p v-else class="hero-bio">{{ character.about.bio }}</p>

          <div class="about-details">
            <div class="detail-pill">
              <span class="detail-label">Location</span>
              <span class="detail-value">{{ character.about.location }}</span>
            </div>
            <div class="detail-pill">
              <span class="detail-label">Primary Focus</span>
              <span class="detail-value">{{ character.about.focus }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section id="section-experience" class="section-block">
      <div class="section-heading">
        <span class="section-index">01</span>
        <h2>Experience</h2>
      </div>
      <div class="timeline-list">
        <article
          v-for="(exp, idx) in character.experience"
          :key="idx"
          class="glass-card timeline-card"
        >
          <div class="timeline-header">
            <div>
              <h3>{{ exp.title }}</h3>
              <p class="org-name">{{ exp.organization }}</p>
            </div>
            <div class="timeline-badges">
              <span v-if="exp.type" class="type-badge">{{ exp.type }}</span>
              <span class="period-badge">{{ exp.period }}</span>
            </div>
          </div>
          <p class="card-desc">{{ exp.description }}</p>
        </article>
      </div>
    </section>

    <!-- EDUCATION SECTION -->
    <section id="section-education" class="section-block">
      <div class="section-heading">
        <span class="section-index">02</span>
        <h2>Education</h2>
      </div>
      <div class="timeline-list">
        <article
          v-for="(edu, idx) in character.education"
          :key="idx"
          class="glass-card timeline-card"
        >
          <div class="timeline-header">
            <div>
              <h3>{{ edu.degree }}</h3>
              <p class="org-name">{{ edu.institution }}</p>
            </div>
            <div class="timeline-badges">
              <span v-if="edu.type" class="type-badge">{{ edu.type }}</span>
              <span class="period-badge">{{ edu.period }}</span>
            </div>
          </div>
          <p class="card-desc">{{ edu.highlights }}</p>
        </article>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="section-projects" class="section-block">
      <div class="section-heading">
        <span class="section-index">03</span>
        <h2>Projects</h2>
      </div>
      <div class="projects-grid">
        <article
          v-for="(project, idx) in character.projects"
          :key="idx"
          class="glass-card project-card"
        >
          <span class="project-category">{{ project.category }}</span>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="card-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- SKILLS SECTION -->
    <section id="section-skills" class="section-block">
      <div class="section-heading">
        <span class="section-index">04</span>
        <h2>Skills</h2>
      </div>
      <div v-if="character.skillGroups" class="skills-groups-wrap">
        <div class="glass-card skill-group-column">
          <h3 class="skill-group-heading">Hard Skills</h3>
          <div class="skill-category-list">
            <div
              v-for="group in character.skillGroups.hard"
              :key="group.category"
              class="skill-category-block"
            >
              <p class="skill-category-title">{{ group.category }}</p>
              <div class="skill-pill-grid">
                <span v-for="item in group.items" :key="item" class="skill-pill-item">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card skill-group-column">
          <h3 class="skill-group-heading">Soft Skills</h3>
          <div class="skill-category-list">
            <div
              v-for="group in character.skillGroups.soft"
              :key="group.category"
              class="skill-category-block"
            >
              <p class="skill-category-title">{{ group.category }}</p>
              <div class="skill-pill-grid">
                <span v-for="item in group.items" :key="item" class="skill-pill-item soft">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="glass-card skills-panel">
        <div v-for="skill in character.skills" :key="skill.name" class="skill-bar-row">
          <div class="skill-bar-header">
            <span class="skill-bar-name">{{ skill.name }}</span>
            <span class="skill-bar-pct">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" :style="{ width: `${skill.level}%` }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <section id="section-contact" class="section-block">
      <div class="section-heading">
        <span class="section-index">05</span>
        <h2>Contact</h2>
      </div>
      <div class="contact-grid">
        <div class="glass-card contact-info-card">
          <h3>Let's work together</h3>
          <p class="card-desc">
            Reach out to {{ character.name }} for collaborations, team inquiries, or project
            discussions.
          </p>
          <div class="contact-links">
            <a :href="`mailto:${character.contact.email}`" class="contact-link-pill">
              {{ character.contact.email }}
            </a>
            <a
              :href="character.contact.github"
              target="_blank"
              rel="noreferrer"
              class="contact-link-pill"
            >
              GitHub
            </a>
            <a
              :href="character.contact.linkedin"
              target="_blank"
              rel="noreferrer"
              class="contact-link-pill"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <form class="glass-card contact-form" @submit.prevent="submitMessage">
          <div class="form-row">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          <div class="form-row">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="form-row">
            <label for="contact-msg">Message</label>
            <textarea
              id="contact-msg"
              v-model="form.message"
              rows="3"
              placeholder="Write a quick message..."
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">Send Message</button>
          <p v-if="sentSuccess" class="sent-toast" role="status">
            Message prepared for {{ character.name }}!
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-page {
  position: relative;
  z-index: 10;
  max-width: 980px;
  margin: 0 auto;
  padding: 106px 24px 96px;
}

.switcher-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 40px;
}

.switch-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.56);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  color: rgba(226, 226, 238, 0.8);
  transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.switch-back:hover {
  color: #ffffff;
  border-color: rgba(var(--char-rgb), 0.65);
  transform: translateX(-2px);
}

.switch-icon {
  width: 15px;
  height: 15px;
}

.quick-roster {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.roster-chip {
  padding: 7px 14px;
  border-radius: 9999px;
  background: rgba(16, 12, 24, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.76rem;
  font-weight: 500;
  color: rgba(212, 212, 224, 0.72);
  transition: all 0.25s ease;
}

.roster-chip:hover {
  color: #ffffff;
  border-color: rgba(var(--chip-rgb), 0.55);
}

.roster-chip.is-current {
  background: rgba(var(--chip-rgb), 0.2);
  border-color: rgba(var(--chip-rgb), 0.7);
  color: #ffffff;
  box-shadow: 0 0 18px rgba(var(--chip-rgb), 0.25);
}

.section-block {
  scroll-margin-top: 108px;
  margin-bottom: 64px;
}

.glass-card {
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(20, 15, 32, 0.68), rgba(10, 8, 16, 0.82));
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.4);
}

/* About hero */
.hero-about {
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(22, 16, 36, 0.72), rgba(9, 7, 15, 0.88));
  border: 1px solid rgba(var(--char-rgb), 0.24);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5),
    0 0 42px rgba(var(--char-rgb), 0.12);
}

.about-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  align-items: center;
}

.about-avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.12);
  border: 1px solid rgba(var(--char-rgb), 0.3);
  font-size: 0.72rem;
  color: rgba(244, 244, 252, 0.9);
  text-align: center;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--char-accent);
  box-shadow: 0 0 8px var(--char-accent);
}

.hero-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.hero-code {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--char-accent);
}

.hero-class {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(226, 226, 238, 0.8);
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #ffffff;
  line-height: 1.1;
}

.hero-role {
  font-size: 1rem;
  font-weight: 500;
  color: var(--char-accent);
  margin-top: 4px;
  margin-bottom: 14px;
}

.hero-headline {
  font-size: 1.05rem;
  font-weight: 500;
  color: rgba(244, 244, 252, 0.94);
  margin-bottom: 10px;
}

.hero-bio-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.hero-bio-stack .hero-bio {
  margin-bottom: 0;
}

.hero-bio {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(212, 212, 224, 0.72);
  margin-bottom: 20px;
}

.about-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.detail-pill {
  padding: 9px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 161, 178, 0.65);
}

.detail-value {
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(244, 244, 252, 0.92);
}

/* Section headings */
.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-index {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--char-accent);
}

.section-heading h2 {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: #ffffff;
}

/* Timeline */
.timeline-list {
  display: grid;
  gap: 16px;
}

.timeline-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.timeline-header h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: #ffffff;
}

.org-name {
  font-size: 0.85rem;
  color: var(--char-accent);
  margin-top: 2px;
}

.timeline-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.type-badge {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(226, 226, 238, 0.8);
}

.period-badge {
  font-size: 0.74rem;
  padding: 4px 11px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.12);
  border: 1px solid rgba(var(--char-rgb), 0.25);
  color: rgba(244, 244, 252, 0.86);
}

.card-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(212, 212, 224, 0.72);
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--char-rgb), 0.45);
}

.project-category {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--char-accent);
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 8px;
}

.tech-tag {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(226, 226, 238, 0.8);
}

/* Skills */
.skills-groups-wrap {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.skill-group-column {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skill-group-heading {
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 600;
  color: #ffffff;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.skill-category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-category-block {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.skill-category-title {
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--char-accent);
}

.skill-pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pill-item {
  font-size: 0.78rem;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.1);
  border: 1px solid rgba(var(--char-rgb), 0.26);
  color: rgba(244, 244, 252, 0.9);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.skill-pill-item.soft {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.12);
}

.skill-pill-item:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--char-rgb), 0.6);
  background: rgba(var(--char-rgb), 0.2);
}

.skills-panel {
  display: grid;
  gap: 16px;
}

.skill-bar-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skill-bar-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.skill-bar-name {
  color: rgba(244, 244, 252, 0.92);
  font-weight: 500;
}

.skill-bar-pct {
  color: var(--char-accent);
  font-weight: 600;
}

.skill-bar-track {
  height: 7px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, var(--char-secondary), var(--char-accent));
  box-shadow: 0 0 14px rgba(var(--char-rgb), 0.45);
}

/* Contact */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
}

.contact-info-card h3 {
  font-size: 1.15rem;
  color: #ffffff;
  margin-bottom: 10px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.contact-link-pill {
  padding: 8px 14px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.14);
  border: 1px solid rgba(var(--char-rgb), 0.32);
  font-size: 0.78rem;
  color: #ffffff;
  transition: background 0.25s ease, transform 0.25s ease;
}

.contact-link-pill:hover {
  background: rgba(var(--char-rgb), 0.28);
  transform: translateY(-2px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-row label {
  font-size: 0.75rem;
  color: rgba(212, 212, 224, 0.72);
  letter-spacing: 0.04em;
}

.form-row input,
.form-row textarea {
  padding: 10px 13px;
  border-radius: 12px;
  background: rgba(6, 4, 12, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: #ffffff;
  transition: border-color 0.25s ease;
}

.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  border-color: var(--char-accent);
}

.submit-btn {
  align-self: flex-start;
  padding: 10px 24px;
  border-radius: 9999px;
  background: rgba(var(--char-rgb), 0.22);
  border: 1px solid rgba(var(--char-rgb), 0.65);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.submit-btn:hover {
  background: rgba(var(--char-rgb), 0.36);
  box-shadow: 0 0 22px rgba(var(--char-rgb), 0.35);
  transform: translateY(-1px);
}

.sent-toast {
  font-size: 0.8rem;
  color: #d8b4fe;
}

@media (max-width: 760px) {
  .about-grid,
  .projects-grid,
  .skills-groups-wrap,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .about-avatar-col {
    align-items: flex-start;
  }
}
</style>
