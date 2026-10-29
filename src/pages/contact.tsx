import type { ReactNode } from 'react'
import { mount } from '../Layout'
import { useLang } from '../i18n'
import { VENUE, HERO_PHOTOS, waLink, mapsLink, mapsEmbed } from '../content'
import BookingForm from '../BookingForm'
import { PageHero, Reveal, Arrow, ChatIcon } from '../ui'

/*
  Contact: the booking enquiry form (#enquiry, which every "Book a date"
  button lands on) beside the other ways to reach the venue and the map.
*/

function Reach({ href, title, body, icon, external }: { href: string; title: string; body: string; icon: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
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
        <Arrow dir={external ? 'out' : 'right'} />
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

      <section id="enquiry" aria-labelledby="enquiry-title" className="px-5 pt-4 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1248px] grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <div className="rounded-[32px] border border-line bg-ink-2 p-6 md:p-10">
              <h2 id="enquiry-title" className="display m-0 mb-8 text-[32px] md:text-[40px]">
                {c.formTitle}
              </h2>
              <BookingForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="display m-0 text-[28px] md:text-[32px]">{c.reachTitle}</h2>
              <div className="mt-6 grid gap-3">
                <Reach
                  href={`tel:${VENUE.phoneTel}`}
                  title={`${c.call} ${VENUE.phoneDisplay}`}
                  body={c.callBody}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <Reach href={waLink()} external title={c.whatsapp} body={c.whatsappBody} icon={<ChatIcon size={20} />} />
                <Reach
                  href={VENUE.facebook}
                  external
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
                  <p className="mt-3 mb-0 text-[15px] text-haze">{c.languages}</p>
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
