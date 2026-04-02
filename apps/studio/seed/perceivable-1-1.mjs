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
      tr: 'Metin Dışı İçerik',
    },

    description: {
      en: 'All non-text content presented to the user has a text alternative that serves the equivalent purpose.',
      tr: 'Kullanıcıya sunulan tüm metin dışı içeriklerin, aynı amacı karşılayan bir metin alternatifi bulunmalıdır.',
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
          'WCAG 1.1.1, kullanıcıya sunulan her metin dışı içeriğin — görseller, simgeler, grafikler, ses ve video dosyaları, CAPTCHA ve dekoratif öğeler — aynı bilgiyi veya işlevi taşıyan bir metin alternatifine sahip olmasını gerektirir. Ekran okuyucular, braille ekranlar ve arama motorları görsel içeriği anlamak için bu metin alternatiflerine başvurur.'
        ),
        p(
          'Metin alternatifi, metin dışı içeriğin sunduğu amacın ayrısını karşılamalıdır. Bilgi veren bir fotoğraf için görselin ilettiği mesaj betimlenmeli, işlevsel bir düğme için düğmenin gerçekleştirdiği eylem belirtilmeli, tamamen dekoratif öğeler için ise yardımcı teknolojinin bunları atlayabilmesi sağlanmalıdır.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Dünya genelinde yaklaşık 2,2 milyar kişinin bir tür görme bozukluğu bulunmaktadır. Bir ekran okuyucu alt metni olmayan bir görselle karşılaştığında genellikle dosya adını okur — örneğin "DSC_0042.jpg" — ve bu kullanıcıya hiçbir faydalı bilgi sağlamaz. Metinden sese, braille çıkışa veya yalnızca metin tabanlı tarayıcılara dayanan kullanıcılar, görseller aracılığıyla iletilen anlamdan tamamen mahrum kalır.'
        ),
        p(
          'Erişilebilirliğin ötesinde, metin alternatifleri arama motoru optimizasyonunu iyileştirir, yavaş bağlantılarda görselleri devre dışı bırakan kullanıcıları destekler ve görseller yüklenemediğinde yedek içerik sağlar. Doğru alt metni, yapabileceğiniz en etkili ve en az efor gerektiren erişilebilirlik iyileştirmelerinden biridir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        bullet('image-alt — <img> öğelerinin metin alternatifine sahip olmasını doğrular.'),
        bullet('input-image-alt — <input type="image"> öğelerinin metin alternatifine sahip olmasını doğrular.'),
        bullet('area-alt — Görsel haritası içindeki <area> öğelerinin metin alternatifine sahip olmasını doğrular.'),
        bullet('object-alt — <object> öğelerinin metin alternatifine sahip olmasını doğrular.'),
        bullet('svg-img-alt — img rolune sahip SVG öğelerinin erişilebilir bir ada sahip olmasını doğrular.'),
        bullet('role-img-alt — role="img" atanmis öğelerin metin alternatifine sahip olmasını doğrular.'),
        bullet('image-redundant-alt — Alt metninin bitişik metin içeriğiyle aynı olmamasını doğrular.'),

        heading('Nasıl test edilir', 'h2'),
        p(
          'Oncelikle axe-core veya Lighthouse ile otomatik bir tarama yapın. Bu araçlar eksik alt niteliklerini güvenilir biçimde yakalar. Ancak otomatik araçlar alt metninin doğru veya anlamlı olup olmadığını değerlendiremez — bu, elle inceleme gerektirir.'
        ),
        bullet('Chrome DevTools içinde axe DevTools veya Lighthouse çalıştırın ve image-alt bulgularini inceleyin.'),
        bullet('Web Developer Toolbar ile görselleri alt metinleriyle değiştirin ve sayfanın hala anlamlı olup olmadığını doğrulayın.'),
        bullet('Sayfada bir ekran okuyucu (NVDA, VoiceOver veya JAWS) ile gezinin ve her görselin faydalı bilgiyle duyuruldugundan emin olun.'),
        bullet('Dekoratif gorsellerin alt="" veya role="presentation" ile yardımcı teknolojiden gizlendiğini kontrol edin.'),
        bullet('SVG, <object> öğeleri ve görsel haritalarini inceleyin — bunlar otomatik kontrollerde sıklıkla gözden kaçar.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Aşağıda en yaygın metin dışı içerik kalıpları için doğru ve yanlış uygulamalar yer almaktadır.'),

        heading('Görseller — yanlış uygulama', 'h3'),
        code(
          '<!-- alt niteliği tamamen eksik -->\n<img src="takım-fotografi.jpg">\n\n<!-- Bilgilendirici gorselde boş alt -->\n<img src="çeyrek-grafiği.png" alt="">\n\n<!-- Dosya adı veya genel metin alt olarak kullanılmış -->\n<img src="hero.jpg" alt="hero.jpg">\n<img src="banner.png" alt="görsel">',
          'html'
        ),

        heading('Görseller — doğru uygulama', 'h3'),
        code(
          '<!-- Açıklayıcı alt metni olan bilgilendirici görsel -->\n<img src="takım-fotografi.jpg" alt="Inculva mühendislik ekibi 2025 erişilebilirlik zirvesinde">\n\n<!-- Anlamlı açıklama içeren grafik -->\n<img src="çeyrek-grafiği.png" alt="3. çeyrek geliri 2. çeyreğe göre %18 artarak 4,2 milyon dolara ulaştı">\n\n<!-- Dekoratif görsel doğru şekilde gizlenmiş -->\n<img src="dekoratif-spiral.svg" alt="" role="presentation">',
          'html'
        ),

        heading('SVG öğeleri', 'h3'),
        code(
          '<!-- Yanlış: Erişilebilir adı olmayan SVG -->\n<svg viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Doğru: role ve aria-label ile SVG -->\n<svg role="img" aria-label="Basariyi gösteren onay işareti simgesi" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>\n\n<!-- Doğru: Dekoratif SVG yardımcı teknolojiden gizlenmiş -->\n<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">\n  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10..."/>\n</svg>',
          'html'
        ),

        heading('input type="image" ve görsel haritaları', 'h3'),
        code(
          '<!-- Yanlış: alt olmadan input image -->\n<input type="image" src="arama-simgesi.png">\n\n<!-- Doğru: açıklayıcı alt ile input image -->\n<input type="image" src="arama-simgesi.png" alt="Ara">\n\n<!-- Yanlış: alt olmadan area -->\n<map name="gezinme">\n  <area shape="rect" coords="0,0,100,50" href="/hakkımızda">\n</map>\n\n<!-- Doğru: alt metni olan area -->\n<map name="gezinme">\n  <area shape="rect" coords="0,0,100,50" href="/hakkımızda" alt="Hakkımızda">\n</map>',
          'html'
        ),

        heading('Object ve embed öğeleri', 'h3'),
        code(
          '<!-- Yanlış: metin alternatifi olmayan object -->\n<object data="animasyon.swf" type="application/x-shockwave-flash"></object>\n\n<!-- Doğru: yedek metin içeren object -->\n<object data="animasyon.swf" type="application/x-shockwave-flash">\n  <p>Ödeme akışını gösteren animasyonlu tanıtım: sepet inceleme, ödeme ve onay olmak üzere üç adım içerir.</p>\n</object>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Dosya adını alt metni olarak kullanmak (örneğin alt="IMG_3021.jpg").'),
        bullet('Alt metninde "görseli" veya "resmi" ifadelerini kullanmak — ekran okuyucular öğeyi zaten görsel olarak duyurur.'),
        bullet('Dekoratif gorsellere açıklayıcı alt metni eklemek, bu da ekran okuyucu kullanıcıları için gereksiz gürültü oluşturur.'),
        bullet('Grafik, diyagram veya ürün fotoğrafları gibi bilgilendirici görsellerde alt metnini boş bırakmak.'),
        bullet('Bitisikteki görünen metni alt niteliği içinde tekrarlamak, bu da ekran okuyucuların aynı içeriği iki kez okumasına neden olur.'),
        bullet('Görsel haritaları içindeki <area> öğelerinde alt metnini unutmak — bunlar etkileşimli ogelerdir ve etiket gerektirir.'),
        bullet('Anlamlı içerik için CSS arka plan görselleri kullanıp DOM içinde metin alternatifi sağlamamak.'),
        bullet('Aşırı uzun alt metni yazmak (150+ kelime) — bunun yerine kısa bir alt ile birlikte aria-describedby veya bağlantılı bir açıklama sayfası kullanılmalıdır.'),
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
        metaTitle: 'WCAG 1.1.1 Metin Dışı İçerik — Alt Metin Rehberi',
        metaDescription:
          'WCAG 1.1.1 Metin Dışı İçerik kriterini nasıl karşılayacağınızı öğrenin. Görseller, SVG öğeleri, görsel haritaları ve gömülü nesneler için etkili alt metni yazma rehberi.',
      },
    },
  },
]
