import { useMemo, useRef, useState } from 'react'
import { mount } from '../Layout'
import { useLang } from '../i18n'
import { GALLERY, HERO_PHOTOS, VENUE, type GalleryCat } from '../content'
import { Photo, photoAlt } from '../Photo'
import Lightbox, { type LightboxHandle } from '../Lightbox'
import { PageHero, CtaBand, Arrow } from '../ui'

/*
  Gallery: filter chips over a dense grid, and a lightbox that steps through
  whatever the current filter shows. The photo count is announced politely
  when the filter changes.
*/

const CATS: ('all' | GalleryCat)[] = ['all', 'spaces', 'tables', 'decor', 'night']

function Gallery() {
  const { t, lang } = useLang()
  const g = t.gallery
  const [cat, setCat] = useState<'all' | GalleryCat>('all')
  const box = useRef<LightboxHandle>(null)
  const shown = useMemo(() => (cat === 'all' ? GALLERY : GALLERY.filter((p) => p.cat === cat)), [cat])
  const ids = shown.map((p) => p.id)

  return (
    <>
      <PageHero photo={HERO_PHOTOS.gallery} eyebrow={g.eyebrow} title={g.title} intro={g.intro} />

      <section aria-label={g.title} className="px-5 pt-4 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1248px]">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div role="group" aria-label={g.filterLabel} className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`btn ${cat === c ? 'btn-gold' : 'btn-ghost'}`}
                  style={{ minHeight: 44, padding: '0 18px' }}
                >
                  {g.filters[c]}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="label m-0 text-haze">
              {g.shown(shown.length)}
            </p>
          </div>

          <ul
            className="mt-8 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-4"
            style={{ gridAutoRows: 'clamp(150px, 22vw, 290px)', gridAutoFlow: 'dense' }}
          >
            {shown.map((p, i) => (
              <li key={p.id} className={p.tall ? 'row-span-2' : undefined}>
                <button
                  type="button"
                  onClick={() => box.current?.open(i)}
                  aria-label={`${g.open}: ${photoAlt(p.id, lang)}`}
                  className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[22px] border-0 bg-ink-2 p-0"
                >
                  <Photo
                    id={p.id}
                    decorative
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {g.more}
              <Arrow dir="out" />
            </a>
          </div>
        </div>
      </section>

      <Lightbox ref={box} ids={ids} />
      <CtaBand />
    </>
  )
}

mount(Gallery)
