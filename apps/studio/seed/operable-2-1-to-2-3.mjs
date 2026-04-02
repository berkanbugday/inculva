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
      tr: 'İçeriğin tüm işlevselliği, bireysel tuş vuruşları için belirli zamanlamalar gerektirmeden bir klavye arayüzü aracılığıyla çalıştırılmalıdır.',
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
          'WCAG 2.1.1, içerik tarafından sağlanan tüm işlevselliğin bir klavye arayüzü aracılığıyla çalıştırılmasını gerektirir. Bu, her etkileşimli öğenin — bağlantılar, düğmeler, form alanları, özel bileşenleri ve medya kontrolleri — yalnızca klavye kullanılarak ulasitabilir ve etkinleştirilebilir olması gerektiğini ifade eder. Hiçbir işlevsellik yalnızca fareye özgü olaylara bağımlı olmamalıdır.'
        ),
        p(
          'Bu kriter yalnızca temel işlevin, klavye ile temelden gerçekleştirilemeyen analog, yol bağımlı giriş gerektirdiği durumlarda (serbest çizim gibi) istisnalara izin verir. Bununla birlikte, en yaygın web etkilecimleri — tıklama, seçme, genişletme, gönderme — klavye aracılığıyla çalışmalıdır. Kriter, bireysel tuş vuruşları için belirli zamanlama gerektirmeyi açıkça yasaklar.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Klavye erişilebilirliği, web erisilebilirliginin temelidir. Görme engelli kullanıcılar, klavye komutlariyla çalışan ekran okuyuculara guvenirler. Motor engelli kullanıcılar, tümü klavye olaylarina donusen anahtar cihazlar, ufle-ve-em sistemleri veya ses girişi kullanabilirler. Deneyimli kullanıcılar ve geliştiriciler de hız ve verimlilik için klavye gezinmesini tercih ederler.'
        ),
        p(
          'Etkileşimli öğeler klavye ile erişilebilir olmadığında, tüm kullanıcı grupları islevsellikten tamamen dışlanır. Bu küçük bir rahatsızlık değil — tam bir engeldir. Yalnızca fare tiklamalarina yanıt veren bir düğme, klavye kullanıcısı için görünmezdir ve klavye alternatifleri olmayan bir sürükle-birak arayüzü tüm özellikleri kullanılamaz hale getirir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        bullet('scrollable-region-focusable — Kaydirilaabilir alanların odaklanabilir olarak klavye erişimi sağlamasını doğrular. Bu olmadan klavye kullanıcıları taşan içeriği kaydiramaz.'),
        bullet('server-side-image-map — Sunucu tarafli görüntü haritalarinin kullanilmamasini sağlar. Sunucu tarafli görüntü haritaları fare koordinatlarina bağımlıdır ve klavye ile calistirilamaz.'),

        heading('Nasıl test edilir', 'h2'),
        p('Klavye erişilebilirliğini test etmek, yalnızca klavye kullanarak tüm etkileşimli ogelerde gezinmeyi gerektirir.'),
        numbered('Farenizi devre dışı bırakın ve sayfayı yalnızca klavye ile kullanmaya çalışın.'),
        numbered('Tüm etkileşimli öğeler arasında ileri gitmek için Tab tuşuna basın. Her düğme, bağlantı, form alanı ve bileşenin odak aldığını doğrulayın.'),
        numbered('Geri gitmek için Shift+Tab tuşuna basın. Ters gezinmenin doğru çalıştığını onaylayın.'),
        numbered('Dugmeleri ve bağlantıları etkinleştirmek için Enter veya Bosluk tuşuna basın. Beklenen eylemi gerçekleştirdiklerini doğrulayın.'),
        numbered('Özel bilecenleri test edin: açılır menüler Enter/Bosluk ile acilmali, diyaloglar odağı yakalamaladi, sekme panelleri ok tuşlarıyla değişmelidir.'),
        numbered('axe-core çalıştırın ve scrollable-region-focusable ile server-side-image-map ihlallerini kontrol edin.'),
        bullet('Tüm etkileşimli öğelerin duyurulduğunu ve calistirildabildigini onaylamak için bir ekran okuyucu (VoiceOver, NVDA, JAWS) kullanın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Yerleşik klavye desteği sundukari için mümkün olduğunda yerel HTML öğelerini kullanın. Özel öğeler gerektiğinde açık klavye işleme ekleyin.'),

        heading('Yerel etkileşimli öğeleri kullanın', 'h3'),
        code(
          '<!-- Yanlış: düğme olarak div, klavye desteği yok -->\n<div class="btn" onclick="formuGonder()">Gönder</div>\n\n<!-- Doğru: yerel düğme, varsayılan olarak klavye erisimli -->\n<button type="submit" onclick="formuGonder()">Gönder</button>',
          'html'
        ),

        heading('Özel bilecenlere klavye isleyicileri ekleyin', 'h3'),
        code(
          '<!-- Yanlış: klavye desteği olmayan özel açılır menü -->\n<div class="açılır-menü" onclick="menuAcKapa()">\n  <span>Seçenek seçin</span>\n  <ul class="menü">\n    <li onclick="sec(1)">Seçenek 1</li>\n    <li onclick="sec(2)">Seçenek 2</li>\n  </ul>\n</div>\n\n<!-- Doğru: klavye erisimli özel açılır menü -->\n<div class="açılır-menü"\n  role="combobox"\n  tabindex="0"\n  aria-expanded="false"\n  aria-haspopup="listbox"\n  onkeydown="acilirMenuTuslama(event)">\n  <span>Seçenek seçin</span>\n  <ul role="listbox" class="menü">\n    <li role="option" tabindex="-1"\n      onkeydown="secenekTuslama(event)">Seçenek 1</li>\n    <li role="option" tabindex="-1"\n      onkeydown="secenekTuslama(event)">Seçenek 2</li>\n  </ul>\n</div>',
          'html'
        ),

        heading('Klavye isleyici örneği', 'h3'),
        code(
          'function acilirMenuTuslama(event) {\n  switch (event.key) {\n    case \'Enter\':\n    case \' \':\n      event.preventDefault();\n      menuAcKapa();\n      break;\n    case \'ArrowDown\':\n      event.preventDefault();\n      sonrakiSecenegeSec();\n      break;\n    case \'ArrowUp\':\n      event.preventDefault();\n      oncekiSecenegeSec();\n      break;\n    case \'Escape\':\n      menuKapat();\n      break;\n  }\n}',
          'javascript'
        ),

        heading('Kaydiriliabilir alanları odaklanabilir yapın', 'h3'),
        code(
          '<!-- Yanlış: odaklanamayan kaydiriliabilir alan -->\n<div style="overflow: auto; height: 200px;">\n  <p>Tasan uzun içerik...</p>\n</div>\n\n<!-- Doğru: odaklanabilir kaydiriliabilir alan -->\n<div tabindex="0" role="region"\n  aria-label="Kaydiriliabilir içerik"\n  style="overflow: auto; height: 200px;">\n  <p>Tasan uzun içerik...</p>\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Tiklama isleyicileri olan ancak tabindex, role veya klavye olay dinleyicisi olmayan div veya span öğeleri kullanmak.'),
        bullet('Klavye tabanlı yeniden sıralama alternatifleri sağlamadan sürükle-birak işlevi uygulamak.'),
        bullet('Yalnızca fare hareketine yanıt veren, ok tuşu desteği olmayan özel kaydırıcılar veya aralık kontrolleri.'),
        bullet('Klavye ile tetiklenen eşdeğeri olmayan (odak veya Enter/Bosluk) fareyle üzerine gelme ile tetiklenen menüler veya ipuçları.'),
        bullet('Klavye odağı alamayan etkileşimli olmayan öğeler üzerinde tıklama isleyicileri.'),
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
        metaTitle: 'WCAG 2.1.1 Klavye — Tam Klavye Erişilebilirlik Rehberi',
        metaDescription:
          'WCAG 2.1.1 Klavye kriterini nasıl karşılayacağınızı öğrenin. Tüm etkileşimli içeriğin fare girişi gerektirmeden klavye arayüzü ile çalıştırılabilir olmasını sağlayın.',
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
      tr: 'Klavye Tuzağı Yok',
    },

    description: {
      en: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.',
      tr: 'Klavye odağı bir klavye arayüzü kullanılarak sayfanın bir bilesenine taşınabiliyorsa, odak yalnızca bir klavye arayüzü kullanılarak o bileşenden uzaklaştırılabilmelidir.',
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
          '<!-- Modal that traps focus intentionally but provides escape -->\n<div role="dialog" aria-modal="true"\n  aria-labelledby="modal-title" id="modal">\n  <h2 id="modal-title">Confirm Action</h2>\n  <p>Are you süre you want to proceed?</p>\n  <button onclick="confirm()">Yes</button>\n  <button onclick="closeModal()">Cancel</button>\n</div>\n\n<script>\nconst modal = document.getElementById(\'modal\');\nconst focusableEls = modal.querySelectorAll(\n  \'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])\'\n);\nconst firstEl = focusableEls[0];\nconst lastEl = focusableEls[focusableEls.length - 1];\n\nmodal.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    closeModal();\n    return;\n  }\n  if (e.key === \'Tab\') {\n    if (e.shiftKey && document.activeElement === firstEl) {\n      e.preventDefault();\n      lastEl.focus();\n    } else if (!e.shiftKey && document.activeElement === lastEl) {\n      e.preventDefault();\n      firstEl.focus();\n    }\n  }\n});\n</script>',
          'html'
        ),

        heading('Preventing accidental traps in custom widgets', 'h3'),
        code(
          '// Bad: keydown handler prevents all default behavior\nwidget.addEventListener(\'keydown\', (e) => {\n  e.preventDefault(); // This traps focus!\n  handleWidgetKey(e);\n});\n\n// Good: only prevent default for handled keys\nwidget.addEventListener(\'keydown\', (e) => {\n  if ([\'ArrowUp\', \'ArrowDown\', \'Enter\', \' \'].includes(e.key)) {\n    e.preventDefault();\n    handleWidgetKey(e);\n  }\n  // Tab and other keys pass through naturally\n});',
          'javascript'
        ),

        heading('Embedded content escape', 'h3'),
        code(
          '<!-- Provide instructions for non-standard exit -->\n<p class="sr-only">\n  Press Escape to exit the embedded editör and return\n  to the main page.\n</p>\n<div id="editör" tabindex="0"\n  aria-label="Rich text editör. Press Escape to exit.">\n  <!-- Editor content -->\n</div>',
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
          'WCAG 2.1.2, bir klavye kullanıcısı sayfadaki herhangi bir bileşene odak tasidiginida, standart klavye mekanizmaları kullanarak odağı o bileşenden uzaklastirabilmesini gerektirir. Odak, kullanıcının fare veya başka bir işaret aygiti kullanmadan cikamayacagi şekilde asla tuzaga dusurulmemelidir.'
        ),
        p(
          'Bir bileşen çıkmak için standart olmayan klavye davranisi gerektiriyorsa (bir modali kapatmak için Escape tuşuna basmak gibi), kullanıcı bu yöntem hakkında bilgilendirilmelidir. Temel ilke, hiçbir klavye kullanicisinin çıkış yolu olmadan bir bilesende asili kalmamasidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Klavye tuzağı, en ciddi erişilebilirlik engellerinden biridir. Bir kullanıcı bir bilesende takildiginda, sayfanın geri kalanyla etkileşim yetenegi tamamen kaybolur. Diger içeriklere gidemez, form gonderemez ve hatta klavye komutlari kullanarak tarayıcı sekmesini bile kapatamaz. Tek kacis yolu tarayıcıyı kapatip yeniden acmaktir — tüm sayfa durumunu ve kaydedilmemis calismalarini kaybeder.'
        ),
        p(
          'Bu özellikle yalnızca klavye girisine guvenenen kullanıcılar için tehlikelidir. Görme engelli kullanıcılar, anahtar cihazlar kullanan motor engelli kullanıcılar ve ses girişi kullanıcıları tamami, ongurelebilir odak hareketine bağımlıdır. Bir klavye tuzağı, küçük bir gezinme sorununu tamamen cikmaz bir yola cevirir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Klavye tuzaklarını doğrudan test eden otomatik axe-core kuralı bulunmamaktadır. Odak tuzaklarını tespit etmek manuel test gerektirir çünkü otomatik araçlar, odağın bir bileşenden ayrilip ayrilamadigini belirlemek için gereken ardisik klavye etkilesimini tam olarak simüle edemez.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Manuel klavye testi, klavye tuzaklarını tespit etmenin en güvenilir yoludur.'),
        numbered('Yalnızca Tab ve Shift+Tab tuşlarıyla sayfadaki her etkileşimli öğede gezinin.'),
        numbered('Odak özel bir bileşene (modal, bileşen, gömülü içerik) girdiginde, Tab ile cikmaya çalışın.'),
        numbered('Yalnızca Tab odağı cikarmiyorsa Escape, ok tuşları ve diğer standart klavye kısayollarını deneyin.'),
        numbered('Gömülü içerikleri test edin: iframe\'ler, üçüncü parti bileşenler, gömülü medya oynaticilari ve WYSIWYG editorler yaygın tuzak kaynaklaridir.'),
        numbered('Modal diyalogların Escape veya bir kapatma düğmesi ile kapatıldığında odağın serbest birakildigini doğrulayın.'),
        bullet('Özel tarih secicilere, otomatik tamamlama alanlarına, zengin metin editorlerine ve gömülü haritalara özellikle dikkat edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Her bileşenin odağı tasimak için bir klavye mekanizması sagladigindan emin olun. Kasitli odak yakalama (modaller) bir çıkış yolu içermelidir.'),

        heading('Uygun odak yönetimi ile modal diyalog', 'h3'),
        code(
          '<!-- Kasitli olarak odağı yakalayan ancak çıkış sağlayan modal -->\n<div role="dialog" aria-modal="true"\n  aria-labelledby="modal-başlık" id="modal">\n  <h2 id="modal-başlık">Islemi Onayla</h2>\n  <p>Devam etmek istediginizden emin misiniz?</p>\n  <button onclick="onayla()">Evet</button>\n  <button onclick="modalKapat()">Iptal</button>\n</div>\n\n<script>\nconst modal = document.getElementById(\'modal\');\nconst odaklanabilirOgeler = modal.querySelectorAll(\n  \'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])\'\n);\nconst ilkOge = odaklanabilirOgeler[0];\nconst sonOge = odaklanabilirOgeler[odaklanabilirOgeler.length - 1];\n\nmodal.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    modalKapat();\n    return;\n  }\n  if (e.key === \'Tab\') {\n    if (e.shiftKey && document.activeElement === ilkOge) {\n      e.preventDefault();\n      sonOge.focus();\n    } else if (!e.shiftKey && document.activeElement === sonOge) {\n      e.preventDefault();\n      ilkOge.focus();\n    }\n  }\n});\n</script>',
          'html'
        ),

        heading('Özel bilecenlerde kazara tuzakları onleme', 'h3'),
        code(
          '// Yanlış: keydown işleyicisi tüm varsayılan davranisi engelliyor\nwidget.addEventListener(\'keydown\', (e) => {\n  e.preventDefault(); // Bu odağı tuzaga dusurur!\n  bilesenTuslama(e);\n});\n\n// Doğru: yalnızca islenen tuşlar için varsayilani engelle\nwidget.addEventListener(\'keydown\', (e) => {\n  if ([\'ArrowUp\', \'ArrowDown\', \'Enter\', \' \'].includes(e.key)) {\n    e.preventDefault();\n    bilesenTuslama(e);\n  }\n  // Tab ve diğer tuşlar doğal olarak geçer\n});',
          'javascript'
        ),

        heading('Gömülü içerik çıkışı', 'h3'),
        code(
          '<!-- Standart olmayan çıkış için talimatlar sağlayın -->\n<p class="sr-only">\n  Gömülü editordan çıkmak ve ana sayfaya dönmek için\n  Escape tuşuna basın.\n</p>\n<div id="editör" tabindex="0"\n  aria-label="Zengin metin editörü. Çıkmak için Escape tuşuna basın.">\n  <!-- Editor içeriği -->\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Bir bileşen içindeki tüm keydown olaylarinda e.preventDefault() cagirmak, Tab tusunun odağı tasitmasini engellemek.'),
        bullet('Escape tuşuna basildiginda kapanmayan modal diyaloglar, klavye kullanıcılarını içine hapseder.'),
        bullet('Tüm klavye girisini yakalayan üçüncü parti gömülü bileşenler (sohbet, harita, video oynatıcılar).'),
        bullet('Tab tusunun alt öğeler arasında çıkışı olmadan sonsuz döngü yapmasina neden olan özel bilecenlerdeki sonsuz odak dongleri.'),
        bullet('Kullanıcı uzaklastiktan sonra odağı zorla bir bileşene geri donduren JavaScript tabanlı odak yönetimi.'),
        bullet('Bir bileşenden çıkmak için standart olmayan tuşlar (Escape gibi) gerektiğinde eksik talimatlar.'),
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
        metaTitle: 'WCAG 2.1.2 Klavye Tuzağı Yok — Odak Yönetimi Rehberi',
        metaDescription:
          'WCAG 2.1.2 Klavye Tuzağı Yok kriterini nasıl karşılayacağınızı öğrenin. Klavye kullanıcılarının standart klavye mekanizmaları ile her bileşenden odağı tasiyabilmesini sağlayın.',
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
      tr: 'Klavye (İstisnasız)',
    },

    description: {
      en: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, with no exceptions.',
      tr: 'İçeriğin tüm işlevselliği, hiçbir istisna olmaksızın, bireysel tuş vuruşları için belirli zamanlamalar gerektirmeden bir klavye arayüzü aracılığıyla çalıştırılmalıdır.',
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
        bullet('Relying on 2.1.1 compliance and assuming AAA iş automatically met.'),
      ],

      tr: [
        heading('Bu kural ne anlama geliyor', 'h2'),
        p(
          'WCAG 2.1.3, 2.1.1 (Klavye) kriterinin AAA seviyesindeki versiyonudur. 2.1.1 temelden yol bağımlı giriş gerektiren işlevsellik için istisnalara izin verirken (serbest çizim gibi), 2.1.3 tüm istisnalari kaldırır. Her bir işlevsellik parçası, işlevselliğin nasıl tasarlandigina bakilmaksizin, klavye arayüzü aracılığıyla tamamen çalıştırılmalıdır.'
        ),
        p(
          'Bu, 2.1.1\'den önemli ölçüde daha yüksek bir cubuktur. Bu kriteri karşılamak, serbest çizim, el yazisi girişi veya ucus simulatoru kontrolleri gibi ozelliklerin bile klavye ile calistirilamablair alternatifleri saglamasi gerektiğini ifade eder. AAA uyumluluğunu hedefleyen kuruluşlar, her özelliği bastan itibaren yalnızca klavye ile çalışma gerekliliği ile tasarlamalidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          '2.1.1, doğası gereği yol bağımlı giriş için istisnalara izin vererek pratik duzeltmeler saglarkeni, bu AAA kriteri, maksimum kapsayicilik için bu üç durumların bile klavye alternatifleri olması gerektiğini kabul eder. Bazi kullanıcılar fiziksel olarak herhangi bir işaret aygiti kullanamaz ve tüm bilgisayar etkileşimi için tamamen klavye girisine bağımlıdır.'
        ),
        p(
          'Bu kriteri karşılamak, giriş yontemlerine bakilmaksizin hiçbir kullanıcının herhangi bir islevsellikten dislanmamasini sağlar. Klavye erisilebilirliginin altin standardi olup özellikle evrensel erişilebilirliğin temel bir gereklilik olducu devlet, saglik ve eğitim platformlari için önemlidir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. 2.1.1\'in istisnasiz bir uzantisi olduğundan, test, her etkileşimli ozelligin kapsamlı bir şekilde manuel incelenmesini gerektirir ve hiçbir istisnaya izin verilmez.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, 2.1.1 ile aynıdır ancak daha sıkı gereksinimlerle — hiçbir istisnaya izin verilmez.'),
        numbered('Sitedeki her ozelligin eksiksiz bir yalnızca-klavye denetimini gerçekleştirin. Tüm etkileşimli işlevselliği belirleyin.'),
        numbered('Her özellik için yalnızca klavye girişi (Tab, Shift+Tab, Enter, Bosluk, Ok tuşları, Escape) kullanılarak tam olarak calistirilabildignii doğrulayın.'),
        numbered('2.1.1 kapsamında muaf tutulabilecek özellikleri özellikle test edin: çizim araçları, sürükle-birak, hareket tabanlı etkilesimler.'),
        numbered('Klavye alternatiflerinin eşdeğer sonuçlar uretigini — işlevselliğin bozulmus versiyonlarini değil — doğrulayın.'),
        numbered('Klavye ile calistirilamazligi olmayan herhangi bir işlevselliği AAA hatası olarak belgeleyin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('2.1.1 kapsamında muaf tutulacak olanlar da dahil olmak üzere her etkileşim için klavye alternatifleri sağlayın.'),

        heading('Klavye alternatifli çizim araçı', 'h3'),
        code(
          '<!-- Klavye alternatifi olarak koordinat tabanlı giriş sağlayın -->\n<canvas id="çizim-tuvali" aria-label="Cizim alanı"></canvas>\n\n<!-- Klavye erisimli alternatif -->\n<div role="group" aria-label="Cizim koordinatlari">\n  <label for="x-koord">X koordinati:</label>\n  <input type="number" id="x-koord" min="0" max="500">\n  <label for="y-koord">Y koordinati:</label>\n  <input type="number" id="y-koord" min="0" max="500">\n  <button onclick="noktaEkle()">Nokta Ekle</button>\n  <button onclick="noktalariBagla()">Noktaları Bagla</button>\n  <button onclick="sonIslemGeriAl()">Geri Al</button>\n</div>',
          'html'
        ),

        heading('Klavye ile yeniden sıralama destekli sürükle-birak', 'h3'),
        code(
          '<!-- Klavye destekli sıralanabilir liste -->\n<ul role="listbox" aria-label="Yeniden sıralanabilir liste">\n  <li role="option" tabindex="0"\n    aria-grabbed="false"\n    onkeydown="siralamayiYonet(event, this)">\n    Öğe 1\n    <button aria-label="Öğe 1 yukarı tasi"\n      onclick="yukariTasi(this)">&#9650;</button>\n    <button aria-label="Öğe 1 aşağı tasi"\n      onclick="asagiTasi(this)">&#9660;</button>\n  </li>\n</ul>\n\n<script>\nfunction siralamayiYonet(e, öğe) {\n  if (e.altKey && e.key === \'ArrowUp\') {\n    e.preventDefault();\n    yukariTasi(öğe);\n  } else if (e.altKey && e.key === \'ArrowDown\') {\n    e.preventDefault();\n    asagiTasi(öğe);\n  }\n}\n</script>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Yol bağımlı ozelliklerin (çizim, hareket girişi) A Seviyesi altında muaf olduklari için klavye alternatifleri gerektirmedigini varsaymak.'),
        bullet('Fare tabanlı versiyonla aynı işlevselliği sunmayan düşük kaliteli klavye alternatifleri sağlamak.'),
        bullet('Istisnalarin geçerli olduğunu varsayarak üçüncü parti bileşenler veya gömülü içerik için klavye destegini ihmal etmek.'),
        bullet('Karmaşık etkileşim kalıplarını (çok adımlı iş akışları, sürükle islemleri) klavye ile kapsamlı olarak test etmemek.'),
        bullet('2.1.1 uyumluluğuna guvenip AAA\'nın otomatik olarak karsilandigini varsaymak.'),
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
        metaTitle: 'WCAG 2.1.3 Klavye İstisnasız — AAA Klavye Rehberi',
        metaDescription:
          'WCAG 2.1.3 Klavye (İstisnasız) hakkında bilgi edinin. Bu AAA kriteri, tüm işlevselliğin hiçbir istisna olmaksızın klavye ile calistirilamabilir olmasını gerektirir.',
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
      tr: 'Karakter Tuşu Kısayolları',
    },

    description: {
      en: 'If a keyboard shortcut is implemented using only letter, punctuation, number, or symbol characters, then a mechanism is available to turn it off, remap it, or make it active only on focus.',
      tr: 'Bir klavye kısayolu yalnızca harf, noktalama, sayı veya sembol karakterleri kullanılarak uygulanmışsa, onu kapatmak, yeniden eşleştirmek veya yalnızca odakta etkin kılmak için bir mekanizma sağlanmalıdır.',
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
          '// Shortcut configuration object\nconst shortcuts = {\n  search: { key: \'s\', enabled: true },\n  help: { key: \'?\', enabled: true },\n  newItem: { key: \'n\', enabled: true },\n};\n\n// User preferences loaded from storage\nconst prefs = loadUserPreferences();\nObject.keys(shortcuts).forEach(action => {\n  if (prefs[action]) {\n    shortcuts[action] = { ...shortcuts[action], ...prefs[action] };\n  }\n});\n\ndocument.addEventListener(\'keydown\', (e) => {\n  // Skip if user iş typing in an input field\n  if (e.target.matches(\'input, textarea, [contenteditable]\')) return;\n  // Skip if modifier key iş held (not a single-char shortcut)\n  if (e.ctrlKey || e.altKey || e.metaKey) return;\n\n  Object.entries(shortcuts).forEach(([action, config]) => {\n    if (config.enabled && e.key === config.key) {\n      e.preventDefault();\n      executeAction(action);\n    }\n  });\n});',
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
          'WCAG 2.1.4, değiştirici tuşlar (Ctrl, Alt, Cmd) olmadan tek karakter tuşları (harf, sayı, noktalama veya sembol) kullanan klavye kısayollarını ele alır. Bu tür kısayollar varsa, arayüz şu üç seçenekten en az birini sunmalıdır: kısayolu kapatma, bir değiştirici tuş içerecek yeniden eşleştirme veya kısayolu yalnızca ilgili bileşen odakta olduğunda etkin kılma.'
        ),
        p(
          'Bu kriter, belirli bir sorunu gidermek için WCAG 2.1\'de tanıtıldı: ses girişi kullanıcıları metin dikte eder ve yazılımları konuşulan sözcükleri bireysel tuş vuruşları olarak yorumlar. Arama için "s" gibi tek karakterli bir kısayol, kullanıcı "save" kelimesini dikte etmeye çalıştığında kazara tetiklenebilir. Benzer şekilde, motor engelli kullanıcılar gezinirken kazara karakter tuşlarına basabilir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Dragon NaturallySpeaking gibi ses girişi yazılımları, konuşulan sözcükleri tuş basma dizilerine dönüştürür. Bir web uygulamasinin tek karakterli kısayolları olduğunda, normal dikte istenmeyen komutlari tetikleyebilir. Örneğin, "send" demek "s", "e", "n" veya "d" tuslarinin hızlı bir şekilde ardisik olarak kısayollarını etkinlestirebilir ve kullanıcı ne olduğunu anlamadan dört istenmeyen eylem gerçekleştirilir.'
        ),
        p(
          'Ekran klavyesi kullanan veya titremeye sahip motor engelli kullanıcılar da tek karakterli kısayolları kazara tetikleyebilir. Bu kısayolları devre dışı bırakma veya yeniden eşleştirme mekanizması olmadan arayüz ongurulmez ve sınır bozucu hale gelir. Degistirici tuş kombinasyonlari (Ctrl+S, Alt+N) bu soruna sahip değildir çünkü ses girişi yazılımı kazara değiştirici tuş kombinasyonlari uretmez.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Tek karakterli kısayolları tespit etmek, ses girişi yazilimiyla manuel kod incelemesi ve test gerektirir çünkü kısayollar JavaScript ile uygulanır ve yalnızca DOM analizi ile güvenilir şekilde tespit edilemez.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, tüm klavye kisayollarinin belirlenmesini ve gereksinimleri karşılayıp karsilamadiklarinin dogrulanmasini gerektirir.'),
        numbered('Klavye kısayolu uygulamaları için uygulama belgelerini ve kodu inceleyin.'),
        numbered('Sayfada her harf, sayı, noktalama ve sembol tusunu tek tek basın. Degistirici tuş olmadan tetiklenen kısayolları not edin.'),
        numbered('Bulunan her tek karakterli kısayol için, devre dışı bırakma veya yeniden eşleştirme mekanizması olduğunu doğrulayın.'),
        numbered('Belirli bilecenlere kapsamlı kisayollarin yalnızca o bileşen odakta olduğunca etkin olduğunu doğrulayın.'),
        numbered('Mumkunse ses girişi yazilimiyla (Dragon NaturallySpeaking) test edin ve sayfada metin dikte etmeyi deneyin.'),
        bullet('Tüm kisayollarin envanterini cikarimak için klavye kısayolu belgelerini kontrol edin (genellikle "?" tuşuyla görüntülenir).'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Karakter tuşu kısayollarını uygun şekilde devre dışı bırakma, yeniden eşleştirme veya kapsam belirleme mekanizması sağlayın.'),

        heading('Kapatilaabilien veya yeniden eslestirilebilen kısayol', 'h3'),
        code(
          '// Kisayol yapılandırma nesnesi\nconst kısayollar = {\n  ara: { tuş: \'s\', etkin: true },\n  yardım: { tuş: \'?\', etkin: true },\n  yeniOge: { tuş: \'n\', etkin: true },\n};\n\n// Depolamadan yüklenen kullanıcı tercihleri\nconst tercihler = kullaniciTercihleriniYukle();\nObject.keys(kısayollar).forEach(eylem => {\n  if (tercihler[eylem]) {\n    kısayollar[eylem] = { ...kısayollar[eylem], ...tercihler[eylem] };\n  }\n});\n\ndocument.addEventListener(\'keydown\', (e) => {\n  // Kullanıcı giriş alanında yaziyorsa atla\n  if (e.target.matches(\'input, textarea, [contenteditable]\')) return;\n  // Degistirici tuş basiliysa atla\n  if (e.ctrlKey || e.altKey || e.metaKey) return;\n\n  Object.entries(kısayollar).forEach(([eylem, yapılandırma]) => {\n    if (yapılandırma.etkin && e.key === yapılandırma.tuş) {\n      e.preventDefault();\n      eylemiCalistir(eylem);\n    }\n  });\n});',
          'javascript'
        ),

        heading('Kisayol yönetimi için ayarlar arayüzü', 'h3'),
        code(
          '<fieldset>\n  <legend>Klavye Kısayolları</legend>\n  <div>\n    <label>\n      <input type="checkbox" id="kısayollar-etkin"\n        checked onchange="tumKisayollariAcKapa(this.checked)">\n      Klavye kısayollarını etkinleştir\n    </label>\n  </div>\n  <table>\n    <thead>\n      <tr><th>Eylem</th><th>Tus</th><th>Etkin</th></tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Arama</td>\n        <td><input type="text" value="s" maxlength="1"\n          onchange="kisayoluYenidenEsle(\'ara\', this.value)"></td>\n        <td><input type="checkbox" checked\n          onchange="kisayoluAcKapa(\'ara\', this.checked)"></td>\n      </tr>\n    </tbody>\n  </table>\n</fieldset>',
          'html'
        ),

        heading('Kısayolları odaklı bilecenlere kapsama', 'h3'),
        code(
          '// Yanlış: tek karakterli genel kısayol\ndocument.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') sonrakineKaydir();\n  if (e.key === \'k\') oncekineKaydir();\n});\n\n// Doğru: kısayol yalnızca liste odakta olduğunca etkin\nconst liste = document.getElementById(\'öğe-listesi\');\nliste.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'j\') sonrakineKaydir();\n  if (e.key === \'k\') oncekineKaydir();\n});',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Gmail tarzı tek tuslu kısayolları (gezinme için j/k, yıldız için s, arsivleme için e) devre dışı bırakma seçeneği olmadan uygulamak.'),
        bullet('Oyun dışı arayuzlerde kapatma yolu olmadan oyun tarzı klavye kontrolleri.'),
        bullet('Kullanıcı arama alanında veya metin alanında yazarken etkin kalan tek karakterli kısayollar.'),
        bullet('Kullanıcıların klavye kısayollarını goruntulemesi, devre dışı birakmalari veya yeniden esletirmesi için ayarlar sayfası veya mekanizma olmaması.'),
        bullet('Kisayollarin bazı kullanıcılar için verimliligi artırdığı için kontroller olmadan kabul edilebilir olduğunu varsaymak.'),
        bullet('Degistirici olmadan tek karakter kullanan accesskey nitelikleri — tarayıcılar bunları tutarsız şekilde işler.'),
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
        metaTitle: 'WCAG 2.1.4 Karakter Tuşu Kısayolları — Klavye Güvenlik Rehberi',
        metaDescription:
          'WCAG 2.1.4 Karakter Tuşu Kısayolları kriterini nasıl karşılayacağınızı öğrenin. Ses girişi kullanıcıları için tek karakterli kısayolları devre dışı bırakma veya yeniden eşleştirme mekanizmaları sağlayın.',
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
      tr: 'İçerik tarafından belirlenen her zaman sınırı için kullanıcı zaman sınırını kapatabilmeli, ayarlayabilmeli veya uzatabilmelidir.',
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
          'WCAG 2.2.1, içerik bir zaman sınırı uyguladığında, kullanıcılara bunu kapatma, ayarlama veya uzatma olanagi verilmesini gerektirir. Her zaman sınırı için şu koşullardan en az biri doğru olmalıdır: kullanıcı karsilasmadan önce kapatabilmeli, varsayilanin en az 10 katina ayarlayabilmeli veya süre dolmadan önce uyarilmali ve basit bir eylemle (bir tusa basmak gibi) en az 20 saniye uzatma firsati verilmeli ve en az 10 kez uzatabilmelidir.'
        ),
        p(
          'Sınırlı istisnalar vardır: zaman sınırının temel olduğu gerçek zamanlı olaylar (muzayede gibi), zaman sınırının 20 saatten uzun olduğu durumlar ve faaliyeti geçersiz kilmadan değiştirilemeyen temel zaman sınırları. Güvenlik amaali oturum zaman asimlari yine de bir uyarı ve uzatma mekanizması sağlamalıdır.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Engelli kullanıcılar genellikle gorevleri tamamlamak için önemli ölçüde daha fazla zamana ihtiyaç duyar. Ekran okuyucu ile karmaşık bir formda gezinen görme engelli bir kullanıcı, gorebilen bir kullanicidan 5-10 kat daha uzun surede tamamlayabilir. Bilişsel engelli kullanıcılar içeriği okumak ve anlamak için daha fazla zamana ihtiyaç duyabilir. Motor engelli kullanıcılar, varsayılan zaman asimi değerlerinin beklediginden çok daha yavaş yazabilir veya gezinebilir.'
        ),
        p(
          'Sessizce sona eren oturum zaman asimlari, kullanıcıların tüm çalışmasını kaybetmelerine neden olabilir — yardımcı teknoloji kullanarak 30 dakika boyunca dikkatlice bir formu dolduran biri için özellikle yikici bir deneyim. Ayarlanabilir zamanlama, hiçbir kullanıcının daha fazla zamana ihtiyaç duydugu için haksiz yere cezalandirilmamasini sağlar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Zaman sınırları sunucu tarafı mantigi ve istemci tarafı JavaScript ile uygulanır, bu da otomatik DOM analizi ile tespit edilmesini zorlaştırır. Kasitli olarak yavaş etkilesimle manuel test gereklidir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, tüm zaman sınırlı islevselliklerin belirlenmesini ve kullanıcıların zamanlamayi kontrol edebildiginin dogrulanmasini gerektirir.'),
        numbered('Uygulamadaki tüm zaman sinirlarini belirleyin: oturum zaman asimlari, form gönderme son tarihleri, otomatik ilerleyen slaytlar, geçiçi bildirimler.'),
        numbered('Her zaman sınırı için kullanıcının kapatabilecegini, ayarlayabilecegini veya uzatabilecegini doğrulayın.'),
        numbered('Uzatma mekanizmaysa: süre dolmadan en az 20 saniye önce bir uyarı gorunduguncu doğrulayın.'),
        numbered('Uzatma eyleminin basit (herhangi bir tusa basma, düğmeye tıklama) ve en az 10 kez gerçekleştirilebileceğini doğrulayın.'),
        numbered('Oturum zaman asimi davranisini test edin: uygulama sona ermeden önce uyarı veriyor mu? Kullanıcılar oturumlarini uzatabilir mi?'),
        bullet('Otomatik ilerleyen içeriğin (slaytlar, slayt gösterileri) duraklatilabilecegini veya ayarlanabilir zamanlamaya sahip olup olmadığını kontrol edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Kullanıcıların oturumlarini sona ermeden önce uzatmelerine olanak tanıyan bir zaman asimi uyarı diyaloğu uygulayın.'),

        heading('Oturum zaman asimi uyarisi', 'h3'),
        code(
          'const OTURUM_ZAMANI = 15 * 60 * 1000; // 15 dakika\nconst UYARI_SURESI = 60 * 1000; // 60 saniye önce uyar\nlet zamanAsimiId, uyariId;\n\nfunction oturumZamanlayicisiniBaslat() {\n  clearTimeout(zamanAsimiId);\n  clearTimeout(uyariId);\n\n  uyariId = setTimeout(() => {\n    zamanAsimiUyarisiGoster();\n  }, OTURUM_ZAMANI - UYARI_SURESI);\n\n  zamanAsimiId = setTimeout(() => {\n    oturumuSonlandir();\n  }, OTURUM_ZAMANI);\n}\n\nfunction zamanAsimiUyarisiGoster() {\n  const diyalog = document.getElementById(\'zaman-asimi-diyaloğu\');\n  diyalog.showModal();\n  diyalog.focus();\n  geriSayimiBaslat(60);\n}\n\nfunction oturumuUzat() {\n  oturumZamanlayicisiniBaslat();\n  document.getElementById(\'zaman-asimi-diyaloğu\').close();\n  fetch(\'/api/oturumu-uzat\', { method: \'POST\' });\n}',
          'javascript'
        ),

        heading('Zaman asimi uyarı diyaloğu HTML', 'h3'),
        code(
          '<dialog id="zaman-asimi-diyaloğu" role="alertdialog"\n  aria-labelledby="za-başlık"\n  aria-describedby="za-açıklama">\n  <h2 id="za-başlık">Oturum Sona Eriyor</h2>\n  <p id="za-açıklama">\n    Oturumunuz <span id="geri-sayim">60</span> saniye\n    içinde sona erecek. Kaydedilmemis değişiklikler\n    kaybolacaktir.\n  </p>\n  <button onclick="oturumuUzat()" autofocus>\n    Oturuma Devam Et\n  </button>\n  <button onclick="cikisYap()">\n    Çıkış Yap\n  </button>\n</dialog>',
          'html'
        ),

        heading('Ayarlanabilir otomatik ilerleme zamanlmamasi', 'h3'),
        code(
          '<!-- Zamanlama kontrolleri ile slayt gösterisi -->\n<div role="region" aria-label="Öne çıkan içerik">\n  <div class="slaytlar"><!-- slaytlar --></div>\n  <div class="slayt-kontrolleri">\n    <button onclick="oncekiSlayt()"\n      aria-label="Önceki slayt">&#8592;</button>\n    <button onclick="otomatikIlerlemeAcKapa()"\n      aria-label="Otomatik ilerlemeyi duraklat"\n      id="duraklat-btn">&#10074;&#10074;</button>\n    <button onclick="sonrakiSlayt()"\n      aria-label="Sonraki slayt">&#8594;</button>\n  </div>\n  <label>\n    Otomatik ilerleme hızı:\n    <select onchange="hiziAyarla(this.value)">\n      <option value="0">Kapalı</option>\n      <option value="10000">Yavaş (10sn)</option>\n      <option value="5000" selected>Normal (5sn)</option>\n      <option value="3000">Hizli (3sn)</option>\n    </select>\n  </label>\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Uyari vermeden sessizce sona eren oturum zaman asimlari, kullanıcıların kaydedilmemis çalışmasını kaybetmelerine neden olur.'),
        bullet('Yalnızca birkaç saniye görünen ve uzatilamayan zaman asimi uyarıları.'),
        bullet('Daha fazla zaman isteme seçeneği olmayan form gönderme son tarihleri.'),
        bullet('Duraklat düğmesi veya zamanlama kontrolleri olmayan otomatik ilerleyen slaytlar veya slayt gösterileri.'),
        bullet('Uzatma secenekleri olmayan sinav veya anket sayfalarindaki geri sayim zamanlayicilari.'),
        bullet('Iptal etme yolu olmayan ara sayfalardaki yönlendirme zamanlayicilari (örneğin "5 saniye içinde yonlendirileceksiniz").'),
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
          'WCAG 2.2.1 Zamanlama Ayarlanabilir kriterini nasıl karşılayacağınızı öğrenin. Kullanıcılara web icerigindeki zaman sinirlarini kapatma, ayarlama veya uzatma olanagi sağlayın.',
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
      tr: 'Hareket eden, yanıp sönen, kayan veya otomatik güncellenen bilgiler için kullanıcı bunları duraklatabilmeli, durdurabilmeli veya gizleyebilmelidir.',
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
          'WCAG 2.2.2, kullanıcıların hareket eden, yanıp sönen, kayan ve otomatik güncellenen içerik üzerinde kontrol sahibi olmasını gerektirir. Kuralun iki kısmı vardır: (1) otomatik olarak başlayan, beş saniyeden fazla süren ve diğer içerikle birlikte sunulan hareket eden, yanıp sönen veya kayan içerik için kullanıcılar duraklatabilmeli, durdurabilmeli veya gizleyebilmelidir; (2) otomatik olarak başlayan ve diğer içerikle birlikte sunulan otomatik güncellenen içerik için kullanıcılar duraklatabilmeli, durdurabilmeli, gizleyebilmeli veya güncelleme sikligini kontrol edebilmelidir.'
        ),
        p(
          'Bu kriter animasyonlari, otomatik oynayan videoları, kayan haber seritlerini, canlı borsa kotasyonlarini, otomatik yenilenen içerik alanlarını, yanıp sönen öğeleri ve benzer dinamik içerikleri kapsar. İstisna, hareket veya otomatik guncellemenin temel olduğu durumlarda geçerlidir — örneğin bir dosya yükleme sırasındaki ilerleme göstergesi.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Hareket eden veya yanıp sönen içerik, dikkat eksikliği bozukluğu veya bilişsel engelli kullanıcılar için ciddi derecede dikkat dagitici olabilir. Bu kullanıcılar, animasyonlar veya otomatik güncellenen öğeler dikkatleri için rekabet ettiğinde ana içeriklere odaklanamazlar. Bazi kullanıcılar için dikkat dagitma o kadar siddetlidir ki sayfayı hiç kullanamazlar.'
        ),
        p(
          'Ekran okuyucu kullanıcıları farklı bir zorlukla karşı karsiyar: otomatik güncellenen içerik okuma akışlarını kesintiye ugratabilir. Ekran okuyucu yakın içerikleri okurken bir haber seridi guncellenirse, okuma konumu bozulabilir veya ekran okuyucu guncellemeyi duyurarak konsantrasyonu bozabilir. Vestibular bozukluğu olan kullanıcılar sürekli hareketten bas donmesi veya mide bulantisi yasayabilir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        bullet('blink — <blink> öğelerinin kullanilmamasini sağlar. <blink> öğesi, dikkat dagitici olan ve kullanıcılar tarafından duraklatilmayan yanıp sönen içerik oluşturur.'),
        bullet('marquee — <marquee> öğelerinin kullanilmamasini sağlar. <marquee> öğesi, kullanıcı tarafından duraklatilmayan, durdurulamayan veya gizlenemeyen kayan metin oluşturur.'),

        heading('Nasıl test edilir', 'h2'),
        p('Tüm hareket eden, yanıp sönen, kayan veya otomatik güncellenen içerikleri belirleyin ve kullanıcı kontrollerinin var olduğunu doğrulayın.'),
        numbered('Sayfayı yükleyin ve hareket eden, yanıp sönen, kayan veya otomatik güncellenen tüm içerikleri belirleyin.'),
        numbered('5 saniyeden fazla süren her hareket eden/yanıp sönen/kayan öğe için duraklatma, durdurma veya gizleme mekanizmasının var olduğunu doğrulayın.'),
        numbered('Otomatik güncellenen içerik için duraklatma, durdurma, gizleme veya güncelleme sikligini ayarlama kontrollerini doğrulayın.'),
        numbered('Kullanimdan kalkmis <blink> ve <marquee> öğelerinin kullanımını tespit etmek için axe-core çalıştırın.'),
        numbered('Animasyonlari duraklatmanin bilgi kaybina neden olmadığını doğrulayın — kullanıcı devam edebilmeli veya içeriğe yetisebilmelidir.'),
        bullet('Otomatik oynayan videoların görünür duraklatma kontrollerine sahip olup olmadığını ve duraklattiktan sonra otomatik olarak yeniden baslamalarini kontrol edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Kontrol edilemeyen animasyonlu öğeleri, kullanıcı kontrolleri sağlayan erişilebilir alternatiflerle değiştirin.'),

        heading('Marquee yerine kontrol edilebilir haber seridi', 'h3'),
        code(
          '<!-- Yanlış: erişilemez marquee -->\n<marquee>Son dakika: Önemli güncelleme...</marquee>\n\n<!-- Doğru: duraklatma kontrollü CSS animasyonu -->\n<div class="haber-seridi" role="region"\n  aria-label="Haber seridi" aria-live="off">\n  <button onclick="seridiAcKapa()"\n    aria-label="Haber seridini duraklat"\n    id="serit-duraklat">Duraklat</button>\n  <div class="serit-içerik" id="serit">\n    <span>Son dakika: Önemli güncelleme...</span>\n  </div>\n</div>',
          'html'
        ),

        heading('Haber seridi CSS ve JavaScript', 'h3'),
        code(
          '.serit-içerik {\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.serit-içerik span {\n  display: inline-block;\n  animation: sola-kaydır 15s linear infinite;\n}\n\n.serit-içerik.duraklatildi span {\n  animation-play-state: paused;\n}\n\n@keyframes sola-kaydır {\n  0% { transform: translateX(100%); }\n  100% { transform: translateX(-100%); }\n}',
          'css'
        ),
        code(
          'function seridiAcKapa() {\n  const serit = document.getElementById(\'serit\');\n  const btn = document.getElementById(\'serit-duraklat\');\n  const duraklatildi = serit.classList.toggle(\'duraklatildi\');\n  btn.textContent = duraklatildi ? \'Oynat\' : \'Duraklat\';\n  btn.setAttribute(\'aria-label\',\n    duraklatildi ? \'Haber seridini oynat\' : \'Haber seridini duraklat\'\n  );\n}',
          'javascript'
        ),

        heading('Kontrolleri olan otomatik güncellenen içerik', 'h3'),
        code(
          '<div role="region" aria-label="Canlı akış"\n  aria-live="polite" id="canlı-akış">\n  <div class="akış-kontrolleri">\n    <button onclick="guncellemeleriAcKapa()"\n      id="güncelleme-düğmesi">Guncellemeleri Duraklat</button>\n    <label>\n      Guncelleme sikligi:\n      <select onchange="sikligiAyarla(this.value)">\n        <option value="5000">Her 5 saniye</option>\n        <option value="15000">Her 15 saniye</option>\n        <option value="30000" selected>Her 30 saniye</option>\n        <option value="60000">Her dakika</option>\n        <option value="0">Yalnızca manuel</option>\n      </select>\n    </label>\n    <button onclick="simdiYenile()">Simdi Yenile</button>\n  </div>\n  <div id="akış-içeriği"><!-- Dinamik içerik --></div>\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('<blink> veya <marquee> öğeleri kullanmak, animasyon üzerinde kullanıcı kontrolü sağlamaz.'),
        bullet('Görünür duraklatma kontrolü olmayan otomatik oynayan arka plan videoları.'),
        bullet('Duraklatma mekanizması olmadan sürekli donguye giren animasyonlu kahraman bannerlari veya slaytlar.'),
        bullet('Duraklatma veya yenileme aralığını ayarlama kontrolleri olmadan otomatik yenilenen veri tabloları veya panolar.'),
        bullet('Duraklatmak için JavaScript değiştirici olmadan sonsuz donguye giren CSS animasyonlari.'),
        bullet('Üzerine gelince duraklayan ancak klavye erisimli duraklatma mekanizması sağlamayan hareketli içerik.'),
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
          'WCAG 2.2.2 Duraklat, Durdur, Gizle kriterini nasıl karşılayacağınızı öğrenin. Hareket eden, yanıp sönen, kayan veya otomatik güncellenen içerikleri kontrol etme mekanizmaları sağlayın.',
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
      tr: 'Etkileşimsiz senkronize medya ve gerçek zamanlı olaylar hariç olmak üzere, zamanlama içeriğin sunduğu olay veya faaliyetin temel bir parçası değildir.',
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
          'WCAG 2.2.3, 2.2.1\'in (Zamanlama Ayarlanabilir) AAA seviyesindeki uzantisidir. 2.2.1 zaman sinirlarini kapatma, ayarlama veya uzatma mekanizmaları gerektirirken, 2.2.3 zamanlamanin içerik etkilesimlerinden tamamen kaldirilmasini gerektirerek daha da ileri gider. Kullanıcılar herhangi bir görevi hiçbir zaman baskisi olmadan kendi hızlarında tamamlayabilmelidir.'
        ),
        p(
          'Yalnızca iki istisna mevcuttur: etkilecimsiz senkronize medya (zamanlamanin içeriğin dogasinda olduğu önceden kaydedilmiş video/ses) ve gerçek zamanlı olaylar (canlı yayınlar, muzayedeler). Diger her tür zaman sınırı — oturum zaman asimlari, form son tarihleri, sinav zamanlayicilari, otomatik ilerleyen içerik — yalnızca ayarlanabilir hale getirilmemeli, tamamen kaldirilmalidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Ayarlanabilir zamanlamayla (2.2.1) bile, bazı kullanıcılar bir zamanlayiciyi uzatmak için yeterince hızlı yanıt veremeyebilir, bir zaman asimi uyarisini fark etmeyebilir veya uzatma sürecinin kendisini rahatsız edici bulabilir. Ciddi bilişsel engelli kullanıcılar zaman asimi kavramını hiç anlamayabilir. Zamanlamayi tamamen ortadan kaldırmak bu engelleri ortadan kaldırır.'
        ),
        p(
          'AAA uyumluluğunu hedefleyen uygulamalar için zaman sinirlarini kaldırmak, evrensel erişime baglilik gösterir. En ciddi engelleri olan kullanıcıların — önemli bilişsel bozukluklari olanlar dahil — ilerlemeyi kaybetme veya dislanma kaygiici olmadan ihtiyaç duyduklan hizda içerikle etkileşim kurmalarini sağlar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Zaman sinirlarinin yokluğunu tespit etmek, uygulama mantigi, sunucu tarafı oturum yönetimi ve istemci tarafı zamanlayicilarin kapsamlı manuel incelemesini gerektirir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, tüm zamanlı islevselliklerin kapsamlı bir envanterini ve zamanlamanin kaldirildiginin dogrulanmasini gerektirir.'),
        numbered('Tüm uygulamayi herhangi bir zaman sınırı formu için denetleyin: oturum zaman asimlari, form gönderme son tarihleri, otomatik ilerleyen içerik, geri sayim zamanlayicilari veya zamanlı degerlendirmeler.'),
        numbered('Bulunan her zaman sınırı için gerçek zamanlı olay veya senkronize medya istisnası olarak nitelenip nitelenmedigini belirleyin.'),
        numbered('İstisna olmayan zaman sinirlarinin yalnızca ayarlanabilir hale getirilmemis, tamamen kaldirildigini doğrulayın.'),
        numbered('Sayfalari uzun sureler boyunca (saatlerce) açık bırakın ve içerik etkileşimi için oturum süresi dolmasi olmadığını doğrulayın.'),
        numbered('Tüm içeriğin zaman baskisi olmadan kullanıcının kendi hizinda tuketilebilecegini onaylayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Zaman sinirlarini tamamen kaldırın veya guvenligin izin verdigi yerlerde süresiz oturumlar kullanın.'),

        heading('Suresiz form oturumu', 'h3'),
        code(
          '// Oturum zaman asimi yerine ilerlemeyi otomatik kaydedin\nlet otomatikKayitAraligi = setInterval(() => {\n  const formVerisi = formVerisiniTopla();\n  localStorage.setItem(\'form-taslak\', JSON.stringify(formVerisi));\n  // Ayrıca sunucuya periyodik olarak kaydet\n  fetch(\'/api/taslak-kaydet\', {\n    method: \'POST\',\n    body: JSON.stringify(formVerisi),\n    headers: { \'Content-Type\': \'application/json\' }\n  }).catch(() => {\n    // Sessiz bsarisizlik — yerel depolama yedek olarak hizmet eder\n  });\n}, 30000); // Her 30 saniyede otomatik kaydet\n\n// Sayfa yüklemesinde taslağı geri yükle\nwindow.addEventListener(\'load\', () => {\n  const taslak = localStorage.getItem(\'form-taslak\');\n  if (taslak) {\n    formVerisiniGeriYukle(JSON.parse(taslak));\n  }\n});',
          'javascript'
        ),

        heading('Zamansiz degerlendirme', 'h3'),
        code(
          '<!-- Yanlış: zamanlı sinav -->\n<div class="sinav">\n  <p>Kalan süre: <span id="zamanlayici">05:00</span></p>\n  <!-- sinav soruları -->\n</div>\n\n<!-- Doğru: ilerleme göstergeli zamansiz sinav -->\n<div class="sinav">\n  <p>Soru 3/10 — Ihtiyaciniz kadar zaman ayin</p>\n  <progress value="3" max="10"\n    aria-label="Sinav ilerlemesi: 10 sorunun 3. sorusu"></progress>\n  <!-- sinav soruları -->\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Zaman sinirlarini tamamen ortadan kaldırmak yerine ayarlanabilir hale getirmek (yalnızca 2.2.1\'i karşılar, 2.2.3\'u değil).'),
        bullet('Alternatif oturum yönetimi arastirmadan güvenlik politikalari nedeniyle kaldirilmayan oturum zaman asimlari.'),
        bullet('Zamanlamanin test edilen beceriyi ölçmek için gerçekten temel olmadığı zamanlı degerlendirmeler veya sinavlar.'),
        bullet('Kendi hizinda bir mod sunmayan otomatik ilerleyen sunumlar.'),
        bullet('Sepet kaliciligi yerine kullanılan işlem son tarihleri (örneğin "15 dakika içinde odemeyi tamamlayın").'),
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
          'WCAG 2.2.3 Zamanlama Yok hakkında bilgi edinin. Bu AAA kriteri, kullanıcıların faaliyetleri kendi hızlarında tamamlayabilmeleri için zaman sinirlarinin tamamen kaldirilmasini gerektirir.',
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
      tr: 'Acil durumlar hariç, kesintiler kullanıcı tarafından ertelenebilmeli veya bastırılabilmelidir.',
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
          'WCAG 2.2.4, kullanıcıların uyarilar, bildirimler, canlı guncellemeler ve dikkat gerektiren diğer içerik değişiklikleri gibi kesintileri erteleyebilmesini veya bastirabilmesini gerektirir. Tek istisna gerçek acil durumlar içindir — saglik, güvenlik veya veri butunlugu hakkında aninda kullanıcı farkindaligu gerektiren uyarilar.'
        ),
        p(
          'Bu, push bildirimleri, toast mesajları, sohbet acilik pencereleri, tanıtım katmanları, sistem uyarıları, canlı içerik güncellemeleri ve kullanıcının dikkatini mevcut gorevinden saptiran herhangi bir mekanizma için geçerlidir. Kullanıcılar bu kesintileri kapatma, daha sonraya zamanlama veya güncellemeleri kontrol etmeyi secene kadar gorumemelerini sağlamak için bir yola sahip olmalıdır.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Kesintiler özellikle bilişsel engelli ve dikkat eksikliği bozukluğu olan kullanıcılar için rahatsız edicidir. Her bildirim veya uyarı, toparlanmak için önemli zihinsel caba gerektirebilecek bir bağlam değişikliği zorlar. Bellek bozukluğu olan kullanıcılar, kesintiye ugradiktan sonra ne yaptiklarin tamamen unutabilir ve gorevlerine bastan başlamak zorunda kalabilir.'
        ),
        p(
          'Ekran okuyucu kullanıcıları özellikle etkilenir çünkü ARIA canlı alanlarını tetikleyen bildirimler, ekran okuyucunun o anda okudugunu keser. Engeli olmayan kullanıcılar bile sürekli kesintilere maruz kaldiginda azalan uretkenlik ve artan stres yasarlar. Araştırmalar, bir kesintiden sonra odağı tamamen yeniden kazanmanin ortalama 23 dakika aldidini göstermektedir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Kesinti davranisi, çalışma zamani JavaScript mantigi, push bildirim API\'leri ve statik DOM analizi ile tespit edilemeyen sunucu tarafı olay sistemlerine bağlıdır.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, tüm kesinti kaynaklarini belirlemek için sayfa üzerinde zaman icerisinde izleme gerektirir.'),
        numbered('Uygulamayı uzun bir süre kullanın ve her bildirim, uyarı, açılır pencere veya istenmeyen içerik değişikliğini not edin.'),
        numbered('Her kesinti için bunu kapatmak veya ertelemek için bir ayar olup olmadığını kontrol edin.'),
        numbered('Bildirim tercihlerinin mevcut ve işlevsel olduğunu doğrulayın (örneğin "Rahatsiz etmeyin" modu).'),
        numbered('ARIA canlı alanlarının uygun şekilde kullanıldığını ve kullanıcı tercihi ile bastirilabilecegini kontrol edin.'),
        numbered('Kesintilerin kontrol edilebilecegini ve okuma akışını kontrolsuz şekilde bozmadidini doğrulamak için bir ekran okuyucu ile test edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Kullanıcıların kesintileri ne zaman ve nasıl alacaklarini kontrol etmelerine olanak tanıyan kapsamlı bildirim tercihleri sağlayın.'),

        heading('Bildirim tercihleri', 'h3'),
        code(
          '<fieldset>\n  <legend>Bildirim Tercihleri</legend>\n\n  <label>\n    <input type="checkbox" id="bildirim-etkin" checked\n      onchange="bildirimleriAcKapa(this.checked)">\n    Bildirimleri etkinleştir\n  </label>\n\n  <fieldset id="bildirim-secenekleri">\n    <legend>Etkinlestirildiginde bildirimleri göster:</legend>\n    <label>\n      <input type="checkbox" name="bildirim-türü"\n        value="mesajlar" checked> Yeni mesajlar\n    </label>\n    <label>\n      <input type="checkbox" name="bildirim-türü"\n        value="guncellemeler"> İçerik güncellemeleri\n    </label>\n    <label>\n      <input type="checkbox" name="bildirim-türü"\n        value="tanitimlar"> Tanitimlar\n    </label>\n  </fieldset>\n\n  <label>\n    <input type="checkbox" id="re-modu"\n      onchange="rahatsizEtmeyinModuAcKapa(this.checked)">\n    Rahatsiz etmeyin modu\n  </label>\n</fieldset>',
          'html'
        ),

        heading('Kontrol edilebilir bildirim sistemi', 'h3'),
        code(
          'class BildirimYoneticisi {\n  constructor() {\n    this.etkin = true;\n    this.rahatsizEtmeyin = false;\n    this.kuyruk = [];\n    this.izinVerilenTurler = new Set([\'mesajlar\', \'guncellemeler\']);\n  }\n\n  bildir(mesaj, tür = \'bilgi\', acilDurum = false) {\n    // Acil durumlar her zaman gösterilir\n    if (acilDurum) {\n      this.bildirimiGoster(mesaj, \'acil\');\n      return;\n    }\n\n    // Kullanıcı tercihlerine say\n    if (!this.etkin || !this.izinVerilenTurler.has(tür)) return;\n\n    if (this.rahatsizEtmeyin) {\n      this.kuyruk.push({ mesaj, tür });\n      return;\n    }\n\n    this.bildirimiGoster(mesaj, tür);\n  }\n\n  kuyruklanmislariGoster() {\n    this.kuyruk.forEach(öğe =>\n      this.bildirimiGoster(öğe.mesaj, öğe.tür)\n    );\n    this.kuyruk = [];\n  }\n}',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Ayarlarda devre dışı bırakma yolu olmadan otomatik olarak görünen toast bildirimleri.'),
        bullet('Bastirma tercihi olmadan istenmeyen şekilde açılan sohbet bilesenelri.'),
        bullet('Davranis üzerinde kullanıcı kontrolü olmadan sürekli guncelemeleri duyuran ARIA canlı alanları.'),
        bullet('Zamanlı araliklarla görünen ve vazgecme mekanizması olmayan tanıtım katmanları veya bannerler.'),
        bullet('Duraklatma veya gruplama yolu olmadan güncellemeleri iten gerçek zamanlı içerik akışları.'),
        bullet('Bağlam olmadan sayfa yüklemesinde hemen istenen tarayıcı push bildirimleri.'),
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
        metaTitle: 'WCAG 2.2.4 Kesintiler — Bildirim Kontrolü Rehberi',
        metaDescription:
          'WCAG 2.2.4 Kesintiler hakkında bilgi edinin. Bu AAA kriteri, kullanıcıların acil olmayan tüm kesintileri erteleyebilmesini veya bastirabilmesini gerektirir.',
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
      tr: 'Yeniden Kimlik Doğrulama',
    },

    description: {
      en: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
      tr: 'Kimlik doğrulanmış bir oturum sona erdiğinde, kullanıcı yeniden kimlik doğrulaması yaptıktan sonra veri kaybı olmadan faaliyete devam edebilmelidir.',
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
          'WCAG 2.2.5, kimlik doğrulanmış bir oturum sona erdiğinde ve kullanıcı yeniden kimlik doğrulaması yapması gerektiğinde (tekrar giriş yapmak), uygulamanin oturum sona ermeden önceki tüm verileri ve durumu korumasını gerektirir. Tekrar giriş yaptıktan sonra kullanıcı, tüm form verileri, secimler ve ilerlemesi bozulmadan tam olarak kaldigi yere dondurilmelidir.'
        ),
        p(
          'Bu, oturumlarin sona ermesini engellemez — güvenlik gereksinimleri zaman asimlarini zorunlu kilabilir. Ancak oturum suresinin dolmasinin kullanıcıları çalışmasını yok ederek cezalandirmamasini sağlar. Uygulama, oturum sona ermeden önce kullanıcının durumunu sunucu veya istemci tarafında kaydetmeli ve yeniden kimlik dogrulamasindan sonra geri yuklemelidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Engelli kullanıcılar genellikle gorevleri tamamlamak için önemli ölçüde daha uzun süre harcarlar. Karmaşık bir formu ekran okuyucu ile dolduran görme engelli bir kullanıcı 30-60 dakika surebilir. Oturum 45. dakikada sona erer ve tüm form verileri kaybolursa, kullanıcı bastan başlamak zorundadır — potansiyel olarak bir saatlik dikkatli calismayi kaybeder. Bu, daha fazla zamana ihtiyaç duyan engelli kullanıcıları orantisiz olarak etkiler.'
        ),
        p(
          'Engeli olmayan kullanıcılar için bile, oturum zaman acimindan sonra veri kaybetmek sınır bozucu ve guveni zedeler. Bilişsel engelli kullanıcılar için bir kesintiden sonra bilgileri hatirlamak ve yeniden girmek son derece zor olabilir. Yeniden kimlik doğrulama boyunca durumu korumak, surekliligi sağlar ve kullanıcının zaman ve caba yatirimina saygı gösterir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Oturum yönetimi ve veri koruma, istemci tarafı DOM analizi ile tespit edilemeyen sunucu tarafı konularidir. Oturum süresi dolma sınırları boyunca manuel test gereklidir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, çeşitli gorevler sırasında oturum suresinin dolmasini tetiklemeyi ve veri korumanin dogrulanmasini gerektirir.'),
        numbered('Kimlik dogrulanmisken bir formu doldurmaya veya çok adımlı bir görev gerçekleştirmeye başlayın.'),
        numbered('Oturumun sona ermesini bekleyin (veya geliştirici araçları ya da sunucu yapılandırması aracılığıyla manuel olarak sonlandirin).'),
        numbered('Yeniden kimlik doğrulaması yapın (tekrar giriş yapın).'),
        numbered('Önceden girilen tüm form verilerinin, secimlerin, kayma konumunun ve görev ilerlemesinin geri yuklendigini doğrulayın.'),
        numbered('Farklı etkinlik türleri boyunca test edin: formlar, dosya yuklemeleri, çok adımlı sihirbazlar, içerik düzenleme.'),
        bullet('Kullanıcının oturum sona ermeden önce olduğu sayfa ve bağlama yonlendirildigini doğrulayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Oturum süresi dolmadan önce veya sırasında kullanıcı ilerlemesini kaydeden durum koruma uygulayın.'),

        heading('Oturum geri yuklemeli otomatik kaydetme', 'h3'),
        code(
          '// Form durumunu periyodik olarak ve oturum sona ermeden önce kaydedin\nfunction formDurumunuOtomatikKaydet(formId) {\n  const form = document.getElementById(formId);\n  const formVerisi = new FormData(form);\n  const durum = Object.fromEntries(formVerisi.entries());\n\n  // Sunucuya kaydet (kullanıcı hesabiyla ilişkili)\n  fetch(\'/api/taslak-kaydet\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/json\' },\n    body: JSON.stringify({\n      formId,\n      durum,\n      url: window.location.href,\n      kaydirmaKonumu: window.scrollY\n    })\n  });\n}\n\n// Her 30 saniyede otomatik kaydet\nsetInterval(() => formDurumunuOtomatikKaydet(\'ana-form\'), 30000);\n\n// Gorunurluk değişikliğinde kaydet\ndocument.addEventListener(\'visibilitychange\', () => {\n  if (document.hidden) formDurumunuOtomatikKaydet(\'ana-form\');\n});',
          'javascript'
        ),

        heading('Yeniden kimlik dogrulamasindan sonra durumu geri yükleme', 'h3'),
        code(
          '// Başarılı giristen sonra kaydedilmiş durumu kontrol edin\nasync function girisBasariliysa(kullaniciId) {\n  const yanıt = await fetch(\n    `/api/taslak-geri-yükle?kullaniciId=${kullaniciId}`\n  );\n  const taslak = await yanıt.json();\n\n  if (taslak && taslak.url) {\n    sessionStorage.setItem(\'geri-yükle-taslak\', JSON.stringify(taslak));\n    window.location.href = taslak.url;\n  }\n}\n\n// Sayfa yüklemesinde taslağı geri yükle\nwindow.addEventListener(\'load\', () => {\n  const taslak = sessionStorage.getItem(\'geri-yükle-taslak\');\n  if (taslak) {\n    const { durum, kaydirmaKonumu } = JSON.parse(taslak);\n    formVerisiniGeriYukle(durum);\n    window.scrollTo(0, kaydirmaKonumu);\n    sessionStorage.removeItem(\'geri-yükle-taslak\');\n    bildirimiGoster(\'Önceki ilerlemeniz geri yuklendi.\');\n  }\n});',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Oturum suresinin dolmasi, giriş sayfasina ve ardından orijinal sayfa yerine ana sayfaya yönlendirmek.'),
        bullet('Form durumunu yalnızca sessionStorage\'da kaydetmek — bu, tarayıcı sekmesi kapatıldığında temizlenir.'),
        bullet('Çok adımlı sihirbazlar için durumu kaydetmemek, kullanıcının iş akisindaki konumunu kaybetmek.'),
        bullet('Form girislerini geri yüklemek ancak yeniden yükleme gerektiren dosya yükleme secimlerini geri yuklememek.'),
        bullet('Kullaniciyi ilerlemesinin kaydedildigini ve yeniden kimlik dogrulamasindan sonra geri yuklenecegini bildirmemek.'),
        bullet('Yalnızca en son sayfa için durumu korumak, karmaşık çok sekmeli iş akışları için değil.'),
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
        metaTitle: 'WCAG 2.2.5 Yeniden Kimlik Doğrulama — Oturum Verisi Koruma Rehberi',
        metaDescription:
          'WCAG 2.2.5 Yeniden Kimlik Doğrulama hakkında bilgi edinin. Kimlik doğrulanmış oturum sona erdikten ve yeniden giriş yaptıktan sonra kullanıcıların veri kaybı olmadan faaliyete devam edebilmesini sağlayın.',
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
      tr: 'Zaman Aşımları',
    },

    description: {
      en: 'Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours of inactivity.',
      tr: 'Veri kaybı yaratabilecek kullanıcı etkinsizliği süresi hakkında kullanıcılar uyarılmalıdır, veriler 20 saatten fazla etkinsizlik boyunca korunmadığı sürece.',
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
          'WCAG 2.2.6, veri kaybina neden olabilecek herhangi bir etkinsizlik zaman asimi hakkında kullanıcıların bilgilendirilmesini gerektirir. Uygulama bir etkinsizlik doneminden sonra kullanıcı verilerini kaybedecekse (oturum zaman asimi, alisveris sepeti süresi dolmasi, form verisi kaybı), kullanıcı surecrn başında süre hakkında uyarılmalıdır. İstisna, verilerin 20 saatten fazla etkinsizlik boyunca korunmasid.'
        ),
        p(
          'Bu, 2.2.1\'den (ayarlanabilir zamanlama gerektiren) ve 2.2.5\'ten (yeniden kimlik dogrulamasindan sonra veri koruma gerektiren) farklidir. Bu kriter özellikle seffaflik hakkindadir: kullanıcılara bir zaman asiminin var olduğunu ve ne kadar sureleri olduğunu önceden soylemek, böylece buna göre plan yapabilirler. Kullanıcılar bir göreve baslamadan önce tamamlamak için sınırlı bir pencereleri olduğunu bilmelidir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Birçok kullanıcı oturumlarin sona erebileceginin veya etkinsizligin veri kaybina neden olabileceginin farkinda değildir. Gorevleri tamamlamak için ekstra zamana ihtiyaç duyan engelli kullanıcılar dinlenmek için bilgisayardan uzaklasabilir, farklı bir yardımcı teknolojiye gecebilir veya zaman asiminin ongordugundan daha yavaş çalışabilir. Zaman asimi süresi hakkında açık bir uyarı olmadan bu kullanıcılar bilmeden calismalarini kaybedebilir.'
        ),
        p(
          'Zaman asimlari hakkında seffaflik, kullanıcıların yaklasimlarini planlamalarini sağlar. 15 dakika içinde bir formu tamamlamasi gerektiğini bilen bir kullanıcı önce tüm bilgileri toplayip toplamayacagina karar verebilir. Alisveris sepetinin 30 dakika sonra sona erecegini bilen bir kullanıcı satın almayi tamamlamayi öncelik haline getirebilir. Bu bilgi özellikle dinlenme molalari planlamasi gereken veya daha yavaş tempoda çalışan kullanıcılar için kritiktir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Zaman asimi uyarıları, kullanıcı arayüzü ve belgelerin manuel incelemesi ile doğrulanması gereken bir tasarım ve içerik gereksinimidir.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, tüm etkinsizlik zaman asimlarinin belirlenmesini ve kullanıcıların bunlar hakkında uyarildiginin dogrulanmasini gerektirir.'),
        numbered('Etkinsizlik nedeniyle kullanıcı verilerinin kaybolabilecegi tüm yerleri belirleyin: oturum zaman asimlari, form verisi süresi dolmasi, alisveris sepeti zaman asimlari.'),
        numbered('Kullanıcıların etkilenen faaliyete baslamadan önce zaman asimi süresi hakkında uyarildigini doğrulayın.'),
        numbered('Uyarinin açık, belirgin ve anlaşılır olduğundan (kullanım koşullarına gomulmemis) emin olun.'),
        numbered('Belirtilen zaman asimi suresinin doğru olduğunu doğrulayın.'),
        numbered('Veriler 20 saatten fazla korunuyorsa, bu iddianin uzun süreli etkinsizlik testi ile doğru olduğunu doğrulayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Etkinsizligin veri kaybina neden olabilecegi herhangi bir sürecin başında açık zaman asimi uyarıları sağlayın.'),

        heading('Formlarda zaman asimi uyarisi', 'h3'),
        code(
          '<form id="basvuru-formu">\n  <div role="alert" class="zaman-asimi-bildirimi">\n    <p>\n      <strong>Önemli:</strong> Bu form ilerlemenizi otomatik\n      olarak kaydeder. Ancak oturumunuz 30 dakika\n      etkinsizlikten sonra sona erecektir. Lütfen formu bu\n      süre içinde tamamlayın ve gönderin, aksi takdirde\n      kaydedilmemis değişiklikleriniz kaybolabilir.\n    </p>\n  </div>\n\n  <!-- Form alanları -->\n  <label for="isim">Tam isim</label>\n  <input type="text" id="isim" name="isim">\n  <!-- ... diğer alanlar ... -->\n</form>',
          'html'
        ),

        heading('Alisveris sepeti zaman asimi bildirimi', 'h3'),
        code(
          '<div class="sepet-başlık">\n  <h1>Alisveris Sepetiniz</h1>\n  <p class="zaman-asimi-bilgisi" role="status">\n    Sepetinizdeki ürünler <strong>60 dakika</strong>\n    boyunca ayrilmistir. Bu sureden sonra, stok sınırlı\n    ise kullanılamaz hale gelebilir.\n  </p>\n</div>',
          'html'
        ),

        heading('Giriş sayfası zaman asimi açıklaması', 'h3'),
        code(
          '<div class="oturum-bilgisi">\n  <h2>Oturum Bilgisi</h2>\n  <p>\n    Güvenlik için oturumunuz <strong>15 dakika</strong>\n    etkinsizlikten sonra sona erecektir. Oturumunuz\n    sona ermeden önce uzatmaniz istenecektir.\n  </p>\n</div>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Yalnızca kullanım kosullarinda veya yardım sayfalarında belgelenen, etkileşim noktasında gösterilmeyen oturum zaman asimlari.'),
        bullet('Sureyi belirtmeden "Oturumunuz sona erebilir" gibi belirsiz uyarilar.'),
        bullet('Görsel olarak mevcut ancak ekran okuyuculari tarafından erişilebilir olmayan zaman asimi bilgisi.'),
        bullet('Uygulamanin farklı bölümleri için bireysel uyarilar olmadan farklı zaman asimi sureleri.'),
        bullet('Önceden zaman asimi açıklaması olmadan sessizce sona eren alisveris sepetleri.'),
        bullet('Etkinsizlige özgü zaman asimlari hakkında (mutlak oturum suresinin aksine) uyarı vermemek.'),
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
        metaTitle: 'WCAG 2.2.6 Zaman Aşımları — Etkinsizlik Uyarisi Rehberi',
        metaDescription:
          'WCAG 2.2.6 Zaman Aşımları hakkında bilgi edinin. Bu AAA kriteri, veri kaybina neden olabilecek etkinsizlik zaman asimlari hakkında kullanıcıların uyarilmasini gerektirir.',
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
      tr: 'Üç Yanıp Sönme veya Eşik Altında',
    },

    description: {
      en: 'Web pages do not contain anything that flashes more than three times in any one-second period, or the flash is below the general flash and red flash thresholds.',
      tr: 'Web sayfaları herhangi bir bir saniyelik dönemde üçten fazla kez yanıp sönen hiçbir şey içermez veya yanıp sönme genel yanıp sönme ve kırmızı yanıp sönme eşiklerinin altındadır.',
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
          'WCAG 2.3.1, kullanıcıları nobetleri tetikleyebilecek içerikten korur. Web sayfaları, yanıp sönen içerik genel yanıp sönme esiginin ve kırmızı yanıp sönme esiginin altına dusecek kadar küçük ve soluk olmadıkça, saniyede üçten fazla kez yanıp sönen hiçbir şey içermemelidir. Bu kritik bir güvenlik kriteridir — ihlaller fiziksel zarara neden olabilir.'
        ),
        p(
          'Genel yanıp sönme eşiği, bir saniyelik dönemde üç veya daha fazla yanıp sönme olduğunda ve yanıp sönen içeriğin toplam alanı yeterince büyük olduğunda (tipik izleme mesafesinde yaklaşık 341 x 256 piksel alan) asisilir. Kırmızı yanıp sönme eşiği özellikle doymus kırmızı içeren geçişler için geçerlidir. İçerik yalnızca her iki eşik de asisilmazsa saniyede üçten fazla kez yanıp sonebilir.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Yaklasik 4.000 kisiden 1\'inde fotosensitif epilepsi vardır; bu, yanıp sönen isiklar veya hızla değişen görsel kaliplarin nobetleri tetikleyebildigi bir durumdur. Nobetler kısa süreli farkindalik kaybindan tam konvulziyonlara kadar değişir ve tıbbi olarak tehlikeli olabilir. En bilinen olay, hızla yanıp sönen kırmızı ve mavi animasyonlar nedeniyle yaklaşık 700 Japon cocugunda nobetlere neden olan 1997 Pokemon bolumudur.'
        ),
        p(
          'Epilepsinin ötesinde, yanıp sönen içerik fotosensitivite veya vestibular bozukluğu olan kisilerde migren, bas donmesi, mide bulantisi ve yönelim bozukluğuna neden olabilir. Sonucun rahatsızlık veya bir ozelligni kullanamamak olduğu çoğu erişilebilirlik sorunundan farklı olarak, bu kriterin ihlalleri aninda fiziksel zarara neden olabilir. Bu, onu en kritik WCAG gereksinimlerinden biri yapar.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Yanıp sönme sikligi ve eşik ihlallerini tespit etmek, Fotosensitif Epilepsi Analiz Araçı (PEAT) veya Harding testi gibi özel araclarla kare kare video analizi gerektirir. Otomatik DOM analizi yanıp sönen içeriği güvenilir şekilde tespit edemez.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, görsel içeriğin yanıp sönme sikligi ve boyutu için analiz edilmesini gerektirir.'),
        numbered('Sayfadaki tüm video içeriklerini, animasyonlari, GIF\'leri ve dinamik görsel efektleri inceleyin.'),
        numbered('Yanıp sonuyor gibi görünen herhangi bir içerik için saniyede yanıp sönme sayısını sayın. Saniyede üçten fazla potansiyel bir ihlaldir.'),
        numbered('Video içeriğini eşik ihlalleri için analiz etmek üzere Fotosensitif Epilepsi Analiz Araçı\'ni (PEAT) kullanın.'),
        numbered('Hizli renk veya parlaklak gecisleri için CSS animasyonlarini ve JavaScript odaklı görsel değişiklikleri kontrol edin.'),
        numbered('Kırmızı içeren gecislere özellikle dikkat edin — bunlar nobetleri tetiklemek için daha düşük bir esige sahiptir.'),
        bullet('Yanıp sönen alanın boyut eşiğini asip asmadigini değerlendirmek için tam ekran ve tipik gorunluleme boyutlarında test edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Güvenli esikler içinde kalmak için yanıp sönen içeriği ortadan kaldırın veya azaltin.'),

        heading('Hizli görsel gecislerden kaçının', 'h3'),
        code(
          '/* Yanlış: hızlı yanıp sönen animasyon */\n@keyframes tehlikeli-yanıp-sönme {\n  0%, 100% { background: #ff0000; }\n  50% { background: #000000; }\n}\n.uyarı {\n  animation: tehlikeli-yanıp-sönme 0.2s infinite; /* 5 yanıp sönme/sn! */\n}\n\n/* Doğru: nazik titresme animasyonu */\n@keyframes nazik-titresme {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.7; }\n}\n.uyarı {\n  animation: nazik-titresme 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('Animasyonlari devre dışı bırakma yolu sağlayın', 'h3'),
        code(
          '/* prefers-reduced-motion tercihine saygı gösterin */\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}',
          'css'
        ),

        heading('Güvenli video gomme', 'h3'),
        code(
          '<!-- Potansiyel olarak sorunlu içerik hakkında kullanıcıları uyarin -->\n<div class="video-kapsayıcı">\n  <div class="yanıp-sönme-uyarisi" role="alert">\n    <p>\n      <strong>Uyari:</strong> Bu video, fotosensitif\n      epilepsi olan kişiler için uygun olmayabilecek\n      yanıp sönen isiklar içerir.\n    </p>\n    <button onclick="videoyuOynat()">Anliyorum, videoyu oynat</button>\n  </div>\n  <video id="video" controls preload="metadata"\n    poster="afiş.jpg">\n    <source src="video.mp4" type="video/mp4">\n  </video>\n</div>\n\n<script>\nfunction videoyuOynat() {\n  document.querySelector(\'.yanıp-sönme-uyarisi\').hidden = true;\n  document.getElementById(\'video\').play();\n}\n</script>',
          'html'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('Saniyede üçten fazla yanıp sonmeyi aşan hızlı kare değişiklikleri olan animasyonlu GIF\'ler.'),
        bullet('Yüksek kontrastlı renkler arasında (özellikle kırmızı içeren) hızla geçiş yapan CSS animasyonlari.'),
        bullet('PEAT ile analiz edilmemis stroboskop efektleri, yildirim veya hızlı sahne değişiklikleri olan video içeriği.'),
        bullet('Patlama efektleri, vurusda ekran yanıp sonmeleri veya hızlı görsel geri bildirim içeren oyun benzeri arayüzler.'),
        bullet('Yanıp sönme hakkında uyarı olmadan ve oynatilmadan önce durdurma yolu olmadan otomatik oynayan video içeriği.'),
        bullet('Kullanıcının hareket ve yanıp sonmeye duyarliligi sinyalleyen prefers-reduced-motion medya sorgusunu görmezden gelmek.'),
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
        metaTitle: 'WCAG 2.3.1 Üç Yanıp Sönme veya Eşik Altında — Nobet Guvenligi Rehberi',
        metaDescription:
          'WCAG 2.3.1 Üç Yanıp Sönme veya Eşik Altında kriterini nasıl karşılayacağınızı öğrenin. Web içeriğinin fotosensitif kullanicilarda nobetleri tetikleyebilecek yanıp sönme icermediginden emin olun.',
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
      tr: 'Üç Yanıp Sönme',
    },

    description: {
      en: 'Web pages do not contain anything that flashes more than three times in any one-second period.',
      tr: 'Web sayfaları herhangi bir bir saniyelik dönemde üçten fazla kez yanıp sönen hiçbir şey içermez.',
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
          'WCAG 2.3.2, 2.3.1\'in AAA seviyesindeki versiyonudur. 2.3.1, genel yanıp sönme ve kırmızı yanıp sönme eşiklerinin altında kalan yanıp sonmeye izin verirken (alan boyutu ve parlaklak değişikliğine dayanarak), 2.3.2 eşik istisnasini tamamen kaldırır. Bu kriter kapsamında, boyut, renk veya parlaklktan bağımsız olarak kesinlikle hiçbir içerik saniyede üçten fazla kez yanıp sonemez.'
        ),
        p(
          'Bu daha sıkı ve daha basit bir kuraldir: saniyede üçten fazla yanıp sonuyorsa başarısız olur — nokta. Piksel alanı hesaplamalari, izleme mesafesi değerlendirmesi ve kırmızı için özel muamele yoktur. Bu, hem anlasilmasini kolaylastirir hem de karsilanmasini zorlaştırır, çünkü küçük veya ince yanıp sönen öğeler bile uyum sağlamalıdır.'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          '2.3.1\'deki eşik istisnalari nobet tetikleyicilerinin istatistiksel modellerine dayanır, ancak bireysel duyarlilik değişir. Fotosensitif epilepsisi olan bazı kişiler, 2.3.1 tarafından tanımlanan "güvenli" esikler içinde kalan uyaranlar tarafından tetiklenen nobetler yasayabilir. Saniyede ucun üzerindeki tüm yanıp sonmeleri ortadan kaldirarak 2.3.2 maksimum koruma sağlar.'
        ),
        p(
          'Bu AAA kriteri özellikle kitlenin yüksek fotosensitiviteye sahip bireyleri icerdigi bilinen ortamlar için önemlidir — tıbbi tesisler, okullar, devlet hizmetleri. Ayrıca büyük ekranlarda veya karanlık ortamlarda goruntulenme içeriği için de önemlidir, burada yanıp sönen içeriğin göreli boyutu ve etkisi guclenir.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. 2.3.1 gibi, yanıp sönme sikligini tespit etmek özel analiz araçları gerektirir. Fark, eşik hesaplamalarinin gerekli olmamasıdır — saniyede üçten fazla yanıp sönen herhangi bir içerik başarısız olur.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, 2.3.1 ile aynı yakasimi izler ancak daha sıkı bir standartla.'),
        numbered('Sayfada görsel değişiklikler içeren tüm içerikleri belirleyin: videolar, animasyonlar, GIF\'ler, CSS animasyonlari, JavaScript odaklı efektler.'),
        numbered('Her görsel öğe için yanıp sönme sikligini belirleyin. Saniyede parlaklak değişikliklerini (karanlktan aydinliga veya aydinliktan karanlkga geçişler) sayın.'),
        numbered('Saniyede üçten fazla yanıp sönen herhangi bir öğe — boyut veya renkten bağımsız olarak — bu kriteri başarısız kılar.'),
        numbered('Video içeriğini kare kare analiz etmek için PEAT veya benzer araçlar kullanın.'),
        numbered('prefers-reduced-motion etkinleştirilmiş şekilde test edin ve tüm animasyonlarin azaltildigini veya ortadan kaldirildigini doğrulayın.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('Tüm görsel gecisleri saniyede üç veya daha azina sınırlayın. Bu en güvenli ve en basit yaklasimdir.'),

        heading('Animasyonlari hız sinirlamasi', 'h3'),
        code(
          '/* Animasyon dongusunun en az 333ms olmasını sağlayın (maksimum 3/saniye) */\n@keyframes güvenli-yanıp-sönme {\n  0%, 49% { opacity: 1; }\n  50%, 100% { opacity: 0; }\n}\n.bildirim-noktası {\n  /* 1 saniye döngü = 1 yanıp sönme/sn — güvenli aralikta */\n  animation: güvenli-yanıp-sönme 1s step-end infinite;\n}\n\n/* Daha da güvenli: yanıp sonmeden kaçının, solma kullanın */\n@keyframes güvenli-solma {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n.bildirim-noktası-güvenli {\n  animation: güvenli-solma 2s ease-in-out infinite;\n}',
          'css'
        ),

        heading('JavaScript yanıp sönme hız sinirlaycisi', 'h3'),
        code(
          '// Görsel durum değisikliklerinin saniyede 3 defadan\n// fazla olmamasını sağlayın\nclass YanipSonmeKorumasi {\n  constructor(sanivedeMaksYanipSonme = 3) {\n    this.minimumAralik = 1000 / sanivedeMaksYanipSonme;\n    this.sonYanipSonme = 0;\n  }\n\n  yanipSonebilirMi() {\n    const simdi = Date.now();\n    if (simdi - this.sonYanipSonme >= this.minimumAralik) {\n      this.sonYanipSonme = simdi;\n      return true;\n    }\n    return false;\n  }\n}\n\nconst koruma = new YanipSonmeKorumasi(3);\n\nfunction guvenliGorselGeriBildirim(öğe) {\n  if (koruma.yanipSonebilirMi()) {\n    öğe.classList.add(\'vurgula\');\n    setTimeout(() => öğe.classList.remove(\'vurgula\'),\n      200);\n  }\n}',
          'javascript'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('2.3.1 eşik hesaplamarina guvenip küçük yanıp sönen öğelerin otomatik olarak güvenli olduğunu varsaymak.'),
        bullet('Yanıp sönme efektleri oluşturan hızlı kare guncellemelerine sahip animasyonlu SVG\'ler veya Canvas öğeleri.'),
        bullet('Kısa süreli tam ekran yanıp sonmeleri içeren sayfalar veya bölümler arasındaki geçiş efektleri.'),
        bullet('Kontrolsuz yanıp sönme hizlarina sahip banner reklamlar veya gömülü üçüncü parti içerik.'),
        bullet('Hizla yanıp sönen yükleme donduruculer veya ilerleme göstergeleri.'),
        bullet('Metin editorlerinde veya giriş alanlarında saniyede ucu aşan imlec yanıp sönme hizlari.'),
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
        metaTitle: 'WCAG 2.3.2 Üç Yanıp Sönme — AAA Nobet Önleme Rehberi',
        metaDescription:
          'WCAG 2.3.2 Üç Yanıp Sönme hakkında bilgi edinin. Bu AAA kriteri, eşik istisnalari olmaksızın tüm içeriğin saniyede üçten fazla yanıp sonmesini yasaklar.',
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
      tr: 'Etkileşimlerden Animasyon',
    },

    description: {
      en: 'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.',
      tr: 'Etkileşim tarafından tetiklenen hareket animasyonu, animasyon işlevsellik veya iletilen bilgi için temel olmadığı sürece devre dışı bırakılabilmelidir.',
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
          'WCAG 2.3.3, kullanıcı etkileşimi tarafından tetiklenen hareket animasyonlarinin devre dışı birakitabilmesini gerektirir. Bu, kullanıcı kayirdiginda, tikladiginda, yazdiginda, üzerine geldiğinde veya sayfayla başka şekilde etkilesimde bulunduğunda meydana gelen animasyonlar için geçerlidir — paralaks kayma efektleri, yakınlaştırma animasyonlari, sayfa geçiş animasyonlari, kaydırmayla tetiklenen ortaya cikma efektleri ve hareket içeren fareyle üzerine gelme durum animasyonlari gibi.'
        ),
        p(
          'Kriter özellikle hareket animasyonuna odaklanır — bir konumdan diğerine hareket veya boyut değişiklikleri içeren görsel değişiklikler. Basit renk değişiklikleri, opaklad gecisleri veya vurgulama bu gereksinimi tetiklemez. Animasyonun bilgi iletmek veya işlevselliğin kendisi için temel olduğu durumlarda istisna vardır (tamamlanmayi göstermek için hareket eden bir ilerleme çubuğu gibi).'
        ),

        heading('Neden önemlidir', 'h2'),
        p(
          'Vestibular bozukluğu olan kullanıcılar (iyi huylu paroksismal pozisyonel vertigo, labirentit ve Meniere hastaligi dahil) hareket animasyonlarindan ciddi fiziksel belirtiler yasayabilir — bas donmesi, mide bulantisi, bas agrisi ve yönelim bozukluğu. Bu belirtiler animasyon bittikten çok sonra devam edebilir ve kullanıcının cihazıni saatlerce kullanmasını engelleyebilir.'
        ),
        p(
          'Ic kulaktaki vestibular sistem, beynin hareketi ve mekansal yönelimi anlamasına yardımcı olur. Ekrandaki görsel hareket vucdun gerçek konumuyla celisdiginde (paralaks kaydırma veya dalan sayfa gecislerinde olduğu gibi), bu belirtileri tetikleyen bir duyusal catisma yaratır. Hareket animasyonlarini devre dışı bırakma yolu sağlamak, bu kullanıcıların güvenli bir şekilde web\'de gezmesi için zorunludur.'
        ),

        heading('İlgili axe-core kuralları', 'h2'),
        p(
          'Bu kriter için otomatik axe-core kuralı bulunmamaktadır. Hareket animasyonlari uygulamada son derece cesitlidir (CSS animasyonlari, JavaScript odaklı donusumler, kaydırmaya bağlı efektler, Web Animations API) ve kullanıcı etkilesimiyle iliskileri statik analiz ile belirlenemez.'
        ),

        heading('Nasıl test edilir', 'h2'),
        p('Test, sayfa ile etkileşim kurmak ve farklı ayarlar altında animasyon davranisini gozlemlemeyi gerektirir.'),
        numbered('Sayfadaki tüm ogelerle etkileşim kurun: kayirin, dugmelere tıklayın, öğelerin üzerine gelin, sayfalar arasında gezinin.'),
        numbered('Etkilesime yanıt olarak meydana gelen tüm hareket animasyonlarini not edin: kayma, yakınlaştırma, paralaks, sayfa gecisleri, kaydırmayla tetiklenen hareketler.'),
        numbered('Isletim sistemi ayarlarinda prefers-reduced-motion\'i etkinleştirin ve tüm etkileşimleri tekrarlayin.'),
        numbered('prefers-reduced-motion etkinleştirildiğinde hareket animasyonlarinin ortadan kaldirildigini veya önemli ölçüde azaltildigini doğrulayın.'),
        numbered('Uygulamanin isletim sistemi ayarindan bağımsız kendi animasyon değiştirici saglaypip sağlamadığını kontrol edin.'),
        bullet('iOS erişilebilirlik ayarlarinda "Hareketi Azalt" veya Android geliştirici seceneklerinde "Animasyonlari kaldir" etkinlestirerek mobil cihazlarda test edin.'),

        heading('Nasıl düzeltilir', 'h2'),
        p('prefers-reduced-motion medya sorgusuna saygı gösterin ve hareket animasyonlari için uygulama düzeyinde bir değiştirici sağlayın.'),

        heading('prefers-reduced-motion tercihine saygı gösterin', 'h3'),
        code(
          '/* Varsayılan: purezsiz animasyonlar */\n.kart {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.kart:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n\n.sayfa-giriş {\n  animation: kaydır-iceri 0.5s ease-out;\n}\n\n@keyframes kaydır-iceri {\n  from { transform: translateX(100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}\n\n/* Azaltilmis hareket: hareketi kaldir, geri bildirimi koru */\n@media (prefers-reduced-motion: reduce) {\n  .kart {\n    transition: box-shadow 0.15s ease;\n  }\n  .kart:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  }\n\n  .sayfa-giriş {\n    animation: solarak-gorun 0.15s ease-out;\n  }\n\n  @keyframes solarak-gorun {\n    from { opacity: 0; }\n    to { opacity: 1; }\n  }\n}',
          'css'
        ),

        heading('Uygulama düzeyinde animasyon değistirici', 'h3'),
        code(
          '<div class="ayarlar-paneli">\n  <label class="değistirici">\n    <input type="checkbox" id="hareketi-azalt"\n      onchange="hareketTercihiniAyarla(this.checked)">\n    <span>Hareket animasyonlarini azalt</span>\n  </label>\n</div>\n\n<script>\nfunction hareketTercihiniAyarla(azalt) {\n  document.documentElement.classList.toggle(\n    \'hareketi-azalt\', azalt\n  );\n  localStorage.setItem(\'hareketi-azalt\',\n    azalt ? \'true\' : \'false\');\n}\n\n// Yuklemede tercihi geri yükle\nwindow.addEventListener(\'DOMContentLoaded\', () => {\n  const tercih = localStorage.getItem(\'hareketi-azalt\');\n  const isTercihEder = window.matchMedia(\n    \'(prefers-reduced-motion: reduce)\'\n  ).matches;\n\n  if (tercih === \'true\' || (tercih === null && isTercihEder)) {\n    document.documentElement.classList.add(\'hareketi-azalt\');\n    document.getElementById(\'hareketi-azalt\').checked = true;\n  }\n});\n</script>',
          'html'
        ),

        heading('Paralaks kaydırmayı devre dışı bırakma', 'h3'),
        code(
          '/* Paralaks efekti */\n.paralaks-arkplan {\n  background-attachment: fixed;\n  background-position: center;\n  background-size: cover;\n  transform: translateZ(-1px) scale(2);\n}\n\n/* Azaltilmis hareket için paralaksi kaldir */\n@media (prefers-reduced-motion: reduce) {\n  .paralaks-arkplan {\n    background-attachment: scroll;\n    transform: none;\n  }\n}\n\n/* Uygulama düzeyinde değiştirici için de kaldir */\n.hareketi-azalt .paralaks-arkplan {\n  background-attachment: scroll;\n  transform: none;\n}',
          'css'
        ),

        heading('Sık yapılan hatalar', 'h2'),
        bullet('prefers-reduced-motion medya sorgusunu tamamen görmezden gelmek — bu, harekete duyarlı kullanıcılar için birincil mekanizmadir.'),
        bullet('Hareketi kaldırmak yerine yalnızca animasyon süresini azaltmak (hızlı bir kayyis yine de bir kayyistir).'),
        bullet('Devre dışı bırakma yolu olmayan paralaks kaydırma efektleri.'),
        bullet('Kapatilamayan kaydırmayla tetiklenen animasyonlar (yandan ucarak gelen öğeler).'),
        bullet('Animasyonsuz bir yedek sağlamadan kayma, yakınlaştırma veya döndürme içeren sayfa geçiş animasyonlari.'),
        bullet('Hareketizsiz bir alternatif sağlamadan öğeleri hareket ettiren (translateY, scale) fareyle üzerine gelme animasyonlari.'),
        bullet('Geliştirme ve kalite guvencesi sırasında prefers-reduced-motion etkinleştirilmiş şekilde test etmemek.'),
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
        metaTitle: 'WCAG 2.3.3 Etkileşimlerden Animasyon — Harekete Duyarlilik Rehberi',
        metaDescription:
          'WCAG 2.3.3 Etkileşimlerden Animasyon hakkında bilgi edinin. Vestibular bozukluğu olan kullanıcıları korumak için etkileşim tarafından tetiklenen hareket animasyonlarini devre dışı birakabilmeyi sağlayın.',
      },
    },
  },
]

export default rules
