import { mount } from '../Layout'
import { useLang } from '../i18n'
import { HERO_PHOTOS, PAGES, QUOTES, VENUE } from '../content'
import { Photo } from '../Photo'
import { PageHero, Reveal, CtaBand, Arrow } from '../ui'
import type { PhotoId } from '../photos.gen'

/*
  Reviews. The headline figure is the Facebook page's own recommendation
  score. Quote cards appear only once real quotes are added to QUOTES in
  content.ts; until then the page points to the reviews on Facebook rather
  than showing filler.
*/

const RECENT: PhotoId[] = ['p013', 'p032', 'p068', 'p026']

function Reviews() {
  const { t, lang } = useLang()
  const r = t.reviews
  return (
    <>
      <PageHero photo={HERO_PHOTOS.reviews} eyebrow={r.eyebrow} title={r.title} intro={r.intro} />

      <section aria-label={r.figure} className="px-5 pt-4 pb-16 md:px-10">
        <div className="mx-auto max-w-[1248px]">
          <Reveal>
            <div className="glass flex flex-wrap items-end justify-between gap-8 rounded-[36px] p-8 md:p-14">
              <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                <span className="display text-gold" style={{ fontSize: 'clamp(88px, 14vw, 168px)', lineHeight: 0.85, fontWeight: 400 }}>
                  {VENUE.recommend}%
                </span>
                <span className="pb-2 text-[20px] leading-snug text-bone md:text-[24px]">
                  {r.figure}
                  <span className="mt-1 block text-[15px] text-mist">{r.basis}</span>
                </span>
              </div>
              <a href={VENUE.facebookReviews} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                {r.read}
                <Arrow dir="out" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {QUOTES.length > 0 && (
        <section aria-labelledby="quotes-title" className="px-5 pb-16 md:px-10">
          <div className="mx-auto max-w-[1248px]">
            <h2 id="quotes-title" className="display m-0 text-[34px] md:text-[44px]">
              {r.quotesTitle}
            </h2>
            <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
              {QUOTES.map((q, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <figure className="m-0 h-full rounded-[28px] border border-line bg-ink-2 p-8">
                      <blockquote className="display m-0 text-[22px]" style={{ lineHeight: 1.35, fontWeight: 400 }}>
                        “{q.text[lang]}”
                      </blockquote>
                      <figcaption className="mt-6 text-[15px] text-mist">
                        <span className="font-semibold text-bone">{q.name}</span> · {q.event}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-label={r.leaveTitle} className="px-5 pb-16 md:px-10">
        <div className="mx-auto grid max-w-[1248px] grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[32px] border border-line bg-ink-2 p-8 md:p-10">
              <h2 className="display m-0 text-[30px] md:text-[34px]">{r.readMoreTitle}</h2>
              <p className="mt-4 mb-0 max-w-[460px] text-[16.5px] leading-[1.65] text-mist">{r.readMoreBody}</p>
              <a href={VENUE.facebookReviews} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-7">
                {r.read}
                <Arrow dir="out" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-[32px] border border-line bg-ink-2 p-8 md:p-10">
              <h2 className="display m-0 text-[30px] md:text-[34px]">{r.leaveTitle}</h2>
              <p className="mt-4 mb-0 max-w-[460px] text-[16.5px] leading-[1.65] text-mist">{r.leaveBody}</p>
              <a href={VENUE.facebookReviews} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-7">
                {r.leave}
                <Arrow dir="out" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="recent-title" className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-[1248px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="recent-title" className="display m-0 text-[34px] md:text-[44px]">
              {r.recentTitle}
            </h2>
            <a href={PAGES.gallery} className="label inline-flex min-h-11 items-center gap-2 text-gold no-underline">
              {t.nav.gallery}
              <Arrow />
            </a>
          </div>
          <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-4">
            {RECENT.map((id) => (
              <li key={id}>
                <Photo id={id} sizes="(min-width: 768px) 25vw, 50vw" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand photo="p066" />
    </>
  )
}

mount(Reviews)
