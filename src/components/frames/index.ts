import FrameSimple from './FrameSimple.vue'

export type FrameKey = 'none' | 'simple'

export const frames: Record<FrameKey, any> = {
  none: null,
  simple: FrameSimple
}

export default frames
