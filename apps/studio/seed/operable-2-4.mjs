import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ─── 2.4.1 Bypass Blocks ───────────────────────────────────────────
  {
    criterionNumber: '2.4.1',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['bypass', 'skip-link', 'frame-title', 'frame-title-unique'],
    tags: ['navigation', 'skip-link', 'landmarks'],

    title: {
      en: 'Bypass Blocks',
      tr: 'Bloklari Atlama',
    },

    description: {
      en: 'A mechanism is available to bypass blocks of content that are repeated on multiple web pages.',
      tr: 'Birden fazla web sayfasinda tekrarlanan icerik bloklarini atlamak icin bir mekanizma saglanmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.1 requires that pages provide a way for users to skip past repeated blocks of content — such as navigation menus, headers, and sidebars — and go directly to the main content. This is most commonly achieved through "skip navigation" links and ARIA landmark regions.'
        ),
        p(
          'Keyboard users and screen reader users navigate pages sequentially. Without a bypass mechanism, they must tab or arrow through dozens or hundreds of repeated links on every single page load before reaching the unique content they came for.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Imagine having to listen to an entire restaurant menu read aloud every time you open a new page on a website. That is the experience of a screen reader user on a site without skip links. For users with motor impairments who navigate by keyboard alone, tabbing through 50+ navigation links to reach the main content is physically exhausting and time-consuming.'
        ),
        p(
          'Bypass mechanisms dramatically improve efficiency for keyboard and assistive technology users. They also benefit power users who prefer keyboard navigation and users of alternative input devices such as switch controls and sip-and-puff systems.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('bypass — Ensures each page has at least one mechanism for a user to bypass navigation and jump to the main content.'),
        bullet('skip-link — Ensures skip links target an element that exists on the page and is focusable.'),
        bullet('frame-title — Ensures <iframe> and <frame> elements have an accessible title attribute.'),
        bullet('frame-title-unique — Ensures that <iframe> and <frame> elements have unique title values.'),

        heading('How to test', 'h2'),
        numbered('Load the page and press Tab. The first focusable element should be a visible "Skip to main content" link.'),
        numbered('Activate the skip link by pressing Enter and verify that focus moves to the main content area.'),
        numbered('Run axe-core and check for bypass, skip-link, frame-title, and frame-title-unique violations.'),
        numbered('Verify that ARIA landmark roles (banner, navigation, main, contentinfo) are present and properly used.'),
        numbered('Check that all iframes have descriptive title attributes.'),
        bullet('Use a screen reader to confirm landmark regions are announced and allow quick navigation.'),

        heading('How to fix', 'h2'),
        p('The most reliable approach combines a skip navigation link with proper ARIA landmarks.'),

        heading('Skip link — HTML pattern', 'h3'),
        code(
          '<!-- Skip link as the very first element in <body> -->\n<body>\n  <a href="#main-content" class="skip-link">\n    Skip to main content\n  </a>\n\n  <header role="banner">\n    <nav role="navigation" aria-label="Main navigation">\n      <!-- Navigation links -->\n    </nav>\n  </header>\n\n  <main id="main-content" role="main" tabindex="-1">\n    <h1>Page Title</h1>\n    <!-- Unique page content -->\n  </main>\n\n  <footer role="contentinfo">\n    <!-- Footer content -->\n  </footer>\n</body>',
          'html'
        ),

        heading('Skip link — CSS', 'h3'),
        code(
          '.skip-link {\n  position: absolute;\n  top: -100%;\n  left: 0;\n  z-index: 1000;\n  padding: 0.75rem 1.5rem;\n  background: #1a1a2e;\n  color: #ffffff;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: 0 0 4px 0;\n}\n\n.skip-link:focus {\n  top: 0;\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}',
          'css'
        ),

        heading('Focus management with JavaScript', 'h3'),
        code(
          '// Ensure skip link target receives focus reliably\nconst skipLink = document.querySelector(\'.skip-link\');\nskipLink.addEventListener(\'click\', (e) => {\n  e.preventDefault();\n  const target = document.querySelector(e.target.getAttribute(\'href\'));\n  if (target) {\n    target.setAttribute(\'tabindex\', \'-1\');\n    target.focus();\n    target.addEventListener(\'blur\', () => {\n      target.removeAttribute(\'tabindex\');\n    }, { once: true });\n  }\n});',
          'javascript'
        ),

        heading('Iframe titles', 'h3'),
        code(
          '<!-- Bad: iframe without title -->\n<iframe src="https://maps.example.com/embed"></iframe>\n\n<!-- Good: iframe with descriptive title -->\n<iframe src="https://maps.example.com/embed" title="Office location map"></iframe>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Skip link exists in the DOM but is permanently hidden with display:none or visibility:hidden, making it unreachable by keyboard.'),
        bullet('Skip link points to an id that does not exist on the page, so activating it does nothing.'),
        bullet('The target element of the skip link is not focusable — the main element needs tabindex="-1" in some browsers.'),
        bullet('Using only ARIA landmarks without a skip link — older assistive technologies may not support landmark navigation.'),
        bullet('Having multiple iframes with identical or missing title attributes, making them indistinguishable to screen reader users.'),
        bullet('Placing the skip link after the navigation instead of before it, defeating its purpose.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.1, sayfalarin tekrarlanan icerik bloklarini — gezinme menuleri, basliklar ve kenar cubuklar gibi — atlayip dogrudan ana iceriklere gitmek icin bir yontem sunmasini gerektirir. Bu en yaygin olarak "gezinmeyi atla" baglantilari ve ARIA alan isaretleri (landmark) ile saglanir.'
        ),
        p(
          'Klavye kullanicilari ve ekran okuyucu kullanicilari sayfalarda sirali olarak gezinir. Bir atlama mekanizmasi olmadan, her sayfa yuklemesinde benzersiz iceriklere ulasmadan once duzinelerce veya yuzlerce tekrarlanan baglanti uzerinden sekme tusuyla ilerlemek zorunda kalirlar.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Bir web sitesinde her yeni sayfayi actiginizda tum restoran menusunun size yuksek sesle okunmasini hayal edin. Atlama baglantilari olmayan bir sitede ekran okuyucu kullanan kisinin deneyimi tam olarak budur. Yalnizca klavye ile gezinen motor engelli kullanicilar icin ana iceriklere ulasmak uzere 50\'den fazla gezinme baglantisini sekme ile gecmek fiziksel olarak yorucu ve zaman alicidir.'
        ),
        p(
          'Atlama mekanizmalari, klavye ve yardimci teknoloji kullanicilari icin verimli gezinmeyi onemli olcude arttirir. Ayrica klavye gezinmesini tercih eden deneyimli kullanicilar ile anahtar kontroller ve ufle-ve-em (sip-and-puff) sistemleri gibi alternatif giris aygitlari kullananlar icin de fayda saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('bypass — Her sayfanin gezinmeyi atlayip ana iceriklere gecmek icin en az bir mekanizmaya sahip olmasini dogrular.'),
        bullet('skip-link — Atlama baglantisinin sayfada var olan ve odaklanabilir bir ogeyi hedefledigini dogrular.'),
        bullet('frame-title — <iframe> ve <frame> ogelerinin erisilebilir bir title niteligi olmasini dogrular.'),
        bullet('frame-title-unique — <iframe> ve <frame> ogelerinin benzersiz title degerlerine sahip olmasini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Sayfayi yukleyin ve Tab tusuna basin. Odaklanabilen ilk oge gorunur bir "Ana iceriklere atla" baglantisi olmalidir.'),
        numbered('Enter tusuna basarak atlama baglantisini etkinlestirin ve odagin ana icerik alanina tasindini dogrulayin.'),
        numbered('axe-core calistirin ve bypass, skip-link, frame-title ve frame-title-unique ihlallerini kontrol edin.'),
        numbered('ARIA alan isaretlerinin (banner, navigation, main, contentinfo) mevcut ve dogru kullanildigini dogrulayin.'),
        numbered('Tum iframe ogelerinin aciklayici title niteliklerine sahip olup olmadigini kontrol edin.'),
        bullet('Bir ekran okuyucu kullanarak alan isaretlerinin duyuruldugunu ve hizli gezinmeye olanak tandigini onaylayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('En guvenilir yaklasim, bir atlama gezinme baglantisini uygun ARIA alan isaretleriyle birlestirmektir.'),

        heading('Atlama baglantisi — HTML kalbi', 'h3'),
        code(
          '<!-- Atlama baglantisi <body> icindeki ilk oge olarak -->\n<body>\n  <a href="#ana-icerik" class="atlama-baglantisi">\n    Ana iceriklere atla\n  </a>\n\n  <header role="banner">\n    <nav role="navigation" aria-label="Ana gezinme">\n      <!-- Gezinme baglantilari -->\n    </nav>\n  </header>\n\n  <main id="ana-icerik" role="main" tabindex="-1">\n    <h1>Sayfa Basligi</h1>\n    <!-- Benzersiz sayfa icerigi -->\n  </main>\n\n  <footer role="contentinfo">\n    <!-- Alt bilgi icerigi -->\n  </footer>\n</body>',
          'html'
        ),

        heading('Atlama baglantisi — CSS', 'h3'),
        code(
          '.atlama-baglantisi {\n  position: absolute;\n  top: -100%;\n  left: 0;\n  z-index: 1000;\n  padding: 0.75rem 1.5rem;\n  background: #1a1a2e;\n  color: #ffffff;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: 0 0 4px 0;\n}\n\n.atlama-baglantisi:focus {\n  top: 0;\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}',
          'css'
        ),

        heading('JavaScript ile odak yonetimi', 'h3'),
        code(
          '// Atlama baglantisi hedefinin guvenilir sekilde odaklanmasini saglama\nconst atlamaLink = document.querySelector(\'.atlama-baglantisi\');\natlamaLink.addEventListener(\'click\', (e) => {\n  e.preventDefault();\n  const hedef = document.querySelector(e.target.getAttribute(\'href\'));\n  if (hedef) {\n    hedef.setAttribute(\'tabindex\', \'-1\');\n    hedef.focus();\n    hedef.addEventListener(\'blur\', () => {\n      hedef.removeAttribute(\'tabindex\');\n    }, { once: true });\n  }\n});',
          'javascript'
        ),

        heading('Iframe basliklari', 'h3'),
        code(
          '<!-- Yanlis: title olmadan iframe -->\n<iframe src="https://maps.example.com/embed"></iframe>\n\n<!-- Dogru: aciklayici title ile iframe -->\n<iframe src="https://maps.example.com/embed" title="Ofis konum haritasi"></iframe>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Atlama baglantisi DOM\'da var ancak display:none veya visibility:hidden ile kalici olarak gizlenmis, bu da klavye ile erisimi imkansiz kilar.'),
        bullet('Atlama baglantisi sayfada bulunmayan bir id\'ye isaret ediyor, dolayisiyla etkinlestirildiginde hicbir sey olmuyor.'),
        bullet('Atlama baglantisinin hedef ogesi odaklanabilir degil — bazi tarayicilarda main ogesinin tabindex="-1" olmasi gerekir.'),
        bullet('Atlama baglantisi olmadan yalnizca ARIA alan isaretleri kullanmak — eski yardimci teknolojiler alan isaretleri gezinmesini desteklemeyebilir.'),
        bullet('Birden fazla iframe\'in ayni veya eksik title nitelikleri olmasi, ekran okuyucu kullanicilari icin bunlari ayirt edilemez kilar.'),
        bullet('Atlama baglantisini gezinmenin oncesine degil sonrasina yerlestirmek, amacini ortadan kaldirir.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.1: Bypass Blocks',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r241w3cu',
      },
      {
        title: 'WebAIM: Skip Navigation Links',
        url: 'https://webaim.org/techniques/skipnav/',
        source: 'webaim',
        language: 'en',
        _key: 'r241waim',
      },
      {
        title: 'W3C WAI: ARIA Landmarks Example',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r241wail',
      },
      {
        title: 'Deque: bypass Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/bypass',
        source: 'deque',
        language: 'en',
        _key: 'r241dequ',
      },
      {
        title: 'MDN: ARIA landmark roles',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#landmark_roles',
        source: 'mdn',
        language: 'en',
        _key: 'r241mdnl',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.1 Bypass Blocks — Skip Navigation Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.1 Bypass Blocks. Implement skip links, ARIA landmarks, and iframe titles to help keyboard users bypass repeated content.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.1 Bloklari Atlama — Gezinmeyi Atlama Rehberi',
        metaDescription:
          'WCAG 2.4.1 Bloklari Atlama kriterini nasil karsilayacaginizi ogrenin. Klavye kullanicilarinin tekrarlanan icerikleri atlamasina yardimci olmak icin atlama baglantilari ve ARIA alan isaretleri uygulayin.',
      },
    },
  },

  // ─── 2.4.2 Page Titled ─────────────────────────────────────────────
  {
    criterionNumber: '2.4.2',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['document-title'],
    tags: ['title', 'navigation'],

    title: {
      en: 'Page Titled',
      tr: 'Sayfa Basligi',
    },

    description: {
      en: 'Web pages have titles that describe topic or purpose.',
      tr: 'Web sayfalarinin konuyu veya amaci tanimlayan basliklari olmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.2 requires that every web page has a descriptive title defined in the <title> element within the HTML <head>. The title must describe the page\'s topic or purpose, helping users identify where they are without reading the entire page content.'
        ),
        p(
          'Page titles are the first piece of information announced by screen readers when a page loads. They appear in browser tabs, bookmarks, search engine results, and history lists. A clear, unique title is essential for orientation and navigation.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users hear the page title before any other content. When titles are missing or generic (like "Untitled" or "Page"), users cannot distinguish between multiple open tabs or determine whether they have reached the right page. This is especially problematic when users have many tabs open or navigate through browser history.'
        ),
        p(
          'Descriptive page titles also improve usability for all users. They help with bookmarking, appearing in search results, and quickly scanning browser tabs. For users with cognitive disabilities, clear titles reduce confusion and support wayfinding.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('document-title — Ensures each HTML document contains a non-empty <title> element.'),

        heading('How to test', 'h2'),
        numbered('Check the browser tab to see if a descriptive title is displayed.'),
        numbered('View the page source and verify the <title> element exists within <head> and contains meaningful text.'),
        numbered('Run axe-core and check for document-title violations.'),
        numbered('Navigate between pages and confirm each title is unique and describes the specific page content.'),
        bullet('For single-page applications, verify the title updates when the route changes.'),
        bullet('Test with a screen reader — the title should be the first thing announced on page load.'),

        heading('How to fix', 'h2'),
        p('Every page needs a unique, descriptive title that identifies the page within the context of the site.'),

        heading('Basic page title', 'h3'),
        code(
          '<!-- Bad: Missing or generic title -->\n<head>\n  <title>Page</title>\n</head>\n\n<!-- Bad: Same title on every page -->\n<head>\n  <title>My Website</title>\n</head>\n\n<!-- Good: Descriptive, page-specific title -->\n<head>\n  <title>Accessibility Audit Report — Inculva Dashboard</title>\n</head>\n\n<!-- Good: Pattern — Page Name - Site Name -->\n<head>\n  <title>Contact Us - Inculva</title>\n</head>',
          'html'
        ),

        heading('Dynamic title updates in SPAs', 'h3'),
        code(
          '// React: Update document title on route change\nimport { useEffect } from \'react\';\nimport { useLocation } from \'react-router-dom\';\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title ? `${title} — Inculva` : \'Inculva\';\n  }, [title]);\n}\n\n// Usage in a page component\nfunction AuditPage() {\n  useDocumentTitle(\'Accessibility Audit Report\');\n  return <main>...</main>;\n}',
          'javascript'
        ),

        heading('Server-side title generation', 'h3'),
        code(
          '<!-- Astro / Next.js pattern -->\n---\nconst pageTitle = `${article.title} — Inculva Knowledge Base`;\n---\n<html>\n  <head>\n    <title>{pageTitle}</title>\n  </head>\n  <!-- ... -->\n</html>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using the same title on every page — titles must be unique and describe the specific page content.'),
        bullet('Using only the site name as the title without including the page-specific topic.'),
        bullet('Leaving the <title> element empty or using placeholder text like "Untitled Document".'),
        bullet('In single-page applications, not updating the document title when the route changes.'),
        bullet('Placing the most important information at the end of the title — screen reader users hear the beginning first, so put the page-specific part before the site name.'),
        bullet('Using excessively long titles (over 60-70 characters) which get truncated in browser tabs and search results.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.2, her web sayfasinin HTML <head> icinde <title> ogesiyle tanimlanmis aciklayici bir basliga sahip olmasini gerektirir. Baslik, sayfanin konusunu veya amacini tanimlamali ve kullanicilarin tum sayfa icerigini okumadan nerede olduklarini anlamalarina yardimci olmalidir.'
        ),
        p(
          'Sayfa basliklari, bir sayfa yuklendiginde ekran okuyucularin duyurdugu ilk bilgidir. Tarayici sekmelerinde, yer imlerinde, arama motoru sonuclarinda ve gecmis listelerinde goruntulenir. Acik ve benzersiz bir baslik, yonelim ve gezinme icin onemlidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari herhangi bir icerikten once sayfa basligini duyar. Basliklar eksik veya genel oldugunda (ornegin "Basliksiz" veya "Sayfa"), kullanicilar birden fazla acik sekmeyi birbirinden ayirt edemez veya dogru sayfaya ulasip ulasmadiklarini belirleyemez. Bu ozellikle cok sayida acik sekmesi olan veya tarayici gecmisinde gezinen kullanicilar icin sorunludur.'
        ),
        p(
          'Aciklayici sayfa basliklari tum kullanicilar icin kullanilabilirligi arttirir. Yer imi olusturma, arama sonuclarinda goruntuleme ve tarayici sekmelerini hizla tarama konularinda yardimci olur. Bilissel engelli kullanicilar icin net basliklar karisikligi azaltir ve yol bulmaya destek olur.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('document-title — Her HTML belgesinin bos olmayan bir <title> ogesi icermesini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Tarayici sekmesinde aciklayici bir basligin goruntulup goruntulenmedigini kontrol edin.'),
        numbered('Sayfa kaynagini goruntuleyin ve <title> ogesinin <head> icinde mevcut oldugunu ve anlamli metin icerdigini dogrulayin.'),
        numbered('axe-core calistirin ve document-title ihlallerini kontrol edin.'),
        numbered('Sayfalar arasinda gezinin ve her basligin benzersiz oldugunu ve belirli sayfa icerigini tanimladigini onaylayin.'),
        bullet('Tek sayfa uygulamalari icin rota degistiginde basligin guncellendigini dogrulayin.'),
        bullet('Bir ekran okuyucu ile test edin — baslik, sayfa yuklemesinde duyurulan ilk sey olmalidir.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Her sayfanin site baglaminda sayfayi tanimlayan benzersiz ve aciklayici bir basliga ihtiyaci vardir.'),

        heading('Temel sayfa basligi', 'h3'),
        code(
          '<!-- Yanlis: Eksik veya genel baslik -->\n<head>\n  <title>Sayfa</title>\n</head>\n\n<!-- Yanlis: Her sayfada ayni baslik -->\n<head>\n  <title>Web Sitem</title>\n</head>\n\n<!-- Dogru: Aciklayici, sayfaya ozel baslik -->\n<head>\n  <title>Erisilebilirlik Denetim Raporu — Inculva Panel</title>\n</head>\n\n<!-- Dogru: Kalip — Sayfa Adi - Site Adi -->\n<head>\n  <title>Bize Ulasin - Inculva</title>\n</head>',
          'html'
        ),

        heading('SPA\'larda dinamik baslik guncellemeleri', 'h3'),
        code(
          '// React: Rota degisikliginde belge basligini guncelleme\nimport { useEffect } from \'react\';\nimport { useLocation } from \'react-router-dom\';\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title ? `${title} — Inculva` : \'Inculva\';\n  }, [title]);\n}\n\n// Bir sayfa bileseninde kullanim\nfunction DenetimSayfasi() {\n  useDocumentTitle(\'Erisilebilirlik Denetim Raporu\');\n  return <main>...</main>;\n}',
          'javascript'
        ),

        heading('Sunucu tarafinda baslik olusturma', 'h3'),
        code(
          '<!-- Astro / Next.js kalbi -->\n---\nconst sayfaBasligi = `${makale.baslik} — Inculva Bilgi Bankasi`;\n---\n<html>\n  <head>\n    <title>{sayfaBasligi}</title>\n  </head>\n  <!-- ... -->\n</html>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Her sayfada ayni basligi kullanmak — basliklar benzersiz olmali ve belirli sayfa icerigini tanimlamalidir.'),
        bullet('Baslik olarak yalnizca site adini kullanip sayfaya ozel konuyu dahil etmemek.'),
        bullet('<title> ogesini bos birakmak veya "Basliksiz Belge" gibi yer tutucu metin kullanmak.'),
        bullet('Tek sayfa uygulamalarinda rota degistiginde belge basligini guncellememek.'),
        bullet('En onemli bilgiyi basligin sonuna yerlestirmek — ekran okuyucu kullanicilari once baslangi duyar, bu nedenle sayfaya ozel kismi site adindan once koyun.'),
        bullet('Asiri uzun basliklar kullanmak (60-70 karakterden fazla) — tarayici sekmelerinde ve arama sonuclarinda kesilir.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.2: Page Titled',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r242w3cu',
      },
      {
        title: 'Deque: document-title Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/document-title',
        source: 'deque',
        language: 'en',
        _key: 'r242dequ',
      },
      {
        title: 'WebAIM: Page Titles',
        url: 'https://webaim.org/techniques/pagetitle/',
        source: 'webaim',
        language: 'en',
        _key: 'r242waim',
      },
      {
        title: 'W3C Techniques: G88 — Providing descriptive titles for Web pages',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G88',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r242w3ct',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.2 Page Titled — Descriptive Title Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.2 Page Titled. Write descriptive, unique page titles for better navigation, SEO, and screen reader support with practical code examples.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.2 Sayfa Basligi — Aciklayici Baslik Rehberi',
        metaDescription:
          'WCAG 2.4.2 Sayfa Basligi kriterini nasil karsilayacaginizi ogrenin. Daha iyi gezinme, SEO ve ekran okuyucu destegi icin aciklayici ve benzersiz sayfa basliklari yazin.',
      },
    },
  },

  // ─── 2.4.3 Focus Order ─────────────────────────────────────────────
  {
    criterionNumber: '2.4.3',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['focus-order-semantics', 'tabindex'],
    tags: ['focus', 'keyboard', 'navigation'],

    title: {
      en: 'Focus Order',
      tr: 'Odak Sirasi',
    },

    description: {
      en: 'If a web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
      tr: 'Bir web sayfasi sirali olarak gezinilebiliyorsa ve gezinme sirasi anlam veya islevi etkiliyorsa, odaklanabilir bilesenler anlami ve islevselligi koruyan bir sirada odak alir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.3 requires that when users navigate a page sequentially — typically using the Tab key — the order in which elements receive focus must be logical and meaningful. The focus order should follow the visual reading order and preserve the relationships between content elements.'
        ),
        p(
          'This criterion applies to all interactive elements: links, buttons, form fields, and custom widgets. The DOM order should match the visual presentation so that keyboard navigation feels natural and predictable.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Keyboard users rely on a predictable focus order to navigate and operate web pages. When focus jumps unexpectedly — from the main content to the footer, then back to the sidebar — users become disoriented and may miss important content or controls. This is especially challenging for users with cognitive disabilities or low vision who cannot easily track where focus has moved.'
        ),
        p(
          'A logical focus order also ensures that form workflows proceed naturally, multi-step processes work correctly, and modal dialogs trap focus properly. Broken focus order can make entire features unusable for keyboard-only users.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('focus-order-semantics — Ensures elements in the focus order have an appropriate role.'),
        bullet('tabindex — Ensures tabindex attribute values are not greater than 0, which would override the natural focus order.'),

        heading('How to test', 'h2'),
        numbered('Disconnect your mouse and navigate the entire page using only the Tab and Shift+Tab keys.'),
        numbered('Verify that focus moves through interactive elements in a logical, visual reading order (typically left-to-right, top-to-bottom for LTR languages).'),
        numbered('Check that no interactive elements are skipped or receive focus out of sequence.'),
        numbered('Test forms to confirm focus moves through fields in the expected order.'),
        numbered('Open modals and dialogs — verify focus is trapped inside and returns to the trigger element on close.'),
        bullet('Run axe-core and check for tabindex violations where tabindex > 0 is used.'),
        bullet('Use the browser\'s accessibility inspector to review the tab order overlay.'),

        heading('How to fix', 'h2'),
        p('The primary fix is to ensure your DOM order matches your visual order. Avoid using positive tabindex values and be cautious with CSS properties that reorder visual layout.'),

        heading('Correct DOM order vs CSS visual reordering', 'h3'),
        code(
          '<!-- Bad: Visual order differs from DOM order due to CSS -->\n<div style="display: flex; flex-direction: row-reverse;">\n  <button>Third visually, first in DOM</button>\n  <button>Second visually, second in DOM</button>\n  <button>First visually, third in DOM</button>\n</div>\n\n<!-- Good: DOM order matches visual order -->\n<div style="display: flex;">\n  <button>First</button>\n  <button>Second</button>\n  <button>Third</button>\n</div>',
          'html'
        ),

        heading('Avoid positive tabindex', 'h3'),
        code(
          '<!-- Bad: Positive tabindex forces unnatural order -->\n<input tabindex="3" placeholder="Name">\n<input tabindex="1" placeholder="Email">\n<input tabindex="2" placeholder="Phone">\n\n<!-- Good: Natural DOM order, no tabindex needed -->\n<input placeholder="Name">\n<input placeholder="Email">\n<input placeholder="Phone">\n\n<!-- Acceptable: tabindex="0" adds to natural order -->\n<div role="button" tabindex="0">Custom button</div>\n\n<!-- Acceptable: tabindex="-1" removes from tab order -->\n<div id="modal-container" tabindex="-1">...</div>',
          'html'
        ),

        heading('Modal focus trap', 'h3'),
        code(
          '// Trap focus inside a modal dialog\nfunction trapFocus(modalElement) {\n  const focusable = modalElement.querySelectorAll(\n    \'a[href], button:not([disabled]), input:not([disabled]),\\\n     select:not([disabled]), textarea:not([disabled]),\\\n     [tabindex]:not([tabindex="-1"])\'\n  );\n  const first = focusable[0];\n  const last = focusable[focusable.length - 1];\n\n  modalElement.addEventListener(\'keydown\', (e) => {\n    if (e.key !== \'Tab\') return;\n    if (e.shiftKey && document.activeElement === first) {\n      e.preventDefault();\n      last.focus();\n    } else if (!e.shiftKey && document.activeElement === last) {\n      e.preventDefault();\n      first.focus();\n    }\n  });\n\n  first.focus();\n}',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using positive tabindex values (tabindex="1", tabindex="2", etc.) which override natural DOM order and create confusing navigation.'),
        bullet('Using CSS flexbox order, grid placement, or float to visually reorder elements without matching the DOM order.'),
        bullet('Dynamically inserting content above the current focus position, causing users to lose their place.'),
        bullet('Not trapping focus inside modal dialogs, allowing users to tab to obscured content behind the overlay.'),
        bullet('Failing to return focus to the trigger element when closing a modal or popover.'),
        bullet('Using display:none to hide elements that are still focusable due to tabindex attributes.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.3, kullanicilar bir sayfada sirali olarak gezindiginde — genellikle Tab tusu kullanarak — ogelerin odak aldigi siralaminin mantikli ve anlamli olmasi gerektigini belirtir. Odak sirasi gorsel okuma sirasini takip etmeli ve icerik ogeleri arasindaki iliskileri korumalidir.'
        ),
        p(
          'Bu kriter tum etkilesimli ogeler icin gecerlidir: baglantilar, dugmeler, form alanlari ve ozel bilesenler. DOM sirasi gorsel sunumla eslesmelidir, boylece klavye gezinmesi dogal ve ongorilebilir hissedilir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Klavye kullanicilari web sayfalarinda gezinmek ve islem yapmak icin ongorilebilir bir odak sirasina guvenir. Odak beklenmedik sekilde atlayinca — ana icerikten alt bilgiye, sonra tekrar kenar cubuguna — kullanicilar yonunu kaybeder ve onemli icerik veya denetimleri kacirabilir. Bu ozellikle odagin nereye tastigini kolayca takip edemeyen bilissel engelli veya az goren kullanicilar icin zorlayicidir.'
        ),
        p(
          'Mantikli bir odak sirasi ayrica form is akislarinin dogal ilerlemesini, cok adimli sureclerin dogru calismasini ve kalici iletisim kutularinin odagi dogru sekilde yakalamasini saglar. Bozuk odak sirasi, yalnizca klavye kullanan kisiler icin tum ozellikleri kullanilamaz hale getirebilir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('focus-order-semantics — Odak sirasindaki ogelerin uygun bir role sahip olmasini dogrular.'),
        bullet('tabindex — tabindex nitelik degerlerinin 0\'dan buyuk olmamasini dogrular, cunku bu dogal odak sirasini gecirsiz kilar.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Farenizi baglantisini kesin ve sayfanin tamaminda yalnizca Tab ve Shift+Tab tuslariyla gezinin.'),
        numbered('Odagin etkilesimli ogeler arasinda mantikli, gorsel okuma sirasinda (genellikle soldan saga, yukaridon asagiya) ilerledigini dogrulayin.'),
        numbered('Hicbir etkilesimli ogenin atlanmadigini veya sira disi odak almadigini kontrol edin.'),
        numbered('Formlari test ederek odagin alanlar arasinda beklenen sirada hareket ettigini onaylayin.'),
        numbered('Kalici iletisim kutularini ve diyalog pencerelerini acin — odagin iceride tutuldugunu ve kapatildiginda tetikleyici ogeye dondugunu dogrulayin.'),
        bullet('axe-core calistirin ve tabindex > 0 kullanilan tabindex ihlallerini kontrol edin.'),
        bullet('Tarayicinin erisilebilirlik denetcisini kullanarak sekme sirasi katmanini inceleyin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Birincil cozum, DOM siranizin gorsel siranizla eslesmesini saglamaktir. Pozitif tabindex degerlerinden kacinin ve gorsel duzeni yeniden siralan CSS ozelliklerinde dikkatli olun.'),

        heading('Dogru DOM sirasi ve CSS gorsel yeniden siralama', 'h3'),
        code(
          '<!-- Yanlis: CSS nedeniyle gorsel sira DOM sirasindan farkli -->\n<div style="display: flex; flex-direction: row-reverse;">\n  <button>Gorsel ucuncu, DOM\'da birinci</button>\n  <button>Gorsel ikinci, DOM\'da ikinci</button>\n  <button>Gorsel birinci, DOM\'da ucuncu</button>\n</div>\n\n<!-- Dogru: DOM sirasi gorsel sirayla eslesiyor -->\n<div style="display: flex;">\n  <button>Birinci</button>\n  <button>Ikinci</button>\n  <button>Ucuncu</button>\n</div>',
          'html'
        ),

        heading('Pozitif tabindex kullanmayin', 'h3'),
        code(
          '<!-- Yanlis: Pozitif tabindex doal olmayan sira dayatiyor -->\n<input tabindex="3" placeholder="Isim">\n<input tabindex="1" placeholder="E-posta">\n<input tabindex="2" placeholder="Telefon">\n\n<!-- Dogru: Dogal DOM sirasi, tabindex gerekmez -->\n<input placeholder="Isim">\n<input placeholder="E-posta">\n<input placeholder="Telefon">\n\n<!-- Kabul edilebilir: tabindex="0" dogal siraya ekler -->\n<div role="button" tabindex="0">Ozel dugme</div>\n\n<!-- Kabul edilebilir: tabindex="-1" sekme sirasindan cikarir -->\n<div id="modal-kapsayici" tabindex="-1">...</div>',
          'html'
        ),

        heading('Modal odak tuzagi', 'h3'),
        code(
          '// Modal iletisim kutusu icinde odagi yakalama\nfunction odakYakala(modalOgesi) {\n  const odaklanabilir = modalOgesi.querySelectorAll(\n    \'a[href], button:not([disabled]), input:not([disabled]),\\\n     select:not([disabled]), textarea:not([disabled]),\\\n     [tabindex]:not([tabindex="-1"])\'\n  );\n  const ilk = odaklanabilir[0];\n  const son = odaklanabilir[odaklanabilir.length - 1];\n\n  modalOgesi.addEventListener(\'keydown\', (e) => {\n    if (e.key !== \'Tab\') return;\n    if (e.shiftKey && document.activeElement === ilk) {\n      e.preventDefault();\n      son.focus();\n    } else if (!e.shiftKey && document.activeElement === son) {\n      e.preventDefault();\n      ilk.focus();\n    }\n  });\n\n  ilk.focus();\n}',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Pozitif tabindex degerleri (tabindex="1", tabindex="2" vb.) kullanmak — bu dogal DOM sirasini gecersiz kilar ve kafa karistirici gezinme olusturur.'),
        bullet('CSS flexbox sirasi, grid yerlesimi veya float kullanarak DOM sirasini eslesirmeden ogeleri gorsel olarak yeniden siralamak.'),
        bullet('Mevcut odak konumunun ustune dinamik icerik ekleyerek kullanicilarin yerini kaybetmesine neden olmak.'),
        bullet('Modal iletisim kutularinda odagi yakalamamak, kullanicilarin katman arkasindaki gizlenmis iceriklere sekme ile gecsine izin vermek.'),
        bullet('Bir modal veya acilir pencere kapatildiginda odagi tetikleyici ogeye dondurememek.'),
        bullet('tabindex nitelikleri nedeniyle hala odaklanabilir olan ogeleri gizlemek icin display:none kullanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.3: Focus Order',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r243w3cu',
      },
      {
        title: 'WebAIM: Keyboard Accessibility',
        url: 'https://webaim.org/techniques/keyboard/',
        source: 'webaim',
        language: 'en',
        _key: 'r243waim',
      },
      {
        title: 'W3C WAI: ARIA Dialog Modal Pattern',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r243waid',
      },
      {
        title: 'Deque: tabindex Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/tabindex',
        source: 'deque',
        language: 'en',
        _key: 'r243dequ',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.3 Focus Order — Logical Tab Navigation Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.3 Focus Order. Ensure keyboard navigation follows a logical sequence with DOM ordering, focus traps, and tabindex best practices.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.3 Odak Sirasi — Mantikli Sekme Gezinme Rehberi',
        metaDescription:
          'WCAG 2.4.3 Odak Sirasi kriterini nasil karsilayacaginizi ogrenin. DOM siralama, odak tuzaklari ve tabindex en iyi uygulamalariyla klavye gezinmesinin mantikli bir sirayi izlemesini saglayin.',
      },
    },
  },

  // ─── 2.4.4 Link Purpose (In Context) ───────────────────────────────
  {
    criterionNumber: '2.4.4',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['link-name'],
    tags: ['links', 'navigation'],

    title: {
      en: 'Link Purpose (In Context)',
      tr: 'Baglanti Amaci (Baglamda)',
    },

    description: {
      en: 'The purpose of each link can be determined from the link text alone, or from the link text together with its programmatically determined link context.',
      tr: 'Her baglantinin amaci yalnizca baglanti metninden veya baglanti metni ile programatik olarak belirlenen baglanti baglaminin birlesiminden anlasilabilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.4 requires that the purpose of each link can be understood from the link text itself, or from the link text combined with its surrounding context — such as the enclosing paragraph, list item, table cell, or heading. Users must be able to determine where a link will take them before activating it.'
        ),
        p(
          'This means that link text like "click here", "read more", or "learn more" fails when the surrounding context does not clarify the destination. The purpose must be unambiguous either from the link text alone or with the help of its programmatic context.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users frequently navigate by pulling up a list of all links on a page. When every link says "click here" or "read more", that list becomes useless — the user cannot distinguish between links or determine which one to follow. This forces them to navigate to each link individually and read the surrounding text for context, which is extremely time-consuming.'
        ),
        p(
          'Descriptive link text also benefits sighted users who scan pages visually, users with cognitive disabilities who need clear cues, and search engines that use link text as a ranking signal.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('link-name — Ensures every link has discernible text that describes its purpose.'),

        heading('How to test', 'h2'),
        numbered('Use a screen reader to generate a list of links (e.g., NVDA: Insert+F7, VoiceOver: Rotor > Links). Review whether each link\'s purpose is clear out of context.'),
        numbered('Run axe-core and check for link-name violations (links without accessible names).'),
        numbered('Manually review all links with generic text ("click here", "read more", "here", "more") and check whether the programmatic context clarifies their purpose.'),
        numbered('Check that image links have alt text that describes the link destination, not just the image.'),
        bullet('Verify that links using aria-label or aria-labelledby accurately describe the destination.'),

        heading('How to fix', 'h2'),
        p('Write link text that clearly describes the destination or action. When surrounding context is needed, ensure it is programmatically associated.'),

        heading('Descriptive link text', 'h3'),
        code(
          '<!-- Bad: Generic link text -->\n<p>We published our annual report. <a href="/report">Click here</a>.</p>\n<p>Read our accessibility guide. <a href="/guide">Read more</a></p>\n\n<!-- Good: Self-descriptive link text -->\n<p><a href="/report">Download the 2025 annual report</a></p>\n<p><a href="/guide">Read our complete accessibility guide</a></p>\n\n<!-- Good: Context from enclosing element -->\n<li>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site against WCAG 2.2 criteria.\n    <a href="/services/audit">Learn more about our audit service</a>\n  </p>\n</li>',
          'html'
        ),

        heading('Image links', 'h3'),
        code(
          '<!-- Bad: Image link with no alt text -->\n<a href="/home"><img src="logo.png"></a>\n\n<!-- Bad: Alt describes image, not link purpose -->\n<a href="/home"><img src="logo.png" alt="Company logo"></a>\n\n<!-- Good: Alt describes link destination -->\n<a href="/home"><img src="logo.png" alt="Inculva home page"></a>',
          'html'
        ),

        heading('Using aria-label for enhanced context', 'h3'),
        code(
          '<!-- When visual design requires short text like "Read more" -->\n<article>\n  <h3>WCAG 2.4.4 Explained</h3>\n  <p>Understanding link purpose requirements...</p>\n  <a href="/articles/244" aria-label="Read more about WCAG 2.4.4 Explained">\n    Read more\n  </a>\n</article>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using "click here", "here", "read more", "learn more", or "more" as the sole link text without additional context.'),
        bullet('Using the raw URL as link text (e.g., "https://www.example.com/report.pdf") instead of a descriptive label.'),
        bullet('Having multiple links on the same page with identical text that lead to different destinations.'),
        bullet('Wrapping an entire paragraph or large block of text in an <a> tag, making the link text overly verbose.'),
        bullet('Image links where the alt text describes the image instead of the link destination.'),
        bullet('Using title attribute as the only means of providing link purpose — title tooltips are inaccessible on touch devices and not consistently read by screen readers.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.4, her baglantinin amacinin baglanti metninin kendisinden veya baglanti metninin cevreleyen baglamiyla — kapsayan paragraf, liste ogesi, tablo hucresi veya baslik gibi — birlikte anlasilabilmesini gerektirir. Kullanicilar bir baglantiyi etkinlestirmeden once nereye goturecegini belirleyebilmelidir.'
        ),
        p(
          'Bu, "buraya tiklayin", "devamini oku" veya "daha fazla bilgi" gibi baglanti metinlerinin cevreleyen baglam hedefi netlestirmediginde basarisiz oldugu anlamina gelir. Amac ya yalnizca baglanti metninden ya da programatik baglaminin yardimiyla acik olmalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari sayfadaki tum baglantilarin listesini getirerek sik sik gezinir. Her baglanti "buraya tiklayin" veya "devamini oku" dediginde bu liste kullanisiz hale gelir — kullanici baglantilari birbirinden ayirt edemez veya hangisini izleyecegini belirleyemez. Bu onlari her bir baglaniya tek tek gezinmeye ve baglam icin cevreleyen metni okumaya zorlar ki bu son derece zaman alicidir.'
        ),
        p(
          'Aciklayici baglanti metni ayrica sayfalari gorsel olarak tarayan goren kullanicilar, net ipuclarina ihtiyac duyan bilissel engelli kullanicilar ve baglanti metnini siralama sinyali olarak kullanan arama motorlari icin de fayda saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('link-name — Her baglantinin amacini tanimlayan ayirt edilebilir bir metne sahip olmasini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Bir ekran okuyucu kullanarak baglanti listesi olusturun (ornegin NVDA: Insert+F7, VoiceOver: Rotor > Baglantilar). Her baglantinin amacinin baglam disinda acik olup olmadigini inceleyin.'),
        numbered('axe-core calistirin ve link-name ihlallerini (erisilebilir adi olmayan baglantilar) kontrol edin.'),
        numbered('Genel metne sahip tum baglantilari ("buraya tiklayin", "devamini oku", "burada", "daha fazla") manuel olarak inceleyin ve programatik baglamin amaclarini netlestirip netlestirmedigini kontrol edin.'),
        numbered('Gorsel baglantilarin baglanti hedefini tanimlayan alt metnine sahip olup olmadigini kontrol edin.'),
        bullet('aria-label veya aria-labelledby kullanan baglantilarin hedefi dogru sekilde tanimladigini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Hedefi veya eylemi acikca tanimlayan baglanti metni yazin. Cevreleyen baglam gerektiginde, bunun programatik olarak iliskilendirildiginden emin olun.'),

        heading('Aciklayici baglanti metni', 'h3'),
        code(
          '<!-- Yanlis: Genel baglanti metni -->\n<p>Yillik raporumuzu yayinladik. <a href="/rapor">Buraya tiklayin</a>.</p>\n<p>Erisilebilirlik rehberimizi okuyun. <a href="/rehber">Devamini oku</a></p>\n\n<!-- Dogru: Kendini tanimlayan baglanti metni -->\n<p><a href="/rapor">2025 yillik raporunu indirin</a></p>\n<p><a href="/rehber">Tam erisilebilirlik rehberimizi okuyun</a></p>\n\n<!-- Dogru: Kapsayici ogeden baglam -->\n<li>\n  <h3>Erisilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi WCAG 2.2 kriterlerine gore test ediyoruz.\n    <a href="/hizmetler/denetim">Denetim hizmetimiz hakkinda daha fazla bilgi edinin</a>\n  </p>\n</li>',
          'html'
        ),

        heading('Gorsel baglantilar', 'h3'),
        code(
          '<!-- Yanlis: Alt metni olmayan gorsel baglanti -->\n<a href="/anasayfa"><img src="logo.png"></a>\n\n<!-- Yanlis: Alt gorseli tanimliyor, baglanti amacini degil -->\n<a href="/anasayfa"><img src="logo.png" alt="Sirket logosu"></a>\n\n<!-- Dogru: Alt baglanti hedefini tanimliyor -->\n<a href="/anasayfa"><img src="logo.png" alt="Inculva ana sayfa"></a>',
          'html'
        ),

        heading('Gelistirilmis baglam icin aria-label kullanimi', 'h3'),
        code(
          '<!-- Gorsel tasarim "Devamini oku" gibi kisa metin gerektirdiginde -->\n<article>\n  <h3>WCAG 2.4.4 Aciklamasi</h3>\n  <p>Baglanti amaci gereksinimlerini anlama...</p>\n  <a href="/makaleler/244" aria-label="WCAG 2.4.4 Aciklamasi hakkinda devamini oku">\n    Devamini oku\n  </a>\n</article>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('"Buraya tiklayin", "burada", "devamini oku", "daha fazla bilgi" veya "daha fazla" ifadelerini ek baglam olmadan tek baglanti metni olarak kullanmak.'),
        bullet('Aciklayici bir etiket yerine ham URL\'yi baglanti metni olarak kullanmak (ornegin "https://www.example.com/rapor.pdf").'),
        bullet('Ayni sayfada farkli hedeflere yonlendiren ayni metne sahip birden fazla baglanti bulundurmak.'),
        bullet('Bir paragrafin tamamini veya buyuk bir metin blogunu <a> etiketiyle sarmak, baglanti metnini asiri uzun yapmak.'),
        bullet('Gorsel baglantilarda alt metninin baglanti hedefi yerine gorseli tanimlamasi.'),
        bullet('Baglanti amacini saglamanin tek yolu olarak title niteligi kullanmak — title ipuclari dokunmatik cihazlarda erisilemez ve ekran okuyucular tarafindan tutarli sekilde okunmaz.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.4: Link Purpose (In Context)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r244w3cu',
      },
      {
        title: 'WebAIM: Links and Hypertext',
        url: 'https://webaim.org/techniques/hypertext/',
        source: 'webaim',
        language: 'en',
        _key: 'r244waim',
      },
      {
        title: 'Deque: link-name Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/link-name',
        source: 'deque',
        language: 'en',
        _key: 'r244dequ',
      },
      {
        title: 'W3C Techniques: H30 — Providing link text',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H30',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r244w3ct',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.4 Link Purpose (In Context) — Accessible Links Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.4 Link Purpose. Write descriptive link text, fix "click here" antipatterns, and make links understandable for screen reader users.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.4 Baglanti Amaci (Baglamda) — Erisilebilir Baglantilar Rehberi',
        metaDescription:
          'WCAG 2.4.4 Baglanti Amaci kriterini nasil karsilayacaginizi ogrenin. Aciklayici baglanti metni yazin ve ekran okuyucu kullanicilari icin baglantilari anlasilir kilin.',
      },
    },
  },

  // ─── 2.4.5 Multiple Ways ───────────────────────────────────────────
  {
    criterionNumber: '2.4.5',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['navigation', 'search', 'sitemap'],

    title: {
      en: 'Multiple Ways',
      tr: 'Birden Fazla Yol',
    },

    description: {
      en: 'More than one way is available to locate a web page within a set of web pages, except where the page is a result of or a step in a process.',
      tr: 'Bir web sayfasini bir dizi web sayfasi icinde bulmak icin birden fazla yol saglanmalidir; sayfanin bir surec sonucu veya adimi oldugu durumlar haric.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.5 requires that users can find any page on a website through at least two different mechanisms. Common approaches include: a site-wide navigation menu, a search function, a sitemap page, a table of contents, breadcrumb navigation, or links between related pages.'
        ),
        p(
          'The exception is pages that are part of a multi-step process (such as a checkout flow or form wizard) — these do not need to be independently locatable since their context depends on the process flow.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Different users have different preferences and abilities when it comes to finding content. Some users prefer to browse through navigation menus, others prefer using search, and still others rely on sitemaps. Users with cognitive disabilities may find hierarchical navigation confusing and prefer a flat search interface. Blind users may prefer keyboard-navigable navigation structures over visual sitemaps.'
        ),
        p(
          'Providing multiple ways to locate content ensures that every user can find what they need using the method that works best for them. It also serves as a safety net — if one mechanism is difficult to use, the user has alternatives.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are no automated axe-core rules for this criterion. It requires manual verification that at least two navigation mechanisms exist.'),

        heading('How to test', 'h2'),
        numbered('Identify at least two of the following mechanisms on the website: navigation menu, search function, sitemap, table of contents, breadcrumbs, or related page links.'),
        numbered('Attempt to locate a specific content page using each available mechanism and confirm both paths lead to the same page.'),
        numbered('Verify that process-step pages (checkout, wizard) are excluded from this requirement.'),
        bullet('Check that the search function returns relevant results and is keyboard-accessible.'),
        bullet('Verify the sitemap is up to date and includes all public pages.'),

        heading('How to fix', 'h2'),
        p('Implement at least two of the following mechanisms. A global navigation menu plus a search function is the most common pattern.'),

        heading('Search with accessible markup', 'h3'),
        code(
          '<form role="search" aria-label="Site search">\n  <label for="search-input">Search</label>\n  <input\n    type="search"\n    id="search-input"\n    name="q"\n    placeholder="Search articles..."\n    autocomplete="off"\n  />\n  <button type="submit">Search</button>\n</form>',
          'html'
        ),

        heading('Breadcrumb navigation', 'h3'),
        code(
          '<nav aria-label="Breadcrumb">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/knowledge-base">Knowledge Base</a></li>\n    <li><a href="/knowledge-base/operable">Operable</a></li>\n    <li aria-current="page">2.4.5 Multiple Ways</li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Sitemap page structure', 'h3'),
        code(
          '<main>\n  <h1>Sitemap</h1>\n  <nav aria-label="Sitemap">\n    <h2>Knowledge Base</h2>\n    <ul>\n      <li><a href="/kb/perceivable">Perceivable</a></li>\n      <li><a href="/kb/operable">Operable</a></li>\n      <li><a href="/kb/understandable">Understandable</a></li>\n      <li><a href="/kb/robust">Robust</a></li>\n    </ul>\n    <h2>Services</h2>\n    <ul>\n      <li><a href="/services/audit">Accessibility Audit</a></li>\n      <li><a href="/services/training">Training</a></li>\n    </ul>\n  </nav>\n</main>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Providing only a navigation menu with no search function, sitemap, or other alternative.'),
        bullet('Having a search function that is visually present but not keyboard-accessible.'),
        bullet('Maintaining a sitemap that is outdated and missing recently added pages.'),
        bullet('Using JavaScript-only navigation that breaks when scripts fail to load.'),
        bullet('Hiding the search function behind a tiny icon with no accessible label.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.5, kullanicilarin bir web sitesindeki herhangi bir sayfayi en az iki farkli mekanizma araciligiyla bulabilmesini gerektirir. Yaygin yaklasimlar arasinda: site genelinde gezinme menusu, arama islevi, site haritasi sayfasi, icerik tablosu, icerik kirintisi (breadcrumb) gezinmesi veya ilgili sayfalar arasindaki baglantilar bulunur.'
        ),
        p(
          'Istisna, cok adimli bir surecin parcasi olan sayfalardir (ornegin odeme akisi veya form sihirbazi) — bunlarin bagimli olarak bulunabilir olmasi gerekmez cunku baglamlari surec akisina baglidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Farkli kullanicilar icerik bulmada farkli tercihlere ve yeteneklere sahiptir. Bazi kullanicilar gezinme menuleri uzerinden goz atmayi tercih eder, digerleri arama kullanmayi tercih eder ve digerleri site haritalarina guvenilir. Bilissel engelli kullanicilar hiyerarsik gezinmeyi kafa karistirici bulabilir ve duz bir arama arayuzunu tercih edebilir. Gor engelli kullanicilar gorsel site haritalari yerine klavye ile gezinilebilir gezinme yapilarini tercih edebilir.'
        ),
        p(
          'Icerik bulmak icin birden fazla yol saglamak, her kullancinin kendisi icin en iyi calisan yontemi kullanarak ihtiyac duydugunu bulabilmesini garanti eder. Ayrica bir guvenlik agi islevi gorur — bir mekanizmayi kullanmak zorsa kullanicinin alternatifleri vardir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. En az iki gezinme mekanizmasinin bulundugunu dogrulamak icin manuel dogrulama gerektirir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Web sitesinde su mekanizmalardan en az ikisini belirleyin: gezinme menusu, arama islevi, site haritasi, icerik tablosu, icerik kirintilari veya ilgili sayfa baglantilari.'),
        numbered('Her mevcut mekanizmayi kullanarak belirli bir icerik sayfasini bulmaya calisin ve her iki yolun da ayni sayfaya ulastigini onaylayin.'),
        numbered('Surec adimi sayfalarinin (odeme, sihirbaz) bu gereksinimden muaf oldugunu dogrulayin.'),
        bullet('Arama islevinin ilgili sonuclar dondurdigunu ve klavye ile erisilebilir oldugunu kontrol edin.'),
        bullet('Site haritasinin guncel oldugunu ve tum herkese acik sayfalari icerdigini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Asagidaki mekanizmalardan en az ikisini uygulayin. Genel gezinme menusu ile arama islevinin birlesimi en yaygin kaliptir.'),

        heading('Erisilebilir isaretleme ile arama', 'h3'),
        code(
          '<form role="search" aria-label="Site aramasi">\n  <label for="arama-girisi">Ara</label>\n  <input\n    type="search"\n    id="arama-girisi"\n    name="q"\n    placeholder="Makalelerde ara..."\n    autocomplete="off"\n  />\n  <button type="submit">Ara</button>\n</form>',
          'html'
        ),

        heading('Icerik kirintisi gezinmesi', 'h3'),
        code(
          '<nav aria-label="Icerik kirintisi">\n  <ol>\n    <li><a href="/">Ana Sayfa</a></li>\n    <li><a href="/bilgi-bankasi">Bilgi Bankasi</a></li>\n    <li><a href="/bilgi-bankasi/islenebilir">Islenebilir</a></li>\n    <li aria-current="page">2.4.5 Birden Fazla Yol</li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Site haritasi sayfa yapisi', 'h3'),
        code(
          '<main>\n  <h1>Site Haritasi</h1>\n  <nav aria-label="Site haritasi">\n    <h2>Bilgi Bankasi</h2>\n    <ul>\n      <li><a href="/bb/algilanabilir">Algilanabilir</a></li>\n      <li><a href="/bb/islenebilir">Islenebilir</a></li>\n      <li><a href="/bb/anlasilabilir">Anlasilabilir</a></li>\n      <li><a href="/bb/saglam">Saglam</a></li>\n    </ul>\n    <h2>Hizmetler</h2>\n    <ul>\n      <li><a href="/hizmetler/denetim">Erisilebilirlik Denetimi</a></li>\n      <li><a href="/hizmetler/egitim">Egitim</a></li>\n    </ul>\n  </nav>\n</main>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Arama islevi, site haritasi veya baska bir alternatif olmadan yalnizca gezinme menusu saglamak.'),
        bullet('Gorsel olarak mevcut olan ancak klavye ile erisilebilir olmayan bir arama islevine sahip olmak.'),
        bullet('Guncel olmayan ve son eklenen sayfalari icermeyen bir site haritasi bulundurmak.'),
        bullet('Betikler yuklenemediginde bozulan yalnizca JavaScript\'e dayali gezinme kullanmak.'),
        bullet('Arama islevini erisilebilir etiketi olmayan kucuk bir simgenin arkasina gizlemek.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.5: Multiple Ways',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r245w3cu',
      },
      {
        title: 'W3C Techniques: G63 — Providing a site map',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G63',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r245w3ct',
      },
      {
        title: 'WebAIM: Site Searches and Sitemaps',
        url: 'https://webaim.org/techniques/sitetools/',
        source: 'webaim',
        language: 'en',
        _key: 'r245waim',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.5 Multiple Ways — Navigation Alternatives Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.5 Multiple Ways. Provide search, sitemaps, breadcrumbs, and navigation menus so users can find content through multiple paths.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.5 Birden Fazla Yol — Gezinme Alternatifleri Rehberi',
        metaDescription:
          'WCAG 2.4.5 Birden Fazla Yol kriterini nasil karsilayacaginizi ogrenin. Kullanicilarin icerigi birden fazla yoldan bulabilmesi icin arama, site haritasi ve gezinme menuleri saglayin.',
      },
    },
  },

  // ─── 2.4.6 Headings and Labels ─────────────────────────────────────
  {
    criterionNumber: '2.4.6',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['page-has-heading-one'],
    tags: ['headings', 'labels', 'structure'],

    title: {
      en: 'Headings and Labels',
      tr: 'Basliklar ve Etiketler',
    },

    description: {
      en: 'Headings and labels describe topic or purpose.',
      tr: 'Basliklar ve etiketler konuyu veya amaci tanimlamalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.6 requires that when headings and labels are used, they must be descriptive — clearly indicating the topic of the section or the purpose of the form control. This criterion does not require the presence of headings or labels (that is covered by other criteria), but when they exist, they must be meaningful.'
        ),
        p(
          'A heading like "Section 1" or a label like "Field" does not describe topic or purpose. Headings should summarize the content that follows, and labels should tell users exactly what information is expected in a form field.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users navigate by headings to quickly scan page structure and find relevant sections. When headings are vague or generic, users cannot efficiently locate the content they need. Similarly, unclear form labels force users to guess what information is required, leading to errors and frustration.'
        ),
        p(
          'Descriptive headings and labels also help users with cognitive disabilities understand page organization, support low-vision users who use screen magnifiers and see only a small portion of the page at a time, and improve overall usability for everyone.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('page-has-heading-one — Ensures the page or at least one of its frames contains a level-one heading.'),

        heading('How to test', 'h2'),
        numbered('Use a screen reader heading navigation (e.g., NVDA: H key) to browse all headings. Verify each heading describes the section content.'),
        numbered('Review all form labels to confirm they clearly describe the expected input.'),
        numbered('Run axe-core to check for page-has-heading-one and any empty heading violations.'),
        numbered('Check that heading levels form a logical hierarchy (h1 > h2 > h3) without skipping levels.'),
        bullet('Verify that headings are not used solely for visual styling — use CSS instead of heading elements for non-structural emphasis.'),

        heading('How to fix', 'h2'),
        p('Write headings that summarize the section content and labels that clearly identify the expected input.'),

        heading('Descriptive headings', 'h3'),
        code(
          '<!-- Bad: Generic or vague headings -->\n<h1>Welcome</h1>\n<h2>Section 1</h2>\n<h2>Section 2</h2>\n<h2>More Info</h2>\n\n<!-- Good: Descriptive, topic-specific headings -->\n<h1>WCAG 2.4.6 Headings and Labels</h1>\n<h2>What This Rule Means</h2>\n<h2>How to Write Effective Headings</h2>\n<h2>Form Label Best Practices</h2>',
          'html'
        ),

        heading('Descriptive form labels', 'h3'),
        code(
          '<!-- Bad: Vague labels -->\n<label for="field1">Input</label>\n<input id="field1" type="text">\n\n<label for="field2">Enter value</label>\n<input id="field2" type="text">\n\n<!-- Good: Descriptive labels -->\n<label for="email">Email address</label>\n<input id="email" type="email" autocomplete="email">\n\n<label for="phone">Phone number (optional)</label>\n<input id="phone" type="tel" autocomplete="tel">',
          'html'
        ),

        heading('Group labels with fieldset and legend', 'h3'),
        code(
          '<fieldset>\n  <legend>Notification preferences</legend>\n  <label>\n    <input type="checkbox" name="notify" value="email">\n    Email notifications\n  </label>\n  <label>\n    <input type="checkbox" name="notify" value="sms">\n    SMS notifications\n  </label>\n</fieldset>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using headings like "Introduction", "Section 1", or "Details" that do not describe the actual topic.'),
        bullet('Using identical headings for different sections on the same page.'),
        bullet('Form labels that say "Input", "Field", or "Enter data" without specifying what data is expected.'),
        bullet('Using placeholder text as the only label — placeholders disappear on input and are not reliably read by all screen readers.'),
        bullet('Skipping heading levels (e.g., jumping from h1 to h3) which breaks the logical document outline.'),
        bullet('Using heading elements purely for visual styling rather than structural organization.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.6, basliklar ve etiketler kullanildiginda bunlarin aciklayici olmasi — bolumun konusunu veya form denetiminin amacini acikca belirtmesi — gerektigini soyler. Bu kriter basliklarin veya etiketlerin varligini gerektirmez (bu diger kriterlerle kapsanir), ancak var olduklarinda anlamli olmalidilar.'
        ),
        p(
          '"Bolum 1" gibi bir baslik veya "Alan" gibi bir etiket konu veya amaci tanimlamaz. Basliklar kendilerini izleyen icerigi ozetlemeli ve etiketler kullanicilara form alaninda tam olarak hangi bilginin bekledigini soylemlidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari sayfa yapisini hizla taramak ve ilgili bolumleri bulmak icin basliklar uzerinden gezinir. Basliklar belirsiz veya genel oldugunda kullanicilar ihtiyac duydiklari icerigi verimli bir sekilde bulamaz. Benzer sekilde, belirsiz form etiketleri kullanicilari hangi bilginin gerektigi konusunda tahminde bulunmaya zorlayarak hatalara ve hayal kirikligina yol acar.'
        ),
        p(
          'Aciklayici basliklar ve etiketler ayrica bilissel engelli kullanicilarin sayfa organizasyonunu anlamasina yardimci olur, ekran buyuteculeri kullanan ve sayfanin bir seferde yalnizca kucuk bir bolumunu goren az goren kullanicilari destekler ve herkes icin genel kullanilabilirligi arttirir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('page-has-heading-one — Sayfanin veya en az bir cercevesinin birinci duzey baslik icermesini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Bir ekran okuyucu baslik gezinmesi (ornegin NVDA: H tusu) kullanarak tum basliklari gozden gecirin. Her basligin bolum icerigini tanimladigini dogrulayin.'),
        numbered('Tum form etiketlerini inceleyerek beklenen girdiyi acikca tanimladiklarini onaylayin.'),
        numbered('axe-core calistirarak page-has-heading-one ve bos baslik ihlallerini kontrol edin.'),
        numbered('Baslik duzeylerinin seviye atlamadan (h1 > h2 > h3) mantikli bir hiyerarsi olusturdugunu kontrol edin.'),
        bullet('Basliklarin yalnizca gorsel stil icin kullanilmadigini dogrulayin — yapisal olmayan vurgu icin baslik ogeleri yerine CSS kullanin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Bolum icerigini ozetleyen basliklar ve beklenen girdiyi acikca tanimlayan etiketler yazin.'),

        heading('Aciklayici basliklar', 'h3'),
        code(
          '<!-- Yanlis: Genel veya belirsiz basliklar -->\n<h1>Hos Geldiniz</h1>\n<h2>Bolum 1</h2>\n<h2>Bolum 2</h2>\n<h2>Daha Fazla Bilgi</h2>\n\n<!-- Dogru: Aciklayici, konuya ozel basliklar -->\n<h1>WCAG 2.4.6 Basliklar ve Etiketler</h1>\n<h2>Bu Kural Ne Anlama Geliyor</h2>\n<h2>Etkili Basliklar Nasil Yazilir</h2>\n<h2>Form Etiketi En Iyi Uygulamalari</h2>',
          'html'
        ),

        heading('Aciklayici form etiketleri', 'h3'),
        code(
          '<!-- Yanlis: Belirsiz etiketler -->\n<label for="alan1">Girdi</label>\n<input id="alan1" type="text">\n\n<label for="alan2">Deger girin</label>\n<input id="alan2" type="text">\n\n<!-- Dogru: Aciklayici etiketler -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" type="email" autocomplete="email">\n\n<label for="telefon">Telefon numarasi (istege bagli)</label>\n<input id="telefon" type="tel" autocomplete="tel">',
          'html'
        ),

        heading('Fieldset ve legend ile grup etiketleri', 'h3'),
        code(
          '<fieldset>\n  <legend>Bildirim tercihleri</legend>\n  <label>\n    <input type="checkbox" name="bildirim" value="eposta">\n    E-posta bildirimleri\n  </label>\n  <label>\n    <input type="checkbox" name="bildirim" value="sms">\n    SMS bildirimleri\n  </label>\n</fieldset>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('"Giris", "Bolum 1" veya "Ayrintilar" gibi gercek konuyu tanimlamayan basliklar kullanmak.'),
        bullet('Ayni sayfada farkli bolumler icin ayni basliklari kullanmak.'),
        bullet('Hangi verinin beklendigi belirtilmeden "Girdi", "Alan" veya "Veri girin" diyen form etiketleri.'),
        bullet('Tek etiket olarak yer tutucu metin kullanmak — yer tutucular giriste kaybolur ve tum ekran okuyucular tarafindan guvenilir sekilde okunmaz.'),
        bullet('Baslik duzeylerini atlamak (ornegin h1\'den h3\'e gecmek), bu da mantikli belge anahatini bozar.'),
        bullet('Baslik ogelerini yapisal organizasyon yerine yalnizca gorsel stil icin kullanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.6: Headings and Labels',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r246w3cu',
      },
      {
        title: 'WebAIM: Headings',
        url: 'https://webaim.org/techniques/semanticstructure/',
        source: 'webaim',
        language: 'en',
        _key: 'r246waim',
      },
      {
        title: 'Deque: page-has-heading-one Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/page-has-heading-one',
        source: 'deque',
        language: 'en',
        _key: 'r246dequ',
      },
      {
        title: 'W3C Techniques: G130 — Providing descriptive headings',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G130',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r246w3ct',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.6 Headings and Labels — Descriptive Content Structure Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.6 Headings and Labels. Write descriptive headings and form labels that clearly identify topics and expected input.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.6 Basliklar ve Etiketler — Aciklayici Icerik Yapisi Rehberi',
        metaDescription:
          'WCAG 2.4.6 Basliklar ve Etiketler kriterini nasil karsilayacaginizi ogrenin. Konulari ve beklenen girdileri acikca tanimlayan basliklar ve form etiketleri yazin.',
      },
    },
  },

  // ─── 2.4.7 Focus Visible ───────────────────────────────────────────
  {
    criterionNumber: '2.4.7',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: ['focus-visible'],
    tags: ['focus', 'keyboard', 'visual'],

    title: {
      en: 'Focus Visible',
      tr: 'Gorunur Odak',
    },

    description: {
      en: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
      tr: 'Klavye ile isleneblir her kullanici arayuzunde klavye odak gostergesinin gorunur oldugu bir islem modu bulunmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.7 requires that when users navigate with a keyboard, the currently focused element must have a visible focus indicator. This is typically a visible outline, border change, or highlight that clearly shows which element has keyboard focus. Without this visual cue, keyboard users are navigating blind.'
        ),
        p(
          'The focus indicator must be visible in all states — not just on some elements or some pages. It applies to links, buttons, form fields, custom components, and any other focusable element. The default browser focus outline satisfies this requirement, but many sites remove it without providing a replacement.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Keyboard users rely on the focus indicator the way mouse users rely on the cursor. Without a visible focus indicator, pressing Tab becomes a guessing game — users cannot tell which element is selected, cannot predict what will happen when they press Enter, and cannot efficiently navigate the page. This makes websites effectively unusable for keyboard-only users.'
        ),
        p(
          'Visible focus is critical for users with motor impairments, low vision, and cognitive disabilities. It is also important for power users who prefer keyboard navigation for speed and efficiency. Removing the focus outline without replacement is one of the most common and most impactful accessibility failures on the web.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('focus-visible — Checks that interactive elements have a visible focus indicator when focused via keyboard.'),

        heading('How to test', 'h2'),
        numbered('Disconnect your mouse and navigate through the entire page using only Tab and Shift+Tab.'),
        numbered('Verify that every interactive element (links, buttons, inputs, selects, custom widgets) shows a clearly visible focus indicator when it receives focus.'),
        numbered('Check that the focus indicator has sufficient contrast against its background — at least 3:1 contrast ratio.'),
        numbered('Test in different browsers, as focus styles may vary.'),
        bullet('Look for CSS rules like outline: none, outline: 0, or *:focus { outline: none } in the codebase — these are red flags.'),
        bullet('Verify that custom focus styles are at least as visible as the default browser outline.'),

        heading('How to fix', 'h2'),
        p('Never remove the default focus outline without providing a visible alternative. Use the :focus-visible pseudo-class to show focus indicators only for keyboard navigation.'),

        heading('Focus outline CSS — best practices', 'h3'),
        code(
          '/* NEVER do this without a replacement */\n*:focus {\n  outline: none; /* Removes focus indicator for ALL users */\n}\n\n/* Good: Custom focus style for keyboard users only */\n:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}\n\n/* Good: Hide outline for mouse clicks, show for keyboard */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* Good: High-contrast focus ring */\n:focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 3px;\n  border-radius: 2px;\n}',
          'css'
        ),

        heading('Focus styles for dark and light themes', 'h3'),
        code(
          '/* Light theme focus */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Dark theme focus */\n@media (prefers-color-scheme: dark) {\n  :focus-visible {\n    outline: 3px solid #6bb3ff;\n    outline-offset: 2px;\n  }\n}\n\n/* Double-ring technique for any background */\n:focus-visible {\n  outline: 3px solid #ffffff;\n  box-shadow: 0 0 0 6px #000000;\n}',
          'css'
        ),

        heading('Focus indicator on custom components', 'h3'),
        code(
          '<!-- Custom card that is focusable -->\n<div role="button" tabindex="0" class="card">\n  <h3>Audit Report</h3>\n  <p>View your latest accessibility audit results</p>\n</div>\n\n<style>\n.card:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 4px rgba(74, 144, 217, 0.3);\n}\n</style>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using outline: none or outline: 0 globally without providing any alternative focus indicator.'),
        bullet('Providing a focus indicator with insufficient contrast — it must have at least 3:1 contrast against adjacent colors.'),
        bullet('Using only a color change as the focus indicator — color alone cannot be the only visual distinction for colorblind users.'),
        bullet('Custom components (divs with role="button", custom dropdowns) that have no focus styles at all.'),
        bullet('Focus indicators that are too subtle — a 1px dotted line may not be visible enough, especially for low-vision users.'),
        bullet('Removing focus outlines "because the designer said so" — accessibility is a functional requirement, not optional styling.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.7, kullanicilar klavye ile gezindiginde o anda odaklanmis olan ogenin gorunur bir odak gostergesine sahip olmasini gerektirir. Bu genellikle hangi ogenin klavye odagina sahip oldugunu acikca gosteren gorunur bir cizgi, kenarlik degisikligi veya vurgudur. Bu gorsel ipucu olmadan klavye kullanicilari kor geziniyordur.'
        ),
        p(
          'Odak gostergesi tum durumlarda gorunur olmalidir — yalnizca bazi ogelerde veya bazi sayfalarda degil. Baglantilar, dugmeler, form alanlari, ozel bilesenler ve odaklanabilir diger tum ogeler icin gecerlidir. Varsayilan tarayici odak cizgisi bu gereksinimi karsilar ancak bircok site bunu bir yedek saglamadan kaldirir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Klavye kullanicilari odak gostergesine, fare kullanicilarinin imlece guvendigi gibi guvenilir. Gorunur bir odak gostergesi olmadan Tab tusuna basmak bir tahmin oyununa donusur — kullanicilar hangi ogenin secili oldugunu bilemez, Enter tusuna bastiklarinda ne olacagini tahmin edemez ve sayfada verimli gezinme yapamaz. Bu, web sitelerini yalnizca klavye kullanan kisiler icin fiilen kullanilamaz hale getirir.'
        ),
        p(
          'Gorunur odak, motor engelli, az goren ve bilissel engelli kullanicilar icin kritik oneme sahiptir. Hiz ve verimlilik icin klavye gezinmesini tercih eden deneyimli kullanicilar icin de onemlidir. Odak cizgisini yedek saglamadan kaldirmak, webdeki en yaygin ve en etkili erisilebilirlik hatalarindan biridir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('focus-visible — Etkilesimli ogelerin klavye ile odaklanildiginda gorunur bir odak gostergesine sahip olup olmadigini kontrol eder.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Farenizi baglantisini kesin ve sayfanin tamaminda yalnizca Tab ve Shift+Tab tuslariyla gezinin.'),
        numbered('Her etkilesimli ogenin (baglantilar, dugmeler, girdiler, seciciler, ozel bilesenler) odak aldiginda acikca gorunur bir odak gostergesi gosterdigini dogrulayin.'),
        numbered('Odak gostergesinin arka planina karsi yeterli kontrasta sahip olup olmadigini kontrol edin — en az 3:1 kontrast orani.'),
        numbered('Farkli tarayicilarda test edin cunku odak stilleri degisebilir.'),
        bullet('Kod tabaninda outline: none, outline: 0 veya *:focus { outline: none } gibi CSS kurallarini arayin — bunlar uyari isaretleridir.'),
        bullet('Ozel odak stillerinin varsayilan tarayici cizgisi kadar gorunur oldugundan emin olun.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Varsayilan odak cizgisini gorunur bir alternatif saglamadan asla kaldirmayin. Odak gostergelerini yalnizca klavye gezinmesi icin gostermek icin :focus-visible sahte sinifini kullanin.'),

        heading('Odak cizgisi CSS — en iyi uygulamalar', 'h3'),
        code(
          '/* Yedek olmadan ASLA bunu yapmayin */\n*:focus {\n  outline: none; /* TUM kullanicilar icin odak gostergesini kaldirir */\n}\n\n/* Dogru: Yalnizca klavye kullanicilari icin ozel odak stili */\n:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}\n\n/* Dogru: Fare tiklari icin cizgiyi gizle, klavye icin goster */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* Dogru: Yuksek kontrastli odak halkasi */\n:focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 3px;\n  border-radius: 2px;\n}',
          'css'
        ),

        heading('Karanlik ve acik temalar icin odak stilleri', 'h3'),
        code(
          '/* Acik tema odagi */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Karanlik tema odagi */\n@media (prefers-color-scheme: dark) {\n  :focus-visible {\n    outline: 3px solid #6bb3ff;\n    outline-offset: 2px;\n  }\n}\n\n/* Her arka plan icin cift halka teknigi */\n:focus-visible {\n  outline: 3px solid #ffffff;\n  box-shadow: 0 0 0 6px #000000;\n}',
          'css'
        ),

        heading('Ozel bilesenlerde odak gostergesi', 'h3'),
        code(
          '<!-- Odaklanabilir ozel kart -->\n<div role="button" tabindex="0" class="kart">\n  <h3>Denetim Raporu</h3>\n  <p>En son erisilebilirlik denetim sonuclarinizi goruntuleyin</p>\n</div>\n\n<style>\n.kart:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 4px rgba(74, 144, 217, 0.3);\n}\n</style>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Herhangi bir alternatif odak gostergesi saglamadan outline: none veya outline: 0 kullanmak.'),
        bullet('Yetersiz kontrasta sahip bir odak gostergesi saglamak — bitisik renklere karsi en az 3:1 kontrast olmalidir.'),
        bullet('Odak gostergesi olarak yalnizca renk degisikligi kullanmak — renk korlugu olan kullanicilar icin renk tek gorsel ayrimi olamaz.'),
        bullet('Hicbir odak stili olmayan ozel bilesenler (role="button" ile div\'ler, ozel acilir menular).'),
        bullet('Cok ince odak gostergeleri — 1px noktali cizgi ozellikle az goren kullanicilar icin yeterince gorunur olmayabilir.'),
        bullet('Odak cizgilerini "tasarimci istedi diye" kaldirmak — erisilebilirlik islevsel bir gerekliliktir, istege bagli stil degildir.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.7: Focus Visible',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r247w3cu',
      },
      {
        title: 'MDN: :focus-visible pseudo-class',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible',
        source: 'mdn',
        language: 'en',
        _key: 'r247mdnf',
      },
      {
        title: 'The A11Y Project: Quick tip — never remove CSS outlines',
        url: 'https://www.a11yproject.com/posts/never-remove-css-outlines/',
        source: 'a11y-project',
        language: 'en',
        _key: 'r247a11y',
      },
      {
        title: 'Deque: Focus Visible',
        url: 'https://dequeuniversity.com/rules/axe/4.10/focus-visible',
        source: 'deque',
        language: 'en',
        _key: 'r247dequ',
      },
      {
        title: 'WebAIM: CSS in Action — Invisible Content',
        url: 'https://webaim.org/techniques/css/invisiblecontent/',
        source: 'webaim',
        language: 'en',
        _key: 'r247waim',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.7 Focus Visible — Keyboard Focus Indicator Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.7 Focus Visible. Implement visible keyboard focus indicators with CSS :focus-visible, outline styles, and high-contrast focus rings.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.7 Gorunur Odak — Klavye Odak Gostergesi Rehberi',
        metaDescription:
          'WCAG 2.4.7 Gorunur Odak kriterini nasil karsilayacaginizi ogrenin. CSS :focus-visible, cizgi stilleri ve yuksek kontrastli odak halkalariyla gorunur klavye odak gostergeleri uygulayin.',
      },
    },
  },

  // ─── 2.4.8 Location ────────────────────────────────────────────────
  {
    criterionNumber: '2.4.8',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['navigation', 'breadcrumb', 'sitemap'],

    title: {
      en: 'Location',
      tr: 'Konum',
    },

    description: {
      en: 'Information about the user\'s location within a set of web pages is available.',
      tr: 'Kullanicinin bir dizi web sayfasi icindeki konumu hakkinda bilgi saglanmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.8 requires that users can determine their location within a website\'s structure. This includes knowing which page they are on, where that page sits within the site hierarchy, and how to navigate to related content. Common techniques include breadcrumb trails, highlighted navigation items, site maps, and step indicators in multi-step processes.'
        ),
        p(
          'This is a Level AAA criterion that builds on the navigation foundations of 2.4.5 (Multiple Ways). While 2.4.5 ensures users can find pages, 2.4.8 ensures users always know where they are.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with cognitive disabilities may become disoriented when navigating complex websites. Breadcrumbs and visual location indicators provide constant wayfinding cues that reduce cognitive load. Screen reader users benefit from breadcrumbs because they provide a concise summary of the site hierarchy without requiring exploration of the navigation menu.'
        ),
        p(
          'Location information also helps all users understand the structure and scope of the site, recover from navigation mistakes, and quickly move to parent or sibling sections.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are no automated axe-core rules for this criterion. It requires manual review of location indicators.'),

        heading('How to test', 'h2'),
        numbered('Navigate to several pages at different levels of the site hierarchy and verify that location information is present.'),
        numbered('Check that breadcrumb trails accurately reflect the page hierarchy.'),
        numbered('Verify that the current page is highlighted or indicated in the navigation menu.'),
        numbered('For multi-step processes, confirm a step indicator shows the current position.'),
        bullet('Verify breadcrumbs use proper semantic markup with nav and aria-label.'),
        bullet('Test with a screen reader to confirm location information is announced.'),

        heading('How to fix', 'h2'),
        p('Implement breadcrumb navigation, highlight the current page in navigation, and add step indicators for multi-step processes.'),

        heading('Breadcrumb navigation with schema.org', 'h3'),
        code(
          '<nav aria-label="Breadcrumb">\n  <ol itemscope itemtype="https://schema.org/BreadcrumbList">\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/"><span itemprop="name">Home</span></a>\n      <meta itemprop="position" content="1" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/kb"><span itemprop="name">Knowledge Base</span></a>\n      <meta itemprop="position" content="2" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <span itemprop="name" aria-current="page">Location</span>\n      <meta itemprop="position" content="3" />\n    </li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Current page indicator in navigation', 'h3'),
        code(
          '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/services">Services</a></li>\n    <li><a href="/kb" aria-current="page">Knowledge Base</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>\n\n<style>\n[aria-current="page"] {\n  font-weight: bold;\n  border-bottom: 3px solid currentColor;\n}\n</style>',
          'html'
        ),

        heading('Step indicator for multi-step process', 'h3'),
        code(
          '<nav aria-label="Progress">\n  <ol>\n    <li aria-current="step">\n      <span>Step 1: Account details</span>\n    </li>\n    <li>\n      <span>Step 2: Site configuration</span>\n    </li>\n    <li>\n      <span>Step 3: Review and confirm</span>\n    </li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('No breadcrumbs or location indicators on any pages, leaving users without orientation cues.'),
        bullet('Breadcrumbs that do not reflect the actual page hierarchy or show incorrect paths.'),
        bullet('Navigation menus where the current page is not visually distinguished from other items.'),
        bullet('Using aria-current incorrectly or not at all to indicate the current page.'),
        bullet('Multi-step processes without a step indicator showing the user\'s current position.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.8, kullanicilarin bir web sitesinin yapisi icindeki konumlarini belirleyebilmesini gerektirir. Bu, hangi sayfada olduklarini, o sayfanin site hiyerarsisi icinde nerede oldugunu ve ilgili iceriklere nasil gideceklerini bilmeyi icerir. Yaygin teknikler arasinda icerik kirintisi yollari, vurgulanan gezinme ogeleri, site haritalari ve cok adimli sureclerdeki adim gostergeleri bulunur.'
        ),
        p(
          'Bu, 2.4.5 (Birden Fazla Yol) gezinme temellerini genisleten bir AAA duzey kriterdir. 2.4.5 kullanicilarin sayfalari bulabilmesini saglarken, 2.4.8 kullanicilarin her zaman nerede olduklarini bilmesini saglar.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Bilissel engelli kullanicilar karmasik web sitelerinde gezinirken yonunu kaybedebilir. Icerik kirintilari ve gorsel konum gostergeleri bilissel yuku azaltan surekli yol bulma ipuclari saglar. Ekran okuyucu kullanicilari, gezinme menusunun kesfini gerektirmeden site hiyerarsisinin ozlu bir ozetini sagladiklari icin icerik kirintilarindan fayda gorur.'
        ),
        p(
          'Konum bilgisi ayrica tum kullanicilarin sitenin yapisini ve kapsamini anlamasina, gezinme hatalarindan kurtulmasina ve ust veya kardes bolumlere hizla gecmesine yardimci olur.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('Bu kriter icin otomatik axe-core kurali yoktur. Konum gostergelerinin manuel incelemesi gerektirir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Site hiyerarsisinin farkli duzeylerindeki birden fazla sayfaya gidin ve konum bilgisinin mevcut oldugunu dogrulayin.'),
        numbered('Icerik kirintisi yollarinin sayfa hiyerarsisini dogru yansittigini kontrol edin.'),
        numbered('Mevcut sayfanin gezinme menusunde vurgulandigini veya belirtildigini dogrulayin.'),
        numbered('Cok adimli sureclerde mevcut konumu gosteren bir adim gostergesini onaylayin.'),
        bullet('Icerik kirintilerinin nav ve aria-label ile uygun semantik isaretleme kullandigini dogrulayin.'),
        bullet('Bir ekran okuyucu ile test ederek konum bilgisinin duyuruldugunu onaylayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Icerik kirintisi gezinmesi uygulayin, gezinmede mevcut sayfayi vurgulayin ve cok adimli sureclere adim gostergeleri ekleyin.'),

        heading('Schema.org ile icerik kirintisi gezinmesi', 'h3'),
        code(
          '<nav aria-label="Icerik kirintisi">\n  <ol itemscope itemtype="https://schema.org/BreadcrumbList">\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/"><span itemprop="name">Ana Sayfa</span></a>\n      <meta itemprop="position" content="1" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/bb"><span itemprop="name">Bilgi Bankasi</span></a>\n      <meta itemprop="position" content="2" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <span itemprop="name" aria-current="page">Konum</span>\n      <meta itemprop="position" content="3" />\n    </li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Gezinmede mevcut sayfa gostergesi', 'h3'),
        code(
          '<nav aria-label="Ana gezinme">\n  <ul>\n    <li><a href="/">Ana Sayfa</a></li>\n    <li><a href="/hizmetler">Hizmetler</a></li>\n    <li><a href="/bb" aria-current="page">Bilgi Bankasi</a></li>\n    <li><a href="/iletisim">Iletisim</a></li>\n  </ul>\n</nav>\n\n<style>\n[aria-current="page"] {\n  font-weight: bold;\n  border-bottom: 3px solid currentColor;\n}\n</style>',
          'html'
        ),

        heading('Cok adimli surec icin adim gostergesi', 'h3'),
        code(
          '<nav aria-label="Ilerleme">\n  <ol>\n    <li aria-current="step">\n      <span>Adim 1: Hesap bilgileri</span>\n    </li>\n    <li>\n      <span>Adim 2: Site yapilandirmasi</span>\n    </li>\n    <li>\n      <span>Adim 3: Inceleme ve onay</span>\n    </li>\n  </ol>\n</nav>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Hicbir sayfada icerik kirintisi veya konum gostergesi olmamasi, kullanicilari yonelim ipuclari olmadan birakmak.'),
        bullet('Gercek sayfa hiyerarsisini yansitmayan veya yanlis yollar gosteren icerik kirintilari.'),
        bullet('Mevcut sayfanin diger ogelerden gorsel olarak ayirt edilmedigi gezinme menuleri.'),
        bullet('Mevcut sayfayi belirtmek icin aria-current\'in yanlis kullanilmasi veya hic kullanilmamasi.'),
        bullet('Kullanicinin mevcut konumunu gosteren bir adim gostergesi olmayan cok adimli surecler.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.8: Location',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/location.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r248w3cu',
      },
      {
        title: 'W3C WAI: Breadcrumb Navigation',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r248waib',
      },
      {
        title: 'W3C Techniques: G65 — Providing a breadcrumb trail',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G65',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r248w3ct',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.8 Location — Breadcrumb and Wayfinding Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.8 Location. Implement breadcrumbs, current page indicators, and step indicators to help users know where they are within your site.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.8 Konum — Icerik Kirintisi ve Yol Bulma Rehberi',
        metaDescription:
          'WCAG 2.4.8 Konum kriterini nasil karsilayacaginizi ogrenin. Kullanicilarin sitenizdeki konumlarini bilmelerine yardimci olmak icin icerik kirintilari ve adim gostergeleri uygulayin.',
      },
    },
  },

  // ─── 2.4.9 Link Purpose (Link Only) ────────────────────────────────
  {
    criterionNumber: '2.4.9',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: ['identical-links-same-purpose'],
    tags: ['links', 'navigation'],

    title: {
      en: 'Link Purpose (Link Only)',
      tr: 'Baglanti Amaci (Yalnizca Baglanti)',
    },

    description: {
      en: 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
      tr: 'Her baglantinin amacinin yalnizca baglanti metninden belirlenmesine olanak taniyan bir mekanizma saglanmalidir; baglantinin amacinin genel olarak kullanicilar icin belirsiz olacagi durumlar haric.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.9 is the enhanced version of 2.4.4 (Link Purpose — In Context). While 2.4.4 allows link purpose to be determined from surrounding context, this AAA criterion requires that every link\'s purpose can be determined from the link text alone — without relying on the surrounding paragraph, heading, or list item.'
        ),
        p(
          'This means link text like "Read more" is never acceptable under this criterion, even if the surrounding context clarifies the destination. Every link must be self-descriptive. The only exception is when the link\'s purpose would be ambiguous to all users, not just assistive technology users.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users commonly navigate using a links list — a dialog that shows all links on the page extracted from their context. When link text is self-descriptive, users can scan this list and immediately find the link they need. This is significantly faster and more efficient than navigating to each link in the page and relying on surrounding content for context.'
        ),
        p(
          'Self-descriptive links also benefit users of voice control software who activate links by speaking their visible text, and users with cognitive disabilities who may not track the relationship between link text and surrounding context.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('identical-links-same-purpose — Ensures that links with identical accessible names serve the same purpose.'),

        heading('How to test', 'h2'),
        numbered('Generate a list of all links on the page (screen reader links list or browser extension).'),
        numbered('Review each link in isolation — can you determine where it leads without any surrounding context?'),
        numbered('Run axe-core to detect identical-links-same-purpose violations.'),
        numbered('Check that no links use generic text like "click here", "read more", "learn more", or "here" as standalone link text.'),
        bullet('Verify that image links have alt text that fully describes the link destination.'),

        heading('How to fix', 'h2'),
        p('Replace all generic link text with self-descriptive text, or use aria-label to provide descriptive accessible names.'),

        heading('Self-descriptive link text', 'h3'),
        code(
          '<!-- Fails 2.4.9: Requires context to understand -->\n<article>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site for compliance. <a href="/services/audit">Read more</a></p>\n</article>\n\n<!-- Passes 2.4.9: Link text is self-descriptive -->\n<article>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site for compliance.\n    <a href="/services/audit">Learn about our accessibility audit service</a>\n  </p>\n</article>',
          'html'
        ),

        heading('Cards with self-descriptive links', 'h3'),
        code(
          '<!-- Fails: Multiple "View details" links on the same page -->\n<div class="card">\n  <h3>Monthly Report</h3>\n  <a href="/reports/monthly">View details</a>\n</div>\n<div class="card">\n  <h3>Annual Summary</h3>\n  <a href="/reports/annual">View details</a>\n</div>\n\n<!-- Passes: Each link is uniquely descriptive -->\n<div class="card">\n  <h3>Monthly Report</h3>\n  <a href="/reports/monthly">View monthly report details</a>\n</div>\n<div class="card">\n  <h3>Annual Summary</h3>\n  <a href="/reports/annual">View annual summary details</a>\n</div>',
          'html'
        ),

        heading('Using aria-label when visual text must be short', 'h3'),
        code(
          '<!-- Visual design requires "Read more" but a11y needs detail -->\n<a href="/blog/wcag-guide"\n   aria-label="Read more about the complete WCAG compliance guide">\n  Read more\n</a>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Any use of "click here", "read more", "learn more", "here", or "more" as link text — even with surrounding context.'),
        bullet('Multiple links with the same text pointing to different destinations (e.g., multiple "Download" links).'),
        bullet('Relying on aria-describedby for link purpose — this adds a description but does not change the accessible name.'),
        bullet('Image links where the alt text says "icon" or "image" instead of describing the link destination.'),
        bullet('Links that combine an image and text but result in duplicate announcements by screen readers.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.9, 2.4.4\'un (Baglanti Amaci — Baglamda) gelistirilmis versiyonudur. 2.4.4 baglanti amacinin cevreleyen baglamdan belirlenmesine izin verirken, bu AAA kriteri her baglantinin amacinin yalnizca baglanti metninden — cevreleyen paragraf, baslik veya liste ogesine dayanmadan — belirlenebilmesini gerektirir.'
        ),
        p(
          'Bu, cevreleyen baglam hedefi netlestirse bile "Devamini oku" gibi baglanti metninin bu kriter altinda asla kabul edilebilir olmadigini belirtir. Her baglanti kendini tanimlamalidir. Tek istisna, baglantinin amacinin yalnizca yardimci teknoloji kullanicilarina degil tum kullanicilar icin belirsiz olacagi durumlarda gecerlidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari yaygin olarak baglantilar listesi kullanarak gezinir — sayfadaki tum baglantilari baglamlarindan ayrilmis olarak gosteren bir iletisim kutusu. Baglanti metni kendini tanimladiginda kullanicilar bu listeyi tarayabilir ve ihtiyac duydiklari baglantini hemen bulabilir. Bu, sayfadaki her baglanina gidip baglam icin cevreleyen iceriklere guvenmekten onemli olcude daha hizli ve verimlidir.'
        ),
        p(
          'Kendini tanimlayan baglantilar ayrica baglantilari gorunur metinlerini soyleyerek etkinlestiren ses kontrolu yazilimi kullanan kullanicilar ve baglanti metni ile cevreleyen baglam arasindaki iliskiyi takip edemeyen bilissel engelli kullanicilar icin de fayda saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('identical-links-same-purpose — Ayni erisilebilir ada sahip baglantilarin ayni amaca hizmet etmesini dogrular.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Sayfadaki tum baglantilarin listesini olusturun (ekran okuyucu baglanti listesi veya tarayici eklentisi).'),
        numbered('Her baglantini izole olarak inceleyin — cevreleyen baglam olmadan nereye goturdigini belirleyebiliyor musunuz?'),
        numbered('axe-core calistirarak identical-links-same-purpose ihlallerini tespit edin.'),
        numbered('Hicbir baglantinin bagimsiz baglanti metni olarak "buraya tiklayin", "devamini oku", "daha fazla bilgi" veya "burada" gibi genel metin kullanmadigini kontrol edin.'),
        bullet('Gorsel baglantilarin baglanti hedefini tam olarak tanimlayan alt metnine sahip oldugundan emin olun.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Tum genel baglanti metinlerini kendini tanimlayan metinle degistirin veya aciklayici erisilebilir adlar saglamak icin aria-label kullanin.'),

        heading('Kendini tanimlayan baglanti metni', 'h3'),
        code(
          '<!-- 2.4.9\'u gecemiyor: Anlamak icin baglam gerektiriyor -->\n<article>\n  <h3>Erisilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi uyumluluk icin test ediyoruz. <a href="/hizmetler/denetim">Devamini oku</a></p>\n</article>\n\n<!-- 2.4.9\'u geciyor: Baglanti metni kendini tanimlayan -->\n<article>\n  <h3>Erisilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi uyumluluk icin test ediyoruz.\n    <a href="/hizmetler/denetim">Erisilebilirlik denetim hizmetimiz hakkinda bilgi edinin</a>\n  </p>\n</article>',
          'html'
        ),

        heading('Kendini tanimlayan baglantili kartlar', 'h3'),
        code(
          '<!-- Basarisiz: Ayni sayfada birden fazla "Ayrintilari gor" baglantisi -->\n<div class="kart">\n  <h3>Aylik Rapor</h3>\n  <a href="/raporlar/aylik">Ayrintilari gor</a>\n</div>\n<div class="kart">\n  <h3>Yillik Ozet</h3>\n  <a href="/raporlar/yillik">Ayrintilari gor</a>\n</div>\n\n<!-- Basarili: Her baglanti benzersiz sekilde aciklayici -->\n<div class="kart">\n  <h3>Aylik Rapor</h3>\n  <a href="/raporlar/aylik">Aylik rapor ayrintilarini gor</a>\n</div>\n<div class="kart">\n  <h3>Yillik Ozet</h3>\n  <a href="/raporlar/yillik">Yillik ozet ayrintilarini gor</a>\n</div>',
          'html'
        ),

        heading('Gorsel metin kisa olmali ise aria-label kullanimi', 'h3'),
        code(
          '<!-- Gorsel tasarim "Devamini oku" gerektiriyor ama a11y icin ayrinti lazim -->\n<a href="/blog/wcag-rehberi"\n   aria-label="Tam WCAG uyumluluk rehberi hakkinda devamini oku">\n  Devamini oku\n</a>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('"Buraya tiklayin", "devamini oku", "daha fazla bilgi", "burada" veya "daha fazla" ifadelerinin baglanti metni olarak herhangi bir kullanimi — cevreleyen baglamla bile.'),
        bullet('Farkli hedeflere isaret eden ayni metne sahip birden fazla baglanti (ornegin birden fazla "Indir" baglantisi).'),
        bullet('Baglanti amaci icin aria-describedby kullanmak — bu bir aciklama ekler ancak erisilebilir adi degistirmez.'),
        bullet('Alt metnin baglanti hedefini tanimlamak yerine "simge" veya "gorsel" dedigi gorsel baglantilar.'),
        bullet('Bir gorsel ve metni birlestiren ancak ekran okuyucularda tekrarlanan duyurulara neden olan baglantilar.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.9: Link Purpose (Link Only)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r249w3cu',
      },
      {
        title: 'W3C Techniques: G91 — Providing link text that describes the purpose',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G91',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r249w3ct',
      },
      {
        title: 'Deque: identical-links-same-purpose Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose',
        source: 'deque',
        language: 'en',
        _key: 'r249dequ',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.9 Link Purpose (Link Only) — Self-Descriptive Links Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.9 Link Purpose (Link Only). Write self-descriptive link text that conveys purpose without relying on surrounding context.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.9 Baglanti Amaci (Yalnizca Baglanti) — Kendini Tanimlayan Baglantilar Rehberi',
        metaDescription:
          'WCAG 2.4.9 Baglanti Amaci kriterini nasil karsilayacaginizi ogrenin. Cevreleyen baglama dayanmadan amaci ileten kendini tanimlayan baglanti metni yazin.',
      },
    },
  },

  // ─── 2.4.10 Section Headings ───────────────────────────────────────
  {
    criterionNumber: '2.4.10',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['headings', 'structure'],

    title: {
      en: 'Section Headings',
      tr: 'Bolum Basliklari',
    },

    description: {
      en: 'Section headings are used to organize the content.',
      tr: 'Icerigi duzenlemek icin bolum basliklari kullanilmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.10 requires that content is organized using section headings. When web content is divided into sections, each section should begin with an appropriate heading element (h1-h6) that describes the content of that section. This builds on 2.4.6 (Headings and Labels) which requires headings to be descriptive — this criterion requires headings to be present for all sections.'
        ),
        p(
          'This is a Level AAA criterion that pushes for comprehensive heading structure throughout all content. The intent is to ensure that every distinct section of content is introduced by a heading, making the page fully navigable by heading for assistive technology users.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users navigate primarily by heading. The heading structure serves as a table of contents for the page — users can jump from heading to heading to quickly scan the page and find relevant sections. Without comprehensive headings, users must read content linearly to understand the page structure, which is extremely slow and fatiguing.'
        ),
        p(
          'Headings also benefit users with cognitive disabilities by breaking content into manageable chunks, users with low vision who use screen magnifiers by providing orientation points, and all users who scan pages visually.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are no specific automated axe-core rules that enforce section headings on all sections. This criterion requires manual content review.'),

        heading('How to test', 'h2'),
        numbered('Use a browser extension to generate a heading outline of the page (e.g., HeadingsMap, WAVE).'),
        numbered('Verify that every distinct content section is preceded by a heading element.'),
        numbered('Check that the heading hierarchy is logical and does not skip levels (h1 > h2 > h3).'),
        numbered('Navigate with a screen reader using heading navigation (H key) and confirm the page structure is clear.'),
        bullet('Ensure headings are not used on elements that are not actually section headings (e.g., using h3 for visual styling).'),
        bullet('Check that there is exactly one h1 per page, serving as the main page title.'),

        heading('How to fix', 'h2'),
        p('Add heading elements at the beginning of each content section, maintaining a logical hierarchy.'),

        heading('Proper heading structure', 'h3'),
        code(
          '<main>\n  <h1>Accessibility Knowledge Base</h1>\n\n  <section>\n    <h2>Perceivable</h2>\n    <p>Content must be presentable to users in ways they can perceive...</p>\n\n    <section>\n      <h3>Text Alternatives</h3>\n      <p>Provide text alternatives for non-text content...</p>\n    </section>\n\n    <section>\n      <h3>Adaptable</h3>\n      <p>Create content that can be presented in different ways...</p>\n    </section>\n  </section>\n\n  <section>\n    <h2>Operable</h2>\n    <p>User interface components must be operable...</p>\n  </section>\n</main>',
          'html'
        ),

        heading('Using ARIA for implicit sections', 'h3'),
        code(
          '<!-- When section headings are visually hidden but needed for AT -->\n<section aria-labelledby="sidebar-heading">\n  <h2 id="sidebar-heading" class="sr-only">Related Articles</h2>\n  <ul>\n    <li><a href="/kb/2-4-7">Focus Visible</a></li>\n    <li><a href="/kb/2-4-11">Focus Not Obscured</a></li>\n  </ul>\n</section>\n\n<style>\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n</style>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Content sections without any heading — users cannot navigate to or identify these sections.'),
        bullet('Skipping heading levels (e.g., h1 directly to h3) which breaks the logical document outline.'),
        bullet('Using heading elements for visual styling rather than structural organization.'),
        bullet('Multiple h1 elements on a single page, making the primary topic unclear.'),
        bullet('Using bold or large text instead of heading elements — visually similar but invisible to assistive technology.'),
        bullet('Leaving the heading structure inconsistent across pages, confusing returning users.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.10, icerigin bolum basliklari kullanilarak duzenlenmesini gerektirir. Web icerigi bolumlere ayrildiginda her bolum, o bolumun icerigini tanimlayan uygun bir baslik ogesiyle (h1-h6) baslamalidir. Bu, basliklarin aciklayici olmasini gerektiren 2.4.6 (Basliklar ve Etiketler) uzerine insaedir — bu kriter tum bolumler icin basliklarin mevcut olmasini gerektirir.'
        ),
        p(
          'Bu, tum icerik boyunca kapsamli baslik yapisi icin baskilan bir AAA duzey kriterdir. Amac, icerigin her farkli bolumunun bir baslikla tanitilmasini, sayfalarin yardimci teknoloji kullanicilari icin baslikla tam olarak gezilebilir olmasini saglamaktir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari oncelikle baslik uzerinden gezinir. Baslik yapisi sayfa icin bir icerik tablosu gorevi gorur — kullanicilar basliktan basliga atlayarak sayfayi hizla tarayabilir ve ilgili bolumleri bulabilir. Kapsamli basliklar olmadan kullanicilarin sayfa yapisini anlamak icin icerigi dogrusal olarak okumasi gerekir ki bu son derece yavas ve yorucudur.'
        ),
        p(
          'Basliklar ayrica icerigi yonetilebilir parcalara bolerek bilissel engelli kullanicilara, yonelim noktalari saglayarak ekran buyuteculeri kullanan az goren kullanicilara ve sayfalari gorsel olarak tarayan tum kullanicilara fayda saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('Tum bolumlerde bolum basliklarini zorunlu kilan otomatik axe-core kurali yoktur. Bu kriter manuel icerik incelemesi gerektirir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Sayfanin baslik anahatini olusturmak icin bir tarayici eklentisi kullanin (ornegin HeadingsMap, WAVE).'),
        numbered('Her farkli icerik bolumunun bir baslik ogesiyle basladigini dogrulayin.'),
        numbered('Baslik hiyerarsisinin mantikli oldugunu ve seviyeleri atlamadigini (h1 > h2 > h3) kontrol edin.'),
        numbered('Baslik gezinmesini (H tusu) kullanarak bir ekran okuyucu ile gezinin ve sayfa yapisinin acik oldugunu onaylayin.'),
        bullet('Basliklarin aslinda bolum basliklari olmayan ogelerde kullanilmadigini (ornegin gorsel stil icin h3 kullanmak) kontrol edin.'),
        bullet('Ana sayfa basligi olarak hizmet eden sayfa basina tam olarak bir h1 oldugunu kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Her icerik bolumunun basina mantikli bir hiyerarsiyi koruyarak baslik ogeleri ekleyin.'),

        heading('Dogru baslik yapisi', 'h3'),
        code(
          '<main>\n  <h1>Erisilebilirlik Bilgi Bankasi</h1>\n\n  <section>\n    <h2>Algilanabilir</h2>\n    <p>Icerik kullanicilara algilayabilecekleri sekilde sunulmalidir...</p>\n\n    <section>\n      <h3>Metin Alternatifleri</h3>\n      <p>Metin disi icerikler icin metin alternatifleri saglayin...</p>\n    </section>\n\n    <section>\n      <h3>Uyarlanabilir</h3>\n      <p>Farkli sekillerde sunulabilen icerik olusturun...</p>\n    </section>\n  </section>\n\n  <section>\n    <h2>Islenebilir</h2>\n    <p>Kullanici arayuzu bilesenleri islenebilir olmalidir...</p>\n  </section>\n</main>',
          'html'
        ),

        heading('Ortuk bolumler icin ARIA kullanimi', 'h3'),
        code(
          '<!-- Bolum basliklari gorsel olarak gizli ama YT icin gerekli oldugunda -->\n<section aria-labelledby="kenar-cubugu-basligi">\n  <h2 id="kenar-cubugu-basligi" class="sr-only">Ilgili Makaleler</h2>\n  <ul>\n    <li><a href="/bb/2-4-7">Gorunur Odak</a></li>\n    <li><a href="/bb/2-4-11">Odak Gizlenmemis</a></li>\n  </ul>\n</section>\n\n<style>\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n</style>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Basligi olmayan icerik bolumleri — kullanicilar bu bolumlere gezinemez veya bunlari tanimlayamaz.'),
        bullet('Baslik seviyelerini atlamak (ornegin h1\'den dogrudan h3\'e gecmek), bu da mantikli belge anahatini bozar.'),
        bullet('Baslik ogelerini yapisal organizasyon yerine gorsel stil icin kullanmak.'),
        bullet('Tek bir sayfada birden fazla h1 ogesi, birincil konuyu belirsiz kilar.'),
        bullet('Baslik ogeleri yerine kalin veya buyuk metin kullanmak — gorsel olarak benzer ancak yardimci teknoloji icin gorunmez.'),
        bullet('Baslik yapisini sayfalar arasinda tutarsiz birakmak, geri donen kullanicilarin kafasini karistirmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.10: Section Headings',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r2410w3c',
      },
      {
        title: 'WebAIM: Semantic Structure — Headings',
        url: 'https://webaim.org/techniques/semanticstructure/#headings',
        source: 'webaim',
        language: 'en',
        _key: 'r2410wai',
      },
      {
        title: 'W3C Techniques: G141 — Organizing a page using headings',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G141',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r2410tec',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.10 Section Headings — Page Structure Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.10 Section Headings. Use heading elements to organize all content sections for better navigation and accessibility.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.10 Bolum Basliklari — Sayfa Yapisi Rehberi',
        metaDescription:
          'WCAG 2.4.10 Bolum Basliklari kriterini nasil karsilayacaginizi ogrenin. Daha iyi gezinme ve erisilebilirlik icin tum icerik bolumlerini baslik ogeleriyle duzenleyin.',
      },
    },
  },

  // ─── 2.4.11 Focus Not Obscured (Minimum) ──────────────────────────
  {
    criterionNumber: '2.4.11',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['focus', 'keyboard', 'visual', 'sticky'],

    title: {
      en: 'Focus Not Obscured (Minimum)',
      tr: 'Odak Gizlenmemis (Minimum)',
    },

    description: {
      en: 'When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.',
      tr: 'Bir kullanici arayuzu bileseni klavye odagini aldiginda, bilesen yazar tarafindan olusturulan icerik nedeniyle tamamen gizlenmemelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.11 is a new criterion introduced in WCAG 2.2 that addresses a common modern web pattern: sticky headers, footers, cookie banners, and overlays that cover focused elements. When a component receives keyboard focus, at least part of it must remain visible — it must not be entirely hidden behind other content created by the page author.'
        ),
        p(
          'This is the minimum requirement — at least some part of the focused component must be visible. The enhanced version (2.4.12) requires that the focused component is fully visible. Note that this criterion only applies to content controlled by the author, not user-agent features like browser toolbars.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Sticky headers, fixed-position cookie banners, and chat widgets are ubiquitous on modern websites. When a keyboard user tabs to an element that is positioned behind one of these sticky elements, they cannot see what they are interacting with. This is equivalent to having a piece of paper covering part of a form while trying to fill it out — frustrating and error-prone.'
        ),
        p(
          'This problem disproportionately affects keyboard users because mouse users can scroll to reveal obscured elements, but keyboard focus does not automatically scroll the page to ensure visibility. Users with motor impairments, low vision, and cognitive disabilities are especially impacted.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are currently no automated axe-core rules for 2.4.11. This criterion requires manual testing with keyboard navigation.'),

        heading('How to test', 'h2'),
        numbered('Navigate the entire page using Tab. At each focused element, check if any sticky or fixed-position content covers it.'),
        numbered('Pay special attention to elements near the top and bottom of the viewport where sticky headers and footers appear.'),
        numbered('Trigger cookie banners, chat widgets, and notification bars, then tab through the page to check for obscured focus.'),
        numbered('Resize the browser window to a smaller size and repeat the test — obscured focus is more likely in smaller viewports.'),
        bullet('Check that scroll-padding or scroll-margin is used to account for sticky elements when focus causes scrolling.'),

        heading('How to fix', 'h2'),
        p('Use CSS scroll-padding to prevent sticky elements from obscuring focused content, and ensure overlays do not block interactive elements.'),

        heading('Scroll padding for sticky headers', 'h3'),
        code(
          '/* Prevent sticky header from covering focused elements */\nhtml {\n  scroll-padding-top: 80px; /* Height of sticky header */\n}\n\n/* If you have a sticky footer too */\nhtml {\n  scroll-padding-top: 80px;\n  scroll-padding-bottom: 60px;\n}\n\n/* Sticky header styles */\n.site-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  height: 80px;\n}',
          'css'
        ),

        heading('Cookie banner that does not obscure focus', 'h3'),
        code(
          '<!-- Cookie banner that pushes content up instead of overlaying -->\n<div class="cookie-banner" role="dialog" aria-label="Cookie consent">\n  <p>We use cookies to improve your experience.</p>\n  <div>\n    <button>Accept all</button>\n    <button>Reject non-essential</button>\n    <a href="/privacy">Cookie policy</a>\n  </div>\n</div>\n\n<style>\n.cookie-banner {\n  position: sticky;\n  bottom: 0;\n  z-index: 100;\n  padding: 1rem;\n  background: #1a1a2e;\n  color: #fff;\n}\n\n/* Adjust scroll padding when banner is visible */\nhtml:has(.cookie-banner) {\n  scroll-padding-bottom: 80px;\n}\n</style>',
          'html'
        ),

        heading('JavaScript: scroll focused element into view', 'h3'),
        code(
          '// Ensure focused elements are not obscured by sticky elements\nfunction ensureFocusVisible() {\n  document.addEventListener(\'focusin\', (e) => {\n    const header = document.querySelector(\'.site-header\');\n    const footer = document.querySelector(\'.cookie-banner\');\n    const rect = e.target.getBoundingClientRect();\n    const headerHeight = header?.getBoundingClientRect().height || 0;\n    const footerHeight = footer?.getBoundingClientRect().height || 0;\n\n    if (rect.top < headerHeight || rect.bottom > window.innerHeight - footerHeight) {\n      e.target.scrollIntoView({ block: \'center\', behavior: \'smooth\' });\n    }\n  });\n}\nensureFocusVisible();',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Sticky headers that cover focused elements when users tab through the page.'),
        bullet('Cookie consent banners fixed to the bottom of the viewport that obscure footer links and form fields.'),
        bullet('Chat widget bubbles that overlap with interactive elements in the lower-right corner.'),
        bullet('Notification banners that slide in and cover the currently focused element.'),
        bullet('Not accounting for sticky elements when using scrollIntoView or anchor links.'),
        bullet('Modeless overlays that partially cover the page without trapping focus.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.11, WCAG 2.2\'de tanitilan ve modern web kaliplarini ele alan yeni bir kriterdir: yapisan basliklar, alt bilgiler, cerez afisleri ve odaklanmis ogeleri ortur katmanlar. Bir bilesen klavye odagini aldiginda, en az bir kismi gorunur kalmalidir — sayfa yazari tarafindan olusturulan icerik tarafindan tamamen gizlenmemelidir.'
        ),
        p(
          'Bu minimum gerekliliktir — odaklanan bilesenin en az bir kismi gorunur olmalidir. Gelistirilmis versiyon (2.4.12) odaklanan bilesenin tamamen gorunur olmasini gerektirir. Bu kriterin yalnizca yazar tarafindan kontrol edilen iceriklere uygulandigini, tarayici arac cubuklari gibi kullanici aracisi ozelliklerine uygulanmadigini unutmayin.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Yapisan basliklar, sabit konumlu cerez afisleri ve sohbet bilesenleri modern web sitelerinde her yerdedir. Bir klavye kullanicisi bu yapisan ogelerin arkasinda konumlanmis bir ogeye sekme ile ulastiginda ne ile etkilestigini goremez. Bu, bir formu doldururken formun bir kismini kaplayan bir kagit parcasi olmasina esdeğerdir — sinir bozucu ve hataya acik.'
        ),
        p(
          'Bu sorun klavye kullanicilarini orantisiz sekilde etkiler cunku fare kullanicilari gizlenmis ogeleri ortaya cikarmak icin kaydirabililir, ancak klavye odagi gorunurlugunun saglanmasi icin sayfayi otomatik olarak kaydirmaz. Motor engelli, az goren ve bilissel engelli kullanicilar ozellikle etkilenir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('2.4.11 icin su anda otomatik axe-core kurali yoktur. Bu kriter klavye gezinmesiyle manuel test gerektirir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Tab kullanarak sayfanin tamaminda gezinin. Her odaklanan ogede yapisan veya sabit konumlu icerigin onu kapsayip kaplamadigini kontrol edin.'),
        numbered('Yapisan basliklarin ve alt bilgilerin gorundugu goruntuaaninin ustune ve altina yakin ogelere ozellikle dikkat edin.'),
        numbered('Cerez afislerini, sohbet bilesenlerini ve bildirim cubuklarini tetikleyin, ardindan gizlenmis odak icin sayfada sekme ile gezinin.'),
        numbered('Tarayici penceresini daha kucuk bir boyuta yeniden boyutlandirin ve testi tekrarlayin — gizlenmis odak daha kucuk goruntuaalanlarinda daha olasi.'),
        bullet('Odak kaydirilmasina neden oldugunda yapisan ogeleri hesaba katmak icin scroll-padding veya scroll-margin kullanidigini kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Yapisan ogelerin odaklanan icerikleri gizlemesini onlemek icin CSS scroll-padding kullanin ve katmanlarin etkilesimli ogeleri engellememesini saglayin.'),

        heading('Yapisan basliklar icin kaydirma dolgulama', 'h3'),
        code(
          '/* Yapisan basligin odaklanan ogeleri kaplamasini onle */\nhtml {\n  scroll-padding-top: 80px; /* Yapisan baslik yuksekligi */\n}\n\n/* Yapisan alt bilginiz de varsa */\nhtml {\n  scroll-padding-top: 80px;\n  scroll-padding-bottom: 60px;\n}\n\n/* Yapisan baslik stilleri */\n.site-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  height: 80px;\n}',
          'css'
        ),

        heading('Odagi gizlemeyen cerez afisi', 'h3'),
        code(
          '<!-- Katman yerine icerigi yukari iten cerez afisi -->\n<div class="cerez-afisi" role="dialog" aria-label="Cerez onay">\n  <p>Deneyiminizi iyilestirmek icin cerezler kullaniyoruz.</p>\n  <div>\n    <button>Tumunu kabul et</button>\n    <button>Zorunlu olmayanlari reddet</button>\n    <a href="/gizlilik">Cerez politikasi</a>\n  </div>\n</div>\n\n<style>\n.cerez-afisi {\n  position: sticky;\n  bottom: 0;\n  z-index: 100;\n  padding: 1rem;\n  background: #1a1a2e;\n  color: #fff;\n}\n\n/* Afis gorunur iken kaydirma doldurmasini ayarla */\nhtml:has(.cerez-afisi) {\n  scroll-padding-bottom: 80px;\n}\n</style>',
          'html'
        ),

        heading('JavaScript: odaklanan ogeyi gorunur alana kaydir', 'h3'),
        code(
          '// Odaklanan ogelerin yapisan ogeler tarafindan gizlenmediginden emin ol\nfunction odakGorunurKil() {\n  document.addEventListener(\'focusin\', (e) => {\n    const baslik = document.querySelector(\'.site-header\');\n    const altBilgi = document.querySelector(\'.cerez-afisi\');\n    const rect = e.target.getBoundingClientRect();\n    const baslikYuk = baslik?.getBoundingClientRect().height || 0;\n    const altBilgiYuk = altBilgi?.getBoundingClientRect().height || 0;\n\n    if (rect.top < baslikYuk || rect.bottom > window.innerHeight - altBilgiYuk) {\n      e.target.scrollIntoView({ block: \'center\', behavior: \'smooth\' });\n    }\n  });\n}\nodakGorunurKil();',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Kullanicilar sayfada sekme ile gezindiginde odaklanan ogeleri ortur yapisan basliklar.'),
        bullet('Alt bilgi baglantilari ve form alanlarini gizleyen goruntuaalaninin altina sabitlenmis cerez onay afisleri.'),
        bullet('Sag alt kosedeki etkilesimli ogelerle ustuste binen sohbet bilesen balonlari.'),
        bullet('Kayarak gelen ve o anda odaklanan ogeyi ortur bildirim afisleri.'),
        bullet('scrollIntoView veya capa baglantilari kullanilirken yapisan ogelerin hesaba katilmamasi.'),
        bullet('Odagi yakalamadan sayfayi kismen ortur modsuz katmanlar.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r2411w3c',
      },
      {
        title: 'MDN: scroll-padding',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding',
        source: 'mdn',
        language: 'en',
        _key: 'r2411mdn',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.2',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r2411wai',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.11 Focus Not Obscured (Minimum) — Sticky Element Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.11 Focus Not Obscured. Prevent sticky headers, cookie banners, and overlays from hiding focused elements with scroll-padding and layout fixes.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.11 Odak Gizlenmemis (Minimum) — Yapisan Oge Rehberi',
        metaDescription:
          'WCAG 2.4.11 Odak Gizlenmemis kriterini nasil karsilayacaginizi ogrenin. Yapisan basliklar, cerez afisleri ve katmanlarin odaklanan ogeleri gizlemesini onleyin.',
      },
    },
  },

  // ─── 2.4.12 Focus Not Obscured (Enhanced) ─────────────────────────
  {
    criterionNumber: '2.4.12',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['focus', 'keyboard', 'visual'],

    title: {
      en: 'Focus Not Obscured (Enhanced)',
      tr: 'Odak Gizlenmemis (Gelismis)',
    },

    description: {
      en: 'When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.',
      tr: 'Bir kullanici arayuzu bileseni klavye odagini aldiginda, bilesenin hicbir kismi yazar tarafindan olusturulan icerik tarafindan gizlenmemelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.12 is the enhanced version of 2.4.11 (Focus Not Obscured — Minimum). While 2.4.11 requires that focused elements are not entirely hidden, this AAA criterion requires that no part of the focused component is hidden by author-created content. The entire focused element — including its focus indicator — must be fully visible.'
        ),
        p(
          'This is a stricter requirement that ensures keyboard users have complete visual feedback about the focused element. Even partial obscuring — such as a sticky header covering the top edge of a focused element — fails this criterion.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'When part of a focused element is hidden, users may not see the full content of what they are interacting with. A partially obscured button label might be misread, a partially hidden form field might appear empty when it contains a value, and a cut-off focus indicator might be confused with no focus indicator at all.'
        ),
        p(
          'For users with low vision who use screen magnification, even a small amount of obscuring can make the difference between being able to use an element and not. Full visibility ensures that all users receive complete visual information about the focused component.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are no automated axe-core rules for 2.4.12. This criterion requires thorough manual testing with keyboard navigation at various viewport sizes.'),

        heading('How to test', 'h2'),
        numbered('Navigate the entire page using Tab and check that every focused element is fully visible, with no part covered by sticky or fixed content.'),
        numbered('Test at multiple viewport sizes — mobile, tablet, and desktop.'),
        numbered('Check that the focus indicator itself (outline, ring, etc.) is not clipped or hidden by overflow:hidden on parent elements.'),
        numbered('Trigger all overlays (cookie banners, chat widgets, notifications) and re-test the full tab cycle.'),
        bullet('Verify that scroll-padding values are sufficient to keep the entire element and its focus indicator visible.'),
        bullet('Check elements near the edges of scrollable containers for clipped focus indicators.'),

        heading('How to fix', 'h2'),
        p('Build on the techniques from 2.4.11 and ensure zero obscuring of any part of focused elements.'),

        heading('Generous scroll padding', 'h3'),
        code(
          '/* Account for focus indicator size in scroll padding */\nhtml {\n  /* Header (80px) + focus outline (3px) + offset (3px) + safety margin (8px) */\n  scroll-padding-top: 94px;\n  scroll-padding-bottom: 74px; /* Footer (60px) + focus ring space */\n}',
          'css'
        ),

        heading('Prevent overflow clipping of focus indicators', 'h3'),
        code(
          '/* Bad: overflow hidden clips focus outlines */\n.card-container {\n  overflow: hidden;\n}\n\n/* Good: overflow visible preserves focus outlines */\n.card-container {\n  overflow: visible;\n}\n\n/* If overflow hidden is needed, use outline-offset to keep focus inside */\n.card-container {\n  overflow: hidden;\n}\n.card-container *:focus-visible {\n  outline-offset: -3px; /* Inset outline stays within bounds */\n}',
          'css'
        ),

        heading('Ensuring sticky elements have enough clearance', 'h3'),
        code(
          '// After any layout change, verify focused element visibility\nfunction verifyFocusVisibility() {\n  const focused = document.activeElement;\n  if (!focused || focused === document.body) return;\n\n  const rect = focused.getBoundingClientRect();\n  const stickyElements = document.querySelectorAll(\n    \'[style*="position: sticky"], [style*="position: fixed"]\'\n  );\n\n  for (const sticky of stickyElements) {\n    const stickyRect = sticky.getBoundingClientRect();\n    const overlap =\n      rect.top < stickyRect.bottom &&\n      rect.bottom > stickyRect.top &&\n      rect.left < stickyRect.right &&\n      rect.right > stickyRect.left;\n\n    if (overlap) {\n      focused.scrollIntoView({ block: \'center\', behavior: \'smooth\' });\n      break;\n    }\n  }\n}',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Scroll-padding values that account for the sticky element but not the focus indicator\'s extra pixels.'),
        bullet('Parent containers with overflow:hidden that clip focus outlines extending beyond the container boundary.'),
        bullet('Sticky elements whose height changes (e.g., navigation that expands on scroll) without updating scroll-padding.'),
        bullet('Chat widgets or FAB buttons that overlap the bottom-right area where focused elements may be.'),
        bullet('Inline popover or tooltip elements that appear on top of the next focusable element in tab order.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.12, 2.4.11\'in (Odak Gizlenmemis — Minimum) gelistirilmis versiyonudur. 2.4.11 odaklanan ogelerin tamamen gizlenmemesini gerektirirken, bu AAA kriteri odaklanan bilesenin hicbir kisminin yazar tarafindan olusturulan icerik tarafindan gizlenmemesini gerektirir. Odak gostergesi dahil tum odaklanan oge tamamen gorunur olmalidir.'
        ),
        p(
          'Bu, klavye kullanicilarinin odaklanan oge hakkinda tam gorsel geri bildirim almasini saglayan daha siki bir gerekliliktir. Yapisan basligin odaklanan bir ogenin ust kenarini kaplayan kismi obscuring gibi — bu kriteri basarisiz kilar.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Odaklanan bir ogenin kismi gizlendiginde kullanicilar etkilestikleri seyin tam icerigini goremeyebilir. Kismen gizlenmis bir dugme etiketi yanlis okunabilir, kismen gizli bir form alani bir deger icerdiginde bos gorunebilir ve kesilmis bir odak gostergesi hic odak gostergesi olmadigi ile karistirilebilir.'
        ),
        p(
          'Ekran buyutme kullanan az goren kullanicilar icin kucuk bir miktar gizleme bile bir ogeyi kullanabilme ile kullanamama arasindaki farki yaratabilir. Tam gorunurluk tum kullanicilarin odaklanan bilesen hakkinda eksiksiz gorsel bilgi almasini saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('2.4.12 icin otomatik axe-core kurali yoktur. Bu kriter cesitli goruntuaani boyutlarinda klavye gezinmesiyle kapsamli manuel test gerektirir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Tab kullanarak sayfanin tamaminda gezinin ve her odaklanan ogenin tamamen gorunur oldugunu, hicbir kisminin yapisan veya sabit icerik tarafindan kaplanmadigini kontrol edin.'),
        numbered('Birden fazla goruntuaani boyutunda test edin — mobil, tablet ve masaustu.'),
        numbered('Odak gostergesinin (cizgi, halka vb.) kendisinin ust ogelerdeki overflow:hidden tarafindan kesilmedigini veya gizlenmedigini kontrol edin.'),
        numbered('Tum katmanlari (cerez afisleri, sohbet bilesenleri, bildirimler) tetikleyin ve tam sekme dongusunu yeniden test edin.'),
        bullet('Kaydirma dolgulama degerlerinin tum ogeyi ve odak gostergesini gorunur tutmak icin yeterli oldugunu dogrulayin.'),
        bullet('Kaydirilan kapsayicilarin kenarlarindaki ogeleri kesilmis odak gostergeleri acisindan kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('2.4.11\'deki teknikleri temel alin ve odaklanan ogelerin hicbir kisminin gizlenmediginden emin olun.'),

        heading('Cömert kaydirma dolgulama', 'h3'),
        code(
          '/* Kaydirma doldurmasinda odak gostergesi boyutunu hesaba kat */\nhtml {\n  /* Baslik (80px) + odak cizgisi (3px) + ofset (3px) + guvenlik marji (8px) */\n  scroll-padding-top: 94px;\n  scroll-padding-bottom: 74px; /* Alt bilgi (60px) + odak halkasi alani */\n}',
          'css'
        ),

        heading('Odak gostergelerinin tasinma kirilmasini onle', 'h3'),
        code(
          '/* Yanlis: overflow hidden odak cizgilerini kirpar */\n.kart-kapsayici {\n  overflow: hidden;\n}\n\n/* Dogru: overflow visible odak cizgilerini korur */\n.kart-kapsayici {\n  overflow: visible;\n}\n\n/* Overflow hidden gerekliyse odagi iceri al */\n.kart-kapsayici {\n  overflow: hidden;\n}\n.kart-kapsayici *:focus-visible {\n  outline-offset: -3px; /* Ic cizgi sinirlarin icinde kalir */\n}',
          'css'
        ),

        heading('Yapisan ogelerin yeterli bosluga sahip olmasini saglama', 'h3'),
        code(
          '// Her duzen degisikliginden sonra odaklanan oge gorunurlugunu dogrula\nfunction odakGorunurluguDogrula() {\n  const odakli = document.activeElement;\n  if (!odakli || odakli === document.body) return;\n\n  const rect = odakli.getBoundingClientRect();\n  const yapisanOgeler = document.querySelectorAll(\n    \'[style*="position: sticky"], [style*="position: fixed"]\'\n  );\n\n  for (const yapisan of yapisanOgeler) {\n    const yapisanRect = yapisan.getBoundingClientRect();\n    const ustUste =\n      rect.top < yapisanRect.bottom &&\n      rect.bottom > yapisanRect.top &&\n      rect.left < yapisanRect.right &&\n      rect.right > yapisanRect.left;\n\n    if (ustUste) {\n      odakli.scrollIntoView({ block: \'center\', behavior: \'smooth\' });\n      break;\n    }\n  }\n}',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Yapisan ogeyi hesaba katan ancak odak gostergesinin ekstra piksellerini hesaba katmayan kaydirma dolgulama degerleri.'),
        bullet('Kapsayici sinirinin otesine uzanan odak cizgilerini kirpan overflow:hidden\'li ust kapsayicilar.'),
        bullet('Yuksekligi degisen yapisan ogeler (ornegin kaydirmada genislenen gezinme) ile kaydirma dolgulama guncellenmiyor.'),
        bullet('Odaklanan ogelerin bulunabilecegi sag alt alayla ustuste binen sohbet bilesenleri veya FAB dugmeleri.'),
        bullet('Sekme sirasindaki sonraki odaklanabilir ogenin ustunde gorunen satir ici acilir pencere veya ipucu ogeleri.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.12: Focus Not Obscured (Enhanced)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r2412w3c',
      },
      {
        title: 'MDN: overflow CSS property',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow',
        source: 'mdn',
        language: 'en',
        _key: 'r2412mdn',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.2',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r2412wai',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.12 Focus Not Obscured (Enhanced) — Full Visibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.12 Focus Not Obscured (Enhanced). Ensure focused elements are completely visible with no part hidden by sticky elements, overlays, or overflow clipping.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.12 Odak Gizlenmemis (Gelismis) — Tam Gorunurluk Rehberi',
        metaDescription:
          'WCAG 2.4.12 Odak Gizlenmemis (Gelismis) kriterini nasil karsilayacaginizi ogrenin. Odaklanan ogelerin yapisan ogeler, katmanlar veya tasinma kirpmasi tarafindan gizlenmediginden emin olun.',
      },
    },
  },

  // ─── 2.4.13 Focus Appearance ───────────────────────────────────────
  {
    criterionNumber: '2.4.13',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['focus', 'keyboard', 'visual', 'css'],

    title: {
      en: 'Focus Appearance',
      tr: 'Odak Gorunumu',
    },

    description: {
      en: 'When a user interface component receives keyboard focus, the focus indicator has sufficient size and contrast to be clearly visible.',
      tr: 'Bir kullanici arayuzu bileseni klavye odagini aldiginda, odak gostergesi acikca gorunur olmak icin yeterli boyut ve kontrasta sahip olmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.4.13 is a new AAA criterion in WCAG 2.2 that goes beyond 2.4.7 (Focus Visible) by defining specific requirements for the size and contrast of focus indicators. The focus indicator must have a contrasting area that is at least as large as a 2 CSS pixel thick perimeter around the unfocused component, and must have a contrast ratio of at least 3:1 between the focused and unfocused states.'
        ),
        p(
          'In practical terms, this means a thin 1px dotted outline — which technically passes 2.4.7 — does not pass 2.4.13. The focus indicator must be substantial, high-contrast, and clearly distinguishable from the unfocused state. The intent is to ensure that focus indicators are truly usable, not just technically present.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Many websites technically have a "visible" focus indicator that is practically invisible — a thin light-gray outline on a white background, or a barely perceptible color shift. These indicators fail users with low vision, users in bright environments, and anyone who needs a clear visual cue to track keyboard focus.'
        ),
        p(
          'By defining minimum size and contrast requirements, this criterion ensures focus indicators are genuinely useful. A robust focus indicator dramatically improves the keyboard navigation experience for everyone — not just users with disabilities but also power users, users on high-DPI displays, and users in varying lighting conditions.'
        ),

        heading('Related axe-core rules', 'h2'),
        p('There are no automated axe-core rules for 2.4.13. The size and contrast requirements for focus indicators require manual inspection and measurement. Tools like the WCAG 2.2 Focus Appearance bookmarklet can help.'),

        heading('How to test', 'h2'),
        numbered('Tab through all interactive elements and visually verify that each focus indicator is clearly visible and has adequate size.'),
        numbered('Measure the focus indicator thickness — it must be at least 2 CSS pixels wide around the entire perimeter.'),
        numbered('Use a contrast checker to verify the focus indicator has at least 3:1 contrast against adjacent unfocused colors.'),
        numbered('Compare the focused and unfocused states — the change must have at least 3:1 contrast ratio.'),
        bullet('Test on different backgrounds — the focus indicator must be visible against both light and dark areas.'),
        bullet('Check that the focus indicator is not solely a color change — it should include a shape or border change.'),

        heading('How to fix', 'h2'),
        p('Design focus indicators that meet the minimum size (2px perimeter) and contrast (3:1) requirements.'),

        heading('Compliant focus indicator styles', 'h3'),
        code(
          '/* Meets 2.4.13: 3px solid outline with high contrast */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Meets 2.4.13: Double-ring for any background */\n:focus-visible {\n  outline: 3px solid #000000;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 5px #ffffff;\n}\n\n/* Meets 2.4.13: Box shadow approach */\n:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px #ffffff,\n    0 0 0 4px #0051a8;\n}',
          'css'
        ),

        heading('Focus indicators that fail 2.4.13', 'h3'),
        code(
          '/* Fails: 1px is below the minimum 2px perimeter */\n:focus-visible {\n  outline: 1px solid #999999;\n}\n\n/* Fails: Insufficient contrast (light gray on white) */\n:focus-visible {\n  outline: 2px solid #cccccc;\n}\n\n/* Fails: Only a color change, no perimeter indicator */\n:focus-visible {\n  background-color: #e0e0e0;\n  outline: none;\n}',
          'css'
        ),

        heading('Calculating the minimum focus area', 'h3'),
        code(
          '/*\n * For a button that is 100px x 40px, the minimum focus indicator area is:\n * Perimeter = 2 * (100 + 40) = 280px\n * Minimum area at 2px thickness = 280 * 2 = 560 square CSS pixels\n *\n * A 3px outline around this button provides:\n * Area = 2 * (106 + 46) * 3 = 912 square CSS pixels (passes easily)\n *\n * Note: outline-offset adds to the outer dimensions\n * With outline: 3px and outline-offset: 2px:\n * Outer dimensions = (100+10) x (40+10) = 110 x 50\n * Focus area = 2 * (110 + 50) * 3 = 960 square CSS pixels\n */',
          'css'
        ),

        heading('Theming focus indicators', 'h3'),
        code(
          ':root {\n  --focus-color: #0051a8;\n  --focus-width: 3px;\n  --focus-offset: 2px;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --focus-color: #6bb3ff;\n  }\n}\n\n@media (forced-colors: active) {\n  :root {\n    --focus-color: Highlight;\n  }\n}\n\n:focus-visible {\n  outline: var(--focus-width) solid var(--focus-color);\n  outline-offset: var(--focus-offset);\n}',
          'css'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Focus outlines thinner than 2 CSS pixels — 1px dotted or dashed outlines fail the size requirement.'),
        bullet('Low-contrast focus indicators — a light blue outline on a white background may not reach 3:1 contrast.'),
        bullet('Relying on background color change alone as the focus indicator without a perimeter change.'),
        bullet('Focus indicators that work on light backgrounds but fail on dark backgrounds (or vice versa).'),
        bullet('Not testing focus appearance in high contrast mode (Windows High Contrast / forced-colors).'),
        bullet('Using outline colors that match the component\'s border color, making the focus state indistinguishable.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.4.13, WCAG 2.2\'de odak gostergelerinin boyut ve kontrastina yonelik belirli gereksinimleri tanimlayarak 2.4.7\'nin (Gorunur Odak) otesine gecen yeni bir AAA kriteridir. Odak gostergesi, odaklanmamis bilesenin cevresindeki en az 2 CSS piksel kalinliginda bir cevre kadar buyuk kontrast alana sahip olmali ve odakli ve odaksiz durumlar arasinda en az 3:1 kontrast oranina sahip olmalidir.'
        ),
        p(
          'Pratik olarak bu, teknik olarak 2.4.7\'yi gecen ince 1px noktali bir cizginin 2.4.13\'u gecemeyecegi anlamina gelir. Odak gostergesi belirgin, yuksek kontrastli ve odaksiz durumdan acikca ayirt edilebilir olmalidir. Amac, odak gostergelerinin yalnizca teknik olarak mevcut degil gercekten kullanilabilir olmasini saglamaktir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Bircok web sitesinde teknik olarak "gorunur" ancak pratik olarak gorunmez bir odak gostergesi vardir — beyaz arka plan uzerinde ince acik gri bir cizgi veya zar zor algilanabilir bir renk degisimi. Bu gostergeler az goren kullanicilari, parlak ortamlardaki kullanicilari ve klavye odagini izlemek icin net bir gorsel ipucuna ihtiyac duyan herkesi basarisiz kilar.'
        ),
        p(
          'Minimum boyut ve kontrast gereksinimleri tanimlayarak bu kriter odak gostergelerinin gercekten faydali olmasini saglar. Saglam bir odak gostergesi herkes icin — yalnizca engelli kullanicilar degil ayni zamanda deneyimli kullanicilar, yuksek DPI ekranlardaki kullanicilar ve degisen aydinlatma kosullarindaki kullanicilar — klavye gezinme deneyimini onemli olcude iyilestirir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p('2.4.13 icin otomatik axe-core kurali yoktur. Odak gostergeleri icin boyut ve kontrast gereksinimleri manuel inceleme ve olcum gerektirir. WCAG 2.2 Focus Appearance yer imi gibi araclar yardimci olabilir.'),

        heading('Nasil test edilir', 'h2'),
        numbered('Tum etkilesimli ogeler arasinda Tab ile gezinin ve her odak gostergesinin acikca gorunur oldugunu ve yeterli boyuta sahip oldugunu gorsel olarak dogrulayin.'),
        numbered('Odak gostergesi kalinligini olcun — tum cevre boyunca en az 2 CSS piksel genisliginde olmalidir.'),
        numbered('Odak gostergesinin bitisik odaksiz renklere karsi en az 3:1 kontrasta sahip oldugunu dogrulamak icin bir kontrast denetleyici kullanin.'),
        numbered('Odakli ve odaksiz durumlari karsilastirin — degisikligin en az 3:1 kontrast oranina sahip olmasi gerekir.'),
        bullet('Farkli arka planlarda test edin — odak gostergesi hem acik hem de karanlik alanlara karsi gorunur olmalidir.'),
        bullet('Odak gostergesinin yalnizca bir renk degisikligi olmadigini kontrol edin — bir sekil veya kenarlik degisikligi icermelidir.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Minimum boyut (2px cevre) ve kontrast (3:1) gereksinimlerini karsilayan odak gostergeleri tasarlayin.'),

        heading('Uyumlu odak gostergesi stilleri', 'h3'),
        code(
          '/* 2.4.13\'u karsilar: Yuksek kontrastli 3px kati cizgi */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* 2.4.13\'u karsilar: Her arka plan icin cift halka */\n:focus-visible {\n  outline: 3px solid #000000;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 5px #ffffff;\n}\n\n/* 2.4.13\'u karsilar: Kutu golge yaklasimi */\n:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px #ffffff,\n    0 0 0 4px #0051a8;\n}',
          'css'
        ),

        heading('2.4.13\'u gecemeyen odak gostergeleri', 'h3'),
        code(
          '/* Basarisiz: 1px minimum 2px cevrenin altinda */\n:focus-visible {\n  outline: 1px solid #999999;\n}\n\n/* Basarisiz: Yetersiz kontrast (beyaz uzerinde acik gri) */\n:focus-visible {\n  outline: 2px solid #cccccc;\n}\n\n/* Basarisiz: Cevre gostergesi olmadan yalnizca renk degisikligi */\n:focus-visible {\n  background-color: #e0e0e0;\n  outline: none;\n}',
          'css'
        ),

        heading('Minimum odak alanini hesaplama', 'h3'),
        code(
          '/*\n * 100px x 40px boyutunda bir dugme icin minimum odak gostergesi alani:\n * Cevre = 2 * (100 + 40) = 280px\n * 2px kalinlikta minimum alan = 280 * 2 = 560 kare CSS pikseli\n *\n * Bu dugmenin etrafindaki 3px cizgi saglar:\n * Alan = 2 * (106 + 46) * 3 = 912 kare CSS pikseli (kolayca gecer)\n *\n * Not: outline-offset dis boyutlara eklenir\n * outline: 3px ve outline-offset: 2px ile:\n * Dis boyutlar = (100+10) x (40+10) = 110 x 50\n * Odak alani = 2 * (110 + 50) * 3 = 960 kare CSS pikseli\n */',
          'css'
        ),

        heading('Odak gostergelerini temalama', 'h3'),
        code(
          ':root {\n  --odak-renk: #0051a8;\n  --odak-genislik: 3px;\n  --odak-ofset: 2px;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --odak-renk: #6bb3ff;\n  }\n}\n\n@media (forced-colors: active) {\n  :root {\n    --odak-renk: Highlight;\n  }\n}\n\n:focus-visible {\n  outline: var(--odak-genislik) solid var(--odak-renk);\n  outline-offset: var(--odak-ofset);\n}',
          'css'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('2 CSS pikselden ince odak cizgileri — 1px noktali veya kesikli cizgiler boyut gereksinimini karsilamaz.'),
        bullet('Dusuk kontrastli odak gostergeleri — beyaz arka plan uzerinde acik mavi cizgi 3:1 kontrasta ulasmaabilir.'),
        bullet('Cevre degisikligi olmadan yalnizca arka plan renk degisikligine odak gostergesi olarak guvenmek.'),
        bullet('Acik arka planlarda calisan ancak karanlik arka planlarda basarisiz olan (veya tam tersi) odak gostergeleri.'),
        bullet('Yuksek kontrast modunda (Windows Yuksek Kontrast / forced-colors) odak gorunumunu test etmemek.'),
        bullet('Bilesenin kenarlik rengiyle eslesen cizgi renkleri kullanmak, odak durumunu ayirt edilemez kilmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.4.13: Focus Appearance',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r2413w3c',
      },
      {
        title: 'MDN: outline CSS property',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/outline',
        source: 'mdn',
        language: 'en',
        _key: 'r2413mdn',
      },
      {
        title: 'Sara Soueidan: A guide to designing accessible focus indicators',
        url: 'https://www.sarasoueidan.com/blog/focus-indicators/',
        source: 'other',
        language: 'en',
        _key: 'r2413sar',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.2',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r2413wai',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.4.13 Focus Appearance — Focus Indicator Size and Contrast Guide',
        metaDescription:
          'Learn how to meet WCAG 2.4.13 Focus Appearance. Design focus indicators with minimum 2px perimeter thickness and 3:1 contrast ratio for keyboard accessibility.',
      },
      tr: {
        metaTitle: 'WCAG 2.4.13 Odak Gorunumu — Odak Gostergesi Boyut ve Kontrast Rehberi',
        metaDescription:
          'WCAG 2.4.13 Odak Gorunumu kriterini nasil karsilayacaginizi ogrenin. Klavye erisilebilirligi icin minimum 2px cevre kalinligi ve 3:1 kontrast oranina sahip odak gostergeleri tasarlayin.',
      },
    },
  },
]

export default rules
