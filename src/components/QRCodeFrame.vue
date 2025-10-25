<script setup lang="ts">
import { toRefs, computed, defineComponent, h } from 'vue'
import frames from './frames'
import type { FrameKey } from './frames'

interface FrameStyle {
  textColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  padding?: string
}

interface Props {
  frameText: string
  textPosition: 'top' | 'bottom' | 'left' | 'right'
  frameStyle?: FrameStyle
  frameType?: FrameKey
}

const props = withDefaults(defineProps<Props>(), {
  textPosition: 'bottom',
  frameStyle: () => ({}),
  frameType: 'none'
})

const { frameText, textPosition, frameStyle, frameType } = toRefs(props)

const selectedFrame = computed(() => frames[(frameType.value ?? 'none') as FrameKey] ?? null)

// DefaultFrame: a simple wrapper component used when no frame is selected
const DefaultFrame = defineComponent({
  name: 'DefaultFrame',
  props: {
    frameText: { type: String, default: '' },
    textPosition: { type: String as () => 'top' | 'bottom' | 'left' | 'right', default: 'bottom' },
    frameStyle: { type: Object as () => Record<string, any>, default: () => ({}) }
  },
  setup(props, { slots }) {
    return () => {
      const pos = props.textPosition
      const containerClass = [
        'w-fit',
        pos === 'left' || pos === 'right' ? 'flex-row' : 'flex-col',
        pos === 'left' ? 'flex-row-reverse' : '',
        pos === 'top' ? 'flex-col-reverse' : ''
      ]

      const style: Record<string, any> = {
        backgroundColor: props.frameStyle?.backgroundColor,
        borderColor: props.frameStyle?.borderColor,
        borderWidth: props.frameStyle?.borderWidth,
        borderRadius: props.frameStyle?.borderRadius,
        padding: props.frameStyle?.padding,
        borderStyle: props.frameStyle?.borderColor ? 'solid' : 'none',
        gap: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }

      const textStyle: Record<string, any> = {
        color: props.frameStyle?.textColor,
        margin: 0,
        textAlign: 'center',
        whiteSpace: 'pre-line',
        maxWidth: pos === 'left' || pos === 'right' ? undefined : '200px',
        width: pos === 'left' || pos === 'right' ? '200px' : undefined
      }

      return h('div', { class: containerClass.join(' '), style }, [
        slots['qr-code'] ? slots['qr-code']() : null,
        h('p', { style: textStyle }, props.frameText)
      ])
    }
  }
})
</script>

<template>
  <div>
    <component
      :is="selectedFrame ?? DefaultFrame"
      :frame-text="frameText"
      :text-position="textPosition"
      :frame-style="frameStyle"
    >
      <template #qr-code>
        <slot name="qr-code"></slot>
      </template>
    </component>
  </div>
</template>
