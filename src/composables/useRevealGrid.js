import { ref } from 'vue'

/**
 * Open/close state for the welcome screen's mystery grids (columns and shards share it).
 * Only one cell is open at a time. Mouse hover, keyboard focus, or (touch) the first tap opens one.
 */
export function useRevealGrid() {
  const openIndex = ref(-1)
  const photoFailed = ref({})

  function hasPhoto(character) {
    return Boolean(character.avatarUrl) && !photoFailed.value[character.id]
  }

  function onTileEnter(i, event) {
    if (event.pointerType === 'mouse') openIndex.value = i
  }

  function onTileLeave(i, event) {
    if (event.pointerType === 'mouse' && openIndex.value === i) openIndex.value = -1
  }

  function onTileFocus(i, event) {
    if (event.target.matches(':focus-visible')) openIndex.value = i
  }

  function onTileBlur(i) {
    if (openIndex.value === i) openIndex.value = -1
  }

  function onTileClick(i, event) {
    // Touch has no hover: the first tap reveals, a second tap (or any other tap) starts.
    // On mouse the click bubbles up and starts straight away.
    if (window.matchMedia('(hover: none)').matches && openIndex.value !== i) {
      event.stopPropagation()
      openIndex.value = i
    }
  }

  return { openIndex, photoFailed, hasPhoto, onTileEnter, onTileLeave, onTileFocus, onTileBlur, onTileClick }
}
