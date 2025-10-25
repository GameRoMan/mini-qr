export interface FrameStyle {
  textColor: string
  backgroundColor: string
  borderColor: string
  borderWidth: string
  borderRadius: string
  padding: string
}

import type { FrameKey } from '@/components/frames'
import frames from '@/components/frames'

export interface FramePreset {
  name: string
  style: FrameStyle
  text?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Frame key that maps to frames exported by components/frames/index.ts */
  type: FrameKey
}

export const plainFramePreset: FramePreset = {
  name: 'Default Frame',
  style: {
    textColor: '#000000',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: '1px',
    borderRadius: '8px',
    padding: '16px'
  },
  type: 'none'
}

export const darkFramePreset: FramePreset = {
  name: 'Dark Frame',
  style: {
    textColor: '#ffffff',
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: '1px',
    borderRadius: '8px',
    padding: '16px'
  },
  type: 'none'
}

export const borderlessFramePreset: FramePreset = {
  name: 'Borderless Frame',
  style: {
    textColor: '#000000',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: '0px',
    borderRadius: '0px',
    padding: '16px'
  },
  type: 'none'
}

export const builtInFramePresets: FramePreset[] = [
  plainFramePreset,
  darkFramePreset,
  borderlessFramePreset,
  {
    name: 'Simple Bottom Frame',
    style: {
      textColor: '#ffffff',
      backgroundColor: '#000000',
      borderColor: '#000000',
      borderWidth: '0px',
      borderRadius: '8px',
      padding: '12px'
    },
    text: 'SCAN ME',
    position: 'bottom',
    type: 'simple'
  }
]

function parseFramePresetsFromEnv(envVal?: string): FramePreset[] | undefined {
  if (!envVal) return undefined
  try {
    const parsed = JSON.parse(envVal) as Partial<FramePreset>[]
    // Validate that each parsed preset has a valid FrameKey that exists in frames
    const validKeys = new Set<FrameKey>(Object.keys(frames) as FrameKey[])
    const validated: FramePreset[] = []
    for (const p of parsed) {
      if (!p.name || !p.style || !p.type) {
        console.warn('Skipping invalid frame preset from env (missing name/style/type):', p)
        continue
      }
      if (!validKeys.has(p.type)) {
        console.warn('Skipping frame preset with unknown frame type:', p.type)
        continue
      }
      validated.push(p as FramePreset)
    }
    return validated.length > 0 ? validated : undefined
  } catch (err) {
    console.error('Failed to parse VITE_FRAME_PRESETS', err)
    return undefined
  }
}

const envFramePresets = parseFramePresetsFromEnv(import.meta.env.VITE_FRAME_PRESETS)
export const allFramePresets: FramePreset[] = envFramePresets ?? builtInFramePresets

export const defaultFramePreset: FramePreset =
  allFramePresets.find((p) => p.name === import.meta.env.VITE_FRAME_PRESET) ?? allFramePresets[0]
