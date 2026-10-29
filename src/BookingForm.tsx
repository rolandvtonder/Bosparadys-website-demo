import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useLang } from './i18n'
import { waLink } from './content'
import { Arrow } from './ui'

/*
  Booking enquiry. There is no server, so the form composes a WhatsApp message
  and opens it; the visitor still presses send in WhatsApp. Errors show under
  each field on submit, with a summary that takes focus when there is more
  than one.
*/

type Field = 'name' | 'phone' | 'date' | 'type' | 'guests' | 'message'
type Errors = Partial<Record<'name' | 'date' | 'type', string>>

const inputCls =
  'mt-2 block w-full min-h-12 rounded-xl border bg-[rgba(246,241,231,0.05)] px-4 text-[16px] text-bone placeholder:text-haze outline-none transition-colors focus:border-gold'

function Row({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[15px] font-semibold text-bone">
        {label}
        {hint && <span className="font-normal text-haze"> ({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 mb-0 text-[14px] text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingForm() {
  const { t } = useLang()
  const b = t.contact
  const [errors, setErrors] = useState<Errors>({})
  const summary = useRef<HTMLDivElement>(null)
  const today = new Date().toISOString().slice(0, 10)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = (k: Field) => String(f.get(k) ?? '').trim()
    const next: Errors = {}
    if (!v('name')) next.name = b.errors.name
    if (!v('date')) next.date = b.errors.date
    if (!v('type')) next.type = b.errors.type
    setErrors(next)
    const bad = Object.keys(next) as (keyof Errors)[]
    if (bad.length > 1) {
      requestAnimationFrame(() => summary.current?.focus())
      return
    }
    if (bad.length === 1) {
      document.getElementById(`bk-${bad[0]}`)?.focus()
      return
    }
    const L = b.waLabels
    const opt = (k: Field, label: string) => (v(k) ? [`${label}: ${v(k)}`] : [])
    const lines = [
      b.waIntro,
      '',
      `${L.name}: ${v('name')}`,
      ...opt('phone', L.phone),
      `${L.date}: ${v('date')}`,
      `${L.type}: ${v('type')}`,
      ...opt('guests', L.guests),
      ...opt('message', L.message),
    ]
    window.open(waLink(lines.join('\n')), '_blank', 'noopener')
  }

  const describe = (k: keyof Errors) => (errors[k] ? `bk-${k}-err` : undefined)
  const border = (k: keyof Errors) => (errors[k] ? 'border-error' : 'border-line')
  const count = Object.keys(errors).length

  return (
    <form noValidate onSubmit={submit} aria-labelledby="enquiry-title" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {count > 1 && (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-error bg-[rgba(255,154,133,0.08)] p-4 text-[15px] text-bone sm:col-span-2"
        >
          {b.errors.summary}
        </div>
      )}
      <Row id="bk-name" label={b.name} error={errors.name}>
        <input
          id="bk-name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={describe('name')}
          className={`${inputCls} ${border('name')}`}
        />
      </Row>
      <Row id="bk-phone" label={b.phone} hint={b.optional}>
        <input id="bk-phone" name="phone" type="tel" autoComplete="tel" className={`${inputCls} border-line`} />
      </Row>
      <Row id="bk-date" label={b.date} error={errors.date}>
        <input
          id="bk-date"
          name="date"
          type="date"
          min={today}
          required
          aria-invalid={!!errors.date}
          aria-describedby={describe('date')}
          className={`${inputCls} ${border('date')}`}
          style={{ colorScheme: 'dark' }}
        />
      </Row>
      <Row id="bk-guests" label={b.guests} hint={b.optional}>
        <input id="bk-guests" name="guests" type="number" inputMode="numeric" min={1} className={`${inputCls} border-line`} />
      </Row>
      <div className="sm:col-span-2">
        <Row id="bk-type" label={b.type} error={errors.type}>
          <select
            id="bk-type"
            name="type"
            required
            defaultValue=""
            aria-invalid={!!errors.type}
            aria-describedby={describe('type')}
            className={`${inputCls} ${border('type')} cursor-pointer`}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" disabled>
              {b.typePick}
            </option>
            {b.types.map((ty) => (
              <option key={ty} value={ty}>
                {ty}
              </option>
            ))}
          </select>
        </Row>
      </div>
      <div className="sm:col-span-2">
        <Row id="bk-message" label={b.message} hint={b.optional}>
          <textarea id="bk-message" name="message" rows={4} className={`${inputCls} border-line py-3`} />
        </Row>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-gold">
          {b.send}
          <Arrow dir="out" />
        </button>
        <p className="mt-3 mb-0 text-[14px] leading-relaxed text-haze">{b.note}</p>
      </div>
    </form>
  )
}
