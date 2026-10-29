import { mount } from '../Layout'
import { useLang } from '../i18n'
import { VENUE, HERO_PHOTOS, VENUE_PHOTOS, mapsLink, mapsEmbed, waLink } from '../content'
import { Photo } from '../Photo'
import { PageHero, Reveal, SectionHead, CtaBand, Arrow, ChatIcon } from '../ui'

/*
  Venue: each of the four spaces gets its own block (text beside a three-photo
  mosaic, alternating sides), then the facilities list and how to get here.
  Section ids match the slugs the home film's space cards link to.
*/

function Venue() {
  const { t } = useLang()
  const v = t.venue
  return (
    <>
      <PageHero photo={HERO_PHOTOS.venue} eyebrow={v.eyebrow} title={v.title} intro={v.intro}>
        <nav aria-label={v.spacesNav}>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {v.spaces.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="btn btn-ghost" style={{ minHeight: 44, padding: '0 18px' }}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {v.spaces.map((s, i) => {
        const [a, b, c] = VENUE_PHOTOS[i]
        const flip = i % 2 === 1
        return (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="px-5 py-16 md:px-10 md:py-24">
            <div className="mx-auto grid max-w-[1248px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? 'lg:order-2' : undefined}>
                <span className="label text-gold">
                  0{i + 1} · {s.kicker}
                </span>
                <h2 id={`${s.slug}-title`} className="display mt-4 mb-0 text-[40px] md:text-[56px]" style={{ lineHeight: 1.04 }}>
                  {s.name}
                </h2>
                {s.body.map((para) => (
                  <p key={para} className="mt-5 mb-0 max-w-[540px] text-[17px] leading-[1.7] text-mist">
                    {para}
                  </p>
                ))}
                <h3 className="label mt-8 mb-0 text-haze">{v.goodFor}</h3>
                <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                  {s.goodFor.map((g) => (
                    <li key={g} className="rounded-full border border-line px-4 py-2 text-[15px] text-bone">
                      {g}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className={flip ? 'lg:order-1' : undefined}>
                <div className="grid grid-cols-2 gap-3 md:gap-4" style={{ gridTemplateRows: 'repeat(2, clamp(150px, 20vw, 250px))' }}>
                  <Photo
                    id={a}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="col-span-2 h-full w-full rounded-[28px] object-cover sm:col-span-1 sm:row-span-2"
                  />
                  <Photo id={b} sizes="(min-width: 1024px) 300px, 50vw" className="h-full w-full rounded-[22px] object-cover" />
                  <Photo id={c} sizes="(min-width: 1024px) 300px, 50vw" className="h-full w-full rounded-[22px] object-cover" />
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}

      <section aria-labelledby="facilities-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1248px]">
          <SectionHead id="facilities-title" eyebrow={v.facilitiesEyebrow} title={v.facilitiesTitle} />
          <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {v.facilities.map((f, i) => (
              <li key={f.t}>
                <Reveal delay={(i % 4) * 0.05} className="h-full">
                  <div className="h-full rounded-[24px] border border-line bg-ink-2 p-6">
                    <span aria-hidden="true" className="label text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display mt-4 mb-0 text-[23px]">{f.t}</h3>
                    <p className="mt-2 mb-0 text-[15.5px] leading-[1.6] text-mist">{f.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="find-title" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1248px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead id="find-title" eyebrow={v.findEyebrow} title={v.findTitle} intro={v.findBody} />
            <Reveal>
              <address className="mt-6 text-[17px] not-italic leading-[1.6] text-bone">
                {VENUE.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  {t.contact.directions}
                  <Arrow dir="out" />
                </a>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <ChatIcon />
                  {t.cta.whatsapp}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <iframe
              title={t.contact.mapTitle}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full rounded-[32px] border border-line"
              style={{ filter: 'grayscale(0.4) invert(0.9) hue-rotate(180deg) contrast(0.9)' }}
            />
          </Reveal>
        </div>
      </section>

      <CtaBand photo="p057" />
    </>
  )
}

mount(Venue)
