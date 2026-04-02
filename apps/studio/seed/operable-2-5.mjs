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
      tr: 'Isaretci Hareketleri',
    },

    description: {
      en: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
      tr: 'Coklu nokta veya yol tabanli hareketler kullanan tum islevler, bu hareketler temel olmadigi surece, yol tabanli hareket gerektirmeyen tek bir isaretci ile calistirilamalidir.',
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
          'WCAG 2.5.1, coklu nokta hareketlerine (iki parmakla sikistirarak yakinlastirma gibi) veya yol tabanli hareketlere (kayma veya sekil cizme gibi) dayanan her islevin, belirli bir yol gerektirmeyen tek isaretci eylemiyle de calistirilamasini gerektirir. Basit bir tiklama, dokunma veya uzun basma alternatif olarak sunulmalidir.'
        ),
        p(
          'Bu kriter karmasik hareketlerin kullanimini yasaklamaz. Yalnizca tek isaretci alternatifinin var olmasini zorunlu kilar. Ornegin, sikistirarak yakinlastirmayi destekleyen bir harita, ekran uzerinde yakinlastirma dugmeleri de sunmalidir. Kayma hareketine yanit veren bir slayt gosterisi, onceki/sonraki ok dugmeleri icermelidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Motor engelli kullanicilar, isaretciyi bas takip cihazi, goz takip sistemi veya tek anahtarli tarama cihazi araciligiyla kullanabilir — bunlarin hicbiri coklu nokta veya yol tabanli hareketleri gerceklestiremez. Uzuv farkliligi, titreme veya sinirli el becerisi olan kullanicilar yalnizca basit bir dokunma veya tiklama yapabilir.'
        ),
        p(
          'Engeli olmayan kullanicilar da tek isaretci alternatiflerinden yararlanir. Toplu tasimada telefonu tek eliyle tutan bir kullanici iki parmak hareketini kolayca gerceklestiremez. Alternatifler sunmak, giris yeteneklerinden bagimsiz olarak islevselligin kullanilabilir olmasini saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Isaretci hareketi alternatiflerinin dogrulanmasi, tek isaretci eylemlerinin coklu nokta veya yol tabanli hareketlerle ayni sonuclari elde edip edemedigini onaylamak icin manuel test gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Kayma, sikistirma, dondurme veya cok parmakli hareketlere yanit veren tum etkilesimli ozellikleri belirleyin.'),
        numbered('Her hareket odakli ozellik icin yalnizca tek dokunma veya tiklamayla calistirmayi deneyin.'),
        numbered('Alternatif olarak ekran uzerinde kontrollerin (dugmeler, kaydiricilar, +/- kontrolleri) mevcut oldugundan emin olun.'),
        numbered('Yalnizca tek nokta eylemleri uretebilen yardimci teknoloji isaretci emulatdrleriyle test edin.'),
        numbered('Dokunmatik cihazlarda, tek bir parmagin belirli bir hareket yolu gerektirmeden tum sonuclara ulasabildigini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Her coklu nokta veya yol tabanli hareket icin ekran uzerinde kontrol alternatifleri saglayin. Asagida yaygin kaliplar yer almaktadir.'),

        heading('Harita yakinlastirma — yanlis uygulama', 'h3'),
        code(
          '<!-- Yalnizca sikistirarak yakinlastirma, tek isaretci alternatifi yok -->\n<div id="harita"\n  ontouchstart="sikistirmaBaslat(event)"\n  ontouchmove="sikistirmaIzle(event)">\n</div>',
          'html'
        ),

        heading('Harita yakinlastirma — dogru uygulama', 'h3'),
        code(
          '<div id="harita">\n  <!-- Sikistirarak yakinlastirma kullananlar icin hala calisir -->\n</div>\n<div class="harita-kontrolleri">\n  <button onclick="yakinlastir()" aria-label="Yakinlastir">+</button>\n  <button onclick="uzaklastir()" aria-label="Uzaklastir">−</button>\n</div>',
          'html'
        ),

        heading('Slayt gosterisi kaymasi — dugme alternatifleri', 'h3'),
        code(
          '// Dokunma kayma isleyicisi hala mevcut\nkarusel.addEventListener(\'pointerdown\', kaymaBaslat);\nkarusel.addEventListener(\'pointermove\', kaymaIzle);\nkarusel.addEventListener(\'pointerup\', kaymaBitir);\n\n// Dugmeler ile tek isaretci alternatifleri\noncekiBtn.addEventListener(\'click\', () => karusel.oncekineGit());\nsonrakiBtn.addEventListener(\'click\', () => karusel.sonrakineGit());',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Slayt gosterisi veya kaydirici gezintisi icin ok dugmeleri saglamadan yalnizca kayma hareketlerine dayanmak.'),
        bullet('Ozel harita veya gorsel bilesenlerinde yakinlastirma/uzaklastirma dugmeleri olmadan sikistirarak yakinlastirma uygulamak.'),
        bullet('Cok parmakli hareketleri (uc parmak dokunma, iki parmak dondurme) bir eylemi tetiklemenin tek yolu olarak kullanmak.'),
        bullet('Yol tabanli hareket kisayollari (geri gitmek icin L sekli cizme) sunup daha basit bir geri dugmesi alternatifi saglamamak.'),
        bullet('Tum kullanicilarin liste ogelerinde alternatif menu olmadan kaydir-sil veya kaydir-goster eylemlerini yapabilecegini varsaymak.'),
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
        metaTitle: 'WCAG 2.5.1 Isaretci Hareketleri — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.1 Isaretci Hareketleri kriterini nasil karsilayacaginizi ogrenin. Coklu nokta ve yol tabanli hareketler icin tek isaretci alternatifleri saglama rehberi.',
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
      tr: 'Isaretci Iptali',
    },

    description: {
      en: 'For functionality that can be operated using a single pointer, at least one of the following is true: the down-event is not used, the action is completed on the up-event with an ability to abort or undo, or the up-event reverses any outcome of the down-event.',
      tr: 'Tek bir isaretci ile calistirilailen islevler icin su kosullardan en az biri saglanmalidir: asagi olay kullanilmamali, eylem yukari olayda tamamlanmali ve iptal veya geri alma mumkun olmali, ya da yukari olay asagi olayin sonucunu geri almalidir.',
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
          'WCAG 2.5.2, kontrollerin yanlislikla etkinlestirilmesini ele alir. Kullanicilar bir isaretci (fare, dokunmatik, kalem) ile etkilesime girdiginde, eylem yalnizca asagi olayda (mousedown, touchstart, pointerdown) tetiklenmemelidir. Bunun yerine eylem yukari olayda (mouseup, touchend, pointerup) tamamlanmali veya iptal ya da geri alma yolu saglanmalidir.'
        ),
        p(
          'Kriter dort kabul edilebilir yaklasim belirtir: eylemi yurutmek icin asagi olayi kullanmamak; eylemi yukari olayda tamamlamak; kullanicilarin birakmadan once isaretciyi hedeften uzaklastirabilecegi bir iptal mekanizmasi saglamak; veya eylem tamamlandiktan sonra bir geri alma mekanizmasi sunmak.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Motor engelli kullanicilar siklikla yanlis hedefe yanlislikla dokunur veya tiklar. Eylemler isaretci-asagi aninda tetiklenirse, hatayi duzeltme firsati olmaz. Eylemi isaretci-yukari anina erteleyerek kullanicilar parmak veya imleclerini hedeften cekerek eylemi iptal edebilir.'
        ),
        p(
          'Bu kalip, cogu isletim sistemi ve tarayicinin yerel davranisini yansitir. Standart HTML dugmeleri ve baglantilar zaten tiklamada (asagi-sonra-yukari dizisi) etkinlesir, bu nedenle bu kriter esas olarak mousedown veya touchstart olaylarina baglanan ozel JavaScript etkilesimlerini etkiler.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Isaretci iptali icin otomatik axe-core kurali bulunmamaktadir. Test, eylemlerin yalnizca isaretci-asagi ile tetiklenmedigini ve kullanicilarin birakmadan once isaretciyi hedeften uzaklastirarak iptal edebildigini dogrulamak icin manuel etkilesim gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Etkilesimli ogelerde birakmadan basin ve tutun (mousedown/touchstart).'),
        numbered('Tutarken isaretciyi ogeden uzaklastirin, sonra birakin. Hicbir eylemin tetiklenmedigini dogrulayin.'),
        numbered('Ogeye normal sekilde basin ve birakin, eylemin yukari olayda hala calistigini onaylayin.'),
        numbered('Kod tabaninda dogrudan eylem tetikleyen mousedown, touchstart ve pointerdown olay dinleyicilerini arayin.'),
        numbered('Asagi olaylarda tetiklenen eylemlerin bir geri alma mekanizmasi veya iptal yolu oldugunu dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Eylemleri tetiklemek icin asagi olaylar yerine yukari olaylar kullanin. Yaygin kaliplar asagidadir.'),

        heading('Tiklama isleyicisi — yanlis uygulama', 'h3'),
        code(
          '// Iptal yolu olmadan isaretci-asagi ile eylemi tetikler\nbutton.addEventListener(\'pointerdown\', (e) => {\n  ogeySil(e.target.dataset.id);\n});',
          'javascript'
        ),

        heading('Tiklama isleyicisi — dogru uygulama', 'h3'),
        code(
          '// Click olayi (yukari-olay) kullanir — birakmadan once\n// isaretciyi hedeften uzaklastirarak iptal etmeye izin verir\nbutton.addEventListener(\'click\', (e) => {\n  ogeySil(e.target.dataset.id);\n});\n\n// Veya isabet testi dogrulamasiyla pointerup kullanma\nbutton.addEventListener(\'pointerup\', (e) => {\n  const hedef = document.elementFromPoint(e.clientX, e.clientY);\n  if (hedef === button || button.contains(hedef)) {\n    ogeySil(button.dataset.id);\n  }\n});',
          'javascript'
        ),

        heading('Iptal mekanizmasi ile dokunma olaylari', 'h3'),
        code(
          'let aktifHedef = null;\n\nelement.addEventListener(\'pointerdown\', (e) => {\n  aktifHedef = e.target;\n  e.target.classList.add(\'basilmis\'); // Yalnizca gorsel geri bildirim\n});\n\nelement.addEventListener(\'pointerup\', (e) => {\n  const birakilan = document.elementFromPoint(e.clientX, e.clientY);\n  if (birakilan === aktifHedef) {\n    eylemiGerceklestir(aktifHedef); // Yukari olayda eylem\n  }\n  aktifHedef?.classList.remove(\'basilmis\');\n  aktifHedef = null;\n});',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Yikici eylemleri (silme, gonderme) mousedown veya touchstart olaylarina baglamak.'),
        bullet('Kullanicinin iptal etmesine izin vermeden pointerdown ile hemen yeni bir sayfaya yonlendirmek.'),
        bullet('Ozel surukle-birak uygulamalarinda birakma eylemini pointerup yerine pointerdown ile gerceklestirmek.'),
        bullet('touchstart ile form gondermesini tetikleyerek kullanicilarin iptal etmek icin parmaginiptal dugmesinden kaydirmasini engellemek.'),
        bullet('Satin alma veya silme gibi kritik eylemler icin HTML niteliklerinde onmousedown kullanmak.'),
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
        metaTitle: 'WCAG 2.5.2 Isaretci Iptali — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.2 Isaretci Iptali kriterini nasil karsilayacaginizi ogrenin. Eylemlerin yukari olaylarda tetiklenmesi ve kazara etkinlestirmelerin iptal edilmesi rehberi.',
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
      tr: 'Isimdeki Etiket',
    },

    description: {
      en: 'For user interface components with labels that include text or images of text, the accessible name contains the text that is presented visually.',
      tr: 'Metin veya metin gorselleri iceren etiketlere sahip kullanici arayuzu bilesenleri icin, erisilebilir ad gorsel olarak sunulan metni icermelidir.',
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
          'WCAG 2.5.3, bir kullanici arayuzu bileseninin erisilebilir adinin (yardimci teknolojiye sunulan ad) gorsel metin etiketini bir alt dize olarak icermesini gerektirir. Bir dugme gorsel olarak "Ara" gosteriyorsa, erisilebilir adi "Ara" kelimesini icermelidir. Erisilebilir ad daha uzun olabilir, ancak gorsel metin icinde yer almalidir.'
        ),
        p(
          'Bu kriter, sesli kontrol kullanicilarinin gorsel etiketi soyleyerek kontrolleri etkinlestirmesini saglar. Gorsel etiket "Gonder" diyorsa ancak erisilebilir ad "Form verilerini ilet" ise, "Gonder tikla" diyen bir kullanici eslestirme bulamaz.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Konusma tanima kullanicilari, gorsel kontrollerin adlarini soyleyerek web sayfalariyla etkilesir. Erisilebilir ad gorsel etiketle eslesmediginde, bu kullanicilar kontrolleri guvenilir sekilde etkinlestiremez. "Ara" etiketli bir dugme gorur ve "Ara tikla" derler, ancak erisilebilir ad farkli oldugu icin komut basarisiz olur.'
        ),
        p(
          'Bu kriter ayni zamanda ekrani gorebilen ekran okuyucu kullanicilar icin de yardimci olur. Gorsel etiket "Devam" diyorsa ancak ekran okuyucu "Sonraki adima gec" diye duyurursa, goren ekran okuyucu kullanicilari duydukari ile gordukleri arasindaki uyumsuzluk nedeniyle karisiklik yasarlar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'axe-core, 2.5.3 icin belirli bir eslestirmis kurala sahip olmasa da bazi uygulamalarda label-content-name-mismatch kurali, gorsel metne sahip ogelerin erisilebilir adinin bu metni icerdigini kontrol eder. Manuel dogrulama yine de onerilir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Gorsel metin etiketlerine sahip tum etkilesimli kontrolleri (dugmeler, baglantilar, etiketli form girisleri) belirleyin.'),
        numbered('Hesaplanan erisilebilir adi okumak icin bir tarayici erisilebilirlik denetcisi (Chrome DevTools Erisilebilirlik paneli) kullanin.'),
        numbered('Gorsel metnin erisilebilir ad dizesi icinde gorundugunu dogrulayin.'),
        numbered('Gorsel etiketi soyleyerek bir konusma tanima araciyla (Dragon, macOS/iOS Sesli Kontrol) test edin.'),
        numbered('aria-label veya aria-labelledby degerlerinin gorsel metni tamamen degistirmek yerine icerdigini kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Erisilebilir adin gorsel metni icerdiginden emin olun. Yaygin kaliplar asagidadir.'),

        heading('Dugme etiketleri — yanlis uygulama', 'h3'),
        code(
          '<!-- Gorsel metin "Ara" ama erisilebilir ad "Ogeleri bul" -->\n<button aria-label="Ogeleri bul">Ara</button>\n\n<!-- Gorsel metin "Kapat" ama erisilebilir ad "Diyalogu kapat" -->\n<button aria-label="Diyalogu reddet">\n  <span>Kapat</span>\n</button>',
          'html'
        ),

        heading('Dugme etiketleri — dogru uygulama', 'h3'),
        code(
          '<!-- Erisilebilir ad gorsel metinle eslesiyor -->\n<button>Ara</button>\n\n<!-- Erisilebilir ad gorsel metni iceriyor -->\n<button aria-label="Urunleri ara">Ara</button>\n\n<!-- Kapat dugmesi eslesen erisilebilir adla -->\n<button aria-label="Diyalogu kapat">\n  <span>Kapat</span>\n</button>',
          'html'
        ),

        heading('Form girisi etiketleri', 'h3'),
        code(
          '<!-- Yanlis: aria-label gorsel etiket metnini icermiyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" aria-label="Elektronik posta girin">\n\n<!-- Dogru: celiskili aria-label yok, yerel etiket kullaniliyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta">\n\n<!-- Dogru: aria-label gorsel etiket metnini iceriyor -->\n<label for="eposta">E-posta adresi</label>\n<input id="eposta" aria-label="E-posta adresi (zorunlu)">',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Gorsel metni tamamen farkli ifadelerle degistiren aria-label kullanmak.'),
        bullet('Gorsel etiket yerine gizli metne isaret eden aria-labelledby saglamak.'),
        bullet('Gorsel etiketten farkli metin iceren ve bazi tarayicilarda erisilebilir adi gecersiz kilan bir title niteligi eklemek.'),
        bullet('DOM metin iceriginden farkli metni gorsel olarak gosteren CSS kullanmak (ornegin, algilanan etiketi degistiren text-transform veya ::before sahte ogeleri).'),
        bullet('aria-label in bitisik gorsel ipucu veya metinden farkli terminoloji kullandigi simge dugmeleri.'),
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
        metaTitle: 'WCAG 2.5.3 Isimdeki Etiket — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.3 Isimdeki Etiket kriterini nasil karsilayacaginizi ogrenin. Erisilebilir adlarin gorsel metin etiketlerini icermesi icin rehber.',
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
      tr: 'Hareket Etkinlestirme',
    },

    description: {
      en: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components, and responding to the motion can be disabled to prevent accidental actuation.',
      tr: 'Cihaz hareketi veya kullanici hareketi ile calistirilailen islevler, kullanici arayuzu bilesenleri ile de calistirilabilmeli ve kazara etkinlestirmeyi onlemek icin harekete yanit verme devre disi birakilabilmelidir.',
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
          'WCAG 2.5.4, cihaz hareketi (egme, sallama veya cihazi hareket ettirme) veya kullanici hareketi (kamera tarafindan algilanan hareketler) tarafindan tetiklenen her islevin, dugmeler, baglantilar veya form kontrolleri gibi standart kullanici arayuzu bilesenleri araciligiyla da kullanilabilir olmasini gerektirir. Kullanicilar ayrica kazara etkinlestirmeyi onlemek icin hareket tabanli yaniti devre disi birakabilmelidir.'
        ),
        p(
          'Ornegin, telefonu sallamak "geri al" eylemini tetikliyorsa, ekranda bir geri al dugmesi de olmalidir. Cihazi egmek icerigi kaydiriyorsa, standart kaydirma kontrolleri de mevcut olmalidir. Tek istisna, hareketin islev icin zorunlu olmasi durumudur (ornegin, adim sayan bir pedometre).'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Cihazlarini tekerlekli sandalyelere monte eden kullanicilar bunlari egip sallayamaz. Titreme veya istemsiz hareketleri olan kullanicilar hareket tabanli eylemleri yanlislikla tetikleyebilir. Sinirli hareketliligi olan kullanicilar gerekli fiziksel hareketi hic gerceklestiremeyebilir.'
        ),
        p(
          'Ayrica bazi kullanicilar cihazlari sabit konumlarda kullanir — masa standinda, arabada monte edilmis veya yardimci cihaz tutucusuna sabitlenmis. Hareket tabanli islevsellik, arayuz tabanli bir alternatif olmadan bu kullanicilar icin tamamen erisilemez olurdu.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Hareket tabanli etkilesimlerin tespiti, DeviceMotion, DeviceOrientation veya kamera tabanli hareket algilama API lerinin kullanimlarini belirlemek icin manuel kod incelemesi ve test gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Uygulamayi cihaz hareketine (sallama, egme, dondurme) veya kullanici hareketine (kamera hareketleri) yanit veren ozellikler icin inceleyin.'),
        numbered('Her hareket tetikli ozellik icin esdeger bir ekran uzerinde kontrolun var oldugundan emin olun.'),
        numbered('Hareket tabanli yanitlari devre disi birakmak icin bir ayar veya tercihin mevcut oldugundan emin olun.'),
        numbered('Kod tabaninda DeviceMotionEvent, DeviceOrientationEvent ve kamera/hareket API lerini arayin.'),
        numbered('Cihazi sabit tutarak test edin ve tum islevselligin UI kontrolleri araciligiyla hala erisilebilir oldugundan emin olun.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Hareket tabanli ozellikler icin UI kontrol alternatifleri ve hareket algilamayi devre disi birakmanin bir yolunu saglayin.'),

        heading('Sallayarak geri alma — yanlis uygulama', 'h3'),
        code(
          '// Yalnizca sallama hareketi geri almayi tetikler, UI alternatifi yok\nwindow.addEventListener(\'devicemotion\', (e) => {\n  const ivme = e.accelerationIncludingGravity;\n  if (Math.abs(ivme.x) > 15 || Math.abs(ivme.y) > 15) {\n    sonEylemiGeriAl();\n  }\n});',
          'javascript'
        ),

        heading('Sallayarak geri alma — dogru uygulama', 'h3'),
        code(
          '// Tercih kontrolu ile hareket algilama\nlet hareketEtkin = kullaniciTercihiniAl(\'hareketEtkin\', true);\n\nif (hareketEtkin) {\n  window.addEventListener(\'devicemotion\', (e) => {\n    const ivme = e.accelerationIncludingGravity;\n    if (Math.abs(ivme.x) > 15 || Math.abs(ivme.y) > 15) {\n      sonEylemiGeriAl();\n    }\n  });\n}\n\n// UI alternatifi her zaman mevcut\ngeriAlBtn.addEventListener(\'click\', () => {\n  sonEylemiGeriAl();\n});',
          'javascript'
        ),

        heading('Hareket ozellikleri icin ayar gecisi', 'h3'),
        code(
          '<fieldset>\n  <legend>Hareket tercihleri</legend>\n  <label>\n    <input type="checkbox" id="hareket-gecisi" checked>\n    Sallayarak geri al ve egerek kaydir ozelliklerini etkinlestir\n  </label>\n</fieldset>\n\n<script>\n  document.getElementById(\'hareket-gecisi\')\n    .addEventListener(\'change\', (e) => {\n      kullaniciTercibiniAyarla(\'hareketEtkin\', e.target.checked);\n      if (!e.target.checked) {\n        hareketDinleyicileriniDevreDisiiBirak();\n      } else {\n        hareketDinleyicileriniEtkinlestir();\n      }\n    });\n</script>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Ekran uzerinde dugme olmadan sallayarak geri almayi tek geri alma mekanizmasi olarak uygulamak.'),
        bullet('Standart kaydirma cubuklari veya sayfalama olmadan icerik gezintisi icin egerek kaydirmayi kullanmak.'),
        bullet('Kamera tabanli hareket kontrollerini (el sallayarak kapatma, bas sallayarak onaylama) dugme alternatifleri olmadan sunmak.'),
        bullet('Hareket algilamayi devre disi birakmanin yolunu saglamamak, titremeli kullanicilarin eylemleri yanlislikla tetiklemesine neden olmak.'),
        bullet('Hareket tabanli ozelliklerin sabit konumlara monte edilmis cihazlar icin tamamen kullanilamaz oldugunu unutmak.'),
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
        metaTitle: 'WCAG 2.5.4 Hareket Etkinlestirme — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.4 Hareket Etkinlestirme kriterini nasil karsilayacaginizi ogrenin. Hareket tetikli ozellikler icin UI alternatifleri saglama rehberi.',
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
      tr: 'Hedef Boyutu (Gelismis)',
    },

    description: {
      en: 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels, except when an equivalent alternative target is available, the target is inline in text, the size is user-agent controlled, or the presentation is essential.',
      tr: 'Isaretci girisleri icin hedefin boyutu en az 44x44 CSS piksel olmalidir; esdeger bir alternatif hedef mevcut oldugunda, hedef metin icinde satirici oldugunda, boyut kullanici ajani tarafindan kontrol edildiginde veya sunum zorunlu oldugunda istisna uygulanir.',
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
          'WCAG 2.5.5, tum etkilesimli hedeflerin (dugmeler, baglantilar, form kontrolleri, ozel etkilesimli ogeler) en az 44x44 CSS piksel boyutunda olmasini gerektirir. Bu, gelismis (AAA) gerekliliktir — WCAG 2.2 de AA Duzeyinde tanimlanan minimum hedef boyutu gereksiniminin (2.5.8) daha siki bir versiyonudur.'
        ),
        p(
          'Esdeger kontroller (daha buyuk bir alternatif saglandiginda), metin icindeki satirici baglantilar, boyutu kullanici ajani tarafindan belirlenen hedefler (yerel onay kutulari gibi) ve belirli boyutun iletilen bilgi icin zorunlu oldugu hedefler icin istisnalar mevcuttur.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Kucuk dokunma hedefleri, mobil cihazlarda en yaygin kullanilabilirlik engellerinden biridir. Motor engelli, titremeli veya sinirli ince motor kontrolune sahip kullanicilar kucuk hedeflere dogru dokunmakta zorlanir. Yasli yetiskinler yaslanmanin dogal bir parcasi olarak azalmis hassasiyet yasarlar. Engeli olmayan kullanicilar bile telefonu tek eliyle veya hareket halindeyken kucuk hedeflere siklikla yanlis dokunurlar.'
        ),
        p(
          'MIT Dokunma Laboratuvari nin arastirmalari, yetiskin parmak ucu genisliginin yaklasik 10mm oldugunu ve bunun standart yogunlukta kabaca 44 CSS piksele karsilik geldigini gostermistir. Bu esigin altindaki hedefler, tum kullanicilar icin hata oranlarini onemli olcude arttirir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          '44px gelismis hedef boyutu icin ozel otomatik axe-core kurali bulunmamaktadir. axe-core deki target-size kurali WCAG 2.5.8 (AA Duzeyi) den gelen 24px minimumunu kontrol eder. 44px esigi icin manuel olcum veya ozel arac gerektir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Etkilesimli ogelerin hesaplanan boyutunu incelemek icin tarayici DevTools kullanin.'),
        numbered('Hem genislik hem de yukseklik olcun — her ikisi de en az 44 CSS piksel olmalidir.'),
        numbered('Yalnizca gorunen icerik boyutunu degil, padding ve tiklanabilir alaninida kontrol edin.'),
        numbered('Yalnizca dokunma emulasyonuyla masaustu tarayicilarda degil, gercek dokunmatik cihazlarda test edin.'),
        numbered('Simge dugmeleri, kapatma dugmeleri, sayfalama baglantilari ve yogun duzenlerdeki form kontrollerine ozellikle dikkat edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Etkilesimli hedeflerin 44px minimumunu karsilamasini saglamak icin CSS min-width ve min-height kullanin.'),

        heading('Dugme boyutlandirma — CSS yaklasimi', 'h3'),
        code(
          '/* Tum dugmelerin 44px minimumunu karsiladigini saglayin */\nbutton,\n[role="button"],\na.btn {\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px 16px;\n}\n\n/* Simge dugmeleri acik boyutlandirma gerektirir */\n.simge-dugme {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px;\n}',
          'css'
        ),

        heading('Padding ile tiklanabilir alani genisletme', 'h3'),
        code(
          '/* Genisletilmis dokunma alanina sahip kucuk gorsel hedef */\n.kapat-dugmesi {\n  /* Gorsel boyut: 16x16 simge */\n  width: 16px;\n  height: 16px;\n  /* Padding ile genisletilmis dokunma alani */\n  padding: 14px;\n  /* Toplam tiklanabilir alan: 44x44 */\n  box-sizing: content-box;\n  cursor: pointer;\n}\n\n/* Veya duzeni korumak icin negatif margin kullanin */\n.kompakt-kapat {\n  min-width: 44px;\n  min-height: 44px;\n  margin: -14px;\n  padding: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}',
          'css'
        ),

        heading('Gezinme baglanti araliklari', 'h3'),
        code(
          '<nav aria-label="Sayfalama">\n  <ul class="sayfalama">\n    <li><a href="/sayfa/1" class="sayfa-baglantisi">1</a></li>\n    <li><a href="/sayfa/2" class="sayfa-baglantisi">2</a></li>\n    <li><a href="/sayfa/3" class="sayfa-baglantisi">3</a></li>\n  </ul>\n</nav>\n\n<style>\n.sayfa-baglantisi {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 44px;\n  min-height: 44px;\n  text-decoration: none;\n}\n</style>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Genisletilmis dokunma alani olmadan yalnizca 24px veya 32px boyutundaki simge dugmeleri (kapat, menu, ayarlar).'),
        bullet('Cok kucuk ve birbirine cok yakin olan, yanlis dokunmalara neden olan sayfalama baglantilari.'),
        bullet('Tiklanabilir alani genisletmeden tarayici varsayilan boyutuna dayanan form onay kutulari ve radyo dugmeleri.'),
        bullet('Dokunma hedefini genisletmek icin padding eklemek yerine tiklanabilir alan icin yalnizca simge boyutunu kullanmak.'),
        bullet('Dogruca hedeflenmesi zor olan kucuk ve birbirine yakin dugmelere sahip yogun arac cubuklari.'),
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
        metaTitle: 'WCAG 2.5.5 Hedef Boyutu (Gelismis) — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.5 Hedef Boyutu (Gelismis) kriterini nasil karsilayacaginizi ogrenin. Etkilesimli hedeflerin en az 44x44 CSS piksel olmasini saglama rehberi.',
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
      tr: 'Eszamani Giris Mekanizmalari',
    },

    description: {
      en: 'Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure security, or required to respect user settings.',
      tr: 'Web icerigi, kisitlama zorunlu olmadikca, guvenlik icin gerekli olmadikca veya kullanici ayarlarina uyum icin gerekli olmadikca, platformda mevcut giris yontemlerinin kullanimini kisitlamamalidir.',
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
          'WCAG 2.5.6, platform birden fazla modaliteyi desteklediginde web iceriginin kullanicilari tek bir giris modalitesiyle sinirlandirmamasini gerektirir. Bir kullanici dokunmatik, fare, klavye, kalem veya sesle etkilesim kurabiliyorsa, web icerigi hangi giris yontemlerinin kullanilabilir oldugunu yapay olarak sinirlandirmamalidir.'
        ),
        p(
          'Kullanicilar tek bir oturum sirasinda siklikla giris yontemleri arasinda gecis yapar. Bir kisi kaydirmak icin dokunmatik ekrani kullanabilir, yazmak icin Bluetooth klavyeye gecebilir ve hassas secimler icin fareyi kullanabilir. Icerik tek bir giris yontemini varsaymamali veya zorundaa birakmamalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Bircok yardimci teknoloji kullanicisi birden fazla giris mekanizmasina bagimlidir. Sinirli el hareketliligi olan bir kullanici bazi eylemler icin agizla calistirilan bir kalem ve digerleri icin sesli kontrol kullanabilir. Girisi yalnizca dokunmatikla sinirlandirmak, klavye veya anahtar erisimi kullanicilarinin icerikle etkilesimini engellerdi.'
        ),
        p(
          'Engeli olmayan kullanicilar da duzenli olarak giris mekanizmalari arasinda gecis yapar. Dizustu bilgisayar kullanicilari dokunmatik yuzey ile klavye arasinda gecis yapar. Tablet kullanicilari dokunmatik ile bagli klavye arasinda gecis yapar. Giris modalitelerini kisitlamak herkes icin gereksiz engeller olusturur.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Giris modalitesi kisitlamalarini tespit etmek, birden fazla giris cihazi ile manuel test ve belirli giris turlerini devre disi birakan veya engelleyen JavaScript kodunu belirlemek icin kod incelemesi gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Ayni sisteme birden fazla giris cihazi (klavye, fare, dokunmatik ekran) baglayin.'),
        numbered('Tum etkilesimli gorevleri tamamlamak icin her giris yontemini bagimsiz olarak kullanmayi deneyin.'),
        numbered('Gorev sirasinda giris yontemleri arasinda gecis yapin ve islevselligin korundugundan emin olun.'),
        numbered('Kod tabaninda giris turunu tespit eden ve alternatif giris yontemlerini devre disi birakan kodu arayin.'),
        numbered('Klavye odakli UI ogelerini tamamen gizleyen (pointer: coarse) gibi medya sorgularini kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Giris modalitelerini kisitlamaktan kacinin. Tum mevcut giris mekanizmalari arasinda calisan etkilesimler tasarlayin.'),

        heading('Giris algilama — yanlis uygulama', 'h3'),
        code(
          '// Yanlis: Dokunmatik algilandiginda fare olaylarini devre disi birakir\nif (\'ontouchstart\' in window) {\n  document.body.classList.add(\'dokunmatik-cihaz\');\n  // Tum fareyle gezinme ve fare etkilesimleri CSS ile devre disi birakildi\n}\n\n// Yanlis: Dokunmatik cihazlarda klavye destegini kaldirir\nif (navigator.maxTouchPoints > 0) {\n  document.removeEventListener(\'keydown\', klavyeIsle);\n}',
          'javascript'
        ),

        heading('Giris algilama — dogru uygulama', 'h3'),
        code(
          '// Dogru: Tum giris turleri arasinda calisan pointer olaylari kullanin\nelement.addEventListener(\'pointerdown\', etkilesimiIsle);\nelement.addEventListener(\'pointerup\', etkilesimiIsle);\n\n// Dogru: Dokunmatik yeteneginden bagimsiz olarak klavye destegini koruyun\ndocument.addEventListener(\'keydown\', klavyeIsle);\n\n// Dogru: Islevsellik kaldirmadan UI yi uyarlayin\nif (matchMedia(\'(pointer: coarse)\').matches) {\n  dokunmaHedefleriniBuyut();\n  // Klavye gezintisi hala calisiyor\n}',
          'javascript'
        ),

        heading('Tum giris yontemlerini koruyan CSS', 'h3'),
        code(
          '/* Dogru: Fareyle gezinmeyi gereklilik degil iyilestirme olarak kullanin */\n.acilir-tetikleyici:hover + .acilir-menu,\n.acilir-tetikleyici:focus + .acilir-menu,\n.acilir-menu:hover,\n.acilir-menu:focus-within {\n  display: block;\n}\n\n/* Dogru: Fare ile de calisan dokunmatik dostu boyutlar */\n@media (pointer: coarse) {\n  .etkilesimli-oge {\n    min-height: 44px;\n    min-width: 44px;\n  }\n}\n\n/* Giris yonteminden bagimsiz olarak etkilesimli ogeleri erisilebilir tutun */\n.etkilesimli-oge {\n  min-height: 32px;\n  min-width: 32px;\n}',
          'css'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Dokunmatik destegi tespit edip fare veya klavye olay isleyicilerini devre disi birakmak.'),
        bullet('Alternatif saglamadan fareyle gezinme tetikli islevseligi tamamen kaldirmak icin (hover: none) gibi CSS medya sorgulari kullanmak.'),
        bullet('Tabletlerde arayuzu yalnizca dokunmatik moduna kilitleyerek bagli klavye veya farelerin kullanimini engellemek.'),
        bullet('Fiziksel klavye bagli olsa bile mobil gorunumlerde klavye gezintisini devre disi birakmak.'),
        bullet('Sag tiklama, klavye kisayollari veya diger ikincil giris mekanizmalarini engellemek icin JavaScript kullanmak.'),
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
        metaTitle: 'WCAG 2.5.6 Eszamani Giris Mekanizmalari — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.6 Eszamani Giris Mekanizmalari kriterini nasil karsilayacaginizi ogrenin. Web iceriginin birden fazla giris yontemini desteklemesi rehberi.',
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
      tr: 'Surukleme Hareketleri',
    },

    description: {
      en: 'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent.',
      tr: 'Surukleme hareketi kullanan tum islevler, surukleme zorunlu olmadikca veya islevsellik kullanici ajani tarafindan belirlenmedikce, suruklemesiz tek bir isaretci ile gerceklestirilebilmelidir.',
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
          'WCAG 2.5.7, surukleme hareketi gerektiren (basma, tutma ve isaretciyi hareket ettirme) her islevin, surukleme gerektirmeyen tek isaretci mekanizmasiyla da calistirilamasini gerektirir. Bu, surukle-birak, kaydirici ayarlamalari, siralanabilir listeler ve diger suruklemne bagli etkilesimler icin tiklama/dokunma alternatifleri saglamayi ifade eder.'
        ),
        p(
          'Surukleme hareketi, bir isaretci dugmesine basma (veya dokunma), asagi tutma ve yeni bir konuma hareket ettirmeyi icerir. Alternatif, ayni sonucu ayrik isaretci eylemleri araciligiyla saglamalidir — ornegin bir baslangic noktasina tiklama, sonra bir bitis noktasina tiklama veya artirma/azaltma dugmeleri kullanma.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Surukleme, hassas bir yol boyunca surdurulen isaretci temasi gerektirir ve bircok kullanici bunu gerceklestiremez. Titreme, sinirli kavrama gucu veya motor bozukluklari olan kullanicilar hareket ederken isaretci-asagi basincini surduroemyebilir. Goz takibi, bas takibi veya agiz cubuklari ile calisan kullanicilar genellikle surukleme islemlerini hic gerceklestiremez.'
        ),
        p(
          'Konusma tanima kullanicilari da surukleme etkilesimleriyle zorlanir cunku ses komutlari genellikle surekli surukleme hareketleri yerine ayrik tiklama/dokunma eylemlerini etkinlestirir. Suruklemesiz alternatifler saglamak, tum kullanicilarin motor yeteneklerinden bagimsiz olarak gorevleri tamamlayabilmesini saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Surukle bagli islevselligin tespiti, surukleme ile ilgili olaylari (dragstart, dragover, drop) veya isaretci hareket takibini kullanan ogeleri belirlemek icin manuel test ve kod incelemesi gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        numbered('Tum surukle-birak etkilesimlerini (siralanabilir listeler, dosya yukleme alanlari, kaydiricilar, kanban panolari, cizim tuvalileri) belirleyin.'),
        numbered('Her suruklenebilir ozellik icin ayni gorevi surukleme hareketi yapmadan tamamlamayi deneyin.'),
        numbered('Tiklama/dokunma tabanli alternatiflerin (dugmeler, menuler, giris alanlari) mevcut oldugundan emin olun.'),
        numbered('Surukleme islemlerinin klavye esdegerlerine sahip oldugunu dogrulamak icin yalnizca klavye gezintisiyle test edin.'),
        numbered('Surukleme islemleri gerceklestiremeyen yardimci teknoloji isaretci emulatorleri kullanin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Tum surukleme tabanli etkilesimler icin tek isaretci alternatifleri saglayin.'),

        heading('Siralanabilir liste — yalnizca surukleme (yanlis)', 'h3'),
        code(
          '<!-- Yeniden siralamak icin yalnizca surukle-birak, alternatif yok -->\n<ul id="siralanabilir">\n  <li draggable="true" ondragstart="surukle(event)">Oge 1</li>\n  <li draggable="true" ondragstart="surukle(event)">Oge 2</li>\n  <li draggable="true" ondragstart="surukle(event)">Oge 3</li>\n</ul>',
          'html'
        ),

        heading('Siralanabilir liste — dugme alternatifleriyle (dogru)', 'h3'),
        code(
          '<ul id="siralanabilir" role="list">\n  <li draggable="true">\n    <span>Oge 1</span>\n    <div class="siralama-kontrolleri">\n      <button aria-label="Oge 1 yukari tasi" onclick="yukariTasi(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Oge 1 asagi tasi" onclick="asagiTasi(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n  <li draggable="true">\n    <span>Oge 2</span>\n    <div class="siralama-kontrolleri">\n      <button aria-label="Oge 2 yukari tasi" onclick="yukariTasi(this)">\n        &#x25B2;\n      </button>\n      <button aria-label="Oge 2 asagi tasi" onclick="asagiTasi(this)">\n        &#x25BC;\n      </button>\n    </div>\n  </li>\n</ul>',
          'html'
        ),

        heading('Giris alternatifi ile kaydirici', 'h3'),
        code(
          '<!-- Sayi girisi alternatifi ile suruklenebilir kaydirici -->\n<div class="kaydirici-kapsayici">\n  <label for="fiyat-kaydirici">Maksimum fiyat</label>\n  <input type="range" id="fiyat-kaydirici" min="0" max="500"\n    value="250" step="10">\n  <input type="number" id="fiyat-girisi" min="0" max="500"\n    value="250" step="10" aria-label="Maksimum fiyat degeri">\n</div>\n\n<script>\n  const kaydirici = document.getElementById(\'fiyat-kaydirici\');\n  const giris = document.getElementById(\'fiyat-girisi\');\n  kaydirici.addEventListener(\'input\', () => giris.value = kaydirici.value);\n  giris.addEventListener(\'input\', () => kaydirici.value = giris.value);\n</script>',
          'html'
        ),

        heading('Dosya yukleme — dugme alternatifi ile birakma alani', 'h3'),
        code(
          '<div class="birakma-alani"\n  ondragover="event.preventDefault()"\n  ondrop="birakmaIsle(event)">\n  <p>Yuklemek icin dosyalari buraya surukleyin</p>\n  <!-- Suruklemesiz alternatif -->\n  <label for="dosya-yukleme" class="yukleme-dugmesi">\n    Veya dosya secmek icin tiklayin\n  </label>\n  <input type="file" id="dosya-yukleme" multiple\n    onchange="dosyalariIsle(this.files)" class="gorsel-gizli">\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Yalnizca surukle-birak yeniden siralamayi destekleyen, dugme veya menu alternatifi olmayan siralanabilir listeler veya kanban panolari.'),
        bullet('Yalnizca tutamaci surukleyerek yanit veren, klavye ok tusu destegi veya sayisal giris olmayan ozel kaydiricilar.'),
        bullet('Dosya secici dugmesi olmadan yalnizca surukle-birak kabul eden dosya yukleme alanlari.'),
        bullet('Koordinat giris alanlari olmadan surukleme gerektiren gorsel kirpma veya konumlandirma arayuzleri.'),
        bullet('Surukleyemeyen kullanicilar icin yapilandirilmis giris alternatifi olmayan cizim veya aciklama araclari.'),
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
        metaTitle: 'WCAG 2.5.7 Surukleme Hareketleri — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.7 Surukleme Hareketleri kriterini nasil karsilayacaginizi ogrenin. Surukle-birak etkilesimleri icin tek isaretci alternatifleri saglama rehberi.',
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
      tr: 'Isaretci girisleri icin hedefin boyutu en az 24x24 CSS piksel olmalidir; esdeger bir kontrol mevcut oldugunda, hedef satirici oldugunda, boyut kullanici ajani tarafindan belirlendiginde veya sunum zorunlu oldugunda istisna uygulanir.',
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
          'WCAG 2.5.8, tum etkilesimli ogeler icin 24x24 CSS piksel minimum hedef boyutu belirler. Bu, WCAG 2.2 de tanimlanan AA Duzeyi gereksinimidir ve kullanilabilirlik ile tasarim esnekligi arasinda denge saglayan pratik bir minimum sunar. Kriter 2.5.5 teki gelismis 44px hedef, AAA onerisi olarak kalir.'
        ),
        p(
          '24px minimum, isabet bolgesini genisleten herhangi bir padding dahil olmak uzere tum tiklanabilir/dokunulabilir alana uygulanir. Bir hedef 24px den kucukse, hedefin merkezindeki 24px cemberin baska herhangi bir hedefle cakismamasi icin bitisik hedeflerden yeterli araliga sahip olmalidir. Bu, "dengelemeli kucuk hedef" istisnasi olarak bilinir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          '24px minimum hedef boyutu, motor engelli kullanicilarin guvenilir sekilde etkinlestirebilecegi en kucuk makul hedef oldugunu gosteren arastirmalara dayanilarak secilmistir. 44px optimum olmakla birlikte, 24px minimum bazi arayuz kaliplarinin kompakt duzenler gerektirdigini kabul eder. Aralik gereksinimi, kucuk hedeflerin bile yanlislikla komsularini vurmadan etkinlestirilebilmesini saglar.'
        ),
        p(
          'Bu kriter, sayfadaki her etkilesimli oge icin gecerli oldugu icin WCAG 2.2 eklemelerinin en genis etkiye sahip olanidir. Gezinme baglantilari, arac cubugu dugmeleri, form kontrolleri, sayfalama, etiket listeleri ve satirici eylemler 24px esigini karsilamali veya yeterli aralik kullanmalidir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('target-size — Etkilesimli ogelerin minimum 24x24 CSS piksel hedef boyutunu karsilamasini veya bitisik hedeflerden yeterli araliga sahip olmasini saglar. Bu kural tiklanabilir ogelerin sinir kutusunu kontrol eder ve komsulariyla cakisan kucuk hedefleri isaretler.'),

        heading('Nasil test edilir', 'h2'),
        numbered('axe-core veya axe DevTools calistirin — target-size kurali yeterli araligi olmayan 24x24 pikselden kucuk ogeleri isaretleyecektir.'),
        numbered('Etkilesimli ogelerin hesaplanan boyutunu (padding dahil) incelemek icin tarayici DevTools kullanin.'),
        numbered('24px den kucuk hedefler icin, bitisik hedeflerden araliklamanin en az 24px cakismayan bir bolge sagladigini dogrulayin.'),
        numbered('Kompakt UI kaliplarini kontrol edin: arac cubuklari, etiket listeleri, icerik haritasi baglantilari, sayfalama ve satirici eylemler.'),
        numbered('Kucuk hedeflerin yanlis etkinlestirme olmadan guvenilir sekilde dokunulabildgini dogrulamak icin dokunmatik cihazlarda test edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Etkilesimli ogelerin 24px minimumu karsilamasini veya yeterli aralik saglamasini saglamak icin CSS kullanin.'),

        heading('CSS ile minimum hedef boyutu', 'h3'),
        code(
          '/* Temel etkilesimli oge boyutlandirma */\nbutton,\na,\ninput,\nselect,\ntextarea,\n[role="button"],\n[role="link"],\n[role="tab"],\n[role="checkbox"],\n[role="radio"] {\n  min-width: 24px;\n  min-height: 24px;\n}',
          'css'
        ),

        heading('Minimum boyutu karsilayan simge dugmesi', 'h3'),
        code(
          '<!-- Yanlis: Genisletilmis hedef olmadan 16px simge -->\n<button class="simge-btn-kucuk">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="gorsel-gizli">Kapat</span>\n</button>\n\n<style>\n/* Yanlis: hedef yalnizca 16x16 */\n.simge-btn-kucuk {\n  padding: 0;\n  border: none;\n  background: none;\n}\n</style>\n\n<!-- Dogru: Genisletilmis tiklanabilir alana sahip 16px simge -->\n<button class="simge-btn">\n  <svg width="16" height="16" aria-hidden="true">...</svg>\n  <span class="gorsel-gizli">Kapat</span>\n</button>\n\n<style>\n/* Dogru: padding hedefi en az 24x24 e genisletir */\n.simge-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px;\n  border: none;\n  background: none;\n}\n</style>',
          'html'
        ),

        heading('Kompakt duzenler icin aralik yaklasimi', 'h3'),
        code(
          '/* Hedefler 24px den kucuk olmak zorundaysa,\n   aralarinda yeterli aralik saglayin */\n.etiket-listesi {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px; /* Kucuk etiketler arasi aralik */\n}\n\n.etiket {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 2px 8px;\n  font-size: 12px;\n}\n\n/* Satirici baglanti araligi */\n.satirici-eylemler a {\n  padding: 4px;\n  margin: 0 4px;\n  /* 16px metin uzerinde 4px padding ile 24px hedef saglar */\n}',
          'css'
        ),

        heading('Duyarli hedef boyutlandirma', 'h3'),
        code(
          '/* Hedef boyutu icin asamali iyilestirme */\n.eylem-dugmesi {\n  min-width: 24px;\n  min-height: 24px;\n  padding: 4px 8px;\n}\n\n/* Dokunmatik cihazlarda daha buyuk hedefler */\n@media (pointer: coarse) {\n  .eylem-dugmesi {\n    min-width: 44px;\n    min-height: 44px;\n    padding: 10px 16px;\n  }\n}',
          'css'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Tiklanabilir alani genisletmek icin padding olmadan kucuk simge dugmeleri (16px veya 20px).'),
        bullet('24px den kucuk baglantilara ve aralik telafisi olmayan yogun gezinme menuleri.'),
        bullet('Hedeflenmesi zor olan kucuk kapat/kaldir dugmelerine sahip etiket veya cip bilesenleri.'),
        bullet('Ozellikle mobil gorunum alanlarinda yetersiz yukseklikteki icerik haritasi baglantilari.'),
        bullet('Tiklanabilir etiket alanini genisletmeden 24px den kucuk stile sahip ozel onay kutulari veya radyo dugmeleri.'),
        bullet('Tiklanabilir alana katkida bulunan paddingi hesaba katmadan gorsel oge boyutuna dayanmak.'),
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
        metaTitle: 'WCAG 2.5.8 Hedef Boyutu (Minimum) — Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.5.8 Hedef Boyutu (Minimum) kriterini nasil karsilayacaginizi ogrenin. Etkilesimli hedeflerin en az 24x24 CSS piksel olmasini saglama rehberi.',
      },
    },
  },
]

export default rules
