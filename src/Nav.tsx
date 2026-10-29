import { useEffect, useRef, useState } from 'react'
import { useLang } from './i18n'
import { LogoMark } from './Logo'
import { PAGES } from './content'

/*
  Navbar, fixed over every page at natural size so it stays readable at any
  width. The gradient-and-masked-blur ground is the reference's: a solid bar
  with a border draws a hard seam across the photos. The current page is
  marked with aria-current and a gold rule.
*/

const here = () => {
  const p = window.location.pathname.replace(/index\.html$/, '')
  return p.endsWith('/') ? p : `${p}/`
}

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const path = here()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    { label: t.nav.venue, href: PAGES.venue },
    { label: t.nav.events, href: PAGES.events },
    { label: t.nav.gallery, href: PAGES.gallery },
    { label: t.nav.reviews, href: PAGES.reviews },
    { label: t.nav.contact, href: PAGES.contact },
  ]

  const LangToggle = (
    <div role="group" aria-label={t.nav.lang} className="flex rounded-full border border-line p-1">
      {(['en', 'af'] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className="label min-h-9 min-w-11 cursor-pointer rounded-full px-3 transition-colors"
          style={{
            letterSpacing: '0.1em',
            background: lang === l ? 'var(--color-bone)' : 'transparent',
            color: lang === l ? 'var(--color-ink)' : 'var(--color-mist)',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 132,
          background: 'linear-gradient(180deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.45) 46%, rgba(8,12,9,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
        }}
      />
      <nav aria-label={t.nav.main} className="relative flex items-center gap-6 px-5 pt-4 md:px-10 md:pt-6">
        <a href={PAGES.home} className="flex items-center gap-3 no-underline" aria-label={`Bos Paradys, ${t.home}`}>
          <LogoMark size={44} />
          <span className="display text-[19px] md:text-[21px]" style={{ fontWeight: 600, letterSpacing: '0' }}>
            Bos Paradys
          </span>
        </a>

        <ul className="nav-links m-0 flex flex-1 list-none justify-center gap-8 p-0">
          {links.map((l) => {
            const current = path === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current ? 'page' : undefined}
                  className={`label relative inline-flex min-h-11 items-center no-underline transition-colors hover:text-bone ${current ? 'text-bone' : 'text-mist'}`}
                >
                  {l.label}
                  {current && <span aria-hidden="true" className="absolute inset-x-0 bottom-1.5 h-0.5 rounded-full bg-gold" />}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <div className="nav-links">{LangToggle}</div>
          <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold nav-links" style={{ minHeight: 44, padding: '0 20px' }}>
            {t.nav.book}
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="nav-menu-btn btn btn-ghost"
            style={{ minHeight: 44, padding: '0 16px' }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="relative mx-4 mt-3 rounded-3xl border border-line p-5"
          style={{ background: 'rgba(12,17,13,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
          <ul className="m-0 list-none p-0">
            {links.map((l) => {
              const current = path === l.href
              return (
                <li key={l.href} className="border-b border-line last:border-0">
                  <a
                    href={l.href}
                    aria-current={current ? 'page' : undefined}
                    className={`display flex min-h-14 items-center justify-between text-[26px] no-underline ${current ? 'text-gold' : ''}`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="mt-5 flex items-center justify-between gap-3">
            {LangToggle}
            <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold">
              {t.nav.book}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
