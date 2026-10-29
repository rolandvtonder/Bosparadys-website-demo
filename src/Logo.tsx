import { url } from './content'

/*
  The only logo file is a photograph of the black monogram decal on a pale,
  shadowed wall. Rather than ship that grey rectangle, an SVG filter turns
  luminance into alpha: dark ink becomes solid gold, the pale wall (and its
  soft tree shadows) falls away to transparent.

      alpha = 6 * (0.6 - luminance)     ink ~0.15 -> 1    wall ~0.8 -> 0

  The filter is defined once (LogoFilter, mounted in App) and referenced by the
  .logo-ink class. A traced vector logo would be sharper; swap /logo.jpg for an
  SVG when one exists and drop the class.
*/

export function LogoFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="logo-ink" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.914
                  0 0 0 0 0.706
                  0 0 0 0 0.353
                  -1.276 -4.291 -0.433 0 3.6"
        />
      </filter>
    </svg>
  )
}

/* The photo's edges are darker than the wall, so the filter would draw them as
   a gold frame. The mark is cropped inward to lose them. */
export function LogoMark({ size, alt = '' }: { size: number; alt?: string }) {
  return (
    <span style={{ display: 'block', width: size, height: size, overflow: 'hidden', flex: 'none' }}>
      <img
        src={url('logo.jpg')}
        alt={alt}
        width={size}
        height={size}
        className="logo-ink"
        style={{ width: size, height: size, objectFit: 'cover', display: 'block', transform: 'scale(1.14)' }}
      />
    </span>
  )
}
