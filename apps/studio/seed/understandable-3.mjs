import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ── 3.1.1 Language of Page ────────────────────────────────────────────
  {
    criterionNumber: '3.1.1',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['html-has-lang', 'html-lang-valid', 'html-xml-lang-mismatch'],
    tags: ['language', 'html', 'internationalization'],
    title: {
      en: 'Language of Page',
      tr: 'Sayfa Dili',
    },
    description: {
      en: 'The default human language of each web page can be programmatically determined.',
      tr: 'Her web sayfasinin varsayilan insan dili programatik olarak belirlenebilir olmalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.1 requires that each web page identifies its primary language using the lang attribute on the <html> element. This allows assistive technologies, browsers, and search engines to process the content correctly — including selecting the right pronunciation rules for screen readers and the correct fonts and text direction for rendering.'),
        p('The lang attribute must use a valid BCP 47 language tag (e.g., "en", "fr", "tr", "zh-Hans"). An invalid or missing language declaration means assistive technology must guess, often resulting in garbled pronunciation for screen reader users.'),

        heading('Why it matters'),
        p('Screen readers use the page language to load the correct pronunciation engine. When a Turkish page lacks lang="tr", a screen reader may attempt to read Turkish words with English pronunciation rules, rendering the content unintelligible. This affects millions of screen reader users worldwide.'),
        p('Beyond accessibility, the lang attribute helps browsers offer translation, aids search engines in serving the right language version, and enables CSS features like :lang() selectors and language-specific hyphenation. It is one of the simplest and most impactful HTML attributes you can set.'),

        heading('Related axe-core rules'),
        bullet('html-has-lang — Ensures the <html> element has a lang attribute.'),
        bullet('html-lang-valid — Ensures the lang attribute value is a valid BCP 47 language tag.'),
        bullet('html-xml-lang-mismatch — Ensures xml:lang and lang attributes match on the <html> element.'),

        heading('How to test'),
        p('Automated tools reliably catch missing or invalid lang attributes. Manual verification is needed to confirm the language tag matches the actual page content.'),
        bullet('Run axe DevTools or Lighthouse — check for html-has-lang and html-lang-valid violations.'),
        bullet('Inspect the <html> element in DevTools and verify the lang attribute is present and correct.'),
        bullet('For XHTML pages, check that xml:lang matches the lang attribute.'),
        bullet('Verify the language tag matches the primary language of the page content, not just the interface.'),

        heading('How to fix'),
        p('Add a valid lang attribute to the <html> element:'),

        heading('Bad practice', 'h3'),
        code('<!-- Missing lang attribute -->\n<html>\n  <head><title>My Page</title></head>\n  <body>...</body>\n</html>\n\n<!-- Invalid lang value -->\n<html lang="english">\n  <head><title>My Page</title></head>\n  <body>...</body>\n</html>', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- English page -->\n<html lang="en">\n  <head><title>My Page</title></head>\n  <body>...</body>\n</html>\n\n<!-- Turkish page -->\n<html lang="tr">\n  <head><title>Sayfam</title></head>\n  <body>...</body>\n</html>\n\n<!-- XHTML with matching attributes -->\n<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">\n  <head><title>My Page</title></head>\n  <body>...</body>\n</html>', 'html'),

        heading('Common mistakes'),
        bullet('Omitting the lang attribute entirely — the most common issue, especially in boilerplate templates.'),
        bullet('Using an invalid language subtag like "english" or "turkish" instead of "en" or "tr".'),
        bullet('Setting the wrong language — for example, lang="en" on a page whose content is primarily in Turkish.'),
        bullet('Mismatch between lang and xml:lang on XHTML documents.'),
        bullet('Using a region subtag without the base language (e.g., lang="US" instead of lang="en-US").'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.1, her web sayfasinin birincil dilini <html> ogesindeki lang niteligi ile tanimlamasini gerektirir. Bu, yardimci teknolojilerin, tarayicilarin ve arama motorlarinin icerigi dogru islemesini saglar — ekran okuyucularin dogru telaffuz kurallarini secmesi ve oluslurma icin dogru yazitipleri ve metin yonunun kullanilmasi dahil.'),
        p('lang niteligi gecerli bir BCP 47 dil etiketi kullanmalidir (ornegin "en", "fr", "tr", "zh-Hans"). Gecersiz veya eksik bir dil bildirimi, yardimci teknolojinin tahmin yapmasi gerektigini ve bu durumun ekran okuyucu kullanicilari icin bozuk telaffuzla sonuclandigini gosterir.'),

        heading('Neden onemlidir'),
        p('Ekran okuyucular, dogru telaffuz motorunu yuklemek icin sayfa dilini kullanir. Turkce bir sayfada lang="tr" olmadigi zaman, ekran okuyucu Turkce kelimeleri Ingilizce telaffuz kurallariyla okumaya calisabilir ve icerik anlasIlmaz hale gelir. Bu durum dunya genelinde milyonlarca ekran okuyucu kullanicisini etkiler.'),
        p('Erisilebilirligin otesinde, lang niteligi tarayicilarin ceviri sunmasina yardimci olur, arama motorlarinin dogru dil surumunu sunmasini destekler ve :lang() secicileri ile dile ozgu tireleme gibi CSS ozelliklerini etkinlestirir. Ayarlayabileceginiz en basit ve en etkili HTML niteliklerinden biridir.'),

        heading('Ilgili axe-core kurallari'),
        bullet('html-has-lang — <html> ogesinin lang niteligi tasIdigini dogrular.'),
        bullet('html-lang-valid — lang niteligi degerinin gecerli bir BCP 47 dil etiketi oldugunu dogrular.'),
        bullet('html-xml-lang-mismatch — <html> ogesindeki xml:lang ve lang niteliklerinin eslesmesini dogrular.'),

        heading('Nasil test edilir'),
        p('Otomatik araclar eksik veya gecersiz lang niteliklerini guvenilir bicimde yakalar. Dil etiketinin gercek sayfa icerigiyle eslesmesini dogrulamak icin manuel kontrol gerekir.'),
        bullet('axe DevTools veya Lighthouse calistirin — html-has-lang ve html-lang-valid ihlallerini kontrol edin.'),
        bullet('DevTools ile <html> ogesini inceleyin ve lang nitelginin mevcut ve dogru oldugunu dogrulayin.'),
        bullet('XHTML sayfalari icin xml:lang ile lang niteliklerinin eslestigini kontrol edin.'),
        bullet('Dil etiketinin yalnizca arayuzle degil, sayfa iceriginin birincil diliyle eslesmesini dogrulayin.'),

        heading('Nasil duzeltilir'),
        p('<html> ogesine gecerli bir lang niteligi ekleyin:'),

        heading('Yanlis uygulama', 'h3'),
        code('<!-- lang niteligi eksik -->\n<html>\n  <head><title>Sayfam</title></head>\n  <body>...</body>\n</html>\n\n<!-- Gecersiz lang degeri -->\n<html lang="turkce">\n  <head><title>Sayfam</title></head>\n  <body>...</body>\n</html>', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Turkce sayfa -->\n<html lang="tr">\n  <head><title>Sayfam</title></head>\n  <body>...</body>\n</html>\n\n<!-- Ingilizce sayfa -->\n<html lang="en">\n  <head><title>My Page</title></head>\n  <body>...</body>\n</html>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('lang nitelgini tamamen atlama — ozellikle sablonlarda en yaygin sorun.'),
        bullet('"en" veya "tr" yerine "english" veya "turkce" gibi gecersiz dil alt etiketi kullanma.'),
        bullet('Yanlis dil ayarlama — ornegin icerigi Turkce olan bir sayfada lang="en" kullanma.'),
        bullet('XHTML belgelerinde lang ile xml:lang arasinda uyumsuzluk.'),
        bullet('Temel dil olmadan bolge alt etiketi kullanma (ornegin lang="en-US" yerine lang="US").'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.1: Language of Page', url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html', source: 'W3C', language: 'en', _key: 'r311w3cu' },
      { title: 'H57: Using the language attribute on the HTML element', url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H57', source: 'W3C', language: 'en', _key: 'r311h57t' },
      { title: 'WebAIM: Document Language', url: 'https://webaim.org/techniques/language/', source: 'WebAIM', language: 'en', _key: 'r311waim' },
      { title: 'Deque: html-has-lang', url: 'https://dequeuniversity.com/rules/axe/4.10/html-has-lang', source: 'Deque', language: 'en', _key: 'r311dequ' },
      { title: 'MDN: Global lang attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang', source: 'MDN', language: 'en', _key: 'r311mdnl' },
      { title: 'BCP 47 Language Tags', url: 'https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry', source: 'IANA', language: 'en', _key: 'r311iana' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.1 Language of Page — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.1 Language of Page. Set the correct lang attribute on the HTML element so screen readers pronounce content correctly.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.1 Sayfa Dili — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.1 Sayfa Dili kriterini nasil karsilayacaginizi ogrenin. Ekran okuyucularin icerigi dogru telaffuz etmesi icin HTML ogesine dogru lang niteligi ayarlayin.',
      },
    },
  },

  // ── 3.1.2 Language of Parts ───────────────────────────────────────────
  {
    criterionNumber: '3.1.2',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: ['valid-lang'],
    tags: ['language', 'internationalization', 'html'],
    title: {
      en: 'Language of Parts',
      tr: 'Bolum Dili',
    },
    description: {
      en: 'The human language of each passage or phrase in the content can be programmatically determined, except for proper names, technical terms, and words of indeterminate language.',
      tr: 'Ozel adlar, teknik terimler ve belirsiz dildeki kelimeler haric, icerikteki her pasaj veya ifadenin insan dili programatik olarak belirlenebilir olmalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.2 extends 3.1.1 by requiring that language changes within a page are also marked up. When a primarily English page includes a French quotation or a Turkish paragraph, those sections need a lang attribute on the containing element so assistive technology can switch pronunciation engines.'),
        p('Exceptions exist for proper names (e.g., "François"), technical terms that have become part of the base language, and words whose language cannot be determined. Common loanwords that are widely used in the page language do not need separate marking.'),

        heading('Why it matters'),
        p('When a screen reader encounters text in a different language without a lang attribute, it applies the pronunciation rules of the page language. A French phrase read with English pronunciation is difficult or impossible to understand. Marking language changes allows the screen reader to switch voices or pronunciation engines seamlessly.'),
        p('This is especially important for multilingual content, academic writing with citations in other languages, and sites that serve diverse linguistic communities.'),

        heading('Related axe-core rules'),
        bullet('valid-lang — Ensures the lang attribute on elements uses a valid BCP 47 language tag.'),

        heading('How to test'),
        bullet('Scan the page content for phrases, paragraphs, or sections in a language other than the page default.'),
        bullet('Inspect those elements to verify they have a lang attribute with the correct language tag.'),
        bullet('Use a screen reader to navigate through multilingual sections and confirm pronunciation switches occur correctly.'),
        bullet('Run axe to catch invalid lang values on inline elements.'),

        heading('How to fix'),
        p('Add a lang attribute to any element that contains text in a different language from the page default:'),

        heading('Bad practice', 'h3'),
        code('<!-- French text on an English page with no lang marker -->\n<p>The motto of the Olympics is <em>Citius, Altius, Fortius</em>.</p>\n\n<!-- Turkish paragraph on an English page without lang -->\n<blockquote>\n  Erisilebilirlik bir hak, luks degil.\n</blockquote>', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- French text properly marked -->\n<p>The motto of the Olympics is <em lang="la">Citius, Altius, Fortius</em>.</p>\n\n<!-- Turkish paragraph properly marked -->\n<blockquote lang="tr">\n  Erisilebilirlik bir hak, luks degil.\n</blockquote>\n\n<!-- Multiple languages in a single section -->\n<p>In German, accessibility is called <span lang="de">Barrierefreiheit</span>,\n   which literally means "freedom from barriers".</p>', 'html'),

        heading('Common mistakes'),
        bullet('Forgetting to mark quoted text in a foreign language.'),
        bullet('Over-marking common loanwords that are part of everyday usage (e.g., "café" in English does not need lang="fr").'),
        bullet('Using an incorrect language tag — Latin phrases need lang="la", not lang="it" or lang="fr".'),
        bullet('Marking only block-level language changes but missing inline phrases.'),
        bullet('Not updating lang attributes when content is dynamically loaded in a different language.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.2, sayfa icindeki dil degisikliklerinin de isaretlenmesini gerektirerek 3.1.1 kriterini genisletir. Temelde Turkce olan bir sayfa Ingilizce bir alinti veya Fransizca bir paragraf icerdiginde, bu bolumlerin kapsayici oge uzerinde lang niteligi tasimasi gerekir.'),
        p('Ozel adlar (ornegin "François"), temel dilin parcasi haline gelmis teknik terimler ve dili belirlenemeyen kelimeler icin istisnalar mevcuttur.'),

        heading('Neden onemlidir'),
        p('Bir ekran okuyucu lang niteligi olmadan farkli dildeki metinle karsilastiginda, sayfa dilinin telaffuz kurallarini uygular. Ingilizce telaffuzla okunan Fransizca bir ifade anlasilmasi zor veya imkansiz olur. Dil degisikliklerini isaretlemek, ekran okuyucunun ses veya telaffuz motorlarini sorunsuzca degistirmesini saglar.'),
        p('Bu ozellikle cok dilli icerik, baska dillerde alintilar iceren akademik yazilar ve cesitli dil topluluklarina hizmet veren siteler icin onemlidir.'),

        heading('Ilgili axe-core kurallari'),
        bullet('valid-lang — Ogelerdeki lang niteligi degerinin gecerli bir BCP 47 dil etiketi oldugunu dogrular.'),

        heading('Nasil test edilir'),
        bullet('Sayfa icerigini sayfa varsayilanindan farkli dildeki ifade, paragraf veya bolumler icin tarayin.'),
        bullet('Bu ogelerin dogru dil etiketiyle lang niteligi tasiyip tasimadigini kontrol edin.'),
        bullet('Cok dilli bolumler arasinda gezinirken ekran okuyucu ile telaffuz degisikliklerinin dogru yapildigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        p('Sayfa varsayilanindan farkli dildeki metin iceren her ogeye lang niteligi ekleyin:'),

        heading('Yanlis uygulama', 'h3'),
        code('<!-- Turkce sayfada lang isaretlemesi olmayan Ingilizce metin -->\n<p>Bu kavrama Ingilizce <em>accessibility</em> denir.</p>', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Ingilizce metin dogru isaretlenmis -->\n<p>Bu kavrama Ingilizce <em lang="en">accessibility</em> denir.</p>\n\n<!-- Farkli dilde paragraf -->\n<blockquote lang="en">\n  Accessibility is a right, not a luxury.\n</blockquote>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Yabanci dildeki alintilar icin isaretleme yapmayi unutma.'),
        bullet('Gunluk kullanima girmis yabanci sozcukleri gereksiz yere isaretleme.'),
        bullet('Yanlis dil etiketi kullanma — Latince ifadeler lang="la" gerektirir, lang="it" veya lang="fr" degil.'),
        bullet('Yalnizca blok duzeyindeki dil degisikliklerini isaretleyip satir ici ifadeleri kacirma.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.2: Language of Parts', url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html', source: 'W3C', language: 'en', _key: 'r312w3cu' },
      { title: 'H58: Using language attributes to identify changes', url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H58', source: 'W3C', language: 'en', _key: 'r312h58t' },
      { title: 'WebAIM: Language', url: 'https://webaim.org/techniques/language/', source: 'WebAIM', language: 'en', _key: 'r312waim' },
      { title: 'Deque: valid-lang', url: 'https://dequeuniversity.com/rules/axe/4.10/valid-lang', source: 'Deque', language: 'en', _key: 'r312dequ' },
      { title: 'MDN: lang attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang', source: 'MDN', language: 'en', _key: 'r312mdnl' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.2 Language of Parts — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.2 Language of Parts. Mark language changes within a page so screen readers switch pronunciation correctly.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.2 Bolum Dili — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.2 Bolum Dili kriterini nasil karsilayacaginizi ogrenin. Sayfa icindeki dil degisikliklerini isaretleyerek ekran okuyucularin dogru telaffuz yapmasini saglayin.',
      },
    },
  },

  // ── 3.1.3 Unusual Words ──────────────────────────────────────────────
  {
    criterionNumber: '3.1.3',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['language', 'readability', 'glossary'],
    title: {
      en: 'Unusual Words',
      tr: 'Olagan Disi Kelimeler',
    },
    description: {
      en: 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
      tr: 'Deyimler ve jargon dahil olmak uzere, olagan disi veya kisitli bicimde kullanilan kelimelerin veya ifadelerin belirli tanimlarini belirleme mekanizmasi mevcuttur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.3 requires that content provides a way for users to look up the definitions of words or phrases used in unusual, technical, or idiomatic ways. This includes jargon, slang, idioms, and words with specialized meanings that differ from everyday usage.'),
        p('The mechanism can be a glossary, inline definitions, a linked definition list, or a tooltip. The goal is to ensure that readers who are unfamiliar with domain-specific terminology can still understand the content.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities, non-native speakers, and people unfamiliar with a domain may struggle with jargon and idioms. An idiom like "kick the bucket" is incomprehensible when taken literally, and technical terms like "semantic markup" assume prior knowledge.'),
        p('Providing definitions improves comprehension for everyone and makes content more inclusive. It also benefits search engines and AI systems trying to understand page content.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. It requires manual review to identify unusual words and verify that definitions are provided.'),

        heading('How to test'),
        bullet('Read through the page content and identify jargon, idioms, and technical terms.'),
        bullet('Verify that each unusual term has a definition mechanism (glossary link, inline definition, tooltip, or dfn element).'),
        bullet('Check that the definition mechanism is easy to discover and use.'),
        bullet('Test with users unfamiliar with the domain to confirm comprehension.'),

        heading('How to fix'),
        p('Provide definitions using one or more of these techniques:'),

        heading('Inline definitions', 'h3'),
        code('<!-- Using the dfn element -->\n<p>The <dfn>WCAG</dfn> (Web Content Accessibility Guidelines)\n   is a set of standards for accessible web content.</p>\n\n<!-- Using parenthetical definitions -->\n<p>The site uses SSR (Server-Side Rendering) to improve\n   initial load performance.</p>', 'html'),

        heading('Glossary links', 'h3'),
        code('<!-- Linking to a glossary entry -->\n<p>Ensure all images have adequate\n   <a href="/glossary#alt-text">alt text</a>.</p>\n\n<!-- Linked glossary page -->\n<dl id="glossary">\n  <dt id="alt-text">Alt text</dt>\n  <dd>A text description of a non-text element such as\n      an image, used by screen readers and displayed\n      when images fail to load.</dd>\n</dl>', 'html'),

        heading('Common mistakes'),
        bullet('Using jargon without any explanation and assuming all readers share the same background.'),
        bullet('Providing definitions only on first use — users may land on any page via search.'),
        bullet('Burying the glossary in a hard-to-find location.'),
        bullet('Using tooltips that are not keyboard accessible.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.3, icerigin olagan disi, teknik veya deyimsel sekilde kullanilan kelimelerin veya ifadelerin tanimlarini arama yolu saglamasini gerektirir. Bu, jargon, argo, deyimler ve gunluk kullanimdan farkli ozel anlamlara sahip kelimeleri icerir.'),
        p('Mekanizma bir sozluk, satir ici tanim, baglantili tanim listesi veya araç ipucu olabilir. Amac, alana ozgu terminolojiye asina olmayan okurlarin icerigi anlamasini saglamaktir.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli kullanicilar, ana dili farkli konusanlar ve alana asina olmayan kisiler jargon ve deyimlerle zorluk yasayabilir. "Nallarini dikmek" gibi bir deyim kelimesi kelimesine alindiginda anlasIlmaz olur.'),
        p('Tanim saglamak herkes icin anlama duzeyini arttirir ve icerigi daha kapsayici kilar.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Olagan disi kelimeleri belirlemek ve tanimlarin saglandigini dogrulamak icin manuel inceleme gerekir.'),

        heading('Nasil test edilir'),
        bullet('Sayfa icerigini jargon, deyim ve teknik terimler icin okuyun.'),
        bullet('Her olagan disi terimin bir tanim mekanizmasina sahip oldugunu dogrulayin.'),
        bullet('Tanim mekanizmasinin kolay kesfedilebilir ve kullanilabiir oldugunu kontrol edin.'),

        heading('Nasil duzeltilir'),
        p('Su tekniklerden birini veya birden fazlasini kullanarak tanimlar saglayin:'),
        code('<!-- dfn ogesi ile -->\n<p><dfn>WCAG</dfn> (Web Icerik Erisilebilirlik Yonergeleri)\n   erisilebilir web icerigi icin standartlar butunudur.</p>\n\n<!-- Sozluk baglantisi -->\n<p>Tum gorsellerin yeterli\n   <a href="/sozluk#alt-metin">alt metin</a>e sahip oldugunu dogrulayin.</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Jargonu aciklama yapmadan kullanmak ve tum okuyucularin ayni bilgi birikimine sahip oldugunu varsaymak.'),
        bullet('Tanimlari yalnizca ilk kullanimda saglamak — kullanicilar arama yoluyla herhangi bir sayfaya ulasabilir.'),
        bullet('Sozlugu bulunmasi zor bir konuma yerlestirmek.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.3: Unusual Words', url: 'https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html', source: 'W3C', language: 'en', _key: 'r313w3cu' },
      { title: 'G55: Linking to definitions', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G55', source: 'W3C', language: 'en', _key: 'r313g55t' },
      { title: 'H40: Using definition lists', url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H40', source: 'W3C', language: 'en', _key: 'r313h40t' },
      { title: 'WebAIM: Writing Clearly', url: 'https://webaim.org/techniques/writing/', source: 'WebAIM', language: 'en', _key: 'r313waim' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.3 Unusual Words — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.3 Unusual Words. Provide definitions for jargon, idioms, and technical terms to improve content comprehension.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.3 Olagan Disi Kelimeler — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.3 Olagan Disi Kelimeler kriterini nasil karsilayacaginizi ogrenin. Jargon, deyim ve teknik terimler icin tanimlar saglayarak icerik anlasIlirligini artirin.',
      },
    },
  },

  // ── 3.1.4 Abbreviations ──────────────────────────────────────────────
  {
    criterionNumber: '3.1.4',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['language', 'readability', 'abbreviations'],
    title: {
      en: 'Abbreviations',
      tr: 'Kisaltmalar',
    },
    description: {
      en: 'A mechanism for identifying the expanded form or meaning of abbreviations is available.',
      tr: 'Kisaltmalarin acilmis bicimine veya anlamina ulasma mekanizmasi mevcuttur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.4 requires that abbreviations and acronyms used in content have a mechanism for users to discover their full expanded form. This includes initialisms (HTML, CSS), acronyms (NASA, WCAG), and shortened forms (Dr., approx.).'),
        p('The expanded form should be available on first use, through a glossary, or via the <abbr> element with a title attribute. The goal is to ensure all readers can understand the content regardless of their familiarity with the abbreviations used.'),

        heading('Why it matters'),
        p('Abbreviations can be confusing for screen reader users (who may hear them spelled out letter by letter), people with cognitive disabilities, non-native speakers, and anyone unfamiliar with domain-specific acronyms. The same abbreviation can have different meanings in different contexts.'),
        p('Providing expanded forms eliminates ambiguity and improves comprehension for all users.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Manual review is required to identify abbreviations and verify that expanded forms are provided.'),

        heading('How to test'),
        bullet('Scan content for abbreviations and acronyms.'),
        bullet('Check that each abbreviation is expanded on first use or has an <abbr> element with a title.'),
        bullet('Verify a glossary is available for frequently used abbreviations.'),
        bullet('Test with a screen reader to hear how abbreviations are announced.'),

        heading('How to fix'),
        code('<!-- Using abbr element -->\n<p>The <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>\n   defines standards for accessible content.</p>\n\n<!-- Expanding on first use -->\n<p>The Web Content Accessibility Guidelines (WCAG) define\n   standards for accessible content. Subsequent references\n   to WCAG in this document refer to version 2.2.</p>\n\n<!-- Using a glossary -->\n<p>Ensure compliance with <a href="/glossary#wcag">WCAG</a> 2.2.</p>', 'html'),

        heading('Common mistakes'),
        bullet('Using abbreviations without ever expanding them.'),
        bullet('Expanding abbreviations only in a glossary that users cannot easily find.'),
        bullet('Inconsistent expansion — expanding on some pages but not others.'),
        bullet('Using the <abbr> element without a title attribute, which provides no additional information.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.4, icerikte kullanilan kisaltma ve akronimlerin tam acilmis bicimlerine ulasma mekanizmasina sahip olmasini gerektirir. Bu, bas harf kisaltmalarini (HTML, CSS), akronimleri (NASA, WCAG) ve kisaltilmis bicimleri (Dr., vb.) icerir.'),
        p('Acilmis bicim ilk kullanimda, bir sozluk araciligiyla veya title niteligi olan <abbr> ogesi ile saglanabilir.'),

        heading('Neden onemlidir'),
        p('Kisaltmalar ekran okuyucu kullanicilari, bilissel engelli kisiler, ana dili farkli konusanlar ve alana ozgu akronimlere asina olmayan herkes icin kafa karistirici olabilir. Ayni kisaltma farkli baglamlarda farkli anlamlara gelebilir.'),
        p('Acilmis bicimlerin saglanmasi belirsizligi ortadan kaldirir ve tum kullanicilar icin anlama duzeyini arttirir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Kisaltmalari belirlemek ve acilmis bicimlerin saglandigini dogrulamak icin manuel inceleme gerekir.'),

        heading('Nasil test edilir'),
        bullet('Icerigi kisaltma ve akronimler icin tarayin.'),
        bullet('Her kisaltmanin ilk kullanimda acildigini veya title nitelikli <abbr> ogesine sahip oldugunu kontrol edin.'),
        bullet('Sik kullanilan kisaltmalar icin bir sozlugun mevcut oldugunu dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- abbr ogesi ile -->\n<p><abbr title="Web Icerik Erisilebilirlik Yonergeleri">WCAG</abbr>\n   erisilebilir icerik icin standartlari tanimlar.</p>\n\n<!-- Ilk kullanimda acma -->\n<p>Web Icerik Erisilebilirlik Yonergeleri (WCAG) erisilebilir\n   icerik icin standartlari tanimlar.</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Kisaltmalari hic acmadan kullanma.'),
        bullet('Kisaltmalari yalnizca bulunmasi zor bir sozlukte acma.'),
        bullet('Tutarsiz acma — bazi sayfalarda acip digerlerinde acmama.'),
        bullet('<abbr> ogesini title niteligi olmadan kullanma.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.4: Abbreviations', url: 'https://www.w3.org/WAI/WCAG22/Understanding/abbreviations.html', source: 'W3C', language: 'en', _key: 'r314w3cu' },
      { title: 'G97: Providing the abbreviation on first use', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G97', source: 'W3C', language: 'en', _key: 'r314g97t' },
      { title: 'H28: Providing definitions with abbr', url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H28', source: 'W3C', language: 'en', _key: 'r314h28t' },
      { title: 'MDN: abbr element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr', source: 'MDN', language: 'en', _key: 'r314mdna' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.4 Abbreviations — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.4 Abbreviations. Provide expanded forms for abbreviations and acronyms to improve content accessibility.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.4 Kisaltmalar — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.4 Kisaltmalar kriterini nasil karsilayacaginizi ogrenin. Kisaltma ve akronimler icin acilmis bicimleri saglayarak icerik erisilebilirligini artirin.',
      },
    },
  },

  // ── 3.1.5 Reading Level ──────────────────────────────────────────────
  {
    criterionNumber: '3.1.5',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['language', 'readability', 'cognitive'],
    title: {
      en: 'Reading Level',
      tr: 'Okuma Duzeyi',
    },
    description: {
      en: 'When text requires more than a lower secondary education reading level, supplemental content or an alternative version is available.',
      tr: 'Metin, ortaokul okuma duzeyinin ustunde bir okuma seviyesi gerektirdiginde, tamamlayici icerik veya alternatif bir surum sunulmalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.5 requires that when text content is more complex than a lower secondary education reading level (roughly ages 12-14, or grades 7-9), a supplemental version is provided. This could be a simplified summary, illustrations, or a plain-language version.'),
        p('This applies after removing proper names and titles. The goal is to ensure content is accessible to people with reading disabilities, cognitive disabilities, or limited education.'),

        heading('Why it matters'),
        p('Complex language excludes people with dyslexia, cognitive disabilities, lower literacy levels, and non-native speakers. Government and healthcare content, in particular, must be understandable to the widest possible audience.'),
        p('Simplified alternatives benefit everyone — even highly literate readers prefer clear, concise content. Studies show that plain language reduces errors and increases task completion rates.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Reading level assessment requires specialized tools or manual evaluation.'),

        heading('How to test'),
        bullet('Use readability scoring tools (Flesch-Kincaid, Gunning Fog, Coleman-Liau) to assess content complexity.'),
        bullet('Identify content that scores above the target reading level.'),
        bullet('Verify that supplemental content or simplified alternatives are provided for complex sections.'),
        bullet('Test with users from the target audience to confirm comprehension.'),

        heading('How to fix'),
        p('Provide simplified alternatives for complex content:'),
        bullet('Write a plain-language summary at the top of complex documents.'),
        bullet('Use illustrations, diagrams, and infographics to supplement text.'),
        bullet('Break long sentences into shorter ones (aim for 15-20 words per sentence).'),
        bullet('Replace jargon with everyday words where possible.'),
        bullet('Provide an "Easy Read" version of critical documents.'),

        heading('Common mistakes'),
        bullet('Assuming that all visitors have the same reading ability.'),
        bullet('Using unnecessarily complex vocabulary when simpler alternatives exist.'),
        bullet('Writing in passive voice, which increases reading difficulty.'),
        bullet('Failing to provide plain-language summaries for legal or technical documents.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.5, metin icerigi ortaokul okuma seviyesinden daha karmasik oldugunda tamamlayici bir surum saglanmasini gerektirir. Bu, basitlestirilmis bir ozet, gorseller veya sade dilde bir surum olabilir.'),
        p('Bu kriter ozel adlar ve basliklar cikarildiktan sonra uygulanir. Amac, okuma guclukleri, bilissel engeller veya sinirli egitim duzeyi olan kisilerin icerigi anlamasini saglamaktir.'),

        heading('Neden onemlidir'),
        p('Karmasik dil, disleksili kisileri, bilissel engelli kisileri, dusuk okuryazarlik duzeyindeki kisileri ve ana dili farkli konusanlari dislar. Ozellikle kamu ve saglik icerikleri mumkun olan en genis kitleye anlasilabilir olmalidir.'),
        p('Basitlestirilmis alternatifler herkese fayda saglar — son derece okuryazar okuyucular bile acik ve oz icerigi tercih eder.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Okuma duzeyi degerlendirmesi ozel araclar veya manuel degerlendirme gerektirir.'),

        heading('Nasil test edilir'),
        bullet('Icerik karmasikligini degerlendirmek icin okunabilirlik puanlama araclarini kullanin.'),
        bullet('Hedef okuma seviyesinin ustunde puan alan icerikleri belirleyin.'),
        bullet('Karmasik bolumler icin tamamlayici icerik saglandigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        bullet('Karmasik belgelerin basinda sade dilde bir ozet yazin.'),
        bullet('Metni desteklemek icin gorseller, diyagramlar ve infografikler kullanin.'),
        bullet('Uzun cumleleri kisa cumlelere bolun (cumle basina 15-20 kelime hedefleyin).'),
        bullet('Mumkun oldugunda jargonu gunluk kelimelerle degistirin.'),

        heading('Sik yapilan hatalar'),
        bullet('Tum ziyaretcilerin ayni okuma yetenegine sahip oldugunu varsaymak.'),
        bullet('Daha basit alternatifler varken gereksiz yere karmasik kelime dagarcigi kullanmak.'),
        bullet('Edilgen yapi ile yazmak, bu okuma zorlugunu arttirir.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.5: Reading Level', url: 'https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html', source: 'W3C', language: 'en', _key: 'r315w3cu' },
      { title: 'G86: Providing a summary', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G86', source: 'W3C', language: 'en', _key: 'r315g86t' },
      { title: 'WebAIM: Writing Clearly and Simply', url: 'https://webaim.org/techniques/writing/', source: 'WebAIM', language: 'en', _key: 'r315waim' },
      { title: 'Plainlanguage.gov', url: 'https://www.plainlanguage.gov/', source: 'Plain Language', language: 'en', _key: 'r315plan' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.5 Reading Level — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.5 Reading Level. Provide simplified alternatives for complex content to ensure comprehension for all readers.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.5 Okuma Duzeyi — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.5 Okuma Duzeyi kriterini nasil karsilayacaginizi ogrenin. Karmasik icerik icin basitlestirilmis alternatifler saglayarak tum okuyucularin anlamasini saglayin.',
      },
    },
  },

  // ── 3.1.6 Pronunciation ──────────────────────────────────────────────
  {
    criterionNumber: '3.1.6',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['language', 'readability', 'pronunciation'],
    title: {
      en: 'Pronunciation',
      tr: 'Telaffuz',
    },
    description: {
      en: 'A mechanism is available for identifying specific pronunciation of words where meaning is ambiguous without knowing the pronunciation.',
      tr: 'Telaffuz bilinmeden anlaminin belirsiz oldugu kelimelerin belirli telaffuzunu tanimlama mekanizmasi mevcuttur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.1.6 requires that when the meaning of a word depends on its pronunciation (homographs), a mechanism is provided to clarify. For example, "lead" can mean a metal (led) or to guide (leed). Without pronunciation guidance, meaning is lost.'),
        p('This applies to languages where written form does not fully determine pronunciation. In English, homographs are common. In languages with phonetic writing systems, this is less of an issue.'),

        heading('Why it matters'),
        p('Screen readers may pronounce homographs incorrectly, changing the meaning entirely. Users with reading disabilities may also struggle to determine the correct pronunciation from context alone.'),
        p('Providing pronunciation guides improves comprehension and ensures screen readers convey the correct meaning.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. It requires manual review of content for ambiguous pronunciation.'),

        heading('How to test'),
        bullet('Identify words with multiple pronunciations that change meaning (homographs).'),
        bullet('Check whether context alone resolves the ambiguity.'),
        bullet('Verify pronunciation guidance is provided where context is insufficient.'),

        heading('How to fix'),
        code('<!-- Using ruby annotation for pronunciation -->\n<p>The <ruby>lead<rp>(</rp><rt>led</rt><rp>)</rp></ruby>\n   pipes were replaced last year.</p>\n\n<!-- Using parenthetical pronunciation -->\n<p>The lead (rhymes with "bed") content in old paint\n   is a health hazard.</p>\n\n<!-- Providing SSML hints for screen readers -->\n<!-- Note: limited support, mainly in specialized applications -->\n<span data-ssml=\'<phoneme alphabet="ipa" ph="lɛd">lead</phoneme>\'>\n  lead\n</span>', 'html'),

        heading('Common mistakes'),
        bullet('Ignoring homographs entirely and relying on context that may be ambiguous.'),
        bullet('Using pronunciation guides inconsistently throughout the content.'),
        bullet('Providing pronunciation only in audio form, excluding users who are deaf or hard of hearing.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.1.6, bir kelimenin anlami telaffuzuna baglikken (ses es yazimlilar), bunu netlelstirmek icin bir mekanizma saglanmasini gerektirir. Ornegin Ingilizce "lead" kelimesi bir metal (led) veya yonlendirmek (leed) anlamina gelebilir.'),
        p('Bu, yazili bicimin telaffuzu tam olarak belirlemedigi diller icin gecerlidir. Turkce gibi fonetik yazim sistemlerine sahip dillerde bu daha az sorun olusturur.'),

        heading('Neden onemlidir'),
        p('Ekran okuyucular ses es yazimlilarini yanlis telaffuz ederek anlami tamamen degistirebilir. Okuma guclukleri olan kullanicilar da yalnizca baglamdan dogru telaffuzu belirleme konusunda zorluk yasayabilir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Belirsiz telaffuz icin icerigin manuel incelenmesini gerektirir.'),

        heading('Nasil test edilir'),
        bullet('Anlami degistiren birden fazla telaffuza sahip kelimeleri belirleyin.'),
        bullet('Baglaimin tek basina belirsizligi giderip gidermedigini kontrol edin.'),
        bullet('Baglaimin yetersiz oldugu yerlerde telaffuz rehberliginin saglandigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Ruby anotasyonu ile telaffuz -->\n<p>The <ruby>lead<rp>(</rp><rt>led</rt><rp>)</rp></ruby>\n   pipes were replaced last year.</p>\n\n<!-- Parantez ici telaffuz -->\n<p>The lead ("bed" ile kafiyeli) icerik eski boyada\n   saglik tehlikesidir.</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Ses es yazimlilarini tamamen goz ardi etmek ve belirsiz olabilecek baglama guvenme.'),
        bullet('Telaffuz rehberligini icerik boyunca tutarsiz saglamak.'),
        bullet('Telaffuzu yalnizca sesli bicimde saglayarak isitme engelli kullanicilari dislamak.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.1.6: Pronunciation', url: 'https://www.w3.org/WAI/WCAG22/Understanding/pronunciation.html', source: 'W3C', language: 'en', _key: 'r316w3cu' },
      { title: 'H62: Using the ruby element', url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H62', source: 'W3C', language: 'en', _key: 'r316h62t' },
      { title: 'MDN: ruby element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby', source: 'MDN', language: 'en', _key: 'r316mdnr' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.1.6 Pronunciation — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.1.6 Pronunciation. Provide pronunciation guides for ambiguous words to ensure correct comprehension.',
      },
      tr: {
        metaTitle: 'WCAG 3.1.6 Telaffuz — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.1.6 Telaffuz kriterini nasil karsilayacaginizi ogrenin. Belirsiz kelimelerin dogru anlasilmasini saglamak icin telaffuz rehberleri sunun.',
      },
    },
  },

  // ── 3.2.1 On Focus ───────────────────────────────────────────────────
  {
    criterionNumber: '3.2.1',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'focus', 'predictability'],
    title: {
      en: 'On Focus',
      tr: 'Odaklanma Uzerine',
    },
    description: {
      en: 'When any user interface component receives focus, it does not initiate a change of context.',
      tr: 'Herhangi bir kullanici arayuzu bileseni odak aldiginda, baglam degisikligi baslatmamalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.1 requires that simply moving focus to a component does not trigger a change of context. A "change of context" includes navigating to a new page, opening a new window, moving focus to another element, or significantly changing the content of the page.'),
        p('Users should be able to tab through interactive elements without unexpected things happening. Focus should be a passive action — exploring the interface — not an active one that commits a choice.'),

        heading('Why it matters'),
        p('Keyboard users and screen reader users navigate by tabbing between elements. If focusing on a link causes navigation, or focusing on a select box changes the page, the user loses control. This is disorienting and can cause data loss.'),
        p('Users with motor impairments may accidentally focus elements and trigger unintended actions. Predictable behavior is essential for all users but especially critical for those using assistive technology.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. It requires manual testing of interactive elements to verify that focus alone does not trigger context changes.'),

        heading('How to test'),
        bullet('Tab through every interactive element on the page.'),
        bullet('Verify that no navigation, popup, or significant content change occurs on focus alone.'),
        bullet('Test select elements, links, and custom widgets — these are the most common offenders.'),
        bullet('Check that auto-advancing forms do not move focus to the next field without user action.'),

        heading('How to fix'),
        heading('Bad practice', 'h3'),
        code('<!-- Select that navigates on focus/change -->\n<select onfocus="window.location = this.value">\n  <option value="/page1">Page 1</option>\n  <option value="/page2">Page 2</option>\n</select>\n\n<!-- Auto-submitting form on focus -->\n<input type="text" onfocus="this.form.submit()">', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- Select with a Go button -->\n<select id="page-select">\n  <option value="/page1">Page 1</option>\n  <option value="/page2">Page 2</option>\n</select>\n<button onclick="window.location = document.getElementById(\'page-select\').value">\n  Go\n</button>\n\n<!-- Form that waits for explicit submission -->\n<form action="/search" method="get">\n  <input type="text" name="q" />\n  <button type="submit">Search</button>\n</form>', 'html'),

        heading('Common mistakes'),
        bullet('Navigation menus that follow links when a link receives focus rather than on click/Enter.'),
        bullet('Select boxes that trigger navigation on change (related to 3.2.2 but often triggered on focus in older implementations).'),
        bullet('Opening new windows or dialogs when an element receives focus.'),
        bullet('Auto-advancing focus in multi-step forms without user action.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.1, bir bilesene odaklanmanin baglam degisikligi tetiklememesini gerektirir. "Baglam degisikligi" yeni bir sayfaya gitmeyi, yeni bir pencere acmayi, odagi baska bir ogeye tasImayi veya sayfa icerigini onemli olcude degistirmeyi icerir.'),
        p('Kullanicilar beklenmedik seyler olmadan etkilesimli ogeler arasinda Tab tusuyla gezinebilmelidir. Odaklanma pasif bir eylem olmalidir — arayuzu kesfetme — secim onaylayan aktif bir eylem degil.'),

        heading('Neden onemlidir'),
        p('Klavye ve ekran okuyucu kullanicilari ogeler arasinda Tab tusuyla gezinir. Bir baglantiya odaklanmak navigasyona neden olursa veya secim kutusuna odaklanmak sayfayi degistirirse, kullanici kontrolu kaybeder. Bu yon bozucu olabilir ve veri kaybina neden olabilir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Odaklanmanin baglam degisikligi tetiklemedigini dogrulamak icin etkilesimli ogelerin manuel test edilmesi gerekir.'),

        heading('Nasil test edilir'),
        bullet('Sayfadaki her etkilesimli oge arasinda Tab ile gezinin.'),
        bullet('Yalnizca odaklanma ile navigasyon, acilir pencere veya onemli icerik degisikligi olmadigini dogrulayin.'),
        bullet('Secim ogeleri, baglantilari ve ozel bilesenleri test edin.'),

        heading('Nasil duzeltilir'),
        heading('Yanlis uygulama', 'h3'),
        code('<!-- Odaklanma ile gezinen select -->\n<select onfocus="window.location = this.value">\n  <option value="/sayfa1">Sayfa 1</option>\n  <option value="/sayfa2">Sayfa 2</option>\n</select>', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Git dugmesi ile select -->\n<select id="sayfa-sec">\n  <option value="/sayfa1">Sayfa 1</option>\n  <option value="/sayfa2">Sayfa 2</option>\n</select>\n<button onclick="window.location = document.getElementById(\'sayfa-sec\').value">\n  Git\n</button>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Odaklanma ile baglantilari izleyen gezinme menuleri.'),
        bullet('Degisiklikte navigasyon tetikleyen secim kutulari.'),
        bullet('Bir oge odak aldiginda yeni pencere veya iletisim kutusu acma.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.1: On Focus', url: 'https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html', source: 'W3C', language: 'en', _key: 'r321w3cu' },
      { title: 'G107: Using change of context on activation', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G107', source: 'W3C', language: 'en', _key: 'r321g107' },
      { title: 'WebAIM: Keyboard Accessibility', url: 'https://webaim.org/techniques/keyboard/', source: 'WebAIM', language: 'en', _key: 'r321waim' },
      { title: 'F55: Using script to remove focus on receive', url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F55', source: 'W3C', language: 'en', _key: 'r321f55t' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.1 On Focus — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.1 On Focus. Ensure that receiving focus does not trigger unexpected context changes for keyboard and screen reader users.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.1 Odaklanma Uzerine — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.1 Odaklanma Uzerine kriterini nasil karsilayacaginizi ogrenin. Odak almanin klavye ve ekran okuyucu kullanicilari icin beklenmedik baglam degisiklikleri tetiklememesini saglayin.',
      },
    },
  },

  // ── 3.2.2 On Input ───────────────────────────────────────────────────
  {
    criterionNumber: '3.2.2',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'input', 'predictability'],
    title: {
      en: 'On Input',
      tr: 'Giris Uzerine',
    },
    description: {
      en: 'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
      tr: 'Herhangi bir kullanici arayuzu bileseninin ayarini degistirmek, kullanici bileseni kullanmadan once bu davranIs hakkinda bilgilendirilmedikce, otomatik olarak baglam degisikligine neden olmamalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.2 requires that changing a form control value — checking a checkbox, selecting a radio button, entering text, or choosing a dropdown option — does not automatically trigger a change of context (navigation, new window, form submission) unless the user was warned beforehand.'),
        p('If a change of context is needed on input, the user must be informed before interacting with the control. A visible label or instruction adjacent to the component satisfies this requirement.'),

        heading('Why it matters'),
        p('Screen reader and keyboard users often explore form controls before committing to a choice. If selecting a dropdown option immediately navigates away, the user may lose their place, unsaved data, or the ability to review other options.'),
        p('Predictable behavior builds user confidence. Unexpected context changes are the number one complaint in usability studies with assistive technology users.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Manual testing is required to verify that input changes do not cause unexpected context changes.'),

        heading('How to test'),
        bullet('Interact with every form control on the page — change select values, check boxes, enter text.'),
        bullet('Verify that no navigation, form submission, or significant page change happens automatically.'),
        bullet('If automatic changes do occur, check that clear instructions are provided before the control.'),

        heading('How to fix'),
        heading('Bad practice', 'h3'),
        code('<!-- Select that navigates on change -->\n<label for="lang">Language:</label>\n<select id="lang" onchange="window.location = this.value">\n  <option value="/en">English</option>\n  <option value="/tr">Turkish</option>\n</select>\n\n<!-- Checkbox that submits form -->\n<input type="checkbox" onchange="this.form.submit()"\n       id="agree" />\n<label for="agree">I agree to the terms</label>', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- Select with explicit submit button -->\n<label for="lang">Language:</label>\n<select id="lang">\n  <option value="/en">English</option>\n  <option value="/tr">Turkish</option>\n</select>\n<button type="submit">Change language</button>\n\n<!-- Or with advance warning -->\n<p><strong>Note:</strong> Selecting a language will\n   redirect you to the chosen version.</p>\n<label for="lang2">Language:</label>\n<select id="lang2" onchange="window.location = this.value">\n  <option value="/en">English</option>\n  <option value="/tr">Turkish</option>\n</select>', 'html'),

        heading('Common mistakes'),
        bullet('Language or region selectors that navigate immediately on change without a submit button.'),
        bullet('Auto-submitting forms when the last field is completed.'),
        bullet('Filter controls that reload the page without warning when a checkbox is toggled.'),
        bullet('Radio buttons that trigger immediate navigation or significant content replacement.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.2, bir form kontrolunun degerini degistirmenin — onay kutusu isaretleme, radyo dugmesi secme, metin girme veya acilir menu secenegi secme — kullanici onceden uyarilmadikca otomatik olarak baglam degisikligi tetiklememesini gerektirir.'),
        p('Giris uzerine baglam degisikligi gerekiyorsa, kullanici kontrolle etkilesime gecmeden once bilgilendirilmelidir.'),

        heading('Neden onemlidir'),
        p('Ekran okuyucu ve klavye kullanicilari genellikle bir secim yapmadan once form kontrollerini kesfeder. Acilir menu secenegi secmek hemen sayfa degistirirse, kullanici yerini, kaydedilmemis verileri veya diger secenekleri inceleme imkanini kaybedebilir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Giris degisikliklerinin beklenmedik baglam degisikliklerine neden olmadigini dogrulamak icin manuel test gerekir.'),

        heading('Nasil test edilir'),
        bullet('Sayfadaki her form kontroluyle etkilesime gecin — secim degerlerini degistirin, kutulari isaretleyin, metin girin.'),
        bullet('Otomatik olarak navigasyon, form gonderimi veya onemli sayfa degisikligi olmadigini dogrulayin.'),
        bullet('Otomatik degisiklikler olursa, kontrolden once acik talimatlarin saglandigini kontrol edin.'),

        heading('Nasil duzeltilir'),
        heading('Yanlis uygulama', 'h3'),
        code('<!-- Degisiklikte sayfa degistiren select -->\n<select onchange="window.location = this.value">\n  <option value="/tr">Turkce</option>\n  <option value="/en">English</option>\n</select>', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Acik gonder dugmesi ile select -->\n<select id="dil">\n  <option value="/tr">Turkce</option>\n  <option value="/en">English</option>\n</select>\n<button type="submit">Dili Degistir</button>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Gonder dugmesi olmadan degisiklikte hemen sayfa degistiren dil veya bolge seciciler.'),
        bullet('Son alan tamamlandiginda otomatik form gonderimi.'),
        bullet('Onay kutusu degistirildiginde uyari olmadan sayfayi yeniden yukleyen filtre kontrolleri.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.2: On Input', url: 'https://www.w3.org/WAI/WCAG22/Understanding/on-input.html', source: 'W3C', language: 'en', _key: 'r322w3cu' },
      { title: 'G80: Providing a submit button', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G80', source: 'W3C', language: 'en', _key: 'r322g80t' },
      { title: 'F36: Auto-submitting forms on change', url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F36', source: 'W3C', language: 'en', _key: 'r322f36t' },
      { title: 'WebAIM: Creating Accessible Forms', url: 'https://webaim.org/techniques/forms/', source: 'WebAIM', language: 'en', _key: 'r322waim' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.2 On Input — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.2 On Input. Prevent form controls from causing unexpected context changes when their values are modified.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.2 Giris Uzerine — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.2 Giris Uzerine kriterini nasil karsilayacaginizi ogrenin. Form kontrollerinin degerleri degistirildiginde beklenmedik baglam degisikliklerini onleyin.',
      },
    },
  },

  // ── 3.2.3 Consistent Navigation ──────────────────────────────────────
  {
    criterionNumber: '3.2.3',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['navigation', 'consistency', 'layout'],
    title: {
      en: 'Consistent Navigation',
      tr: 'Tutarli Gezinme',
    },
    description: {
      en: 'Navigational mechanisms that are repeated on multiple web pages within a set occur in the same relative order each time they are repeated.',
      tr: 'Bir kumedeki birden fazla web sayfasinda tekrarlanan gezinme mekanizmalari, her tekrarlandiklarinda ayni goreli sirada yer almalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.3 requires that navigation menus, search bars, and other repeated navigational elements appear in the same relative order across all pages of a site. The exact items may change (a section page may add subnav), but the order of shared items must remain consistent.'),
        p('This applies to navigation bars, sidebars, breadcrumbs, footer links, and any other navigational mechanism. Consistency helps users build mental models of the site structure.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities and screen reader users rely on consistent placement to find navigation elements. If the main menu appears in a different order on different pages, users must re-learn the interface on each page.'),
        p('Consistent navigation reduces cognitive load for all users and speeds up task completion. It is a fundamental principle of usable interface design.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Cross-page consistency must be verified through manual comparison.'),

        heading('How to test'),
        bullet('Visit multiple pages across the site and compare the order of navigation elements.'),
        bullet('Verify that shared navigation items (header menu, footer links, sidebar) maintain the same relative order.'),
        bullet('Check both visual order and DOM order — they should match.'),
        bullet('Test responsive layouts to ensure order is maintained at all breakpoints.'),

        heading('How to fix'),
        bullet('Use shared templates or components for navigation across all pages.'),
        bullet('Keep the relative order of navigation items consistent — items can be added between pages but existing items should not be reordered.'),
        bullet('Ensure responsive designs maintain the same logical order even if layout changes (e.g., hamburger menu should have the same item order).'),
        code('<!-- Consistent header across pages -->\n<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/products">Products</a></li>\n    <li><a href="/kb">Knowledge Base</a></li>\n    <li><a href="/about">About</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>\n<!-- This same order should appear on every page -->', 'html'),

        heading('Common mistakes'),
        bullet('Reordering navigation items on different page templates (e.g., marketing pages vs. documentation).'),
        bullet('Using a different navigation order in the mobile hamburger menu than in the desktop nav.'),
        bullet('Adding items to the middle of navigation on some pages, pushing existing items to different positions.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.3, gezinme menuleri, arama cubukları ve diger tekrarlanan gezinme ogelerinin sitenin tum sayfalarinda ayni goreli sirada gorunmesini gerektirir. Tam ogeler degisebilir ancak paylasilan ogelerin sirasi tutarli kalmalidir.'),
        p('Bu gezinme cubukları, yan menuleri, ekmek kirIntilari, alt bilgi baglantilarI ve diger gezinme mekanizmalari icin gecerlidir.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli kullanicilar ve ekran okuyucu kullanicilari gezinme ogelerini bulmak icin tutarli yerlesime guvenirler. Ana menu farkli sayfalarda farkli sirada gorunurse, kullanicilar her sayfada arayuzu yeniden ogrenmek zorunda kalir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Sayfalar arasi tutarliligin manuel karsilastirma ile dogrulanmasi gerekir.'),

        heading('Nasil test edilir'),
        bullet('Site genelinde birden fazla sayfayi ziyaret edin ve gezinme ogelerinin sirasini karsilastirin.'),
        bullet('Paylasilan gezinme ogelerinin ayni goreli sirayi korudugunuu dogrulayin.'),
        bullet('Duyarli duzenlerin tum kesme noktalarında sirayi korumasini kontrol edin.'),

        heading('Nasil duzeltilir'),
        bullet('Tum sayfalarda gezinme icin paylasilan sablonlar veya bilesenler kullanin.'),
        bullet('Gezinme ogelerinin goreli sirasini tutarli tutun.'),
        bullet('Duyarli tasarimlarin duzen degisse bile ayni mantiksal sirayi korumasini saglayin.'),

        heading('Sik yapilan hatalar'),
        bullet('Farkli sayfa sablonlarinda gezinme ogelerini yeniden siralama.'),
        bullet('Mobil hamburger menusunde masaustu gezinmesinden farkli sira kullanma.'),
        bullet('Bazi sayfalarda gezinmenin ortasina oge ekleyerek mevcut ogeleri farkli konumlara itme.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.3: Consistent Navigation', url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html', source: 'W3C', language: 'en', _key: 'r323w3cu' },
      { title: 'G61: Presenting repeated components in same order', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G61', source: 'W3C', language: 'en', _key: 'r323g61t' },
      { title: 'WebAIM: Navigation', url: 'https://webaim.org/techniques/skipnav/', source: 'WebAIM', language: 'en', _key: 'r323waim' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.3 Consistent Navigation — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.3 Consistent Navigation. Keep navigation elements in the same relative order across all pages.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.3 Tutarli Gezinme — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.3 Tutarli Gezinme kriterini nasil karsilayacaginizi ogrenin. Tum sayfalarda gezinme ogelerini ayni goreli sirada tutun.',
      },
    },
  },

  // ── 3.2.4 Consistent Identification ──────────────────────────────────
  {
    criterionNumber: '3.2.4',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['consistency', 'labels', 'identification'],
    title: {
      en: 'Consistent Identification',
      tr: 'Tutarli Tanimlama',
    },
    description: {
      en: 'Components that have the same functionality within a set of web pages are identified consistently.',
      tr: 'Bir web sayfasi kumesinde ayni islevsellige sahip bilesenler tutarli sekilde tanimlanir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.4 requires that components with the same function use the same labels, icons, and text across a website. A search function should always be labeled "Search" — not "Search" on one page and "Find" on another.'),
        p('This extends to icons, button labels, link text, and any other identifying mechanism. Consistency in labeling helps users recognize and operate components reliably.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities rely on consistent labeling to understand functionality. If a print icon means "Print" on one page and "Download PDF" on another, it creates confusion.'),
        p('Screen reader users navigate by element labels. Inconsistent labels force them to re-identify components on each page, significantly slowing interaction.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Cross-page label consistency requires manual review.'),

        heading('How to test'),
        bullet('Identify components that appear on multiple pages (search, login, share, print, etc.).'),
        bullet('Verify that each component uses the same label, icon, and accessible name across all pages.'),
        bullet('Check that icons paired with text are used consistently.'),
        bullet('Review screen reader output for consistent naming.'),

        heading('How to fix'),
        bullet('Create a design system or component library that enforces consistent naming.'),
        bullet('Document standard labels for common actions in your style guide.'),
        bullet('Use the same alt text for icons that serve the same purpose across pages.'),
        code('<!-- Consistent search across all pages -->\n<!-- Page 1 -->\n<label for="search">Search</label>\n<input type="search" id="search" name="q" />\n<button type="submit">Search</button>\n\n<!-- Page 2 — same labeling -->\n<label for="search">Search</label>\n<input type="search" id="search" name="q" />\n<button type="submit">Search</button>\n\n<!-- WRONG: Different label on page 2 -->\n<label for="find">Find content</label>\n<input type="search" id="find" name="q" />\n<button type="submit">Go</button>', 'html'),

        heading('Common mistakes'),
        bullet('Using "Log in" on some pages and "Sign in" on others for the same function.'),
        bullet('Changing button labels between pages (e.g., "Submit" vs "Send" vs "Go").'),
        bullet('Using different icons for the same action across pages.'),
        bullet('Inconsistent accessible names on components that look identical visually.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.4, ayni isleve sahip bilesenlerin web sitesi genelinde ayni etiketler, simgeler ve metin kullanmasini gerektirir. Arama islevi her zaman "Ara" olarak etiketlenmeli — bir sayfada "Ara" digirinde "Bul" olmamalidir.'),
        p('Bu simgeler, dugme etiketleri, baglanti metni ve diger tanimlama mekanizmalarini kapsar.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli kullanicilar islevselligi anlamak icin tutarli etiketlemeye guvenirler. Bir yazici simgesi bir sayfada "Yazdir" digirinde "PDF Indir" anlamina gelirse kafa karisikligi olusturur.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Sayfalar arasi etiket tutarliligi manuel inceleme gerektirir.'),

        heading('Nasil test edilir'),
        bullet('Birden fazla sayfada gorunen bilesenleri belirleyin.'),
        bullet('Her bilesenin tum sayfalarda ayni etiket ve erisilebilir adi kullandigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        bullet('Tutarli adlandirma uygulayan bir tasarim sistemi veya bilesen kitapligi olusturun.'),
        bullet('Yaygin eylemler icin standart etiketleri stil kilavuzunuzda belgeleyin.'),

        heading('Sik yapilan hatalar'),
        bullet('Ayni islev icin bazi sayfalarda "Giris Yap" digerlerinde "Oturum Ac" kullanma.'),
        bullet('Sayfalar arasinda dugme etiketlerini degistirme.'),
        bullet('Ayni eylem icin farkli simgeler kullanma.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.4: Consistent Identification', url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html', source: 'W3C', language: 'en', _key: 'r324w3cu' },
      { title: 'G197: Using labels consistently', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G197', source: 'W3C', language: 'en', _key: 'r324g197' },
      { title: 'F31: Using two different labels for same function', url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F31', source: 'W3C', language: 'en', _key: 'r324f31t' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.4 Consistent Identification — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.4 Consistent Identification. Use the same labels and icons for components with the same function across all pages.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.4 Tutarli Tanimlama — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.4 Tutarli Tanimlama kriterini nasil karsilayacaginizi ogrenin. Tum sayfalarda ayni isleve sahip bilesenler icin ayni etiket ve simgeleri kullanin.',
      },
    },
  },

  // ── 3.2.5 Change on Request ──────────────────────────────────────────
  {
    criterionNumber: '3.2.5',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['predictability', 'user-control', 'navigation'],
    title: {
      en: 'Change on Request',
      tr: 'Istek Uzerine Degisiklik',
    },
    description: {
      en: 'Changes of context are initiated only by user request, or a mechanism is available to turn off such changes.',
      tr: 'Baglam degisiklikleri yalnizca kullanici istegi ile baslatilir veya bu degisiklikleri kapatma mekanizmasi mevcuttur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.5 is the AAA version of 3.2.1 and 3.2.2 combined. It requires that ALL context changes — not just those on focus or input — happen only when the user explicitly requests them, or that users can disable automatic context changes.'),
        p('This includes auto-redirects, auto-refreshing pages, auto-opening windows, and any other automatic context change. The user must always be in control.'),

        heading('Why it matters'),
        p('Automatic context changes are disorienting for screen reader users, who may not realize the page has changed. Users with cognitive disabilities may lose track of their task. Giving users full control over context changes ensures a predictable, user-driven experience.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Manual testing is required to identify all automatic context changes.'),

        heading('How to test'),
        bullet('Monitor the page for automatic changes: redirects, refreshes, popups, content replacement.'),
        bullet('Verify that all context changes require explicit user action (click, submit).'),
        bullet('If automatic changes exist, check for a mechanism to disable them.'),
        bullet('Test with JavaScript disabled to identify server-side auto-redirects.'),

        heading('How to fix'),
        code('<!-- Bad: Auto-redirect -->\n<meta http-equiv="refresh" content="5;url=/new-page" />\n\n<!-- Good: Provide a link instead -->\n<p>This page has moved. <a href="/new-page">Go to the new page</a>.</p>\n\n<!-- Bad: Auto-refreshing content -->\n<script>setInterval(() => location.reload(), 30000)</script>\n\n<!-- Good: User-controlled refresh -->\n<button onclick="location.reload()">Refresh data</button>', 'html'),

        heading('Common mistakes'),
        bullet('Using meta refresh to redirect users without providing a link alternative.'),
        bullet('Auto-opening new windows or popups without user action.'),
        bullet('Auto-playing media that changes focus or context.'),
        bullet('Infinite scroll that changes the URL without user action.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.5, 3.2.1 ve 3.2.2 kriterlerinin AAA surumudur. TUM baglam degisikliklerinin yalnizca kullanici acikca istek yaptiginda gerceklesmesini veya kullanicilarin otomatik baglam degisikliklerini devre disi birakabilmesini gerektirir.'),
        p('Bu otomatik yonlendirmeleri, otomatik yenilenen sayfalari, otomatik acilan pencereleri ve diger otomatik baglam degisikliklerini icerir.'),

        heading('Neden onemlidir'),
        p('Otomatik baglam degisiklikleri ekran okuyucu kullanicilari icin yon bozucudur. Bilissel engelli kullanicilar gorevlerinin izini kaybedebilir. Kullanicilara baglam degisiklikleri uzerinde tam kontrol vermek ongorilebilir bir deneyim saglar.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Sayfayi otomatik degisiklikler icin izleyin: yonlendirmeler, yenilemeler, acilir pencereler.'),
        bullet('Tum baglam degisikliklerinin acik kullanici eylemi gerektirdigini dogrulayin.'),
        bullet('Otomatik degisiklikler varsa, bunlari devre disi birakma mekanizmasini kontrol edin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Yanlis: Otomatik yonlendirme -->\n<meta http-equiv="refresh" content="5;url=/yeni-sayfa" />\n\n<!-- Dogru: Baglanti saglayin -->\n<p>Bu sayfa tasindi. <a href="/yeni-sayfa">Yeni sayfaya gidin</a>.</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Baglanti alternatifi saglamadan meta refresh ile yonlendirme.'),
        bullet('Kullanici eylemi olmadan otomatik yeni pencere veya acilir pencere acma.'),
        bullet('Odagi veya baglami degistiren otomatik oynatilan medya.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.5: Change on Request', url: 'https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html', source: 'W3C', language: 'en', _key: 'r325w3cu' },
      { title: 'G76: Providing a mechanism to request auto-update', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G76', source: 'W3C', language: 'en', _key: 'r325g76t' },
      { title: 'F41: Using meta refresh', url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F41', source: 'W3C', language: 'en', _key: 'r325f41t' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.5 Change on Request — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.5 Change on Request. Ensure all context changes happen only when explicitly requested by the user.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.5 Istek Uzerine Degisiklik — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.5 Istek Uzerine Degisiklik kriterini nasil karsilayacaginizi ogrenin. Tum baglam degisikliklerinin yalnizca kullanici istegi ile gerceklesmesini saglayin.',
      },
    },
  },

  // ── 3.2.6 Consistent Help ────────────────────────────────────────────
  {
    criterionNumber: '3.2.6',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['help', 'consistency', 'navigation', 'wcag22'],
    title: {
      en: 'Consistent Help',
      tr: 'Tutarli Yardim',
    },
    description: {
      en: 'If a web page contains help mechanisms, they occur in the same relative order on each page.',
      tr: 'Bir web sayfasi yardim mekanizmalari iceriyorsa, bunlar her sayfada ayni goreli sirada bulunmalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.2.6 (new in WCAG 2.2) requires that if your site provides help mechanisms — contact information, chat widgets, FAQ links, self-help options — these appear in the same relative location and order on every page.'),
        p('Help mechanisms covered include: human contact details (phone, email), human contact mechanisms (chat, messaging), self-help options (FAQ, knowledge base links), and fully automated contact mechanisms (chatbots). The relative order must be consistent, though they don\'t have to be in exactly the same position pixel-by-pixel.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities may struggle to find help if it moves between pages. Consistent placement reduces the cognitive effort needed to access support, which is especially important when users are already frustrated or confused.'),
        p('This criterion directly supports users who may need help completing tasks — those with cognitive, learning, and neurological disabilities.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Consistent help placement must be verified through manual cross-page comparison.'),

        heading('How to test'),
        bullet('Identify all help mechanisms across multiple pages (chat, phone, FAQ link, contact form link).'),
        bullet('Verify they appear in the same relative order on every page.'),
        bullet('Check that the help mechanism is discoverable from every page in the site.'),

        heading('How to fix'),
        code('<!-- Consistent footer help section across all pages -->\n<footer>\n  <div class="help-section">\n    <h2>Need Help?</h2>\n    <ul>\n      <li><a href="/faq">FAQ</a></li>\n      <li><a href="/contact">Contact Us</a></li>\n      <li>Phone: +1 (555) 123-4567</li>\n      <li><button id="chat-trigger">Live Chat</button></li>\n    </ul>\n  </div>\n</footer>\n<!-- Same order: FAQ, Contact, Phone, Chat on EVERY page -->', 'html'),

        heading('Common mistakes'),
        bullet('Placing a chat widget on product pages but not on checkout pages where users most need help.'),
        bullet('Reordering help options between page templates.'),
        bullet('Hiding help mechanisms on certain pages.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.2.6 (WCAG 2.2 ile yeni), siteniz yardim mekanizmalari sagliyorsa — iletisim bilgileri, sohbet bilesenleri, SSS baglantilari, kendi kendine yardim secenekleri — bunlarin her sayfada ayni goreli konumda ve sirada gorunmesini gerektirir.'),
        p('Kapsanan yardim mekanizmalari sunlardir: insan iletisim bilgileri (telefon, e-posta), insan iletisim mekanizmalari (sohbet, mesajlasma), kendi kendine yardim secenekleri (SSS, bilgi bankasi baglantilari) ve tam otomatik iletisim mekanizmalari (sohbet robotlari).'),

        heading('Neden onemlidir'),
        p('Bilissel engelli kullanicilar, yardim sayfalar arasinda yer degistirirse bulmakta zorlanabilir. Tutarli yerlestirme, desteğe erismek icin gereken bilissel cabayI azaltir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Birden fazla sayfada tum yardim mekanizmalarini belirleyin.'),
        bullet('Her sayfada ayni goreli sirada gorunduklarini dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Tum sayfalarda tutarli alt bilgi yardim bolumu -->\n<footer>\n  <div class="yardim-bolumu">\n    <h2>Yardim mi Lazim?</h2>\n    <ul>\n      <li><a href="/sss">SSS</a></li>\n      <li><a href="/iletisim">Bize Ulasin</a></li>\n      <li>Telefon: +90 (212) 123-4567</li>\n    </ul>\n  </div>\n</footer>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Sohbet bilesenini urun sayfalarinda gosterip odeme sayfalarinda gostermeme.'),
        bullet('Sayfa sablonlari arasinda yardim seceneklerini yeniden siralama.'),
        bullet('Belirli sayfalarda yardim mekanizmalarini gizleme.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.2.6: Consistent Help', url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html', source: 'W3C', language: 'en', _key: 'r326w3cu' },
      { title: 'WCAG 2.2 What\'s New', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', source: 'W3C WAI', language: 'en', _key: 'r326new2' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.2.6 Consistent Help — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.2.6 Consistent Help (new in WCAG 2.2). Keep help mechanisms in the same relative order across all pages.',
      },
      tr: {
        metaTitle: 'WCAG 3.2.6 Tutarli Yardim — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.2.6 Tutarli Yardim kriterini nasil karsilayacaginizi ogrenin. Yardim mekanizmalarini tum sayfalarda ayni goreli sirada tutun.',
      },
    },
  },

  // ── 3.3.1 Error Identification ───────────────────────────────────────
  {
    criterionNumber: '3.3.1',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['forms', 'errors', 'validation'],
    title: {
      en: 'Error Identification',
      tr: 'Hata Tanimlama',
    },
    description: {
      en: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
      tr: 'Bir giris hatasi otomatik olarak tespit edildiginde, hatali oge tanimlanir ve hata kullaniciya metin olarak aciklanir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.1 requires that when a form validation error occurs, the system identifies which field has the error and describes the error in text. Color alone is not sufficient — there must be a text message explaining what went wrong.'),
        p('The error message must be programmatically associated with the relevant field (via aria-describedby, aria-errormessage, or proximity) so screen readers can announce it.'),

        heading('Why it matters'),
        p('Users who are blind cannot see red borders or error icons. Users with color blindness may not distinguish red error styling from normal styling. Clear text descriptions of errors enable all users to identify and correct mistakes.'),
        p('Good error identification reduces form abandonment and improves task completion for everyone, including users with cognitive disabilities who may not understand cryptic error codes.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules specifically for error identification. However, rules like label, select-name, and aria-valid-attr-value help ensure form controls are properly labeled for error association.'),

        heading('How to test'),
        bullet('Submit forms with invalid or missing data and verify error messages appear.'),
        bullet('Check that error messages are in text (not just color or icons).'),
        bullet('Verify errors are associated with their fields (aria-describedby, aria-errormessage, or adjacent text).'),
        bullet('Test with a screen reader to confirm errors are announced when the field receives focus.'),
        bullet('Ensure error messages are descriptive — "Email is required" not just "Error".'),

        heading('How to fix'),
        heading('Bad practice', 'h3'),
        code('<!-- Error indicated only by color -->\n<label for="email">Email</label>\n<input type="email" id="email" style="border-color: red" />\n\n<!-- Generic unhelpful error -->\n<p class="error">Error in form.</p>', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- Clear, associated error message -->\n<label for="email">Email</label>\n<input type="email" id="email"\n       aria-invalid="true"\n       aria-describedby="email-error" />\n<p id="email-error" class="error" role="alert">\n  Please enter a valid email address (e.g., name@example.com).\n</p>\n\n<!-- Using aria-errormessage (modern approach) -->\n<label for="phone">Phone</label>\n<input type="tel" id="phone"\n       aria-invalid="true"\n       aria-errormessage="phone-error" />\n<p id="phone-error" class="error">\n  Phone number must be 10 digits.\n</p>', 'html'),

        heading('Common mistakes'),
        bullet('Relying solely on color (red borders) to indicate errors.'),
        bullet('Displaying a single generic error message at the top without identifying specific fields.'),
        bullet('Not associating error messages with their fields programmatically.'),
        bullet('Using error messages that don\'t explain what went wrong or how to fix it.'),
        bullet('Displaying errors in a toast/notification that disappears before the user can read it.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.1, bir form dogrulama hatasi olustigunda, sistemin hangi alanda hata oldugunu tanimlamasini ve hatayi metin olarak aciklamasini gerektirir. Yalnizca renk yeterli degildir — neyin yanlis gittigini aciklayan bir metin mesaji olmalidir.'),
        p('Hata mesaji, ekran okuyucularin duyurabilmesi icin ilgili alanla programatik olarak iliskilendirilmelidir (aria-describedby, aria-errormessage veya yakinlik yoluyla).'),

        heading('Neden onemlidir'),
        p('Gorme engelli kullanicilar kirmizi kenarliklari veya hata simgelerini goremez. Renk korlugu olan kullanicilar kirmizi hata stilini normal stilden ayirt edemeyebilir. Acik hata metin aciklamalari tum kullanicilarin hatalari belirleyip duzeltmesini saglar.'),

        heading('Ilgili axe-core kurallari'),
        p('Hata tanimlama icin ozel otomatik axe-core kurali yoktur. Ancak label, select-name gibi kurallar form kontrollerinin hata iliskilendirmesi icin dogru etiketlendigini dogrulamaya yardimci olur.'),

        heading('Nasil test edilir'),
        bullet('Gecersiz veya eksik verilerle form gonderin ve hata mesajlarinin gorunduguny dogrulayin.'),
        bullet('Hata mesajlarinin metin olarak oldugunun kontrol edin (yalnizca renk veya simge degil).'),
        bullet('Hatalarin alanlariyla iliskilendirildigini dogrulayin.'),
        bullet('Ekran okuyucu ile alan odak aldiginda hatalarin duyuruldugunuun dogrulayin.'),

        heading('Nasil duzeltilir'),
        heading('Yanlis uygulama', 'h3'),
        code('<!-- Yalnizca renkle belirtilen hata -->\n<label for="eposta">E-posta</label>\n<input type="email" id="eposta" style="border-color: red" />', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Acik, iliskilendirilmis hata mesaji -->\n<label for="eposta">E-posta</label>\n<input type="email" id="eposta"\n       aria-invalid="true"\n       aria-describedby="eposta-hata" />\n<p id="eposta-hata" class="error" role="alert">\n  Lutfen gecerli bir e-posta adresi girin (ornegin ad@ornek.com).\n</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Hatalari belirtmek icin yalnizca renge (kirmizi kenarliklar) guvenme.'),
        bullet('Belirli alanlari tanimlamadan ustte tek bir genel hata mesaji gosterme.'),
        bullet('Hata mesajlarini alanlariyla programatik olarak iliskilendirmeme.'),
        bullet('Neyin yanlis gittigini veya nasil duzeltilecegini aciklamayan hata mesajlari kullanma.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.1: Error Identification', url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html', source: 'W3C', language: 'en', _key: 'r331w3cu' },
      { title: 'G83: Providing text descriptions for required fields', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G83', source: 'W3C', language: 'en', _key: 'r331g83t' },
      { title: 'WebAIM: Usable and Accessible Form Validation', url: 'https://webaim.org/techniques/formvalidation/', source: 'WebAIM', language: 'en', _key: 'r331waim' },
      { title: 'MDN: aria-invalid', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid', source: 'MDN', language: 'en', _key: 'r331mdna' },
      { title: 'Deque: Form Error Handling', url: 'https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value', source: 'Deque', language: 'en', _key: 'r331dequ' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.1 Error Identification — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.1 Error Identification. Identify form errors in text and associate them with the relevant fields for screen readers.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.1 Hata Tanimlama — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.1 Hata Tanimlama kriterini nasil karsilayacaginizi ogrenin. Form hatalarini metin olarak tanimlyin ve ekran okuyucular icin ilgili alanlarla iliskilendirin.',
      },
    },
  },

  // ── 3.3.2 Labels or Instructions ─────────────────────────────────────
  {
    criterionNumber: '3.3.2',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['forms', 'labels', 'instructions'],
    title: {
      en: 'Labels or Instructions',
      tr: 'Etiketler veya Talimatlar',
    },
    description: {
      en: 'Labels or instructions are provided when content requires user input.',
      tr: 'Icerik kullanici girisi gerektirdiginde etiketler veya talimatlar saglanir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.2 requires that form fields and interactive controls have labels or instructions that help users understand what input is expected. This goes beyond programmatic labeling (covered by 1.3.1) to include helpful, descriptive text.'),
        p('Labels should clearly indicate what is expected. For fields with specific format requirements (dates, phone numbers), instructions about the expected format should be provided.'),

        heading('Why it matters'),
        p('Without clear labels, users may not know what to enter in a field. This affects screen reader users who rely on labels to understand form fields, and users with cognitive disabilities who need clear guidance.'),
        p('Good labels and instructions reduce errors and form abandonment. They help all users, not just those with disabilities.'),

        heading('Related axe-core rules'),
        p('While label and select-name rules verify programmatic association, this criterion focuses on the quality and helpfulness of label content itself.'),

        heading('How to test'),
        bullet('Verify every form field has a visible label.'),
        bullet('Check that labels clearly describe the expected input.'),
        bullet('Verify format requirements are indicated (e.g., "Date (DD/MM/YYYY)").'),
        bullet('Check required fields are identified before the form, not just with an asterisk.'),
        bullet('Test with a screen reader to confirm labels are announced.'),

        heading('How to fix'),
        heading('Bad practice', 'h3'),
        code('<!-- No label -->\n<input type="text" name="name" />\n\n<!-- Placeholder used as label (disappears on focus) -->\n<input type="email" placeholder="Email" />\n\n<!-- Unclear label with no format hint -->\n<label for="dob">Date</label>\n<input type="text" id="dob" />', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- Clear label -->\n<label for="name">Full name</label>\n<input type="text" id="name" autocomplete="name" />\n\n<!-- Label with format instruction -->\n<label for="dob">Date of birth (DD/MM/YYYY)</label>\n<input type="text" id="dob" autocomplete="bday"\n       pattern="\\d{2}/\\d{2}/\\d{4}" />\n\n<!-- Required field with clear indication -->\n<p>Fields marked with <span aria-hidden="true">*</span>\n   <span class="sr-only">asterisk</span> are required.</p>\n<label for="email">Email <span aria-hidden="true">*</span>\n  <span class="sr-only">(required)</span></label>\n<input type="email" id="email" required\n       autocomplete="email" />', 'html'),

        heading('Common mistakes'),
        bullet('Using placeholder text as the only label — it disappears when the user starts typing.'),
        bullet('Labels that don\'t describe the expected input (e.g., "Field 1", "Input").'),
        bullet('No indication of required fields until the user submits and gets errors.'),
        bullet('Format requirements not mentioned until an error occurs.'),
        bullet('Using icon-only buttons without accessible names.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.2, form alanlari ve etkilesimli kontrollerin kullanicilarin hangi girisin bekledigini anlamasina yardimci olan etiketler veya talimatlara sahip olmasini gerektirir.'),
        p('Etiketler neyin beklendigini acikca belirtmelidir. Belirli birim gereksinimlerine sahip alanlar icin beklenen biçim hakkinda talimatlar saglanmalidir.'),

        heading('Neden onemlidir'),
        p('Acik etiketler olmadan kullanicilar bir alana ne gireceklerini bilemeyebilir. Bu, form alanlarini anlamak icin etiketlere dayanan ekran okuyucu kullanicilarini ve net rehberlige ihtiyac duyan bilissel engelli kullanicilari etkiler.'),

        heading('Ilgili axe-core kurallari'),
        p('label ve select-name kurallari programatik iliskilendirmeyi dogrulasa da, bu kriter etiket iceriginin kalitesi ve yardimciligia odaklanir.'),

        heading('Nasil test edilir'),
        bullet('Her form alaninin gorunen bir etiketi oldugunu dogrulayin.'),
        bullet('Etiketlerin beklenen girisi acikca tanimladigini kontrol edin.'),
        bullet('Biciim gereksinimlerinin belirtildigini dogrulayin.'),
        bullet('Zorunlu alanlarin formdan once tanimlandigini kontrol edin.'),

        heading('Nasil duzeltilir'),
        heading('Yanlis uygulama', 'h3'),
        code('<!-- Etiket yok -->\n<input type="text" name="isim" />\n\n<!-- Yer tutucu etiket olarak (odaklaninca kayboluyor) -->\n<input type="email" placeholder="E-posta" />', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Acik etiket -->\n<label for="isim">Ad Soyad</label>\n<input type="text" id="isim" autocomplete="name" />\n\n<!-- Bicim talimati ile etiket -->\n<label for="dogum">Dogum tarihi (GG/AA/YYYY)</label>\n<input type="text" id="dogum" autocomplete="bday" />', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Yer tutucu metni tek etiket olarak kullanma — kullanici yazmaya basladiginda kaybolur.'),
        bullet('Beklenen girisi tanimlamayan etiketler.'),
        bullet('Kullanici gonderip hata alana kadar zorunlu alanlarin belirtilmemesi.'),
        bullet('Bicim gereksinimlerinin hata olusana kadar belirtilmemesi.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.2: Labels or Instructions', url: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html', source: 'W3C', language: 'en', _key: 'r332w3cu' },
      { title: 'G131: Providing descriptive labels', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G131', source: 'W3C', language: 'en', _key: 'r332g131' },
      { title: 'WebAIM: Creating Accessible Forms', url: 'https://webaim.org/techniques/forms/', source: 'WebAIM', language: 'en', _key: 'r332waim' },
      { title: 'MDN: label element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label', source: 'MDN', language: 'en', _key: 'r332mdnl' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.2 Labels or Instructions — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.2 Labels or Instructions. Provide clear labels and format instructions for all form fields and interactive controls.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.2 Etiketler veya Talimatlar — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.2 Etiketler veya Talimatlar kriterini nasil karsilayacaginizi ogrenin. Tum form alanlari icin acik etiketler ve bicim talimatlari saglayin.',
      },
    },
  },

  // ── 3.3.3 Error Suggestion ───────────────────────────────────────────
  {
    criterionNumber: '3.3.3',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'errors', 'validation', 'suggestions'],
    title: {
      en: 'Error Suggestion',
      tr: 'Hata Onerisi',
    },
    description: {
      en: 'If an input error is automatically detected and suggestions for correction are known, the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
      tr: 'Bir giris hatasi otomatik olarak tespit edildiginde ve duzeltme onerileri bilindiginde, iceriginin guvenligini veya amacini tehlikeye atmadikca oneriler kullaniciya sunulur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.3 builds on 3.3.1 by requiring not just error identification but also suggestions for how to fix the error, when the system can determine a correction. If a user enters an invalid email, the error message should suggest the correct format.'),
        p('Exceptions exist for security-sensitive contexts (e.g., you should not suggest valid passwords or correct CAPTCHA answers).'),

        heading('Why it matters'),
        p('Users with cognitive disabilities, learning disabilities, or limited technical knowledge may not know how to correct an error from the description alone. Providing actionable suggestions significantly improves form completion rates.'),
        p('Error suggestions are also valuable for all users — they reduce frustration and form abandonment.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for error suggestion quality. Manual testing is required.'),

        heading('How to test'),
        bullet('Trigger validation errors with various types of invalid input.'),
        bullet('Check that error messages include specific suggestions for correction.'),
        bullet('Verify suggestions are accurate and actionable.'),
        bullet('Confirm that security-sensitive fields do not reveal valid values in suggestions.'),

        heading('How to fix'),
        heading('Bad practice', 'h3'),
        code('<!-- Vague error with no suggestion -->\n<p class="error">Invalid date.</p>\n\n<!-- Technical error code -->\n<p class="error">Error: VALIDATION_FAILED_FORMAT</p>', 'html'),

        heading('Good practice', 'h3'),
        code('<!-- Specific error with suggestion -->\n<p class="error" id="date-error">\n  The date must be in DD/MM/YYYY format.\n  Example: 15/03/2024\n</p>\n\n<!-- Email suggestion -->\n<p class="error" id="email-error">\n  Please enter a valid email address.\n  Example: name@example.com\n</p>\n\n<!-- Select field suggestion -->\n<p class="error" id="country-error">\n  Please select a country from the list.\n  You entered "Turkye" — did you mean "Turkey"?\n</p>', 'html'),

        heading('Common mistakes'),
        bullet('Error messages that only say "Invalid input" without explaining what is expected.'),
        bullet('Technical error codes shown to end users.'),
        bullet('Not suggesting the correct format for dates, phone numbers, or postal codes.'),
        bullet('Suggesting valid passwords or security answers in error messages.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.3, yalnizca hata tanimlamasinin otesinde, sistem bir duzeltme belirleyebildiginde hatayi nasil duzeltecegine dair oneriler de saglnmasini gerektirir.'),
        p('Guvenlige duyarli baglamlar icin istisnalar mevcuttur — gecerli sifreleri veya CAPTCHA yanitlarini onermemelisiniz.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli veya sinirli teknik bilgiye sahip kullanicilar, yalnizca aciklamadan bir hatayi nasil duzelteceklerini bilemeyebilir. Eyleme donusturulebilir oneriler saglamak form tamamlama oranlarini onemli olcude arttirir.'),

        heading('Ilgili axe-core kurallari'),
        p('Hata onerisi kalitesi icin otomatik axe-core kurali yoktur. Manuel test gerekir.'),

        heading('Nasil test edilir'),
        bullet('Cesitli gecersiz girislerle dogrulama hatalarini tetikleyin.'),
        bullet('Hata mesajlarinin duzeltme icin belirli oneriler icerdigini kontrol edin.'),
        bullet('Onerilerin dogru ve eyleme donusturulebilir oldugunu dogrulayin.'),

        heading('Nasil duzeltilir'),
        heading('Yanlis uygulama', 'h3'),
        code('<!-- Oneri olmayan belirsiz hata -->\n<p class="error">Gecersiz tarih.</p>', 'html'),

        heading('Dogru uygulama', 'h3'),
        code('<!-- Oneri ile belirli hata -->\n<p class="error">\n  Tarih GG/AA/YYYY biciminde olmalidir. Ornek: 15/03/2024\n</p>\n\n<!-- E-posta onerisi -->\n<p class="error">\n  Lutfen gecerli bir e-posta adresi girin.\n  Ornek: ad@ornek.com\n</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Neyin beklendigini aciklamadan yalnizca "Gecersiz giris" diyen hata mesajlari.'),
        bullet('Son kullanicilara gosterilen teknik hata kodlari.'),
        bullet('Tarihler, telefon numaralari icin dogru bicimi onermeme.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.3: Error Suggestion', url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html', source: 'W3C', language: 'en', _key: 'r333w3cu' },
      { title: 'G85: Providing a text description when validation fails', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G85', source: 'W3C', language: 'en', _key: 'r333g85t' },
      { title: 'WebAIM: Form Validation', url: 'https://webaim.org/techniques/formvalidation/', source: 'WebAIM', language: 'en', _key: 'r333waim' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.3 Error Suggestion — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.3 Error Suggestion. Provide actionable correction suggestions when form validation errors are detected.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.3 Hata Onerisi — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.3 Hata Onerisi kriterini nasil karsilayacaginizi ogrenin. Form dogrulama hatalari tespit edildiginde eyleme donusturulebilir duzeltme onerileri saglayin.',
      },
    },
  },

  // ── 3.3.4 Error Prevention (Legal, Financial, Data) ──────────────────
  {
    criterionNumber: '3.3.4',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'errors', 'legal', 'financial', 'data'],
    title: {
      en: 'Error Prevention (Legal, Financial, Data)',
      tr: 'Hata Onleme (Yasal, Finansal, Veri)',
    },
    description: {
      en: 'For web pages that cause legal commitments or financial transactions, submissions are reversible, checked, or confirmed.',
      tr: 'Yasal yukumlulukler veya finansal islemler iceren web sayfalari icin gonderimler geri alinabilir, kontrol edilebilir veya onaylanabilir olmalidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.4 requires that for forms involving legal commitments (contracts, agreements), financial transactions (purchases, transfers), or user-controllable data (deleting an account), at least one of three safeguards is in place: submissions are reversible, data is checked for errors before final submission, or the user can review and confirm before submission.'),
        p('This protects users from costly mistakes that would be difficult or impossible to undo.'),

        heading('Why it matters'),
        p('Users with motor impairments may accidentally click submit. Users with cognitive disabilities may not realize they are committing to a purchase. Screen reader users may miss important details. Error prevention safeguards protect all users from irreversible mistakes.'),
        p('For legal and financial transactions, the consequences of errors can be severe — financial loss, unwanted contracts, or permanent data deletion.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion. Manual review of critical forms is required.'),

        heading('How to test'),
        bullet('Identify all forms that involve legal, financial, or data-deletion actions.'),
        bullet('Verify at least one safeguard: reversibility, error checking, or confirmation step.'),
        bullet('Test the confirmation step with a screen reader to ensure all details are accessible.'),
        bullet('Verify that the undo/cancel mechanism actually works.'),

        heading('How to fix'),
        code('<!-- Confirmation page before final submission -->\n<h2>Review Your Order</h2>\n<table>\n  <tr><td>Product</td><td>Widget Pro</td></tr>\n  <tr><td>Price</td><td>$49.99</td></tr>\n  <tr><td>Shipping</td><td>123 Main St, City</td></tr>\n</table>\n<form action="/submit-order" method="post">\n  <a href="/cart">Go back and edit</a>\n  <button type="submit">Confirm and Pay</button>\n</form>\n\n<!-- Undo mechanism -->\n<div role="alert">\n  <p>Your account has been scheduled for deletion.</p>\n  <button onclick="cancelDeletion()">Undo — Cancel deletion</button>\n  <p>You have 30 days to reverse this action.</p>\n</div>', 'html'),

        heading('Common mistakes'),
        bullet('One-click purchases without any confirmation.'),
        bullet('Permanent data deletion without an undo option or confirmation.'),
        bullet('Confirmation dialogs that don\'t include all relevant details for review.'),
        bullet('No way to go back and edit submitted information.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.4, yasal yukumlulukler, finansal islemler veya kullanici kontrollundeki veri iceren formlar icin en az bir guvenlik onlemi bulunmasini gerektirir: gonderimler geri alinabilir, veriler gonderimden once hatalara karsi kontrol edilir veya kullanici gonderimden once inceleyip onaylayabilir.'),

        heading('Neden onemlidir'),
        p('Motor engellli kullanicilar yanlislikla gonder dugmesine basabilir. Bilissel engelli kullanicilar bir satin alma islemine taahhut ettiklerini fark etmeyebilir. Hata onleme guvenlik onlemleri tum kullanicilari geri alinamaz hatalardan korur.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Yasal, finansal veya veri silme eylemleri iceren tum formlari belirleyin.'),
        bullet('En az bir guvenlik onlemi bulundugun dogrulayin: geri alinabilirlik, hata kontrolu veya onay adimi.'),
        bullet('Geri alma/iptal mekanizmasinin gercekten calistigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Son gonderim oncesi onay sayfasi -->\n<h2>Siparisiniizi Inceleyin</h2>\n<table>\n  <tr><td>Urun</td><td>Widget Pro</td></tr>\n  <tr><td>Fiyat</td><td>49,99 $</td></tr>\n</table>\n<form action="/siparis-gonder" method="post">\n  <a href="/sepet">Geri don ve duzenle</a>\n  <button type="submit">Onayla ve Ode</button>\n</form>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Onay olmadan tek tikla satin alma.'),
        bullet('Geri alma secenegi veya onay olmadan kalici veri silme.'),
        bullet('Inceleme icin tum ilgili ayrintilari icermeyen onay iletisim kutulari.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.4: Error Prevention', url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html', source: 'W3C', language: 'en', _key: 'r334w3cu' },
      { title: 'G98: Providing ability to review and correct', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G98', source: 'W3C', language: 'en', _key: 'r334g98t' },
      { title: 'G164: Providing a time period to correct', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G164', source: 'W3C', language: 'en', _key: 'r334g164' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.4 Error Prevention — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.4 Error Prevention. Provide reversibility, error checking, or confirmation for legal, financial, and data-sensitive forms.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.4 Hata Onleme — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.4 Hata Onleme kriterini nasil karsilayacaginizi ogrenin. Yasal, finansal ve veriye duyarli formlar icin geri alinabilirlik, hata kontrolu veya onay saglayin.',
      },
    },
  },

  // ── 3.3.5 Help ───────────────────────────────────────────────────────
  {
    criterionNumber: '3.3.5',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'minor',
    axeRuleIds: [],
    tags: ['forms', 'help', 'instructions'],
    title: { en: 'Help', tr: 'Yardim' },
    description: {
      en: 'Context-sensitive help is available.',
      tr: 'Baglama duyarli yardim mevcuttur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.5 requires that context-sensitive help is available for form fields and interactive components. This means users can get help specific to the task they are performing, not just a general help page.'),
        p('Help can be provided through tooltips, inline instructions, help icons that expand content, or links to relevant help topics.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities may need extra guidance to complete forms correctly. Context-sensitive help reduces errors and supports task completion without requiring users to leave the current page.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion.'),

        heading('How to test'),
        bullet('Identify complex form fields that might need additional guidance.'),
        bullet('Verify context-sensitive help is available for those fields.'),
        bullet('Check that help content is accessible to screen readers and keyboard users.'),
        bullet('Ensure help does not obscure the field it relates to.'),

        heading('How to fix'),
        code('<!-- Inline help text -->\n<label for="cvv">CVV</label>\n<input type="text" id="cvv" aria-describedby="cvv-help" />\n<p id="cvv-help" class="help-text">\n  The 3-digit number on the back of your card.\n</p>\n\n<!-- Expandable help -->\n<label for="tax-id">Tax ID</label>\n<input type="text" id="tax-id" />\n<details>\n  <summary>What is a Tax ID?</summary>\n  <p>Your Tax Identification Number (TIN) is a 9-digit\n     number assigned by the IRS...</p>\n</details>', 'html'),

        heading('Common mistakes'),
        bullet('Only providing a generic FAQ page without context-sensitive help.'),
        bullet('Help tooltips that are not keyboard accessible.'),
        bullet('Help content that covers the input field.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.5, form alanlari ve etkilesimli bilesenler icin baglama duyarli yardimin mevcut olmasini gerektirir. Kullanicilar genel bir yardim sayfasi yerine gerceklestirdikleri goreve ozgu yardim alabilmelidir.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli kullanicilar formlari dogru tamamlamak icin ek rehberlige ihtiyac duyabilir. Baglama duyarli yardim hatalari azaltir ve gorev tamamlamayi destekler.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Ek rehberlik gerektirebilecek karmasik form alanlarini belirleyin.'),
        bullet('Bu alanlar icin baglama duyarli yardim mevcut oldugunu dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Satir ici yardim metni -->\n<label for="cvv">CVV</label>\n<input type="text" id="cvv" aria-describedby="cvv-yardim" />\n<p id="cvv-yardim" class="help-text">\n  Kartinizin arkasindaki 3 haneli numara.\n</p>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Baglama duyarli yardim olmadan yalnizca genel SSS sayfasi saglama.'),
        bullet('Klavye ile erisilebilir olmayan yardim araç ipuclari.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.5: Help', url: 'https://www.w3.org/WAI/WCAG22/Understanding/help.html', source: 'W3C', language: 'en', _key: 'r335w3cu' },
      { title: 'G71: Providing a help link on every page', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G71', source: 'W3C', language: 'en', _key: 'r335g71t' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.5 Help — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.5 Help. Provide context-sensitive help for form fields and interactive components.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.5 Yardim — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.5 Yardim kriterini nasil karsilayacaginizi ogrenin. Form alanlari ve etkilesimli bilesenler icin baglama duyarli yardim saglayin.',
      },
    },
  },

  // ── 3.3.6 Error Prevention (All) ─────────────────────────────────────
  {
    criterionNumber: '3.3.6',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'errors', 'prevention'],
    title: {
      en: 'Error Prevention (All)',
      tr: 'Hata Onleme (Tumu)',
    },
    description: {
      en: 'For web pages that require the user to submit information, submissions are reversible, checked, or confirmed.',
      tr: 'Kullanicinin bilgi gondermesini gerektiren web sayfalari icin gonderimler geri alinabilir, kontrol edilebilir veya onaylanabilir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.6 extends 3.3.4 to ALL forms, not just those with legal/financial/data consequences. Every form submission should be reversible, checked for errors, or include a confirmation step.'),
        p('This is the AAA enhancement — while 3.3.4 requires this only for high-stakes forms, 3.3.6 applies it universally.'),

        heading('Why it matters'),
        p('Any form submission can cause problems for users with disabilities. A contact form, a search, a feedback submission — all benefit from error prevention safeguards. This criterion ensures the highest level of protection against user errors.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion.'),

        heading('How to test'),
        bullet('Identify all forms that submit user data.'),
        bullet('Verify at least one safeguard exists for each: reversibility, validation, or confirmation.'),

        heading('How to fix'),
        p('Apply the same techniques as 3.3.4 to all forms: confirmation pages, undo mechanisms, client-side validation before submission, and review steps.'),

        heading('Common mistakes'),
        bullet('Simple forms (contact, feedback) that submit without any confirmation.'),
        bullet('Search forms that navigate away without the ability to refine or go back.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.6, 3.3.4 kriterini yalnizca yasal/finansal/veri formlarindan TUM formlara genisletir. Her form gonderimi geri alinabilir, hata icin kontrol edilmis veya onay adimi icermis olmalidir.'),

        heading('Neden onemlidir'),
        p('Herhangi bir form gonderimi engelli kullanicilar icin sorunlara neden olabilir. Bu kriter kullanici hatalarina karsi en yuksek duzey koruma saglar.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Kullanici verisi gonderen tum formlari belirleyin.'),
        bullet('Her biri icin en az bir guvenlik onlemi bulundugun dogrulayin.'),

        heading('Nasil duzeltilir'),
        p('3.3.4 ile ayni teknikleri tum formlara uygulayin: onay sayfalari, geri alma mekanizmalari, istemci tarafi dogrulama ve inceleme adimlari.'),

        heading('Sik yapilan hatalar'),
        bullet('Onay olmadan gonderim yapan basit formlar (iletisim, geri bildirim).'),
        bullet('Iyilestirme veya geri donme imkani olmadan sayfa degistiren arama formlari.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.6: Error Prevention (All)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all.html', source: 'W3C', language: 'en', _key: 'r336w3cu' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.6 Error Prevention (All) — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.6 Error Prevention (All). Apply reversibility, error checking, or confirmation to all form submissions.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.6 Hata Onleme (Tumu) — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.6 Hata Onleme (Tumu) kriterini nasil karsilayacaginizi ogrenin. Tum form gonderimlerine geri alinabilirlik, hata kontrolu veya onay uygulayin.',
      },
    },
  },

  // ── 3.3.7 Redundant Entry ────────────────────────────────────────────
  {
    criterionNumber: '3.3.7',
    level: 'A',
    principle: 'understandable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['forms', 'input', 'efficiency', 'wcag22'],
    title: {
      en: 'Redundant Entry',
      tr: 'Gereksiz Tekrar Girisi',
    },
    description: {
      en: 'Information previously entered by or provided to the user that is required to be entered again in the same process is either auto-populated or available for the user to select.',
      tr: 'Kullanici tarafindan daha once girilen veya saglan bilginin ayni surec icinde tekrar girilmesi gerektiginde, bilgi otomatik olarak doldurulur veya kullanicinin secebilmesi icin sunulur.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.7 (new in WCAG 2.2) requires that when users need to re-enter information they already provided during the same process, the system either auto-fills it or makes it available to select. Users should not have to type the same information twice.'),
        p('Exceptions exist for security purposes (re-entering a password to confirm), when previously entered information is no longer valid, and when the information is essential for security.'),

        heading('Why it matters'),
        p('Re-entering information is a significant barrier for users with cognitive disabilities, motor impairments, and anyone using assistive technology. Each additional input increases the chance of error and the cognitive load on the user.'),
        p('Multi-step forms that ask for the same address, name, or email multiple times create frustration and increase abandonment rates.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion.'),

        heading('How to test'),
        bullet('Complete multi-step forms and note when information must be re-entered.'),
        bullet('Verify that previously entered data is auto-populated or selectable.'),
        bullet('Check that shipping/billing address flows offer a "same as shipping" option.'),

        heading('How to fix'),
        code('<!-- Auto-populate from previous step -->\n<label for="confirm-email">Confirm email</label>\n<input type="email" id="confirm-email"\n       value="user@example.com" readonly />\n\n<!-- Checkbox to reuse data -->\n<fieldset>\n  <legend>Billing Address</legend>\n  <label>\n    <input type="checkbox" id="same-address"\n           onchange="copyShippingToBilling()" />\n    Same as shipping address\n  </label>\n  <!-- billing fields -->\n</fieldset>\n\n<!-- Select from previously entered data -->\n<label for="address-select">Select an address</label>\n<select id="address-select">\n  <option>123 Main St (from Step 1)</option>\n  <option>Enter a new address</option>\n</select>', 'html'),

        heading('Common mistakes'),
        bullet('Asking for the same email address on multiple steps of a checkout flow.'),
        bullet('Requiring re-entry of address when billing matches shipping.'),
        bullet('Not preserving entered data when users navigate back and forward in a multi-step form.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.7 (WCAG 2.2 ile yeni), kullanicilarin ayni surec sirasinda daha once sagladiklari bilgileri tekrar girmeleri gerektiginde, sistemin bunu otomatik doldurmasini veya secim icin sunmasini gerektirir.'),
        p('Guvenlik amaclari (sifreyi onaylamak icin tekrar girme) ve daha once girilen bilgilerin artik gecerli olmadigi durumlar icin istisnalar mevcuttur.'),

        heading('Neden onemlidir'),
        p('Bilgiyi tekrar girme, bilissel engelli kullanicilar, motor engelli kullanicilar ve yardimci teknoloji kullanan herkes icin onemli bir engeldir. Her ek giris hata sansini ve kullanici uzerindeki bilissel yuku arttirir.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Cok adimli formlari tamamlayin ve bilginin tekrar girilmesi gereken yerleri belirleyin.'),
        bullet('Daha once girilen verilerin otomatik dolduruldugunu veya secilebilir oldugunu dogrulayin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Veriyi yeniden kullanmak icin onay kutusu -->\n<fieldset>\n  <legend>Fatura Adresi</legend>\n  <label>\n    <input type="checkbox" id="ayni-adres" />\n    Kargo adresiyle ayni\n  </label>\n</fieldset>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Odeme akisinin birden fazla adiminda ayni e-posta adresini sorma.'),
        bullet('Fatura ve kargo adresi eslestiginde adresin tekrar girilmesini isteme.'),
        bullet('Cok adimli formda ileri geri gezinirken girilen verileri korumama.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.7: Redundant Entry', url: 'https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html', source: 'W3C', language: 'en', _key: 'r337w3cu' },
      { title: 'WCAG 2.2 What\'s New', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', source: 'W3C WAI', language: 'en', _key: 'r337new2' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.7 Redundant Entry — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.7 Redundant Entry (new in WCAG 2.2). Auto-populate or offer previously entered information to avoid redundant data entry.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.7 Gereksiz Tekrar Girisi — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.7 Gereksiz Tekrar Girisi kriterini nasil karsilayacaginizi ogrenin. Gereksiz veri girisini onlemek icin daha once girilen bilgileri otomatik doldurun veya sunun.',
      },
    },
  },

  // ── 3.3.8 Accessible Authentication (Minimum) ───────────────────────
  {
    criterionNumber: '3.3.8',
    level: 'AA',
    principle: 'understandable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['authentication', 'cognitive', 'forms', 'wcag22'],
    title: {
      en: 'Accessible Authentication (Minimum)',
      tr: 'Erisilebilir Kimlik Dogrulama (Minimum)',
    },
    description: {
      en: 'A cognitive function test is not required for any step in an authentication process unless an alternative or assistance mechanism is provided.',
      tr: 'Bir alternatif veya yardim mekanizmasi saglanmadikca, kimlik dogrulama surecinin hicbir adiminda bilissel islev testi gerekli degildir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.8 (new in WCAG 2.2) requires that authentication processes do not rely on cognitive function tests — memorizing passwords, solving puzzles, transcribing codes — unless an alternative is provided. Users must be able to authenticate without relying on memory, transcription, or pattern recognition.'),
        p('Acceptable alternatives include: password managers (copy/paste must work), passkeys/WebAuthn, email/SMS magic links, OAuth/SSO, and biometric authentication. The key is that the user does not have to recall or transcribe information from memory.'),

        heading('Why it matters'),
        p('Users with cognitive disabilities, memory impairments, and learning disabilities may be unable to remember passwords or complete CAPTCHA challenges. Authentication barriers lock these users out of services entirely.'),
        p('This criterion ensures that at least one authentication path does not require cognitive function tests, making services accessible to people with cognitive disabilities.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion.'),

        heading('How to test'),
        bullet('Identify all authentication steps (login, 2FA, CAPTCHA, email verification).'),
        bullet('For each step, determine if a cognitive function test is required.'),
        bullet('Verify at least one authentication path that does not require memory, transcription, or pattern recognition.'),
        bullet('Ensure password fields allow paste (for password manager use).'),
        bullet('Check that CAPTCHA has an accessible alternative.'),

        heading('How to fix'),
        code('<!-- Allow password paste for password managers -->\n<label for="password">Password</label>\n<input type="password" id="password"\n       autocomplete="current-password" />\n<!-- Do NOT add onpaste="return false" -->\n\n<!-- Provide magic link alternative -->\n<form action="/login" method="post">\n  <label for="email">Email</label>\n  <input type="email" id="email" autocomplete="email" />\n  <button type="submit">Send login link</button>\n</form>\n<p>We will email you a link to sign in —\n   no password needed.</p>\n\n<!-- WebAuthn/passkey option -->\n<button onclick="startWebAuthn()">\n  Sign in with passkey\n</button>', 'html'),

        heading('Common mistakes'),
        bullet('Disabling paste on password fields, preventing password manager use.'),
        bullet('Requiring CAPTCHA without an accessible alternative (audio CAPTCHA alone is not sufficient).'),
        bullet('Requiring users to transcribe a code from one device to another without copy/paste.'),
        bullet('Using image-based authentication (pick the right image) without an alternative.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.8 (WCAG 2.2 ile yeni), bir alternatif saglanmadikca kimlik dogrulama sureclerinin bilissel islev testlerine — sifre ezberleme, bulmaca cozme, kod kopyalama — dayaanmamasini gerektirir.'),
        p('Kabul edilebilir alternatifler sunlardir: sifre yoneticileri (kopyala/yapistir calismalidir), gecis anahtarlari/WebAuthn, e-posta/SMS sihirli baglantilar, OAuth/SSO ve biyometrik kimlik dogrulama.'),

        heading('Neden onemlidir'),
        p('Bilissel engelli, hafiza bozuklugu ve ogrenme guclugu olan kullanicilar sifreleri hatirlayamayabilir veya CAPTCHA zorluklarini tamamlayamayabilir. Kimlik dogrulama engelleri bu kullanicilari hizmetlerden tamamen kilitler.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Tum kimlik dogrulama adimlarini belirleyin (giris, 2FA, CAPTCHA).'),
        bullet('Her adim icin bilissel islev testi gerekip gerekmedini belirleyin.'),
        bullet('Hafiza veya kopyalama gerektirmeyen en az bir kimlik dogrulama yolu bulundugunuu dogrulayin.'),
        bullet('Sifre alanlarinin yapistirmaya izin verdigini kontrol edin.'),

        heading('Nasil duzeltilir'),
        code('<!-- Sifre yoneticileri icin yapistirmaya izin verin -->\n<label for="sifre">Sifre</label>\n<input type="password" id="sifre"\n       autocomplete="current-password" />\n\n<!-- Sihirli baglanti alternatifi -->\n<form action="/giris" method="post">\n  <label for="eposta">E-posta</label>\n  <input type="email" id="eposta" autocomplete="email" />\n  <button type="submit">Giris baglantisi gonder</button>\n</form>', 'html'),

        heading('Sik yapilan hatalar'),
        bullet('Sifre alanlarinda yapistirmayi devre disi birakma.'),
        bullet('Erisilebilir alternatif olmadan CAPTCHA isteme.'),
        bullet('Kopyala/yapistir olmadan bir cihazdan digerine kod kopyalama isteme.'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.8: Accessible Authentication', url: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html', source: 'W3C', language: 'en', _key: 'r338w3cu' },
      { title: 'WCAG 2.2 What\'s New', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', source: 'W3C WAI', language: 'en', _key: 'r338new2' },
      { title: 'WebAuthn Guide', url: 'https://webauthn.guide/', source: 'WebAuthn', language: 'en', _key: 'r338waut' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.8 Accessible Authentication — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.8 Accessible Authentication (new in WCAG 2.2). Ensure authentication does not rely on cognitive function tests.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.8 Erisilebilir Kimlik Dogrulama — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.8 Erisilebilir Kimlik Dogrulama kriterini nasil karsilayacaginizi ogrenin. Kimlik dogrulamanin bilissel islev testlerine dayanmamasini saglayin.',
      },
    },
  },

  // ── 3.3.9 Accessible Authentication (Enhanced) ──────────────────────
  {
    criterionNumber: '3.3.9',
    level: 'AAA',
    principle: 'understandable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['authentication', 'cognitive', 'forms', 'wcag22'],
    title: {
      en: 'Accessible Authentication (Enhanced)',
      tr: 'Erisilebilir Kimlik Dogrulama (Gelistirilmis)',
    },
    description: {
      en: 'A cognitive function test is not required for any step in an authentication process.',
      tr: 'Kimlik dogrulama surecinin hicbir adiminda bilissel islev testi gerekli degildir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 3.3.9 (new in WCAG 2.2) is the AAA enhancement of 3.3.8. While 3.3.8 allows cognitive tests if an alternative is provided, 3.3.9 prohibits cognitive function tests entirely in authentication — no exceptions for object recognition or personal content.'),
        p('This means no CAPTCHA of any kind (including image selection), no security questions, and no password recall without password manager support. Authentication must be fully achievable without cognitive effort.'),

        heading('Why it matters'),
        p('This provides the highest level of authentication accessibility. It ensures that users with severe cognitive disabilities can authenticate without any cognitive barriers whatsoever.'),

        heading('Related axe-core rules'),
        p('There are no automated axe-core rules for this criterion.'),

        heading('How to test'),
        bullet('Review every authentication step for any cognitive requirement.'),
        bullet('Verify that no step requires memory, transcription, pattern recognition, or puzzle solving.'),
        bullet('Confirm authentication works with passkeys, biometrics, or magic links alone.'),

        heading('How to fix'),
        p('Implement fully cognitive-test-free authentication:'),
        bullet('Use WebAuthn/passkeys as the primary authentication method.'),
        bullet('Offer biometric authentication (fingerprint, face recognition).'),
        bullet('Provide magic link (email-based) authentication.'),
        bullet('Support OAuth/SSO from providers that offer accessible auth.'),
        bullet('Remove all CAPTCHA, security questions, and image-based verification.'),

        heading('Common mistakes'),
        bullet('Relying on CAPTCHA even with an "accessible" audio alternative.'),
        bullet('Security questions that require memory recall.'),
        bullet('Image-based verification (select all traffic lights).'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor'),
        p('WCAG 3.3.9 (WCAG 2.2 ile yeni), 3.3.8 kriterinin AAA gelistirmesidir. 3.3.8 alternatif saglanirsa bilissel testlere izin verirken, 3.3.9 kimlik dogrulamada bilissel islev testlerini tamamen yasaklar.'),
        p('Bu, hicbir CAPTCHA (gorsel secim dahil), guvenlik sorusu ve sifre yoneticisi destegi olmadan sifre hatirlama olmamasi anlamina gelir.'),

        heading('Neden onemlidir'),
        p('Bu, en yuksek duzey kimlik dogrulama erisilebilirligini saglar. Ciddi bilissel engelli kullanicilarin hicbir bilissel engel olmadan kimlik dogrulama yapabilmesini garanti eder.'),

        heading('Ilgili axe-core kurallari'),
        p('Bu kriter icin otomatik axe-core kurali yoktur.'),

        heading('Nasil test edilir'),
        bullet('Her kimlik dogrulama adimini bilissel gereksinim icin inceleyin.'),
        bullet('Hicbir adimin hafiza, kopyalama, oruntu tanima veya bulmaca cozme gerektirmedigini dogrulayin.'),

        heading('Nasil duzeltilir'),
        bullet('Birincil kimlik dogrulama yontemi olarak WebAuthn/gecis anahtarlarini kullanin.'),
        bullet('Biyometrik kimlik dogrulama sunun.'),
        bullet('Sihirli baglanti (e-posta tabanli) kimlik dogrulama saglayin.'),
        bullet('Tum CAPTCHA, guvenlik soruları ve gorsel tabanli dogrulamayi kaldirin.'),

        heading('Sik yapilan hatalar'),
        bullet('"Erisilebilir" sesli alternatifi olsa bile CAPTCHA ya guvenme.'),
        bullet('Hafiza hatirlama gerektiren guvenlik sorulari.'),
        bullet('Gorsel tabanli dogrulama (tum trafik isIklarini secin).'),
      ],
    },

    resources: [
      { title: 'Understanding SC 3.3.9: Accessible Authentication (Enhanced)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html', source: 'W3C', language: 'en', _key: 'r339w3cu' },
      { title: 'WCAG 2.2 What\'s New', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', source: 'W3C WAI', language: 'en', _key: 'r339new2' },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 3.3.9 Accessible Authentication (Enhanced) — Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 3.3.9 Accessible Authentication Enhanced (new in WCAG 2.2). Eliminate all cognitive function tests from authentication.',
      },
      tr: {
        metaTitle: 'WCAG 3.3.9 Erisilebilir Kimlik Dogrulama (Gelistirilmis) — Erisilebilirlik Rehberi',
        metaDescription: 'WCAG 3.3.9 Erisilebilir Kimlik Dogrulama (Gelistirilmis) kriterini nasil karsilayacaginizi ogrenin. Kimlik dogrulamadan tum bilissel islev testlerini kaldirin.',
      },
    },
  },
]

export default rules
