import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { SCROLL_VH, P, INTRO, FILM_AT, FADE, DESKTOP, MOBILE, span, ramp, smooth, lerp } from './scroll'
import { useLang } from './i18n'
import { VENUE, PAGES, FILM_PHOTOS, SPACE_CARD_PHOTOS, waLink } from './content'
import { Photo } from './Photo'
import { ChatIcon, Arrow } from './ui'

/*
  The hero film: a sticky stage holding five photographs and a fixed artboard
  of absolutely positioned copy. Scrolling drives a timeline (scroll.ts), not
  the page. Coordinates are artboard pixels; change them there, not by wrapping
  groups in flex or grid.
*/

const GOLD = '#e9b45a'

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

/** Seconds since the fonts were ready, until the intro has finished. */
function useIntroClock(skip: boolean) {
  const [s, setS] = useState(skip ? INTRO.done : 0)
  useEffect(() => {
    if (skip) {
      setS(INTRO.done)
      return
    }
    let raf = 0
    let alive = true
    const start = () => {
      if (!alive) return
      const t0 = performance.now()
      const tick = () => {
        const v = (performance.now() - t0) / 1000
        setS(Math.min(v, INTRO.done))
        if (v < INTRO.done) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    document.fonts.ready.then(start, start)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [skip])
  return s
}

export default function Scene() {
  const { t } = useLang()
  const wrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const [size, setSize] = useState({ w: 1440, h: 810 })
  const reduced = !!useReducedMotion()
  const clock = useIntroClock(reduced)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))
  useEffect(() => setP(scrollYProgress.get()), [scrollYProgress])

  /* The stage is 100svh, which does not change as mobile toolbars slide, so
     measuring it (not the window) keeps the artboard from rescaling mid-scroll. */
  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const L = size.w < 768 || size.w / size.h < 1.05 ? MOBILE : DESKTOP
  const m = L.mobile
  const GW = L.W - L.safe * 2
  const scale = Math.min(size.w / L.W, size.h / L.H)
  const ox = (size.w - L.W * scale) / 2
  const oy = Math.max(0, (size.h - L.H * scale) / 2)

  /* group positions, interpolated across the keyframes */
  const m1 = smooth(ramp(p, P.move1))
  const m2 = smooth(ramp(p, P.move2))
  const y1 = lerp(L.g1.start, L.g1.end, m1)
  const y2 = lerp(lerp(L.g2.enter, L.g2.mid, m1), L.g2.end, m2)
  const y3 = lerp(lerp(L.g3.enter, L.g3.mid, m1), L.g3.end, m2)
  /* Groups out of frame are inert, so keyboard focus cannot land on a link
     that is parked below the stage. */
  const off1 = m1 > 0.98
  const off2 = m1 < 0.02 || m2 > 0.98
  const off3 = m2 < 0.02

  const intro = (w: readonly [number, number]) => span(clock, w)
  const stat = intro(INTRO.stat)

  return (
    <div ref={wrap} id="top" style={{ position: 'relative', height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
      <div ref={stage} style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        {/* ---- the film ---- */}
        {FILM_PHOTOS.map((id, i) => {
          const at = FILM_AT[i]
          const next = FILM_AT[i + 1] ?? 1
          const fade = i === 0 ? 1 : ramp(p, [at - FADE, at + FADE])
          const push = reduced ? 0 : ramp(p, [Math.max(0, at - FADE), Math.min(1, next + FADE)])
          return (
            <Photo
              key={id}
              id={id}
              decorative
              priority={i < 2}
              sizes="100vw"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: fade,
                transform: `scale(${1.04 + push * 0.1}) translateY(${-push * 1.2}%)`,
                willChange: 'transform, opacity',
              }}
            />
          )
        })}

        {/* ---- scrims, viewport-wide so they never leave bare strips ---- */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: m
              ? 'linear-gradient(180deg, rgba(8,12,9,0.62) 0%, rgba(8,12,9,0.5) 40%, rgba(8,12,9,0.86) 100%)'
              : 'linear-gradient(90deg, rgba(8,12,9,0.88) 0%, rgba(8,12,9,0.55) 36%, rgba(8,12,9,0.12) 64%, rgba(8,12,9,0.35) 100%)',
            opacity: 1 - ramp(p, P.move1),
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: m
              ? 'rgba(8,12,9,0.62)'
              : 'radial-gradient(70% 60% at 50% 72%, rgba(8,12,9,0.86) 0%, rgba(8,12,9,0.4) 60%, rgba(8,12,9,0.15) 100%)',
            opacity: ramp(p, P.move1) * (1 - ramp(p, P.move2)),
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: m
              ? 'linear-gradient(180deg, rgba(8,12,9,0.2) 0%, rgba(8,12,9,0.78) 26%, rgba(8,12,9,0.9) 100%)'
              : 'linear-gradient(180deg, rgba(8,12,9,0) 34%, rgba(8,12,9,0.8) 68%, rgba(8,12,9,0.92) 100%)',
            opacity: ramp(p, P.move2),
            pointerEvents: 'none',
          }}
        />

        {/* ---- the artboard ---- */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: px(L.W),
            height: px(L.H),
            transform: `translate(${ox}px, ${oy}px) scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* ================= GROUP 1 — the hero ================= */}
          <div
            inert={off1}
            style={{
              ...box(L.safe, 0, GW, m ? 600 : 620),
              transform: `translateY(${y1}px)`,
              visibility: off1 ? 'hidden' : 'visible',
              willChange: 'transform',
            }}
          >
            <h1 style={{ margin: 0 }}>
              {t.hero.words.map((w, i) => (
                <Mask
                  key={i}
                  t={intro(INTRO.words[i])}
                  style={{ position: 'absolute', left: 0, top: px(i * (m ? 58 : 98)), width: px(m ? 350 : 640), height: px(m ? 66 : 112) }}
                >
                  <span className="display" style={{ display: 'block', fontSize: px(m ? 56 : 96), lineHeight: px(m ? 62 : 106) }}>
                    {w}
                    {i < 2 ? ' ' : ''}
                  </span>
                </Mask>
              ))}
            </h1>

            <p style={{ margin: 0 }}>
              {m ? (
                <Mask t={intro(INTRO.body[0])} style={{ position: 'absolute', left: 0, top: px(194), width: px(350), height: px(96) }}>
                  <span style={{ display: 'block', fontSize: px(16), lineHeight: px(24), color: 'var(--color-mist)' }}>
                    {t.hero.body.join(' ')}
                  </span>
                </Mask>
              ) : (
                t.hero.body.map((line, i) => (
                  <Mask
                    key={i}
                    t={intro(INTRO.body[i])}
                    style={{ position: 'absolute', left: 0, top: px(326 + i * 28), width: px(480), height: px(30) }}
                  >
                    <span style={{ display: 'block', fontSize: px(18), lineHeight: px(26), color: 'var(--color-mist)' }}>
                      {line}{' '}
                    </span>
                  </Mask>
                ))
              )}
            </p>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: px(m ? 306 : 438),
                opacity: intro(INTRO.buttons),
                transform: `translateY(${(1 - intro(INTRO.buttons)) * 12}px)`,
                display: 'flex',
                gap: px(12),
              }}
            >
              <a href={`${PAGES.contact}#enquiry`} className="btn btn-gold" style={m ? { padding: '0 18px' } : undefined}>
                {t.hero.book}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={m ? { padding: '0 18px' } : undefined}
              >
                <ChatIcon />
                {t.hero.whatsapp}
              </a>
            </div>

            {/* The recommendation card. Real figures from the Facebook page,
                counted up as the card arrives. */}
            <div
              className="glass"
              style={{
                position: 'absolute',
                left: px(m ? 0 : GW - 440),
                top: px(m ? 380 : 262),
                width: px(m ? 350 : 440),
                height: px(m ? 206 : 280),
                borderRadius: px(m ? 30 : 52),
                opacity: stat,
                transform: `translateY(${(1 - stat) * 28}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: m ? '22px 24px' : '36px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: px(m ? 15 : 17), lineHeight: px(m ? 20 : 23), color: 'rgba(246,241,231,0.9)' }}>
                    {t.hero.statLabel[0]}
                    <br />
                    {t.hero.statLabel[1]}
                  </div>
                  <div className="display" style={{ fontSize: px(m ? 46 : 66), lineHeight: px(m ? 42 : 58), fontWeight: 400 }}>
                    {Math.round(VENUE.recommend * stat)}
                    <span style={{ fontSize: px(m ? 22 : 30) }}>%</span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: px(m ? 58 : 90),
                    height: px(5),
                    borderRadius: 999,
                    background: 'rgba(246,241,231,0.16)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${VENUE.recommend * stat}%`,
                      height: '100%',
                      borderRadius: 999,
                      background: GOLD,
                      boxShadow: `0 0 14px ${GOLD}`,
                    }}
                  />
                </div>
                <div
                  className="label"
                  style={{ position: 'absolute', left: 0, top: px(m ? 72 : 106), fontSize: px(m ? 10.5 : 11), color: 'rgba(246,241,231,0.62)' }}
                >
                  {t.hero.statNote}
                </div>

                <div
                  style={{ position: 'absolute', left: 0, right: 0, top: px(m ? 100 : 140), height: 1, background: 'rgba(246,241,231,0.14)' }}
                />

                <div style={{ position: 'absolute', left: 0, right: 0, top: px(m ? 114 : 162), display: 'flex' }}>
                  {[
                    [t.hero.readouts[0], String(Math.round(VENUE.reviewCount * stat)), ''],
                    [t.hero.readouts[1], (VENUE.followers * stat).toFixed(1), 'K'],
                    [t.hero.readouts[2], String(Math.round(4 * stat)), ''],
                  ].map(([k, v, u], i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        paddingLeft: i ? px(m ? 14 : 20) : 0,
                        borderLeft: i ? '1px solid rgba(246,241,231,0.14)' : undefined,
                      }}
                    >
                      <div className="display" style={{ fontSize: px(m ? 22 : 26), fontWeight: 500 }}>
                        {v}
                        <span style={{ fontSize: px(m ? 13 : 15), opacity: 0.7 }}>{u}</span>
                      </div>
                      <div className="label" style={{ marginTop: px(7), fontSize: px(m ? 10.5 : 11), color: 'rgba(246,241,231,0.62)' }}>
                        {k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= GROUP 2 — the spaces ================= */}
          <div
            inert={off2}
            style={{
              ...box(L.safe, 0, GW, 640),
              transform: `translateY(${y2}px)`,
              visibility: off2 ? 'hidden' : 'visible',
              willChange: 'transform',
            }}
          >
            {t.spaces.cards.map((label, i) => {
              const cw = m ? 168 : 255
              const ch = m ? 132 : 215
              const pos = m
                ? [
                    [0, 0],
                    [GW - cw, 0],
                    [0, ch + 14],
                    [GW - cw, ch + 14],
                  ][i]
                : [
                    [0, 0],
                    [GW - 255, 0],
                    [116, 240],
                    [GW - 371, 240],
                  ][i]
              const r = m ? 26 : 46
              const o = span(p, [P.g2In[0] + i * 0.006, P.g2In[1]])
              return (
                <a
                  key={i}
                  href={`${PAGES.venue}#${t.venue.spaces[i].slug}`}
                  className="group"
                  style={{ ...box(pos[0], pos[1], cw, ch), opacity: o, display: 'block', color: 'inherit', textDecoration: 'none', borderRadius: px(r) }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(r), overflow: 'hidden' }}>
                    <Photo
                      id={SPACE_CARD_PHOTOS[i]}
                      decorative
                      priority
                      sizes="300px"
                      className="transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* the label sits on a photo over a photo, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(150deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.32) 52%, rgba(8,12,9,0.05) 100%)',
                      }}
                    />
                  </div>
                  <div
                    style={{ position: 'absolute', inset: 0, borderRadius: px(r), border: '1px solid rgba(246,241,231,0.28)', pointerEvents: 'none' }}
                  />
                  <span
                    className="display"
                    style={{
                      position: 'absolute',
                      margin: 0,
                      left: px(m ? 16 : 24),
                      top: px(m ? 16 : 28),
                      fontSize: px(m ? 18 : 23),
                      lineHeight: px(m ? 21 : 26),
                      fontWeight: 500,
                    }}
                  >
                    {label[0]}
                    <br />
                    {label[1]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="label"
                    style={{ position: 'absolute', right: px(m ? 16 : 24), top: px(m ? 18 : 30), color: GOLD, fontSize: px(m ? 11 : 12) }}
                  >
                    0{i + 1}
                  </span>
                </a>
              )
            })}

            <div style={{ ...box(0, m ? 300 : 468, GW), textAlign: 'center' }}>
              <h2 className="display" style={{ margin: 0, fontSize: px(m ? 38 : 64), lineHeight: 1.05 }}>
                {t.spaces.title}
              </h2>
              <p
                style={{
                  margin: `${px(m ? 14 : 16)} auto 0`,
                  maxWidth: px(m ? 350 : 640),
                  fontSize: px(m ? 16 : 19),
                  lineHeight: px(m ? 24 : 28),
                  color: 'rgba(246,241,231,0.86)',
                }}
              >
                {t.spaces.sub}
              </p>
              <a href={PAGES.venue} className="btn btn-ghost" style={{ marginTop: px(m ? 18 : 20) }}>
                {t.spaces.cta}
                <Arrow />
              </a>
            </div>
          </div>

          {/* ================= GROUP 3 — dusk ================= */}
          <div
            inert={off3}
            style={{
              ...box(L.safe, 0, GW, 320),
              transform: `translateY(${y3}px)`,
              visibility: off3 ? 'hidden' : 'visible',
              willChange: 'transform',
            }}
          >
            <div aria-hidden="true" style={{ ...box(0, 0, 56, 2), background: GOLD }} />
            <h2
              className="display"
              style={{ ...box(0, m ? 22 : 26, m ? GW : 640), margin: 0, fontSize: px(m ? 34 : 56), lineHeight: 1.06 }}
            >
              {t.dusk.title}
            </h2>
            <div style={m ? box(0, 168, GW) : box(GW - 440, 30, 440)}>
              <p style={{ margin: 0, fontSize: px(m ? 15.5 : 17), lineHeight: px(m ? 24 : 28), color: 'var(--color-mist)' }}>
                {t.dusk.body}
              </p>
              <a href={PAGES.events} className="btn btn-ghost" style={{ marginTop: px(m ? 20 : 28) }}>
                {t.dusk.cta}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
