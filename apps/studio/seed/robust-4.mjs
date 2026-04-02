import { p, heading, bullet, numbered, code, blockquote } from "./helpers.mjs";

const rules = [
  // ─────────────────────────────────────────────────────────────────
  // 4.1.1 Parsing
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: "4.1.1",
    level: "A",
    principle: "robust",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1"],
    impact: "serious",
    axeRuleIds: [
      "duplicate-id",
      "duplicate-id-active",
      "duplicate-id-aria",
      "accesskeys",
    ],
    tags: ["html", "parsing", "validation"],

    title: {
      en: "Parsing",
      tr: "Ayrıştırma",
    },

    description: {
      en: "In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.",
      tr: "İşaretleme dilleri kullanılarak oluşturulan içeriklerde öğeler eksiksiz başlangıç ve bitiş etiketlerine sahiptir, öğeler belirtimlerine uygun şekilde iç içe yerleştirilmiştir, öğeler yinelenen niteliklere sahip değildir ve tüm kimlikler benzersizdir.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 4.1.1 Parsing requires that content authored in markup languages such as HTML is well-formed. Specifically, elements must have matching opening and closing tags, they must be nested correctly according to the specification, no element may have duplicate attributes, and all id values on a page must be unique. The goal is to ensure that user agents — browsers, screen readers, and other assistive technologies — can reliably parse and present the content.",
        ),
        blockquote(
          "Important: This criterion was removed in WCAG 2.2. The W3C determined that modern browsers handle parsing errors gracefully, making explicit parsing requirements unnecessary. However, 4.1.1 remains relevant when testing against WCAG 2.0 or WCAG 2.1 conformance levels.",
        ),
        p(
          "Even though modern browsers are forgiving of many HTML errors, duplicate IDs still cause real problems for assistive technologies. When two elements share the same id, aria-labelledby, aria-describedby, and label[for] references become ambiguous, and the browser may associate the wrong element.",
        ),

        heading("Why it matters", "h2"),
        p(
          "Assistive technologies rely on the browser's accessibility tree, which is built from the parsed DOM. When markup is malformed — unclosed tags, improperly nested elements, or duplicate IDs — the resulting DOM may differ across browsers. A screen reader may skip content, associate a label with the wrong input, or fail to convey the structure of the page entirely.",
        ),
        p(
          "Duplicate IDs are the most impactful parsing issue in practice. If a form label references an id shared by two inputs, only the first input receives the programmatic association. The second input becomes effectively unlabelled for assistive technology users, even though sighted users can see the label visually.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "duplicate-id — Ensures every id attribute value used in a document is unique.",
        ),
        bullet(
          "duplicate-id-active — Ensures id attributes on active, focusable elements are unique.",
        ),
        bullet(
          "duplicate-id-aria — Ensures id attributes referenced by ARIA attributes are unique.",
        ),
        bullet(
          "accesskeys — Ensures every accesskey attribute value is unique to prevent conflicts.",
        ),

        heading("How to test", "h2"),
        p(
          "Even though browsers tolerate many parsing errors, testing for duplicate IDs and malformed markup remains valuable for accessibility and code quality.",
        ),
        bullet(
          "Run axe-core or axe DevTools — the duplicate-id family of rules will flag any shared IDs on the page.",
        ),
        bullet(
          "Use the W3C Nu HTML Checker (validator.w3.org/nu/) to identify parsing errors, unclosed elements, and nesting violations.",
        ),
        bullet(
          "Search the codebase for id attributes and verify uniqueness, especially in server-rendered templates where IDs may be repeated across components.",
        ),
        bullet(
          "Check dynamically injected content — SPAs that append nodes to the DOM often reuse IDs from previous renders.",
        ),

        heading("How to fix", "h2"),
        p(
          "The primary fix is eliminating duplicate IDs. Below are common patterns and solutions.",
        ),

        heading("Duplicate IDs — bad practice", "h3"),
        code(
          '<!-- Two elements share the same id -->\n<label for="email">Email</label>\n<input id="email" type="email" name="signup-email">\n\n<!-- Later in the same page -->\n<label for="email">Work Email</label>\n<input id="email" type="email" name="work-email">',
          "html",
        ),

        heading("Duplicate IDs — good practice", "h3"),
        code(
          '<!-- Each id is unique -->\n<label for="signup-email">Email</label>\n<input id="signup-email" type="email" name="signup-email">\n\n<label for="work-email">Work Email</label>\n<input id="work-email" type="email" name="work-email">',
          "html",
        ),

        heading("Nesting violations — examples", "h3"),
        code(
          '<!-- Bad: block element inside inline element -->\n<a href="/about">\n  <div>About Us</div>\n</a>\n\n<!-- Bad: interactive elements nested -->\n<button>\n  <a href="/save">Save</a>\n</button>\n\n<!-- Good: proper nesting -->\n<a href="/about">About Us</a>\n\n<button type="button">Save</button>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Copying components that contain hardcoded IDs without making them unique per instance.",
        ),
        bullet(
          "Server-side loops that generate identical IDs for repeated elements — use an index or unique key in the id.",
        ),
        bullet(
          "SPA frameworks reusing DOM nodes without resetting id attributes when component state changes.",
        ),
        bullet(
          "Duplicate accesskey values, which cause keyboard shortcut conflicts across the page.",
        ),
        bullet(
          "Assuming that because this criterion was removed in WCAG 2.2, duplicate IDs are harmless — they still break ARIA references and label associations.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 4.1.1 Ayrıştırma, HTML gibi işaretleme dillerinde yazılan içeriğin doğru biçimde oluşturulmasını gerektirir. Özellikle, öğelerin eşleşen açılış ve kapanış etiketlerine sahip olması, belirtime göre doğru iç içe yerleştirilmesi, hiçbir öğenin yinelenen niteliklere sahip olmaması ve sayfadaki tüm id değerlerinin benzersiz olması gerekir. Amaç, tarayıcıların, ekran okuyucuların ve diğer yardımcı teknolojilerin içeriği güvenilir biçimde ayrıştırıp sunabilmesini sağlamaktır.",
        ),
        blockquote(
          "Önemli: Bu kriter WCAG 2.2 sürümüyle kaldırılmıştır. W3C, modern tarayıcıların ayrıştırma hatalarını sorunsuz şekilde ele aldığını belirlediğinden açık ayrıştırma gereksinimlerini gereksiz bulmuştür. Ancak 4.1.1, WCAG 2.0 veya WCAG 2.1 uyumluluk testlerinde hala geçerlidir.",
        ),
        p(
          "Modern tarayıcılar birçok HTML hatasını tolere etse de yinelenen kimlikler yardımcı teknolojiler için gerçek sorunlara neden olur. İki öğe aynı id değerini paylaştığında aria-labelledby, aria-describedby ve label[for] referansları belirsizleşir ve tarayıcı yanlış öğeyle ilişkilendirme yapabilir.",
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Yardımcı teknolojiler, ayrıştırılan DOM'dan inşa edilen erişilebilirlik ağacına dayanır. İşaretleme bozuk olduğunda — kapatılmamış etiketler, hatalı iç içe yerleştirme veya yinelenen kimlikler — ortaya çıkan DOM tarayıcılar arasında farklılık gösterebilir. Ekran okuyucu içeriği atlayabilir, bir etiketi yanlış girdi ile ilişkilendirebilir veya sayfanın yapısını tamamen aktaramayabilir.",
        ),
        p(
          "Yinelenen kimlikler pratikte en etkili ayrıştırma sorunudur. Bir form etiketi iki girdi tarafından paylaşılan bir id değerine referans verdiğinde yalnızca ilk girdi programatik ilişkilendirmeyi alır. İkinci girdi, gören kullanıcılar etiketi görsel olarak görse bile yardımcı teknoloji kullanıcıları için fiilen etiketlenmemiş olur.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "duplicate-id — Belgedeki her id niteliği değerinin benzersiz olduğunu doğrular.",
        ),
        bullet(
          "duplicate-id-active — Aktif, odaklanabilir öğelerdeki id niteliklerinin benzersiz olduğunu doğrular.",
        ),
        bullet(
          "duplicate-id-aria — ARIA nitelikleri tarafından referans verilen id niteliklerinin benzersiz olduğunu doğrular.",
        ),
        bullet(
          "accesskeys — Her accesskey niteliği değerinin çakışmaları önlemek için benzersiz olduğunu doğrular.",
        ),

        heading("Nasıl test edilir", "h2"),
        p(
          "Tarayıcılar birçok ayrıştırma hatasını tolere etse de yinelenen kimlikleri ve bozuk işaretlemeyi test etmek erişilebilirlik ve kod kalitesi için değerli olmaya devam eder.",
        ),
        bullet(
          "axe-core veya axe DevTools çalıştırın — duplicate-id kural ailesi sayfadaki tüm paylaşılan kimlikleri işaret eder.",
        ),
        bullet(
          "Ayrıştırma hatalarını, kapatılmamış öğeleri ve yerleştirme ihlallerini belirlemek için W3C Nu HTML Checker (validator.w3.org/nu/) kullanın.",
        ),
        bullet(
          "Kod tabanında id niteliklerini arayın ve benzersizliği doğrulayın, özellikle kimliklerin bileşenler arasında tekrarlanabileceği sunucu tarafında oluşturulan şablonlarda.",
        ),
        bullet(
          "Dinamik olarak eklenen içeriği kontrol edin — DOM'a düğümler ekleyen tek sayfa uygulamaları önceki oluşturmalardan kimlikleri sıklıkla yeniden kullanır.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Temel çözüm yinelenen kimlikleri ortadan kaldırmaktır. Aşağıda yaygın kalıplar ve çözümler yer almaktadır.",
        ),

        heading("Yinelenen kimlikler — yanlış uygulama", "h3"),
        code(
          '<!-- İki öğe aynı id\'yi paylaşır -->\n<label for="email">E-posta</label>\n<input id="email" type="email" name="kayit-email">\n\n<!-- Aynı sayfada daha sonra -->\n<label for="email">İş E-postası</label>\n<input id="email" type="email" name="iş-email">',
          "html",
        ),

        heading("Yinelenen kimlikler — doğru uygulama", "h3"),
        code(
          '<!-- Her id benzersizdir -->\n<label for="kayit-email">E-posta</label>\n<input id="kayit-email" type="email" name="kayit-email">\n\n<label for="iş-email">İş E-postası</label>\n<input id="iş-email" type="email" name="iş-email">',
          "html",
        ),

        heading("Yerleştirme ihlalleri — örnekler", "h3"),
        code(
          '<!-- Yanlış: satır içi öğenin içinde blok öğe -->\n<a href="/hakkımızda">\n  <div>Hakkımızda</div>\n</a>\n\n<!-- Yanlış: iç içe etkileşimli öğeler -->\n<button>\n  <a href="/kaydet">Kaydet</a>\n</button>\n\n<!-- Doğru: uygun yerleştirme -->\n<a href="/hakkımızda">Hakkımızda</a>\n\n<button type="button">Kaydet</button>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Sabit kodlanmış kimlikler içeren bileşenleri her örnek için benzersiz hale getirmeden kopyalamak.",
        ),
        bullet(
          "Sunucu tarafındaki döngülerin tekrarlanan öğeler için aynı kimlikleri oluşturması — id içinde bir dizin veya benzersiz anahtar kullanın.",
        ),
        bullet(
          "SPA çerçevelerinin bileşen durumu değiştiğinde id niteliklerini sıfırlamadan DOM düğümlerini yeniden kullanması.",
        ),
        bullet(
          "Sayfa genelinde klavye kısayolu çakışmalarına neden olan yinelenen accesskey değerleri.",
        ),
        bullet(
          "Bu kriterin WCAG 2.2'de kaldırılmış olması nedeniyle yinelenen kimliklerin zararsız olduğunu varsaymak — bunlar hala ARIA referanslarını ve etiket ilişkilendirmelerini bozar.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 4.1.1: Parsing (WCAG 2.1)",
        url: "https://www.w3.org/WAI/WCAG21/Understanding/parsing.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r411w3cu",
      },
      {
        title: "WCAG 2.2 — 4.1.1 Parsing (Obsolete and removed)",
        url: "https://www.w3.org/TR/WCAG22/#parsing",
        source: "w3c-spec",
        language: "en",
        _key: "r411spec",
      },
      {
        title: "Deque University: duplicate-id",
        url: "https://dequeuniversity.com/rules/axe/4.10/duplicate-id",
        source: "deque",
        language: "en",
        _key: "r411deqd",
      },
      {
        title: "W3C Nu HTML Checker",
        url: "https://validator.w3.org/nu/",
        source: "w3c-wai",
        language: "en",
        _key: "r411nuch",
      },
      {
        title: "WebAIM: WCAG 2 Checklist — Robust",
        url: "https://webaim.org/standards/wcag/checklist#robust",
        source: "webaim",
        language: "en",
        _key: "r411waim",
      },
      {
        title: "MDN: Global id attribute",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id",
        source: "mdn",
        language: "en",
        _key: "r411mdni",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 4.1.1 Parsing — Duplicate IDs & Valid HTML Guide",
        metaDescription:
          "Learn about WCAG 4.1.1 Parsing, including why it was removed in WCAG 2.2, how duplicate IDs break assistive technology, and how to fix common markup validation issues.",
      },
      tr: {
        metaTitle:
          "WCAG 4.1.1 Ayrıştırma — Yinelenen Kimlikler ve Geçerli HTML Rehberi",
        metaDescription:
          "WCAG 4.1.1 Ayrıştırma kriterini, WCAG 2.2'de neden kaldırıldığını, yinelenen kimliklerin yardımcı teknolojiyi nasıl bozduğunun ve yaygın işaretleme doğrulama sorunlarını nasıl düzeltileceğinizi öğrenin.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4.1.2 Name, Role, Value
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: "4.1.2",
    level: "A",
    principle: "robust",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "critical",
    axeRuleIds: [
      "button-name",
      "aria-label",
      "aria-labelledby",
      "aria-hidden-body",
      "aria-hidden-focus",
      "aria-valid-attr",
      "aria-valid-attr-value",
      "aria-allowed-attr",
      "aria-allowed-role",
      "aria-roles",
    ],
    tags: ["aria", "forms", "custom-controls", "widgets"],

    title: {
      en: "Name, Role, Value",
      tr: "Ad, Rol, Değer",
    },

    description: {
      en: "For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.",
      tr: "Tüm kullanıcı arayüzü bileşenleri için ad ve rol programatik olarak belirlenebilir; kullanıcı tarafından ayarlanabilen durumlar, özellikler ve değerler programatik olarak ayarlanabilir; ve bu öğelerdeki değişikliklerin bildirimi yardımcı teknolojiler dahil kullanıcı araçlarına sunulur.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          "WCAG 4.1.2 Name, Role, Value is one of the most broadly applicable accessibility criteria. It requires that every interactive user interface component exposes three things to assistive technology: its name (what it is called), its role (what type of control it is), and its current value or state (what it is set to or whether it is expanded, checked, selected, etc.).",
        ),
        p(
          "Native HTML elements such as <button>, <input>, <select>, and <a> automatically expose their role and allow names to be set via labels, text content, or attributes. The criterion becomes critical when developers build custom widgets — dropdown menus, tab panels, accordions, date pickers, sliders — using generic elements like <div> and <span>. Without explicit ARIA attributes, these custom components are invisible or meaningless to screen readers.",
        ),
        p(
          'The "value" component also requires that state changes are communicated. When a user expands an accordion, the assistive technology must be notified that the section is now open. When a checkbox is toggled, the checked state must update in the accessibility tree, not just visually.',
        ),

        heading("Why it matters", "h2"),
        p(
          'Screen reader users interact with a page through the accessibility tree, not the visual layout. When a custom dropdown built from <div> elements lacks role="listbox" and aria-expanded, a screen reader announces it as a generic group or plain text. The user has no way to know it is interactive, what options it contains, or which option is selected. They are effectively locked out of the interface.',
        ),
        p(
          'This criterion is rated critical impact because failures directly prevent task completion. A button without a name cannot be identified. A custom checkbox without aria-checked cannot convey its state. A tab interface without role="tablist" and role="tab" cannot be navigated. These are not cosmetic issues — they represent complete barriers for assistive technology users.',
        ),
        p(
          "The proliferation of JavaScript frameworks and component libraries has made 4.1.2 failures one of the most common accessibility issues on the web. The WebAIM Million annual study consistently finds missing button names, missing form labels, and ARIA misuse among the top five most common errors.",
        ),

        heading("Related axe-core rules", "h2"),
        bullet(
          "button-name — Ensures buttons have discernible, accessible text.",
        ),
        bullet("aria-label — Verifies aria-label values are not empty."),
        bullet(
          "aria-labelledby — Ensures aria-labelledby references existing element IDs.",
        ),
        bullet(
          'aria-hidden-body — Ensures aria-hidden="true" is not present on the <body> element.',
        ),
        bullet(
          "aria-hidden-focus — Ensures elements hidden with aria-hidden do not contain focusable children.",
        ),
        bullet(
          "aria-valid-attr — Ensures ARIA attribute names are valid and correctly spelled.",
        ),
        bullet(
          "aria-valid-attr-value — Ensures ARIA attribute values are valid for their type.",
        ),
        bullet(
          "aria-allowed-attr — Ensures ARIA attributes are appropriate for the element's role.",
        ),
        bullet(
          "aria-allowed-role — Ensures the role attribute is valid for the element it is placed on.",
        ),
        bullet(
          "aria-roles — Ensures all role attribute values are valid ARIA roles.",
        ),

        heading("How to test", "h2"),
        p(
          "Testing for 4.1.2 requires a combination of automated and manual techniques. Automated tools can catch missing names, invalid ARIA attributes, and incorrect roles, but they cannot judge whether the name is meaningful or whether state changes are properly communicated.",
        ),
        numbered(
          'Run axe-core or Lighthouse and review all findings in the "ARIA" and "Names and Labels" categories.',
        ),
        numbered(
          "Open the browser's accessibility inspector (Chrome DevTools > Elements > Accessibility pane) and verify that each interactive element shows a correct Name, Role, and State.",
        ),
        numbered(
          "Tab through the page and use arrow keys within composite widgets. Confirm that the screen reader announces the role (button, tab, listbox item, etc.), the name, and the current state (expanded, selected, checked).",
        ),
        numbered(
          "Toggle states — expand accordions, check boxes, select tabs — and verify the screen reader announces the change.",
        ),
        numbered(
          "Inspect custom components built with <div> or <span>. Confirm they have appropriate ARIA roles, names, and state attributes.",
        ),

        heading("How to fix", "h2"),
        p(
          "The golden rule: use native HTML elements whenever possible. When custom components are necessary, provide complete ARIA semantics.",
        ),

        heading("Buttons without names — bad practice", "h3"),
        code(
          '<!-- Icon button with no accessible name -->\n<button>\n  <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2z"/></svg>\n</button>\n\n<!-- Button with only whitespace text -->\n<button>   </button>\n\n<!-- Div acting as button with no role or name -->\n<div onclick="save()">Save</div>',
          "html",
        ),

        heading("Buttons — good practice", "h3"),
        code(
          '<!-- Icon button with aria-label -->\n<button aria-label="Open menu">\n  <svg aria-hidden="true" viewBox="0 0 24 24">\n    <path d="M3 18h18v-2H3v2z"/>\n  </svg>\n</button>\n\n<!-- Button with visible text -->\n<button type="button">Save Document</button>\n\n<!-- If you must use a div (not recommended), add role and tabindex -->\n<div role="button" tabindex="0" onclick="save()" onkeydown="handleKey(event)">\n  Save\n</div>',
          "html",
        ),

        heading("Custom checkbox — bad practice", "h3"),
        code(
          '<!-- Div styled as checkbox but invisible to AT -->\n<div class="checkbox checked" onclick="toggle()">\n  <span class="checkmark">✓</span>\n  Accept terms\n</div>',
          "html",
        ),

        heading("Custom checkbox — good practice", "h3"),
        code(
          '<!-- Native checkbox (preferred) -->\n<label>\n  <input type="checkbox" name="terms" checked>\n  Accept terms\n</label>\n\n<!-- Custom checkbox with full ARIA -->\n<div\n  role="checkbox"\n  aria-checked="true"\n  aria-label="Accept terms"\n  tabindex="0"\n  onclick="toggle()"\n  onkeydown="handleKey(event)"\n>\n  <span class="checkmark" aria-hidden="true">✓</span>\n  Accept terms\n</div>',
          "html",
        ),

        heading("Tab interface — complete pattern", "h3"),
        code(
          '<div role="tablist" aria-label="Project settings">\n  <button role="tab" id="tab-general" aria-selected="true" aria-controls="panel-general">\n    General\n  </button>\n  <button role="tab" id="tab-members" aria-selected="false" aria-controls="panel-members" tabindex="-1">\n    Members\n  </button>\n</div>\n\n<div role="tabpanel" id="panel-general" aria-labelledby="tab-general">\n  <p>General settings content here.</p>\n</div>\n\n<div role="tabpanel" id="panel-members" aria-labelledby="tab-members" hidden>\n  <p>Members settings content here.</p>\n</div>',
          "html",
        ),

        heading("Accordion with state management", "h3"),
        code(
          '<h3>\n  <button aria-expanded="true" aria-controls="section1-content">\n    Billing Information\n  </button>\n</h3>\n<div id="section1-content" role="region" aria-labelledby="section1-heading">\n  <p>Your current plan is Professional.</p>\n</div>\n\n<h3>\n  <button aria-expanded="false" aria-controls="section2-content">\n    Payment History\n  </button>\n</h3>\n<div id="section2-content" role="region" aria-labelledby="section2-heading" hidden>\n  <p>Payment records will appear here.</p>\n</div>',
          "html",
        ),

        heading("Invalid ARIA — common errors", "h3"),
        code(
          '<!-- Bad: misspelled ARIA attribute -->\n<button aria-labelled="Save">Save</button>\n\n<!-- Bad: invalid role value -->\n<div role="buttn">Click me</div>\n\n<!-- Bad: aria-checked on an element without checkbox/switch role -->\n<div role="button" aria-checked="true">Toggle</div>\n\n<!-- Good: correct attribute and role usage -->\n<button aria-label="Save document">Save</button>\n<div role="button" tabindex="0">Click me</div>\n<div role="switch" aria-checked="true" tabindex="0">Toggle</div>',
          "html",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Using <div> or <span> for interactive elements without adding role, tabindex, and keyboard handlers.",
        ),
        bullet(
          "Setting aria-label to an empty string — this effectively gives the element a blank name.",
        ),
        bullet(
          'Adding aria-hidden="true" to elements that contain focusable children — screen readers lose focus tracking.',
        ),
        bullet(
          'Using invalid ARIA role values (e.g., role="list-item" instead of role="listitem").',
        ),
        bullet(
          "Forgetting to update aria-expanded, aria-checked, or aria-selected when the visual state changes.",
        ),
        bullet(
          'Overriding native semantics unnecessarily — adding role="button" to a <button> is redundant but adding role="link" to a <button> is misleading.',
        ),
        bullet(
          "Using aria-label on non-interactive elements where it may be ignored by some screen readers.",
        ),
        bullet(
          'Placing ARIA attributes that are not allowed for a given role — for example, aria-pressed on role="link".',
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          "WCAG 4.1.2 Ad, Rol, Değer, en geniş kapsamlı erişilebilirlik kriterlerinden biridir. Her etkileşimli kullanıcı arayüzü bileşeninin yardımcı teknolojiye üç şeyi açması gerekir: adı (ne olduğu), rolü (ne tür bir kontrol olduğu) ve mevcut değeri veya durumu (ne ayarlı olduğu veya genişlemiş, işaretli, seçili vb. olup olmadığı).",
        ),
        p(
          "<button>, <input>, <select> ve <a> gibi yerel HTML öğeleri otomatik olarak rollerini açığa çıkarır ve adların etiketler, metin içeriği veya nitelikler aracılığıyla ayarlanmasına izin verir. Geliştiriciler <div> ve <span> gibi genel öğeler kullanarak özel pencere öğesi bileşenleri — açılır menüler, sekme panelleri, akordeonlar, tarih seçiciler, kaydırıcılar — oluşturduğunda bu kriter kritik hale gelir. Açık ARIA nitelikleri olmadan bu özel bileşenler ekran okuyucular için görünmez veya anlamsızdır.",
        ),
        p(
          '"Değer" bileşeni ayrıca durum değişikliklerinin iletilmesini gerektirir. Bir kullanıcı bir akordeonu genişlettiğinde yardımcı teknolojiye bölümün artık açık olduğu bildirilmelidir. Bir onay kutusu değiştirildiğinde işaretli durumu yalnızca görsel olarak değil erişilebilirlik ağacında da güncellenmelidir.',
        ),

        heading("Neden önemlidir", "h2"),
        p(
          'Ekran okuyucu kullanıcıları sayfayla görsel düzen üzerinden değil erişilebilirlik ağacı üzerinden etkileşir. <div> öğelerinden oluşturulmuş role="listbox" ve aria-expanded içermeyen özel bir açılır menü, ekran okuyucu tarafından genel bir grup veya düz metin olarak duyurulur. Kullanıcı bunun etkileşimli olduğunu, hangi seçenekleri içerdiğini veya hangi seçeneğin seçili olduğunu bilemez ve arayüzden fiilen dışlanır.',
        ),
        p(
          'Bu kriter kritik etki olarak derecelendirilir çünkü başarısızlıklar doğrudan görev tamamlamayı engeller. Adı olmayan bir düğme tanımlanamaz. aria-checked olmayan özel bir onay kutusu durumunu iletemez. role="tablist" ve role="tab" olmayan bir sekme arayüzünde gezinilemez. Bunlar görsel sorunlar değil — yardımcı teknoloji kullanıcıları için tam engeller oluşturur.',
        ),
        p(
          "JavaScript çerçevelerinin ve bileşen kütüphanelerinin yaygınlığı 4.1.2 başarısızlıklarını webdeki en yaygın erişilebilirlik sorunlarından biri haline getirmiştir. WebAIM Million yıllık çalışması eksik düğme adlarını, eksik form etiketlerini ve ARIA hatalarını sürekli olarak en yaygın beş hata arasında bulmaktadır.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        bullet(
          "button-name — Düğmelerin ayırt edilebilir, erişilebilir metne sahip olmasını sağlar.",
        ),
        bullet("aria-label — aria-label değerlerinin boş olmadığını doğrular."),
        bullet(
          "aria-labelledby — aria-labelledby referanslarının mevcut öğe kimliklerine işaret ettiğini sağlar.",
        ),
        bullet(
          'aria-hidden-body — <body> öğesinde aria-hidden="true" bulunmadığını sağlar.',
        ),
        bullet(
          "aria-hidden-focus — aria-hidden ile gizlenen öğelerin odaklanabilir alt öğeler içermediğini sağlar.",
        ),
        bullet(
          "aria-valid-attr — ARIA nitelik adlarının geçerli ve doğru yazılmış olduğunu sağlar.",
        ),
        bullet(
          "aria-valid-attr-value — ARIA nitelik değerlerinin türleri için geçerli olduğunu sağlar.",
        ),
        bullet(
          "aria-allowed-attr — ARIA niteliklerinin öğenin rolü için uygun olduğunu sağlar.",
        ),
        bullet(
          "aria-allowed-role — role niteliği değerinin yerleştirildiği öğe için geçerli olduğunu sağlar.",
        ),
        bullet(
          "aria-roles — Tüm role niteliği değerlerinin geçerli ARIA rolleri olduğunu sağlar.",
        ),

        heading("Nasıl test edilir", "h2"),
        p(
          "4.1.2 testi otomatik ve manuel tekniklerin bir kombinasyonunu gerektirir. Otomatik araçlar eksik adları, geçersiz ARIA niteliklerini ve yanlış rolleri yakalayabilir, ancak adın anlamlı olup olmadığını veya durum değişikliklerinin düzgün iletilip iletilmediğini değerlendiremez.",
        ),
        numbered(
          'axe-core veya Lighthouse çalıştırın ve "ARIA" ile "Adlar ve Etiketler" kategorilerindeki tüm bulguları inceleyin.',
        ),
        numbered(
          "Tarayıcının erişilebilirlik denetçisini açın (Chrome DevTools > Elements > Accessibility paneli) ve her etkileşimli öğenin doğru bir Ad, Rol ve Durum gösterdiğini doğrulayın.",
        ),
        numbered(
          "Sayfada Tab tuşuyla gezinin ve bileşik pencere öğeleri içinde ok tuşlarını kullanın. Ekran okuyucunun rolü (düğme, sekme, liste öğe vb.), adı ve mevcut durumu (genişlemiş, seçili, işaretli) duyurduğundan emin olun.",
        ),
        numbered(
          "Durumları değiştirin — akordeonları genişletin, kutuları işaretleyin, sekmeler seçin — ve ekran okuyucunun değişikliği duyurduğundan emin olun.",
        ),
        numbered(
          "<div> veya <span> ile oluşturulmuş özel bileşenleri inceleyin. Uygun ARIA rolleri, adları ve durum niteliklerine sahip olduklarını doğrulayın.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Altın kural: mümkün olduğunda yerel HTML öğelerini kullanın. Özel bileşenler gerektiğinde eksiksiz ARIA semantiği sağlayın.",
        ),

        heading("Adsız düğmeler — yanlış uygulama", "h3"),
        code(
          '<!-- Erişilebilir adı olmayan simge düğme -->\n<button>\n  <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2z"/></svg>\n</button>\n\n<!-- Yalnızca boşluk metni olan düğme -->\n<button>   </button>\n\n<!-- Rol veya ad olmadan düğme gibi davranan div -->\n<div onclick="kaydet()">Kaydet</div>',
          "html",
        ),

        heading("Düğmeler — doğru uygulama", "h3"),
        code(
          '<!-- aria-label ile simge düğme -->\n<button aria-label="Menüyü aç">\n  <svg aria-hidden="true" viewBox="0 0 24 24">\n    <path d="M3 18h18v-2H3v2z"/>\n  </svg>\n</button>\n\n<!-- Görünen metne sahip düğme -->\n<button type="button">Belgeyi Kaydet</button>\n\n<!-- Div kullanmanız gerekiyorsa (önerilmez), rol ve tabindex ekleyin -->\n<div role="button" tabindex="0" onclick="kaydet()" onkeydown="tuşİşle(event)">\n  Kaydet\n</div>',
          "html",
        ),

        heading("Özel onay kutusu — yanlış uygulama", "h3"),
        code(
          '<!-- Onay kutusu gibi stillenmiş ama AT için görünmez div -->\n<div class="checkbox checked" onclick="değiştir()">\n  <span class="checkmark">✓</span>\n  Koşulları kabul ediyorum\n</div>',
          "html",
        ),

        heading("Özel onay kutusu — doğru uygulama", "h3"),
        code(
          '<!-- Yerel onay kutusu (tercih edilen) -->\n<label>\n  <input type="checkbox" name="koşullar" checked>\n  Koşulları kabul ediyorum\n</label>\n\n<!-- Tam ARIA ile özel onay kutusu -->\n<div\n  role="checkbox"\n  aria-checked="true"\n  aria-label="Koşulları kabul ediyorum"\n  tabindex="0"\n  onclick="değiştir()"\n  onkeydown="tuşİşle(event)"\n>\n  <span class="checkmark" aria-hidden="true">✓</span>\n  Koşulları kabul ediyorum\n</div>',
          "html",
        ),

        heading("Sekme arayüzü — eksiksiz kalıp", "h3"),
        code(
          '<div role="tablist" aria-label="Proje ayarları">\n  <button role="tab" id="tab-genel" aria-selected="true" aria-controls="panel-genel">\n    Genel\n  </button>\n  <button role="tab" id="tab-uyeler" aria-selected="false" aria-controls="panel-uyeler" tabindex="-1">\n    Üyeler\n  </button>\n</div>\n\n<div role="tabpanel" id="panel-genel" aria-labelledby="tab-genel">\n  <p>Genel ayarlar içeriği burada.</p>\n</div>\n\n<div role="tabpanel" id="panel-uyeler" aria-labelledby="tab-uyeler" hidden>\n  <p>Üye ayarları içeriği burada.</p>\n</div>',
          "html",
        ),

        heading("Durum yönetimi ile akordeon", "h3"),
        code(
          '<h3>\n  <button aria-expanded="true" aria-controls="bolum1-içerik">\n    Fatura Bilgileri\n  </button>\n</h3>\n<div id="bolum1-içerik" role="region" aria-labelledby="bolum1-başlık">\n  <p>Mevcut planınız Profesyonel\'dir.</p>\n</div>\n\n<h3>\n  <button aria-expanded="false" aria-controls="bolum2-içerik">\n    Ödeme Geçmişi\n  </button>\n</h3>\n<div id="bolum2-içerik" role="region" aria-labelledby="bolum2-başlık" hidden>\n  <p>Ödeme kayıtları burada görünecektir.</p>\n</div>',
          "html",
        ),

        heading("Geçersiz ARIA — yaygın hatalar", "h3"),
        code(
          '<!-- Yanlış: yanlış yazılmış ARIA niteliği -->\n<button aria-labelled="Kaydet">Kaydet</button>\n\n<!-- Yanlış: geçersiz rol değeri -->\n<div role="buttn">Tıkla</div>\n\n<!-- Yanlış: checkbox/switch rolü olmadan aria-checked -->\n<div role="button" aria-checked="true">Değiştir</div>\n\n<!-- Doğru: uygun nitelik ve rol kullanımı -->\n<button aria-label="Belgeyi kaydet">Kaydet</button>\n<div role="button" tabindex="0">Tıkla</div>\n<div role="switch" aria-checked="true" tabindex="0">Değiştir</div>',
          "html",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Etkileşimli öğeler için <div> veya <span> kullanıp rol, tabindex ve klavye işleyicileri eklememek.",
        ),
        bullet(
          "aria-label değerini boş dize olarak ayarlamak — bu öğeye fiilen boş bir ad verir.",
        ),
        bullet(
          'Odaklanabilir alt öğeler içeren öğelere aria-hidden="true" eklemek — ekran okuyucular odak izlemesini kaybeder.',
        ),
        bullet(
          'Geçersiz ARIA rol değerleri kullanmak (örneğin role="listitem" yerine role="list-item").',
        ),
        bullet(
          "Görsel durum değiştiğinde aria-expanded, aria-checked veya aria-selected güncellemeyi unutmak.",
        ),
        bullet(
          'Yerel semantikleri gereksiz yere geçersiz kılmak — bir <button> öğesine role="button" eklemek gereksizdir ancak role="link" eklemek yanıltıcıdır.',
        ),
        bullet(
          "Bazı ekran okuyucularda göz ardı edilebilecek etkileşimli olmayan öğelerde aria-label kullanmak.",
        ),
        bullet(
          'Belirli bir rol için izin verilmeyen ARIA nitelikleri yerleştirmek — örneğin role="link" üzerine aria-pressed eklemek.',
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 4.1.2: Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r412w3cu",
      },
      {
        title: "WAI-ARIA Authoring Practices 1.2",
        url: "https://www.w3.org/WAI/ARIA/apg/",
        source: "w3c-wai",
        language: "en",
        _key: "r412apg1",
      },
      {
        title: "Deque University: button-name",
        url: "https://dequeuniversity.com/rules/axe/4.10/button-name",
        source: "deque",
        language: "en",
        _key: "r412deqb",
      },
      {
        title: "WebAIM: ARIA Techniques",
        url: "https://webaim.org/techniques/aria/",
        source: "webaim",
        language: "en",
        _key: "r412waim",
      },
      {
        title: "MDN: ARIA roles",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",
        source: "mdn",
        language: "en",
        _key: "r412mdnr",
      },
      {
        title: "MDN: Using ARIA — States and Properties",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes",
        source: "mdn",
        language: "en",
        _key: "r412mdna",
      },
      {
        title: "The A11Y Project: ARIA Checklist",
        url: "https://www.a11yproject.com/checklist/",
        source: "a11y-project",
        language: "en",
        _key: "r412a11y",
      },
      {
        title: "ACT Rules: Role attribute has valid value",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/",
        source: "act-rules",
        language: "en",
        _key: "r412actr",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 4.1.2 Name, Role, Value — ARIA & Custom Widgets Guide",
        metaDescription:
          "Learn how to meet WCAG 4.1.2 Name, Role, Value. Practical guidance on ARIA attributes, custom widget accessibility, button names, and state management with code examples.",
      },
      tr: {
        metaTitle:
          "WCAG 4.1.2 Ad, Rol, Değer — ARIA ve Özel Pencere Öğesi Rehberi",
        metaDescription:
          "WCAG 4.1.2 Ad, Rol, Değer kriterini nasıl karşılayacağınızı öğrenin. ARIA nitelikleri, özel pencere öğesi erişilebilirliği, düğme adları ve durum yönetimi için kod örnekleriyle pratik rehber.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4.1.3 Status Messages
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: "4.1.3",
    level: "AA",
    principle: "robust",
    introducedIn: "2.1",
    wcagVersions: ["2.1", "2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["aria", "live-regions", "notifications", "status"],

    title: {
      en: "Status Messages",
      tr: "Durum Mesajları",
    },

    description: {
      en: "In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",
      tr: "İşaretleme dilleri kullanılarak oluşturulan içeriklerde durum mesajları, yardımcı teknolojiler tarafından kullanıcıya odak almaksızın sunulabilmesi için rol veya özellikler aracılığıyla programatik olarak belirlenebilir.",
    },

    content: {
      en: [
        heading("What this rule means", "h2"),
        p(
          'WCAG 4.1.3 Status Messages requires that important messages conveyed to users — such as success confirmations, error summaries, progress updates, and search result counts — are communicated to assistive technology without moving keyboard focus to the message. This is achieved through ARIA live regions: elements with role="status", role="alert", role="log", role="progressbar", or the aria-live attribute.',
        ),
        p(
          'A status message is any content update that provides information to the user about the success or result of an action, the waiting state of an application, or the progress of a process, and is not important enough to justify a focus change. If a user submits a form and a "Your changes have been saved" banner appears, a sighted user sees it immediately. A screen reader user needs the same message announced without losing their current position on the page.',
        ),

        heading("Why it matters", "h2"),
        p(
          "Sighted users notice visual changes — a toast notification, a loading spinner, an error banner — because their eyes can scan the page. Screen reader users, however, only hear what the screen reader announces. If a status message appears visually but is not exposed through a live region, the screen reader remains silent. The user has no idea their form was saved, their search returned zero results, or an error occurred.",
        ),
        p(
          "This is particularly problematic for asynchronous operations common in modern web applications. AJAX form submissions, real-time validation, search-as-you-type, file upload progress, and shopping cart updates all generate status messages that must be announced without disrupting the user's focus.",
        ),

        heading("Related axe-core rules", "h2"),
        p(
          "There are currently no axe-core rules that directly test for 4.1.3 compliance. Status messages require manual testing to verify that appropriate ARIA live regions are in place and that screen readers announce updates correctly. Automated tools can verify the presence of live region attributes, but they cannot determine whether every status message in the application is covered.",
        ),

        heading("How to test", "h2"),
        p(
          "Testing status messages is primarily a manual process. You need to perform actions that generate status updates and verify they are announced by a screen reader.",
        ),
        numbered(
          "Identify all status messages in the application: form success/error messages, search result counts, loading indicators, cart updates, toast notifications, and progress indicators.",
        ),
        numbered(
          "Enable a screen reader (VoiceOver on macOS, NVDA on Windows) and trigger each status message.",
        ),
        numbered(
          "Confirm the screen reader announces the message without focus moving away from your current position.",
        ),
        numbered(
          'Verify that urgent messages (errors, warnings) use role="alert" or aria-live="assertive" and are announced immediately.',
        ),
        numbered(
          'Verify that non-urgent messages (success, info, progress) use role="status" or aria-live="polite" and are announced after the screen reader finishes its current speech.',
        ),
        numbered(
          "Check that the live region container exists in the DOM before the message is injected — dynamically created live regions may not be recognized by all screen readers.",
        ),

        heading("How to fix", "h2"),
        p(
          "Use ARIA live regions to announce status messages. The key is choosing the right level of urgency and ensuring the live region is present in the DOM before content is injected.",
        ),

        heading('Success message with role="status"', "h3"),
        code(
          '<!-- The live region container is in the DOM on page load (empty) -->\n<div role="status" aria-live="polite" id="form-status"></div>\n\n<!-- After form submission, inject the message -->\n<script>\n  document.getElementById(\'form-status\').textContent =\n    \'Your changes have been saved successfully.\';\n</script>',
          "html",
        ),

        heading('Error alert with role="alert"', "h3"),
        code(
          '<!-- Container present in DOM from the start -->\n<div role="alert" aria-live="assertive" id="error-alert"></div>\n\n<!-- When an error occurs -->\n<script>\n  document.getElementById(\'error-alert\').textContent =\n    \'Error: Unable to save. Please check your internet connection.\';\n</script>',
          "html",
        ),

        heading("Search results count", "h3"),
        code(
          '<!-- Live region for search feedback -->\n<div role="status" aria-live="polite" aria-atomic="true" id="search-results-count">\n  Showing 24 results for "accessibility"\n</div>\n\n<!-- Updated when the user types -->\n<script>\n  function updateResults(query, count) {\n    document.getElementById(\'search-results-count\').textContent =\n      `Showing ${count} results for "${query}"`;\n  }\n</script>',
          "html",
        ),

        heading("Progress indicator", "h3"),
        code(
          '<!-- Progress bar with live region -->\n<div\n  role="progressbar"\n  aria-valuenow="45"\n  aria-valuemin="0"\n  aria-valuemax="100"\n  aria-label="File upload progress"\n  aria-live="polite"\n>\n  45% complete\n</div>\n\n<!-- Completion message -->\n<div role="status" aria-live="polite" id="upload-status"></div>\n\n<script>\n  // When upload finishes:\n  document.getElementById(\'upload-status\').textContent =\n    \'Upload complete. File "report.pdf" has been saved.\';\n</script>',
          "html",
        ),

        heading("React implementation pattern", "h3"),
        code(
          'function StatusAnnouncer({ message, urgency = "polite" }) {\n  return (\n    <div\n      role={urgency === "assertive" ? "alert" : "status"}\n      aria-live={urgency}\n      aria-atomic="true"\n      className="sr-only"\n    >\n      {message}\n    </div>\n  );\n}\n\n// Usage in a form component\nfunction ContactForm() {\n  const [status, setStatus] = useState("");\n\n  async function handleSubmit(data) {\n    try {\n      await submitForm(data);\n      setStatus("Message sent successfully.");\n    } catch {\n      setStatus("Failed to send message. Please try again.");\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* form fields */}\n      <button type="submit">Send</button>\n      <StatusAnnouncer message={status} />\n    </form>\n  );\n}',
          "jsx",
        ),

        heading("Common mistakes", "h2"),
        bullet(
          "Creating the live region dynamically at the same time as the message — many screen readers only track live regions that were present in the DOM before content changed.",
        ),
        bullet(
          'Using role="alert" for non-urgent messages like "Saved successfully" — assertive announcements interrupt the user and should be reserved for errors and warnings.',
        ),
        bullet(
          "Moving focus to the status message instead of using a live region — this disrupts the user's position and violates the intent of 4.1.3.",
        ),
        bullet(
          'Forgetting aria-atomic="true" when the entire message should be re-read on update, not just the changed portion.',
        ),
        bullet(
          "Using aria-live on a container that has frequent rapid updates (e.g., a real-time log) without debouncing — this floods the screen reader with announcements.",
        ),
        bullet(
          "Placing the live region inside a container that is hidden with display:none or visibility:hidden — live regions must be visible to the accessibility tree to function.",
        ),
      ],

      tr: [
        heading("Bu kural ne anlama geliyor", "h2"),
        p(
          'WCAG 4.1.3 Durum Mesajları, kullanıcılara iletilen önemli mesajların — başarı onayları, hata özetleri, ilerleme güncellemeleri ve arama sonucu sayıları gibi — klavye odağını mesaja taşımadan yardımcı teknolojiye iletilmesini gerektirir. Bu, ARIA canlı bölgeler aracılığıyla sağlanır: role="status", role="alert", role="log", role="progressbar" veya aria-live niteliği olan öğeler.',
        ),
        p(
          'Durum mesajı, kullanıcıya bir eylemin başarısı veya sonucu, bir uygulamanın bekleme durumu veya bir sürecin ilerlemesi hakkında bilgi sağlayan ve odak değişikliğini haklı kılacak kadar önemli olmayan herhangi bir içerik güncellemesidir. Kullanıcı bir form gönderdiğinde "Değişiklikleriniz kaydedildi" bannerı görünürse gören kullanıcı bunu hemen fark eder. Ekran okuyucu kullanıcısı ise sayfadaki mevcut konumunu kaybetmeden aynı mesajın duyurulmasına ihtiyaç duyar.',
        ),

        heading("Neden önemlidir", "h2"),
        p(
          "Gören kullanıcılar görsel değişiklikleri — bir bildirim toastu, bir yükleme göstergesi, bir hata bannerı — fark eder çünkü gözleri sayfayı tarayabilir. Ancak ekran okuyucu kullanıcıları yalnızca ekran okuyucunun duyurduğunu duyar. Bir durum mesajı görsel olarak görünür ancak canlı bölge aracılığıyla sunulmazsa ekran okuyucu sessiz kalır. Kullanıcı formunun kaydedildiğini, aramasının sıfır sonuç döndürdüğünü veya bir hata oluştuğunu bilemez.",
        ),
        p(
          "Bu, modern web uygulamalarında yaygın olan asenkron işlemler için özellikle sorunludur. AJAX form gönderme, gerçek zamanlı doğrulama, yazarken arama, dosya yükleme ilerlemesi ve alışveriş sepeti güncellemelerinin hepsi kullanıcının odağını bozmadan duyurulması gereken durum mesajları üretir.",
        ),

        heading("İlgili axe-core kuralları", "h2"),
        p(
          "4.1.3 uyumluluğunu doğrudan test eden axe-core kuralı şu anda bulunmamaktadır. Durum mesajları, uygun ARIA canlı bölgelerinin yerinde olduğunun ve ekran okuyucuların güncellemeleri doğru duyurduğunun doğrulanması için manuel test gerektirir. Otomatik araçlar canlı bölge niteliklerinin varlığını doğrulayabilir, ancak uygulamadaki her durum mesajının kapsanıp kapsanmadığını belirleyemez.",
        ),

        heading("Nasıl test edilir", "h2"),
        p(
          "Durum mesajlarını test etmek öncelikle manuel bir süreçtir. Durum güncellemeleri üreten eylemleri gerçekleştirmeli ve bunların ekran okuyucu tarafından duyurulduğunu doğrulamalısınız.",
        ),
        numbered(
          "Uygulamadaki tüm durum mesajlarını belirleyin: form başarı/hata mesajları, arama sonucu sayıları, yükleme göstergeleri, sepet güncellemeleri, bildirim toastları ve ilerleme göstergeleri.",
        ),
        numbered(
          "Bir ekran okuyucu etkinleştirin (macOS'ta VoiceOver, Windows'ta NVDA) ve her durum mesajını tetikleyin.",
        ),
        numbered(
          "Ekran okuyucunun mesajı mevcut konumunuzdan odak kaymadan duyurduğundan emin olun.",
        ),
        numbered(
          'Acil mesajların (hatalar, uyarılar) role="alert" veya aria-live="assertive" kullandığını ve hemen duyurulduğunu doğrulayın.',
        ),
        numbered(
          'Acil olmayan mesajların (başarı, bilgi, ilerleme) role="status" veya aria-live="polite" kullandığını ve ekran okuyucu mevcut konuşmasını bitirdikten sonra duyurulduğunu doğrulayın.',
        ),
        numbered(
          "Canlı bölge kapsayıcısının mesaj enjekte edilmeden önce DOM'da var olduğundan emin olun — dinamik olarak oluşturulan canlı bölgeler tüm ekran okuyucuları tarafından tanınmayabilir.",
        ),

        heading("Nasıl düzeltilir", "h2"),
        p(
          "Durum mesajlarını duyurmak için ARIA canlı bölgelerini kullanın. Anahtar nokta doğru aciliyet seviyesini seçmek ve canlı bölgenin içerik enjekte edilmeden önce DOM'da mevcut olmasını sağlamaktır.",
        ),

        heading('role="status" ile başarı mesajı', "h3"),
        code(
          '<!-- Canlı bölge kapsayıcısı sayfa yüklendiğinde DOM\'da (boş) -->\n<div role="status" aria-live="polite" id="form-durum"></div>\n\n<!-- Form gönderildikten sonra mesajı enjekte edin -->\n<script>\n  document.getElementById(\'form-durum\').textContent =\n    \'Değişiklikleriniz başarıyla kaydedildi.\';\n</script>',
          "html",
        ),

        heading('role="alert" ile hata bildirimi', "h3"),
        code(
          '<!-- Kapsayıcı başından beri DOM\'da mevcut -->\n<div role="alert" aria-live="assertive" id="hata-bildirimi"></div>\n\n<!-- Hata oluştuğunda -->\n<script>\n  document.getElementById(\'hata-bildirimi\').textContent =\n    \'Hata: Kaydedilemedi. Lütfen internet bağlantınızı kontrol edin.\';\n</script>',
          "html",
        ),

        heading("Arama sonuçları sayısı", "h3"),
        code(
          '<!-- Arama geri bildirimi için canlı bölge -->\n<div role="status" aria-live="polite" aria-atomic="true" id="arama-sonuç-sayısı">\n  "erişilebilirlik" için 24 sonuç gösteriliyor\n</div>\n\n<!-- Kullanıcı yazarken güncellenir -->\n<script>\n  function sonuçlarıGüncelle(sorgu, sayı) {\n    document.getElementById(\'arama-sonuç-sayısı\').textContent =\n      `"${sorgu}" için ${sayı} sonuç gösteriliyor`;\n  }\n</script>',
          "html",
        ),

        heading("İlerleme göstergesi", "h3"),
        code(
          '<!-- Canlı bölgeli ilerleme çubuğu -->\n<div\n  role="progressbar"\n  aria-valuenow="45"\n  aria-valuemin="0"\n  aria-valuemax="100"\n  aria-label="Dosya yükleme ilerlemesi"\n  aria-live="polite"\n>\n  %45 tamamlandı\n</div>\n\n<!-- Tamamlanma mesajı -->\n<div role="status" aria-live="polite" id="yükleme-durum"></div>\n\n<script>\n  // Yükleme tamamlandığında:\n  document.getElementById(\'yükleme-durum\').textContent =\n    \'Yükleme tamamlandı. "rapor.pdf" dosyası kaydedildi.\';\n</script>',
          "html",
        ),

        heading("React uygulama deseni", "h3"),
        code(
          'function DurumDuyurucu({ mesaj, aciliyet = "polite" }) {\n  return (\n    <div\n      role={aciliyet === "assertive" ? "alert" : "status"}\n      aria-live={aciliyet}\n      aria-atomic="true"\n      className="sr-only"\n    >\n      {mesaj}\n    </div>\n  );\n}\n\n// Form bileşeninde kullanım\nfunction IletisimFormu() {\n  const [durum, setDurum] = useState("");\n\n  async function gönder(veri) {\n    try {\n      await formuGonder(veri);\n      setDurum("Mesajınız başarıyla gönderildi.");\n    } catch {\n      setDurum("Mesaj gönderilemedi. Lütfen tekrar deneyin.");\n    }\n  }\n\n  return (\n    <form onSubmit={gönder}>\n      {/* form alanları */}\n      <button type="submit">Gönder</button>\n      <DurumDuyurucu mesaj={durum} />\n    </form>\n  );\n}',
          "jsx",
        ),

        heading("Sık yapılan hatalar", "h2"),
        bullet(
          "Canlı bölgeyi mesajla aynı anda dinamik olarak oluşturmak — birçok ekran okuyucu yalnızca içerik değişmeden önce DOM'da mevcut olan canlı bölgeleri izler.",
        ),
        bullet(
          '"Başarıyla kaydedildi" gibi acil olmayan mesajlar için role="alert" kullanmak — assertive duyurular kullanıcıyı böler ve hatalar ile uyarılar için ayrılmalıdır.',
        ),
        bullet(
          "Canlı bölge kullanmak yerine odağı durum mesajına taşımak — bu kullanıcının konumunu bozar ve 4.1.3'un amacını ihlal eder.",
        ),
        bullet(
          'Güncelleme sırasında mesajın tamamı yerine yalnızca değişen kısmın okunması gerektiğinde aria-atomic="true" eklemeyi unutmak.',
        ),
        bullet(
          "Sık hızlı güncellemeler yapan bir kapsayıcıda (örneğin gerçek zamanlı günlük) gecikme olmadan aria-live kullanmak — bu ekran okuyucuyu duyurularla doldurur.",
        ),
        bullet(
          "Canlı bölgeyi display:none veya visibility:hidden ile gizlenen bir kapsayıcının içine yerleştirmek — canlı bölgeler işleyebilmek için erişilebilirlik ağacında görünür olmalıdır.",
        ),
      ],
    },

    resources: [
      {
        title: "Understanding Success Criterion 4.1.3: Status Messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
        source: "w3c-understanding",
        language: "en",
        _key: "r413w3cu",
      },
      {
        title: "W3C WAI: ARIA Live Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
        source: "w3c-wai",
        language: "en",
        _key: "r413wail",
      },
      {
        title: "MDN: ARIA live regions",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
        source: "mdn",
        language: "en",
        _key: "r413mdnl",
      },
      {
        title: "Deque: aria-live regions best practices",
        url: "https://www.deque.com/blog/aria-live-regions-are-your-friend/",
        source: "deque",
        language: "en",
        _key: "r413deql",
      },
      {
        title: "WebAIM: ARIA Live Regions",
        url: "https://webaim.org/techniques/aria/#liveregions",
        source: "webaim",
        language: "en",
        _key: "r413waim",
      },
      {
        title: "The A11Y Project: Notifications",
        url: "https://www.a11yproject.com/posts/how-to-accessible-notifications/",
        source: "a11y-project",
        language: "en",
        _key: "r413a11y",
      },
      {
        title: "Techniques for WCAG 2.2 — ARIA22: Using role=status",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22",
        source: "w3c-techniques",
        language: "en",
        _key: "r413ar22",
      },
    ],

    seo: {
      en: {
        metaTitle: "WCAG 4.1.3 Status Messages — ARIA Live Regions Guide",
        metaDescription:
          'Learn how to meet WCAG 4.1.3 Status Messages. Practical guidance on ARIA live regions, role="status", role="alert", and announcing dynamic content changes to screen readers.',
      },
      tr: {
        metaTitle: "WCAG 4.1.3 Durum Mesajları — ARIA Canlı Bölgeler Rehberi",
        metaDescription:
          'WCAG 4.1.3 Durum Mesajları kriterini nasıl karşılayacağınızı öğrenin. ARIA canlı bölgeler, role="status", role="alert" ve dinamik içerik değişikliklerini ekran okuyuculara duyurma için pratik rehber.',
      },
    },
  },
];

export default rules;
