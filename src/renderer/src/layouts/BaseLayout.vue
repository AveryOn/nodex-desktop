<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Props = {
  modelValue?: boolean
  breakpoint?: number
  headerHeight?: number
  asideExpandedWidth?: number
  asideCollapsedWidth?: number
  defaultExpanded?: boolean
  hoverExpand?: boolean
  swipeEdgeSize?: number
  swipeThreshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  breakpoint: 992,
  headerHeight: 90,
  asideExpandedWidth: 230,
  asideCollapsedWidth: 12,
  defaultExpanded: true,
  hoverExpand: true,
  swipeEdgeSize: 24,
  swipeThreshold: 50
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', value: boolean): void
}>()

// const layoutRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)
const innerExpanded = ref(props.defaultExpanded)
const isHoverExpanded = ref(false)

const touchStartX = ref(0)
const touchCurrentX = ref(0)
const touchStartY = ref(0)
const isTrackingSwipe = ref(false)

const isControlled = computed(() => props.modelValue !== undefined)

const expandedState = computed<boolean>({
  get() {
    return isControlled.value
      ? Boolean(props.modelValue)
      : innerExpanded.value
  },
  set(value: boolean) {
    if (!isControlled.value) {
      innerExpanded.value = value
    }
    emit('update:modelValue', value)
  }
})

const isAsideVisible = computed(() => {
  if (isMobile.value) {
    return expandedState.value
  }

  return expandedState.value || isHoverExpanded.value
})

const showRail = computed(() => {
  if (isMobile.value) return false
  if (props.hoverExpand) return false
  return expandedState.value
})

function updateViewportState() {
  isMobile.value = window.innerWidth < props.breakpoint

  if (isMobile.value) {
    isHoverExpanded.value = false
  }
}

function open() {
  if (!expandedState.value) {
    expandedState.value = true
    emit('open')
    emit('toggle', true)
  }
}

function close() {
  if (expandedState.value) {
    expandedState.value = false
    emit('close')
    emit('toggle', false)
  }
}

function toggle() {
  if (expandedState.value) {
    close()
  } else {
    open()
  }
}

function onAsideMouseEnter() {
  if (!isMobile.value && props.hoverExpand && !expandedState.value) {
    isHoverExpanded.value = true
  }
}

function onAsideMouseLeave() {
  if (!isMobile.value) {
    isHoverExpanded.value = false
  }
}

function onTouchStart(event: TouchEvent) {
  if (!isMobile.value) return
  const touch = event.touches[0]
  if (!touch) return

  touchStartX.value = touch.clientX
  touchCurrentX.value = touch.clientX
  touchStartY.value = touch.clientY

  const fromLeftEdge = touch.clientX <= props.swipeEdgeSize
  const startedInsideOpenedAside =
    expandedState.value && touch.clientX <= props.asideExpandedWidth

  isTrackingSwipe.value = fromLeftEdge || startedInsideOpenedAside
}

function onTouchMove(event: TouchEvent) {
  if (!isMobile.value || !isTrackingSwipe.value) return
  const touch = event.touches[0]
  if (!touch) return

  touchCurrentX.value = touch.clientX
}

function onTouchEnd() {
  if (!isMobile.value || !isTrackingSwipe.value) {
    isTrackingSwipe.value = false
    return
  }

  const deltaX = touchCurrentX.value - touchStartX.value
  const deltaY = Math.abs(touchStartY.value - touchStartY.value)

  if (Math.abs(deltaX) < Math.abs(deltaY)) {
    isTrackingSwipe.value = false
    return
  }

  if (!expandedState.value && deltaX > props.swipeThreshold) {
    open()
  } else if (expandedState.value && deltaX < -props.swipeThreshold) {
    close()
  }

  isTrackingSwipe.value = false
}

function onResize() {
  updateViewportState()
}

watch(
  () => props.modelValue,
  () => {
    if (isMobile.value && !expandedState.value) {
      isHoverExpanded.value = false
    }
  }
)

