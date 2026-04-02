import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ─── 1.4.1 Use of Color ───
  {
    criterionNumber: '1.4.1',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['link-in-text-block'],
    tags: ['color', 'visual', 'links'],
    title: {
      en: 'Use of Color',
      tr: 'Renk Kullanımı',
    },
    description: {
      en: 'Color is not the sole means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
      tr: 'Renk; bilgi iletmek, bir eylem belirtmek, yanıt istemek veya görsel bir öğeyi ayırt etmek için tek başına kullanılmamalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.1 requires that color alone is never the only visual method used to communicate information. When color is the sole differentiator, users who are color-blind, have low vision, or use monochrome displays lose access to the meaning being conveyed. Every piece of color-coded information must also be available through another channel such as text labels, patterns, shapes, or additional visual indicators.'),
        p('This criterion applies everywhere color carries meaning: form validation indicators, required-field markers, charts and graphs, link styling within body text, status badges, and interactive states like selected tabs. The key test is straightforward — if you removed all color from the page, could every user still understand the content and operate the interface?'),

        heading('Why It Matters'),
        p('Approximately 8% of men and 0.5% of women worldwide have some form of color vision deficiency. Red-green color blindness is by far the most common, which makes traditional red/green success and error patterns unreliable for millions of users. Beyond clinical conditions, situational factors such as bright sunlight on a phone screen, night-mode filters, or cheap monitors with poor color reproduction can all strip away color differences.'),
        p('Relying on color alone also creates barriers for assistive technology users. Screen readers cannot perceive color at all, so any meaning expressed only through color is invisible to non-sighted users. Providing redundant cues ensures that information is robust across devices, abilities, and environments.'),

        heading('Related axe-core Rules'),
        bullet('link-in-text-block — Ensures links within blocks of text are distinguished from surrounding text by more than just color. The link must have a 3:1 contrast ratio against surrounding text or include a non-color visual indicator such as an underline.'),

        heading('How to Test'),
        numbered('Use the browser\'s DevTools to apply a grayscale filter on the page: filter: grayscale(100%). Navigate the entire page and verify that all information is still understandable.'),
        numbered('Check all form fields with validation errors. Are errors indicated by an icon, text, or border in addition to a color change?'),
        numbered('Inspect charts and data visualizations. Does each data series have a unique pattern, label, or shape beyond its color?'),
        numbered('Review links within body text. Are they underlined or otherwise distinguishable apart from color?'),
        numbered('Run axe DevTools and look for the link-in-text-block rule violation.'),

        heading('How to Fix'),
        p('For links within text blocks, always provide a non-color indicator. The simplest fix is to keep the default underline:'),
        code('/* Accessible link styling */\na {\n  color: #0066cc;\n  text-decoration: underline;\n}\n\n/* If you remove the underline, add it back on focus/hover\n   and ensure 3:1 contrast ratio against surrounding text */\na {\n  color: #0066cc;\n  text-decoration: none;\n  border-bottom: 2px solid currentColor;\n}', 'css'),
        p('For form validation, combine color with an icon and descriptive text:'),
        code('<div class="field-group field-group--error">\n  <label for="email">Email</label>\n  <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />\n  <p id="email-error" class="error-message">\n    <svg aria-hidden="true" class="icon-error"><!-- X icon --></svg>\n    Please enter a valid email address.\n  </p>\n</div>', 'html'),
        p('For charts and graphs, use patterns or direct labels alongside color fills:'),
        code('<svg role="img" aria-label="Sales by quarter">\n  <rect fill="#0066cc" style="fill-opacity:1" />\n  <pattern id="stripe" patternUnits="userSpaceOnUse" width="8" height="8">\n    <line x1="0" y1="0" x2="8" y2="8" stroke="#fff" stroke-width="2" />\n  </pattern>\n  <rect fill="url(#stripe)" />\n</svg>', 'html'),

        heading('Common Mistakes'),
        bullet('Using only a red border or red text to indicate form errors with no icon or descriptive message.'),
        bullet('Color-coded status indicators such as green for "active" and red for "inactive" without any accompanying text label.'),
        bullet('Removing underlines from links in body text without providing an alternative non-color cue.'),
        bullet('Charts and pie graphs that rely solely on a color legend for identification.'),
        bullet('Toggle switches or tabs that show the selected state through color alone.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.1, bilgi iletmek için tek yöntem olarak rengin kullanılmasını yasaklar. Renk tek ayırt edici unsur olduğunda; renk körlüğü olan, az gören ya da tek renkli ekran kullanan kişiler aktarılan bilgiye erişemez. Renk ile kodlanan her bilgi, metin etiketleri, desenler, şekiller veya ek görsel göstergeler gibi başka bir kanal aracılığıyla da sunulmalıdır.'),
        p('Bu ölçüt, rengin anlam taşıdığı her yerde geçerlidir: form doğrulama göstergeleri, zorunlu alan işaretleri, grafik ve tablolar, metin içindeki bağlantı stilleri, durum rozetleri ve seçili sekmeler gibi etkileşimli durumlar. Temel test basittir — sayfadaki tüm renkleri kaldırdığınızda, tüm kullanıcılar içeriği hâlâ anlayabilir ve arayüzü kullanabilir mi?'),

        heading('Neden Önemlidir'),
        p('Dünya genelinde erkeklerin yaklaşık %8\'i, kadınların ise %0,5\'i bir tür renk görme bozukluğuna sahiptir. Kırmızı-yeşil renk körlüğü açık ara en yaygın olanıdır ve bu durum geleneksel kırmızı/yeşil hata-başarı kalıplarını milyonlarca kullanıcı için güvenilmez kılar. Klinik durumların ötesinde, güneşli havada telefon ekranı, gece modu filtreleri veya düşük kaliteli monitörler gibi ortam faktörleri de renk farklarını yok edebilir.'),
        p('Yalnızca renge güvenmek, yardımcı teknoloji kullanıcıları için de engel oluşturur. Ekran okuyucular rengi algılayamaz; bu nedenle yalnızca renkle aktarılan bilgi görmeyen kullanıcılar için görünmezdir. Ek ipuçları sağlamak, bilginin farklı cihazlarda, becerilerde ve ortamlarda erişilebilir olmasını garanti eder.'),

        heading('İlgili axe-core Kuralları'),
        bullet('link-in-text-block — Metin blokları içindeki bağlantıların çevresindeki metinden yalnızca renkle değil, başka yollarla da ayırt edilebilmesini sağlar. Bağlantı, çevresindeki metne karşı 3:1 kontrast oranına veya alt çizgi gibi renk dışı bir görsel göstergeye sahip olmalıdır.'),

        heading('Nasıl Test Edilir'),
        numbered('Tarayıcı DevTools\'unda sayfaya gri tonlama filtresi uygulayın: filter: grayscale(100%). Tüm sayfada gezinin ve bilgilerin anlaşılabilir olduğunu doğrulayın.'),
        numbered('Doğrulama hatası olan tüm form alanlarını kontrol edin. Hatalar renk değişikliğine ek olarak simge, metin veya kenarlıkla belirtiliyor mu?'),
        numbered('Grafikleri ve veri görselleştirmelerini inceleyin. Her veri serisi, renginin yanı sıra benzersiz bir desene, etikete veya şekle sahip mi?'),
        numbered('Metin içindeki bağlantıları gözden geçirin. Alt çizgi veya renkten başka bir ayırt edici öğe var mı?'),
        numbered('axe DevTools çalıştırın ve link-in-text-block kural ihlallerini kontrol edin.'),

        heading('Nasıl Düzeltilir'),
        p('Metin blokları içindeki bağlantılar için her zaman renk dışı bir gösterge sağlayın. En basit çözüm varsayılan alt çizgiyi korumaktır:'),
        code('/* Erişilebilir bağlantı stili */\na {\n  color: #0066cc;\n  text-decoration: underline;\n}\n\n/* Alt çizgiyi kaldırırsanız, odak/üzerine gelindiğinde\n   geri ekleyin ve çevreleyen metne karşı 3:1 kontrast oranı sağlayın */\na {\n  color: #0066cc;\n  text-decoration: none;\n  border-bottom: 2px solid currentColor;\n}', 'css'),
        p('Form doğrulamasında rengi simge ve açıklayıcı metinle birleştirin:'),
        code('<div class="field-group field-group--error">\n  <label for="email">E-posta</label>\n  <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />\n  <p id="email-error" class="error-message">\n    <svg aria-hidden="true" class="icon-error"><!-- X simgesi --></svg>\n    Lütfen geçerli bir e-posta adresi girin.\n  </p>\n</div>', 'html'),
        p('Grafikler için renk dolgularının yanına desen veya doğrudan etiket ekleyin:'),
        code('<svg role="img" aria-label="Çeyreklere göre satışlar">\n  <rect fill="#0066cc" style="fill-opacity:1" />\n  <pattern id="stripe" patternUnits="userSpaceOnUse" width="8" height="8">\n    <line x1="0" y1="0" x2="8" y2="8" stroke="#fff" stroke-width="2" />\n  </pattern>\n  <rect fill="url(#stripe)" />\n</svg>', 'html'),

        heading('Sık Yapılan Hatalar'),
        bullet('Form hatalarını belirtmek için simge veya açıklayıcı mesaj olmaksızın yalnızca kırmızı kenarlık veya kırmızı metin kullanmak.'),
        bullet('Eşlik eden bir metin etiketi olmadan "aktif" için yeşil, "pasif" için kırmızı gibi yalnızca renk kodlu durum göstergeleri kullanmak.'),
        bullet('Alternatif bir renk dışı ipucu sağlamadan metin içindeki bağlantılardan alt çizgiyi kaldırmak.'),
        bullet('Tanımlama için yalnızca renk açıklamasına dayanan grafik ve pasta dilimlemeleri.'),
        bullet('Seçili durumu yalnızca renkle gösteren aç/kapa düğmeleri veya sekmeler.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.1: Use of Color', url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html', source: 'W3C', language: 'en', _key: 'r141w3c1' },
      { title: 'WebAIM: Visual Disabilities - Color-blindness', url: 'https://webaim.org/articles/visual/colorblind', source: 'WebAIM', language: 'en', _key: 'r141waim' },
      { title: 'Deque: axe-core link-in-text-block', url: 'https://dequeuniversity.com/rules/axe/4.8/link-in-text-block', source: 'Deque', language: 'en', _key: 'r141dequ' },
      { title: 'MDN: color-scheme and accessibility', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme', source: 'MDN', language: 'en', _key: 'r141mdn1' },
      { title: 'Techniques for WCAG 2 - F73: Using color alone for links', url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F73', source: 'W3C', language: 'en', _key: 'r141w3c2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.1 Use of Color – Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 1.4.1 Use of Color. Ensure color is never the only way to convey information, with practical code examples and testing techniques.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.1 Renk Kullanımı – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.1 Renk Kullanımı ölçütünü nasıl karşılayacağınızı öğrenin. Rengin tek bilgi aktarma yolu olmamasını sağlayın.',
      },
    },
  },

  // ─── 1.4.2 Audio Control ───
  {
    criterionNumber: '1.4.2',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['no-autoplay-audio'],
    tags: ['audio', 'media', 'autoplay'],
    title: {
      en: 'Audio Control',
      tr: 'Ses Kontrolü',
    },
    description: {
      en: 'If audio plays automatically for more than 3 seconds, a mechanism is available to pause, stop, or control the volume independently from the system volume.',
      tr: 'Ses 3 saniyeden uzun süre otomatik çalıyorsa, sesi duraklatmak, durdurmak veya sistem sesinden bağımsız olarak kontrol etmek için bir mekanizma sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.2 addresses auto-playing audio content. When a web page loads and immediately starts playing sound for more than three seconds, it can severely interfere with screen reader users who rely on audio output to navigate. The criterion requires that either the audio stops within three seconds, or the user is provided with a clearly accessible mechanism at the top of the page to pause, stop, or control the volume independently of the system volume level.'),
        p('This applies to any audio that starts without user interaction — background music, video autoplay with sound, audio advertisements, or ambient sounds. Even if the content creator considers the audio desirable, it must be controllable by the user.'),

        heading('Why It Matters'),
        p('Screen reader users depend on synthesized speech to interact with web content. When a page autoplays audio, it directly competes with the screen reader output, making it extremely difficult or impossible for the user to hear navigation instructions, read content, or operate controls. The user may not even be able to find the pause button if the audio is drowning out their screen reader.'),
        p('Beyond screen reader users, auto-playing audio is disruptive for people in shared spaces, those with cognitive disabilities who can be overwhelmed by unexpected sounds, and individuals with auditory processing disorders who struggle when multiple audio streams play simultaneously.'),

        heading('Related axe-core Rules'),
        bullet('no-autoplay-audio — Detects <audio> and <video> elements with autoplay attributes that play for longer than 3 seconds without controls or mute mechanisms.'),

        heading('How to Test'),
        numbered('Load the page and listen: Does any audio start playing automatically?'),
        numbered('If audio plays, check whether it stops within 3 seconds.'),
        numbered('If it continues, verify there is a visible pause/stop/mute control near the top of the page.'),
        numbered('Confirm the audio control is keyboard-accessible and reachable before the auto-playing content in tab order.'),
        numbered('Test with a screen reader to ensure the control can be found and activated while audio is playing.'),

        heading('How to Fix'),
        p('The best approach is to never autoplay audio. Require user interaction to start media:'),
        code('<video controls>\n  <source src="promo.mp4" type="video/mp4" />\n  <track kind="captions" src="captions.vtt" srclang="en" label="English" />\n</video>\n\n<!-- Do NOT use autoplay with sound -->\n<!-- Bad: <video autoplay> -->', 'html'),
        p('If autoplay is a hard business requirement, ensure the audio is muted by default and the user can enable sound:'),
        code('<video autoplay muted controls>\n  <source src="hero-background.mp4" type="video/mp4" />\n</video>\n\n<button id="unmute-btn" aria-label="Unmute video">\n  Enable Sound\n</button>', 'html'),
        p('For background audio that must play, provide an immediately accessible stop control:'),
        code('<!-- Place this as the first interactive element on the page -->\n<button id="audio-stop" class="audio-control">\n  Stop Background Audio\n</button>\n\n<script>\n  const audio = document.getElementById(\'bg-audio\');\n  document.getElementById(\'audio-stop\').addEventListener(\'click\', () => {\n    audio.pause();\n    audio.currentTime = 0;\n  });\n</script>', 'html'),

        heading('Common Mistakes'),
        bullet('Background music or ambient sounds that autoplay on page load without a mute button.'),
        bullet('Video hero banners that autoplay with sound enabled.'),
        bullet('Audio controls exist but are placed far down the page, making them unreachable for screen reader users before the audio starts interfering.'),
        bullet('Volume controls that only adjust relative to system volume rather than independently muting the page audio.'),
        bullet('Third-party ad embeds that autoplay audio without providing a control mechanism.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.2, otomatik oynatılan ses içeriğini ele alır. Bir web sayfası yüklendiğinde 3 saniyeden uzun süre ses çalmaya başlarsa, bu durum gezinmek için ses çıktısına bağımlı olan ekran okuyucu kullanıcılarını ciddi biçimde engelleyebilir. Ölçüt, sesin 3 saniye içinde durmasını veya kullanıcıya sayfanın üst kısmında sesi duraklatmak, durdurmak ya da sistem ses düzeyinden bağımsız olarak kontrol etmek için erişilebilir bir mekanizma sağlanmasını gerektirir.'),
        p('Bu kural, kullanıcı etkileşimi olmadan başlayan her ses için geçerlidir: arka plan müziği, sesli otomatik video oynatma, sesli reklamlar veya ortam sesleri. İçerik oluşturucu sesi istenen bir öğe olarak görse bile, kullanıcı tarafından kontrol edilebilir olmalıdır.'),

        heading('Neden Önemlidir'),
        p('Ekran okuyucu kullanıcıları web içeriğiyle etkileşim kurmak için sentezlenmiş konuşmaya bağımlıdır. Bir sayfa otomatik ses oynatırsa, bu doğrudan ekran okuyucu çıktısıyla çakışır ve kullanıcının gezinme talimatlarını duymasını, içeriği okumasını veya denetimleri kullanmasını son derece zorlaştırır ya da imkansız hâle getirir.'),
        p('Ekran okuyucu kullanıcılarının ötesinde, otomatik ses; ortak alanlardaki kişiler, beklenmedik seslerle bunalabilen bilişsel engelli bireyler ve aynı anda birden fazla ses akışıyla zorlanan işitsel işleme bozukluğu olan kişiler için de sorunludur.'),

        heading('İlgili axe-core Kuralları'),
        bullet('no-autoplay-audio — 3 saniyeden uzun süre çalan ve kontrol veya sessize alma mekanizması bulunmayan autoplay özellikli <audio> ve <video> öğelerini tespit eder.'),

        heading('Nasıl Test Edilir'),
        numbered('Sayfayı yükleyin ve dinleyin: Otomatik olarak çalan bir ses var mı?'),
        numbered('Ses çalıyorsa, 3 saniye içinde durup durmadığını kontrol edin.'),
        numbered('Devam ediyorsa, sayfanın üst kısmında görünür bir duraklat/durdur/sessize al kontrolü olduğunu doğrulayın.'),
        numbered('Ses kontrolünün klavye ile erişilebilir olduğunu ve sekme sırasında otomatik çalan içerikten önce ulaşılabildiğini onaylayın.'),
        numbered('Ses çalarken kontrolün bulunup etkinleştirilebildiğinden emin olmak için ekran okuyucu ile test edin.'),

        heading('Nasıl Düzeltilir'),
        p('En iyi yaklaşım sesi hiçbir zaman otomatik oynatmamaktır. Medyayı başlatmak için kullanıcı etkileşimi gerektirin:'),
        code('<video controls>\n  <source src="tanıtım.mp4" type="video/mp4" />\n  <track kind="captions" src="altyazi.vtt" srclang="tr" label="Türkçe" />\n</video>\n\n<!-- autoplay ile ses kullanmayın -->\n<!-- Kötü: <video autoplay> -->', 'html'),
        p('Otomatik oynatma zorunluysa sesin varsayılan olarak kapalı olmasını sağlayın:'),
        code('<video autoplay muted controls>\n  <source src="arka-plan.mp4" type="video/mp4" />\n</video>\n\n<button id="unmute-btn" aria-label="Videoyu sesli yap">\n  Sesi Aç\n</button>', 'html'),
        p('Arka plan sesi çalması gerekiyorsa, hemen erişilebilir bir durdurma kontrolü sağlayın:'),
        code('<!-- Bunu sayfadaki ilk etkileşimli öğe olarak yerleştirin -->\n<button id="audio-stop" class="audio-control">\n  Arka Plan Sesini Durdur\n</button>\n\n<script>\n  const audio = document.getElementById(\'bg-audio\');\n  document.getElementById(\'audio-stop\').addEventListener(\'click\', () => {\n    audio.pause();\n    audio.currentTime = 0;\n  });\n</script>', 'html'),

        heading('Sık Yapılan Hatalar'),
        bullet('Sessize alma düğmesi olmadan sayfa yüklendiğinde otomatik çalan arka plan müziği veya ortam sesleri.'),
        bullet('Ses açık şekilde otomatik oynatılan video hero alanları.'),
        bullet('Ses kontrolleri mevcut ancak sayfanın çok aşağısında, ekran okuyucu kullanıcılarının ses araya girmeden önce ulaşamayacağı bir yerde.'),
        bullet('Sayfa sesini bağımsız olarak kapatmak yerine yalnızca sistem sesine göre ayarlanan ses kontrolleri.'),
        bullet('Kontrol mekanizması sağlamadan otomatik ses oynatan üçüncü taraf reklam yerleştirmeleri.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.2: Audio Control', url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html', source: 'W3C', language: 'en', _key: 'r142w3c1' },
      { title: 'WebAIM: Captions, Transcripts, and Audio Descriptions', url: 'https://webaim.org/techniques/captions/', source: 'WebAIM', language: 'en', _key: 'r142waim' },
      { title: 'Deque: axe-core no-autoplay-audio', url: 'https://dequeuniversity.com/rules/axe/4.8/no-autoplay-audio', source: 'Deque', language: 'en', _key: 'r142dequ' },
      { title: 'MDN: HTMLMediaElement.autoplay', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay', source: 'MDN', language: 'en', _key: 'r142mdn1' },
      { title: 'Techniques for WCAG 2 - G170: Providing a control near the top of the page', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G170', source: 'W3C', language: 'en', _key: 'r142w3c2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.2 Audio Control – Accessibility Guide',
        metaDescription: 'Learn how to meet WCAG 1.4.2 Audio Control. Stop auto-playing audio from interfering with screen readers. Code examples and testing steps included.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.2 Ses Kontrolü – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.2 Ses Kontrolü ölçütünü nasıl karşılayacağınızı öğrenin. Otomatik çalan sesin ekran okuyucularla çakışmasını önleyin.',
      },
    },
  },

  // ─── 1.4.3 Contrast (Minimum) ─── (Comprehensive)
  {
    criterionNumber: '1.4.3',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: ['color-contrast'],
    tags: ['color', 'contrast', 'text', 'visual'],
    title: {
      en: 'Contrast (Minimum)',
      tr: 'Kontrast (Minimum)',
    },
    description: {
      en: 'Text and images of text have a contrast ratio of at least 4.5:1, except for large text which requires 3:1.',
      tr: 'Metin ve metin görselleri en az 4.5:1 kontrast oranına sahip olmalıdır; büyük metin için 3:1 yeterlidir.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.3 establishes minimum contrast requirements between foreground text and its background. Normal-sized text (below 18pt or 14pt bold) must achieve a contrast ratio of at least 4.5:1. Large text (18pt / 24px and above, or 14pt / 18.66px bold and above) requires a minimum of 3:1. These ratios are calculated using relative luminance values defined in the WCAG contrast algorithm.'),
        p('The criterion covers all text content rendered on screen, including text in images, placeholder text in form fields, text over images or gradients, and text generated by CSS. Exceptions exist for incidental text (decorative text, inactive UI components, logos, and brand names) where the text is not expected to be read by the general audience.'),
        p('This is one of the most frequently failed WCAG criteria and one of the most impactful to fix. Contrast is measurable, automatable, and directly affects readability for a large portion of users with low vision, aging eyes, or suboptimal viewing conditions.'),

        heading('Why It Matters'),
        p('Low-contrast text is one of the most common accessibility barriers on the web. According to the WebAIM Million report, low contrast is consistently the number one automatically detected accessibility error, appearing on over 80% of home pages analyzed. This affects not only the estimated 246 million people worldwide with moderate-to-severe visual impairment but also every user who has ever squinted at light gray text on a white background.'),
        p('Contrast is not only a disability concern. Environmental factors like bright sunlight, dimmed screens for battery saving, projectors in meeting rooms, and low-quality displays all reduce the effective contrast a user perceives. A contrast ratio of 4.5:1 provides a reasonable safety margin for all these conditions.'),
        p('For users with low vision who do not use screen readers, text contrast can be the difference between independently reading content and being unable to use a website at all. Unlike some accessibility requirements that benefit a narrow group, good contrast benefits virtually everyone.'),

        heading('Related axe-core Rules'),
        bullet('color-contrast — Checks that the foreground and background color combination of text elements meets the minimum 4.5:1 ratio for normal text and 3:1 for large text. This is one of the most commonly triggered axe rules.'),
        p('The color-contrast rule examines computed styles, accounting for inheritance, opacity, and background colors. It flags elements where contrast falls below the threshold and reports the actual ratio alongside the required ratio.'),

        heading('How to Test'),
        numbered('Run axe DevTools or the Lighthouse accessibility audit — both flag contrast failures with specific ratio values and element locations.'),
        numbered('Use the browser DevTools color picker, which in Chrome and Firefox shows the contrast ratio when you inspect a text element\'s color property.'),
        numbered('Use dedicated contrast checkers like the WebAIM Contrast Checker or the Colour Contrast Analyser (CCA) desktop app for manual verification.'),
        numbered('Test text over images or gradients by checking contrast at the lowest-contrast point of the background.'),
        numbered('Verify placeholder text contrast. Though not technically required by 1.4.3, placeholders used as labels must meet the ratio.'),
        numbered('Check contrast in all states: default, hover, focus, active, disabled. Disabled states are exempt, but other interactive states must meet the ratio.'),
        numbered('Test with Windows High Contrast Mode and macOS Increase Contrast setting to verify text remains readable.'),

        heading('How to Fix'),
        p('Start by establishing a contrast-safe color palette during the design phase. Define primary, secondary, and accent colors that pass 4.5:1 against your background:'),
        code('/* Contrast-safe color system */\n:root {\n  /* Background */\n  --bg-primary: #ffffff;\n  --bg-secondary: #f8f9fa;\n\n  /* Text — all pass 4.5:1 against --bg-primary */\n  --text-primary: #1a1a2e;    /* 16.15:1 */\n  --text-secondary: #4a4a68;  /* 7.24:1  */\n  --text-muted: #646480;      /* 4.98:1  */\n\n  /* Interactive — pass 4.5:1 against white */\n  --link-color: #0055b8;      /* 7.04:1  */\n  --link-hover: #003d82;      /* 10.5:1  */\n\n  /* Status colors — pass 4.5:1 against white */\n  --color-error: #c62828;     /* 6.15:1  */\n  --color-success: #1b5e20;   /* 7.82:1  */\n}', 'css'),
        p('For text over images, use an overlay or text shadow to guarantee minimum contrast:'),
        code('/* Semi-transparent overlay on image backgrounds */\n.hero-overlay {\n  position: relative;\n}\n\n.hero-overlay::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n\n.hero-overlay .text {\n  position: relative;\n  z-index: 1;\n  color: #ffffff;\n}\n\n/* Alternative: text shadow for readability */\n.text-on-image {\n  color: #ffffff;\n  text-shadow:\n    0 1px 3px rgba(0, 0, 0, 0.8),\n    0 0 8px rgba(0, 0, 0, 0.5);\n}', 'css'),
        p('Fix common patterns like light gray placeholder text:'),
        code('/* Default placeholder is often too light (#a9a9a9 = 2.32:1 on white) */\ninput::placeholder {\n  color: #646480; /* 4.98:1 against white */\n}\n\n/* Ensure focus ring color also has sufficient contrast */\ninput:focus {\n  outline: 3px solid #0055b8;\n  outline-offset: 2px;\n}', 'css'),
        p('Handle dynamic themes and dark mode by defining contrast-safe values for each scheme:'),
        code('@media (prefers-color-scheme: dark) {\n  :root {\n    --bg-primary: #121212;\n    --bg-secondary: #1e1e2e;\n    --text-primary: #e0e0e8;    /* 13.2:1 against #121212 */\n    --text-secondary: #a8a8c0;  /* 7.1:1  */\n    --text-muted: #8888a0;      /* 4.63:1 */\n    --link-color: #6eb5ff;      /* 7.52:1 */\n  }\n}', 'css'),
        p('For large text (18pt/24px regular or 14pt/18.66px bold), the threshold drops to 3:1, which allows more design flexibility:'),
        code('.page-title {\n  font-size: 2rem; /* 32px = large text */\n  font-weight: 700;\n  color: #666688; /* 4.18:1 — passes 3:1 for large text */\n}\n\n.body-text {\n  font-size: 1rem; /* 16px = normal text */\n  color: #4a4a68;  /* 7.24:1 — passes 4.5:1 for normal text */\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Light gray text on white backgrounds — the most pervasive contrast failure on the web. Colors like #999 on #fff yield only 2.85:1.'),
        bullet('Brand colors chosen without accessibility review. A brand blue of #4A90D9 on white is only 3.27:1 — fails for normal text.'),
        bullet('White text on hero images without an overlay. Contrast varies across the image, often falling below thresholds in lighter regions.'),
        bullet('Placeholder text styled too lightly. Browser defaults for ::placeholder often fail contrast requirements.'),
        bullet('Forgetting about interactive states: hover and focus text colors that reduce contrast below the minimum.'),
        bullet('Using CSS opacity on text elements, which effectively reduces contrast by blending with the background.'),
        bullet('Assuming that dark mode is automatically accessible — dark-on-dark failures are equally common as light-on-light.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.3, ön plan metni ile arka planı arasındaki minimum kontrast gereksinimlerini belirler. Normal boyutlu metin (18pt veya 14pt kalın yazının altında) en az 4.5:1 kontrast oranına ulaşmalıdır. Büyük metin (18pt / 24px ve üstü veya 14pt / 18.66px kalın ve üstü) minimum 3:1 gerektirir. Bu oranlar, WCAG kontrast algoritmasında tanımlanan bağıl parlaklık değerleri kullanılarak hesaplanır.'),
        p('Ölçüt, ekranda oluşturulan tüm metin içeriğini kapsar: görsellerdeki metin, form alanlarındaki yer tutucu metin, görseller veya gradyanlar üzerindeki metin ve CSS ile oluşturulan metin. Genel kitle tarafından okunması beklenmeyen rastlantısal metin, pasif kullanıcı arayüzü bileşenleri, logolar ve marka isimleri için istisnalar bulunur.'),
        p('Bu, en sık başarısız olunan WCAG ölçütlerinden biridir ve düzeltilmesi en etkili olanlardan biridir. Kontrast ölçülebilir, otomatikleştirilebilir ve düşük görme kapasitesine sahip, yaşlanan gözleri olan veya optimal altı görüntüleme koşullarına sahip geniş bir kullanıcı kitlesini doğrudan etkiler.'),

        heading('Neden Önemlidir'),
        p('Düşük kontrastlı metin, webdeki en yaygın erişilebilirlik engellerinden biridir. WebAIM Milyon raporuna göre düşük kontrast, analiz edilen ana sayfaların %80\'inden fazlasında görülen, tutarlı biçimde birinci sıradaki otomatik tespit edilen erişilebilirlik hatasıdır. Bu durum yalnızca dünya genelinde orta ile ciddi görme bozukluğu olan tahminen 246 milyon kişiyi değil, beyaz arka plan üzerinde açık gri metne gözlerini kısmış her kullanıcıyı da etkiler.'),
        p('Kontrast yalnızca bir engelli meselesi değildir. Parlak güneş, pil tasarrufu için karartılmış ekranlar, toplantı odasındaki projektörler ve düşük kaliteli ekranlar gibi çevresel faktörlerin tümü, kullanıcının algıladığı etkin kontrastı azaltır. 4.5:1 kontrast oranı, tüm bu koşullar için makul bir güvenlik marjı sağlar.'),
        p('Ekran okuyucu kullanmayan düşük görüşlü kullanıcılar için metin kontrastı, içeriği bağımsız olarak okumak ile bir web sitesini hiç kullanamamak arasındaki fark olabilir. Dar bir grubu faydalandıran bazı erişilebilirlik gereksinimlerinin aksine, iyi kontrast neredeyse herkese yarar sağlar.'),

        heading('İlgili axe-core Kuralları'),
        bullet('color-contrast — Metin öğelerinin ön plan ve arka plan renk kombinasyonunun normal metin için minimum 4.5:1, büyük metin için 3:1 oranını karşılayıp karşılamadığını kontrol eder. En sık tetiklenen axe kurallarından biridir.'),
        p('color-contrast kuralı, miras alma, opaklık ve arka plan renklerini hesaba katarak hesaplanmış stilleri inceler. Kontrastın eşiğin altına düştüğü öğeleri işaretler ve gerçek oranı gereken oranla birlikte raporlar.'),

        heading('Nasıl Test Edilir'),
        numbered('axe DevTools veya Lighthouse erişilebilirlik denetimini çalıştırın — her ikisi de kontrast hatalarını belirli oran değerleri ve öğe konumlarıyla işaretler.'),
        numbered('Tarayıcı DevTools renk seçiciyi kullanın; Chrome ve Firefox\'ta bir metin öğesinin color özelliğini incelediğinizde kontrast oranını gösterir.'),
        numbered('Manuel doğrulama için WebAIM Contrast Checker veya Colour Contrast Analyser (CCA) masaüstü uygulaması gibi özel kontrast denetleyicileri kullanın.'),
        numbered('Görseller veya gradyanlar üzerindeki metni, arka planın en düşük kontrastlı noktasında kontrol ederek test edin.'),
        numbered('Yer tutucu metin kontrastını doğrulayın. Teknik olarak 1.4.3 tarafından zorunlu olmasa da, etiket olarak kullanılan yer tutucular oranı karşılamalıdır.'),
        numbered('Tüm durumlarda kontrastı kontrol edin: varsayılan, üzerine gelme, odak, aktif, devre dışı. Devre dışı durumlar muaftır ancak diğer etkileşimli durumlar oranı karşılamalıdır.'),
        numbered('Metnin okunabilir kaldığını doğrulamak için Windows Yüksek Kontrast Modu ve macOS Kontrast Artırma ayarıyla test edin.'),

        heading('Nasıl Düzeltilir'),
        p('Tasarım aşamasında kontrastı güvenli bir renk paleti oluşturarak başlayın. Arka planınıza karşı 4.5:1 geçen birincil, ikincil ve vurgu renkleri tanımlayın:'),
        code('/* Kontrast güvenli renk sistemi */\n:root {\n  /* Arka plan */\n  --bg-primary: #ffffff;\n  --bg-secondary: #f8f9fa;\n\n  /* Metin — tümü --bg-primary üzerinde 4.5:1 geçer */\n  --text-primary: #1a1a2e;    /* 16.15:1 */\n  --text-secondary: #4a4a68;  /* 7.24:1  */\n  --text-muted: #646480;      /* 4.98:1  */\n\n  /* Etkileşimli — beyaz üzerinde 4.5:1 geçer */\n  --link-color: #0055b8;      /* 7.04:1  */\n  --link-hover: #003d82;      /* 10.5:1  */\n\n  /* Durum renkleri — beyaz üzerinde 4.5:1 geçer */\n  --color-error: #c62828;     /* 6.15:1  */\n  --color-success: #1b5e20;   /* 7.82:1  */\n}', 'css'),
        p('Görseller üzerindeki metin için minimum kontrastı garanti etmek üzere bir kaplama veya metin gölgesi kullanın:'),
        code('/* Görsel arka planlarda yarı saydam kaplama */\n.hero-overlay {\n  position: relative;\n}\n\n.hero-overlay::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n\n.hero-overlay .text {\n  position: relative;\n  z-index: 1;\n  color: #ffffff;\n}\n\n/* Alternatif: okunabilirlik için metin gölgesi */\n.text-on-image {\n  color: #ffffff;\n  text-shadow:\n    0 1px 3px rgba(0, 0, 0, 0.8),\n    0 0 8px rgba(0, 0, 0, 0.5);\n}', 'css'),
        p('Açık gri yer tutucu metin gibi yaygın kalıpları düzeltin:'),
        code('/* Varsayılan yer tutucu genellikle çok açıktır (#a9a9a9 = beyaz üzerinde 2.32:1) */\ninput::placeholder {\n  color: #646480; /* Beyaz üzerinde 4.98:1 */\n}\n\n/* Odak çerçevesi renginin de yeterli kontrasta sahip olduğundan emin olun */\ninput:focus {\n  outline: 3px solid #0055b8;\n  outline-offset: 2px;\n}', 'css'),
        p('Dinamik temalar ve karanlık mod için her şema için kontrast güvenli değerler tanımlayın:'),
        code('@media (prefers-color-scheme: dark) {\n  :root {\n    --bg-primary: #121212;\n    --bg-secondary: #1e1e2e;\n    --text-primary: #e0e0e8;    /* #121212 üzerinde 13.2:1 */\n    --text-secondary: #a8a8c0;  /* 7.1:1  */\n    --text-muted: #8888a0;      /* 4.63:1 */\n    --link-color: #6eb5ff;      /* 7.52:1 */\n  }\n}', 'css'),
        p('Büyük metin (18pt/24px normal veya 14pt/18.66px kalın) için eşik 3:1\'e düşer ve daha fazla tasarım esnekliği sağlar:'),
        code('.page-title {\n  font-size: 2rem; /* 32px = büyük metin */\n  font-weight: 700;\n  color: #666688; /* 4.18:1 — büyük metin için 3:1 geçer */\n}\n\n.body-text {\n  font-size: 1rem; /* 16px = normal metin */\n  color: #4a4a68;  /* 7.24:1 — normal metin için 4.5:1 geçer */\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Beyaz arka plan üzerinde açık gri metin — webdeki en yaygın kontrast hatası. #fff üzerinde #999 yalnızca 2.85:1 verir.'),
        bullet('Erişilebilirlik değerlendirmesi yapılmadan seçilen marka renkleri. Beyaz üzerinde #4A90D9 mavi yalnızca 3.27:1 — normal metin için başarısız.'),
        bullet('Kaplama olmadan kahraman görselleri üzerinde beyaz metin. Kontrast görsel boyunca değişir ve genellikle açık bölgelerde eşiğin altına düşer.'),
        bullet('Çok açık stilde yer tutucu metin. ::placeholder için tarayıcı varsayılanları genellikle kontrast gereksinimlerini karşılamaz.'),
        bullet('Etkileşimli durumları unutmak: minimum kontrastın altına düşen hover ve focus metin renkleri.'),
        bullet('Metin öğelerinde CSS opacity kullanmak — bu, arka planla karışarak kontrastı etkili biçimde azaltır.'),
        bullet('Karanlık modun otomatik olarak erişilebilir olduğunu varsaymak — koyu-üzerinde-koyu hataları, açık-üzerinde-açık hatalar kadar yaygındır.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.3: Contrast (Minimum)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', source: 'W3C', language: 'en', _key: 'r143w3c1' },
      { title: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', source: 'WebAIM', language: 'en', _key: 'r143waim' },
      { title: 'Deque: axe-core color-contrast', url: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast', source: 'Deque', language: 'en', _key: 'r143dequ' },
      { title: 'MDN: color - CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color', source: 'MDN', language: 'en', _key: 'r143mdn1' },
      { title: 'Colour Contrast Analyser (CCA) by TPGi', url: 'https://www.tpgi.com/color-contrast-checker/', source: 'TPGi', language: 'en', _key: 'r143tpgi' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.3 Contrast (Minimum) – Accessibility Guide',
        metaDescription: 'Master WCAG 1.4.3 Contrast (Minimum). Achieve the 4.5:1 ratio for text with CSS examples, testing tools, and a contrast-safe color system approach.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.3 Kontrast (Minimum) – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.3 Kontrast (Minimum) ölçütünde ustalaşın. CSS örnekleri, test araçları ve kontrast güvenli renk sistemi ile 4.5:1 oranını sağlayın.',
      },
    },
  },

  // ─── 1.4.4 Resize Text ───
  {
    criterionNumber: '1.4.4',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['meta-viewport', 'meta-viewport-large'],
    tags: ['text', 'zoom', 'responsive', 'viewport'],
    title: {
      en: 'Resize Text',
      tr: 'Metin Boyutlandırma',
    },
    description: {
      en: 'Text can be resized up to 200% without loss of content or functionality, without requiring assistive technology.',
      tr: 'Metin, yardımcı teknolojiye gerek kalmadan içerik veya işlevsellik kaybı olmaksızın %200\'e kadar yeniden boyutlandırılabilir olmalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.4 requires that text can be scaled up to 200% of its original size using standard browser mechanisms without losing content or functionality. Users must be able to zoom in or adjust text size in their browser settings and still have the page work properly — no clipped text, no overlapping elements, no hidden controls.'),
        p('This criterion specifically focuses on browser-level zoom and text-size adjustments, not assistive technology magnification. The page must remain functional when a user uses Ctrl+Plus (or Cmd+Plus) to zoom to 200%. Content should reflow rather than require horizontal scrolling.'),

        heading('Why It Matters'),
        p('Many users with low vision rely on browser zoom as their primary accommodation. Unlike screen magnifiers, browser zoom is free, built-in, and requires no installation. If a website prevents zoom or breaks at 200%, these users lose the ability to read content. Approximately one in six people over 70 have visual acuity that benefits from enlarged text.'),
        p('Mobile users with visual impairments are especially affected when viewport meta tags disable pinch-to-zoom. This is a common pattern in responsive design that directly conflicts with accessibility requirements.'),

        heading('Related axe-core Rules'),
        bullet('meta-viewport — Flags pages where the viewport meta tag sets maximum-scale to a value less than 2 or sets user-scalable=no, preventing users from zooming.'),
        bullet('meta-viewport-large — Flags pages where maximum-scale is set to a value less than 5, which while not a direct WCAG failure, limits users who need more than 200% zoom.'),

        heading('How to Test'),
        numbered('Open the page in a desktop browser and zoom to 200% using Ctrl+Plus (Cmd+Plus on Mac).'),
        numbered('Verify that all text content is still visible and no text is clipped or hidden behind other elements.'),
        numbered('Ensure all interactive controls are still usable and no functionality is lost.'),
        numbered('Check that the page reflows content rather than requiring horizontal scrolling.'),
        numbered('Inspect the <meta name="viewport"> tag. It must not contain user-scalable=no or maximum-scale less than 2.'),

        heading('How to Fix'),
        p('Start with a proper viewport meta tag that permits zooming:'),
        code('<!-- Correct: allows zoom -->\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<!-- Wrong: prevents zoom -->\n<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">', 'html'),
        p('Use relative units for font sizes so text scales with browser settings:'),
        code('/* Use rem for consistent scaling */\nbody {\n  font-size: 1rem; /* 16px default, scales with browser */\n}\n\nh1 { font-size: 2rem; }    /* 32px at default */\nh2 { font-size: 1.5rem; }  /* 24px at default */\np  { font-size: 1rem; }    /* 16px at default */\n\n/* Avoid fixed pixel sizes for text */\n/* Bad: p { font-size: 14px; } */\n\n/* Use em for component-relative sizing */\n.card-title {\n  font-size: 1.25em;\n}', 'css'),
        p('Ensure containers expand to accommodate larger text:'),
        code('.content-box {\n  /* Use min-height instead of fixed height */\n  min-height: 200px;\n  /* height: 200px; <-- This clips text at larger sizes */\n\n  /* Avoid overflow: hidden on text containers */\n  overflow: visible;\n}\n\n.nav-item {\n  /* Allow wrapping instead of fixed width */\n  white-space: normal;\n  /* white-space: nowrap; <-- This causes clipping */\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Setting user-scalable=no or maximum-scale=1 in the viewport meta tag to prevent pinch-to-zoom on mobile.'),
        bullet('Using fixed-pixel heights on containers that hold text, causing overflow clipping at larger text sizes.'),
        bullet('Setting font sizes in px instead of rem or em, preventing text from scaling with browser settings.'),
        bullet('Navigation bars that overflow or break when text is enlarged, hiding menu items.'),
        bullet('Absolutely positioned text elements that overlap other content when text size increases.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.4, metnin standart tarayıcı mekanizmaları kullanılarak orijinal boyutunun %200\'üne kadar büyütülebilmesini ve bu sırada içerik veya işlevsellik kaybı yaşanmamasını gerektirir. Kullanıcılar tarayıcılarında yakınlaştırma yapabilmeli veya metin boyutunu ayarlayabilmeli ve sayfa düzgün çalışmaya devam etmelidir — kırpılmış metin, üst üste binen öğeler veya gizlenen kontroller olmamalıdır.'),
        p('Bu ölçüt özellikle tarayıcı düzeyinde yakınlaştırma ve metin boyutu ayarlamalarına odaklanır, yardımcı teknoloji büyütmesine değil. Kullanıcı Ctrl+Plus (veya Cmd+Plus) ile %200 yakınlaştırma yaptığında sayfa işlevsel kalmalıdır.'),

        heading('Neden Önemlidir'),
        p('Az gören birçok kullanıcı, birincil uyumlaştırma olarak tarayıcı yakınlaştırmasına güvenir. Ekran büyüteçlerinden farklı olarak tarayıcı yakınlaştırma ücretsizdir, yerleşiktir ve kurulum gerektirmez. Bir web sitesi yakınlaştırmayı engeller veya %200\'de bozulursa, bu kullanıcılar içeriği okuma becerisini kaybeder.'),
        p('Görme bozukluğu olan mobil kullanıcılar, viewport meta etiketleri parmakla yakınlaştırmayı devre dışı bıraktığında özellikle etkilenir. Bu, erişilebilirlik gereksinimleriyle doğrudan çelişen yaygın bir duyarlı tasarım kalıbıdır.'),

        heading('İlgili axe-core Kuralları'),
        bullet('meta-viewport — Viewport meta etiketinin maximum-scale değerini 2\'den küçük ayarladığı veya user-scalable=no olarak belirlediği sayfaları işaretler.'),
        bullet('meta-viewport-large — maximum-scale değerinin 5\'ten küçük ayarlandığı sayfaları işaretler; bu doğrudan bir WCAG hatası olmasa da %200\'den fazla yakınlaştırma ihtiyaçı olan kullanıcıları kısıtlar.'),

        heading('Nasıl Test Edilir'),
        numbered('Sayfayı masaüstü tarayıcısında açın ve Ctrl+Plus (Mac\'te Cmd+Plus) ile %200 yakınlaştırın.'),
        numbered('Tüm metin içeriğinin hâlâ görünür olduğunu ve hiçbir metnin kırpılmadığını veya diğer öğelerin arkasında gizlenmediğini doğrulayın.'),
        numbered('Tüm etkileşimli kontrollerin hâlâ kullanılabilir olduğunu ve işlevsellik kaybı olmadığını sağlayın.'),
        numbered('Sayfanın yatay kaydırma gerektirmek yerine içeriği yeniden akıttığını kontrol edin.'),
        numbered('<meta name="viewport"> etiketini inceleyin. user-scalable=no veya 2\'den küçük maximum-scale içermemelidir.'),

        heading('Nasıl Düzeltilir'),
        p('Yakınlaştırmaya izin veren doğru bir viewport meta etiketi ile başlayın:'),
        code('<!-- Doğru: yakınlaştırmaya izin verir -->\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<!-- Yanlış: yakınlaştırmayı engeller -->\n<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">', 'html'),
        p('Metnin tarayıcı ayarlarıyla ölçeklenmesi için göreceli birimler kullanın:'),
        code('/* Tutarlı ölçekleme için rem kullanın */\nbody {\n  font-size: 1rem; /* Varsayılan 16px, tarayıcıyla ölçeklenir */\n}\n\nh1 { font-size: 2rem; }    /* Varsayılanda 32px */\nh2 { font-size: 1.5rem; }  /* Varsayılanda 24px */\np  { font-size: 1rem; }    /* Varsayılanda 16px */\n\n/* Metin için sabit piksel boyutlarından kaçının */\n/* Kötü: p { font-size: 14px; } */\n\n/* Bileşene göre boyutlandırma için em kullanın */\n.card-title {\n  font-size: 1.25em;\n}', 'css'),
        p('Kapsayıcıların daha büyük metni barındıracak şekilde genişlediğinden emin olun:'),
        code('.content-box {\n  /* Sabit yükseklik yerine minimum yükseklik kullanın */\n  min-height: 200px;\n  /* height: 200px; <-- Daha büyük boyutlarda metni kırpar */\n\n  /* Metin kapsayıcılarında overflow: hidden kullanmaktan kaçının */\n  overflow: visible;\n}\n\n.nav-item {\n  /* Sabit genişlik yerine sarmalamaya izin verin */\n  white-space: normal;\n  /* white-space: nowrap; <-- Kırpılmaya neden olur */\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Mobilde parmakla yakınlaştırmayı engellemek için viewport meta etiketinde user-scalable=no veya maximum-scale=1 ayarlamak.'),
        bullet('Metin içeren kapsayıcılarda sabit piksel yüksekliği kullanmak; daha büyük metin boyutlarında taşma kırpmasına neden olur.'),
        bullet('Yazı boyutlarını rem veya em yerine px ile ayarlamak; metnin tarayıcı ayarlarıyla ölçeklenmesini engeller.'),
        bullet('Metin büyütüldüğünde taşan veya bozulan, menü öğelerini gizleyen gezinme çubukları.'),
        bullet('Metin boyutu arttığında diğer içerikle örtüşen mutlak konumlandırılmış metin öğeleri.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.4: Resize Text', url: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html', source: 'W3C', language: 'en', _key: 'r144w3c1' },
      { title: 'WebAIM: Fonts and Readability', url: 'https://webaim.org/techniques/fonts/', source: 'WebAIM', language: 'en', _key: 'r144waim' },
      { title: 'Deque: axe-core meta-viewport', url: 'https://dequeuniversity.com/rules/axe/4.8/meta-viewport', source: 'Deque', language: 'en', _key: 'r144dequ' },
      { title: 'MDN: viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag', source: 'MDN', language: 'en', _key: 'r144mdn1' },
      { title: 'Techniques for WCAG 2 - G179: Ensuring no loss of content', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G179', source: 'W3C', language: 'en', _key: 'r144w3c2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.4 Resize Text – Accessibility Guide',
        metaDescription: 'Meet WCAG 1.4.4 Resize Text. Ensure text scales to 200% without breaking layout. Fix viewport meta, use rem units, and test zoom properly.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.4 Metin Boyutlandırma – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.4 Metin Boyutlandırma ölçütünü karşılayın. Metnin düzen bozulmadan %200 ölçeklenmesini sağlayın.',
      },
    },
  },

  // ─── 1.4.5 Images of Text ───
  {
    criterionNumber: '1.4.5',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['images', 'text', 'visual'],
    title: {
      en: 'Images of Text',
      tr: 'Metin Görselleri',
    },
    description: {
      en: 'If the same visual presentation can be achieved with real text, images of text are not used, except for customization or essential use.',
      tr: 'Aynı görsel sunum gerçek metinle sağlanabiliyorsa, özelleştirme veya zorunlu kullanım dışında metin görselleri kullanılmaz.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.5 discourages the use of images to display text when the same visual result can be achieved with styled HTML text. Images of text cannot be resized without degradation, cannot be reflowed, cannot be adjusted by user style sheets, and are not directly accessible to screen readers without alt text. The criterion allows exceptions for logotypes and situations where the specific visual presentation of the text is essential to the information being conveyed.'),
        p('Modern CSS provides extensive typographic control — custom fonts via @font-face, text shadows, gradients on text, letter spacing, and more — that eliminates most reasons for using images of text. When real text is used instead, it inherits all the benefits of browser rendering: scaling, reflow, translation, search, and copy-paste.'),

        heading('Why It Matters'),
        p('Images of text present multiple barriers. They become blurry when zoomed, they cannot be customized by users who need specific fonts or colors for readability, and they do not reflow when the viewport changes. For users with dyslexia who need to override fonts, or low-vision users who need specific color combinations, images of text are immovable obstacles.'),
        p('Images of text also hurt SEO, increase page load time, and make content updates more difficult since each text change requires generating a new image.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules for 1.4.5 because detecting images of text requires human judgment to determine whether the text could be rendered as HTML text. This is a manual check criterion.'),

        heading('How to Test'),
        numbered('Visually scan the page for any text content rendered as images — banners, headings, buttons, navigation items.'),
        numbered('For each image of text found, determine if the same visual presentation could be achieved with CSS-styled HTML text.'),
        numbered('Check if the image of text has appropriate alt text that conveys the same information.'),
        numbered('Verify that logos and brand names (which are exempt) are the only remaining images of text.'),

        heading('How to Fix'),
        p('Replace images of text with styled HTML. Modern CSS can replicate virtually any text effect:'),
        code('/* Instead of an image for a decorative heading */\n.fancy-heading {\n  font-family: \'Playfair Display\', serif;\n  font-size: 3rem;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  text-shadow: none;\n}\n\n/* Instead of an image for a styled button */\n.styled-button {\n  font-family: \'Inter\', sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  border: 2px solid currentColor;\n  border-radius: 4px;\n  padding: 0.75em 1.5em;\n}', 'css'),
        p('Use @font-face for custom typography instead of image-based headings:'),
        code('<style>\n  @font-face {\n    font-family: \'BrandFont\';\n    src: url(\'/fonts/brand.woff2\') format(\'woff2\');\n    font-display: swap;\n  }\n\n  .brand-heading {\n    font-family: \'BrandFont\', serif;\n    font-size: 2.5rem;\n  }\n</style>\n\n<h1 class="brand-heading">Welcome to Our Service</h1>', 'html'),

        heading('Common Mistakes'),
        bullet('Using image files for styled headings or banner text when CSS could achieve the same effect.'),
        bullet('Buttons or call-to-action elements rendered as images rather than styled HTML buttons.'),
        bullet('Navigation items rendered as image maps instead of HTML text with CSS styling.'),
        bullet('Social media share counts or badges rendered as images instead of live text.'),
        bullet('Infographics where body text is embedded in the image instead of being overlaid as HTML text.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.5, aynı görsel sonuç stillendirilmiş HTML metniyle elde edilebiliyorsa metin görüntülemek için görsel kullanımını engeller. Metin görselleri bozulmadan yeniden boyutlandırılamaz, yeniden akıtılamaz, kullanıcı stil sayfalarıyla ayarlanamaz ve alt metin olmadan ekran okuyucular tarafından doğrudan erişilemez. Ölçüt, logotipler ve metnin belirli görsel sunumunun aktarılan bilgi için zorunlu olduğu durumlar için istisna tanır.'),
        p('Modern CSS kapsamlı tipografik kontrol sağlar — @font-face ile özel yazı tipleri, metin gölgeleri, metin üzerinde gradyanlar, harf aralığı ve daha fazlası — metin görselleri kullanmanın çoğu nedenini ortadan kaldırır. Gerçek metin kullanıldığında, tarayıcı oluşturmanın tüm avantajlarını devralır: ölçekleme, yeniden akış, çeviri, arama ve kopyala-yapıştır.'),

        heading('Neden Önemlidir'),
        p('Metin görselleri birden fazla engel oluşturur. Yakınlaştırıldığında bulanıklaşır, okunabilirlik için belirli yazı tiplerine veya renklere ihtiyaç duyan kullanıcılar tarafından özelleştirilemez ve görüntü alanı değiştiğinde yeniden akıtılmaz. Yazı tiplerini geçersiz kılması gereken disleksili kullanıcılar veya belirli renk kombinasyonlarına ihtiyaç duyan az gören kullanıcılar için metin görselleri aşılmaz engellerdir.'),
        p('Metin görselleri ayrıca SEO\'yu olumsuz etkiler, sayfa yükleme süresini artırır ve her metin değişikliği yeni bir görsel oluşturmayı gerektirdiğinden içerik güncellemelerini zorlaştırır.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.5 için otomatik axe-core kuralı yoktur çünkü metin görsellerini tespit etmek, metnin HTML olarak oluşturulup oluşturulamayacağını belirlemek için insan değerlendirmesi gerektirir. Bu, manuel denetim ölçütüdür.'),

        heading('Nasıl Test Edilir'),
        numbered('Sayfayı görsel olarak tarayarak görsel olarak oluşturulmuş metin içeriğini arayın — afiş metinleri, başlıklar, düğmeler, gezinme öğeleri.'),
        numbered('Bulunan her metin görseli için aynı görsel sunumun CSS ile stillendirilmiş HTML metniyle elde edilip edilemeyeceğini belirleyin.'),
        numbered('Metin görselinin aynı bilgiyi aktaran uygun alt metne sahip olup olmadığını kontrol edin.'),
        numbered('Logo ve marka adlarının (muaf olan) kalan tek metin görselleri olduğunu doğrulayın.'),

        heading('Nasıl Düzeltilir'),
        p('Metin görsellerini stillendirilmiş HTML ile değiştirin. Modern CSS neredeyse her metin efektini kopyalayabilir:'),
        code('/* Dekoratif başlık için görsel yerine */\n.fancy-heading {\n  font-family: \'Playfair Display\', serif;\n  font-size: 3rem;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  text-shadow: none;\n}\n\n/* Stillendirilmiş düğme için görsel yerine */\n.styled-button {\n  font-family: \'Inter\', sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  border: 2px solid currentColor;\n  border-radius: 4px;\n  padding: 0.75em 1.5em;\n}', 'css'),
        p('Görsel tabanlı başlıklar yerine özel tipografi için @font-face kullanın:'),
        code('<style>\n  @font-face {\n    font-family: \'BrandFont\';\n    src: url(\'/fonts/brand.woff2\') format(\'woff2\');\n    font-display: swap;\n  }\n\n  .brand-heading {\n    font-family: \'BrandFont\', serif;\n    font-size: 2.5rem;\n  }\n</style>\n\n<h1 class="brand-heading">Hizmetimize Hoş Geldiniz</h1>', 'html'),

        heading('Sık Yapılan Hatalar'),
        bullet('CSS ile aynı efekt elde edilebilirken stillendirilmiş başlıklar veya afiş metinleri için görsel dosyaları kullanmak.'),
        bullet('Stillendirilmiş HTML düğmeleri yerine görsel olarak oluşturulan düğmeler veya harekete geçirici çağrı öğeleri.'),
        bullet('CSS stilli HTML metin yerine görsel haritalar olarak oluşturulan gezinme öğeleri.'),
        bullet('Canlı metin yerine görsel olarak oluşturulan sosyal medya paylaşım sayıları veya rozetler.'),
        bullet('Gövde metninin HTML metin olarak yerleştirilmek yerine görsele gömüldüğü bilgi grafikleri.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.5: Images of Text', url: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html', source: 'W3C', language: 'en', _key: 'r145w3c1' },
      { title: 'WebAIM: Images - Images of Text', url: 'https://webaim.org/techniques/images/#text_images', source: 'WebAIM', language: 'en', _key: 'r145waim' },
      { title: 'Deque University: Images of Text', url: 'https://dequeuniversity.com/rules/axe/4.8/image-alt', source: 'Deque', language: 'en', _key: 'r145dequ' },
      { title: 'MDN: @font-face', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face', source: 'MDN', language: 'en', _key: 'r145mdn1' },
      { title: 'CSS Tricks: Gradient Text', url: 'https://css-tricks.com/snippets/css/gradient-text/', source: 'CSS-Tricks', language: 'en', _key: 'r145csst' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.5 Images of Text – Accessibility Guide',
        metaDescription: 'Meet WCAG 1.4.5 Images of Text. Replace image-based text with styled HTML using modern CSS techniques for better accessibility and SEO.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.5 Metin Görselleri – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.5 Metin Görselleri ölçütünü karşılayın. Modern CSS teknikleriyle görsel tabanlı metni stillendirilmiş HTML ile değiştirin.',
      },
    },
  },

  // ─── 1.4.6 Contrast (Enhanced) ───
  {
    criterionNumber: '1.4.6',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['color-contrast-enhanced'],
    tags: ['color', 'contrast', 'text', 'visual'],
    title: {
      en: 'Contrast (Enhanced)',
      tr: 'Kontrast (Gelişmiş)',
    },
    description: {
      en: 'Text and images of text have a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.',
      tr: 'Metin ve metin görselleri normal metin için en az 7:1, büyük metin için en az 4.5:1 kontrast oranına sahip olmalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.6 is the AAA-level enhancement of the minimum contrast criterion (1.4.3). It raises the bar: normal text must achieve a contrast ratio of at least 7:1 against its background, and large text must achieve at least 4.5:1. These higher ratios provide significantly better readability for users with moderately low vision (approximately 20/80 visual acuity) without requiring contrast-enhancing assistive technology.'),
        p('The same exceptions apply as with 1.4.3: incidental text, logotypes, and inactive component text are exempt. The definition of large text remains the same — 18pt (24px) regular or 14pt (18.66px) bold and above.'),

        heading('Why It Matters'),
        p('The 7:1 ratio provides substantially better readability in challenging conditions. While 4.5:1 is the minimum acceptable threshold, 7:1 accommodates users with more significant vision loss, older adults with naturally declining contrast sensitivity, and environments with poor viewing conditions. For organizations serving healthcare, government, or elderly populations, aiming for AAA contrast is a meaningful improvement.'),
        p('Achieving 7:1 does not require dramatic visual changes. Dark text on a white or near-white background easily meets this threshold. The main design challenge arises with colored text, light grays, and mid-tone backgrounds.'),

        heading('Related axe-core Rules'),
        bullet('color-contrast-enhanced — Checks that text meets the enhanced 7:1 contrast ratio for normal text and 4.5:1 for large text. This rule is typically run as a "best practice" or AAA-level check.'),

        heading('How to Test'),
        numbered('Use the same tools as for 1.4.3 but set the target to 7:1 for normal text and 4.5:1 for large text.'),
        numbered('In axe DevTools, enable the AAA rules or run the color-contrast-enhanced rule specifically.'),
        numbered('Use the WebAIM Contrast Checker and check the "WCAG AAA" row in the results.'),
        numbered('Pay special attention to secondary text, captions, and metadata which tend to use lighter colors.'),

        heading('How to Fix'),
        p('Tighten your color palette to meet the higher threshold:'),
        code(':root {\n  /* AAA-compliant text colors on white (#fff) */\n  --text-primary: #111122;    /* 17.7:1 */\n  --text-secondary: #333355;  /* 10.1:1 */\n  --text-muted: #4d4d6a;      /* 7.02:1 — just meets 7:1 */\n\n  /* For large text (24px+), these pass 4.5:1 */\n  --text-large-accent: #5c5c80; /* 5.1:1 */\n}\n\n/* Avoid mid-range grays that fail at 7:1 */\n/* #767676 = 4.54:1 on white — passes AA but fails AAA */\n/* #595959 = 7.0:1 on white — passes AAA */\n.body-text {\n  color: #333355;\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Assuming that passing 4.5:1 (AA) is sufficient for all audiences when the user base includes elderly or low-vision populations.'),
        bullet('Using popular "accessible gray" values like #767676 that pass AA but fail AAA.'),
        bullet('Overlooking the enhanced requirement when designing dark mode — pale text on dark backgrounds must also meet 7:1.'),
        bullet('Not testing secondary UI text (timestamps, bylines, metadata) which often uses lighter colors.'),
        bullet('Applying the 7:1 ratio requirement to logotypes and branding elements that are actually exempt.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.6, minimum kontrast ölçütünün (1.4.3) AAA düzeyindeki geliştirilmiş halidir. Çıtayı yükseltir: normal metin arka planına karşı en az 7:1, büyük metin en az 4.5:1 kontrast oranına ulaşmalıdır. Bu yüksek oranlar, kontrast artırıcı yardımcı teknoloji gerektirmeden orta düzeyde düşük görüşlü kullanıcılar (yaklaşık 20/80 görme keskinliği) için önemli ölçüde daha iyi okunabilirlik sağlar.'),
        p('1.4.3 ile aynı istisnalar geçerlidir: rastlantısal metin, logotipler ve pasif bileşen metni muaftır. Büyük metin tanımı aynı kalır — 18pt (24px) normal veya 14pt (18.66px) kalın ve üstü.'),

        heading('Neden Önemlidir'),
        p('7:1 oranı zorlu koşullarda önemli ölçüde daha iyi okunabilirlik sağlar. 4.5:1 kabul edilebilir minimum eşik olsa da, 7:1 daha belirgin görme kaybı olan kullanıcıları, doğal olarak azalan kontrast duyarlılığına sahip yaşlı yetişkinleri ve kötü görüntüleme koşullarını barındırır.'),
        p('7:1\'e ulaşmak dramatik görsel değişiklikler gerektirmez. Beyaz veya beyaza yakın arka plan üzerinde koyu metin bu eşiği kolayca karşılar. Asıl tasarım zorluğu renkli metin, açık griler ve orta tonlu arka planlarda ortaya çıkar.'),

        heading('İlgili axe-core Kuralları'),
        bullet('color-contrast-enhanced — Metnin normal metin için geliştirilmiş 7:1 ve büyük metin için 4.5:1 kontrast oranını karşılayıp karşılamadığını kontrol eder. Bu kural genellikle "en iyi uygulama" veya AAA düzeyinde kontrol olarak çalıştırılır.'),

        heading('Nasıl Test Edilir'),
        numbered('1.4.3 ile aynı araçları kullanın ancak hedefi normal metin için 7:1, büyük metin için 4.5:1 olarak ayarlayın.'),
        numbered('axe DevTools\'ta AAA kurallarını etkinleştirin veya color-contrast-enhanced kuralını özellikle çalıştırın.'),
        numbered('WebAIM Contrast Checker kullanın ve sonuçlarda "WCAG AAA" satırını kontrol edin.'),
        numbered('Daha açık renkler kullanma eğiliminde olan ikincil metin, altyazılar ve meta verilere özellikle dikkat edin.'),

        heading('Nasıl Düzeltilir'),
        p('Daha yüksek eşiği karşılamak için renk paletinizi sıkılaştırın:'),
        code(':root {\n  /* Beyaz (#fff) üzerinde AAA uyumlu metin renkleri */\n  --text-primary: #111122;    /* 17.7:1 */\n  --text-secondary: #333355;  /* 10.1:1 */\n  --text-muted: #4d4d6a;      /* 7.02:1 — 7:1 eşiğini karşılar */\n\n  /* Büyük metin (24px+) için bunlar 4.5:1 geçer */\n  --text-large-accent: #5c5c80; /* 5.1:1 */\n}\n\n/* 7:1\'de başarısız olan orta aralık grilerden kaçının */\n/* #767676 = beyaz üzerinde 4.54:1 — AA geçer ama AAA başarısız */\n/* #595959 = beyaz üzerinde 7.0:1 — AAA geçer */\n.body-text {\n  color: #333355;\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Kullanıcı tabanı yaşlı veya az gören popülasyonları içerdiğinde 4.5:1 (AA) geçmenin tüm kitleler için yeterli olduğunu varsaymak.'),
        bullet('AA geçen ancak AAA\'da başarısız olan #767676 gibi popüler "erişilebilir gri" değerleri kullanmak.'),
        bullet('Karanlık mod tasarlarken geliştirilmiş gereksinimi gözden kaçırmak — koyu arka planlardaki soluk metin de 7:1 karşılamalıdır.'),
        bullet('Genellikle daha açık renkler kullanan ikincil kullanıcı arayüzü metnini (zaman damgaları, yazar adları, meta veriler) test etmemek.'),
        bullet('7:1 oran gereksinimini gerçekte muaf olan logotip ve marka öğelerine uygulamak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.6: Contrast (Enhanced)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html', source: 'W3C', language: 'en', _key: 'r146w3c1' },
      { title: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', source: 'WebAIM', language: 'en', _key: 'r146waim' },
      { title: 'Deque: axe-core color-contrast-enhanced', url: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast-enhanced', source: 'Deque', language: 'en', _key: 'r146dequ' },
      { title: 'MDN: Using relative color values', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors', source: 'MDN', language: 'en', _key: 'r146mdn1' },
      { title: 'Techniques for WCAG 2 - G17: Ensuring a 7:1 contrast ratio', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G17', source: 'W3C', language: 'en', _key: 'r146w3c2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.6 Contrast (Enhanced) – AAA Guide',
        metaDescription: 'Achieve WCAG 1.4.6 Enhanced Contrast with 7:1 ratio. AAA-level color guidance with CSS examples and testing tools for maximum readability.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.6 Kontrast (Gelişmiş) – AAA Rehberi',
        metaDescription: 'WCAG 1.4.6 Gelişmiş Kontrast ölçütünü 7:1 oranıyla sağlayın. Maksimum okunabilirlik için AAA düzeyinde renk rehberi.',
      },
    },
  },

  // ─── 1.4.7 Low or No Background Audio ───
  {
    criterionNumber: '1.4.7',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['audio', 'media', 'speech'],
    title: {
      en: 'Low or No Background Audio',
      tr: 'Düşük veya Arka Plan Sesi Yok',
    },
    description: {
      en: 'For prerecorded audio-only content containing speech, background sounds are at least 20 dB lower than foreground speech, or can be turned off.',
      tr: 'Konuşma içeren önceden kaydedilmiş salt ses içeriği için arka plan sesleri, ön plan konuşmasından en az 20 dB daha düşüktür veya kapatılabilir.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.7 applies to prerecorded audio content that primarily contains speech, such as podcasts, narrated videos, or recorded presentations. When background sounds (music, ambient noise, sound effects) are present alongside speech, those background sounds must be at least 20 decibels quieter than the foreground speech content. Alternatively, a mechanism can be provided to turn off background sounds entirely.'),
        p('A 20 dB difference means the background audio is approximately four times quieter than the speech. This ensures that people with hearing difficulties can distinguish the spoken words from background noise. The criterion does not apply to audio that is primarily musical in nature or to live audio.'),

        heading('Why It Matters'),
        p('People with hearing impairments, auditory processing disorders, or those who are hard of hearing struggle significantly when background audio competes with speech. Even moderate background music can mask speech frequencies and make content incomprehensible for these users. The 20 dB separation provides enough clarity for most users with hearing difficulties to follow spoken content.'),
        p('This also benefits non-native speakers and users in noisy environments who need clear speech to understand content.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules for 1.4.7. This criterion requires manual audio analysis because automated tools cannot measure the relative volume of foreground speech versus background audio. Professional audio editing software with level meters is needed.'),

        heading('How to Test'),
        numbered('Listen to the audio content and note whether background sounds are present alongside speech.'),
        numbered('If background sounds exist, use audio analysis software (such as Audacity) to measure the dB levels of speech and background separately.'),
        numbered('Verify the background is at least 20 dB lower than the speech peaks.'),
        numbered('Alternatively, check if a mechanism exists to disable background audio while retaining speech.'),
        numbered('Have someone with hearing difficulty listen and confirm the speech is clearly distinguishable.'),

        heading('How to Fix'),
        p('During audio production, set background levels appropriately:'),
        code('/* Audio mixing guidelines (conceptual, not code) */\n/* Speech track: -12 dBFS to -6 dBFS (target peak) */\n/* Background music: -32 dBFS to -26 dBFS (at least 20 dB below speech) */\n/* Sound effects: -28 dBFS or lower during speech segments */\n\n<!-- Provide separate audio tracks when possible -->\n<audio controls>\n  <source src="narration-only.mp3" type="audio/mpeg" />\n</audio>\n<label>\n  <input type="checkbox" id="bg-audio-toggle" />\n  Enable background music\n</label>', 'html'),
        p('Use audio ducking to automatically lower background audio during speech segments. In production workflows, apply sidechain compression so that speech triggers background level reduction.'),

        heading('Common Mistakes'),
        bullet('Background music at the same level as narration, making speech hard to distinguish for hearing-impaired users.'),
        bullet('Ambient sound effects that spike during speech, temporarily masking words.'),
        bullet('Podcast intros with loud music that continues at the same volume önce speech begins.'),
        bullet('No option to disable background audio when separate tracks are technically available.'),
        bullet('Applying this requirement to primarily musical content, which is actually exempt.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.7, podcast\'ler, anlatımlı videolar veya kaydedilmiş sunumlar gibi esas olarak konuşma içeren önceden kaydedilmiş ses içeriğine uygulanır. Konuşma ile birlikte arka plan sesleri (müzik, ortam gürültüsü, ses efektleri) bulunduğunda, bu arka plan sesleri ön plan konuşma içeriğinden en az 20 desibel daha sessiz olmalıdır. Alternatif olarak arka plan seslerini tamamen kapatmak için bir mekanizma sağlanabilir.'),
        p('20 dB fark, arka plan sesinin konuşmadan yaklaşık dört kat daha sessiz olduğu anlamına gelir. Bu, işitme güçlüğü çeken kişilerin konuşulan kelimeleri arka plan gürültüsünden ayırt edebilmesini sağlar. Ölçüt, doğası gereği esas olarak müzikal olan seslere veya canlı seslere uygulanmaz.'),

        heading('Neden Önemlidir'),
        p('İşitme bozukluğu olan, işitsel işleme bozukluğu bulunan veya işitme güçlüğü çeken kişiler, arka plan sesi konuşmayla rekabet ettiğinde ciddi zorluk yaşar. Orta düzeyde bile arka plan müziği konuşma frekanslarını maskeleyebilir ve içeriği bu kullanıcılar için anlaşılmaz hâle getirebilir.'),
        p('Bu aynı zamanda net konuşmaya ihtiyaç duyan ana dili farklı olan konuşmacılar ve gürültülü ortamlardaki kullanıcılar için de faydalıdır.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.7 için otomatik axe-core kuralı yoktur. Bu ölçüt, otomatik araçların ön plan konuşması ile arka plan sesi arasındaki göreceli hacmi ölçememesi nedeniyle manuel ses analizi gerektirir.'),

        heading('Nasıl Test Edilir'),
        numbered('Ses içeriğini dinleyin ve konuşma ile birlikte arka plan seslerinin olup olmadığını not edin.'),
        numbered('Arka plan sesleri varsa, konuşma ve arka plan dB seviyelerini ayrı ayrı ölçmek için ses analiz yazılımı (Audacity gibi) kullanın.'),
        numbered('Arka planın konuşma tepe seviyelerinden en az 20 dB düşük olduğunu doğrulayın.'),
        numbered('Alternatif olarak, konuşmayı koruyarak arka plan sesini devre dışı bırakan bir mekanizmanın olup olmadığını kontrol edin.'),
        numbered('İşitme güçlüğü olan birinin dinlemesini ve konuşmanın açıkça ayırt edilebildiğini onaylamasını sağlayın.'),

        heading('Nasıl Düzeltilir'),
        p('Ses prodüksiyonu sırasında arka plan seviyelerini uygun şekilde ayarlayın:'),
        code('<!-- Mümkün olduğunda ayrı ses parçaları sağlayın -->\n<audio controls>\n  <source src="yalnızca-anlatim.mp3" type="audio/mpeg" />\n</audio>\n<label>\n  <input type="checkbox" id="bg-audio-toggle" />\n  Arka plan müziğini etkinleştir\n</label>', 'html'),
        p('Konuşma segmentleri sırasında arka plan sesini otomatik olarak düşürmek için ses kısma (audio ducking) tekniği kullanın. Prodüksiyon iş akışlarında, konuşmanın arka plan seviyesinin düşmesini tetiklediği yan zincir sıkıştırma uygulayın.'),

        heading('Sık Yapılan Hatalar'),
        bullet('Arka plan müziğinin anlatım ile aynı seviyede olması, işitme engelli kullanıcıların konuşmayı ayırt etmesini zorlaştırır.'),
        bullet('Konuşma sırasında ani yükselen ve kelimeleri geçici olarak maskeleyen ortam ses efektleri.'),
        bullet('Konuşma başladığında aynı ses seviyesinde devam eden yüksek müzikli podcast giriş bölümleri.'),
        bullet('Ayrı parçalar teknik olarak mevcut olduğunda arka plan sesini devre dışı bırakma seçeneği bulunmaması.'),
        bullet('Bu gereksinimi gerçekte muaf olan ağırlıklı olarak müzikal içeriğe uygulamak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.7: Low or No Background Audio', url: 'https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html', source: 'W3C', language: 'en', _key: 'r147w3c1' },
      { title: 'WebAIM: Audio and Video Accessibility', url: 'https://webaim.org/techniques/captions/', source: 'WebAIM', language: 'en', _key: 'r147waim' },
      { title: 'Techniques for WCAG 2 - G56: Mixing audio files', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G56', source: 'W3C', language: 'en', _key: 'r147w3c2' },
      { title: 'MDN: Web Audio API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API', source: 'MDN', language: 'en', _key: 'r147mdn1' },
      { title: 'Audacity: Free Audio Editor', url: 'https://www.audacityteam.org/', source: 'Audacity', language: 'en', _key: 'r147audc' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.7 Low or No Background Audio – AAA Guide',
        metaDescription: 'Meet WCAG 1.4.7 by keeping background audio 20 dB below speech. Audio mixing tips and testing techniques for clear, accessible speech content.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.7 Düşük veya Arka Plan Sesi Yok – Rehber',
        metaDescription: 'WCAG 1.4.7 ölçütünü, arka plan sesini konuşmadan 20 dB aşağıda tutarak karşılayın. Erişilebilir ses içeriği için karıştırma ipuçları.',
      },
    },
  },

  // ─── 1.4.8 Visual Presentation ───
  {
    criterionNumber: '1.4.8',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['text', 'visual', 'layout', 'css'],
    title: {
      en: 'Visual Presentation',
      tr: 'Görsel Sunum',
    },
    description: {
      en: 'For blocks of text, users can select foreground and background colors, width is no more than 80 characters, text is not justified, line spacing is at least 1.5, and paragraph spacing is at least 1.5 times the line spacing.',
      tr: 'Metin blokları için kullanıcılar ön plan ve arka plan renklerini seçebilir, genişlik 80 karakteri aşmaz, metin iki yana yaslanmaz, satır aralığı en az 1.5 ve paragraf aralığı satır aralığının en az 1.5 katıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.8 defines five specific requirements for the visual presentation of blocks of text to maximize readability. The user must be able to: (1) select foreground and background colors, (2) read text in lines no wider than 80 characters (40 for CJK scripts), (3) see text that is not fully justified, (4) have line spacing of at least 1.5 within paragraphs, and (5) have paragraph spacing of at least 1.5 times the line spacing.'),
        p('These requirements are rooted in readability research. Long line lengths cause tracking errors, full justification creates uneven spacing that disrupts reading flow, and tight line spacing makes it difficult to find the next line. Together, these properties create a baseline of readable text layout.'),

        heading('Why It Matters'),
        p('Users with dyslexia, low vision, or cognitive disabilities benefit significantly from controlled text presentation. Research shows that line lengths beyond 80 characters increase reading errors, justified text creates "rivers of white space" that disrupt reading for dyslexic users, and tight spacing makes it hard for people to track from line to line.'),
        p('Allowing users to customize colors is essential for those who need high-contrast or specific color combinations (such as light text on dark backgrounds) for comfortable reading.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules for 1.4.8. These properties require visual inspection and computed style analysis. Some can be checked programmatically with custom scripts but are not part of standard rule sets.'),

        heading('How to Test'),
        numbered('Measure the maximum line width of body text. Count characters on the longest line — it should not exceed 80 characters.'),
        numbered('Check the text-align property on body text blocks. It should not be set to justify.'),
        numbered('Inspect line-height on body text. It should be at least 1.5 (or 150%).'),
        numbered('Check spacing between paragraphs. It should be at least 1.5 times the line-height value.'),
        numbered('Test whether the user can override foreground and background colors via browser settings or a provided UI mechanism.'),

        heading('How to Fix'),
        p('Apply readable text defaults across your site:'),
        code('/* Readable text block styling */\n.content-area {\n  /* Max 80 characters wide */\n  max-width: 70ch; /* ch unit = width of \'0\' character */\n\n  /* No full justification */\n  text-align: left;\n\n  /* Line spacing at least 1.5 */\n  line-height: 1.6;\n\n  /* Paragraph spacing at least 1.5x line height */\n  /* With line-height: 1.6 on 1rem (16px) = 25.6px */\n  /* Paragraph spacing should be >= 38.4px */\n}\n\n.content-area p {\n  margin-bottom: 1.5em; /* 1.5x the font size, closely approximating 1.5x line-height */\n}\n\n/* Allow user color overrides — don\'t use !important on colors */\n.content-area {\n  color: var(--text-color, #1a1a2e);\n  background-color: var(--bg-color, #ffffff);\n}', 'css'),
        p('Provide a theme switcher for color customization:'),
        code('<fieldset class="theme-switcher">\n  <legend>Reading preferences</legend>\n  <label><input type="radio" name="theme" value="light" checked /> Light</label>\n  <label><input type="radio" name="theme" value="dark" /> Dark</label>\n  <label><input type="radio" name="theme" value="sepia" /> Sepia</label>\n  <label><input type="radio" name="theme" value="high-contrast" /> High Contrast</label>\n</fieldset>', 'html'),

        heading('Common Mistakes'),
        bullet('Full-width text containers that span the entire viewport on large screens, creating line lengths of 150+ characters.'),
        bullet('Using text-align: justify on body text, creating uneven word spacing and rivers of white space.'),
        bullet('Default line-height of 1.2 or "normal" (typically ~1.15), which is below the 1.5 minimum.'),
        bullet('Paragraphs with only margin-bottom: 1em, which is less than 1.5 times the line spacing.'),
        bullet('Using !important on text colors, preventing user style sheets from overriding them.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.8, okunabilirliği en üst düzeye çıkarmak için metin bloklarının görsel sunumuna yönelik beş özel gereksinim tanımlar. Kullanıcı şunları yapabilmelidir: (1) ön plan ve arka plan renklerini seçmek, (2) satır başına 80 karakterden (CJK alfabeleri için 40) fazla olmayan satırları okumak, (3) iki yana yaslanmamış metin görmek, (4) paragraflar içinde en az 1.5 satır aralığına sahip olmak ve (5) satır aralığının en az 1.5 katı paragraf aralığına sahip olmak.'),
        p('Bu gereksinimler okunabilirlik araştırmalarına dayanır. Uzun satır uzunlukları takip hatalarına neden olur, tam iki yana yaslama okuma akışını bozan düzensiz aralık oluşturur ve dar satır aralığı bir sonraki satırı bulmayı zorlaştırır.'),

        heading('Neden Önemlidir'),
        p('Disleksi, düşük görme veya bilişsel engelleri olan kullanıcılar kontrollü metin sunumundan önemli ölçüde faydalanır. Araştırmalar, 80 karakteri aşan satır uzunluklarının okuma hatalarını artırdığını, iki yana yaslanmış metnin disleksili kullanıcılar için okumayı bozan "beyaz boşluk ırmakları" oluşturduğunu ve dar aralığın satırdan satıra takibi zorlaştırdığını göstermektedir.'),
        p('Kullanıcıların renkleri özelleştirmesine izin vermek, konforlu okuma için yüksek kontrast veya belirli renk kombinasyonlarına ihtiyaç duyanlar için önemlidir.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.8 için otomatik axe-core kuralı yoktur. Bu özellikler görsel inceleme ve hesaplanmış stil analizi gerektirir.'),

        heading('Nasıl Test Edilir'),
        numbered('Gövde metninin maksimum satır genişliğini ölçün. En uzun satırdaki karakterleri sayın — 80 karakteri aşmamalıdır.'),
        numbered('Gövde metin bloklarında text-align özelliğini kontrol edin. justify olarak ayarlanmamış olmalıdır.'),
        numbered('Gövde metindeki line-height değerini inceleyin. En az 1.5 (%150) olmalıdır.'),
        numbered('Paragraflar arasındaki boşluğu kontrol edin. line-height değerinin en az 1.5 katı olmalıdır.'),
        numbered('Kullanıcının tarayıcı ayarları veya sağlanan bir arayüz mekanizması ile ön plan ve arka plan renklerini geçersiz kılıp kılamadığını test edin.'),

        heading('Nasıl Düzeltilir'),
        p('Siteniz genelinde okunabilir metin varsayılanları uygulayın:'),
        code('/* Okunabilir metin bloğu stili */\n.content-area {\n  /* Maksimum 80 karakter genişliğinde */\n  max-width: 70ch;\n\n  /* Tam iki yana yaslama yok */\n  text-align: left;\n\n  /* Satır aralığı en az 1.5 */\n  line-height: 1.6;\n}\n\n.content-area p {\n  margin-bottom: 1.5em;\n}\n\n/* Kullanıcı renk geçersiz kılmalarına izin verin — renklerde !important kullanmayın */\n.content-area {\n  color: var(--text-color, #1a1a2e);\n  background-color: var(--bg-color, #ffffff);\n}', 'css'),
        p('Renk özelleştirmesi için bir tema değiştirici sağlayın:'),
        code('<fieldset class="theme-switcher">\n  <legend>Okuma tercihleri</legend>\n  <label><input type="radio" name="theme" value="light" checked /> Açık</label>\n  <label><input type="radio" name="theme" value="dark" /> Koyu</label>\n  <label><input type="radio" name="theme" value="sepia" /> Sepya</label>\n  <label><input type="radio" name="theme" value="high-contrast" /> Yüksek Kontrast</label>\n</fieldset>', 'html'),

        heading('Sık Yapılan Hatalar'),
        bullet('Geniş ekranlarda tüm görüntü alanına yayılan ve 150+ karakter satır uzunluğu oluşturan tam genişlikli metin kapsayıcıları.'),
        bullet('Gövde metinde text-align: justify kullanarak düzensiz kelime aralığı ve beyaz boşluk ırmakları oluşturmak.'),
        bullet('1.5 minimumunun altında olan 1.2 veya "normal" (tipik olarak ~1.15) varsayılan line-height değeri.'),
        bullet('Satır aralığının 1.5 katından az olan yalnızca margin-bottom: 1em değerine sahip paragraflar.'),
        bullet('Metin renklerinde !important kullanarak kullanıcı stil sayfalarının bunları geçersiz kılmasını engellemek.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.8: Visual Presentation', url: 'https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html', source: 'W3C', language: 'en', _key: 'r148w3c1' },
      { title: 'WebAIM: Typefaces and Fonts', url: 'https://webaim.org/techniques/fonts/', source: 'WebAIM', language: 'en', _key: 'r148waim' },
      { title: 'Deque: Text Readability', url: 'https://dequeuniversity.com/checklists/web/text', source: 'Deque', language: 'en', _key: 'r148dequ' },
      { title: 'MDN: line-height - CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/line-height', source: 'MDN', language: 'en', _key: 'r148mdn1' },
      { title: 'Techniques for WCAG 2 - C21: Specifying line spacing in CSS', url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C21', source: 'W3C', language: 'en', _key: 'r148w3c2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.8 Visual Presentation – AAA Guide',
        metaDescription: 'Meet WCAG 1.4.8 Visual Presentation. Control line length, spacing, justification, and color customization for optimal text readability.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.8 Görsel Sunum – AAA Rehberi',
        metaDescription: 'WCAG 1.4.8 Görsel Sunum ölçütünü karşılayın. Satır uzunluğu, aralık, yaslama ve renk özelleştirmesini kontrol edin.',
      },
    },
  },

  // ─── 1.4.9 Images of Text (No Exception) ───
  {
    criterionNumber: '1.4.9',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['images', 'text', 'visual'],
    title: {
      en: 'Images of Text (No Exception)',
      tr: 'Metin Görselleri (İstisna Yok)',
    },
    description: {
      en: 'Images of text are only used for pure decoration or where a particular presentation of text is essential.',
      tr: 'Metin görselleri yalnızca salt dekorasyon amaçlı veya metnin belirli bir sunumunun zorunlu olduğu durumlarda kullanılır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.9 is the AAA-level strictening of 1.4.5. At AA level, images of text are acceptable if they are customizable or the presentation is essential. At AAA level, the customization exception is removed — images of text may only be used when the specific visual presentation is truly essential (such as a text sample demonstrating a specific typeface) or for pure decoration.'),
        p('In practical terms, this means virtually all text on the page must be rendered as HTML text styled with CSS. The only images of text permitted are logotypes and cases where the exact rendering is the information itself, like a screenshot showing a UI or a sample of historical calligraphy.'),

        heading('Why It Matters'),
        p('This criterion pushes the web toward full text flexibility. When all text is real HTML text, users can resize it, reflow it, change fonts, adjust colors, translate it, search it, and copy it. These are fundamental interactions that images of text make impossible or degraded.'),
        p('For organizations targeting AAA compliance (government services, educational institutions, healthcare portals), eliminating images of text ensures the broadest possible user accommodation.'),

        heading('Related axe-core Rules'),
        p('No automated axe-core rules exist for 1.4.9. Like 1.4.5, this requires manual inspection to identify images that contain text and determine whether the text presentation is truly essential.'),

        heading('How to Test'),
        numbered('Audit all images on the page using DevTools to identify images containing text.'),
        numbered('For each image of text, ask: Is this a logotype? If yes, it is exempt.'),
        numbered('For non-logo images of text, ask: Is the specific visual presentation the actual information? If showing what a typeface looks like, it is exempt. If it is a heading or button, it fails.'),
        numbered('Verify that no functional text (headings, buttons, navigation, labels) is rendered as images.'),

        heading('How to Fix'),
        p('Convert all remaining images of text to HTML. For complex visual effects, use modern CSS:'),
        code('/* Text effects that eliminate the need for images */\n.outlined-text {\n  -webkit-text-stroke: 2px #333;\n  color: transparent;\n  font-size: 4rem;\n  font-weight: 900;\n}\n\n.shadowed-text {\n  text-shadow:\n    3px 3px 0 #e0e0e0,\n    6px 6px 0 #c0c0c0;\n  font-size: 3rem;\n}\n\n.clipped-bg-text {\n  background: url(\'/img/texture.jpg\') center/cover;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  font-size: 5rem;\n  font-weight: 900;\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Using image banners with promotional text instead of HTML overlay text on background images.'),
        bullet('Rendering CTA buttons as images because of a specific font not available as a web font.'),
        bullet('Screenshots of text used for testimonials or quotes instead of styled blockquotes.'),
        bullet('Infographic titles and labels embedded in the image rather than as HTML overlays.'),
        bullet('Confusing "essential" with "preferred" — a design preference for an image-based heading is not essential.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.9, 1.4.5\'in AAA düzeyinde sıkılaştırılmış halidir. AA düzeyinde, metin görselleri özelleştirilebilir veya sunum zorunlu ise kabul edilir. AAA düzeyinde özelleştirme istisnası kaldırılır — metin görselleri yalnızca belirli görsel sunumun gerçekten zorunlu olduğu (belirli bir yazı tipini gösteren metin örneği gibi) veya salt dekorasyon durumlarında kullanılabilir.'),
        p('Pratikte bu, sayfadaki neredeyse tüm metnin CSS ile stillendirilmiş HTML metin olarak oluşturulması gerektiği anlamına gelir. İzin verilen tek metin görselleri logotipler ve tam oluşturmanın bilginin kendisi olduğu durumlardır.'),

        heading('Neden Önemlidir'),
        p('Bu ölçüt, webi tam metin esnekliğine doğru ilerletir. Tüm metin gerçek HTML metin olduğunda, kullanıcılar yeniden boyutlandırabilir, yeniden akıtabilir, yazı tiplerini değiştirebilir, renkleri ayarlayabilir, çevirebilir, arayabilir ve kopyalayabilir. Bunlar metin görsellerinin imkansız veya eksik hâle getirdiği temel etkileşimlerdir.'),
        p('AAA uyumluluğunu hedefleyen kuruluşlar için metin görsellerini ortadan kaldırmak, mümkün olan en geniş kullanıcı uyumluluğunu sağlar.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.9 için otomatik axe-core kuralı yoktur. 1.4.5 gibi, metin içeren görselleri tanımlamak ve metin sunumunun gerçekten zorunlu olup olmadığını belirlemek için manuel inceleme gerektirir.'),

        heading('Nasıl Test Edilir'),
        numbered('Metin içeren görselleri tanımlamak için DevTools kullanarak sayfadaki tüm görselleri denetleyin.'),
        numbered('Her metin görseli için sorun: Bu bir logotip mi? Evetse muaftır.'),
        numbered('Logo olmayan metin görselleri için sorun: Belirli görsel sunum gerçek bilgi mi? Bir yazı tipinin nasıl göründüğünü gösteriyorsa muaftır. Başlık veya düğmeyse başarısızdır.'),
        numbered('Hiçbir işlevsel metnin (başlıklar, düğmeler, gezinme, etiketler) görsel olarak oluşturulmadığını doğrulayın.'),

        heading('Nasıl Düzeltilir'),
        p('Kalan tüm metin görsellerini HTML\'ye dönüştürün. Karmaşık görsel efektler için modern CSS kullanın:'),
        code('/* Görsel ihtiyaçını ortadan kaldıran metin efektleri */\n.outlined-text {\n  -webkit-text-stroke: 2px #333;\n  color: transparent;\n  font-size: 4rem;\n  font-weight: 900;\n}\n\n.shadowed-text {\n  text-shadow:\n    3px 3px 0 #e0e0e0,\n    6px 6px 0 #c0c0c0;\n  font-size: 3rem;\n}\n\n.clipped-bg-text {\n  background: url(\'/img/texture.jpg\') center/cover;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  font-size: 5rem;\n  font-weight: 900;\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Arka plan görselleri üzerinde HTML kaplama metni yerine tanıtım metinli görsel afişler kullanmak.'),
        bullet('Web yazı tipi olarak mevcut olmayan belirli bir yazı tipi nedeniyle CTA düğmelerini görsel olarak oluşturmak.'),
        bullet('Stillendirilmiş blok alıntılar yerine referanslar veya alıntılar için metnin ekran görüntülerini kullanmak.'),
        bullet('HTML kaplamaları yerine görsele gömülen bilgi grafiği başlıkları ve etiketleri.'),
        bullet('"Zorunlu" ile "tercih edilen" kavramlarını karıştırmak — görsel tabanlı başlık için tasarım tercihi zorunlu değildir.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.9: Images of Text (No Exception)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html', source: 'W3C', language: 'en', _key: 'r149w3c1' },
      { title: 'WebAIM: Images - Appropriate Use', url: 'https://webaim.org/techniques/images/', source: 'WebAIM', language: 'en', _key: 'r149waim' },
      { title: 'Deque University: Images of Text', url: 'https://dequeuniversity.com/checklists/web/images', source: 'Deque', language: 'en', _key: 'r149dequ' },
      { title: 'MDN: -webkit-text-stroke', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke', source: 'MDN', language: 'en', _key: 'r149mdn1' },
      { title: 'CSS Tricks: Techniques for Accessible Text Over Images', url: 'https://css-tricks.com/design-considerations-text-images/', source: 'CSS-Tricks', language: 'en', _key: 'r149csst' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.9 Images of Text (No Exception) – Guide',
        metaDescription: 'Meet WCAG 1.4.9 Images of Text (No Exception). Eliminate all non-essential images of text using CSS techniques for AAA compliance.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.9 Metin Görselleri (İstisna Yok) – Rehber',
        metaDescription: 'WCAG 1.4.9 ölçütünü karşılayın. AAA uyumu için CSS teknikleriyle tüm zorunlu olmayan metin görsellerini ortadan kaldırın.',
      },
    },
  },

  // ─── 1.4.10 Reflow ─── (Comprehensive)
  {
    criterionNumber: '1.4.10',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['responsive', 'layout', 'zoom', 'mobile'],
    title: {
      en: 'Reflow',
      tr: 'Yeniden Akış',
    },
    description: {
      en: 'Content can be presented without loss of information or functionality and without requiring scrolling in two dimensions at 320 CSS pixels wide or 256 CSS pixels tall.',
      tr: 'İçerik, 320 CSS piksel genişliğinde veya 256 CSS piksel yüksekliğinde bilgi veya işlevsellik kaybı olmadan ve iki boyutlu kaydırma gerektirmeden sunulabilir.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.10 requires that content reflows to fit within a single dimension of scrolling when the viewport is narrowed to 320 CSS pixels wide (equivalent to a 1280px desktop viewport at 400% zoom). For vertical-scrolling content, horizontal scrolling must not be necessary. For horizontal-scrolling content (such as data tables or certain apps), vertical scrolling must not be necessary at 256 CSS pixels tall.'),
        p('This criterion directly connects zoom accessibility to responsive design. When a user zooms a desktop browser to 400%, the effective viewport width becomes 320 CSS pixels — identical to a narrow mobile viewport. If the site works well at mobile widths without horizontal scrolling, it likely meets this criterion. The key is that content must adapt, reflow, and reorganize itself rather than simply scaling up and overflowing.'),
        p('Exceptions exist for content where two-dimensional layout is essential for usage or meaning, such as data tables, toolbars, maps, diagrams, and some media players. These elements may require two-dimensional scrolling, but surrounding content must still reflow.'),

        heading('Why It Matters'),
        p('This criterion is essential for low-vision users who zoom their browsers significantly. Without reflow, zooming to 400% creates a tiny viewing window into a massive page, requiring constant horizontal scrolling to read every line. This makes reading content extremely laborious — the user must scroll right to finish each line, then scroll left and down to start the next line. Reflow eliminates this by stacking content vertically.'),
        p('Reflow also benefits mobile users, users with motor impairments who find two-directional scrolling difficult, and anyone using narrow browser windows. It represents the convergence of responsive design best practices and accessibility requirements.'),
        p('In accessibility audits, 1.4.10 failures are among the most commonly found AA-level issues alongside 1.4.3 contrast. Many sites that appear mobile-friendly still break at true 320px-wide viewports because they target common device widths (375px, 390px) rather than the WCAG-required 320px.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules specifically for 1.4.10 Reflow. This criterion requires manual testing at specific viewport sizes because automated tools cannot reliably determine whether content loss or horizontal scrolling issues are present. However, related rules like meta-viewport contribute to reflow support.'),

        heading('How to Test'),
        numbered('In Chrome DevTools, open the Device toolbar (Ctrl+Shift+M / Cmd+Shift+M) and set a custom viewport of 320px wide with no height restriction.'),
        numbered('Alternatively, zoom the desktop browser to 400% (1280px / 4 = 320px effective width).'),
        numbered('Scroll through the entire page vertically. No horizontal scrollbar should appear and no content should be hidden off-screen to the right.'),
        numbered('Verify that all interactive elements are usable: buttons are tappable, form fields are accessible, navigation works.'),
        numbered('Check that no text is clipped, truncated, or overlapping other content.'),
        numbered('Test both orientations if the content has a horizontal layout variant.'),
        numbered('For data tables, verify they either convert to a stacked layout, use a horizontally scrollable container (while surrounding content reflows), or provide a responsive alternative view.'),
        numbered('Test key user flows: navigation, search, forms, checkout — ensure every step works at 320px wide.'),

        heading('How to Fix'),
        p('Build with a mobile-first responsive approach. Design for 320px minimum width from the start:'),
        code('/* Mobile-first base styles (320px minimum) */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n\n/* Stack grid items on narrow viewports */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n\n@media (min-width: 640px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}', 'css'),
        p('Handle navigation responsively — collapse to a mobile menu at narrow widths:'),
        code('<nav aria-label="Main navigation">\n  <button\n    class="menu-toggle"\n    aria-expanded="false"\n    aria-controls="nav-menu"\n  >\n    <span class="sr-only">Menu</span>\n    <svg aria-hidden="true"><!-- hamburger icon --></svg>\n  </button>\n  <ul id="nav-menu" class="nav-list" role="list">\n    <li><a href="/about">About</a></li>\n    <li><a href="/services">Services</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>', 'html'),
        code('/* Navigation reflow */\n.nav-list {\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n}\n\n.nav-list[aria-expanded="true"],\n.menu-toggle[aria-expanded="true"] + .nav-list {\n  display: flex;\n}\n\n.menu-toggle {\n  display: block;\n}\n\n@media (min-width: 768px) {\n  .nav-list {\n    display: flex;\n    flex-direction: row;\n    position: static;\n  }\n  .menu-toggle {\n    display: none;\n  }\n}', 'css'),
        p('Handle data tables with responsive patterns:'),
        code('/* Responsive table: horizontal scroll within a container */\n.table-wrapper {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  max-width: 100%;\n}\n\n/* Alternative: stacked layout for simple tables */\n@media (max-width: 640px) {\n  .responsive-table thead {\n    display: none;\n  }\n  .responsive-table tr {\n    display: block;\n    margin-bottom: 1rem;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    padding: 0.5rem;\n  }\n  .responsive-table td {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.25rem 0;\n  }\n  .responsive-table td::before {\n    content: attr(data-label);\n    font-weight: 700;\n    margin-right: 1rem;\n  }\n}', 'css'),
        p('Avoid fixed-width elements that prevent reflow:'),
        code('/* Avoid fixed widths */\n.sidebar {\n  /* Bad: width: 300px; — prevents reflow */\n  /* Good: responsive approach */\n  width: 100%;\n}\n\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 1fr 300px;\n  }\n}\n\n/* Use max-width instead of width for images */\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Prevent horizontal overflow from code blocks */\npre, code {\n  overflow-x: auto;\n  max-width: 100%;\n  word-wrap: break-word;\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Fixed-width layouts or containers that do not adapt below 375px, causing horizontal scroll at 320px.'),
        bullet('Navigation bars that do not collapse to a hamburger menu, overflowing horizontally on narrow viewports.'),
        bullet('Hero sections with fixed pixel dimensions and absolutely positioned text that overlaps at narrow widths.'),
        bullet('Images without max-width: 100% that extend beyond the viewport.'),
        bullet('CSS that uses vw units for font sizes or widths without a minimum bound, causing content to become unreadable.'),
        bullet('Sticky headers or footers with fixed heights that consume excessive viewport space at 400% zoom.'),
        bullet('Two-column forms that do not stack to single-column at narrow widths.'),
        bullet('Horizontal carousels or sliders that are the sole means of accessing content (content must be accessible without the carousel pattern at narrow widths).'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.10, görüntü alanı 320 CSS piksel genişliğe daraltıldığında (400% yakınlaştırmada 1280px masaüstü görüntü alanına eşdeğer) içeriğin tek boyutlu kaydırmayla sığacak şekilde yeniden akmasını gerektirir. Dikey kaydırmalı içerik için yatay kaydırma gerekli olmamalıdır. Yatay kaydırmalı içerik için (veri tabloları veya belirli uygulamalar gibi) 256 CSS piksel yükseklikte dikey kaydırma gerekli olmamalıdır.'),
        p('Bu ölçüt, yakınlaştırma erişilebilirliğini doğrudan duyarlı tasarıma bağlar. Bir kullanıcı masaüstü tarayıcıyı %400 yakınlaştırdığında, etkin görüntü alanı genişliği 320 CSS piksel olur — dar bir mobil görüntü alanıyla aynı. Site mobil genişliklerde yatay kaydırma olmadan iyi çalışıyorsa, muhtemelen bu ölçütü karşılar.'),
        p('İki boyutlu düzenin kullanım veya anlam için zorunlu olduğu içerikler için istisnalar mevcuttur: veri tabloları, araç çubukları, haritalar, diyagramlar ve bazı medya oynatıcılar. Bu öğeler iki boyutlu kaydırma gerektirebilir, ancak çevreleyen içerik yine de yeniden akmalıdır.'),

        heading('Neden Önemlidir'),
        p('Bu ölçüt, tarayıcılarını önemli ölçüde yakınlaştıran düşük görüşlü kullanıcılar için hayati önem taşır. Yeniden akış olmadan %400 yakınlaştırma, devasa bir sayfaya küçük bir görüntüleme penceresi oluşturur ve her satırı okumak için sürekli yatay kaydırma gerektirir. Kullanıcı her satırı bitirmek için sağa, sonraki satıra başlamak için sola ve aşağı kaydırmalıdır. Yeniden akış, içeriği dikey olarak istifleyerek bunu ortadan kaldırır.'),
        p('Yeniden akış ayrıca mobil kullanıcılara, iki yönlü kaydırmayı zor bulan motor bozukluğu olan kullanıcılara ve dar tarayıcı pencereleri kullanan herkese yarar sağlar. Duyarlı tasarım en iyi uygulamalarının ve erişilebilirlik gereksinimlerinin birleşimini temsil eder.'),
        p('Erişilebilirlik denetimlerinde, 1.4.10 başarısızlıkları 1.4.3 kontrast ile birlikte en sık bulunan AA düzeyindeki sorunlar arasındadır. Mobil dostu görünen birçok site, yaygın cihaz genişliklerini (375px, 390px) hedeflediklerinden WCAG gerektiren 320px\'de bozulur.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.10 Yeniden Akış için özel olarak otomatik axe-core kuralı yoktur. Otomatik araçlar içerik kaybı veya yatay kaydırma sorunlarının mevcut olup olmadığını güvenilir biçimde belirleyemediğinden, bu ölçüt belirli görüntü alanı boyutlarında manuel test gerektirir.'),

        heading('Nasıl Test Edilir'),
        numbered('Chrome DevTools\'ta Cihaz araç çubuğunu açın (Ctrl+Shift+M / Cmd+Shift+M) ve yükseklik kısıtlaması olmadan 320px genişliğinde özel bir görüntü alanı ayarlayın.'),
        numbered('Alternatif olarak masaüstü tarayıcıyı %400 yakınlaştırın (1280px / 4 = 320px etkin genişlik).'),
        numbered('Sayfanın tamamını dikey olarak kaydırın. Yatay kaydırma çubuğu görünmemeli ve hiçbir içerik ekranın sağ tarafında gizli olmamalıdır.'),
        numbered('Tüm etkileşimli öğelerin kullanılabilir olduğunu doğrulayın: düğmeler dokunulabilir, form alanları erişilebilir, gezinme çalışıyor.'),
        numbered('Hiçbir metnin kırpılmadığını, kesilmediğini veya diğer içerikle örtüşmediğini kontrol edin.'),
        numbered('İçeriğin yatay düzen varyantı varsa her iki yönü de test edin.'),
        numbered('Veri tabloları için, istiflenmiş düzene dönüştüklerini, yatay kaydırılabilir bir kapsayıcı kullandıklarını veya duyarlı bir alternatif görünüm sağladıklarını doğrulayın.'),
        numbered('Temel kullanıcı akışlarını test edin: gezinme, arama, formlar, ödeme — her adımın 320px genişlikte çalıştığından emin olun.'),

        heading('Nasıl Düzeltilir'),
        p('Mobil öncelikli duyarlı bir yaklaşımla oluşturun. Baştan 320px minimum genişlik için tasarlayın:'),
        code('/* Mobil öncelikli temel stiller (320px minimum) */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n\n/* Dar görüntü alanlarında ızgara öğelerini istifleyin */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n\n@media (min-width: 640px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}', 'css'),
        p('Gezinmeyi duyarlı biçimde ele alın — dar genişliklerde mobil menüye daraltın:'),
        code('<nav aria-label="Ana gezinme">\n  <button\n    class="menü-toggle"\n    aria-expanded="false"\n    aria-controls="nav-menü"\n  >\n    <span class="sr-only">Menü</span>\n    <svg aria-hidden="true"><!-- hamburger simgesi --></svg>\n  </button>\n  <ul id="nav-menü" class="nav-list" role="list">\n    <li><a href="/hakkımızda">Hakkımızda</a></li>\n    <li><a href="/hizmetler">Hizmetler</a></li>\n    <li><a href="/iletişim">İletişim</a></li>\n  </ul>\n</nav>', 'html'),
        code('/* Gezinme yeniden akışı */\n.nav-list {\n  display: none;\n  flex-direction: column;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n}\n\n.menü-toggle[aria-expanded="true"] + .nav-list {\n  display: flex;\n}\n\n.menü-toggle {\n  display: block;\n}\n\n@media (min-width: 768px) {\n  .nav-list {\n    display: flex;\n    flex-direction: row;\n    position: static;\n  }\n  .menü-toggle {\n    display: none;\n  }\n}', 'css'),
        p('Veri tablolarını duyarlı kalıplarla ele alın:'),
        code('/* Duyarlı tablo: kapsayıcı içinde yatay kaydırma */\n.table-wrapper {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  max-width: 100%;\n}\n\n/* Alternatif: basit tablolar için istiflenmiş düzen */\n@media (max-width: 640px) {\n  .responsive-table thead {\n    display: none;\n  }\n  .responsive-table tr {\n    display: block;\n    margin-bottom: 1rem;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    padding: 0.5rem;\n  }\n  .responsive-table td {\n    display: flex;\n    justify-content: space-between;\n    padding: 0.25rem 0;\n  }\n  .responsive-table td::before {\n    content: attr(data-label);\n    font-weight: 700;\n    margin-right: 1rem;\n  }\n}', 'css'),
        p('Yeniden akışı engelleyen sabit genişlikli öğelerden kaçının:'),
        code('/* Sabit genişliklerden kaçının */\n.sidebar {\n  /* Kötü: width: 300px; — yeniden akışı engeller */\n  /* İyi: duyarlı yaklaşım */\n  width: 100%;\n}\n\n@media (min-width: 768px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 1fr 300px;\n  }\n}\n\n/* Görseller için width yerine max-width kullanın */\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Kod bloklarından yatay taşmayı önleyin */\npre, code {\n  overflow-x: auto;\n  max-width: 100%;\n  word-wrap: break-word;\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('375px altına uyum sağlamayan sabit genişlikli düzenler veya kapsayıcılar, 320px\'de yatay kaydırmaya neden olur.'),
        bullet('Hamburger menüye daralmayan gezinme çubukları, dar görüntü alanlarında yatay taşma yapar.'),
        bullet('Sabit piksel boyutlarına sahip ve dar genişliklerde örtüşen mutlak konumlandırılmış metin içeren kahraman bölümleri.'),
        bullet('max-width: 100% olmayan ve görüntü alanının ötesine uzanan görseller.'),
        bullet('Minimum sınır olmadan yazı tipi boyutları veya genişlikler için vw birimleri kullanan ve içeriği okunamaz hâle getiren CSS.'),
        bullet('%400 yakınlaştırmada aşırı görüntü alanı alanı tüketen sabit yükseklikli yapışkan üst bilgiler veya alt bilgiler.'),
        bullet('Dar genişliklerde tek sütuna istiflenmeyen iki sütunlu formlar.'),
        bullet('İçeriğe erişmenin tek yolu olan yatay döngüler veya kaydırıcılar (içerik dar genişliklerde döngü kalıbı olmadan erişilebilir olmalıdır).'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.10: Reflow', url: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html', source: 'W3C', language: 'en', _key: 'r1410w3c' },
      { title: 'WebAIM: Responsive Design and Zoom', url: 'https://webaim.org/techniques/responsivedesign/', source: 'WebAIM', language: 'en', _key: 'r1410wai' },
      { title: 'Deque: WCAG 2.1 Reflow', url: 'https://dequeuniversity.com/rules/axe/4.8/meta-viewport', source: 'Deque', language: 'en', _key: 'r1410deq' },
      { title: 'MDN: Responsive design', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design', source: 'MDN', language: 'en', _key: 'r1410mdn' },
      { title: 'Techniques for WCAG 2 - C31: Using CSS Flexbox', url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C31', source: 'W3C', language: 'en', _key: 'r1410w32' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.10 Reflow – Accessibility Guide',
        metaDescription: 'Master WCAG 1.4.10 Reflow. Ensure content works at 320px width without horizontal scrolling using responsive CSS grid, flexbox, and mobile-first design.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.10 Yeniden Akış – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.10 Yeniden Akış ölçütünde ustalaşın. Duyarlı CSS grid, flexbox ve mobil öncelikli tasarımla 320px genişlikte içeriğin çalışmasını sağlayın.',
      },
    },
  },

  // ─── 1.4.11 Non-text Contrast ───
  {
    criterionNumber: '1.4.11',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['color', 'contrast', 'ui-components', 'graphics'],
    title: {
      en: 'Non-text Contrast',
      tr: 'Metin Dışı Kontrast',
    },
    description: {
      en: 'User interface components and graphical objects have a contrast ratio of at least 3:1 against adjacent colors.',
      tr: 'Kullanıcı arayüzü bileşenleri ve grafik nesneler, bitişik renklere karşı en az 3:1 kontrast oranına sahip olmalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.11 extends contrast requirements beyond text to cover two categories: user interface components (form controls, buttons, links, focus indicators) and meaningful graphical objects (icons, charts, infographics). Both must achieve a minimum 3:1 contrast ratio against adjacent colors needed to identify them.'),
        p('For UI components, this means the visual boundary or indicator that identifies the component must have 3:1 contrast against the background. A text input, for instance, needs its border to be distinguishable from the surrounding area. For graphical objects, the parts of the image that convey meaning must have sufficient contrast against adjacent elements.'),
        p('Exceptions include inactive components (disabled buttons), components whose appearance is determined by the user agent (unstyled browser defaults), and graphics where a specific color presentation is essential (flags, logos, photographs).'),

        heading('Why It Matters'),
        p('Users with low vision need to identify interactive elements and understand graphical information. If a form field has a barely visible border, a user may not realize it is an input. If a chart uses low-contrast segments, the data becomes indistinguishable. The 3:1 ratio ensures these non-text elements are perceivable under normal viewing conditions.'),
        p('Focus indicators are especially critical — if the keyboard focus ring does not meet 3:1 contrast, keyboard-only users cannot track where they are on the page.'),

        heading('Related axe-core Rules'),
        p('There are currently no automated axe-core rules specifically for 1.4.11 because evaluating non-text contrast requires understanding the visual context of each UI component and graphic. This is primarily a manual testing criterion, though some tools can flag potential issues.'),

        heading('How to Test'),
        numbered('Identify all interactive UI components: buttons, inputs, selects, checkboxes, radio buttons, sliders, toggles, links, tabs.'),
        numbered('For each component, check the contrast of its visual boundary against the adjacent background using a color contrast tool.'),
        numbered('Test focus indicators. Tab through the page and verify the focus ring or indicator has at least 3:1 contrast against the background.'),
        numbered('Check meaningful icons and graphical elements. Use a color picker to compare the icon color against its background.'),
        numbered('Verify chart elements (bars, lines, pie segments) have 3:1 contrast against adjacent colors.'),

        heading('How to Fix'),
        p('Ensure form controls have visible, high-contrast borders:'),
        code('/* Accessible form input styling */\ninput, select, textarea {\n  border: 2px solid #595959; /* 7:1 against white */\n  border-radius: 4px;\n  padding: 0.5rem 0.75rem;\n  background: #ffffff;\n}\n\n/* Custom checkbox with sufficient contrast */\n.checkbox-custom {\n  width: 1.25rem;\n  height: 1.25rem;\n  border: 2px solid #4a4a4a; /* 9.7:1 against white */\n  border-radius: 3px;\n  background: #ffffff;\n}\n\n.checkbox-custom:checked {\n  background: #0055b8;\n  border-color: #0055b8;\n}', 'css'),
        p('Ensure focus indicators meet the 3:1 requirement:'),
        code('/* High-contrast focus indicator */\n:focus-visible {\n  outline: 3px solid #0055b8; /* 7.04:1 on white */\n  outline-offset: 2px;\n}\n\n/* On dark backgrounds */\n.dark-section :focus-visible {\n  outline: 3px solid #6eb5ff; /* 7.52:1 on #121212 */\n  outline-offset: 2px;\n}', 'css'),
        p('Ensure icons and graphical elements have sufficient contrast:'),
        code('/* Icon contrast */\n.icon {\n  color: #595959; /* 7:1 against white */\n  /* Avoid light gray icons like #ccc (1.6:1) or #aaa (2.3:1) */\n}\n\n/* Chart bars with sufficient contrast */\n.chart-bar-primary { fill: #0055b8; }   /* 7:1 on white */\n.chart-bar-secondary { fill: #c62828; } /* 6.2:1 on white */\n.chart-bar-tertiary { fill: #1b5e20; }  /* 7.8:1 on white */\n\n/* Chart bars must also contrast with each other if adjacent */\n/* Use patterns as additional differentiator */\n.chart-bar-secondary {\n  fill: url(#diagonal-stripe);\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Minimalist form inputs with no visible border or a very light border like 1px solid #e0e0e0 (1.3:1 against white).'),
        bullet('Custom checkboxes and radio buttons with insufficient border contrast in their unchecked state.'),
        bullet('Focus indicators removed with outline: none without providing a sufficient replacement.'),
        bullet('Light gray icons (#ccc or #aaa) that are barely visible against a white background.'),
        bullet('Chart segments that are distinguishable from each other only by color, with no contrast against adjacent segments.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.11, kontrast gereksinimlerini metin ötesinde iki kategoriyi kapsayacak şekilde genişletir: kullanıcı arayüzü bileşenleri (form kontrolleri, düğmeler, bağlantılar, odak göstergeleri) ve anlamlı grafik nesneler (simgeler, grafikler, bilgi grafikleri). Her ikisi de tanımlanmak için gereken bitişik renklere karşı minimum 3:1 kontrast oranına ulaşmalıdır.'),
        p('Kullanıcı arayüzü bileşenleri için bu, bileşeni tanımlayan görsel sınır veya göstergenin arka plana karşı 3:1 kontrasta sahip olması gerektiği anlamına gelir. Grafik nesneler için, görselin anlam taşıyan kısımları bitişik öğelere karşı yeterli kontrasta sahip olmalıdır.'),
        p('İstisnalar arasında pasif bileşenler (devre dışı düğmeler), görünümü kullanıcı aracısı tarafından belirlenen bileşenler ve belirli renk sunumunun zorunlu olduğu grafikler (bayraklar, logolar, fotoğraflar) bulunur.'),

        heading('Neden Önemlidir'),
        p('Düşük görüşlü kullanıcıların etkileşimli öğeleri tanımlayabilmesi ve grafik bilgileri anlayabilmesi gerekir. Bir form alanının zar zor görülebilen bir kenarlığı varsa, kullanıcı bunun bir giriş alanı olduğunu fark etmeyebilir. Bir grafik düşük kontrastlı segmentler kullanıyorsa, veriler ayırt edilemez hâle gelir.'),
        p('Odak göstergeleri özellikle kritiktir — klavye odak halkası 3:1 kontrastı karşılamıyorsa, yalnızca klavye kullanan kullanıcılar sayfada nerede olduklarını takip edemez.'),

        heading('İlgili axe-core Kuralları'),
        p('Metin dışı kontrastı değerlendirmek her kullanıcı arayüzü bileşeni ve grafiğin görsel bağlamını anlamayı gerektirdiğinden, şu anda 1.4.11 için özellikle otomatik axe-core kuralı yoktur. Bu esas olarak manuel test ölçütüdür.'),

        heading('Nasıl Test Edilir'),
        numbered('Tüm etkileşimli kullanıcı arayüzü bileşenlerini tanımlayın: düğmeler, giriş alanları, seçim kutuları, onay kutuları, radyo düğmeleri, kaydırıcılar, aç/kapa düğmeleri, bağlantılar, sekmeler.'),
        numbered('Her bileşen için, renk kontrast aracı kullanarak görsel sınırının bitişik arka plana karşı kontrastını kontrol edin.'),
        numbered('Odak göstergelerini test edin. Sayfada sekme tuşuyla ilerleyin ve odak halkasının arka plana karşı en az 3:1 kontrasta sahip olduğunu doğrulayın.'),
        numbered('Anlamlı simgeleri ve grafik öğeleri kontrol edin. Simge rengini arka planıyla karşılaştırmak için renk seçici kullanın.'),
        numbered('Grafik öğelerinin (çubuklar, çizgiler, pasta dilimleri) bitişik renklere karşı 3:1 kontrasta sahip olduğunu doğrulayın.'),

        heading('Nasıl Düzeltilir'),
        p('Form kontrollerinin görünür, yüksek kontrastlı kenarlıklara sahip olmasını sağlayın:'),
        code('/* Erişilebilir form giriş alanı stili */\ninput, select, textarea {\n  border: 2px solid #595959; /* Beyaz üzerinde 7:1 */\n  border-radius: 4px;\n  padding: 0.5rem 0.75rem;\n  background: #ffffff;\n}\n\n/* Yeterli kontrastlı özel onay kutusu */\n.checkbox-custom {\n  width: 1.25rem;\n  height: 1.25rem;\n  border: 2px solid #4a4a4a; /* Beyaz üzerinde 9.7:1 */\n  border-radius: 3px;\n  background: #ffffff;\n}\n\n.checkbox-custom:checked {\n  background: #0055b8;\n  border-color: #0055b8;\n}', 'css'),
        p('Odak göstergelerinin 3:1 gereksinimini karşılamasını sağlayın:'),
        code('/* Yüksek kontrastlı odak göstergesi */\n:focus-visible {\n  outline: 3px solid #0055b8; /* Beyaz üzerinde 7.04:1 */\n  outline-offset: 2px;\n}\n\n/* Koyu arka planlarda */\n.dark-section :focus-visible {\n  outline: 3px solid #6eb5ff; /* #121212 üzerinde 7.52:1 */\n  outline-offset: 2px;\n}', 'css'),
        p('Simge ve grafik öğelerin yeterli kontrasta sahip olmasını sağlayın:'),
        code('/* Simge kontrastı */\n.icon {\n  color: #595959; /* Beyaz üzerinde 7:1 */\n  /* #ccc (1.6:1) veya #aaa (2.3:1) gibi açık gri simgelerden kaçının */\n}\n\n/* Yeterli kontrastlı grafik çubukları */\n.chart-bar-primary { fill: #0055b8; }   /* Beyaz üzerinde 7:1 */\n.chart-bar-secondary { fill: #c62828; } /* Beyaz üzerinde 6.2:1 */\n.chart-bar-tertiary { fill: #1b5e20; }  /* Beyaz üzerinde 7.8:1 */', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Görünür kenarlığı olmayan veya 1px solid #e0e0e0 (beyaz üzerinde 1.3:1) gibi çok açık kenarlığı olan minimalist form giriş alanları.'),
        bullet('İşaretlenmemiş durumda yetersiz kenarlık kontrastına sahip özel onay kutuları ve radyo düğmeleri.'),
        bullet('Yeterli bir yedek sağlamadan outline: none ile kaldırılan odak göstergeleri.'),
        bullet('Beyaz arka plan üzerinde zar zor görülebilen açık gri simgeler (#ccc veya #aaa).'),
        bullet('Bitişik segmentlere karşı kontrast olmadan yalnızca renkle birbirinden ayırt edilebilen grafik segmentleri.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.11: Non-text Contrast', url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html', source: 'W3C', language: 'en', _key: 'r1411w3c' },
      { title: 'WebAIM: Contrast and Color Accessibility', url: 'https://webaim.org/articles/contrast/', source: 'WebAIM', language: 'en', _key: 'r1411wai' },
      { title: 'Deque: Non-text Contrast Guide', url: 'https://dequeuniversity.com/checklists/web/color-contrast', source: 'Deque', language: 'en', _key: 'r1411deq' },
      { title: 'MDN: outline - CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/outline', source: 'MDN', language: 'en', _key: 'r1411mdn' },
      { title: 'Techniques for WCAG 2 - G209: Sufficient contrast for active UI', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G209', source: 'W3C', language: 'en', _key: 'r1411w32' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.11 Non-text Contrast – Accessibility Guide',
        metaDescription: 'Meet WCAG 1.4.11 Non-text Contrast. Ensure UI components, focus indicators, and graphics meet the 3:1 ratio with CSS examples.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.11 Metin Dışı Kontrast – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.11 Metin Dışı Kontrast ölçütünü karşılayın. Arayüz bileşenleri, odak göstergeleri ve grafiklerin 3:1 oranını sağlayın.',
      },
    },
  },

  // ─── 1.4.12 Text Spacing ───
  {
    criterionNumber: '1.4.12',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['text', 'spacing', 'css', 'layout'],
    title: {
      en: 'Text Spacing',
      tr: 'Metin Aralığı',
    },
    description: {
      en: 'No loss of content or functionality occurs when users override text spacing: line height to 1.5x, paragraph spacing to 2x, letter spacing to 0.12em, and word spacing to 0.16em.',
      tr: 'Kullanıcılar metin aralığını geçersiz kıldığında içerik veya işlevsellik kaybı oluşmaz: satır yüksekliği 1.5x, paragraf aralığı 2x, harf aralığı 0.12em ve kelime aralığı 0.16em.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.12 requires that no content or functionality is lost when a user applies the following text spacing overrides simultaneously: line height (line-height) at least 1.5 times the font size, paragraph spacing (margin-bottom on paragraphs) at least 2 times the font size, letter spacing (letter-spacing) at least 0.12 times the font size, and word spacing (word-spacing) at least 0.16 times the font size.'),
        p('This criterion exists because many users with dyslexia, low vision, or cognitive disabilities need to increase text spacing for readability. They may use browser extensions, user style sheets, or custom CSS injected via bookmarklets to override the page\'s spacing. The page must not break when these adjustments are made — no clipped text, no overlapping elements, no hidden content.'),

        heading('Why It Matters'),
        p('Research shows that increased text spacing significantly improves reading speed and comprehension for people with dyslexia. Tighter letter and word spacing causes letters and words to visually merge, making reading exhausting. Increased line height helps users track from line to line without losing their place. These are not cosmetic preferences — they are functional accommodations.'),
        p('Users typically apply these overrides through browser extensions like "Text Spacing Editor" or through custom user style sheets. If the page layout collapses when spacing is increased, these users lose access to the content entirely.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules for 1.4.12. Testing requires applying specific CSS overrides and manually checking for content loss. The community has created bookmarklets specifically for this test.'),

        heading('How to Test'),
        numbered('Apply the following CSS overrides to the page using a bookmarklet, browser extension, or DevTools:'),
        code('/* Text spacing test override — apply all simultaneously */\n* {\n  line-height: 1.5 !important;\n  letter-spacing: 0.12em !important;\n  word-spacing: 0.16em !important;\n}\n\np {\n  margin-bottom: 2em !important;\n}', 'css'),
        numbered('Scan the entire page for content that is now clipped, truncated, overlapping, or hidden.'),
        numbered('Check that all interactive controls remain usable and visible.'),
        numbered('Verify that navigation items, buttons, and form labels are still fully readable.'),
        numbered('Pay special attention to fixed-height containers, badge/chip components, and header bars — these are the most likely to break.'),

        heading('How to Fix'),
        p('Design containers to be flexible enough to accommodate text spacing changes:'),
        code('/* Flexible container approach */\n.card {\n  /* Use min-height, never fixed height */\n  min-height: 200px;\n  /* height: 200px; <-- BREAKS with text spacing */\n\n  /* Use padding, not fixed dimensions */\n  padding: 1.5rem;\n\n  /* Allow content to push boundaries */\n  overflow: visible;\n  /* overflow: hidden; <-- CLIPS content with spacing */\n}\n\n.button {\n  /* Use padding for sizing, not fixed height */\n  padding: 0.75em 1.5em;\n  /* height: 40px; <-- BREAKS with text spacing */\n\n  /* Allow text to wrap if needed */\n  white-space: normal;\n  /* white-space: nowrap; <-- CLIPS with letter-spacing */\n}\n\n.nav-item {\n  /* Flexible padding accommodates spacing changes */\n  padding: 0.5em 1em;\n  /* Do not rely on exact pixel widths */\n}', 'css'),
        p('Avoid CSS properties that fight against text spacing overrides:'),
        code('/* Properties to avoid or use carefully */\n\n/* BAD: Fixed line-height in pixels */\n.text { line-height: 18px; }\n/* GOOD: Relative line-height */\n.text { line-height: 1.5; }\n\n/* BAD: Overflow hidden on text containers */\n.container { overflow: hidden; }\n/* GOOD: Visible or auto overflow */\n.container { overflow: visible; }\n\n/* BAD: Fixed-height inline elements */\n.badge { height: 24px; line-height: 24px; }\n/* GOOD: Padding-based sizing */\n.badge { padding: 0.125em 0.5em; }', 'css'),
        p('Test with the spacing bookmarklet during development, not just at the end:'),
        code('/* Add this bookmarklet to your browser toolbar for quick testing */\n/* javascript:(function(){var css=\'* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }\';var style=document.createElement(\'style\');style.textContent=css;document.head.appendChild(style);})(); */', 'javascript'),

        heading('Common Mistakes'),
        bullet('Fixed-height containers with overflow: hidden that clip text when line-height increases.'),
        bullet('Badge or chip components with exact pixel heights that overflow when letter-spacing is applied.'),
        bullet('Navigation items with fixed widths that truncate text labels when word-spacing is increased.'),
        bullet('Line-height set in pixels rather than unitless values, preventing proper scaling.'),
        bullet('Tooltip or popup text that overflows its container when spacing is applied.'),
        bullet('CSS clamp() or max() on font sizes without testing the effect on spacing overrides.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.12, kullanıcı aşağıdaki metin aralığı geçersiz kılmalarını aynı anda uyguladığında hiçbir içerik veya işlevsellik kaybı olmamasını gerektirir: satır yüksekliği (line-height) yazı boyutunun en az 1.5 katı, paragraf aralığı (paragraflarda margin-bottom) yazı boyutunun en az 2 katı, harf aralığı (letter-spacing) yazı boyutunun en az 0.12 katı ve kelime aralığı (word-spacing) yazı boyutunun en az 0.16 katı.'),
        p('Bu ölçüt, disleksi, düşük görme veya bilişsel engelleri olan birçok kullanıcının okunabilirlik için metin aralığını artırması gerektiği için vardır. Tarayıcı eklentileri, kullanıcı stil sayfaları veya yer imleri aracılığıyla enjekte edilen özel CSS kullanabilirler. Bu ayarlamalar yapıldığında sayfa bozulmamalıdır.'),

        heading('Neden Önemlidir'),
        p('Araştırmalar, artırılmış metin aralığının disleksili kişiler için okuma hızını ve anlama becerisini önemli ölçüde iyileştirdiğini göstermektedir. Daha dar harf ve kelime aralığı, harflerin ve kelimelerin görsel olarak birleşmesine neden olarak okumayı yorucu hâle getirir. Artırılmış satır yüksekliği, kullanıcıların yerlerini kaybetmeden satırdan satıra takip etmelerine yardımcı olur.'),
        p('Kullanıcılar genellikle bu geçersiz kılmaları "Text Spacing Editor" gibi tarayıcı eklentileri veya özel kullanıcı stil sayfaları aracılığıyla uygular. Aralık artırıldığında sayfa düzeni çökerse, bu kullanıcılar içeriğe tamamen erişimini kaybeder.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.12 için otomatik axe-core kuralı yoktur. Test, belirli CSS geçersiz kılmalarının uygulanmasını ve içerik kaybı için manuel kontrol yapılmasını gerektirir.'),

        heading('Nasıl Test Edilir'),
        numbered('Bir yer imi, tarayıcı eklentisi veya DevTools kullanarak sayfaya aşağıdaki CSS geçersiz kılmalarını uygulayın:'),
        code('/* Metin aralığı test geçersiz kılması — tümünü aynı anda uygulayın */\n* {\n  line-height: 1.5 !important;\n  letter-spacing: 0.12em !important;\n  word-spacing: 0.16em !important;\n}\n\np {\n  margin-bottom: 2em !important;\n}', 'css'),
        numbered('Tüm sayfayı tarayarak artık kırpılan, kesilen, örtüşen veya gizlenen içeriği arayın.'),
        numbered('Tüm etkileşimli kontrollerin kullanılabilir ve görünür kaldığını kontrol edin.'),
        numbered('Gezinme öğelerinin, düğmelerin ve form etiketlerinin hâlâ tamamen okunabilir olduğunu doğrulayın.'),
        numbered('Sabit yükseklikli kapsayıcılara, rozet/çip bileşenlerine ve başlık çubuklarına özellikle dikkat edin — bunlar bozulma olasılığı en yüksek olanlardır.'),

        heading('Nasıl Düzeltilir'),
        p('Metin aralığı değişikliklerini barındıracak kadar esnek kapsayıcılar tasarlayın:'),
        code('/* Esnek kapsayıcı yaklaşımı */\n.card {\n  /* Sabit yükseklik değil min-height kullanın */\n  min-height: 200px;\n  /* height: 200px; <-- Metin aralığıyla BOZULUR */\n\n  /* Sabit boyutlar değil dolgu kullanın */\n  padding: 1.5rem;\n\n  /* İçeriğin sınırları itmesine izin verin */\n  overflow: visible;\n  /* overflow: hidden; <-- Aralıkla içeriği KIRPAR */\n}\n\n.button {\n  /* Boyutlandırma için sabit yükseklik değil dolgu kullanın */\n  padding: 0.75em 1.5em;\n  /* height: 40px; <-- Metin aralığıyla BOZULUR */\n\n  /* Gerekirse metnin sarılmasına izin verin */\n  white-space: normal;\n  /* white-space: nowrap; <-- letter-spacing ile KIRPAR */\n}', 'css'),
        p('Metin aralığı geçersiz kılmalarına karşı çalışan CSS özelliklerinden kaçının:'),
        code('/* Kaçınılması veya dikkatli kullanılması gereken özellikler */\n\n/* KÖTÜ: Pikselde sabit satır yüksekliği */\n.text { line-height: 18px; }\n/* İYİ: Göreceli satır yüksekliği */\n.text { line-height: 1.5; }\n\n/* KÖTÜ: Metin kapsayıcılarında gizli taşma */\n.container { overflow: hidden; }\n/* İYİ: Görünür veya otomatik taşma */\n.container { overflow: visible; }\n\n/* KÖTÜ: Sabit yükseklikli satır içi öğeler */\n.badge { height: 24px; line-height: 24px; }\n/* İYİ: Dolgu tabanlı boyutlandırma */\n.badge { padding: 0.125em 0.5em; }', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('overflow: hidden ile sabit yükseklikli kapsayıcılar, satır yüksekliği arttığında metni kırpar.'),
        bullet('letter-spacing uygulandığında taşan kesin piksel yükseklikli rozet veya çip bileşenleri.'),
        bullet('word-spacing artırıldığında metin etiketlerini kesen sabit genişlikli gezinme öğeleri.'),
        bullet('Birimsiz değerler yerine piksel olarak ayarlanan satır yüksekliği, düzgün ölçeklemeyi engeller.'),
        bullet('Aralık uygulandığında kapsayıcısından taşan araç ipucu veya açılır pencere metni.'),
        bullet('Aralık geçersiz kılmaları üzerindeki etkisi test edilmeden yazı boyutlarında CSS clamp() veya max() kullanımı.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.12: Text Spacing', url: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html', source: 'W3C', language: 'en', _key: 'r1412w3c' },
      { title: 'WebAIM: Text Spacing Bookmarklet', url: 'https://webaim.org/resources/contrastchecker/', source: 'WebAIM', language: 'en', _key: 'r1412wai' },
      { title: 'Deque: WCAG 2.1 Text Spacing', url: 'https://dequeuniversity.com/checklists/web/text', source: 'Deque', language: 'en', _key: 'r1412deq' },
      { title: 'MDN: letter-spacing', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing', source: 'MDN', language: 'en', _key: 'r1412mdn' },
      { title: 'Techniques for WCAG 2 - C36: Allowing for text spacing override', url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C36', source: 'W3C', language: 'en', _key: 'r1412w32' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.12 Text Spacing – Accessibility Guide',
        metaDescription: 'Meet WCAG 1.4.12 Text Spacing. Ensure content survives spacing overrides for line height, letter spacing, and word spacing with CSS best practices.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.12 Metin Aralığı – Erişilebilirlik Rehberi',
        metaDescription: 'WCAG 1.4.12 Metin Aralığı ölçütünü karşılayın. İçeriğin satır yüksekliği, harf ve kelime aralığı geçersiz kılmalarına dayanmasını sağlayın.',
      },
    },
  },

  // ─── 1.4.13 Content on Hover or Focus ───
  {
    criterionNumber: '1.4.13',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.1',
    wcagVersions: ['2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['hover', 'focus', 'tooltip', 'popup', 'interaction'],
    title: {
      en: 'Content on Hover or Focus',
      tr: 'Üzerine Gelme veya Odaklanma İçeriği',
    },
    description: {
      en: 'When additional content appears on hover or focus, it is dismissible, hoverable, and persistent until the user removes hover/focus or the content is no longer relevant.',
      tr: 'Üzerine gelme veya odaklanma ile ek içerik göründüğünde, bu içerik kapatılabilir, üzerine gelinebilir ve kullanıcı hover/odak kaldırana veya içerik artık geçerli olmayana kadar kalıcı olmalıdır.',
    },
    content: {
      en: [
        heading('What This Rule Means'),
        p('WCAG 1.4.13 applies to any additional content that becomes visible when a user hovers over a trigger element with a pointer or moves keyboard focus to it. Common examples include tooltips, dropdown menus, popovers, and custom title attributes. The criterion defines three requirements for such content:'),
        bullet('Dismissible — The user can close the additional content without moving the pointer or focus, typically by pressing Escape. This is essential because the content may obscure other page elements the user needs to read.'),
        bullet('Hoverable — The user can move the pointer from the trigger to the additional content without it disappearing. This is critical for magnification users who may need to move the viewport to read the tooltip content.'),
        bullet('Persistent — The content remains visible until the user actively dismisses it, moves hover/focus away, or the information is no longer valid. It must not disappear on a timer.'),
        p('Exceptions exist when the browser controls the appearance (native title tooltips) and when the additional content communicates an input error that does not obscure other content.'),

        heading('Why It Matters'),
        p('Screen magnification users often trigger hover content while scanning the page. If a tooltip appears but disappears when they try to move their magnified viewport to read it, the content is inaccessible. The "hoverable" requirement ensures these users can reach and read the content.'),
        p('The "dismissible" requirement protects users from popup content that blocks the view of what they were trying to read. Without Escape key support, a tooltip may cover critical content with no way to remove it without moving the mouse — which might trigger another tooltip.'),
        p('The "persistent" requirement prevents timed tooltips that vanish before a user has finished reading them, which is problematic for users who read slowly or use magnification.'),

        heading('Related axe-core Rules'),
        p('There are no automated axe-core rules for 1.4.13. The three behavioral requirements (dismissible, hoverable, persistent) require interactive testing that automated tools cannot perform. This is a manual testing criterion.'),

        heading('How to Test'),
        numbered('Identify all hover/focus-triggered content: tooltips, popovers, dropdown menus, submenus, info bubbles.'),
        numbered('For each, hover over the trigger to make the content appear.'),
        numbered('Test Dismissible: Press Escape while the content is visible. It should disappear without moving the pointer.'),
        numbered('Test Hoverable: Move the pointer from the trigger element onto the additional content. It must remain visible while hovered.'),
        numbered('Test Persistent: Leave the pointer on the trigger and wait. The content should not disappear on a timer.'),
        numbered('Test with keyboard: Tab to the trigger element. The additional content should appear. Tab away — it should disappear.'),
        numbered('Test with screen magnification (200-400%) to verify the hoverable content can be reached while magnified.'),

        heading('How to Fix'),
        p('Build tooltips and popovers that meet all three requirements:'),
        code('<div class="tooltip-wrapper">\n  <button\n    aria-describedby="tip-1"\n    class="tooltip-trigger"\n  >\n    More info\n  </button>\n  <div\n    id="tip-1"\n    role="tooltip"\n    class="tooltip-content"\n  >\n    This action cannot be undone. All data will be permanently deleted.\n  </div>\n</div>', 'html'),
        code('/* CSS for hoverable, persistent tooltip */\n.tooltip-content {\n  display: none;\n  position: absolute;\n  z-index: 10;\n  background: #1a1a2e;\n  color: #ffffff;\n  padding: 0.75rem 1rem;\n  border-radius: 4px;\n  max-width: 300px;\n  /* Pointer gap bridge — prevents dismiss when moving to tooltip */\n  margin-top: -2px;\n}\n\n/* Show on hover of wrapper (covers both trigger and content) */\n.tooltip-wrapper:hover .tooltip-content,\n.tooltip-wrapper:focus-within .tooltip-content {\n  display: block;\n}\n\n/* Keep tooltip visible when hovering the tooltip itself */\n.tooltip-content:hover {\n  display: block;\n}', 'css'),
        code('// JavaScript for Escape dismissal\ndocument.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    const visibleTooltips = document.querySelectorAll(\n      \'.tooltip-content[style*=\"display: block\"], .tooltip-content:hover\'\n    );\n    visibleTooltips.forEach(tip => {\n      tip.style.display = \'none\';\n    });\n\n    // Also close any open popovers\n    const openPopovers = document.querySelectorAll(\n      \'[data-popover-open=\"true\"]\'\n    );\n    openPopovers.forEach(popover => {\n      popover.setAttribute(\'data-popover-open\', \'false\');\n    });\n  }\n});', 'javascript'),
        p('For dropdown menus, use the wrapper-based hover approach to maintain the hoverable path:'),
        code('<nav>\n  <ul class="menü">\n    <li class="menü-item has-submenu">\n      <a href="/services" aria-expanded="false" aria-haspopup="true">\n        Services\n      </a>\n      <ul class="submenu" role="menü">\n        <li role="menuitem"><a href="/services/audit">Audit</a></li>\n        <li role="menuitem"><a href="/services/remediation">Remediation</a></li>\n      </ul>\n    </li>\n  </ul>\n</nav>', 'html'),
        code('/* Submenu hover pattern — hoverable by design */\n.submenu {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 200px;\n  background: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n/* Wrapper hover keeps submenu open when moving to it */\n.has-submenu:hover .submenu,\n.has-submenu:focus-within .submenu {\n  display: block;\n}', 'css'),

        heading('Common Mistakes'),
        bullet('Tooltips that disappear when the user moves the pointer from the trigger to the tooltip content (gap between elements).'),
        bullet('No Escape key handler — the tooltip cannot be dismissed without moving the pointer or focus.'),
        bullet('Tooltips on a timer that disappear after 3-5 seconds regardless of user interaction.'),
        bullet('CSS-only tooltips using :hover on the trigger element alone, making the tooltip content non-hoverable.'),
        bullet('Custom title attributes implemented as tooltips but not meeting the three behavioral requirements.'),
        bullet('Popovers that cover important content with no way to dismiss them via keyboard.'),
      ],
      tr: [
        heading('Bu Kural Ne Anlama Gelir'),
        p('WCAG 1.4.13, kullanıcı bir işaretçi ile tetikleyici öğenin üzerine geldiğinde veya klavye odağını ona taşıdığında görünür hâle gelen herhangi bir ek içerik için geçerlidir. Yaygın örnekler arasında araç ipuçları, açılır menüler, açılır bilgi kutuları ve özel başlık nitelikleri bulunur. Ölçüt bu tür içerik için üç gereksinim tanımlar:'),
        bullet('Kapatılabilir — Kullanıcı, işaretçiyi veya odağı hareket ettirmeden ek içeriği kapatabilir; genellikle Escape tuşuna basarak. Bu, içeriğin kullanıcının okuması gereken diğer sayfa öğelerini gizleyebilmesi nedeniyle önemlidir.'),
        bullet('Üzerine gelinebilir — Kullanıcı, işaretçiyi tetikleyiciden ek içeriğe kaybetmeden taşıyabilir. Bu, araç ipucu içeriğini okumak için görüntü alanını hareket ettirmesi gerekebilen büyütme kullanıcıları için kritiktir.'),
        bullet('Kalıcı — İçerik, kullanıcı aktif olarak kapatana, hover/odağı uzaklaştırana veya bilgi artık geçerli olmayana kadar görünür kalır. Zamanlayıcıyla kaybolmamalıdır.'),
        p('Tarayıcının görünümü kontrol ettiği durumlarda (yerel title araç ipuçları) ve ek içeriğin diğer içeriği gizlemeyen bir giriş hatasını ilettiği durumlarda istisnalar mevcuttur.'),

        heading('Neden Önemlidir'),
        p('Ekran büyütme kullanıcıları, sayfayı tararken sıklıkla hover içeriğini tetikler. Bir araç ipucu görünür ancak büyütülmüş görüntü alanlarını okumak için hareket ettirdiklerinde kaybolursa, içerik erişilemez hâle gelir. "Üzerine gelinebilir" gereksinimi, bu kullanıcıların içeriğe ulaşıp okuyabilmesini sağlar.'),
        p('"Kapatılabilir" gereksinimi, kullanıcıları okumaya çalıştıkları şeyin görüşünü engelleyen açılır içerikten korur. Escape tuşu desteği olmadan, fareyi hareket ettirmeden kaldırılamayan bir araç ipucu kritik içeriği kapatabilir.'),
        p('"Kalıcı" gereksinimi, kullanıcı okumayı bitirmeden kaybolan zamanlı araç ipuçlarını önler; bu, yavaş okuyan veya büyütme kullanan kullanıcılar için sorunludur.'),

        heading('İlgili axe-core Kuralları'),
        p('1.4.13 için otomatik axe-core kuralı yoktur. Üç davranışsal gereksinim (kapatılabilir, üzerine gelinebilir, kalıcı) otomatik araçların gerçekleştiremediği etkileşimli test gerektirir. Bu, manuel test ölçütüdür.'),

        heading('Nasıl Test Edilir'),
        numbered('Tüm hover/odak tetiklemeli içeriği tanımlayın: araç ipuçları, açılır bilgi kutuları, açılır menüler, alt menüler, bilgi balonları.'),
        numbered('Her biri için, içeriğin görünmesini sağlamak üzere tetikleyicinin üzerine gelin.'),
        numbered('Kapatılabilir testi: İçerik görünürken Escape tuşuna basın. İşaretçi hareket ettirilmeden kaybolmalıdır.'),
        numbered('Üzerine gelinebilir testi: İşaretçiyi tetikleyici öğeden ek içeriğin üzerine taşıyın. Üzerine gelindiğinde görünür kalmalıdır.'),
        numbered('Kalıcı testi: İşaretçiyi tetikleyicide bırakın ve bekleyin. İçerik zamanlayıcıyla kaybolmamalıdır.'),
        numbered('Klavye ile test edin: Tetikleyici öğeye Tab ile gidin. Ek içerik görünmelidir. Tab ile uzaklaşın — kaybolmalıdır.'),
        numbered('Üzerine gelinebilir içeriğin büyütülmüşken ulaşılabilir olduğunu doğrulamak için ekran büyütme (%200-400) ile test edin.'),

        heading('Nasıl Düzeltilir'),
        p('Üç gereksinimi de karşılayan araç ipuçları ve açılır bilgi kutuları oluşturun:'),
        code('<div class="tooltip-wrapper">\n  <button\n    aria-describedby="tip-1"\n    class="tooltip-trigger"\n  >\n    Daha fazla bilgi\n  </button>\n  <div\n    id="tip-1"\n    role="tooltip"\n    class="tooltip-content"\n  >\n    Bu işlem geri alınamaz. Tüm veriler kalıcı olarak silinecektir.\n  </div>\n</div>', 'html'),
        code('/* Üzerine gelinebilir, kalıcı araç ipucu için CSS */\n.tooltip-content {\n  display: none;\n  position: absolute;\n  z-index: 10;\n  background: #1a1a2e;\n  color: #ffffff;\n  padding: 0.75rem 1rem;\n  border-radius: 4px;\n  max-width: 300px;\n  margin-top: -2px;\n}\n\n/* Sarmalayıcının hover durumunda göster */\n.tooltip-wrapper:hover .tooltip-content,\n.tooltip-wrapper:focus-within .tooltip-content {\n  display: block;\n}\n\n/* Araç ipucunun kendisine gelindiğinde görünür tut */\n.tooltip-content:hover {\n  display: block;\n}', 'css'),
        code('// Escape ile kapatma için JavaScript\ndocument.addEventListener(\'keydown\', (e) => {\n  if (e.key === \'Escape\') {\n    const visibleTooltips = document.querySelectorAll(\n      \'.tooltip-content[style*=\"display: block\"], .tooltip-content:hover\'\n    );\n    visibleTooltips.forEach(tip => {\n      tip.style.display = \'none\';\n    });\n\n    const openPopovers = document.querySelectorAll(\n      \'[data-popover-open=\"true\"]\'\n    );\n    openPopovers.forEach(popover => {\n      popover.setAttribute(\'data-popover-open\', \'false\');\n    });\n  }\n});', 'javascript'),
        p('Açılır menüler için, üzerine gelinebilir yolu korumak üzere sarmalayıcı tabanlı hover yaklaşımını kullanın:'),
        code('/* Alt menü hover kalıbı — tasarım gereği üzerine gelinebilir */\n.submenu {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 200px;\n  background: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n/* Sarmalayıcı hover, alt menüye geçerken açık tutar */\n.has-submenu:hover .submenu,\n.has-submenu:focus-within .submenu {\n  display: block;\n}', 'css'),

        heading('Sık Yapılan Hatalar'),
        bullet('Kullanıcı işaretçiyi tetikleyiciden araç ipucu içeriğine taşıdığında kaybolan araç ipuçları (öğeler arasındaki boşluk).'),
        bullet('Escape tuşu işleyicisi yok — araç ipucu, işaretçi veya odak hareket ettirilmeden kapatılamaz.'),
        bullet('Kullanıcı etkileşiminden bağımsız olarak 3-5 saniye sonra kaybolan zamanlayıcılı araç ipuçları.'),
        bullet('Yalnızca tetikleyici öğedeki :hover kullanılarak oluşturulan ve araç ipucu içeriğini üzerine gelinemez yapan CSS-yalnızca araç ipuçları.'),
        bullet('Araç ipuçları olarak uygulanan ancak üç davranışsal gereksinimi karşılamayan özel title nitelikleri.'),
        bullet('Klavye ile kapatma yolu olmadan önemli içeriği kapatan açılır bilgi kutuları.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.4.13: Content on Hover or Focus', url: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html', source: 'W3C', language: 'en', _key: 'r1413w3c' },
      { title: 'WebAIM: WCAG 2.1 Checklist', url: 'https://webaim.org/standards/wcag/checklist', source: 'WebAIM', language: 'en', _key: 'r1413wai' },
      { title: 'Deque: Tooltips and Toggletips', url: 'https://dequeuniversity.com/library/aria/tooltip', source: 'Deque', language: 'en', _key: 'r1413deq' },
      { title: 'MDN: :focus-within', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within', source: 'MDN', language: 'en', _key: 'r1413mdn' },
      { title: 'Inclusive Components: Tooltips and Toggletips', url: 'https://inclusive-components.design/tooltips-toggletips/', source: 'Inclusive Components', language: 'en', _key: 'r1413inc' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.4.13 Content on Hover or Focus – Guide',
        metaDescription: 'Meet WCAG 1.4.13 Content on Hover or Focus. Make tooltips dismissible, hoverable, and persistent with HTML, CSS, and JavaScript patterns.',
      },
      tr: {
        metaTitle: 'WCAG 1.4.13 Hover veya Odak İçeriği – Rehber',
        metaDescription: 'WCAG 1.4.13 ölçütünü karşılayın. Araç ipuçlarını kapatılabilir, üzerine gelinebilir ve kalıcı yapın. HTML, CSS ve JS örnekleri.',
      },
    },
  },
]

export default rules
