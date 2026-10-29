import type { CSSProperties } from 'react'
import { PHOTOS, type PhotoId } from './photos.gen'
import { ALT, url } from './content'
import { useLang } from './i18n'

/*
  Every photo on the site goes through here: a small and a large WebP from
  scripts/photos.mjs, real width/height so nothing shifts as it loads, and the
  alt text from content.ts in the current language. Pass `decorative` when the
  words next to the photo already say what it shows.
*/

export function Photo({
  id,
  sizes = '100vw',
  priority = false,
  decorative = false,
  className,
  style,
}: {
  id: PhotoId
  sizes?: string
  priority?: boolean
  decorative?: boolean
  className?: string
  style?: CSSProperties
}) {
  const { lang } = useLang()
  const s = PHOTOS[id]
  return (
    <img
      src={url(`photos/${id}.webp`)}
      srcSet={`${url(`photos/${id}-sm.webp`)} ${s.sw}w, ${url(`photos/${id}.webp`)} ${s.w}w`}
      sizes={sizes}
      width={s.w}
      height={s.h}
      alt={decorative ? '' : ALT[id][lang]}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={style}
    />
  )
}

export const photoAlt = (id: PhotoId, lang: 'en' | 'af') => ALT[id][lang]