onMounted(() => {
  updateViewportState()
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

defineExpose({
  open,
  close,
  toggle,
  isMobile,
  isExpanded: expandedState
})
</script>

<template>
  <div
    ref="layoutRef"
    class="base-layout"
    :class="{
      'is-mobile': isMobile,
      'aside-expanded': isAsideVisible,
      'aside-collapsed': !isAsideVisible,
      'aside-hovered': isHoverExpanded
    }"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
  >
    <header class="base-layout__header">
      <slot name="header" />
    </header>

    <aside
      class="base-layout__aside"
      :class="{
        'base-layout__aside--visible': isAsideVisible,
        'base-layout__aside--mobile': isMobile
      }"
      @mouseenter="onAsideMouseEnter"
      @mouseleave="onAsideMouseLeave"
    >
      <div
        v-if="showRail"
        class="base-layout__rail"
        aria-hidden="true"
        @click="toggle"
      />

      <div class="base-layout__aside-panel">
        <slot name="aside" />
      </div>
    </aside>

    <div
      v-if="isMobile && isAsideVisible"
      class="base-layout__overlay"
      @click="close"
    />

    <main class="base-layout__main">
      <div class="base-layout__main-scroll">
        <div class="base-layout__main-content">
          <slot />
        </div>

        <footer class="base-layout__footer">
          <slot name="footer" />
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
.base-layout {
  --layout-header-height: v-bind('`${props.headerHeight}px`');
  --layout-aside-expanded-width: v-bind(
    '`${props.asideExpandedWidth}px`'
  );
  --layout-aside-collapsed-width: v-bind(
    '`${props.asideCollapsedWidth}px`'
  );

  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: var(--layout-header-height) minmax(0, 1fr);
  grid-template-areas:
    'aside header'
    'aside main';
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: var(--layout-bg, #ffffff);
}

.base-layout__header {
  grid-area: header;
  min-width: 0;
  min-height: 0;
  height: var(--layout-header-height);
  overflow: hidden;
  z-index: 20;
}

.base-layout__aside {
  grid-area: aside;
  position: relative;
  display: flex;
  width: var(--layout-aside-expanded-width);
  height: 100vh;
  min-height: 100vh;
  transition:
    width 0.24s ease,
    transform 0.24s ease,
    box-shadow 0.24s ease;
  overflow: hidden;
  z-index: 30;
  background: var(--layout-aside-bg, #d0a1d6c7);
  border-right: 1px solid var(--layout-border-color, #e5e7eb);
}

.base-layout__aside-panel {
  width: var(--layout-aside-expanded-width);
  min-width: var(--layout-aside-expanded-width);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.base-layout__rail {
  width: var(--layout-aside-collapsed-width);
  min-width: var(--layout-aside-collapsed-width);
  height: 100%;
  cursor: pointer;
  background: var(--layout-rail-bg, #9e74a3c7);
  transition: background 0.2s ease;
}

.base-layout__rail:hover {
  background: var(--layout-rail-bg-hover, #826086c7);
}

.base-layout__main {
  grid-area: main;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.base-layout__main-scroll {
  height: 100%;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.base-layout__main-content {
  flex: 1 0 auto;
  min-width: 0;
}

.base-layout__footer {
  flex: 0 0 auto;
  width: 100%;
  min-height: 0;
}

.base-layout.aside-collapsed:not(.is-mobile) .base-layout__aside {
  width: var(--layout-aside-collapsed-width);
}

.base-layout.aside-collapsed:not(.is-mobile) .base-layout__aside-panel {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-16px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.base-layout.aside-hovered:not(.is-mobile) .base-layout__aside,
.base-layout.aside-expanded:not(.is-mobile) .base-layout__aside {
  width: var(--layout-aside-expanded-width);
}

.base-layout.aside-hovered:not(.is-mobile) .base-layout__aside-panel,
.base-layout.aside-expanded:not(.is-mobile) .base-layout__aside-panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.base-layout.is-mobile {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'header'
    'main';
}

.base-layout.is-mobile .base-layout__aside {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--layout-aside-expanded-width);
  transform: translateX(-100%);
  box-shadow: none;
}

.base-layout.is-mobile .base-layout__aside--visible {
  transform: translateX(0);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 12px 40px rgba(0, 0, 0, 0.18);
}

.base-layout.is-mobile .base-layout__aside-panel {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.base-layout__overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.36);
  z-index: 25;
}

@media (max-width: 991px) {
  .base-layout__header {
    width: 100%;
  }
}
</style>
