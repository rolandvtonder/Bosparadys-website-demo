import type { PhotoId } from './photos.gen'

/*
  Venue facts and photo choices. Everything a visitor might act on (phone,
  address, links) lives here so it is changed in one place. Facts taken from
  the Bosparadys party venue Facebook page, October 2026.
*/

export const VENUE = {
  name: 'Bos Paradys',
  phoneDisplay: '072 611 8698',
  phoneTel: '+27726118698',
  whatsapp: '27726118698',
  address: ['Graham Road Ext', 'Zwavelpoort, Pretoria', '0036'],
  mapsQuery: 'Graham Road Ext, Zwavelpoort, Pretoria, 0036',
  facebook: 'https://www.facebook.com/profile.php?id=100066852784136',
  facebookReviews: 'https://www.facebook.com/profile.php?id=100066852784136&sk=reviews',
  recommend: 100,
  reviewCount: 28,
  followers: 1.8, // thousands
}

export const waLink = (text?: string) =>
  `https://wa.me/${VENUE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsQuery)}`
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(VENUE.mapsQuery)}&z=13&output=embed`

/*
  Where the site lives. Locally that is the domain root; on GitHub Pages it is
  /Bosparadys-website-demo/ (set by BASE_PATH in the deploy workflow). Every
  internal link and file path goes through here so both work.
*/
export const url = (path = '') => `${import.meta.env.BASE_URL}${path}`

/* Page addresses. Each is its own HTML entry (see vite.config.ts). */
export const PAGES = {
  home: url(),
  venue: url('venue/'),
  events: url('events/'),
  gallery: url('gallery/'),
  reviews: url('reviews/'),
  contact: url('contact/'),
}

/*
  Your own review quotes. Facebook keeps reviews behind a login, so none are
  copied in yet. Add a few here and the Reviews page shows them as cards:
    { name: 'Anika', event: '21st birthday', text: { en: '...', af: '...' } }
*/
export const QUOTES: { name: string; event: string; text: { en: string; af: string } }[] = []

/* ---------- photo choices per page ---------- */

/** The home film, day to fire-lit night, and the four space cards over it. */
export const FILM_PHOTOS: PhotoId[] = ['p141', 'p132', 'p006', 'p066', 'p056']
export const SPACE_CARD_PHOTOS: PhotoId[] = ['p024', 'p017', 'p063', 'p131']

/** Page banners. */
export const HERO_PHOTOS = {
  venue: 'p153',
  events: 'p004',
  gallery: 'p060',
  reviews: 'p056',
  contact: 'p066',
} satisfies Record<string, PhotoId>

/** Venue page: three photos per space, in the order of copy.venue.spaces. */
export const VENUE_PHOTOS: PhotoId[][] = [
  ['p024', 'p102', 'p019'],
  ['p017', 'p083', 'p038'],
  ['p063', 'p057', 'p164'],
  ['p131', 'p168', 'p153'],
]

/** Events page: four photos per event type, in the order of copy.events.types. */
export const EVENT_PHOTOS: PhotoId[][] = [
  ['p013', 'p009', 'p003', 'p135'],
  ['p026', 'p021', 'p048', 'p138'],
  ['p032', 'p042', 'p064', 'p031'],
  ['p068', 'p072', 'p053', 'p060'],
]

export type GalleryCat = 'spaces' | 'tables' | 'decor' | 'night'

/** Gallery page, in display order. `tall` spans two rows of the grid. */
export const GALLERY: { id: PhotoId; cat: GalleryCat; tall?: boolean }[] = [
  { id: 'p112', cat: 'spaces', tall: true },
  { id: 'p003', cat: 'decor' },
  { id: 'p006', cat: 'tables' },
  { id: 'p053', cat: 'night', tall: true },
  { id: 'p141', cat: 'spaces' },
  { id: 'p029', cat: 'decor' },
  { id: 'p078', cat: 'tables' },
  { id: 'p063', cat: 'night' },
  { id: 'p013', cat: 'decor', tall: true },
  { id: 'p083', cat: 'spaces' },
  { id: 'p032', cat: 'tables' },
  { id: 'p064', cat: 'night' },
  { id: 'p036', cat: 'decor' },
  { id: 'p114', cat: 'spaces', tall: true },
  { id: 'p089', cat: 'tables' },
  { id: 'p009', cat: 'decor' },
  { id: 'p066', cat: 'night' },
  { id: 'p116', cat: 'spaces' },
  { id: 'p134', cat: 'tables', tall: true },
  { id: 'p048', cat: 'decor' },
  { id: 'p056', cat: 'night' },
  { id: 'p017', cat: 'spaces' },
  { id: 'p042', cat: 'tables' },
  { id: 'p080', cat: 'decor' },
  { id: 'p060', cat: 'night', tall: true },
  { id: 'p123', cat: 'spaces' },
  { id: 'p004', cat: 'tables' },
  { id: 'p026', cat: 'decor' },
  { id: 'p068', cat: 'night' },
  { id: 'p145', cat: 'spaces' },
  { id: 'p155', cat: 'tables' },
  { id: 'p094', cat: 'decor', tall: true },
  { id: 'p055', cat: 'night' },
  { id: 'p106', cat: 'spaces' },
  { id: 'p046', cat: 'tables' },
  { id: 'p021', cat: 'decor' },
  { id: 'p067', cat: 'night' },
  { id: 'p113', cat: 'spaces', tall: true },
  { id: 'p074', cat: 'tables' },
  { id: 'p031', cat: 'decor' },
  { id: 'p057', cat: 'night' },
  { id: 'p160', cat: 'spaces' },
  { id: 'p014', cat: 'tables' },
  { id: 'p138', cat: 'decor' },
  { id: 'p092', cat: 'night' },
  { id: 'p166', cat: 'spaces' },
  { id: 'p107', cat: 'tables', tall: true },
  { id: 'p030', cat: 'decor' },
  { id: 'p130', cat: 'spaces' },
  { id: 'p072', cat: 'tables' },
  { id: 'p041', cat: 'decor' },
  { id: 'p150', cat: 'tables' },
  { id: 'p135', cat: 'decor' },
  { id: 'p005', cat: 'spaces' },
  { id: 'p034', cat: 'tables' },
  { id: 'p168', cat: 'spaces' },
]

/** Alt text for every photo, in both languages. */
export const ALT: Record<PhotoId, { en: string; af: string }> = {
  p003: { en: 'Rows of colourful jelly shots', af: 'Rye kleurvolle jellie-skote' },
  p004: { en: 'Lapa set for a party with red and pink ribbons', af: 'Lapa gedek vir ’n partytjie met rooi en pienk linte' },
  p005: { en: 'Lapa decorated with colourful streamers', af: 'Lapa versier met kleurvolle linte' },
  p006: { en: 'Ribbon-draped lapa with tables and a chandelier', af: 'Lapa vol linte met tafels en ’n kandelaar' },
  p009: { en: 'Red birthday cake', af: 'Rooi verjaarsdagkoek' },
  p013: { en: 'Gold and black balloon arch for a sixteenth', af: 'Goue en swart ballonboog vir ’n sestiende' },
  p014: { en: 'Tables set for a sweet sixteen under the thatch', af: 'Tafels gedek vir ’n sestiende verjaarsdag onder die grasdak' },
  p017: { en: 'The pool seen from under the lapa', af: 'Die swembad gesien van onder die lapa' },
  p019: { en: 'Pool table under the lapa', af: 'Snoekertafel onder die lapa' },
  p021: { en: '“Hello sweet baby” plate setting', af: '“Hello sweet baby”-bordjie' },
  p024: { en: 'Inside the lapa: long tables under the thatch', af: 'Binne die lapa: lang tafels onder die grasdak' },
  p026: { en: 'BABY letter blocks on a shower table', af: 'BABY-letterblokke op ’n babatee-tafel' },
  p029: { en: 'Gold and silver paper flowers', af: 'Goue en silwer papierblomme' },
  p030: { en: 'Pink flowers on a patterned runner', af: 'Pienk blomme op ’n patroonloper' },
  p031: { en: 'White flower centrepiece', af: 'Wit blom-middelstuk' },
  p032: { en: 'Tables with white linen and chair covers', af: 'Tafels met wit linne en stoeloortreksels' },
  p033: { en: 'Lapa set with white tablecloths', af: 'Lapa gedek met wit tafeldoeke' },
  p034: { en: 'Long wooden table with a blue runner', af: 'Lang houttafel met ’n blou loper' },
  p036: { en: 'Large paper flower centrepiece', af: 'Groot papierblom-middelstuk' },
  p038: { en: 'Flowers and greenery beside the pool', af: 'Blomme en plante langs die swembad' },
  p041: { en: 'Silver flower in a glass vase', af: 'Silwer blom in ’n glasvaas' },
  p042: { en: 'Banquet set with white chairs in the lapa', af: 'Banket met wit stoele in die lapa' },
  p046: { en: 'Dinner tables with white chair covers', af: 'Aandete-tafels met wit stoeloortreksels' },
  p048: { en: 'Dessert table with cupcakes', af: 'Nageregtafel met kolwyntjies' },
  p053: { en: 'Long table glowing blue at night', af: 'Lang tafel wat saans blou gloei' },
  p055: { en: 'Fire pit under fairy-lit trees', af: 'Vuurput onder bome vol liggies' },
  p056: { en: 'Fire burning in the garden after dark', af: 'Vuur wat ná donker in die tuin brand' },
  p057: { en: 'Fire pit beside the thatched lapa at night', af: 'Vuurput langs die grasdak-lapa saans' },
  p060: { en: 'Fairy lights strung over the evening tables', af: 'Liggies bo die aandtafels' },
  p063: { en: 'Fire pit glowing under string lights', af: 'Vuurput wat onder liggies gloei' },
  p064: { en: 'Red carpet aisle through fairy-lit trees', af: 'Rooi tapyt deur bome vol liggies' },
  p066: { en: 'Thatched lapa at dusk', af: 'Grasdak-lapa teen skemer' },
  p067: { en: 'Fairy lights in the trees at night', af: 'Liggies in die bome saans' },
  p068: { en: 'Candlelit table with blue and gold settings', af: 'Kerslig-tafel met blou en goue pleklegging' },
  p072: { en: 'Long tables set with plates and glasses', af: 'Lang tafels gedek met borde en glase' },
  p074: { en: 'Long table with yellow flowers', af: 'Lang tafel met geel blomme' },
  p078: { en: 'Long tables with green and white décor', af: 'Lang tafels met groen en wit versierings' },
  p080: { en: 'Succulent and candle centrepiece', af: 'Middelstuk met vetplante en ’n kers' },
  p083: { en: 'Swimming pool with stone surrounds', af: 'Swembad met klip rondom' },
  p089: { en: 'Tables set with lemons and greenery', af: 'Tafels gedek met suurlemoene en groen blare' },
  p092: { en: 'Bonfire with string lights at a party', af: 'Vreugdevuur met liggies by ’n partytjie' },
  p094: { en: 'Pink cakes with yellow roses', af: 'Pienk koeke met geel rose' },
  p102: { en: 'The open lapa floor', af: 'Die oop lapavloer' },
  p106: { en: 'Shaded garden path under old trees', af: 'Skaduryke tuinpaadjie onder ou bome' },
  p107: { en: 'Garden table with blue and white settings', af: 'Tuintafel met blou en wit pleklegging' },
  p112: { en: 'Thatched lapa among palms at dusk', af: 'Grasdak-lapa tussen palms teen skemer' },
  p113: { en: 'Thatched roofs and set tables in the garden', af: 'Grasdakke en gedekte tafels in die tuin' },
  p114: { en: 'Tables under a thatched shelter in the garden', af: 'Tafels onder ’n grasdakskuiling in die tuin' },
  p116: { en: 'Long table with a pink runner beside a thatched hut', af: 'Lang tafel met ’n pienk loper langs ’n grasdakhut' },
  p123: { en: 'Buffet table under a white umbrella', af: 'Buffettafel onder ’n wit sambreel' },
  p130: { en: 'Garden seating along a stone path', af: 'Sitplek in die tuin langs ’n klippaadjie' },
  p131: { en: 'Tables set on the lawn under trees', af: 'Tafels op die grasperk onder bome' },
  p132: { en: 'Garden tables under tall trees', af: 'Tuintafels onder hoë bome' },
  p134: { en: 'Long wooden table with a teal runner', af: 'Lang houttafel met ’n blougroen loper' },
  p135: { en: 'Purple “thank you” party favour', af: 'Pers “dankie”-geskenkie' },
  p138: { en: 'Pastel roses in glass', af: 'Pastelrose in glas' },
  p141: { en: 'Thatched lapa with tables on the lawn', af: 'Grasdak-lapa met tafels op die grasperk' },
  p145: { en: 'Tables set on the lawn under tall trees', af: 'Tafels op die grasperk onder hoë bome' },
  p150: { en: 'Tables with patterned cloths in the garden', af: 'Tafels met patroondoeke in die tuin' },
  p153: { en: 'Long tables on the lawn by the thatched lapa', af: 'Lang tafels op die grasperk by die grasdak-lapa' },
  p155: { en: 'Wooden table with black and gold décor', af: 'Houttafel met swart en goue versierings' },
  p160: { en: 'Long garden tables in dappled shade', af: 'Lang tuintafels in gevlekte skadu' },
  p164: { en: 'Built-in braai area', af: 'Ingeboude braaiplek' },
  p166: { en: 'Garden path leading to a thatched building', af: 'Tuinpaadjie na ’n grasdakgebou' },
  p167: { en: 'Thatched shelter beside a big tree trunk', af: 'Grasdakskuiling langs ’n groot boomstam' },
  p168: { en: 'Green lawn under big shade trees', af: 'Groen grasperk onder groot skaduryke bome' },
}
