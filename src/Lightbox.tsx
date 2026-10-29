import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import { useLang } from './i18n'
import { Photo, photoAlt } from './Photo'
import { Arrow } from './ui'
import type { PhotoId } from './photos.gen'

/*
  Full-screen photo viewer on <dialog>, which gives focus trapping and Escape
  for free. Arrow keys and the buttons step through `ids`; clicking the dark
  backdrop closes it.
*/

export type LightboxHandle = { open: (index: number) => void }

export default function Lightbox({ ids, ref }: { ids: PhotoId[]; ref: Ref<LightboxHandle> }) {
  const { t, lang } = useLang()
  const g = t.gallery
  const dlg = useRef<HTMLDialogElement>(null)
  const [at, setAt] = useState<number | null>(null)
  const n = ids.length

  useImperativeHandle(ref, () => ({
    open: (i) => {
      setAt(i)
      dlg.current?.showModal()
    },
  }))

  const step = (d: number) => setAt((i) => (i == null ? i : (i + d + n) % n))

  useEffect(() => {
    const el = dlg.current
    if (!el) return
    const onClose = () => setAt(null)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    el.addEventListener('close', onClose)
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('close', onClose)
      el.removeEventListener('keydown', onKey)
    }
  })

  const id = at == null ? null : ids[at]

  return (
    <dialog
      ref={dlg}
      aria-label={g.title}
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-bone"
      onClick={(e) => {
        if (e.target === e.currentTarget) dlg.current?.close()
      }}
    >
      {id && at != null && (
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10">
          <Photo
            key={id}
            id={id}
            priority
            sizes="100vw"
            className="pointer-events-auto h-auto max-h-[78vh] w-auto max-w-full rounded-2xl object-contain"
          />
          <p className="m-0 text-center text-[15px] text-mist">
            {photoAlt(id, lang)} <span className="text-haze">· {g.count(at + 1, n)}</span>
          </p>
          <div className="pointer-events-auto flex gap-3">
            <button type="button" className="btn btn-ghost" onClick={() => step(-1)} aria-label={g.prev}>
              <Arrow dir="left" />
            </button>
            <button type="button" className="btn btn-gold" onClick={() => dlg.current?.close()}>
              {g.close}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => step(1)} aria-label={g.next}>
              <Arrow />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
