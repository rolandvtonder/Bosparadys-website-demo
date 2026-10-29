import { mount } from '../Layout'
import { useLang } from '../i18n'
import { HERO_PHOTOS, EVENT_PHOTOS, PAGES } from '../content'
import { Photo } from '../Photo'
import { PageHero, Reveal, SectionHead, CtaBand, Arrow } from '../ui'

/*
  Events: one block per kind of event (what it looks like here, with four
  photos from past celebrations), then how booking works, what to send, and
  the quote-based packages note. Pricing is not published, so nothing here
  states a price or a package tier.
*/

function Events() {
  const { t } = useLang()
  const e = t.events
  return (
    <>
      <PageHero photo={HERO_PHOTOS.events} eyebrow={e.eyebrow} title={e.title} intro={e.intro}>
        <nav aria-label={e.jump}>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {e.types.map((ty) => (
              <li key={ty.slug}>
                <a href={`#${ty.slug}`} className="btn btn-ghost" style={{ minHeight: 44, padding: '0 18px' }}>
                  {ty.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {e.types.map((ty, i) => {
        const photos = EVENT_PHOTOS[i]
        const flip = i % 2 === 1
        return (
          <section key={ty.slug} id={ty.slug} aria-labelledby={`${ty.slug}-title`} className="px-5 py-16 md:px-10 md:py-24">
            <div className="mx-auto grid max-w-[1248px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? 'lg:order-2' : undefined}>
                <span className="label text-gold">0{i + 1}</span>
                <h2 id={`${ty.slug}-title`} className="display mt-4 mb-0 text-[40px] md:text-[56px]" style={{ lineHeight: 1.04 }}>
                  {ty.title}
                </h2>
                <p className="display mt-4 mb-0 text-[22px] text-mist md:text-[26px]" style={{ fontStyle: 'italic', fontWeight: 300, lineHeight: 1.3 }}>
                  {ty.lead}
                </p>
                <p className="mt-5 mb-0 max-w-[540px] text-[17px] leading-[1.7] text-mist">{ty.body}</p>
                <h3 className="label mt-8 mb-0 text-haze">{e.seen}</h3>
                <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                  {ty.seen.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[16px] leading-[1.5] text-bone">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className={flip ? 'lg:order-1' : undefined}>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {photos.map((id, j) => (
                    <Photo
                      key={id}
                      id={id}
                      sizes="(min-width: 1024px) 300px, 50vw"
                      className={`w-full rounded-[22px] object-cover ${j === 0 || j === 3 ? 'aspect-[4/5]' : 'aspect-square'} ${j === 1 ? 'self-end' : ''}`}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}

      <section aria-labelledby="steps-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1248px]">
          <SectionHead id="steps-title" eyebrow={e.stepsEyebrow} title={e.stepsTitle} />
          <ol className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {e.steps.map((s, i) => (
              <li key={s.t}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-[24px] border border-line bg-ink-2 p-6">
                    <span className="display text-[44px] text-gold" style={{ fontWeight: 300, lineHeight: 1 }}>
                      {i + 1}
                    </span>
                    <h3 className="display mt-4 mb-0 text-[23px]">{s.t}</h3>
                    <p className="mt-2 mb-0 text-[15.5px] leading-[1.6] text-mist">{s.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[32px] border border-line bg-ink-2 p-8 md:p-10">
                <h3 className="display m-0 text-[30px] md:text-[34px]">{e.checklistTitle}</h3>
                <ul className="mt-6 grid list-none gap-3 p-0">
                  {e.checklist.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[16.5px] leading-[1.5] text-bone">
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="mt-0.5 flex-none text-gold">
                        <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass h-full rounded-[32px] p-8 md:p-10">
                <h3 className="display m-0 text-[30px] md:text-[34px]">{e.packagesTitle}</h3>
                <p className="mt-4 mb-0 max-w-[520px] text-[16.5px] leading-[1.65] text-mist">{e.packagesBody}</p>
                <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold mt-7">
                  {e.packagesCta}
                  <Arrow />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand photo="p060" />
    </>
  )
}

mount(Events)
