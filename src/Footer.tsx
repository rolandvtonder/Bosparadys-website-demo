import { useLang } from './i18n'
import { VENUE, PAGES, waLink } from './content'
import { LogoMark } from './Logo'
import { Eyebrow, Arrow } from './ui'

/*
  Footer, structured after the reference: a CTA band, a rule, the brand column
  beside link columns, a legal bar, and the oversized wordmark fading out at
  the bottom. The reference's newsletter becomes a Facebook follow, since
  that is where Bos Paradys actually posts.
*/

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const year = new Date().getFullYear()

  const pages = [
    { label: t.nav.venue, href: PAGES.venue },
    { label: t.nav.events, href: PAGES.events },
    { label: t.nav.gallery, href: PAGES.gallery },
    { label: t.nav.reviews, href: PAGES.reviews },
    { label: t.nav.contact, href: PAGES.contact },
  ]
  const events = t.events.types.map((e) => ({ label: e.title, href: `${PAGES.events}#${e.slug}` }))
  const linkCls = 'inline-flex min-h-9 items-center text-[15px] text-mist no-underline hover:text-bone'

  return (
    <footer className="relative px-4 pb-4 md:px-6 md:pb-6">
      <div
        className="mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-line px-6 pt-12 pb-2 md:px-14 md:pt-14"
        style={{ background: 'linear-gradient(180deg, rgba(26,36,29,0.95) 0%, rgba(12,17,13,0.95) 100%)' }}
      >
        {/* ---- CTA band ---- */}
        <div className="flex flex-wrap items-end gap-10">
          <div className="min-w-0 flex-[1_1_460px]">
            <Eyebrow>{f.badge}</Eyebrow>
            <p className="display mt-5 mb-0 text-[34px] md:text-[44px]" style={{ lineHeight: 1.08 }}>
              {f.title} <em className="text-mist" style={{ fontWeight: 300 }}>{f.titleSoft}</em>
            </p>
            <p className="mt-4 mb-0 max-w-[440px] text-[16px] leading-[1.6] text-mist">{f.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold">
              {t.nav.book}
            </a>
            <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {f.follow}
              <Arrow dir="out" />
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="mt-11 mb-10 h-px bg-line" />

        {/* ---- brand + link columns ---- */}
        <div className="flex flex-wrap gap-12">
          <div className="flex-[1_1_260px]">
            <a href={PAGES.home} className="inline-flex items-center gap-4 no-underline">
              <LogoMark size={72} alt="Bos Paradys logo" />
              <span className="display text-[24px]" style={{ fontWeight: 600 }}>
                Bos Paradys
              </span>
            </a>
          </div>

          {[
            { head: f.pagesHead, links: pages },
            { head: f.eventsHead, links: events },
          ].map((col) => (
            <nav key={col.head} aria-label={col.head} className="flex-[0_1_170px]">
              <h2 className="label m-0 mb-4 text-haze">{col.head}</h2>
              <ul className="m-0 list-none p-0">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex-[0_1_220px]">
            <h2 className="label m-0 mb-4 text-haze">{f.contactHead}</h2>
            <ul className="m-0 list-none p-0 text-[15px]">
              <li>
                <a href={`tel:${VENUE.phoneTel}`} className={linkCls}>
                  {VENUE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Facebook
                </a>
              </li>
              <li className="mt-2 leading-[1.6] text-haze">{VENUE.address.join(', ')}</li>
            </ul>
          </div>
        </div>

        {/* ---- legal bar ---- */}
        <div className="mt-10 flex flex-wrap justify-between gap-6 border-t border-line pt-5 pb-7 text-[14px] text-haze">
          <span>
            © {year} Bos Paradys. {f.rights}
          </span>
          <a href="#main" className="text-haze no-underline hover:text-bone">
            {f.top} ↑
          </a>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          aria-hidden="true"
          className="display select-none text-center"
          style={{
            fontSize: 'clamp(64px, 13vw, 196px)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            background: 'linear-gradient(180deg, rgba(246,241,231,0.30) 0%, rgba(246,241,231,0.03) 82%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          Bos Paradys
        </div>
      </div>
    </footer>
  )
}
