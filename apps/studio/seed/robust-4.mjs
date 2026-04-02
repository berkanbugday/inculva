import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ─────────────────────────────────────────────────────────────────
  // 4.1.1 Parsing
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: '4.1.1',
    level: 'A',
    principle: 'robust',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1'],
    impact: 'serious',
    axeRuleIds: [
      'duplicate-id',
      'duplicate-id-active',
      'duplicate-id-aria',
      'accesskeys',
    ],
    tags: ['html', 'parsing', 'validation'],

    title: {
      en: 'Parsing',
      tr: 'Ayristirma',
    },

    description: {
      en: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.',
      tr: 'Isaretleme dilleri kullanilarak olusturulan iceriklerde ogeler eksiksiz baslangic ve bitis etiketlerine sahiptir, ogeler belirtimlerine uygun sekilde ic ice yerlestirilmistir, ogeler yinelenen niteliklere sahip degildir ve tum kimlikler benzersizdir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 4.1.1 Parsing requires that content authored in markup languages such as HTML is well-formed. Specifically, elements must have matching opening and closing tags, they must be nested correctly according to the specification, no element may have duplicate attributes, and all id values on a page must be unique. The goal is to ensure that user agents — browsers, screen readers, and other assistive technologies — can reliably parse and present the content.'
        ),
        blockquote(
          'Important: This criterion was removed in WCAG 2.2. The W3C determined that modern browsers handle parsing errors gracefully, making explicit parsing requirements unnecessary. However, 4.1.1 remains relevant when testing against WCAG 2.0 or WCAG 2.1 conformance levels.'
        ),
        p(
          'Even though modern browsers are forgiving of many HTML errors, duplicate IDs still cause real problems for assistive technologies. When two elements share the same id, aria-labelledby, aria-describedby, and label[for] references become ambiguous, and the browser may associate the wrong element.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Assistive technologies rely on the browser\'s accessibility tree, which is built from the parsed DOM. When markup is malformed — unclosed tags, improperly nested elements, or duplicate IDs — the resulting DOM may differ across browsers. A screen reader may skip content, associate a label with the wrong input, or fail to convey the structure of the page entirely.'
        ),
        p(
          'Duplicate IDs are the most impactful parsing issue in practice. If a form label references an id shared by two inputs, only the first input receives the programmatic association. The second input becomes effectively unlabelled for assistive technology users, even though sighted users can see the label visually.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('duplicate-id — Ensures every id attribute value used in a document is unique.'),
        bullet('duplicate-id-active — Ensures id attributes on active, focusable elements are unique.'),
        bullet('duplicate-id-aria — Ensures id attributes referenced by ARIA attributes are unique.'),
        bullet('accesskeys — Ensures every accesskey attribute value is unique to prevent conflicts.'),

        heading('How to test', 'h2'),
        p(
          'Even though browsers tolerate many parsing errors, testing for duplicate IDs and malformed markup remains valuable for accessibility and code quality.'
        ),
        bullet('Run axe-core or axe DevTools — the duplicate-id family of rules will flag any shared IDs on the page.'),
        bullet('Use the W3C Nu HTML Checker (validator.w3.org/nu/) to identify parsing errors, unclosed elements, and nesting violations.'),
        bullet('Search the codebase for id attributes and verify uniqueness, especially in server-rendered templates where IDs may be repeated across components.'),
        bullet('Check dynamically injected content — SPAs that append nodes to the DOM often reuse IDs from previous renders.'),

        heading('How to fix', 'h2'),
        p('The primary fix is eliminating duplicate IDs. Below are common patterns and solutions.'),

        heading('Duplicate IDs — bad practice', 'h3'),
        code(
          '<!-- Two elements share the same id -->\n<label for="email">Email</label>\n<input id="email" type="email" name="signup-email">\n\n<!-- Later in the same page -->\n<label for="email">Work Email</label>\n<input id="email" type="email" name="work-email">',
          'html'
        ),

        heading('Duplicate IDs — good practice', 'h3'),
        code(
          '<!-- Each id is unique -->\n<label for="signup-email">Email</label>\n<input id="signup-email" type="email" name="signup-email">\n\n<label for="work-email">Work Email</label>\n<input id="work-email" type="email" name="work-email">',
          'html'
        ),

        heading('Nesting violations — examples', 'h3'),
        code(
          '<!-- Bad: block element inside inline element -->\n<a href="/about">\n  <div>About Us</div>\n</a>\n\n<!-- Bad: interactive elements nested -->\n<button>\n  <a href="/save">Save</a>\n</button>\n\n<!-- Good: proper nesting -->\n<a href="/about">About Us</a>\n\n<button type="button">Save</button>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Copying components that contain hardcoded IDs without making them unique per instance.'),
        bullet('Server-side loops that generate identical IDs for repeated elements — use an index or unique key in the id.'),
        bullet('SPA frameworks reusing DOM nodes without resetting id attributes when component state changes.'),
        bullet('Duplicate accesskey values, which cause keyboard shortcut conflicts across the page.'),
        bullet('Assuming that because this criterion was removed in WCAG 2.2, duplicate IDs are harmless — they still break ARIA references and label associations.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 4.1.1 Ayristirma, HTML gibi isaretleme dillerinde yazilan icerigin dogru bicimde olusturulmasini gerektirir. Ozellikle, ogelerin eslesen acilis ve kapanis etiketlerine sahip olmasi, belirtime gore dogru ic ice yerlestirilmesi, hicbir ogenin yinelenen niteliklere sahip olmamasi ve sayfadaki tum id degerlerinin benzersiz olmasi gerekir. Amac, tarayicilarin, ekran okuyucularin ve diger yardimci teknolojilerin icerigi guvenilir bicimde ayristirip sunabilmesini saglamaktir.'
        ),
        blockquote(
          'Onemli: Bu kriter WCAG 2.2 surumuyle kaldirilmistir. W3C, modern tarayicilarin ayristirma hatalarini sorunsuz sekilde ele aldigini belirlediginden acik ayristirma gereksinimlerini gereksiz bulmustur. Ancak 4.1.1, WCAG 2.0 veya WCAG 2.1 uyumluluk testlerinde hala gecerlidir.'
        ),
        p(
          'Modern tarayicilar bircok HTML hatasini tolere etse de yinelenen kimlikler yardimci teknolojiler icin gercek sorunlara neden olur. Iki oge ayni id degerini paylastiginda aria-labelledby, aria-describedby ve label[for] referanslari belirsizlesir ve tarayici yanlis ogeyle iliskilendirme yapabilir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Yardimci teknolojiler, ayristirilan DOM\'dan insa edilen erisilebilirlik agacina dayanir. Isaretleme bozuk oldugunda — kapatilmamis etiketler, hatali ic ice yerlestirme veya yinelenen kimlikler — ortaya cikan DOM tarayicilar arasinda farklilik gosterebilir. Ekran okuyucu icerigi atlayabilir, bir etiketi yanlis girdi ile iliskilendirebilir veya sayfanin yapisini tamamen aktaramayabilir.'
        ),
        p(
          'Yinelenen kimlikler pratikte en etkili ayristirma sorunudur. Bir form etiketi iki girdi tarafindan paylasilan bir id degerine referans verdiginde yalnizca ilk girdi programatik iliskilendirmeyi alir. Ikinci girdi, goren kullanicilar etiketi gorsel olarak gorsa bile yardimci teknoloji kullanicilari icin fiilen etiketlenmemis olur.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('duplicate-id — Belgedeki her id niteligi degerinin benzersiz oldugunu dogrular.'),
        bullet('duplicate-id-active — Aktif, odaklanabilir ogelerdeki id niteliklerinin benzersiz oldugunu dogrular.'),
        bullet('duplicate-id-aria — ARIA nitelikleri tarafindan referans verilen id niteliklerinin benzersiz oldugunu dogrular.'),
        bullet('accesskeys — Her accesskey niteligi degerinin cakismalari onlemek icin benzersiz oldugunu dogrular.'),

        heading('Nasil test edilir', 'h2'),
        p(
          'Tarayicilar bircok ayristirma hatasini tolere etse de yinelenen kimlikleri ve bozuk isaretlemeyi test etmek erisilebilirlik ve kod kalitesi icin degerli olmaya devam eder.'
        ),
        bullet('axe-core veya axe DevTools calistirin — duplicate-id kural ailesi sayfadaki tum paylasilan kimlikleri isaret eder.'),
        bullet('Ayristirma hatalarini, kapatilmamis ogeleri ve yerlestirme ihlallerini belirlemek icin W3C Nu HTML Checker (validator.w3.org/nu/) kullanin.'),
        bullet('Kod tabaninda id niteliklerini arayin ve benzersizligi dogrulayin, ozellikle kimliklerin bilesenler arasinda tekrarlanabilecegi sunucu tarafinda olusturulan sablonlarda.'),
        bullet('Dinamik olarak eklenen icerigi kontrol edin — DOM\'a dugumler ekleyen tek sayfa uygulamalari onceki olusturmalardan kimlikleri siklikla yeniden kullanir.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Temel cozum yinelenen kimlikleri ortadan kaldirmaktir. Asagida yaygin kaliplar ve cozumler yer almaktadir.'),

        heading('Yinelenen kimlikler — yanlis uygulama', 'h3'),
        code(
          '<!-- Iki oge ayni id\'yi paylasir -->\n<label for="email">E-posta</label>\n<input id="email" type="email" name="kayit-email">\n\n<!-- Ayni sayfada daha sonra -->\n<label for="email">Is E-postasi</label>\n<input id="email" type="email" name="is-email">',
          'html'
        ),

        heading('Yinelenen kimlikler — dogru uygulama', 'h3'),
        code(
          '<!-- Her id benzersizdir -->\n<label for="kayit-email">E-posta</label>\n<input id="kayit-email" type="email" name="kayit-email">\n\n<label for="is-email">Is E-postasi</label>\n<input id="is-email" type="email" name="is-email">',
          'html'
        ),

        heading('Yerlestirme ihlalleri — ornekler', 'h3'),
        code(
          '<!-- Yanlis: satir ici ogenin icinde blok oge -->\n<a href="/hakkimizda">\n  <div>Hakkimizda</div>\n</a>\n\n<!-- Yanlis: ic ice etkilesimli ogeler -->\n<button>\n  <a href="/kaydet">Kaydet</a>\n</button>\n\n<!-- Dogru: uygun yerlestirme -->\n<a href="/hakkimizda">Hakkimizda</a>\n\n<button type="button">Kaydet</button>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Sabit kodlanmis kimlikler iceren bilesenleri her ornek icin benzersiz hale getirmeden kopyalamak.'),
        bullet('Sunucu tarafindaki dongulerin tekrarlanan ogeler icin ayni kimlikleri olusturmasi — id icinde bir dizin veya benzersiz anahtar kullanin.'),
        bullet('SPA cercevelerinin bilesen durumu degistiginde id niteliklerini sifirlamadan DOM dugumlerini yeniden kullanmasi.'),
        bullet('Sayfa genelinde klavye kisayolu cakismalarina neden olan yinelenen accesskey degerleri.'),
        bullet('Bu kriterin WCAG 2.2\'de kaldirilmis olmasi nedeniyle yinelenen kimliklerin zararsiz oldugunu varsaymak — bunlar hala ARIA referanslarini ve etiket iliskilendirmelerini bozar.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 4.1.1: Parsing (WCAG 2.1)',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r411w3cu',
      },
      {
        title: 'WCAG 2.2 — 4.1.1 Parsing (Obsolete and removed)',
        url: 'https://www.w3.org/TR/WCAG22/#parsing',
        source: 'w3c-spec',
        language: 'en',
        _key: 'r411spec',
      },
      {
        title: 'Deque University: duplicate-id',
        url: 'https://dequeuniversity.com/rules/axe/4.10/duplicate-id',
        source: 'deque',
        language: 'en',
        _key: 'r411deqd',
      },
      {
        title: 'W3C Nu HTML Checker',
        url: 'https://validator.w3.org/nu/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r411nuch',
      },
      {
        title: 'WebAIM: WCAG 2 Checklist — Robust',
        url: 'https://webaim.org/standards/wcag/checklist#robust',
        source: 'webaim',
        language: 'en',
        _key: 'r411waim',
      },
      {
        title: 'MDN: Global id attribute',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id',
        source: 'mdn',
        language: 'en',
        _key: 'r411mdni',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 4.1.1 Parsing — Duplicate IDs & Valid HTML Guide',
        metaDescription:
          'Learn about WCAG 4.1.1 Parsing, including why it was removed in WCAG 2.2, how duplicate IDs break assistive technology, and how to fix common markup validation issues.',
      },
      tr: {
        metaTitle: 'WCAG 4.1.1 Ayristirma — Yinelenen Kimlikler ve Gecerli HTML Rehberi',
        metaDescription:
          'WCAG 4.1.1 Ayristirma kriterini, WCAG 2.2\'de neden kaldirildigini, yinelenen kimliklerin yardimci teknolojiyi nasil bozdugunun ve yaygin isaretleme dogrulama sorunlarini nasil duzeltileceginizi ogrenin.',
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4.1.2 Name, Role, Value
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: '4.1.2',
    level: 'A',
    principle: 'robust',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [
      'button-name',
      'aria-label',
      'aria-labelledby',
      'aria-hidden-body',
      'aria-hidden-focus',
      'aria-valid-attr',
      'aria-valid-attr-value',
      'aria-allowed-attr',
      'aria-allowed-role',
      'aria-roles',
    ],
    tags: ['aria', 'forms', 'custom-controls', 'widgets'],

    title: {
      en: 'Name, Role, Value',
      tr: 'Ad, Rol, Deger',
    },

    description: {
      en: 'For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
      tr: 'Tum kullanici arayuzu bilesenleri icin ad ve rol programatik olarak belirlenebilir; kullanici tarafindan ayarlanabilen durumlar, ozellikler ve degerler programatik olarak ayarlanabilir; ve bu ogelerdeki degisikliklerin bildirimi yardimci teknolojiler dahil kullanici araclarina sunulur.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 4.1.2 Name, Role, Value is one of the most broadly applicable accessibility criteria. It requires that every interactive user interface component exposes three things to assistive technology: its name (what it is called), its role (what type of control it is), and its current value or state (what it is set to or whether it is expanded, checked, selected, etc.).'
        ),
        p(
          'Native HTML elements such as <button>, <input>, <select>, and <a> automatically expose their role and allow names to be set via labels, text content, or attributes. The criterion becomes critical when developers build custom widgets — dropdown menus, tab panels, accordions, date pickers, sliders — using generic elements like <div> and <span>. Without explicit ARIA attributes, these custom components are invisible or meaningless to screen readers.'
        ),
        p(
          'The "value" component also requires that state changes are communicated. When a user expands an accordion, the assistive technology must be notified that the section is now open. When a checkbox is toggled, the checked state must update in the accessibility tree, not just visually.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Screen reader users interact with a page through the accessibility tree, not the visual layout. When a custom dropdown built from <div> elements lacks role="listbox" and aria-expanded, a screen reader announces it as a generic group or plain text. The user has no way to know it is interactive, what options it contains, or which option is selected. They are effectively locked out of the interface.'
        ),
        p(
          'This criterion is rated critical impact because failures directly prevent task completion. A button without a name cannot be identified. A custom checkbox without aria-checked cannot convey its state. A tab interface without role="tablist" and role="tab" cannot be navigated. These are not cosmetic issues — they represent complete barriers for assistive technology users.'
        ),
        p(
          'The proliferation of JavaScript frameworks and component libraries has made 4.1.2 failures one of the most common accessibility issues on the web. The WebAIM Million annual study consistently finds missing button names, missing form labels, and ARIA misuse among the top five most common errors.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('button-name — Ensures buttons have discernible, accessible text.'),
        bullet('aria-label — Verifies aria-label values are not empty.'),
        bullet('aria-labelledby — Ensures aria-labelledby references existing element IDs.'),
        bullet('aria-hidden-body — Ensures aria-hidden="true" is not present on the <body> element.'),
        bullet('aria-hidden-focus — Ensures elements hidden with aria-hidden do not contain focusable children.'),
        bullet('aria-valid-attr — Ensures ARIA attribute names are valid and correctly spelled.'),
        bullet('aria-valid-attr-value — Ensures ARIA attribute values are valid for their type.'),
        bullet('aria-allowed-attr — Ensures ARIA attributes are appropriate for the element\'s role.'),
        bullet('aria-allowed-role — Ensures the role attribute is valid for the element it is placed on.'),
        bullet('aria-roles — Ensures all role attribute values are valid ARIA roles.'),

        heading('How to test', 'h2'),
        p(
          'Testing for 4.1.2 requires a combination of automated and manual techniques. Automated tools can catch missing names, invalid ARIA attributes, and incorrect roles, but they cannot judge whether the name is meaningful or whether state changes are properly communicated.'
        ),
        numbered('Run axe-core or Lighthouse and review all findings in the "ARIA" and "Names and Labels" categories.'),
        numbered('Open the browser\'s accessibility inspector (Chrome DevTools > Elements > Accessibility pane) and verify that each interactive element shows a correct Name, Role, and State.'),
        numbered('Tab through the page and use arrow keys within composite widgets. Confirm that the screen reader announces the role (button, tab, listbox item, etc.), the name, and the current state (expanded, selected, checked).'),
        numbered('Toggle states — expand accordions, check boxes, select tabs — and verify the screen reader announces the change.'),
        numbered('Inspect custom components built with <div> or <span>. Confirm they have appropriate ARIA roles, names, and state attributes.'),

        heading('How to fix', 'h2'),
        p('The golden rule: use native HTML elements whenever possible. When custom components are necessary, provide complete ARIA semantics.'),

        heading('Buttons without names — bad practice', 'h3'),
        code(
          '<!-- Icon button with no accessible name -->\n<button>\n  <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2z"/></svg>\n</button>\n\n<!-- Button with only whitespace text -->\n<button>   </button>\n\n<!-- Div acting as button with no role or name -->\n<div onclick="save()">Save</div>',
          'html'
        ),

        heading('Buttons — good practice', 'h3'),
        code(
          '<!-- Icon button with aria-label -->\n<button aria-label="Open menu">\n  <svg aria-hidden="true" viewBox="0 0 24 24">\n    <path d="M3 18h18v-2H3v2z"/>\n  </svg>\n</button>\n\n<!-- Button with visible text -->\n<button type="button">Save Document</button>\n\n<!-- If you must use a div (not recommended), add role and tabindex -->\n<div role="button" tabindex="0" onclick="save()" onkeydown="handleKey(event)">\n  Save\n</div>',
          'html'
        ),

        heading('Custom checkbox — bad practice', 'h3'),
        code(
          '<!-- Div styled as checkbox but invisible to AT -->\n<div class="checkbox checked" onclick="toggle()">\n  <span class="checkmark">✓</span>\n  Accept terms\n</div>',
          'html'
        ),

        heading('Custom checkbox — good practice', 'h3'),
        code(
          '<!-- Native checkbox (preferred) -->\n<label>\n  <input type="checkbox" name="terms" checked>\n  Accept terms\n</label>\n\n<!-- Custom checkbox with full ARIA -->\n<div\n  role="checkbox"\n  aria-checked="true"\n  aria-label="Accept terms"\n  tabindex="0"\n  onclick="toggle()"\n  onkeydown="handleKey(event)"\n>\n  <span class="checkmark" aria-hidden="true">✓</span>\n  Accept terms\n</div>',
          'html'
        ),

        heading('Tab interface — complete pattern', 'h3'),
        code(
          '<div role="tablist" aria-label="Project settings">\n  <button role="tab" id="tab-general" aria-selected="true" aria-controls="panel-general">\n    General\n  </button>\n  <button role="tab" id="tab-members" aria-selected="false" aria-controls="panel-members" tabindex="-1">\n    Members\n  </button>\n</div>\n\n<div role="tabpanel" id="panel-general" aria-labelledby="tab-general">\n  <p>General settings content here.</p>\n</div>\n\n<div role="tabpanel" id="panel-members" aria-labelledby="tab-members" hidden>\n  <p>Members settings content here.</p>\n</div>',
          'html'
        ),

        heading('Accordion with state management', 'h3'),
        code(
          '<h3>\n  <button aria-expanded="true" aria-controls="section1-content">\n    Billing Information\n  </button>\n</h3>\n<div id="section1-content" role="region" aria-labelledby="section1-heading">\n  <p>Your current plan is Professional.</p>\n</div>\n\n<h3>\n  <button aria-expanded="false" aria-controls="section2-content">\n    Payment History\n  </button>\n</h3>\n<div id="section2-content" role="region" aria-labelledby="section2-heading" hidden>\n  <p>Payment records will appear here.</p>\n</div>',
          'html'
        ),

        heading('Invalid ARIA — common errors', 'h3'),
        code(
          '<!-- Bad: misspelled ARIA attribute -->\n<button aria-labelled="Save">Save</button>\n\n<!-- Bad: invalid role value -->\n<div role="buttn">Click me</div>\n\n<!-- Bad: aria-checked on an element without checkbox/switch role -->\n<div role="button" aria-checked="true">Toggle</div>\n\n<!-- Good: correct attribute and role usage -->\n<button aria-label="Save document">Save</button>\n<div role="button" tabindex="0">Click me</div>\n<div role="switch" aria-checked="true" tabindex="0">Toggle</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using <div> or <span> for interactive elements without adding role, tabindex, and keyboard handlers.'),
        bullet('Setting aria-label to an empty string — this effectively gives the element a blank name.'),
        bullet('Adding aria-hidden="true" to elements that contain focusable children — screen readers lose focus tracking.'),
        bullet('Using invalid ARIA role values (e.g., role="list-item" instead of role="listitem").'),
        bullet('Forgetting to update aria-expanded, aria-checked, or aria-selected when the visual state changes.'),
        bullet('Overriding native semantics unnecessarily — adding role="button" to a <button> is redundant but adding role="link" to a <button> is misleading.'),
        bullet('Using aria-label on non-interactive elements where it may be ignored by some screen readers.'),
        bullet('Placing ARIA attributes that are not allowed for a given role — for example, aria-pressed on role="link".'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 4.1.2 Ad, Rol, Deger, en genis kapsamli erisilebilirlik kriterlerinden biridir. Her etkilesimli kullanici arayuzu bileseninin yardimci teknolojiye uc seyi acmasi gerekir: adi (ne oldugu), rolu (ne tur bir kontrol oldugu) ve mevcut degeri veya durumu (ne ayarli oldugu veya genislemis, isaretli, secili vb. olup olmadigi).'
        ),
        p(
          '<button>, <input>, <select> ve <a> gibi yerel HTML ogeleri otomatik olarak rollerini aciga cikarir ve adlarin etiketler, metin icerigi veya nitelikler araciligiyla ayarlanmasina izin verir. Gelistiriciler <div> ve <span> gibi genel ogeler kullanarak ozel pencere ogesi bilesenleri — acilir menuler, sekme panelleri, akordeonlar, tarih seciciler, kaydiricilar — olusturdugunda bu kriter kritik hale gelir. Acik ARIA nitelikleri olmadan bu ozel bilesenler ekran okuyucular icin gorunmez veya anlamsizdir.'
        ),
        p(
          '"Deger" bileseni ayrica durum degisikliklerinin iletilmesini gerektirir. Bir kullanici bir akordeonu genislettiginde yardimci teknolojiye bolumun artik acik oldugu bildirilmelidir. Bir onay kutusu degistirildiginde isaretli durumu yalnizca gorsel olarak degil erisilebilirlik agacinda da guncellenmelidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ekran okuyucu kullanicilari sayfayla gorsel duzen uzerinden degil erisilebilirlik agaci uzerinden etkilesir. <div> ogelerinden olusturulmus role="listbox" ve aria-expanded icermeyen ozel bir acilir menu, ekran okuyucu tarafindan genel bir grup veya duz metin olarak duyurulur. Kullanici bunun etkilesimli oldugunu, hangi secenekleri icerdigini veya hangi secenegin secili oldugunu bilemez ve arayuzden fiilen dislanir.'
        ),
        p(
          'Bu kriter kritik etki olarak derecelendirilir cunku basarisizliklar dogrudan gorev tamamlamayi engeller. Adi olmayan bir dugme tanimlanamaz. aria-checked olmayan ozel bir onay kutusu durumunu iletemez. role="tablist" ve role="tab" olmayan bir sekme arayuzunde gezinilemez. Bunlar gorsel sorunlar degil — yardimci teknoloji kullanicilari icin tam engeller olusturur.'
        ),
        p(
          'JavaScript cercevelerinin ve bilesen kutuphanelerinin yayginlasmasi 4.1.2 basarisizliklarini webdeki en yaygin erisilebilirlik sorunlarindan biri haline getirmistir. WebAIM Million yillik calismasi eksik dugme adlarini, eksik form etiketlerini ve ARIA hatalarini surekli olarak en yaygin bes hata arasinda bulmaktadir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('button-name — Dugmelerin ayirt edilebilir, erisilebilir metne sahip olmasini saglar.'),
        bullet('aria-label — aria-label degerlerinin bos olmadigini dogrular.'),
        bullet('aria-labelledby — aria-labelledby referanslarinin mevcut oge kimliklerine isaret ettigini saglar.'),
        bullet('aria-hidden-body — <body> ogesinde aria-hidden="true" bulunmadigini saglar.'),
        bullet('aria-hidden-focus — aria-hidden ile gizlenen ogelerin odaklanabilir alt ogeler icermedigini saglar.'),
        bullet('aria-valid-attr — ARIA nitelik adlarinin gecerli ve dogru yazilmis oldugunu saglar.'),
        bullet('aria-valid-attr-value — ARIA nitelik degerlerinin turleri icin gecerli oldugunu saglar.'),
        bullet('aria-allowed-attr — ARIA niteliklerinin ogenin rolu icin uygun oldugunu saglar.'),
        bullet('aria-allowed-role — role niteligi degerinin yerlestirildigioge icin gecerli oldugunu saglar.'),
        bullet('aria-roles — Tum role niteligi degerlerinin gecerli ARIA rolleri oldugunu saglar.'),

        heading('Nasil test edilir', 'h2'),
        p(
          '4.1.2 testi otomatik ve manuel tekniklerin bir kombinasyonunu gerektirir. Otomatik araclar eksik adlari, gecersiz ARIA niteliklerini ve yanlis rolleri yakalayabilir, ancak adin anlamli olup olmadigini veya durum degisikliklerinin duzgun iletilip iletilmedigini degerlenderemez.'
        ),
        numbered('axe-core veya Lighthouse calistirin ve "ARIA" ile "Adlar ve Etiketler" kategorilerindeki tum bulgulari inceleyin.'),
        numbered('Tarayicinin erisilebilirlik denetcisini acin (Chrome DevTools > Elements > Accessibility paneli) ve her etkilesimli ogenin dogru bir Ad, Rol ve Durum gosterdigini dogrulayin.'),
        numbered('Sayfada Tab tusuyla gezinin ve bilesik pencere ogeleri icinde ok tuslarini kullanin. Ekran okuyucunun rolu (dugme, sekme, liste oge vb.), adi ve mevcut durumu (genislemis, secili, isaretli) duyurdugundan emin olun.'),
        numbered('Durumlari degistirin — akordeonlari genisletin, kutulari isaretleyin, sekmeler secin — ve ekran okuyucunun degisikligi duyurdugundan emin olun.'),
        numbered('<div> veya <span> ile olusturulmus ozel bilesenleri inceleyin. Uygun ARIA rolleri, adlari ve durum niteliklerine sahip olduklarini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Altin kural: mumkun oldugunda yerel HTML ogelerini kullanin. Ozel bilesenler gerektiginde eksiksiz ARIA semantigi saglayin.'),

        heading('Adsiz dugmeler — yanlis uygulama', 'h3'),
        code(
          '<!-- Erisilebilir adi olmayan simge dugme -->\n<button>\n  <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2z"/></svg>\n</button>\n\n<!-- Yalnizca bosluk metni olan dugme -->\n<button>   </button>\n\n<!-- Rol veya ad olmadan dugme gibi davranan div -->\n<div onclick="kaydet()">Kaydet</div>',
          'html'
        ),

        heading('Dugmeler — dogru uygulama', 'h3'),
        code(
          '<!-- aria-label ile simge dugme -->\n<button aria-label="Menuyu ac">\n  <svg aria-hidden="true" viewBox="0 0 24 24">\n    <path d="M3 18h18v-2H3v2z"/>\n  </svg>\n</button>\n\n<!-- Gorunen metne sahip dugme -->\n<button type="button">Belgeyi Kaydet</button>\n\n<!-- Div kullanmaniz gerekiyorsa (onerilmez), rol ve tabindex ekleyin -->\n<div role="button" tabindex="0" onclick="kaydet()" onkeydown="tusIsle(event)">\n  Kaydet\n</div>',
          'html'
        ),

        heading('Ozel onay kutusu — yanlis uygulama', 'h3'),
        code(
          '<!-- Onay kutusu gibi stillenmis ama AT icin gorunmez div -->\n<div class="checkbox checked" onclick="degistir()">\n  <span class="checkmark">✓</span>\n  Kosullari kabul ediyorum\n</div>',
          'html'
        ),

        heading('Ozel onay kutusu — dogru uygulama', 'h3'),
        code(
          '<!-- Yerel onay kutusu (tercih edilen) -->\n<label>\n  <input type="checkbox" name="kosullar" checked>\n  Kosullari kabul ediyorum\n</label>\n\n<!-- Tam ARIA ile ozel onay kutusu -->\n<div\n  role="checkbox"\n  aria-checked="true"\n  aria-label="Kosullari kabul ediyorum"\n  tabindex="0"\n  onclick="degistir()"\n  onkeydown="tusIsle(event)"\n>\n  <span class="checkmark" aria-hidden="true">✓</span>\n  Kosullari kabul ediyorum\n</div>',
          'html'
        ),

        heading('Sekme arayuzu — eksiksiz kalip', 'h3'),
        code(
          '<div role="tablist" aria-label="Proje ayarlari">\n  <button role="tab" id="tab-genel" aria-selected="true" aria-controls="panel-genel">\n    Genel\n  </button>\n  <button role="tab" id="tab-uyeler" aria-selected="false" aria-controls="panel-uyeler" tabindex="-1">\n    Uyeler\n  </button>\n</div>\n\n<div role="tabpanel" id="panel-genel" aria-labelledby="tab-genel">\n  <p>Genel ayarlar icerigi burada.</p>\n</div>\n\n<div role="tabpanel" id="panel-uyeler" aria-labelledby="tab-uyeler" hidden>\n  <p>Uye ayarlari icerigi burada.</p>\n</div>',
          'html'
        ),

        heading('Durum yonetimi ile akordeon', 'h3'),
        code(
          '<h3>\n  <button aria-expanded="true" aria-controls="bolum1-icerik">\n    Fatura Bilgileri\n  </button>\n</h3>\n<div id="bolum1-icerik" role="region" aria-labelledby="bolum1-baslik">\n  <p>Mevcut planiniz Profesyonel\'dir.</p>\n</div>\n\n<h3>\n  <button aria-expanded="false" aria-controls="bolum2-icerik">\n    Odeme Gecmisi\n  </button>\n</h3>\n<div id="bolum2-icerik" role="region" aria-labelledby="bolum2-baslik" hidden>\n  <p>Odeme kayitlari burada gorunecektir.</p>\n</div>',
          'html'
        ),

        heading('Gecersiz ARIA — yaygin hatalar', 'h3'),
        code(
          '<!-- Yanlis: yanlis yazilmis ARIA niteligi -->\n<button aria-labelled="Kaydet">Kaydet</button>\n\n<!-- Yanlis: gecersiz rol degeri -->\n<div role="buttn">Tikla</div>\n\n<!-- Yanlis: checkbox/switch rolu olmadan aria-checked -->\n<div role="button" aria-checked="true">Degistir</div>\n\n<!-- Dogru: uygun nitelik ve rol kullanimi -->\n<button aria-label="Belgeyi kaydet">Kaydet</button>\n<div role="button" tabindex="0">Tikla</div>\n<div role="switch" aria-checked="true" tabindex="0">Degistir</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Etkilesimli ogeler icin <div> veya <span> kullanip rol, tabindex ve klavye isleyicileri eklememek.'),
        bullet('aria-label degerini bos dize olarak ayarlamak — bu ogeye fiilen bos bir ad verir.'),
        bullet('Odaklanabilir alt ogeler iceren ogelere aria-hidden="true" eklemek — ekran okuyucular odak izlemesini kaybeder.'),
        bullet('Gecersiz ARIA rol degerleri kullanmak (ornegin role="listitem" yerine role="list-item").'),
        bullet('Gorsel durum degistiginde aria-expanded, aria-checked veya aria-selected guncellemeyi unutmak.'),
        bullet('Yerel semantikleri gereksiz yere gecersiz kilmak — bir <button> ogesine role="button" eklemek gereksizdir ancak role="link" eklemek yanilticidir.'),
        bullet('Bazi ekran okuyucularda goz ardi edilebilecek etkilesimli olmayan ogelerde aria-label kullanmak.'),
        bullet('Belirli bir rol icin izin verilmeyen ARIA nitelikleri yerlestirmek — ornegin role="link" uzerine aria-pressed eklemek.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 4.1.2: Name, Role, Value',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r412w3cu',
      },
      {
        title: 'WAI-ARIA Authoring Practices 1.2',
        url: 'https://www.w3.org/WAI/ARIA/apg/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r412apg1',
      },
      {
        title: 'Deque University: button-name',
        url: 'https://dequeuniversity.com/rules/axe/4.10/button-name',
        source: 'deque',
        language: 'en',
        _key: 'r412deqb',
      },
      {
        title: 'WebAIM: ARIA Techniques',
        url: 'https://webaim.org/techniques/aria/',
        source: 'webaim',
        language: 'en',
        _key: 'r412waim',
      },
      {
        title: 'MDN: ARIA roles',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles',
        source: 'mdn',
        language: 'en',
        _key: 'r412mdnr',
      },
      {
        title: 'MDN: Using ARIA — States and Properties',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes',
        source: 'mdn',
        language: 'en',
        _key: 'r412mdna',
      },
      {
        title: 'The A11Y Project: ARIA Checklist',
        url: 'https://www.a11yproject.com/checklist/',
        source: 'a11y-project',
        language: 'en',
        _key: 'r412a11y',
      },
      {
        title: 'ACT Rules: Role attribute has valid value',
        url: 'https://www.w3.org/WAI/standards-guidelines/act/rules/674b10/',
        source: 'act-rules',
        language: 'en',
        _key: 'r412actr',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 4.1.2 Name, Role, Value — ARIA & Custom Widgets Guide',
        metaDescription:
          'Learn how to meet WCAG 4.1.2 Name, Role, Value. Practical guidance on ARIA attributes, custom widget accessibility, button names, and state management with code examples.',
      },
      tr: {
        metaTitle: 'WCAG 4.1.2 Ad, Rol, Deger — ARIA ve Ozel Pencere Ogesi Rehberi',
        metaDescription:
          'WCAG 4.1.2 Ad, Rol, Deger kriterini nasil karsilayacaginizi ogrenin. ARIA nitelikleri, ozel pencere ogesi erisilebilirligi, dugme adlari ve durum yonetimi icin kod ornekleriyle pratik rehber.',
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4.1.3 Status Messages
  // ─────────────────────────────────────────────────────────────────
  {
    criterionNumber: '4.1.3',
    level: 'AA',
    principle: 'robust',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['aria', 'live-regions', 'notifications', 'status'],

    title: {
      en: 'Status Messages',
      tr: 'Durum Mesajlari',
    },

    description: {
      en: 'In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
      tr: 'Isaretleme dilleri kullanilarak olusturulan iceriklerde durum mesajlari, yardimci teknolojiler tarafindan kullaniciya odak almaksizin sunulabilmesi icin rol veya ozellikler araciligiyla programatik olarak belirlenebilir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 4.1.3 Status Messages requires that important messages conveyed to users — such as success confirmations, error summaries, progress updates, and search result counts — are communicated to assistive technology without moving keyboard focus to the message. This is achieved through ARIA live regions: elements with role="status", role="alert", role="log", role="progressbar", or the aria-live attribute.'
        ),
        p(
          'A status message is any content update that provides information to the user about the success or result of an action, the waiting state of an application, or the progress of a process, and is not important enough to justify a focus change. If a user submits a form and a "Your changes have been saved" banner appears, a sighted user sees it immediately. A screen reader user needs the same message announced without losing their current position on the page.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Sighted users notice visual changes — a toast notification, a loading spinner, an error banner — because their eyes can scan the page. Screen reader users, however, only hear what the screen reader announces. If a status message appears visually but is not exposed through a live region, the screen reader remains silent. The user has no idea their form was saved, their search returned zero results, or an error occurred.'
        ),
        p(
          'This is particularly problematic for asynchronous operations common in modern web applications. AJAX form submissions, real-time validation, search-as-you-type, file upload progress, and shopping cart updates all generate status messages that must be announced without disrupting the user\'s focus.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are currently no axe-core rules that directly test for 4.1.3 compliance. Status messages require manual testing to verify that appropriate ARIA live regions are in place and that screen readers announce updates correctly. Automated tools can verify the presence of live region attributes, but they cannot determine whether every status message in the application is covered.'
        ),

        heading('How to test', 'h2'),
        p(
          'Testing status messages is primarily a manual process. You need to perform actions that generate status updates and verify they are announced by a screen reader.'
        ),
        numbered('Identify all status messages in the application: form success/error messages, search result counts, loading indicators, cart updates, toast notifications, and progress indicators.'),
        numbered('Enable a screen reader (VoiceOver on macOS, NVDA on Windows) and trigger each status message.'),
        numbered('Confirm the screen reader announces the message without focus moving away from your current position.'),
        numbered('Verify that urgent messages (errors, warnings) use role="alert" or aria-live="assertive" and are announced immediately.'),
        numbered('Verify that non-urgent messages (success, info, progress) use role="status" or aria-live="polite" and are announced after the screen reader finishes its current speech.'),
        numbered('Check that the live region container exists in the DOM before the message is injected — dynamically created live regions may not be recognized by all screen readers.'),

        heading('How to fix', 'h2'),
        p('Use ARIA live regions to announce status messages. The key is choosing the right level of urgency and ensuring the live region is present in the DOM before content is injected.'),

        heading('Success message with role="status"', 'h3'),
        code(
          '<!-- The live region container is in the DOM on page load (empty) -->\n<div role="status" aria-live="polite" id="form-status"></div>\n\n<!-- After form submission, inject the message -->\n<script>\n  document.getElementById(\'form-status\').textContent =\n    \'Your changes have been saved successfully.\';\n</script>',
          'html'
        ),

        heading('Error alert with role="alert"', 'h3'),
        code(
          '<!-- Container present in DOM from the start -->\n<div role="alert" aria-live="assertive" id="error-alert"></div>\n\n<!-- When an error occurs -->\n<script>\n  document.getElementById(\'error-alert\').textContent =\n    \'Error: Unable to save. Please check your internet connection.\';\n</script>',
          'html'
        ),

        heading('Search results count', 'h3'),
        code(
          '<!-- Live region for search feedback -->\n<div role="status" aria-live="polite" aria-atomic="true" id="search-results-count">\n  Showing 24 results for "accessibility"\n</div>\n\n<!-- Updated when the user types -->\n<script>\n  function updateResults(query, count) {\n    document.getElementById(\'search-results-count\').textContent =\n      `Showing ${count} results for "${query}"`;\n  }\n</script>',
          'html'
        ),

        heading('Progress indicator', 'h3'),
        code(
          '<!-- Progress bar with live region -->\n<div\n  role="progressbar"\n  aria-valuenow="45"\n  aria-valuemin="0"\n  aria-valuemax="100"\n  aria-label="File upload progress"\n  aria-live="polite"\n>\n  45% complete\n</div>\n\n<!-- Completion message -->\n<div role="status" aria-live="polite" id="upload-status"></div>\n\n<script>\n  // When upload finishes:\n  document.getElementById(\'upload-status\').textContent =\n    \'Upload complete. File "report.pdf" has been saved.\';\n</script>',
          'html'
        ),

        heading('React implementation pattern', 'h3'),
        code(
          'function StatusAnnouncer({ message, urgency = "polite" }) {\n  return (\n    <div\n      role={urgency === "assertive" ? "alert" : "status"}\n      aria-live={urgency}\n      aria-atomic="true"\n      className="sr-only"\n    >\n      {message}\n    </div>\n  );\n}\n\n// Usage in a form component\nfunction ContactForm() {\n  const [status, setStatus] = useState("");\n\n  async function handleSubmit(data) {\n    try {\n      await submitForm(data);\n      setStatus("Message sent successfully.");\n    } catch {\n      setStatus("Failed to send message. Please try again.");\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* form fields */}\n      <button type="submit">Send</button>\n      <StatusAnnouncer message={status} />\n    </form>\n  );\n}',
          'jsx'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Creating the live region dynamically at the same time as the message — many screen readers only track live regions that were present in the DOM before content changed.'),
        bullet('Using role="alert" for non-urgent messages like "Saved successfully" — assertive announcements interrupt the user and should be reserved for errors and warnings.'),
        bullet('Moving focus to the status message instead of using a live region — this disrupts the user\'s position and violates the intent of 4.1.3.'),
        bullet('Forgetting aria-atomic="true" when the entire message should be re-read on update, not just the changed portion.'),
        bullet('Using aria-live on a container that has frequent rapid updates (e.g., a real-time log) without debouncing — this floods the screen reader with announcements.'),
        bullet('Placing the live region inside a container that is hidden with display:none or visibility:hidden — live regions must be visible to the accessibility tree to function.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 4.1.3 Durum Mesajlari, kullanicilara iletilen onemli mesajlarin — basari onaylari, hata ozetleri, ilerleme guncellemeleri ve arama sonucu sayilari gibi — klavye odagini mesaja tasimadan yardimci teknolojiye iletilmesini gerektirir. Bu, ARIA canli bolgeler araciligiyla saglanir: role="status", role="alert", role="log", role="progressbar" veya aria-live niteligi olan ogeler.'
        ),
        p(
          'Durum mesaji, kullaniciya bir eylemin basarisi veya sonucu, bir uygulamanin bekleme durumu veya bir suresin ilerlemesi hakkinda bilgi saglayan ve odak degisikligini hakli kilacak kadar onemli olmayan herhangi bir icerik guncellemesidir. Kullanici bir form gonderdiginde "Degisiklikleriniz kaydedildi" bannerı gorunurse goren kullanici bunu hemen fark eder. Ekran okuyucu kullanicisi ise sayfadaki mevcut konumunu kaybetmeden ayni mesajin duyurulmasina ihtiyac duyar.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Goren kullanicilar gorsel degisiklikleri — bir bildirim toastu, bir yukleme gostergesi, bir hata banneri — fark eder cunku gozleri sayfayi tarayabilir. Ancak ekran okuyucu kullanicilari yalnizca ekran okuyucunun duyurdugunu duyar. Bir durum mesaji gorsel olarak gorunur ancak canli bolge araciligiyla sunulmazsa ekran okuyucu sessiz kalir. Kullanici formunun kaydedildigini, aramasinin sifir sonuc dondurdugunu veya bir hata olustugunu bilemez.'
        ),
        p(
          'Bu, modern web uygulamalarinda yaygin olan asenkron islemler icin ozellikle sorunludur. AJAX form gonderme, gercek zamanli dogrulama, yazarken arama, dosya yukleme ilerlemesi ve alisveris sepeti guncellemelerinin hepsi kullanicinin odagini bozmadan duyurulmasi gereken durum mesajlari uretir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          '4.1.3 uyumlulugunu dogrudan test eden axe-core kurali su anda bulunmamaktadir. Durum mesajlari, uygun ARIA canli bolgelerinin yerinde oldugunun ve ekran okuyucularin guncellemeleri dogru duyurdugununun dogrulanmasi icin manuel test gerektirir. Otomatik araclar canli bolge niteliklerinin varligini dogrulayabilir, ancak uygulamadaki her durum mesajinin kapsanip kapsanmadigini belirleyemez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p(
          'Durum mesajlarini test etmek oncelikle manuel bir surectir. Durum guncellemeleri ureten eylemleri gerceklestirmeli ve bunlarin ekran okuyucu tarafindan duyuruldugunuzu dogrulamalisiniz.'
        ),
        numbered('Uygulamadaki tum durum mesajlarini belirleyin: form basari/hata mesajlari, arama sonucu sayilari, yukleme gostergeleri, sepet guncellemeleri, bildirim toastlari ve ilerleme gostergeleri.'),
        numbered('Bir ekran okuyucu etkinlestirin (macOS\'ta VoiceOver, Windows\'ta NVDA) ve her durum mesajini tetikleyin.'),
        numbered('Ekran okuyucunun mesaji mevcut konumunuzdan odak kaymadan duyurdugundan emin olun.'),
        numbered('Acil mesajlarin (hatalar, uyarilar) role="alert" veya aria-live="assertive" kullandigini ve hemen duyuruldugunuzu dogrulayin.'),
        numbered('Acil olmayan mesajlarin (basari, bilgi, ilerleme) role="status" veya aria-live="polite" kullandigini ve ekran okuyucu mevcut konusmasini bitirdikten sonra duyuruldugunuzu dogrulayin.'),
        numbered('Canli bolge kapsayicisinin mesaj enjekte edilmeden once DOM\'da var oldugundan emin olun — dinamik olarak olusturulan canli bolgeler tum ekran okuyuculari tarafindan taninmayabilir.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Durum mesajlarini duyurmak icin ARIA canli bolgelerini kullanin. Anahtar nokta dogru aciliyet seviyesini secmek ve canli bolgenin icerik enjekte edilmeden once DOM\'da mevcut olmasini saglamaktir.'),

        heading('role="status" ile basari mesaji', 'h3'),
        code(
          '<!-- Canli bolge kapsayicisi sayfa yuklendiginde DOM\'da (bos) -->\n<div role="status" aria-live="polite" id="form-durum"></div>\n\n<!-- Form gonderildikten sonra mesaji enjekte edin -->\n<script>\n  document.getElementById(\'form-durum\').textContent =\n    \'Degisiklikleriniz basariyla kaydedildi.\';\n</script>',
          'html'
        ),

        heading('role="alert" ile hata bildirimi', 'h3'),
        code(
          '<!-- Kapsayici basindan beri DOM\'da mevcut -->\n<div role="alert" aria-live="assertive" id="hata-bildirimi"></div>\n\n<!-- Hata olustugunda -->\n<script>\n  document.getElementById(\'hata-bildirimi\').textContent =\n    \'Hata: Kaydedilemedi. Lutfen internet baglantinizi kontrol edin.\';\n</script>',
          'html'
        ),

        heading('Arama sonuclari sayisi', 'h3'),
        code(
          '<!-- Arama geri bildirimi icin canli bolge -->\n<div role="status" aria-live="polite" aria-atomic="true" id="arama-sonuc-sayisi">\n  "erisilebilirlik" icin 24 sonuc gosteriliyor\n</div>\n\n<!-- Kullanici yazarken guncellenir -->\n<script>\n  function sonuclariGuncelle(sorgu, sayi) {\n    document.getElementById(\'arama-sonuc-sayisi\').textContent =\n      `"${sorgu}" icin ${sayi} sonuc gosteriliyor`;\n  }\n</script>',
          'html'
        ),

        heading('Ilerleme gostergesi', 'h3'),
        code(
          '<!-- Canli bolgeli ilerleme cubugu -->\n<div\n  role="progressbar"\n  aria-valuenow="45"\n  aria-valuemin="0"\n  aria-valuemax="100"\n  aria-label="Dosya yukleme ilerlemesi"\n  aria-live="polite"\n>\n  %45 tamamlandi\n</div>\n\n<!-- Tamamlanma mesaji -->\n<div role="status" aria-live="polite" id="yukleme-durum"></div>\n\n<script>\n  // Yukleme tamamlandiginda:\n  document.getElementById(\'yukleme-durum\').textContent =\n    \'Yukleme tamamlandi. "rapor.pdf" dosyasi kaydedildi.\';\n</script>',
          'html'
        ),

        heading('React uygulama deseni', 'h3'),
        code(
          'function DurumDuyurucu({ mesaj, aciliyet = "polite" }) {\n  return (\n    <div\n      role={aciliyet === "assertive" ? "alert" : "status"}\n      aria-live={aciliyet}\n      aria-atomic="true"\n      className="sr-only"\n    >\n      {mesaj}\n    </div>\n  );\n}\n\n// Form bileseninde kullanim\nfunction IletisimFormu() {\n  const [durum, setDurum] = useState("");\n\n  async function gonder(veri) {\n    try {\n      await formuGonder(veri);\n      setDurum("Mesajiniz basariyla gonderildi.");\n    } catch {\n      setDurum("Mesaj gonderilemedi. Lutfen tekrar deneyin.");\n    }\n  }\n\n  return (\n    <form onSubmit={gonder}>\n      {/* form alanlari */}\n      <button type="submit">Gonder</button>\n      <DurumDuyurucu mesaj={durum} />\n    </form>\n  );\n}',
          'jsx'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Canli bolgeyi mesajla ayni anda dinamik olarak olusturmak — bircok ekran okuyucu yalnizca icerik degismeden once DOM\'da mevcut olan canli bolgeleri izler.'),
        bullet('"Basariyla kaydedildi" gibi acil olmayan mesajlar icin role="alert" kullanmak — assertive duyurular kullaniciyi boler ve hatalar ile uyarilar icin ayrilmalidir.'),
        bullet('Canli bolge kullanmak yerine odagi durum mesajina tasimak — bu kullanicinin konumunu bozar ve 4.1.3\'un amacini ihlal eder.'),
        bullet('Guncelleme sirasinda mesajin tamami yerine yalnizca degisen kismin okunmasi gerektiginde aria-atomic="true" eklemeyi unutmak.'),
        bullet('Sik hizli guncellemeler yapan bir kapsayicida (ornegin gercek zamanli gunluk) gecikme olmadan aria-live kullanmak — bu ekran okuyucuyu duyurularla doldurur.'),
        bullet('Canli bolgeyi display:none veya visibility:hidden ile gizlenen bir kapsayicinin icine yerlestirmek — canli bolgeler isleyebilmek icin erisilebilirlik agacinda gorunur olmalidir.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 4.1.3: Status Messages',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r413w3cu',
      },
      {
        title: 'W3C WAI: ARIA Live Regions',
        url: 'https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r413wail',
      },
      {
        title: 'MDN: ARIA live regions',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions',
        source: 'mdn',
        language: 'en',
        _key: 'r413mdnl',
      },
      {
        title: 'Deque: aria-live regions best practices',
        url: 'https://www.deque.com/blog/aria-live-regions-are-your-friend/',
        source: 'deque',
        language: 'en',
        _key: 'r413deql',
      },
      {
        title: 'WebAIM: ARIA Live Regions',
        url: 'https://webaim.org/techniques/aria/#liveregions',
        source: 'webaim',
        language: 'en',
        _key: 'r413waim',
      },
      {
        title: 'The A11Y Project: Notifications',
        url: 'https://www.a11yproject.com/posts/how-to-accessible-notifications/',
        source: 'a11y-project',
        language: 'en',
        _key: 'r413a11y',
      },
      {
        title: 'Techniques for WCAG 2.2 — ARIA22: Using role=status',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r413ar22',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 4.1.3 Status Messages — ARIA Live Regions Guide',
        metaDescription:
          'Learn how to meet WCAG 4.1.3 Status Messages. Practical guidance on ARIA live regions, role="status", role="alert", and announcing dynamic content changes to screen readers.',
      },
      tr: {
        metaTitle: 'WCAG 4.1.3 Durum Mesajlari — ARIA Canli Bolgeler Rehberi',
        metaDescription:
          'WCAG 4.1.3 Durum Mesajlari kriterini nasil karsilayacaginizi ogrenin. ARIA canli bolgeler, role="status", role="alert" ve dinamik icerik degisikliklerini ekran okuyuculara duyurma icin pratik rehber.',
      },
    },
  },
]

export default rules
