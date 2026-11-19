import { computed, readonly, ref } from 'vue'

/**
 * Single source of truth for the character currently picked (flipped) on the
 * select screen. Module-level so any component can read it.
 *
 * Not to be confused with App.vue's `selectedId`, which tracks the character
 * whose portfolio is currently open.
 */
const selectedId = ref(null)

export function useCharacterSelection() {
  const hasSelection = computed(() => selectedId.value !== null)

  /** Select a card (switching if another one was selected). */
  function select(id) {
    selectedId.value = id
  }

  /** Select a card, or clear the selection if it is already the selected one. */
  function toggle(id) {
    selectedId.value = selectedId.value === id ? null : id
  }

  function clear() {
    selectedId.value = null
  }

  return {
    selectedId: readonly(selectedId),
    hasSelection,
    select,
    toggle,
    clear,
  }
}
