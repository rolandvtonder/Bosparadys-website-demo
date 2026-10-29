# Bos Paradys — website demo

Demo website for Bos Paradys, a bushveld party venue in Zwavelpoort, Pretoria.
Six pages (Home, Venue, Events, Gallery, Reviews, Contact) in English and Afrikaans.

## Run it locally

Needs [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

The finished site is in `dist/`. Upload that folder to any static host.

## Editing

- Phone number, address, links and photo choices: `src/content.ts`
- English text: `src/copy/en.ts` · Afrikaans text: `src/copy/af.ts`
- Photos: `npm run photos` rebuilds `public/photos` from the original photos,
  which are kept outside this repository in a `media` folder next to it.
