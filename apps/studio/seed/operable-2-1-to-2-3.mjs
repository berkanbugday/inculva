import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ─── 2.1.1 Keyboard ─────────────────────────────────────────────────
  {
    criterionNumber: '2.1.1',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: ['scrollable-region-focusable', 'server-side-image-map'],
    tags: ['keyboard', 'focus', 'interaction'],

    title: {
      en: 'Keyboard',
      tr: 'Klavye',
    },

    description: {
      en: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
      tr: 'Icerigin tum islevselligi, bireysel tus vuruslari icin belirli zamanlamalar gerektirmeden bir klavye arayuzu araciligiyla calistirilamalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.1.1 requires that all functionality provided by the content must be operable through a keyboard interface. This means every interactive element — links, buttons, form fields, custom widgets, and media controls — must be reachable and activatable using only the keyboard. No functionality should depend exclusively on mouse-specific events like hover or drag.'
        ),
        p(
          'The criterion allows exceptions only when the underlying function requires analog, path-dependent input that fundamentally cannot be achieved with a keyboard (such as freehand drawing). However, most common web interactions — clicking, selecting, expanding, submitting — can and must work via keyboard. The criterion explicitly prohibits requiring specific timing for individual keystrokes.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Keyboard accessibility is the foundation of web accessibility. Users who are blind rely on screen readers that operate through keyboard commands. Users with motor disabilities may use switch devices, sip-and-puff systems, or voice input that all translate to keyboard events. Even power users and developers frequently prefer keyboard navigation for speed and efficiency.'
        ),
        p(
          'When interactive elements are not keyboard accessible, entire groups of users are completely locked out of functionality. This is not a minor inconvenience — it is a total barrier. A button that only responds to mouse clicks is invisible to a keyboard user, and a drag-and-drop interface without keyboard alternatives renders entire features unusable.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('scrollable-region-focusable — Ensures that scrollable regions have keyboard access by verifying they are focusable. Without this, keyboard users cannot scroll through overflowing content.'),
        bullet('server-side-image-map — Ensures server-side image maps are not used. Server-side image maps depend on mouse coordinates and cannot be operated by keyboard.'),

        heading('How to test', 'h2'),
        p('Testing keyboard accessibility requires navigating through all interactive elements using only the keyboard.'),
        numbered('Disconnect or disable your mouse and attempt to use the page with keyboard alone.'),
        numbered('Press Tab to move focus forward through all interactive elements. Verify every button, link, form field, and widget receives focus.'),
        numbered('Press Shift+Tab to move focus backward. Confirm reverse navigation works correctly.'),
        numbered('Press Enter or Space to activate buttons and links. Verify they perform the expected action.'),
        numbered('Test custom components: dropdowns should open with Enter/Space and navigate with arrow keys, dialogs should trap focus, and tab panels should switch with arrow keys.'),
        numbered('Run axe-core and check for scrollable-region-focusable and server-side-image-map violations.'),
        bullet('Use a screen reader (VoiceOver, NVDA, JAWS) to confirm all interactive elements are announced and operable.'),

        heading('How to fix', 'h2'),
        p('Use native HTML elements whenever possible, as they come with built-in keyboard support. When custom elements are necessary, add explicit keyboard handling.'),

        heading('Use native interactive elements', 'h3'),
        code(
          '<!-- Bad: div used as a button, no keyboard support -->\n<div class="btn" onclick="submitForm()">Submit</div>\n\n<!-- Good: native button, keyboard accessible by default -->\n<button type="submit" onclick="submitForm()">Submit</button>',
          'html'
        ),

        heading('Add keyboard handlers to custom widgets', 'h3'),
        code(
          '<!-- Bad: custom dropdown with no keyboard support -->\n<div class="dropdown" onclick="toggleMenu()">\n  <span>Select option</span>\n  <ul class="menu">\n    <li onclick="select(1)">Option 1</li>\n    <li onclick="select(2)">Option 2</li>\n  </ul>\n</div>\n\n<!-- Good: keyboard-accessible custom dropdown -->\n<div class="dropdown"\n  role="combobox"\n  tabindex="0"\n  aria-expanded="false"\n  aria-haspopup="listbox"\n  onkeydown="handleDropdownKey(event)">\n  <span>Select option</span>\n  <ul role="listbox" class="menu">\n    <li role="option" tabindex="-1"\n      onkeydown="handleOptionKey(event)">Option 1</li>\n    <li role="option" tabindex="-1"\n      onkeydown="handleOptionKey(event)">Option 2</li>\n  </ul>\n</div>',
          'html'
        ),

        heading('Keyboard handler example', 'h3'),
        code(
          'function handleDropdownKey(event) {\n  switch (event.key) {\n    case \'Enter\':\n    case \' \':\n      event.preventDefault();\n      toggleMenu();\n      break;\n    case \'ArrowDown\':\n      event.preventDefault();\n      focusNextOption();\n      break;\n    case \'ArrowUp\':\n      event.preventDefault();\n      focusPreviousOption();\n      break;\n    case \'Escape\':\n      closeMenu();\n      break;\n  }\n}',
          'javascript'
        ),

        heading('Make scrollable regions focusable', 'h3'),
        code(
          '<!-- Bad: scrollable container not focusable -->\n<div style="overflow: auto; height: 200px;">\n  <p>Long content that overflows...</p>\n</div>\n\n<!-- Good: scrollable container is focusable -->\n<div tabindex="0" role="region"\n  aria-label="Scrollable content"\n  style="overflow: auto; height: 200px;">\n  <p>Long content that overflows...</p>\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using div or span elements with click handlers but no tabindex, role, or keyboard event listeners.'),
        bullet('Implementing drag-and-drop functionality without providing keyboard-based reordering alternatives.'),
        bullet('Custom sliders or range controls that only respond to mouse movement, with no arrow key support.'),
        bullet('Hover-triggered menus or tooltips that have no keyboard-triggered equivalent (focus or Enter/Space).'),
        bullet('Click handlers on non-interactive elements that cannot receive keyboard focus.'),
        bullet('Using onmousedown or onmouseup without corresponding onkeydown or onkeyup handlers.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.1.1, icerik tarafindan saglanan tum islevselligin bir klavye arayuzu araciligiyla calistirilamasini gerektirir. Bu, her etkilesimli ogenin — baglantilar, dugmeler, form alanlari, ozel bilesenleri ve medya kontrolleri — yalnizca klavye kullanilarak ulasitabilir ve etkinlestirilebilir olmasi gerektigini ifade eder. Hicbir islevsellik yalnizca fareye ozgu olaylara bagimli olmamalidir.'
        ),
        p(
          'Bu kriter yalnizca temel islevin, klavye ile temelden gerceklestirilemeyen analog, yol bagimli giris gerektirdigi durumlarda (serbest cizim gibi) istisnalara izin verir. Bununla birlikte, en yaygin web etkilecimleri — tiklama, secme, genisletme, gonderme — klavye araciligiyla calismalidir. Kriter, bireysel tus vuruslari icin belirli zamanlama gerektirmeyi acikca yasaklar.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Klavye erisilebilirligi, web erisilebilirliginin temelidir. Gorme engelli kullanicilar, klavye komutlariyla calisan ekran okuyuculara guvenirler. Motor engelli kullanicilar, tumu klavye olaylarina donusen anahtar cihazlar, ufle-ve-em sistemleri veya ses girisi kullanabilirler. Deneyimli kullanicilar ve gelistiriciler de hiz ve verimlilik icin klavye gezinmesini tercih ederler.'
        ),
        p(
          'Etkilesimli ogeler klavye ile erisilebilir olmadiginda, tum kullanici gruplari islevsellikten tamamen dislanir. Bu kucuk bir rahatsizlik degil — tam bir engeldir. Yalnizca fare tiklamalarina yanit veren bir dugme, klavye kullanicisi icin gorunmezdir ve klavye alternatifleri olmayan bir surukle-birak arayuzu tum ozellikleri kullanilamaz hale getirir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('scrollable-region-focusable — Kaydirilaabilir alanlarin odaklanabilir olarak klavye erisimi saglamasini dogrular. Bu olmadan klavye kullanicilari tasan icerigi kaydiramaz.'),
        bullet('server-side-image-map — Sunucu tarafli goruntu haritalarinin kullanilmamasini saglar. Sunucu tarafli goruntu haritalari fare koordinatlarina bagimlidir ve klavye ile calistirilamaz.'),

        heading('Nasil test edilir', 'h2'),
        p('Klavye erisilebilirligini test etmek, yalnizca klavye kullanarak tum etkilesimli ogelerde gezinmeyi gerektirir.'),
        numbered('Farenizi devre disi birakin ve sayfayi yalnizca klavye ile kullanmaya calisin.'),
        numbered('Tum etkilesimli ogeler arasinda ileri gitmek icin Tab tusuna basin. Her dugme, baglanti, form alani ve bilesenin odak aldigini dogrulayin.'),
        numbered('Geri gitmek icin Shift+Tab tusuna basin. Ters gezinmenin dogru calistigini onaylayin.'),
        numbered('Dugmeleri ve baglantilari etkinlestirmek icin Enter veya Bosluk tusuna basin. Beklenen eylemi gerceklestirdiklerini dogrulayin.'),
        numbered('Ozel bilecenleri test edin: acilir menuler Enter/Bosluk ile acilmali, diyaloglar odagi yakalamaladi, sekme panelleri ok tuslariyla degismelidir.'),
        numbered('axe-core calistirin ve scrollable-region-focusable ile server-side-image-map ihlallerini kontrol edin.'),
        bullet('Tum etkilesimli ogelerin duyuruldugunu ve calistirildabildigini onaylamak icin bir ekran okuyucu (VoiceOver, NVDA, JAWS) kullanin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Yerlesik klavye destegi sundukari icin mumkun oldugunda yerel HTML ogelerini kullanin. Ozel ogeler gerektiginde acik klavye isleme ekleyin.'),

        heading('Yerel etkilesimli ogeleri kullanin', 'h3'),
        code(
          '<!-- Yanlis: dugme olarak div, klavye destegi yok -->\n<div class="btn" onclick="formuGonder()">Gonder</div>\n\n<!-- Dogru: yerel dugme, varsayilan olarak klavye erisimli -->\n<button type="submit" onclick="formuGonder()">Gonder</button>',
          'html'
        ),

        heading('Ozel bilecenlere klavye isleyicileri ekleyin', 'h3'),
        code(
          '<!-- Yanlis: klavye destegi olmayan ozel acilir menu -->\n<div class="acilir-menu" onclick="menuAcKapa()">\n  <span>Secenek secin</span>\n  <ul class="menu">\n    <li onclick="sec(1)">Secenek 1</li>\n    <li onclick="sec(2)">Secenek 2</li>\n  </ul>\n</div>\n\n<!-- Dogru: klavye erisimli ozel acilir menu -->\n<div class="acilir-menu"\n  role="combobox"\n  tabindex="0"\n  aria-expanded="false"\n  aria-haspopup="listbox"\n  onkeydown="acilirMenuTuslama(event)">\n  <span>Secenek secin</span>\n  <ul role="listbox" class="menu">\n    <li role="option" tabindex="-1"\n      onkeydown="secenekTuslama(event)">Secenek 1</li>\n    <li role="option" tabindex="-1"\n      onkeydown="secenekTuslama(event)">Secenek 2</li>\n  </ul>\n</div>',
          'html'
        ),

        heading('Klavye isleyici ornegi', 'h3'),
        code(
          'function acilirMenuTuslama(event) {\n  switch (event.key) {\n    case \'Enter\':\n    case \' \':\n      event.preventDefault();\n      menuAcKapa();\n      break;\n    case \'ArrowDown\':\n      event.preventDefault();\n      sonrakiSecenegeSec();\n      break;\n    case \'ArrowUp\':\n      event.preventDefault();\n      oncekiSecenegeSec();\n      break;\n    case \'Escape\':\n      menuKapat();\n      break;\n  }\n}',
          'javascript'
        ),

        heading('Kaydiriliabilir alanlari odaklanabilir yapin', 'h3'),
        code(
          '<!-- Yanlis: odaklanamayan kaydiriliabilir alan -->\n<div style="overflow: auto; height: 200px;">\n  <p>Tasan uzun icerik...</p>\n</div>\n\n<!-- Dogru: odaklanabilir kaydiriliabilir alan -->\n<div tabindex="0" role="region"\n  aria-label="Kaydiriliabilir icerik"\n  style="overflow: auto; height: 200px;">\n  <p>Tasan uzun icerik...</p>\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Tiklama isleyicileri olan ancak tabindex, role veya klavye olay dinleyicisi olmayan div veya span ogeleri kullanmak.'),
        bullet('Klavye tabanli yeniden siralama alternatifleri saglamadan surukle-birak islevi uygulamak.'),
        bullet('Yalnizca fare hareketine yanit veren, ok tusu destegi olmayan ozel kaydiricilar veya aralik kontrolleri.'),
        bullet('Klavye ile tetiklenen esdegeri olmayan (odak veya Enter/Bosluk) fareyle uzerine gelme ile tetiklenen menuler veya ipuclari.'),
        bullet('Klavye odagi alamayan etkilesimli olmayan ogeler uzerinde tiklama isleyicileri.'),
        bullet('Karsilik gelen onkeydown veya onkeyup isleyicileri olmadan onmousedown veya onmouseup kullanmak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.1.1: Keyboard',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r211w3cu',
      },
      {
        title: 'W3C Techniques for 2.1.1',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#keyboard',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r211w3ct',
      },
      {
        title: 'WebAIM: Keyboard Accessibility',
        url: 'https://webaim.org/techniques/keyboard/',
        source: 'webaim',
        language: 'en',
        _key: 'r211waim',
      },
      {
        title: 'Deque: scrollable-region-focusable Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable',
        source: 'deque',
        language: 'en',
        _key: 'r211deq1',
      },
      {
        title: 'MDN: Keyboard-navigable JavaScript widgets',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets',
        source: 'mdn',
        language: 'en',
        _key: 'r211mdnk',
      },
      {
        title: 'W3C WAI: ARIA Authoring Practices — Keyboard Interaction',
        url: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r211waia',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.1.1 Keyboard — Full Keyboard Accessibility Guide',
        metaDescription:
          'Learn how to meet WCAG 2.1.1 Keyboard. Ensure all interactive content is operable through a keyboard interface without requiring mouse input.',
      },
      tr: {
        metaTitle: 'WCAG 2.1.1 Klavye — Tam Klavye Erisilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.1.1 Klavye kriterini nasil karsilayacaginizi ogrenin. Tum etkilesimli icerigin fare girisi gerektirmeden klavye arayuzu ile calistirilabilir olmasini saglayin.',
      },
    },
  },

  // ─── 2.1.2 No Keyboard Trap ──────────────────────────────────────────
  {
    criterionNumber: '2.1.2',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [],
    tags: ['keyboard', 'focus', 'trap', 'modal'],

    title: {
      en: 'No Keyboard Trap',
      tr: 'Klavye Tuzagi Yok',
    },

    description: {
      en: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.',
      tr: 'Klavye odagi bir klavye arayuzu kullanilarak sayfanin bir bilesenine tasitabiliyorsa, odak yalnizca bir klavye arayuzu kullanilarak o bilesenden uzaklastirabilmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.1.2 requires that when a keyboard user tabs or navigates into any component on a page, they must be able to move focus away from that component using standard keyboard mechanisms. Focus must never become trapped in a way that the user cannot escape without using a mouse or other pointing device.'
        ),
        p(
          'If a component does require non-standard keyboard behavior to exit (such as pressing Escape to close a modal), the user must be informed of the method. The key principle is that no keyboard user should ever become stuck in a component with no way to leave.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'A keyboard trap is one of the most severe accessibility barriers. When a user becomes stuck in a component, they lose the ability to interact with the rest of the page entirely. They cannot navigate to other content, submit forms, or even close the browser tab using keyboard commands. The only escape is to close and reopen the browser — losing all page state and unsaved work.'
        ),
        p(
          'This is especially dangerous for users who rely exclusively on keyboard input. Blind users, users with motor impairments using switch devices, and voice input users all depend on predictable focus movement. A keyboard trap turns a minor navigation issue into a complete dead end.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules that directly test for keyboard traps. Detecting focus traps requires manual testing because automated tools cannot fully simulate the sequential keyboard interaction needed to identify when focus cannot leave a component.'
        ),

        heading('How to test', 'h2'),
        p('Manual keyboard testing is the most reliable way to detect keyboard traps.'),
        numbered('Tab through every interactive element on the page using only the Tab and Shift+Tab keys.'),
        numbered('When focus enters a custom component (modal, widget, embedded content), attempt to Tab out of it.'),
        numbered('If Tab alone does not move focus out, try Escape, arrow keys, and other standard keyboard shortcuts.'),
        numbered('Test embedded content: iframes, third-party widgets, embedded media players, and WYSIWYG editors are common trap sources.'),
        numbered('Verify that modal dialogs allow focus to be released when closed via Escape or a close button.'),
        bullet('Pay special attention to custom date pickers, autocomplete fields, rich text editors, and embedded maps.'),

        heading('How to fix', 'h2'),
        p('Ensure every component provides a keyboard mechanism to move focus out. Intentional focus trapping (modals) must include an escape route.'),

        heading('Modal dialog with proper focus management', 'h3'),
        code(
          '<!-- Modal that traps focus intentionally but provides escape -->\n<div role="dialog" aria-modal="true"\n  aria-labelledby="modal-title" id="modal">\n  <h2 id="modal-title">Confirm Action</h2>\n  <p>Are you sure you want to proceed?</p>\n  <button onclick="confirm()">Yes</button>\n  <button onclick="closeModal()">Cancel</button>\n</div>\n\n<script>\nconst modal = document.getElementById(\'modal\');\nconst focusableEls = modal.querySelectorAll(\n  \'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])\'\n);\nconst firstEl = focusableEls[0];\nconst lastEl = focusableEls[focusableEls.length - 1];\n\nmodal.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    closeModal();\n    return;\n  }\n  if (e.key === \'Tab\') {\n    if (e.shiftKey && document.activeElement === firstEl) {\n      e.preventDefault();\n      lastEl.focus();\n    } else if (!e.shiftKey && document.activeElement === lastEl) {\n      e.preventDefault();\n      firstEl.focus();\n    }\n  }\n});\n</script>',
          'html'
        ),

        heading('Preventing accidental traps in custom widgets', 'h3'),
        code(
          '// Bad: keydown handler prevents all default behavior\nwidget.addEventListener(\'keydown\', (e) => {\n  e.preventDefault(); // This traps focus!\n  handleWidgetKey(e);\n});\n\n// Good: only prevent default for handled keys\nwidget.addEventListener(\'keydown\', (e) => {\n  if ([\'ArrowUp\', \'ArrowDown\', \'Enter\', \' \'].includes(e.key)) {\n    e.preventDefault();\n    handleWidgetKey(e);\n  }\n  // Tab and other keys pass through naturally\n});',
          'javascript'
        ),

        heading('Embedded content escape', 'h3'),
        code(
          '<!-- Provide instructions for non-standard exit -->\n<p class="sr-only">\n  Press Escape to exit the embedded editor and return\n  to the main page.\n</p>\n<div id="editor" tabindex="0"\n  aria-label="Rich text editor. Press Escape to exit.">\n  <!-- Editor content -->\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Calling e.preventDefault() on all keydown events inside a widget, preventing Tab from moving focus out.'),
        bullet('Modal dialogs that do not close when Escape is pressed, trapping keyboard users inside.'),
        bullet('Third-party embedded widgets (chat, maps, video players) that capture all keyboard input.'),
        bullet('Infinite focus loops in custom components where Tab cycles endlessly among child elements with no exit.'),
        bullet('JavaScript-based focus management that forcibly returns focus to a component after the user tabs away.'),
        bullet('Missing instructions when non-standard keys (like Escape) are required to exit a component.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.1.2, bir klavye kullanicisi sayfadaki herhangi bir bilesene odak tasidiginida, standart klavye mekanizmalari kullanarak odagi o bilesenden uzaklastirabilmesini gerektirir. Odak, kullanicinin fare veya baska bir isaret aygiti kullanmadan cikamayacagi sekilde asla tuzaga dusurulmemelidir.'
        ),
        p(
          'Bir bilesen cikmak icin standart olmayan klavye davranisi gerektiriyorsa (bir modali kapatmak icin Escape tusuna basmak gibi), kullanici bu yontem hakkinda bilgilendirilmelidir. Temel ilke, hicbir klavye kullanicisinin cikis yolu olmadan bir bilesende asili kalmamasidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Klavye tuzagi, en ciddi erisilebilirlik engellerinden biridir. Bir kullanici bir bilesende takildiginda, sayfanin geri kalanyla etkilesim yetenegi tamamen kaybolur. Diger iceriklere gidemez, form gonderemez ve hatta klavye komutlari kullanarak tarayici sekmesini bile kapatamaz. Tek kacis yolu tarayiciyi kapatip yeniden acmaktir — tum sayfa durumunu ve kaydedilmemis calismalarini kaybeder.'
        ),
        p(
          'Bu ozellikle yalnizca klavye girisine guvenenen kullanicilar icin tehlikelidir. Gorme engelli kullanicilar, anahtar cihazlar kullanan motor engelli kullanicilar ve ses girisi kullanicilari tamami, ongurelebilir odak hareketine bagimlidir. Bir klavye tuzagi, kucuk bir gezinme sorununu tamamen cikmaz bir yola cevirir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Klavye tuzaklarini dogrudan test eden otomatik axe-core kurali bulunmamaktadir. Odak tuzaklarini tespit etmek manuel test gerektirir cunku otomatik araclar, odagin bir bilesenden ayrilip ayrilamadigini belirlemek icin gereken ardisik klavye etkilesimini tam olarak simule edemez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Manuel klavye testi, klavye tuzaklarini tespit etmenin en guvenilir yoludur.'),
        numbered('Yalnizca Tab ve Shift+Tab tuslariyla sayfadaki her etkilesimli ogede gezinin.'),
        numbered('Odak ozel bir bilesene (modal, bilesen, gomulu icerik) girdiginde, Tab ile cikmaya calisin.'),
        numbered('Yalnizca Tab odagi cikarmiyorsa Escape, ok tuslari ve diger standart klavye kisayollarini deneyin.'),
        numbered('Gomulu icerikleri test edin: iframe\'ler, ucuncu parti bilesenler, gomulu medya oynaticilari ve WYSIWYG editorler yaygin tuzak kaynaklaridir.'),
        numbered('Modal diyaloglarin Escape veya bir kapatma dugmesi ile kapatildiginda odagin serbest birakildigini dogrulayin.'),
        bullet('Ozel tarih secicilere, otomatik tamamlama alanlarina, zengin metin editorlerine ve gomulu haritalara ozellikle dikkat edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Her bilesenin odagi tasimak icin bir klavye mekanizmasi sagladigindan emin olun. Kasitli odak yakalama (modaller) bir cikis yolu icermelidir.'),

        heading('Uygun odak yonetimi ile modal diyalog', 'h3'),
        code(
          '<!-- Kasitli olarak odagi yakalayan ancak cikis saglayan modal -->\n<div role="dialog" aria-modal="true"\n  aria-labelledby="modal-baslik" id="modal">\n  <h2 id="modal-baslik">Islemi Onayla</h2>\n  <p>Devam etmek istediginizden emin misiniz?</p>\n  <button onclick="onayla()">Evet</button>\n  <button onclick="modalKapat()">Iptal</button>\n</div>\n\n<script>\nconst modal = document.getElementById(\'modal\');\nconst odaklanabilirOgeler = modal.querySelectorAll(\n  \'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])\'\n);\nconst ilkOge = odaklanabilirOgeler[0];\nconst sonOge = odaklanabilirOgeler[odaklanabilirOgeler.length - 1];\n\nmodal.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    modalKapat();\n    return;\n  }\n  if (e.key === \'Tab\') {\n    if (e.shiftKey && document.activeElement === ilkOge) {\n      e.preventDefault();\n      sonOge.focus();\n    } else if (!e.shiftKey && document.activeElement === sonOge) {\n      e.preventDefault();\n      ilkOge.focus();\n    }\n  }\n});\n</script>',
          'html'
        ),

        heading('Ozel bilecenlerde kazara tuzaklari onleme', 'h3'),
        code(
          '// Yanlis: keydown isleyicisi tum varsayilan davranisi engelliyor\nwidget.addEventListener(\'keydown\', (e) => {\n  e.preventDefault(); // Bu odagi tuzaga dusurur!\n  bilesenTuslama(e);\n});\n\n// Dogru: yalnizca islenen tuslar icin varsayilani engelle\nwidget.addEventListener(\'keydown\', (e) => {\n  if ([\'ArrowUp\', \'ArrowDown\', \'Enter\', \' \'].includes(e.key)) {\n    e.preventDefault();\n    bilesenTuslama(e);\n  }\n  // Tab ve diger tuslar dogal olarak gecer\n});',
          'javascript'
        ),

        heading('Gomulu icerik cikisi', 'h3'),
        code(
          '<!-- Standart olmayan cikis icin talimatlar saglayin -->\n<p class="sr-only">\n  Gomulu editordan cikmak ve ana sayfaya donmek icin\n  Escape tusuna basin.\n</p>\n<div id="editor" tabindex="0"\n  aria-label="Zengin metin editoru. Cikmak icin Escape tusuna basin.">\n  <!-- Editor icerigi -->\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Bir bilesen icindeki tum keydown olaylarinda e.preventDefault() cagirmak, Tab tusunun odagi tasitmasini engellemek.'),
        bullet('Escape tusuna basildiginda kapanmayan modal diyaloglar, klavye kullanicilarini icine hapseder.'),
        bullet('Tum klavye girisini yakalayan ucuncu parti gomulu bilesenler (sohbet, harita, video oynaticilar).'),
        bullet('Tab tusunun alt ogeler arasinda cikisi olmadan sonsuz dongu yapmasina neden olan ozel bilecenlerdeki sonsuz odak dongleri.'),
        bullet('Kullanici uzaklastiktan sonra odagi zorla bir bilesene geri donduren JavaScript tabanli odak yonetimi.'),
        bullet('Bir bilesenden cikmak icin standart olmayan tuslar (Escape gibi) gerektiginde eksik talimatlar.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.1.2: No Keyboard Trap',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r212w3cu',
      },
      {
        title: 'W3C Technique G21: Ensuring users are not trapped in content',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G21',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r212w3cg',
      },
      {
        title: 'WebAIM: Keyboard Accessibility — Keyboard Traps',
        url: 'https://webaim.org/techniques/keyboard/#702tab',
        source: 'webaim',
        language: 'en',
        _key: 'r212waim',
      },
      {
        title: 'Deque University: Keyboard Traps',
        url: 'https://dequeuniversity.com/class/input-methods2/keyboard/traps',
        source: 'deque',
        language: 'en',
        _key: 'r212dequ',
      },
      {
        title: 'W3C WAI: ARIA Dialog Pattern',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r212waid',
      },
      {
        title: 'MDN: HTMLElement focus() method',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus',
        source: 'mdn',
        language: 'en',
        _key: 'r212mdnf',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.1.2 No Keyboard Trap — Focus Management Guide',
        metaDescription:
          'Learn how to meet WCAG 2.1.2 No Keyboard Trap. Ensure keyboard users can always move focus away from any component using standard keyboard mechanisms.',
      },
      tr: {
        metaTitle: 'WCAG 2.1.2 Klavye Tuzagi Yok — Odak Yonetimi Rehberi',
        metaDescription:
          'WCAG 2.1.2 Klavye Tuzagi Yok kriterini nasil karsilayacaginizi ogrenin. Klavye kullanicilarinin standart klavye mekanizmalari ile her bilesenden odagi tasiyabilmesini saglayin.',
      },
    },
  },

  // ─── 2.1.3 Keyboard (No Exception) ───────────────────────────────────
  {
    criterionNumber: '2.1.3',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [],
    tags: ['keyboard', 'focus', 'interaction', 'aaa'],

    title: {
      en: 'Keyboard (No Exception)',
      tr: 'Klavye (Istisnasiz)',
    },

    description: {
      en: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, with no exceptions.',
      tr: 'Icerigin tum islevselligi, hicbir istisna olmaksizin, bireysel tus vuruslari icin belirli zamanlamalar gerektirmeden bir klavye arayuzu araciligiyla calistirilamalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.1.3 is the AAA-level version of 2.1.1 (Keyboard). While 2.1.1 allows exceptions for functionality that fundamentally requires path-dependent input (such as freehand drawing), 2.1.3 removes all exceptions. Every single piece of functionality must be fully operable through a keyboard interface, regardless of how the functionality is designed.'
        ),
        p(
          'This is a significantly higher bar than 2.1.1. Meeting this criterion means that even features like freehand drawing, handwriting input, or flight simulator controls must provide keyboard-operable alternatives. Organizations targeting AAA conformance must design every feature with keyboard-only operation as a hard requirement from the start.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'While 2.1.1 provides practical accommodations by allowing exceptions for inherently path-dependent input, this AAA criterion recognizes that for maximum inclusivity, even those edge cases should have keyboard alternatives. Some users physically cannot use any pointing device and depend entirely on keyboard input for all computer interaction.'
        ),
        p(
          'Meeting this criterion ensures that no user is excluded from any functionality regardless of their input method. It represents the gold standard of keyboard accessibility and is particularly important for government, healthcare, and educational platforms where universal access is a core requirement.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules specific to this criterion. Since it is an extension of 2.1.1 with no exceptions, testing requires comprehensive manual review of every interactive feature to ensure keyboard operability with no exceptions allowed.'
        ),

        heading('How to test', 'h2'),
        p('Testing is the same as 2.1.1 but with stricter requirements — no exceptions are permitted.'),
        numbered('Perform a complete keyboard-only audit of every feature on the site. Identify all interactive functionality.'),
        numbered('For each feature, verify it is fully operable using only keyboard input (Tab, Shift+Tab, Enter, Space, Arrow keys, Escape).'),
        numbered('Specifically test features that might have been exempt under 2.1.1: drawing tools, drag-and-drop, gesture-based interactions.'),
        numbered('Verify that keyboard alternatives produce equivalent results — not degraded versions of the functionality.'),
        numbered('Document any functionality that lacks keyboard operability as a AAA failure.'),

        heading('How to fix', 'h2'),
        p('Provide keyboard alternatives for every interaction, including those that would be exempt under 2.1.1.'),

        heading('Drawing tool with keyboard alternative', 'h3'),
        code(
          '<!-- Provide coordinate-based input as keyboard alternative -->\n<canvas id="drawing-canvas" aria-label="Drawing area"></canvas>\n\n<!-- Keyboard-accessible alternative -->\n<div role="group" aria-label="Drawing coordinates">\n  <label for="x-coord">X coordinate:</label>\n  <input type="number" id="x-coord" min="0" max="500">\n  <label for="y-coord">Y coordinate:</label>\n  <input type="number" id="y-coord" min="0" max="500">\n  <button onclick="addPoint()">Add Point</button>\n  <button onclick="connectPoints()">Connect Points</button>\n  <button onclick="undoLast()">Undo</button>\n</div>',
          'html'
        ),

        heading('Drag-and-drop with keyboard reordering', 'h3'),
        code(
          '<!-- Sortable list with keyboard support -->\n<ul role="listbox" aria-label="Reorderable list">\n  <li role="option" tabindex="0"\n    aria-grabbed="false"\n    onkeydown="handleReorder(event, this)">\n    Item 1\n    <button aria-label="Move Item 1 up"\n      onclick="moveUp(this)">&#9650;</button>\n    <button aria-label="Move Item 1 down"\n      onclick="moveDown(this)">&#9660;</button>\n  </li>\n</ul>\n\n<script>\nfunction handleReorder(e, item) {\n  if (e.altKey && e.key === \'ArrowUp\') {\n    e.preventDefault();\n    moveUp(item);\n  } else if (e.altKey && e.key === \'ArrowDown\') {\n    e.preventDefault();\n    moveDown(item);\n  }\n}\n</script>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Assuming that path-dependent features (drawing, gesture input) do not need keyboard alternatives because they are exempt under Level A.'),
        bullet('Providing degraded keyboard alternatives that do not offer the same functionality as the mouse-based version.'),
        bullet('Omitting keyboard support for third-party components or embedded content, assuming exceptions apply.'),
        bullet('Not testing complex interaction patterns (multi-step workflows, drag operations) thoroughly with keyboard.'),
        bullet('Relying on 2.1.1 compliance and assuming AAA is automatically met.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.1.3, 2.1.1 (Klavye) kriterinin AAA seviyesindeki versiyonudur. 2.1.1 temelden yol bagimli giris gerektiren islevsellik icin istisnalara izin verirken (serbest cizim gibi), 2.1.3 tum istisnalari kaldirir. Her bir islevsellik parcasi, islevselligin nasil tasarlandigina bakilmaksizin, klavye arayuzu araciligiyla tamamen calistirilamalidir.'
        ),
        p(
          'Bu, 2.1.1\'den onemli olcude daha yuksek bir cubuktur. Bu kriteri karsilamak, serbest cizim, el yazisi girisi veya ucus simulatoru kontrolleri gibi ozelliklerin bile klavye ile calistirilamablair alternatifleri saglamasi gerektigini ifade eder. AAA uyumlulugunu hedefleyen kuruluslar, her ozelligi bastan itibaren yalnizca klavye ile calisma gerekliligi ile tasarlamalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          '2.1.1, dogasi geregi yol bagimli giris icin istisnalara izin vererek pratik duzeltmeler saglarkeni, bu AAA kriteri, maksimum kapsayicilik icin bu uc durumlarin bile klavye alternatifleri olmasi gerektigini kabul eder. Bazi kullanicilar fiziksel olarak herhangi bir isaret aygiti kullanamaz ve tum bilgisayar etkilesimi icin tamamen klavye girisine bagimlidir.'
        ),
        p(
          'Bu kriteri karsilamak, giris yontemlerine bakilmaksizin hicbir kullanicinin herhangi bir islevsellikten dislanmamasini saglar. Klavye erisilebilirliginin altin standardi olup ozellikle evrensel erisilebilirligin temel bir gereklilik olducu devlet, saglik ve egitim platformlari icin onemlidir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. 2.1.1\'in istisnasiz bir uzantisi oldugundan, test, her etkilesimli ozelligin kapsamli bir sekilde manuel incelenmesini gerektirir ve hicbir istisnaya izin verilmez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, 2.1.1 ile aynidir ancak daha siki gereksinimlerle — hicbir istisnaya izin verilmez.'),
        numbered('Sitedeki her ozelligin eksiksiz bir yalnizca-klavye denetimini gerceklestirin. Tum etkilesimli islevselligi belirleyin.'),
        numbered('Her ozellik icin yalnizca klavye girisi (Tab, Shift+Tab, Enter, Bosluk, Ok tuslari, Escape) kullanilarak tam olarak calistirilabildignii dogrulayin.'),
        numbered('2.1.1 kapsaminda muaf tutulabilecek ozellikleri ozellikle test edin: cizim araclari, surukle-birak, hareket tabanli etkilesimler.'),
        numbered('Klavye alternatiflerinin esdeger sonuclar uretigini — islevselligin bozulmus versiyonlarini degil — dogrulayin.'),
        numbered('Klavye ile calistirilamazligi olmayan herhangi bir islevselligi AAA hatasi olarak belgeleyin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('2.1.1 kapsaminda muaf tutulacak olanlar da dahil olmak uzere her etkilesim icin klavye alternatifleri saglayin.'),

        heading('Klavye alternatifli cizim araci', 'h3'),
        code(
          '<!-- Klavye alternatifi olarak koordinat tabanli giris saglayin -->\n<canvas id="cizim-tuvali" aria-label="Cizim alani"></canvas>\n\n<!-- Klavye erisimli alternatif -->\n<div role="group" aria-label="Cizim koordinatlari">\n  <label for="x-koord">X koordinati:</label>\n  <input type="number" id="x-koord" min="0" max="500">\n  <label for="y-koord">Y koordinati:</label>\n  <input type="number" id="y-koord" min="0" max="500">\n  <button onclick="noktaEkle()">Nokta Ekle</button>\n  <button onclick="noktalariBagla()">Noktalari Bagla</button>\n  <button onclick="sonIslemGeriAl()">Geri Al</button>\n</div>',
          'html'
        ),

        heading('Klavye ile yeniden siralama destekli surukle-birak', 'h3'),
        code(
          '<!-- Klavye destekli siralanabilir liste -->\n<ul role="listbox" aria-label="Yeniden siralanabilir liste">\n  <li role="option" tabindex="0"\n    aria-grabbed="false"\n    onkeydown="siralamayiYonet(event, this)">\n    Oge 1\n    <button aria-label="Oge 1 yukari tasi"\n      onclick="yukariTasi(this)">&#9650;</button>\n    <button aria-label="Oge 1 asagi tasi"\n      onclick="asagiTasi(this)">&#9660;</button>\n  </li>\n</ul>\n\n<script>\nfunction siralamayiYonet(e, oge) {\n  if (e.altKey && e.key === \'ArrowUp\') {\n    e.preventDefault();\n    yukariTasi(oge);\n  } else if (e.altKey && e.key === \'ArrowDown\') {\n    e.preventDefault();\n    asagiTasi(oge);\n  }\n}\n</script>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Yol bagimli ozelliklerin (cizim, hareket girisi) A Seviyesi altinda muaf olduklari icin klavye alternatifleri gerektirmedigini varsaymak.'),
        bullet('Fare tabanli versiyonla ayni islevselligi sunmayan dusuk kaliteli klavye alternatifleri saglamak.'),
        bullet('Istisnalarin gecerli oldugunu varsayarak ucuncu parti bilesenler veya gomulu icerik icin klavye destegini ihmal etmek.'),
        bullet('Karmasik etkilesim kaliplarini (cok adimli is akislari, surukle islemleri) klavye ile kapsamli olarak test etmemek.'),
        bullet('2.1.1 uyumluluguna guvenip AAA\'nin otomatik olarak karsilandigini varsaymak.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.1.3: Keyboard (No Exception)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r213w3cu',
      },
      {
        title: 'W3C Techniques for Keyboard Accessibility',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/#keyboard',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r213w3ct',
      },
      {
        title: 'WebAIM: Keyboard Accessibility',
        url: 'https://webaim.org/techniques/keyboard/',
        source: 'webaim',
        language: 'en',
        _key: 'r213waim',
      },
      {
        title: 'Deque University: Keyboard Accessibility',
        url: 'https://dequeuniversity.com/class/input-methods2/keyboard/',
        source: 'deque',
        language: 'en',
        _key: 'r213dequ',
      },
      {
        title: 'W3C WAI: ARIA Authoring Practices',
        url: 'https://www.w3.org/WAI/ARIA/apg/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r213waip',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.1.3 Keyboard No Exception — AAA Keyboard Guide',
        metaDescription:
          'Learn about WCAG 2.1.3 Keyboard (No Exception). This AAA criterion requires all functionality to be keyboard operable with no exceptions whatsoever.',
      },
      tr: {
        metaTitle: 'WCAG 2.1.3 Klavye Istisnasiz — AAA Klavye Rehberi',
        metaDescription:
          'WCAG 2.1.3 Klavye (Istisnasiz) hakkinda bilgi edinin. Bu AAA kriteri, tum islevselligin hicbir istisna olmaksizin klavye ile calistirilamabilir olmasini gerektirir.',
      },
    },
  },

  // ─── 2.1.4 Character Key Shortcuts ────────────────────────────────────
  {
    criterionNumber: '2.1.4',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['keyboard', 'shortcuts', 'speech-input'],

    title: {
      en: 'Character Key Shortcuts',
      tr: 'Karakter Tusu Kisayollari',
    },

    description: {
      en: 'If a keyboard shortcut is implemented using only letter, punctuation, number, or symbol characters, then a mechanism is available to turn it off, remap it, or make it active only on focus.',
      tr: 'Bir klavye kisayolu yalnizca harf, noktalama, sayi veya sembol karakterleri kullanilarak uygulanmissa, onu kapatmak, yeniden eslestirmek veya yalnizca odakta etkin kilmak icin bir mekanizma saglanmalidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.1.4 addresses keyboard shortcuts that use single character keys (letters, numbers, punctuation, or symbols) without modifier keys (Ctrl, Alt, Cmd). When such shortcuts exist, the interface must provide at least one of three options: the ability to turn the shortcut off, the ability to remap it to include a modifier key, or limiting the shortcut to be active only when the relevant component has focus.'
        ),
        p(
          'This criterion was introduced in WCAG 2.1 to address a specific problem: speech input users dictate text, and their software interprets spoken words as individual keystrokes. A single-character shortcut like "s" for search could be accidentally triggered when a user tries to dictate the word "save." Similarly, users with motor impairments may accidentally press character keys while navigating.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Speech input software like Dragon NaturallySpeaking converts spoken words into sequences of key presses. When a web application has single-character shortcuts, normal dictation can trigger unintended commands. For example, saying "send" could activate shortcuts mapped to "s", "e", "n", or "d" in rapid sequence, performing four unintended actions before the user realizes what happened.'
        ),
        p(
          'Users with motor impairments who use on-screen keyboards or have tremors may also accidentally trigger single-character shortcuts. Without a mechanism to disable or remap these shortcuts, the interface becomes unpredictable and frustrating. Modifier-key combinations (Ctrl+S, Alt+N) do not have this problem because speech input software does not accidentally generate modifier-key combinations.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting single-character shortcuts requires manual code review and testing with speech input software, as shortcuts are implemented in JavaScript and cannot be reliably detected through DOM analysis alone.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires identifying all keyboard shortcuts and verifying they meet the requirements.'),
        numbered('Review the application documentation and code for keyboard shortcut implementations.'),
        numbered('Press each letter, number, punctuation, and symbol key individually on the page. Note any shortcuts triggered without a modifier key.'),
        numbered('For each single-character shortcut found, verify that a settings mechanism exists to disable or remap it.'),
        numbered('Verify that shortcuts scoped to specific components are only active when that component has focus.'),
        numbered('If possible, test with speech input software (Dragon NaturallySpeaking) and attempt to dictate text on the page.'),
        bullet('Check keyboard shortcut documentation (often displayed with "?" key) to inventory all shortcuts.'),

        heading('How to fix', 'h2'),
        p('Provide a mechanism to disable, remap, or scope character key shortcuts appropriately.'),

        heading('Shortcut that can be turned off or remapped', 'h3'),
        code(
          '// Shortcut configuration object\nconst shortcuts = {\n  search: { key: \'s\', enabled: true },\n  help: { key: \'?\', enabled: true },\n  newItem: { key: \'n\', enabled: true },\n};\n\n// User preferences loaded from storage\nconst prefs = loadUserPreferences();\nObject.keys(shortcuts).forEach(action => {\n  if (prefs[action]) {\n    shortcuts[action] = { ...shortcuts[action], ...prefs[action] };\n  }\n});\n\ndocument.addEventListener(\'keydown\', (e) => {\n  // Skip if user is typing in an input field\n  if (e.target.matches(\'input, textarea, [contenteditable]\')) return;\n  // Skip if modifier key is held (not a single-char shortcut)\n  if (e.ctrlKey || e.altKey || e.metaKey) return;\n\n  Object.entries(shortcuts).forEach(([action, config]) => {\n    if (config.enabled && e.key === config.key) {\n      e.preventDefault();\n      executeAction(action);\n    }\n  });\n});',
          'javascript'
        ),

        heading('Settings UI for shortcut management', 'h3'),
        code(
          '<fieldset>\n  <legend>Keyboard Shortcuts</legend>\n  <div>\n    <label>\n      <input type="checkbox" id="shortcuts-enabled"\n        checked onchange="toggleAllShortcuts(this.checked)">\n      Enable keyboard shortcuts\n    </label>\n  </div>\n  <table>\n    <thead>\n      <tr><th>Action</th><th>Key</th><th>Enabled</th></tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Search</td>\n        <td><input type="text" value="s" maxlength="1"\n          onchange="remapShortcut(\'search\', this.value)"></td>\n        <td><input type="checkbox" checked\n          onchange="toggleShortcut(\'search\', this.checked)"></td>\n      </tr>\n    </tbody>\n  </table>\n</fieldset>',
          'html'
        ),

        heading('Scope shortcuts to focused components', 'h3'),
        code(
          '// Bad: global shortcut with single character\ndocument.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') scrollToNext();\n  if (e.key === \'k\') scrollToPrev();\n});\n\n// Good: shortcut only active when list is focused\nconst list = document.getElementById(\'item-list\');\nlist.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') scrollToNext();\n  if (e.key === \'k\') scrollToPrev();\n});',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Implementing Gmail-style single-key shortcuts (j/k for navigation, s for star, e for archive) without a disable option.'),
        bullet('Game-like keyboard controls on non-game interfaces without a way to turn them off.'),
        bullet('Single-character shortcuts that remain active when the user is typing in a search field or text area.'),
        bullet('No settings page or mechanism for users to view, disable, or remap keyboard shortcuts.'),
        bullet('Assuming that because shortcuts improve efficiency for some users, they are acceptable without controls.'),
        bullet('Accesskey attributes using single characters without a modifier — browsers handle these inconsistently.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.1.4, degistirici tuslar (Ctrl, Alt, Cmd) olmadan tek karakter tuslari (harf, sayi, noktalama veya sembol) kullanan klavye kisayollarini ele alir. Bu tur kisayollar varsa, arayuz su uc secenekten en az birini sunmalidir: kisayolu kapatma, bir degistirici tus icereck yeniden eslestirme veya kisayolu yalnizca ilgili bilesen odakta oldugunda etkin kilma.'
        ),
        p(
          'Bu kriter, belirli bir sorunu gidermek icin WCAG 2.1\'de tanitildi: ses girisi kullanicilari metin dikte eder ve yazilimlari konusulan sozcukleri bireysel tus vuruslari olarak yorumlar. Arama icin "s" gibi tek karakterli bir kisayol, kullanici "save" kelimesini dikte etmeye calistiginda kazara tetiklenebilir. Benzer sekilde, motor engelli kullanicilar gezinirken kazara karakter tuslarina basabilir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Dragon NaturallySpeaking gibi ses girisi yazilimlari, konusulan sozcukleri tus basma dizilerine donusturur. Bir web uygulamasinin tek karakterli kisayollari oldugunda, normal dikte istenmeyen komutlari tetikleyebilir. Ornegin, "send" demek "s", "e", "n" veya "d" tuslarinin hizli bir sekilde ardisik olarak kisayollarini etkinlestirebilir ve kullanici ne oldugunu anlamadan dort istenmeyen eylem gerceklestirilir.'
        ),
        p(
          'Ekran klavyesi kullanan veya titremeye sahip motor engelli kullanicilar da tek karakterli kisayollari kazara tetikleyebilir. Bu kisayollari devre disi birakma veya yeniden eslestirme mekanizmasi olmadan arayuz ongurulmez ve sinir bozucu hale gelir. Degistirici tus kombinasyonlari (Ctrl+S, Alt+N) bu soruna sahip degildir cunku ses girisi yazilimi kazara degistirici tus kombinasyonlari uretmez.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Tek karakterli kisayollari tespit etmek, ses girisi yazilimiyla manuel kod incelemesi ve test gerektirir cunku kisayollar JavaScript ile uygulanir ve yalnizca DOM analizi ile guvenilir sekilde tespit edilemez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, tum klavye kisayollarinin belirlenmesini ve gereksinimleri karsilayip karsilamadiklarinin dogrulanmasini gerektirir.'),
        numbered('Klavye kisayolu uygulamalari icin uygulama belgelerini ve kodu inceleyin.'),
        numbered('Sayfada her harf, sayi, noktalama ve sembol tusunu tek tek basin. Degistirici tus olmadan tetiklenen kisayollari not edin.'),
        numbered('Bulunan her tek karakterli kisayol icin, devre disi birakma veya yeniden eslestirme mekanizmasi oldugunu dogrulayin.'),
        numbered('Belirli bilecenlere kapsamli kisayollarin yalnizca o bilesen odakta oldugunca etkin oldugunu dogrulayin.'),
        numbered('Mumkunse ses girisi yazilimiyla (Dragon NaturallySpeaking) test edin ve sayfada metin dikte etmeyi deneyin.'),
        bullet('Tum kisayollarin envanterini cikarimak icin klavye kisayolu belgelerini kontrol edin (genellikle "?" tusuyla goruntulenir).'),

        heading('Nasil duzeltilir', 'h2'),
        p('Karakter tusu kisayollarini uygun sekilde devre disi birakma, yeniden eslestirme veya kapsam belirleme mekanizmasi saglayin.'),

        heading('Kapatilaabilien veya yeniden eslestirilebilen kisayol', 'h3'),
        code(
          '// Kisayol yapilandirma nesnesi\nconst kisayollar = {\n  ara: { tus: \'s\', etkin: true },\n  yardim: { tus: \'?\', etkin: true },\n  yeniOge: { tus: \'n\', etkin: true },\n};\n\n// Depolamadan yuklenen kullanici tercihleri\nconst tercihler = kullaniciTercihleriniYukle();\nObject.keys(kisayollar).forEach(eylem => {\n  if (tercihler[eylem]) {\n    kisayollar[eylem] = { ...kisayollar[eylem], ...tercihler[eylem] };\n  }\n});\n\ndocument.addEventListener(\'keydown\', (e) => {\n  // Kullanici giris alaninda yaziyorsa atla\n  if (e.target.matches(\'input, textarea, [contenteditable]\')) return;\n  // Degistirici tus basiliysa atla\n  if (e.ctrlKey || e.altKey || e.metaKey) return;\n\n  Object.entries(kisayollar).forEach(([eylem, yapilandirma]) => {\n    if (yapilandirma.etkin && e.key === yapilandirma.tus) {\n      e.preventDefault();\n      eylemiCalistir(eylem);\n    }\n  });\n});',
          'javascript'
        ),

        heading('Kisayol yonetimi icin ayarlar arayuzu', 'h3'),
        code(
          '<fieldset>\n  <legend>Klavye Kisayollari</legend>\n  <div>\n    <label>\n      <input type="checkbox" id="kisayollar-etkin"\n        checked onchange="tumKisayollariAcKapa(this.checked)">\n      Klavye kisayollarini etkinlestir\n    </label>\n  </div>\n  <table>\n    <thead>\n      <tr><th>Eylem</th><th>Tus</th><th>Etkin</th></tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Arama</td>\n        <td><input type="text" value="s" maxlength="1"\n          onchange="kisayoluYenidenEsle(\'ara\', this.value)"></td>\n        <td><input type="checkbox" checked\n          onchange="kisayoluAcKapa(\'ara\', this.checked)"></td>\n      </tr>\n    </tbody>\n  </table>\n</fieldset>',
          'html'
        ),

        heading('Kisayollari odakli bilecenlere kapsama', 'h3'),
        code(
          '// Yanlis: tek karakterli genel kisayol\ndocument.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') sonrakineKaydir();\n  if (e.key === \'k\') oncekineKaydir();\n});\n\n// Dogru: kisayol yalnizca liste odakta oldugunca etkin\nconst liste = document.getElementById(\'oge-listesi\');\nliste.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') sonrakineKaydir();\n  if (e.key === \'k\') oncekineKaydir();\n});',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Gmail tarzi tek tuslu kisayollari (gezinme icin j/k, yildiz icin s, arsivleme icin e) devre disi birakma secenegi olmadan uygulamak.'),
        bullet('Oyun disi arayuzlerde kapatma yolu olmadan oyun tarzi klavye kontrolleri.'),
        bullet('Kullanici arama alaninda veya metin alaninda yazarken etkin kalan tek karakterli kisayollar.'),
        bullet('Kullanicilarin klavye kisayollarini goruntulemesi, devre disi birakmalari veya yeniden esletirmesi icin ayarlar sayfasi veya mekanizma olmamasi.'),
        bullet('Kisayollarin bazi kullanicilar icin verimliligi artirdigi icin kontroller olmadan kabul edilebilir oldugunu varsaymak.'),
        bullet('Degistirici olmadan tek karakter kullanan accesskey nitelikleri — tarayicilar bunlari tutarsiz sekilde isler.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.1.4: Character Key Shortcuts',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r214w3cu',
      },
      {
        title: 'W3C Technique F99: Not providing a way to turn off character key shortcuts',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F99',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r214w3cf',
      },
      {
        title: 'WebAIM: Character Key Shortcuts',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.1.4',
        source: 'webaim',
        language: 'en',
        _key: 'r214waim',
      },
      {
        title: 'Deque University: Character Key Shortcuts',
        url: 'https://dequeuniversity.com/resources/wcag2.1/2.1.4-character-key-shortcuts',
        source: 'deque',
        language: 'en',
        _key: 'r214dequ',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.1 — Character Key Shortcuts',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r214wain',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.1.4 Character Key Shortcuts — Keyboard Safety Guide',
        metaDescription:
          'Learn how to meet WCAG 2.1.4 Character Key Shortcuts. Provide mechanisms to disable or remap single-character keyboard shortcuts for speech input users.',
      },
      tr: {
        metaTitle: 'WCAG 2.1.4 Karakter Tusu Kisayollari — Klavye Guvenlik Rehberi',
        metaDescription:
          'WCAG 2.1.4 Karakter Tusu Kisayollari kriterini nasil karsilayacaginizi ogrenin. Ses girisi kullanicilari icin tek karakterli kisayollari devre disi birakma veya yeniden eslestirme mekanizmalari saglayin.',
      },
    },
  },

  // ─── 2.2.1 Timing Adjustable ──────────────────────────────────────────
  {
    criterionNumber: '2.2.1',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['timing', 'timeout', 'session'],

    title: {
      en: 'Timing Adjustable',
      tr: 'Zamanlama Ayarlanabilir',
    },

    description: {
      en: 'For each time limit that is set by the content, the user can turn off, adjust, or extend the time limit.',
      tr: 'Icerik tarafindan belirlenen her zaman siniri icin kullanici zaman sinirini kapatabilmeli, ayarlayabilmeli veya uzatabilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.1 requires that when content imposes a time limit, users must be given the ability to turn it off, adjust it, or extend it. For each time limit, at least one of the following must be true: the user can turn it off before encountering it, the user can adjust it to at least 10 times the default, or the user is warned before time expires and given at least 20 seconds to extend it with a simple action (like pressing a key), with the ability to extend at least 10 times.'
        ),
        p(
          'There are limited exceptions: real-time events where a time limit is essential (like an auction), situations where the time limit is longer than 20 hours, and essential time limits that cannot be changed without invalidating the activity. Session timeouts for security purposes must still provide a warning and extension mechanism.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with disabilities often need significantly more time to complete tasks. A blind user navigating a complex form with a screen reader may take 5-10 times longer than a sighted user. Users with cognitive disabilities may need more time to read and understand content. Users with motor impairments may type or navigate much more slowly than expected by default timeout values.'
        ),
        p(
          'Session timeouts that silently expire can cause users to lose all their work — a particularly devastating experience for someone who has spent 30 minutes carefully completing a form using assistive technology. Adjustable timing ensures that no user is unfairly penalized for needing more time.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Time limits are implemented in server-side logic and client-side JavaScript, making them difficult to detect through automated DOM analysis. Manual testing with deliberately slow interaction is required.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires identifying all time-limited functionality and verifying that users can control the timing.'),
        numbered('Identify all time limits in the application: session timeouts, form submission deadlines, auto-advancing carousels, temporary notifications.'),
        numbered('For each time limit, verify that the user can turn it off, adjust it, or extend it.'),
        numbered('If extension is the mechanism: verify a warning appears at least 20 seconds before expiry.'),
        numbered('Verify the extension action is simple (pressing any key, clicking a button) and can be performed at least 10 times.'),
        numbered('Test session timeout behavior: does the application warn before expiring? Can users extend their session?'),
        bullet('Check that auto-advancing content (carousels, slideshows) can be paused or have adjustable timing.'),

        heading('How to fix', 'h2'),
        p('Implement a timeout warning dialog that allows users to extend their session before it expires.'),

        heading('Session timeout warning', 'h3'),
        code(
          'const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes\nconst WARNING_BEFORE = 60 * 1000; // Warn 60 seconds before\nlet timeoutId, warningId;\n\nfunction startSessionTimer() {\n  clearTimeout(timeoutId);\n  clearTimeout(warningId);\n\n  warningId = setTimeout(() => {\n    showTimeoutWarning();\n  }, SESSION_TIMEOUT - WARNING_BEFORE);\n\n  timeoutId = setTimeout(() => {\n    expireSession();\n  }, SESSION_TIMEOUT);\n}\n\nfunction showTimeoutWarning() {\n  const dialog = document.getElementById(\'timeout-dialog\');\n  dialog.showModal();\n  dialog.focus();\n  startCountdown(60);\n}\n\nfunction extendSession() {\n  // Reset the timer\n  startSessionTimer();\n  document.getElementById(\'timeout-dialog\').close();\n  // Ping the server to refresh the session\n  fetch(\'/api/extend-session\', { method: \'POST\' });\n}',
          'javascript'
        ),

        heading('Timeout warning dialog HTML', 'h3'),
        code(
          '<dialog id="timeout-dialog" role="alertdialog"\n  aria-labelledby="timeout-title"\n  aria-describedby="timeout-desc">\n  <h2 id="timeout-title">Session Expiring</h2>\n  <p id="timeout-desc">\n    Your session will expire in\n    <span id="countdown">60</span> seconds.\n    Any unsaved changes will be lost.\n  </p>\n  <button onclick="extendSession()" autofocus>\n    Continue Session\n  </button>\n  <button onclick="logout()">\n    Log Out\n  </button>\n</dialog>',
          'html'
        ),

        heading('Adjustable auto-advance timing', 'h3'),
        code(
          '<!-- Carousel with timing controls -->\n<div role="region" aria-label="Featured content">\n  <div class="carousel-slides"><!-- slides --></div>\n  <div class="carousel-controls">\n    <button onclick="prevSlide()"\n      aria-label="Previous slide">&#8592;</button>\n    <button onclick="toggleAutoAdvance()"\n      aria-label="Pause auto-advance"\n      id="pause-btn">&#10074;&#10074;</button>\n    <button onclick="nextSlide()"\n      aria-label="Next slide">&#8594;</button>\n  </div>\n  <label>\n    Auto-advance speed:\n    <select onchange="setSpeed(this.value)">\n      <option value="0">Off</option>\n      <option value="10000">Slow (10s)</option>\n      <option value="5000" selected>Normal (5s)</option>\n      <option value="3000">Fast (3s)</option>\n    </select>\n  </label>\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Session timeouts that expire silently without warning, causing users to lose unsaved work.'),
        bullet('Timeout warnings that appear for only a few seconds and cannot be extended.'),
        bullet('Form submission deadlines with no option to request more time.'),
        bullet('Auto-advancing carousels or slideshows with no pause button or timing controls.'),
        bullet('Countdown timers on quiz or survey pages without extension options.'),
        bullet('Redirect timers on intermediate pages (e.g., "You will be redirected in 5 seconds") without a way to cancel.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.1, icerik bir zaman siniri uyguladiginda, kullanicilara bunu kapatma, ayarlama veya uzatma olanagi verilmesini gerektirir. Her zaman siniri icin su kosullardan en az biri dogru olmalidir: kullanici karsilasmadan once kapatabilmeli, varsayilanin en az 10 katina ayarlayabilmeli veya sure dolmadan once uyarilmali ve basit bir eylemle (bir tusa basmak gibi) en az 20 saniye uzatma firsati verilmeli ve en az 10 kez uzatabilmelidir.'
        ),
        p(
          'Sinirli istisnalar vardir: zaman sinirinin temel oldugu gercek zamanli olaylar (muzayede gibi), zaman sinirinin 20 saatten uzun oldugu durumlar ve faaliyeti gecersiz kilmadan degistirilemeyen temel zaman sinirlari. Guvenlik amaali oturum zaman asimlari yine de bir uyari ve uzatma mekanizmasi saglamalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Engelli kullanicilar genellikle gorevleri tamamlamak icin onemli olcude daha fazla zamana ihtiyac duyar. Ekran okuyucu ile karmasik bir formda gezinen gorme engelli bir kullanici, gorebilen bir kullanicidan 5-10 kat daha uzun surede tamamlayabilir. Bilissel engelli kullanicilar icerigi okumak ve anlamak icin daha fazla zamana ihtiyac duyabilir. Motor engelli kullanicilar, varsayilan zaman asimi degerlerinin beklediginden cok daha yavas yazabilir veya gezinebilir.'
        ),
        p(
          'Sessizce sona eren oturum zaman asimlari, kullanicilarin tum calismasini kaybetmelerine neden olabilir — yardimci teknoloji kullanarak 30 dakika boyunca dikkatlice bir formu dolduran biri icin ozellikle yikici bir deneyim. Ayarlanabilir zamanlama, hicbir kullanicinin daha fazla zamana ihtiyac duydugu icin haksiz yere cezalandirilmamasini saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Zaman sinirlari sunucu tarafi mantigi ve istemci tarafi JavaScript ile uygulanir, bu da otomatik DOM analizi ile tespit edilmesini zorlastirir. Kasitli olarak yavas etkilesimle manuel test gereklidir.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, tum zaman sinirli islevselliklerin belirlenmesini ve kullanicilarin zamanlamayi kontrol edebildiginin dogrulanmasini gerektirir.'),
        numbered('Uygulamadaki tum zaman sinirlarini belirleyin: oturum zaman asimlari, form gonderme son tarihleri, otomatik ilerleyen slaytlar, gecici bildirimler.'),
        numbered('Her zaman siniri icin kullanicinin kapatabilecegini, ayarlayabilecegini veya uzatabilecegini dogrulayin.'),
        numbered('Uzatma mekanizmaysa: sure dolmadan en az 20 saniye once bir uyari gorunduguncu dogrulayin.'),
        numbered('Uzatma eyleminin basit (herhangi bir tusa basma, dugmeye tiklama) ve en az 10 kez gerceklestirilelebilecegini dogrulayin.'),
        numbered('Oturum zaman asimi davranisini test edin: uygulama sona ermeden once uyari veriyor mu? Kullanicilar oturumlarini uzatabilir mi?'),
        bullet('Otomatik ilerleyen icerigin (slaytlar, slayt gosterileri) duraklatilabilecegini veya ayarlanabilir zamanlamaya sahip olup olmadigini kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Kullanicilarin oturumlarini sona ermeden once uzatmelerine olanak taniyan bir zaman asimi uyari diyalogu uygulayin.'),

        heading('Oturum zaman asimi uyarisi', 'h3'),
        code(
          'const OTURUM_ZAMANI = 15 * 60 * 1000; // 15 dakika\nconst UYARI_SURESI = 60 * 1000; // 60 saniye once uyar\nlet zamanAsimiId, uyariId;\n\nfunction oturumZamanlayicisiniBaslat() {\n  clearTimeout(zamanAsimiId);\n  clearTimeout(uyariId);\n\n  uyariId = setTimeout(() => {\n    zamanAsimiUyarisiGoster();\n  }, OTURUM_ZAMANI - UYARI_SURESI);\n\n  zamanAsimiId = setTimeout(() => {\n    oturumuSonlandir();\n  }, OTURUM_ZAMANI);\n}\n\nfunction zamanAsimiUyarisiGoster() {\n  const diyalog = document.getElementById(\'zaman-asimi-diyalogu\');\n  diyalog.showModal();\n  diyalog.focus();\n  geriSayimiBaslat(60);\n}\n\nfunction oturumuUzat() {\n  oturumZamanlayicisiniBaslat();\n  document.getElementById(\'zaman-asimi-diyalogu\').close();\n  fetch(\'/api/oturumu-uzat\', { method: \'POST\' });\n}',
          'javascript'
        ),

        heading('Zaman asimi uyari diyalogu HTML', 'h3'),
        code(
          '<dialog id="zaman-asimi-diyalogu" role="alertdialog"\n  aria-labelledby="za-baslik"\n  aria-describedby="za-aciklama">\n  <h2 id="za-baslik">Oturum Sona Eriyor</h2>\n  <p id="za-aciklama">\n    Oturumunuz <span id="geri-sayim">60</span> saniye\n    icinde sona erecek. Kaydedilmemis degisiklikler\n    kaybolacaktir.\n  </p>\n  <button onclick="oturumuUzat()" autofocus>\n    Oturuma Devam Et\n  </button>\n  <button onclick="cikisYap()">\n    Cikis Yap\n  </button>\n</dialog>',
          'html'
        ),

        heading('Ayarlanabilir otomatik ilerleme zamanlmamasi', 'h3'),
        code(
          '<!-- Zamanlama kontrolleri ile slayt gosterisi -->\n<div role="region" aria-label="One cikan icerik">\n  <div class="slaytlar"><!-- slaytlar --></div>\n  <div class="slayt-kontrolleri">\n    <button onclick="oncekiSlayt()"\n      aria-label="Onceki slayt">&#8592;</button>\n    <button onclick="otomatikIlerlemeAcKapa()"\n      aria-label="Otomatik ilerlemeyi duraklat"\n      id="duraklat-btn">&#10074;&#10074;</button>\n    <button onclick="sonrakiSlayt()"\n      aria-label="Sonraki slayt">&#8594;</button>\n  </div>\n  <label>\n    Otomatik ilerleme hizi:\n    <select onchange="hiziAyarla(this.value)">\n      <option value="0">Kapali</option>\n      <option value="10000">Yavas (10sn)</option>\n      <option value="5000" selected>Normal (5sn)</option>\n      <option value="3000">Hizli (3sn)</option>\n    </select>\n  </label>\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Uyari vermeden sessizce sona eren oturum zaman asimlari, kullanicilarin kaydedilmemis calismasini kaybetmelerine neden olur.'),
        bullet('Yalnizca birkac saniye gorunen ve uzatilamayan zaman asimi uyarilari.'),
        bullet('Daha fazla zaman isteme secenegi olmayan form gonderme son tarihleri.'),
        bullet('Duraklat dugmesi veya zamanlama kontrolleri olmayan otomatik ilerleyen slaytlar veya slayt gosterileri.'),
        bullet('Uzatma secenekleri olmayan sinav veya anket sayfalarindaki geri sayim zamanlayicilari.'),
        bullet('Iptal etme yolu olmayan ara sayfalardaki yonlendirme zamanlayicilari (ornegin "5 saniye icinde yonlendirileceksiniz").'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.1: Timing Adjustable',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r221w3cu',
      },
      {
        title: 'W3C Technique G198: Providing a way for the user to turn the time limit off',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G198',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r221w3cg',
      },
      {
        title: 'WebAIM: Timing Adjustable',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.1',
        source: 'webaim',
        language: 'en',
        _key: 'r221waim',
      },
      {
        title: 'Deque University: Time Limits',
        url: 'https://dequeuniversity.com/class/dynamic-updates2/time-limits/',
        source: 'deque',
        language: 'en',
        _key: 'r221dequ',
      },
      {
        title: 'W3C Technique SCR16: Providing a script that warns the user a time limit is about to expire',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR16',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r221w3cs',
      },
      {
        title: 'MDN: dialog element',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
        source: 'mdn',
        language: 'en',
        _key: 'r221mdnd',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.1 Timing Adjustable — Session Timeout Guide',
        metaDescription:
          'Learn how to meet WCAG 2.2.1 Timing Adjustable. Provide users with the ability to turn off, adjust, or extend time limits on web content.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.1 Zamanlama Ayarlanabilir — Oturum Zaman Asimi Rehberi',
        metaDescription:
          'WCAG 2.2.1 Zamanlama Ayarlanabilir kriterini nasil karsilayacaginizi ogrenin. Kullanicilara web icerigindeki zaman sinirlarini kapatma, ayarlama veya uzatma olanagi saglayin.',
      },
    },
  },

  // ─── 2.2.2 Pause, Stop, Hide ──────────────────────────────────────────
  {
    criterionNumber: '2.2.2',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['blink', 'marquee'],
    tags: ['timing', 'animation', 'auto-updating', 'motion'],

    title: {
      en: 'Pause, Stop, Hide',
      tr: 'Duraklat, Durdur, Gizle',
    },

    description: {
      en: 'For moving, blinking, scrolling, or auto-updating information, the user can pause, stop, or hide it.',
      tr: 'Hareket eden, yanip sonen, kayan veya otomatik guncellenen bilgiler icin kullanici bunlari duraklatabilmeli, durdurabilmeli veya gizleyebilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.2 requires that users have control over moving, blinking, scrolling, and auto-updating content. The rule has two parts: (1) for content that moves, blinks, or scrolls, starts automatically, lasts more than five seconds, and is presented alongside other content, users must be able to pause, stop, or hide it; (2) for content that auto-updates, starts automatically, and is presented alongside other content, users must be able to pause, stop, hide it, or control the frequency of updates.'
        ),
        p(
          'This criterion covers animations, auto-playing videos, scrolling news tickers, live stock quotes, auto-refreshing content areas, blinking elements, and similar dynamic content. The exception is when the movement or auto-updating is part of an activity where it is essential — for example, a progress indicator during a file upload.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Moving or blinking content can be severely distracting for users with attention deficit disorders or cognitive disabilities. These users may be unable to focus on the main content when animations or auto-updating elements are competing for their attention. For some users, the distraction is so severe that they cannot use the page at all.'
        ),
        p(
          'Screen reader users face a different challenge: auto-updating content can interrupt their reading flow. If a news ticker updates while a screen reader is reading nearby content, the reading position may be disrupted or the screen reader may announce the update, breaking concentration. Users with vestibular disorders may experience dizziness or nausea from continuous motion.'
        ),

        heading('Related axe-core rules', 'h2'),
        bullet('blink — Ensures <blink> elements are not used. The <blink> element creates content that flashes on and off, which is distracting and cannot be paused by users.'),
        bullet('marquee — Ensures <marquee> elements are not used. The <marquee> element creates scrolling text that cannot be paused, stopped, or hidden by the user.'),

        heading('How to test', 'h2'),
        p('Identify all moving, blinking, scrolling, or auto-updating content and verify user controls exist.'),
        numbered('Load the page and identify all content that moves, blinks, scrolls, or auto-updates.'),
        numbered('For each moving/blinking/scrolling element that lasts more than 5 seconds, verify a pause, stop, or hide mechanism exists.'),
        numbered('For auto-updating content, verify controls to pause, stop, hide, or adjust update frequency.'),
        numbered('Run axe-core to detect use of deprecated <blink> and <marquee> elements.'),
        numbered('Verify that pausing animations does not cause information loss — the user should be able to resume or catch up.'),
        bullet('Check that auto-playing videos have visible pause controls and do not restart automatically after being paused.'),

        heading('How to fix', 'h2'),
        p('Replace non-controllable animated elements with accessible alternatives that provide user controls.'),

        heading('Replace marquee with controllable ticker', 'h3'),
        code(
          '<!-- Bad: non-accessible marquee -->\n<marquee>Breaking news: Important update...</marquee>\n\n<!-- Good: CSS animation with pause control -->\n<div class="news-ticker" role="region"\n  aria-label="News ticker" aria-live="off">\n  <button onclick="toggleTicker()"\n    aria-label="Pause news ticker"\n    id="ticker-pause">Pause</button>\n  <div class="ticker-content" id="ticker">\n    <span>Breaking news: Important update...</span>\n  </div>\n</div>',
          'html'
        ),

        heading('Ticker CSS and JavaScript', 'h3'),
        code(
          '.ticker-content {\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.ticker-content span {\n  display: inline-block;\n  animation: scroll-left 15s linear infinite;\n}\n\n.ticker-content.paused span {\n  animation-play-state: paused;\n}\n\n@keyframes scroll-left {\n  0% { transform: translateX(100%); }\n  100% { transform: translateX(-100%); }\n}',
          'css'
        ),
        code(
          'function toggleTicker() {\n  const ticker = document.getElementById(\'ticker\');\n  const btn = document.getElementById(\'ticker-pause\');\n  const isPaused = ticker.classList.toggle(\'paused\');\n  btn.textContent = isPaused ? \'Play\' : \'Pause\';\n  btn.setAttribute(\'aria-label\',\n    isPaused ? \'Play news ticker\' : \'Pause news ticker\'\n  );\n}',
          'javascript'
        ),

        heading('Auto-updating content with controls', 'h3'),
        code(
          '<div role="region" aria-label="Live feed"\n  aria-live="polite" id="live-feed">\n  <div class="feed-controls">\n    <button onclick="toggleUpdates()"\n      id="update-toggle">Pause Updates</button>\n    <label>\n      Update frequency:\n      <select onchange="setFrequency(this.value)">\n        <option value="5000">Every 5 seconds</option>\n        <option value="15000">Every 15 seconds</option>\n        <option value="30000" selected>Every 30 seconds</option>\n        <option value="60000">Every minute</option>\n        <option value="0">Manual only</option>\n      </select>\n    </label>\n    <button onclick="refreshNow()">Refresh Now</button>\n  </div>\n  <div id="feed-content"><!-- Dynamic content --></div>\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Using <blink> or <marquee> elements, which provide no user control over the animation.'),
        bullet('Auto-playing background videos with no visible pause control.'),
        bullet('Animated hero banners or carousels that loop indefinitely without a pause mechanism.'),
        bullet('Auto-refreshing data tables or dashboards without controls to pause or adjust the refresh interval.'),
        bullet('CSS animations that loop infinitely with no JavaScript toggle to pause them.'),
        bullet('Moving content that pauses on hover but provides no keyboard-accessible pause mechanism.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.2, kullanicilarin hareket eden, yanip sonen, kayan ve otomatik guncellenen icerik uzerinde kontrol sahibi olmasini gerektirir. Kuralun iki kismi vardir: (1) otomatik olarak baslayan, bes saniyeden fazla suren ve diger icerikle birlikte sunulan hareket eden, yanip sonen veya kayan icerik icin kullanicilar duraklatabilmeli, durdurabilmeli veya gizleyebilmelidir; (2) otomatik olarak baslayan ve diger icerikle birlikte sunulan otomatik guncellenen icerik icin kullanicilar duraklatabilmeli, durdurabilmeli, gizleyebilmeli veya guncelleme sikligini kontrol edebilmelidir.'
        ),
        p(
          'Bu kriter animasyonlari, otomatik oynayan videolari, kayan haber seritlerini, canli borsa kotasyonlarini, otomatik yenilenen icerik alanlarini, yanip sonen ogeleri ve benzer dinamik icerikleri kapsar. Istisna, hareket veya otomatik guncellemenin temel oldugu durumlarda gecerlidir — ornegin bir dosya yukleme sirasindaki ilerleme gostergesi.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Hareket eden veya yanip sonen icerik, dikkat eksikligi bozuklugu veya bilissel engelli kullanicilar icin ciddi derecede dikkat dagitici olabilir. Bu kullanicilar, animasyonlar veya otomatik guncellenen ogeler dikkatleri icin rekabet ettiginde ana iceriklere odaklanamazlar. Bazi kullanicilar icin dikkat dagitma o kadar siddetlidir ki sayfayi hic kullanamazlar.'
        ),
        p(
          'Ekran okuyucu kullanicilari farkli bir zorlukla karsi karsiyar: otomatik guncellenen icerik okuma akislarini kesintiye ugratabilir. Ekran okuyucu yakin icerikleri okurken bir haber seridi guncellenirse, okuma konumu bozulabilir veya ekran okuyucu guncellemeyi duyurarak konsantrasyonu bozabilir. Vestibular bozuklugu olan kullanicilar surekli hareketten bas donmesi veya mide bulantisi yasayabilir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        bullet('blink — <blink> ogelerinin kullanilmamasini saglar. <blink> ogesi, dikkat dagitici olan ve kullanicilar tarafindan duraklatilmayan yanip sonen icerik olusturur.'),
        bullet('marquee — <marquee> ogelerinin kullanilmamasini saglar. <marquee> ogesi, kullanici tarafindan duraklatilmayan, durdurulamayan veya gizlenemeyen kayan metin olusturur.'),

        heading('Nasil test edilir', 'h2'),
        p('Tum hareket eden, yanip sonen, kayan veya otomatik guncellenen icerikleri belirleyin ve kullanici kontrollerinin var oldugunu dogrulayin.'),
        numbered('Sayfayi yukleyin ve hareket eden, yanip sonen, kayan veya otomatik guncellenen tum icerikleri belirleyin.'),
        numbered('5 saniyeden fazla suren her hareket eden/yanip sonen/kayan oge icin duraklatma, durdurma veya gizleme mekanizmasinin var oldugunu dogrulayin.'),
        numbered('Otomatik guncellenen icerik icin duraklatma, durdurma, gizleme veya guncelleme sikligini ayarlama kontrollerini dogrulayin.'),
        numbered('Kullanimdan kalkmis <blink> ve <marquee> ogelerinin kullanimini tespit etmek icin axe-core calistirin.'),
        numbered('Animasyonlari duraklatmanin bilgi kaybina neden olmadigini dogrulayin — kullanici devam edebilmeli veya icerige yetisebilmelidir.'),
        bullet('Otomatik oynayan videolarin gorunur duraklatma kontrollerine sahip olup olmadigini ve duraklattiktan sonra otomatik olarak yeniden baslamalarini kontrol edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Kontrol edilemeyen animasyonlu ogeleri, kullanici kontrolleri saglayan erisilebilir alternatiflerle degistirin.'),

        heading('Marquee yerine kontrol edilebilir haber seridi', 'h3'),
        code(
          '<!-- Yanlis: erisilemez marquee -->\n<marquee>Son dakika: Onemli guncelleme...</marquee>\n\n<!-- Dogru: duraklatma kontrollu CSS animasyonu -->\n<div class="haber-seridi" role="region"\n  aria-label="Haber seridi" aria-live="off">\n  <button onclick="seridiAcKapa()"\n    aria-label="Haber seridini duraklat"\n    id="serit-duraklat">Duraklat</button>\n  <div class="serit-icerik" id="serit">\n    <span>Son dakika: Onemli guncelleme...</span>\n  </div>\n</div>',
          'html'
        ),

        heading('Haber seridi CSS ve JavaScript', 'h3'),
        code(
          '.serit-icerik {\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.serit-icerik span {\n  display: inline-block;\n  animation: sola-kaydir 15s linear infinite;\n}\n\n.serit-icerik.duraklatildi span {\n  animation-play-state: paused;\n}\n\n@keyframes sola-kaydir {\n  0% { transform: translateX(100%); }\n  100% { transform: translateX(-100%); }\n}',
          'css'
        ),
        code(
          'function seridiAcKapa() {\n  const serit = document.getElementById(\'serit\');\n  const btn = document.getElementById(\'serit-duraklat\');\n  const duraklatildi = serit.classList.toggle(\'duraklatildi\');\n  btn.textContent = duraklatildi ? \'Oynat\' : \'Duraklat\';\n  btn.setAttribute(\'aria-label\',\n    duraklatildi ? \'Haber seridini oynat\' : \'Haber seridini duraklat\'\n  );\n}',
          'javascript'
        ),

        heading('Kontrolleri olan otomatik guncellenen icerik', 'h3'),
        code(
          '<div role="region" aria-label="Canli akis"\n  aria-live="polite" id="canli-akis">\n  <div class="akis-kontrolleri">\n    <button onclick="guncellemeleriAcKapa()"\n      id="guncelleme-dugmesi">Guncellemeleri Duraklat</button>\n    <label>\n      Guncelleme sikligi:\n      <select onchange="sikligiAyarla(this.value)">\n        <option value="5000">Her 5 saniye</option>\n        <option value="15000">Her 15 saniye</option>\n        <option value="30000" selected>Her 30 saniye</option>\n        <option value="60000">Her dakika</option>\n        <option value="0">Yalnizca manuel</option>\n      </select>\n    </label>\n    <button onclick="simdiYenile()">Simdi Yenile</button>\n  </div>\n  <div id="akis-icerigi"><!-- Dinamik icerik --></div>\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('<blink> veya <marquee> ogeleri kullanmak, animasyon uzerinde kullanici kontrolu saglamaz.'),
        bullet('Gorunur duraklatma kontrolu olmayan otomatik oynayan arka plan videolari.'),
        bullet('Duraklatma mekanizmasi olmadan surekli donguye giren animasyonlu kahraman bannerlari veya slaytlar.'),
        bullet('Duraklatma veya yenileme araligini ayarlama kontrolleri olmadan otomatik yenilenen veri tablolari veya panolar.'),
        bullet('Duraklatmak icin JavaScript degistirici olmadan sonsuz donguye giren CSS animasyonlari.'),
        bullet('Uzerine gelince duraklayan ancak klavye erisimli duraklatma mekanizmasi saglamayan hareketli icerik.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.2: Pause, Stop, Hide',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r222w3cu',
      },
      {
        title: 'W3C Technique G4: Allowing the content to be paused and restarted',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G4',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r222w3cg',
      },
      {
        title: 'WebAIM: Pause, Stop, Hide',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.2',
        source: 'webaim',
        language: 'en',
        _key: 'r222waim',
      },
      {
        title: 'Deque: blink Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/blink',
        source: 'deque',
        language: 'en',
        _key: 'r222deqb',
      },
      {
        title: 'Deque: marquee Rule',
        url: 'https://dequeuniversity.com/rules/axe/4.10/marquee',
        source: 'deque',
        language: 'en',
        _key: 'r222deqm',
      },
      {
        title: 'MDN: CSS animation-play-state',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state',
        source: 'mdn',
        language: 'en',
        _key: 'r222mdna',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.2 Pause, Stop, Hide — Animation Controls Guide',
        metaDescription:
          'Learn how to meet WCAG 2.2.2 Pause, Stop, Hide. Provide controls for users to pause, stop, or hide moving, blinking, scrolling, or auto-updating content.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.2 Duraklat, Durdur, Gizle — Animasyon Kontrolleri Rehberi',
        metaDescription:
          'WCAG 2.2.2 Duraklat, Durdur, Gizle kriterini nasil karsilayacaginizi ogrenin. Hareket eden, yanip sonen, kayan veya otomatik guncellenen icerikleri kontrol etme mekanizmalari saglayin.',
      },
    },
  },

  // ─── 2.2.3 No Timing ─────────────────────────────────────────────────
  {
    criterionNumber: '2.2.3',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['timing', 'timeout', 'aaa'],

    title: {
      en: 'No Timing',
      tr: 'Zamanlama Yok',
    },

    description: {
      en: 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
      tr: 'Etkilecimsiz senkronize medya ve gercek zamanli olaylar haric olmak uzere, zamanlama icerigin sundugu olay veya faaliyetin temel bir parcasi degildir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.3 is the AAA-level extension of 2.2.1 (Timing Adjustable). While 2.2.1 requires mechanisms to turn off, adjust, or extend time limits, 2.2.3 goes further by requiring that timing is eliminated entirely from content interactions. Users should be able to complete any task at their own pace without any time pressure whatsoever.'
        ),
        p(
          'Only two exceptions exist: non-interactive synchronized media (pre-recorded video/audio where timing is inherent to the content) and real-time events (live broadcasts, auctions). Every other type of time limit — session timeouts, form deadlines, quiz timers, auto-advancing content — must be removed entirely, not just made adjustable.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Even with adjustable timing (2.2.1), some users may not respond quickly enough to extend a timer, may not notice a timeout warning, or may find the extension process itself disruptive. Users with severe cognitive disabilities may not understand the concept of a timeout at all. Eliminating timing entirely removes these barriers.'
        ),
        p(
          'For applications targeting AAA conformance, removing time limits signals a commitment to universal access. It allows users with the most severe disabilities — including those with significant cognitive impairments — to interact with content at whatever pace they need, without anxiety about losing progress or being locked out.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting the absence of time limits requires comprehensive manual review of application logic, server-side session management, and client-side timers.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires a thorough inventory of all timed functionality and verification that timing has been removed.'),
        numbered('Audit the entire application for any form of time limit: session timeouts, form submission deadlines, auto-advancing content, countdown timers, or timed assessments.'),
        numbered('For each time limit found, determine if it qualifies as a real-time event or synchronized media exception.'),
        numbered('Verify that non-exception time limits have been completely removed, not just made adjustable.'),
        numbered('Leave pages open for extended periods (hours) and verify no session expiration occurs for content interaction.'),
        numbered('Confirm that all content can be consumed at the user\'s own pace with no time pressure.'),

        heading('How to fix', 'h2'),
        p('Remove time limits entirely or use indefinite sessions where security permits.'),

        heading('Indefinite form session', 'h3'),
        code(
          '// Instead of a session timeout, auto-save progress\nlet autoSaveInterval = setInterval(() => {\n  const formData = collectFormData();\n  localStorage.setItem(\'form-draft\', JSON.stringify(formData));\n  // Also save to server periodically\n  fetch(\'/api/save-draft\', {\n    method: \'POST\',\n    body: JSON.stringify(formData),\n    headers: { \'Content-Type\': \'application/json\' }\n  }).catch(() => {\n    // Silent fail — local storage serves as backup\n  });\n}, 30000); // Auto-save every 30 seconds\n\n// Restore draft on page load\nwindow.addEventListener(\'load\', () => {\n  const draft = localStorage.getItem(\'form-draft\');\n  if (draft) {\n    restoreFormData(JSON.parse(draft));\n  }\n});',
          'javascript'
        ),

        heading('Untimed assessment', 'h3'),
        code(
          '<!-- Bad: timed quiz -->\n<div class="quiz">\n  <p>Time remaining: <span id="timer">05:00</span></p>\n  <!-- quiz questions -->\n</div>\n\n<!-- Good: untimed quiz with progress indicator -->\n<div class="quiz">\n  <p>Question 3 of 10 — Take as much time as you need</p>\n  <progress value="3" max="10"\n    aria-label="Quiz progress: 3 of 10 questions"></progress>\n  <!-- quiz questions -->\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Making time limits adjustable but not eliminating them entirely (only satisfies 2.2.1, not 2.2.3).'),
        bullet('Session timeouts that cannot be removed due to security policies without exploring alternative session management.'),
        bullet('Timed assessments or quizzes where timing is not truly essential to measuring the skill being tested.'),
        bullet('Auto-advancing presentations that do not offer a self-paced mode.'),
        bullet('Transaction deadlines (e.g., "Complete checkout within 15 minutes") that could use cart persistence instead.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.3, 2.2.1\'in (Zamanlama Ayarlanabilir) AAA seviyesindeki uzantisidir. 2.2.1 zaman sinirlarini kapatma, ayarlama veya uzatma mekanizmalari gerektirirken, 2.2.3 zamanlamanin icerik etkilesimlerinden tamamen kaldirilmasini gerektirerek daha da ileri gider. Kullanicilar herhangi bir gorevi hicbir zaman baskisi olmadan kendi hizlarinda tamamlayabilmelidir.'
        ),
        p(
          'Yalnizca iki istisna mevcuttur: etkilecimsiz senkronize medya (zamanlamanin icerigin dogasinda oldugu onceden kaydedilmis video/ses) ve gercek zamanli olaylar (canli yayinlar, muzayedeler). Diger her tur zaman siniri — oturum zaman asimlari, form son tarihleri, sinav zamanlayicilari, otomatik ilerleyen icerik — yalnizca ayarlanabilir hale getirilmemeli, tamamen kaldirilmalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Ayarlanabilir zamanlamayla (2.2.1) bile, bazi kullanicilar bir zamanlayiciyi uzatmak icin yeterince hizli yanit veremeyebilir, bir zaman asimi uyarisini fark etmeyebilir veya uzatma surecinin kendisini rahatsiz edici bulabilir. Ciddi bilissel engelli kullanicilar zaman asimi kavramini hic anlamayabilir. Zamanlamayi tamamen ortadan kaldirmak bu engelleri ortadan kaldirir.'
        ),
        p(
          'AAA uyumlulugunu hedefleyen uygulamalar icin zaman sinirlarini kaldirmak, evrensel erisime baglilik gosterir. En ciddi engelleri olan kullanicilarin — onemli bilissel bozukluklari olanlar dahil — ilerlemeyi kaybetme veya dislanma kaygiici olmadan ihtiyac duyduklan hizda icerikle etkilesim kurmalarini saglar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Zaman sinirlarinin yoklugunu tespit etmek, uygulama mantigi, sunucu tarafi oturum yonetimi ve istemci tarafi zamanlayicilarin kapsamli manuel incelemesini gerektirir.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, tum zamanli islevselliklerin kapsamli bir envanterini ve zamanlamanin kaldirildiginin dogrulanmasini gerektirir.'),
        numbered('Tum uygulamayi herhangi bir zaman siniri formu icin denetleyin: oturum zaman asimlari, form gonderme son tarihleri, otomatik ilerleyen icerik, geri sayim zamanlayicilari veya zamanli degerlendirmeler.'),
        numbered('Bulunan her zaman siniri icin gercek zamanli olay veya senkronize medya istisnasi olarak nitelenip nitelenmedigini belirleyin.'),
        numbered('Istisna olmayan zaman sinirlarinin yalnizca ayarlanabilir hale getirilmemis, tamamen kaldirildigini dogrulayin.'),
        numbered('Sayfalari uzun sureler boyunca (saatlerce) acik birakin ve icerik etkilesimi icin oturum suresi dolmasi olmadigini dogrulayin.'),
        numbered('Tum icerigin zaman baskisi olmadan kullanicinin kendi hizinda tuketilebilecegini onaylayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Zaman sinirlarini tamamen kaldirin veya guvenligin izin verdigi yerlerde suresiz oturumlar kullanin.'),

        heading('Suresiz form oturumu', 'h3'),
        code(
          '// Oturum zaman asimi yerine ilerlemeyi otomatik kaydedin\nlet otomatikKayitAraligi = setInterval(() => {\n  const formVerisi = formVerisiniTopla();\n  localStorage.setItem(\'form-taslak\', JSON.stringify(formVerisi));\n  // Ayrica sunucuya periyodik olarak kaydet\n  fetch(\'/api/taslak-kaydet\', {\n    method: \'POST\',\n    body: JSON.stringify(formVerisi),\n    headers: { \'Content-Type\': \'application/json\' }\n  }).catch(() => {\n    // Sessiz bsarisizlik — yerel depolama yedek olarak hizmet eder\n  });\n}, 30000); // Her 30 saniyede otomatik kaydet\n\n// Sayfa yuklemesinde taslagi geri yukle\nwindow.addEventListener(\'load\', () => {\n  const taslak = localStorage.getItem(\'form-taslak\');\n  if (taslak) {\n    formVerisiniGeriYukle(JSON.parse(taslak));\n  }\n});',
          'javascript'
        ),

        heading('Zamansiz degerlendirme', 'h3'),
        code(
          '<!-- Yanlis: zamanli sinav -->\n<div class="sinav">\n  <p>Kalan sure: <span id="zamanlayici">05:00</span></p>\n  <!-- sinav sorulari -->\n</div>\n\n<!-- Dogru: ilerleme gostergeli zamansiz sinav -->\n<div class="sinav">\n  <p>Soru 3/10 — Ihtiyaciniz kadar zaman ayin</p>\n  <progress value="3" max="10"\n    aria-label="Sinav ilerlemesi: 10 sorunun 3. sorusu"></progress>\n  <!-- sinav sorulari -->\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Zaman sinirlarini tamamen ortadan kaldirmak yerine ayarlanabilir hale getirmek (yalnizca 2.2.1\'i karsilar, 2.2.3\'u degil).'),
        bullet('Alternatif oturum yonetimi arastirmadan guvenlik politikalari nedeniyle kaldirilmayan oturum zaman asimlari.'),
        bullet('Zamanlamanin test edilen beceriyi olcmek icin gercekten temel olmadigi zamanli degerlendirmeler veya sinavlar.'),
        bullet('Kendi hizinda bir mod sunmayan otomatik ilerleyen sunumlar.'),
        bullet('Sepet kaliciligi yerine kullanilan islem son tarihleri (ornegin "15 dakika icinde odemeyi tamamlayin").'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.3: No Timing',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/no-timing.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r223w3cu',
      },
      {
        title: 'W3C Technique G5: Allowing users to complete an activity without any time limit',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G5',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r223w3cg',
      },
      {
        title: 'WebAIM: No Timing',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.3',
        source: 'webaim',
        language: 'en',
        _key: 'r223waim',
      },
      {
        title: 'Deque University: Time Limits',
        url: 'https://dequeuniversity.com/class/dynamic-updates2/time-limits/',
        source: 'deque',
        language: 'en',
        _key: 'r223dequ',
      },
      {
        title: 'W3C WAI: How People with Disabilities Use the Web — Timed Interactions',
        url: 'https://www.w3.org/WAI/people-use-web/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r223waip',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.3 No Timing — Eliminate Time Limits Guide',
        metaDescription:
          'Learn about WCAG 2.2.3 No Timing. This AAA criterion requires eliminating time limits entirely so users can complete activities at their own pace.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.3 Zamanlama Yok — Zaman Sinirlarini Kaldirma Rehberi',
        metaDescription:
          'WCAG 2.2.3 Zamanlama Yok hakkinda bilgi edinin. Bu AAA kriteri, kullanicilarin faaliyetleri kendi hizlarinda tamamlayabilmeleri icin zaman sinirlarinin tamamen kaldirilmasini gerektirir.',
      },
    },
  },

  // ─── 2.2.4 Interruptions ─────────────────────────────────────────────
  {
    criterionNumber: '2.2.4',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['timing', 'notifications', 'interruptions', 'aaa'],

    title: {
      en: 'Interruptions',
      tr: 'Kesintiler',
    },

    description: {
      en: 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
      tr: 'Acil durumlar haric, kesintiler kullanici tarafindan ertelenebilmeli veya bastirilabilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.4 requires that users can postpone or suppress interruptions such as alerts, notifications, live updates, and other content changes that demand attention. The only exception is for genuine emergencies — warnings about health, safety, or data integrity that require immediate user awareness.'
        ),
        p(
          'This applies to push notifications, toast messages, chat popups, promotional overlays, system alerts, live content updates, and any mechanism that diverts the user\'s attention from their current task. Users must have a way to turn these interruptions off, schedule them for later, or prevent them from appearing until they choose to check for updates.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Interruptions are particularly disruptive for users with cognitive disabilities and attention deficit disorders. Each notification or alert forces a context switch that may take significant mental effort to recover from. Users with memory impairments may lose track of what they were doing entirely after being interrupted, having to start their task over.'
        ),
        p(
          'Screen reader users are especially affected because notifications that trigger ARIA live regions will interrupt whatever the screen reader is currently reading. Even users without disabilities experience reduced productivity and increased stress when subjected to constant interruptions. Research shows it takes an average of 23 minutes to fully recover focus after an interruption.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Interruption behavior depends on runtime JavaScript logic, push notification APIs, and server-side event systems that cannot be detected through static DOM analysis.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires monitoring the page over time to identify all sources of interruption.'),
        numbered('Use the application for an extended period and note every notification, alert, popup, or unsolicited content change.'),
        numbered('For each interruption, check whether a setting exists to turn it off or postpone it.'),
        numbered('Verify that notification preferences are available and functional (e.g., "Do not disturb" mode).'),
        numbered('Check that ARIA live regions are used appropriately and can be suppressed by user preference.'),
        numbered('Test with a screen reader to verify that interruptions can be controlled and do not disrupt reading flow uncontrollably.'),

        heading('How to fix', 'h2'),
        p('Provide comprehensive notification preferences that allow users to control when and how they receive interruptions.'),

        heading('Notification preferences', 'h3'),
        code(
          '<fieldset>\n  <legend>Notification Preferences</legend>\n\n  <label>\n    <input type="checkbox" id="notif-enabled" checked\n      onchange="toggleNotifications(this.checked)">\n    Enable notifications\n  </label>\n\n  <fieldset id="notif-options">\n    <legend>When enabled, show notifications for:</legend>\n    <label>\n      <input type="checkbox" name="notif-type"\n        value="messages" checked> New messages\n    </label>\n    <label>\n      <input type="checkbox" name="notif-type"\n        value="updates"> Content updates\n    </label>\n    <label>\n      <input type="checkbox" name="notif-type"\n        value="promotions"> Promotions\n    </label>\n  </fieldset>\n\n  <label>\n    <input type="checkbox" id="dnd-mode"\n      onchange="toggleDoNotDisturb(this.checked)">\n    Do not disturb mode\n  </label>\n</fieldset>',
          'html'
        ),

        heading('Controllable notification system', 'h3'),
        code(
          'class NotificationManager {\n  constructor() {\n    this.enabled = true;\n    this.doNotDisturb = false;\n    this.queue = [];\n    this.allowedTypes = new Set([\'messages\', \'updates\']);\n  }\n\n  notify(message, type = \'info\', isEmergency = false) {\n    // Emergencies always show\n    if (isEmergency) {\n      this.showNotification(message, \'emergency\');\n      return;\n    }\n\n    // Respect user preferences\n    if (!this.enabled || !this.allowedTypes.has(type)) return;\n\n    if (this.doNotDisturb) {\n      this.queue.push({ message, type });\n      return;\n    }\n\n    this.showNotification(message, type);\n  }\n\n  showQueued() {\n    this.queue.forEach(item =>\n      this.showNotification(item.message, item.type)\n    );\n    this.queue = [];\n  }\n}',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Toast notifications that appear automatically with no way to disable them in settings.'),
        bullet('Chat widgets that pop up unsolicited with no preference to suppress them.'),
        bullet('ARIA live regions that announce updates constantly with no user control over the behavior.'),
        bullet('Promotional overlays or banners that appear at timed intervals with no opt-out mechanism.'),
        bullet('Real-time content feeds that push updates without a way to pause or batch them.'),
        bullet('Browser push notifications that are requested immediately on page load without context.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.4, kullanicilarin uyarilar, bildirimler, canli guncellemeler ve dikkat gerektiren diger icerik degisiklikleri gibi kesintileri erteleyebilmesini veya bastirabilmesini gerektirir. Tek istisna gercek acil durumlar icindir — saglik, guvenlik veya veri butunlugu hakkinda aninda kullanici farkindaligu gerektiren uyarilar.'
        ),
        p(
          'Bu, push bildirimleri, toast mesajlari, sohbet acilik pencereleri, tanitim katmanlari, sistem uyarilari, canli icerik guncellemeleri ve kullanicinin dikkatini mevcut gorevinden saptiran herhangi bir mekanizma icin gecerlidir. Kullanicilar bu kesintileri kapatma, daha sonraya zamanlama veya guncellemeleri kontrol etmeyi secene kadar gorumemelerini saglamak icin bir yola sahip olmalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Kesintiler ozellikle bilissel engelli ve dikkat eksikligi bozuklugu olan kullanicilar icin rahatsiz edicidir. Her bildirim veya uyari, toparlanmak icin onemli zihinsel caba gerektirebilecek bir baglam degisikligi zorlar. Bellek bozuklugu olan kullanicilar, kesintiye ugradiktan sonra ne yaptiklarin tamamen unutabilir ve gorevlerine bastan baslamak zorunda kalabilir.'
        ),
        p(
          'Ekran okuyucu kullanicilari ozellikle etkilenir cunku ARIA canli alanlarini tetikleyen bildirimler, ekran okuyucunun o anda okudugunu keser. Engeli olmayan kullanicilar bile surekli kesintilere maruz kaldiginda azalan uretkenlik ve artan stres yasarlar. Arastirmalar, bir kesintiden sonra odagi tamamen yeniden kazanmanin ortalama 23 dakika aldidini gostermektedir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Kesinti davranisi, calisma zamani JavaScript mantigi, push bildirim API\'leri ve statik DOM analizi ile tespit edilemeyen sunucu tarafi olay sistemlerine baglidir.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, tum kesinti kaynaklarini belirlemek icin sayfa uzerinde zaman icerisinde izleme gerektirir.'),
        numbered('Uygulamayi uzun bir sure kullanin ve her bildirim, uyari, acilir pencere veya istenmeyen icerik degisikligini not edin.'),
        numbered('Her kesinti icin bunu kapatmak veya ertelemek icin bir ayar olup olmadigini kontrol edin.'),
        numbered('Bildirim tercihlerinin mevcut ve islevsel oldugunu dogrulayin (ornegin "Rahatsiz etmeyin" modu).'),
        numbered('ARIA canli alanlarinin uygun sekilde kullanildigini ve kullanici tercihi ile bastirilabilecegini kontrol edin.'),
        numbered('Kesintilerin kontrol edilebilecegini ve okuma akisini kontrolsuz sekilde bozmadidini dogrulamak icin bir ekran okuyucu ile test edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Kullanicilarin kesintileri ne zaman ve nasil alacaklarini kontrol etmelerine olanak taniyan kapsamli bildirim tercihleri saglayin.'),

        heading('Bildirim tercihleri', 'h3'),
        code(
          '<fieldset>\n  <legend>Bildirim Tercihleri</legend>\n\n  <label>\n    <input type="checkbox" id="bildirim-etkin" checked\n      onchange="bildirimleriAcKapa(this.checked)">\n    Bildirimleri etkinlestir\n  </label>\n\n  <fieldset id="bildirim-secenekleri">\n    <legend>Etkinlestirildiginde bildirimleri goster:</legend>\n    <label>\n      <input type="checkbox" name="bildirim-turu"\n        value="mesajlar" checked> Yeni mesajlar\n    </label>\n    <label>\n      <input type="checkbox" name="bildirim-turu"\n        value="guncellemeler"> Icerik guncellemeleri\n    </label>\n    <label>\n      <input type="checkbox" name="bildirim-turu"\n        value="tanitimlar"> Tanitimlar\n    </label>\n  </fieldset>\n\n  <label>\n    <input type="checkbox" id="re-modu"\n      onchange="rahatsizEtmeyinModuAcKapa(this.checked)">\n    Rahatsiz etmeyin modu\n  </label>\n</fieldset>',
          'html'
        ),

        heading('Kontrol edilebilir bildirim sistemi', 'h3'),
        code(
          'class BildirimYoneticisi {\n  constructor() {\n    this.etkin = true;\n    this.rahatsizEtmeyin = false;\n    this.kuyruk = [];\n    this.izinVerilenTurler = new Set([\'mesajlar\', \'guncellemeler\']);\n  }\n\n  bildir(mesaj, tur = \'bilgi\', acilDurum = false) {\n    // Acil durumlar her zaman gosterilir\n    if (acilDurum) {\n      this.bildirimiGoster(mesaj, \'acil\');\n      return;\n    }\n\n    // Kullanici tercihlerine say\n    if (!this.etkin || !this.izinVerilenTurler.has(tur)) return;\n\n    if (this.rahatsizEtmeyin) {\n      this.kuyruk.push({ mesaj, tur });\n      return;\n    }\n\n    this.bildirimiGoster(mesaj, tur);\n  }\n\n  kuyruklanmislariGoster() {\n    this.kuyruk.forEach(oge =>\n      this.bildirimiGoster(oge.mesaj, oge.tur)\n    );\n    this.kuyruk = [];\n  }\n}',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Ayarlarda devre disi birakma yolu olmadan otomatik olarak gorunen toast bildirimleri.'),
        bullet('Bastirma tercihi olmadan istenmeyen sekilde acilan sohbet bilesenelri.'),
        bullet('Davranis uzerinde kullanici kontrolu olmadan surekli guncelemeleri duyuran ARIA canli alanlari.'),
        bullet('Zamanli araliklarla gorunen ve vazgecme mekanizmasi olmayan tanitim katmanlari veya bannerler.'),
        bullet('Duraklatma veya gruplama yolu olmadan guncellemeleri iten gercek zamanli icerik akislari.'),
        bullet('Baglam olmadan sayfa yuklemesinde hemen istenen tarayici push bildirimleri.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.4: Interruptions',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r224w3cu',
      },
      {
        title: 'W3C Technique G75: Providing a mechanism to postpone any updating of content',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G75',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r224w3cg',
      },
      {
        title: 'WebAIM: Interruptions',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.4',
        source: 'webaim',
        language: 'en',
        _key: 'r224waim',
      },
      {
        title: 'Deque University: Notifications and Feedback',
        url: 'https://dequeuniversity.com/class/dynamic-updates2/notification/',
        source: 'deque',
        language: 'en',
        _key: 'r224dequ',
      },
      {
        title: 'MDN: Notifications API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API',
        source: 'mdn',
        language: 'en',
        _key: 'r224mdnn',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.4 Interruptions — Notification Control Guide',
        metaDescription:
          'Learn about WCAG 2.2.4 Interruptions. This AAA criterion requires that users can postpone or suppress all non-emergency interruptions.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.4 Kesintiler — Bildirim Kontrolu Rehberi',
        metaDescription:
          'WCAG 2.2.4 Kesintiler hakkinda bilgi edinin. Bu AAA kriteri, kullanicilarin acil olmayan tum kesintileri erteleyebilmesini veya bastirabilmesini gerektirir.',
      },
    },
  },

  // ─── 2.2.5 Re-authenticating ──────────────────────────────────────────
  {
    criterionNumber: '2.2.5',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['timing', 'session', 'authentication', 'aaa'],

    title: {
      en: 'Re-authenticating',
      tr: 'Yeniden Kimlik Dogrulama',
    },

    description: {
      en: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
      tr: 'Kimlik dogrulanmis bir oturum sona erdiginde, kullanici yeniden kimlik dogrulamasi yaptiktan sonra veri kaybi olmadan faaliyete devam edebilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.5 requires that when an authenticated session expires and the user must re-authenticate (log in again), the application preserves all data and state from before the session expired. After logging back in, the user should be returned to exactly where they were, with all form data, selections, and progress intact.'
        ),
        p(
          'This does not prevent sessions from expiring — security requirements may necessitate timeouts. However, it ensures that session expiration does not punish users by destroying their work. The application must save the user\'s state server-side or client-side before the session expires and restore it after re-authentication.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with disabilities often take significantly longer to complete tasks. A blind user filling out a complex form may take 30-60 minutes using a screen reader. If the session expires at minute 45 and all form data is lost, the user must start over — potentially losing an hour of careful work. This disproportionately affects disabled users who need more time.'
        ),
        p(
          'Even for users without disabilities, losing data after a session timeout is frustrating and erodes trust. For users with cognitive disabilities, having to remember and re-enter information after an interruption may be exceptionally difficult. Preserving state across re-authentication ensures continuity and respects the user\'s investment of time and effort.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Session management and data preservation are server-side concerns that cannot be detected through client-side DOM analysis. Manual testing across session expiration boundaries is required.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires triggering session expiration during various tasks and verifying data preservation.'),
        numbered('Begin filling out a form or performing a multi-step task while authenticated.'),
        numbered('Wait for the session to expire (or manually expire it through developer tools or server configuration).'),
        numbered('Re-authenticate (log back in).'),
        numbered('Verify that all previously entered form data, selections, scroll position, and task progress are restored.'),
        numbered('Test across different types of activities: forms, file uploads, multi-step wizards, content editing.'),
        bullet('Verify that the user is redirected to the same page and context they were on before the session expired.'),

        heading('How to fix', 'h2'),
        p('Implement state preservation that saves user progress before or during session expiration.'),

        heading('Auto-save with session restoration', 'h3'),
        code(
          '// Save form state periodically and before session expires\nfunction autoSaveFormState(formId) {\n  const form = document.getElementById(formId);\n  const formData = new FormData(form);\n  const state = Object.fromEntries(formData.entries());\n\n  // Save to server (associated with user account)\n  fetch(\'/api/save-draft\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/json\' },\n    body: JSON.stringify({\n      formId,\n      state,\n      url: window.location.href,\n      scrollPosition: window.scrollY\n    })\n  });\n}\n\n// Auto-save every 30 seconds\nsetInterval(() => autoSaveFormState(\'main-form\'), 30000);\n\n// Save on visibility change (user switches tabs)\ndocument.addEventListener(\'visibilitychange\', () => {\n  if (document.hidden) autoSaveFormState(\'main-form\');\n});',
          'javascript'
        ),

        heading('Restore state after re-authentication', 'h3'),
        code(
          '// After successful login, check for saved state\nasync function onLoginSuccess(userId) {\n  const response = await fetch(\n    `/api/restore-draft?userId=${userId}`\n  );\n  const draft = await response.json();\n\n  if (draft && draft.url) {\n    // Redirect to the page they were on\n    sessionStorage.setItem(\'restore-draft\', JSON.stringify(draft));\n    window.location.href = draft.url;\n  }\n}\n\n// On page load, restore the draft if it exists\nwindow.addEventListener(\'load\', () => {\n  const draft = sessionStorage.getItem(\'restore-draft\');\n  if (draft) {\n    const { state, scrollPosition } = JSON.parse(draft);\n    restoreFormData(state);\n    window.scrollTo(0, scrollPosition);\n    sessionStorage.removeItem(\'restore-draft\');\n    showNotification(\'Your previous progress has been restored.\');\n  }\n});',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Session expiration that redirects to the login page and then to the homepage instead of the original page.'),
        bullet('Saving form state in sessionStorage only — this is cleared when the browser tab is closed.'),
        bullet('Not saving state for multi-step wizards, losing the user\'s position in a workflow.'),
        bullet('Restoring form inputs but not restoring file upload selections, which require re-uploading.'),
        bullet('Not informing the user that their progress has been saved and will be restored after re-authentication.'),
        bullet('Only preserving state for the most recent page, not for complex multi-tab workflows.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.5, kimlik dogrulanmis bir oturum sona erdiginde ve kullanici yeniden kimlik dogrulamasi yapmasi gerektiginde (tekrar giris yapmak), uygulamanin oturum sona ermeden onceki tum verileri ve durumu korumasini gerektirir. Tekrar giris yaptiktan sonra kullanici, tum form verileri, secimler ve ilerlemesi bozulmadan tam olarak kaldigi yere dondurilmelidir.'
        ),
        p(
          'Bu, oturumlarin sona ermesini engellemez — guvenlik gereksinimleri zaman asimlarini zorunlu kilabilir. Ancak oturum suresinin dolmasinin kullanicilari calismasini yok ederek cezalandirmamasini saglar. Uygulama, oturum sona ermeden once kullanicinin durumunu sunucu veya istemci tarafinda kaydetmeli ve yeniden kimlik dogrulamasindan sonra geri yuklemelidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Engelli kullanicilar genellikle gorevleri tamamlamak icin onemli olcude daha uzun sure harcarlar. Karmasik bir formu ekran okuyucu ile dolduran gorme engelli bir kullanici 30-60 dakika surebilir. Oturum 45. dakikada sona erer ve tum form verileri kaybolursa, kullanici bastan baslamak zorundadir — potansiyel olarak bir saatlik dikkatli calismayi kaybeder. Bu, daha fazla zamana ihtiyac duyan engelli kullanicilari orantisiz olarak etkiler.'
        ),
        p(
          'Engeli olmayan kullanicilar icin bile, oturum zaman acimindan sonra veri kaybetmek sinir bozucu ve guveni zedeler. Bilissel engelli kullanicilar icin bir kesintiden sonra bilgileri hatirlamak ve yeniden girmek son derece zor olabilir. Yeniden kimlik dogrulama boyunca durumu korumak, surekliligi saglar ve kullanicinin zaman ve caba yatirimina saygi gosterir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Oturum yonetimi ve veri koruma, istemci tarafi DOM analizi ile tespit edilemeyen sunucu tarafi konularidir. Oturum suresi dolma sinirlari boyunca manuel test gereklidir.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, cesitli gorevler sirasinda oturum suresinin dolmasini tetiklemeyi ve veri korumanin dogrulanmasini gerektirir.'),
        numbered('Kimlik dogrulanmisken bir formu doldurmaya veya cok adimli bir gorev gerceklestirmeye baslayin.'),
        numbered('Oturumun sona ermesini bekleyin (veya gelistirici araclari ya da sunucu yapilandirmasi araciligiyla manuel olarak sonlandirin).'),
        numbered('Yeniden kimlik dogrulamasi yapin (tekrar giris yapin).'),
        numbered('Onceden girilen tum form verilerinin, secimlerin, kayma konumunun ve gorev ilerlemesinin geri yuklendigini dogrulayin.'),
        numbered('Farkli etkinlik turleri boyunca test edin: formlar, dosya yuklemeleri, cok adimli sihirbazlar, icerik duzenleme.'),
        bullet('Kullanicinin oturum sona ermeden once oldugu sayfa ve baglama yonlendirildigini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Oturum suresi dolmadan once veya sirasinda kullanici ilerlemesini kaydeden durum koruma uygulayin.'),

        heading('Oturum geri yuklemeli otomatik kaydetme', 'h3'),
        code(
          '// Form durumunu periyodik olarak ve oturum sona ermeden once kaydedin\nfunction formDurumunuOtomatikKaydet(formId) {\n  const form = document.getElementById(formId);\n  const formVerisi = new FormData(form);\n  const durum = Object.fromEntries(formVerisi.entries());\n\n  // Sunucuya kaydet (kullanici hesabiyla iliskili)\n  fetch(\'/api/taslak-kaydet\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/json\' },\n    body: JSON.stringify({\n      formId,\n      durum,\n      url: window.location.href,\n      kaydirmaKonumu: window.scrollY\n    })\n  });\n}\n\n// Her 30 saniyede otomatik kaydet\nsetInterval(() => formDurumunuOtomatikKaydet(\'ana-form\'), 30000);\n\n// Gorunurluk degisikliginde kaydet\ndocument.addEventListener(\'visibilitychange\', () => {\n  if (document.hidden) formDurumunuOtomatikKaydet(\'ana-form\');\n});',
          'javascript'
        ),

        heading('Yeniden kimlik dogrulamasindan sonra durumu geri yukleme', 'h3'),
        code(
          '// Basarili giristen sonra kaydedilmis durumu kontrol edin\nasync function girisBasariliysa(kullaniciId) {\n  const yanit = await fetch(\n    `/api/taslak-geri-yukle?kullaniciId=${kullaniciId}`\n  );\n  const taslak = await yanit.json();\n\n  if (taslak && taslak.url) {\n    sessionStorage.setItem(\'geri-yukle-taslak\', JSON.stringify(taslak));\n    window.location.href = taslak.url;\n  }\n}\n\n// Sayfa yuklemesinde taslagi geri yukle\nwindow.addEventListener(\'load\', () => {\n  const taslak = sessionStorage.getItem(\'geri-yukle-taslak\');\n  if (taslak) {\n    const { durum, kaydirmaKonumu } = JSON.parse(taslak);\n    formVerisiniGeriYukle(durum);\n    window.scrollTo(0, kaydirmaKonumu);\n    sessionStorage.removeItem(\'geri-yukle-taslak\');\n    bildirimiGoster(\'Onceki ilerlemeniz geri yuklendi.\');\n  }\n});',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Oturum suresinin dolmasi, giris sayfasina ve ardindan orijinal sayfa yerine ana sayfaya yonlendirmek.'),
        bullet('Form durumunu yalnizca sessionStorage\'da kaydetmek — bu, tarayici sekmesi kapatildiginda temizlenir.'),
        bullet('Cok adimli sihirbazlar icin durumu kaydetmemek, kullanicinin is akisindaki konumunu kaybetmek.'),
        bullet('Form girislerini geri yuklemek ancak yeniden yukleme gerektiren dosya yukleme secimlerini geri yuklememek.'),
        bullet('Kullaniciyi ilerlemesinin kaydedildigini ve yeniden kimlik dogrulamasindan sonra geri yuklenecegini bildirmemek.'),
        bullet('Yalnizca en son sayfa icin durumu korumak, karmasik cok sekmeli is akislari icin degil.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.5: Re-authenticating',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/re-authenticating.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r225w3cu',
      },
      {
        title: 'W3C Technique G105: Saving data so that it can be used after a user re-authenticates',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G105',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r225w3cg',
      },
      {
        title: 'WebAIM: Re-authenticating',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.5',
        source: 'webaim',
        language: 'en',
        _key: 'r225waim',
      },
      {
        title: 'Deque University: Session Timeout and Data Loss',
        url: 'https://dequeuniversity.com/class/dynamic-updates2/time-limits/',
        source: 'deque',
        language: 'en',
        _key: 'r225dequ',
      },
      {
        title: 'MDN: Web Storage API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
        source: 'mdn',
        language: 'en',
        _key: 'r225mdns',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.5 Re-authenticating — Session Data Preservation Guide',
        metaDescription:
          'Learn about WCAG 2.2.5 Re-authenticating. Ensure users can continue activities without data loss after an authenticated session expires and they log back in.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.5 Yeniden Kimlik Dogrulama — Oturum Verisi Koruma Rehberi',
        metaDescription:
          'WCAG 2.2.5 Yeniden Kimlik Dogrulama hakkinda bilgi edinin. Kimlik dogrulanmis oturum sona erdikten ve yeniden giris yaptiktan sonra kullanicilarin veri kaybi olmadan faaliyete devam edebilmesini saglayin.',
      },
    },
  },

  // ─── 2.2.6 Timeouts ──────────────────────────────────────────────────
  {
    criterionNumber: '2.2.6',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['timing', 'timeout', 'session', 'data-loss', 'aaa'],

    title: {
      en: 'Timeouts',
      tr: 'Zaman Asimlari',
    },

    description: {
      en: 'Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours of inactivity.',
      tr: 'Veri kaybi yaratabilecek kullanici etkinsizligi suresi hakkinda kullanicilar uyarilmalidir, veriler 20 saatten fazla etkinsizlik boyunca korunmadigi surece.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.2.6 requires that users are informed about any inactivity timeout that could cause data loss. If the application will lose user data after a period of inactivity (session timeout, shopping cart expiration, form data loss), the user must be warned about the duration at the start of the process. The exception is when data is preserved for more than 20 hours of inactivity.'
        ),
        p(
          'This is different from 2.2.1 (which requires adjustable timing) and 2.2.5 (which requires data preservation after re-authentication). This criterion is specifically about transparency: telling users upfront that a timeout exists and how long they have, so they can plan accordingly. Users should know before starting a task that they have a limited window to complete it.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Many users are unaware that sessions can expire or that inactivity can cause data loss. Users with disabilities who need extra time to complete tasks may step away from a computer to rest, may switch to a different assistive technology, or may simply work more slowly than the timeout anticipates. Without a clear warning about the timeout duration, these users may unknowingly lose their work.'
        ),
        p(
          'Transparency about timeouts allows users to plan their approach. A user who knows they have 15 minutes to complete a form can decide whether to gather all information first. A user who knows a shopping cart expires after 30 minutes can prioritize completing their purchase. This information is especially critical for users who need to plan rest breaks or who work at a slower pace.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Timeout warnings are a design and content requirement that must be verified through manual review of the user interface and documentation.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires identifying all inactivity timeouts and verifying that users are warned about them.'),
        numbered('Identify all places where user data can be lost due to inactivity: session timeouts, form data expiration, shopping cart timeouts.'),
        numbered('Verify that users are warned about the timeout duration before they begin the affected activity.'),
        numbered('Check that the warning is clear, prominent, and understandable (not buried in terms of service).'),
        numbered('Verify the stated timeout duration is accurate.'),
        numbered('If data is preserved for more than 20 hours, verify this claim is accurate through extended inactivity testing.'),

        heading('How to fix', 'h2'),
        p('Provide clear timeout warnings at the beginning of any process where inactivity could cause data loss.'),

        heading('Timeout warning on forms', 'h3'),
        code(
          '<form id="application-form">\n  <div role="alert" class="timeout-notice">\n    <p>\n      <strong>Important:</strong> This form will save your\n      progress automatically. However, your session will\n      expire after 30 minutes of inactivity. Please ensure\n      you complete and submit the form within this time,\n      or your unsaved changes may be lost.\n    </p>\n  </div>\n\n  <!-- Form fields -->\n  <label for="name">Full name</label>\n  <input type="text" id="name" name="name">\n  <!-- ... more fields ... -->\n</form>',
          'html'
        ),

        heading('Shopping cart timeout notice', 'h3'),
        code(
          '<div class="cart-header">\n  <h1>Your Shopping Cart</h1>\n  <p class="timeout-info" role="status">\n    Items in your cart are reserved for\n    <strong>60 minutes</strong>. After that, they may\n    become unavailable if stock is limited.\n  </p>\n</div>',
          'html'
        ),

        heading('Login page timeout disclosure', 'h3'),
        code(
          '<div class="session-info">\n  <h2>Session Information</h2>\n  <p>\n    For security, your session will expire after\n    <strong>15 minutes</strong> of inactivity.\n    You will be prompted to extend your session\n    before it expires.\n  </p>\n</div>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Session timeouts that are only documented in the terms of service or help pages, not at the point of interaction.'),
        bullet('Vague warnings like "Your session may expire" without specifying the duration.'),
        bullet('Timeout information that is visually present but not accessible to screen readers.'),
        bullet('Different timeout durations for different parts of the application without individual warnings.'),
        bullet('Shopping carts that silently expire without any upfront timeout disclosure.'),
        bullet('Not warning about inactivity-specific timeouts (as opposed to absolute session duration).'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.2.6, veri kaybina neden olabilecek herhangi bir etkinsizlik zaman asimi hakkinda kullanicilarin bilgilendirilmesini gerektirir. Uygulama bir etkinsizlik doneminden sonra kullanici verilerini kaybedecekse (oturum zaman asimi, alisveris sepeti suresi dolmasi, form verisi kaybi), kullanici surecrn basinda sure hakkinda uyarilmalidir. Istisna, verilerin 20 saatten fazla etkinsizlik boyunca korunmasid.'
        ),
        p(
          'Bu, 2.2.1\'den (ayarlanabilir zamanlama gerektiren) ve 2.2.5\'ten (yeniden kimlik dogrulamasindan sonra veri koruma gerektiren) farklidir. Bu kriter ozellikle seffaflik hakkindadir: kullanicilara bir zaman asiminin var oldugunu ve ne kadar sureleri oldugunu onceden soylemek, boylece buna gore plan yapabilirler. Kullanicilar bir goreve baslamadan once tamamlamak icin sinirli bir pencereleri oldugunu bilmelidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Bircok kullanici oturumlarin sona erebileceginin veya etkinsizligin veri kaybina neden olabileceginin farkinda degildir. Gorevleri tamamlamak icin ekstra zamana ihtiyac duyan engelli kullanicilar dinlenmek icin bilgisayardan uzaklasabilir, farkli bir yardimci teknolojiye gecebilir veya zaman asiminin ongordugundan daha yavas calisabilir. Zaman asimi suresi hakkinda acik bir uyari olmadan bu kullanicilar bilmeden calismalarini kaybedebilir.'
        ),
        p(
          'Zaman asimlari hakkinda seffaflik, kullanicilarin yaklasimlarini planlamalarini saglar. 15 dakika icinde bir formu tamamlamasi gerektigini bilen bir kullanici once tum bilgileri toplayip toplamayacagina karar verebilir. Alisveris sepetinin 30 dakika sonra sona erecegini bilen bir kullanici satin almayi tamamlamayi oncelik haline getirebilir. Bu bilgi ozellikle dinlenme molalari planlamasi gereken veya daha yavas tempoda calisan kullanicilar icin kritiktir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Zaman asimi uyarilari, kullanici arayuzu ve belgelerin manuel incelemesi ile dogrulanmasi gereken bir tasarim ve icerik gereksinimidir.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, tum etkinsizlik zaman asimlarinin belirlenmesini ve kullanicilarin bunlar hakkinda uyarildiginin dogrulanmasini gerektirir.'),
        numbered('Etkinsizlik nedeniyle kullanici verilerinin kaybolabilecegi tum yerleri belirleyin: oturum zaman asimlari, form verisi suresi dolmasi, alisveris sepeti zaman asimlari.'),
        numbered('Kullanicilarin etkilenen faaliyete baslamadan once zaman asimi suresi hakkinda uyarildigini dogrulayin.'),
        numbered('Uyarinin acik, belirgin ve anlasilir oldugundan (kullanim kosullarina gomulmemis) emin olun.'),
        numbered('Belirtilen zaman asimi suresinin dogru oldugunu dogrulayin.'),
        numbered('Veriler 20 saatten fazla korunuyorsa, bu iddianin uzun sureli etkinsizlik testi ile dogru oldugunu dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Etkinsizligin veri kaybina neden olabilecegi herhangi bir surecin basinda acik zaman asimi uyarilari saglayin.'),

        heading('Formlarda zaman asimi uyarisi', 'h3'),
        code(
          '<form id="basvuru-formu">\n  <div role="alert" class="zaman-asimi-bildirimi">\n    <p>\n      <strong>Onemli:</strong> Bu form ilerlemenizi otomatik\n      olarak kaydeder. Ancak oturumunuz 30 dakika\n      etkinsizlikten sonra sona erecektir. Lutfen formu bu\n      sure icinde tamamlayin ve gonderin, aksi takdirde\n      kaydedilmemis degisiklikleriniz kaybolabilir.\n    </p>\n  </div>\n\n  <!-- Form alanlari -->\n  <label for="isim">Tam isim</label>\n  <input type="text" id="isim" name="isim">\n  <!-- ... diger alanlar ... -->\n</form>',
          'html'
        ),

        heading('Alisveris sepeti zaman asimi bildirimi', 'h3'),
        code(
          '<div class="sepet-baslik">\n  <h1>Alisveris Sepetiniz</h1>\n  <p class="zaman-asimi-bilgisi" role="status">\n    Sepetinizdeki urunler <strong>60 dakika</strong>\n    boyunca ayrilmistir. Bu sureden sonra, stok sinirli\n    ise kullanilamaz hale gelebilir.\n  </p>\n</div>',
          'html'
        ),

        heading('Giris sayfasi zaman asimi aciklamasi', 'h3'),
        code(
          '<div class="oturum-bilgisi">\n  <h2>Oturum Bilgisi</h2>\n  <p>\n    Guvenlik icin oturumunuz <strong>15 dakika</strong>\n    etkinsizlikten sonra sona erecektir. Oturumunuz\n    sona ermeden once uzatmaniz istenecektir.\n  </p>\n</div>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Yalnizca kullanim kosullarinda veya yardim sayfalarinda belgelenen, etkilesim noktasinda gosterilmeyen oturum zaman asimlari.'),
        bullet('Sureyi belirtmeden "Oturumunuz sona erebilir" gibi belirsiz uyarilar.'),
        bullet('Gorsel olarak mevcut ancak ekran okuyuculari tarafindan erisilebilir olmayan zaman asimi bilgisi.'),
        bullet('Uygulamanin farkli bolumleri icin bireysel uyarilar olmadan farkli zaman asimi sureleri.'),
        bullet('Onceden zaman asimi aciklamasi olmadan sessizce sona eren alisveris sepetleri.'),
        bullet('Etkinsizlige ozgu zaman asimlari hakkinda (mutlak oturum suresinin aksine) uyari vermemek.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.2.6: Timeouts',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/timeouts.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r226w3cu',
      },
      {
        title: 'W3C Technique G133: Providing a checkbox to allow users to request longer session time limit',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G133',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r226w3cg',
      },
      {
        title: 'WebAIM: Timeouts',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.2.6',
        source: 'webaim',
        language: 'en',
        _key: 'r226waim',
      },
      {
        title: 'Deque University: Time Limits and Timeouts',
        url: 'https://dequeuniversity.com/class/dynamic-updates2/time-limits/',
        source: 'deque',
        language: 'en',
        _key: 'r226dequ',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.1 — Timeouts',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r226wain',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.2.6 Timeouts — Inactivity Warning Guide',
        metaDescription:
          'Learn about WCAG 2.2.6 Timeouts. This AAA criterion requires warning users about inactivity timeouts that could cause data loss.',
      },
      tr: {
        metaTitle: 'WCAG 2.2.6 Zaman Asimlari — Etkinsizlik Uyarisi Rehberi',
        metaDescription:
          'WCAG 2.2.6 Zaman Asimlari hakkinda bilgi edinin. Bu AAA kriteri, veri kaybina neden olabilecek etkinsizlik zaman asimlari hakkinda kullanicilarin uyarilmasini gerektirir.',
      },
    },
  },

  // ─── 2.3.1 Three Flashes or Below Threshold ───────────────────────────
  {
    criterionNumber: '2.3.1',
    level: 'A',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [],
    tags: ['seizure', 'flashing', 'photosensitivity', 'safety'],

    title: {
      en: 'Three Flashes or Below Threshold',
      tr: 'Uc Yanip Sonme veya Esik Altinda',
    },

    description: {
      en: 'Web pages do not contain anything that flashes more than three times in any one-second period, or the flash is below the general flash and red flash thresholds.',
      tr: 'Web sayfalari herhangi bir bir saniyelik donemde ucten fazla kez yanip sonen hicbir sey icermez veya yanip sonme genel yanip sonme ve kirmizi yanip sonme esiklerinin altindadir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.3.1 protects users from content that could trigger seizures. Web pages must not contain anything that flashes more than three times per second, unless the flashing content is small enough and dim enough to fall below the general flash threshold and the red flash threshold. This is a critical safety criterion — violations can cause physical harm.'
        ),
        p(
          'The general flash threshold is exceeded when there are three or more flashes within a one-second period and the combined area of the flashing content is sufficiently large (more than 25% of 10 degrees of visual field, or roughly a 341 x 256 pixel area at typical viewing distance). The red flash threshold applies specifically to transitions involving saturated red. Content can flash more than three times per second only if both thresholds are not exceeded.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Approximately 1 in 4,000 people have photosensitive epilepsy, a condition where flashing lights or rapidly changing visual patterns can trigger seizures. Seizures range from brief loss of awareness to full convulsions and can be medically dangerous. The most infamous incident was a 1997 Pokemon episode that caused seizures in nearly 700 Japanese children due to rapidly flashing red and blue animations.'
        ),
        p(
          'Beyond epilepsy, flashing content can cause migraines, dizziness, nausea, and disorientation in people with photosensitivity or vestibular disorders. Unlike most accessibility issues where the consequence is inconvenience or inability to use a feature, violations of this criterion can cause immediate physical harm. This makes it one of the most critical WCAG requirements.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Detecting flash frequency and threshold violations requires frame-by-frame video analysis with specialized tools like the Photosensitive Epilepsy Analysis Tool (PEAT) or Harding test. Automated DOM analysis cannot detect flashing content reliably.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires analyzing visual content for flash frequency and size.'),
        numbered('Review all video content, animations, GIFs, and dynamic visual effects on the page.'),
        numbered('For any content that appears to flash, count the number of flashes per second. More than three per second is a potential violation.'),
        numbered('Use the Photosensitive Epilepsy Analysis Tool (PEAT) to analyze video content for threshold violations.'),
        numbered('Check CSS animations and JavaScript-driven visual changes for rapid color or luminance transitions.'),
        numbered('Pay special attention to transitions involving red — these have a lower threshold for triggering seizures.'),
        bullet('Test at full screen and at typical viewing sizes to assess whether the flashing area exceeds the size threshold.'),

        heading('How to fix', 'h2'),
        p('Eliminate or reduce flashing content to stay within safe thresholds.'),

        heading('Avoid rapid visual transitions', 'h3'),
        code(
          '/* Bad: fast flashing animation */\n@keyframes flash-danger {\n  0%, 100% { background: #ff0000; }\n  50% { background: #000000; }\n}\n.alert {\n  animation: flash-danger 0.2s infinite; /* 5 flashes/sec! */\n}\n\n/* Good: gentle pulsing animation */\n@keyframes pulse-gentle {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.7; }\n}\n.alert {\n  animation: pulse-gentle 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('Provide a way to disable animations', 'h3'),
        code(
          '/* Respect prefers-reduced-motion */\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}',
          'css'
        ),

        heading('Safe video embedding', 'h3'),
        code(
          '<!-- Warn users about potentially problematic content -->\n<div class="video-container">\n  <div class="flash-warning" role="alert">\n    <p>\n      <strong>Warning:</strong> This video contains\n      flashing lights that may not be suitable for\n      people with photosensitive epilepsy.\n    </p>\n    <button onclick="playVideo()">I understand, play video</button>\n  </div>\n  <video id="video" controls preload="metadata"\n    poster="poster.jpg">\n    <source src="video.mp4" type="video/mp4">\n  </video>\n</div>\n\n<script>\nfunction playVideo() {\n  document.querySelector(\'.flash-warning\').hidden = true;\n  document.getElementById(\'video\').play();\n}\n</script>',
          'html'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Animated GIFs with rapid frame changes that exceed three flashes per second.'),
        bullet('CSS animations that rapidly toggle between high-contrast colors (especially involving red).'),
        bullet('Video content with strobe effects, lightning, or rapid scene changes that was not analyzed with PEAT.'),
        bullet('Game-like interfaces with explosion effects, screen flashes on hit, or rapid visual feedback.'),
        bullet('Auto-playing video content with no warning about flashing and no way to stop it before it plays.'),
        bullet('Ignoring the prefers-reduced-motion media query, which signals user sensitivity to motion and flashing.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.3.1, kullanicilari nobetleri tetikleyebilecek icerikten korur. Web sayfalari, yanip sonen icerik genel yanip sonme esiginin ve kirmizi yanip sonme esiginin altina dusecek kadar kucuk ve soluk olmadikca, saniyede ucten fazla kez yanip sonen hicbir sey icermemelidir. Bu kritik bir guvenlik kriteridir — ihlaller fiziksel zarara neden olabilir.'
        ),
        p(
          'Genel yanip sonme esigi, bir saniyelik donemde uc veya daha fazla yanip sonme oldugunda ve yanip sonen icerigin toplam alani yeterince buyuk oldugunda (tipik izleme mesafesinde yaklasik 341 x 256 piksel alan) asisilir. Kirmizi yanip sonme esigi ozellikle doymus kirmizi iceren gecisler icin gecerlidir. Icerik yalnizca her iki esik de asisilmazsa saniyede ucten fazla kez yanip sonebilir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Yaklasik 4.000 kisiden 1\'inde fotosensitif epilepsi vardir; bu, yanip sonen isiklar veya hizla degisen gorsel kaliplarin nobetleri tetikleyebildigi bir durumdur. Nobetler kisa sureli farkindalik kaybindan tam konvulziyonlara kadar degisir ve tibbi olarak tehlikeli olabilir. En bilinen olay, hizla yanip sonen kirmizi ve mavi animasyonlar nedeniyle yaklasik 700 Japon cocugunda nobetlere neden olan 1997 Pokemon bolumudur.'
        ),
        p(
          'Epilepsinin otesinde, yanip sonen icerik fotosensitivite veya vestibular bozuklugu olan kisilerde migren, bas donmesi, mide bulantisi ve yonelim bozukluguna neden olabilir. Sonucun rahatsizlik veya bir ozelligni kullanamamak oldugu cogu erisilebilirlik sorunundan farkli olarak, bu kriterin ihlalleri aninda fiziksel zarara neden olabilir. Bu, onu en kritik WCAG gereksinimlerinden biri yapar.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Yanip sonme sikligi ve esik ihlallerini tespit etmek, Fotosensitif Epilepsi Analiz Araci (PEAT) veya Harding testi gibi ozel araclarla kare kare video analizi gerektirir. Otomatik DOM analizi yanip sonen icerigi guvenilir sekilde tespit edemez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, gorsel icerigin yanip sonme sikligi ve boyutu icin analiz edilmesini gerektirir.'),
        numbered('Sayfadaki tum video iceriklerini, animasyonlari, GIF\'leri ve dinamik gorsel efektleri inceleyin.'),
        numbered('Yanip sonuyor gibi gorunen herhangi bir icerik icin saniyede yanip sonme sayisini sayin. Saniyede ucten fazla potansiyel bir ihlaldir.'),
        numbered('Video icerigini esik ihlalleri icin analiz etmek uzere Fotosensitif Epilepsi Analiz Araci\'ni (PEAT) kullanin.'),
        numbered('Hizli renk veya parlaklak gecisleri icin CSS animasyonlarini ve JavaScript odakli gorsel degisiklikleri kontrol edin.'),
        numbered('Kirmizi iceren gecislere ozellikle dikkat edin — bunlar nobetleri tetiklemek icin daha dusuk bir esige sahiptir.'),
        bullet('Yanip sonen alanin boyut esigini asip asmadigini degerlendirmek icin tam ekran ve tipik gorunluleme boyutlarinda test edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Guvenli esikler icinde kalmak icin yanip sonen icerigi ortadan kaldirin veya azaltin.'),

        heading('Hizli gorsel gecislerden kacinin', 'h3'),
        code(
          '/* Yanlis: hizli yanip sonen animasyon */\n@keyframes tehlikeli-yanip-sonme {\n  0%, 100% { background: #ff0000; }\n  50% { background: #000000; }\n}\n.uyari {\n  animation: tehlikeli-yanip-sonme 0.2s infinite; /* 5 yanip sonme/sn! */\n}\n\n/* Dogru: nazik titresme animasyonu */\n@keyframes nazik-titresme {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.7; }\n}\n.uyari {\n  animation: nazik-titresme 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('Animasyonlari devre disi birakma yolu saglayin', 'h3'),
        code(
          '/* prefers-reduced-motion tercihine saygi gosterin */\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}',
          'css'
        ),

        heading('Guvenli video gomme', 'h3'),
        code(
          '<!-- Potansiyel olarak sorunlu icerik hakkinda kullanicilari uyarin -->\n<div class="video-kapsayici">\n  <div class="yanip-sonme-uyarisi" role="alert">\n    <p>\n      <strong>Uyari:</strong> Bu video, fotosensitif\n      epilepsi olan kisiler icin uygun olmayabilecek\n      yanip sonen isiklar icerir.\n    </p>\n    <button onclick="videoyuOynat()">Anliyorum, videoyu oynat</button>\n  </div>\n  <video id="video" controls preload="metadata"\n    poster="afis.jpg">\n    <source src="video.mp4" type="video/mp4">\n  </video>\n</div>\n\n<script>\nfunction videoyuOynat() {\n  document.querySelector(\'.yanip-sonme-uyarisi\').hidden = true;\n  document.getElementById(\'video\').play();\n}\n</script>',
          'html'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('Saniyede ucten fazla yanip sonmeyi asan hizli kare degisiklikleri olan animasyonlu GIF\'ler.'),
        bullet('Yuksek kontrastli renkler arasinda (ozellikle kirmizi iceren) hizla gecis yapan CSS animasyonlari.'),
        bullet('PEAT ile analiz edilmemis stroboskop efektleri, yildirim veya hizli sahne degisiklikleri olan video icerigi.'),
        bullet('Patlama efektleri, vurusda ekran yanip sonmeleri veya hizli gorsel geri bildirim iceren oyun benzeri arayuzler.'),
        bullet('Yanip sonme hakkinda uyari olmadan ve oynatilmadan once durdurma yolu olmadan otomatik oynayan video icerigi.'),
        bullet('Kullanicinin hareket ve yanip sonmeye duyarliligi sinyalleyen prefers-reduced-motion medya sorgusunu gormezden gelmek.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.3.1: Three Flashes or Below Threshold',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r231w3cu',
      },
      {
        title: 'W3C Technique G19: Ensuring that no component flashes more than three times per second',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G19',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r231w3cg',
      },
      {
        title: 'WebAIM: Seizures and Photosensitive Reactions',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.3.1',
        source: 'webaim',
        language: 'en',
        _key: 'r231waim',
      },
      {
        title: 'Trace Center: Photosensitive Epilepsy Analysis Tool (PEAT)',
        url: 'https://trace.umd.edu/peat/',
        source: 'other',
        language: 'en',
        _key: 'r231peat',
      },
      {
        title: 'MDN: prefers-reduced-motion',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
        source: 'mdn',
        language: 'en',
        _key: 'r231mdnr',
      },
      {
        title: 'W3C WAI: Web Content Accessibility and Seizures',
        url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r231waif',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.3.1 Three Flashes or Below Threshold — Seizure Safety Guide',
        metaDescription:
          'Learn how to meet WCAG 2.3.1 Three Flashes or Below Threshold. Ensure web content does not contain flashing that could trigger seizures in photosensitive users.',
      },
      tr: {
        metaTitle: 'WCAG 2.3.1 Uc Yanip Sonme veya Esik Altinda — Nobet Guvenligi Rehberi',
        metaDescription:
          'WCAG 2.3.1 Uc Yanip Sonme veya Esik Altinda kriterini nasil karsilayacaginizi ogrenin. Web iceriginin fotosensitif kullanicilarda nobetleri tetikleyebilecek yanip sonme icermediginden emin olun.',
      },
    },
  },

  // ─── 2.3.2 Three Flashes ──────────────────────────────────────────────
  {
    criterionNumber: '2.3.2',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [],
    tags: ['seizure', 'flashing', 'photosensitivity', 'safety', 'aaa'],

    title: {
      en: 'Three Flashes',
      tr: 'Uc Yanip Sonme',
    },

    description: {
      en: 'Web pages do not contain anything that flashes more than three times in any one-second period.',
      tr: 'Web sayfalari herhangi bir bir saniyelik donemde ucten fazla kez yanip sonen hicbir sey icermez.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.3.2 is the AAA-level version of 2.3.1. While 2.3.1 allows flashing that stays below the general flash and red flash thresholds (based on area size and luminance change), 2.3.2 removes the threshold exception entirely. Under this criterion, absolutely no content may flash more than three times per second, regardless of size, color, or luminance.'
        ),
        p(
          'This is a stricter and simpler rule: if it flashes more than three times per second, it fails — period. There are no calculations of pixel area, no consideration of viewing distance, and no special treatment for red. This makes it both easier to understand and harder to satisfy, as even small or subtle flashing elements must comply.'
        ),

        heading('Why it matters', 'h2'),
        p(
          'The threshold exceptions in 2.3.1 are based on statistical models of seizure triggers, but individual sensitivity varies. Some people with photosensitive epilepsy can have seizures triggered by stimuli that fall within the "safe" thresholds defined by 2.3.1. By eliminating all flashing above three times per second, 2.3.2 provides maximum protection.'
        ),
        p(
          'This AAA criterion is particularly important for environments where the audience is known to include individuals with high photosensitivity — medical facilities, schools, government services. It is also important for content viewed on large screens or in dark environments, where the relative size and impact of flashing content is amplified.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Like 2.3.1, detecting flash frequency requires specialized analysis tools. The difference is that no threshold calculations are needed — any content flashing more than three times per second fails.'
        ),

        heading('How to test', 'h2'),
        p('Testing follows the same approach as 2.3.1 but with a stricter standard.'),
        numbered('Identify all content on the page that involves visual changes: videos, animations, GIFs, CSS animations, JavaScript-driven effects.'),
        numbered('For each visual element, determine the flash frequency. Count luminance changes (dark-to-light or light-to-dark transitions) per second.'),
        numbered('Any element flashing more than three times per second fails this criterion — regardless of size or color.'),
        numbered('Use PEAT or similar tools to analyze video content frame by frame.'),
        numbered('Test with prefers-reduced-motion enabled to verify that all animations are reduced or eliminated.'),

        heading('How to fix', 'h2'),
        p('Limit all visual transitions to three or fewer per second. This is the safest and most straightforward approach.'),

        heading('Rate-limiting animations', 'h3'),
        code(
          '/* Ensure animation cycle is at least 333ms (3 per second max) */\n@keyframes safe-blink {\n  0%, 49% { opacity: 1; }\n  50%, 100% { opacity: 0; }\n}\n.notification-dot {\n  /* 1s cycle = 1 flash/sec — well within safe range */\n  animation: safe-blink 1s step-end infinite;\n}\n\n/* Even safer: avoid blinking entirely, use fade */\n@keyframes safe-fade {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n.notification-dot-safe {\n  animation: safe-fade 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('JavaScript flash rate limiter', 'h3'),
        code(
          '// Ensure visual state changes happen no more than\n// 3 times per second\nclass FlashGuard {\n  constructor(maxFlashesPerSecond = 3) {\n    this.minInterval = 1000 / maxFlashesPerSecond;\n    this.lastFlash = 0;\n  }\n\n  canFlash() {\n    const now = Date.now();\n    if (now - this.lastFlash >= this.minInterval) {\n      this.lastFlash = now;\n      return true;\n    }\n    return false;\n  }\n}\n\nconst guard = new FlashGuard(3);\n\nfunction safeVisualFeedback(element) {\n  if (guard.canFlash()) {\n    element.classList.add(\'highlight\');\n    setTimeout(() => element.classList.remove(\'highlight\'),\n      200);\n  }\n}',
          'javascript'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Relying on 2.3.1 threshold calculations and assuming small flashing elements are automatically safe.'),
        bullet('Animated SVGs or Canvas elements with rapid frame updates that create flashing effects.'),
        bullet('Transition effects between pages or sections that involve brief full-screen flashes.'),
        bullet('Banner ads or embedded third-party content with uncontrolled flash rates.'),
        bullet('Loading spinners or progress indicators that flash rapidly.'),
        bullet('Cursor blink rates in text editors or input fields exceeding three per second.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.3.2, 2.3.1\'in AAA seviyesindeki versiyonudur. 2.3.1, genel yanip sonme ve kirmizi yanip sonme esiklerinin altinda kalan yanip sonmeye izin verirken (alan boyutu ve parlaklak degisikligine dayanarak), 2.3.2 esik istisnasini tamamen kaldirir. Bu kriter kapsaminda, boyut, renk veya parlaklktan bagimsiz olarak kesinlikle hicbir icerik saniyede ucten fazla kez yanip sonemez.'
        ),
        p(
          'Bu daha siki ve daha basit bir kuraldir: saniyede ucten fazla yanip sonuyorsa basarisiz olur — nokta. Piksel alani hesaplamalari, izleme mesafesi degerlendirmesi ve kirmizi icin ozel muamele yoktur. Bu, hem anlasilmasini kolaylastirir hem de karsilanmasini zorlastirir, cunku kucuk veya ince yanip sonen ogeler bile uyum saglamalidir.'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          '2.3.1\'deki esik istisnalari nobet tetikleyicilerinin istatistiksel modellerine dayanir, ancak bireysel duyarlilik degisir. Fotosensitif epilepsisi olan bazi kisiler, 2.3.1 tarafindan tanimlanan "guvenli" esikler icinde kalan uyaranlar tarafindan tetiklenen nobetler yasayabilir. Saniyede ucun uzerindeki tum yanip sonmeleri ortadan kaldirarak 2.3.2 maksimum koruma saglar.'
        ),
        p(
          'Bu AAA kriteri ozellikle kitlenin yuksek fotosensitiviteye sahip bireyleri icerdigi bilinen ortamlar icin onemlidir — tibbi tesisler, okullar, devlet hizmetleri. Ayrica buyuk ekranlarda veya karanlik ortamlarda goruntulenme icerigi icin de onemlidir, burada yanip sonen icerigin goreli boyutu ve etkisi guclenir.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. 2.3.1 gibi, yanip sonme sikligini tespit etmek ozel analiz araclari gerektirir. Fark, esik hesaplamalarinin gerekli olmamasidir — saniyede ucten fazla yanip sonen herhangi bir icerik basarisiz olur.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, 2.3.1 ile ayni yakasimi izler ancak daha siki bir standartla.'),
        numbered('Sayfada gorsel degisiklikler iceren tum icerikleri belirleyin: videolar, animasyonlar, GIF\'ler, CSS animasyonlari, JavaScript odakli efektler.'),
        numbered('Her gorsel oge icin yanip sonme sikligini belirleyin. Saniyede parlaklak degisikliklerini (karanlktan aydinliga veya aydinliktan karanlkga gecisler) sayin.'),
        numbered('Saniyede ucten fazla yanip sonen herhangi bir oge — boyut veya renkten bagimsiz olarak — bu kriteri basarisiz kilar.'),
        numbered('Video icerigini kare kare analiz etmek icin PEAT veya benzer araclar kullanin.'),
        numbered('prefers-reduced-motion etkinlestirilmis sekilde test edin ve tum animasyonlarin azaltildigini veya ortadan kaldirildigini dogrulayin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('Tum gorsel gecisleri saniyede uc veya daha azina sinirlayin. Bu en guvenli ve en basit yaklasimdir.'),

        heading('Animasyonlari hiz sinirlamasi', 'h3'),
        code(
          '/* Animasyon dongusunun en az 333ms olmasini saglayin (maksimum 3/saniye) */\n@keyframes guvenli-yanip-sonme {\n  0%, 49% { opacity: 1; }\n  50%, 100% { opacity: 0; }\n}\n.bildirim-noktasi {\n  /* 1 saniye dongu = 1 yanip sonme/sn — guvenli aralikta */\n  animation: guvenli-yanip-sonme 1s step-end infinite;\n}\n\n/* Daha da guvenli: yanip sonmeden kacinin, solma kullanin */\n@keyframes guvenli-solma {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n.bildirim-noktasi-guvenli {\n  animation: guvenli-solma 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('JavaScript yanip sonme hiz sinirlaycisi', 'h3'),
        code(
          '// Gorsel durum degisikliklerinin saniyede 3 defadan\n// fazla olmamasini saglayin\nclass YanipSonmeKorumasi {\n  constructor(sanivedeMaksYanipSonme = 3) {\n    this.minimumAralik = 1000 / sanivedeMaksYanipSonme;\n    this.sonYanipSonme = 0;\n  }\n\n  yanipSonebilirMi() {\n    const simdi = Date.now();\n    if (simdi - this.sonYanipSonme >= this.minimumAralik) {\n      this.sonYanipSonme = simdi;\n      return true;\n    }\n    return false;\n  }\n}\n\nconst koruma = new YanipSonmeKorumasi(3);\n\nfunction guvenliGorselGeriBildirim(oge) {\n  if (koruma.yanipSonebilirMi()) {\n    oge.classList.add(\'vurgula\');\n    setTimeout(() => oge.classList.remove(\'vurgula\'),\n      200);\n  }\n}',
          'javascript'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('2.3.1 esik hesaplamarina guvenip kucuk yanip sonen ogelerin otomatik olarak guvenli oldugunu varsaymak.'),
        bullet('Yanip sonme efektleri olusturan hizli kare guncellemelerine sahip animasyonlu SVG\'ler veya Canvas ogeleri.'),
        bullet('Kisa sureli tam ekran yanip sonmeleri iceren sayfalar veya bolumler arasindaki gecis efektleri.'),
        bullet('Kontrolsuz yanip sonme hizlarina sahip banner reklamlar veya gomulu ucuncu parti icerik.'),
        bullet('Hizla yanip sonen yukleme donduruculer veya ilerleme gostergeleri.'),
        bullet('Metin editorlerinde veya giris alanlarinda saniyede ucu asan imlec yanip sonme hizlari.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.3.2: Three Flashes',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r232w3cu',
      },
      {
        title: 'W3C Technique G19: Ensuring no component flashes more than three times per second',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G19',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r232w3cg',
      },
      {
        title: 'WebAIM: Three Flashes',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.3.2',
        source: 'webaim',
        language: 'en',
        _key: 'r232waim',
      },
      {
        title: 'Trace Center: Photosensitive Epilepsy Analysis Tool (PEAT)',
        url: 'https://trace.umd.edu/peat/',
        source: 'other',
        language: 'en',
        _key: 'r232peat',
      },
      {
        title: 'W3C WAI: Seizures and Physical Reactions',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/seizures-and-physical-reactions',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r232waig',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.3.2 Three Flashes — AAA Seizure Prevention Guide',
        metaDescription:
          'Learn about WCAG 2.3.2 Three Flashes. This AAA criterion prohibits all content from flashing more than three times per second with no threshold exceptions.',
      },
      tr: {
        metaTitle: 'WCAG 2.3.2 Uc Yanip Sonme — AAA Nobet Onleme Rehberi',
        metaDescription:
          'WCAG 2.3.2 Uc Yanip Sonme hakkinda bilgi edinin. Bu AAA kriteri, esik istisnalari olmaksizin tum icerigin saniyede ucten fazla yanip sonmesini yasaklar.',
      },
    },
  },

  // ─── 2.3.3 Animation from Interactions ─────────────────────────────────
  {
    criterionNumber: '2.3.3',
    level: 'AAA',
    principle: 'operable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['animation', 'motion', 'vestibular', 'interaction', 'aaa'],

    title: {
      en: 'Animation from Interactions',
      tr: 'Etkilesimlerden Animasyon',
    },

    description: {
      en: 'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.',
      tr: 'Etkilesim tarafindan tetiklenen hareket animasyonu, animasyon islevsellik veya iletilen bilgi icin temel olmadigi surece devre disi birakitabilmelidir.',
    },

    content: {
      en: [
        heading('What this rule means', 'h2'),
        p(
          'WCAG 2.3.3 requires that motion animations triggered by user interaction can be disabled. This applies to animations that occur when a user scrolls, clicks, types, hovers, or otherwise interacts with the page — such as parallax scrolling effects, zoom animations, page transition animations, scroll-triggered reveal effects, and hover state animations that involve movement.'
        ),
        p(
          'The criterion focuses specifically on motion animation — visual changes involving movement from one position to another or changes in size. Simple color changes, opacity transitions, or highlighting do not trigger this requirement. An exception exists when the animation is essential to conveying information or to the functionality itself (such as a progress bar moving to show completion).'
        ),

        heading('Why it matters', 'h2'),
        p(
          'Users with vestibular disorders (including benign paroxysmal positional vertigo, labyrinthitis, and Meniere\'s disease) can experience severe physical symptoms from motion animations — dizziness, nausea, headaches, and disorientation. These symptoms can persist long after the animation ends and may prevent the user from using their device for hours.'
        ),
        p(
          'The vestibular system in the inner ear helps the brain understand motion and spatial orientation. When visual motion on screen contradicts the body\'s actual position (as with parallax scrolling or swooping page transitions), it creates a sensory conflict that triggers these symptoms. Providing a way to disable motion animations is essential for these users to safely browse the web.'
        ),

        heading('Related axe-core rules', 'h2'),
        p(
          'There are no automated axe-core rules for this criterion. Motion animations are highly varied in implementation (CSS animations, JavaScript-driven transforms, scroll-linked effects, Web Animations API) and their relationship to user interaction cannot be determined through static analysis.'
        ),

        heading('How to test', 'h2'),
        p('Testing requires interacting with the page and observing animation behavior under different settings.'),
        numbered('Interact with all elements on the page: scroll, click buttons, hover over elements, navigate between pages.'),
        numbered('Note all motion animations that occur in response to interaction: sliding, zooming, parallax, page transitions, scroll-triggered movements.'),
        numbered('Enable prefers-reduced-motion in your operating system settings and repeat all interactions.'),
        numbered('Verify that motion animations are eliminated or significantly reduced when prefers-reduced-motion is enabled.'),
        numbered('Check if the application provides its own animation toggle independent of the OS setting.'),
        bullet('Test on mobile devices by enabling "Reduce Motion" in iOS accessibility settings or "Remove animations" in Android developer options.'),

        heading('How to fix', 'h2'),
        p('Respect the prefers-reduced-motion media query and provide an application-level toggle for motion animations.'),

        heading('Respect prefers-reduced-motion', 'h3'),
        code(
          '/* Default: smooth animations */\n.card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n\n.page-enter {\n  animation: slide-in 0.5s ease-out;\n}\n\n@keyframes slide-in {\n  from { transform: translateX(100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n\n/* Reduced motion: remove movement, keep feedback */\n@media (prefers-reduced-motion: reduce) {\n  .card {\n    transition: box-shadow 0.15s ease;\n  }\n  .card:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  }\n\n  .page-enter {\n    animation: fade-in 0.15s ease-out;\n  }\n\n  @keyframes fade-in {\n    from { opacity: 0; }\n    to { opacity: 1; }\n  }\n}',
          'css'
        ),

        heading('Application-level animation toggle', 'h3'),
        code(
          '<div class="settings-panel">\n  <label class="toggle">\n    <input type="checkbox" id="reduce-motion"\n      onchange="setMotionPreference(this.checked)">\n    <span>Reduce motion animations</span>\n  </label>\n</div>\n\n<script>\nfunction setMotionPreference(reduce) {\n  document.documentElement.classList.toggle(\n    \'reduce-motion\', reduce\n  );\n  localStorage.setItem(\'reduce-motion\',\n    reduce ? \'true\' : \'false\');\n}\n\n// Restore preference on load\nwindow.addEventListener(\'DOMContentLoaded\', () => {\n  const pref = localStorage.getItem(\'reduce-motion\');\n  const osPrefers = window.matchMedia(\n    \'(prefers-reduced-motion: reduce)\'\n  ).matches;\n\n  if (pref === \'true\' || (pref === null && osPrefers)) {\n    document.documentElement.classList.add(\'reduce-motion\');\n    document.getElementById(\'reduce-motion\').checked = true;\n  }\n});\n</script>',
          'html'
        ),

        heading('Disable parallax scrolling', 'h3'),
        code(
          '/* Parallax effect */\n.parallax-bg {\n  background-attachment: fixed;\n  background-position: center;\n  background-size: cover;\n  transform: translateZ(-1px) scale(2);\n}\n\n/* Remove parallax for reduced motion */\n@media (prefers-reduced-motion: reduce) {\n  .parallax-bg {\n    background-attachment: scroll;\n    transform: none;\n  }\n}\n\n/* Also remove for application-level toggle */\n.reduce-motion .parallax-bg {\n  background-attachment: scroll;\n  transform: none;\n}',
          'css'
        ),

        heading('Common mistakes', 'h2'),
        bullet('Ignoring the prefers-reduced-motion media query entirely — this is the primary mechanism for motion-sensitive users.'),
        bullet('Only reducing animation duration instead of removing motion (a fast swoosh is still a swoosh).'),
        bullet('Parallax scrolling effects with no way to disable them.'),
        bullet('Scroll-triggered animations (elements flying in from the side) that cannot be turned off.'),
        bullet('Page transition animations that involve sliding, zooming, or rotating without a non-animated fallback.'),
        bullet('Hover animations that move elements (translateY, scale) without providing a motion-free alternative.'),
        bullet('Not testing with prefers-reduced-motion enabled during development and QA.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.3.3, kullanici etkilesimi tarafindan tetiklenen hareket animasyonlarinin devre disi birakitabilmesini gerektirir. Bu, kullanici kayirdiginda, tikladiginda, yazdiginda, uzerine geldiginde veya sayfayla baska sekilde etkilesimde bulundugunda meydana gelen animasyonlar icin gecerlidir — paralaks kayma efektleri, yakinlastirma animasyonlari, sayfa gecis animasyonlari, kaydirmayla tetiklenen ortaya cikma efektleri ve hareket iceren fareyle uzerine gelme durum animasyonlari gibi.'
        ),
        p(
          'Kriter ozellikle hareket animasyonuna odaklanir — bir konumdan digerine hareket veya boyut degisiklikleri iceren gorsel degisiklikler. Basit renk degisiklikleri, opaklad gecisleri veya vurgulama bu gereksinimi tetiklemez. Animasyonun bilgi iletmek veya islevselligin kendisi icin temel oldugu durumlarda istisna vardir (tamamlanmayi gostermek icin hareket eden bir ilerleme cubugu gibi).'
        ),

        heading('Neden onemlidir', 'h2'),
        p(
          'Vestibular bozuklugu olan kullanicilar (iyi huylu paroksismal pozisyonel vertigo, labirentit ve Meniere hastaligi dahil) hareket animasyonlarindan ciddi fiziksel belirtiler yasayabilir — bas donmesi, mide bulantisi, bas agrisi ve yonelim bozuklugu. Bu belirtiler animasyon bittikten cok sonra devam edebilir ve kullanicinin cihazini saatlerce kullanmasini engelleyebilir.'
        ),
        p(
          'Ic kulaktaki vestibular sistem, beynin hareketi ve mekansal yonelimi anlamasina yardimci olur. Ekrandaki gorsel hareket vucdun gercek konumuyla celisdiginde (paralaks kaydirma veya dalan sayfa gecislerinde oldugu gibi), bu belirtileri tetikleyen bir duyusal catisma yaratir. Hareket animasyonlarini devre disi birakma yolu saglamak, bu kullanicilarin guvenli bir sekilde web\'de gezmesi icin zorunludur.'
        ),

        heading('Ilgili axe-core kurallari', 'h2'),
        p(
          'Bu kriter icin otomatik axe-core kurali bulunmamaktadir. Hareket animasyonlari uygulamada son derece cesitlidir (CSS animasyonlari, JavaScript odakli donusumler, kaydirmaya bagli efektler, Web Animations API) ve kullanici etkilesimiyle iliskileri statik analiz ile belirlenemez.'
        ),

        heading('Nasil test edilir', 'h2'),
        p('Test, sayfa ile etkilesim kurmak ve farkli ayarlar altinda animasyon davranisini gozlemlemeyi gerektirir.'),
        numbered('Sayfadaki tum ogelerle etkilesim kurun: kayirin, dugmelere tiklayin, ogelerin uzerine gelin, sayfalar arasinda gezinin.'),
        numbered('Etkilesime yanit olarak meydana gelen tum hareket animasyonlarini not edin: kayma, yakinlastirma, paralaks, sayfa gecisleri, kaydirmayla tetiklenen hareketler.'),
        numbered('Isletim sistemi ayarlarinda prefers-reduced-motion\'i etkinlestirin ve tum etkilesimleri tekrarlayin.'),
        numbered('prefers-reduced-motion etkinlestirildiginde hareket animasyonlarinin ortadan kaldirildigini veya onemli olcude azaltildigini dogrulayin.'),
        numbered('Uygulamanin isletim sistemi ayarindan bagimsiz kendi animasyon degistirici saglaypip saglamadigini kontrol edin.'),
        bullet('iOS erisilebilirlik ayarlarinda "Hareketi Azalt" veya Android gelistirici seceneklerinde "Animasyonlari kaldir" etkinlestirerek mobil cihazlarda test edin.'),

        heading('Nasil duzeltilir', 'h2'),
        p('prefers-reduced-motion medya sorgusuna saygi gosterin ve hareket animasyonlari icin uygulama duzeyinde bir degistirici saglayin.'),

        heading('prefers-reduced-motion tercihine saygi gosterin', 'h3'),
        code(
          '/* Varsayilan: purezsiz animasyonlar */\n.kart {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.kart:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n\n.sayfa-giris {\n  animation: kaydir-iceri 0.5s ease-out;\n}\n\n@keyframes kaydir-iceri {\n  from { transform: translateX(100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n\n/* Azaltilmis hareket: hareketi kaldir, geri bildirimi koru */\n@media (prefers-reduced-motion: reduce) {\n  .kart {\n    transition: box-shadow 0.15s ease;\n  }\n  .kart:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  }\n\n  .sayfa-giris {\n    animation: solarak-gorun 0.15s ease-out;\n  }\n\n  @keyframes solarak-gorun {\n    from { opacity: 0; }\n    to { opacity: 1; }\n  }\n}',
          'css'
        ),

        heading('Uygulama duzeyinde animasyon degistirici', 'h3'),
        code(
          '<div class="ayarlar-paneli">\n  <label class="degistirici">\n    <input type="checkbox" id="hareketi-azalt"\n      onchange="hareketTercihiniAyarla(this.checked)">\n    <span>Hareket animasyonlarini azalt</span>\n  </label>\n</div>\n\n<script>\nfunction hareketTercihiniAyarla(azalt) {\n  document.documentElement.classList.toggle(\n    \'hareketi-azalt\', azalt\n  );\n  localStorage.setItem(\'hareketi-azalt\',\n    azalt ? \'true\' : \'false\');\n}\n\n// Yuklemede tercihi geri yukle\nwindow.addEventListener(\'DOMContentLoaded\', () => {\n  const tercih = localStorage.getItem(\'hareketi-azalt\');\n  const isTercihEder = window.matchMedia(\n    \'(prefers-reduced-motion: reduce)\'\n  ).matches;\n\n  if (tercih === \'true\' || (tercih === null && isTercihEder)) {\n    document.documentElement.classList.add(\'hareketi-azalt\');\n    document.getElementById(\'hareketi-azalt\').checked = true;\n  }\n});\n</script>',
          'html'
        ),

        heading('Paralaks kaydirmayi devre disi birakma', 'h3'),
        code(
          '/* Paralaks efekti */\n.paralaks-arkplan {\n  background-attachment: fixed;\n  background-position: center;\n  background-size: cover;\n  transform: translateZ(-1px) scale(2);\n}\n\n/* Azaltilmis hareket icin paralaksi kaldir */\n@media (prefers-reduced-motion: reduce) {\n  .paralaks-arkplan {\n    background-attachment: scroll;\n    transform: none;\n  }\n}\n\n/* Uygulama duzeyinde degistirici icin de kaldir */\n.hareketi-azalt .paralaks-arkplan {\n  background-attachment: scroll;\n  transform: none;\n}',
          'css'
        ),

        heading('Sik yapilan hatalar', 'h2'),
        bullet('prefers-reduced-motion medya sorgusunu tamamen gormezden gelmek — bu, harekete duyarli kullanicilar icin birincil mekanizmadir.'),
        bullet('Hareketi kaldirmak yerine yalnizca animasyon suresini azaltmak (hizli bir kayyis yine de bir kayyistir).'),
        bullet('Devre disi birakma yolu olmayan paralaks kaydirma efektleri.'),
        bullet('Kapatilamayan kaydirmayla tetiklenen animasyonlar (yandan ucarak gelen ogeler).'),
        bullet('Animasyonsuz bir yedek saglamadan kayma, yakinlastirma veya dondurme iceren sayfa gecis animasyonlari.'),
        bullet('Hareketizsiz bir alternatif saglamadan ogeleri hareket ettiren (translateY, scale) fareyle uzerine gelme animasyonlari.'),
        bullet('Gelistirme ve kalite guvencesi sirasinda prefers-reduced-motion etkinlestirilmis sekilde test etmemek.'),
      ],
    },

    resources: [
      {
        title: 'Understanding Success Criterion 2.3.3: Animation from Interactions',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
        source: 'w3c-understanding',
        language: 'en',
        _key: 'r233w3cu',
      },
      {
        title: 'W3C Technique C39: Using the CSS reduce-motion query to prevent motion',
        url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C39',
        source: 'w3c-techniques',
        language: 'en',
        _key: 'r233w3ct',
      },
      {
        title: 'WebAIM: Animation from Interactions',
        url: 'https://webaim.org/standards/wcag/checklist#sc2.3.3',
        source: 'webaim',
        language: 'en',
        _key: 'r233waim',
      },
      {
        title: 'MDN: prefers-reduced-motion',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
        source: 'mdn',
        language: 'en',
        _key: 'r233mdnr',
      },
      {
        title: 'A List Apart: Designing for Reduced Motion',
        url: 'https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/',
        source: 'other',
        language: 'en',
        _key: 'r233alap',
      },
      {
        title: 'W3C WAI: What\'s New in WCAG 2.1 — Animation from Interactions',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/',
        source: 'w3c-wai',
        language: 'en',
        _key: 'r233wain',
      },
    ],

    seo: {
      en: {
        metaTitle: 'WCAG 2.3.3 Animation from Interactions — Motion Sensitivity Guide',
        metaDescription:
          'Learn about WCAG 2.3.3 Animation from Interactions. Ensure users can disable motion animations triggered by interaction to protect vestibular disorder users.',
      },
      tr: {
        metaTitle: 'WCAG 2.3.3 Etkilesimlerden Animasyon — Harekete Duyarlilik Rehberi',
        metaDescription:
          'WCAG 2.3.3 Etkilesimlerden Animasyon hakkinda bilgi edinin. Vestibular bozuklugu olan kullanicilari korumak icin etkilesim tarafindan tetiklenen hareket animasyonlarini devre disi birakabilmeyi saglayin.',
      },
    },
  },
]

export default rules
