import { mount } from '../Layout'
import { useLang } from '../i18n'
import { PAGES } from '../content'
import { Photo } from '../Photo'
import Scene from '../Scene'
import { Reveal, SectionHead, CtaBand, Arrow } from '../ui'
import type { PhotoId } from '../photos.gen'

/*
  Home: the scroll film first, then one card per page so every part of the
  site is a tap away, then the closing call to action.
*/

const EXPLORE: { href: string; photo: PhotoId }[] = [
  { href: PAGES.venue, photo: 'p024' },
  { href: PAGES.events, photo: 'p013' },
  { href: PAGES.gallery, photo: 'p053' },
  { href: PAGES.reviews, photo: 'p066' },
]

function Home() {
  const { t } = useLang()
  return (
    <>
      <Scene />
      <section aria-labelledby="explore-title" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1248px]">
          <SectionHead id="explore-title" eyebrow={t.explore.eyebrow} title={t.explore.title} />
          <ul className="mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((e, i) => {
              const card = t.explore.cards[i]
              return (
                <li key={e.href}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <a
                      href={e.href}
                      className="group relative flex aspect-[4/5] h-full flex-col justify-end overflow-hidden rounded-[32px] border border-line p-6 text-bone no-underline"
                    >
                      <Photo
                        id={e.photo}
                        decorative
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="absolute inset-0 -z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(180deg, rgba(12,17,13,0.1) 30%, rgba(12,17,13,0.94) 100%)' }}
                      />
                      <span aria-hidden="true" className="label absolute top-6 left-6 text-gold">
                        0{i + 1}
                      </span>
                      <span className="relative">
                        <span className="display block text-[30px]" style={{ lineHeight: 1.1 }}>
                          {card.title}
                        </span>
                        <span className="mt-3 block text-[15.5px] leading-[1.55] text-mist">{card.body}</span>
                        <span className="label mt-5 inline-flex items-center gap-2 text-gold">
                          {t.explore.open}
                          <Arrow />
                        </span>
                      </span>
                    </a>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

mount(Home)
