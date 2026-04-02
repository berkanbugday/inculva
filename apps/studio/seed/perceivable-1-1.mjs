import { p, heading, bullet, code, blockquote } from './helpers.mjs'

export default [
  {
    criterionNumber: '1.1.1',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [
      'image-alt',
      'input-image-alt',
      'area-alt',
      'object-alt',
      'svg-img-alt',
      'role-img-alt',
      'image-redundant-alt',
    ],
    tags: ['images', 'forms', 'media', 'aria'],

    title: {
      en: 'Non-text Content',
      tr: 'Metin Disi Icerik',
    },

    description: {
      en: 'All non-text content presented to the user has a text alternative that serves the equivalent purpose.',
      tr: 'Kullaniciya sunulan tum metin disi iceriklerin, ayni amaci karsilayan bir metin alternatifi bulunmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 1.1.1 requires that every piece of non-text content — images, icons, charts, audio, video, CAPTCHA, and decorative graphics — has a text alternative that conveys the same information or function. Screen readers, braille displays, and search engines all rely on these text alternatives to understand visual content.'
        ),
        p(
          'The text alternative must serve the equivalent purpose as the non-text content. For an informative photograph, that means describing what the image communicates. For a functional button, it means stating the action the button performs. For purely decorative items, it means explicitly marking them so assistive technology can skip them.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Approximately 2.2 billion people worldwide have some form of vision impairment. When a screen reader encounters an image without alt text, it typically announces the file name — something like "DSC_0042.jpg" — which provides no useful information. Users who rely on text-to-speech, braille output, or text-only browsers are completely locked out of meaning conveyed through images.'
        ),
        p(
          'Beyond accessibility, text alternatives improve SEO ranking, support users on slow connections who disable images, and provide fallback content when images fail to load. Proper alt text is one of the highest-impact, lowest-effort accessibility improvements you can make.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('image-alt — Ensures <img> elements have alternative text.'),
        bullet('input-image-alt — Ensures <input type="image"> elements have alternative text.'),
        bullet('area-alt — Ensures <area> elements within an image map have alternative text.'),
        bullet('object-alt — Ensures <object> elements have alternative text.'),
        bullet('svg-img-alt — Ensures SVG elements with an img role have an accessible name.'),
        bullet('role-img-alt — Ensures elements with role="img" have alternative text.'),
        bullet('image-redundant-alt — Ensures alt text is not duplicated as adjacent text content.'),

        heading('How to test', 'h2'),
        p(
          'Start by running an automated scan with axe-core or Lighthouse. These tools catch missing alt attributes reliably. However, automated tools cannot judge whether alt text is accurate or meaningful — that requires manual review.'
        ),
        bullet('Run axe DevTools or Lighthouse in Chrome DevTools and review the image-alt findings.'),
        bullet('Use the Web Developer Toolbar to replace images with their alt text and verify the page still makes sense.'),
        bullet('Navigate the page with a screen reader (NVDA, VoiceOver, or JAWS) and confirm every image is announced with useful information.'),
        bullet('Check that decorative images are hidden from assistive technology using alt="" or role="presentation".'),
        bullet('Inspect SVGs, <object> elements, and image maps — these are commonly missed in automated checks.'),

        heading('How to fix', 'h2'),
        p('Below are correct and incorrect implementations for the most common non-text content patterns.'),

        heading('Images — bad practice', 'h3'),
        code(
          '<!-- Missing alt attribute entirely -->\n<img src="team-photo.jpg">\n\n<!-- Empty alt on an informative image -->\n<img src="quarterly-chart.png" alt="">\n\n<!-- File name or generic text as alt -->\n<img src="hero.jpg" alt="hero.jpg">\n<img src="banner.png" alt="image">',
          'html'
        ),

        heading('Images — good practice', 'h3'),
        code(
          '<!-- Informative image with descriptive alt -->\n<img src="team-photo.jpg" alt="The Inculva engineering team at the 2025 accessibility summit">\n\n<!-- Chart with meaningful description -->\n<img src="quarterly-chart.png" alt="Q3 revenue grew 18% compared to Q2, reaching $4.2M">\n\n<!-- Decorative image correctly hidden -->\n<img src="decorative-swirl.svg" alt="" role="presentation">',
          'html'
        ),

        heading('SVG elements', 'h3'),
        code(
          '<!-- Bad: SVG with no accessible name -->\n<svg viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Good: SVG with role and aria-label -->\n<svg role="img" aria-label="Checkmark icon indicating success" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Good: Decorative SVG hidden from AT -->\n<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>',
          'html'
        ),

        heading('Input type="image" and image maps', 'h3'),
        code(
          '<!-- Bad: input image with no alt -->\n<input type="image" src="search-icon.png">\n\n<!-- Good: input image with descriptive alt -->\n<input type="image" src="search-icon.png" alt="Search">\n\n<!-- Bad: area without alt -->\n<map name="nav">\n  <area shape="rect" coords="0,0,100,50" href="/about">\n</map>\n\n<!-- Good: area with alt text -->\n<map name="nav">\n  <area shape="rect" coords="0,0,100,50" href="/about" alt="About us">\n</map>',
          'html'
        ),

        heading('Object and embed elements', 'h3'),
        code(
          '<!-- Bad: object with no text alternative -->\n<object data="animation.swf" type="application/x-shockwave-flash"></object>\n\n<!-- Good: object with fallback text -->\n<object data="animation.swf" type="application/x-shockwave-flash">\n  <p>Animated demonstration of the checkout flow showing three steps: cart review, payment, and confirmation.</p>\n</object>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using the file name as alt text (e.g., alt="IMG_3021.jpg").'),
        bullet('Writing "image of" or "picture of" in alt text — screen readers already announce the element as an image.'),
        bullet('Giving decorative images descriptive alt text, which adds noise for screen reader users.'),
        bullet('Leaving alt text empty on informative images such as charts, diagrams, or product photos.'),
        bullet('Duplicating adjacent visible text in the alt attribute, causing screen readers to repeat the same content.'),
        bullet('Forgetting alt text on <area> elements inside image maps — these are interactive and need labels.'),
        bullet('Using CSS background images for meaningful content without providing a text alternative in the DOM.'),
        bullet('Writing overly long alt text (150+ words) instead of using a short alt with a longer description via aria-describedby or a linked description page.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 1.1.1, kullaniciya sunulan her metin disi icerigin — gorseller, simgeler, grafikler, ses ve video dosyalari, CAPTCHA ve dekoratif ogeler — ayni bilgiyi veya islevi tasiyan bir metin alternatifine sahip olmasini gerektirir. Ekran okuyucular, braille ekranlar ve arama motorlari gorsel icerigi anlamak icin bu metin alternatiflerine basvurur.'
        ),
        p(
          'Metin alternatifi, metin disi icerigin sundugu amacin ayrisini karsilamalidir. Bilgi veren bir fotograf icin gorselin ilettigi mesaj betimlenmeli, islevsel bir dugme icin dugmenin gerceklestirdigi eylem belirtilmeli, tamamen dekoratif ogeler icin ise yardimci teknolojinin bunlari atlayabilmesi saglanmalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Dunya genelinde yaklasik 2,2 milyar kisinin bir tur gorme bozuklugu bulunmaktadir. Bir ekran okuyucu alt metni olmayan bir gorselle karsilastiginda genellikle dosya adini okur — ornegin "DSC_0042.jpg" — ve bu kullaniciya hicbir faydali bilgi saglamaz. Metinden sese, braille cikisa veya yalnizca metin tabanli tarayicilara dayanan kullanicilar, gorseller araciligiyla iletilen anlamdan tamamen mahrum kalir.'
        ),
        p(
          'Erisilebilirligin otesinde, metin alternatifleri arama motoru optimizasyonunu iyilestirir, yavas baglantilarda gorselleri devre disi birakan kullanicilari destekler ve gorseller yuklenemediginde yedek icerik saglar. Dogru alt metni, yapabileceginiz en etkili ve en az efor gerektiren erisilebilirlik iyilestirmelerinden biridir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('image-alt — <img> ogelerinin metin alternatifine sahip olmasini dogrular.'),
        bullet('input-image-alt — <input type="image"> ogelerinin metin alternatifine sahip olmasini dogrular.'),
        bullet('area-alt — Gorsel haritasi icindeki <area> ogelerinin metin alternatifine sahip olmasini dogrular.'),
        bullet('object-alt — <object> ogelerinin metin alternatifine sahip olmasini dogrular.'),
        bullet('svg-img-alt — img rolune sahip SVG ogelerinin erisilebilir bir ada sahip olmasini dogrular.'),
        bullet('role-img-alt — role="img" atanmis ogelerin metin alternatifine sahip olmasini dogrular.'),
        bullet('image-redundant-alt — Alt metninin bitisik metin icerigiyle ayni olmamasini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        p(
          'Oncelikle axe-core veya Lighthouse ile otomatik bir tarama yapin. Bu araclar eksik alt niteliklerini guvenilir bicimde yakalar. Ancak otomatik araclar alt metninin dogru veya anlamli olup olmadigini degerlenderemez — bu, elle inceleme gerektirir.'
        ),
        bullet('Chrome DevTools icinde axe DevTools veya Lighthouse calistirin ve image-alt bulgularini inceleyin.'),
        bullet('Web Developer Toolbar ile gorselleri alt metinleriyle degistirin ve sayfanin hala anlamli olup olmadigini dogrulayin.'),
        bullet('Sayfada bir ekran okuyucu (NVDA, VoiceOver veya JAWS) ile gezinin ve her gorselin faydali bilgiyle duyuruldugundan emin olun.'),
        bullet('Dekoratif gorsellerin alt="" veya role="presentation" ile yardimci teknolojiden gizlendigini kontrol edin.'),
        bullet('SVG, <object> ogeleri ve gorsel haritalarini inceleyin — bunlar otomatik kontrollerde siklikla gozden kacar.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Asagida en yaygin metin disi icerik kaliplari icin dogru ve yanlis uygulamalar yer almaktadir.'),

        heading('Gorseller — yanlis uygulama', 'h3'),
        code(
          '<!-- alt niteligi tamamen eksik -->\n<img src="takim-fotografi.jpg">\n\n<!-- Bilgilendirici gorselde bos alt -->\n<img src="ceyrek-grafigi.png" alt="">\n\n<!-- Dosya adi veya genel metin alt olarak kullanilmis -->\n<img src="hero.jpg" alt="hero.jpg">\n<img src="banner.png" alt="gorsel">',
          'html'
        ),

        heading('Gorseller — dogru uygulama', 'h3'),
        code(
          '<!-- Aciklayici alt metni olan bilgilendirici gorsel -->\n<img src="takim-fotografi.jpg" alt="Inculva muhendislik ekibi 2025 erisilebilirlik zirvesinde">\n\n<!-- Anlamli aciklama iceren grafik -->\n<img src="ceyrek-grafigi.png" alt="3. ceyrek geliri 2. ceyrege gore %18 artarak 4,2 milyon dolara ulasti">\n\n<!-- Dekoratif gorsel dogru sekilde gizlenmis -->\n<img src="dekoratif-spiral.svg" alt="" role="presentation">',
          'html'
        ),

        heading('SVG ogeleri', 'h3'),
        code(
          '<!-- Yanlis: Erisilebilir adi olmayan SVG -->\n<svg viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Dogru: role ve aria-label ile SVG -->\n<svg role="img" aria-label="Basariyi gosteren onay isareti simgesi" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Dogru: Dekoratif SVG yardimci teknolojiden gizlenmis -->\n<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>',
          'html'
        ),

        heading('input type="image" ve gorsel haritalari', 'h3'),
        code(
          '<!-- Yanlis: alt olmadan input image -->\n<input type="image" src="arama-simgesi.png">\n\n<!-- Dogru: aciklayici alt ile input image -->\n<input type="image" src="arama-simgesi.png" alt="Ara">\n\n<!-- Yanlis: alt olmadan area -->\n<map name="gezinme">\n  <area shape="rect" coords="0,0,100,50" href="/hakkimizda">\n</map>\n\n<!-- Dogru: alt metni olan area -->\n<map name="gezinme">\n  <area shape="rect" coords="0,0,100,50" href="/hakkimizda" alt="Hakkimizda">\n</map>',
          'html'
        ),

        heading('Object ve embed ogeleri', 'h3'),
        code(
          '<!-- Yanlis: metin alternatifi olmayan object -->\n<object data="animasyon.swf" type="application/x-shockwave-flash"></object>\n\n<!-- Dogru: yedek metin iceren object -->\n<object data="animasyon.swf" type="application/x-shockwave-flash">\n  <p>Odeme akisini gosteren animasyonlu tanitim: sepet inceleme, odeme ve onay olmak uzere uc adim icerir.</p>\n</object>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Dosya adini alt metni olarak kullanmak (ornegin alt="IMG_3021.jpg").'),
        bullet('Alt metninde "gorseli" veya "resmi" ifadelerini kullanmak — ekran okuyucular ogeyi zaten gorsel olarak duyurur.'),
        bullet('Dekoratif gorsellere aciklayici alt metni eklemek, bu da ekran okuyucu kullanicilari icin gereksiz gurultu olusturur.'),
        bullet('Grafik, diyagram veya urun fotograflari gibi bilgilendirici gorsellerde alt metnini bos birakmak.'),
        bullet('Bitisikteki gorunen metni alt niteligi icinde tekrarlamak, bu da ekran okuyucularin ayni icerigi iki kez okumasina neden olur.'),
        bullet('Gorsel haritalari icindeki <area> ogelerinde alt metnini unutmak — bunlar etkilesimli ogelerdir ve etiket gerektirir.'),
        bullet('Anlamli icerik icin CSS arka plan gorselleri kullanip DOM icinde metin alternatifi saglamamak.'),
        bullet('Asiri uzun alt metni yazmak (150+ kelime) — bunun yerine kisa bir alt ile birlikte aria-describedby veya baglantili bir aciklama sayfasi kullanilmalidir.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 1.1.1: Non-text Content',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
        source: 'W3C',
        language: 'en',
        _key: 'r1w3cund',
      },
      {
        title: 'W3C WAI Images Tutorial',
        url: 'https://www.w3.org/WAI/tutorials/images/',
        source: 'W3C WAI',
        language: 'en',
        _key: 'r2waitut',
      },
      {
        title: 'WebAIM: Alternative Text',
        url: 'https://webaim.org/techniques/alttext/',
        source: 'WebAIM',
        language: 'en',
        _key: 'r3waimtx',
      },
      {
        title: 'Deque University: Non-text Content',
        url: 'https://dequeuniversity.com/rules/axe/4.10/image-alt',
        source: 'Deque',
        language: 'en',
        _key: 'r4deqimg',
      },
      {
        title: 'MDN: HTML img element — alt attribute',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt',
        source: 'MDN',
        language: 'en',
        _key: 'r5mdnimg',
      },
      {
        title: 'W3C WAI: An alt Decision Tree',
        url: 'https://www.w3.org/WAI/tutorials/images/decision-tree/',
        source: 'W3C WAI',
        language: 'en',
        _key: 'r6dectre',
      },
      {
        title: 'Techniques for WCAG 2.2 — H37: Using alt attributes on img elements',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H37',
        source: 'W3C',
        language: 'en',
        _key: 'r7h37tec',
      },
      {
        title: 'WebAIM: Accessible Images',
        url: 'https://webaim.org/techniques/images/',
        source: 'WebAIM',
        language: 'en',
        _key: 'r8waimim',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 1.1.1 Non-text Content — Alt Text Guide',
        metaDescription:
          'Learn how to meet WCAG 1.1.1 Non-text Content. Practical guidance on writing effective alt text for images, SVGs, image maps, and embedded objects with code examples.',
      },
      tr: {
        metaTitle: 'WCAG 1.1.1 Metin Disi Icerik — Alt Metin Rehberi',
        metaDescription:
          'WCAG 1.1.1 Metin Disi Icerik kriterini nasil karsilayacaginizi ogrenin. Gorseller, SVG ogeleri, gorsel haritalari ve gomulu nesneler icin etkili alt metni yazma rehberi.',
      },
    },
  },
]
