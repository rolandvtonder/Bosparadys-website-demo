import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useLang } from './i18n'
import { Photo } from './Photo'
import { PAGES, waLink } from './content'
import type { PhotoId } from './photos.gen'

/*
  Pieces shared by the pages. These are ordinary responsive layout, not the
  home film's artboard coordinates.
*/

/** Fades up once as it enters the viewport. MotionConfig in Layout turns this
    off for visitors who ask for reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="label inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-mist">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  )
}

export function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: ReactNode; intro?: ReactNode; id: string }) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="display mt-5 mb-0 text-[38px] md:text-[56px]" style={{ lineHeight: 1.05 }}>
        {title}
      </h2>
      {intro && <p className="mt-5 mb-0 max-w-[620px] text-[17px] leading-[1.65] text-mist">{intro}</p>}
    </Reveal>
  )
}

export function Arrow({ dir = 'right' }: { dir?: 'right' | 'left' | 'out' | 'down' }) {
  const d = {
    out: 'M5 11L11 5M6 5h5v5',
    left: 'M12 8H4M7.5 4.5L4 8l3.5 3.5',
    right: 'M4 8h8M8.5 4.5L12 8l-3.5 3.5',
    down: 'M8 3v10M4.5 9.5L8 13l3.5-3.5',
  }[dir]
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChatIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.5 10.5h7M8.5 13.5h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/**
  The banner every inner page opens with: a photograph under the nav, a
  breadcrumb back home, then the page's h1 and intro. `children` sits under
  the intro for page-specific actions.
*/
export function PageHero({
  photo,
  eyebrow,
  title,
  intro,
  children,
}: {
  photo: PhotoId
  eyebrow: string
  title: string
  intro: string
  children?: ReactNode
}) {
  const { t } = useLang()
  return (
    <header className="relative isolate flex min-h-[78svh] items-end overflow-hidden px-5 pt-36 pb-14 md:px-10 md:pb-20">
      <Photo id={photo} priority decorative sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,9,0.55) 0%, rgba(8,12,9,0.35) 35%, rgba(12,17,13,0.92) 88%, #0c110d 100%), linear-gradient(90deg, rgba(8,12,9,0.6) 0%, rgba(8,12,9,0) 70%)',
        }}
      />
      <div className="mx-auto w-full max-w-[1248px]">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="label m-0 flex list-none gap-2 p-0 text-haze">
            <li>
              <a href={PAGES.home} className="text-haze no-underline hover:text-bone">
                {t.home}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-mist">
              {eyebrow}
            </li>
          </ol>
        </nav>
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="display m-0 max-w-[900px] text-[44px] md:text-[80px]" style={{ lineHeight: 1.02 }}>
            {title}
          </h1>
          <p className="mt-6 mb-0 max-w-[640px] text-[17px] leading-[1.65] text-mist md:text-[19px]">{intro}</p>
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </header>
  )
}

/** Closing call to action used at the end of each page. */
export function CtaBand({ photo = 'p063' }: { photo?: PhotoId }) {
  const { t } = useLang()
  return (
    <section aria-labelledby="cta-title" className="px-5 pt-8 pb-24 md:px-10 md:pb-32">
      <Reveal>
        <div className="relative isolate mx-auto max-w-[1248px] overflow-hidden rounded-[36px] border border-line">
          <Photo id={photo} decorative sizes="(min-width: 1300px) 1248px, 100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(100deg, rgba(12,17,13,0.95) 0%, rgba(12,17,13,0.82) 50%, rgba(12,17,13,0.45) 100%)' }}
          />
          <div className="flex flex-wrap items-end justify-between gap-8 p-8 md:p-14">
            <div className="max-w-[560px]">
              <h2 id="cta-title" className="display m-0 text-[34px] md:text-[48px]" style={{ lineHeight: 1.06 }}>
                {t.cta.title}
              </h2>
              <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-mist">{t.cta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold">
                {t.cta.book}
                <Arrow />
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <ChatIcon />
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
