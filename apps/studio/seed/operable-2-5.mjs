import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ─── 2.5.1 Pointer Gestures ───────────────────────────────────────────
  {
    criterionNumber: '2.5.1',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['touch', 'gestures', 'pointer', 'mobile'],

    title: {
      en: 'Pointer Gestures',
      tr: 'İşaretçi Hareketleri',
    },

    description: {
      en: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
      tr: 'Çoklu nokta veya yol tabanlı hareketler kullanan tüm işlevler, bu hareketler temel olmadığı sürece, yol tabanlı hareket gerektirmeyen tek bir işaretçi ile çalıştırılmalıdır.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.1 requires that any functionality relying on multipoint gestures (such as two-finger pinch-to-zoom) or path-based gestures (such as swiping or drawing a shape) must also be operable through a single-pointer action without requiring a specific path. A simple click, tap, or long press must be available as an alternative.'
        ),
        p(
          'This criterion does not forbid the use of complex gestures. It simply mandates that a single-pointer alternative exists. For example, a map that supports pinch-to-zoom must also provide on-screen zoom buttons. A carousel that responds to swipe gestures must also include previous/next arrow buttons.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with motor impairments may operate a pointer through a head-tracking device, eye-tracking system, or a single-switch scanning device — none of which can perform multipoint or path-based gestures. Users with limb differences, tremors, or limited dexterity may only be able to produce a simple tap or click.'
        ),
        p(
          'Even users without disabilities benefit from single-pointer alternatives. A user holding a phone in one hand on public transit cannot easily perform a two-finger gesture. Providing alternatives ensures functionality is available regardless of input capabilities.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Verifying pointer gesture alternatives requires manual testing to confirm that single-pointer actions can achieve the same outcomes as multipoint or path-based gestures.'
        ),

        heading('How to test', 'h2'),
        numbered('Identify all interactive features that respond to swipe, pinch, rotate, or multi-finger gestures.'),
        numbered('For each gesture-driven feature, attempt to operate it using only single taps or clicks.'),
        numbered('Verify that on-screen controls (buttons, sliders, +/- controls) exist as alternatives.'),
        numbered('Test with assistive technology pointer emulators that can only produce single-point actions.'),
        numbered('On touch devices, confirm that a single finger can achieve all outcomes without requiring a specific movement path.'),

        heading('How to fix', 'h2'),
        p('Provide on-screen control alternatives for every multipoint or path-based gesture. Below are common patterns.'),

        heading('Map zoom — bad practice', 'h3'),
        code(
          '<!-- Only pinch-to-zoom, no single-pointer alternative -->\n<div id="map"\n  ontouchstart="handlePinchStart(event)"\n  ontouchmove="handlePinchMove(event)">\n</div>',
          'html'
        ),

        heading('Map zoom — good practice', 'h3'),
        code(
          '<div id="map">\n  <!-- Pinch-to-zoom still works for those who can use it -->\n</div>\n<div class="map-controls">\n  <button onclick="zoomIn()" aria-label="Zoom in">+</button>\n  <button onclick="zoomOut()" aria-label="Zoom out">−</button>\n</div>',
          'html'
        ),

        heading('Carousel swipe — providing button alternatives', 'h3'),
        code(
          '// Touch swipe handler still available\ncarousel.addEventListener(\'pointerdown\', startSwipe);\ncarousel.addEventListener(\'pointermove\', trackSwipe);\ncarousel.addEventListener(\'pointerup\', endSwipe);\n\n// Single-pointer alternatives via buttons\nprevBtn.addEventListener(\'click\', () => carousel.goToPrev());\nnextBtn.addEventListener(\'click\', () => carousel.goToNext());',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Relying solely on swipe gestures for carousel or slider navigation without providing arrow buttons.'),
        bullet('Implementing pinch-to-zoom on custom map or image components without zoom in/out buttons.'),
        bullet('Using multi-finger gestures (three-finger tap, two-finger rotate) as the only way to trigger an action.'),
        bullet('Providing path-based gesture shortcuts (draw an L shape to go back) without a simpler alternative like a back button.'),
        bullet('Assuming all users can perform swipe-to-delete or swipe-to-reveal actions on list items without an alternative menu.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.1, çoklu nokta hareketlerine (iki parmakla sıkıştırarak yakınlaştırma gibi) veya yol tabanlı hareketlere (kayma veya şekil çizme gibi) dayanan her işlevin, belirli bir yol gerektirmeyen tek işaretçi eylemiyle de çalıştırılmasını gerektirir. Basit bir tıklama, dokunma veya uzun basma alternatif olarak sunulmalıdır.'
        ),
        p(
          'Bu kriter karmaşık hareketlerin kullanımını yasaklamaz. Yalnızca tek işaretçi alternatifinin var olmasını zorunlu kılar. Örneğin, sıkıştırarak yakınlaştırmayı destekleyen bir harita, ekran üzerinde yakınlaştırma düğmeleri de sunmalıdır. Kayma hareketine yanıt veren bir slayt gösterisi, önceki/sonraki ok düğmeleri içermelidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Motor engelli kullanıcılar, işaretçiyi bas takip cihazı, göz takip sistemi veya tek anahtarlı tarama cihazı aracılığıyla kullanabilir — bunların hiçbiri çoklu nokta veya yol tabanlı hareketleri gerçekleştiremez. Uzuv farklılığı, titreme veya sınırlı el becerisi olan kullanıcılar yalnızca basit bir dokunma veya tıklama yapabilir.'
        ),
        p(
          'Engeli olmayan kullanıcılar da tek işaretçi alternatiflerinden yararlanır. Toplu taşımada telefonu tek eliyle tutan bir kullanıcı iki parmak hareketini kolayca gerçekleştiremez. Alternatifler sunmak, giriş yeteneklerinden bağımsız olarak işlevselliğin kullanılabilir olmasını sağlar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. İşaretçi hareketi alternatiflerinin doğrulanması, tek işaretçi eylemlerinin çoklu nokta veya yol tabanlı hareketlerle aynı sonuçları elde edip edemediğini onaylamak için manuel test gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Kayma, sıkıştırma, döndürme veya çok parmaklı hareketlere yanıt veren tüm etkileşimli özellikleri belirleyin.'),
        numbered('Her hareket odaklı özellik için yalnızca tek dokunma veya tıklamayla çalıştırmayı deneyin.'),
        numbered('Alternatif olarak ekran üzerinde kontrollerin (düğmeler, kaydırıcılar, +/- kontrolleri) mevcut olduğundan emin olun.'),
        numbered('Yalnızca tek nokta eylemleri üretebilen yardımcı teknoloji işaretçi emülatörleriyle test edin.'),
        numbered('Dokunmatik cihazlarda, tek bir parmağın belirli bir hareket yolu gerektirmeden tüm sonuçlara ulaşabildiğini doğrulayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Her çoklu nokta veya yol tabanlı hareket için ekran üzerinde kontrol alternatifleri sağlayın. Aşağıda yaygın kalıplar yer almaktadır.'),

        heading('Harita yakınlaştırma — yanlış uygulama', 'h3'),
        code(
          '<!-- Yalnızca sıkıştırarak yakınlaştırma, tek işaretçi alternatifi yok -->\n<div id="harita"\n  ontouchstart="sikistirmaBaslat(event)"\n  ontouchmove="sikistirmaIzle(event)">\n</div>',
          'html'
        ),

        heading('Harita yakınlaştırma — doğru uygulama', 'h3'),
        code(
          '<div id="harita">\n  <!-- Sıkıştırarak yakınlaştırma kullananlar için hala çalışır -->\n</div>\n<div class="harita-kontrolleri">\n  <button onclick="yakınlaştır()" aria-label="Yakınlaştır">+</button>\n  <button onclick="uzaklaştır()" aria-label="Uzaklaştır">−</button>\n</div>',
          'html'
        ),

        heading('Slayt gösterisi kayması — düğme alternatifleri', 'h3'),
        code(
          '// Dokunma kayma işleyicisi hala mevcut\nkarusel.addEventListener(\'pointerdown\', kaymaBaslat);\nkarusel.addEventListener(\'pointermove\', kaymaIzle);\nkarusel.addEventListener(\'pointerup\', kaymaBitir);\n\n// Düğmeler ile tek işaretçi alternatifleri\noncekiBtn.addEventListener(\'click\', () => karusel.öncekineGit());\nsonrakiBtn.addEventListener(\'click\', () => karusel.sonrakineGit());',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Slayt gösterisi veya kaydırıcı gezintisi için ok düğmeleri sağlamadan yalnızca kayma hareketlerine dayanmak.'),
        bullet('Özel harita veya görsel bileşenlerinde yakınlaştırma/uzaklaştırma düğmeleri olmadan sıkıştırarak yakınlaştırma uygulamak.'),
        bullet('Çok parmaklı hareketleri (üç parmak dokunma, iki parmak döndürme) bir eylemi tetiklemenin tek yolu olarak kullanmak.'),
        bullet('Yol tabanlı hareket kısayolları (geri gitmek için L şekli çizme) sunup daha basit bir geri düğmesi alternatifi sağlamamak.'),
        bullet('Tüm kullanıcıların liste öğelerinde alternatif menü olmadan kaydır-sil veya kaydır-göster eylemlerini yapabileceğini varsaymak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.1: Pointer Gestures',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r251w3cu',
      },
      {
        title: 'W3C Techniques: Pointer Gestures',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#pointer-gestures',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r251w3ct',
      },
      {
        title: 'WebAIM: WCAG 2.1 Pointer Gestures',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.1',
        source: 'webaim',
        language: 'en',
        _key: 'r251waim',
      },
      {
        title: 'MDN: Pointer Events',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events',
        source: 'mdn',
        language: 'en',
        _key: 'r251mdnp',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.1 Pointer Gestures — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.1 Pointer Gestures. Ensure all multipoint and path-based gesture functionality has single-pointer alternatives with practical code examples.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.1 İşaretçi Hareketleri — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.1 İşaretçi Hareketleri kriterini nasıl karşılayacağınızı öğrenin. Çoklu nokta ve yol tabanlı hareketler için tek işaretçi alternatifleri sağlama rehberi.',
      },
    },
  },

  // ─── 2.5.2 Pointer Cancellation ──────────────────────────────────────
  {
    criterionNumber: '2.5.2',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['pointer', 'mouse', 'touch', 'interaction'],

    title: {
      en: 'Pointer Cancellation',
      tr: 'İşaretçi İptali',
    },

    description: {
      en: 'For functionality that can be operated using a single pointer, at least one of the following is true: the down-event is not used, the action is completed on the up-event with an ability to abort or undo, or the up-event reverses any outcome of the down-event.',
      tr: 'Tek bir işaretçi ile çalıştırılabilen işlevler için şu koşullardan en az biri sağlanmalıdır: aşağı olay kullanılmamalı, eylem yukarı olayda tamamlanmalı ve iptal veya geri alma mümkün olmalı, ya da yukarı olay aşağı olayin sonucunu geri almalıdır.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.2 addresses accidental activation of controls. When users interact with a pointer (mouse, touch, stylus), the action should not fire on the down-event (mousedown, touchstart, pointerdown) alone. Instead, the action should complete on the up-event (mouseup, touchend, pointerup) or provide a way to abort or undo.'
        ),
        p(
          'The criterion specifies four acceptable approaches: do not use the down-event to execute the action; complete the action on the up-event; provide an abort mechanism where users can move the pointer off the target before releasing; or provide an undo mechanism after the action completes.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with motor impairments frequently touch or click on the wrong target accidentally. If actions fire immediately on pointer-down, there is no opportunity to correct the mistake. By deferring action to pointer-up, users can move their finger or cursor off the target to cancel the action before it executes.'
        ),
        p(
          'This pattern mirrors the native behavior of most operating systems and browsers. Standard HTML buttons and links already activate on click (which is a down-then-up sequence), so this criterion mainly affects custom JavaScript interactions that bind to mousedown or touchstart events.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for pointer cancellation. Testing requires manual interaction to verify that actions do not fire on pointer-down alone and that users can abort by moving the pointer away from the target before releasing.'
        ),

        heading('How to test', 'h2'),
        numbered('Press and hold (mousedown/touchstart) on interactive elements without releasing.'),
        numbered('While holding, drag the pointer away from the element, then release. Verify no action fires.'),
        numbered('Press and release on the element normally to confirm the action still works on the up-event.'),
        numbered('Search the codebase for mousedown, touchstart, and pointerdown event listeners that trigger actions directly.'),
        numbered('Confirm that any actions triggered on down-events have an undo mechanism or abort path.'),

        heading('How to fix', 'h2'),
        p('Use up-events rather than down-events for triggering actions. Here are common patterns.'),

        heading('Click handler — bad practice', 'h3'),
        code(
          '// Fires action on pointer-down with no abort path\nbutton.addEventListener(\'pointerdown\', (e) => {\n  deleteItem(e.target.dataset.id);\n});',
          'javascript'
        ),

        heading('Click handler — good practice', 'h3'),
        code(
          '// Uses click event (up-event) — allows abort by\n// moving pointer off target before releasing\nbutton.addEventListener(\'click\', (e) => {\n  deleteItem(e.target.dataset.id);\n});\n\n// Or using pointerup with hit-test verification\nbutton.addEventListener(\'pointerup\', (e) => {\n  const target = document.elementFromPoint(e.clientX, e.clientY);\n  if (target === button || button.contains(target)) {\n    deleteItem(button.dataset.id);\n  }\n});',
          'javascript'
        ),

        heading('Touch events with abort mechanism', 'h3'),
        code(
          'let activeTarget = null;\n\nelement.addEventListener(\'pointerdown\', (e) => {\n  activeTarget = e.target;\n  e.target.classList.add(\'pressed\'); // Visual feedback only\n});\n\nelement.addEventListener(\'pointerup\', (e) => {\n  const released = document.elementFromPoint(e.clientX, e.clientY);\n  if (released === activeTarget) {\n    performAction(activeTarget); // Action on up-event\n  }\n  activeTarget?.classList.remove(\'pressed\');\n  activeTarget = null;\n});',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Binding destructive actions (delete, submit, send) to mousedown or touchstart events.'),
        bullet('Using pointerdown to immediately navigate to a new page without allowing the user to abort.'),
        bullet('Custom drag-and-drop implementations that commit the drop action on pointerdown rather than pointerup.'),
        bullet('Triggering form submission on touchstart, preventing users from sliding their finger off the submit button to cancel.'),
        bullet('Using onmousedown in HTML attributes for critical actions like purchases or deletions.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.2, kontrollerin yanlislikla etkinlestirilmesini ele alır. Kullanıcılar bir işaretçi (fare, dokunmatik, kalem) ile etkilesime girdiginde, eylem yalnızca aşağı olayda (mousedown, touchstart, pointerdown) tetiklenmemelidir. Bunun yerine eylem yukarı olayda (mouseup, touchend, pointerup) tamamlanmalı veya iptal ya da geri alma yolu sağlanmalıdır.'
        ),
        p(
          'Kriter dört kabul edilebilir yaklaşım belirtir: eylemi yurutmek için aşağı olayi kullanmamak; eylemi yukarı olayda tamamlamak; kullanıcıların birakmadan önce işaretçiyi hedeften uzaklastirabilecegi bir iptal mekanizması sağlamak; veya eylem tamamlandiktan sonra bir geri alma mekanizması sunmak.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Motor engelli kullanıcılar sıklıkla yanlış hedefe yanlislikla dokunur veya tıklar. Eylemler işaretçi-aşağı aninda tetiklenirse, hatayı düzeltme firsati olmaz. Eylemi işaretçi-yukarı anina erteleyerek kullanıcılar parmak veya imleclerini hedeften cekerek eylemi iptal edebilir.'
        ),
        p(
          'Bu kalıp, çoğu isletim sistemi ve tarayicinin yerel davranisini yansıtır. Standart HTML düğmeleri ve bağlantılar zaten tiklamada (aşağı-sonra-yukarı dizisi) etkinlesir, bu nedenle bu kriter esas olarak mousedown veya touchstart olaylarina bağlanan özel JavaScript etkilesimlerini etkiler.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'İşaretçi iptali için otomatik axe-core kuralı bulunmamaktadır. Test, eylemlerin yalnızca işaretçi-aşağı ile tetiklenmedigini ve kullanıcıların birakmadan önce işaretçiyi hedeften uzaklastirarak iptal edebildigini doğrulamak için manuel etkileşim gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Etkileşimli ogelerde birakmadan basın ve tutun (mousedown/touchstart).'),
        numbered('Tutarken işaretçiyi öğeden uzaklastirin, sonra bırakın. Hiçbir eylemin tetiklenmedigini doğrulayın.'),
        numbered('Ogeye normal şekilde basın ve bırakın, eylemin yukarı olayda hala çalıştığını onaylayın.'),
        numbered('Kod tabanında doğrudan eylem tetikleyen mousedown, touchstart ve pointerdown olay dinleyicilerini arayın.'),
        numbered('Asagi olaylarda tetiklenen eylemlerin bir geri alma mekanizması veya iptal yolu olduğunu doğrulayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Eylemleri tetiklemek için aşağı olaylar yerine yukarı olaylar kullanın. Yaygın kalıplar asagidadir.'),

        heading('Tiklama işleyicisi — yanlış uygulama', 'h3'),
        code(
          '// Iptal yolu olmadan işaretçi-aşağı ile eylemi tetikler\nbutton.addEventListener(\'pointerdown\', (e) => {\n  ogeySil(e.target.dataset.id);\n});',
          'javascript'
        ),

        heading('Tiklama işleyicisi — doğru uygulama', 'h3'),
        code(
          '// Click olayi (yukarı-olay) kullanır — birakmadan önce\n// işaretçiyi hedeften uzaklastirarak iptal etmeye izin verir\nbutton.addEventListener(\'click\', (e) => {\n  ogeySil(e.target.dataset.id);\n});\n\n// Veya isabet testi dogrulamasiyla pointerup kullanma\nbutton.addEventListener(\'pointerup\', (e) => {\n  const hedef = document.elementFromPoint(e.clientX, e.clientY);\n  if (hedef === button || button.contains(hedef)) {\n    ogeySil(button.dataset.id);\n  }\n});',
          'javascript'
        ),

        heading('Iptal mekanizması ile dokunma olayları', 'h3'),
        code(
          'let aktifHedef = null;\n\nelement.addEventListener(\'pointerdown\', (e) => {\n  aktifHedef = e.target;\n  e.target.classList.add(\'basilmis\'); // Yalnızca görsel geri bildirim\n});\n\nelement.addEventListener(\'pointerup\', (e) => {\n  const birakilan = document.elementFromPoint(e.clientX, e.clientY);\n  if (birakilan === aktifHedef) {\n    eylemiGerceklestir(aktifHedef); // Yukari olayda eylem\n  }\n  aktifHedef?.classList.remove(\'basilmis\');\n  aktifHedef = null;\n});',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Yikici eylemleri (silme, gönderme) mousedown veya touchstart olaylarina baglamak.'),
        bullet('Kullanıcının iptal etmesine izin vermeden pointerdown ile hemen yeni bir sayfaya yönlendirmek.'),
        bullet('Özel sürükle-birak uygulamalarında bırakma eylemini pointerup yerine pointerdown ile gerçekleştirmek.'),
        bullet('touchstart ile form gondermesini tetikleyerek kullanıcıların iptal etmek için parmaginiptal dugmesinden kaydirmasini engellemek.'),
        bullet('Satin alma veya silme gibi kritik eylemler için HTML niteliklerinde onmousedown kullanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.2: Pointer Cancellation',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r252w3cu',
      },
      {
        title: 'W3C Techniques: Pointer Cancellation',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#pointer-cancellation',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r252w3ct',
      },
      {
        title: 'MDN: Pointer Events — pointerup',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event',
        source: 'mdn',
        language: 'en',
        _key: 'r252mdnp',
      },
      {
        title: 'Deque: Pointer Cancellation',
        url: 'https://dequeuniversity.com/rules/axe/4.10/pointer-cancellation',
        source: 'deque',
        language: 'en',
        _key: 'r252dequ',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.2 Pointer Cancellation — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.2 Pointer Cancellation. Ensure actions fire on up-events and users can abort accidental activations with practical code examples.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.2 İşaretçi İptali — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.2 İşaretçi İptali kriterini nasıl karşılayacağınızı öğrenin. Eylemlerin yukarı olaylarda tetiklenmesi ve kazara etkinlestirmelerin iptal edilmesi rehberi.',
      },
    },
  },

  // ─── 2.5.3 Label in Name ─────────────────────────────────────────────
  {
    criterionNumber: '2.5.3',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['labels', 'speech', 'aria', 'forms'],

    title: {
      en: 'Label in Name',
      tr: 'İsimdeki Etiket',
    },

    description: {
      en: 'For user interface components with labels that include text or images of text, the accessible name contains the text that is presented visually.',
      tr: 'Metin veya metin görselleri içeren etiketlere sahip kullanıcı arayüzü bileşenleri için, erişilebilir ad görsel olarak sunulan metni içermelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.3 requires that the accessible name (the name exposed to assistive technology) of a user interface component contains the visible text label as a substring. When a button displays "Search" visually, its accessible name must include the word "Search". The accessible name can be longer, but the visible text must appear within it.'
        ),
        p(
          'This criterion ensures that voice control users can activate controls by speaking the visible label. If the visible label says "Submit" but the accessible name is "Send form data", a user saying "Click Submit" will not find a match.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Speech recognition users interact with web pages by speaking the names of visible controls. When the accessible name does not match the visible label, these users cannot reliably activate controls. They see a button labeled "Search" and say "Click Search", but the command fails because the accessible name is something different.'
        ),
        p(
          'This criterion also helps users of screen readers who can see the screen. If the visible label says "Continue" but the screen reader announces "Proceed to next step", sighted screen reader users become confused because what they hear does not match what they see.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'While axe-core does not have a specific rule mapped to 2.5.3, the label-content-name-mismatch rule in some implementations checks that the accessible name of elements with visible text includes that text. Manual verification is still recommended.'
        ),

        heading('How to test', 'h2'),
        numbered('Identify all interactive controls with visible text labels (buttons, links, form inputs with labels).'),
        numbered('Use a browser accessibility inspector (Chrome DevTools Accessibility pane) to read the computed accessible name.'),
        numbered('Verify the visible text appears within the accessible name string.'),
        numbered('Test with a speech recognition tool (Dragon NaturallySpeaking, Voice Control on macOS/iOS) by speaking the visible label.'),
        numbered('Check that aria-label or aria-labelledby values include the visible text, not replace it entirely.'),

        heading('How to fix', 'h2'),
        p('Ensure the accessible name includes the visible text. Below are common patterns.'),

        heading('Button labels — bad practice', 'h3'),
        code(
          '<!-- Visible text is "Search" but accessible name is "Find items" -->\n<button aria-label="Find items">Search</button>\n\n<!-- Visible text is "Close" but accessible name is "Dismiss dialog" -->\n<button aria-label="Dismiss dialog">\n  <span>Close</span>\n</button>',
          'html'
        ),

        heading('Button labels — good practice', 'h3'),
        code(
          '<!-- Accessible name matches visible text -->\n<button>Search</button>\n\n<!-- Accessible name includes visible text -->\n<button aria-label="Search products">Search</button>\n\n<!-- Close button with matching accessible name -->\n<button aria-label="Close dialog">\n  <span>Close</span>\n</button>',
          'html'
        ),

        heading('Form input labels', 'h3'),
        code(
          '<!-- Bad: aria-label does not contain visible label text -->\n<label for="email">Email address</label>\n<input id="email" aria-label="Enter your electronic mail">\n\n<!-- Good: no conflicting aria-label, native label is used -->\n<label for="email">Email address</label>\n<input id="email">\n\n<!-- Good: aria-label contains the visible label text -->\n<label for="email">Email address</label>\n<input id="email" aria-label="Email address (required)">',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using aria-label that completely replaces visible text with different wording.'),
        bullet('Providing an aria-labelledby that points to hidden text instead of the visible label.'),
        bullet('Adding a title attribute with different text than the visible label, which overrides the accessible name in some browsers.'),
        bullet('Using CSS to visually display text that differs from the DOM text content (e.g., text-transform or ::before pseudo-elements that change the perceived label).'),
        bullet('Icon buttons where aria-label uses terminology different from any adjacent visible tooltip or text.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.3, bir kullanıcı arayüzü bileşeninin erişilebilir adinin (yardımcı teknolojiye sunulan ad) görsel metin etiketini bir alt dize olarak içermesini gerektirir. Bir düğme görsel olarak "Ara" gösteriyorsa, erişilebilir adı "Ara" kelimesini içermelidir. Erişilebilir ad daha uzun olabilir, ancak görsel metin içinde yer almalıdır.'
        ),
        p(
          'Bu kriter, sesli kontrol kullanıcılarının görsel etiketi söyleyerek kontrolleri etkinleştirmesini sağlar. Görsel etiket "Gönder" diyorsa ancak erişilebilir ad "Form verilerini ilet" ise, "Gönder tıkla" diyen bir kullanıcı eşleştirme bulamaz.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Konuşma tanıma kullanıcıları, görsel kontrollerin adlarını söyleyerek web sayfalarıyla etkilesir. Erişilebilir ad görsel etiketle eslesmediginde, bu kullanıcılar kontrolleri güvenilir şekilde etkinlestiremez. "Ara" etiketli bir düğme görür ve "Ara tıkla" derler, ancak erişilebilir ad farklı olduğu için komut başarısız olur.'
        ),
        p(
          'Bu kriter aynı zamanda ekranı gorebilen ekran okuyucu kullanıcılar için de yardımcı olur. Görsel etiket "Devam" diyorsa ancak ekran okuyucu "Sonraki adima geç" diye duyurursa, gören ekran okuyucu kullanıcıları duydukari ile gordukleri arasındaki uyumsuzluk nedeniyle karışıklık yasarlar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'axe-core, 2.5.3 için belirli bir eslestirmis kurala sahip olmasa da bazı uygulamalarda label-content-name-mismatch kuralı, görsel metne sahip öğelerin erişilebilir adinin bu metni içerdiğini kontrol eder. Manuel doğrulama yine de onerilir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Görsel metin etiketlerine sahip tüm etkileşimli kontrolleri (düğmeler, bağlantılar, etiketli form girişleri) belirleyin.'),
        numbered('Hesaplanan erişilebilir adı okumak için bir tarayıcı erişilebilirlik denetcisi (Chrome DevTools Erişilebilirlik paneli) kullanın.'),
        numbered('Görsel metnin erişilebilir ad dizesi içinde göründüğünü doğrulayın.'),
        numbered('Görsel etiketi söyleyerek bir konuşma tanıma araciyla (Dragon, macOS/iOS Sesli Kontrol) test edin.'),
        numbered('aria-label veya aria-labelledby değerlerinin görsel metni tamamen değiştirmek yerine içerdiğini kontrol edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Erişilebilir adin görsel metni içerdiğinden emin olun. Yaygın kalıplar asagidadir.'),

        heading('Dugme etiketleri — yanlış uygulama', 'h3'),
        code(
          '<!-- Görsel metin "Ara" ama erişilebilir ad "Öğeleri bul" -->\n<button aria-label="Öğeleri bul">Ara</button>\n\n<!-- Görsel metin "Kapat" ama erişilebilir ad "Diyalogu kapat" -->\n<button aria-label="Diyalogu reddet">\n  <span>Kapat</span>\n</button>',
          'html'
        ),

        heading('Dugme etiketleri — doğru uygulama', 'h3'),
        code(
          '<!-- Erişilebilir ad görsel metinle eşleşiyor -->\n<button>Ara</button>\n\n<!-- Erişilebilir ad görsel metni iceriyor -->\n<button aria-label="Ürünleri ara">Ara</button>\n\n<!-- Kapat düğmesi eşleşen erişilebilir adla -->\n<button aria-label="Diyalogu kapat">\n  <span>Kapat</span>\n</button>',
          'html'
        ),

        heading('Form girişi etiketleri', 'h3'),
        code(
          '<!-- Yanlış: aria-label görsel etiket metnini icermiyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" aria-label="Elektronik posta girin">\n\n<!-- Doğru: celiskili aria-label yok, yerel etiket kullanılıyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta">\n\n<!-- Doğru: aria-label görsel etiket metnini iceriyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" aria-label="E-posta adresi (zorunlu)">',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Görsel metni tamamen farklı ifadelerle değiştiren aria-label kullanmak.'),
        bullet('Görsel etiket yerine gizli metne işaret eden aria-labelledby sağlamak.'),
        bullet('Görsel etiketten farklı metin içeren ve bazı tarayıcılarda erişilebilir adı geçersiz kilan bir title niteliği eklemek.'),
        bullet('DOM metin içeriğinden farklı metni görsel olarak gösteren CSS kullanmak (örneğin, algilanan etiketi değiştiren text-transform veya ::before sahte öğeleri).'),
        bullet('aria-label in bitişik görsel ipucu veya metinden farklı terminoloji kullandığı simge düğmeleri.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.3: Label in Name',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r253w3cu',
      },
      {
        title: 'W3C Techniques: Label in Name',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G208',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r253w3ct',
      },
      {
        title: 'WebAIM: Label in Name',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.3',
        source: 'webaim',
        language: 'en',
        _key: 'r253waim',
      },
      {
        title: 'The A11y Project: Label in Name',
        url: 'https://www.a11yproject.com/checklist/#2.5.3-label-in-name',
        source: 'a11y-project',
        language: 'en',
        _key: 'r253a11y',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.3 Label in Name — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.3 Label in Name. Ensure accessible names contain visible text labels so speech recognition and screen reader users can operate controls.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.3 İsimdeki Etiket — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.3 İsimdeki Etiket kriterini nasıl karşılayacağınızı öğrenin. Erişilebilir adlarin görsel metin etiketlerini icermesi için rehber.',
      },
    },
  },

  // ─── 2.5.4 Motion Actuation ──────────────────────────────────────────
  {
    criterionNumber: '2.5.4',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['motion', 'mobile', 'sensors', 'device'],

    title: {
      en: 'Motion Actuation',
      tr: 'Hareket Etkinleştirme',
    },

    description: {
      en: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components, and responding to the motion can be disabled to prevent accidental actuation.',
      tr: 'Cihaz hareketi veya kullanıcı hareketi ile çalıştırılabilen işlevler, kullanıcı arayüzü bileşenleri ile de çalıştırılabilmeli ve kazara etkinlestirmeyi önlemek için harekete yanıt verme devre dışı bırakılabilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.4 requires that any functionality triggered by device motion (tilting, shaking, or moving the device) or user motion (gestures detected by a camera) must also be available through standard user interface components like buttons, links, or form controls. Users must also be able to disable the motion-based response to prevent accidental activation.'
        ),
        p(
          'For example, if shaking a phone triggers an "undo" action, there must also be an on-screen undo button. If tilting a device scrolls content, standard scroll controls must also be available. The only exception is when the motion is essential to the function (e.g., a pedometer counting steps).'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users who have their devices mounted on wheelchairs cannot tilt or shake them. Users with tremors or involuntary movements may trigger motion-based actions accidentally. Users with limited mobility may not be able to perform the required physical motion at all.'
        ),
        p(
          'Additionally, some users operate devices in fixed positions — on a desk stand, mounted in a car, or secured to an assistive device holder. Motion-based functionality would be completely inaccessible to these users without an interface-based alternative.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting motion-based interactions requires manual code review and testing to identify uses of the DeviceMotion, DeviceOrientation, or camera-based gesture detection APIs.'
        ),

        heading('How to test', 'h2'),
        numbered('Review the application for any features that respond to device motion (shake, tilt, rotate) or user motion (camera gestures).'),
        numbered('For each motion-triggered feature, verify that an equivalent on-screen control exists.'),
        numbered('Check that a setting or preference exists to disable motion-based responses.'),
        numbered('Search the codebase for DeviceMotionEvent, DeviceOrientationEvent, and camera/gesture APIs.'),
        numbered('Test by keeping the device stationary and verifying all functionality is still accessible through UI controls.'),

        heading('How to fix', 'h2'),
        p('Provide UI control alternatives for motion-based features and a way to disable motion detection.'),

        heading('Shake to undo — bad practice', 'h3'),
        code(
          '// Only shake gesture triggers undo, no UI alternative\nwindow.addEventListener(\'devicemotion\', (e) => {\n  const acc = e.accelerationIncludingGravity;\n  if (Math.abs(acc.x) > 15 || Math.abs(acc.y) > 15) {\n    undoLastAction();\n  }\n});',
          'javascript'
        ),

        heading('Shake to undo — good practice', 'h3'),
        code(
          '// Motion detection with preference check\nlet motionEnabled = getUserPreference(\'motionEnabled\', true);\n\nif (motionEnabled) {\n  window.addEventListener(\'devicemotion\', (e) => {\n    const acc = e.accelerationIncludingGravity;\n    if (Math.abs(acc.x) > 15 || Math.abs(acc.y) > 15) {\n      undoLastAction();\n    }\n  });\n}\n\n// UI alternative always available\nundoButton.addEventListener(\'click\', () => {\n  undoLastAction();\n});',
          'javascript'
        ),

        heading('Settings toggle for motion features', 'h3'),
        code(
          '<fieldset>\n  <legend>Motion preferences</legend>\n  <label>\n    <input type="checkbox" id="motion-toggle" checked>\n    Enable shake-to-undo and tilt-to-scroll\n  </label>\n</fieldset>\n\n<script>\n  document.getElementById(\'motion-toggle\')\n    .addEventListener(\'change\', (e) => {\n      setUserPreference(\'motionEnabled\', e.target.checked);\n      if (!e.target.checked) {\n        disableMotionListeners();\n      } else {\n        enableMotionListeners();\n      }\n    });\n</script>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Implementing shake-to-undo as the only undo mechanism without an on-screen button.'),
        bullet('Using tilt-to-scroll for content navigation without standard scrollbars or pagination.'),
        bullet('Camera-based gesture controls (wave to dismiss, nod to confirm) without button alternatives.'),
        bullet('Not providing a way to disable motion detection, causing users with tremors to trigger actions accidentally.'),
        bullet('Forgetting that motion-based features are completely unusable for devices mounted in fixed positions.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.4, cihaz hareketi (egme, sallama veya cihazı hareket ettirme) veya kullanıcı hareketi (kamera tarafından algilanan hareketler) tarafından tetiklenen her işlevin, düğmeler, bağlantılar veya form kontrolleri gibi standart kullanıcı arayüzü bileşenleri aracılığıyla da kullanılabilir olmasını gerektirir. Kullanıcılar ayrıca kazara etkinlestirmeyi önlemek için hareket tabanlı yanıtı devre dışı birakabilmelidir.'
        ),
        p(
          'Örneğin, telefonu sallamak "geri al" eylemini tetikliyorsa, ekranda bir geri al düğmesi de olmalıdır. Cihazi egmek içeriği kaydiriyorsa, standart kaydırma kontrolleri de mevcut olmalıdır. Tek istisna, hareketin işlev için zorunlu olması durumudur (örneğin, adım sayan bir pedometre).'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Cihazlarını tekerlekli sandalyelere monte eden kullanıcılar bunları egip sallayamaz. Titreme veya istemsiz hareketleri olan kullanıcılar hareket tabanlı eylemleri yanlislikla tetikleyebilir. Sınırlı hareketliligi olan kullanıcılar gerekli fiziksel hareketi hiç gerçekleştiremeyebilir.'
        ),
        p(
          'Ayrıca bazı kullanıcılar cihazları sabit konumlarda kullanır — masa standinda, arabada monte edilmiş veya yardımcı cihaz tutucusuna sabitlenmiş. Hareket tabanlı işlevsellik, arayüz tabanlı bir alternatif olmadan bu kullanıcılar için tamamen erişilemez olurdu.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Hareket tabanlı etkilesimlerin tespiti, DeviceMotion, DeviceOrientation veya kamera tabanlı hareket algilama API lerinin kullanimlarini belirlemek için manuel kod incelemesi ve test gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Uygulamayı cihaz hareketine (sallama, egme, döndürme) veya kullanıcı hareketine (kamera hareketleri) yanıt veren özellikler için inceleyin.'),
        numbered('Her hareket tetikli özellik için eşdeğer bir ekran üzerinde kontrolün var olduğundan emin olun.'),
        numbered('Hareket tabanlı yanıtları devre dışı bırakmak için bir ayar veya tercihin mevcut olduğundan emin olun.'),
        numbered('Kod tabanında DeviceMotionEvent, DeviceOrientationEvent ve kamera/hareket API lerini arayın.'),
        numbered('Cihazi sabit tutarak test edin ve tüm işlevselliğin UI kontrolleri aracılığıyla hala erişilebilir olduğundan emin olun.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Hareket tabanlı özellikler için UI kontrol alternatifleri ve hareket algilamayi devre dışı birakmanin bir yolunu sağlayın.'),

        heading('Sallayarak geri alma — yanlış uygulama', 'h3'),
        code(
          '// Yalnızca sallama hareketi geri almayi tetikler, UI alternatifi yok\nwindow.addEventListener(\'devicemotion\', (e) => {\n  const ivme = e.accelerationIncludingGravity;\n  if (Math.abs(ivme.x) > 15 || Math.abs(ivme.y) > 15) {\n    sonEylemiGeriAl();\n  }\n});',
          'javascript'
        ),

        heading('Sallayarak geri alma — doğru uygulama', 'h3'),
        code(
          '// Tercih kontrolü ile hareket algilama\nlet hareketEtkin = kullaniciTercihiniAl(\'hareketEtkin\', true);\n\nif (hareketEtkin) {\n  window.addEventListener(\'devicemotion\', (e) => {\n    const ivme = e.accelerationIncludingGravity;\n    if (Math.abs(ivme.x) > 15 || Math.abs(ivme.y) > 15) {\n      sonEylemiGeriAl();\n    }\n  });\n}\n\n// UI alternatifi her zaman mevcut\ngeriAlBtn.addEventListener(\'click\', () => {\n  sonEylemiGeriAl();\n});',
          'javascript'
        ),

        heading('Hareket özellikleri için ayar geçişi', 'h3'),
        code(
          '<fieldset>\n  <legend>Hareket tercihleri</legend>\n  <label>\n    <input type="checkbox" id="hareket-geçişi" checked>\n    Sallayarak geri al ve egerek kaydır özelliklerini etkinleştir\n  </label>\n</fieldset>\n\n<script>\n  document.getElementById(\'hareket-geçişi\')\n    .addEventListener(\'change\', (e) => {\n      kullaniciTercibiniAyarla(\'hareketEtkin\', e.target.checked);\n      if (!e.target.checked) {\n        hareketDinleyicileriniDevreDisiiBirak();\n      } else {\n        hareketDinleyicileriniEtkinlestir();\n      }\n    });\n</script>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Ekran üzerinde düğme olmadan sallayarak geri almayi tek geri alma mekanizması olarak uygulamak.'),
        bullet('Standart kaydırma çubukları veya sayfalama olmadan içerik gezintisi için egerek kaydırmayı kullanmak.'),
        bullet('Kamera tabanlı hareket kontrollerini (el sallayarak kapatma, bas sallayarak onaylama) düğme alternatifleri olmadan sunmak.'),
        bullet('Hareket algilamayi devre dışı birakmanin yolunu sağlamamak, titremeli kullanıcıların eylemleri yanlislikla tetiklemesine neden olmak.'),
        bullet('Hareket tabanlı ozelliklerin sabit konumlara monte edilmiş cihazlar için tamamen kullanılamaz olduğunu unutmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.4: Motion Actuation',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r254w3cu',
      },
      {
        title: 'W3C Techniques: Motion Actuation',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#motion-actuation',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r254w3ct',
      },
      {
        title: 'MDN: DeviceMotionEvent',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent',
        source: 'mdn',
        language: 'en',
        _key: 'r254mdnm',
      },
      {
        title: 'WebAIM: Motion Actuation',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.4',
        source: 'webaim',
        language: 'en',
        _key: 'r254waim',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.4 Motion Actuation — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.4 Motion Actuation. Provide UI alternatives for motion-triggered features and allow users to disable motion detection.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.4 Hareket Etkinleştirme — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.4 Hareket Etkinleştirme kriterini nasıl karşılayacağınızı öğrenin. Hareket tetikli özellikler için UI alternatifleri sağlama rehberi.',
      },
    },
  },

  // ─── 2.5.5 Target Size (Enhanced) ────────────────────────────────────
  {
    criterionNumber: '2.5.5',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['touch', 'target', 'mobile', 'size'],

    title: {
      en: 'Target Size (Enhanced)',
      tr: 'Hedef Boyutu (Gelişmiş)',
    },

    description: {
      en: 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels, except when an equivalent alternative target is available, the target is inline in text, the size is user-agent controlled, or the presentation is essential.',
      tr: 'İşaretçi girişleri için hedefin boyutu en az 44x44 CSS piksel olmalıdır; eşdeğer bir alternatif hedef mevcut olduğunda, hedef metin içinde satır içi olduğunda, boyut kullanıcı ajanı tarafından kontrol edildiğinde veya sunum zorunlu olduğunda istisna uygulanır.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.5 requires that all interactive targets (buttons, links, form controls, custom interactive elements) have a minimum size of 44 by 44 CSS pixels. This is the enhanced (AAA) requirement — a stricter version of the minimum target size requirement introduced in WCAG 2.2 at Level AA (2.5.8).'
        ),
        p(
          'Exceptions exist for equivalent controls (where a larger alternative is provided), inline links within text, targets whose size is determined by the user agent (like native checkboxes), and targets where the specific size is essential to the information being conveyed.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Small touch targets are one of the most common usability barriers on mobile devices. Users with motor impairments, tremors, or limited fine motor control struggle to accurately tap small targets. Older adults experience reduced precision as a natural part of aging. Even users without disabilities frequently mis-tap small targets when using a phone with one hand or in motion.'
        ),
        p(
          'Research from the MIT Touch Lab found that the average adult fingertip pad is approximately 10mm wide, which corresponds to roughly 44 CSS pixels at standard density. Targets smaller than this threshold significantly increase error rates for all users.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules specifically for the 44px enhanced target size. The target-size rule in axe-core checks against the 24px minimum from WCAG 2.5.8 (Level AA). For the 44px threshold, manual measurement or custom tooling is required.'
        ),

        heading('How to test', 'h2'),
        numbered('Use browser DevTools to inspect the computed size of interactive elements.'),
        numbered('Measure both width and height — both must be at least 44 CSS pixels.'),
        numbered('Check padding and clickable area, not just the visible content size.'),
        numbered('Test on actual touch devices, not just desktop browsers with touch emulation.'),
        numbered('Pay special attention to icon buttons, close buttons, pagination links, and form controls in dense layouts.'),

        heading('How to fix', 'h2'),
        p('Use CSS min-width and min-height to ensure interactive targets meet the 44px minimum.'),

        heading('Button sizing — CSS approach', 'h3'),
        code(
          '/* Ensure all buttons meet 44px minimum */\nbutton,\n[role="button"],\na.btn {\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px 16px;\n}\n\n/* Icon buttons need explicit sizing */\n.icon-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px;\n}',
          'css'
        ),

        heading('Expanding clickable area with padding', 'h3'),
        code(
          '/* Small visual target with expanded touch area */\n.close-button {\n  /* Visual size: 16x16 icon */\n  width: 16px;\n  height: 16px;\n  /* Expanded touch area with padding */\n  padding: 14px;\n  /* Total clickable area: 44x44 */\n  box-sizing: content-box;\n  cursor: pointer;\n}\n\n/* Or use negative margin to maintain layout */\n.compact-close {\n  min-width: 44px;\n  min-height: 44px;\n  margin: -14px;\n  padding: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}',
          'css'
        ),

        heading('Navigation link spacing', 'h3'),
        code(
          '<nav aria-label="Pagination">\n  <ul class="pagination">\n    <li><a href="/page/1" class="page-link">1</a></li>\n    <li><a href="/page/2" class="page-link">2</a></li>\n    <li><a href="/page/3" class="page-link">3</a></li>\n  </ul>\n</nav>\n\n<style>\n.page-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  text-decoration: none;\n}\n</style>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Icon buttons (close, menu, settings) that are only 24px or 32px in size with no expanded touch area.'),
        bullet('Pagination links that are too small and too close together, causing mis-taps.'),
        bullet('Form checkboxes and radio buttons relying on the browser default size without enlarging the clickable area.'),
        bullet('Using only the icon size for the clickable area instead of adding padding to expand the touch target.'),
        bullet('Dense toolbars with small closely-spaced buttons that are difficult to target accurately.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.5, tüm etkileşimli hedeflerin (düğmeler, bağlantılar, form kontrolleri, özel etkileşimli öğeler) en az 44x44 CSS piksel boyutunda olmasını gerektirir. Bu, gelişmiş (AAA) gerekliliktir — WCAG 2.2 de AA Duzeyinde tanımlanan minimum hedef boyutu gereksiniminin (2.5.8) daha sıkı bir versiyonudur.'
        ),
        p(
          'Esdeger kontroller (daha büyük bir alternatif saglandiginda), metin içindeki satır içi bağlantılar, boyutu kullanıcı ajanı tarafından belirlenen hedefler (yerel onay kutuları gibi) ve belirli boyutun iletilen bilgi için zorunlu olduğu hedefler için istisnalar mevcuttur.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Küçük dokunma hedefleri, mobil cihazlarda en yaygın kullanılabilirlik engellerinden biridir. Motor engelli, titremeli veya sınırlı ince motor kontrolüne sahip kullanıcılar küçük hedeflere doğru dokunmakta zorlanır. Yasli yetiskinler yaslanmanin doğal bir parçası olarak azalmis hassasiyet yasarlar. Engeli olmayan kullanıcılar bile telefonu tek eliyle veya hareket halindeyken küçük hedeflere sıklıkla yanlış dokunurlar.'
        ),
        p(
          'MIT Dokunma Laboratuvari nın arastirmalari, yetiskin parmak ucu genisliginin yaklaşık 10mm olduğunu ve bunun standart yogunlukta kabaca 44 CSS piksele karşılık geldiğini göstermiştir. Bu eşiğin altındaki hedefler, tüm kullanıcılar için hata oranlarini önemli ölçüde arttırır.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          '44px gelişmiş hedef boyutu için özel otomatik axe-core kuralı bulunmamaktadır. axe-core deki target-size kuralı WCAG 2.5.8 (AA Düzeyi) den gelen 24px minimumunu kontrol eder. 44px eşiği için manuel ölçüm veya özel araç gerektir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Etkileşimli öğelerin hesaplanan boyutunu incelemek için tarayıcı DevTools kullanın.'),
        numbered('Hem genişlik hem de yükseklik ölçün — her ikisi de en az 44 CSS piksel olmalıdır.'),
        numbered('Yalnızca görünen içerik boyutunu değil, padding ve tıklanabilir alaninida kontrol edin.'),
        numbered('Yalnızca dokunma emulasyonuyla masaüstü tarayıcılarda değil, gerçek dokunmatik cihazlarda test edin.'),
        numbered('Simge düğmeleri, kapatma düğmeleri, sayfalama bağlantıları ve yoğun duzenlerdeki form kontrollerine özellikle dikkat edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Etkileşimli hedeflerin 44px minimumunu karşılamasını sağlamak için CSS min-width ve min-height kullanın.'),

        heading('Dugme boyutlandırma — CSS yaklaşımı', 'h3'),
        code(
          '/* Tüm düğmelerin 44px minimumunu karşıladığını sağlayın */\nbutton,\n[role="button"],\na.btn {\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px 16px;\n}\n\n/* Simge düğmeleri açık boyutlandırma gerektirir */\n.simge-düğme {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px;\n}',
          'css'
        ),

        heading('Padding ile tıklanabilir alanı genişletme', 'h3'),
        code(
          '/* Genişletilmiş dokunma alanına sahip küçük görsel hedef */\n.kapat-düğmesi {\n  /* Görsel boyut: 16x16 simge */\n  width: 16px;\n  height: 16px;\n  /* Padding ile genişletilmiş dokunma alanı */\n  padding: 14px;\n  /* Toplam tıklanabilir alan: 44x44 */\n  box-sizing: content-box;\n  cursor: pointer;\n}\n\n/* Veya düzeni korumak için negatif margin kullanın */\n.kompakt-kapat {\n  min-width: 44px;\n  min-height: 44px;\n  margin: -14px;\n  padding: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}',
          'css'
        ),

        heading('Gezinme bağlantı araliklari', 'h3'),
        code(
          '<nav aria-label="Sayfalama">\n  <ul class="sayfalama">\n    <li><a href="/sayfa/1" class="sayfa-bağlantısı">1</a></li>\n    <li><a href="/sayfa/2" class="sayfa-bağlantısı">2</a></li>\n    <li><a href="/sayfa/3" class="sayfa-bağlantısı">3</a></li>\n  </ul>\n</nav>\n\n<style>\n.sayfa-bağlantısı {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  text-decoration: none;\n}\n</style>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Genişletilmiş dokunma alanı olmadan yalnızca 24px veya 32px boyutundaki simge düğmeleri (kapat, menü, ayarlar).'),
        bullet('Çok küçük ve birbirine çok yakın olan, yanlış dokunmalara neden olan sayfalama bağlantıları.'),
        bullet('Tiklanabilir alanı genisletmeden tarayıcı varsayılan boyutuna dayanan form onay kutuları ve radyo düğmeleri.'),
        bullet('Dokunma hedefini genisletmek için padding eklemek yerine tıklanabilir alan için yalnızca simge boyutunu kullanmak.'),
        bullet('Dogruca hedeflenmesi zor olan küçük ve birbirine yakın dugmelere sahip yoğun araç çubukları.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.5: Target Size (Enhanced)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r255w3cu',
      },
      {
        title: 'W3C Techniques: Target Size',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#target-size',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r255w3ct',
      },
      {
        title: 'WebAIM: Target Size',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.5',
        source: 'webaim',
        language: 'en',
        _key: 'r255waim',
      },
      {
        title: 'Deque: Touch Target Size',
        url: 'https://dequeuniversity.com/rules/axe/4.10/target-size',
        source: 'deque',
        language: 'en',
        _key: 'r255dequ',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.5 Target Size Enhanced — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.5 Target Size (Enhanced). Ensure interactive targets are at least 44x44 CSS pixels with practical CSS examples and testing techniques.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.5 Hedef Boyutu (Gelişmiş) — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.5 Hedef Boyutu (Gelişmiş) kriterini nasıl karşılayacağınızı öğrenin. Etkileşimli hedeflerin en az 44x44 CSS piksel olmasını sağlama rehberi.',
      },
    },
  },

  // ─── 2.5.6 Concurrent Input Mechanisms ────────────────────────────────
  {
    criterionNumber: '2.5.6',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['input', 'keyboard', 'touch', 'mouse'],

    title: {
      en: 'Concurrent Input Mechanisms',
      tr: 'Eszamani Giriş Mekanizmalari',
    },

    description: {
      en: 'Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure security, or required to respect user settings.',
      tr: 'Web içeriği, kısıtlama zorunlu olmadıkça, güvenlik için gerekli olmadıkça veya kullanıcı ayarlarina uyum için gerekli olmadıkça, platformda mevcut giriş yontemlerinin kullanımını kisitlamamalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.6 requires that web content does not restrict users to a single input modality when the platform supports multiple modalities. If a user can interact via touch, mouse, keyboard, stylus, or voice, the web content must not artificially limit which input methods are available.'
        ),
        p(
          'Users frequently switch between input methods during a single session. A person might use a touchscreen to scroll, switch to a Bluetooth keyboard to type, and use a mouse for precise selections. Content must not assume or enforce a single input method.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Many assistive technology users depend on multiple input mechanisms. A user with limited hand mobility might use a mouth-operated stylus for some actions and voice control for others. Restricting input to touch-only, for example, would prevent keyboard or switch access users from interacting with the content.'
        ),
        p(
          'Even users without disabilities regularly switch input mechanisms. Laptop users alternate between trackpad and keyboard. Tablet users switch between touch and an attached keyboard. Restricting input modalities creates unnecessary barriers for everyone.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting input modality restrictions requires manual testing with multiple input devices and code review to identify any JavaScript that disables or blocks specific input types.'
        ),

        heading('How to test', 'h2'),
        numbered('Connect multiple input devices (keyboard, mouse, touchscreen) to the same system.'),
        numbered('Attempt to use each input method independently to complete all interactive tasks.'),
        numbered('Switch between input methods mid-task and verify functionality is maintained.'),
        numbered('Search the codebase for code that detects input type and disables alternative input methods.'),
        numbered('Check for media queries like (pointer: coarse) that hide keyboard-focused UI elements entirely.'),

        heading('How to fix', 'h2'),
        p('Avoid restricting input modalities. Design interactions that work across all available input mechanisms.'),

        heading('Input detection — bad practice', 'h3'),
        code(
          '// Bad: Disables mouse events when touch is detected\nif (\'ontouchstart\' in window) {\n  document.body.classList.add(\'touch-device\');\n  // All hover and mouse interactions disabled via CSS\n}\n\n// Bad: Removes keyboard support on touch devices\nif (navigator.maxTouchPoints > 0) {\n  document.removeEventListener(\'keydown\', handleKeyboard);\n}',
          'javascript'
        ),

        heading('Input detection — good practice', 'h3'),
        code(
          '// Good: Use pointer events that work across all input types\nelement.addEventListener(\'pointerdown\', handleInteraction);\nelement.addEventListener(\'pointerup\', handleInteraction);\n\n// Good: Keep keyboard support regardless of touch capability\ndocument.addEventListener(\'keydown\', handleKeyboard);\n\n// Good: Adapt UI without removing functionality\n// Show touch-optimized UI but keep keyboard shortcuts active\nif (matchMedia(\'(pointer: coarse)\').matches) {\n  enlargeTouchTargets();\n  // Keyboard navigation still works\n}',
          'javascript'
        ),

        heading('CSS that preserves all input methods', 'h3'),
        code(
          '/* Good: Use hover as enhancement, not requirement */\n.dropdown-trigger:hover + .dropdown-menu,\n.dropdown-trigger:focus + .dropdown-menu,\n.dropdown-menu:hover,\n.dropdown-menu:focus-within {\n  display: block;\n}\n\n/* Good: Touch-friendly sizes that also work with mouse */\n@media (pointer: coarse) {\n  .interactive-element {\n    min-height: 44px;\n    min-width: 44px;\n  }\n}\n\n/* Keep interactive elements accessible regardless of input */\n.interactive-element {\n  min-height: 32px; /* Works for mouse precision */\n  min-width: 32px;\n}',
          'css'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Detecting touch support and disabling mouse or keyboard event handlers.'),
        bullet('Using CSS media queries like (hover: none) to completely remove hover-triggered functionality without providing an alternative.'),
        bullet('Locking the interface to touch-only mode on tablets, preventing use of connected keyboards or mice.'),
        bullet('Disabling keyboard navigation in mobile views even when a physical keyboard is attached.'),
        bullet('Using JavaScript to block right-click, keyboard shortcuts, or other secondary input mechanisms.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.6, platform birden fazla modaliteyi desteklediginde web içeriğinin kullanıcıları tek bir giriş modalitesiyle sinirlandirmamasini gerektirir. Bir kullanıcı dokunmatik, fare, klavye, kalem veya sesle etkileşim kurabiliyorsa, web içeriği hangi giriş yontemlerinin kullanılabilir olduğunu yapay olarak sinirlandirmamalidir.'
        ),
        p(
          'Kullanıcılar tek bir oturum sırasında sıklıkla giriş yontemleri arasında geçiş yapar. Bir kişi kaydırmak için dokunmatik ekranı kullanabilir, yazmak için Bluetooth klavyeye gecebilir ve hassas secimler için fareyi kullanabilir. İçerik tek bir giriş yontemini varsaymamali veya zorundaa birakmamalidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Birçok yardımcı teknoloji kullanıcısı birden fazla giriş mekanizmasina bağımlıdır. Sınırlı el hareketliligi olan bir kullanıcı bazı eylemler için agizla calistirilan bir kalem ve digerleri için sesli kontrol kullanabilir. Girisi yalnızca dokunmatikla sinirlandirmak, klavye veya anahtar erişimi kullanıcılarının içerikle etkilesimini engellerdi.'
        ),
        p(
          'Engeli olmayan kullanıcılar da düzenli olarak giriş mekanizmaları arasında geçiş yapar. Dizustu bilgisayar kullanıcıları dokunmatik yuzey ile klavye arasında geçiş yapar. Tablet kullanıcıları dokunmatik ile bağlı klavye arasında geçiş yapar. Giriş modalitelerini kısıtlamak herkes için gereksiz engeller oluşturur.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Giriş modalitesi kisitlamalarini tespit etmek, birden fazla giriş cihazı ile manuel test ve belirli giriş türlerini devre dışı bırakan veya engelleyen JavaScript kodunu belirlemek için kod incelemesi gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Aynı sisteme birden fazla giriş cihazı (klavye, fare, dokunmatik ekran) baglayin.'),
        numbered('Tüm etkileşimli gorevleri tamamlamak için her giriş yontemini bağımsız olarak kullanmayi deneyin.'),
        numbered('Gorev sırasında giriş yontemleri arasında geçiş yapın ve işlevselliğin korunduğundan emin olun.'),
        numbered('Kod tabanında giriş türünü tespit eden ve alternatif giriş yöntemlerini devre dışı bırakan kodu arayın.'),
        numbered('Klavye odaklı UI öğelerini tamamen gizleyen (pointer: coarse) gibi medya sorgularını kontrol edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Giriş modalitelerini kısıtlamaktan kaçının. Tüm mevcut giriş mekanizmaları arasında çalışan etkilesimler tasarlayın.'),

        heading('Giriş algilama — yanlış uygulama', 'h3'),
        code(
          '// Yanlış: Dokunmatik algilandiginda fare olaylarını devre dışı birakir\nif (\'ontouchstart\' in window) {\n  document.body.classList.add(\'dokunmatik-cihaz\');\n  // Tüm fareyle gezinme ve fare etkileşimleri CSS ile devre dışı birakildi\n}\n\n// Yanlış: Dokunmatik cihazlarda klavye destegini kaldırır\nif (navigator.maxTouchPoints > 0) {\n  document.removeEventListener(\'keydown\', klavyeIsle);\n}',
          'javascript'
        ),

        heading('Giriş algilama — doğru uygulama', 'h3'),
        code(
          '// Doğru: Tüm giriş türleri arasında çalışan pointer olayları kullanın\nelement.addEventListener(\'pointerdown\', etkilesimiIsle);\nelement.addEventListener(\'pointerup\', etkilesimiIsle);\n\n// Doğru: Dokunmatik yeteneginden bağımsız olarak klavye destegini koruyun\ndocument.addEventListener(\'keydown\', klavyeIsle);\n\n// Doğru: İşlevsellik kaldirmadan UI yi uyarlayin\nif (matchMedia(\'(pointer: coarse)\').matches) {\n  dokunmaHedefleriniBuyut();\n  // Klavye gezintisi hala çalışıyor\n}',
          'javascript'
        ),

        heading('Tüm giriş yöntemlerini koruyan CSS', 'h3'),
        code(
          '/* Doğru: Fareyle gezinmeyi gereklilik değil iyilestirme olarak kullanın */\n.açılır-tetikleyici:hover + .açılır-menü,\n.açılır-tetikleyici:focus + .açılır-menü,\n.açılır-menü:hover,\n.açılır-menü:focus-within {\n  display: block;\n}\n\n/* Doğru: Fare ile de çalışan dokunmatik dostu boyutlar */\n@media (pointer: coarse) {\n  .etkileşimli-öğe {\n    min-height: 44px;\n    min-width: 44px;\n  }\n}\n\n/* Giriş yonteminden bağımsız olarak etkileşimli öğeleri erişilebilir tutun */\n.etkileşimli-öğe {\n  min-height: 32px;\n  min-width: 32px;\n}',
          'css'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Dokunmatik desteği tespit edip fare veya klavye olay isleyicilerini devre dışı bırakmak.'),
        bullet('Alternatif sağlamadan fareyle gezinme tetikli islevseligi tamamen kaldırmak için (hover: none) gibi CSS medya sorguları kullanmak.'),
        bullet('Tabletlerde arayüzü yalnızca dokunmatik moduna kilitleyerek bağlı klavye veya farelerin kullanımını engellemek.'),
        bullet('Fiziksel klavye bağlı olsa bile mobil gorunumlerde klavye gezintisini devre dışı bırakmak.'),
        bullet('Sag tıklama, klavye kısayolları veya diğer ikincil giriş mekanizmalarini engellemek için JavaScript kullanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.6: Concurrent Input Mechanisms',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r256w3cu',
      },
      {
        title: 'W3C Techniques: Concurrent Input Mechanisms',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#concurrent-input-mechanisms',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r256w3ct',
      },
      {
        title: 'MDN: Pointer Events',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events',
        source: 'mdn',
        language: 'en',
        _key: 'r256mdnp',
      },
      {
        title: 'WebAIM: Concurrent Input Mechanisms',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.6',
        source: 'webaim',
        language: 'en',
        _key: 'r256waim',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.6 Concurrent Input Mechanisms — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.6 Concurrent Input Mechanisms. Ensure web content supports multiple input methods without restricting users to a single modality.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.6 Eszamani Giriş Mekanizmalari — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.6 Eszamani Giriş Mekanizmalari kriterini nasıl karşılayacağınızı öğrenin. Web içeriğinin birden fazla giriş yontemini desteklemesi rehberi.',
      },
    },
  },

  // ─── 2.5.7 Dragging Movements ────────────────────────────────────────
  {
    criterionNumber: '2.5.7',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['drag', 'pointer', 'interaction', 'motor'],

    title: {
      en: 'Dragging Movements',
      tr: 'Sürükleme Hareketleri',
    },

    description: {
      en: 'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent.',
      tr: 'Sürükleme hareketi kullanan tüm işlevler, sürükleme zorunlu olmadıkça veya işlevsellik kullanıcı ajanı tarafından belirlenmediçe, sürüklemesiz tek bir işaretçi ile gerçekleştirilebilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.7 requires that any functionality requiring a dragging movement (pressing, holding, and moving a pointer) must also be operable through a single-pointer mechanism that does not require dragging. This means providing click/tap alternatives for drag-and-drop, slider adjustments, sortable lists, and other drag-dependent interactions.'
        ),
        p(
          'A dragging movement involves pressing a pointer button (or touching), holding it down, and moving to a new position. The alternative must allow the same outcome through discrete pointer actions — such as clicking a start point, then clicking an end point, or using increment/decrement buttons.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Dragging requires sustained pointer contact along a precise path, which many users cannot perform. Users with tremors, limited grip strength, or motor impairments may not be able to maintain pointer-down pressure while moving. Users operating via eye-tracking, head-tracking, or mouth sticks often cannot perform drag operations at all.'
        ),
        p(
          'Speech recognition users also struggle with drag interactions because voice commands typically activate discrete click/tap actions rather than continuous drag movements. Providing non-drag alternatives ensures that all users can complete tasks regardless of their motor capabilities.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting drag-dependent functionality requires manual testing and code review to identify elements using drag-related events (dragstart, dragover, drop) or pointer move tracking.'
        ),

        heading('How to test', 'h2'),
        numbered('Identify all drag-and-drop interactions (sortable lists, file upload areas, sliders, kanban boards, drawing canvases).'),
        numbered('For each draggable feature, attempt to complete the same task without performing a drag motion.'),
        numbered('Verify that click/tap-based alternatives exist (buttons, menus, input fields).'),
        numbered('Test with keyboard-only navigation to confirm drag operations have keyboard equivalents.'),
        numbered('Use assistive technology pointer emulators that cannot perform drag operations.'),

        heading('How to fix', 'h2'),
        p('Provide single-pointer alternatives for all drag-based interactions.'),

        heading('Sortable list — drag only (bad)', 'h3'),
        code(
          '<!-- Only drag-and-drop to reorder, no alternatives -->\n<ul id="sortable">\n  <li draggable="true" ondragstart="drag(event)">Item 1</li>\n  <li draggable="true" ondragstart="drag(event)">Item 2</li>\n  <li draggable="true" ondragstart="drag(event)">Item 3</li>\n</ul>',
          'html'
        ),

        heading('Sortable list — with button alternatives (good)', 'h3'),
        code(
          '<ul id="sortable" role="list">\n  <li draggable="true">\n    <span>Item 1</span>\n    <div class="reorder-controls">\n      <button aria-label="Move Item 1 up" onclick="moveUp(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Move Item 1 down" onclick="moveDown(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n  <li draggable="true">\n    <span>Item 2</span>\n    <div class="reorder-controls">\n      <button aria-label="Move Item 2 up" onclick="moveUp(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Move Item 2 down" onclick="moveDown(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n</ul>',
          'html'
        ),

        heading('Slider with input alternative', 'h3'),
        code(
          '<!-- Draggable slider with number input alternative -->\n<div class="slider-container">\n  <label for="price-slider">Maximum price</label>\n  <input type="range" id="price-slider" min="0" max="500"\n    value="250" step="10">\n  <input type="number" id="price-input" min="0" max="500"\n    value="250" step="10" aria-label="Maximum price value">\n</div>\n\n<script>\n  const slider = document.getElementById(\'price-slider\');\n  const input = document.getElementById(\'price-input\');\n  slider.addEventListener(\'input\', () => input.value = slider.value);\n  input.addEventListener(\'input\', () => slider.value = input.value);\n</script>',
          'html'
        ),

        heading('File upload — drop zone with button fallback', 'h3'),
        code(
          '<div class="drop-zone"\n  ondragover="event.preventDefault()"\n  ondrop="handleDrop(event)">\n  <p>Drag files here to upload</p>\n  <!-- Non-drag alternative -->\n  <label for="file-upload" class="upload-button">\n    Or click to select files\n  </label>\n  <input type="file" id="file-upload" multiple\n    onchange="handleFiles(this.files)" class="visually-hidden">\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Sortable lists or kanban boards that only support drag-and-drop reordering with no button or menu alternative.'),
        bullet('Custom sliders that only respond to dragging the thumb, without keyboard arrow key support or a numeric input.'),
        bullet('File upload zones that only accept drag-and-drop without a file picker button.'),
        bullet('Image cropping or positioning interfaces that require dragging without coordinate input fields.'),
        bullet('Drawing or annotation tools with no structured input alternative for users who cannot drag.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.7, sürükleme hareketi gerektiren (basma, tutma ve işaretçiyi hareket ettirme) her işlevin, sürükleme gerektirmeyen tek işaretçi mekanizmasiyla da çalıştırılmasını gerektirir. Bu, sürükle-birak, kaydırıcı ayarlamalari, sıralanabilir listeler ve diğer suruklemne bağlı etkilesimler için tıklama/dokunma alternatifleri sağlamayı ifade eder.'
        ),
        p(
          'Sürükleme hareketi, bir işaretçi düğmesine basma (veya dokunma), aşağı tutma ve yeni bir konuma hareket ettirmeyi içerir. Alternatif, aynı sonucu ayrik işaretçi eylemleri aracılığıyla sağlamalıdır — örneğin bir başlangıç noktasina tıklama, sonra bir bitiş noktasina tıklama veya artirma/azaltma düğmeleri kullanma.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Sürükleme, hassas bir yol boyunca surdurulen işaretçi temasi gerektirir ve birçok kullanıcı bunu gerçekleştiremez. Titreme, sınırlı kavrama gucu veya motor bozukluklari olan kullanıcılar hareket ederken işaretçi-aşağı basincini surduroemyebilir. Goz takibi, bas takibi veya agiz çubukları ile çalışan kullanıcılar genellikle sürükleme islemlerini hiç gerçekleştiremez.'
        ),
        p(
          'Konuşma tanıma kullanıcıları da sürükleme etkilesimleriyle zorlanır çünkü ses komutlari genellikle sürekli sürükleme hareketleri yerine ayrik tıklama/dokunma eylemlerini etkinleştirir. Sürüklemesiz alternatifler sağlamak, tüm kullanıcıların motor yeteneklerinden bağımsız olarak gorevleri tamamlayabilmesini sağlar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Sürükle bağlı işlevselliğin tespiti, sürükleme ile ilgili olayları (dragstart, dragover, drop) veya işaretçi hareket takibini kullanan öğeleri belirlemek için manuel test ve kod incelemesi gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        numbered('Tüm sürükle-birak etkilesimlerini (sıralanabilir listeler, dosya yükleme alanları, kaydırıcılar, kanban panolari, çizim tuvalileri) belirleyin.'),
        numbered('Her suruklenebilir özellik için aynı görevi sürükleme hareketi yapmadan tamamlamayi deneyin.'),
        numbered('Tiklama/dokunma tabanlı alternatiflerin (düğmeler, menüler, giriş alanları) mevcut olduğundan emin olun.'),
        numbered('Sürükleme islemlerinin klavye esdegerlerine sahip olduğunu doğrulamak için yalnızca klavye gezintisiyle test edin.'),
        numbered('Sürükleme islemleri gerçekleştiremeyen yardımcı teknoloji işaretçi emulatorleri kullanın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Tüm sürükleme tabanlı etkilesimler için tek işaretçi alternatifleri sağlayın.'),

        heading('Siralanabilir liste — yalnızca sürükleme (yanlış)', 'h3'),
        code(
          '<!-- Yeniden sıralamak için yalnızca sürükle-birak, alternatif yok -->\n<ul id="sıralanabilir">\n  <li draggable="true" ondragstart="sürükle(event)">Öğe 1</li>\n  <li draggable="true" ondragstart="sürükle(event)">Öğe 2</li>\n  <li draggable="true" ondragstart="sürükle(event)">Öğe 3</li>\n</ul>',
          'html'
        ),

        heading('Siralanabilir liste — düğme alternatifleriyle (doğru)', 'h3'),
        code(
          '<ul id="sıralanabilir" role="list">\n  <li draggable="true">\n    <span>Öğe 1</span>\n    <div class="sıralama-kontrolleri">\n      <button aria-label="Öğe 1 yukarı tasi" onclick="yukariTasi(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Öğe 1 aşağı tasi" onclick="asagiTasi(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n  <li draggable="true">\n    <span>Öğe 2</span>\n    <div class="sıralama-kontrolleri">\n      <button aria-label="Öğe 2 yukarı tasi" onclick="yukariTasi(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Öğe 2 aşağı tasi" onclick="asagiTasi(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n</ul>',
          'html'
        ),

        heading('Giriş alternatifi ile kaydırıcı', 'h3'),
        code(
          '<!-- Sayi girişi alternatifi ile suruklenebilir kaydırıcı -->\n<div class="kaydırıcı-kapsayıcı">\n  <label for="fiyat-kaydırıcı">Maksimum fiyat</label>\n  <input type="range" id="fiyat-kaydırıcı" min="0" max="500"\n    value="250" step="10">\n  <input type="number" id="fiyat-girişi" min="0" max="500"\n    value="250" step="10" aria-label="Maksimum fiyat değeri">\n</div>\n\n<script>\n  const kaydırıcı = document.getElementById(\'fiyat-kaydırıcı\');\n  const giriş = document.getElementById(\'fiyat-girişi\');\n  kaydırıcı.addEventListener(\'input\', () => giriş.value = kaydırıcı.value);\n  giriş.addEventListener(\'input\', () => kaydırıcı.value = giriş.value);\n</script>',
          'html'
        ),

        heading('Dosya yükleme — düğme alternatifi ile bırakma alanı', 'h3'),
        code(
          '<div class="bırakma-alanı"\n  ondragover="event.preventDefault()"\n  ondrop="birakmaIsle(event)">\n  <p>Yüklemek için dosyaları buraya sürükleyin</p>\n  <!-- Sürüklemesiz alternatif -->\n  <label for="dosya-yükleme" class="yükleme-düğmesi">\n    Veya dosya seçmek için tıklayın\n  </label>\n  <input type="file" id="dosya-yükleme" multiple\n    onchange="dosyalariIsle(this.files)" class="görsel-gizli">\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Yalnızca sürükle-birak yeniden sıralamayı destekleyen, düğme veya menü alternatifi olmayan sıralanabilir listeler veya kanban panolari.'),
        bullet('Yalnızca tutamaci surukleyerek yanıt veren, klavye ok tuşu desteği veya sayisal giriş olmayan özel kaydırıcılar.'),
        bullet('Dosya seçiçi düğmesi olmadan yalnızca sürükle-birak kabul eden dosya yükleme alanları.'),
        bullet('Koordinat giriş alanları olmadan sürükleme gerektiren görsel kirpma veya konumlandırma arayüzleri.'),
        bullet('Surukleyemeyen kullanıcılar için yapılandırılmış giriş alternatifi olmayan çizim veya açıklama araçları.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.7: Dragging Movements',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r257w3cu',
      },
      {
        title: 'W3C Techniques: Dragging Movements',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#dragging-movements',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r257w3ct',
      },
      {
        title: 'MDN: HTML Drag and Drop API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API',
        source: 'mdn',
        language: 'en',
        _key: 'r257mdnd',
      },
      {
        title: 'Deque: Dragging Movements',
        url: 'https://dequeuniversity.com/rules/axe/4.10/dragging-movements',
        source: 'deque',
        language: 'en',
        _key: 'r257dequ',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.7 Dragging Movements — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.7 Dragging Movements. Provide single-pointer alternatives for drag-and-drop interactions with practical code examples.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.7 Sürükleme Hareketleri — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.7 Sürükleme Hareketleri kriterini nasıl karşılayacağınızı öğrenin. Sürükle-birak etkileşimleri için tek işaretçi alternatifleri sağlama rehberi.',
      },
    },
  },

  // ─── 2.5.8 Target Size (Minimum) ─────────────────────────────────────
  {
    criterionNumber: '2.5.8',
    level: 'AA',
    principle: 'operable',
    introducedIn: '2.2',
    wcagVersions: ['2.2'],
    impact: 'serious',
    axeRuleIds: ['target-size'],
    tags: ['touch', 'target', 'mobile', 'size'],

    title: {
      en: 'Target Size (Minimum)',
      tr: 'Hedef Boyutu (Minimum)',
    },

    description: {
      en: 'The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except where an equivalent control exists, the target is inline, the size is user-agent determined, or the presentation is essential.',
      tr: 'İşaretçi girişleri için hedefin boyutu en az 24x24 CSS piksel olmalıdır; eşdeğer bir kontrol mevcut olduğunda, hedef satır içi olduğunda, boyut kullanıcı ajanı tarafından belirlendiğinde veya sunum zorunlu olduğunda istisna uygulanır.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.5.8 establishes a minimum target size of 24 by 24 CSS pixels for all interactive elements. This is the Level AA requirement introduced in WCAG 2.2, providing a practical minimum that balances usability with design flexibility. The enhanced 44px target from criterion 2.5.5 remains the AAA recommendation.'
        ),
        p(
          'The 24px minimum applies to the entire clickable/tappable area, including any padding that extends the hit region. If a target is smaller than 24px, it must have sufficient spacing from adjacent targets so that the 24px circle centered on the target does not overlap with any other target. This is known as the "undersized target with offset" exception.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'The 24px minimum target size was chosen based on research showing this is the smallest reasonable target that users with motor impairments can reliably activate. While 44px is optimal, the 24px minimum acknowledges that some interface patterns require compact layouts. The spacing requirement ensures that even small targets can be activated without accidentally hitting a neighbor.'
        ),
        p(
          'This criterion has the widest impact of any WCAG 2.2 addition because it applies to every interactive element on the page. Navigation links, toolbar buttons, form controls, pagination, tag lists, and inline actions all must meet the 24px threshold or use adequate spacing.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('target-size — Ensures interactive elements meet the minimum 24x24 CSS pixel target size or have sufficient spacing from adjacent targets. This rule checks the bounding box of clickable elements and flags undersized targets that overlap with neighbors.'),

        heading('How to test', 'h2'),
        numbered('Run axe-core or axe DevTools — the target-size rule will flag elements smaller than 24x24 pixels that lack sufficient spacing.'),
        numbered('Use browser DevTools to inspect the computed size (including padding) of interactive elements.'),
        numbered('For targets smaller than 24px, verify that the spacing from adjacent targets provides at least a 24px non-overlapping zone.'),
        numbered('Check compact UI patterns: toolbars, tag lists, breadcrumbs, pagination, and inline actions.'),
        numbered('Test on touch devices to verify that small targets can be tapped reliably without mis-activation.'),

        heading('How to fix', 'h2'),
        p('Use CSS to ensure interactive elements meet the 24px minimum or provide adequate spacing.'),

        heading('Minimum target size with CSS', 'h3'),
        code(
          '/* Base interactive element sizing */\nbutton,\na,\ninput,\nselect,\ntextarea,\n[role="button"],\n[role="link"],\n[role="tab"],\n[role="checkbox"],\n[role="radio"] {\n  min-width: 24px;\n  min-height: 24px;\n}',
          'css'
        ),

        heading('Icon button meeting minimum size', 'h3'),
        code(
          '<!-- Bad: 16px icon with no expanded target -->\n<button class="icon-btn-small">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="visually-hidden">Close</span>\n</button>\n\n<style>\n/* Bad: target is only 16x16 */\n.icon-btn-small {\n  padding: 0;\n  border: none;\n  background: none;\n}\n</style>\n\n<!-- Good: 16px icon with expanded clickable area -->\n<button class="icon-btn">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="visually-hidden">Close</span>\n</button>\n\n<style>\n/* Good: padding expands target to 24x24 minimum */\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px;\n  border: none;\n  background: none;\n}\n</style>',
          'html'
        ),

        heading('Spacing approach for compact layouts', 'h3'),
        code(
          '/* When targets must be smaller than 24px,\n   ensure adequate spacing between them */\n.tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px; /* Spacing between small tags */\n}\n\n.tag {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 2px 8px;\n  font-size: 12px;\n}\n\n/* Inline link spacing */\n.inline-actions a {\n  padding: 4px;\n  margin: 0 4px;\n  /* Ensures 24px target with 4px padding on 16px text */\n}',
          'css'
        ),

        heading('Responsive target sizing', 'h3'),
        code(
          '/* Progressive enhancement for target size */\n.action-button {\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px 8px;\n}\n\n/* Larger targets on touch devices */\n@media (pointer: coarse) {\n  .action-button {\n    min-width: 44px;\n    min-height: 44px;\n    padding: 10px 16px;\n  }\n}',
          'css'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Small icon buttons (16px or 20px) with no padding to expand the clickable area.'),
        bullet('Dense navigation menus with links smaller than 24px and no spacing compensation.'),
        bullet('Tag or chip components with tiny close/remove buttons that are difficult to target.'),
        bullet('Breadcrumb links with insufficient height, especially on mobile viewports.'),
        bullet('Custom checkboxes or radio buttons styled smaller than 24px without expanding the clickable label area.'),
        bullet('Relying on the visible element size without accounting for padding that contributes to the clickable area.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.5.8, tüm etkileşimli öğeler için 24x24 CSS piksel minimum hedef boyutu belirler. Bu, WCAG 2.2 de tanımlanan AA Düzeyi gereksinimidir ve kullanılabilirlik ile tasarım esnekliği arasında denge sağlayan pratik bir minimum sunar. Kriter 2.5.5 teki gelişmiş 44px hedef, AAA önerisi olarak kalır.'
        ),
        p(
          '24px minimum, isabet bolgesini genişleten herhangi bir padding dahil olmak üzere tüm tıklanabilir/dokunulabilir alana uygulanır. Bir hedef 24px den kucukse, hedefin merkezindeki 24px cemberin başka herhangi bir hedefle cakismamasi için bitişik hedeflerden yeterli araliga sahip olmalıdır. Bu, "dengelemeli küçük hedef" istisnası olarak bilinir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          '24px minimum hedef boyutu, motor engelli kullanıcıların güvenilir şekilde etkinlestirebilecegi en küçük makul hedef olduğunu gösteren araştırmalara dayanilarak secilmistir. 44px optimum olmakla birlikte, 24px minimum bazı arayüz kaliplarinin kompakt düzenler gerektirdigini kabul eder. Aralık gereksinimi, küçük hedeflerin bile yanlislikla komsularini vurmadan etkinlestirilebilmesini sağlar.'
        ),
        p(
          'Bu kriter, sayfadaki her etkileşimli öğe için geçerli olduğu için WCAG 2.2 eklemelerinin en geniş etkiye sahip olanıdır. Gezinme bağlantıları, araç çubuğu düğmeleri, form kontrolleri, sayfalama, etiket listeleri ve satır içi eylemler 24px eşiğini karşılamalı veya yeterli aralık kullanmalıdır.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        bullet('target-size — Etkileşimli öğelerin minimum 24x24 CSS piksel hedef boyutunu karşılamasını veya bitişik hedeflerden yeterli araliga sahip olmasını sağlar. Bu kural tıklanabilir öğelerin sınır kutusunu kontrol eder ve komsulariyla çakışan küçük hedefleri işaretler.'),

        heading('Nasıl test edilir', 'h2'),
        numbered('axe-core veya axe DevTools çalıştırın — target-size kuralı yeterli aralığı olmayan 24x24 pikselden küçük öğeleri isaretleyecektir.'),
        numbered('Etkileşimli öğelerin hesaplanan boyutunu (padding dahil) incelemek için tarayıcı DevTools kullanın.'),
        numbered('24px den küçük hedefler için, bitişik hedeflerden araliklamanin en az 24px cakismayan bir bölge sağladığını doğrulayın.'),
        numbered('Kompakt UI kalıplarını kontrol edin: araç çubukları, etiket listeleri, içerik haritası bağlantıları, sayfalama ve satır içi eylemler.'),
        numbered('Küçük hedeflerin yanlış etkinlestirme olmadan güvenilir şekilde dokunulabildgini doğrulamak için dokunmatik cihazlarda test edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Etkileşimli öğelerin 24px minimumu karşılamasını veya yeterli aralık sağlamasını sağlamak için CSS kullanın.'),

        heading('CSS ile minimum hedef boyutu', 'h3'),
        code(
          '/* Temel etkileşimli öğe boyutlandırma */\nbutton,\na,\ninput,\nselect,\ntextarea,\n[role="button"],\n[role="link"],\n[role="tab"],\n[role="checkbox"],\n[role="radio"] {\n  min-width: 24px;\n  min-height: 24px;\n}',
          'css'
        ),

        heading('Minimum boyutu karşılayan simge düğmesi', 'h3'),
        code(
          '<!-- Yanlış: Genişletilmiş hedef olmadan 16px simge -->\n<button class="simge-btn-küçük">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="görsel-gizli">Kapat</span>\n</button>\n\n<style>\n/* Yanlış: hedef yalnızca 16x16 */\n.simge-btn-küçük {\n  padding: 0;\n  border: none;\n  background: none;\n}\n</style>\n\n<!-- Doğru: Genişletilmiş tıklanabilir alana sahip 16px simge -->\n<button class="simge-btn">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="görsel-gizli">Kapat</span>\n</button>\n\n<style>\n/* Doğru: padding hedefi en az 24x24 e genişletir */\n.simge-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px;\n  border: none;\n  background: none;\n}\n</style>',
          'html'
        ),

        heading('Kompakt düzenler için aralık yaklaşımı', 'h3'),
        code(
          '/* Hedefler 24px den küçük olmak zorundaysa,\n   aralarında yeterli aralık sağlayın */\n.etiket-listesi {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px; /* Küçük etiketler arasi aralık */\n}\n\n.etiket {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 2px 8px;\n  font-size: 12px;\n}\n\n/* Satirici bağlantı aralığı */\n.satır içi-eylemler a {\n  padding: 4px;\n  margin: 0 4px;\n  /* 16px metin üzerinde 4px padding ile 24px hedef sağlar */\n}',
          'css'
        ),

        heading('Duyarlı hedef boyutlandırma', 'h3'),
        code(
          '/* Hedef boyutu için asamali iyilestirme */\n.eylem-düğmesi {\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px 8px;\n}\n\n/* Dokunmatik cihazlarda daha büyük hedefler */\n@media (pointer: coarse) {\n  .eylem-düğmesi {\n    min-width: 44px;\n    min-height: 44px;\n    padding: 10px 16px;\n  }\n}',
          'css'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Tiklanabilir alanı genisletmek için padding olmadan küçük simge düğmeleri (16px veya 20px).'),
        bullet('24px den küçük baglantilara ve aralık telafisi olmayan yoğun gezinme menüleri.'),
        bullet('Hedeflenmesi zor olan küçük kapat/kaldir dugmelerine sahip etiket veya çip bileşenleri.'),
        bullet('Özellikle mobil görünüm alanlarında yetersiz yukseklikteki içerik haritası bağlantıları.'),
        bullet('Tiklanabilir etiket alanını genisletmeden 24px den küçük stile sahip özel onay kutuları veya radyo düğmeleri.'),
        bullet('Tiklanabilir alana katkıda bulunan paddingi hesaba katmadan görsel öğe boyutuna dayanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.5.8: Target Size (Minimum)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r258w3cu',
      },
      {
        title: 'W3C Techniques: Target Size',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C42',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r258w3ct',
      },
      {
        title: 'axe-core: target-size Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/target-size',
        source: 'axe-core',
        language: 'en',
        _key: 'r258axec',
      },
      {
        title: 'WebAIM: Target Size (Minimum)',
        url: 'https://webaim.org/standards/wcag/checklist#2.5.8',
        source: 'webaim',
        language: 'en',
        _key: 'r258waim',
      },
      {
        title: 'MDN: CSS min-width and min-height',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/min-width',
        source: 'mdn',
        language: 'en',
        _key: 'r258mdnm',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.5.8 Target Size Minimum — Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.5.8 Target Size (Minimum). Ensure interactive targets are at least 24x24 CSS pixels with CSS examples and axe-core testing guidance.',
      },
      tr: {
        metaTitle: 'WCAG 2.5.8 Hedef Boyutu (Minimum) — Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.8 Hedef Boyutu (Minimum) kriterini nasıl karşılayacağınızı öğrenin. Etkileşimli hedeflerin en az 24x24 CSS piksel olmasını sağlama rehberi.',
      },
    },
  },
]

export default rules
