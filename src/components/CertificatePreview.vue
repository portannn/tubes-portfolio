<script setup>
defineProps({
  certificate: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="cert-stage" :class="{ 'is-expanded': expanded }">
    <!-- Field Work Practice Certificate (Landscape) -->
    <div v-if="certificate.previewType === 'prakerin'" class="doc-sheet doc-prakerin">
      <div class="prakerin-accent-left" aria-hidden="true"></div>
      <div class="prakerin-header">
        <span class="prakerin-brand">Yayasan Sekar Laut</span>
        <span class="prakerin-badge">SMK BISA HEBAT</span>
      </div>
      <div class="prakerin-body">
        <p class="prakerin-title">Sertifikat</p>
        <p class="prakerin-subtitle">PRAKTIK KERJA INDUSTRI</p>
        <p class="prakerin-number">Nomor : {{ certificate.credentialNo }}</p>
        <p class="prakerin-label">Diberikan Kepada :</p>
        <p class="prakerin-name">{{ certificate.recipient.toUpperCase() }}</p>
        <p class="prakerin-meta">
          Sekolah asal : SMK 1 BARUNAWATI &nbsp;•&nbsp; Kompetensi keahlian : {{ certificate.competenceField }}
        </p>
        <p class="prakerin-desc">
          Telah melaksanakan Praktek Kerja Industri (PRAKERIN) selama 2 bulan di
          <strong>{{ certificate.hostInstitution }}</strong>
        </p>
      </div>
      <div class="prakerin-footer">
        <div class="prakerin-photo-box" aria-hidden="true"></div>
        <div class="prakerin-reel" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <!-- Certified System Analyst (BNSP / LSP Informatika Portrait on White Mat) -->
    <div v-else class="doc-sheet doc-csa-mat">
      <div class="csa-paper">
        <div class="csa-border-left" aria-hidden="true"></div>
        <div class="csa-content">
          <div class="csa-emblem" aria-hidden="true">★</div>
          <p class="csa-heading">SERTIFIKAT KOMPETENSI</p>
          <p class="csa-subheading">CERTIFICATE OF COMPETENCE</p>
          <p class="csa-no">No. {{ certificate.credentialNo }}</p>
          <p class="csa-recipient">{{ certificate.recipient }}</p>
          <p class="csa-reg">No. Reg. {{ certificate.registrationNo }}</p>
          <div class="csa-divider"></div>
          <p class="csa-field">{{ certificate.competenceField }}</p>
          <p class="csa-qual">{{ certificate.qualification }}</p>
          <p class="csa-eng-qual">Certified System Analyst (CSA)</p>
          <div class="csa-bottom">
            <span class="csa-validity">Valid 3 Years</span>
            <span class="csa-seal">BNSP / LSP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cert-stage {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
}

.cert-stage.is-expanded {
  aspect-ratio: 16 / 10.5;
  border-radius: 18px;
}

.doc-sheet {
  width: 100%;
  height: 100%;
  position: relative;
  color: #18181b;
  font-family: Georgia, 'Times New Roman', serif;
}

/* Prakerin Certificate */
.doc-prakerin {
  padding: 14px 18px 12px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at 80% 45%, rgba(244, 244, 245, 0.8), #ffffff 68%);
}

.prakerin-accent-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 14px;
  background: linear-gradient(180deg, #b91c1c 0%, #f59e0b 65%, #fbbf24 100%);
  clip-path: polygon(0 0, 100% 0, 62% 50%, 100% 100%, 0 100%);
}

.prakerin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-sans);
  font-size: 0.56rem;
  font-weight: 700;
  color: #1e3a8a;
}

.prakerin-badge {
  color: #0284c7;
  letter-spacing: 0.04em;
}

.prakerin-body {
  text-align: center;
  padding: 2px 10px;
}

.prakerin-title {
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-style: italic;
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
}

.prakerin-subtitle {
  font-family: var(--font-sans);
  font-size: clamp(0.55rem, 1vw, 0.72rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #374151;
  margin-top: 2px;
}

.prakerin-number {
  font-family: var(--font-sans);
  font-size: 0.48rem;
  color: #6b7280;
  margin-bottom: 5px;
}

.prakerin-label {
  font-family: var(--font-sans);
  font-size: 0.48rem;
  color: #4b5563;
}

.prakerin-name {
  font-family: var(--font-sans);
  font-size: clamp(0.65rem, 1.2vw, 0.85rem);
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #111827;
  margin: 2px 0 4px;
}

.prakerin-meta,
.prakerin-desc {
  font-family: var(--font-sans);
  font-size: 0.47rem;
  line-height: 1.35;
  color: #374151;
}

.prakerin-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 6px;
}

.prakerin-photo-box {
  width: 24px;
  height: 30px;
  border-radius: 2px;
  background: linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%);
  border: 1px solid #d1d5db;
}

.prakerin-reel {
  display: flex;
  gap: 3px;
  opacity: 0.55;
}

.prakerin-reel span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid #6b7280;
}

/* CSA Certificate */
.doc-csa-mat {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: #ffffff;
}

.csa-paper {
  position: relative;
  width: 56%;
  height: 100%;
  background: #fafafa;
  border: 1px solid #d4d4d8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
}

.csa-border-left {
  width: 12px;
  flex-shrink: 0;
  background: repeating-linear-gradient(
    -45deg,
    #3f3f46,
    #3f3f46 2px,
    #e4e4e7 2px,
    #e4e4e7 4px
  );
  border-right: 1px solid #a1a1aa;
}

.csa-content {
  flex: 1;
  padding: 8px 9px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: var(--font-sans);
}

.csa-emblem {
  font-size: 0.72rem;
  color: #b45309;
  line-height: 1;
}

.csa-heading {
  font-size: 0.54rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #111827;
}

.csa-subheading {
  font-size: 0.42rem;
  font-weight: 600;
  color: #4b5563;
}

.csa-no {
  font-size: 0.4rem;
  color: #6b7280;
}

.csa-recipient {
  font-size: 0.54rem;
  font-weight: 700;
  color: #09090b;
  margin-top: 2px;
}

.csa-reg {
  font-size: 0.4rem;
  color: #52525b;
}

.csa-divider {
  height: 1px;
  width: 60%;
  margin: 2px auto;
  background: #d4d4d8;
}

.csa-field {
  font-size: 0.41rem;
  color: #3f3f46;
  line-height: 1.25;
}

.csa-qual {
  font-size: 0.48rem;
  font-weight: 700;
  color: #18181b;
}

.csa-eng-qual {
  font-size: 0.44rem;
  font-weight: 600;
  color: #4338ca;
}

.csa-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
}

.csa-validity {
  font-size: 0.38rem;
  color: #52525b;
}

.csa-seal {
  font-size: 0.4rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 3px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #ffffff;
}

.is-expanded .prakerin-meta,
.is-expanded .prakerin-desc {
  font-size: 0.62rem;
}

.is-expanded .prakerin-number,
.is-expanded .prakerin-label {
  font-size: 0.6rem;
}

.is-expanded .csa-heading {
  font-size: 0.72rem;
}

.is-expanded .csa-recipient {
  font-size: 0.72rem;
}

.is-expanded .csa-field,
.is-expanded .csa-qual,
.is-expanded .csa-eng-qual {
  font-size: 0.58rem;
}
</style>
