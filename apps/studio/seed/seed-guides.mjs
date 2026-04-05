#!/usr/bin/env node
import { upsertGuide, p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const guides = [

  // ─── SEO 1 ───────────────────────────────────────────────────────────────────
  {
    category: 'seo',
    title: {
      en: 'Accessibility and SEO: The Complete Guide',
      tr: 'Erişilebilirlik ve SEO: Kapsamlı Rehber',
    },
    description: {
      en: 'Discover how web accessibility and SEO reinforce each other — from semantic HTML to structured data — and learn how to optimize for both simultaneously.',
      tr: 'Web erişilebilirliği ve SEO\'nun semantik HTML\'den yapılandırılmış veriye kadar birbirini nasıl güçlendirdiğini keşfedin ve her ikisi için aynı anda nasıl optimizasyon yapacağınızı öğrenin.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-1-1', _key: 'seo1w111' },
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'seo1w131' },
      { _type: 'reference', _ref: 'wcag-2-4-2', _key: 'seo1w242' },
      { _type: 'reference', _ref: 'wcag-2-4-6', _key: 'seo1w246' },
    ],
    content: {
      en: [
        heading('Why Accessibility and SEO Are Two Sides of the Same Coin', 'h2'),
        p('Search engine crawlers and assistive technologies share a fundamental characteristic: both interpret web pages through code, not visual presentation. A screen reader navigating a page without proper heading structure is in exactly the same position as a Googlebot trying to understand a page built entirely with unsemantic divs. The techniques that help one almost always help the other.'),
        p('This is not a coincidence. Google has explicitly stated that accessibility improvements tend to improve search performance. Pages that are well-structured, fast-loading, clearly labeled, and meaningful in text form consistently outperform visually polished but semantically hollow competitors in organic rankings.'),

        heading('Shared Signals: What Both Crawlers and Assistive Tech Need', 'h2'),
        p('Understanding the overlap helps you build a single implementation strategy rather than maintaining two separate checklists. The shared signals include:'),
        bullet('Descriptive page titles — WCAG 2.4.2 requires meaningful page titles; Google uses the <title> tag as the primary signal for document topic.'),
        bullet('Heading hierarchy — Screen readers use headings to navigate; search engines use heading structure to understand content hierarchy and extract featured-snippet content.'),
        bullet('Alt text on images — Required by WCAG 1.1.1; used by image search and Google Lens to understand and index visual content.'),
        bullet('Link anchor text — WCAG 2.4.4 requires descriptive link text; Google uses anchor text to understand the topic of linked pages.'),
        bullet('Language declaration — WCAG 3.1.1 requires the page language to be declared; this also prevents Google from serving your page to the wrong locale.'),
        bullet('Structured data — Not a WCAG requirement, but schema.org markup helps both AI assistants (AEO/GEO) and search engines understand your content.'),

        heading('Core Web Vitals and Accessibility', 'h2'),
        p('Google\'s Core Web Vitals — Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) — are ranking signals that are deeply connected to accessibility. Slow pages frustrate users with cognitive disabilities and users on low-bandwidth connections. Layout shifts disorient screen magnification users. Poor interactivity harms people who rely on keyboard navigation.'),
        p('Optimizing for Core Web Vitals means optimizing for everyone, including your most challenged users. Specifically:'),
        bullet('LCP improvements (image optimization, server response time, render-blocking resource elimination) make pages faster for users with cognitive load limitations.'),
        bullet('CLS fixes (explicit image dimensions, avoiding dynamically injected content above the fold) prevent disorientation for low-vision users using magnification.'),
        bullet('INP improvements (reducing main-thread blocking) make keyboard and switch-access navigation more responsive.'),

        heading('Semantic HTML: The Foundation of Both', 'h2'),
        p('Replacing generic <div> and <span> elements with meaningful HTML5 landmarks — <header>, <nav>, <main>, <article>, <aside>, <footer> — is the single highest-leverage action you can take. It gives screen reader users the ability to skip to the main content, allows Googlebot to understand the structural role of each section, and requires zero additional JavaScript.'),
        code('<body>\n  <header>\n    <nav aria-label="Primary navigation">\n      <!-- navigation links -->\n    </nav>\n  </header>\n  <main id="main-content">\n    <article>\n      <h1>Page Heading</h1>\n      <!-- article content -->\n    </article>\n    <aside aria-label="Related guides">\n      <!-- sidebar content -->\n    </aside>\n  </main>\n  <footer>\n    <!-- footer content -->\n  </footer>\n</body>', 'html'),

        heading('Meta Tags, Titles, and Descriptions', 'h2'),
        p('The <title> element and meta description are the first points of contact between a user and your page in search results. WCAG 2.4.2 (Page Titled) requires titles to describe the topic or purpose of a page. This aligns perfectly with SEO best practice: Google rewards specific, descriptive titles and penalizes duplicate or generic ones.'),
        p('Write titles that are under 60 characters, include the primary keyword, and describe what the user will find on the page. Meta descriptions should be under 160 characters and contain a clear call to action or value proposition — they do not directly affect rankings but dramatically affect click-through rate.'),
        code('<!-- Bad: vague title -->\n<title>Home</title>\n\n<!-- Bad: keyword-stuffed -->\n<title>Accessibility SEO Accessibility Tools Web Accessibility SEO</title>\n\n<!-- Good: descriptive, targeted -->\n<title>Accessibility & SEO Guide | inculva</title>\n\n<!-- Good meta description -->\n<meta name="description" content="Learn how accessibility improvements directly boost SEO rankings. Covers semantic HTML, Core Web Vitals, structured data, and WCAG compliance.">', 'html'),

        heading('Link Architecture and Internal Linking', 'h2'),
        p('Descriptive anchor text is a WCAG requirement and an SEO signal. Phrases like "click here" or "read more" fail both: screen reader users hear a list of undescribed links, and search engines receive no information about the linked page\'s topic. Replace these with text that describes the destination.'),
        bullet('Use anchor text that describes the destination page\'s topic, not the action.'),
        bullet('Avoid duplicate anchor text pointing to different URLs — it confuses both crawlers and screen reader users.'),
        bullet('Ensure all links are keyboard-focusable and have a visible focus indicator (WCAG 2.4.7).'),
        bullet('Use the title attribute sparingly; do not rely on it as the sole accessible name for a link.'),

        heading('Measuring the SEO Impact of Accessibility Fixes', 'h2'),
        p('Track the following metrics before and after accessibility improvements to quantify the SEO impact: organic impressions and clicks in Google Search Console, Core Web Vitals field data in the CrUX report, crawl coverage and indexed pages in Google Search Console\'s Coverage report, and page-level organic traffic in your analytics platform.'),
        p('A common finding is that fixing heading hierarchy and adding descriptive alt text increases the number of featured snippet wins and image search impressions within 4–8 weeks of deployment.'),
      ],
      tr: [
        heading('Erişilebilirlik ve SEO Neden Aynı Madalyonun İki Yüzüdür', 'h2'),
        p('Arama motoru tarayıcıları ve yardımcı teknolojiler temel bir özelliği paylaşır: her ikisi de web sayfalarını görsel sunum üzerinden değil, kod üzerinden yorumlar. Başlık yapısı olmayan bir sayfada gezinen ekran okuyucu, tamamen anlamsız div\'lerle oluşturulmuş bir sayfayı anlamaya çalışan Googlebot ile tam olarak aynı konumdadır. Birine yardımcı olan teknikler neredeyse her zaman diğerine de yardımcı olur.'),
        p('Bu bir tesadüf değil. Google, erişilebilirlik iyileştirmelerinin arama performansını artırdığını açıkça belirtmiştir. İyi yapılandırılmış, hızlı yüklenen, açık etiketli ve metin olarak anlamlı sayfalar, görsel açıdan etkileyici ancak anlambilimsel olarak içi boş rakiplerine kıyasla organik sıralamalarda sürekli daha iyi performans göstermektedir.'),

        heading('Ortak Sinyaller: Tarayıcıların ve Yardımcı Teknolojilerin Her İkisinin de İhtiyaç Duyduğu Şeyler', 'h2'),
        p('Örtüşmeyi anlamak, iki ayrı kontrol listesi yerine tek bir uygulama stratejisi oluşturmanıza yardımcı olur. Ortak sinyaller şunlardır:'),
        bullet('Açıklayıcı sayfa başlıkları — WCAG 2.4.2 anlamlı sayfa başlıkları gerektirir; Google, <title> etiketini belge konusu için birincil sinyal olarak kullanır.'),
        bullet('Başlık hiyerarşisi — Ekran okuyucular başlıkları gezinmek için kullanır; arama motorları içerik hiyerarşisini anlamak ve öne çıkan snippet içeriklerini çıkarmak için başlık yapısını kullanır.'),
        bullet('Görsel alt metinleri — WCAG 1.1.1 tarafından zorunlu tutulur; görsel içeriği anlamak ve indekslemek için Görsel Arama ve Google Lens tarafından kullanılır.'),
        bullet('Bağlantı çapa metni — WCAG 2.4.4 açıklayıcı bağlantı metni gerektirir; Google, bağlantılı sayfaların konusunu anlamak için çapa metnini kullanır.'),
        bullet('Dil bildirimi — WCAG 3.1.1 sayfa dilinin belirtilmesini gerektirir; bu aynı zamanda Google\'ın sayfanızı yanlış bölgeye sunmasını da engeller.'),
        bullet('Yapılandırılmış veri — Bir WCAG gereksinimi değil, ancak schema.org işaretlemesi hem yapay zeka asistanlarının hem de arama motorlarının içeriğinizi anlamasına yardımcı olur.'),

        heading('Temel Web Vitals ve Erişilebilirlik', 'h2'),
        p('Google\'ın Temel Web Vitals\'ı — En Büyük İçerikli Boyama (LCP), Kümülatif Düzen Kayması (CLS) ve Sonraki Boyamaya Etkileşim (INP) — erişilebilirlikle derinden bağlantılı sıralama sinyalleridir. Yavaş sayfalar bilişsel engelli kullanıcıları ve düşük bant genişliğinde bağlanan kullanıcıları rahatsız eder. Düzen kaymaları ekran büyütme kullanan görme engelli kullanıcıları şaşırtır.'),
        bullet('LCP iyileştirmeleri (görsel optimizasyonu, sunucu yanıt süresi) bilişsel yük sınırlamaları olan kullanıcılar için sayfaları hızlandırır.'),
        bullet('CLS düzeltmeleri (açık görsel boyutları, dinamik içerik enjeksiyonundan kaçınma) düşük görüşlü kullanıcıların yönünü kaybetmesini önler.'),
        bullet('INP iyileştirmeleri (ana iş parçacığı engellemesinin azaltılması) klavye ve switch erişimini daha duyarlı hale getirir.'),

        heading('Semantik HTML: Her İkisinin Temeli', 'h2'),
        p('Genel <div> ve <span> öğelerini anlamlı HTML5 öğeleriyle — <header>, <nav>, <main>, <article>, <aside>, <footer> — değiştirmek, alabileceğiniz en etkili tek eylemdir. Ekran okuyucu kullanıcılarına ana içeriğe atlama imkânı tanır, Googlebot\'un her bölümün yapısal rolünü anlamasını sağlar ve ek JavaScript gerektirmez.'),
        code('<body>\n  <header>\n    <nav aria-label="Ana gezinme">\n      <!-- gezinme bağlantıları -->\n    </nav>\n  </header>\n  <main id="ana-icerik">\n    <article>\n      <h1>Sayfa Başlığı</h1>\n      <!-- makale içeriği -->\n    </article>\n    <aside aria-label="İlgili rehberler">\n      <!-- yan içerik -->\n    </aside>\n  </main>\n  <footer>\n    <!-- alt bilgi içeriği -->\n  </footer>\n</body>', 'html'),

        heading('Meta Etiketleri, Başlıklar ve Açıklamalar', 'h2'),
        p('<title> öğesi ve meta açıklama, arama sonuçlarında kullanıcı ile sayfanız arasındaki ilk temas noktasıdır. WCAG 2.4.2 (Sayfa Başlığı), başlıkların bir sayfanın konusunu veya amacını açıklamasını gerektirir. Bu, SEO en iyi uygulamasıyla mükemmel bir uyum içindedir: Google, spesifik ve açıklayıcı başlıkları ödüllendirir.'),
        p('Başlıkları 60 karakterin altında, birincil anahtar kelimeyi içerecek ve kullanıcının sayfada ne bulacağını açıklayacak şekilde yazın. Meta açıklamalar 160 karakterin altında olmalı ve net bir eylem çağrısı veya değer önerisi içermelidir.'),

        heading('Bağlantı Mimarisi ve İç Bağlantılar', 'h2'),
        p('Açıklayıcı çapa metni hem WCAG gerekliliği hem de SEO sinyalidir. "Buraya tıklayın" veya "daha fazla oku" gibi ifadeler her ikisinde de başarısız olur: ekran okuyucu kullanıcıları tanımlanmamış bir bağlantı listesi duyar, arama motorları ise bağlantılı sayfanın konusu hakkında bilgi almaz.'),
        bullet('Eylemi değil, hedef sayfanın konusunu açıklayan çapa metni kullanın.'),
        bullet('Farklı URL\'lere işaret eden yinelenen çapa metninden kaçının.'),
        bullet('Tüm bağlantıların klavyeyle odaklanabilir olduğundan ve görünür bir odak göstergesi bulunduğundan emin olun (WCAG 2.4.7).'),

        heading('Erişilebilirlik Düzeltmelerinin SEO Etkisini Ölçmek', 'h2'),
        p('SEO etkisini ölçmek için erişilebilirlik iyileştirmelerinden önce ve sonra şu metrikleri takip edin: Google Search Console\'daki organik gösterimler ve tıklamalar, CrUX raporundaki Temel Web Vitals saha verileri ve Google Search Console\'daki Kapsam raporunda taranma kapsamı ve indekslenen sayfalar.'),
        p('Yaygın bir bulgu, başlık hiyerarşisini düzeltmenin ve açıklayıcı alt metni eklemenin, dağıtımdan 4–8 hafta içinde öne çıkan snippet kazanımları ve görsel arama gösterimlerinin sayısını artırdığıdır.'),
      ],
    },
    resources: [
      { _key: 'sg1r1', title: 'Google: Web Accessibility', url: 'https://developers.google.com/search/docs/fundamentals/accessibility', source: 'other', language: 'en' },
      { _key: 'sg1r2', title: 'WebAIM: SEO and Web Accessibility', url: 'https://webaim.org/blog/web-accessibility-and-seo/', source: 'webaim', language: 'en' },
      { _key: 'sg1r3', title: 'Deque: Accessibility and SEO', url: 'https://www.deque.com/blog/accessibility-seo/', source: 'deque', language: 'en' },
      { _key: 'sg1r4', title: 'W3C WAI: Accessibility, Usability, and Inclusion', url: 'https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg1r5', title: 'Google Search Central: Core Web Vitals', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Accessibility & SEO: The Complete Guide', metaDescription: 'How web accessibility and SEO reinforce each other. Covers semantic HTML, Core Web Vitals, alt text, heading structure, and link best practices.' },
      tr: { metaTitle: 'Erişilebilirlik ve SEO: Kapsamlı Rehber', metaDescription: 'Web erişilebilirliği ve SEO\'nun nasıl birbirini güçlendirdiğini öğrenin. Semantik HTML, Temel Web Vitals, alt metin ve başlık yapısı konularını kapsar.' },
    },
  },

  // ─── SEO 2 ───────────────────────────────────────────────────────────────────
  {
    category: 'seo',
    title: {
      en: 'Semantic HTML for SEO and Accessibility',
      tr: 'SEO ve Erişilebilirlik için Semantik HTML',
    },
    description: {
      en: 'A practical guide to using semantic HTML elements — headings, landmarks, lists, tables, and forms — to simultaneously improve accessibility compliance and search engine rankings.',
      tr: 'Erişilebilirlik uyumunu ve arama motoru sıralamalarını aynı anda iyileştirmek için semantik HTML öğelerini — başlıklar, işaret noktaları, listeler, tablolar ve formlar — nasıl kullanacağınıza dair pratik bir rehber.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'seo2w131' },
      { _type: 'reference', _ref: 'wcag-2-4-6', _key: 'seo2w246' },
      { _type: 'reference', _ref: 'wcag-4-1-2', _key: 'seo2w412' },
    ],
    content: {
      en: [
        heading('What Is Semantic HTML and Why Does It Matter', 'h2'),
        p('Semantic HTML means using the right HTML element for the right job. A <button> should trigger actions; an <a> should navigate. A <table> should represent tabular data, not control layout. An <h1> should be the primary topic of the page, not large styled text. When elements carry meaning through their tag name alone, both machines (crawlers, screen readers) and humans (developers, content editors) understand the page better.'),
        p('The web was built on this principle, but years of div-soup development eroded it. Modern HTML5 revived semantic markup with landmark elements, giving developers a rich vocabulary to express document structure without relying solely on ARIA or CSS class names.'),

        heading('Heading Structure: The Backbone of SEO and Navigation', 'h2'),
        p('Headings create the outline of your page. Search engines extract your h1–h3 headings to understand content hierarchy and to generate featured snippets and AI overviews. Screen reader users navigate by jumping between headings — typically using the H key in NVDA or VoiceOver\'s rotor — making headings their primary way to scan and skip through content.'),
        p('Rules for accessible, SEO-optimal headings:'),
        bullet('Use exactly one <h1> per page, containing the primary topic/keyword.'),
        bullet('Follow a logical hierarchy: h1 → h2 → h3 — never skip levels (e.g., h1 → h3).'),
        bullet('Keep headings descriptive and unique — avoid duplicate h2 text across the same page.'),
        bullet('Do not use headings for visual styling; use CSS classes instead.'),
        code('<!-- Bad: skipped heading levels -->\n<h1>Accessibility Testing Guide</h1>\n<h3>Automated Tools</h3>  <!-- skipped h2 -->\n\n<!-- Good: proper hierarchy -->\n<h1>Accessibility Testing Guide</h1>\n<h2>Automated Testing Tools</h2>\n<h3>axe-core</h3>\n<h3>Lighthouse</h3>\n<h2>Manual Testing Techniques</h2>\n<h3>Keyboard Navigation</h3>', 'html'),

        heading('HTML5 Landmark Elements', 'h2'),
        p('Landmark elements partition a page into navigable regions. They are the equivalent of a "skip to content" mechanism built directly into HTML. Search engines use them to identify the primary content area versus navigation and supplementary content.'),
        bullet('<header> — Introductory content, site branding, primary navigation. One per page or per <article>/<section>.'),
        bullet('<nav> — Navigation menus. Use aria-label to distinguish multiple nav elements (e.g., "Primary navigation", "Breadcrumb").'),
        bullet('<main> — The dominant content of the page. Only one per page. This is where crawlers focus and where skip links should point.'),
        bullet('<article> — Self-contained content that can stand alone: blog posts, news articles, guide entries.'),
        bullet('<section> — Thematic grouping within a document. Should have a heading.'),
        bullet('<aside> — Tangentially related content: sidebars, callout boxes, related links.'),
        bullet('<footer> — Footer content for the page or the nearest sectioning ancestor.'),
        code('<!-- Bad: no landmarks -->\n<div class="header">...</div>\n<div class="nav">...</div>\n<div class="content">...</div>\n<div class="sidebar">...</div>\n<div class="footer">...</div>\n\n<!-- Good: semantic landmarks -->\n<header>...</header>\n<nav aria-label="Primary navigation">...</nav>\n<main>\n  <article>...</article>\n  <aside aria-label="Related content">...</aside>\n</main>\n<footer>...</footer>', 'html'),

        heading('Lists: Semantic Groupings That Crawlers Love', 'h2'),
        p('Unordered lists (<ul>) and ordered lists (<ol>) signal to search engines that items are related and equivalent in weight. This is especially important for navigation menus, feature lists, step-by-step instructions, and any content where the relationships between items matter. Screen reader users hear "list of 5 items" and can choose to skip the list or navigate item by item.'),
        code('<!-- Bad: fake list with line breaks -->\n<p>Step 1: Run axe<br>Step 2: Fix errors<br>Step 3: Retest</p>\n\n<!-- Good: ordered list for sequential steps -->\n<ol>\n  <li>Run axe-core against the page</li>\n  <li>Fix all critical and serious errors</li>\n  <li>Retest and verify fixes</li>\n</ol>', 'html'),

        heading('Tables: Data vs. Layout', 'h2'),
        p('Tables should only contain tabular data — never use <table> for layout. A properly marked-up data table with <caption>, <thead>, <th scope="col">, and <tbody> gives screen readers all the context they need to read cells in relation to their headers. Search engines also extract structured table data for Knowledge Graph and featured snippet tables.'),
        code('<!-- Minimal accessible data table -->\n<table>\n  <caption>WCAG Conformance Level Comparison</caption>\n  <thead>\n    <tr>\n      <th scope="col">Level</th>\n      <th scope="col">Criteria Count</th>\n      <th scope="col">Required for Legal Compliance</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>A</td><td>30</td><td>Yes (most jurisdictions)</td>\n    </tr>\n    <tr>\n      <td>AA</td><td>20</td><td>Yes (WCAG 2.1 AA)</td>\n    </tr>\n    <tr>\n      <td>AAA</td><td>28</td><td>Recommended</td>\n    </tr>\n  </tbody>\n</table>', 'html'),

        heading('Forms: Explicit Labels Are Non-Negotiable', 'h2'),
        p('Every form control must have a programmatically associated label. The <label for="id"> pattern is the most reliable method. Placeholder text is not a label substitute — it disappears on input, has low contrast, and is not consistently announced by all screen readers. Properly labeled forms also improve Google\'s ability to understand and index form interactions.'),
        code('<!-- Bad: placeholder used as label -->\n<input type="email" placeholder="Email address">\n\n<!-- Good: explicit label association -->\n<label for="email">Email address</label>\n<input type="email" id="email" name="email" autocomplete="email">\n\n<!-- Good: visually hidden label (when design requires no visible label) -->\n<label for="search" class="sr-only">Search guides</label>\n<input type="search" id="search" name="q">', 'html'),

        heading('Microdata and Schema.org', 'h2'),
        p('Semantic HTML establishes the structural foundation; schema.org JSON-LD adds a machine-readable semantic layer on top. Adding Article, BreadcrumbList, FAQPage, or HowTo schemas to your semantic HTML pages enables rich results in Google Search and improves your content\'s citability in AI-generated answers. Always layer schema.org on top of correct HTML structure — not as a substitute for it.'),
      ],
      tr: [
        heading('Semantik HTML Nedir ve Neden Önemlidir', 'h2'),
        p('Semantik HTML, doğru HTML öğesini doğru iş için kullanmak anlamına gelir. Bir <button> eylemleri tetiklemelidir; bir <a> gezinme sağlamalıdır. Bir <table> tablosal veriyi temsil etmeli, düzeni kontrol etmemelidir. <h1> görsel olarak büyütülmüş metin değil, sayfanın birincil konusu olmalıdır. Öğeler yalnızca etiket adları aracılığıyla anlam taşıdığında, hem makineler (tarayıcılar, ekran okuyucular) hem de insanlar (geliştiriciler, içerik editörleri) sayfayı daha iyi anlar.'),
        p('Web bu ilke üzerine inşa edildi, ancak yıllar süren div odaklı geliştirme bu ilkeyi aşındırdı. Modern HTML5, işaret noktası öğeleriyle semantik işaretlemeyi yeniden canlandırdı; geliştiricilere yalnızca ARIA veya CSS sınıf adlarına dayanmadan belge yapısını ifade etmek için zengin bir söz dağarcığı sundu.'),

        heading('Başlık Yapısı: SEO ve Gezinmenin Omurgası', 'h2'),
        p('Başlıklar sayfanızın ana hatlarını oluşturur. Arama motorları, içerik hiyerarşisini anlamak ve öne çıkan snippet\'ler ile yapay zeka genel bakışları oluşturmak için h1–h3 başlıklarınızı çıkarır. Ekran okuyucu kullanıcıları başlıklar arasında atlayarak gezinir ve başlıklar onların içeriği taramak ve atlamak için birincil yoludur.'),
        bullet('Sayfa başına tam olarak bir <h1> kullanın; birincil konuyu/anahtar kelimeyi içersin.'),
        bullet('Mantıksal bir hiyerarşi izleyin: h1 → h2 → h3 — asla düzeyleri atlamayın.'),
        bullet('Başlıkları açıklayıcı ve benzersiz tutun — aynı sayfada yinelenen h2 metninden kaçının.'),
        bullet('Görsel stil için başlıkları kullanmayın; bunun yerine CSS sınıflarını kullanın.'),

        heading('HTML5 İşaret Noktası Öğeleri', 'h2'),
        p('İşaret noktası öğeleri bir sayfayı gezilebilir bölgelere ayırır. Doğrudan HTML\'e yerleştirilmiş bir "içeriğe atla" mekanizmasının eşdeğeridirler. Arama motorları bunları birincil içerik alanını gezinme ve yardımcı içerikten ayırt etmek için kullanır.'),
        bullet('<header> — Giriş içeriği, site markası, birincil gezinme.'),
        bullet('<nav> — Gezinme menüleri. Birden fazla nav öğesini ayırt etmek için aria-label kullanın.'),
        bullet('<main> — Sayfanın baskın içeriği. Sayfa başına yalnızca bir tane.'),
        bullet('<article> — Bağımsız olarak var olabilecek kendi kendine yeten içerik.'),
        bullet('<section> — Bir belge içindeki tematik gruplandırma.'),
        bullet('<aside> — Yan bilgi çubukları, ilgili bağlantılar gibi dolaylı olarak ilgili içerik.'),
        bullet('<footer> — Sayfanın veya en yakın bölümleme atasının altbilgi içeriği.'),

        heading('Listeler: Tarayıcıların Sevdiği Semantik Gruplamalar', 'h2'),
        p('Sırasız listeler (<ul>) ve sıralı listeler (<ol>), öğelerin ilişkili olduğunu ve ağırlık bakımından eşdeğer olduğunu arama motorlarına bildirir. Bu, gezinme menüleri, özellik listeleri, adım adım talimatlar ve öğeler arasındaki ilişkilerin önemli olduğu her içerik için özellikle önemlidir.'),

        heading('Tablolar: Veri ve Düzen', 'h2'),
        p('Tablolar yalnızca tablosal veri içermelidir — düzen için asla <table> kullanmayın. <caption>, <thead>, <th scope="col"> ve <tbody> ile düzgün işaretlenmiş bir veri tablosu, ekran okuyuculara hücreleri başlıklarıyla ilişkili olarak okumak için ihtiyaç duydukları tüm bağlamı sağlar.'),
        code('<!-- Minimal erişilebilir veri tablosu -->\n<table>\n  <caption>WCAG Uyumluluk Seviyesi Karşılaştırması</caption>\n  <thead>\n    <tr>\n      <th scope="col">Seviye</th>\n      <th scope="col">Kriter Sayısı</th>\n      <th scope="col">Yasal Uyumluluk İçin Gerekli</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td>A</td><td>30</td><td>Evet</td></tr>\n    <tr><td>AA</td><td>20</td><td>Evet (WCAG 2.1 AA)</td></tr>\n    <tr><td>AAA</td><td>28</td><td>Önerilen</td></tr>\n  </tbody>\n</table>', 'html'),

        heading('Formlar: Açık Etiketler Vazgeçilmezdir', 'h2'),
        p('Her form kontrolünün programlı olarak ilişkilendirilmiş bir etiketi olmalıdır. <label for="id"> kalıbı en güvenilir yöntemdir. Yer tutucu metin bir etiket yerine geçemez — girişte kaybolur, düşük kontrastlıdır ve tüm ekran okuyucular tarafından tutarlı biçimde duyurulmaz.'),
        code('<!-- Kötü: yer tutucu etiket olarak kullanılmış -->\n<input type="email" placeholder="E-posta adresi">\n\n<!-- İyi: açık etiket ilişkilendirmesi -->\n<label for="email">E-posta adresi</label>\n<input type="email" id="email" name="email" autocomplete="email">', 'html'),

        heading('Mikroveri ve Schema.org', 'h2'),
        p('Semantik HTML yapısal temeli oluşturur; schema.org JSON-LD bunun üzerine makine tarafından okunabilir bir semantik katman ekler. Article, BreadcrumbList, FAQPage veya HowTo şemalarını eklemek, Google Arama\'da zengin sonuçları etkinleştirir ve içeriğinizin yapay zeka tarafından üretilen yanıtlarda alıntılanabilirliğini artırır.'),
      ],
    },
    resources: [
      { _key: 'sg2r1', title: 'MDN: HTML elements reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', source: 'mdn', language: 'en' },
      { _key: 'sg2r2', title: 'W3C WAI: Page Structure Tutorial', url: 'https://www.w3.org/WAI/tutorials/page-structure/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg2r3', title: 'WebAIM: Semantic Structure', url: 'https://webaim.org/techniques/semanticstructure/', source: 'webaim', language: 'en' },
      { _key: 'sg2r4', title: 'Google: Understand JavaScript SEO Basics', url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', source: 'other', language: 'en' },
      { _key: 'sg2r5', title: 'Deque: Heading Levels', url: 'https://dequeuniversity.com/rules/axe/4.10/heading-order', source: 'deque', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Semantic HTML for SEO and Accessibility', metaDescription: 'Use the right HTML elements to boost both accessibility and SEO. Covers headings, landmarks, lists, tables, forms, and schema.org markup.' },
      tr: { metaTitle: 'SEO ve Erişilebilirlik için Semantik HTML', metaDescription: 'Hem erişilebilirliği hem SEO\'yu artırmak için doğru HTML öğelerini kullanın. Başlıklar, işaret noktaları, listeler, tablolar ve şema işaretlemesini kapsar.' },
    },
  },

  // ─── SEO 3 ───────────────────────────────────────────────────────────────────
  {
    category: 'seo',
    title: {
      en: 'Image Optimization for SEO and Accessibility',
      tr: 'SEO ve Erişilebilirlik için Görsel Optimizasyonu',
    },
    description: {
      en: 'Learn how to optimize images for both search engines and assistive technologies — covering alt text strategy, file formats, lazy loading, responsive images, and structured data.',
      tr: 'Görüntüleri hem arama motorları hem de yardımcı teknolojiler için nasıl optimize edeceğinizi öğrenin: alt metin stratejisi, dosya biçimleri, geç yükleme, duyarlı görseller ve yapılandırılmış veri.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-1-1', _key: 'seo3w111' },
      { _type: 'reference', _ref: 'wcag-1-4-5', _key: 'seo3w145' },
    ],
    content: {
      en: [
        heading('The Dual Purpose of Image Optimization', 'h2'),
        p('Every image on a web page is an opportunity — or a liability. An optimized image improves page load speed (a ranking factor), contributes to image search visibility, conveys information to screen reader users, and reduces bandwidth for users on metered connections. An unoptimized image does the opposite: it slows the page, renders as meaningless file names to assistive technology, and contributes nothing to search indexing.'),
        p('The good news is that accessibility optimization and SEO optimization for images are almost identical in practice. Both require descriptive alternative text, sensible file names, appropriate file formats, and correct HTML markup.'),

        heading('Writing Effective Alt Text', 'h2'),
        p('Alt text (the alt attribute on <img> elements) serves three purposes simultaneously: it is read aloud by screen readers, it is indexed by search engines, and it is displayed when the image fails to load. The same text must serve all three audiences well.'),
        p('Guidelines for writing effective alt text:'),
        bullet('Describe what the image communicates, not what it looks like literally. For a chart showing revenue growth, write "Q3 revenue increased 22% compared to Q2" — not "a bar chart with blue and green bars".'),
        bullet('Keep alt text under 150 characters. For complex images (diagrams, infographics), provide a long description in adjacent text or via aria-describedby.'),
        bullet('Do not start with "image of" or "photo of" — screen readers already announce the element type.'),
        bullet('For functional images (buttons, links with only an image), the alt text should describe the function, not the appearance.'),
        bullet('For decorative images, use alt="" to suppress announcement. Never omit the alt attribute entirely.'),
        bullet('Include your primary keyword naturally where it is genuinely relevant to the image content.'),

        heading('File Names and URL Structure', 'h2'),
        p('Google indexes image file names and uses them as a relevance signal. An image named DSC_0042.jpg contributes nothing; an image named wcag-keyboard-navigation-test.jpg adds topical relevance. Before uploading, rename images to descriptive, hyphenated slugs that reflect the image content and target keyword.'),
        code('<!-- Bad: meaningless file names -->\n<img src="/images/DSC_0042.jpg" alt="A developer testing keyboard navigation">\n<img src="/images/img001.png" alt="Color contrast checker screenshot">\n\n<!-- Good: descriptive file names aligned with alt text -->\n<img src="/images/keyboard-navigation-testing-developer.jpg" alt="A developer testing keyboard navigation on a web application">\n<img src="/images/color-contrast-checker-wcag.png" alt="Color contrast checker showing a ratio of 4.5:1">', 'html'),

        heading('Modern Image Formats and Performance', 'h2'),
        p('Image format choice directly affects Core Web Vitals (LCP). WebP images are 25–35% smaller than equivalent JPEG/PNG files. AVIF is 50% smaller than JPEG. Smaller files load faster, improving LCP scores and therefore organic rankings. Use the <picture> element with format fallbacks to support all browsers:'),
        code('<picture>\n  <source srcset="/images/hero.avif" type="image/avif">\n  <source srcset="/images/hero.webp" type="image/webp">\n  <img\n    src="/images/hero.jpg"\n    alt="Accessibility audit dashboard showing 98% conformance score"\n    width="1200"\n    height="630"\n    loading="eager"\n    decoding="async"\n  >\n</picture>', 'html'),

        heading('Responsive Images with srcset', 'h2'),
        p('The srcset and sizes attributes allow browsers to serve appropriately sized images for each device. This avoids sending a 2400px-wide image to a 375px-wide mobile screen — a common source of LCP failures and wasted bandwidth for users on mobile data plans.'),
        code('<img\n  src="/images/guide-cover-800.webp"\n  srcset="\n    /images/guide-cover-400.webp 400w,\n    /images/guide-cover-800.webp 800w,\n    /images/guide-cover-1200.webp 1200w\n  "\n  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"\n  alt="Visual guide to keyboard navigation testing"\n  width="800"\n  height="450"\n  loading="lazy"\n>', 'html'),

        heading('Lazy Loading and CLS Prevention', 'h2'),
        p('Use loading="lazy" on all below-the-fold images to defer their loading until the user scrolls near them. This improves initial page load speed. However, never use lazy loading on above-the-fold images (especially the LCP image) — it will delay the LCP metric and hurt rankings.'),
        p('Always specify explicit width and height attributes on <img> elements. Without them, the browser does not know the image\'s aspect ratio before it loads, causing Cumulative Layout Shift (CLS) as the image displaces surrounding content on load. This is both an SEO issue (CLS is a ranking signal) and an accessibility issue (layout shifts disorient screen magnification users).'),

        heading('Image Structured Data', 'h2'),
        p('For article pages and product pages, add ImageObject schema to tell Google which image is the primary image for the page. This improves eligibility for image-rich results in Google Discover and Top Stories. The schema should include the image URL, dimensions, caption, and a description that complements the alt text.'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Image Optimization for SEO and Accessibility",\n  "image": {\n    "@type": "ImageObject",\n    "url": "https://example.com/images/image-optimization-guide.webp",\n    "width": 1200,\n    "height": 630,\n    "caption": "Diagram showing the relationship between alt text, file names, and SEO"\n  }\n}\n</script>', 'javascript'),

        heading('SVGs as Accessible, SEO-Friendly Graphics', 'h2'),
        p('Inline SVGs are fully indexable by search engines and can be made fully accessible with a title element and aria-labelledby. For icons and decorative SVGs, use aria-hidden="true" to prevent them being announced by screen readers. For informative SVGs (diagrams, charts), provide a <title> and optionally a <desc> element inside the SVG.'),
        code('<!-- Accessible informative SVG -->\n<svg role="img" aria-labelledby="svg-title svg-desc" viewBox="0 0 400 200">\n  <title id="svg-title">WCAG Conformance by Industry</title>\n  <desc id="svg-desc">Bar chart showing that government sites have 78% WCAG AA conformance, e-commerce 62%, and healthcare 71%.</desc>\n  <!-- chart paths -->\n</svg>', 'html'),
      ],
      tr: [
        heading('Görsel Optimizasyonunun Çifte Amacı', 'h2'),
        p('Bir web sayfasındaki her görsel bir fırsat ya da bir yüktür. Optimize edilmiş bir görsel sayfa yükleme hızını artırır (bir sıralama faktörü), görsel arama görünürlüğüne katkıda bulunur, ekran okuyucu kullanıcılarına bilgi iletir ve ölçülen bağlantılardaki kullanıcılar için bant genişliğini azaltır.'),
        p('İyi haber şu ki, görseller için erişilebilirlik optimizasyonu ve SEO optimizasyonu pratikte neredeyse aynıdır. Her ikisi de açıklayıcı alternatif metin, mantıklı dosya adları, uygun dosya biçimleri ve doğru HTML işaretlemesi gerektirir.'),

        heading('Etkili Alt Metni Yazmak', 'h2'),
        p('Alt metni (img öğeleri üzerindeki alt niteliği) aynı anda üç amaca hizmet eder: ekran okuyucular tarafından sesli okunur, arama motorları tarafından indekslenir ve görsel yüklenemediğinde görüntülenir. Aynı metin üç kitleye de iyi hizmet etmek zorundadır.'),
        bullet('Görselin tam olarak nasıl göründüğünü değil, ilettiği bilgiyi açıklayın.'),
        bullet('Alt metni 150 karakterin altında tutun. Karmaşık görseller için bitişik metinde veya aria-describedby aracılığıyla uzun bir açıklama sağlayın.'),
        bullet('"Görsel" veya "fotoğraf" ile başlamayın — ekran okuyucular öğe türünü zaten duyurur.'),
        bullet('İşlevsel görseller için alt metin görünüşü değil işlevi açıklamalıdır.'),
        bullet('Dekoratif görseller için alt="" kullanın, alt niteliğini hiç atlamayın.'),

        heading('Dosya Adları ve URL Yapısı', 'h2'),
        p('Google görsel dosya adlarını indeksler ve bunları alaka düzeyi sinyali olarak kullanır. DSC_0042.jpg adlı bir görsel hiçbir şey katmaz; wcag-klavye-gezinme-testi.jpg adlı bir görsel konu alaka düzeyi ekler. Yüklemeden önce görselleri içeriği ve hedef anahtar kelimeyi yansıtan açıklayıcı, tire ile ayrılmış slug\'lara yeniden adlandırın.'),

        heading('Modern Görsel Biçimleri ve Performans', 'h2'),
        p('Görsel biçim seçimi doğrudan Temel Web Vitals\'ı (LCP) etkiler. WebP görselleri eşdeğer JPEG/PNG dosyalarından %25–35 daha küçüktür. AVIF, JPEG\'den %50 daha küçüktür. Daha küçük dosyalar daha hızlı yüklenir ve LCP puanlarını iyileştirir.'),
        code('<picture>\n  <source srcset="/images/hero.avif" type="image/avif">\n  <source srcset="/images/hero.webp" type="image/webp">\n  <img\n    src="/images/hero.jpg"\n    alt="Erişilebilirlik denetim panosunda %98 uyumluluk puanı"\n    width="1200"\n    height="630"\n    loading="eager"\n    decoding="async"\n  >\n</picture>', 'html'),

        heading('Srcset ile Duyarlı Görseller', 'h2'),
        p('srcset ve sizes nitelikleri, tarayıcıların her cihaz için uygun boyutlarda görseller sunmasına olanak tanır. Bu, 375 piksel genişliğindeki bir mobil ekrana 2400 piksel genişliğinde görsel göndermekten kaçınır.'),

        heading('Geç Yükleme ve CLS Önleme', 'h2'),
        p('Görünümün altındaki tüm görsellerde loading="lazy" kullanarak yüklemelerini kullanıcı kaydırana kadar erteleyin. Ancak, görünümün üstündeki görsellerde — özellikle LCP görselinde — hiçbir zaman geç yükleme kullanmayın. Her zaman <img> öğelerinde açık genişlik ve yükseklik nitelikleri belirtin.'),

        heading('SVG\'ler: Erişilebilir ve SEO Dostu Grafikler', 'h2'),
        p('Satır içi SVG\'ler arama motorları tarafından tam olarak indekslenebilir ve bir başlık öğesiyle aria-labelledby kullanılarak tam erişilebilir hale getirilebilir. Simgeler ve dekoratif SVG\'ler için ekran okuyucular tarafından duyurulmasını engellemek amacıyla aria-hidden="true" kullanın.'),
        code('<!-- Erişilebilir bilgi veren SVG -->\n<svg role="img" aria-labelledby="svg-baslik" viewBox="0 0 400 200">\n  <title id="svg-baslik">Sektöre Göre WCAG Uyumluluğu</title>\n  <!-- grafik yolları -->\n</svg>', 'html'),
      ],
    },
    resources: [
      { _key: 'sg3r1', title: 'Google: Image SEO Best Practices', url: 'https://developers.google.com/search/docs/appearance/google-images', source: 'other', language: 'en' },
      { _key: 'sg3r2', title: 'W3C WAI: Images Tutorial', url: 'https://www.w3.org/WAI/tutorials/images/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg3r3', title: 'MDN: Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images', source: 'mdn', language: 'en' },
      { _key: 'sg3r4', title: 'WebAIM: Alternative Text', url: 'https://webaim.org/techniques/alttext/', source: 'webaim', language: 'en' },
      { _key: 'sg3r5', title: 'web.dev: Use WebP images', url: 'https://web.dev/articles/serve-images-webp', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Image Optimization for SEO and Accessibility', metaDescription: 'Optimize images for both search engines and screen readers. Covers alt text, file names, WebP/AVIF formats, srcset, lazy loading, and image structured data.' },
      tr: { metaTitle: 'SEO ve Erişilebilirlik için Görsel Optimizasyonu', metaDescription: 'Görselleri hem arama motorları hem de ekran okuyucular için optimize edin. Alt metin, dosya adları, WebP/AVIF, srcset ve geç yüklemeyi kapsar.' },
    },
  },

  // ─── SEO 4 ───────────────────────────────────────────────────────────────────
  {
    category: 'seo',
    title: {
      en: 'Internal Linking Best Practices for Accessible Sites',
      tr: 'Erişilebilir Siteler için Dahili Bağlantı En İyi Uygulamaları',
    },
    description: {
      en: 'Build an internal link architecture that passes PageRank, helps users navigate, and meets WCAG link-purpose criteria — all at the same time.',
      tr: 'PageRank aktaran, kullanıcıların gezinmesine yardımcı olan ve WCAG bağlantı amacı kriterlerini karşılayan bir dahili bağlantı mimarisi oluşturun — hepsini aynı anda.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-2-4-4', _key: 'seo4w244' },
      { _type: 'reference', _ref: 'wcag-2-4-9', _key: 'seo4w249' },
    ],
    content: {
      en: [
        heading('Why Internal Linking Is Both an SEO and Accessibility Issue', 'h2'),
        p('Internal links do three jobs simultaneously: they distribute PageRank (link equity) across a site, they help search engines discover and understand the relationship between pages, and they provide navigation pathways for users. For keyboard-only and screen reader users, links are the primary navigation tool — they move from link to link using Tab and navigate the links list in their screen reader. Poor internal linking harms both crawlability and usability.'),

        heading('Descriptive Anchor Text: The Core Requirement', 'h2'),
        p('WCAG 2.4.4 (Link Purpose in Context) requires that the purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined context. WCAG 2.4.9 (AAA) requires the purpose to be determinable from the link text alone, without context.'),
        p('From an SEO perspective, Google uses anchor text as one of the most powerful signals for understanding the topic of the linked page. Generic anchor text like "click here" or "read more" provides zero topical signal. Descriptive anchor text like "WCAG keyboard navigation testing guide" tells Google and users exactly what they will find.'),
        bullet('Use descriptive, keyword-relevant anchor text that describes the destination.'),
        bullet('Avoid "click here", "read more", "learn more", "this article", "here" as standalone anchor text.'),
        bullet('Keep anchor text concise — typically 3–8 words is ideal.'),
        bullet('Vary anchor text naturally — multiple links to the same page with identical anchor text looks spammy to Google.'),
        code('<!-- Bad: generic anchor text -->\n<p>To learn about keyboard testing, <a href="/guides/keyboard-testing">click here</a>.</p>\n\n<!-- Good: descriptive anchor text -->\n<p>Our <a href="/guides/keyboard-testing">keyboard navigation testing guide</a> covers automated and manual techniques.</p>\n\n<!-- Good: link purpose determinable from context -->\n<p>Download the <a href="/reports/wcag-audit-2025.pdf">2025 WCAG audit report</a> (PDF, 2.3 MB).</p>', 'html'),

        heading('Link Visibility and Focus States', 'h2'),
        p('Links must be visually distinguishable from surrounding text (WCAG 1.4.1) and must have a visible focus indicator when focused by keyboard (WCAG 2.4.7, 2.4.11 in WCAG 2.2). The default browser underline for links satisfies 1.4.1, but many design systems remove underlines and rely on color alone — which fails for color-blind users.'),
        p('Best practice: keep underlines on body text links, or use a combination of color + weight + border-bottom. Ensure the focus ring is visible in both light and dark modes with sufficient contrast (3:1 against adjacent colors per WCAG 2.4.11).'),
        code('/* Accessible link styles */\na {\n  color: #0057b7;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n\na:hover {\n  text-decoration-thickness: 2px;\n}\n\na:focus-visible {\n  outline: 3px solid #0057b7;\n  outline-offset: 2px;\n  border-radius: 2px;\n}', 'css'),

        heading('Skip Links and Navigation Landmarks', 'h2'),
        p('A "skip to main content" link at the top of every page is an accessibility requirement (WCAG 2.4.1) and an indirect SEO benefit — it signals to search engines where the primary content begins. This link is typically visually hidden but becomes visible on keyboard focus.'),
        code('<a href="#main-content" class="skip-link">Skip to main content</a>\n\n<!-- In CSS -->\n.skip-link {\n  position: absolute;\n  top: -100%;\n  left: 1rem;\n  background: #000;\n  color: #fff;\n  padding: 0.5rem 1rem;\n  z-index: 9999;\n  border-radius: 0 0 4px 4px;\n}\n\n.skip-link:focus {\n  top: 0;\n}', 'html'),

        heading('Breadcrumbs: Navigation, SEO, and Accessibility', 'h2'),
        p('Breadcrumb navigation benefits all three dimensions: it gives users a clear path back through the site hierarchy, it generates BreadcrumbList rich results in Google Search that improve click-through rate, and it provides screen reader users with orientation within the site structure. Implement breadcrumbs with an <nav aria-label="Breadcrumb"> wrapper, an <ol> list, and BreadcrumbList schema.'),
        code('<nav aria-label="Breadcrumb">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/guides/">Guides</a></li>\n    <li><a href="/guides/seo/">SEO Guides</a></li>\n    <li aria-current="page">Internal Linking Best Practices</li>\n  </ol>\n</nav>\n\n<!-- JSON-LD BreadcrumbList -->\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  "itemListElement": [\n    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/"},\n    {"@type": "ListItem", "position": 2, "name": "Guides", "item": "https://example.com/guides/"},\n    {"@type": "ListItem", "position": 3, "name": "SEO Guides", "item": "https://example.com/guides/seo/"},\n    {"@type": "ListItem", "position": 4, "name": "Internal Linking Best Practices"}\n  ]\n}\n</script>', 'html'),

        heading('Link Depth and Crawl Budget', 'h2'),
        p('Pages more than 3–4 clicks from the homepage receive less crawl attention and accumulate less PageRank. For large knowledge bases or guide libraries, ensure that your most important guides are reachable within 2–3 clicks through a combination of: homepage featured guides, category landing pages, related guides sections within content, and XML sitemaps.'),
        bullet('Create category index pages that link to all guides in that category.'),
        bullet('Add "Related guides" sections at the bottom of every guide page.'),
        bullet('Link to foundational guides from multiple places across the site.'),
        bullet('Keep navigation hierarchies shallow — aim for max 3 levels deep.'),

        heading('Opening Links in New Tabs', 'h2'),
        p('Avoid opening internal links in new tabs (target="_blank"). It breaks the browser\'s back-button navigation, disorients users — particularly those with cognitive disabilities — and removes the page context. If you must open a link in a new tab (e.g., external resources), provide a clear warning in the link text or via an icon with alt text: "opens in a new tab".'),
        code('<!-- Acceptable: external link opening in new tab with warning -->\n<a href="https://webaim.org/techniques/links/" target="_blank" rel="noopener noreferrer">\n  WebAIM: Links and Hypertext\n  <svg aria-label="(opens in new tab)" role="img" ...></svg>\n</a>', 'html'),
      ],
      tr: [
        heading('Dahili Bağlantı Neden Hem SEO Hem Erişilebilirlik Sorunudur', 'h2'),
        p('Dahili bağlantılar aynı anda üç iş yapar: PageRank\'ı (bağlantı değerini) site genelinde dağıtır, arama motorlarının sayfalar arasındaki ilişkiyi keşfedip anlamasına yardımcı olur ve kullanıcılar için gezinme yolları sağlar. Yalnızca klavye ve ekran okuyucu kullanıcıları için bağlantılar birincil gezinme aracıdır.'),

        heading('Açıklayıcı Çapa Metni: Temel Gereksinim', 'h2'),
        p('WCAG 2.4.4, her bağlantının amacının yalnızca bağlantı metninden veya bağlantı metni ile programlı bağlamından belirlenebilmesini gerektirir. SEO açısından Google, bağlantılı sayfanın konusunu anlamak için çapa metnini en güçlü sinyallerden biri olarak kullanır.'),
        bullet('"Buraya tıklayın", "daha fazla oku", "daha fazla öğren" gibi genel ifadelerden kaçının.'),
        bullet('Hedefi açıklayan açıklayıcı, anahtar kelime içeren çapa metni kullanın.'),
        bullet('Çapa metnini kısa tutun — genellikle 3–8 kelime idealdir.'),
        code('<!-- Kötü: genel çapa metni -->\n<p>Klavye testi hakkında bilgi edinmek için <a href="/rehberler/klavye-testi">buraya tıklayın</a>.</p>\n\n<!-- İyi: açıklayıcı çapa metni -->\n<p><a href="/rehberler/klavye-testi">Klavye gezinme test rehberimiz</a> otomatik ve manuel teknikleri kapsar.</p>', 'html'),

        heading('Bağlantı Görünürlüğü ve Odak Durumları', 'h2'),
        p('Bağlantılar çevreleyen metinden görsel olarak ayırt edilebilir olmalı (WCAG 1.4.1) ve klavye ile odaklandığında görünür bir odak göstergesi bulunmalıdır (WCAG 2.4.7). En iyi uygulama: metin bağlantılarında alt çizgileri koruyun veya renk + ağırlık + alt kenarlık kombinasyonu kullanın.'),
        code('/* Erişilebilir bağlantı stilleri */\na {\n  color: #0057b7;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n\na:focus-visible {\n  outline: 3px solid #0057b7;\n  outline-offset: 2px;\n  border-radius: 2px;\n}', 'css'),

        heading('Atla Bağlantıları ve Gezinme İşaret Noktaları', 'h2'),
        p('"Ana içeriğe atla" bağlantısı hem bir erişilebilirlik gereksinimi (WCAG 2.4.1) hem de dolaylı bir SEO avantajıdır — arama motorlarına birincil içeriğin nerede başladığını bildirir. Bu bağlantı genellikle görsel olarak gizlenir ama klavye odağında görünür hale gelir.'),
        code('<a href="#ana-icerik" class="skip-link">Ana içeriğe geç</a>', 'html'),

        heading('Ekmek Kırıntıları: Gezinme, SEO ve Erişilebilirlik', 'h2'),
        p('Ekmek kırıntısı gezinmesi üç boyuttan da fayda sağlar: kullanıcılara site hiyerarşisinde geri dönmek için açık bir yol verir, Google Arama\'da tıklama oranını artıran BreadcrumbList zengin sonuçlar oluşturur ve ekran okuyucu kullanıcılarına site yapısındaki konumları hakkında bilgi verir.'),

        heading('Bağlantı Derinliği ve Tarama Bütçesi', 'h2'),
        p('Ana sayfadan 3–4 tıklamadan fazla uzaktaki sayfalar daha az tarama ilgisi alır ve daha az PageRank biriktirir. Büyük bilgi tabanları veya rehber kütüphaneleri için en önemli rehberlerinizin 2–3 tıklama içinde ulaşılabilir olduğundan emin olun.'),
        bullet('Her kategori için tüm rehberlere bağlantı veren kategori indeks sayfaları oluşturun.'),
        bullet('Her rehber sayfasının altına "İlgili rehberler" bölümleri ekleyin.'),
        bullet('Temel rehberlere site genelinde birden fazla yerden bağlantı verin.'),
      ],
    },
    resources: [
      { _key: 'sg4r1', title: 'WCAG 2.4.4: Link Purpose (In Context)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg4r2', title: 'WebAIM: Links and Hypertext', url: 'https://webaim.org/techniques/hypertext/', source: 'webaim', language: 'en' },
      { _key: 'sg4r3', title: 'Google: Internal linking', url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable', source: 'other', language: 'en' },
      { _key: 'sg4r4', title: 'MDN: Creating hyperlinks', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks', source: 'mdn', language: 'en' },
      { _key: 'sg4r5', title: 'Deque: Link purpose', url: 'https://dequeuniversity.com/rules/axe/4.10/link-name', source: 'deque', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Internal Linking for Accessible Sites', metaDescription: 'Build internal link architecture that passes PageRank and meets WCAG 2.4.4. Covers anchor text, skip links, breadcrumbs, and link depth strategy.' },
      tr: { metaTitle: 'Erişilebilir Siteler için Dahili Bağlantılar', metaDescription: 'PageRank aktaran ve WCAG 2.4.4\'ü karşılayan dahili bağlantı mimarisi oluşturun. Çapa metni, atla bağlantıları ve ekmek kırıntılarını kapsar.' },
    },
  },

  // ─── SEO 5 ───────────────────────────────────────────────────────────────────
  {
    category: 'seo',
    title: {
      en: 'Mobile Accessibility and SEO',
      tr: 'Mobil Erişilebilirlik ve SEO',
    },
    description: {
      en: 'Ensure your site is accessible and SEO-optimized on mobile devices — covering touch targets, viewport configuration, mobile screen reader testing, and mobile-first indexing.',
      tr: 'Sitenizin mobil cihazlarda erişilebilir ve SEO açısından optimize edilmiş olmasını sağlayın — dokunma hedefleri, görünüm alanı yapılandırması, mobil ekran okuyucu testi ve mobil öncelikli dizine eklemeyi kapsar.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-4-4', _key: 'seo5w144' },
      { _type: 'reference', _ref: 'wcag-2-5-5', _key: 'seo5w255' },
      { _type: 'reference', _ref: 'wcag-1-3-4', _key: 'seo5w134' },
    ],
    content: {
      en: [
        heading('Mobile-First Indexing and Why Accessibility Matters', 'h2'),
        p('Google switched to mobile-first indexing for all sites. This means the mobile version of your page is what Google indexes and uses for ranking — not the desktop version. If your mobile page omits content, has broken navigation, or delivers a degraded experience compared to desktop, your rankings will reflect the mobile version\'s weaknesses.'),
        p('Mobile accessibility and mobile SEO are therefore the same problem. A touch interface that requires precise pointer control, text that is too small to read without zooming, or interactive elements that are not reachable by keyboard — these failures affect real users and search performance simultaneously.'),

        heading('Viewport Configuration', 'h2'),
        p('The viewport meta tag is the foundation of mobile rendering. Without it, mobile browsers render pages at desktop width and scale them down, making text tiny. The correct configuration enables responsive rendering:'),
        code('<meta name="viewport" content="width=device-width, initial-scale=1">', 'html'),
        p('Never use maximum-scale=1 or user-scalable=no. These prevent users from pinching to zoom, which violates WCAG 1.4.4 (Resize Text). Users with low vision or cognitive disabilities frequently need to zoom to 200–400% to read content comfortably. Google\'s mobile-friendliness checker will also flag this configuration.'),

        heading('Touch Target Size: WCAG 2.5.5 and Google Requirements', 'h2'),
        p('WCAG 2.5.5 (Target Size, Enhanced, AAA) requires touch targets to be at least 44×44 CSS pixels. WCAG 2.5.8 (AA, WCAG 2.2) requires at least 24×24 pixels with adequate spacing. Google\'s mobile usability report flags tap targets smaller than 48×48 pixels that are too close together. Meeting WCAG requirements satisfies Google\'s requirements in practice.'),
        bullet('Minimum recommended touch target: 44×44 CSS pixels.'),
        bullet('Add padding around small elements rather than making the visual element larger.'),
        bullet('Ensure adequate spacing between adjacent tap targets (minimum 8px).'),
        bullet('Use min-height: 44px and min-width: 44px on all interactive elements.'),
        code('/* Accessible touch targets */\nbutton, a, input, select, textarea {\n  min-height: 44px;\n  min-width: 44px;\n  padding: 0.75rem 1rem;\n}\n\n/* Navigation links with adequate spacing */\nnav a {\n  padding: 0.75rem 1rem;\n  display: inline-block;\n}', 'css'),

        heading('Text Size and Readability', 'h2'),
        p('WCAG 1.4.4 requires text to be resizable up to 200% without loss of content or functionality. For mobile, this means your responsive layout must not break when the user increases their browser font size. Use relative units (rem, em) for font sizes and line heights, not absolute px values.'),
        p('Additionally, ensure a minimum body font size of 16px (1rem at default browser settings) for comfortable reading. Text smaller than 16px on mobile is a mobile usability issue Google flags, and it fails users with visual or reading disabilities.'),
        code('/* Mobile-accessible typography */\nbody {\n  font-size: 1rem; /* 16px default */\n  line-height: 1.6;\n}\n\nh1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }\nh2 { font-size: clamp(1.25rem, 4vw, 2rem); }\n\n/* Ensure layout doesn\'t break at 200% zoom */\n@media (min-width: 320px) {\n  .container {\n    max-width: 100%;\n    padding-inline: 1rem;\n  }\n}', 'css'),

        heading('Orientation Lock: WCAG 1.3.4', 'h2'),
        p('WCAG 1.3.4 (Orientation) requires that content does not restrict its view and operation to a single display orientation. Users with devices mounted in fixed orientations (e.g., a wheelchair-mounted tablet) cannot rotate their device. Never use CSS or JavaScript to lock a page to portrait or landscape mode unless the content is essential in a specific orientation (e.g., a virtual piano keyboard).'),
        code('/* Bad: locking orientation via CSS */\n@media (orientation: portrait) {\n  body { display: none; } /* Never do this */\n}\n\n/* Good: layouts that work in both orientations */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n}', 'css'),

        heading('Mobile Screen Reader Testing', 'h2'),
        p('Desktop screen reader testing does not cover mobile experiences. Test your site with mobile screen readers:'),
        bullet('iOS VoiceOver: Enable in Settings → Accessibility → VoiceOver. Swipe right to move through elements, double-tap to activate. Use the rotor (two-finger rotate gesture) to navigate by headings, links, and form controls.'),
        bullet('Android TalkBack: Enable in Settings → Accessibility → TalkBack. Similar swipe navigation. Check the Linear Navigation setting for forms.'),
        bullet('Test on real devices, not just emulators — touch gesture support varies.'),
        bullet('Check that focus order is logical on mobile, especially in modal dialogs and dropdowns.'),
        bullet('Verify that custom touch gestures have accessible keyboard/switch alternatives.'),

        heading('Page Speed on Mobile Networks', 'h2'),
        p('Mobile users are more likely to be on slower connections — 3G or lossy LTE. Google\'s Core Web Vitals assessment uses field data from real users, which includes mobile users on slow connections. Pages that fail LCP on mobile (target: under 2.5 seconds) rank lower in mobile search. Specific optimizations for mobile accessibility and SEO:'),
        bullet('Use a Content Delivery Network (CDN) to reduce server response time globally.'),
        bullet('Implement resource hints: <link rel="preload"> for critical fonts and images, <link rel="preconnect"> for third-party origins.'),
        bullet('Defer non-critical JavaScript with loading="lazy" on scripts or type="module" for deferred execution.'),
        bullet('Compress all text assets: enable Brotli or gzip compression on your server.'),
      ],
      tr: [
        heading('Mobil Öncelikli Dizine Ekleme ve Erişilebilirlik', 'h2'),
        p('Google tüm siteler için mobil öncelikli dizine eklemeye geçti. Bu, sayfanızın mobil sürümünün Google\'ın dizine eklediği ve sıralama için kullandığı sürüm olduğu anlamına gelir. Mobil erişilebilirlik ve mobil SEO dolayısıyla aynı problemdir.'),

        heading('Görünüm Alanı Yapılandırması', 'h2'),
        p('Görünüm alanı meta etiketi mobil oluşturmanın temelidir. Doğru yapılandırma duyarlı oluşturmayı etkinleştirir. maximum-scale=1 veya user-scalable=no asla kullanmayın — bu, kullanıcıların sıkıştırarak yakınlaştırmasını engeller ve WCAG 1.4.4\'ü ihlal eder.'),
        code('<meta name="viewport" content="width=device-width, initial-scale=1">', 'html'),

        heading('Dokunma Hedefi Boyutu', 'h2'),
        p('WCAG 2.5.5, dokunma hedeflerinin en az 44×44 CSS piksel olmasını gerektirir. Google\'ın mobil kullanılabilirlik raporu, birbirine çok yakın 48×48 pikselden küçük dokunma hedeflerini işaretler.'),
        bullet('Minimum önerilen dokunma hedefi: 44×44 CSS piksel.'),
        bullet('Görsel öğeyi büyütmek yerine küçük öğelerin etrafına dolgu ekleyin.'),
        bullet('Bitişik dokunma hedefleri arasında yeterli boşluk bırakın (minimum 8 piksel).'),
        code('/* Erişilebilir dokunma hedefleri */\nbutton, a, input {\n  min-height: 44px;\n  min-width: 44px;\n  padding: 0.75rem 1rem;\n}', 'css'),

        heading('Metin Boyutu ve Okunabilirlik', 'h2'),
        p('WCAG 1.4.4, içerik veya işlevsellik kaybı olmadan metnin %200\'e kadar yeniden boyutlandırılabilmesini gerektirir. Yazı tipi boyutları ve satır yükseklikleri için göreli birimler (rem, em) kullanın. Rahat okuma için minimum 16 piksellik gövde yazı tipi boyutu sağlayın.'),

        heading('Yön Kilidi: WCAG 1.3.4', 'h2'),
        p('WCAG 1.3.4, içeriğin görüntüsünü ve işlemini tek bir ekran yönüyle kısıtlamamasını gerektirir. Sabit konumlarda bağlanmış cihazları olan kullanıcılar cihazlarını döndüremez. CSS veya JavaScript kullanarak bir sayfayı dikey veya yatay moda asla kilitlemeyin.'),

        heading('Mobil Ekran Okuyucu Testi', 'h2'),
        p('Masaüstü ekran okuyucu testi mobil deneyimleri kapsamaz. Sitenizi mobil ekran okuyucularla test edin:'),
        bullet('iOS VoiceOver: Ayarlar → Erişilebilirlik → VoiceOver\'dan etkinleştirin. Öğeler arasında gezinmek için sağa kaydırın, etkinleştirmek için çift dokunun.'),
        bullet('Android TalkBack: Ayarlar → Erişilebilirlik → TalkBack\'ten etkinleştirin.'),
        bullet('Gerçek cihazlarda test edin, yalnızca emülatörlerde değil.'),

        heading('Mobil Ağlarda Sayfa Hızı', 'h2'),
        p('Mobil kullanıcılar daha yavaş bağlantılarda olma olasılığı daha yüksektir. Google\'ın Temel Web Vitals değerlendirmesi, yavaş bağlantılardaki mobil kullanıcılar dahil gerçek kullanıcılardan gelen saha verilerini kullanır.'),
        bullet('Sunucu yanıt süresini küresel olarak azaltmak için bir İçerik Dağıtım Ağı (CDN) kullanın.'),
        bullet('Kritik yazı tipleri ve görseller için <link rel="preload"> kaynak ipuçlarını uygulayın.'),
        bullet('Sunucunuzda Brotli veya gzip sıkıştırmasını etkinleştirin.'),
      ],
    },
    resources: [
      { _key: 'sg5r1', title: 'Google: Mobile-first indexing', url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing', source: 'other', language: 'en' },
      { _key: 'sg5r2', title: 'WCAG 2.5.5: Target Size (Enhanced)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg5r3', title: 'WebAIM: Mobile Accessibility', url: 'https://webaim.org/techniques/mobile/', source: 'webaim', language: 'en' },
      { _key: 'sg5r4', title: 'Google: Mobile Usability report', url: 'https://support.google.com/webmasters/answer/9063469', source: 'other', language: 'en' },
      { _key: 'sg5r5', title: 'W3C WAI: Mobile Accessibility', url: 'https://www.w3.org/WAI/standards-guidelines/mobile/', source: 'w3c-wai', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Mobile Accessibility and SEO Guide', metaDescription: 'Optimize for mobile accessibility and mobile-first indexing. Covers viewport config, touch targets, orientation lock, font sizing, and mobile screen reader testing.' },
      tr: { metaTitle: 'Mobil Erişilebilirlik ve SEO Rehberi', metaDescription: 'Mobil erişilebilirlik ve mobil öncelikli dizine ekleme için optimize edin. Görünüm alanı, dokunma hedefleri, yön kilidi ve ekran okuyucu testini kapsar.' },
    },
  },

  // ─── GEO 1 ───────────────────────────────────────────────────────────────────
  {
    category: 'geo',
    title: {
      en: 'Generative Engine Optimization: What It Is and Why It Matters',
      tr: 'Üretken Motor Optimizasyonu: Nedir ve Neden Önemlidir',
    },
    description: {
      en: 'An introduction to GEO — optimizing your content to be cited, summarized, and recommended by AI-powered search engines and generative AI tools like ChatGPT, Gemini, and Perplexity.',
      tr: 'GEO\'ya giriş — içeriğinizi ChatGPT, Gemini ve Perplexity gibi yapay zeka destekli arama motorları ve üretken yapay zeka araçları tarafından alıntılanacak, özetlenecek ve önerilebilecek şekilde optimize etme.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'geo1w131' },
      { _type: 'reference', _ref: 'wcag-2-4-6', _key: 'geo1w246' },
    ],
    content: {
      en: [
        heading('What Is Generative Engine Optimization', 'h2'),
        p('Generative Engine Optimization (GEO) is the practice of structuring, writing, and publishing content so that large language models (LLMs) and AI-powered search engines are likely to cite it, summarize it, or recommend it in their responses. As tools like ChatGPT, Google Gemini, Perplexity, and Microsoft Copilot handle a growing proportion of information queries, appearing in their outputs becomes as important as appearing on the first page of traditional search results.'),
        p('GEO is not a replacement for SEO — it builds on it. Pages that rank well in traditional search tend to be well-represented in LLM training data and retrieval-augmented generation (RAG) pipelines. But GEO adds a new layer of optimization focused on how content is synthesized, attributed, and trusted by AI systems.'),

        heading('How Generative AI Search Works', 'h2'),
        p('Modern AI search tools like Perplexity and Google AI Overviews operate using a combination of live web retrieval (fetching pages in real time) and pre-trained knowledge (from the LLM\'s training corpus). When a user asks a question, the system retrieves candidate pages, extracts relevant passages, synthesizes a response, and ideally cites the source.'),
        p('For your content to be cited, it must pass several filters:'),
        numbered('The page must be crawlable and indexable (no robots.txt blocks, no login walls).'),
        numbered('The content must directly answer the query — vague or padded content is skipped.'),
        numbered('The source must appear credible — domain authority, author credentials, and EEAT signals all matter.'),
        numbered('The content must be structured so the relevant passage can be extracted — clear headings, short paragraphs, and direct answers improve extractability.'),
        numbered('The page must load quickly and be accessible — AI crawlers respect many of the same signals as search crawlers.'),

        heading('GEO vs. SEO vs. AEO: Understanding the Differences', 'h2'),
        p('These three optimization disciplines are related but distinct:'),
        bullet('SEO (Search Engine Optimization) — optimizes for ranking in traditional 10-blue-links search results. Focuses on keywords, backlinks, technical crawlability, and Core Web Vitals.'),
        bullet('AEO (Answer Engine Optimization) — optimizes for being selected as the answer in featured snippets, People Also Ask boxes, and voice search results. Focuses on concise, direct answers to specific questions.'),
        bullet('GEO (Generative Engine Optimization) — optimizes for being cited or synthesized by AI-generated answers across multiple platforms. Focuses on depth, credibility, structure, and authority signals.'),
        p('In practice, good SEO + AEO is the prerequisite for GEO. You cannot be cited by AI if you are not visible to crawlers.'),

        heading('Accessibility as a GEO Signal', 'h2'),
        p('Accessible pages are better GEO candidates for several reasons. First, AI crawlers parse HTML semantics to extract meaning — pages with proper heading structure, semantic lists, and labeled tables are easier to parse accurately. Second, accessible alt text on images provides textual descriptions that AI can incorporate into its understanding of the page. Third, content written in plain language (a best practice for cognitive accessibility) is more likely to be accurately summarized by AI.'),
        p('Practically, this means that WCAG compliance is not just a legal and ethical obligation — it is a competitive advantage in the AI search landscape. Sites that invest in accessibility are inadvertently building better GEO foundations.'),

        heading('Core GEO Principles', 'h2'),
        p('The following principles guide effective GEO:'),
        bullet('Authority first — establish your site as an authoritative source through original research, expert authorship, citations, and factual accuracy.'),
        bullet('Direct answers — answer the most likely question in the first sentence after a heading; do not bury the lede.'),
        bullet('Structured content — use headings, lists, tables, and code blocks to make content easy to parse.'),
        bullet('Comprehensive coverage — go deep on topics rather than broad; AI prefers sources that comprehensively cover a subject.'),
        bullet('Fresh, updated content — AI tools favor recent, up-to-date information; timestamp your content and update it regularly.'),
        bullet('Cite your sources — AI systems trust content that cites other authoritative sources; link to W3C, research papers, and established references.'),

        heading('Measuring GEO Performance', 'h2'),
        p('GEO measurement is still evolving, but current approaches include:'),
        bullet('Manual AI query testing — regularly ask AI tools questions related to your content and check whether your site is cited.'),
        bullet('Google AI Overviews monitoring — use Google Search Console impressions data to track clicks from AI Overview citations.'),
        bullet('Brand mention tracking — use tools like Brand24 or Mention to track where your brand appears in AI-generated content.'),
        bullet('ChatGPT plugin analytics — if your content is indexed via a plugin or GPT action, use the analytics provided.'),
        p('A strong signal that your GEO strategy is working: your domain appears in Perplexity citations, Google AI Overviews, and ChatGPT Browse responses for your target topics.'),
      ],
      tr: [
        heading('Üretken Motor Optimizasyonu Nedir', 'h2'),
        p('Üretken Motor Optimizasyonu (GEO), içeriğinizi büyük dil modellerinin (LLM) ve yapay zeka destekli arama motorlarının yanıtlarında alıntılaması, özetlemesi veya önermesi için yapılandırma, yazma ve yayımlama pratiğidir. ChatGPT, Google Gemini, Perplexity ve Microsoft Copilot gibi araçlar giderek daha fazla bilgi sorgusunu ele aldıkça, bu araçların çıktılarında görünmek, geleneksel arama sonuçlarının ilk sayfasında görünmek kadar önemli hale gelmektedir.'),
        p('GEO, SEO\'nun yerini almaz — onun üzerine inşa edilir. Geleneksel aramada iyi sıralanan sayfalar, LLM eğitim verilerinde ve geri alım destekli oluşturma (RAG) hatlarında iyi temsil edilme eğilimindedir.'),

        heading('Üretken Yapay Zeka Araması Nasıl Çalışır', 'h2'),
        p('Perplexity ve Google AI Overviews gibi modern yapay zeka arama araçları, canlı web alma (gerçek zamanlı olarak sayfaları getirme) ve önceden eğitilmiş bilginin (LLM\'nin eğitim veri tabanından) kombinasyonunu kullanır.'),
        numbered('Sayfa taranabilir ve indekslenebilir olmalıdır.'),
        numbered('İçerik sorguyu doğrudan yanıtlamalıdır.'),
        numbered('Kaynak güvenilir görünmelidir — alan otoritesi, yazar kimlik bilgileri ve EEAT sinyalleri önemlidir.'),
        numbered('İlgili pasaj çıkarılabilmesi için içerik yapılandırılmış olmalıdır.'),

        heading('GEO ve SEO ve AEO: Farklılıkları Anlamak', 'h2'),
        bullet('SEO — geleneksel arama sonuçlarında sıralama için optimize eder.'),
        bullet('AEO (Yanıt Motoru Optimizasyonu) — öne çıkan snippet\'lerde ve sesli arama sonuçlarında yanıt seçilmek için optimize eder.'),
        bullet('GEO — birden fazla platformda yapay zeka tarafından üretilen yanıtlarda alıntılanmak veya sentezlenmek için optimize eder.'),
        p('Pratikte, iyi SEO + AEO, GEO için ön koşuldur. Tarayıcılara görünür değilseniz, yapay zeka tarafından alıntılanamazsınız.'),

        heading('Erişilebilirlik Bir GEO Sinyali Olarak', 'h2'),
        p('Erişilebilir sayfalar çeşitli nedenlerle daha iyi GEO adaylarıdır. Yapay zeka tarayıcıları anlam çıkarmak için HTML semantiğini ayrıştırır — uygun başlık yapısına, semantik listelere ve etiketli tablolara sahip sayfalar daha doğru şekilde ayrıştırılabilir. Görsellerdeki erişilebilir alt metin, yapay zekanın sayfayı anlamasına dahil edebileceği metinsel açıklamalar sağlar.'),

        heading('Temel GEO İlkeleri', 'h2'),
        bullet('Önce otorite — özgün araştırma, uzman yazarlık ve gerçeksel doğrulukla sitenizi yetkili bir kaynak olarak konumlandırın.'),
        bullet('Doğrudan yanıtlar — bir başlıktan sonraki ilk cümlede en olası soruyu yanıtlayın.'),
        bullet('Yapılandırılmış içerik — başlıklar, listeler, tablolar ve kod blokları kullanın.'),
        bullet('Kapsamlı kapsam — bir konuyu geniş değil derinlemesine ele alın.'),
        bullet('Taze, güncel içerik — içeriğinizi zaman damgalayın ve düzenli olarak güncelleyin.'),
        bullet('Kaynaklarınızı alıntılayın — W3C, araştırma makaleleri ve yerleşik referanslara bağlantı verin.'),

        heading('GEO Performansını Ölçmek', 'h2'),
        bullet('Manuel yapay zeka sorgu testi — içeriğinizle ilgili yapay zeka araçlarına sorular sorun ve sitenizin alıntılanıp alıntılanmadığını kontrol edin.'),
        bullet('Google AI Overviews izleme — yapay zeka alıntılarından gelen tıklamaları takip etmek için Google Search Console gösterim verilerini kullanın.'),
        bullet('Marka bahis takibi — marka adınızın yapay zeka tarafından oluşturulan içerikte nerede göründüğünü takip edin.'),
      ],
    },
    resources: [
      { _key: 'sg6r1', title: 'Google: AI Overviews Help', url: 'https://support.google.com/websearch/answer/14901683', source: 'other', language: 'en' },
      { _key: 'sg6r2', title: 'Perplexity: How we rank sources', url: 'https://www.perplexity.ai/hub/faq/how-does-perplexity-rank-sources', source: 'other', language: 'en' },
      { _key: 'sg6r3', title: 'Search Engine Journal: GEO Guide', url: 'https://www.searchenginejournal.com/generative-engine-optimization-geo/', source: 'other', language: 'en' },
      { _key: 'sg6r4', title: 'W3C WAI: Accessibility Fundamentals', url: 'https://www.w3.org/WAI/fundamentals/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg6r5', title: 'Moz: The Future of Search', url: 'https://moz.com/blog/ai-search-and-seo', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'What Is Generative Engine Optimization (GEO)?', metaDescription: 'Learn how to optimize content to be cited by AI search tools like ChatGPT, Gemini, and Perplexity. Understand GEO principles, EEAT signals, and accessibility\'s role.' },
      tr: { metaTitle: 'Üretken Motor Optimizasyonu (GEO) Nedir?', metaDescription: 'İçeriğinizi ChatGPT, Gemini ve Perplexity gibi yapay zeka araçları tarafından alıntılanacak şekilde optimize etmeyi öğrenin. GEO ilkeleri ve erişilebilirliğin rolü.' },
    },
  },

  // ─── GEO 2 ───────────────────────────────────────────────────────────────────
  {
    category: 'geo',
    title: {
      en: 'Structured Data for AI Engines',
      tr: 'Yapay Zeka Motorları için Yapılandırılmış Veri',
    },
    description: {
      en: 'How to use schema.org JSON-LD markup to make your content machine-readable for AI engines, improve rich results, and increase your citability in AI-generated answers.',
      tr: 'İçeriğinizi yapay zeka motorları için makine tarafından okunabilir hale getirmek, zengin sonuçları iyileştirmek ve yapay zeka tarafından üretilen yanıtlarda alıntılanabilirliğinizi artırmak için schema.org JSON-LD işaretlemesini nasıl kullanacağınız.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'geo2w131' },
    ],
    content: {
      en: [
        heading('Why Structured Data Matters for AI', 'h2'),
        p('Structured data is machine-readable metadata you add to your HTML that describes what your content is — not just what it says. While a human reading a page about WCAG can infer that the page is a technical guide with a publication date, an author, and a list of criteria, a machine needs explicit signals. Schema.org JSON-LD provides a standardized vocabulary for these signals.'),
        p('For AI engines, structured data serves as an anchor for content extraction. When a language model or retrieval system encounters a page with explicit Article, FAQPage, or HowTo markup, it can extract structured facts more reliably than from unstructured prose. This increases the probability that your content is accurately cited and attributed.'),

        heading('Core Schema Types for Knowledge-Based Content', 'h2'),
        p('The most useful schema types for an accessibility knowledge base are:'),
        bullet('Article / TechArticle — marks the page as an authored technical article with title, author, datePublished, dateModified, and description.'),
        bullet('FAQPage — marks a page containing questions and answers; directly eligible for FAQ rich results in Google Search.'),
        bullet('HowTo — marks step-by-step instructional content; eligible for HowTo rich results and strongly extracted by AI for procedural queries.'),
        bullet('BreadcrumbList — marks navigation breadcrumbs; improves site structure signals for AI and displays in Google rich results.'),
        bullet('WebSite — marks sitewide information; enables Sitelinks Search Box and improves brand recognition.'),
        bullet('Person / Organization — marks author and publisher information; critical for EEAT signals.'),

        heading('Article Schema Implementation', 'h2'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "TechArticle",\n  "headline": "Structured Data for AI Engines",\n  "description": "How to use schema.org JSON-LD to make content machine-readable for AI search engines.",\n  "datePublished": "2025-09-01",\n  "dateModified": "2026-04-01",\n  "author": {\n    "@type": "Person",\n    "name": "Jane Doe",\n    "url": "https://example.com/authors/jane-doe"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "inculva",\n    "url": "https://inculva.com",\n    "logo": {\n      "@type": "ImageObject",\n      "url": "https://inculva.com/logo.png"\n    }\n  },\n  "mainEntityOfPage": {\n    "@type": "WebPage",\n    "@id": "https://inculva.com/guides/structured-data-ai-engines"\n  }\n}\n</script>', 'javascript'),

        heading('FAQPage Schema', 'h2'),
        p('FAQPage schema is one of the most powerful types for GEO. AI systems are trained to recognize Q&A patterns and will preferentially extract from pages with explicit FAQ markup. Google also renders FAQ rich results with expanded answers directly in the SERP, dramatically improving click-through rate.'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "What is WCAG Level AA conformance?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "WCAG Level AA conformance means a website meets all Level A (30 criteria) and Level AA (20 additional criteria) success criteria. This is the standard required by most accessibility laws globally, including the EU Web Accessibility Directive and Section 508 in the US."\n      }\n    },\n    {\n      "@type": "Question",\n      "name": "How do I test for WCAG compliance?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "Testing for WCAG compliance requires a combination of automated tools (axe-core, Lighthouse, WAVE) and manual testing with keyboard navigation and screen readers (NVDA, JAWS, VoiceOver). Automated tools catch approximately 30-40% of accessibility issues; the remainder require human judgment."\n      }\n    }\n  ]\n}\n</script>', 'javascript'),

        heading('HowTo Schema for Instructional Content', 'h2'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "HowTo",\n  "name": "How to Run an Accessibility Audit",\n  "description": "A step-by-step guide to auditing a website for WCAG 2.2 compliance.",\n  "totalTime": "PT2H",\n  "step": [\n    {\n      "@type": "HowToStep",\n      "position": 1,\n      "name": "Run automated scan",\n      "text": "Install axe DevTools in Chrome and run a scan on each page template. Export results as a spreadsheet."\n    },\n    {\n      "@type": "HowToStep",\n      "position": 2,\n      "name": "Test keyboard navigation",\n      "text": "Navigate every interactive element using Tab, Shift+Tab, Enter, Space, and arrow keys. Document any elements that are unreachable or have no focus indicator."\n    },\n    {\n      "@type": "HowToStep",\n      "position": 3,\n      "name": "Test with screen reader",\n      "text": "Use NVDA with Firefox and VoiceOver with Safari to navigate each page template. Check headings, forms, images, tables, and dynamic content."\n    }\n  ]\n}\n</script>', 'javascript'),

        heading('Validating Your Structured Data', 'h2'),
        p('Always validate structured data before deployment:'),
        bullet('Google\'s Rich Results Test (search.google.com/test/rich-results) — checks eligibility for Google rich results and flags schema errors.'),
        bullet('Schema Markup Validator (validator.schema.org) — validates against the schema.org specification.'),
        bullet('Google Search Console → Enhancements — shows indexed rich result types and any errors detected by Googlebot.'),
        p('Common mistakes to avoid: missing required properties, using deprecated schema types, nesting schema incorrectly, and adding fake or misleading information in schema fields (this violates Google\'s guidelines and can result in a manual penalty).'),

        heading('Accessibility and Structured Data Alignment', 'h2'),
        p('The best structured data implementations mirror the page\'s visible content — the schema description matches the visible meta description, the FAQ answers match the visible FAQ content, and the article title matches the visible h1. This alignment is both a Google requirement (schema must reflect what is on the page) and an accessibility principle (content should be consistent and predictable across representations).'),
      ],
      tr: [
        heading('Yapılandırılmış Veri Yapay Zeka için Neden Önemlidir', 'h2'),
        p('Yapılandırılmış veri, HTML\'inize eklediğiniz makine tarafından okunabilir meta veridir; içeriğinizin ne söylediğini değil ne olduğunu açıklar. Schema.org JSON-LD, bu sinyaller için standartlaştırılmış bir söz dağarcığı sağlar.'),
        p('Yapay zeka motorları için yapılandırılmış veri, içerik çıkarımı için bir çapa görevi görür. Açık Article, FAQPage veya HowTo işaretlemesi içeren bir sayfayla karşılaşan bir dil modeli veya alma sistemi, yapılandırılmamış düzyazıdan çok daha güvenilir bir şekilde yapılandırılmış gerçekleri çıkarabilir.'),

        heading('Bilgi Tabanlı İçerik için Temel Şema Türleri', 'h2'),
        bullet('Article / TechArticle — sayfayı yazar, yayın tarihi ve açıklamayla birlikte teknik bir makale olarak işaretler.'),
        bullet('FAQPage — soru ve cevaplar içeren bir sayfayı işaretler; Google Arama\'da FAQ zengin sonuçları için doğrudan uygun.'),
        bullet('HowTo — adım adım talimat içeriğini işaretler.'),
        bullet('BreadcrumbList — gezinme ekmek kırıntılarını işaretler.'),
        bullet('Person / Organization — yazar ve yayıncı bilgilerini işaretler; EEAT sinyalleri için kritik.'),

        heading('Makale Şeması Uygulaması', 'h2'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "TechArticle",\n  "headline": "Yapay Zeka Motorları için Yapılandırılmış Veri",\n  "datePublished": "2025-09-01",\n  "dateModified": "2026-04-01",\n  "author": {\n    "@type": "Person",\n    "name": "Ahmet Yılmaz"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "inculva"\n  }\n}\n</script>', 'javascript'),

        heading('FAQPage Şeması', 'h2'),
        p('FAQPage şeması GEO için en güçlü türlerden biridir. Yapay zeka sistemleri S/C kalıplarını tanıyacak şekilde eğitilmiştir ve açık FAQ işaretlemesi bulunan sayfalardan tercihen çıkaracaktır.'),

        heading('Yapılandırılmış Verilerinizi Doğrulama', 'h2'),
        bullet('Google\'ın Zengin Sonuçlar Testi — Google zengin sonuçları için uygunluğu kontrol eder ve şema hatalarını işaretler.'),
        bullet('Schema Markup Validator — schema.org spesifikasyonuna karşı doğrular.'),
        bullet('Google Search Console → İyileştirmeler — indekslenen zengin sonuç türlerini ve hataları gösterir.'),

        heading('Erişilebilirlik ve Yapılandırılmış Veri Uyumu', 'h2'),
        p('En iyi yapılandırılmış veri uygulamaları, sayfanın görünür içeriğini yansıtır — şema açıklaması görünür meta açıklamayla eşleşir, FAQ yanıtları görünür FAQ içeriğiyle eşleşir. Bu uyum hem bir Google gereksinimi hem de bir erişilebilirlik ilkesidir.'),
      ],
    },
    resources: [
      { _key: 'sg7r1', title: 'Google: Introduction to Structured Data', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', source: 'other', language: 'en' },
      { _key: 'sg7r2', title: 'Schema.org: Full Hierarchy', url: 'https://schema.org/docs/full.html', source: 'other', language: 'en' },
      { _key: 'sg7r3', title: 'Google: Rich Results Test', url: 'https://search.google.com/test/rich-results', source: 'other', language: 'en' },
      { _key: 'sg7r4', title: 'MDN: Structured data with JSON-LD', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#adding_structured_data', source: 'mdn', language: 'en' },
      { _key: 'sg7r5', title: 'WebAIM: Structured Data Accessibility', url: 'https://webaim.org/blog/', source: 'webaim', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Structured Data for AI Engines | GEO Guide', metaDescription: 'Use schema.org JSON-LD to make content machine-readable for AI search. Covers Article, FAQPage, HowTo, and BreadcrumbList schema with code examples.' },
      tr: { metaTitle: 'Yapay Zeka Motorları için Yapılandırılmış Veri', metaDescription: 'İçeriği yapay zeka araması için makine tarafından okunabilir hale getirmek için schema.org JSON-LD kullanın. Article, FAQPage ve HowTo şemalarını kapsar.' },
    },
  },

  // ─── GEO 3 ───────────────────────────────────────────────────────────────────
  {
    category: 'geo',
    title: {
      en: 'Content Structure for AI Citability',
      tr: 'Yapay Zeka Alıntılanabilirliği için İçerik Yapısı',
    },
    description: {
      en: 'How to structure your articles and guides so AI engines can accurately extract, summarize, and cite your content in generated responses.',
      tr: 'Yapay zeka motorlarının oluşturulan yanıtlarda içeriğinizi doğru şekilde çıkarabilmesi, özetleyebilmesi ve alıntılayabilmesi için makalelerinizi ve rehberlerinizi nasıl yapılandıracağınız.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'geo3w131' },
      { _type: 'reference', _ref: 'wcag-2-4-10', _key: 'geo3w2410' },
    ],
    content: {
      en: [
        heading('The Extractability Problem', 'h2'),
        p('AI engines do not read pages the way humans do. They extract passages — chunks of text ranging from a sentence to several paragraphs — that are relevant to the query being answered. Whether your content is extracted and cited depends heavily on how it is structured. Well-structured content is extractable content.'),
        p('Three factors determine extractability: semantic clarity (does the HTML structure signal what the content is?), proximity (is the answer close to the question/heading that asks it?), and self-containment (does the passage make sense on its own, without requiring the surrounding context?).'),

        heading('The Inverted Pyramid: Lead with the Answer', 'h2'),
        p('Journalists use the "inverted pyramid" structure: the most important information first, supporting details second, background last. AI citation engines use a similar heuristic. When a retrieval system sees a heading like "What is WCAG AA compliance?" it looks for the answer in the first 1–3 sentences that follow. If those sentences contain the answer, the passage will be extracted. If they contain a preamble about why the topic is important, the system may move on.'),
        p('Apply this at every heading level. Each h2 section should answer the implied question of its heading in the first sentence or two. Each paragraph should begin with its main point.'),
        code('<!-- Bad: buries the answer -->\n## What is WCAG AA compliance?\n\nWeb accessibility has been an increasingly important topic in recent years.\nMany countries have passed laws requiring websites to meet certain standards.\nThere are multiple levels of conformance that organizations can aim for.\nWCAG Level AA is one of these levels...\n\n<!-- Good: leads with the answer -->\n## What is WCAG AA compliance?\n\nWCAG Level AA compliance means a website satisfies all 50 success criteria\nat Levels A and AA of the Web Content Accessibility Guidelines 2.1 or 2.2.\nThis is the legal standard required by the EU Web Accessibility Directive,\nSection 508, and most national accessibility regulations.', 'markdown'),

        heading('Heading Density and Granularity', 'h2'),
        p('Use more headings, not fewer. Each heading is an anchor point for AI extraction. A 1500-word article with only an h1 and three h2s forces the extraction engine to guess which paragraphs belong to which topic. The same article with six h2s and relevant h3 subheadings provides 9+ extraction anchors, each one targeting a specific sub-query.'),
        bullet('Use h2 for major sections; use h3 for sub-topics within a section.'),
        bullet('Write headings as implied questions or direct answers (e.g., "How to Test Keyboard Navigation" or "Keyboard Navigation Testing: Step by Step").'),
        bullet('Keep h2 sections between 150–400 words — short enough to be a coherent extraction unit, long enough to be substantive.'),

        heading('Short Paragraphs and Single-Topic Sentences', 'h2'),
        p('Long paragraphs are extraction nightmares. If a 200-word paragraph covers three different points, an AI extracting 50 words of it will likely get an incomplete or misleading answer. Write short paragraphs of 2–4 sentences, each focused on one idea. This mirrors accessibility best practices for cognitive readability (plain language, chunked content) and is simultaneously better for AI extraction.'),

        heading('Definition Patterns for Maximum Extractability', 'h2'),
        p('AI engines are particularly good at extracting definitional content. Pages that define key terms are frequently cited when users ask "what is X?" questions. Use consistent definition patterns:'),
        bullet('"X is..." — direct definition sentence'),
        bullet('"X refers to..." — explanatory definition'),
        bullet('"The term X means..." — formal definition'),
        bullet('A glossary section at the bottom of a guide with term: definition pairs is extremely extractable.'),
        code('WCAG (Web Content Accessibility Guidelines) is a set of internationally recognized technical standards published by the W3C that define how to make digital content accessible to people with disabilities. The current version, WCAG 2.2, was published in October 2023 and contains 87 success criteria organized into four principles: Perceivable, Operable, Understandable, and Robust.', 'markdown'),

        heading('Tables and Lists as Structured Fact Repositories', 'h2'),
        p('Tables and lists are ideal containers for factual information that AI systems can extract verbatim. A table comparing WCAG versions, a list of countries with digital accessibility laws, or a numbered procedure for running an accessibility audit are highly extractable because they present information in a form that is both human-readable and machine-parseable.'),
        p('Ensure all tables have a <caption> or preceding heading that identifies what the table contains. Ensure lists are preceded by a sentence that introduces their contents. This context helps AI engines attribute the extracted list correctly.'),

        heading('Content Freshness Signals', 'h2'),
        p('AI systems weight recent content higher for queries where recency matters. Signal freshness explicitly:'),
        bullet('Add a "Last updated" date near the top of the article.'),
        bullet('Use dateModified in your Article schema.'),
        bullet('Include version-specific information where relevant (e.g., "As of WCAG 2.2, published October 2023...").'),
        bullet('Periodically review and update guides to reflect new standards, laws, and tools.'),
      ],
      tr: [
        heading('Çıkarılabilirlik Sorunu', 'h2'),
        p('Yapay zeka motorları sayfaları insanların okuduğu gibi okumaz. Sorguya yanıt vermek için geçerli olan pasajları — bir cümleden birkaç paragrafa kadar uzanan metin parçalarını — çıkarırlar. İçeriğinizin çıkarılıp alıntılanması büyük ölçüde nasıl yapılandırıldığına bağlıdır.'),
        p('Üç faktör çıkarılabilirliği belirler: semantik netlik, yakınlık (yanıt onu soran başlığa ne kadar yakın?) ve kendi kendine yeterlilik (pasaj bağlamı olmadan anlamlı mı?).'),

        heading('Ters Piramit: Yanıtla Başlayın', 'h2'),
        p('Gazeteciler "ters piramit" yapısını kullanır: önce en önemli bilgi, sonra destekleyici detaylar, son olarak arka plan. Yapay zeka alıntı motorları benzer bir sezgisel yöntem kullanır. Her h2 bölümü, ilk bir iki cümlede başlığının ima ettiği soruyu yanıtlamalıdır.'),

        heading('Başlık Yoğunluğu ve Ayrıntı Düzeyi', 'h2'),
        p('Daha az değil, daha fazla başlık kullanın. Her başlık yapay zeka çıkarımı için bir çapa noktasıdır. Altı h2 ve ilgili h3 alt başlıklarına sahip bir makale, her biri belirli bir alt sorguyu hedefleyen 9+ çıkarım çapası sağlar.'),
        bullet('Ana bölümler için h2, bir bölüm içindeki alt konular için h3 kullanın.'),
        bullet('Başlıkları ima edilen sorular veya doğrudan yanıtlar olarak yazın.'),
        bullet('h2 bölümlerini 150–400 kelime arasında tutun.'),

        heading('Kısa Paragraflar ve Tek Konulu Cümleler', 'h2'),
        p('Uzun paragraflar çıkarım kabusudur. 2–4 cümlelik, her biri tek bir fikre odaklanmış kısa paragraflar yazın. Bu, bilişsel okunabilirlik için erişilebilirlik en iyi uygulamalarını yansıtır ve aynı zamanda yapay zeka çıkarımı için daha iyidir.'),

        heading('Maksimum Çıkarılabilirlik için Tanım Kalıpları', 'h2'),
        bullet('"X şudur..." — doğrudan tanım cümlesi'),
        bullet('"X, ... anlamına gelir" — açıklayıcı tanım'),
        bullet('"X terimi ... anlamına gelir" — resmi tanım'),

        heading('Yapılandırılmış Olgu Depoları Olarak Tablolar ve Listeler', 'h2'),
        p('Tablolar ve listeler, yapay zeka sistemlerinin aynen çıkarabileceği olgusal bilgi için ideal kaplardır. Tüm tabloların içerdiklerini tanımlayan bir <caption> veya önceki başlık içerdiğinden emin olun.'),

        heading('İçerik Tazelik Sinyalleri', 'h2'),
        bullet('Makalenin üst kısmına bir "Son güncelleme" tarihi ekleyin.'),
        bullet('Article şemanızda dateModified kullanın.'),
        bullet('Gerektiğinde sürüme özgü bilgi ekleyin (örn. "WCAG 2.2\'de, Ekim 2023\'te yayımlandı...").'),
        bullet('Yeni standartları, yasaları ve araçları yansıtmak için rehberleri periyodik olarak gözden geçirin ve güncelleyin.'),
      ],
    },
    resources: [
      { _key: 'sg8r1', title: 'Google: Write helpful content', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', source: 'other', language: 'en' },
      { _key: 'sg8r2', title: 'W3C WAI: Writing for Web Accessibility', url: 'https://www.w3.org/WAI/tips/writing/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg8r3', title: 'Nielsen Norman Group: Plain Language', url: 'https://www.nngroup.com/articles/plain-language-summaries/', source: 'other', language: 'en' },
      { _key: 'sg8r4', title: 'WebAIM: Writing Clearly and Simply', url: 'https://webaim.org/techniques/writing/', source: 'webaim', language: 'en' },
      { _key: 'sg8r5', title: 'Moz: Content Quality Guide', url: 'https://moz.com/learn/seo/on-page-factors', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Content Structure for AI Citability | GEO', metaDescription: 'Structure articles so AI engines can extract and cite them. Covers inverted pyramid writing, heading density, short paragraphs, definition patterns, and freshness signals.' },
      tr: { metaTitle: 'Yapay Zeka Alıntılanabilirliği için İçerik Yapısı', metaDescription: 'Yapay zeka motorlarının içeriği çıkarıp alıntılayabilmesi için makaleleri yapılandırın. Ters piramit yazımı, başlık yoğunluğu ve tazelik sinyallerini kapsar.' },
    },
  },

  // ─── GEO 4 ───────────────────────────────────────────────────────────────────
  {
    category: 'geo',
    title: {
      en: 'EEAT and Accessibility Signals',
      tr: 'EEAT ve Erişilebilirlik Sinyalleri',
    },
    description: {
      en: 'How Google\'s Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) framework intersects with web accessibility, and how accessibility signals strengthen your EEAT profile.',
      tr: 'Google\'ın Deneyim, Uzmanlık, Otorite ve Güvenilirlik (EEAT) çerçevesinin web erişilebilirliğiyle nasıl kesiştiği ve erişilebilirlik sinyallerinin EEAT profilinizi nasıl güçlendirdiği.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-3-1-1', _key: 'geo4w311' },
      { _type: 'reference', _ref: 'wcag-2-4-2', _key: 'geo4w242' },
    ],
    content: {
      en: [
        heading('What Is EEAT and Why It Matters for AI Search', 'h2'),
        p('EEAT stands for Experience, Expertise, Authoritativeness, and Trustworthiness. It is the framework Google\'s Quality Raters use to evaluate the quality of web content, and it increasingly influences how AI systems assess content credibility. For YMYL (Your Money or Your Life) topics — including health, legal, financial, and accessibility guidance — EEAT signals are critical ranking and citation factors.'),
        p('Accessibility content is a YMYL-adjacent topic: incorrect guidance about accessibility compliance can result in legal liability, exclusion of disabled users, and real harm. This means Google and AI engines apply heightened scrutiny to accessibility guides. Building strong EEAT signals is not optional for an accessibility knowledge base — it is essential.'),

        heading('Experience: Demonstrating First-Hand Knowledge', 'h2'),
        p('The "E" for Experience (added in the 2022 update to E-A-T) rewards content that demonstrates actual hands-on experience with the topic. For accessibility content, this means:'),
        bullet('Including real code examples from actual implementations, not hypothetical code.'),
        bullet('Referencing specific tools and their real behaviors (e.g., "NVDA with Firefox reads aria-live regions in this specific way...").'),
        bullet('Discussing edge cases and real-world complications, not just textbook definitions.'),
        bullet('Sharing audit findings, case studies, or before/after comparisons from real projects.'),
        p('Content written by someone who has never run an accessibility audit will lack the specificity and nuance that quality raters and AI systems look for. If your team has direct accessibility testing experience, surface it clearly in your content.'),

        heading('Expertise: Author Credentials and Topical Authority', 'h2'),
        p('Expertise signals include:'),
        bullet('Author bylines with linked author pages that include credentials, certifications (IAAP CPACC, WAS), and professional background.'),
        bullet('Citations of primary sources: link to the W3C WCAG specification, peer-reviewed research, and official government accessibility guidance.'),
        bullet('Correct use of technical terminology — imprecise language is a credibility red flag.'),
        bullet('Topical depth — covering WCAG criteria accurately, including the normative language and failure criteria.'),
        p('Schema markup supports expertise signals. Use Person schema for authors with knowsAbout and hasCredential properties. Use Organization schema with foundingDate, areaServed, and description fields.'),

        heading('Authoritativeness: Backlinks, Citations, and Brand', 'h2'),
        p('Authoritativeness is primarily a function of who else on the web refers to you as a source. For an accessibility knowledge base, target these citation sources:'),
        bullet('Backlinks from W3C WAI, Deque, WebAIM, A11y Project, and similar accessibility authorities.'),
        bullet('Mentions in accessibility Slack communities, forums, and newsletters.'),
        bullet('Guest posts on authoritative sites that link back to your knowledge base.'),
        bullet('Being cited in accessibility audit reports, legal documents, or procurement checklists.'),
        p('From an accessibility perspective: a site that publishes correct, comprehensive accessibility guidance will naturally attract backlinks from the community it serves. Quality content is the foundation of authoritativeness.'),

        heading('Trustworthiness: Transparency and Accuracy', 'h2'),
        p('Trust signals that AI systems and quality raters assess include:'),
        bullet('An accurate accessibility statement on your own site — practicing what you preach.'),
        bullet('Clear contact information and a privacy policy.'),
        bullet('Publication dates and last-updated dates on all content.'),
        bullet('A clear correction policy — if information changes (WCAG versions update, laws change), update the content and note the change.'),
        bullet('No misleading claims — do not overstate the comprehensiveness of automated testing tools or the simplicity of compliance.'),

        heading('Accessibility as a Trust Signal', 'h2'),
        p('An accessibility-focused site that itself has accessibility barriers is a significant credibility problem. Would you trust a cybersecurity firm whose own site had known vulnerabilities? AI quality systems increasingly evaluate whether a site\'s actual implementation matches its claimed expertise. Run regular accessibility audits on your own site and prominently display your conformance level or VPAT.'),
        p('Publishing your own accessibility conformance report and linking to it from your knowledge base guides demonstrates intellectual honesty and strengthens every dimension of EEAT.'),
      ],
      tr: [
        heading('EEAT Nedir ve Yapay Zeka Araması için Neden Önemlidir', 'h2'),
        p('EEAT, Deneyim, Uzmanlık, Otorite ve Güvenilirlik anlamına gelir. Google\'ın Kalite Değerlendircilerinin web içeriğinin kalitesini değerlendirmek için kullandığı çerçevedir. Erişilebilirlik içeriği YMYL\'ye yakın bir konudur: erişilebilirlik uyumluluğu hakkında yanlış rehberlik yasal yükümlülüğe, engelli kullanıcıların dışlanmasına ve gerçek zarara yol açabilir.'),

        heading('Deneyim: Uygulamalı Bilgiyi Göstermek', 'h2'),
        bullet('Gerçek uygulamalardan gerçek kod örnekleri ekleyin.'),
        bullet('Belirli araçlara ve gerçek davranışlarına atıfta bulunun.'),
        bullet('Ders kitabı tanımlarından değil, kenar durumları ve gerçek dünya komplikasyonlarından bahsedin.'),
        bullet('Gerçek projelerden denetim bulguları, vaka çalışmaları veya öncesi/sonrası karşılaştırmalar paylaşın.'),

        heading('Uzmanlık: Yazar Kimlik Bilgileri ve Konusal Otorite', 'h2'),
        bullet('Kimlik bilgileri, sertifikalar (IAAP CPACC, WAS) ve profesyonel geçmişi içeren bağlantılı yazar sayfalarıyla yazar imzaları ekleyin.'),
        bullet('Birincil kaynakları alıntılayın: W3C WCAG spesifikasyonuna, hakemli araştırmalara bağlantı verin.'),
        bullet('Teknik terminolojiyi doğru kullanın — belirsiz dil güvenilirlik açısından kırmızı bayraktır.'),

        heading('Otorite: Geri Bağlantılar, Alıntılar ve Marka', 'h2'),
        bullet('W3C WAI, Deque, WebAIM ve A11y Project gibi erişilebilirlik otoritelerinden geri bağlantılar hedefleyin.'),
        bullet('Erişilebilirlik Slack topluluklarında, forumlarda ve bültenlerde bahsedilme.'),
        bullet('Erişilebilirlik denetim raporlarında, yasal belgelerde alıntılanma.'),

        heading('Güvenilirlik: Şeffaflık ve Doğruluk', 'h2'),
        bullet('Kendi sitenizde doğru bir erişilebilirlik beyanı — söylediğinizi uygulamak.'),
        bullet('Tüm içeriklerde yayın tarihleri ve son güncellenme tarihleri.'),
        bullet('Otomatik test araçlarının kapsamlılığını veya uyumluluğun basitliğini abartmayın.'),

        heading('Güven Sinyali Olarak Erişilebilirlik', 'h2'),
        p('Kendisi erişilebilirlik engelleri olan erişilebilirlik odaklı bir site önemli bir güvenilirlik sorunudur. Kendi sitenizde düzenli erişilebilirlik denetimleri yapın ve uyumluluk düzeyinizi veya VPAT\'ınızı belirgin şekilde görüntüleyin. Kendi erişilebilirlik uyumluluk raporunuzu yayımlamak ve buna bilgi tabanı rehberlerinizden bağlantı vermek entelektüel dürüstlük gösterir.'),
      ],
    },
    resources: [
      { _key: 'sg9r1', title: 'Google: E-E-A-T and Search Quality', url: 'https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t', source: 'other', language: 'en' },
      { _key: 'sg9r2', title: 'Google Search Quality Rater Guidelines', url: 'https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf', source: 'other', language: 'en' },
      { _key: 'sg9r3', title: 'Moz: E-E-A-T Guide', url: 'https://moz.com/blog/eeat-seo', source: 'other', language: 'en' },
      { _key: 'sg9r4', title: 'W3C WAI: Accessibility Conformance Reports', url: 'https://www.w3.org/WAI/planning/statements/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg9r5', title: 'IAAP: Certified Professional in Accessibility', url: 'https://www.accessibilityassociation.org/s/certified-professional', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'EEAT and Accessibility Signals for AI Search', metaDescription: 'How Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) applies to accessibility content. Build credibility signals that improve AI citability.' },
      tr: { metaTitle: 'EEAT ve Erişilebilirlik Sinyalleri', metaDescription: 'Deneyim, Uzmanlık, Otorite ve Güvenilirlik (EEAT) çerçevesinin erişilebilirlik içeriğine nasıl uygulandığını öğrenin. Yapay zeka alıntılanabilirliğini artırın.' },
    },
  },

  // ─── AEO 1 ───────────────────────────────────────────────────────────────────
  {
    category: 'aeo',
    title: {
      en: 'Answer Engine Optimization Fundamentals',
      tr: 'Yanıt Motoru Optimizasyonu Temelleri',
    },
    description: {
      en: 'Master the fundamentals of AEO — writing content that gets selected as the direct answer in featured snippets, People Also Ask boxes, and AI-powered answer engines.',
      tr: 'AEO\'nun temellerinde uzmanlaşın — öne çıkan snippet\'lerde, İnsanlar Ayrıca Sorar kutularında ve yapay zeka destekli yanıt motorlarında doğrudan yanıt olarak seçilen içerik yazma.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-2-4-6', _key: 'aeo1w246' },
      { _type: 'reference', _ref: 'wcag-3-1-5', _key: 'aeo1w315' },
    ],
    content: {
      en: [
        heading('What Is Answer Engine Optimization', 'h2'),
        p('Answer Engine Optimization (AEO) is the practice of formatting and writing content so that search engines select it as the definitive answer to a specific question, displaying it as a featured snippet, a People Also Ask result, a voice search response, or an AI-generated summary. Unlike traditional SEO which focuses on ranking, AEO focuses on being chosen as the answer — "position zero" above the ranked results.'),
        p('AEO is the middle layer between traditional SEO (ranking) and GEO (AI citation). A page that ranks in the top 5 results is eligible for featured snippets; a featured snippet is more likely to be used as a retrieval source by AI search tools. Strong AEO feeds strong GEO.'),

        heading('Types of Featured Snippets', 'h2'),
        p('Google offers several snippet formats, each requiring a different content structure:'),
        bullet('Paragraph snippets — a 40–60 word definition or answer. Triggered by "what is", "how does", "why is" queries. Requires a direct, concise answer paragraph.'),
        bullet('List snippets — an ordered or unordered list. Triggered by "how to", "steps to", "ways to", "best X for Y" queries. Requires proper <ol> or <ul> markup.'),
        bullet('Table snippets — a data table. Triggered by comparison queries ("X vs Y"), price queries, or specification queries. Requires proper <table> markup with headers.'),
        bullet('Video snippets — a video clip at a specific timestamp. Triggered by tutorial queries. Requires a YouTube video with proper timestamps and metadata.'),

        heading('Writing for Paragraph Snippets', 'h2'),
        p('The paragraph snippet formula is: heading that matches a common question + 40–60 word direct answer in the first paragraph below that heading. The answer must stand alone without needing the surrounding page context. It should define the term, explain the concept, or answer the question directly.'),
        code('## What is WCAG conformance?\n\nWCAG conformance means a website meets the technical success criteria\ndefined in the Web Content Accessibility Guidelines published by the W3C.\nConformance is measured at three levels — A, AA, and AAA — with Level AA\nbeing the standard required by most accessibility laws globally,\nincluding the EU Web Accessibility Directive and the ADA in the US.', 'markdown'),

        heading('Writing for List Snippets', 'h2'),
        p('List snippets are triggered by procedural and enumeration queries. To win them, your list must be the most complete and clearly structured answer to the query. Google typically shows 5–8 list items in a snippet and links to the full page for more. Use <ol> for steps (order matters) and <ul> for non-sequential features or criteria.'),
        bullet('Introduce the list with a sentence that uses the query keyword.'),
        bullet('Keep each list item concise — 5–12 words per item is ideal for snippet display.'),
        bullet('Order items logically: most important first for unordered lists, sequential order for procedures.'),
        bullet('Aim for 6–10 items — enough to appear comprehensive, not so many that the list is unwieldy.'),

        heading('Question-Targeting: The Core AEO Strategy', 'h2'),
        p('AEO requires knowing exactly what questions your target users ask. Use these sources to find question-targeting opportunities:'),
        bullet('Google\'s "People Also Ask" boxes — expand them on your target queries to find related questions.'),
        bullet('Google Search Console — find queries where you rank in positions 4–15 (near-miss opportunities).'),
        bullet('AnswerThePublic, AlsoAsked — visualize the question universe around a topic.'),
        bullet('Keyword tools with question filters — Ahrefs, SEMrush, and Moz all support question keyword filtering.'),
        p('Once you have your target questions, create a heading for each question and a direct answer paragraph immediately below it. This structure wins paragraph snippets and also populates FAQPage schema answers naturally.'),

        heading('AEO and Accessibility: Plain Language Is the Shared Goal', 'h2'),
        p('WCAG 3.1.5 (Reading Level) recommends that content be readable at the lower secondary education level, or supplemented with simpler text. Plain language is also the hallmark of strong AEO content: short sentences, active voice, common vocabulary, no jargon without definition. The same content that is easiest for people with cognitive disabilities to read is also most likely to be selected as a featured snippet answer.'),
        p('Concretely: write every answer paragraph as if explaining to a competent person who is new to the topic. Avoid acronyms without expansion. Define technical terms in the same sentence. Use 15–20 word sentences on average. These habits serve accessibility and AEO simultaneously.'),

        heading('Voice Search and AEO', 'h2'),
        p('Voice search responses are almost always pulled from featured snippets or knowledge graph entries. Optimizing for voice means optimizing for AEO. Voice queries are conversational and often phrased as complete questions ("How do I test a website for accessibility?") rather than keyword fragments ("accessibility testing"). Target full-question phrasings in your headings alongside the shorter keyword variations.'),
      ],
      tr: [
        heading('Yanıt Motoru Optimizasyonu Nedir', 'h2'),
        p('Yanıt Motoru Optimizasyonu (AEO), arama motorlarının belirli bir soruya kesin yanıt olarak seçmesi için içeriği biçimlendirme ve yazma pratiğidir. Geleneksel SEO sıralamaya odaklanırken, AEO yanıt olarak seçilmeye — sıralanan sonuçların üzerindeki "sıfır konuma" — odaklanır.'),
        p('AEO, geleneksel SEO ile GEO arasındaki orta katmandır. İlk 5 sonuçta sıralanan bir sayfa öne çıkan snippet\'ler için uygundur; öne çıkan snippet, yapay zeka arama araçları tarafından alma kaynağı olarak kullanılma olasılığı daha yüksektir.'),

        heading('Öne Çıkan Snippet Türleri', 'h2'),
        bullet('Paragraf snippet\'leri — 40–60 kelimelik tanım veya yanıt. "Nedir", "nasıl çalışır", "neden" sorguları tarafından tetiklenir.'),
        bullet('Liste snippet\'leri — sıralı veya sırasız liste. "Nasıl yapılır", "adımlar", "yollar" sorguları tarafından tetiklenir.'),
        bullet('Tablo snippet\'leri — veri tablosu. Karşılaştırma, fiyat veya özellik sorguları tarafından tetiklenir.'),

        heading('Paragraf Snippet\'leri için Yazma', 'h2'),
        p('Paragraf snippet formülü şudur: yaygın bir soruyla eşleşen başlık + o başlığın hemen altındaki ilk paragrafta 40–60 kelimelik doğrudan yanıt. Yanıt, çevreleyen sayfa bağlamına ihtiyaç duymadan bağımsız olarak anlamlı olmalıdır.'),

        heading('Liste Snippet\'leri için Yazma', 'h2'),
        bullet('Listeyi sorgu anahtar kelimesini kullanan bir cümleyle tanıtın.'),
        bullet('Her liste öğesini kısa tutun — snippet görüntüsü için öğe başına 5–12 kelime idealdir.'),
        bullet('6–10 öğe hedefleyin.'),

        heading('Soru Hedefleme: Temel AEO Stratejisi', 'h2'),
        p('AEO, hedef kullanıcılarınızın tam olarak hangi soruları sorduğunu bilmeyi gerektirir. Google\'ın "İnsanlar Ayrıca Sorar" kutularını, Google Search Console\'u ve AnswerThePublic gibi araçları kullanın. Hedef sorularınızı bulduktan sonra her soru için bir başlık ve hemen altında doğrudan yanıt paragrafı oluşturun.'),

        heading('AEO ve Erişilebilirlik: Sade Dil Ortak Hedeftir', 'h2'),
        p('WCAG 3.1.5, içeriğin alt ortaöğretim düzeyinde okunabilir olmasını veya daha basit metinle desteklenmesini tavsiye eder. Sade dil aynı zamanda güçlü AEO içeriğinin özelliğidir: kısa cümleler, etkin ses, yaygın kelime dağarcığı. Bilişsel engelli kişilerin okumaya en kolay bulduğu içerik, aynı zamanda öne çıkan snippet yanıtı olarak seçilme olasılığı en yüksek içeriktir.'),

        heading('Sesli Arama ve AEO', 'h2'),
        p('Sesli arama yanıtları neredeyse her zaman öne çıkan snippet\'lerden veya bilgi grafiği girdilerinden alınır. Sesli arama sorguları konuşma dilidir ve genellikle anahtar kelime parçaları yerine tam sorular olarak ifade edilir. Başlıklarınızda daha kısa anahtar kelime varyasyonlarının yanı sıra tam soru ifadelerini hedefleyin.'),
      ],
    },
    resources: [
      { _key: 'sg10r1', title: 'Google: Featured Snippets', url: 'https://developers.google.com/search/docs/appearance/featured-snippets', source: 'other', language: 'en' },
      { _key: 'sg10r2', title: 'Moz: Featured Snippet Guide', url: 'https://moz.com/learn/seo/featured-snippets', source: 'other', language: 'en' },
      { _key: 'sg10r3', title: 'WCAG 3.1.5: Reading Level', url: 'https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg10r4', title: 'WebAIM: Writing Clearly and Simply', url: 'https://webaim.org/techniques/writing/', source: 'webaim', language: 'en' },
      { _key: 'sg10r5', title: 'AnswerThePublic', url: 'https://answerthepublic.com/', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Answer Engine Optimization Fundamentals', metaDescription: 'Win featured snippets, People Also Ask results, and voice search answers. Learn paragraph, list, and table snippet optimization with WCAG-aligned plain language.' },
      tr: { metaTitle: 'Yanıt Motoru Optimizasyonu Temelleri', metaDescription: 'Öne çıkan snippet\'leri, İnsanlar Ayrıca Sorar sonuçlarını ve sesli arama yanıtlarını kazanın. Paragraf, liste ve tablo snippet optimizasyonunu öğrenin.' },
    },
  },

  // ─── AEO 2 ───────────────────────────────────────────────────────────────────
  {
    category: 'aeo',
    title: {
      en: 'Featured Snippets and Accessibility',
      tr: 'Öne Çıkan Snippet\'ler ve Erişilebilirlik',
    },
    description: {
      en: 'How accessible content structures — semantic headings, lists, and tables — directly improve your chances of winning featured snippets in Google Search.',
      tr: 'Erişilebilir içerik yapılarının — semantik başlıklar, listeler ve tablolar — Google Arama\'da öne çıkan snippet kazanma şansınızı nasıl doğrudan artırdığı.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'aeo2w131' },
      { _type: 'reference', _ref: 'wcag-2-4-6', _key: 'aeo2w246' },
    ],
    content: {
      en: [
        heading('The Accessibility–Snippet Connection', 'h2'),
        p('Featured snippets are Google\'s attempt to answer questions directly in the SERP. To do this, Google extracts passages from web pages — and the pages it extracts from are overwhelmingly well-structured, semantically marked up, and clearly written. These are precisely the properties that WCAG requires for accessible content.'),
        p('This is not a correlation: it is a causal relationship. Google\'s snippet extraction algorithm looks for the same structural signals that screen readers rely on: heading hierarchy to identify question/answer pairs, list markup to identify enumerable items, and table markup to identify comparative data. Investing in accessibility directly improves snippet eligibility.'),

        heading('How Google Extracts Snippet Content', 'h2'),
        p('Google\'s snippet extraction uses a combination of:'),
        bullet('Heading proximity — the passage immediately following an h2 or h3 that matches the query is the primary extraction candidate.'),
        bullet('Semantic markup signals — <ul>, <ol>, <table>, <dl> elements signal structured, extractable content.'),
        bullet('Passage relevance — the passage must contain the query terms and related vocabulary (LSI keywords).'),
        bullet('Page authority — higher-authority pages win snippets more frequently, but a lower-authority page with better structure can beat a higher-authority page with poor structure.'),
        bullet('Content freshness — recently updated pages are preferred for time-sensitive topics.'),

        heading('Paragraph Snippet Optimization Checklist', 'h2'),
        p('To maximize paragraph snippet eligibility:'),
        numbered('Write a heading that exactly matches or closely paraphrases a common query.'),
        numbered('Write a 40–60 word answer paragraph as the first content block under that heading.'),
        numbered('The answer should define the concept, state the fact, or answer the question directly.'),
        numbered('Do not include caveats, disclaimers, or preamble in the first paragraph — save those for later in the section.'),
        numbered('Use the query keyword and semantically related terms in the answer paragraph.'),
        numbered('Ensure the heading is an h2 or h3 (not h4 or below — these are rarely extracted for snippets).'),

        heading('List Snippet Optimization', 'h2'),
        p('List snippets are awarded to content that answers "how to", "steps", "types of", "best practices for", and "ways to" queries. They are one of the most powerful snippet types because they occupy significant SERP real estate and establish your content as the definitive answer.'),
        p('Structural requirements for list snippets:'),
        bullet('Use a proper <ol> or <ul> element — not a visual list created with dashes or asterisks in a paragraph.'),
        bullet('Precede the list with a heading that uses the query keyword.'),
        bullet('Keep each list item to one concept — do not pack multiple ideas into a single item.'),
        bullet('For "how to" queries, use an <ol> (ordered) to signal that sequence matters.'),
        bullet('For "types of" or "best practices" queries, use a <ul> (unordered).'),
        bullet('Aim for 6–8 items — Google typically shows 4–8 items before truncating with a "More items" link.'),

        heading('Table Snippet Optimization', 'h2'),
        p('Table snippets appear for comparison queries ("X vs Y"), pricing queries, version comparison queries, and any query where data is best presented in rows and columns. They are the most visually distinctive snippet type and can dramatically increase click-through rate.'),
        code('<!-- Table structured for snippet extraction -->\n<h2>WCAG 2.1 vs WCAG 2.2: Key Differences</h2>\n<table>\n  <caption>Comparison of WCAG 2.1 and WCAG 2.2 success criteria</caption>\n  <thead>\n    <tr>\n      <th scope="col">Feature</th>\n      <th scope="col">WCAG 2.1</th>\n      <th scope="col">WCAG 2.2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td>Published</td><td>June 2018</td><td>October 2023</td></tr>\n    <tr><td>New criteria</td><td>17 new (vs 2.0)</td><td>9 new (vs 2.1)</td></tr>\n    <tr><td>Total AA criteria</td><td>50</td><td>55</td></tr>\n    <tr><td>Removed criteria</td><td>None</td><td>4.1.1 Parsing (removed)</td></tr>\n  </tbody>\n</table>', 'html'),

        heading('Definition Lists for Technical Glossaries', 'h2'),
        p('<dl> (definition list) elements are semantically ideal for glossary content — term/definition pairs that appear in accessibility guides, legal references, and technical documentation. Google extracts definition list content for "what does X mean" queries, and screen readers announce them with the correct "term/definition" context.'),
        code('<dl>\n  <dt>WCAG</dt>\n  <dd>Web Content Accessibility Guidelines — a set of technical standards published by the W3C that define how to make digital content accessible to people with disabilities.</dd>\n\n  <dt>ARIA</dt>\n  <dd>Accessible Rich Internet Applications — a W3C specification that defines attributes for enriching HTML elements with accessibility semantics, particularly for dynamic and interactive content.</dd>\n\n  <dt>axe-core</dt>\n  <dd>An open-source JavaScript library developed by Deque Systems for automated accessibility testing. It powers axe DevTools, Lighthouse, and many CI/CD testing pipelines.</dd>\n</dl>', 'html'),

        heading('Monitoring Your Snippet Performance', 'h2'),
        p('Track snippet wins and losses in Google Search Console: filter queries by average position and look for keywords where you rank 1–3 (you may already have a snippet) or 4–10 (you are near-miss). The "Search Appearance" filter in Search Console does not directly show featured snippets, but a sudden spike in impressions with CTR drop often indicates a competitor\'s snippet displaced your result.'),
        p('Use SERP tracking tools like Ahrefs, SEMrush, or STAT to monitor featured snippet ownership by keyword. Set up weekly alerts for your primary accessibility topic keywords.'),
      ],
      tr: [
        heading('Erişilebilirlik–Snippet Bağlantısı', 'h2'),
        p('Öne çıkan snippet\'ler, Google\'ın soruları doğrudan SERP\'de yanıtlama girişimidir. Google\'ın snippet çıkarma algoritması, ekran okuyucuların güvendiği yapısal sinyallerin aynısını arar: soru/cevap çiftlerini belirlemek için başlık hiyerarşisi, sıralanabilir öğeleri belirlemek için liste işaretlemesi ve karşılaştırmalı verileri belirlemek için tablo işaretlemesi.'),

        heading('Google Snippet İçeriğini Nasıl Çıkarır', 'h2'),
        bullet('Başlık yakınlığı — sorguyla eşleşen bir h2 veya h3\'ün hemen ardından gelen pasaj birincil çıkarım adayıdır.'),
        bullet('Semantik işaretleme sinyalleri — <ul>, <ol>, <table>, <dl> öğeleri yapılandırılmış içeriği işaret eder.'),
        bullet('İçerik tazeliği — zaman duyarlı konular için yakın zamanda güncellenen sayfalar tercih edilir.'),

        heading('Paragraf Snippet Optimizasyonu Kontrol Listesi', 'h2'),
        numbered('Yaygın bir sorguyla tam eşleşen veya yakından parafraz eden bir başlık yazın.'),
        numbered('O başlığın altındaki ilk içerik bloğu olarak 40–60 kelimelik bir yanıt paragrafı yazın.'),
        numbered('Yanıt kavramı tanımlamalı, gerçeği belirtmeli veya soruyu doğrudan yanıtlamalıdır.'),
        numbered('İlk paragrafta uyarı, sorumluluk reddi veya önsöz eklemeyin.'),

        heading('Liste Snippet Optimizasyonu', 'h2'),
        bullet('Görsel liste için tire veya yıldız kullanmayın; düzgün <ol> veya <ul> öğesi kullanın.'),
        bullet('Listeyi sorgu anahtar kelimesini kullanan bir başlıkla önceleyin.'),
        bullet('Her liste öğesini tek bir kavrama sınırlayın.'),
        bullet('Google genellikle "Daha fazla öğe" bağlantısından önce 4–8 öğe gösterir.'),

        heading('Tablo Snippet Optimizasyonu', 'h2'),
        p('Tablo snippet\'leri karşılaştırma sorguları için görünür. En görsel olarak ayırt edici snippet türüdür ve tıklama oranını önemli ölçüde artırabilir. Tablo başlığını içeriği tanımlayan bir caption veya h2 ile önceleyin.'),

        heading('Teknik Sözlükler için Tanım Listeleri', 'h2'),
        p('<dl> (tanım listesi) öğeleri, terim/tanım çiftleri için semantik açıdan idealdir. Google, "X ne anlama gelir" sorguları için tanım listesi içeriğini çıkarır ve ekran okuyucular bunları doğru "terim/tanım" bağlamıyla duyurur.'),

        heading('Snippet Performansınızı İzleme', 'h2'),
        p('Google Search Console\'da snippet kazanımlarını ve kayıplarını takip edin. Ahrefs, SEMrush veya STAT gibi SERP takip araçlarını kullanarak anahtar kelimeye göre öne çıkan snippet sahipliğini izleyin.'),
      ],
    },
    resources: [
      { _key: 'sg11r1', title: 'Google: How Featured Snippets Work', url: 'https://developers.google.com/search/docs/appearance/featured-snippets', source: 'other', language: 'en' },
      { _key: 'sg11r2', title: 'Ahrefs: Featured Snippets Study', url: 'https://ahrefs.com/blog/featured-snippets-study/', source: 'other', language: 'en' },
      { _key: 'sg11r3', title: 'W3C WAI: Tables Tutorial', url: 'https://www.w3.org/WAI/tutorials/tables/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg11r4', title: 'MDN: Definition list', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl', source: 'mdn', language: 'en' },
      { _key: 'sg11r5', title: 'WebAIM: Lists', url: 'https://webaim.org/techniques/lists/', source: 'webaim', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Featured Snippets and Accessibility', metaDescription: 'Accessible HTML structures win featured snippets. Learn how headings, lists, tables, and definition lists maximize snippet eligibility in Google Search.' },
      tr: { metaTitle: 'Öne Çıkan Snippet\'ler ve Erişilebilirlik', metaDescription: 'Erişilebilir HTML yapıları öne çıkan snippet\'ler kazanır. Başlıklar, listeler, tablolar ve tanım listelerinin snippet uygunluğunu nasıl artırdığını öğrenin.' },
    },
  },

  // ─── AEO 3 ───────────────────────────────────────────────────────────────────
  {
    category: 'aeo',
    title: {
      en: 'FAQ Schema Implementation Guide',
      tr: 'FAQ Şeması Uygulama Rehberi',
    },
    description: {
      en: 'A complete guide to implementing FAQPage schema markup — from writing accessible Q&A content to adding JSON-LD, validating it, and monitoring rich result performance.',
      tr: 'FAQPage şema işaretlemesi uygulamak için kapsamlı bir rehber — erişilebilir S/C içeriği yazmaktan JSON-LD eklemeye, doğrulamaya ve zengin sonuç performansını izlemeye kadar.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'aeo3w131' },
      { _type: 'reference', _ref: 'wcag-4-1-2', _key: 'aeo3w412' },
    ],
    content: {
      en: [
        heading('Why FAQ Schema Matters for AEO and Accessibility', 'h2'),
        p('FAQPage schema is a structured data type that tells search engines a page contains questions and their answers. When implemented correctly, Google may display your FAQ content as expandable rich results directly in the SERP, showing each question as a clickable accordion that reveals the answer. This dramatically increases SERP real estate and click-through rate.'),
        p('For AEO, FAQ schema is one of the most powerful tools available: it directly surfaces your content as answers to specific questions, and AI tools like Perplexity and Google AI Overviews preferentially extract from FAQ-structured content. For accessibility, accordion-based FAQ implementations require careful ARIA implementation to be operable by keyboard and screen reader users.'),

        heading('Writing Effective FAQ Content First', 'h2'),
        p('Schema is only as valuable as the content it describes. Before adding FAQPage markup, write high-quality Q&A pairs:'),
        bullet('Use questions that real users ask — mine Google\'s People Also Ask, Search Console queries, customer support tickets, and community forums.'),
        bullet('Write answers that are 50–150 words — long enough to be comprehensive, short enough to be extracted as a snippet.'),
        bullet('Each answer should be self-contained — it should make complete sense without reading the question again or the surrounding page.'),
        bullet('Avoid marketing language in answers — "our industry-leading solution" — factual, helpful answers perform better.'),
        bullet('Include the question\'s key terms in the answer naturally — this improves matching for both search and AI extraction.'),

        heading('Accessible HTML Implementation', 'h2'),
        p('The visible FAQ on the page should use semantic HTML that works without JavaScript and is accessible to screen reader users. The most common pattern is a details/summary element (native HTML disclosure widget) or an ARIA accordion pattern:'),
        code('<!-- Native HTML: details/summary (zero JS required, fully accessible) -->\n<section aria-labelledby="faq-heading">\n  <h2 id="faq-heading">Frequently Asked Questions</h2>\n\n  <details>\n    <summary>What is WCAG Level AA compliance?</summary>\n    <p>WCAG Level AA compliance means a website satisfies all 50 success criteria\n    at Levels A and AA of the Web Content Accessibility Guidelines.\n    This is the standard required by most accessibility laws globally.</p>\n  </details>\n\n  <details>\n    <summary>How long does a WCAG audit take?</summary>\n    <p>A comprehensive WCAG 2.2 AA audit of a mid-size website (50–200 page templates)\n    typically takes 3–5 business days using a combination of automated scanning\n    and manual testing with keyboard and screen reader.</p>\n  </details>\n</section>', 'html'),
        code('<!-- ARIA accordion pattern (when custom styling is required) -->\n<div class="faq">\n  <h3>\n    <button\n      aria-expanded="false"\n      aria-controls="faq-answer-1"\n      id="faq-btn-1"\n    >\n      What is WCAG Level AA compliance?\n    </button>\n  </h3>\n  <div\n    id="faq-answer-1"\n    role="region"\n    aria-labelledby="faq-btn-1"\n    hidden\n  >\n    <p>WCAG Level AA compliance means...</p>\n  </div>\n</div>', 'html'),

        heading('JSON-LD FAQPage Schema', 'h2'),
        p('Add the FAQPage schema as a JSON-LD script tag in the <head> or at the end of the <body>. The schema must accurately reflect the questions and answers visible on the page — never include schema content that is not visible to users.'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "What is WCAG Level AA compliance?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "WCAG Level AA compliance means a website satisfies all 50 success criteria at Levels A and AA of the Web Content Accessibility Guidelines. This is the standard required by most accessibility laws globally, including the EU Web Accessibility Directive, Section 508, and the UK Equality Act."\n      }\n    },\n    {\n      "@type": "Question",\n      "name": "How long does a WCAG audit take?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "A comprehensive WCAG 2.2 AA audit of a mid-size website typically takes 3–5 business days using a combination of automated scanning and manual testing with keyboard navigation and screen reader testing."\n      }\n    }\n  ]\n}\n</script>', 'javascript'),

        heading('Google\'s FAQ Schema Guidelines', 'h2'),
        p('Google has specific guidelines for FAQPage schema eligibility:'),
        bullet('The FAQ content must be visible on the page — schema cannot describe hidden or off-page content.'),
        bullet('The page must be the authoritative source of the FAQ — do not copy Q&As from another site.'),
        bullet('Answers must not be primarily promotional — product comparisons and marketing claims disqualify a page.'),
        bullet('The page must not have duplicate FAQPage schema on multiple pages with identical Q&As.'),
        bullet('FAQ schema is not eligible on forum pages, Q&A sites (like Quora), or pages where users can submit answers.'),

        heading('Validating and Monitoring', 'h2'),
        p('After implementing FAQ schema:'),
        numbered('Test with Google\'s Rich Results Test at search.google.com/test/rich-results.'),
        numbered('Check Google Search Console → Enhancements → FAQ for indexed FAQ pages and any errors.'),
        numbered('Monitor impressions and clicks for FAQ-enhanced pages in Search Console — expect 15–40% CTR increase where rich results are shown.'),
        numbered('Search for your target questions in Google to confirm rich results are displaying.'),
        numbered('Re-validate after any content changes to ensure schema stays in sync with page content.'),
      ],
      tr: [
        heading('FAQ Şeması AEO ve Erişilebilirlik için Neden Önemlidir', 'h2'),
        p('FAQPage şeması, arama motorlarına bir sayfanın sorular ve yanıtları içerdiğini bildiren yapılandırılmış bir veri türüdür. Doğru uygulandığında Google, FAQ içeriğinizi SERP\'de doğrudan genişletilebilir zengin sonuçlar olarak görüntüleyebilir. AEO için FAQ şeması en güçlü araçlardan biridir ve yapay zeka araçları FAQ yapılandırılmış içerikten tercihen çıkarma yapar.'),

        heading('Önce Etkili FAQ İçeriği Yazma', 'h2'),
        bullet('Google\'ın İnsanlar Ayrıca Sorar kutularından, Search Console sorgularından gerçek kullanıcı sorularını kullanın.'),
        bullet('50–150 kelimelik yanıtlar yazın.'),
        bullet('Her yanıt kendi kendine yeterli olmalıdır.'),
        bullet('Yanıtlarda pazarlama dilinden kaçının.'),

        heading('Erişilebilir HTML Uygulaması', 'h2'),
        p('Sayfadaki görünür FAQ, JavaScript olmadan çalışan ve ekran okuyucu kullanıcılarına erişilebilir semantik HTML kullanmalıdır. En yaygın kalıp, details/summary öğesi (yerel HTML açıklama widget\'ı) veya ARIA akordeon kalıbıdır.'),
        code('<!-- Yerel HTML: details/summary (JS gerektirmez, tam erişilebilir) -->\n<section aria-labelledby="sss-baslik">\n  <h2 id="sss-baslik">Sık Sorulan Sorular</h2>\n\n  <details>\n    <summary>WCAG AA uyumluluğu nedir?</summary>\n    <p>WCAG Düzey AA uyumluluğu, bir web sitesinin Web İçeriği Erişilebilirlik\n    Yönergeleri\'nin A ve AA Düzeylerindeki tüm 50 başarı kriterini karşıladığı anlamına gelir.</p>\n  </details>\n</section>', 'html'),

        heading('JSON-LD FAQPage Şeması', 'h2'),
        p('FAQPage şemasını <head> veya <body> sonuna JSON-LD script etiketi olarak ekleyin. Şema, sayfada görünür olan soruları ve yanıtları doğru şekilde yansıtmalıdır — kullanıcılara görünmeyen şema içeriği asla eklemeyin.'),

        heading('Google\'ın FAQ Şema Yönergeleri', 'h2'),
        bullet('FAQ içeriği sayfada görünür olmalıdır.'),
        bullet('Sayfa FAQ\'ın yetkili kaynağı olmalıdır.'),
        bullet('Yanıtlar öncelikle tanıtım amaçlı olmamalıdır.'),
        bullet('Birden fazla sayfada aynı S/C\'lerle yinelenen FAQPage şeması olmamalıdır.'),

        heading('Doğrulama ve İzleme', 'h2'),
        numbered('Google\'ın Zengin Sonuçlar Testi ile test edin.'),
        numbered('Google Search Console → İyileştirmeler → FAQ\'ı kontrol edin.'),
        numbered('Zengin sonuçların gösterildiği FAQ zenginleştirilmiş sayfalar için %15–40 CTR artışı bekleyin.'),
        numbered('İçerik değişikliklerinden sonra şemanın sayfa içeriğiyle senkronize olduğunu doğrulayın.'),
      ],
    },
    resources: [
      { _key: 'sg12r1', title: 'Google: FAQ structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/faqpage', source: 'other', language: 'en' },
      { _key: 'sg12r2', title: 'MDN: details element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details', source: 'mdn', language: 'en' },
      { _key: 'sg12r3', title: 'W3C ARIA: Disclosure Pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg12r4', title: 'W3C ARIA: Accordion Pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg12r5', title: 'Deque: Accessible Accordion', url: 'https://dequeuniversity.com/library/aria/tabpanel', source: 'deque', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'FAQ Schema Implementation Guide for AEO', metaDescription: 'Implement FAQPage schema correctly. Covers accessible HTML, JSON-LD markup, Google\'s eligibility guidelines, validation steps, and CTR impact measurement.' },
      tr: { metaTitle: 'AEO için FAQ Şeması Uygulama Rehberi', metaDescription: 'FAQPage şemasını doğru uygulayın. Erişilebilir HTML, JSON-LD işaretlemesi, Google\'ın uygunluk yönergeleri ve doğrulama adımlarını kapsar.' },
    },
  },

  // ─── AEO 4 ───────────────────────────────────────────────────────────────────
  {
    category: 'aeo',
    title: {
      en: 'Voice Search and Accessibility',
      tr: 'Sesli Arama ve Erişilebilirlik',
    },
    description: {
      en: 'How voice search interfaces relate to web accessibility, and how optimizing for voice search queries improves your AEO performance and inclusion for users with motor disabilities.',
      tr: 'Sesli arama arayüzlerinin web erişilebilirliğiyle nasıl ilişkili olduğu ve sesli arama sorguları için optimizasyonun AEO performansınızı ve motor engelli kullanıcılar için kapsayıcılığı nasıl iyileştirdiği.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-3-1-1', _key: 'aeo4w311' },
      { _type: 'reference', _ref: 'wcag-3-1-5', _key: 'aeo4w315' },
    ],
    content: {
      en: [
        heading('Voice Search as Assistive Technology', 'h2'),
        p('Voice search is both a consumer convenience feature and a critical assistive technology. For users with motor disabilities that prevent keyboard or mouse use, voice interfaces — Google Assistant, Siri, Alexa, Cortana — are primary navigation tools. For users with visual impairments, voice search provides hands-free access to information. For users with dyslexia or reading difficulties, speaking a query is faster and less effortful than typing.'),
        p('This means voice search optimization is not just a marketing tactic — it directly affects the accessibility of information for a significant population of disabled users. Sites that are well-optimized for voice search are sites that deliver accessible answers.'),

        heading('How Voice Search Results Are Selected', 'h2'),
        p('Voice search results for informational queries almost exclusively come from featured snippets. When Google Assistant answers "What is WCAG?", it reads the featured snippet text aloud. When Alexa answers a question, it uses Bing\'s featured answer. This means voice search optimization is a direct extension of featured snippet optimization.'),
        p('The voice-specific differences are:'),
        bullet('Conversational query phrasing — voice queries are full sentences: "How do I make my website accessible?" vs. typed "website accessibility how to".'),
        bullet('Single answer delivery — voice gives one answer, not a list of results. Being the featured snippet means being the only answer.'),
        bullet('Local queries — voice is heavily used for local searches ("accessibility consultant near me"). Ensure your Google Business Profile is complete if relevant.'),
        bullet('Length constraints — voice answers are typically read at 30–45 words. Answers longer than 60 words are truncated. This is shorter than the 60-word paragraph snippet target.'),

        heading('Writing for Voice: Natural Language First', 'h2'),
        p('Voice search queries are conversational. Optimize by targeting full-question headings alongside keyword headings:'),
        code('<!-- Keyword heading (good for text search) -->\n<h2>WCAG Conformance Levels</h2>\n\n<!-- Full-question heading (additional target for voice) -->\n<h2>What are the WCAG conformance levels?</h2>\n\n<!-- Answer written in natural, conversational language -->\n<p>WCAG has three conformance levels: A, AA, and AAA.\nLevel A covers the most critical accessibility barriers.\nLevel AA is required by most accessibility laws and is the standard\nthat organizations typically aim for. Level AAA is the highest standard\nand is generally pursued for specific user groups or content types.</p>', 'html'),
        p('Notice the answer uses plain language, active voice, and defines acronyms in context. This is also exactly what WCAG 3.1.5 (Reading Level) recommends for accessibility.'),

        heading('Local Voice Search and Accessibility Services', 'h2'),
        p('If your organization provides accessibility consulting, auditing, or training services, local voice search optimization is important. Voice assistants pull local results from Google Business Profile. Ensure your profile includes:'),
        bullet('Accurate business category and subcategory (e.g., "Accessibility Consultant", "Software Company").'),
        bullet('Complete address and service area if applicable.'),
        bullet('Business hours, contact number, and website URL.'),
        bullet('A description that naturally incorporates accessibility-related keywords.'),
        bullet('Regular Google Posts to signal freshness.'),

        heading('Schema for Voice Eligibility', 'h2'),
        p('In addition to FAQPage schema, use Speakable schema to explicitly mark content that is suitable for text-to-speech reading. Speakable tells Google Assistant and other voice interfaces which sections of your page are most appropriate to read aloud:'),
        code('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "speakable": {\n    "@type": "SpeakableSpecification",\n    "cssSelector": [".article-summary", ".key-findings"]\n  },\n  "headline": "Voice Search and Accessibility",\n  "url": "https://inculva.com/guides/voice-search-accessibility"\n}\n</script>', 'javascript'),

        heading('Mobile Voice and Touch: The Overlap', 'h2'),
        p('Voice search is predominantly used on mobile devices. The mobile accessibility requirements covered in the Mobile Accessibility guide — touch targets, viewport configuration, readable font sizes — directly affect voice search users, who may activate results by touch after asking a question. A voice-first optimization strategy and a mobile accessibility strategy are essentially the same strategy executed from two angles.'),

        heading('Testing Voice Search Readiness', 'h2'),
        bullet('Use a mobile device with Google Assistant and ask your target questions out loud. Note which page is cited and what answer is read.'),
        bullet('Check featured snippet ownership for your question-phrased queries in Google Search Console.'),
        bullet('Verify your schema with the Rich Results Test, including FAQPage and Speakable types.'),
        bullet('Test page speed on mobile (Lighthouse on a throttled connection) — voice result pages need to load fast.'),
      ],
      tr: [
        heading('Yardımcı Teknoloji Olarak Sesli Arama', 'h2'),
        p('Sesli arama hem bir tüketici kolaylık özelliği hem de kritik bir yardımcı teknolojidir. Klavye veya fare kullanımını engelleyen motor engeli olan kullanıcılar için ses arayüzleri birincil gezinme araçlarıdır. Bu, sesli arama optimizasyonunun yalnızca bir pazarlama taktiği olmadığı anlamına gelir — önemli bir engelli kullanıcı nüfusu için bilgiye erişilebilirliği doğrudan etkiler.'),

        heading('Sesli Arama Sonuçları Nasıl Seçilir', 'h2'),
        p('Bilgi sorguları için sesli arama sonuçları neredeyse yalnızca öne çıkan snippet\'lerden gelir. Ses özgü farklılıklar şunlardır:'),
        bullet('Konuşma dili sorgu ifadesi — sesli sorgular tam cümlelerdir.'),
        bullet('Tek yanıt sunumu — ses bir yanıt verir, sonuç listesi değil.'),
        bullet('Uzunluk kısıtlamaları — sesli yanıtlar genellikle 30–45 kelimede okunur.'),

        heading('Ses için Yazma: Önce Doğal Dil', 'h2'),
        p('Sesli arama sorguları konuşma dilidir. Anahtar kelime başlıklarının yanında tam soru başlıklarını hedefleyerek optimize edin. Yanıtı sade dil, etkin ses ve bağlam içinde kısaltma tanımlarıyla yazın. Bu aynı zamanda erişilebilirlik için WCAG 3.1.5\'in önerisidir.'),

        heading('Ses Uygunluğu için Şema', 'h2'),
        p('FAQPage şemasına ek olarak, metin okuma için uygun içeriği açıkça işaretlemek için Speakable şeması kullanın. Speakable, sayfanızın hangi bölümlerinin sesli okunmasının en uygun olduğunu Google Asistan\'a bildirir.'),

        heading('Mobil Ses ve Dokunma: Örtüşme', 'h2'),
        p('Sesli arama ağırlıklı olarak mobil cihazlarda kullanılır. Ses öncelikli optimizasyon stratejisi ve mobil erişilebilirlik stratejisi, iki farklı açıdan yürütülen esasen aynı stratejidir.'),

        heading('Sesli Arama Hazırlığını Test Etme', 'h2'),
        bullet('Google Asistan\'ı olan bir mobil cihaz kullanın ve hedef sorularınızı yüksek sesle sorun.'),
        bullet('Google Search Console\'da soru ifadeli sorularınız için öne çıkan snippet sahipliğini kontrol edin.'),
        bullet('Şemanızı FAQPage ve Speakable türleri dahil Zengin Sonuçlar Testi ile doğrulayın.'),
      ],
    },
    resources: [
      { _key: 'sg13r1', title: 'Google: Voice Search & Featured Snippets', url: 'https://developers.google.com/search/docs/appearance/featured-snippets#voice-search', source: 'other', language: 'en' },
      { _key: 'sg13r2', title: 'Google: Speakable structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/speakable', source: 'other', language: 'en' },
      { _key: 'sg13r3', title: 'W3C WAI: Cognitive Accessibility', url: 'https://www.w3.org/WAI/cognitive/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg13r4', title: 'WebAIM: Motor Disabilities', url: 'https://webaim.org/articles/motor/', source: 'webaim', language: 'en' },
      { _key: 'sg13r5', title: 'Moz: Voice Search Optimization', url: 'https://moz.com/blog/voice-search-seo', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Voice Search and Accessibility Optimization', metaDescription: 'Voice search is assistive technology for motor-disabled users. Optimize for conversational queries, featured snippets, Speakable schema, and mobile speed.' },
      tr: { metaTitle: 'Sesli Arama ve Erişilebilirlik Optimizasyonu', metaDescription: 'Sesli arama motor engelli kullanıcılar için yardımcı teknolojidir. Konuşma sorguları, öne çıkan snippet\'ler ve Speakable şeması için optimize edin.' },
    },
  },

  // ─── TECHNIQUE 1 ─────────────────────────────────────────────────────────────
  {
    category: 'technique',
    title: {
      en: 'Keyboard Navigation Testing Guide',
      tr: 'Klavye Gezinme Test Rehberi',
    },
    description: {
      en: 'A step-by-step guide to testing web page keyboard accessibility — covering focus order, focus visibility, interactive element operability, and keyboard traps.',
      tr: 'Web sayfası klavye erişilebilirliğini test etmek için adım adım bir rehber — odak sırası, odak görünürlüğü, etkileşimli öğe işletilebilirliği ve klavye tuzaklarını kapsar.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-2-1-1', _key: 'tec1w211' },
      { _type: 'reference', _ref: 'wcag-2-1-2', _key: 'tec1w212' },
      { _type: 'reference', _ref: 'wcag-2-4-3', _key: 'tec1w243' },
      { _type: 'reference', _ref: 'wcag-2-4-7', _key: 'tec1w247' },
    ],
    content: {
      en: [
        heading('Why Keyboard Testing Is Non-Negotiable', 'h2'),
        p('Keyboard accessibility is the foundation of all accessibility. Screen readers, switch-access devices, eye-tracking systems, and voice control software all operate through the keyboard API. A page that works with a keyboard works with all of these technologies. A page that requires mouse interaction breaks all of them.'),
        p('WCAG 2.1.1 (Keyboard) requires that all functionality is operable through a keyboard interface. WCAG 2.1.2 (No Keyboard Trap) requires that users can navigate away from any component using only the keyboard. These are Level A criteria — the most critical level — meaning they apply to every page of every website.'),

        heading('Setting Up for Keyboard Testing', 'h2'),
        p('Before you begin, configure your testing environment:'),
        bullet('Disconnect or ignore your mouse/trackpad — true keyboard testing means not touching pointing devices.'),
        bullet('On macOS, enable keyboard access for all controls: System Settings → Keyboard → Keyboard Navigation (toggle on). Without this, Tab does not reach buttons or links in Safari.'),
        bullet('Use multiple browsers — keyboard behavior varies. Test in Chrome, Firefox, and Safari minimum.'),
        bullet('Use your browser\'s devtools to inspect focus state and element properties during testing.'),
        bullet('Keep a spreadsheet open to log issues: page URL, element description, issue type, WCAG criterion.'),

        heading('Core Keyboard Interactions to Test', 'h2'),
        p('These are the standard keyboard interactions that all interactive elements must support:'),
        bullet('Tab — moves focus forward to the next focusable element.'),
        bullet('Shift + Tab — moves focus backward to the previous focusable element.'),
        bullet('Enter — activates links and buttons.'),
        bullet('Space — activates buttons and checkboxes; scrolls the page when no element is focused.'),
        bullet('Arrow keys — navigate within composite widgets: select options, radio button groups, tabs, sliders, menus, date pickers.'),
        bullet('Escape — closes dialogs, menus, tooltips, and popups.'),
        bullet('Home / End — move to first/last item in a list or widget.'),

        heading('Step-by-Step Keyboard Test Procedure', 'h2'),
        numbered('Load the page and press Tab to move focus to the first focusable element. Verify a skip link appears (WCAG 2.4.1).'),
        numbered('Tab through the entire page. Verify every interactive element receives focus — buttons, links, form controls, custom widgets.'),
        numbered('At each focused element, verify the focus indicator is visible and has sufficient contrast (WCAG 2.4.7, 2.4.11).'),
        numbered('Verify focus order is logical and follows the visual reading order (WCAG 2.4.3). Note any jumps or skips.'),
        numbered('Activate every link (Enter) and verify it navigates to the correct destination.'),
        numbered('Activate every button (Enter, Space) and verify it triggers the expected action.'),
        numbered('For every form control, verify you can enter or select values using keyboard alone.'),
        numbered('For dropdowns, comboboxes, and custom selects, verify arrow key navigation works within the component.'),
        numbered('For modal dialogs: when opened, verify focus moves inside the dialog; verify Tab stays trapped within the dialog; verify Escape closes it and returns focus to the trigger.'),
        numbered('For navigation menus with sub-menus, verify arrow keys navigate between items and Escape collapses sub-menus.'),
        numbered('Scroll through the page with keyboard (arrow keys, Page Down, Space) and verify no focus loss occurs.'),

        heading('Identifying Keyboard Traps', 'h2'),
        p('A keyboard trap (WCAG 2.1.2 failure) occurs when focus enters a component and cannot leave using standard keyboard controls. Common sources of keyboard traps:'),
        bullet('Embedded iframes without keyboard exit handling.'),
        bullet('Custom date pickers that capture all key events.'),
        bullet('Map widgets (Google Maps embeds) that intercept arrow keys without providing an exit mechanism.'),
        bullet('Third-party chat widgets that steal focus without an Escape handler.'),
        p('To verify: navigate to the suspected trapping element with Tab. Try to Tab or Shift+Tab out of it. If focus is stuck, document it as a critical keyboard trap failure.'),

        heading('Common Keyboard Accessibility Failures', 'h2'),
        bullet('Focus indicator removed with outline: none or outline: 0 in CSS without a replacement.'),
        bullet('Custom buttons implemented as <div> or <span> without role="button" and tabindex="0".'),
        bullet('Links that only work on click due to JavaScript onclick handlers without keyboard fallbacks.'),
        bullet('Dropdown menus that open on hover with no keyboard trigger.'),
        bullet('Modals that do not trap focus or do not return focus to the trigger on close.'),
        bullet('Focus order that does not match visual order due to CSS flexbox/grid reordering.'),
        bullet('Interactive content inside SVGs that is not keyboard-reachable.'),

        heading('Documenting and Reporting Issues', 'h2'),
        p('For each keyboard accessibility issue found, document: the page and URL, the element and its role, the key(s) that fail, the expected behavior, the actual behavior, the WCAG criterion violated (typically 2.1.1, 2.1.2, 2.4.3, or 2.4.7), and the severity (critical/serious/moderate/minor using Deque\'s severity scale).'),
        code('Issue: Keyboard trap in date picker\nURL: /checkout/step-2\nElement: Date of birth date picker, id="dob-picker"\nKeys tested: Tab, Shift+Tab, Escape\nExpected: Tab/Shift+Tab exits the date picker; Escape closes it\nActual: Tab is captured by the date picker; no exit possible\nWCAG: 2.1.2 No Keyboard Trap (Level A)\nSeverity: Critical', 'markdown'),
      ],
      tr: [
        heading('Klavye Testi Neden Zorunludur', 'h2'),
        p('Klavye erişilebilirliği tüm erişilebilirliğin temelidir. Ekran okuyucular, switch erişim cihazları, göz izleme sistemleri ve ses kontrol yazılımı hepsinin klavye API\'si aracılığıyla çalışır. WCAG 2.1.1 (Klavye), tüm işlevlerin klavye arayüzü aracılığıyla çalıştırılabilir olmasını gerektirir. WCAG 2.1.2 (Klavye Tuzağı Yok), kullanıcıların yalnızca klavyeyi kullanarak herhangi bir bileşenden uzaklaşabilmesini gerektirir.'),

        heading('Klavye Testi için Kurulum', 'h2'),
        bullet('Farenizi/dokunmatik panelinizi görmezden gelin — gerçek klavye testi işaret cihazlarına dokunmamak anlamına gelir.'),
        bullet('macOS\'ta tüm kontroller için klavye erişimini etkinleştirin: Sistem Ayarları → Klavye → Klavye Gezintisi.'),
        bullet('Birden fazla tarayıcı kullanın — Chrome, Firefox ve Safari minimum.'),

        heading('Test Edilecek Temel Klavye Etkileşimleri', 'h2'),
        bullet('Tab — odağı bir sonraki odaklanabilir öğeye ilerletir.'),
        bullet('Shift + Tab — odağı bir önceki odaklanabilir öğeye geri taşır.'),
        bullet('Enter — bağlantıları ve düğmeleri etkinleştirir.'),
        bullet('Space — düğmeleri ve onay kutularını etkinleştirir.'),
        bullet('Ok tuşları — bileşik widget\'lar içinde gezinir.'),
        bullet('Escape — iletişim kutularını, menüleri ve açılır pencereleri kapatır.'),

        heading('Adım Adım Klavye Test Prosedürü', 'h2'),
        numbered('Sayfayı yükleyin ve ilk odaklanabilir öğeye geçmek için Tab\'a basın. Bir atla bağlantısının göründüğünü doğrulayın.'),
        numbered('Tab ile sayfanın tamamında gezinin. Her etkileşimli öğenin odak aldığını doğrulayın.'),
        numbered('Odaklanan her öğede, odak göstergesinin görünür ve yeterli kontrasta sahip olduğunu doğrulayın.'),
        numbered('Her bağlantıyı etkinleştirin (Enter) ve doğru hedefe gittiğini doğrulayın.'),
        numbered('Modal iletişim kutuları için: açıldığında odağın iletişim kutusuna taşındığını; Tab\'ın iletişim kutusu içinde kalacağını doğrulayın.'),

        heading('Klavye Tuzaklarını Belirleme', 'h2'),
        p('Klavye tuzağı (WCAG 2.1.2 ihlali), odağın bir bileşene girip standart klavye kontrollerini kullanarak çıkamaması durumunda oluşur.'),
        bullet('Yerleşik iframe\'ler klavye çıkış işlemesi olmadan.'),
        bullet('Tüm tuş olaylarını yakalayan özel tarih seçiciler.'),
        bullet('Ok tuşlarını yakalayan Google Maps yerleştirmeleri.'),

        heading('Yaygın Klavye Erişilebilirlik Hataları', 'h2'),
        bullet('CSS\'de outline: none ile odak göstergesinin kaldırılması.'),
        bullet('role="button" ve tabindex="0" olmadan <div> veya <span> olarak uygulanan özel düğmeler.'),
        bullet('Klavye tetikleyicisi olmadan yalnızca fareyle üzerine gelme ile açılan açılır menüler.'),
        bullet('Kapatıldığında odağı tetikleyiciye döndürmeyen modaller.'),
      ],
    },
    resources: [
      { _key: 'sg14r1', title: 'WCAG 2.1.1: Keyboard', url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg14r2', title: 'WebAIM: Keyboard Accessibility', url: 'https://webaim.org/techniques/keyboard/', source: 'webaim', language: 'en' },
      { _key: 'sg14r3', title: 'Deque: Keyboard Accessibility', url: 'https://dequeuniversity.com/checklists/web/keyboard', source: 'deque', language: 'en' },
      { _key: 'sg14r4', title: 'W3C ARIA: Keyboard Patterns', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg14r5', title: 'A11y Project: Keyboard Testing', url: 'https://www.a11yproject.com/posts/how-to-test-keyboard-accessibility/', source: 'a11y-project', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Keyboard Navigation Testing Guide | WCAG', metaDescription: 'Test keyboard accessibility step by step. Covers focus order, focus visibility, keyboard traps, modal dialogs, and documentation of WCAG 2.1 keyboard failures.' },
      tr: { metaTitle: 'Klavye Gezinme Test Rehberi | WCAG', metaDescription: 'Klavye erişilebilirliğini adım adım test edin. Odak sırası, odak görünürlüğü, klavye tuzakları ve modal iletişim kutularını kapsar.' },
    },
  },

  // ─── TECHNIQUE 2 ─────────────────────────────────────────────────────────────
  {
    category: 'technique',
    title: {
      en: 'Screen Reader Testing Guide',
      tr: 'Ekran Okuyucu Test Rehberi',
    },
    description: {
      en: 'How to test websites with NVDA, JAWS, VoiceOver, and TalkBack — covering screen reader basics, testing procedures for common patterns, and interpreting results.',
      tr: 'NVDA, JAWS, VoiceOver ve TalkBack ile web sitelerini test etme — ekran okuyucu temelleri, yaygın kalıplar için test prosedürleri ve sonuçları yorumlama.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-1-1', _key: 'tec2w111' },
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'tec2w131' },
      { _type: 'reference', _ref: 'wcag-4-1-2', _key: 'tec2w412' },
    ],
    content: {
      en: [
        heading('Screen Readers: The Essential Testing Tool', 'h2'),
        p('Automated accessibility scanners catch approximately 30–40% of WCAG failures. The remainder require manual testing with real assistive technologies. Screen readers are the most important manual testing tool because they expose failures in semantic structure, accessible names, state announcements, and dynamic content — all areas that automated tools cannot reliably assess.'),
        p('You do not need to be an expert screen reader user to run effective accessibility tests. You need to know enough to navigate a page, identify what gets announced, and recognize when something is wrong. This guide gives you that foundation.'),

        heading('The Testing Matrix: Which Screen Reader + Browser', 'h2'),
        p('Screen readers and browsers interact at the OS accessibility API level. Not every combination works well. Use these tested pairings:'),
        bullet('NVDA + Firefox (Windows) — the most common combination in accessibility testing; free, open source.'),
        bullet('JAWS + Chrome or Edge (Windows) — the most common combination among blind users in enterprise; paid license.'),
        bullet('VoiceOver + Safari (macOS/iOS) — the standard for Apple platform testing; built into macOS and iOS.'),
        bullet('TalkBack + Chrome (Android) — standard Android screen reader; built into Android.'),
        bullet('Narrator + Edge (Windows) — Microsoft\'s built-in screen reader; useful for Windows-specific testing.'),
        p('Test with at minimum NVDA+Firefox and VoiceOver+Safari to cover the most common user configurations.'),

        heading('NVDA Basics: Getting Started', 'h2'),
        p('Download NVDA from nvaccess.org (free). After installation:'),
        bullet('NVDA modifier key (NVDA key) is Insert by default (or CapsLock if you configure it).'),
        bullet('NVDA+Space toggles between Browse mode (reading) and Forms/Focus mode (interacting with forms).'),
        bullet('H navigates to next heading; Shift+H goes to previous heading.'),
        bullet('K navigates to next link; F navigates to next form field.'),
        bullet('1–6 navigate to heading levels (1 = h1, 2 = h2, etc.).'),
        bullet('NVDA+F7 opens the Elements List — a dialog showing all headings, links, landmarks, and form fields on the page.'),
        bullet('NVDA+F5 opens the forms mode, NVDA+Ctrl+F opens the find dialog.'),

        heading('VoiceOver Basics: Getting Started', 'h2'),
        p('VoiceOver is enabled with Command+F5 (or triple-press Touch ID). The VO modifier is Ctrl+Option (VO key):'),
        bullet('VO+Right/Left Arrow — move to next/previous element.'),
        bullet('VO+Shift+Down Arrow — interact with a group (enter a list, table, iframe).'),
        bullet('VO+Shift+Up Arrow — stop interacting with a group (exit a list, table, iframe).'),
        bullet('VO+U — open the Rotor, which lets you navigate by headings, links, form controls, tables, and landmarks.'),
        bullet('VO+F3 — read item description.'),
        bullet('VO+Space — activate the focused element.'),

        heading('Testing Procedure: Page Structure', 'h2'),
        numbered('Navigate to the page and let it load completely.'),
        numbered('Open NVDA Elements List (NVDA+F7) or VoiceOver Rotor (VO+U). Select "Headings". Verify: there is one h1, headings follow a logical hierarchy, no headings are missing, and headings describe their sections accurately.'),
        numbered('In the same dialog, select "Landmarks". Verify: there is a main landmark, at least one nav landmark, and navigation landmarks are labeled if there are multiple.'),
        numbered('In the same dialog, select "Links". Review all link text. Flag any that are "click here", "read more", or a bare URL without meaningful text.'),

        heading('Testing Procedure: Forms', 'h2'),
        numbered('Navigate to a form. Switch to Forms Mode (NVDA) or interact with form (VO+Shift+Down).'),
        numbered('Tab to each form control. Verify the field\'s label is read aloud before the control type. Example: "Email address, edit text" — not just "edit text".'),
        numbered('For required fields, verify "required" is announced.'),
        numbered('Submit the form with invalid data. Verify error messages are announced — either via aria-live, focus movement to the error summary, or the error being associated with the field.'),
        numbered('For custom selects/comboboxes, verify the selected value is announced and arrow key navigation within the dropdown announces each option.'),

        heading('Testing Procedure: Images and Media', 'h2'),
        bullet('Navigate to images (press G in NVDA). For each image: verify the alt text is read and is meaningful. Verify decorative images are skipped (not announced at all).'),
        bullet('Navigate to any audio or video players. Verify play/pause buttons have accessible names. Verify captions are available and selectable.'),

        heading('Testing Procedure: Dynamic Content', 'h2'),
        p('Dynamic content — live regions, loading states, error messages, toast notifications — is one of the most common sources of screen reader failures:'),
        bullet('Trigger any ajax/dynamic content update (search results, form submission, filter apply). Verify the updated content is announced via aria-live.'),
        bullet('Open modal dialogs. Verify focus moves into the dialog and the dialog role/title is announced. Verify focus is trapped inside the dialog.'),
        bullet('Close modal dialogs. Verify focus returns to the trigger element.'),
        bullet('For single-page app route changes, verify a meaningful page title or heading is announced on navigation.'),

        heading('Interpreting Screen Reader Output', 'h2'),
        p('Knowing what should be announced helps identify what is wrong. For a button with text "Submit form": the screen reader should announce "Submit form, button". If it announces "button" only — the button has no accessible name. If it announces "div" — the element is a div with no ARIA role. If it announces nothing — the element is hidden from AT or has tabindex="-1".'),
      ],
      tr: [
        heading('Ekran Okuyucular: Temel Test Aracı', 'h2'),
        p('Otomatik erişilebilirlik tarayıcıları WCAG hatalarının yaklaşık %30–40\'ını yakalar. Geri kalanı gerçek yardımcı teknolojilerle manuel test gerektirir. Ekran okuyucular en önemli manuel test aracıdır çünkü semantik yapı, erişilebilir adlar ve dinamik içerikteki hataları ortaya çıkarırlar.'),

        heading('Test Matrisi: Hangi Ekran Okuyucu + Tarayıcı', 'h2'),
        bullet('NVDA + Firefox (Windows) — erişilebilirlik testinde en yaygın kombinasyon; ücretsiz, açık kaynak.'),
        bullet('JAWS + Chrome veya Edge (Windows) — kurumsal ortamda kör kullanıcılar arasında en yaygın.'),
        bullet('VoiceOver + Safari (macOS/iOS) — Apple platformu testi için standart; macOS ve iOS\'ta yerleşik.'),
        bullet('TalkBack + Chrome (Android) — standart Android ekran okuyucusu.'),

        heading('NVDA Temelleri', 'h2'),
        bullet('NVDA tuşu (varsayılan Insert) değiştirici tuştur.'),
        bullet('H sonraki başlığa gider; Shift+H önceki başlığa gider.'),
        bullet('NVDA+F7 Öğeler Listesini açar — sayfadaki tüm başlıkları, bağlantıları ve form alanlarını gösterir.'),

        heading('Test Prosedürü: Sayfa Yapısı', 'h2'),
        numbered('NVDA Öğeler Listesini (NVDA+F7) açın ve "Başlıklar"ı seçin. Bir h1 olduğunu, başlıkların mantıksal hiyerarşiyi izlediğini doğrulayın.'),
        numbered('"İşaret Noktaları"nı seçin. Bir ana işaret noktası, en az bir gezinme işaret noktası olduğunu doğrulayın.'),
        numbered('"Bağlantılar"ı seçin. "Buraya tıklayın", "daha fazla oku" gibi bağlantıları işaretleyin.'),

        heading('Test Prosedürü: Formlar', 'h2'),
        numbered('Her form kontrolüne Tab tuşuyla gidin. Alanın etiketinin kontrol türünden önce sesli okunduğunu doğrulayın.'),
        numbered('Gerekli alanlar için "gerekli" duyurusunun yapıldığını doğrulayın.'),
        numbered('Geçersiz veri ile formu gönderin. Hata mesajlarının duyurulduğunu doğrulayın.'),

        heading('Ekran Okuyucu Çıktısını Yorumlama', 'h2'),
        p('Neyin duyurulması gerektiğini bilmek neyin yanlış olduğunu belirlemeye yardımcı olur. "Formu gönder" metni olan bir düğme için ekran okuyucu "Formu gönder, düğme" duyurmalıdır. Yalnızca "düğme" duyuruyorsa — düğmenin erişilebilir adı yoktur. "div" duyuruyorsa — öğe ARIA rolü olmayan bir div\'dir.'),
      ],
    },
    resources: [
      { _key: 'sg15r1', title: 'NVDA User Guide', url: 'https://www.nvaccess.org/files/nvda/documentation/userGuide.html', source: 'other', language: 'en' },
      { _key: 'sg15r2', title: 'WebAIM: Using NVDA to Evaluate Web Accessibility', url: 'https://webaim.org/articles/nvda/', source: 'webaim', language: 'en' },
      { _key: 'sg15r3', title: 'WebAIM: Using VoiceOver to Evaluate Web Accessibility', url: 'https://webaim.org/articles/voiceover/', source: 'webaim', language: 'en' },
      { _key: 'sg15r4', title: 'Deque: Screen Reader Testing', url: 'https://www.deque.com/blog/accessible-client-side-routing-iframe/', source: 'deque', language: 'en' },
      { _key: 'sg15r5', title: 'A11y Project: Screen Reader Quick Reference', url: 'https://www.a11yproject.com/posts/screen-reader-keyboard-shortcuts/', source: 'a11y-project', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Screen Reader Testing Guide for WCAG', metaDescription: 'Test with NVDA, JAWS, VoiceOver, and TalkBack. Covers screen reader basics, testing procedures for forms, images, dynamic content, and interpreting output.' },
      tr: { metaTitle: 'WCAG için Ekran Okuyucu Test Rehberi', metaDescription: 'NVDA, JAWS, VoiceOver ve TalkBack ile test edin. Ekran okuyucu temelleri, form testi, görsel testi ve dinamik içerik prosedürlerini kapsar.' },
    },
  },

  // ─── TECHNIQUE 3 ─────────────────────────────────────────────────────────────
  {
    category: 'technique',
    title: {
      en: 'Color Contrast Testing Guide',
      tr: 'Renk Kontrastı Test Rehberi',
    },
    description: {
      en: 'How to test and fix color contrast failures — covering WCAG 1.4.3 and 1.4.11 requirements, testing tools, manual procedures, and fixing contrast in CSS.',
      tr: 'Renk kontrastı hatalarını test etme ve düzeltme — WCAG 1.4.3 ve 1.4.11 gereksinimleri, test araçları, manuel prosedürler ve CSS\'de kontrastı düzeltme.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-4-3', _key: 'tec3w143' },
      { _type: 'reference', _ref: 'wcag-1-4-11', _key: 'tec3w1411' },
    ],
    content: {
      en: [
        heading('Understanding Color Contrast Requirements', 'h2'),
        p('WCAG defines two contrast-related criteria: 1.4.3 (Contrast Minimum, Level AA) covers text contrast, and 1.4.11 (Non-text Contrast, Level AA) covers UI components and graphical objects. Both require a minimum contrast ratio measured using the WCAG contrast formula, which compares the relative luminance of two colors on a scale from 1:1 (identical colors) to 21:1 (black on white).'),
        p('The required ratios are:'),
        bullet('Normal text (< 18pt or < 14pt bold): minimum 4.5:1 against its background.'),
        bullet('Large text (≥ 18pt or ≥ 14pt bold): minimum 3:1 against its background.'),
        bullet('UI components (borders of inputs, focus indicators, icons): minimum 3:1 against adjacent color(s).'),
        bullet('Graphical objects (chart lines, diagram parts, icons): minimum 3:1.'),
        bullet('Inactive/disabled components are exempt from contrast requirements.'),
        bullet('Decorative text (text that is purely visual with no semantic meaning) is exempt.'),

        heading('Testing Tools', 'h2'),
        p('Use multiple tools because they catch different types of contrast failures:'),
        bullet('axe DevTools (browser extension) — automated scan catches static text contrast failures. Free tier available.'),
        bullet('Colour Contrast Analyser (TPGi) — desktop app that lets you pick colors from the screen with an eyedropper. Essential for testing gradients, images, and dynamic states. Free download at tpgi.com.'),
        bullet('Chrome DevTools — in the Elements panel, click a color swatch to see the contrast ratio. The contrast checker shows a warning icon for failures.'),
        bullet('Figma contrast plugins — A11y Annotation Kit, Contrast, or Color Blind plugins catch issues in design before development.'),
        bullet('WebAIM Contrast Checker (webaim.org/resources/contrastchecker/) — paste hex codes to check ratios.'),
        bullet('Lighthouse — includes contrast checks in its accessibility audit.'),

        heading('Manual Testing Procedure', 'h2'),
        numbered('Run an automated scan with axe or Lighthouse and fix all flagged contrast failures first.'),
        numbered('Then manually test scenarios automated tools miss: hover states, focus states, active states, visited link colors, placeholder text, text on gradient backgrounds, text over images.'),
        numbered('Use the Colour Contrast Analyser eyedropper: hover the foreground text color, note the hex value. Hover the background color, note the hex value. Enter both into the tool and verify the ratio.'),
        numbered('Test all interactive states: default, hover, focus, active, disabled, visited, checked/unchecked.'),
        numbered('For text on images or gradients, identify the darkest and lightest background areas and test the worst-case contrast.'),
        numbered('Test in both light mode and dark mode if your site supports them.'),

        heading('Common Contrast Failures and Fixes', 'h2'),
        p('These are the most frequently occurring contrast failures in real-world audits:'),
        code('/* Failure: light gray text on white (#767676 on #fff = 4.48:1, just below 4.5:1 requirement) */\n.caption {\n  color: #767676; /* fails for normal text */\n  background: #fff;\n}\n\n/* Fix: darken the text color */\n.caption {\n  color: #696969; /* 4.72:1 — passes AA */\n  background: #fff;\n}', 'css'),
        code('/* Failure: placeholder text too light */\ninput::placeholder {\n  color: #aaa; /* #aaa on white = 2.32:1 — fails */\n}\n\n/* Fix: use a darker placeholder color */\ninput::placeholder {\n  color: #767676; /* still light but passes AA for large text */\n  /* OR */\n  color: #6e6e6e; /* safer choice at 4.94:1 */\n}', 'css'),
        code('/* Failure: focus outline has insufficient contrast */\n:focus {\n  outline: 2px solid #a0c4ff; /* light blue on white = 2.1:1 — fails 1.4.11 */\n}\n\n/* Fix: use a darker focus color with sufficient contrast against both the\n   focused element\'s background AND the surrounding page */\n:focus-visible {\n  outline: 3px solid #0057b7; /* #0057b7 on white = 5.66:1 — passes */\n  outline-offset: 2px;\n}', 'css'),
        code('/* Failure: icon button with no text, icon color too light */\n.icon-btn svg { fill: #c0c0c0; } /* #c0c0c0 on white = 1.61:1 — fails */\n\n/* Fix: darken icon to meet 3:1 ratio for non-text */\n.icon-btn svg { fill: #757575; } /* #757575 on white = 4.6:1 — passes */\n\n/* Also: add accessible name to icon button! */\n<button aria-label="Close dialog">\n  <svg aria-hidden="true" focusable="false">...</svg>\n</button>', 'css'),

        heading('Testing Dark Mode Contrast', 'h2'),
        p('Dark mode introduces its own contrast challenges. Text that had 7:1 contrast in light mode may have only 2:1 in dark mode if colors were simply inverted. Always test your dark mode palette independently:'),
        code('@media (prefers-color-scheme: dark) {\n  :root {\n    --color-text: #e8e8e8;    /* on #1a1a1a bg = 10.5:1 — passes */\n    --color-text-muted: #9e9e9e; /* on #1a1a1a bg = 3.85:1 — passes AA for large text, fails for normal */\n    --color-primary: #60a5fa;   /* on #1a1a1a bg = 5.2:1 — passes */\n  }\n}', 'css'),

        heading('APCA: The Next Generation Contrast Standard', 'h2'),
        p('The Accessible Perceptual Contrast Algorithm (APCA) is the contrast algorithm proposed for WCAG 3.0. It is more perceptually accurate than the current WCAG 2.x formula, taking into account font weight and size, spatial frequency, and polarity. While WCAG 2.2 still uses the current algorithm, you can use the APCA Contrast Calculator (readtech.org/APCA) to supplement your testing and future-proof your color decisions.'),
      ],
      tr: [
        heading('Renk Kontrastı Gereksinimlerini Anlama', 'h2'),
        p('WCAG iki kontrast kriteri tanımlar: 1.4.3 (Kontrast Minimumu, AA Seviyesi) metin kontrastını, 1.4.11 (Metin Dışı Kontrast, AA Seviyesi) UI bileşenlerini ve grafik nesnelerini kapsar. Gerekli oranlar:'),
        bullet('Normal metin: arka planına karşı minimum 4,5:1.'),
        bullet('Büyük metin (≥ 18pt veya ≥ 14pt kalın): minimum 3:1.'),
        bullet('UI bileşenleri (giriş kenarlıkları, odak göstergeleri): minimum 3:1.'),
        bullet('Grafik nesneler (grafik çizgileri, diyagram parçaları): minimum 3:1.'),

        heading('Test Araçları', 'h2'),
        bullet('axe DevTools — statik metin kontrast hatalarını yakalar.'),
        bullet('Colour Contrast Analyser (TPGi) — degradeler, görseller ve dinamik durumları test etmek için ekrandan renk seçmenizi sağlayan masaüstü uygulaması.'),
        bullet('Chrome DevTools — Öğeler panelinde bir renk örneğine tıklayarak kontrast oranını görebilirsiniz.'),
        bullet('WebAIM Kontrast Denetleyicisi — oranları kontrol etmek için hex kodlarını yapıştırın.'),

        heading('Yaygın Kontrast Hataları ve Düzeltmeleri', 'h2'),
        code('/* Hata: beyaz üzerinde açık gri metin */\n.altyazi {\n  color: #767676; /* beyaz üzerinde 4,48:1 — gereksinimin hemen altında */\n}\n\n/* Düzeltme: metin rengini koyulaştırın */\n.altyazi {\n  color: #696969; /* 4,72:1 — AA geçer */\n}', 'css'),
        code('/* Hata: odak halkasının yetersiz kontrastı */\n:focus {\n  outline: 2px solid #a0c4ff; /* beyaz üzerinde 2,1:1 — başarısız */\n}\n\n/* Düzeltme */\n:focus-visible {\n  outline: 3px solid #0057b7; /* beyaz üzerinde 5,66:1 — geçer */\n  outline-offset: 2px;\n}', 'css'),

        heading('Manuel Test Prosedürü', 'h2'),
        numbered('Önce tüm işaretlenmiş kontrast hatalarını düzeltmek için axe veya Lighthouse ile otomatik tarama çalıştırın.'),
        numbered('Hover durumları, odak durumları, yer tutucu metni, degrade arka planlar üzerindeki metin gibi otomatik araçların gözden kaçırdığı senaryoları manuel olarak test edin.'),
        numbered('Her iki renk için de hex değerini belirlemek için Colour Contrast Analyser damlalığını kullanın.'),

        heading('Koyu Mod Kontrast Testi', 'h2'),
        p('Koyu mod kendi kontrast zorluklarını getirir. Açık modda 7:1 kontrasta sahip olan metin, renkler basitçe tersine çevrilmişse koyu modda yalnızca 2:1\'e sahip olabilir. Koyu mod paletinizi her zaman bağımsız olarak test edin.'),
      ],
    },
    resources: [
      { _key: 'sg16r1', title: 'WCAG 1.4.3: Contrast (Minimum)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg16r2', title: 'TPGi: Colour Contrast Analyser', url: 'https://www.tpgi.com/color-contrast-checker/', source: 'other', language: 'en' },
      { _key: 'sg16r3', title: 'WebAIM: Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', source: 'webaim', language: 'en' },
      { _key: 'sg16r4', title: 'Deque: Color Contrast', url: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast', source: 'deque', language: 'en' },
      { _key: 'sg16r5', title: 'APCA Contrast Calculator', url: 'https://www.myndex.com/APCA/', source: 'other', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Color Contrast Testing Guide | WCAG 1.4.3', metaDescription: 'Test and fix color contrast failures for WCAG 1.4.3 and 1.4.11. Covers testing tools, manual procedure, CSS fixes for text, focus rings, and dark mode.' },
      tr: { metaTitle: 'Renk Kontrastı Test Rehberi | WCAG 1.4.3', metaDescription: 'WCAG 1.4.3 ve 1.4.11 için renk kontrastı hatalarını test edin ve düzeltin. Test araçları, CSS düzeltmeleri ve koyu mod testini kapsar.' },
    },
  },

  // ─── TECHNIQUE 4 ─────────────────────────────────────────────────────────────
  {
    category: 'technique',
    title: {
      en: 'ARIA Roles and Properties Reference',
      tr: 'ARIA Rolleri ve Özellikleri Referansı',
    },
    description: {
      en: 'A practical reference for WAI-ARIA roles, states, and properties — when to use ARIA, which roles require keyboard patterns, and the five rules of ARIA.',
      tr: 'WAI-ARIA rolleri, durumları ve özellikleri için pratik bir referans — ARIA\'nın ne zaman kullanılacağı, hangi rollerin klavye kalıpları gerektirdiği ve ARIA\'nın beş kuralı.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-4-1-2', _key: 'tec4w412' },
      { _type: 'reference', _ref: 'wcag-1-3-1', _key: 'tec4w131' },
    ],
    content: {
      en: [
        heading('The Five Rules of ARIA', 'h2'),
        p('The W3C\'s "Using ARIA" document defines five rules that should guide all ARIA usage. Violating these rules is the most common source of ARIA-caused accessibility regressions:'),
        numbered('If you can use a native HTML element or attribute with the semantics and behavior you require, use it instead of repurposing an element and adding ARIA. Native HTML is always preferred.'),
        numbered('Do not change native semantics unless you really have to. Do not add role="heading" to a <p> when you should use an <h2>.'),
        numbered('All interactive ARIA controls must be usable with the keyboard. If you add role="button" to a div, you must also add tabindex="0" and keyboard event handlers for Enter and Space.'),
        numbered('Do not use role="presentation" or aria-hidden="true" on a focusable element.'),
        numbered('All interactive elements must have an accessible name — either from their content, a label, aria-labelledby, or aria-label.'),

        heading('When to Use ARIA', 'h2'),
        p('ARIA should only be used when native HTML cannot provide the required semantics. The most legitimate use cases are:'),
        bullet('Custom interactive widgets that have no HTML equivalent — tabs, accordions, tree views, data grids, sliders, carousels.'),
        bullet('Landmark roles on elements that cannot use the native landmark elements — e.g., role="banner" on a <div> when you cannot change the HTML structure.'),
        bullet('Live regions — aria-live, aria-atomic, aria-relevant — for announcing dynamic content updates to screen readers.'),
        bullet('Relationships — aria-describedby, aria-controls, aria-owns — for associating related elements when the relationship cannot be expressed structurally.'),
        bullet('State disclosure — aria-expanded, aria-selected, aria-checked, aria-pressed — for communicating the current state of interactive components.'),

        heading('Core ARIA Roles Reference', 'h2'),
        p('Key roles and their usage:'),
        code('<!-- role="button" on non-button element -->\n<div\n  role="button"\n  tabindex="0"\n  aria-pressed="false"\n  onclick="toggleLike(this)"\n  onkeydown="handleButtonKey(event, this)"\n>\n  Like\n</div>\n<!-- Note: prefer <button> unless impossible -->\n\n<!-- role="tab" / "tablist" / "tabpanel" -->\n<div role="tablist" aria-label="Guide categories">\n  <button role="tab" aria-selected="true" aria-controls="panel-seo" id="tab-seo">SEO</button>\n  <button role="tab" aria-selected="false" aria-controls="panel-geo" id="tab-geo">GEO</button>\n</div>\n<div role="tabpanel" id="panel-seo" aria-labelledby="tab-seo">SEO content</div>\n<div role="tabpanel" id="panel-geo" aria-labelledby="tab-geo" hidden>GEO content</div>', 'html'),
        code('<!-- role="dialog" -->\n<div\n  role="dialog"\n  aria-modal="true"\n  aria-labelledby="dialog-title"\n  aria-describedby="dialog-desc"\n>\n  <h2 id="dialog-title">Confirm deletion</h2>\n  <p id="dialog-desc">This action cannot be undone.</p>\n  <!-- interactive controls -->\n</div>\n\n<!-- role="alert" for important dynamic messages -->\n<div role="alert">Your form was submitted successfully.</div>\n\n<!-- role="status" for non-urgent updates -->\n<div role="status" aria-live="polite">Loading results...</div>', 'html'),

        heading('ARIA States and Properties', 'h2'),
        p('States (dynamic, change over time) and properties (relatively static) are the second dimension of ARIA:'),
        code('<!-- aria-expanded: open/closed state of disclosures -->\n<button aria-expanded="false" aria-controls="menu-1">Menu</button>\n<ul id="menu-1" hidden>...</ul>\n\n<!-- aria-selected: selection state in listboxes, tabs, tree items -->\n<li role="option" aria-selected="true">WCAG 2.2</li>\n\n<!-- aria-checked: for custom checkboxes and radio buttons -->\n<div role="checkbox" aria-checked="false" tabindex="0">Include screenshots</div>\n\n<!-- aria-disabled: for disabled elements (does not remove from tab order like HTML disabled) -->\n<button aria-disabled="true">Submit (fill all fields first)</button>\n\n<!-- aria-required: marks required form fields -->\n<input type="text" aria-required="true" aria-describedby="name-hint">\n<span id="name-hint">Full legal name, required</span>\n\n<!-- aria-invalid: marks fields with errors -->\n<input type="email" aria-invalid="true" aria-describedby="email-error">\n<span id="email-error" role="alert">Please enter a valid email address.</span>', 'html'),

        heading('Live Regions', 'h2'),
        p('Live regions announce dynamic content changes to screen reader users without requiring focus movement. Use them for search results, form validation messages, loading indicators, and notification toasts.'),
        code('<!-- aria-live="polite": announces after current speech finishes -->\n<div aria-live="polite" aria-atomic="true">\n  <!-- Inject content here dynamically: "5 results found" -->\n</div>\n\n<!-- aria-live="assertive": announces immediately, interrupts current speech -->\n<!-- Use ONLY for critical errors or time-sensitive alerts -->\n<div role="alert" aria-live="assertive">\n  <!-- Inject: "Session expires in 2 minutes" -->\n</div>\n\n<!-- Common mistake: injecting aria-live AFTER the element is in the DOM -->\n<!-- The element must be in the DOM BEFORE content is injected -->\n<div aria-live="polite" class="sr-announcement"></div>', 'html'),

        heading('Accessible Names: The Hierarchy', 'h2'),
        p('Every interactive element needs an accessible name. The browser computes the accessible name using the Accessible Name and Description Computation (ANDC) algorithm, in this priority order:'),
        numbered('aria-labelledby — references another element\'s text. Highest priority.'),
        numbered('aria-label — provides a string directly. Overrides visible text.'),
        numbered('HTML label element — for form inputs, the associated <label> text.'),
        numbered('title attribute — tooltip-style label. Least recommended for primary labeling.'),
        numbered('Text content — for buttons and links, the text inside the element.'),
        numbered('alt attribute — for images, the alt text.'),
      ],
      tr: [
        heading('ARIA\'nın Beş Kuralı', 'h2'),
        numbered('Gerekli semantiğe ve davranışa sahip yerel bir HTML öğesi veya niteliği kullanabiliyorsanız, bir öğeyi yeniden amaca uygun hale getirmek yerine onu kullanın.'),
        numbered('Gerçekten zorunlu olmadıkça yerel semantiği değiştirmeyin.'),
        numbered('Tüm etkileşimli ARIA kontrolleri klavyeyle kullanılabilir olmalıdır.'),
        numbered('Odaklanabilir bir öğede role="presentation" veya aria-hidden="true" kullanmayın.'),
        numbered('Tüm etkileşimli öğelerin erişilebilir bir adı olmalıdır.'),

        heading('ARIA Ne Zaman Kullanılır', 'h2'),
        bullet('Yerel HTML\'in gerekli semantiği sağlayamadığı özel etkileşimli widget\'lar — sekmeler, akordeonlar, ağaç görünümleri.'),
        bullet('Ekran okuyuculara dinamik içerik güncellemelerini duyurmak için canlı bölgeler.'),
        bullet('Yapısal olarak ifade edilemeyen ilişkili öğeleri ilişkilendirmek için ilişkiler.'),
        bullet('Etkileşimli bileşenlerin mevcut durumunu iletmek için durum açıklaması.'),

        heading('Canlı Bölgeler', 'h2'),
        p('Canlı bölgeler, odak hareketi gerektirmeden ekran okuyucu kullanıcılarına dinamik içerik değişikliklerini duyurur. Arama sonuçları, form doğrulama mesajları, yükleme göstergeleri ve bildirim tostları için kullanın.'),
        code('<!-- aria-live="polite": mevcut konuşma bittikten sonra duyurur -->\n<div aria-live="polite" aria-atomic="true">\n  <!-- İçeriği buraya dinamik olarak enjekte edin -->\n</div>\n\n<!-- Yaygın hata: öğe DOM\'a girdikten SONRA aria-live enjekte etmek -->\n<!-- Öğe, içerik enjekte edilmeden ÖNCE DOM\'da olmalıdır -->\n<div aria-live="polite" class="ekran-okuyucu-duyurusu"></div>', 'html'),

        heading('Erişilebilir Adlar: Hiyerarşi', 'h2'),
        numbered('aria-labelledby — başka bir öğenin metnine başvurur. En yüksek öncelik.'),
        numbered('aria-label — doğrudan bir dize sağlar.'),
        numbered('HTML etiket öğesi — form girişleri için ilişkili <label> metni.'),
        numbered('Metin içeriği — düğmeler ve bağlantılar için öğenin içindeki metin.'),
        numbered('alt niteliği — görseller için alt metni.'),
      ],
    },
    resources: [
      { _key: 'sg17r1', title: 'W3C WAI-ARIA 1.2 Specification', url: 'https://www.w3.org/TR/wai-aria-1.2/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg17r2', title: 'W3C ARIA Authoring Practices Guide', url: 'https://www.w3.org/WAI/ARIA/apg/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg17r3', title: 'MDN: ARIA reference', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA', source: 'mdn', language: 'en' },
      { _key: 'sg17r4', title: 'Deque University: ARIA', url: 'https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr', source: 'deque', language: 'en' },
      { _key: 'sg17r5', title: 'W3C: Using ARIA (Five Rules)', url: 'https://www.w3.org/TR/using-aria/', source: 'w3c-wai', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'ARIA Roles and Properties Reference Guide', metaDescription: 'Practical WAI-ARIA reference covering the five rules of ARIA, core roles, states, live regions, and accessible name computation with HTML code examples.' },
      tr: { metaTitle: 'ARIA Rolleri ve Özellikleri Referans Rehberi', metaDescription: 'ARIA\'nın beş kuralı, temel roller, durumlar, canlı bölgeler ve erişilebilir ad hesaplamayı kapsayan pratik WAI-ARIA referansı.' },
    },
  },

  // ─── TECHNIQUE 5 ─────────────────────────────────────────────────────────────
  {
    category: 'technique',
    title: {
      en: 'Forms Accessibility Patterns',
      tr: 'Form Erişilebilirlik Kalıpları',
    },
    description: {
      en: 'Accessible form design patterns — labels, error handling, grouping, autocomplete, and validation — with code examples for common form components.',
      tr: 'Erişilebilir form tasarım kalıpları — etiketler, hata yönetimi, gruplama, otomatik tamamlama ve doğrulama — yaygın form bileşenleri için kod örnekleriyle.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-3-5', _key: 'tec5w135' },
      { _type: 'reference', _ref: 'wcag-3-3-1', _key: 'tec5w331' },
      { _type: 'reference', _ref: 'wcag-3-3-2', _key: 'tec5w332' },
      { _type: 'reference', _ref: 'wcag-4-1-2', _key: 'tec5w412' },
    ],
    content: {
      en: [
        heading('The Foundation: Labels', 'h2'),
        p('Every form control must have a programmatically associated label. This is required by WCAG 4.1.2 (Name, Role, Value) and 1.3.1 (Info and Relationships). When a user focuses an input with a screen reader, the first thing announced should be the label — not "edit text" or "text field" with no context.'),
        p('Four valid labeling methods, in order of preference:'),
        numbered('<label for="id"> — explicit association. The most reliable method. Use for all visible labels.'),
        numbered('aria-labelledby="id" — references another element\'s text. Use when the visible label is elsewhere in the DOM (e.g., a table cell header labeling an input in that row).'),
        numbered('aria-label="string" — inline string label. Use only when no visible label is practical (e.g., icon-only search input).'),
        numbered('title attribute — tooltip label. Avoid for primary labeling; it is not reliably announced on mobile screen readers.'),
        code('<!-- Explicit label (preferred) -->\n<label for="email">Email address</label>\n<input type="email" id="email" name="email" autocomplete="email">\n\n<!-- Visually hidden label (when design has no visible label) -->\n<label for="search" class="sr-only">Search guides</label>\n<input type="search" id="search" name="q" placeholder="e.g. keyboard testing">\n\n<!-- aria-label (icon-only input, last resort) -->\n<input type="search" aria-label="Search guides" name="q">\n\n<!-- aria-labelledby referencing multiple elements -->\n<label id="qty-label">Quantity</label>\n<input type="number" aria-labelledby="qty-label product-name" min="1" max="10">', 'html'),

        heading('Grouping Related Controls', 'h2'),
        p('Radio buttons, checkboxes, and any group of related inputs must be grouped with <fieldset> and <legend>. The legend provides the group label that screen readers announce before each individual option, giving users context.'),
        code('<fieldset>\n  <legend>Preferred contact method</legend>\n  <label>\n    <input type="radio" name="contact" value="email"> Email\n  </label>\n  <label>\n    <input type="radio" name="contact" value="phone"> Phone\n  </label>\n  <label>\n    <input type="radio" name="contact" value="post"> Post\n  </label>\n</fieldset>\n\n<!-- Screen reader announces:\n"Preferred contact method (group)"\n"Email, radio button, not checked"\n"Phone, radio button, not checked"\n"Post, radio button, not checked" -->', 'html'),

        heading('Error Handling: The Three Rules', 'h2'),
        p('WCAG 3.3.1 (Error Identification) requires errors to be described to the user in text. WCAG 3.3.3 (Error Suggestion) requires that fix suggestions be provided when known. Three rules make errors accessible:'),
        numbered('Identify the field in error by name, not just by color. "The Email field is required" — not just a red border.'),
        numbered('Describe the error. "Please enter a valid email address" — not just "invalid input".'),
        numbered('Associate the error message with the field programmatically so screen readers announce it when the field is focused.'),
        code('<!-- Accessible error message pattern -->\n<label for="email">Email address</label>\n<input\n  type="email"\n  id="email"\n  name="email"\n  aria-invalid="true"\n  aria-describedby="email-error"\n  required\n>\n<span id="email-error" role="alert">\n  Please enter a valid email address (e.g. name@example.com).\n</span>\n\n<!-- Error summary at top of form (for multi-field forms) -->\n<div role="alert" aria-labelledby="error-heading">\n  <h2 id="error-heading">3 errors prevented this form from being submitted</h2>\n  <ul>\n    <li><a href="#email">Email: Please enter a valid email address.</a></li>\n    <li><a href="#phone">Phone: Please enter digits only.</a></li>\n    <li><a href="#terms">Terms: You must accept the terms to continue.</a></li>\n  </ul>\n</div>', 'html'),

        heading('Autocomplete Attributes', 'h2'),
        p('WCAG 1.3.5 (Identify Input Purpose) requires that inputs collecting personal information have the correct autocomplete attribute value. This allows browsers to autofill the form, which benefits users with motor disabilities, cognitive disabilities, and dyslexia who struggle with typing.'),
        code('<input type="text" name="fname" autocomplete="given-name">\n<input type="text" name="lname" autocomplete="family-name">\n<input type="email" name="email" autocomplete="email">\n<input type="tel" name="phone" autocomplete="tel">\n<input type="text" name="address1" autocomplete="address-line1">\n<input type="text" name="city" autocomplete="address-level2">\n<input type="text" name="postcode" autocomplete="postal-code">\n<input type="text" name="country" autocomplete="country-name">\n<input type="password" name="new-password" autocomplete="new-password">\n<input type="password" name="current-password" autocomplete="current-password">\n<input type="text" name="cc-name" autocomplete="cc-name">\n<input type="text" name="cc-number" autocomplete="cc-number">\n<input type="text" name="cc-exp" autocomplete="cc-exp">', 'html'),

        heading('Required Fields', 'h2'),
        p('Indicate required fields clearly and programmatically. HTML required attribute ensures native browser validation and screen reader announcement. Supplement with a visible indicator (asterisk with legend, or "Required" text):'),
        code('<!-- At the top of the form -->\n<p>Fields marked with <span aria-hidden="true">*</span><span class="sr-only">an asterisk</span> are required.</p>\n\n<!-- Required field -->\n<label for="full-name">\n  Full name <span aria-hidden="true">*</span>\n</label>\n<input\n  type="text"\n  id="full-name"\n  name="fullname"\n  required\n  autocomplete="name"\n>', 'html'),

        heading('Complex Inputs: Date Pickers and File Uploads', 'h2'),
        p('Native date inputs (<input type="date">) have limited styling but are fully accessible without JavaScript. If you must use a custom date picker, it is one of the most complex ARIA patterns — refer to the W3C ARIA Authoring Practices "Dialog (Date Picker)" pattern.'),
        p('File upload inputs should be labeled and accompanied by instructions about accepted formats and size limits:'),
        code('<label for="cv-upload">Upload your CV (PDF or Word, max 5MB)</label>\n<input\n  type="file"\n  id="cv-upload"\n  name="cv"\n  accept=".pdf,.doc,.docx"\n  aria-describedby="cv-hint"\n>\n<p id="cv-hint">Accepted formats: PDF, DOC, DOCX. Maximum file size: 5MB.</p>', 'html'),
      ],
      tr: [
        heading('Temel: Etiketler', 'h2'),
        p('Her form kontrolünün programlı olarak ilişkilendirilmiş bir etiketi olmalıdır. Tercih sırasına göre dört geçerli etiketleme yöntemi:'),
        numbered('<label for="id"> — açık ilişkilendirme. En güvenilir yöntem.'),
        numbered('aria-labelledby="id" — başka bir öğenin metnine başvurur.'),
        numbered('aria-label="string" — satır içi dize etiket.'),
        numbered('title niteliği — araç ipucu etiketi. Birincil etiketleme için kaçının.'),
        code('<!-- Açık etiket (tercih edilen) -->\n<label for="email">E-posta adresi</label>\n<input type="email" id="email" name="email" autocomplete="email">', 'html'),

        heading('İlgili Kontrolleri Gruplama', 'h2'),
        p('Radyo düğmeleri, onay kutuları ve ilgili girişler grubu <fieldset> ve <legend> ile gruplandırılmalıdır. Legend, kullanıcılara bağlam sağlamak için ekran okuyucuların her bir seçenekten önce duyurduğu grup etiketini sağlar.'),
        code('<fieldset>\n  <legend>Tercih edilen iletişim yöntemi</legend>\n  <label><input type="radio" name="iletisim" value="email"> E-posta</label>\n  <label><input type="radio" name="iletisim" value="telefon"> Telefon</label>\n</fieldset>', 'html'),

        heading('Hata Yönetimi: Üç Kural', 'h2'),
        numbered('Hatadaki alanı yalnızca renkle değil, adıyla tanımlayın.'),
        numbered('Hatayı açıklayın — "Lütfen geçerli bir e-posta adresi girin".'),
        numbered('Hata mesajını ekran okuyucuların alan odaklandığında duyurabilmesi için programlı olarak alanla ilişkilendirin.'),
        code('<label for="email">E-posta adresi</label>\n<input\n  type="email"\n  id="email"\n  aria-invalid="true"\n  aria-describedby="email-hata"\n  required\n>\n<span id="email-hata" role="alert">\n  Lütfen geçerli bir e-posta adresi girin (örn. ad@ornek.com).\n</span>', 'html'),

        heading('Otomatik Tamamlama Nitelikleri', 'h2'),
        p('WCAG 1.3.5, kişisel bilgi toplayan girişlerin doğru otomatik tamamlama nitelik değerine sahip olmasını gerektirir. Bu, tarayıcıların formu otomatik doldurmasına olanak tanır; motor engelli, bilişsel engelli ve disleksisi olan kullanıcılara fayda sağlar.'),

        heading('Gerekli Alanlar', 'h2'),
        p('Gerekli alanları açıkça ve programlı olarak belirtin. HTML required niteliği yerel tarayıcı doğrulamasını ve ekran okuyucu duyurusunu sağlar. Görünür bir göstergeyle (açıklamalı yıldız veya "Gerekli" metni) tamamlayın.'),
      ],
    },
    resources: [
      { _key: 'sg18r1', title: 'W3C WAI: Forms Tutorial', url: 'https://www.w3.org/WAI/tutorials/forms/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg18r2', title: 'MDN: HTML forms guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', source: 'mdn', language: 'en' },
      { _key: 'sg18r3', title: 'WebAIM: Creating Accessible Forms', url: 'https://webaim.org/techniques/forms/', source: 'webaim', language: 'en' },
      { _key: 'sg18r4', title: 'WCAG 1.3.5: Identify Input Purpose', url: 'https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg18r5', title: 'Deque: Form Accessibility', url: 'https://dequeuniversity.com/checklists/web/forms', source: 'deque', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Forms Accessibility Patterns | WCAG Guide', metaDescription: 'Accessible form patterns with code examples. Covers labels, fieldset/legend, error handling, autocomplete attributes, required fields, and complex inputs.' },
      tr: { metaTitle: 'Form Erişilebilirlik Kalıpları | WCAG Rehberi', metaDescription: 'Kod örnekleriyle erişilebilir form kalıpları. Etiketler, fieldset/legend, hata yönetimi, otomatik tamamlama nitelikleri ve gerekli alanları kapsar.' },
    },
  },

  // ─── BEST PRACTICE 1 ─────────────────────────────────────────────────────────
  {
    category: 'best-practice',
    title: {
      en: 'Accessibility Testing Workflow',
      tr: 'Erişilebilirlik Test İş Akışı',
    },
    description: {
      en: 'Build a repeatable, efficient accessibility testing workflow that combines automated scanning, manual testing, and user testing — from design handoff to production.',
      tr: 'Otomatik tarama, manuel test ve kullanıcı testini bir araya getiren — tasarım tesliminden üretime kadar — tekrarlanabilir, verimli bir erişilebilirlik test iş akışı oluşturun.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-1-1', _key: 'bp1w111' },
      { _type: 'reference', _ref: 'wcag-2-1-1', _key: 'bp1w211' },
    ],
    content: {
      en: [
        heading('The Testing Pyramid', 'h2'),
        p('Accessibility testing mirrors the software testing pyramid. At the base are automated tests (fast, cheap, catches ~35% of issues). In the middle are manual tests (slower, more expensive, catches another ~50%). At the top are user tests with disabled users (slowest, most expensive, but provides insight that no tool can replicate).'),
        p('A mature accessibility workflow runs all three layers, tuned to the stage of development. Design-phase testing prevents expensive fixes. CI/CD automated tests provide continuous assurance. Pre-release manual testing catches what automation misses. Periodic user testing validates the real-world experience.'),

        heading('Phase 1: Design Review', 'h2'),
        p('Accessibility testing starts in Figma, not in the browser. Issues found in design cost 10–100x less to fix than issues found in production. Design-phase checks:'),
        bullet('Color contrast — use Figma contrast plugins (Contrast, A11y Annotation Kit) to verify all text meets 4.5:1 (normal) or 3:1 (large).'),
        bullet('Tap target sizes — verify all interactive elements are at least 44×44px.'),
        bullet('Focus order documentation — annotate the intended tab order using accessibility annotation kits.'),
        bullet('State designs — ensure hover, focus, active, disabled, and error states are designed for every interactive component.'),
        bullet('Heading structure review — verify the page has a logical heading hierarchy.'),
        bullet('Accessible name review — verify every interactive element has a text label in the design spec.'),

        heading('Phase 2: Development — Automated CI Testing', 'h2'),
        p('Integrate automated accessibility testing into your CI/CD pipeline so every pull request is checked before merging:'),
        code('// Example: axe-core with Playwright in CI\nimport { test, expect } from \'@playwright/test\';\nimport AxeBuilder from \'@axe-core/playwright\';\n\ntest(\'homepage should have no accessibility violations\', async ({ page }) => {\n  await page.goto(\'/\');\n  const accessibilityScanResults = await new AxeBuilder({ page })\n    .withTags([\'wcag2a\', \'wcag2aa\', \'wcag21aa\', \'wcag22aa\'])\n    .analyze();\n  expect(accessibilityScanResults.violations).toEqual([]);\n});\n\n// Test all page templates\nconst pageTemplates = [\'/\', \'/guides\', \'/guides/keyboard-testing\', \'/contact\'];\nfor (const url of pageTemplates) {\n  test(`${url} passes axe`, async ({ page }) => {\n    await page.goto(url);\n    const results = await new AxeBuilder({ page }).withTags([\'wcag2aa\']).analyze();\n    expect(results.violations).toEqual([]);\n  });\n}', 'javascript'),
        bullet('Use axe-core via Playwright, Cypress, or Jest + jsdom.'),
        bullet('Block merges on any axe violations with impact "critical" or "serious".'),
        bullet('Run Lighthouse CI for performance + accessibility combined checks.'),
        bullet('Store results over time to catch regressions — a violation that passes once and fails next sprint is a regression.'),

        heading('Phase 3: Pre-Release Manual Testing', 'h2'),
        p('Before each release, run a structured manual test across the modified page templates. Use a testing checklist that mirrors WCAG 2.2 AA criteria:'),
        bullet('Keyboard navigation — Tab through every interactive element. Check focus order, focus visibility, and keyboard traps.'),
        bullet('Screen reader — NVDA+Firefox minimum. Verify headings, links, forms, images, dynamic content.'),
        bullet('Color contrast — run Colour Contrast Analyser on all new UI components and states.'),
        bullet('Zoom test — zoom to 200% and 400% in Chrome. Verify no content or functionality is lost.'),
        bullet('Mobile — test with iOS VoiceOver and Android TalkBack on real devices.'),
        bullet('Resize text — increase browser font size to 200% (browser settings). Verify layout does not break.'),

        heading('Phase 4: User Testing', 'h2'),
        p('Quarterly user testing sessions with disabled users provide qualitative insight that no automated or manual tool can replicate. Recruit participants across disability types: blind users (screen reader users), low-vision users, keyboard-only users, users with cognitive disabilities, and users with motor disabilities using alternative input devices.'),
        p('Testing sessions should be task-based, not exploratory. Define 4–6 specific tasks (e.g., "Find the keyboard navigation testing guide and save it to your reading list") and observe how participants attempt to complete them. Avoid prompting or helping — the friction points are the findings.'),

        heading('Issue Tracking and Prioritization', 'h2'),
        p('Use a consistent severity scale for accessibility issues:'),
        bullet('Critical — users with disabilities cannot access core functionality. Blocks affected users completely. Examples: keyboard trap, missing form labels, missing alt text on functional images. Fix before release.'),
        bullet('Serious — users with disabilities have severe difficulty. Partial workaround may exist. Examples: missing heading structure, color-only error indication, missing accessible name on icon buttons. Fix in current sprint.'),
        bullet('Moderate — some difficulty for users with disabilities. A workaround exists. Examples: suboptimal focus order, inconsistent navigation. Fix in next sprint.'),
        bullet('Minor — nuisance issues with minimal impact. Fix in backlog.'),
      ],
      tr: [
        heading('Test Piramidi', 'h2'),
        p('Erişilebilirlik testi yazılım test piramidini yansıtır. Tabanda otomatik testler (hızlı, ucuz, ~%35 sorunu yakalar). Ortada manuel testler (daha yavaş, daha pahalı, ek ~%50). Üstte engelli kullanıcılarla kullanıcı testleri bulunur. Olgun bir erişilebilirlik iş akışı üç katmanı da çalıştırır.'),

        heading('Aşama 1: Tasarım İncelemesi', 'h2'),
        bullet('Renk kontrastı — Figma kontrast eklentileriyle tüm metnin gereksinimleri karşıladığını doğrulayın.'),
        bullet('Dokunma hedefi boyutları — tüm etkileşimli öğelerin en az 44×44 piksel olduğunu doğrulayın.'),
        bullet('Odak sırası dokümantasyonu — erişilebilirlik ek açıklama kitleri kullanarak amaçlanan sekme sırasını belirtin.'),
        bullet('Durum tasarımları — her etkileşimli bileşen için hover, odak, etkin, devre dışı ve hata durumlarının tasarlandığından emin olun.'),

        heading('Aşama 2: Geliştirme — Otomatik CI Testi', 'h2'),
        p('Her birleştirme öncesinde her pull request\'in kontrol edilmesi için CI/CD hattınıza otomatik erişilebilirlik testi entegre edin.'),
        code('// Playwright ile axe-core örneği\nimport { test, expect } from \'@playwright/test\';\nimport AxeBuilder from \'@axe-core/playwright\';\n\ntest(\'ana sayfa erişilebilirlik ihlali içermemeli\', async ({ page }) => {\n  await page.goto(\'/\');\n  const sonuclar = await new AxeBuilder({ page })\n    .withTags([\'wcag2aa\'])\n    .analyze();\n  expect(sonuclar.violations).toEqual([]);\n});', 'javascript'),

        heading('Aşama 3: Sürüm Öncesi Manuel Test', 'h2'),
        bullet('Klavye gezinme — her etkileşimli öğede Tab ile gezinin.'),
        bullet('Ekran okuyucu — NVDA+Firefox minimum. Başlıkları, bağlantıları, formları doğrulayın.'),
        bullet('Renk kontrastı — tüm yeni UI bileşenlerinde Colour Contrast Analyser çalıştırın.'),
        bullet('Zoom testi — Chrome\'da %200 ve %400 yakınlaştırın.'),

        heading('Sorun Takibi ve Önceliklendirme', 'h2'),
        bullet('Kritik — engelli kullanıcılar temel işlevselliğe erişemiyor. Sürümden önce düzeltin.'),
        bullet('Ciddi — engelli kullanıcılar ciddi güçlük çekiyor. Mevcut sprint\'te düzeltin.'),
        bullet('Orta — engelli kullanıcılar için bazı güçlükler mevcut. Sonraki sprint\'te düzeltin.'),
        bullet('Küçük — minimal etkili rahatsızlık sorunları. Biriktirme listesine ekleyin.'),
      ],
    },
    resources: [
      { _key: 'sg19r1', title: 'axe-core: Playwright integration', url: 'https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright', source: 'axe-core', language: 'en' },
      { _key: 'sg19r2', title: 'W3C WAI: Involving Users in Evaluation', url: 'https://www.w3.org/WAI/test-evaluate/involving-users/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg19r3', title: 'Deque: Accessibility Testing Methodology', url: 'https://www.deque.com/shift-left-testing/', source: 'deque', language: 'en' },
      { _key: 'sg19r4', title: 'WebAIM: Testing and Reporting', url: 'https://webaim.org/resources/evalquickref/', source: 'webaim', language: 'en' },
      { _key: 'sg19r5', title: 'A11y Project: Checklist', url: 'https://www.a11yproject.com/checklist/', source: 'a11y-project', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Accessibility Testing Workflow | Design to Prod', metaDescription: 'Build a repeatable accessibility testing workflow. Covers design review, CI/CD automation with axe-core, manual testing checklist, and user testing with disabled users.' },
      tr: { metaTitle: 'Erişilebilirlik Test İş Akışı | Tasarımdan Üretime', metaDescription: 'Tekrarlanabilir erişilebilirlik test iş akışı oluşturun. Tasarım incelemesi, axe-core ile CI/CD otomasyonu, manuel test kontrol listesi ve kullanıcı testini kapsar.' },
    },
  },

  // ─── BEST PRACTICE 2 ─────────────────────────────────────────────────────────
  {
    category: 'best-practice',
    title: {
      en: 'WCAG Conformance Levels Explained',
      tr: 'WCAG Uyumluluk Seviyeleri Açıklandı',
    },
    description: {
      en: 'A clear explanation of WCAG A, AA, and AAA conformance levels — what each level covers, what the law requires, and how to plan your conformance target.',
      tr: 'WCAG A, AA ve AAA uyumluluk seviyelerinin net bir açıklaması — her seviyenin neleri kapsadığı, yasanın ne gerektirdiği ve uyumluluk hedefinizi nasıl planlayacağınız.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-1-1', _key: 'bp2w111' },
      { _type: 'reference', _ref: 'wcag-2-1-1', _key: 'bp2w211' },
    ],
    content: {
      en: [
        heading('What Are WCAG Conformance Levels', 'h2'),
        p('The Web Content Accessibility Guidelines (WCAG) organize their 87 success criteria into three conformance levels: A (most basic), AA (standard), and AAA (highest). These levels reflect the impact on users and the feasibility of implementation. Level A criteria represent barriers so severe that they block access for entire groups of users. Level AA criteria address the most significant remaining barriers. Level AAA criteria provide enhanced accessibility for specific user groups and are not always achievable for all content types.'),
        p('Conformance is binary: a page either meets a criterion or it does not. There is no partial credit. A site claiming "WCAG 2.2 AA conformance" means every page on the site meets all Level A and AA criteria.'),

        heading('Level A: The Baseline', 'h2'),
        p('WCAG 2.2 contains 30 Level A success criteria. These represent the absolute minimum — failing any one of them creates a barrier that completely blocks access for at least one user group. Level A failures are typically severe: missing alt text on images (blocks blind users), keyboard inaccessibility (blocks keyboard-only users), no captions on video (blocks deaf users).'),
        p('Notable Level A criteria include: 1.1.1 Non-text Content, 1.3.1 Info and Relationships, 1.4.1 Use of Color (not color alone), 2.1.1 Keyboard, 2.1.2 No Keyboard Trap, 2.4.1 Bypass Blocks, 2.4.2 Page Titled, 3.1.1 Language of Page, 4.1.2 Name Role Value.'),

        heading('Level AA: The Legal Standard', 'h2'),
        p('WCAG 2.2 contains 20 Level AA success criteria, bringing the total to 50 when combined with Level A. Level AA is the conformance target required by virtually all accessibility laws globally:'),
        bullet('EU: EU Web Accessibility Directive (2016/2102) — WCAG 2.1 AA required for public sector websites.'),
        bullet('EU: European Accessibility Act (EAA, effective June 2025) — WCAG 2.1 AA for private sector products and services.'),
        bullet('US: Section 508 of the Rehabilitation Act — WCAG 2.0 AA for federal agencies and their contractors.'),
        bullet('US: ADA — courts have increasingly interpreted WCAG 2.1 AA as the standard.'),
        bullet('UK: Equality Act 2010 — WCAG 2.1 AA interpreted as the standard.'),
        bullet('Canada: AODA (Ontario) — WCAG 2.0 AA required.'),
        bullet('Australia: DDA — WCAG 2.0 AA as the baseline.'),
        p('Key Level AA criteria not in Level A include: 1.4.3 Contrast Minimum, 1.4.4 Resize Text, 1.4.5 Images of Text, 1.4.10 Reflow, 1.4.11 Non-text Contrast, 1.4.12 Text Spacing, 2.4.6 Headings and Labels, 2.4.7 Focus Visible, 3.1.2 Language of Parts, 3.3.3 Error Suggestion, 3.3.4 Error Prevention.'),

        heading('Level AAA: Enhanced Accessibility', 'h2'),
        p('WCAG 2.2 contains 28 Level AAA criteria. The W3C explicitly states that not all Level AAA criteria can be satisfied for all content. Level AAA is not required by law for general web content but is appropriate for:'),
        bullet('Sites serving users with severe cognitive disabilities — 3.1.3 Unusual Words, 3.1.4 Abbreviations, 3.1.5 Reading Level.'),
        bullet('Sites heavily used by deaf-blind users — 1.2.9 Audio-only (Live), 1.4.9 Images of Text (No Exception).'),
        bullet('Critical accessibility-focused applications — 2.1.3 Keyboard (No Exception), 2.2.3 No Timing.'),
        p('As a best practice, aim for Level AAA on criteria that are achievable for your content without undue burden. For example, providing sign language interpretation (1.2.6) may not be feasible, but meeting 2.4.8 Location or 3.1.5 Reading Level often is.'),

        heading('Planning Your Conformance Target', 'h2'),
        p('Most organizations should target WCAG 2.2 AA as their conformance goal. The practical planning steps are:'),
        numbered('Start with a baseline audit — run automated tools and a manual review to understand your current conformance state.'),
        numbered('Triage by severity — fix all Level A failures first (they are the most severe). Then fix Level AA failures.'),
        numbered('Prioritize high-traffic pages and critical user journeys — the checkout flow, login, account management, and core content pages first.'),
        numbered('Set a realistic timeline — a mid-size site typically requires 3–6 months to achieve AA conformance from a poor baseline.'),
        numbered('Publish an accessibility statement — declare your conformance target, current known issues, and a contact for users who encounter barriers.'),
        numbered('Maintain conformance — accessibility is not a one-time project. Add accessibility to your definition of done for all new features.'),

        heading('WCAG Version Strategy: 2.1 vs 2.2', 'h2'),
        p('WCAG 2.2 is backward compatible with WCAG 2.1 — all 2.1 AA criteria are included in 2.2 AA, with one exception: 4.1.1 Parsing was removed. If you currently meet WCAG 2.1 AA, you need to address the 9 new 2.2 criteria to reach 2.2 AA conformance. The most impactful new 2.2 criteria are: 2.4.11 Focus Appearance, 2.4.12 Focus Not Obscured, 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), and 3.2.6 Consistent Help.'),
      ],
      tr: [
        heading('WCAG Uyumluluk Seviyeleri Nelerdir', 'h2'),
        p('Web İçeriği Erişilebilirlik Yönergeleri (WCAG), 87 başarı kriterini üç uyumluluk seviyesinde düzenler: A (en temel), AA (standart) ve AAA (en yüksek). Uyumluluk ikilidir: bir sayfa bir kriteri karşılar ya da karşılamaz.'),

        heading('Seviye A: Temel', 'h2'),
        p('WCAG 2.2, 30 Seviye A başarı kriteri içerir. Bunlar mutlak minimumu temsil eder — bunlardan herhangi birinin başarısız olması, en az bir kullanıcı grubu için tamamen erişimi engelleyen bir bariyer oluşturur.'),

        heading('Seviye AA: Yasal Standart', 'h2'),
        p('WCAG 2.2, 20 Seviye AA başarı kriteri içerir ve Seviye A ile birleştirildiğinde toplamı 50\'ye çıkarır. Seviye AA, küresel olarak neredeyse tüm erişilebilirlik yasaları tarafından gerektirilen uyumluluk hedefidir.'),
        bullet('AB: AB Web Erişilebilirlik Direktifi — kamu sektörü web siteleri için WCAG 2.1 AA.'),
        bullet('AB: Avrupa Erişilebilirlik Yasası (Haziran 2025\'ten itibaren yürürlükte) — özel sektör için WCAG 2.1 AA.'),
        bullet('ABD: Bölüm 508 — federal kurumlar için WCAG 2.0 AA.'),
        bullet('Türkiye: e-Devlet hizmetleri için WCAG 2.1 AA benimsenmektedir.'),

        heading('Seviye AAA: Geliştirilmiş Erişilebilirlik', 'h2'),
        p('WCAG 2.2, 28 Seviye AAA kriteri içerir. W3C, tüm Seviye AAA kriterlerinin tüm içerikler için karşılanamayabileceğini açıkça belirtir. Seviye AAA genel web içeriği için yasal olarak zorunlu değildir.'),

        heading('Uyumluluk Hedefinizi Planlamak', 'h2'),
        numbered('Temel denetimiyle başlayın — mevcut uyumluluk durumunuzu anlamak için otomatik araçlar ve manuel inceleme yapın.'),
        numbered('Önce tüm Seviye A hatalarını düzeltin, ardından Seviye AA hatalarını.'),
        numbered('Yüksek trafikli sayfalar ve kritik kullanıcı yolculuklarına öncelik verin.'),
        numbered('Bir erişilebilirlik beyanı yayımlayın — uyumluluk hedefinizi, mevcut bilinen sorunları ve engelle karşılaşan kullanıcılar için iletişim bilgilerini duyurun.'),
        numbered('Uyumluluğu koruyun — erişilebilirlik tek seferlik bir proje değildir.'),

        heading('WCAG Sürüm Stratejisi: 2.1 ve 2.2', 'h2'),
        p('WCAG 2.2, WCAG 2.1 ile geriye dönük uyumludur. Halihazırda WCAG 2.1 AA\'yı karşılıyorsanız, 2.2 AA uyumluluğuna ulaşmak için 9 yeni 2.2 kriterini ele almanız gerekir.'),
      ],
    },
    resources: [
      { _key: 'sg20r1', title: 'W3C: Understanding WCAG 2.2 Conformance', url: 'https://www.w3.org/WAI/WCAG22/Understanding/conformance', source: 'w3c-understanding', language: 'en' },
      { _key: 'sg20r2', title: 'W3C WAI: Web Accessibility Laws & Policies', url: 'https://www.w3.org/WAI/policies/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg20r3', title: 'WebAIM: WCAG 2 Checklist', url: 'https://webaim.org/standards/wcag/checklist', source: 'webaim', language: 'en' },
      { _key: 'sg20r4', title: 'Deque: WCAG 2.2 New Success Criteria', url: 'https://www.deque.com/blog/wcag-2-2-new-success-criteria/', source: 'deque', language: 'en' },
      { _key: 'sg20r5', title: 'A11y Project: Understanding WCAG Levels', url: 'https://www.a11yproject.com/posts/understanding-wcag-levels/', source: 'a11y-project', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'WCAG Conformance Levels A, AA, AAA Explained', metaDescription: 'Understand WCAG conformance levels A, AA, and AAA. Covers what each level means, global legal requirements, and how to plan your conformance roadmap.' },
      tr: { metaTitle: 'WCAG Uyumluluk Seviyeleri A, AA, AAA Açıklandı', metaDescription: 'WCAG uyumluluk seviyelerini anlayın. Her seviyenin ne anlama geldiği, küresel yasal gereksinimler ve uyumluluk yol haritanızı nasıl planlayacağınızı kapsar.' },
    },
  },

  // ─── BEST PRACTICE 3 ─────────────────────────────────────────────────────────
  {
    category: 'best-practice',
    title: {
      en: 'Accessibility Statement Template',
      tr: 'Erişilebilirlik Beyanı Şablonu',
    },
    description: {
      en: 'How to write a legally compliant, transparent accessibility statement — what to include, how to maintain it, and a complete template for EU and global compliance.',
      tr: 'Yasal olarak uyumlu, şeffaf bir erişilebilirlik beyanı nasıl yazılır — nelerin dahil edileceği, nasıl sürdürüleceği ve AB ile küresel uyumluluk için eksiksiz bir şablon.',
    },
    relatedWcagRules: [],
    content: {
      en: [
        heading('Why an Accessibility Statement Is Required', 'h2'),
        p('An accessibility statement is a public declaration of your site\'s conformance with accessibility standards, the known barriers that remain, and how users who encounter problems can contact you. It is legally required in the European Union under the Web Accessibility Directive for public sector bodies and under the European Accessibility Act for private sector organizations. It is strongly recommended for all organizations globally as a demonstration of commitment and as a legal risk mitigation measure.'),
        p('Beyond legal compliance, an honest accessibility statement builds trust with disabled users. It acknowledges that accessibility is an ongoing process, identifies known barriers so users can make informed decisions, and provides a clear escalation path when barriers prevent access.'),

        heading('Required Elements (EU Web Accessibility Directive)', 'h2'),
        p('The EU WAD specifies that an accessibility statement must include:'),
        numbered('Compliance status — fully compliant, partially compliant, or non-compliant with the applicable standard.'),
        numbered('Non-accessible content — a description of the content that is not accessible, with the reason (non-compliance, disproportionate burden, content not within the scope of the legislation).'),
        numbered('Accessible alternatives — descriptions of accessible alternatives where they exist.'),
        numbered('Contact mechanism — an email address or contact form for users to report problems.'),
        numbered('Enforcement procedure — the process for filing a complaint if the response is unsatisfactory.'),
        numbered('Date — the date the statement was prepared or last reviewed.'),

        heading('Accessibility Statement Template', 'h2'),
        blockquote('ACCESSIBILITY STATEMENT\n\nLast updated: [Date]\n\nThis accessibility statement applies to [Website name] at [URL].\n\nCONFORMANCE STATUS\n[Website name] aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. We believe this site is [fully / partially / not] compliant with WCAG 2.2 AA.\n\nKNOWN ISSUES\nWe are aware of the following accessibility issues:\n- [Issue 1: Description, affected pages, planned fix date]\n- [Issue 2: Description, affected pages, planned fix date]\n\nWe are actively working to resolve these issues. We aim to fix all critical issues by [date].\n\nCOMPATIBILITY\nThis site is designed to work with the following assistive technologies:\n- NVDA with Firefox on Windows\n- JAWS with Chrome on Windows\n- VoiceOver with Safari on macOS and iOS\n- TalkBack with Chrome on Android\n\nTECHNICAL SPECIFICATIONS\nAccessibility relies on the following technologies: HTML, CSS, JavaScript, and WAI-ARIA.\n\nFEEDBACK AND CONTACT\nWe welcome feedback on accessibility. If you experience barriers, please contact us:\n- Email: [accessibility@example.com]\n- Phone: [+1 xxx xxx xxxx]\n- Contact form: [URL]\n\nWe will respond within 2 business days.\n\nENFORCEMENT PROCEDURE (EU)\nIf you are not satisfied with our response, you may contact the [National Enforcement Body name] at [URL].'),

        heading('Maintaining Your Accessibility Statement', 'h2'),
        p('An accessibility statement is not a one-time document. It requires active maintenance:'),
        bullet('Review the statement quarterly and update the "Last updated" date.'),
        bullet('When new issues are found (from audits, user reports, or automated scans), add them to the known issues section within 30 days.'),
        bullet('When issues are resolved, remove them from the known issues section.'),
        bullet('After each major release or site redesign, re-audit and update the conformance status.'),
        bullet('If your conformance status changes (improves or worsens), update the statement within 30 days.'),

        heading('Placement and Discoverability', 'h2'),
        p('The accessibility statement must be easy to find. Best practices:'),
        bullet('Link to the accessibility statement in the site footer, alongside Privacy Policy and Terms of Service.'),
        bullet('Host at a predictable URL: /accessibility or /accessibility-statement.'),
        bullet('Include a link in the main navigation on public-sector sites.'),
        bullet('Ensure the accessibility statement page is itself accessible — it must be reachable and readable by the users who need it most.'),

        heading('VPAT: The Enterprise Accessibility Statement', 'h2'),
        p('A Voluntary Product Accessibility Template (VPAT) is a more detailed accessibility conformance report used in B2B and government procurement. It maps each WCAG criterion to a conformance status (supports, partially supports, does not support) with explanations. If your product is sold to enterprises or government, a VPAT is often contractually required. The ITIC.org provides the official VPAT template format (VPAT 2.4 WCAG for web products).'),
      ],
      tr: [
        heading('Erişilebilirlik Beyanı Neden Gereklidir', 'h2'),
        p('Erişilebilirlik beyanı, sitenizin erişilebilirlik standartlarına uygunluğunun, kalan bilinen engellerin ve sorunlarla karşılaşan kullanıcıların nasıl iletişime geçebileceğinin kamuya açık bildirimidir. AB\'de kamu sektörü kuruluşları için Web Erişilebilirlik Direktifi kapsamında ve özel sektör kuruluşları için Avrupa Erişilebilirlik Yasası kapsamında yasal olarak zorunludur.'),

        heading('Gerekli Unsurlar (AB Web Erişilebilirlik Direktifi)', 'h2'),
        numbered('Uyumluluk durumu — uygulanabilir standarda tam, kısmen veya uyumsuz.'),
        numbered('Erişilemeyen içerik — erişilemeyen içeriğin ve nedeninin açıklaması.'),
        numbered('Erişilebilir alternatifler — mevcut olduğunda erişilebilir alternatiflerin açıklamaları.'),
        numbered('İletişim mekanizması — kullanıcıların sorunları bildirebileceği e-posta adresi veya iletişim formu.'),
        numbered('Yaptırım prosedürü — yanıt tatmin edici değilse şikâyet dosyalama süreci.'),
        numbered('Tarih — beyanın hazırlandığı veya en son incelendiği tarih.'),

        heading('Erişilebilirlik Beyanı Şablonu', 'h2'),
        blockquote('ERİŞİLEBİLİRLİK BEYANI\n\nSon güncelleme: [Tarih]\n\nBu erişilebilirlik beyanı, [URL] adresindeki [Web sitesi adı] için geçerlidir.\n\nUYUMLULUK DURUMU\n[Web sitesi adı], Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.2 Düzey AA\'ya uymayı hedeflemektedir. Bu sitenin WCAG 2.2 AA ile [tam / kısmen / uyumlu olmayan] olduğuna inanıyoruz.\n\nBİLİNEN SORUNLAR\nAşağıdaki erişilebilirlik sorunlarının farkındayız:\n- [Sorun 1: Açıklama, etkilenen sayfalar, planlanan düzeltme tarihi]\n\nGERİ BİLDİRİM VE İLETİŞİM\nErişilebilirlik konusundaki geri bildirimlerinizi memnuniyetle karşılıyoruz:\n- E-posta: [erisilebilirlik@ornek.com]\n- İletişim formu: [URL]\n\n2 iş günü içinde yanıt vereceğiz.'),

        heading('Erişilebilirlik Beyanınızı Sürdürmek', 'h2'),
        bullet('Beyanı üç ayda bir gözden geçirin ve "Son güncelleme" tarihini güncelleyin.'),
        bullet('Yeni sorunlar bulunduğunda 30 gün içinde bilinen sorunlar bölümüne ekleyin.'),
        bullet('Sorunlar çözüldüğünde bilinen sorunlar bölümünden kaldırın.'),
        bullet('Her büyük sürüm veya site yeniden tasarımından sonra yeniden denetleyin.'),

        heading('Yerleştirme ve Keşfedilebilirlik', 'h2'),
        bullet('Site altbilgisinde erişilebilirlik beyanına bağlantı verin.'),
        bullet('/erisilebilirlik gibi öngörülebilir bir URL\'de barındırın.'),
        bullet('Erişilebilirlik beyanı sayfasının kendisinin erişilebilir olduğundan emin olun.'),
      ],
    },
    resources: [
      { _key: 'sg21r1', title: 'W3C WAI: Developing an Accessibility Statement', url: 'https://www.w3.org/WAI/planning/statements/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg21r2', title: 'EU Web Accessibility Directive', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016L2102', source: 'other', language: 'en' },
      { _key: 'sg21r3', title: 'ITIC: VPAT Template', url: 'https://www.itic.org/policy/accessibility/vpat', source: 'other', language: 'en' },
      { _key: 'sg21r4', title: 'WebAIM: Accessibility Policy Generator', url: 'https://webaim.org/resources/policy/', source: 'webaim', language: 'en' },
      { _key: 'sg21r5', title: 'Deque: Writing an Accessibility Statement', url: 'https://www.deque.com/blog/accessibility-statement/', source: 'deque', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Accessibility Statement Template & Guide', metaDescription: 'Write a legally compliant accessibility statement. Covers EU WAD requirements, a complete template, maintenance schedule, and VPAT for enterprise.' },
      tr: { metaTitle: 'Erişilebilirlik Beyanı Şablonu ve Rehberi', metaDescription: 'Yasal olarak uyumlu bir erişilebilirlik beyanı yazın. AB Web Erişilebilirlik Direktifi gereksinimleri, eksiksiz şablon ve bakım planını kapsar.' },
    },
  },

  // ─── BEST PRACTICE 4 ─────────────────────────────────────────────────────────
  {
    category: 'best-practice',
    title: {
      en: 'Inclusive Design Principles',
      tr: 'Kapsayıcı Tasarım İlkeleri',
    },
    description: {
      en: 'The seven principles of inclusive design — how to move beyond compliance-driven accessibility to build products that work better for everyone from the start.',
      tr: 'Kapsayıcı tasarımın yedi ilkesi — uyumluluk odaklı erişilebilirliğin ötesine geçerek en başından herkes için daha iyi çalışan ürünler oluşturma.',
    },
    relatedWcagRules: [
      { _type: 'reference', _ref: 'wcag-1-4-10', _key: 'bp4w1410' },
      { _type: 'reference', _ref: 'wcag-3-1-5', _key: 'bp4w315' },
    ],
    content: {
      en: [
        heading('Beyond Compliance: What Inclusive Design Means', 'h2'),
        p('Accessibility compliance — meeting WCAG AA — is a floor, not a ceiling. It specifies the minimum requirements to avoid excluding people with disabilities. Inclusive design goes further: it is a methodology for creating products, services, and environments that work well for the widest possible range of human diversity from the beginning of the design process, not as an afterthought.'),
        p('The distinction matters practically. A site can technically meet WCAG AA and still be frustrating to use for screen reader users, incomprehensible for users with cognitive disabilities, or unusable on low-end devices. Inclusive design asks: "Who is excluded by this design decision, and how can we include them without degrading the experience for others?"'),

        heading('Principle 1: Recognize Exclusion', 'h2'),
        p('Exclusion is often invisible to those it does not affect. Designers and developers build products for users who are like themselves: young, sighted, keyboard-skilled, English-speaking, using the latest hardware on a fast connection. Recognizing exclusion means actively asking who this design fails and why.'),
        p('Disability is not only permanent. The Microsoft Inclusive Design toolkit introduced the concept of the disability spectrum: permanent (a person with one arm), temporary (a person with a broken arm), and situational (a parent holding an infant). Designing for the permanent case improves the product for everyone in the temporary and situational cases — often a far larger population.'),
        bullet('Permanent: blindness, deafness, limited mobility.'),
        bullet('Temporary: eye surgery recovery, ear infection, broken wrist.'),
        bullet('Situational: bright sunlight on a phone screen, noisy environment, holding a baby.'),

        heading('Principle 2: Learn from Diversity', 'h2'),
        p('The most insightful product improvements often come from people at the extremes of the ability spectrum. Closed captions were designed for deaf users; they are now used by millions of people in noisy environments, learning languages, or improving comprehension. Curb cuts were designed for wheelchair users; they benefit cyclists, delivery workers, and parents with strollers.'),
        p('Involve disabled users early and continuously — in user research, design critique, and usability testing. Their feedback reveals friction points that affect everyone, even if others work around them without noticing. The best accessibility improvements frequently become the features that mainstream users appreciate most.'),

        heading('Principle 3: Solve for One, Extend to Many', 'h2'),
        p('The "solve for one" approach means designing to fully meet the needs of the most constrained user first. When you design keyboard navigation for a blind user, every keyboard-only user benefits. When you design plain language for a user with intellectual disabilities, every user in a hurry benefits. When you design for low bandwidth, every user on a crowded network benefits.'),
        p('Applied to web development, this principle translates to:'),
        bullet('Design focus styles as a primary visual element, not an afterthought, so keyboard users have a first-class experience.'),
        bullet('Write content at a reading level accessible to users with cognitive disabilities — this makes content clearer for everyone.'),
        bullet('Support multiple input modalities (keyboard, touch, voice, switch access) — this prepares your product for future input paradigms.'),
        bullet('Optimize for low-end devices — this improves performance for all users.'),

        heading('Principle 4: Design for Flexibility', 'h2'),
        p('Flexible design allows users to adapt the experience to their needs. This is expressed in several WCAG criteria: the ability to zoom text (1.4.4), the ability to reflow content on small screens (1.4.10), the ability to change text spacing without loss of functionality (1.4.12). But flexibility extends beyond these minimum requirements:'),
        bullet('Offer a dark mode and a high-contrast mode.'),
        bullet('Allow users to reduce motion (respect prefers-reduced-motion).'),
        bullet('Provide multiple reading time estimates on long-form content.'),
        bullet('Offer summary versions of complex content for users who need them.'),
        bullet('Allow users to control text size and line height within the interface.'),

        heading('Principle 5: Build Accessibility In from the Start', 'h2'),
        p('The most expensive accessibility problem is the one found after the product ships. Research shows that fixing accessibility issues in production costs 30–100x more than addressing them during design. Shifting accessibility left means:'),
        bullet('Including accessibility in design system components so every team benefits.'),
        bullet('Adding accessibility to the definition of done for every feature.'),
        bullet('Training every designer, developer, and content creator in accessibility basics.'),
        bullet('Running automated accessibility checks in the CI/CD pipeline.'),
        bullet('Making accessibility part of design review, code review, and QA.'),

        heading('Principle 6: Use Plain Language', 'h2'),
        p('Plain language is not dumbing down content — it is communicating as clearly as possible to the widest audience. Plain language principles: use the active voice, write short sentences (15–20 words average), use common words instead of technical jargon (or define jargon immediately), organize content from most important to least important, and use headings and lists to break up dense text.'),
        p('WCAG 3.1.5 (Reading Level) recommends content readable without higher education. Meeting this criterion improves comprehension for users with dyslexia, cognitive disabilities, non-native speakers, and people reading under stress or distraction — roughly 40–60% of any site\'s users.'),

        heading('Principle 7: Measure Accessibility Continuously', 'h2'),
        p('Accessibility is not a state you achieve — it is a practice you maintain. New features introduce new barriers. Third-party integrations may not meet your standards. Content editors may inadvertently add inaccessible elements. Continuous measurement means:'),
        bullet('Automated testing in every deployment pipeline.'),
        bullet('Monthly manual spot-checks on high-traffic pages.'),
        bullet('A user feedback channel specifically for accessibility reports.'),
        bullet('Yearly comprehensive audits against the latest WCAG version.'),
        bullet('Tracked metrics: axe-core violation count trend, user-reported accessibility issues per month, conformance score per audit.'),
      ],
      tr: [
        heading('Uyumluluğun Ötesinde: Kapsayıcı Tasarım Ne Anlama Gelir', 'h2'),
        p('Erişilebilirlik uyumluluğu — WCAG AA\'yı karşılamak — bir tavan değil, bir tabandır. Kapsayıcı tasarım daha da ileri gider: tasarım sürecinin başından itibaren, sonradan düşünmeden değil, olabildiğince geniş bir insan çeşitliliği için iyi çalışan ürünler, hizmetler ve ortamlar yaratmak için bir metodoloji.'),

        heading('İlke 1: Dışlamayı Tanımak', 'h2'),
        p('Dışlama, etkilemediği kişilere çoğu zaman görünmezdir. Microsoft Kapsayıcı Tasarım araç seti, engel spektrumu kavramını tanıttı: kalıcı (tek kollu bir kişi), geçici (kolu kırık bir kişi) ve durumsal (kucağında bebek tutan bir ebeveyn). Kalıcı durum için tasarlamak, geçici ve durumsal durumlardaki herkes için ürünü iyileştirir.'),

        heading('İlke 2: Çeşitlilikten Öğrenmek', 'h2'),
        p('Kapalı altyazılar sağır kullanıcılar için tasarlandı; artık gürültülü ortamlarda, dil öğrenirken veya kavramayı geliştirmek isteyen milyonlarca kişi tarafından kullanılıyor. Engelli kullanıcıları araştırma, tasarım eleştirisi ve kullanılabilirlik testine erken ve sürekli dahil edin.'),

        heading('İlke 3: Biri için Çöz, Herkese Genişlet', 'h2'),
        p('"Biri için çöz" yaklaşımı, önce en kısıtlı kullanıcının ihtiyaçlarını tam olarak karşılayacak şekilde tasarlamak anlamına gelir.'),
        bullet('Odak stillerini ana görsel öğe olarak tasarlayın.'),
        bullet('Bilişsel engelli kullanıcılara erişilebilir okuma düzeyinde içerik yazın.'),
        bullet('Birden fazla giriş modunu (klavye, dokunma, ses) destekleyin.'),
        bullet('Düşük kaliteli cihazlar için optimize edin.'),

        heading('İlke 4: Esneklik için Tasarım', 'h2'),
        bullet('Koyu mod ve yüksek kontrast modu sunun.'),
        bullet('Kullanıcıların hareketi azaltmasına izin verin (prefers-reduced-motion\'a saygı gösterin).'),
        bullet('Uzun biçimli içerikte birden fazla okuma süresi tahmini sağlayın.'),

        heading('İlke 5: Erişilebilirliği Başından İnşa Edin', 'h2'),
        p('En pahalı erişilebilirlik sorunu, ürün piyasaya çıktıktan sonra bulunan sorundur. Araştırmalar, üretimde erişilebilirlik sorunlarını düzeltmenin tasarım sırasında ele almaktan 30–100 kat daha pahalıya mal olduğunu göstermektedir.'),

        heading('İlke 6: Sade Dil Kullanın', 'h2'),
        p('Sade dil içeriği basitleştirmek değil, mümkün olduğunca geniş bir kitleye olabildiğince açık iletişim kurmaktır. Etkin ses kullanın, kısa cümleler yazın, jargonu hemen tanımlayın.'),

        heading('İlke 7: Erişilebilirliği Sürekli Ölçün', 'h2'),
        bullet('Her dağıtım hattında otomatik test.'),
        bullet('Yüksek trafikli sayfalarda aylık manuel spot kontroller.'),
        bullet('Erişilebilirlik raporları için özel bir kullanıcı geri bildirim kanalı.'),
        bullet('En son WCAG sürümüne karşı yıllık kapsamlı denetimler.'),
      ],
    },
    resources: [
      { _key: 'sg22r1', title: 'Microsoft: Inclusive Design Toolkit', url: 'https://inclusive.microsoft.design/', source: 'other', language: 'en' },
      { _key: 'sg22r2', title: 'W3C WAI: Cognitive Accessibility Guidance', url: 'https://www.w3.org/WAI/cognitive/', source: 'w3c-wai', language: 'en' },
      { _key: 'sg22r3', title: 'WebAIM: Web Accessibility for Designers', url: 'https://webaim.org/resources/designers/', source: 'webaim', language: 'en' },
      { _key: 'sg22r4', title: 'A11y Project: What is Accessibility?', url: 'https://www.a11yproject.com/posts/what-is-accessibility/', source: 'a11y-project', language: 'en' },
      { _key: 'sg22r5', title: 'Deque: Shift Left Accessibility', url: 'https://www.deque.com/shift-left-testing/', source: 'deque', language: 'en' },
      { _key: 'sg22r6', title: 'WCAG 3.1.5: Reading Level', url: 'https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html', source: 'w3c-understanding', language: 'en' },
    ],
    seo: {
      en: { metaTitle: 'Inclusive Design Principles for Web Products', metaDescription: 'Go beyond WCAG compliance with inclusive design. Covers 7 principles: recognizing exclusion, solving for one, plain language, flexibility, and continuous measurement.' },
      tr: { metaTitle: 'Web Ürünleri için Kapsayıcı Tasarım İlkeleri', metaDescription: 'Kapsayıcı tasarımla WCAG uyumluluğunun ötesine geçin. Dışlamayı tanıma, biri için çözme, sade dil, esneklik ve sürekli ölçüm ilkelerini kapsar.' },
    },
  },
]

console.log(`\nSeeding ${guides.length} guides...\n`)
for (const guide of guides) {
  await upsertGuide(guide)
}
console.log(`\nDone — ${guides.length} guides seeded.\n`)
