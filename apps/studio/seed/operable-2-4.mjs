import { p, heading, bullet, numbered, code, blockquote } from "./helpers.mjs";

const rules = [
  // ─── 2.4.1 Bypass Blocks ───────────────────────────────────────────
  {
    criterionNumber: "2.4.1",
    level: "A",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["bypass", "skip-link", "frame-title", "frame-title-unique"],
    tags: ["navigation", "skip-link", "landmarks"],

    title: {
      en: "Bypass Blocks",
      tr: "Blokları Atlama",
    },

    description: {
      en: "A mechanism is available to bypass blocks of content that are repeated on multiple web pages.",
      tr: "Birden fazla web sayfasında tekrarlanan içerik bloklarını atlamak için bir mekanizma sağlanmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          'WCAG 2.4.1 requires that pages provide a way for users to skip past repeated blocks of content — such as navigation menus, headers, and sidebars — and go directly to the main content. This is most commonly achieved through "skip navigation" links and ARIA landmark regions.',
        ),
        p(
          "Keyboard users and screen reader users navigate pages sequentially. Without a bypass mechanism, they must tab or arrow through dozens or hundreds of repeated links on every single page load before reaching the unique content they came for.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Imagine having to listen to an entire restaurant menu read aloud every time you open a new page on a website. That is the experience of a screen reader user on a site without skip links. For users with motor impairments who navigate by keyboard alone, tabbing through 50+ navigation links to reach the main content is physically exhausting and time-consuming.",
        ),
        p(
          "Bypass mechanisms dramatically improve efficiency for keyboard and assistive technology users. They also benefit power users who prefer keyboard navigation and users of alternative input devices such as switch controls and sip-and-puff systems.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "bypass — Ensures each page has at least one mechanism for a user to bypass navigation and jump to the main content.",
        ),
        bullet(
          "skip-link — Ensures skip links target an element that exists on the page and is focusable.",
        ),
        bullet(
          "frame-title — Ensures <iframe> and <frame> elements have an accessible title attribute.",
        ),
        bullet(
          "frame-title-unique — Ensures that <iframe> and <frame> elements have unique title values.",
        ),

        heading("How to test", "h2"),
        numbered(
          'Load the page and press Tab. The first focusable element should be a visible "Skip to main content" link.',
        ),
        numbered(
          "Activate the skip link by pressing Enter and verify that focus moves to the main content area.",
        ),
        numbered(
          "Run axe-core and check for bypass, skip-link, frame-title, and frame-title-unique violations.",
        ),
        numbered(
          "Verify that ARIA landmark roles (banner, navigation, main, contentinfo) are present and properly used.",
        ),
        numbered("Check that all iframes have descriptive title attributes."),
        bullet(
          "Use a screen reader to confirm landmark regions are announced and allow quick navigation.",
        ),

        heading("How to fix", "h2"),
        p(
          "The most reliable approach combines a skip navigation link with proper ARIA landmarks.",
        ),

        heading("Skip link — HTML pattern", "h3"),
        code(
          '<!-- Skip link as the very first element in <body> -->\n<body>\n  <a href="#main-content" class="skip-link">\n    Skip to main content\n  </a>\n\n  <header role="banner">\n    <nav role="navigation" aria-label="Main navigation">\n      <!-- Navigation links -->\n    </nav>\n  </header>\n\n  <main id="main-content" role="main" tabindex="-1">\n    <h1>Page Title</h1>\n    <!-- Unique page content -->\n  </main>\n\n  <footer role="contentinfo">\n    <!-- Footer content -->\n  </footer>\n</body>',
          "html",
        ),

        heading("Skip link — CSS", "h3"),
        code(
          ".skip-link {\n  position: absolute;\n  top: -100%;\n  left: 0;\n  z-index: 1000;\n  padding: 0.75rem 1.5rem;\n  background: #1a1a2e;\n  color: #ffffff;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: 0 0 4px 0;\n}\n\n.skip-link:focus {\n  top: 0;\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}",
          "css",
        ),

        heading("Focus management with JavaScript", "h3"),
        code(
          "// Ensure skip link target receives focus reliably\nconst skipLink = document.querySelector('.skip-link');\nskipLink.addEventListener('click', (e) => {\n  e.preventDefault();\n  const target = document.querySelector(e.target.getAttribute('href'));\n  if (target) {\n    target.setAttribute('tabindex', '-1');\n    target.focus();\n    target.addEventListener('blur', () => {\n      target.removeAttribute('tabindex');\n    }, { önce: true });\n  }\n});",
          "javascript",
        ),

        heading("Iframe titles", "h3"),
        code(
          '<!-- Bad: iframe without title -->\n<iframe src="https://maps.example.com/embed"></iframe>\n\n<!-- Good: iframe with descriptive title -->\n<iframe src="https://maps.example.com/embed" title="Office location map"></iframe>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Skip link exists in the DOM but is permanently hidden with display:none or visibility:hidden, making it unreachable by keyboard.",
        ),
        bullet(
          "Skip link points to an id that does not exist on the page, so activating it does nothing.",
        ),
        bullet(
          'The target element of the skip link is not focusable — the main element needs tabindex="-1" in some browsers.',
        ),
        bullet(
          "Using only ARIA landmarks without a skip link — older assistive technologies may not support landmark navigation.",
        ),
        bullet(
          "Having multiple iframes with identical or missing title attributes, making them indistinguishable to screen reader users.",
        ),
        bullet(
          "Placing the skip link after the navigation instead of before it, defeating its purpose.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          'WCAG 2.4.1, sayfaların tekrarlanan içerik bloklarını — gezinme menüleri, başlıklar ve kenar çubuklar gibi — atlayıp doğrudan ana içeriklere gitmek için bir yöntem sunmasını gerektirir. Bu en yaygın olarak "gezinmeyi atla" bağlantıları ve ARIA alan işaretleri (landmark) ile sağlanır.',
        ),
        p(
          "Klavye kullanıcıları ve ekran okuyucu kullanıcıları sayfalarda sıralı olarak gezinir. Bir atlama mekanizması olmadan, her sayfa yüklemesinde benzersiz içeriklere ulasmadan önce duzinelerce veya yuzlerce tekrarlanan bağlantı üzerinden sekme tuşuyla ilerlemek zorunda kalirlar.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Bir web sitesinde her yeni sayfayı açtığınızda tüm restoran menüsünün size yüksek sesle okunmasını hayal edin. Atlama bağlantıları olmayan bir sitede ekran okuyucu kullanan kişinin deneyimi tam olarak budur. Yalnızca klavye ile gezinen motor engelli kullanıcılar için ana içeriklere ulaşmak üzere 50'den fazla gezinme bağlantısını sekme ile geçmek fiziksel olarak yorucu ve zaman alıcıdır.",
        ),
        p(
          "Atlama mekanizmaları, klavye ve yardımcı teknoloji kullanıcıları için verimli gezinmeyi önemli ölçüde arttırır. Ayrıca klavye gezinmesini tercih eden deneyimli kullanıcılar ile anahtar kontroller ve ufle-ve-em (sip-and-puff) sistemleri gibi alternatif giriş aygitlari kullananlar için de fayda sağlar.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "bypass — Her sayfanın gezinmeyi atlayıp ana içeriklere geçmek için en az bir mekanizmaya sahip olmasını doğrular.",
        ),
        bullet(
          "skip-link — Atlama bağlantısının sayfada var olan ve odaklanabilir bir öğeyi hedefledigini doğrular.",
        ),
        bullet(
          "frame-title — <iframe> ve <frame> öğelerinin erişilebilir bir title niteliği olmasını doğrular.",
        ),
        bullet(
          "frame-title-unique — <iframe> ve <frame> öğelerinin benzersiz title değerlerine sahip olmasını doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          'Sayfayı yükleyin ve Tab tuşuna basın. Odaklanabilen ilk öğe görünür bir "Ana içeriklere atla" bağlantısı olmalıdır.',
        ),
        numbered(
          "Enter tuşuna basarak atlama bağlantısını etkinleştirin ve odağın ana içerik alanına taşındığını doğrulayın.",
        ),
        numbered(
          "axe-core çalıştırın ve bypass, skip-link, frame-title ve frame-title-unique ihlallerini kontrol edin.",
        ),
        numbered(
          "ARIA alan işaretlerinin (banner, navigation, main, contentinfo) mevcut ve doğru kullanıldığını doğrulayın.",
        ),
        numbered(
          "Tüm iframe öğelerinin açıklayıcı title niteliklerine sahip olup olmadığını kontrol edin.",
        ),
        bullet(
          "Bir ekran okuyucu kullanarak alan işaretlerinin duyurulduğunu ve hızlı gezinmeye olanak tanıdığını onaylayın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "En güvenilir yaklaşım, bir atlama gezinme bağlantısını uygun ARIA alan işaretleriyle birleştirmektir.",
        ),

        heading("Atlama bağlantısı — HTML kalıbı", "h3"),
        code(
          '<!-- Atlama bağlantısı <body> içindeki ilk öğe olarak -->\n<body>\n  <a href="#ana-içerik" class="atlama-bağlantısı">\n    Ana içeriklere atla\n  </a>\n\n  <header role="banner">\n    <nav role="navigation" aria-label="Ana gezinme">\n      <!-- Gezinme bağlantıları -->\n    </nav>\n  </header>\n\n  <main id="ana-içerik" role="main" tabindex="-1">\n    <h1>Sayfa Başlığı</h1>\n    <!-- Benzersiz sayfa içeriği -->\n  </main>\n\n  <footer role="contentinfo">\n    <!-- Alt bilgi içeriği -->\n  </footer>\n</body>',
          "html",
        ),

        heading("Atlama bağlantısı — CSS", "h3"),
        code(
          ".atlama-bağlantısı {\n  position: absolute;\n  top: -100%;\n  left: 0;\n  z-index: 1000;\n  padding: 0.75rem 1.5rem;\n  background: #1a1a2e;\n  color: #ffffff;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: 0 0 4px 0;\n}\n\n.atlama-bağlantısı:focus {\n  top: 0;\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}",
          "css",
        ),

        heading("JavaScript ile odak yönetimi", "h3"),
        code(
          "// Atlama bağlantısı hedefinin güvenilir şekilde odaklanmasını sağlama\nconst atlamaLink = document.querySelector('.atlama-bağlantısı');\natlamaLink.addEventListener('click', (e) => {\n  e.preventDefault();\n  const hedef = document.querySelector(e.target.getAttribute('href'));\n  if (hedef) {\n    hedef.setAttribute('tabindex', '-1');\n    hedef.focus();\n    hedef.addEventListener('blur', () => {\n      hedef.removeAttribute('tabindex');\n    }, { önce: true });\n  }\n});",
          "javascript",
        ),

        heading("Iframe başlıkları", "h3"),
        code(
          '<!-- Yanlış: title olmadan iframe -->\n<iframe src="https://maps.example.com/embed"></iframe>\n\n<!-- Doğru: açıklayıcı title ile iframe -->\n<iframe src="https://maps.example.com/embed" title="Ofis konum haritası"></iframe>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Atlama bağlantısı DOM'da var ancak display:none veya visibility:hidden ile kalıcı olarak gizlenmiş, bu da klavye ile erişimi imkansız kılar.",
        ),
        bullet(
          "Atlama bağlantısı sayfada bulunmayan bir id'ye işaret ediyor, dolayısıyla etkinleştirildiğinde hiçbir şey olmuyor.",
        ),
        bullet(
          'Atlama bağlantısının hedef öğesi odaklanabilir değil — bazı tarayıcılarda main öğesinin tabindex="-1" olması gerekir.',
        ),
        bullet(
          "Atlama bağlantısı olmadan yalnızca ARIA alan işaretleri kullanmak — eski yardımcı teknolojiler alan işaretleri gezinmesini desteklemeyebilir.",
        ),
        bullet(
          "Birden fazla iframe'in aynı veya eksik title nitelikleri olması, ekran okuyucu kullanıcıları için bunları ayırt edilemez kılar.",
        ),
        bullet(
          "Atlama bağlantısını gezinmenin öncesine değil sonrasına yerleştirmek, amacını ortadan kaldırır.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.1: Bypass Blocks",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r241w3cu",
      },
      {
        title: "WebAIM: Skip Navigation Links",
        url: "https://webaim.org/techniques/skipnav/",
        source: "webaim",
        language: "en",
        _key: "r241waim",
      },
      {
        title: "W3C WAI: ARIA Landmarks Example",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html",
        source: "w3c-wai",
        language: "en",
        _key: "r241wail",
      },
      {
        title: "Deque: bypass Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/bypass",
        source: "deque",
        language: "en",
        _key: "r241dequ",
      },
      {
        title: "MDN: ARIA landmark roles",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#landmark_roles",
        source: "mdn",
        language: "en",
        _key: "r241mdnl",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.1 Bypass Blocks — Skip Navigation Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.1 Bypass Blocks. Implement skip links, ARIA landmarks, and iframe titles to help keyboard users bypass repeated content.",
      },
      tr: {
        metaTitle: "WCAG 2.4.1 Blokları Atlama — Gezinmeyi Atlama Rehberi",
        metaDescription:
          "WCAG 2.4.1 Blokları Atlama kriterini nasıl karşılayacağınızı öğrenin. Klavye kullanıcılarının tekrarlanan içerikleri atlamasina yardımcı olmak için atlama bağlantıları ve ARIA alan işaretleri uygulayın.",
      },
    },
  },

  // ─── 2.4.2 Page Titled ─────────────────────────────────────────────
  {
    criterionNumber: "2.4.2",
    level: "A",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["document-title"],
    tags: ["title", "navigation"],

    title: {
      en: "Page Titled",
      tr: "Sayfa Başlığı",
    },

    description: {
      en: "Web pages have titles that describe topic or purpose.",
      tr: "Web sayfalarının konuyu veya amacı tanımlayan başlıkları olmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.2 requires that every web page has a descriptive title defined in the <title> element within the HTML <head>. The title must describe the page's topic or purpose, helping users identify where they are without reading the entire page content.",
        ),
        p(
          "Page titles are the first piece of information announced by screen readers when a page loads. They appear in browser tabs, bookmarks, search engine results, and history lists. A clear, unique title is essential for orientation and navigation.",
        ),

        heading("Why it matters", "h2"),
        p(
          'Screen reader users hear the page title before any other content. When titles are missing or generic (like "Untitled" or "Page"), users cannot distinguish between multiple open tabs or determine whether they have reached the right page. This is especially problematic when users have many tabs open or navigate through browser history.',
        ),
        p(
          "Descriptive page titles also improve usability for all users. They help with bookmarking, appearing in search results, and quickly scanning browser tabs. For users with cognitive disabilities, clear titles reduce confusion and support wayfinding.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "document-title — Ensures each HTML document contains a non-empty <title> element.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Check the browser tab to see if a descriptive title is displayed.",
        ),
        numbered(
          "View the page source and verify the <title> element exists within <head> and contains meaningful text.",
        ),
        numbered("Run axe-core and check for document-title violations."),
        numbered(
          "Navigate between pages and confirm each title is unique and describes the specific page content.",
        ),
        bullet(
          "For single-page applications, verify the title updates when the route changes.",
        ),
        bullet(
          "Test with a screen reader — the title should be the first thing announced on page load.",
        ),

        heading("How to fix", "h2"),
        p(
          "Every page needs a unique, descriptive title that identifies the page within the context of the site.",
        ),

        heading("Basic page title", "h3"),
        code(
          "<!-- Bad: Missing or generic title -->\n<head>\n  <title>Page</title>\n</head>\n\n<!-- Bad: Same title on every page -->\n<head>\n  <title>My Website</title>\n</head>\n\n<!-- Good: Descriptive, page-specific title -->\n<head>\n  <title>Accessibility Audit Report — Inculva Dashboard</title>\n</head>\n\n<!-- Good: Pattern — Page Name - Site Name -->\n<head>\n  <title>Contact Us - Inculva</title>\n</head>",
          "html",
        ),

        heading("Dynamic title updates in SPAs", "h3"),
        code(
          "// React: Update document title on route change\nimport { useEffect } from 'react';\nimport { useLocation } from 'react-router-dom';\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title ? `${title} — Inculva` : 'Inculva';\n  }, [title]);\n}\n\n// Usage in a page component\nfunction AuditPage() {\n  useDocumentTitle('Accessibility Audit Report');\n  return <main>...</main>;\n}",
          "javascript",
        ),

        heading("Server-side title generation", "h3"),
        code(
          "<!-- Astro / Next.js pattern -->\n---\nconst pageTitle = `${article.title} — Inculva Knowledge Base`;\n---\n<html>\n  <head>\n    <title>{pageTitle}</title>\n  </head>\n  <!-- ... -->\n</html>",
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Using the same title on every page — titles must be unique and describe the specific page content.",
        ),
        bullet(
          "Using only the site name as the title without including the page-specific topic.",
        ),
        bullet(
          'Leaving the <title> element empty or using placeholder text like "Untitled Document".',
        ),
        bullet(
          "In single-page applications, not updating the document title when the route changes.",
        ),
        bullet(
          "Placing the most important information at the end of the title — screen reader users hear the beginning first, so put the page-specific part before the site name.",
        ),
        bullet(
          "Using excessively long titles (over 60-70 characters) which get truncated in browser tabs and search results.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.2, her web sayfasının HTML <head> içinde <title> öğesiyle tanımlanmış açıklayıcı bir başlığa sahip olmasını gerektirir. Başlık, sayfanın konusunu veya amacını tanımlamalı ve kullanıcıların tüm sayfa içeriğini okumadan nerede olduklarını anlamalarına yardımcı olmalıdır.",
        ),
        p(
          "Sayfa başlıkları, bir sayfa yüklendiğinde ekran okuyucuların duyurduğu ilk bilgidir. Tarayıcı sekmelerinde, yer imlerinde, arama motoru sonuçlarında ve geçmiş listelerinde görüntülenir. Açık ve benzersiz bir başlık, yönelim ve gezinme için önemlidir.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          'Ekran okuyucu kullanıcıları herhangi bir içerikten önce sayfa başlığını duyar. Başlıklar eksik veya genel olduğunda (örneğin "Başlıksız" veya "Sayfa"), kullanıcılar birden fazla açık sekmeyi birbirinden ayırt edemez veya doğru sayfaya ulaşıp ulaşmadıklarını belirleyemez. Bu özellikle çok sayıda açık sekmesi olan veya tarayıcı geçmişinde gezinen kullanıcılar için sorunludur.',
        ),
        p(
          "Açıklayıcı sayfa başlıkları tüm kullanıcılar için kullanılabilirliği arttırır. Yer imi oluşturma, arama sonuçlarında görüntüleme ve tarayıcı sekmelerini hızla tarama konularında yardımcı olur. Bilişsel engelli kullanıcılar için net başlıklar karışıklığı azaltır ve yol bulmaya destek olur.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "document-title — Her HTML belgesinin boş olmayan bir <title> öğesi içermesini doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Tarayıcı sekmesinde açıklayıcı bir başlığın görüntülenip görüntülenmediğini kontrol edin.",
        ),
        numbered(
          "Sayfa kaynağını görüntüleyin ve <title> öğesinin <head> içinde mevcut olduğunu ve anlamlı metin içerdiğini doğrulayın.",
        ),
        numbered(
          "axe-core çalıştırın ve document-title ihlallerini kontrol edin.",
        ),
        numbered(
          "Sayfalar arasında gezinin ve her başlığın benzersiz olduğunu ve belirli sayfa içeriğini tanımladığını onaylayın.",
        ),
        bullet(
          "Tek sayfa uygulamaları için rota değiştiğinde başlığın güncellendiğini doğrulayın.",
        ),
        bullet(
          "Bir ekran okuyucu ile test edin — başlık, sayfa yüklemesinde duyurulan ilk şey olmalıdır.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Her sayfanın site bağlamında sayfayı tanımlayan benzersiz ve açıklayıcı bir başlığa ihtiyaçı vardır.",
        ),

        heading("Temel sayfa başlığı", "h3"),
        code(
          "<!-- Yanlış: Eksik veya genel başlık -->\n<head>\n  <title>Sayfa</title>\n</head>\n\n<!-- Yanlış: Her sayfada aynı başlık -->\n<head>\n  <title>Web Sitem</title>\n</head>\n\n<!-- Doğru: Açıklayıcı, sayfaya özel başlık -->\n<head>\n  <title>Erişilebilirlik Denetim Raporu — Inculva Panel</title>\n</head>\n\n<!-- Doğru: Kalip — Sayfa Adı - Site Adı -->\n<head>\n  <title>Bize Ulaşın - Inculva</title>\n</head>",
          "html",
        ),

        heading("SPA'larda dinamik başlık güncellemeleri", "h3"),
        code(
          "// React: Rota değisikliğinde belge başlığını güncelleme\nimport { useEffect } from 'react';\nimport { useLocation } from 'react-router-dom';\n\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title ? `${title} — Inculva` : 'Inculva';\n  }, [title]);\n}\n\n// Bir sayfa bileşeninde kullanım\nfunction DenetimSayfası() {\n  useDocumentTitle('Erişilebilirlik Denetim Raporu');\n  return <main>...</main>;\n}",
          "javascript",
        ),

        heading("Sunucu tarafında başlık oluşturma", "h3"),
        code(
          "<!-- Astro / Next.js kalıbı -->\n---\nconst sayfaBasligi = `${makale.başlık} — Inculva Bilgi Bankası`;\n---\n<html>\n  <head>\n    <title>{sayfaBasligi}</title>\n  </head>\n  <!-- ... -->\n</html>",
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Her sayfada aynı başlığı kullanmak — başlıklar benzersiz olmalı ve belirli sayfa içeriğini tanımlamalıdır.",
        ),
        bullet(
          "Başlık olarak yalnızca site adını kullanıp sayfaya özel konuyu dahil etmemek.",
        ),
        bullet(
          '<title> öğesini boş bırakmak veya "Başlıksız Belge" gibi yer tutucu metin kullanmak.',
        ),
        bullet(
          "Tek sayfa uygulamalarında rota değiştiğinde belge başlığını güncellememek.",
        ),
        bullet(
          "En önemli bilgiyi başlığın sonuna yerleştirmek — ekran okuyucu kullanıcıları önce başlangıcı duyar, bu nedenle sayfaya özel kısmı site adından önce koyun.",
        ),
        bullet(
          "Aşırı uzun başlıklar kullanmak (60-70 karakterden fazla) — tarayıcı sekmelerinde ve arama sonuçlarında kesilir.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.2: Page Titled",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r242w3cu",
      },
      {
        title: "Deque: document-title Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/document-title",
        source: "deque",
        language: "en",
        _key: "r242dequ",
      },
      {
        title: "WebAIM: Page Titles",
        url: "https://webaim.org/techniques/pagetitle/",
        source: "webaim",
        language: "en",
        _key: "r242waim",
      },
      {
        title:
          "W3C Techniques: G88 — Providing descriptive titles for Web pages",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G88",
        source: "w3c-techniques",
        language: "en",
        _key: "r242w3ct",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.2 Page Titled — Descriptive Title Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.2 Page Titled. Write descriptive, unique page titles for better navigation, SEO, and screen reader support with practical code examples.",
      },
      tr: {
        metaTitle: "WCAG 2.4.2 Sayfa Başlığı — Açıklayıcı Başlık Rehberi",
        metaDescription:
          "WCAG 2.4.2 Sayfa Başlığı kriterini nasıl karşılayacağınızı öğrenin. Daha iyi gezinme, SEO ve ekran okuyucu desteği için açıklayıcı ve benzersiz sayfa başlıkları yazın.",
      },
    },
  },

  // ─── 2.4.3 Focus Order ─────────────────────────────────────────────
  {
    criterionNumber: "2.4.3",
    level: "A",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["focus-order-semantics", "tabindex"],
    tags: ["focus", "keyboard", "navigation"],

    title: {
      en: "Focus Order",
      tr: "Odak Sırası",
    },

    description: {
      en: "If a web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
      tr: "Bir web sayfası sıralı olarak gezinilebiliyorsa ve gezinme sırası anlam veya işlevi etkiliyorsa, odaklanabilir bileşenler anlamı ve işlevselliği koruyan bir sırada odak alır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.3 requires that when users navigate a page sequentially — typically using the Tab key — the order in which elements receive focus must be logical and meaningful. The focus order should follow the visual reading order and preserve the relationships between content elements.",
        ),
        p(
          "This criterion applies to all interactive elements: links, buttons, form fields, and custom widgets. The DOM order should match the visual presentation so that keyboard navigation feels natural and predictable.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Keyboard users rely on a predictable focus order to navigate and operate web pages. When focus jumps unexpectedly — from the main content to the footer, then back to the sidebar — users become disoriented and may miss important content or controls. This is especially challenging for users with cognitive disabilities or low vision who cannot easily track where focus has moved.",
        ),
        p(
          "A logical focus order also ensures that form workflows proceed naturally, multi-step processes work correctly, and modal dialogs trap focus properly. Broken focus order can make entire features unusable for keyboard-only users.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "focus-order-semantics — Ensures elements in the focus order have an appropriate role.",
        ),
        bullet(
          "tabindex — Ensures tabindex attribute values are not greater than 0, which would override the natural focus order.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Disconnect your mouse and navigate the entire page using only the Tab and Shift+Tab keys.",
        ),
        numbered(
          "Verify that focus moves through interactive elements in a logical, visual reading order (typically left-to-right, top-to-bottom for LTR languages).",
        ),
        numbered(
          "Check that no interactive elements are skipped or receive focus out of sequence.",
        ),
        numbered(
          "Test forms to confirm focus moves through fields in the expected order.",
        ),
        numbered(
          "Open modals and dialogs — verify focus is trapped inside and returns to the trigger element on close.",
        ),
        bullet(
          "Run axe-core and check for tabindex violations where tabindex > 0 is used.",
        ),
        bullet(
          "Use the browser's accessibility inspector to review the tab order overlay.",
        ),

        heading("How to fix", "h2"),
        p(
          "The primary fix is to ensure your DOM order matches your visual order. Avoid using positive tabindex values and be cautious with CSS properties that reorder visual layout.",
        ),

        heading("Correct DOM order vs CSS visual reordering", "h3"),
        code(
          '<!-- Bad: Visual order differs from DOM order due to CSS -->\n<div style="display: flex; flex-direction: row-reverse;">\n  <button>Third visually, first in DOM</button>\n  <button>Second visually, second in DOM</button>\n  <button>First visually, third in DOM</button>\n</div>\n\n<!-- Good: DOM order matches visual order -->\n<div style="display: flex;">\n  <button>First</button>\n  <button>Second</button>\n  <button>Third</button>\n</div>',
          "html",
        ),

        heading("Avoid positive tabindex", "h3"),
        code(
          '<!-- Bad: Positive tabindex forces unnatural order -->\n<input tabindex="3" placeholder="Name">\n<input tabindex="1" placeholder="Email">\n<input tabindex="2" placeholder="Phone">\n\n<!-- Good: Natural DOM order, no tabindex needed -->\n<input placeholder="Name">\n<input placeholder="Email">\n<input placeholder="Phone">\n\n<!-- Acceptable: tabindex="0" adds to natural order -->\n<div role="button" tabindex="0">Custom button</div>\n\n<!-- Acceptable: tabindex="-1" removes from tab order -->\n<div id="modal-container" tabindex="-1">...</div>',
          "html",
        ),

        heading("Modal focus trap", "h3"),
        code(
          "// Trap focus inside a modal dialog\nfunction trapFocus(modalElement) {\n  const focusable = modalElement.querySelectorAll(\n    'a[href], button:not([disabled]), input:not([disabled]),\\\n     select:not([disabled]), textarea:not([disabled]),\\\n     [tabindex]:not([tabindex=\"-1\"])'\n  );\n  const first = focusable[0];\n  const last = focusable[focusable.length - 1];\n\n  modalElement.addEventListener('keydown', (e) => {\n    if (e.key !== 'Tab') return;\n    if (e.shiftKey && document.activeElement === first) {\n      e.preventDefault();\n      last.focus();\n    } else if (!e.shiftKey && document.activeElement === last) {\n      e.preventDefault();\n      first.focus();\n    }\n  });\n\n  first.focus();\n}",
          "javascript",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          'Using positive tabindex values (tabindex="1", tabindex="2", etc.) which override natural DOM order and create confusing navigation.',
        ),
        bullet(
          "Using CSS flexbox order, grid placement, or float to visually reorder elements without matching the DOM order.",
        ),
        bullet(
          "Dynamically inserting content above the current focus position, causing users to lose their place.",
        ),
        bullet(
          "Not trapping focus inside modal dialogs, allowing users to tab to obscured content behind the overlay.",
        ),
        bullet(
          "Failing to return focus to the trigger element when closing a modal or popover.",
        ),
        bullet(
          "Using display:none to hide elements that are still focusable due to tabindex attributes.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.3, kullanıcılar bir sayfada sıralı olarak gezindiginde — genellikle Tab tuşu kullanarak — öğelerin odak aldigi siralaminin mantıklı ve anlamlı olması gerektiğini belirtir. Odak sırası görsel okuma sırasını takip etmeli ve içerik öğeleri arasındaki iliskileri korumalıdır.",
        ),
        p(
          "Bu kriter tüm etkileşimli öğeler için geçerlidir: bağlantılar, düğmeler, form alanları ve özel bileşenler. DOM sırası görsel sunumla eşleşmelidir, böylece klavye gezinmesi doğal ve öngörülebilir hissedilir.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Klavye kullanıcıları web sayfalarında gezinmek ve işlem yapmak için öngörülebilir bir odak sırasına güvenir. Odak beklenmedik şekilde atlayınca — ana içerikten alt bilgiye, sonra tekrar kenar çubuğuna — kullanıcılar yönünü kaybeder ve önemli içerik veya denetimleri kaçırabilir. Bu özellikle odağın nereye taştığını kolayca takip edemeyen bilişsel engelli veya az gören kullanıcılar için zorlayıcıdır.",
        ),
        p(
          "Mantıklı bir odak sırası ayrıca form iş akışlarının doğal ilerlemesini, çok adımlı süreçlerin doğru çalışmasını ve kalıcı iletişim kutularının odağı doğru şekilde yakalamasını sağlar. Bozuk odak sırası, yalnızca klavye kullanan kişiler için tüm özellikleri kullanılamaz hale getirebilir.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "focus-order-semantics — Odak sırasındaki öğelerin uygun bir role sahip olmasını doğrular.",
        ),
        bullet(
          "tabindex — tabindex nitelik değerlerinin 0'dan büyük olmamasını doğrular, çünkü bu doğal odak sırasını geçersiz kılar.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Farenizi bağlantısını kesin ve sayfanın tamamında yalnızca Tab ve Shift+Tab tuşlarıyla gezinin.",
        ),
        numbered(
          "Odağın etkileşimli öğeler arasında mantıklı, görsel okuma sırasında (genellikle soldan sağa, yukarıdan aşağıya) ilerlediğini doğrulayın.",
        ),
        numbered(
          "Hiçbir etkileşimli öğenin atlanmadığını veya sıra dışı odak almadığını kontrol edin.",
        ),
        numbered(
          "Formları test ederek odağın alanlar arasında beklenen sırada hareket ettiğini onaylayın.",
        ),
        numbered(
          "Kalıcı iletişim kutularını ve diyalog pencerelerini açın — odağın içeride tutulduğunu ve kapatıldığında tetikleyici öğeye döndüğünü doğrulayın.",
        ),
        bullet(
          "axe-core çalıştırın ve tabindex > 0 kullanılan tabindex ihlallerini kontrol edin.",
        ),
        bullet(
          "Tarayıcının erişilebilirlik denetçisini kullanarak sekme sırası katmanını inceleyin.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Birincil çözüm, DOM sıranızın görsel sıranızla eşleşmesini sağlamaktır. Pozitif tabindex değerlerinden kaçının ve görsel düzeni yeniden sıralanan CSS özelliklerinde dikkatli olun.",
        ),

        heading("Doğru DOM sırası ve CSS görsel yeniden sıralama", "h3"),
        code(
          '<!-- Yanlış: CSS nedeniyle görsel sıra DOM sırasından farklı -->\n<div style="display: flex; flex-direction: row-reverse;">\n  <button>Görsel üçüncü, DOM\'da birinci</button>\n  <button>Görsel ikinci, DOM\'da ikinci</button>\n  <button>Görsel birinci, DOM\'da üçüncü</button>\n</div>\n\n<!-- Doğru: DOM sırası görsel sırayla eşleşiyor -->\n<div style="display: flex;">\n  <button>Birinci</button>\n  <button>İkinci</button>\n  <button>Üçüncü</button>\n</div>',
          "html",
        ),

        heading("Pozitif tabindex kullanmayın", "h3"),
        code(
          '<!-- Yanlış: Pozitif tabindex doğal olmayan sıra dayatıyor -->\n<input tabindex="3" placeholder="İsim">\n<input tabindex="1" placeholder="E-posta">\n<input tabindex="2" placeholder="Telefon">\n\n<!-- Doğru: Doğal DOM sırası, tabindex gerekmez -->\n<input placeholder="İsim">\n<input placeholder="E-posta">\n<input placeholder="Telefon">\n\n<!-- Kabul edilebilir: tabindex="0" doğal sıraya ekler -->\n<div role="button" tabindex="0">Özel düğme</div>\n\n<!-- Kabul edilebilir: tabindex="-1" sekme sırasından çıkarır -->\n<div id="modal-kapsayıcı" tabindex="-1">...</div>',
          "html",
        ),

        heading("Modal odak tuzağı", "h3"),
        code(
          "// Modal iletişim kutusu içinde odağı yakalama\nfunction odakYakala(modalOgesi) {\n  const odaklanabilir = modalOgesi.querySelectorAll(\n    'a[href], button:not([disabled]), input:not([disabled]),\\\n     select:not([disabled]), textarea:not([disabled]),\\\n     [tabindex]:not([tabindex=\"-1\"])'\n  );\n  const ilk = odaklanabilir[0];\n  const son = odaklanabilir[odaklanabilir.length - 1];\n\n  modalOgesi.addEventListener('keydown', (e) => {\n    if (e.key !== 'Tab') return;\n    if (e.shiftKey && document.activeElement === ilk) {\n      e.preventDefault();\n      son.focus();\n    } else if (!e.shiftKey && document.activeElement === son) {\n      e.preventDefault();\n      ilk.focus();\n    }\n  });\n\n  ilk.focus();\n}",
          "javascript",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          'Pozitif tabindex değerleri (tabindex="1", tabindex="2" vb.) kullanmak — bu doğal DOM sırasını geçersiz kılar ve kafa karıştırıcı gezinme oluşturur.',
        ),
        bullet(
          "CSS flexbox sırası, grid yerleşimi veya float kullanarak DOM sırasını eşleştirmeden öğeleri görsel olarak yeniden sıralamak.",
        ),
        bullet(
          "Mevcut odak konumunun üstüne dinamik içerik ekleyerek kullanıcıların yerini kaybetmesine neden olmak.",
        ),
        bullet(
          "Modal iletişim kutularında odağı yakalamamak, kullanıcıların katman arkasındaki gizlenmiş içeriklere sekme ile geçmesine izin vermek.",
        ),
        bullet(
          "Bir modal veya açılır pencere kapatıldığında odağı tetikleyici öğeye döndürememek.",
        ),
        bullet(
          "tabindex nitelikleri nedeniyle hala odaklanabilir olan öğeleri gizlemek için display:none kullanmak.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.3: Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r243w3cu",
      },
      {
        title: "WebAIM: Keyboard Accessibility",
        url: "https://webaim.org/techniques/keyboard/",
        source: "webaim",
        language: "en",
        _key: "r243waim",
      },
      {
        title: "W3C WAI: ARIA Dialog Modal Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
        source: "w3c-wai",
        language: "en",
        _key: "r243waid",
      },
      {
        title: "Deque: tabindex Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/tabindex",
        source: "deque",
        language: "en",
        _key: "r243dequ",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.3 Focus Order — Logical Tab Navigation Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.3 Focus Order. Ensure keyboard navigation follows a logical sequence with DOM ordering, focus traps, and tabindex best practices.",
      },
      tr: {
        metaTitle: "WCAG 2.4.3 Odak Sırası — Mantıklı Sekme Gezinme Rehberi",
        metaDescription:
          "WCAG 2.4.3 Odak Sırası kriterini nasıl karşılayacağınızı öğrenin. DOM sıralama, odak tuzakları ve tabindex en iyi uygulamalariyla klavye gezinmesinin mantıklı bir sırayı izlemesini sağlayın.",
      },
    },
  },

  // ─── 2.4.4 Link Purpose (In Context) ───────────────────────────────
  {
    criterionNumber: "2.4.4",
    level: "A",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["link-name"],
    tags: ["links", "navigation"],

    title: {
      en: "Link Purpose (In Context)",
      tr: "Bağlantı Amacı (Bağlamda)",
    },

    description: {
      en: "The purpose of each link can be determined from the link text alone, or from the link text together with its programmatically determined link context.",
      tr: "Her bağlantının amacı yalnızca bağlantı metninden veya bağlantı metni ile programatik olarak belirlenen bağlantı bağlamının birleşiminden anlaşılabilmelidir.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.4 requires that the purpose of each link can be understood from the link text itself, or from the link text combined with its surrounding context — such as the enclosing paragraph, list item, table cell, or heading. Users must be able to determine where a link will take them before activating it.",
        ),
        p(
          'This means that link text like "click here", "read more", or "learn more" fails when the surrounding context does not clarify the destination. The purpose must be unambiguous either from the link text alone or with the help of its programmatic context.',
        ),

        heading("Why it matters", "h2"),
        p(
          'Screen reader users frequently navigate by pulling up a list of all links on a page. When every link says "click here" or "read more", that list becomes useless — the user cannot distinguish between links or determine which one to follow. This forces them to navigate to each link individually and read the surrounding text for context, which is extremely time-consuming.',
        ),
        p(
          "Descriptive link text also benefits sighted users who scan pages visually, users with cognitive disabilities who need clear cues, and search engines that use link text as a ranking signal.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "link-name — Ensures every link has discernible text that describes its purpose.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Use a screen reader to generate a list of links (e.g., NVDA: Insert+F7, VoiceOver: Rotor > Links). Review whether each link's purpose is clear out of context.",
        ),
        numbered(
          "Run axe-core and check for link-name violations (links without accessible names).",
        ),
        numbered(
          'Manually review all links with generic text ("click here", "read more", "here", "more") and check whether the programmatic context clarifies their purpose.',
        ),
        numbered(
          "Check that image links have alt text that describes the link destination, not just the image.",
        ),
        bullet(
          "Verify that links using aria-label or aria-labelledby accurately describe the destination.",
        ),

        heading("How to fix", "h2"),
        p(
          "Write link text that clearly describes the destination or action. When surrounding context is needed, ensure it is programmatically associated.",
        ),

        heading("Descriptive link text", "h3"),
        code(
          '<!-- Bad: Generic link text -->\n<p>We published our annual report. <a href="/report">Click here</a>.</p>\n<p>Read our accessibility guide. <a href="/guide">Read more</a></p>\n\n<!-- Good: Self-descriptive link text -->\n<p><a href="/report">Download the 2025 annual report</a></p>\n<p><a href="/guide">Read our complete accessibility guide</a></p>\n\n<!-- Good: Context from enclosing element -->\n<li>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site against WCAG 2.2 criteria.\n    <a href="/services/audit">Learn more about our audit service</a>\n  </p>\n</li>',
          "html",
        ),

        heading("Image links", "h3"),
        code(
          '<!-- Bad: Image link with no alt text -->\n<a href="/home"><img src="logo.png"></a>\n\n<!-- Bad: Alt describes image, not link purpose -->\n<a href="/home"><img src="logo.png" alt="Company logo"></a>\n\n<!-- Good: Alt describes link destination -->\n<a href="/home"><img src="logo.png" alt="Inculva home page"></a>',
          "html",
        ),

        heading("Using aria-label for enhanced context", "h3"),
        code(
          '<!-- When visual design requires short text like "Read more" -->\n<article>\n  <h3>WCAG 2.4.4 Explained</h3>\n  <p>Understanding link purpose requirements...</p>\n  <a href="/articles/244" aria-label="Read more about WCAG 2.4.4 Explained">\n    Read more\n  </a>\n</article>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          'Using "click here", "here", "read more", "learn more", or "more" as the sole link text without additional context.',
        ),
        bullet(
          'Using the raw URL as link text (e.g., "https://www.example.com/report.pdf") instead of a descriptive label.',
        ),
        bullet(
          "Having multiple links on the same page with identical text that lead to different destinations.",
        ),
        bullet(
          "Wrapping an entire paragraph or large block of text in an <a> tag, making the link text overly verbose.",
        ),
        bullet(
          "Image links where the alt text describes the image instead of the link destination.",
        ),
        bullet(
          "Using title attribute as the only means of providing link purpose — title tooltips are inaccessible on touch devices and not consistently read by screen readers.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.4, her bağlantının amacının bağlantı metninin kendisinden veya bağlantı metninin çevreleyen bağlamıyla — kapsayan paragraf, liste öğesi, tablo hücresi veya başlık gibi — birlikte anlaşılabilmesini gerektirir. Kullanıcılar bir bağlantıyı etkinleştirmeden önce nereye götüreceğini belirleyebilmelidir.",
        ),
        p(
          'Bu, "buraya tıklayın", "devamını oku" veya "daha fazla bilgi" gibi bağlantı metinlerinin çevreleyen bağlam hedefi netleştirmediğinde başarısız olduğu anlamına gelir. Amaç ya yalnızca bağlantı metninden ya da programatik bağlamının yardımıyla açık olmalıdır.',
        ),

        heading("Neden önemlidir", "h2"),
        p(
          'Ekran okuyucu kullanıcıları sayfadaki tüm bağlantıların listesini getirerek sık sık gezinir. Her bağlantı "buraya tıklayın" veya "devamını oku" dediğinde bu liste kullanışsız hale gelir — kullanıcı bağlantıları birbirinden ayırt edemez veya hangisini izleyeceğini belirleyemez. Bu onları her bir bağlantıya tek tek gezinmeye ve bağlam için çevreleyen metni okumaya zorlar ki bu son derece zaman alıcıdır.',
        ),
        p(
          "Açıklayıcı bağlantı metni ayrıca sayfaları görsel olarak tarayan gören kullanıcılar, net ipuçlarına ihtiyaç duyan bilişsel engelli kullanıcılar ve bağlantı metnini sıralama sinyali olarak kullanan arama motorları için de fayda sağlar.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "link-name — Her bağlantının amacını tanımlayan ayırt edilebilir bir metne sahip olmasını doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Bir ekran okuyucu kullanarak bağlantı listesi oluşturun (örneğin NVDA: Insert+F7, VoiceOver: Rotor > Bağlantılar). Her bağlantının amacının bağlam dışında açık olup olmadığını inceleyin.",
        ),
        numbered(
          "axe-core çalıştırın ve link-name ihlallerini (erişilebilir adı olmayan bağlantılar) kontrol edin.",
        ),
        numbered(
          'Genel metne sahip tüm bağlantıları ("buraya tıklayın", "devamını oku", "burada", "daha fazla") manuel olarak inceleyin ve programatik bağlamın amaçlarını netleştirip netleştirmediğini kontrol edin.',
        ),
        numbered(
          "Görsel bağlantıların bağlantı hedefini tanımlayan alt metnine sahip olup olmadığını kontrol edin.",
        ),
        bullet(
          "aria-label veya aria-labelledby kullanan bağlantıların hedefi doğru şekilde tanımladığını doğrulayın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Hedefi veya eylemi açıkça tanımlayan bağlantı metni yazın. Çevreleyen bağlam gerektiğinde, bunun programatik olarak ilişkilendirildiğinden emin olun.",
        ),

        heading("Açıklayıcı bağlantı metni", "h3"),
        code(
          '<!-- Yanlış: Genel bağlantı metni -->\n<p>Yıllık raporumuzu yayınladık. <a href="/rapor">Buraya tıklayın</a>.</p>\n<p>Erişilebilirlik rehberimizi okuyun. <a href="/rehber">Devamını oku</a></p>\n\n<!-- Doğru: Kendini tanımlayan bağlantı metni -->\n<p><a href="/rapor">2025 yıllık raporunu indirin</a></p>\n<p><a href="/rehber">Tam erişilebilirlik rehberimizi okuyun</a></p>\n\n<!-- Doğru: Kapsayıcı öğeden bağlam -->\n<li>\n  <h3>Erişilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi WCAG 2.2 kriterlerine göre test ediyoruz.\n    <a href="/hizmetler/denetim">Denetim hizmetimiz hakkında daha fazla bilgi edinin</a>\n  </p>\n</li>',
          "html",
        ),

        heading("Görsel bağlantılar", "h3"),
        code(
          '<!-- Yanlış: Alt metni olmayan görsel bağlantı -->\n<a href="/anasayfa"><img src="logo.png"></a>\n\n<!-- Yanlış: Alt görseli tanımlıyor, bağlantı amacını değil -->\n<a href="/anasayfa"><img src="logo.png" alt="Şirket logosu"></a>\n\n<!-- Doğru: Alt bağlantı hedefini tanımlıyor -->\n<a href="/anasayfa"><img src="logo.png" alt="Inculva ana sayfa"></a>',
          "html",
        ),

        heading("Geliştirilmiş bağlam için aria-label kullanımı", "h3"),
        code(
          '<!-- Görsel tasarım "Devamını oku" gibi kısa metin gerektirdiğinde -->\n<article>\n  <h3>WCAG 2.4.4 Açıklaması</h3>\n  <p>Bağlantı amacı gereksinimlerini anlama...</p>\n  <a href="/makaleler/244" aria-label="WCAG 2.4.4 Açıklaması hakkında devamını oku">\n    Devamını oku\n  </a>\n</article>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          '"Buraya tıklayın", "burada", "devamını oku", "daha fazla bilgi" veya "daha fazla" ifadelerini ek bağlam olmadan tek bağlantı metni olarak kullanmak.',
        ),
        bullet(
          'Açıklayıcı bir etiket yerine ham URL\'yi bağlantı metni olarak kullanmak (örneğin "https://www.example.com/rapor.pdf").',
        ),
        bullet(
          "Aynı sayfada farklı hedeflere yönlendiren aynı metne sahip birden fazla bağlantı bulundurmak.",
        ),
        bullet(
          "Bir paragrafın tamamını veya büyük bir metin blogunu <a> etiketiyle sarmak, bağlantı metnini aşırı uzun yapmak.",
        ),
        bullet(
          "Görsel bağlantılarda alt metninin bağlantı hedefi yerine görseli tanımlaması.",
        ),
        bullet(
          "Bağlantı amacını sağlamanın tek yolu olarak title niteliği kullanmak — title ipuçları dokunmatik cihazlarda erişilemez ve ekran okuyucular tarafından tutarlı şekilde okunmaz.",
        ),
      ],
    },

    resources: [
      {
        title:
          "Understanding Success Criterion 2.4.4: Link Purpose (In Context)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r244w3cu",
      },
      {
        title: "WebAIM: Links and Hypertext",
        url: "https://webaim.org/techniques/hypertext/",
        source: "webaim",
        language: "en",
        _key: "r244waim",
      },
      {
        title: "Deque: link-name Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/link-name",
        source: "deque",
        language: "en",
        _key: "r244dequ",
      },
      {
        title: "W3C Techniques: H30 — Providing link text",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H30",
        source: "w3c-techniques",
        language: "en",
        _key: "r244w3ct",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.4 Link Purpose (In Context) — Accessible Links Guide",
        metaDescription:
          'Learn how to meet WCAG 2.4.4 Link Purpose. Write descriptive link text, fix "click here" antipatterns, and make links understandable for screen reader users.',
      },
      tr: {
        metaTitle:
          "WCAG 2.4.4 Bağlantı Amacı (Bağlamda) — Erişilebilir Bağlantılar Rehberi",
        metaDescription:
          "WCAG 2.4.4 Bağlantı Amacı kriterini nasıl karşılayacağınızı öğrenin. Açıklayıcı bağlantı metni yazın ve ekran okuyucu kullanıcıları için bağlantıları anlaşılır kılın.",
      },
    },
  },

  // ─── 2.4.5 Multiple Ways ───────────────────────────────────────────
  {
    criterionNumber: "2.4.5",
    level: "AA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: [],
    tags: ["navigation", "search", "sitemap"],

    title: {
      en: "Multiple Ways",
      tr: "Birden Fazla Yol",
    },

    description: {
      en: "More than one way is available to locate a web page within a set of web pages, except where the page is a result of or a step in a process.",
      tr: "Bir web sayfasını bir dizi web sayfası içinde bulmak için birden fazla yol sağlanmalıdır; sayfanın bir süreç sonucu veya adımı olduğu durumlar hariç.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.5 requires that users can find any page on a website through at least two different mechanisms. Common approaches include: a site-wide navigation menu, a search function, a sitemap page, a table of contents, breadcrumb navigation, or links between related pages.",
        ),
        p(
          "The exception is pages that are part of a multi-step process (such as a checkout flow or form wizard) — these do not need to be independently locatable since their context depends on the process flow.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Different users have different preferences and abilities when it comes to finding content. Some users prefer to browse through navigation menus, others prefer using search, and still others rely on sitemaps. Users with cognitive disabilities may find hierarchical navigation confusing and prefer a flat search interface. Blind users may prefer keyboard-navigable navigation structures over visual sitemaps.",
        ),
        p(
          "Providing multiple ways to locate content ensures that every user can find what they need using the method that works best for them. It also serves as a safety net — if one mechanism is difficult to use, the user has alternatives.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are no automated axe-core rules for this criterion. It requires manual verification that at least two navigation mechanisms exist.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Identify at least two of the following mechanisms on the website: navigation menu, search function, sitemap, table of contents, breadcrumbs, or related page links.",
        ),
        numbered(
          "Attempt to locate a specific content page using each available mechanism and confirm both paths lead to the same page.",
        ),
        numbered(
          "Verify that process-step pages (checkout, wizard) are excluded from this requirement.",
        ),
        bullet(
          "Check that the search function returns relevant results and is keyboard-accessible.",
        ),
        bullet(
          "Verify the sitemap is up to date and includes all public pages.",
        ),

        heading("How to fix", "h2"),
        p(
          "Implement at least two of the following mechanisms. A global navigation menu plus a search function is the most common pattern.",
        ),

        heading("Search with accessible markup", "h3"),
        code(
          '<form role="search" aria-label="Site search">\n  <label for="search-input">Search</label>\n  <input\n    type="search"\n    id="search-input"\n    name="q"\n    placeholder="Search articles..."\n    autocomplete="off"\n  />\n  <button type="submit">Search</button>\n</form>',
          "html",
        ),

        heading("Breadcrumb navigation", "h3"),
        code(
          '<nav aria-label="Breadcrumb">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/knowledge-base">Knowledge Base</a></li>\n    <li><a href="/knowledge-base/operable">Operable</a></li>\n    <li aria-current="page">2.4.5 Multiple Ways</li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Sitemap page structure", "h3"),
        code(
          '<main>\n  <h1>Sitemap</h1>\n  <nav aria-label="Sitemap">\n    <h2>Knowledge Base</h2>\n    <ul>\n      <li><a href="/kb/perceivable">Perceivable</a></li>\n      <li><a href="/kb/operable">Operable</a></li>\n      <li><a href="/kb/understandable">Understandable</a></li>\n      <li><a href="/kb/robust">Robust</a></li>\n    </ul>\n    <h2>Services</h2>\n    <ul>\n      <li><a href="/services/audit">Accessibility Audit</a></li>\n      <li><a href="/services/training">Training</a></li>\n    </ul>\n  </nav>\n</main>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Providing only a navigation menu with no search function, sitemap, or other alternative.",
        ),
        bullet(
          "Having a search function that is visually present but not keyboard-accessible.",
        ),
        bullet(
          "Maintaining a sitemap that is outdated and missing recently added pages.",
        ),
        bullet(
          "Using JavaScript-only navigation that breaks when scripts fail to load.",
        ),
        bullet(
          "Hiding the search function behind a tiny icon with no accessible label.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.5, kullanıcıların bir web sitesindeki herhangi bir sayfayı en az iki farklı mekanizma aracılığıyla bulabilmesini gerektirir. Yaygın yaklaşımlar arasında: site genelinde gezinme menüsü, arama işlevi, site haritası sayfası, içerik tablosu, içerik kırıntısı (breadcrumb) gezinmesi veya ilgili sayfalar arasındaki bağlantılar bulunur.",
        ),
        p(
          "İstisna, çok adımlı bir sürecin parçası olan sayfalardır (örneğin ödeme akışı veya form sihirbazı) — bunların bağımlı olarak bulunabilir olması gerekmez çünkü bağlamları süreç akışına bağlıdır.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Farklı kullanıcılar içerik bulmada farklı tercihlere ve yeteneklere sahiptir. Bazi kullanıcılar gezinme menüleri üzerinden göz atmayi tercih eder, digerleri arama kullanmayi tercih eder ve digerleri site haritalarina güvenilir. Bilişsel engelli kullanıcılar hiyerarsik gezinmeyi kafa karıştırıcı bulabilir ve duz bir arama arayuzunu tercih edebilir. Gor engelli kullanıcılar görsel site haritaları yerine klavye ile gezinilebilir gezinme yapilarini tercih edebilir.",
        ),
        p(
          "İçerik bulmak için birden fazla yol sağlamak, her kullancinin kendisi için en iyi çalışan yöntemi kullanarak ihtiyaç duydugunu bulabilmesini garanti eder. Ayrıca bir güvenlik agi işlevi görür — bir mekanizmayı kullanmak zorsa kullanıcının alternatifleri vardır.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "Bu kriter için otomatik axe-core kuralı yoktur. En az iki gezinme mekanizmasının bulunduğunu doğrulamak için manuel doğrulama gerektirir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Web sitesinde şu mekanizmalardan en az ikisini belirleyin: gezinme menüsü, arama işlevi, site haritası, içerik tablosu, içerik kırıntıları veya ilgili sayfa bağlantıları.",
        ),
        numbered(
          "Her mevcut mekanizmayı kullanarak belirli bir içerik sayfasını bulmaya çalışın ve her iki yolun da aynı sayfaya ulaştığını onaylayın.",
        ),
        numbered(
          "Süreç adımı sayfalarının (ödeme, sihirbaz) bu gereksinimden muaf olduğunu doğrulayın.",
        ),
        bullet(
          "Arama işlevinin ilgili sonuçlar döndürdüğünü ve klavye ile erişilebilir olduğunu kontrol edin.",
        ),
        bullet(
          "Site haritasının güncel olduğunu ve tüm herkese açık sayfaları içerdiğini doğrulayın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Aşağıdaki mekanizmalardan en az ikisini uygulayın. Genel gezinme menüsü ile arama işlevinin birleşimi en yaygın kalıptır.",
        ),

        heading("Erişilebilir işaretleme ile arama", "h3"),
        code(
          '<form role="search" aria-label="Site araması">\n  <label for="arama-girişi">Ara</label>\n  <input\n    type="search"\n    id="arama-girişi"\n    name="q"\n    placeholder="Makalelerde ara..."\n    autocomplete="off"\n  />\n  <button type="submit">Ara</button>\n</form>',
          "html",
        ),

        heading("İçerik kırıntısı gezinmesi", "h3"),
        code(
          '<nav aria-label="İçerik kırıntısı">\n  <ol>\n    <li><a href="/">Ana Sayfa</a></li>\n    <li><a href="/bilgi-bankasi">Bilgi Bankası</a></li>\n    <li><a href="/bilgi-bankasi/işlenebilir">Islenebilir</a></li>\n    <li aria-current="page">2.4.5 Birden Fazla Yol</li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Site haritası sayfa yapısı", "h3"),
        code(
          '<main>\n  <h1>Site Haritasi</h1>\n  <nav aria-label="Site haritası">\n    <h2>Bilgi Bankası</h2>\n    <ul>\n      <li><a href="/bb/algilanabilir">Algilanabilir</a></li>\n      <li><a href="/bb/işlenebilir">Islenebilir</a></li>\n      <li><a href="/bb/anlaşılabilir">Anlasilabilir</a></li>\n      <li><a href="/bb/sağlam">Saglam</a></li>\n    </ul>\n    <h2>Hizmetler</h2>\n    <ul>\n      <li><a href="/hizmetler/denetim">Erişilebilirlik Denetimi</a></li>\n      <li><a href="/hizmetler/eğitim">Eğitim</a></li>\n    </ul>\n  </nav>\n</main>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Arama işlevi, site haritası veya başka bir alternatif olmadan yalnızca gezinme menüsü sağlamak.",
        ),
        bullet(
          "Görsel olarak mevcut olan ancak klavye ile erişilebilir olmayan bir arama işlevine sahip olmak.",
        ),
        bullet(
          "Guncel olmayan ve son eklenen sayfaları içermeyen bir site haritası bulundurmak.",
        ),
        bullet(
          "Betikler yüklenemediğinde bozulan yalnızca JavaScript'e dayalı gezinme kullanmak.",
        ),
        bullet(
          "Arama işlevini erişilebilir etiketi olmayan küçük bir simgenin arkasina gizlemek.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.5: Multiple Ways",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r245w3cu",
      },
      {
        title: "W3C Techniques: G63 — Providing a site map",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G63",
        source: "w3c-techniques",
        language: "en",
        _key: "r245w3ct",
      },
      {
        title: "WebAIM: Site Searches and Sitemaps",
        url: "https://webaim.org/techniques/sitetools/",
        source: "webaim",
        language: "en",
        _key: "r245waim",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.5 Multiple Ways — Navigation Alternatives Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.5 Multiple Ways. Provide search, sitemaps, breadcrumbs, and navigation menus so users can find content through multiple paths.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.5 Birden Fazla Yol — Gezinme Alternatifleri Rehberi",
        metaDescription:
          "WCAG 2.4.5 Birden Fazla Yol kriterini nasıl karşılayacağınızı öğrenin. Kullanıcıların içeriği birden fazla yoldan bulabilmesi için arama, site haritası ve gezinme menüleri sağlayın.",
      },
    },
  },

  // ─── 2.4.6 Headings and Labels ─────────────────────────────────────
  {
    criterionNumber: "2.4.6",
    level: "AA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["page-has-heading-öne"],
    tags: ["headings", "labels", "structure"],

    title: {
      en: "Headings and Labels",
      tr: "Başlıklar ve Etiketler",
    },

    description: {
      en: "Headings and labels describe topic or purpose.",
      tr: "Başlıklar ve etiketler konuyu veya amacı tanımlamalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.6 requires that when headings and labels are used, they must be descriptive — clearly indicating the topic of the section or the purpose of the form control. This criterion does not require the presence of headings or labels (that is covered by other criteria), but when they exist, they must be meaningful.",
        ),
        p(
          'A heading like "Section 1" or a label like "Field" does not describe topic or purpose. Headings should summarize the content that follows, and labels should tell users exactly what information is expected in a form field.',
        ),

        heading("Why it matters", "h2"),
        p(
          "Screen reader users navigate by headings to quickly scan page structure and find relevant sections. When headings are vague or generic, users cannot efficiently locate the content they need. Similarly, unclear form labels force users to guess what information is required, leading to errors and frustration.",
        ),
        p(
          "Descriptive headings and labels also help users with cognitive disabilities understand page organization, support low-vision users who use screen magnifiers and see only a small portion of the page at a time, and improve overall usability for everyone.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "page-has-heading-one — Ensures the page or at least one of its frames contains a level-one heading.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Use a screen reader heading navigation (e.g., NVDA: H key) to browse all headings. Verify each heading describes the section content.",
        ),
        numbered(
          "Review all form labels to confirm they clearly describe the expected input.",
        ),
        numbered(
          "Run axe-core to check for page-has-heading-öne and any empty heading violations.",
        ),
        numbered(
          "Check that heading levels form a logical hierarchy (h1 > h2 > h3) without skipping levels.",
        ),
        bullet(
          "Verify that headings are not used solely for visual styling — use CSS instead of heading elements for non-structural emphasis.",
        ),

        heading("How to fix", "h2"),
        p(
          "Write headings that summarize the section content and labels that clearly identify the expected input.",
        ),

        heading("Descriptive headings", "h3"),
        code(
          "<!-- Bad: Generic or vague headings -->\n<h1>Welcome</h1>\n<h2>Section 1</h2>\n<h2>Section 2</h2>\n<h2>More Info</h2>\n\n<!-- Good: Descriptive, topic-specific headings -->\n<h1>WCAG 2.4.6 Headings and Labels</h1>\n<h2>What This Rule Means</h2>\n<h2>How to Write Effective Headings</h2>\n<h2>Form Label Best Practices</h2>",
          "html",
        ),

        heading("Descriptive form labels", "h3"),
        code(
          '<!-- Bad: Vague labels -->\n<label for="field1">Input</label>\n<input id="field1" type="text">\n\n<label for="field2">Enter value</label>\n<input id="field2" type="text">\n\n<!-- Good: Descriptive labels -->\n<label for="email">Email address</label>\n<input id="email" type="email" autocomplete="email">\n\n<label for="phone">Phone number (optional)</label>\n<input id="phone" type="tel" autocomplete="tel">',
          "html",
        ),

        heading("Group labels with fieldset and legend", "h3"),
        code(
          '<fieldset>\n  <legend>Notification preferences</legend>\n  <label>\n    <input type="checkbox" name="notify" value="email">\n    Email notifications\n  </label>\n  <label>\n    <input type="checkbox" name="notify" value="sms">\n    SMS notifications\n  </label>\n</fieldset>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          'Using headings like "Introduction", "Section 1", or "Details" that do not describe the actual topic.',
        ),
        bullet(
          "Using identical headings for different sections on the same page.",
        ),
        bullet(
          'Form labels that say "Input", "Field", or "Enter data" without specifying what data is expected.',
        ),
        bullet(
          "Using placeholder text as the only label — placeholders disappear on input and are not reliably read by all screen readers.",
        ),
        bullet(
          "Skipping heading levels (e.g., jumping from h1 to h3) which breaks the logical document outline.",
        ),
        bullet(
          "Using heading elements purely for visual styling rather than structural organization.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.6, başlıklar ve etiketler kullanıldığında bunların açıklayıcı olması — bölümün konusunu veya form denetiminin amacını açıkça belirtmesi — gerektiğini soyler. Bu kriter başlıkların veya etiketlerin varlığını gerektirmez (bu diğer kriterlerle kapsanır), ancak var olduklarinda anlamlı olmalidilar.",
        ),
        p(
          '"Bölüm 1" gibi bir başlık veya "Alan" gibi bir etiket konu veya amacı tanimlamaz. Başlıklar kendilerini izleyen içeriği ozetlemeli ve etiketler kullanıcılara form alanında tam olarak hangi bilginin bekledigini soylemlidir.',
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Ekran okuyucu kullanıcıları sayfa yapısını hızla taramak ve ilgili bölümleri bulmak için başlıklar üzerinden gezinir. Başlıklar belirsiz veya genel olduğunda kullanıcılar ihtiyaç duydukları içeriği verimli bir şekilde bulamaz. Benzer şekilde, belirsiz form etiketleri kullanıcıları hangi bilginin gerektiği konusunda tahminde bulunmaya zorlayarak hatalara ve hayal kırıklığına yol açar.",
        ),
        p(
          "Açıklayıcı başlıklar ve etiketler ayrıca bilişsel engelli kullanıcıların sayfa organizasyonunu anlamasına yardımcı olur, ekran büyüteçleri kullanan ve sayfanın bir seferde yalnızca küçük bir bölümünü gören az gören kullanıcıları destekler ve herkes için genel kullanılabilirliği arttırır.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "page-has-heading-öne — Sayfanın veya en az bir çerçevesinin birinci düzey başlık içermesini doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Bir ekran okuyucu başlık gezinmesi (örneğin NVDA: H tuşu) kullanarak tüm başlıkları gözden geçirin. Her başlığın bölüm içeriğini tanımladığını doğrulayın.",
        ),
        numbered(
          "Tüm form etiketlerini inceleyerek beklenen girdiyi açıkça tanımladıklarını onaylayın.",
        ),
        numbered(
          "axe-core çalıştırarak page-has-heading-öne ve boş başlık ihlallerini kontrol edin.",
        ),
        numbered(
          "Başlık düzeylerinin seviye atlamadan (h1 > h2 > h3) mantıklı bir hiyerarşi oluşturduğunu kontrol edin.",
        ),
        bullet(
          "Basliklarin yalnızca görsel stil için kullanilmadigini doğrulayın — yapısal olmayan vurgu için başlık öğeleri yerine CSS kullanın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Bölüm içeriğini ozetleyen başlıklar ve beklenen girdiyi açıkça tanımlayan etiketler yazın.",
        ),

        heading("Açıklayıcı başlıklar", "h3"),
        code(
          "<!-- Yanlış: Genel veya belirsiz başlıklar -->\n<h1>Hoş Geldiniz</h1>\n<h2>Bölüm 1</h2>\n<h2>Bölüm 2</h2>\n<h2>Daha Fazla Bilgi</h2>\n\n<!-- Doğru: Açıklayıcı, konuya özel başlıklar -->\n<h1>WCAG 2.4.6 Başlıklar ve Etiketler</h1>\n<h2>Bu Kural Ne Anlama Geliyor</h2>\n<h2>Etkili Başlıklar Nasıl Yazilir</h2>\n<h2>Form Etiketi En İyi Uygulamaları</h2>",
          "html",
        ),

        heading("Açıklayıcı form etiketleri", "h3"),
        code(
          '<!-- Yanlış: Belirsiz etiketler -->\n<label for="alan1">Girdi</label>\n<input id="alan1" type="text">\n\n<label for="alan2">Değer girin</label>\n<input id="alan2" type="text">\n\n<!-- Doğru: Açıklayıcı etiketler -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" type="email" autocomplete="email">\n\n<label for="telefon">Telefon numarası (isteğe bağlı)</label>\n<input id="telefon" type="tel" autocomplete="tel">',
          "html",
        ),

        heading("Fieldset ve legend ile grup etiketleri", "h3"),
        code(
          '<fieldset>\n  <legend>Bildirim tercihleri</legend>\n  <label>\n    <input type="checkbox" name="bildirim" value="eposta">\n    E-posta bildirimleri\n  </label>\n  <label>\n    <input type="checkbox" name="bildirim" value="sms">\n    SMS bildirimleri\n  </label>\n</fieldset>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          '"Giriş", "Bölüm 1" veya "Ayrintilar" gibi gerçek konuyu tanimlamayan başlıklar kullanmak.',
        ),
        bullet("Aynı sayfada farklı bölümler için aynı başlıkları kullanmak."),
        bullet(
          'Hangi verinin beklendigi belirtilmeden "Girdi", "Alan" veya "Veri girin" diyen form etiketleri.',
        ),
        bullet(
          "Tek etiket olarak yer tutucu metin kullanmak — yer tutucular girişte kaybolur ve tüm ekran okuyucular tarafından güvenilir şekilde okunmaz.",
        ),
        bullet(
          "Başlık düzeylerini atlamak (örneğin h1'den h3'e geçmek), bu da mantıklı belge anahatini bozar.",
        ),
        bullet(
          "Başlık öğelerini yapısal organizasyon yerine yalnızca görsel stil için kullanmak.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.6: Headings and Labels",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r246w3cu",
      },
      {
        title: "WebAIM: Headings",
        url: "https://webaim.org/techniques/semanticstructure/",
        source: "webaim",
        language: "en",
        _key: "r246waim",
      },
      {
        title: "Deque: page-has-heading-öne Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/page-has-heading-öne",
        source: "deque",
        language: "en",
        _key: "r246dequ",
      },
      {
        title: "W3C Techniques: G130 — Providing descriptive headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G130",
        source: "w3c-techniques",
        language: "en",
        _key: "r246w3ct",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.6 Headings and Labels — Descriptive Content Structure Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.6 Headings and Labels. Write descriptive headings and form labels that clearly identify topics and expected input.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.6 Başlıklar ve Etiketler — Açıklayıcı İçerik Yapısı Rehberi",
        metaDescription:
          "WCAG 2.4.6 Başlıklar ve Etiketler kriterini nasıl karşılayacağınızı öğrenin. Konulari ve beklenen girdileri açıkça tanımlayan başlıklar ve form etiketleri yazın.",
      },
    },
  },

  // ─── 2.4.7 Focus Visible ───────────────────────────────────────────
  {
    criterionNumber: "2.4.7",
    level: "AA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "critical",
    axeRuleIds: ["focus-visible"],
    tags: ["focus", "keyboard", "visual"],

    title: {
      en: "Focus Visible",
      tr: "Görünür Odak",
    },

    description: {
      en: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
      tr: "Klavye ile işlenebilir her kullanıcı arayüzünde klavye odak göstergesinin görünür olduğu bir işlem modu bulunmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.7 requires that when users navigate with a keyboard, the currently focused element must have a visible focus indicator. This is typically a visible outline, border change, or highlight that clearly shows which element has keyboard focus. Without this visual cue, keyboard users are navigating blind.",
        ),
        p(
          "The focus indicator must be visible in all states — not just on some elements or some pages. It applies to links, buttons, form fields, custom components, and any other focusable element. The default browser focus outline satisfies this requirement, but many sites remove it without providing a replacement.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Keyboard users rely on the focus indicator the way mouse users rely on the cursor. Without a visible focus indicator, pressing Tab becomes a guessing game — users cannot tell which element is selected, cannot predict what will happen when they press Enter, and cannot efficiently navigate the page. This makes websites effectively unusable for keyboard-only users.",
        ),
        p(
          "Visible focus is critical for users with motor impairments, low vision, and cognitive disabilities. It is also important for power users who prefer keyboard navigation for speed and efficiency. Removing the focus outline without replacement is one of the most common and most impactful accessibility failures on the web.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "focus-visible — Checks that interactive elements have a visible focus indicator when focused via keyboard.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Disconnect your mouse and navigate through the entire page using only Tab and Shift+Tab.",
        ),
        numbered(
          "Verify that every interactive element (links, buttons, inputs, selects, custom widgets) shows a clearly visible focus indicator when it receives focus.",
        ),
        numbered(
          "Check that the focus indicator has sufficient contrast against its background — at least 3:1 contrast ratio.",
        ),
        numbered("Test in different browsers, as focus styles may vary."),
        bullet(
          "Look for CSS rules like outline: none, outline: 0, or *:focus { outline: none } in the codebase — these are red flags.",
        ),
        bullet(
          "Verify that custom focus styles are at least as visible as the default browser outline.",
        ),

        heading("How to fix", "h2"),
        p(
          "Never remove the default focus outline without providing a visible alternative. Use the :focus-visible pseudo-class to show focus indicators only for keyboard navigation.",
        ),

        heading("Focus outline CSS — best practices", "h3"),
        code(
          "/* NEVER do this without a replacement */\n*:focus {\n  outline: none; /* Removes focus indicator for ALL users */\n}\n\n/* Good: Custom focus style for keyboard users only */\n:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}\n\n/* Good: Hide outline for mouse clicks, show for keyboard */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* Good: High-contrast focus ring */\n:focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 3px;\n  border-radius: 2px;\n}",
          "css",
        ),

        heading("Focus styles for dark and light themes", "h3"),
        code(
          "/* Light theme focus */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Dark theme focus */\n@media (prefers-color-scheme: dark) {\n  :focus-visible {\n    outline: 3px solid #6bb3ff;\n    outline-offset: 2px;\n  }\n}\n\n/* Double-ring technique for any background */\n:focus-visible {\n  outline: 3px solid #ffffff;\n  box-shadow: 0 0 0 6px #000000;\n}",
          "css",
        ),

        heading("Focus indicator on custom components", "h3"),
        code(
          '<!-- Custom card that is focusable -->\n<div role="button" tabindex="0" class="card">\n  <h3>Audit Report</h3>\n  <p>View your latest accessibility audit results</p>\n</div>\n\n<style>\n.card:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 4px rgba(74, 144, 217, 0.3);\n}\n</style>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Using outline: none or outline: 0 globally without providing any alternative focus indicator.",
        ),
        bullet(
          "Providing a focus indicator with insufficient contrast — it must have at least 3:1 contrast against adjacent colors.",
        ),
        bullet(
          "Using only a color change as the focus indicator — color alone cannot be the only visual distinction for colorblind users.",
        ),
        bullet(
          'Custom components (divs with role="button", custom dropdowns) that have no focus styles at all.',
        ),
        bullet(
          "Focus indicators that are too subtle — a 1px dotted line may not be visible enough, especially for low-vision users.",
        ),
        bullet(
          'Removing focus outlines "because the designer said so" — accessibility is a functional requirement, not optional styling.',
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.7, kullanıcılar klavye ile gezindiginde o anda odaklanmış olan öğenin görünür bir odak göstergesine sahip olmasını gerektirir. Bu genellikle hangi öğenin klavye odagina sahip olduğunu açıkça gösteren görünür bir çizgi, kenarlık değişikliği veya vurgudur. Bu görsel ipucu olmadan klavye kullanıcıları kör geziniyordur.",
        ),
        p(
          "Odak göstergesi tüm durumlarda görünür olmalıdır — yalnızca bazı ogelerde veya bazı sayfalarda değil. Bağlantılar, düğmeler, form alanları, özel bileşenler ve odaklanabilir diğer tüm öğeler için geçerlidir. Varsayılan tarayıcı odak çizgisi bu gereksinimi karşılar ancak birçok site bunu bir yedek sağlamadan kaldırır.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Klavye kullanıcıları odak göstergesine, fare kullanıcılarının imlece güvendiği gibi güvenilir. Görünür bir odak göstergesi olmadan Tab tuşuna basmak bir tahmin oyununa dönüşür — kullanıcılar hangi öğenin seçili olduğunu bilemez, Enter tuşuna bastiklarinda ne olacagini tahmin edemez ve sayfada verimli gezinme yapamaz. Bu, web sitelerini yalnızca klavye kullanan kişiler için fiilen kullanılamaz hale getirir.",
        ),
        p(
          "Görünür odak, motor engelli, az gören ve bilişsel engelli kullanıcılar için kritik öneme sahiptir. Hiz ve verimlilik için klavye gezinmesini tercih eden deneyimli kullanıcılar için de önemlidir. Odak cizgisini yedek sağlamadan kaldırmak, webdeki en yaygın ve en etkili erişilebilirlik hatalarından biridir.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "focus-visible — Etkileşimli öğelerin klavye ile odaklanildiginda görünür bir odak göstergesine sahip olup olmadığını kontrol eder.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Farenizi bağlantısını kesin ve sayfanın tamamında yalnızca Tab ve Shift+Tab tuşlarıyla gezinin.",
        ),
        numbered(
          "Her etkileşimli öğenin (bağlantılar, düğmeler, girdiler, seçiciler, özel bileşenler) odak aldığında açıkça görünür bir odak göstergesi gösterdiğini doğrulayın.",
        ),
        numbered(
          "Odak göstergesinin arka planına karşı yeterli kontrasta sahip olup olmadığını kontrol edin — en az 3:1 kontrast oranı.",
        ),
        numbered(
          "Farklı tarayıcılarda test edin çünkü odak stilleri değişebilir.",
        ),
        bullet(
          "Kod tabanında outline: none, outline: 0 veya *:focus { outline: none } gibi CSS kurallarını arayın — bunlar uyarı işaretleridir.",
        ),
        bullet(
          "Özel odak stillerinin varsayılan tarayıcı çizgisi kadar görünür olduğundan emin olun.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Varsayılan odak cizgisini görünür bir alternatif sağlamadan asla kaldirmayin. Odak göstergelerini yalnızca klavye gezinmesi için göstermek için :focus-visible sahte sinifini kullanın.",
        ),

        heading("Odak çizgisi CSS — en iyi uygulamalar", "h3"),
        code(
          "/* Yedek olmadan ASLA bunu yapmayın */\n*:focus {\n  outline: none; /* TUM kullanıcılar için odak göstergesini kaldırır */\n}\n\n/* Doğru: Yalnızca klavye kullanıcıları için özel odak stili */\n:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n}\n\n/* Doğru: Fare tiklari için çizgiyi gizle, klavye için göster */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* Doğru: Yüksek kontrastlı odak halkası */\n:focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 3px;\n  border-radius: 2px;\n}",
          "css",
        ),

        heading("Karanlık ve açık temalar için odak stilleri", "h3"),
        code(
          "/* Açık tema odağı */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Karanlık tema odağı */\n@media (prefers-color-scheme: dark) {\n  :focus-visible {\n    outline: 3px solid #6bb3ff;\n    outline-offset: 2px;\n  }\n}\n\n/* Her arka plan için çift halka tekniği */\n:focus-visible {\n  outline: 3px solid #ffffff;\n  box-shadow: 0 0 0 6px #000000;\n}",
          "css",
        ),

        heading("Özel bilesenlerde odak göstergesi", "h3"),
        code(
          '<!-- Odaklanabilir özel kart -->\n<div role="button" tabindex="0" class="kart">\n  <h3>Denetim Raporu</h3>\n  <p>En son erişilebilirlik denetim sonuclarinizi görüntüleyin</p>\n</div>\n\n<style>\n.kart:focus-visible {\n  outline: 3px solid #4a90d9;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 4px rgba(74, 144, 217, 0.3);\n}\n</style>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Herhangi bir alternatif odak göstergesi sağlamadan outline: none veya outline: 0 kullanmak.",
        ),
        bullet(
          "Yetersiz kontrasta sahip bir odak göstergesi sağlamak — bitişik renklere karşı en az 3:1 kontrast olmalıdır.",
        ),
        bullet(
          "Odak göstergesi olarak yalnızca renk değişikliği kullanmak — renk körlüğü olan kullanıcılar için renk tek görsel ayrimi olamaz.",
        ),
        bullet(
          'Hiçbir odak stili olmayan özel bileşenler (role="button" ile div\'ler, özel açılır menular).',
        ),
        bullet(
          "Çok ince odak göstergeleri — 1px noktali çizgi özellikle az gören kullanıcılar için yeterince görünür olmayabilir.",
        ),
        bullet(
          'Odak cizgilerini "tasarımcı istedi diye" kaldırmak — erişilebilirlik işlevsel bir gerekliliktir, isteğe bağlı stil değildir.',
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.7: Focus Visible",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r247w3cu",
      },
      {
        title: "MDN: :focus-visible pseudo-class",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
        source: "mdn",
        language: "en",
        _key: "r247mdnf",
      },
      {
        title: "The A11Y Project: Quick tip — never remove CSS outlines",
        url: "https://www.a11yproject.com/posts/never-remove-css-outlines/",
        source: "a11y-project",
        language: "en",
        _key: "r247a11y",
      },
      {
        title: "Deque: Focus Visible",
        url: "https://dequeuniversity.com/rules/axe/4.10/focus-visible",
        source: "deque",
        language: "en",
        _key: "r247dequ",
      },
      {
        title: "WebAIM: CSS in Action — Invisible Content",
        url: "https://webaim.org/techniques/css/invisiblecontent/",
        source: "webaim",
        language: "en",
        _key: "r247waim",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.7 Focus Visible — Keyboard Focus Indicator Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.7 Focus Visible. Implement visible keyboard focus indicators with CSS :focus-visible, outline styles, and high-contrast focus rings.",
      },
      tr: {
        metaTitle: "WCAG 2.4.7 Görünür Odak — Klavye Odak Gostergesi Rehberi",
        metaDescription:
          "WCAG 2.4.7 Görünür Odak kriterini nasıl karşılayacağınızı öğrenin. CSS :focus-visible, çizgi stilleri ve yüksek kontrastlı odak halkalariyla görünür klavye odak göstergeleri uygulayın.",
      },
    },
  },

  // ─── 2.4.8 Location ────────────────────────────────────────────────
  {
    criterionNumber: "2.4.8",
    level: "AAA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: [],
    tags: ["navigation", "breadcrumb", "sitemap"],

    title: {
      en: "Location",
      tr: "Konum",
    },

    description: {
      en: "Information about the user's location within a set of web pages is available.",
      tr: "Kullanıcının bir dizi web sayfası içindeki konumu hakkında bilgi sağlanmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.8 requires that users can determine their location within a website's structure. This includes knowing which page they are on, where that page sits within the site hierarchy, and how to navigate to related content. Common techniques include breadcrumb trails, highlighted navigation items, site maps, and step indicators in multi-step processes.",
        ),
        p(
          "This is a Level AAA criterion that builds on the navigation foundations of 2.4.5 (Multiple Ways). While 2.4.5 ensures users can find pages, 2.4.8 ensures users always know where they are.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Users with cognitive disabilities may become disoriented when navigating complex websites. Breadcrumbs and visual location indicators provide constant wayfinding cues that reduce cognitive load. Screen reader users benefit from breadcrumbs because they provide a concise summary of the site hierarchy without requiring exploration of the navigation menu.",
        ),
        p(
          "Location information also helps all users understand the structure and scope of the site, recover from navigation mistakes, and quickly move to parent or sibling sections.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are no automated axe-core rules for this criterion. It requires manual review of location indicators.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Navigate to several pages at different levels of the site hierarchy and verify that location information is present.",
        ),
        numbered(
          "Check that breadcrumb trails accurately reflect the page hierarchy.",
        ),
        numbered(
          "Verify that the current page is highlighted or indicated in the navigation menu.",
        ),
        numbered(
          "For multi-step processes, confirm a step indicator shows the current position.",
        ),
        bullet(
          "Verify breadcrumbs use proper semantic markup with nav and aria-label.",
        ),
        bullet(
          "Test with a screen reader to confirm location information is announced.",
        ),

        heading("How to fix", "h2"),
        p(
          "Implement breadcrumb navigation, highlight the current page in navigation, and add step indicators for multi-step processes.",
        ),

        heading("Breadcrumb navigation with schema.org", "h3"),
        code(
          '<nav aria-label="Breadcrumb">\n  <ol itemscope itemtype="https://schema.org/BreadcrumbList">\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/"><span itemprop="name">Home</span></a>\n      <meta itemprop="position" content="1" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/kb"><span itemprop="name">Knowledge Base</span></a>\n      <meta itemprop="position" content="2" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <span itemprop="name" aria-current="page">Location</span>\n      <meta itemprop="position" content="3" />\n    </li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Current page indicator in navigation", "h3"),
        code(
          '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/services">Services</a></li>\n    <li><a href="/kb" aria-current="page">Knowledge Base</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>\n\n<style>\n[aria-current="page"] {\n  font-weight: bold;\n  border-bottom: 3px solid currentColor;\n}\n</style>',
          "html",
        ),

        heading("Step indicator for multi-step process", "h3"),
        code(
          '<nav aria-label="Progress">\n  <ol>\n    <li aria-current="step">\n      <span>Step 1: Account details</span>\n    </li>\n    <li>\n      <span>Step 2: Site configuration</span>\n    </li>\n    <li>\n      <span>Step 3: Review and confirm</span>\n    </li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "No breadcrumbs or location indicators on any pages, leaving users without orientation cues.",
        ),
        bullet(
          "Breadcrumbs that do not reflect the actual page hierarchy or show incorrect paths.",
        ),
        bullet(
          "Navigation menus where the current page is not visually distinguished from other items.",
        ),
        bullet(
          "Using aria-current incorrectly or not at all to indicate the current page.",
        ),
        bullet(
          "Multi-step processes without a step indicator showing the user's current position.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.8, kullanıcıların bir web sitesinin yapısı içindeki konumlarını belirleyebilmesini gerektirir. Bu, hangi sayfada olduklarını, o sayfanın site hiyerarşisi içinde nerede olduğunu ve ilgili içeriklere nasıl gideceklerini bilmeyi içerir. Yaygın teknikler arasında içerik kırıntısı yolları, vurgulanan gezinme öğeleri, site haritaları ve çok adımlı süreçlerdeki adım göstergeleri bulunur.",
        ),
        p(
          "Bu, 2.4.5 (Birden Fazla Yol) gezinme temellerini genişleten bir AAA düzey kriterdir. 2.4.5 kullanıcıların sayfaları bulabilmesini sağlarken, 2.4.8 kullanıcıların her zaman nerede olduklarını bilmesini sağlar.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Bilişsel engelli kullanıcılar karmaşık web sitelerinde gezinirken yönünü kaybedebilir. İçerik kırıntıları ve görsel konum göstergeleri bilişsel yükü azaltan sürekli yol bulma ipuçları sağlar. Ekran okuyucu kullanıcıları, gezinme menüsünün keşfini gerektirmeden site hiyerarşisinin özlü bir özetini sağladıkları için içerik kırıntılarından fayda görür.",
        ),
        p(
          "Konum bilgisi ayrıca tüm kullanıcıların sitenin yapısını ve kapsamını anlamasına, gezinme hatalarından kurtulmasına ve üst veya kardeş bölümlere hızla geçmesine yardımcı olur.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "Bu kriter için otomatik axe-core kuralı yoktur. Konum göstergelerinin manuel incelemesi gerektirir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Site hiyerarşisinin farklı düzeylerindeki birden fazla sayfaya gidin ve konum bilgisinin mevcut olduğunu doğrulayın.",
        ),
        numbered(
          "İçerik kırıntısı yollarının sayfa hiyerarşisini doğru yansıttığını kontrol edin.",
        ),
        numbered(
          "Mevcut sayfanın gezinme menüsünde vurgulandığını veya belirtildiğini doğrulayın.",
        ),
        numbered(
          "Çok adımlı süreçlerde mevcut konumu gösteren bir adım göstergesini onaylayın.",
        ),
        bullet(
          "İçerik kırıntılarının nav ve aria-label ile uygun semantik işaretleme kullandığını doğrulayın.",
        ),
        bullet(
          "Bir ekran okuyucu ile test ederek konum bilgisinin duyurulduğunu onaylayın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "İçerik kırıntısı gezinmesi uygulayın, gezinmede mevcut sayfayı vurgulayın ve çok adımlı süreçlere adım göstergeleri ekleyin.",
        ),

        heading("Schema.org ile içerik kırıntısı gezinmesi", "h3"),
        code(
          '<nav aria-label="İçerik kırıntısı">\n  <ol itemscope itemtype="https://schema.org/BreadcrumbList">\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/"><span itemprop="name">Ana Sayfa</span></a>\n      <meta itemprop="position" content="1" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <a itemprop="item" href="/bb"><span itemprop="name">Bilgi Bankası</span></a>\n      <meta itemprop="position" content="2" />\n    </li>\n    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n      <span itemprop="name" aria-current="page">Konum</span>\n      <meta itemprop="position" content="3" />\n    </li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Gezinmede mevcut sayfa göstergesi", "h3"),
        code(
          '<nav aria-label="Ana gezinme">\n  <ul>\n    <li><a href="/">Ana Sayfa</a></li>\n    <li><a href="/hizmetler">Hizmetler</a></li>\n    <li><a href="/bb" aria-current="page">Bilgi Bankası</a></li>\n    <li><a href="/iletişim">İletişim</a></li>\n  </ul>\n</nav>\n\n<style>\n[aria-current="page"] {\n  font-weight: bold;\n  border-bottom: 3px solid currentColor;\n}\n</style>',
          "html",
        ),

        heading("Çok adımlı süreç için adım göstergesi", "h3"),
        code(
          '<nav aria-label="İlerleme">\n  <ol>\n    <li aria-current="step">\n      <span>Adım 1: Hesap bilgileri</span>\n    </li>\n    <li>\n      <span>Adım 2: Site yapılandırması</span>\n    </li>\n    <li>\n      <span>Adım 3: İnceleme ve onay</span>\n    </li>\n  </ol>\n</nav>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Hiçbir sayfada içerik kırıntısı veya konum göstergesi olmaması, kullanıcıları yönelim ipuçları olmadan bırakmak.",
        ),
        bullet(
          "Gerçek sayfa hiyerarşisini yansıtmayan veya yanlış yollar gösteren içerik kırıntıları.",
        ),
        bullet(
          "Mevcut sayfanın diğer öğelerden görsel olarak ayırt edilmediği gezinme menüleri.",
        ),
        bullet(
          "Mevcut sayfayı belirtmek için aria-current'in yanlış kullanılması veya hiç kullanılmaması.",
        ),
        bullet(
          "Kullanıcının mevcut konumunu gösteren bir adım göstergesi olmayan çok adımlı süreçler.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.8: Location",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/location.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r248w3cu",
      },
      {
        title: "W3C WAI: Breadcrumb Navigation",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
        source: "w3c-wai",
        language: "en",
        _key: "r248waib",
      },
      {
        title: "W3C Techniques: G65 — Providing a breadcrumb trail",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G65",
        source: "w3c-techniques",
        language: "en",
        _key: "r248w3ct",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.8 Location — Breadcrumb and Wayfinding Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.8 Location. Implement breadcrumbs, current page indicators, and step indicators to help users know where they are within your site.",
      },
      tr: {
        metaTitle: "WCAG 2.4.8 Konum — İçerik Kırıntısı ve Yol Bulma Rehberi",
        metaDescription:
          "WCAG 2.4.8 Konum kriterini nasıl karşılayacağınızı öğrenin. Kullanıcıların sitenizdeki konumlarını bilmelerine yardımcı olmak için içerik kırıntıları ve adım göstergeleri uygulayın.",
      },
    },
  },

  // ─── 2.4.9 Link Purpose (Link Only) ────────────────────────────────
  {
    criterionNumber: "2.4.9",
    level: "AAA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: ["identical-links-same-purpose"],
    tags: ["links", "navigation"],

    title: {
      en: "Link Purpose (Link Only)",
      tr: "Bağlantı Amacı (Yalnızca Bağlantı)",
    },

    description: {
      en: "A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.",
      tr: "Her bağlantının amacının yalnızca bağlantı metninden belirlenmesine olanak tanıyan bir mekanizma sağlanmalıdır; bağlantının amacının genel olarak kullanıcılar için belirsiz olacağı durumlar hariç.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.9 is the enhanced version of 2.4.4 (Link Purpose — In Context). While 2.4.4 allows link purpose to be determined from surrounding context, this AAA criterion requires that every link's purpose can be determined from the link text alone — without relying on the surrounding paragraph, heading, or list item.",
        ),
        p(
          'This means link text like "Read more" is never acceptable under this criterion, even if the surrounding context clarifies the destination. Every link must be self-descriptive. The only exception is when the link\'s purpose would be ambiguous to all users, not just assistive technology users.',
        ),

        heading("Why it matters", "h2"),
        p(
          "Screen reader users commonly navigate using a links list — a dialog that shows all links on the page extracted from their context. When link text is self-descriptive, users can scan this list and immediately find the link they need. This is significantly faster and more efficient than navigating to each link in the page and relying on surrounding content for context.",
        ),
        p(
          "Self-descriptive links also benefit users of voice control software who activate links by speaking their visible text, and users with cognitive disabilities who may not track the relationship between link text and surrounding context.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "identical-links-same-purpose — Ensures that links with identical accessible names serve the same purpose.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Generate a list of all links on the page (screen reader links list or browser extension).",
        ),
        numbered(
          "Review each link in isolation — can you determine where it leads without any surrounding context?",
        ),
        numbered(
          "Run axe-core to detect identical-links-same-purpose violations.",
        ),
        numbered(
          'Check that no links use generic text like "click here", "read more", "learn more", or "here" as standalone link text.',
        ),
        bullet(
          "Verify that image links have alt text that fully describes the link destination.",
        ),

        heading("How to fix", "h2"),
        p(
          "Replace all generic link text with self-descriptive text, or use aria-label to provide descriptive accessible names.",
        ),

        heading("Self-descriptive link text", "h3"),
        code(
          '<!-- Fails 2.4.9: Requires context to understand -->\n<article>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site for compliance. <a href="/services/audit">Read more</a></p>\n</article>\n\n<!-- Passes 2.4.9: Link text is self-descriptive -->\n<article>\n  <h3>Accessibility Audit Service</h3>\n  <p>We test your site for compliance.\n    <a href="/services/audit">Learn about our accessibility audit service</a>\n  </p>\n</article>',
          "html",
        ),

        heading("Cards with self-descriptive links", "h3"),
        code(
          '<!-- Fails: Multiple "View details" links on the same page -->\n<div class="card">\n  <h3>Monthly Report</h3>\n  <a href="/reports/monthly">View details</a>\n</div>\n<div class="card">\n  <h3>Annual Summary</h3>\n  <a href="/reports/annual">View details</a>\n</div>\n\n<!-- Passes: Each link is uniquely descriptive -->\n<div class="card">\n  <h3>Monthly Report</h3>\n  <a href="/reports/monthly">View monthly report details</a>\n</div>\n<div class="card">\n  <h3>Annual Summary</h3>\n  <a href="/reports/annual">View annual summary details</a>\n</div>',
          "html",
        ),

        heading("Using aria-label when visual text must be short", "h3"),
        code(
          '<!-- Visual design requires "Read more" but a11y needs detail -->\n<a href="/blog/wcag-guide"\n   aria-label="Read more about the complete WCAG compliance guide">\n  Read more\n</a>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          'Any use of "click here", "read more", "learn more", "here", or "more" as link text — even with surrounding context.',
        ),
        bullet(
          'Multiple links with the same text pointing to different destinations (e.g., multiple "Download" links).',
        ),
        bullet(
          "Relying on aria-describedby for link purpose — this adds a description but does not change the accessible name.",
        ),
        bullet(
          'Image links where the alt text says "icon" or "image" instead of describing the link destination.',
        ),
        bullet(
          "Links that combine an image and text but result in duplicate announcements by screen readers.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.9, 2.4.4'un (Bağlantı Amacı — Bağlamda) geliştirilmiş versiyonudur. 2.4.4 bağlantı amacının çevreleyen bağlamdan belirlenmesine izin verirken, bu AAA kriteri her bağlantının amacının yalnızca bağlantı metninden — çevreleyen paragraf, başlık veya liste öğesine dayanmadan — belirlenebilmesini gerektirir.",
        ),
        p(
          'Bu, çevreleyen bağlam hedefi netlestirse bile "Devamını oku" gibi bağlantı metninin bu kriter altında asla kabul edilebilir olmadığını belirtir. Her bağlantı kendini tanımlamalıdır. Tek istisna, bağlantının amacının yalnızca yardımcı teknoloji kullanıcılarına değil tüm kullanıcılar için belirsiz olacağı durumlarda geçerlidir.',
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Ekran okuyucu kullanıcıları yaygın olarak bağlantılar listesi kullanarak gezinir — sayfadaki tüm bağlantıları baglamlarindan ayrılmış olarak gösteren bir iletişim kutusu. Bağlantı metni kendini tanimladiginda kullanıcılar bu listeyi tarayabilir ve ihtiyaç duydukları baglantini hemen bulabilir. Bu, sayfadaki her baglanina gidip bağlam için çevreleyen içeriklere guvenmekten önemli ölçüde daha hızlı ve verimlidir.",
        ),
        p(
          "Kendini tanımlayan bağlantılar ayrıca bağlantıları görünür metinlerini söyleyerek etkinlestiren ses kontrolü yazılımı kullanan kullanıcılar ve bağlantı metni ile çevreleyen bağlam arasındaki ilişkiyi takip edemeyen bilişsel engelli kullanıcılar için de fayda sağlar.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "identical-links-same-purpose — Aynı erişilebilir ada sahip bağlantıların aynı amaca hizmet etmesini doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Sayfadaki tüm bağlantıların listesini oluşturun (ekran okuyucu bağlantı listesi veya tarayıcı eklentisi).",
        ),
        numbered(
          "Her bağlantıyı izole olarak inceleyin — çevreleyen bağlam olmadan nereye götürdüğünü belirleyebiliyor musunuz?",
        ),
        numbered(
          "axe-core çalıştırarak identical-links-same-purpose ihlallerini tespit edin.",
        ),
        numbered(
          'Hiçbir bağlantının bağımsız bağlantı metni olarak "buraya tıklayın", "devamını oku", "daha fazla bilgi" veya "burada" gibi genel metin kullanmadığını kontrol edin.',
        ),
        bullet(
          "Görsel bağlantıların bağlantı hedefini tam olarak tanımlayan alt metnine sahip olduğundan emin olun.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Tüm genel bağlantı metinlerini kendini tanımlayan metinle değiştirin veya açıklayıcı erişilebilir adlar sağlamak için aria-label kullanın.",
        ),

        heading("Kendini tanımlayan bağlantı metni", "h3"),
        code(
          '<!-- 2.4.9\'u geçemiyor: Anlamak için bağlam gerektiriyor -->\n<article>\n  <h3>Erişilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi uyumluluk için test ediyoruz. <a href="/hizmetler/denetim">Devamını oku</a></p>\n</article>\n\n<!-- 2.4.9\'u geçiyor: Bağlantı metni kendini tanımlayan -->\n<article>\n  <h3>Erişilebilirlik Denetim Hizmeti</h3>\n  <p>Sitenizi uyumluluk için test ediyoruz.\n    <a href="/hizmetler/denetim">Erişilebilirlik denetim hizmetimiz hakkında bilgi edinin</a>\n  </p>\n</article>',
          "html",
        ),

        heading("Kendini tanımlayan bağlantılı kartlar", "h3"),
        code(
          '<!-- Başarısız: Aynı sayfada birden fazla "Ayrıntıları gör" bağlantısı -->\n<div class="kart">\n  <h3>Aylık Rapor</h3>\n  <a href="/raporlar/aylık">Ayrıntıları gör</a>\n</div>\n<div class="kart">\n  <h3>Yıllık Özet</h3>\n  <a href="/raporlar/yıllık">Ayrıntıları gör</a>\n</div>\n\n<!-- Başarılı: Her bağlantı benzersiz şekilde açıklayıcı -->\n<div class="kart">\n  <h3>Aylık Rapor</h3>\n  <a href="/raporlar/aylık">Aylık rapor ayrıntılarını gör</a>\n</div>\n<div class="kart">\n  <h3>Yıllık Özet</h3>\n  <a href="/raporlar/yıllık">Yıllık özet ayrıntılarını gör</a>\n</div>',
          "html",
        ),

        heading("Görsel metin kısa olmalı ise aria-label kullanımı", "h3"),
        code(
          '<!-- Görsel tasarım "Devamını oku" gerektiriyor ama a11y için ayrıntı lazım -->\n<a href="/blog/wcag-rehberi"\n   aria-label="Tam WCAG uyumluluk rehberi hakkında devamını oku">\n  Devamını oku\n</a>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          '"Buraya tıklayın", "devamını oku", "daha fazla bilgi", "burada" veya "daha fazla" ifadelerinin bağlantı metni olarak herhangi bir kullanımı — çevreleyen bağlamla bile.',
        ),
        bullet(
          'Farklı hedeflere işaret eden aynı metne sahip birden fazla bağlantı (örneğin birden fazla "İndir" bağlantısı).',
        ),
        bullet(
          "Bağlantı amacı için aria-describedby kullanmak — bu bir açıklama ekler ancak erişilebilir adı değiştirmez.",
        ),
        bullet(
          'Alt metnin bağlantı hedefini tanımlamak yerine "simge" veya "görsel" dediği görsel bağlantılar.',
        ),
        bullet(
          "Bir görsel ve metni birleştiren ancak ekran okuyucularda tekrarlanan duyurulara neden olan bağlantılar.",
        ),
      ],
    },

    resources: [
      {
        title:
          "Understanding Success Criterion 2.4.9: Link Purpose (Link Only)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r249w3cu",
      },
      {
        title:
          "W3C Techniques: G91 — Providing link text that describes the purpose",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G91",
        source: "w3c-techniques",
        language: "en",
        _key: "r249w3ct",
      },
      {
        title: "Deque: identical-links-same-purpose Rule",
        url: "https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose",
        source: "deque",
        language: "en",
        _key: "r249dequ",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.9 Link Purpose (Link Only) — Self-Descriptive Links Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.9 Link Purpose (Link Only). Write self-descriptive link text that conveys purpose without relying on surrounding context.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.9 Bağlantı Amacı (Yalnızca Bağlantı) — Kendini Tanımlayan Bağlantılar Rehberi",
        metaDescription:
          "WCAG 2.4.9 Bağlantı Amacı kriterini nasıl karşılayacağınızı öğrenin. Çevreleyen bağlama dayanmadan amacı ileten kendini tanımlayan bağlantı metni yazın.",
      },
    },
  },

  // ─── 2.4.10 Section Headings ───────────────────────────────────────
  {
    criterionNumber: "2.4.10",
    level: "AAA",
    principle: "operable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: [],
    tags: ["headings", "structure"],

    title: {
      en: "Section Headings",
      tr: "Bölüm Başlıkları",
    },

    description: {
      en: "Section headings are used to organize the content.",
      tr: "İçeriği düzenlemek için bölüm başlıkları kullanılmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.10 requires that content is organized using section headings. When web content is divided into sections, each section should begin with an appropriate heading element (h1-h6) that describes the content of that section. This builds on 2.4.6 (Headings and Labels) which requires headings to be descriptive — this criterion requires headings to be present for all sections.",
        ),
        p(
          "This is a Level AAA criterion that pushes for comprehensive heading structure throughout all content. The intent is to ensure that every distinct section of content is introduced by a heading, making the page fully navigable by heading for assistive technology users.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Screen reader users navigate primarily by heading. The heading structure serves as a table of contents for the page — users can jump from heading to heading to quickly scan the page and find relevant sections. Without comprehensive headings, users must read content linearly to understand the page structure, which is extremely slow and fatiguing.",
        ),
        p(
          "Headings also benefit users with cognitive disabilities by breaking content into manageable chunks, users with low vision who use screen magnifiers by providing orientation points, and all users who scan pages visually.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are no specific automated axe-core rules that enforce section headings on all sections. This criterion requires manual content review.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Use a browser extension to generate a heading outline of the page (e.g., HeadingsMap, WAVE).",
        ),
        numbered(
          "Verify that every distinct content section is preceded by a heading element.",
        ),
        numbered(
          "Check that the heading hierarchy is logical and does not skip levels (h1 > h2 > h3).",
        ),
        numbered(
          "Navigate with a screen reader using heading navigation (H key) and confirm the page structure is clear.",
        ),
        bullet(
          "Ensure headings are not used on elements that are not actually section headings (e.g., using h3 for visual styling).",
        ),
        bullet(
          "Check that there is exactly one h1 per page, serving as the main page title.",
        ),

        heading("How to fix", "h2"),
        p(
          "Add heading elements at the beginning of each content section, maintaining a logical hierarchy.",
        ),

        heading("Proper heading structure", "h3"),
        code(
          "<main>\n  <h1>Accessibility Knowledge Base</h1>\n\n  <section>\n    <h2>Perceivable</h2>\n    <p>Content must be presentable to users in ways they can perceive...</p>\n\n    <section>\n      <h3>Text Alternatives</h3>\n      <p>Provide text alternatives for non-text content...</p>\n    </section>\n\n    <section>\n      <h3>Adaptable</h3>\n      <p>Create content that can be presented in different ways...</p>\n    </section>\n  </section>\n\n  <section>\n    <h2>Operable</h2>\n    <p>User interface components must be operable...</p>\n  </section>\n</main>",
          "html",
        ),

        heading("Using ARIA for implicit sections", "h3"),
        code(
          '<!-- When section headings are visually hidden but needed for AT -->\n<section aria-labelledby="sidebar-heading">\n  <h2 id="sidebar-heading" class="sr-only">Related Articles</h2>\n  <ul>\n    <li><a href="/kb/2-4-7">Focus Visible</a></li>\n    <li><a href="/kb/2-4-11">Focus Not Obscured</a></li>\n  </ul>\n</section>\n\n<style>\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n</style>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Content sections without any heading — users cannot navigate to or identify these sections.",
        ),
        bullet(
          "Skipping heading levels (e.g., h1 directly to h3) which breaks the logical document outline.",
        ),
        bullet(
          "Using heading elements for visual styling rather than structural organization.",
        ),
        bullet(
          "Multiple h1 elements on a single page, making the primary topic unclear.",
        ),
        bullet(
          "Using bold or large text instead of heading elements — visually similar but invisible to assistive technology.",
        ),
        bullet(
          "Leaving the heading structure inconsistent across pages, confusing returning users.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.10, içeriğin bölüm başlıkları kullanılarak duzenlenmesini gerektirir. Web içeriği bölümlere ayrıldığında her bölüm, o bölümün içeriğini tanımlayan uygun bir başlık öğesiyle (h1-h6) baslamalidir. Bu, başlıkların açıklayıcı olmasını gerektiren 2.4.6 (Başlıklar ve Etiketler) üzerine insaedir — bu kriter tüm bölümler için başlıkların mevcut olmasını gerektirir.",
        ),
        p(
          "Bu, tüm içerik boyunca kapsamlı başlık yapısı için baskilan bir AAA düzey kriterdir. Amaç, içeriğin her farklı bolumunun bir başlıkla tanitilmasini, sayfaların yardımcı teknoloji kullanıcıları için başlıkla tam olarak gezilebilir olmasını sağlamaktır.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Ekran okuyucu kullanıcıları öncelikle başlık üzerinden gezinir. Başlık yapısı sayfa için bir içerik tablosu görevi görür — kullanıcılar başlıktan başlığa atlayarak sayfayı hızla tarayabilir ve ilgili bölümleri bulabilir. Kapsamlı başlıklar olmadan kullanıcıların sayfa yapısını anlamak için içeriği doğrusal olarak okuması gerekir ki bu son derece yavaş ve yorucudur.",
        ),
        p(
          "Başlıklar ayrıca içeriği yönetilebilir parçalara bölerek bilişsel engelli kullanıcılara, yönelim noktaları sağlayarak ekran büyüteçleri kullanan az gören kullanıcılara ve sayfaları görsel olarak tarayan tüm kullanıcılara fayda sağlar.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "Tüm bolumlerde bölüm başlıklarını zorunlu kilan otomatik axe-core kuralı yoktur. Bu kriter manuel içerik incelemesi gerektirir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Sayfanın başlık anahatini oluşturmak için bir tarayıcı eklentisi kullanın (örneğin HeadingsMap, WAVE).",
        ),
        numbered(
          "Her farklı içerik bolumunun bir başlık öğesiyle başladığını doğrulayın.",
        ),
        numbered(
          "Başlık hiyerarşisinin mantıklı olduğunu ve seviyeleri atlamadigini (h1 > h2 > h3) kontrol edin.",
        ),
        numbered(
          "Başlık gezinmesini (H tuşu) kullanarak bir ekran okuyucu ile gezinin ve sayfa yapisinin açık olduğunu onaylayın.",
        ),
        bullet(
          "Basliklarin aslinda bölüm başlıkları olmayan ogelerde kullanilmadigini (örneğin görsel stil için h3 kullanmak) kontrol edin.",
        ),
        bullet(
          "Ana sayfa başlığı olarak hizmet eden sayfa başına tam olarak bir h1 olduğunu kontrol edin.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Her içerik bolumunun başına mantıklı bir hiyerarşiyi koruyarak başlık öğeleri ekleyin.",
        ),

        heading("Doğru başlık yapısı", "h3"),
        code(
          "<main>\n  <h1>Erişilebilirlik Bilgi Bankası</h1>\n\n  <section>\n    <h2>Algilanabilir</h2>\n    <p>İçerik kullanıcılara algilayabilecekleri şekilde sunulmalıdır...</p>\n\n    <section>\n      <h3>Metin Alternatifleri</h3>\n      <p>Metin dışı içerikler için metin alternatifleri sağlayın...</p>\n    </section>\n\n    <section>\n      <h3>Uyarlanabilir</h3>\n      <p>Farklı sekillerde sunulabilen içerik oluşturun...</p>\n    </section>\n  </section>\n\n  <section>\n    <h2>Islenebilir</h2>\n    <p>Kullanıcı arayüzü bileşenleri işlenebilir olmalıdır...</p>\n  </section>\n</main>",
          "html",
        ),

        heading("Örtük bölümler için ARIA kullanımı", "h3"),
        code(
          '<!-- Bölüm başlıkları görsel olarak gizli ama YT için gerekli olduğunda -->\n<section aria-labelledby="kenar-çubuğu-başlığı">\n  <h2 id="kenar-çubuğu-başlığı" class="sr-only">İlgili Makaleler</h2>\n  <ul>\n    <li><a href="/bb/2-4-7">Görünür Odak</a></li>\n    <li><a href="/bb/2-4-11">Odak Gizlenmemiş</a></li>\n  </ul>\n</section>\n\n<style>\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n</style>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Başlığı olmayan içerik bölümleri — kullanıcılar bu bölümlere gezinemez veya bunları tanimlayamaz.",
        ),
        bullet(
          "Başlık seviyelerini atlamak (örneğin h1'den doğrudan h3'e geçmek), bu da mantıklı belge anahatini bozar.",
        ),
        bullet(
          "Başlık öğelerini yapısal organizasyon yerine görsel stil için kullanmak.",
        ),
        bullet(
          "Tek bir sayfada birden fazla h1 öğesi, birincil konuyu belirsiz kılar.",
        ),
        bullet(
          "Başlık öğeleri yerine kalın veya büyük metin kullanmak — görsel olarak benzer ancak yardımcı teknoloji için görünmez.",
        ),
        bullet(
          "Başlık yapısını sayfalar arasında tutarsız bırakmak, geri donen kullanıcıların kafasını karıştırmak.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.10: Section Headings",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r2410w3c",
      },
      {
        title: "WebAIM: Semantic Structure — Headings",
        url: "https://webaim.org/techniques/semanticstructure/#headings",
        source: "webaim",
        language: "en",
        _key: "r2410wai",
      },
      {
        title: "W3C Techniques: G141 — Organizing a page using headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G141",
        source: "w3c-techniques",
        language: "en",
        _key: "r2410tec",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 2.4.10 Section Headings — Page Structure Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.10 Section Headings. Use heading elements to organize all content sections for better navigation and accessibility.",
      },
      tr: {
        metaTitle: "WCAG 2.4.10 Bölüm Başlıkları — Sayfa Yapısı Rehberi",
        metaDescription:
          "WCAG 2.4.10 Bölüm Başlıkları kriterini nasıl karşılayacağınızı öğrenin. Daha iyi gezinme ve erişilebilirlik için tüm içerik bölümlerini başlık öğeleriyle duzenleyin.",
      },
    },
  },

  // ─── 2.4.11 Focus Not Obscured (Minimum) ──────────────────────────
  {
    criterionNumber: "2.4.11",
    level: "AA",
    principle: "operable",
    introducedIn: "2.2",
    wcagVersions: ["2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["focus", "keyboard", "visual", "sticky"],

    title: {
      en: "Focus Not Obscured (Minimum)",
      tr: "Odak Gizlenmemiş (Minimum)",
    },

    description: {
      en: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.",
      tr: "Bir kullanıcı arayüzü bileşeni klavye odağını aldığında, bileşen yazar tarafından oluşturulan içerik nedeniyle tamamen gizlenmemelidir.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.11 is a new criterion introduced in WCAG 2.2 that addresses a common modern web pattern: sticky headers, footers, cookie banners, and overlays that cover focused elements. When a component receives keyboard focus, at least part of it must remain visible — it must not be entirely hidden behind other content created by the page author.",
        ),
        p(
          "This is the minimum requirement — at least some part of the focused component must be visible. The enhanced version (2.4.12) requires that the focused component is fully visible. Note that this criterion only applies to content controlled by the author, not user-agent features like browser toolbars.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Sticky headers, fixed-position cookie banners, and chat widgets are ubiquitous on modern websites. When a keyboard user tabs to an element that is positioned behind one of these sticky elements, they cannot see what they are interacting with. This is equivalent to having a piece of paper covering part of a form while trying to fill it out — frustrating and error-prone.",
        ),
        p(
          "This problem disproportionately affects keyboard users because mouse users can scroll to reveal obscured elements, but keyboard focus does not automatically scroll the page to ensure visibility. Users with motor impairments, low vision, and cognitive disabilities are especially impacted.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are currently no automated axe-core rules for 2.4.11. This criterion requires manual testing with keyboard navigation.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Navigate the entire page using Tab. At each focused element, check if any sticky or fixed-position content covers it.",
        ),
        numbered(
          "Pay special attention to elements near the top and bottom of the viewport where sticky headers and footers appear.",
        ),
        numbered(
          "Trigger cookie banners, chat widgets, and notification bars, then tab through the page to check for obscured focus.",
        ),
        numbered(
          "Resize the browser window to a smaller size and repeat the test — obscured focus is more likely in smaller viewports.",
        ),
        bullet(
          "Check that scroll-padding or scroll-margin is used to account for sticky elements when focus causes scrolling.",
        ),

        heading("How to fix", "h2"),
        p(
          "Use CSS scroll-padding to prevent sticky elements from obscuring focused content, and ensure overlays do not block interactive elements.",
        ),

        heading("Scroll padding for sticky headers", "h3"),
        code(
          "/* Prevent sticky header from covering focused elements */\nhtml {\n  scroll-padding-top: 80px; /* Height of sticky header */\n}\n\n/* If you have a sticky footer too */\nhtml {\n  scroll-padding-top: 80px;\n  scroll-padding-bottom: 60px;\n}\n\n/* Sticky header styles */\n.site-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  height: 80px;\n}",
          "css",
        ),

        heading("Cookie banner that does not obscure focus", "h3"),
        code(
          '<!-- Cookie banner that pushes content up instead of overlaying -->\n<div class="cookie-banner" role="dialog" aria-label="Cookie consent">\n  <p>We use cookies to improve your experience.</p>\n  <div>\n    <button>Accept all</button>\n    <button>Reject non-essential</button>\n    <a href="/privacy">Cookie policy</a>\n  </div>\n</div>\n\n<style>\n.cookie-banner {\n  position: sticky;\n  bottom: 0;\n  z-index: 100;\n  padding: 1rem;\n  background: #1a1a2e;\n  color: #fff;\n}\n\n/* Adjust scroll padding when banner is visible */\nhtml:has(.cookie-banner) {\n  scroll-padding-bottom: 80px;\n}\n</style>',
          "html",
        ),

        heading("JavaScript: scroll focused element into view", "h3"),
        code(
          "// Ensure focused elements are not obscured by sticky elements\nfunction ensureFocusVisible() {\n  document.addEventListener('focusin', (e) => {\n    const header = document.querySelector('.site-header');\n    const footer = document.querySelector('.cookie-banner');\n    const rect = e.target.getBoundingClientRect();\n    const headerHeight = header?.getBoundingClientRect().height || 0;\n    const footerHeight = footer?.getBoundingClientRect().height || 0;\n\n    if (rect.top < headerHeight || rect.bottom > window.innerHeight - footerHeight) {\n      e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });\n    }\n  });\n}\nensureFocusVisible();",
          "javascript",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Sticky headers that cover focused elements when users tab through the page.",
        ),
        bullet(
          "Cookie consent banners fixed to the bottom of the viewport that obscure footer links and form fields.",
        ),
        bullet(
          "Chat widget bubbles that overlap with interactive elements in the lower-right corner.",
        ),
        bullet(
          "Notification banners that slide in and cover the currently focused element.",
        ),
        bullet(
          "Not accounting for sticky elements when using scrollIntoView or anchor links.",
        ),
        bullet(
          "Modeless overlays that partially cover the page without trapping focus.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.11, WCAG 2.2'de tanitilan ve modern web kalıplarını ele alan yeni bir kriterdir: yapışan başlıklar, alt bilgiler, çerez afişleri ve odaklanmış öğeleri ortur katmanlar. Bir bileşen klavye odağını aldığında, en az bir kısmı görünür kalmalıdır — sayfa yazari tarafından oluşturulan içerik tarafından tamamen gizlenmemelidir.",
        ),
        p(
          "Bu minimum gerekliliktir — odaklanan bileşenin en az bir kısmı görünür olmalıdır. Geliştirilmiş versiyon (2.4.12) odaklanan bileşenin tamamen görünür olmasını gerektirir. Bu kriterin yalnızca yazar tarafından kontrol edilen içeriklere uygulandığını, tarayıcı araç çubukları gibi kullanıcı araçısı ozelliklerine uygulanmadigini unutmayin.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Yapısal başlıklar, sabit konumlu çerez afişleri ve sohbet bileşenleri modern web sitelerinde her yerdedir. Bir klavye kullanıcısı bu yapışan öğelerin arkasında konumlanmis bir öğeye sekme ile ulastiginda ne ile etkilestigini göremez. Bu, bir formu doldururken formun bir kısmını kaplayan bir kagit parçası olmasina esdeğerdir — sınır bozucu ve hataya açık.",
        ),
        p(
          "Bu sorun klavye kullanıcılarını orantisiz şekilde etkiler çünkü fare kullanıcıları gizlenmiş öğeleri ortaya çıkarmak için kaydirabililir, ancak klavye odağı gorunurlugunun sağlanması için sayfayı otomatik olarak kaydirmaz. Motor engelli, az gören ve bilişsel engelli kullanıcılar özellikle etkilenir.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "2.4.11 için şu anda otomatik axe-core kuralı yoktur. Bu kriter klavye gezinmesiyle manuel test gerektirir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Tab kullanarak sayfanın tamamında gezinin. Her odaklanan öğede yapışan veya sabit konumlu içeriğin onu kapsayip kaplamadigini kontrol edin.",
        ),
        numbered(
          "Yapısal başlıkların ve alt bilgilerin göründüğü goruntuaaninin üstüne ve altına yakın öğelere özellikle dikkat edin.",
        ),
        numbered(
          "Çerez afislerini, sohbet bileşenlerini ve bildirim cubuklarini tetikleyin, ardından gizlenmiş odak için sayfada sekme ile gezinin.",
        ),
        numbered(
          "Tarayıcı penceresini daha küçük bir boyuta yeniden boyutlandirin ve testi tekrarlayin — gizlenmiş odak daha küçük goruntuaalanlarinda daha olası.",
        ),
        bullet(
          "Odak kaydirilmasina neden olduğunda yapışan öğeleri hesaba katmak için scroll-padding veya scroll-margin kullanidigini kontrol edin.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Yapısal öğelerin odaklanan içerikleri gizlemesini önlemek için CSS scroll-padding kullanın ve katmanlarin etkileşimli öğeleri engellememesini sağlayın.",
        ),

        heading("Yapısal başlıklar için kaydırma dolgulama", "h3"),
        code(
          "/* Yapısal başlığın odaklanan öğeleri kaplamasini onle */\nhtml {\n  scroll-padding-top: 80px; /* Yapısal başlık yüksekliği */\n}\n\n/* Yapısal alt bilginiz de varsa */\nhtml {\n  scroll-padding-top: 80px;\n  scroll-padding-bottom: 60px;\n}\n\n/* Yapısal başlık stilleri */\n.site-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  height: 80px;\n}",
          "css",
        ),

        heading("Odagi gizlemeyen çerez afişi", "h3"),
        code(
          '<!-- Katman yerine içeriği yukarı iten çerez afişi -->\n<div class="çerez-afişi" role="dialog" aria-label="Çerez onay">\n  <p>Deneyiminizi iyileştirmek için cerezler kullaniyoruz.</p>\n  <div>\n    <button>Tumunu kabul et</button>\n    <button>Zorunlu olmayanlari reddet</button>\n    <a href="/gizlilik">Çerez politikasi</a>\n  </div>\n</div>\n\n<style>\n.çerez-afişi {\n  position: sticky;\n  bottom: 0;\n  z-index: 100;\n  padding: 1rem;\n  background: #1a1a2e;\n  color: #fff;\n}\n\n/* Afis görünür iken kaydırma doldurmasini ayarla */\nhtml:has(.çerez-afişi) {\n  scroll-padding-bottom: 80px;\n}\n</style>',
          "html",
        ),

        heading("JavaScript: odaklanan öğeyi görünür alana kaydır", "h3"),
        code(
          "// Odaklanan öğelerin yapışan öğeler tarafından gizlenmediğinden emin ol\nfunction odakGorunurKil() {\n  document.addEventListener('focusin', (e) => {\n    const başlık = document.querySelector('.site-header');\n    const altBilgi = document.querySelector('.çerez-afişi');\n    const rect = e.target.getBoundingClientRect();\n    const baslikYuk = başlık?.getBoundingClientRect().height || 0;\n    const altBilgiYuk = altBilgi?.getBoundingClientRect().height || 0;\n\n    if (rect.top < baslikYuk || rect.bottom > window.innerHeight - altBilgiYuk) {\n      e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });\n    }\n  });\n}\nodakGorunurKil();",
          "javascript",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Kullanıcılar sayfada sekme ile gezindiginde odaklanan öğeleri ortur yapışan başlıklar.",
        ),
        bullet(
          "Alt bilgi bağlantıları ve form alanlarını gizleyen goruntuaalaninin altına sabitlenmiş çerez onay afişleri.",
        ),
        bullet(
          "Sag alt kosedeki etkileşimli ogelerle ustuste binen sohbet bileşen balonları.",
        ),
        bullet(
          "Kayarak gelen ve o anda odaklanan öğeyi ortur bildirim afişleri.",
        ),
        bullet(
          "scrollIntoView veya çapa bağlantıları kullanilirken yapışan öğelerin hesaba katilmamasi.",
        ),
        bullet("Odagi yakalamadan sayfayı kısmen ortur modsuz katmanlar."),
      ],
    },

    resources: [
      {
        title:
          "Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r2411w3c",
      },
      {
        title: "MDN: scroll-padding",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding",
        source: "mdn",
        language: "en",
        _key: "r2411mdn",
      },
      {
        title: "W3C WAI: What's New in WCAG 2.2",
        url: "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/",
        source: "w3c-wai",
        language: "en",
        _key: "r2411wai",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.11 Focus Not Obscured (Minimum) — Sticky Element Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.11 Focus Not Obscured. Prevent sticky headers, cookie banners, and overlays from hiding focused elements with scroll-padding and layout fixes.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.11 Odak Gizlenmemiş (Minimum) — Yapısal Öğe Rehberi",
        metaDescription:
          "WCAG 2.4.11 Odak Gizlenmemiş kriterini nasıl karşılayacağınızı öğrenin. Yapısal başlıklar, çerez afişleri ve katmanlarin odaklanan öğeleri gizlemesini önleyin.",
      },
    },
  },

  // ─── 2.4.12 Focus Not Obscured (Enhanced) ─────────────────────────
  {
    criterionNumber: "2.4.12",
    level: "AAA",
    principle: "operable",
    introducedIn: "2.2",
    wcagVersions: ["2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["focus", "keyboard", "visual"],

    title: {
      en: "Focus Not Obscured (Enhanced)",
      tr: "Odak Gizlenmemiş (Gelişmiş)",
    },

    description: {
      en: "When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.",
      tr: "Bir kullanıcı arayüzü bileşeni klavye odağını aldığında, bileşenin hiçbir kısmı yazar tarafından oluşturulan içerik tarafından gizlenmemelidir.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.12 is the enhanced version of 2.4.11 (Focus Not Obscured — Minimum). While 2.4.11 requires that focused elements are not entirely hidden, this AAA criterion requires that no part of the focused component is hidden by author-created content. The entire focused element — including its focus indicator — must be fully visible.",
        ),
        p(
          "This is a stricter requirement that ensures keyboard users have complete visual feedback about the focused element. Even partial obscuring — such as a sticky header covering the top edge of a focused element — fails this criterion.",
        ),

        heading("Why it matters", "h2"),
        p(
          "When part of a focused element is hidden, users may not see the full content of what they are interacting with. A partially obscured button label might be misread, a partially hidden form field might appear empty when it contains a value, and a cut-off focus indicator might be confused with no focus indicator at all.",
        ),
        p(
          "For users with low vision who use screen magnification, even a small amount of obscuring can make the difference between being able to use an element and not. Full visibility ensures that all users receive complete visual information about the focused component.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are no automated axe-core rules for 2.4.12. This criterion requires thorough manual testing with keyboard navigation at various viewport sizes.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Navigate the entire page using Tab and check that every focused element is fully visible, with no part covered by sticky or fixed content.",
        ),
        numbered(
          "Test at multiple viewport sizes — mobile, tablet, and desktop.",
        ),
        numbered(
          "Check that the focus indicator itself (outline, ring, etc.) is not clipped or hidden by overflow:hidden on parent elements.",
        ),
        numbered(
          "Trigger all overlays (cookie banners, chat widgets, notifications) and re-test the full tab cycle.",
        ),
        bullet(
          "Verify that scroll-padding values are sufficient to keep the entire element and its focus indicator visible.",
        ),
        bullet(
          "Check elements near the edges of scrollable containers for clipped focus indicators.",
        ),

        heading("How to fix", "h2"),
        p(
          "Build on the techniques from 2.4.11 and ensure zero obscuring of any part of focused elements.",
        ),

        heading("Generous scroll padding", "h3"),
        code(
          "/* Account for focus indicator size in scroll padding */\nhtml {\n  /* Header (80px) + focus outline (3px) + offset (3px) + safety margin (8px) */\n  scroll-padding-top: 94px;\n  scroll-padding-bottom: 74px; /* Footer (60px) + focus ring space */\n}",
          "css",
        ),

        heading("Prevent overflow clipping of focus indicators", "h3"),
        code(
          "/* Bad: overflow hidden clips focus outlines */\n.card-container {\n  overflow: hidden;\n}\n\n/* Good: overflow visible preserves focus outlines */\n.card-container {\n  overflow: visible;\n}\n\n/* If overflow hidden is needed, use outline-offset to keep focus inside */\n.card-container {\n  overflow: hidden;\n}\n.card-container *:focus-visible {\n  outline-offset: -3px; /* Inset outline stays within bounds */\n}",
          "css",
        ),

        heading("Ensuring sticky elements have enough clearance", "h3"),
        code(
          "// After any layout change, verify focused element visibility\nfunction verifyFocusVisibility() {\n  const focused = document.activeElement;\n  if (!focused || focused === document.body) return;\n\n  const rect = focused.getBoundingClientRect();\n  const stickyElements = document.querySelectorAll(\n    '[style*=\"position: sticky\"], [style*=\"position: fixed\"]'\n  );\n\n  for (const sticky of stickyElements) {\n    const stickyRect = sticky.getBoundingClientRect();\n    const overlap =\n      rect.top < stickyRect.bottom &&\n      rect.bottom > stickyRect.top &&\n      rect.left < stickyRect.right &&\n      rect.right > stickyRect.left;\n\n    if (overlap) {\n      focused.scrollIntoView({ block: 'center', behavior: 'smooth' });\n      break;\n    }\n  }\n}",
          "javascript",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Scroll-padding values that account for the sticky element but not the focus indicator's extra pixels.",
        ),
        bullet(
          "Parent containers with overflow:hidden that clip focus outlines extending beyond the container boundary.",
        ),
        bullet(
          "Sticky elements whose height changes (e.g., navigation that expands on scroll) without updating scroll-padding.",
        ),
        bullet(
          "Chat widgets or FAB buttons that overlap the bottom-right area where focused elements may be.",
        ),
        bullet(
          "Inline popover or tooltip elements that appear on top of the next focusable element in tab order.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.12, 2.4.11'in (Odak Gizlenmemiş — Minimum) geliştirilmiş versiyonudur. 2.4.11 odaklanan öğelerin tamamen gizlenmemesini gerektirirken, bu AAA kriteri odaklanan bileşenin hiçbir kısmının yazar tarafından oluşturulan içerik tarafından gizlenmemesini gerektirir. Odak göstergesi dahil tüm odaklanan öğe tamamen görünür olmalıdır.",
        ),
        p(
          "Bu, klavye kullanıcılarının odaklanan öğe hakkında tam görsel geri bildirim almasını sağlayan daha sıkı bir gerekliliktir. Yapısal başlığın odaklanan bir öğenin üst kenarını kaplayan kısmı obscuring gibi — bu kriteri başarısız kılar.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Odaklanan bir öğenin kısmı gizlendiğinde kullanıcılar etkileştikleri şeyin tam içeriğini göremeyebilir. Kısmen gizlenmiş bir düğme etiketi yanlış okunabilir, kısmen gizli bir form alanı bir değer içerdiğinde boş görünebilir ve kesilmiş bir odak göstergesi hiç odak göstergesi olmadığı ile karıştırılabilir.",
        ),
        p(
          "Ekran büyütme kullanan az gören kullanıcılar için küçük bir miktar gizleme bile bir öğeyi kullanabilme ile kullanamama arasındaki farkı yaratabilir. Tam görünürlük tüm kullanıcıların odaklanan bileşen hakkında eksiksiz görsel bilgi almasını sağlar.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "2.4.12 için otomatik axe-core kuralı yoktur. Bu kriter çeşitli görüntüalanı boyutlarında klavye gezinmesiyle kapsamlı manuel test gerektirir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Tab kullanarak sayfanın tamamında gezinin ve her odaklanan öğenin tamamen görünür olduğunu, hiçbir kısmının yapışan veya sabit içerik tarafından kaplanmadığını kontrol edin.",
        ),
        numbered(
          "Birden fazla görüntüalanı boyutunda test edin — mobil, tablet ve masaüstü.",
        ),
        numbered(
          "Odak göstergesinin (çizgi, halka vb.) kendisinin üst öğelerdeki overflow:hidden tarafından kesilmediğini veya gizlenmediğini kontrol edin.",
        ),
        numbered(
          "Tüm katmanları (çerez afişleri, sohbet bileşenleri, bildirimler) tetikleyin ve tam sekme döngüsünü yeniden test edin.",
        ),
        bullet(
          "Kaydırma dolgulama değerlerinin tüm öğeyi ve odak göstergesini görünür tutmak için yeterli olduğunu doğrulayın.",
        ),
        bullet(
          "Kaydırılan kapsayıcıların kenarlarındaki öğeleri kesilmiş odak göstergeleri açısından kontrol edin.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "2.4.11'deki teknikleri temel alın ve odaklanan öğelerin hiçbir kısmının gizlenmediğinden emin olun.",
        ),

        heading("Cömert kaydırma dolgulama", "h3"),
        code(
          "/* Kaydırma doldurmasında odak göstergesi boyutunu hesaba kat */\nhtml {\n  /* Başlık (80px) + odak çizgisi (3px) + ofset (3px) + güvenlik marjı (8px) */\n  scroll-padding-top: 94px;\n  scroll-padding-bottom: 74px; /* Alt bilgi (60px) + odak halkası alanı */\n}",
          "css",
        ),

        heading("Odak göstergelerinin tasinma kirilmasini onle", "h3"),
        code(
          "/* Yanlış: overflow hidden odak cizgilerini kırpar */\n.kart-kapsayıcı {\n  overflow: hidden;\n}\n\n/* Doğru: overflow visible odak cizgilerini korur */\n.kart-kapsayıcı {\n  overflow: visible;\n}\n\n/* Overflow hidden gerekliyse odağı iceri al */\n.kart-kapsayıcı {\n  overflow: hidden;\n}\n.kart-kapsayıcı *:focus-visible {\n  outline-offset: -3px; /* Ic çizgi sinirlarin içinde kalır */\n}",
          "css",
        ),

        heading(
          "Yapısal öğelerin yeterli boşluğa sahip olmasını sağlama",
          "h3",
        ),
        code(
          "// Her düzen değişikliğinden sonra odaklanan öğe gorunurlugunu doğrula\nfunction odakGorunurluguDogrula() {\n  const odaklı = document.activeElement;\n  if (!odaklı || odaklı === document.body) return;\n\n  const rect = odaklı.getBoundingClientRect();\n  const yapisanOgeler = document.querySelectorAll(\n    '[style*=\"position: sticky\"], [style*=\"position: fixed\"]'\n  );\n\n  for (const yapışan of yapisanOgeler) {\n    const yapisanRect = yapışan.getBoundingClientRect();\n    const ustUste =\n      rect.top < yapisanRect.bottom &&\n      rect.bottom > yapisanRect.top &&\n      rect.left < yapisanRect.right &&\n      rect.right > yapisanRect.left;\n\n    if (ustUste) {\n      odaklı.scrollIntoView({ block: 'center', behavior: 'smooth' });\n      break;\n    }\n  }\n}",
          "javascript",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Yapısal öğeyi hesaba katan ancak odak göstergesinin ekstra piksellerini hesaba katmayan kaydırma dolgulama değerleri.",
        ),
        bullet(
          "Kapsayıcı sınırının ötesine uzanan odak cizgilerini kirpan overflow:hidden'li üst kapsayıcılar.",
        ),
        bullet(
          "Yuksekligi değişen yapışan öğeler (örneğin kaydirmada genislenen gezinme) ile kaydırma dolgulama guncellenmiyor.",
        ),
        bullet(
          "Odaklanan öğelerin bulunabilecegi sağ alt alayla ustuste binen sohbet bileşenleri veya FAB düğmeleri.",
        ),
        bullet(
          "Sekme sırasındaki sonraki odaklanabilir öğenin üstünde görünen satır içi açılır pencere veya ipucu öğeleri.",
        ),
      ],
    },

    resources: [
      {
        title:
          "Understanding Success Criterion 2.4.12: Focus Not Obscured (Enhanced)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r2412w3c",
      },
      {
        title: "MDN: overflow CSS property",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
        source: "mdn",
        language: "en",
        _key: "r2412mdn",
      },
      {
        title: "W3C WAI: What's New in WCAG 2.2",
        url: "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/",
        source: "w3c-wai",
        language: "en",
        _key: "r2412wai",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.12 Focus Not Obscured (Enhanced) — Full Visibility Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.12 Focus Not Obscured (Enhanced). Ensure focused elements are completely visible with no part hidden by sticky elements, overlays, or overflow clipping.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.12 Odak Gizlenmemiş (Gelişmiş) — Tam Gorunurluk Rehberi",
        metaDescription:
          "WCAG 2.4.12 Odak Gizlenmemiş (Gelişmiş) kriterini nasıl karşılayacağınızı öğrenin. Odaklanan öğelerin yapışan öğeler, katmanlar veya tasinma kirpmasi tarafından gizlenmediğinden emin olun.",
      },
    },
  },

  // ─── 2.4.13 Focus Appearance ───────────────────────────────────────
  {
    criterionNumber: "2.4.13",
    level: "AAA",
    principle: "operable",
    introducedIn: "2.2",
    wcagVersions: ["2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["focus", "keyboard", "visual", "css"],

    title: {
      en: "Focus Appearance",
      tr: "Odak Görünümü",
    },

    description: {
      en: "When a user interface component receives keyboard focus, the focus indicator has sufficient size and contrast to be clearly visible.",
      tr: "Bir kullanıcı arayüzü bileşeni klavye odağını aldığında, odak göstergesi açıkça görünür olmak için yeterli boyut ve kontrasta sahip olmalıdır.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 2.4.13 is a new AAA criterion in WCAG 2.2 that goes beyond 2.4.7 (Focus Visible) by defining specific requirements for the size and contrast of focus indicators. The focus indicator must have a contrasting area that is at least as large as a 2 CSS pixel thick perimeter around the unfocused component, and must have a contrast ratio of at least 3:1 between the focused and unfocused states.",
        ),
        p(
          "In practical terms, this means a thin 1px dotted outline — which technically passes 2.4.7 — does not pass 2.4.13. The focus indicator must be substantial, high-contrast, and clearly distinguishable from the unfocused state. The intent is to ensure that focus indicators are truly usable, not just technically present.",
        ),

        heading("Why it matters", "h2"),
        p(
          'Many websites technically have a "visible" focus indicator that is practically invisible — a thin light-gray outline on a white background, or a barely perceptible color shift. These indicators fail users with low vision, users in bright environments, and anyone who needs a clear visual cue to track keyboard focus.',
        ),
        p(
          "By defining minimum size and contrast requirements, this criterion ensures focus indicators are genuinely useful. A robust focus indicator dramatically improves the keyboard navigation experience for everyone — not just users with disabilities but also power users, users on high-DPI displays, and users in varying lighting conditions.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are no automated axe-core rules for 2.4.13. The size and contrast requirements for focus indicators require manual inspection and measurement. Tools like the WCAG 2.2 Focus Appearance bookmarklet can help.",
        ),

        heading("How to test", "h2"),
        numbered(
          "Tab through all interactive elements and visually verify that each focus indicator is clearly visible and has adequate size.",
        ),
        numbered(
          "Measure the focus indicator thickness — it must be at least 2 CSS pixels wide around the entire perimeter.",
        ),
        numbered(
          "Use a contrast checker to verify the focus indicator has at least 3:1 contrast against adjacent unfocused colors.",
        ),
        numbered(
          "Compare the focused and unfocused states — the change must have at least 3:1 contrast ratio.",
        ),
        bullet(
          "Test on different backgrounds — the focus indicator must be visible against both light and dark areas.",
        ),
        bullet(
          "Check that the focus indicator is not solely a color change — it should include a shape or border change.",
        ),

        heading("How to fix", "h2"),
        p(
          "Design focus indicators that meet the minimum size (2px perimeter) and contrast (3:1) requirements.",
        ),

        heading("Compliant focus indicator styles", "h3"),
        code(
          "/* Meets 2.4.13: 3px solid outline with high contrast */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* Meets 2.4.13: Double-ring for any background */\n:focus-visible {\n  outline: 3px solid #000000;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 5px #ffffff;\n}\n\n/* Meets 2.4.13: Box shadow approach */\n:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px #ffffff,\n    0 0 0 4px #0051a8;\n}",
          "css",
        ),

        heading("Focus indicators that fail 2.4.13", "h3"),
        code(
          "/* Fails: 1px is below the minimum 2px perimeter */\n:focus-visible {\n  outline: 1px solid #999999;\n}\n\n/* Fails: Insufficient contrast (light gray on white) */\n:focus-visible {\n  outline: 2px solid #cccccc;\n}\n\n/* Fails: Only a color change, no perimeter indicator */\n:focus-visible {\n  background-color: #e0e0e0;\n  outline: none;\n}",
          "css",
        ),

        heading("Calculating the minimum focus area", "h3"),
        code(
          "/*\n * For a button that is 100px x 40px, the minimum focus indicator area is:\n * Perimeter = 2 * (100 + 40) = 280px\n * Minimum area at 2px thickness = 280 * 2 = 560 square CSS pixels\n *\n * A 3px outline around this button provides:\n * Area = 2 * (106 + 46) * 3 = 912 square CSS pixels (passes easily)\n *\n * Note: outline-offset adds to the outer dimensions\n * With outline: 3px and outline-offset: 2px:\n * Outer dimensions = (100+10) x (40+10) = 110 x 50\n * Focus area = 2 * (110 + 50) * 3 = 960 square CSS pixels\n */",
          "css",
        ),

        heading("Theming focus indicators", "h3"),
        code(
          ":root {\n  --focus-color: #0051a8;\n  --focus-width: 3px;\n  --focus-offset: 2px;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --focus-color: #6bb3ff;\n  }\n}\n\n@media (forced-colors: active) {\n  :root {\n    --focus-color: Highlight;\n  }\n}\n\n:focus-visible {\n  outline: var(--focus-width) solid var(--focus-color);\n  outline-offset: var(--focus-offset);\n}",
          "css",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Focus outlines thinner than 2 CSS pixels — 1px dotted or dashed outlines fail the size requirement.",
        ),
        bullet(
          "Low-contrast focus indicators — a light blue outline on a white background may not reach 3:1 contrast.",
        ),
        bullet(
          "Relying on background color change alone as the focus indicator without a perimeter change.",
        ),
        bullet(
          "Focus indicators that work on light backgrounds but fail on dark backgrounds (or vice versa).",
        ),
        bullet(
          "Not testing focus appearance in high contrast mode (Windows High Contrast / forced-colors).",
        ),
        bullet(
          "Using outline colors that match the component's border color, making the focus state indistinguishable.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 2.4.13, WCAG 2.2'de odak göstergelerinin boyut ve kontrastına yönelik belirli gereksinimleri tanimlayarak 2.4.7'nın (Görünür Odak) ötesine geçen yeni bir AAA kriteridir. Odak göstergesi, odaklanmamis bileşenin çevresindeki en az 2 CSS piksel kalinliginda bir çevre kadar büyük kontrast alana sahip olmalı ve odaklı ve odaksiz durumlar arasında en az 3:1 kontrast oranına sahip olmalıdır.",
        ),
        p(
          "Pratik olarak bu, teknik olarak 2.4.7'yi geçen ince 1px noktali bir cizginin 2.4.13'u gecemeyecegi anlamına gelir. Odak göstergesi belirgin, yüksek kontrastlı ve odaksiz durumdan açıkça ayırt edilebilir olmalıdır. Amaç, odak göstergelerinin yalnızca teknik olarak mevcut değil gerçekten kullanılabilir olmasını sağlamaktır.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          'Birçok web sitesinde teknik olarak "görünür" ancak pratik olarak görünmez bir odak göstergesi vardır — beyaz arka plan üzerinde ince açık gri bir çizgi veya zar zor algilanabilir bir renk değişimi. Bu göstergeler az gören kullanıcıları, parlak ortamlardaki kullanıcıları ve klavye odağını izlemek için net bir görsel ipucuna ihtiyaç duyan herkesi başarısız kılar.',
        ),
        p(
          "Minimum boyut ve kontrast gereksinimleri tanimlayarak bu kriter odak göstergelerinin gerçekten faydalı olmasını sağlar. Saglam bir odak göstergesi herkes için — yalnızca engelli kullanıcılar değil aynı zamanda deneyimli kullanıcılar, yüksek DPI ekranlardaki kullanıcılar ve değişen aydınlatma kosullarindaki kullanıcılar — klavye gezinme deneyimini önemli ölçüde iyileştirir.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "2.4.13 için otomatik axe-core kuralı yoktur. Odak göstergeleri için boyut ve kontrast gereksinimleri manuel inceleme ve ölçüm gerektirir. WCAG 2.2 Focus Appearance yer imi gibi araçlar yardımcı olabilir.",
        ),

        heading("Nasıl test edilir", "h2"),
        numbered(
          "Tüm etkileşimli öğeler arasında Tab ile gezinin ve her odak göstergesinin açıkça görünür olduğunu ve yeterli boyuta sahip olduğunu görsel olarak doğrulayın.",
        ),
        numbered(
          "Odak göstergesi kalinligini ölçün — tüm çevre boyunca en az 2 CSS piksel genişliğinde olmalıdır.",
        ),
        numbered(
          "Odak göstergesinin bitişik odaksiz renklere karşı en az 3:1 kontrasta sahip olduğunu doğrulamak için bir kontrast denetleyici kullanın.",
        ),
        numbered(
          "Odakli ve odaksiz durumları karşılaştırın — değişikliğin en az 3:1 kontrast oranına sahip olması gerekir.",
        ),
        bullet(
          "Farklı arka planlarda test edin — odak göstergesi hem açık hem de karanlık alanlara karşı görünür olmalıdır.",
        ),
        bullet(
          "Odak göstergesinin yalnızca bir renk değişikliği olmadığını kontrol edin — bir şekil veya kenarlık değişikliği içermelidir.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Minimum boyut (2px çevre) ve kontrast (3:1) gereksinimlerini karşılayan odak göstergeleri tasarlayın.",
        ),

        heading("Uyumlu odak göstergesi stilleri", "h3"),
        code(
          "/* 2.4.13'u karşılar: Yüksek kontrastlı 3px katı çizgi */\n:focus-visible {\n  outline: 3px solid #0051a8;\n  outline-offset: 2px;\n}\n\n/* 2.4.13'u karşılar: Her arka plan için çift halka */\n:focus-visible {\n  outline: 3px solid #000000;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 5px #ffffff;\n}\n\n/* 2.4.13'u karşılar: Kutu gölge yaklaşımı */\n:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px #ffffff,\n    0 0 0 4px #0051a8;\n}",
          "css",
        ),

        heading("2.4.13'u geçemeyen odak göstergeleri", "h3"),
        code(
          "/* Başarısız: 1px minimum 2px çevrenin altında */\n:focus-visible {\n  outline: 1px solid #999999;\n}\n\n/* Başarısız: Yetersiz kontrast (beyaz üzerinde açık gri) */\n:focus-visible {\n  outline: 2px solid #cccccc;\n}\n\n/* Başarısız: Çevre göstergesi olmadan yalnızca renk değişikliği */\n:focus-visible {\n  background-color: #e0e0e0;\n  outline: none;\n}",
          "css",
        ),

        heading("Minimum odak alanını hesaplama", "h3"),
        code(
          "/*\n * 100px x 40px boyutunda bir düğme için minimum odak göstergesi alanı:\n * Çevre = 2 * (100 + 40) = 280px\n * 2px kalınlıkta minimum alan = 280 * 2 = 560 kare CSS pikseli\n *\n * Bu düğmenin etrafındaki 3px çizgi sağlar:\n * Alan = 2 * (106 + 46) * 3 = 912 kare CSS pikseli (kolayca geçer)\n *\n * Not: outline-offset dış boyutlara eklenir\n * outline: 3px ve outline-offset: 2px ile:\n * Dış boyutlar = (100+10) x (40+10) = 110 x 50\n * Odak alanı = 2 * (110 + 50) * 3 = 960 kare CSS pikseli\n */",
          "css",
        ),

        heading("Odak göstergelerini temalama", "h3"),
        code(
          ":root {\n  --odak-renk: #0051a8;\n  --odak-genişlik: 3px;\n  --odak-ofset: 2px;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --odak-renk: #6bb3ff;\n  }\n}\n\n@media (forced-colors: active) {\n  :root {\n    --odak-renk: Highlight;\n  }\n}\n\n:focus-visible {\n  outline: var(--odak-genişlik) solid var(--odak-renk);\n  outline-offset: var(--odak-ofset);\n}",
          "css",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "2 CSS pikselden ince odak çizgileri — 1px noktali veya kesikli çizgiler boyut gereksinimini karşılamaz.",
        ),
        bullet(
          "Düşük kontrastlı odak göstergeleri — beyaz arka plan üzerinde açık mavi çizgi 3:1 kontrasta ulasmaabilir.",
        ),
        bullet(
          "Çevre değişikliği olmadan yalnızca arka plan renk değişikliğine odak göstergesi olarak güvenmek.",
        ),
        bullet(
          "Açık arka planlarda çalışan ancak karanlık arka planlarda başarısız olan (veya tam tersi) odak göstergeleri.",
        ),
        bullet(
          "Yüksek kontrast modunda (Windows Yüksek Kontrast / forced-colors) odak görünümünü test etmemek.",
        ),
        bullet(
          "Bilesenin kenarlık rengiyle eşleşen çizgi renkleri kullanmak, odak durumunu ayırt edilemez kılmak.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 2.4.13: Focus Appearance",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r2413w3c",
      },
      {
        title: "MDN: outline CSS property",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/outline",
        source: "mdn",
        language: "en",
        _key: "r2413mdn",
      },
      {
        title:
          "Sara Soueidan: A guide to designing accessible focus indicators",
        url: "https://www.sarasoueidan.com/blog/focus-indicators/",
        source: "other",
        language: "en",
        _key: "r2413sar",
      },
      {
        title: "W3C WAI: What's New in WCAG 2.2",
        url: "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/",
        source: "w3c-wai",
        language: "en",
        _key: "r2413wai",
      },
    ],

    seo: {
      en: {
        metaTitle:
          "WCAG 2.4.13 Focus Appearance — Focus Indicator Size and Contrast Guide",
        metaDescription:
          "Learn how to meet WCAG 2.4.13 Focus Appearance. Design focus indicators with minimum 2px perimeter thickness and 3:1 contrast ratio for keyboard accessibility.",
      },
      tr: {
        metaTitle:
          "WCAG 2.4.13 Odak Görünümü — Odak Gostergesi Boyut ve Kontrast Rehberi",
        metaDescription:
          "WCAG 2.4.13 Odak Görünümü kriterini nasıl karşılayacağınızı öğrenin. Klavye erişilebilirliği için minimum 2px çevre kalinligi ve 3:1 kontrast oranına sahip odak göstergeleri tasarlayın.",
      },
    },
  },
];

export default rules;
