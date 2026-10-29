/*
  Scroll choreography for the hero film.

  Structure follows the Marlin reference: a sticky stage, a fixed artboard
  scaled to fit, and three content groups that travel up as a filmstrip at
  different rates (parallax), while the background runs underneath. Here the
  background is five photographs instead of two video clips, cross-dissolving
  and slowly pushing in, day -> golden hour -> dusk -> fire-lit night.

  Two departures from the reference, both deliberate:
    - The hero's opening stagger plays on load (a clock), not on scroll. In the
      reference the headline sits at progress 0 and is invisible until the
      visitor scrolls, so the first screen is empty.
    - The artboard is fitted on both axes and centred. Width-only scaling crops
      the bottom of the artboard on wide or short windows. The photographs
      and scrims still fill the whole stage, so no bars show.

  Timeline, as scroll progress through the stage:

      0.00 - 0.16   hero holds
      0.10 - 0.18   spaces cards fade in, still below the frame
      0.16 - 0.46   move 1: hero leaves, spaces rise into place
      0.46 - 0.60   spaces hold
      0.60 - 0.88   move 2: spaces leave, dusk copy rises
      0.88 - 1.00   dusk holds before the page continues
*/

export const SCROLL_VH = 520

/** Phase windows as scroll progress. */
export const P = {
  g2In: [0.1, 0.18],
  move1: [0.16, 0.46],
  move2: [0.6, 0.88],
} as const

/** Intro clock, in seconds after load. */
export const INTRO = {
  words: [
    [0.15, 0.85],
    [0.27, 0.97],
    [0.39, 1.09],
  ],
  body: [
    [0.55, 1.15],
    [0.63, 1.23],
    [0.71, 1.31],
  ],
  buttons: [0.85, 1.45],
  stat: [0.7, 2.6],
  done: 2.7,
} as const

/*
  Background photographs (content.ts FILM_PHOTOS). Each later frame dissolves
  over the one before it around its point here, so the stack never shows a gap.
*/
export const FILM_AT = [0, 0.2, 0.42, 0.62, 0.8] as const
export const FADE = 0.05

/*
  Two artboards. Desktop is 16:9; mobile is a phone portrait short enough
  (700) to fit with the browser toolbars showing. Group offsets are where each
  group's top edge sits on the artboard at each keyframe.
*/
export type Layout = {
  mobile: boolean
  W: number
  H: number
  safe: number
  g1: { start: number; end: number }
  g2: { enter: number; mid: number; end: number }
  g3: { enter: number; mid: number; end: number }
}

export const DESKTOP: Layout = {
  mobile: false,
  W: 1440,
  H: 810,
  safe: 96,
  g1: { start: 172, end: -790 },
  g2: { enter: 1050, mid: 100, end: -1100 },
  g3: { enter: 1800, mid: 1150, end: 540 },
}

export const MOBILE: Layout = {
  mobile: true,
  W: 390,
  H: 700,
  safe: 20,
  g1: { start: 92, end: -720 },
  g2: { enter: 900, mid: 92, end: -700 },
  g3: { enter: 1000, mid: 720, end: 190 },
}

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

/** Ease-in-out for the group moves, so they settle instead of stopping dead. */
export const smooth = (t: number) => t * t * (3 - 2 * t)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
