import { drAmplatz } from './stories/dr-amplatz.mjs';
import { reckoningContent } from './stories/latid-siga-piltar.mjs';
import { theCook } from './stories/the-cook.mjs';
import { morgunbladidReview, verjandinnContent } from './stories/verjandinn.mjs';

// Each entry supplies both its catalog card and its detail page.
export const catalog = [
  {
    slug: 'dyrbitar',
    title: 'Dýrbítar',
    titleLanguage: 'is',
    subtitle: 'Henhouse Syndrome',
    kind: 'Novel',
    edition: '2019',
    publisher: 'JPV útgáfa',
    coverSize: [635, 920],
    palette: 'rose',
    summary: 'A discovery in Fljótshlíð draws defense attorney Stefán Bjarnarson into a case that reaches far beyond the valley.',
    description: [
      'A body and two dead dogs turn up in the open country of Fljótshlíð. Defense attorney Stefán Bjarnarson soon finds himself dealing with the Icelandic police, CIA operatives, and a cast of witnesses whose interests rarely align.',
      'A standalone follow-up to Verjandinn, Dýrbítar brings Stefán back to the courtroom in a mystery where his private life proves almost as complicated as the case.'
    ],
    links: [{ label: 'Book and audio sample at Forlagið', url: 'https://www.forlagid.is/vara/dyrbitar/?attribute_pa_gerd=hljodbok-streymi-2' }],
    related: [{ label: 'Verjandinn (The Defense Attorney)', slug: 'verjandinn' }],
    review: {
      heading: 'Praise for The Defense Attorney',
      quotes: [morgunbladidReview]
    }
  },
  {
    slug: 'verjandinn',
    title: 'Verjandinn',
    titleLanguage: 'is',
    subtitle: 'The Defense Attorney',
    kind: 'Novel',
    edition: '2016',
    publisher: 'Forlagið',
    coverSize: [530, 771],
    palette: 'ochre',
    summary: 'A contested custody case takes a dangerous turn when a mother and daughter flee to Iceland.',
    ...verjandinnContent,
    links: [{ label: 'Book at Forlagið', url: 'https://www.forlagid.is/vara/verjandinn/' }]
  },
  {
    slug: 'latid-siga-piltar',
    title: 'Látið síga piltar',
    titleLanguage: 'is',
    subtitle: 'The Reckoning',
    kind: 'Novel',
    edition: '2013',
    publisher: 'Forlagið',
    coverSize: [607, 920],
    palette: 'slate',
    summary: 'In a secluded Icelandic valley, a farming community faces natural disaster, financial pressure and crime.',
    ...reckoningContent
  },
  {
    slug: 'eg-se-ekkert-svona-gleraugnalaus',
    title: 'Ég sé ekkert svona gleraugnalaus',
    titleLanguage: 'is',
    subtitle: 'I Can’t See a Thing Without My Glasses',
    kind: 'Short story collection',
    edition: '2010',
    publisher: 'Forlagið',
    coverSize: [583, 920],
    palette: 'sea',
    summary: 'A composer, a farrier, a former bank chief and a couple in Venice find strangeness in the everyday.',
    description: [
      'A sensitive composer, a country farrier, a couple on a trip to Venice and a former bank chief are among the people who appear in these stories. Ordinary settings give way to encounters that are funny, awkward and sometimes quietly unsettling.',
      'The stories turn on small details that reveal habits, vulnerabilities and the ways people see one another.'
    ],
    contents: [
      'Frumsýningin', 'Sigurjón', 'Austanátt', 'Forlagslóns í Lundúnum',
      'Fire Chief', 'Ingveldur Melinda', 'Blokkin', 'Málmsteypa Sigmundar',
      'Dr. Amplatz', 'Aferíka', 'Hótel', 'Fína kvöldið'
    ],
    related: [{ label: '“Dr. Amplatz” in Best European Fiction 2014', slug: 'best-european-fiction-2014' }],
    review: {
      heading: 'Reviews',
      quotes: [
        {
          text: '… lipur smásagnahöfundur …',
          reviewer: 'Egill Helgason',
          publication: 'Kiljan',
          language: 'is'
        },
        {
          text: 'Persónur Óskars eiga það margar sammerkt að sjá eitthvað sem aðrir sjá ekki og sögurnar eiga væntanlega öðrum þræði að bregða upp fyrir okkur gleraugum. Fá okkur til að rýna í litlu atriðin sem við lítum svo gjarna fram hjá í daglegu lífi.',
          reviewer: 'Auður Aðalsteinsdóttir',
          publication: 'Víðsjá, RÚV',
          language: 'is'
        },
        {
          text: 'Óskar hefur mjög næmt auga fyrir kynlegum kvistum … og spaugilegum aðstæðum. … smásögur sem er gaman að lesa … textinn alltaf lipur og lifandi. … ákaflega pennafær maður og ég skil vel að smásögur hans falli vel í kramið. … Betri en Davíð!',
          reviewer: 'Hrafn Jökulsson',
          publication: 'Kiljan',
          language: 'is'
        },
        {
          text: 'Stíll Óskars er skrumlaus og sagnaheimur hans er jafnan hlaðinn nokkuð svartri kímni … Megineinkenni er hversu frásagnargleðin er ríkuleg og hversu fundvís höfundur er á skemmtileg söguefni. Stíllinn er knappur og kaldhæðinn og sögurnar hnyttnar. Það má hafa verulega ánægju af lestri þessarar bókar.',
          reviewer: 'Skafti Þ. Halldórsson',
          publication: 'Morgunblaðið',
          language: 'is'
        }
      ]
    }
  },
  {
    slug: 'bordadi-eg-kvoldmat-i-gaer',
    title: 'Borðaði ég kvöldmat í gær?',
    titleLanguage: 'is',
    subtitle: 'Did I Eat Supper Last Night?',
    kind: 'Short story collection',
    edition: '2006',
    publisher: 'Citixen',
    coverSize: [586, 920],
    palette: 'moss',
    summary: 'Óskar’s first collection finds humor and surprise in familiar situations, from a ship’s galley to a heap of paperwork.',
    descriptionHeading: 'Passage',
    description: [
      'The names of the short stories catch the reader’s attention immediately: *Gold glitters*, *Oh ho ho, paper everywhere*, *The Cook* and *I only need one shot* reflect the diverse subjects of Óskar’s stories in this collection.',
      'The stories depict people we can all relate to, in situations that bring out the author’s eye for the funny and the extraordinary.',
      'Some stories are hilarious, while others take a more serious turn. Óskar brings humor and honesty together in both.'
    ],
    icelandicPassage: [
      'Nöfnin koma lesandanum strax á bragðið: *Það glampar á gullforðann*, *Oh ho ho, allt fullt af pappír*, *Kokkur upp á einn og kvart* og *Mér dugar eitt skot* gefa til kynna margvísleg viðfangsefni smásagna Óskars Magnússonar.',
      'Þær sýna svipmyndir af fólki sem allir kannast við, í aðstæðum þar sem næmt auga höfundar fyrir hinu skemmtilega og óvenjulega í fari fólks nýtur sín vel.',
      'Efnistök Óskars eru fjölbreytt, sumar sögurnar eru bráðfyndnar en í öðrum kveður við alvarlegri tón. Þá sameinar hann stundum skop og alvöru á eftirminnilegan hátt.'
    ],
    contents: [
      'Viltu að ég tali hærra?', 'Það glampar á gullforðann',
      { title: 'Kokkur upp á einn og kvart', label: 'The Cook', slug: 'out-of-the-blue' },
      'Gangið á guðs vegum', 'Oh ho ho, allt fullt af pappír', 'Þú átt rétt á að þegja',
      'Everybody have a horse?', 'Forseta er skemmt', 'Mér dugar eitt skot',
      'Hámenntaður íslenskur sveitamaður'
    ]
  },
  {
    slug: 'out-of-the-blue',
    title: 'Out of the Blue',
    subtitle: 'New Short Fiction from Iceland',
    kind: 'Anthology',
    edition: '2017',
    publisher: 'University of Minnesota Press',
    coverSize: [397, 600],
    palette: 'slate',
    story: 'The Cook',
    reading: theCook,
    summary: '“The Cook” appears alongside work by nineteen other Icelandic writers in this English-language anthology.',
    description: [
      'Edited by Helen Mitsios with a foreword by Sjón, Out of the Blue brings together twenty Icelandic writers. It was the first anthology devoted to Icelandic short fiction in English translation.',
      'Óskar’s contribution, “The Cook,” first appeared in his debut collection, Borðaði ég kvöldmat í gær?'
    ],
    links: [{ label: 'Anthology at University of Minnesota Press', url: 'https://www.upress.umn.edu/9781452955896/out-of-the-blue/' }],
    related: [{ label: 'Borðaði ég kvöldmat í gær?', slug: 'bordadi-eg-kvoldmat-i-gaer' }]
  },
  {
    slug: 'best-european-fiction-2014',
    title: 'Best European Fiction 2014',
    kind: 'Anthology',
    edition: '2014 edition',
    publisher: 'Dalkey Archive Press',
    cover: 'best-european-fiction.webp',
    coverSize: [584, 920],
    palette: 'rose',
    story: 'Dr. Amplatz',
    reading: drAmplatz,
    summary: '“Dr. Amplatz,” translated by Christopher Burawa, represents Iceland in this collection of European fiction.',
    description: [
      'This edition of the Dalkey Archive Press series brings together fiction from more than twenty-five languages, with a preface by Drago Jančar.',
      'Christopher Burawa translated Óskar’s contribution, “Dr. Amplatz,” from the Icelandic. The story first appeared in Ég sé ekkert svona gleraugnalaus.'
    ],
    links: [{ label: 'Translation credit and publication details', url: 'https://www.christopherburawa.com/translations' }],
    related: [{ label: 'Ég sé ekkert svona gleraugnalaus', slug: 'eg-se-ekkert-svona-gleraugnalaus' }]
  }
];
