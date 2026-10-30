import type { ReactNode } from 'react'
import { mount } from '../Layout'
import { useLang } from '../i18n'
import { VENUE, HERO_PHOTOS, telLink, waLink, mapsLink, mapsEmbed } from '../content'
import { PageHero, Reveal, Arrow, ChatIcon, PhoneIcon } from '../ui'

/*
  Contact. Bookings are taken by phone, so the page leads with the number and
  what to have ready when you call. WhatsApp and Facebook sit below for
  questions, beside the map.
*/

function Reach({ href, title, body, icon }: { href: string; title: string; body: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-[22px] border border-line bg-ink-2 p-5 text-bone no-underline transition-colors hover:border-gold"
    >
      <span aria-hidden="true" className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[rgba(233,180,90,0.14)] text-gold">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16.5px] font-semibold">{title}</span>
        <span className="block text-[15px] text-mist">{body}</span>
      </span>
      <span className="text-haze transition-colors group-hover:text-gold">
        <Arrow dir="out" />
      </span>
    </a>
  )
}

function Contact() {
  const { t } = useLang()
  const c = t.contact
  return (
    <>
      <PageHero photo={HERO_PHOTOS.contact} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <section aria-labelledby="call-title" className="px-5 pt-4 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1248px] grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <div className="glass rounded-[32px] p-8 md:p-12">
              <h2 id="call-title" className="label m-0 text-gold">
                {c.callTitle}
              </h2>
              <a
                href={telLink}
                className="display mt-4 block text-bone no-underline hover:text-gold-soft"
                style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}
              >
                {VENUE.phoneDisplay}
              </a>
              <a href={telLink} className="btn btn-gold mt-7">
                <PhoneIcon />
                {c.call} {VENUE.phoneDisplay}
              </a>

              <div aria-hidden="true" className="my-9 h-px bg-line" />

              <h3 className="display m-0 text-[24px] md:text-[28px]">{c.callBody}</h3>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {t.events.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16.5px] leading-[1.5] text-bone">
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="mt-0.5 flex-none text-gold">
                      <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 mb-0 text-[15px] text-haze">{c.languages}</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="display m-0 text-[28px] md:text-[32px]">{c.reachTitle}</h2>
              <div className="mt-6 grid gap-3">
                <Reach href={waLink()} title={c.whatsapp} body={c.whatsappBody} icon={<ChatIcon size={20} />} />
                <Reach
                  href={VENUE.facebook}
                  title={c.facebook}
                  body={c.facebookBody}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M13.5 20.5v-7h2.5M13.5 13.5V11a2 2 0 0 1 2-2h1M11 13.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  }
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-[32px] border border-line bg-ink-2">
                <iframe
                  title={c.mapTitle}
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[280px] w-full border-0"
                  style={{ filter: 'grayscale(0.4) invert(0.9) hue-rotate(180deg) contrast(0.9)' }}
                />
                <div className="p-7">
                  <h2 className="display m-0 text-[26px]">{c.findTitle}</h2>
                  <address className="mt-3 text-[16.5px] not-italic leading-[1.6] text-mist">
                    {VENUE.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5">
                    {c.directions}
                    <Arrow dir="out" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

mount(Contact)
