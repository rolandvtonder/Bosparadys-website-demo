/*
  English copy for every page. af.ts must match this shape exactly (it is
  typed as Copy), so a missing Afrikaans string fails the type check instead
  of leaving a blank on the page.

  Everything here is drawn from the venue's photos and Facebook page. Things
  the site does not know yet (capacity, prices, hours, catering) are left out
  rather than guessed.
*/

export const en = {
  skip: 'Skip to content',
  home: 'Home',
  nav: {
    venue: 'Venue',
    events: 'Events',
    gallery: 'Gallery',
    reviews: 'Reviews',
    contact: 'Contact',
    book: 'Book a date',
    menu: 'Menu',
    close: 'Close menu',
    lang: 'Taal: Afrikaans',
    main: 'Main',
  },

  /* ---------- home: the scroll film ---------- */
  hero: {
    words: ['Your', 'Bush', 'Paradise'],
    body: [
      'A thatched lapa, fairy-lit gardens and',
      'crackling fire pits in Zwavelpoort, made',
      'for every reason to get together.',
    ],
    book: 'Book a date',
    whatsapp: 'WhatsApp us',
    statLabel: ['Guests who', 'recommend us'],
    statNote: 'From 28 reviews on Facebook',
    readouts: ['Reviews', 'Followers', 'Spaces'],
  },
  spaces: {
    title: 'Made for Gathering',
    sub: 'Long tables under the thatch, sundowners by the pool and stories around the fire. Every corner is set for a celebration.',
    cards: [
      ['Thatched', 'Lapa'],
      ['Sparkling', 'Pool'],
      ['Fireside', 'Boma'],
      ['Bushveld', 'Gardens'],
    ],
    cta: 'See the venue',
  },
  dusk: {
    title: 'When the sun sets, the bush lights up',
    body: 'As evening falls, fairy lights wake up in the trees and the fire pits are lit. Birthdays, baby showers, weddings and year-end functions all get the same warm, starlit setting, just outside the city.',
    cta: 'Explore events',
  },

  /* ---------- home: below the film ---------- */
  explore: {
    eyebrow: 'Explore',
    title: 'Plan your day at Bos Paradys',
    cards: [
      { title: 'The venue', body: 'Four spaces, from the thatched lapa to the fire pits, and everything on the property.' },
      { title: 'Events', body: 'Birthdays, baby showers, weddings and functions, and how booking works.' },
      { title: 'Gallery', body: 'Tables, décor and evenings from celebrations held here.' },
      { title: 'Reviews', body: 'What guests say: 100% recommend Bos Paradys on Facebook.' },
    ],
    open: 'Open',
  },

  /* ---------- shared closing band ---------- */
  cta: {
    title: 'Ready to pick a date?',
    body: 'Send us your date and guest count and we’ll let you know if it’s open.',
    book: 'Book a date',
    whatsapp: 'WhatsApp us',
  },

  /* ---------- venue page ---------- */
  venue: {
    eyebrow: 'The venue',
    title: 'A bushveld hideaway on the edge of Pretoria',
    intro:
      'Bos Paradys sits among big old trees in Zwavelpoort, east of Pretoria. Four spaces flow into one another, so a celebration can start at the tables under the thatch and end around the fire.',
    spacesNav: 'The spaces',
    goodFor: 'Good for',
    spaces: [
      {
        slug: 'lapa',
        name: 'Thatched Lapa',
        kicker: 'The heart of the property',
        body: [
          'A large open-sided lapa under a high thatched roof, with wooden beams, chandeliers and room for long tables. This is where most celebrations gather for dinner, speeches, cake and dancing.',
          'Because it is covered, the party carries on through the midday sun or a summer shower. The pool table stands under the same roof.',
        ],
        goodFor: ['Dinners & speeches', 'Dancing', 'Cake & dessert tables', 'Shade and shelter'],
      },
      {
        slug: 'pool',
        name: 'Swimming Pool',
        kicker: 'Cool off between courses',
        body: [
          'A sparkling pool set into the garden, with stone surrounds and lush planting a few steps from the lapa.',
          'It makes long summer afternoons easy, and it is one of the prettiest spots on the property for photos as the light turns gold.',
        ],
        goodFor: ['Summer afternoons', 'Sundowners', 'Photos'],
      },
      {
        slug: 'boma',
        name: 'Fire Pits & Boma',
        kicker: 'Where the night ends',
        body: [
          'Open fire pits ringed by seating under fairy-lit trees, plus a built-in braai area for cooking over the coals.',
          'After dark this is where guests drift with a drink, a story and the warmth of the fire.',
        ],
        goodFor: ['Braais', 'Winter evenings', 'Late-night fireside'],
      },
      {
        slug: 'gardens',
        name: 'Bushveld Gardens',
        kicker: 'Tables under the trees',
        body: [
          'Shaded lawns and winding paths under tall trees, with space to set long tables outdoors.',
          'Garden setups suit daytime events like showers, lunches and ceremonies, with the bushveld all around you.',
        ],
        goodFor: ['Garden lunches', 'Ceremonies', 'Baby showers'],
      },
    ],
    facilitiesEyebrow: 'Facilities',
    facilitiesTitle: 'On the property',
    facilities: [
      { t: 'Thatched lapa', d: 'Covered space for tables, speeches and dancing.' },
      { t: 'Swimming pool', d: 'Set in the garden, a few steps from the lapa.' },
      { t: 'Pool table', d: 'Under the lapa roof.' },
      { t: 'Fire pits & boma', d: 'Open fires with seating around them.' },
      { t: 'Braai area', d: 'A built-in braai for cooking over coals.' },
      { t: 'Garden lawns', d: 'Room for long tables and ceremonies outdoors.' },
      { t: 'Fairy-lit trees', d: 'String lights that wake the garden up at night.' },
      { t: 'Outdoor seating', d: 'Wooden tables and benches across the garden.' },
    ],
    findEyebrow: 'Getting here',
    findTitle: 'Find us in Zwavelpoort',
    findBody:
      'Bos Paradys is on Graham Road Ext in Zwavelpoort, on the eastern side of Pretoria. Tap for directions, or WhatsApp us if you need a hand finding the gate.',
  },

  /* ---------- events page ---------- */
  events: {
    eyebrow: 'Events',
    title: 'Celebrations of every size',
    intro:
      'From milestone birthdays to intimate weddings, Bos Paradys hosts gatherings under the thatch, out on the lawn or around the fire. Here is what each kind of event has looked like here.',
    jump: 'Jump to',
    seen: 'Seen at Bos Paradys',
    types: [
      {
        slug: 'birthdays',
        title: 'Birthdays',
        lead: 'From sweet sixteens to seventieths.',
        body: 'Birthdays here have filled the lapa with balloon arches, number balloons and cake tables, then spilled out to the pool, the garden and the fire as the evening went on.',
        seen: ['Balloon arches and number balloons', 'Themed cake and dessert tables', 'Jelly-shot and drinks displays', 'Dancing under the thatch'],
      },
      {
        slug: 'baby-showers',
        title: 'Baby showers',
        lead: 'Soft colours and long tables in the shade.',
        body: 'Showers usually set up in the garden or the lapa during the day, with styled tables, a dessert spread and plenty of shade for guests.',
        seen: ['Personalised plates and signage', 'Cupcake and dessert tables', 'Pastel flowers in glass', 'Letter blocks and keepsakes'],
      },
      {
        slug: 'weddings',
        title: 'Weddings & engagements',
        lead: 'White linen and fairy light.',
        body: 'Couples have used the garden for the ceremony and the lapa for dinner, with chair covers, centrepieces and a fairy-lit aisle through the trees.',
        seen: ['White chair covers and linen', 'A red-carpet aisle through the trees', 'Floral centrepieces', 'Dinner under the chandeliers'],
      },
      {
        slug: 'functions',
        title: 'Year-end & functions',
        lead: 'Long tables, good food and a fire to end on.',
        body: 'Teams and families book the long tables for year-end dinners and braais that run into the evening around the fire pits.',
        seen: ['Long banquet tables', 'Themed table lighting', 'Candlelit night settings', 'Dinners under string lights'],
      },
    ],
    stepsEyebrow: 'Booking',
    stepsTitle: 'How booking works',
    steps: [
      { t: 'Send an enquiry', d: 'Use the booking form or WhatsApp us with your date, guest count and type of event.' },
      { t: 'Hear back from us', d: 'We confirm whether your date is open and send you a quote.' },
      { t: 'Secure your date', d: 'Confirm with us and the date is yours.' },
      { t: 'Celebrate', d: 'Arrive, set up and enjoy the bush.' },
    ],
    checklistTitle: 'What to tell us',
    checklist: [
      'Your preferred date, and a backup date',
      'Roughly how many guests',
      'The type of event',
      'Start and end times',
      'Which spaces you would like to use',
      'Any décor or catering plans',
    ],
    packagesTitle: 'Packages & pricing',
    packagesBody:
      'Every event is different, so we quote per booking. Send us your date, guest count and the kind of event, and we’ll come back to you with a quote.',
    packagesCta: 'Ask for a quote',
  },

  /* ---------- gallery page ---------- */
  gallery: {
    eyebrow: 'Gallery',
    title: 'Moments from the bush',
    intro: 'Tables, décor and evenings from celebrations held at Bos Paradys. Tap any photo to see it larger.',
    filterLabel: 'Show',
    filters: { all: 'All', spaces: 'Spaces', tables: 'Tables', decor: 'Décor', night: 'After dark' },
    shown: (n: number) => `${n} photos`,
    more: 'More photos on Facebook',
    open: 'Open photo',
    prev: 'Previous photo',
    next: 'Next photo',
    close: 'Close',
    count: (i: number, n: number) => `${i} of ${n}`,
  },

  /* ---------- reviews page ---------- */
  reviews: {
    eyebrow: 'Reviews',
    title: 'Loved by our guests',
    intro: 'Every guest who has reviewed Bos Paradys on Facebook recommends it.',
    figure: 'recommend Bos Paradys',
    basis: 'Based on 28 reviews on Facebook',
    read: 'Read the reviews',
    quotesTitle: 'In their words',
    readMoreTitle: 'Read every review',
    readMoreBody: 'All 28 reviews are on our Facebook page, along with photos guests have shared.',
    leaveTitle: 'Celebrated with us?',
    leaveBody: 'A short review helps the next family choose their venue. It takes a minute on Facebook.',
    leave: 'Leave a review',
    recentTitle: 'Recent celebrations',
  },

  /* ---------- contact page ---------- */
  contact: {
    eyebrow: 'Contact',
    title: 'Book your date',
    intro: 'Tell us about your event. Your message opens in WhatsApp, ready to send, and we’ll take it from there.',
    formTitle: 'Booking enquiry',
    name: 'Your name',
    phone: 'Phone number',
    date: 'Event date',
    type: 'Type of event',
    typePick: 'Choose one',
    types: ['Birthday', 'Baby shower', 'Wedding or engagement', 'Year-end or function', 'Something else'],
    guests: 'Number of guests',
    message: 'Anything else we should know?',
    optional: 'optional',
    send: 'Send on WhatsApp',
    note: 'Opens WhatsApp with your message filled in. Nothing is sent until you press send there.',
    errors: {
      name: 'Please add your name so we know who to reply to.',
      date: 'Please choose the date you have in mind.',
      type: 'Please choose the type of event.',
      summary: 'A few details are missing. Please check the fields marked below.',
    },
    waIntro: 'Hi Bos Paradys, I’d like to enquire about a booking.',
    waLabels: { name: 'Name', phone: 'Phone', date: 'Date', type: 'Event', guests: 'Guests', message: 'Message' },
    reachTitle: 'Other ways to reach us',
    call: 'Call',
    callBody: 'Talk to us directly.',
    whatsapp: 'WhatsApp',
    whatsappBody: 'Message us any time.',
    facebook: 'Facebook',
    facebookBody: 'Photos, news and reviews.',
    findTitle: 'Find us',
    directions: 'Get directions',
    languages: 'We speak Afrikaans and English.',
    mapTitle: 'Map showing Bos Paradys in Zwavelpoort, Pretoria',
  },

  footer: {
    badge: 'Zwavelpoort, Pretoria',
    title: 'Gather under the thatch,',
    titleSoft: 'stay for the fire',
    body: 'Birthdays, showers, weddings and functions in a bushveld setting just outside the city.',
    follow: 'Follow us on Facebook',
    pagesHead: 'Pages',
    eventsHead: 'Events',
    contactHead: 'Contact',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
}

export type Copy = typeof en
