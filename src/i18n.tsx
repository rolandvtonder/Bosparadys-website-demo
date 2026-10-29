import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { en, type Copy } from './copy/en'
import { af } from './copy/af'

/*
  Language state. The choice is remembered in localStorage so it carries from
  page to page; with nothing saved, an Afrikaans browser starts in Afrikaans.
*/

export type Lang = 'en' | 'af'
const COPY: Record<Lang, Copy> = { en, af }

const Ctx = createContext<{ lang: Lang; t: Copy; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: en,
  setLang: () => {},
})

const KEY = 'bosparadys-lang'

function initial(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'af') return saved
  } catch {
    /* storage blocked */
  }
  return navigator.language?.toLowerCase().startsWith('af') ? 'af' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial)
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* storage blocked */
    }
  }, [lang])
  return <Ctx.Provider value={{ lang, t: COPY[lang], setLang }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
