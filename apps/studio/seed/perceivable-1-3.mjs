import { p, heading, bullet, numbered, code, blockquote } from "./helpers.mjs";

const rules = [
  // ─── 1.3.1 Info and Relationships ───────────────────────────────────
  {
    criterionNumber: "1.3.1",
    level: "A",
    principle: "perceivable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "critical",
    axeRuleIds: [
      "td-headers-attr",
      "th-has-data-cells",
      "scope-attr-valid",
      "table-fake-caption",
      "table-duplicate-name",
      "p-as-heading",
      "list",
      "listitem",
      "definition-list",
      "dlitem",
      "empty-heading",
      "heading-order",
      "label",
      "input-button-name",
      "select-name",
      "aria-required-children",
      "aria-required-parent",
      "landmark-banner-is-top-level",
      "landmark-contentinfo-is-top-level",
      "landmark-main-is-top-level",
      "landmark-no-duplicate-banner",
      "landmark-no-duplicate-contentinfo",
      "landmark-one-main",
      "region",
      "form-field-multiple-labels",
    ],
    tags: [
      "structure",
      "tables",
      "forms",
      "headings",
      "lists",
      "landmarks",
      "aria",
    ],
    title: {
      en: "Info and Relationships",
      tr: "Bilgi ve İlişkiler",
    },
    description: {
      en: "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
      tr: "Sunum yoluyla aktarılan bilgi, yapı ve ilişkiler programatik olarak belirlenebilir veya metin biçiminde sunulur.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          "Success Criterion 1.3.1 requires that all information conveyed visually through formatting, structure, or relationships is also available to assistive technologies. When sighted users perceive a heading because it is larger and bolder, screen reader users must receive the same structural information through proper HTML semantics. This applies to headings, lists, tables, form labels, landmarks, and any grouping conveyed through visual presentation.",
        ),
        p(
          "The fundamental principle is straightforward: if structure is visible, it must be coded. A data table with row and column headers must use <th> elements so assistive technologies can announce cell relationships. A navigation region must use a <nav> landmark so users can jump directly to it. A required form field shown with a red asterisk must have its required state exposed programmatically.",
        ),

        heading("Why it matters"),
        p(
          'This criterion has the broadest impact of almost any WCAG requirement. Screen reader users depend entirely on programmatic structure to understand page layout. Without proper semantics, a complex data table becomes an incomprehensible stream of text, a form becomes a guessing game, and page navigation becomes impossible. Voice control users also rely on labeled elements to issue commands like "click submit" or "go to navigation."',
        ),
        p(
          "Beyond assistive technology, proper semantics improve SEO, enable better browser default styling, and make codebases more maintainable. Semantic HTML is the foundation of accessible web development.",
        ),

        heading("Related axe-core rules"),
        bullet(
          "td-headers-attr — Ensures each cell in a data table with a headers attribute refers to valid <th> elements.",
        ),
        bullet(
          "th-has-data-cells — Ensures that <th> elements are actually associated with data cells.",
        ),
        bullet(
          "scope-attr-valid — Ensures the scope attribute on <th> elements uses only valid values (row, col, rowgroup, colgroup).",
        ),
        bullet(
          "table-fake-caption — Warns when a <caption> is faked using a table cell spanning all columns.",
        ),
        bullet(
          "p-as-heading — Detects paragraphs styled to look like headings instead of using <h1>–<h6> elements.",
        ),
        bullet(
          "list / listitem — Ensures <li> elements are contained within <ul> or <ol>, and vice versa.",
        ),
        bullet(
          "heading-order — Ensures heading levels do not skip (e.g., <h2> followed by <h4>).",
        ),
        bullet(
          "label — Ensures every form input has a programmatically associated label.",
        ),
        bullet(
          "landmark-one-main — Ensures the page has exactly one <main> landmark.",
        ),
        bullet(
          "region — Ensures all page content is contained within a landmark region.",
        ),

        heading("How to test"),
        numbered(
          "Use a browser extension like axe DevTools or WAVE to scan for structural violations.",
        ),
        numbered(
          "Navigate the page with a screen reader (VoiceOver, NVDA, JAWS) and verify that headings, lists, tables, and form fields are announced with their correct roles.",
        ),
        numbered(
          "Disable CSS and check that the page still conveys the same information hierarchy.",
        ),
        numbered(
          "Inspect the DOM to confirm that visual groupings correspond to semantic elements (<nav>, <aside>, <section>, <fieldset>, etc.).",
        ),
        numbered(
          "Verify every data table has appropriate <th> elements with scope attributes, and that complex tables use headers/id associations.",
        ),

        heading("How to fix"),
        p("Use proper heading elements to create a logical document outline:"),
        code(
          "<h1>Page Title</h1>\n<h2>Section Heading</h2>\n<h3>Subsection Heading</h3>\n<p>Content within the subsection.</p>\n<h2>Another Section</h2>",
        ),
        p("Mark up data tables with header cells and scope:"),
        code(
          '<table>\n  <caption>Quarterly Sales by Region</caption>\n  <thead>\n    <tr>\n      <th scope="col">Region</th>\n      <th scope="col">Q1</th>\n      <th scope="col">Q2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">North</th>\n      <td>$1.2M</td>\n      <td>$1.5M</td>\n    </tr>\n  </tbody>\n</table>',
        ),
        p("Associate form labels with their inputs:"),
        code(
          '<label for="email">Email address</label>\n<input type="email" id="email" name="email" required\n       aria-describedby="email-hint">\n<p id="email-hint">We will never share your email.</p>',
        ),
        p("Use landmark regions to structure the page:"),
        code(
          '<header role="banner">\n  <nav aria-label="Main navigation">...</nav>\n</header>\n<main>\n  <article>...</article>\n</main>\n<footer role="contentinfo">...</footer>',
        ),

        heading("Common mistakes"),
        bullet(
          "Using <div> or <span> elements styled as headings instead of <h1>–<h6>.",
        ),
        bullet(
          "Building data tables from nested <div> elements with CSS Grid or Flexbox, destroying table semantics entirely.",
        ),
        bullet(
          "Omitting <label> elements for form inputs and relying only on placeholder text.",
        ),
        bullet(
          "Using multiple <main> landmarks on a single page, or nesting banners inside other landmarks.",
        ),
        bullet(
          "Skipping heading levels (e.g., jumping from <h1> to <h4>) which breaks the document outline.",
        ),
        bullet(
          "Using <br> tags to create visual lists instead of <ul>/<ol> with <li> elements.",
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          "Başarı Ölçütü 1.3.1, görsel biçimlendirme yoluyla aktarılan tüm bilgi, yapı ve ilişkilerin yardımcı teknolojiler tarafından da erişilebilir olmasını gerektirir. Gören kullanıcılar bir başlığı büyük ve kalın yazıldığı için başlık olarak algıladığında, ekran okuyucu kullanıcıları da aynı yapısal bilgiyi doğru HTML semantiği aracılığıyla almalıdır. Bu kural başlıklar, listeler, tablolar, form etiketleri, belirgin bölgeler ve görsel sunum ile aktarılan tüm gruplamalar için geçerlidir.",
        ),
        p(
          "Temel ilke son derece basittir: yapı görünüyorsa, kodlanmalıdır. Satır ve sütun başlıklarına sahip bir veri tablosu, yardımcı teknolojilerin hücre ilişkilerini duyurabilmesi için <th> öğeleri kullanmalıdır. Bir gezinme alanı, kullanıcıların doğrudan atlayabilmesi için <nav> belirgin bölgesi kullanmalıdır. Kırmızı yıldız ile gösterilen zorunlu bir form alanının zorunluluk durumu programatik olarak sunulmalıdır.",
        ),

        heading("Neden önemlidir"),
        p(
          'Bu ölçüt, neredeyse tüm WCAG gereksinimleri arasında en geniş etkiye sahip olandır. Ekran okuyucu kullanıcıları sayfa düzenini anlamak için tamamen programatik yapıya bağlıdır. Doğru semantik olmadan karmaşık bir veri tablosu anlaşılmaz bir metin akışına, bir form tahmin oyununa ve sayfa gezintisi imkansız bir göreve dönüşür. Sesli kontrol kullanıcıları da "gönder düğmesine tıkla" veya "gezintiye git" gibi komutlar verebilmek için etiketlenmiş öğelere ihtiyaç duyar.',
        ),
        p(
          "Yardımcı teknolojilerin ötesinde, doğru semantik yapı SEO performansını artırır, tarayıcıların varsayılan stillemesini iyileştirir ve kod tabanlarını daha sürdürülebilir kılar. Semantik HTML, erişilebilir web geliştirmenin temel taşıdır.",
        ),

        heading("İlgili axe-core kuralları"),
        bullet(
          "td-headers-attr — Veri tablosundaki her hücrenin headers niteliğinin geçerli <th> öğelerine başvurduğunu doğrular.",
        ),
        bullet(
          "th-has-data-cells — <th> öğelerinin gerçekten veri hücreleriyle ilişkili olduğundan emin olur.",
        ),
        bullet(
          "scope-attr-valid — <th> öğelerindeki scope niteliğinin yalnızca geçerli değerler kullandığını kontrol eder.",
        ),
        bullet(
          "p-as-heading — <h1>–<h6> yerine başlık gibi stillendirilmiş paragrafları tespit eder.",
        ),
        bullet(
          "list / listitem — <li> öğelerinin <ul> veya <ol> içinde yer aldığını doğrular.",
        ),
        bullet(
          "heading-order — Başlık düzeylerinin atlanmadığından emin olur.",
        ),
        bullet(
          "label — Her form girdisinin programatik olarak ilişkilendirilmiş bir etikete sahip olduğunu doğrular.",
        ),
        bullet(
          "landmark-one-main — Sayfanın tam olarak bir <main> belirgin bölgesine sahip olduğundan emin olur.",
        ),
        bullet(
          "region — Tüm sayfa içeriğinin bir belirgin bölge içinde yer aldığını kontrol eder.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          "axe DevTools veya WAVE gibi bir tarayıcı eklentisi kullanarak yapısal ihlalleri tarayın.",
        ),
        numbered(
          "Sayfayı bir ekran okuyucu (VoiceOver, NVDA, JAWS) ile gezinerek başlıkların, listelerin, tabloların ve form alanlarının doğru rollerle duyurulduğunu doğrulayın.",
        ),
        numbered(
          "CSS'i devre dışı bırakın ve sayfanın aynı bilgi hiyerarşisini hâlâ aktardığını kontrol edin.",
        ),
        numbered(
          "DOM'u inceleyerek görsel gruplandırmaların semantik öğelere (<nav>, <aside>, <section>, <fieldset> vb.) karşılık geldiğini doğrulayın.",
        ),
        numbered(
          "Her veri tablosunun uygun <th> öğelerine ve scope niteliklerine sahip olduğunu, karmaşık tabloların headers/id ilişkilendirmesi kullandığını doğrulayın.",
        ),

        heading("Nasıl düzeltilir"),
        p(
          "Mantıksal bir belge taslağı oluşturmak için doğru başlık öğelerini kullanın:",
        ),
        code(
          "<h1>Sayfa Başlığı</h1>\n<h2>Bölüm Başlığı</h2>\n<h3>Alt Bölüm Başlığı</h3>\n<p>Alt bölüm içeriği.</p>\n<h2>Başka Bir Bölüm</h2>",
        ),
        p("Veri tablolarını başlık hücreleri ve scope ile işaretleyin:"),
        code(
          '<table>\n  <caption>Bölgelere Göre Üç Aylık Satışlar</caption>\n  <thead>\n    <tr>\n      <th scope="col">Bölge</th>\n      <th scope="col">Ç1</th>\n      <th scope="col">Ç2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Kuzey</th>\n      <td>1,2M ₺</td>\n      <td>1,5M ₺</td>\n    </tr>\n  </tbody>\n</table>',
        ),
        p("Form etiketlerini girdileriyle ilişkilendirin:"),
        code(
          '<label for="email">E-posta adresi</label>\n<input type="email" id="email" name="email" required\n       aria-describedby="email-hint">\n<p id="email-hint">E-postanızı asla paylaşmayız.</p>',
        ),
        p("Sayfayı yapılandırmak için belirgin bölgeler kullanın:"),
        code(
          '<header role="banner">\n  <nav aria-label="Ana gezinti">...</nav>\n</header>\n<main>\n  <article>...</article>\n</main>\n<footer role="contentinfo">...</footer>',
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          "<h1>–<h6> yerine başlık olarak stillendirilmiş <div> veya <span> öğeleri kullanmak.",
        ),
        bullet(
          "Veri tablolarını CSS Grid veya Flexbox ile iç içe <div> öğelerinden oluşturarak tablo semantiğini tamamen yok etmek.",
        ),
        bullet(
          "Form girdileri için <label> öğelerini atlayıp yalnızca yer tutucu metne güvenmek.",
        ),
        bullet(
          "Tek bir sayfada birden fazla <main> belirgin bölgesi kullanmak veya banner öğelerini başka bölgelerin içine yerleştirmek.",
        ),
        bullet(
          "Başlık düzeylerini atlamak (örneğin <h1>'den <h4>'e geçmek) ve belge taslağını bozmak.",
        ),
        bullet(
          "Görsel liste oluşturmak için <ul>/<ol> ve <li> yerine <br> etiketleri kullanmak.",
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.1: Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
        source: "W3C",
        language: "en",
        _key: "r131w3cu",
      },
      {
        title: "WebAIM: Semantic Structure",
        url: "https://webaim.org/techniques/semanticstructure/",
        source: "WebAIM",
        language: "en",
        _key: "r131weba",
      },
      {
        title: "Deque University: Info and Relationships",
        url: "https://dequeuniversity.com/rules/axe/4.7/label",
        source: "Deque",
        language: "en",
        _key: "r131dequ",
      },
      {
        title: "MDN: HTML Table Advanced Features",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced",
        source: "MDN",
        language: "en",
        _key: "r131mdnt",
      },
      {
        title: "MDN: ARIA Landmarks",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role",
        source: "MDN",
        language: "en",
        _key: "r131mdnl",
      },
      {
        title: "W3C: Using Semantic HTML",
        url: "https://www.w3.org/WAI/tutorials/page-structure/content/",
        source: "W3C",
        language: "en",
        _key: "r131w3cs",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.1 Info and Relationships — Guide",
        metaDescription:
          "Learn how to meet WCAG 1.3.1 by using semantic HTML for headings, tables, forms, lists, and landmarks so assistive technologies can convey structure.",
      },
      tr: {
        metaTitle: "WCAG 1.3.1 Bilgi ve İlişkiler — Kılavuz",
        metaDescription:
          "Başlıklar, tablolar, formlar, listeler ve belirgin bölgeler için semantik HTML kullanarak WCAG 1.3.1 ölçütünü nasıl karşılayacağınızı öğrenin.",
      },
    },
  },

  // ─── 1.3.2 Meaningful Sequence ──────────────────────────────────────
  {
    criterionNumber: "1.3.2",
    level: "A",
    principle: "perceivable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["structure", "reading-order", "css"],
    title: {
      en: "Meaningful Sequence",
      tr: "Anlamlı Sıralama",
    },
    description: {
      en: "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
      tr: "İçeriğin sunulma sırası anlamını etkilediğinde, doğru okuma sırası programatik olarak belirlenebilir.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          "Success Criterion 1.3.2 requires that the DOM order of content matches the intended reading sequence. When CSS is used to rearrange elements visually — through flexbox order, CSS Grid placement, absolute positioning, or floats — the underlying source order must still make sense when read linearly. Assistive technologies follow the DOM, not the visual layout.",
        ),
        p(
          "This criterion does not prohibit visual reordering. It requires that when reading order matters to comprehension, the programmatic order preserves that meaning. A two-column layout where left and right columns are independent may reorder freely, but a step-by-step tutorial where steps appear visually in sequence must maintain that sequence in the DOM.",
        ),

        heading("Why it matters"),
        p(
          "Screen readers process content in DOM order. If a page visually shows Step 1, Step 2, Step 3 but the DOM has them as Step 2, Step 3, Step 1 due to CSS reordering, a screen reader user will receive instructions out of order. This creates confusion and can make content completely unusable.",
        ),
        p(
          "Keyboard navigation also follows DOM order by default. When visual order and DOM order diverge, Tab key navigation becomes erratic — the focus jumps unpredictably across the page, disorienting keyboard users. This affects people with motor disabilities, low vision users who rely on both visual and keyboard cues, and power users who navigate with the keyboard.",
        ),

        heading("Related axe-core rules"),
        p(
          "There are no automated axe-core rules for this criterion because reading order requires human judgment. Automated tools cannot determine whether the visual sequence is meaningful. Manual testing with assistive technologies is essential for verifying compliance.",
        ),

        heading("How to test"),
        numbered(
          "Disable all CSS and verify that the page content reads in a logical, meaningful order.",
        ),
        numbered(
          "Use a screen reader to navigate through the page linearly and confirm the reading sequence matches the intended order.",
        ),
        numbered(
          "Check any use of CSS flexbox order, CSS Grid placement, float, or absolute/fixed positioning to verify that visual reordering does not break meaning.",
        ),
        numbered(
          "Tab through the page with a keyboard and verify that focus order follows the expected visual sequence.",
        ),
        numbered(
          "Inspect responsive layouts at different breakpoints — content that reflows may change reading order in ways that break meaning.",
        ),

        heading("How to fix"),
        p(
          "Ensure the HTML source order matches the intended reading sequence. Use CSS for visual presentation without relying on properties that reorder the DOM:",
        ),
        code(
          "<!-- Correct: source order matches visual order -->\n<article>\n  <h2>Step 1: Install dependencies</h2>\n  <p>Run npm install to set up the project.</p>\n  <h2>Step 2: Configure the environment</h2>\n  <p>Create a .env file with your settings.</p>\n  <h2>Step 3: Start the server</h2>\n  <p>Run npm start to launch the app.</p>\n</article>",
        ),
        p(
          "Avoid using CSS order or grid placement to rearrange content that has a meaningful sequence:",
        ),
        code(
          "/* Avoid this when reading order matters */\n.step-1 { order: 3; }  /* Visually last but first in DOM */\n.step-2 { order: 1; }  /* Visually first but second in DOM */\n.step-3 { order: 2; }\n\n/* Instead, fix the HTML source order */",
        ),
        p(
          "When using CSS Grid, be cautious with explicit placement that reorders content:",
        ),
        code(
          "/* Safe: items flow naturally in grid */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n/* Risky: explicit placement may break reading order */\n.sidebar { grid-row: 1 / 3; grid-column: 2; }\n.main    { grid-column: 1; }",
        ),

        heading("Common mistakes"),
        bullet(
          "Using flexbox order property to rearrange a sequence of numbered steps or instructions.",
        ),
        bullet(
          'Placing a "Read more" link in the DOM before the content it refers to, then visually repositioning it below with CSS.',
        ),
        bullet(
          "Using CSS Grid to swap the visual position of a question and its answer, confusing screen reader users.",
        ),
        bullet(
          "Floating content so that visually related items appear together but are separated in the DOM.",
        ),
        bullet(
          'Relying on tabindex with positive values to "fix" focus order rather than correcting the source order.',
        ),
        bullet(
          "Responsive designs where content reflows into a single column in a sequence that makes no logical sense.",
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          "Başarı Ölçütü 1.3.2, içeriğin DOM sıralamasının amaçlanan okuma sırasıyla eşleşmesini gerektirir. CSS kullanılarak öğeler görsel olarak yeniden düzenlendiğinde — flexbox order, CSS Grid yerleşimi, mutlak konumlandırma veya float ile — kaynak kodundaki sıralama doğrusal olarak okunduğunda anlamlı olmaya devam etmelidir. Yardımcı teknolojiler görsel düzeni değil, DOM'u takip eder.",
        ),
        p(
          "Bu ölçüt görsel yeniden sıralamayı yasaklamaz. Okuma sırası anlamayı etkilediğinde programatik sıranın bu anlamı korumasını gerektirir. Sol ve sağ sütunları bağımsız olan iki sütunlu bir düzen serbestçe yeniden sıralanabilir, ancak adımların görsel olarak sıralı göründüğü adım adım bir eğitim, DOM'da da bu sırayı korumalıdır.",
        ),

        heading("Neden önemlidir"),
        p(
          "Ekran okuyucular içeriği DOM sırasına göre işler. Bir sayfa görsel olarak Adım 1, Adım 2, Adım 3 gösteriyorsa ancak CSS yeniden sıralaması nedeniyle DOM'da Adım 2, Adım 3, Adım 1 şeklindeyse, ekran okuyucu kullanıcısı talimatları yanlış sırada alır. Bu karışıklık yaratır ve içeriği tamamen kullanılamaz hale getirebilir.",
        ),
        p(
          "Klavye gezintisi de varsayılan olarak DOM sırasını takip eder. Görsel sıra ile DOM sırası birbirinden ayrıldığında Tab tuşu gezintisi düzensiz hale gelir — odak sayfada öngörülemeyen şekilde atlar ve klavye kullanıcılarını şaşırtır. Bu durum motor engelli kişileri, hem görsel hem de klavye ipuçlarına dayanan az gören kullanıcıları ve klavye ile gezinen deneyimli kullanıcıları etkiler.",
        ),

        heading("İlgili axe-core kuralları"),
        p(
          "Okuma sırası insan değerlendirmesi gerektirdiğinden, bu ölçüt için otomatik axe-core kuralı bulunmaz. Otomatik araçlar görsel sıranın anlamlı olup olmadığını belirleyemez. Uyumluluğu doğrulamak için yardımcı teknolojilerle manuel test şarttır.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          "Tüm CSS'i devre dışı bırakın ve sayfa içeriğinin mantıklı, anlamlı bir sırayla okunduğunu doğrulayın.",
        ),
        numbered(
          "Sayfayı bir ekran okuyucu ile doğrusal olarak gezinerek okuma sırasının amaçlanan sırayla eşleştiğini kontrol edin.",
        ),
        numbered(
          "CSS flexbox order, CSS Grid yerleşimi, float veya mutlak/sabit konumlandırma kullanımını inceleyerek görsel yeniden sıralamanın anlam bozup bozmadığını doğrulayın.",
        ),
        numbered(
          "Sayfada Tab tuşuyla ilerleyin ve odak sırasının beklenen görsel sırayı takip ettiğini kontrol edin.",
        ),
        numbered(
          "Duyarlı düzenleri farklı kesme noktalarında kontrol edin — yeniden akan içerik okuma sırasını bozabilir.",
        ),

        heading("Nasıl düzeltilir"),
        p(
          "HTML kaynak sırasının amaçlanan okuma sırasıyla eşleştiğinden emin olun. DOM'u yeniden sıralayan özelliklere dayanmadan görsel sunum için CSS kullanın:",
        ),
        code(
          "<!-- Doğru: kaynak sırası görsel sıra ile eşleşir -->\n<article>\n  <h2>Adım 1: Bağımlılıkları yükleyin</h2>\n  <p>Projeyi kurmak için npm install çalıştırın.</p>\n  <h2>Adım 2: Ortamı yapılandırın</h2>\n  <p>Ayarlarınızla bir .env dosyası oluşturun.</p>\n  <h2>Adım 3: Sunucuyu başlatın</h2>\n  <p>Uygulamayı başlatmak için npm start çalıştırın.</p>\n</article>",
        ),
        p(
          "Anlamlı sıralamaya sahip içeriği yeniden düzenlemek için CSS order veya grid yerleşimini kullanmaktan kaçının:",
        ),
        code(
          "/* Okuma sırası önemliyken bundan kaçının */\n.adım-1 { order: 3; }  /* Görsel olarak son ama DOM'da ilk */\n.adım-2 { order: 1; }  /* Görsel olarak ilk ama DOM'da ikinci */\n.adım-3 { order: 2; }\n\n/* Bunun yerine HTML kaynak sırasını düzeltin */",
        ),
        p(
          "CSS Grid kullanırken içeriği yeniden sıralayan açık yerleşimlere dikkat edin:",
        ),
        code(
          "/* Güvenli: öğeler grid içinde doğal olarak akar */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n/* Riskli: açık yerleşim okuma sırasını bozabilir */\n.kenar-cubugu { grid-row: 1 / 3; grid-column: 2; }\n.ana-içerik   { grid-column: 1; }",
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          "Numaralanmış adımları veya talimatları yeniden düzenlemek için flexbox order özelliğini kullanmak.",
        ),
        bullet(
          '"Devamını oku" bağlantısını DOM\'da ilgili içerikten önce yerleştirip CSS ile altına konumlandırmak.',
        ),
        bullet(
          "CSS Grid ile bir sorunun ve cevabının görsel konumunu değiştirerek ekran okuyucu kullanıcılarının kafasını karıştırmak.",
        ),
        bullet(
          "İçeriği float ile konumlandırarak görsel olarak ilişkili öğeleri bir araya getirirken DOM'da birbirinden ayırmak.",
        ),
        bullet(
          'Kaynak sırasını düzeltmek yerine pozitif tabindex değerleriyle odak sırasını "düzeltmeye" çalışmak.',
        ),
        bullet(
          "Duyarlı tasarımlarda içeriğin mantıksal olmayan bir sırayla tek sütuna yeniden akması.",
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.2: Meaningful Sequence",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html",
        source: "W3C",
        language: "en",
        _key: "r132w3cu",
      },
      {
        title: "WebAIM: CSS and Reading Order",
        url: "https://webaim.org/techniques/css/invisiblecontent/",
        source: "WebAIM",
        language: "en",
        _key: "r132weba",
      },
      {
        title: "Deque: Reading Order and Focus Order",
        url: "https://dequeuniversity.com/rules/axe/4.7/region",
        source: "Deque",
        language: "en",
        _key: "r132dequ",
      },
      {
        title: "MDN: CSS Flexbox Order",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/order",
        source: "MDN",
        language: "en",
        _key: "r132mdnf",
      },
      {
        title: "Adrian Roselli: Source Order Matters",
        url: "https://adrianroselli.com/2015/09/source-order-matters.html",
        source: "Adrian Roselli",
        language: "en",
        _key: "r132aros",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.2 Meaningful Sequence — Guide",
        metaDescription:
          "Ensure your HTML source order matches the visual reading sequence. Learn how to meet WCAG 1.3.2 and avoid CSS reordering pitfalls.",
      },
      tr: {
        metaTitle: "WCAG 1.3.2 Anlamlı Sıralama — Kılavuz",
        metaDescription:
          "HTML kaynak sıranızın görsel okuma sırasıyla eşleşmesini sağlayın. WCAG 1.3.2 ölçütünü karşılamayı ve CSS yeniden sıralama tuzaklarını öğrenin.",
      },
    },
  },

  // ─── 1.3.3 Sensory Characteristics ──────────────────────────────────
  {
    criterionNumber: "1.3.3",
    level: "A",
    principle: "perceivable",
    introducedIn: "2.0",
    wcagVersions: ["2.0", "2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: [],
    tags: ["instructions", "visual", "sensory"],
    title: {
      en: "Sensory Characteristics",
      tr: "Duyusal Özellikler",
    },
    description: {
      en: "Instructions provided for understanding and operating content do not rely solely on sensory characteristics such as shape, color, size, visual location, orientation, or sound.",
      tr: "İçeriği anlamak ve kullanmak için sağlanan talimatlar yalnızca şekil, renk, boyut, görsel konum, yön veya ses gibi duyusal özelliklere dayanmaz.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          'Success Criterion 1.3.3 requires that instructions for interacting with content do not depend exclusively on sensory perception. When you tell users to "click the round button" or "select the option on the left," you assume they can perceive shape and spatial position. Users who are blind, have low vision, or use assistive technologies may not perceive these characteristics.',
        ),
        p(
          'Instructions must include non-sensory cues such as text labels, names, or roles. Instead of "click the green button," say "click the Submit button (green)." The sensory cue can supplement but must not be the only identifier.',
        ),

        heading("Why it matters"),
        p(
          "Blind users cannot see shapes, colors, or visual locations. Users with color vision deficiency may not distinguish color-coded instructions. Deaf users cannot hear audio cues. When instructions rely solely on sensory characteristics, entire groups of users are excluded from understanding how to interact with the content.",
        ),
        p(
          'This criterion also benefits users with cognitive disabilities who may struggle to interpret spatial references like "above" or "to the right of" in complex layouts, especially on mobile devices where visual arrangement changes.',
        ),

        heading("Related axe-core rules"),
        p(
          "There are no automated axe-core rules for this criterion. Sensory instructions require manual review because automated tools cannot determine whether an instruction relies solely on sensory characteristics. Content audits and user testing are necessary.",
        ),

        heading("How to test"),
        numbered(
          'Search the page for instructions that reference shape ("round button," "square icon"), color ("red warning," "green link"), size ("large heading"), location ("sidebar," "right column"), or sound ("after the beep").',
        ),
        numbered(
          "For each instruction found, verify that it also includes a text-based identifier (label, name, or role).",
        ),
        numbered(
          'Check error messages and help text to ensure they do not say things like "the field highlighted in red" without also naming the field.',
        ),
        numbered(
          "Review audio or video content for instructions that rely on sound alone without text equivalents.",
        ),

        heading("How to fix"),
        p("Always pair sensory descriptions with text labels:"),
        code(
          '<!-- Bad: relies only on shape and position -->\n<p>Click the round icon on the right to continue.</p>\n\n<!-- Good: includes text label alongside sensory cue -->\n<p>Click the "Next" button (round icon on the right) to continue.</p>',
        ),
        p("When referencing form errors, name the specific fields:"),
        code(
          "<!-- Bad: relies only on color -->\n<p>Please correct the fields highlighted in red.</p>\n\n<!-- Good: names the fields -->\n<p>Please correct the following fields: Email and Phone number.</p>",
        ),
        p(
          "For interactive elements, ensure the instruction references an accessible name:",
        ),
        code(
          '<!-- Bad -->\n<p>Use the triangle button to play the video.</p>\n\n<!-- Good -->\n<p>Click the "Play" button to start the video.</p>\n<button aria-label="Play">\n  <svg><!-- triangle icon --></svg>\n</button>',
        ),

        heading("Common mistakes"),
        bullet(
          'Error messages saying "see the red field above" without naming the specific field.',
        ),
        bullet(
          'Instructions like "click the icon on the left" in a toolbar without identifying which icon by name.',
        ),
        bullet(
          'Using color alone to indicate required fields (e.g., "fields marked in red are required") without a text marker or asterisk.',
        ),
        bullet(
          'Tutorial text saying "as shown in the image below" when the image has no text description.',
        ),
        bullet(
          'Navigation instructions like "use the menu at the top" without saying "use the Main Navigation menu."',
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          'Başarı Ölçütü 1.3.3, içerikle etkileşim talimatlarının yalnızca duyusal algıya bağlı olmamasını gerektirir. Kullanıcılara "yuvarlak düğmeye tıklayın" veya "soldaki seçeneği seçin" dediğinizde, şekil ve mekansal konumu algılayabildiklerini varsayarsınız. Görme engelli, az gören veya yardımcı teknoloji kullanan kullanıcılar bu özellikleri algılayamayabilir.',
        ),
        p(
          'Talimatlar; metin etiketleri, adlar veya roller gibi duyusal olmayan ipuçları içermelidir. "Yeşil düğmeye tıklayın" yerine "Gönder düğmesine (yeşil) tıklayın" denmelidir. Duyusal ipucu destekleyici olabilir, ancak tek tanımlayıcı olmamalıdır.',
        ),

        heading("Neden önemlidir"),
        p(
          "Görme engelli kullanıcılar şekilleri, renkleri veya görsel konumları göremez. Renk körlüğü olan kullanıcılar renkle kodlanmış talimatları ayırt edemeyebilir. İşitme engelli kullanıcılar sesli ipuçlarını duyamaz. Talimatlar yalnızca duyusal özelliklere dayandığında, kullanıcı grupları içerikle nasıl etkileşim kuracaklarını anlamaktan tamamen dışlanır.",
        ),
        p(
          'Bu ölçüt ayrıca karmaşık düzenlerde "yukarıda" veya "sağında" gibi mekansal referansları yorumlamakta zorlanan bilişsel engelli kullanıcılara da fayda sağlar; özellikle görsel düzenin değiştiği mobil cihazlarda bu sorun belirginleşir.',
        ),

        heading("İlgili axe-core kuralları"),
        p(
          "Bu ölçüt için otomatik axe-core kuralı bulunmaz. Duyusal talimatlar, otomatik araçların bir talimatın yalnızca duyusal özelliklere dayanıp dayanmadığını belirleyemediği için manuel inceleme gerektirir. İçerik denetimleri ve kullanıcı testleri gereklidir.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          'Sayfada şekil ("yuvarlak düğme"), renk ("kırmızı uyarı"), boyut ("büyük başlık"), konum ("kenar çubuğu," "sağ sütun") veya ses ("bip sesinden sonra") referansı içeren talimatları arayın.',
        ),
        numbered(
          "Bulunan her talimatın metin tabanlı bir tanımlayıcı (etiket, ad veya rol) de içerdiğini doğrulayın.",
        ),
        numbered(
          'Hata mesajları ve yardım metinlerinin "kırmızı ile vurgulanan alan" gibi ifadeler kullanırken alanı adlandırdığını kontrol edin.',
        ),
        numbered(
          "Sesli veya görüntülü içeriği, metin eşdeğeri olmadan yalnızca sese dayanan talimatlar açısından inceleyin.",
        ),

        heading("Nasıl düzeltilir"),
        p("Duyusal açıklamaları her zaman metin etiketleriyle eşleştirin:"),
        code(
          '<!-- Kötü: yalnızca şekil ve konuma dayanır -->\n<p>Devam etmek için sağdaki yuvarlak simgeye tıklayın.</p>\n\n<!-- İyi: duyusal ipucuyla birlikte metin etiketi içerir -->\n<p>Devam etmek için "İleri" düğmesine (sağdaki yuvarlak simge) tıklayın.</p>',
        ),
        p("Form hatalarına referans verirken belirli alanları adlandırın:"),
        code(
          "<!-- Kötü: yalnızca renge dayanır -->\n<p>Lütfen kırmızıyla vurgulanan alanları düzeltin.</p>\n\n<!-- İyi: alanları adlandırır -->\n<p>Lütfen şu alanları düzeltin: E-posta ve Telefon numarası.</p>",
        ),
        p(
          "Etkileşimli öğeler için talimatın erişilebilir bir ada referans verdiğinden emin olun:",
        ),
        code(
          '<!-- Kötü -->\n<p>Videoyu oynatmak için üçgen düğmeyi kullanın.</p>\n\n<!-- İyi -->\n<p>Videoyu başlatmak için "Oynat" düğmesine tıklayın.</p>\n<button aria-label="Oynat">\n  <svg><!-- üçgen simge --></svg>\n</button>',
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          'Hata mesajlarında belirli alanı adlandırmadan "yukarıdaki kırmızı alana bakın" demek.',
        ),
        bullet(
          'Araç çubuğundaki talimatların simgeyi ada göre tanımlamadan "soldaki simgeye tıklayın" demesi.',
        ),
        bullet(
          'Zorunlu alanları yalnızca renkle belirtmek (örneğin "kırmızı ile işaretlenmiş alanlar zorunludur") ve metin işareti veya yıldız kullanmamak.',
        ),
        bullet(
          'Eğitim metninin, resmin metin açıklaması olmadığı halde "aşağıdaki resimde gösterildiği gibi" demesi.',
        ),
        bullet(
          'Gezinme talimatlarının "Ana Gezinti menüsünü kullanın" demek yerine "üstteki menüyü kullanın" demesi.',
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.3: Sensory Characteristics",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html",
        source: "W3C",
        language: "en",
        _key: "r133w3cu",
      },
      {
        title: "WebAIM: Visual Disabilities",
        url: "https://webaim.org/articles/visual/",
        source: "WebAIM",
        language: "en",
        _key: "r133weba",
      },
      {
        title: "Deque: Sensory Characteristics",
        url: "https://dequeuniversity.com/resources/wcag2.1/1.3.3",
        source: "Deque",
        language: "en",
        _key: "r133dequ",
      },
      {
        title: "MDN: ARIA Live Regions",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
        source: "MDN",
        language: "en",
        _key: "r133mdna",
      },
      {
        title: "W3C: Providing Text Instructions",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G96",
        source: "W3C",
        language: "en",
        _key: "r133w3ct",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.3 Sensory Characteristics — Guide",
        metaDescription:
          "Stop relying on shape, color, or location in instructions. Learn how to meet WCAG 1.3.3 with text-based identifiers for all users.",
      },
      tr: {
        metaTitle: "WCAG 1.3.3 Duyusal Özellikler — Kılavuz",
        metaDescription:
          "Talimatlarda şekil, renk veya konuma bağımlılığı durdurun. Tüm kullanıcılar için metin tabanlı tanımlayıcılarla WCAG 1.3.3 ölçütünü karşılayın.",
      },
    },
  },

  // ─── 1.3.4 Orientation ──────────────────────────────────────────────
  {
    criterionNumber: "1.3.4",
    level: "AA",
    principle: "perceivable",
    introducedIn: "2.1",
    wcagVersions: ["2.1", "2.2"],
    impact: "serious",
    axeRuleIds: [],
    tags: ["orientation", "mobile", "responsive"],
    title: {
      en: "Orientation",
      tr: "Yönlendirme",
    },
    description: {
      en: "Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.",
      tr: "İçerik, belirli bir görüntüleme yönelimi zorunlu olmadığı sürece, görünümünü ve işleyişini dikey veya yatay gibi tek bir ekran yönelimine kısıtlamaz.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          "Success Criterion 1.3.4 requires that web content works in both portrait and landscape orientations unless a specific orientation is essential to the functionality. Essential exceptions include a piano keyboard app that requires landscape mode or a bank check scanner that must match check dimensions. Most web content has no such requirement.",
        ),
        p(
          "This criterion was introduced in WCAG 2.1 primarily to address mobile accessibility. Users who mount their devices on wheelchairs or assistive mounts often cannot rotate them. Locking content to a single orientation renders it inaccessible to these users.",
        ),

        heading("Why it matters"),
        p(
          "People with physical disabilities may have their devices permanently mounted in one orientation. A wheelchair-mounted tablet fixed in landscape mode cannot be rotated to portrait. If a website forces portrait-only viewing, the user simply cannot use it. This creates a hard barrier to access.",
        ),
        p(
          "Even beyond disability, forcing orientation degrades user experience. Users reading in bed, using split-screen multitasking, or using foldable devices all benefit from content that adapts to any orientation.",
        ),

        heading("Related axe-core rules"),
        p(
          "There are no automated axe-core rules for orientation detection. Testing requires manually rotating the device or using browser developer tools to simulate orientation changes. CSS media queries and JavaScript orientation locks must be reviewed manually.",
        ),

        heading("How to test"),
        numbered(
          "Open the page on a mobile device and rotate between portrait and landscape. Verify content and functionality remain fully accessible in both orientations.",
        ),
        numbered(
          "Use browser developer tools to toggle between portrait and landscape in the device emulator.",
        ),
        numbered(
          "Search the codebase for screen.orientation.lock(), CSS media queries using orientation: portrait or orientation: landscape, and meta viewport tags that restrict orientation.",
        ),
        numbered(
          'Check the web app manifest for an "orientation" field that locks to a single mode.',
        ),

        heading("How to fix"),
        p(
          "Ensure your CSS works in both orientations using responsive design techniques:",
        ),
        code(
          "/* Use flexible layouts that adapt to any orientation */\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n}\n\n/* Adapt layout based on available space, not orientation */\n@media (min-width: 768px) {\n  .sidebar { grid-column: span 1; }\n  .main    { grid-column: span 2; }\n}",
        ),
        p(
          "Do not use the Screen Orientation API to lock orientation unless it is essential:",
        ),
        code(
          '// Bad: locking orientation without essential reason\nscreen.orientation.lock("portrait");\n\n// Good: allow natural orientation\n// Simply do not call screen.orientation.lock()',
        ),
        p("In your web app manifest, avoid restricting orientation:"),
        code(
          '// Bad: locks to portrait\n{\n  "orientation": "portrait"\n}\n\n// Good: allows any orientation\n{\n  "orientation": "any"\n}',
          "json",
        ),

        heading("Common mistakes"),
        bullet(
          'Using screen.orientation.lock("portrait") for a regular web application with no essential orientation requirement.',
        ),
        bullet(
          'Setting "orientation": "portrait" in the web app manifest for a content site.',
        ),
        bullet(
          "CSS that only accounts for one orientation, causing content overflow or hidden elements in the other.",
        ),
        bullet(
          'Dismissing landscape mode testing because "most users are on portrait" — users who cannot rotate their devices are excluded.',
        ),
        bullet(
          "Modal dialogs or forms that become unusable in landscape because they exceed the viewport height.",
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          "Başarı Ölçütü 1.3.4, belirli bir yönelim işlevsellik açısından zorunlu olmadığı sürece web içeriğinin hem dikey hem de yatay yönelimlerde çalışmasını gerektirir. Zorunlu istisnalar arasında yatay mod gerektiren bir piyano klavyesi uygulaması veya çek boyutlarına uyması gereken bir banka çeki tarayıcısı yer alır. Çoğu web içeriğinin böyle bir gereksinimi yoktur.",
        ),
        p(
          "Bu ölçüt ağırlıklı olarak mobil erişilebilirliği ele almak üzere WCAG 2.1'de tanıtılmıştır. Cihazlarını tekerlekli sandalyelere veya yardımcı montaj aparatlarına sabitleyen kullanıcılar genellikle cihazlarını döndüremez. İçeriğin tek bir yönelime kilitlenmesi bu kullanıcılar için erişimi imkansız kılar.",
        ),

        heading("Neden önemlidir"),
        p(
          "Fiziksel engelli kişilerin cihazları kalıcı olarak tek bir yönelimde sabitlenmiş olabilir. Tekerlekli sandalyeye monteli bir tablet yatay moddaysa dikeye döndürülemez. Bir web sitesi yalnızca dikey görüntülemeye zorlarsa kullanıcı siteyi kullanamaz. Bu, erişime karşı kesin bir engel oluşturur.",
        ),
        p(
          "Engel durumunun ötesinde, yönelim zorlamak kullanıcı deneyimini kötüleştirir. Yatakta okuyan, bölünmüş ekran kullanan veya katlanabilir cihaz kullanan kullanıcılar da her yönelime uyum sağlayan içerikten faydalanır.",
        ),

        heading("İlgili axe-core kuralları"),
        p(
          "Yönelim tespiti için otomatik axe-core kuralı bulunmaz. Test, cihazın elle döndürülmesini veya tarayıcı geliştirici araçlarının yönelim değişikliklerini simüle etmesini gerektirir. CSS medya sorguları ve JavaScript yönelim kilitleri manuel olarak incelenmelidir.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          "Sayfayı bir mobil cihazda açın ve dikey ile yatay arasında döndürün. İçerik ve işlevselliğin her iki yönelimde de tam erişilebilir olduğunu doğrulayın.",
        ),
        numbered(
          "Tarayıcı geliştirici araçlarının cihaz emülatöründe dikey ve yatay arasında geçiş yapın.",
        ),
        numbered(
          "Kod tabanında screen.orientation.lock(), orientation: portrait veya orientation: landscape kullanan CSS medya sorgularını ve yönelimi kısıtlayan meta viewport etiketlerini arayın.",
        ),
        numbered(
          'Web uygulama manifest dosyasında tek bir moda kilitleyen bir "orientation" alanı olup olmadığını kontrol edin.',
        ),

        heading("Nasıl düzeltilir"),
        p(
          "CSS'inizin duyarlı tasarım teknikleri kullanarak her iki yönelimde de çalıştığından emin olun:",
        ),
        code(
          "/* Her yönelime uyum sağlayan esnek düzenler kullanın */\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n}\n\n/* Yönelime değil, mevcut alana göre düzeni ayarlayın */\n@media (min-width: 768px) {\n  .sidebar { grid-column: span 1; }\n  .main    { grid-column: span 2; }\n}",
        ),
        p(
          "Zorunlu olmadıkça yönelimi kilitlemek için Screen Orientation API kullanmayın:",
        ),
        code(
          '// Kötü: zorunlu neden olmadan yönelimi kilitlemek\nscreen.orientation.lock("portrait");\n\n// İyi: doğal yönelime izin verin\n// screen.orientation.lock() çağırmayın',
        ),
        p("Web uygulama manifest dosyanızda yönelimi kısıtlamaktan kaçının:"),
        code(
          '// Kötü: dikey moda kilitler\n{\n  "orientation": "portrait"\n}\n\n// İyi: herhangi bir yönelime izin verir\n{\n  "orientation": "any"\n}',
          "json",
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          'Zorunlu yönelim gereksinimi olmayan normal bir web uygulaması için screen.orientation.lock("portrait") kullanmak.',
        ),
        bullet(
          'Bir içerik sitesi için web uygulama manifest dosyasında "orientation": "portrait" ayarlamak.',
        ),
        bullet(
          "CSS'in yalnızca tek bir yönelimi hesaba katması ve diğerinde içerik taşması veya gizli öğelere neden olması.",
        ),
        bullet(
          '"Çoğu kullanıcı dikey moddadır" diyerek yatay mod testini atlamak — cihazlarını döndüremeyen kullanıcılar dışlanır.',
        ),
        bullet(
          "Modal diyalogların veya formların yatay modda görüntü alanı yüksekliğini aşması nedeniyle kullanılamaz hale gelmesi.",
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.4: Orientation",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html",
        source: "W3C",
        language: "en",
        _key: "r134w3cu",
      },
      {
        title: "WebAIM: WCAG 2.1 Checklist — Orientation",
        url: "https://webaim.org/standards/wcag/checklist#sc1.3.4",
        source: "WebAIM",
        language: "en",
        _key: "r134weba",
      },
      {
        title: "Deque: Orientation Restriction",
        url: "https://dequeuniversity.com/rules/axe/4.7/css-orientation-lock",
        source: "Deque",
        language: "en",
        _key: "r134dequ",
      },
      {
        title: "MDN: Screen Orientation API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation",
        source: "MDN",
        language: "en",
        _key: "r134mdns",
      },
      {
        title: "W3C: Failure Due to Orientation Lock",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F97",
        source: "W3C",
        language: "en",
        _key: "r134w3cf",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.4 Orientation — Guide",
        metaDescription:
          "Do not lock content to portrait or landscape. Learn how to meet WCAG 1.3.4 so all users can view content in their preferred orientation.",
      },
      tr: {
        metaTitle: "WCAG 1.3.4 Yönlendirme — Kılavuz",
        metaDescription:
          "İçeriği dikey veya yatay moda kilitlemeyin. Tüm kullanıcıların tercih ettikleri yönelimde içeriği görmesi için WCAG 1.3.4 ölçütünü karşılayın.",
      },
    },
  },

  // ─── 1.3.5 Identify Input Purpose ───────────────────────────────────
  {
    criterionNumber: "1.3.5",
    level: "AA",
    principle: "perceivable",
    introducedIn: "2.1",
    wcagVersions: ["2.1", "2.2"],
    impact: "serious",
    axeRuleIds: ["autocomplete-valid"],
    tags: ["forms", "autocomplete", "input"],
    title: {
      en: "Identify Input Purpose",
      tr: "Giriş Amacını Tanımlama",
    },
    description: {
      en: "The purpose of each input field collecting information about the user can be programmatically determined when the input field serves a purpose identified in the Input Purposes for User Interface Components section.",
      tr: "Kullanıcı hakkında bilgi toplayan her giriş alanının amacı, giriş alanı Kullanıcı Arayüzü Bileşenleri İçin Giriş Amaçları bölümünde tanımlanan bir amaca hizmet ettiğinde programatik olarak belirlenebilir.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          "Success Criterion 1.3.5 requires that input fields collecting personal information about the user have their purpose programmatically identified using the HTML autocomplete attribute. WCAG 2.1 defines a specific list of 53 input purposes (name, email, tel, street-address, etc.) derived from the HTML specification's autofill field names. When a form field collects one of these types of data, the autocomplete attribute must be present with the appropriate value.",
        ),
        p(
          "This criterion applies only to inputs that collect information about the user themselves — not about other people or entities. A \"ship to a different address\" form collecting someone else's address is exempt, but the user's own billing address fields must include autocomplete values.",
        ),

        heading("Why it matters"),
        p(
          "The autocomplete attribute serves multiple accessibility purposes. Users with cognitive disabilities or memory impairments benefit enormously from browser autofill, which reduces the cognitive load of remembering and typing personal information. Users with motor disabilities who find typing difficult can have forms populated automatically. Users with dyslexia who frequently mistype information benefit from pre-filled values.",
        ),
        p(
          'Beyond autofill, the autocomplete attribute enables assistive technology to display familiar icons or images next to fields. A user with a cognitive disability might recognize a phone icon next to a field identified as autocomplete="tel" more easily than reading the label. Browser extensions can also enhance the experience based on known input purposes.',
        ),

        heading("Related axe-core rules"),
        bullet(
          "autocomplete-valid — Ensures autocomplete attribute values are valid and match allowed WHATWG tokens. This rule checks that the autocomplete value is from the recognized list and that it is appropriate for the input type.",
        ),

        heading("How to test"),
        numbered(
          "Identify all form fields that collect personal information about the user (name, email, phone, address, payment details, birthday, etc.).",
        ),
        numbered(
          "Verify each such field has an autocomplete attribute with the correct token from the WHATWG autofill specification.",
        ),
        numbered(
          "Run axe DevTools to catch invalid or missing autocomplete values.",
        ),
        numbered(
          "Test that browser autofill works correctly by filling out the form using your browser's saved information.",
        ),
        numbered(
          'Verify that the autocomplete value matches the actual data being collected (e.g., do not use autocomplete="email" on a phone number field).',
        ),

        heading("How to fix"),
        p(
          "Add the correct autocomplete attribute to each input collecting user information:",
        ),
        code(
          '<form>\n  <label for="name">Full name</label>\n  <input type="text" id="name" name="name"\n         autocomplete="name">\n\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email"\n         autocomplete="email">\n\n  <label for="tel">Phone number</label>\n  <input type="tel" id="tel" name="tel"\n         autocomplete="tel">\n\n  <label for="street">Street address</label>\n  <input type="text" id="street" name="street"\n         autocomplete="street-address">\n\n  <label for="postal">Postal code</label>\n  <input type="text" id="postal" name="postal"\n         autocomplete="postal-code">\n</form>',
        ),
        p("For payment forms, use the specific payment autocomplete tokens:"),
        code(
          '<label for="cc-name">Name on card</label>\n<input type="text" id="cc-name" name="cc-name"\n       autocomplete="cc-name">\n\n<label for="cc-number">Card number</label>\n<input type="text" id="cc-number" name="cc-number"\n       autocomplete="cc-number">\n\n<label for="cc-exp">Expiration date</label>\n<input type="text" id="cc-exp" name="cc-exp"\n       autocomplete="cc-exp">\n\n<label for="cc-csc">Security code</label>\n<input type="text" id="cc-csc" name="cc-csc"\n       autocomplete="cc-csc">',
        ),
        p(
          "Compound autocomplete values can specify section and billing/shipping context:",
        ),
        code(
          '<input type="text" name="billing-street"\n       autocomplete="billing street-address">\n<input type="text" name="shipping-street"\n       autocomplete="shipping street-address">',
        ),

        heading("Common mistakes"),
        bullet(
          "Omitting the autocomplete attribute entirely from personal information fields.",
        ),
        bullet(
          'Using autocomplete="off" to prevent autofill — this hinders accessibility and browsers often ignore it anyway.',
        ),
        bullet(
          'Using incorrect autocomplete tokens (e.g., autocomplete="phone" instead of autocomplete="tel").',
        ),
        bullet(
          "Applying autocomplete to fields that do not collect user information (search fields, product filters) where it is not required.",
        ),
        bullet(
          'Missing compound fields — using autocomplete="name" when the form has separate given-name and family-name fields.',
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          "Başarı Ölçütü 1.3.5, kullanıcı hakkında kişisel bilgi toplayan giriş alanlarının amaçlarının HTML autocomplete niteliği kullanılarak programatik olarak tanımlanmasını gerektirir. WCAG 2.1, HTML spesifikasyonunun otomatik doldurma alan adlarından türetilmiş 53 giriş amacından oluşan belirli bir liste tanımlar (name, email, tel, street-address vb.). Bir form alanı bu veri türlerinden birini topladığında, uygun değerle birlikte autocomplete niteliği bulunmalıdır.",
        ),
        p(
          'Bu ölçüt yalnızca kullanıcının kendisi hakkında bilgi toplayan girdiler için geçerlidir — başka kişiler veya kuruluşlar hakkında değil. Başka birinin adresini toplayan "farklı bir adrese gönder" formu muaftır, ancak kullanıcının kendi fatura adresi alanları autocomplete değerlerini içermelidir.',
        ),

        heading("Neden önemlidir"),
        p(
          "autocomplete niteliği birden fazla erişilebilirlik amacına hizmet eder. Bilişsel engelli veya hafıza bozukluğu olan kullanıcılar, kişisel bilgileri hatırlama ve yazma bilişsel yükünü azaltan tarayıcı otomatik doldurmasından büyük fayda sağlar. Yazma güçlüğü çeken motor engelli kullanıcılar formların otomatik olarak doldurulmasını sağlayabilir. Sıklıkla yanlış yazan disleksili kullanıcılar önceden doldurulmuş değerlerden faydalanır.",
        ),
        p(
          'Otomatik doldurmanın ötesinde, autocomplete niteliği yardımcı teknolojilerin alanların yanında tanıdık simgeler veya resimler göstermesine olanak tanır. Bilişsel engelli bir kullanıcı, autocomplete="tel" olarak tanımlanan bir alanın yanındaki telefon simgesini etiketi okumaktan daha kolay tanıyabilir. Tarayıcı eklentileri de bilinen giriş amaçlarına göre deneyimi geliştirebilir.',
        ),

        heading("İlgili axe-core kuralları"),
        bullet(
          "autocomplete-valid — autocomplete nitelik değerlerinin geçerli olduğunu ve izin verilen WHATWG belirteçleriyle eşleştiğini doğrular. Bu kural, autocomplete değerinin tanınan listeden olduğunu ve giriş türü için uygun olduğunu kontrol eder.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          "Kullanıcı hakkında kişisel bilgi toplayan tüm form alanlarını (ad, e-posta, telefon, adres, ödeme bilgileri, doğum tarihi vb.) belirleyin.",
        ),
        numbered(
          "Her alanın WHATWG otomatik doldurma spesifikasyonundaki doğru belirteçle bir autocomplete niteliğine sahip olduğunu doğrulayın.",
        ),
        numbered(
          "Geçersiz veya eksik autocomplete değerlerini yakalamak için axe DevTools çalıştırın.",
        ),
        numbered(
          "Tarayıcınızın kayıtlı bilgilerini kullanarak formu doldurarak otomatik doldurmanın doğru çalıştığını test edin.",
        ),
        numbered(
          'autocomplete değerinin toplanan gerçek veriyle eşleştiğini doğrulayın (örneğin telefon numarası alanında autocomplete="email" kullanmayın).',
        ),

        heading("Nasıl düzeltilir"),
        p(
          "Kullanıcı bilgisi toplayan her girdiye doğru autocomplete niteliğini ekleyin:",
        ),
        code(
          '<form>\n  <label for="name">Ad soyad</label>\n  <input type="text" id="name" name="name"\n         autocomplete="name">\n\n  <label for="email">E-posta</label>\n  <input type="email" id="email" name="email"\n         autocomplete="email">\n\n  <label for="tel">Telefon numarası</label>\n  <input type="tel" id="tel" name="tel"\n         autocomplete="tel">\n\n  <label for="street">Sokak adresi</label>\n  <input type="text" id="street" name="street"\n         autocomplete="street-address">\n\n  <label for="postal">Posta kodu</label>\n  <input type="text" id="postal" name="postal"\n         autocomplete="postal-code">\n</form>',
        ),
        p(
          "Ödeme formları için özel ödeme autocomplete belirteçlerini kullanın:",
        ),
        code(
          '<label for="cc-name">Kart üzerindeki ad</label>\n<input type="text" id="cc-name" name="cc-name"\n       autocomplete="cc-name">\n\n<label for="cc-number">Kart numarası</label>\n<input type="text" id="cc-number" name="cc-number"\n       autocomplete="cc-number">\n\n<label for="cc-exp">Son kullanma tarihi</label>\n<input type="text" id="cc-exp" name="cc-exp"\n       autocomplete="cc-exp">\n\n<label for="cc-csc">Güvenlik kodu</label>\n<input type="text" id="cc-csc" name="cc-csc"\n       autocomplete="cc-csc">',
        ),
        p(
          "Bileşik autocomplete değerleri bölüm ve faturalama/kargo bağlamını belirtebilir:",
        ),
        code(
          '<input type="text" name="billing-street"\n       autocomplete="billing street-address">\n<input type="text" name="shipping-street"\n       autocomplete="shipping street-address">',
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          "Kişisel bilgi alanlarından autocomplete niteliğini tamamen çıkarmak.",
        ),
        bullet(
          'Otomatik doldurmayı engellemek için autocomplete="off" kullanmak — bu erişilebilirliğe zarar verir ve tarayıcılar genellikle yine de görmezden gelir.',
        ),
        bullet(
          'Yanlış autocomplete belirteçleri kullanmak (örneğin autocomplete="tel" yerine autocomplete="phone").',
        ),
        bullet(
          "Kullanıcı bilgisi toplamayan alanlara (arama alanları, ürün filtreleri) gerekli olmadığı halde autocomplete uygulamak.",
        ),
        bullet(
          'Bileşik alanları kaçırmak — form ayrı ad ve soyad alanlarına sahipken autocomplete="name" kullanmak.',
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.5: Identify Input Purpose",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html",
        source: "W3C",
        language: "en",
        _key: "r135w3cu",
      },
      {
        title: "WebAIM: WCAG 2.1 Checklist — Input Purpose",
        url: "https://webaim.org/standards/wcag/checklist#sc1.3.5",
        source: "WebAIM",
        language: "en",
        _key: "r135weba",
      },
      {
        title: "Deque: Autocomplete Valid",
        url: "https://dequeuniversity.com/rules/axe/4.7/autocomplete-valid",
        source: "Deque",
        language: "en",
        _key: "r135dequ",
      },
      {
        title: "MDN: HTML autocomplete Attribute",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
        source: "MDN",
        language: "en",
        _key: "r135mdna",
      },
      {
        title: "WHATWG: Autofill Field Names",
        url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill",
        source: "WHATWG",
        language: "en",
        _key: "r135what",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.5 Identify Input Purpose — Guide",
        metaDescription:
          "Use the HTML autocomplete attribute to identify input purpose. Meet WCAG 1.3.5 and help users with cognitive and motor disabilities fill forms.",
      },
      tr: {
        metaTitle: "WCAG 1.3.5 Giriş Amacını Tanımlama — Kılavuz",
        metaDescription:
          "HTML autocomplete niteliğini kullanarak giriş amacını tanımlayın. WCAG 1.3.5 ölçütünü karşılayın ve form doldurmayı kolaylaştırın.",
      },
    },
  },

  // ─── 1.3.6 Identify Purpose ─────────────────────────────────────────
  {
    criterionNumber: "1.3.6",
    level: "AAA",
    principle: "perceivable",
    introducedIn: "2.1",
    wcagVersions: ["2.1", "2.2"],
    impact: "moderate",
    axeRuleIds: [],
    tags: ["aria", "landmarks", "icons", "regions"],
    title: {
      en: "Identify Purpose",
      tr: "Amacı Tanımlama",
    },
    description: {
      en: "In content implemented using markup languages, the purpose of user interface components, icons, and regions can be programmatically determined.",
      tr: "İşaretleme dilleri kullanılarak uygulanan içerikte, kullanıcı arayüzü bileşenlerinin, simgelerin ve bölgelerin amacı programatik olarak belirlenebilir.",
    },
    content: {
      en: [
        heading("What this rule means"),
        p(
          "Success Criterion 1.3.6 extends the concept of programmatic purpose identification beyond form inputs to all user interface components, icons, and page regions. While 1.3.5 focuses specifically on autocomplete for personal data fields, 1.3.6 is broader: every interactive component, every icon, and every region should have its purpose identifiable through standard markup — ARIA landmarks, roles, labels, and semantic HTML.",
        ),
        p(
          "This criterion enables assistive technologies and user-installed personalization tools to adapt content presentation. A user might replace unfamiliar icons with text labels, hide non-essential regions, or add visual cues to important components. These adaptations require that the purpose of each element be programmatically available.",
        ),

        heading("Why it matters"),
        p(
          "Users with cognitive disabilities often struggle with unfamiliar icons, complex interfaces, and dense content. When the purpose of every component and region is programmatically identified, personalization tools can simplify the interface — replacing icons with words, highlighting navigation, or hiding supplementary content. This transforms an overwhelming page into something manageable.",
        ),
        p(
          "This criterion also supports users who rely on symbol-based communication (AAC users) by allowing assistive technology to present interface elements using the user's preferred symbol set. A search icon might be replaced with a symbol the user recognizes from their communication board.",
        ),

        heading("Related axe-core rules"),
        p(
          "There are no specific axe-core rules for 1.3.6 as it is a Level AAA criterion requiring semantic completeness that goes beyond what automated testing can fully verify. However, rules related to ARIA landmarks, roles, and labels contribute to meeting this criterion.",
        ),

        heading("How to test"),
        numbered(
          "Verify that all page regions use appropriate ARIA landmark roles (<header>, <nav>, <main>, <aside>, <footer>) or explicit role attributes.",
        ),
        numbered(
          "Check that every icon-only button or link has an accessible name via aria-label, aria-labelledby, or visually hidden text.",
        ),
        numbered(
          'Confirm that interactive components use correct ARIA roles (role="search", role="navigation", role="complementary", etc.).',
        ),
        numbered(
          "Verify that regions have descriptive labels, especially when multiple instances of the same landmark exist (e.g., two <nav> elements with different aria-label values).",
        ),
        numbered(
          "Test with a personalization browser extension to see if it can identify and adapt UI components based on their programmatic purpose.",
        ),

        heading("How to fix"),
        p("Use semantic HTML and ARIA landmarks to identify page regions:"),
        code(
          '<header role="banner">\n  <nav aria-label="Main navigation">\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/about">About</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h1>Article Title</h1>\n    <p>Article content...</p>\n  </article>\n</main>\n\n<aside aria-label="Related articles">\n  <h2>Related</h2>\n  <ul>...</ul>\n</aside>\n\n<footer role="contentinfo">\n  <nav aria-label="Footer navigation">...</nav>\n</footer>',
        ),
        p("Give every icon-only control a programmatic name:"),
        code(
          '<!-- Icon-only button with accessible name -->\n<button aria-label="Search" type="submit">\n  <svg aria-hidden="true" focusable="false">\n    <use href="#icon-search" />\n  </svg>\n</button>\n\n<!-- Icon-only link with visually hidden text -->\n<a href="/settings">\n  <svg aria-hidden="true"><use href="#icon-gear" /></svg>\n  <span class="sr-only">Settings</span>\n</a>',
        ),
        p("Use the search landmark role for search functionality:"),
        code(
          '<form role="search" aria-label="Site search">\n  <label for="search-input">Search</label>\n  <input type="search" id="search-input"\n         name="q" autocomplete="off">\n  <button type="submit">Search</button>\n</form>',
        ),

        heading("Common mistakes"),
        bullet(
          "Using generic <div> containers for page regions instead of semantic landmarks.",
        ),
        bullet(
          "Icon-only buttons without aria-label or visually hidden text, leaving them unlabeled.",
        ),
        bullet(
          "Multiple navigation landmarks without distinguishing aria-label values (two <nav> elements both without labels).",
        ),
        bullet(
          'Decorative icons missing aria-hidden="true", causing screen readers to announce meaningless content.',
        ),
        bullet(
          "Using custom components without ARIA roles, making their purpose invisible to assistive technology.",
        ),
        bullet(
          "Assuming that visible text near an icon is sufficient — the programmatic association must be explicit.",
        ),
      ],
      tr: [
        heading("Bu kural ne anlama geliyor"),
        p(
          "Başarı Ölçütü 1.3.6, programatik amaç tanımlama kavramını form girdilerinin ötesinde tüm kullanıcı arayüzü bileşenlerine, simgelere ve sayfa bölgelerine genişletir. 1.3.5 özellikle kişisel veri alanları için autocomplete'e odaklanırken, 1.3.6 daha kapsamlıdır: her etkileşimli bileşenin, her simgenin ve her bölgenin amacı standart işaretleme — ARIA belirgin bölgeleri, roller, etiketler ve semantik HTML — aracılığıyla tanımlanabilir olmalıdır.",
        ),
        p(
          "Bu ölçüt, yardımcı teknolojilerin ve kullanıcı tarafından yüklenen kişiselleştirme araçlarının içerik sunumunu uyarlamasına olanak tanır. Bir kullanıcı tanıdık olmayan simgeleri metin etiketleriyle değiştirebilir, gerekli olmayan bölgeleri gizleyebilir veya önemli bileşenlere görsel ipuçları ekleyebilir. Bu uyarlamalar, her öğenin amacının programatik olarak erişilebilir olmasını gerektirir.",
        ),

        heading("Neden önemlidir"),
        p(
          "Bilişsel engelli kullanıcılar genellikle tanıdık olmayan simgeler, karmaşık arayüzler ve yoğun içerikle zorlanır. Her bileşenin ve bölgenin amacı programatik olarak tanımlandığında, kişiselleştirme araçları arayüzü basitleştirebilir — simgeleri kelimelerle değiştirebilir, gezintiyi vurgulayabilir veya ek içeriği gizleyebilir. Bu, bunaltıcı bir sayfayı yönetilebilir bir hale dönüştürür.",
        ),
        p(
          "Bu ölçüt ayrıca sembol tabanlı iletişime dayanan kullanıcıları (AAC kullanıcıları) destekler; yardımcı teknolojinin arayüz öğelerini kullanıcının tercih ettiği sembol setini kullanarak sunmasına olanak tanır. Bir arama simgesi, kullanıcının iletişim panosundan tanıdığı bir sembolle değiştirilebilir.",
        ),

        heading("İlgili axe-core kuralları"),
        p(
          "1.3.6 için belirli axe-core kuralları bulunmaz çünkü bu, otomatik testin tam olarak doğrulayamayacağı semantik bütünlük gerektiren Düzey AAA bir ölçüttür. Ancak ARIA belirgin bölgeleri, roller ve etiketlerle ilgili kurallar bu ölçütü karşılamaya katkıda bulunur.",
        ),

        heading("Nasıl test edilir"),
        numbered(
          "Tüm sayfa bölgelerinin uygun ARIA belirgin bölge rolleri (<header>, <nav>, <main>, <aside>, <footer>) veya açık role nitelikleri kullandığını doğrulayın.",
        ),
        numbered(
          "Her yalnızca simge içeren düğmenin veya bağlantının aria-label, aria-labelledby veya görsel olarak gizli metin aracılığıyla erişilebilir bir ada sahip olduğunu kontrol edin.",
        ),
        numbered(
          'Etkileşimli bileşenlerin doğru ARIA rollerini (role="search", role="navigation", role="complementary" vb.) kullandığını doğrulayın.',
        ),
        numbered(
          "Özellikle aynı belirgin bölgenin birden fazla örneği olduğunda bölgelerin açıklayıcı etiketlere sahip olduğunu doğrulayın (örneğin farklı aria-label değerlerine sahip iki <nav> öğesi).",
        ),
        numbered(
          "Bir kişiselleştirme tarayıcı eklentisiyle test ederek programatik amaçlarına göre UI bileşenlerini tanımlayıp uyarlayabildiğini kontrol edin.",
        ),

        heading("Nasıl düzeltilir"),
        p(
          "Sayfa bölgelerini tanımlamak için semantik HTML ve ARIA belirgin bölgeleri kullanın:",
        ),
        code(
          '<header role="banner">\n  <nav aria-label="Ana gezinti">\n    <ul>\n      <li><a href="/">Ana Sayfa</a></li>\n      <li><a href="/hakkımızda">Hakkımızda</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h1>Makale Başlığı</h1>\n    <p>Makale içeriği...</p>\n  </article>\n</main>\n\n<aside aria-label="İlgili makaleler">\n  <h2>İlgili</h2>\n  <ul>...</ul>\n</aside>\n\n<footer role="contentinfo">\n  <nav aria-label="Alt bilgi gezintisi">...</nav>\n</footer>',
        ),
        p("Her yalnızca simge içeren kontrole programatik bir ad verin:"),
        code(
          '<!-- Erişilebilir ada sahip yalnızca simge düğmesi -->\n<button aria-label="Ara" type="submit">\n  <svg aria-hidden="true" focusable="false">\n    <use href="#icon-search" />\n  </svg>\n</button>\n\n<!-- Görsel olarak gizli metinli yalnızca simge bağlantısı -->\n<a href="/ayarlar">\n  <svg aria-hidden="true"><use href="#icon-gear" /></svg>\n  <span class="sr-only">Ayarlar</span>\n</a>',
        ),
        p("Arama işlevi için search belirgin bölge rolünü kullanın:"),
        code(
          '<form role="search" aria-label="Site araması">\n  <label for="search-input">Arama</label>\n  <input type="search" id="search-input"\n         name="q" autocomplete="off">\n  <button type="submit">Ara</button>\n</form>',
        ),

        heading("Sık yapılan hatalar"),
        bullet(
          "Sayfa bölgeleri için semantik belirgin bölgeler yerine genel <div> kapsayıcıları kullanmak.",
        ),
        bullet(
          "aria-label veya görsel olarak gizli metin içermeyen yalnızca simge düğmeleri, etiketlenmemiş olarak bırakmak.",
        ),
        bullet(
          "Ayırt edici aria-label değerleri olmadan birden fazla gezinme belirgin bölgesi kullanmak (ikisi de etiketsiz iki <nav> öğesi).",
        ),
        bullet(
          'Dekoratif simgelerde aria-hidden="true" eksikliği, ekran okuyucuların anlamsız içerik duyurmasına neden olmak.',
        ),
        bullet(
          "ARIA rolleri olmadan özel bileşenler kullanmak, amaçlarını yardımcı teknoloji için görünmez kılmak.",
        ),
        bullet(
          "Bir simgenin yanındaki görünür metnin yeterli olduğunu varsaymak — programatik ilişkilendirme açık olmalıdır.",
        ),
      ],
    },
    resources: [
      {
        title: "Understanding SC 1.3.6: Identify Purpose",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html",
        source: "W3C",
        language: "en",
        _key: "r136w3cu",
      },
      {
        title: "WebAIM: WCAG 2.1 Checklist — Identify Purpose",
        url: "https://webaim.org/standards/wcag/checklist#sc1.3.6",
        source: "WebAIM",
        language: "en",
        _key: "r136weba",
      },
      {
        title: "Deque: ARIA Landmarks",
        url: "https://dequeuniversity.com/rules/axe/4.7/landmark-one-main",
        source: "Deque",
        language: "en",
        _key: "r136dequ",
      },
      {
        title: "MDN: ARIA Roles",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",
        source: "MDN",
        language: "en",
        _key: "r136mdnr",
      },
      {
        title: "W3C WAI: ARIA Landmarks Example",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html",
        source: "W3C",
        language: "en",
        _key: "r136w3ca",
      },
    ],
    seo: {
      en: {
        metaTitle: "WCAG 1.3.6 Identify Purpose — Guide",
        metaDescription:
          "Make every UI component, icon, and region purpose programmatically determinable. Learn how to meet WCAG 1.3.6 with ARIA and semantic HTML.",
      },
      tr: {
        metaTitle: "WCAG 1.3.6 Amacı Tanımlama — Kılavuz",
        metaDescription:
          "Her UI bileşeninin, simgenin ve bölgenin amacını programatik olarak belirlenebilir kılın. ARIA ve semantik HTML ile WCAG 1.3.6 ölçütünü karşılayın.",
      },
    },
  },
];

export default rules;
