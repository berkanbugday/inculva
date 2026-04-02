import { p, heading, bullet, numbered, code, blockquote } from './helpers.mjs'

const rules = [
  // ── 1.2.1 Audio-only and Video-only (Prerecorded) ────────────────────
  {
    criterionNumber: '1.2.1',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: ['audio-caption'],
    tags: ['media', 'audio', 'video'],
    title: {
      en: 'Audio-only and Video-only (Prerecorded)',
      tr: 'Yalnızca Ses ve Yalnızca Video (Önceden Kaydedilmiş)',
    },
    description: {
      en: 'Prerecorded audio-only and video-only content must have text alternatives that convey equivalent information to users who cannot perceive the original media.',
      tr: 'Önceden kaydedilmiş yalnızca ses ve yalnızca video içerikleri, orijinal medyayı algılayamayan kullanıcılara eşdeğer bilgi sunan metin alternatifleri içermelidir.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.1 requires that prerecorded audio-only content (such as podcasts or voice recordings) and prerecorded video-only content (such as silent animations or surveillance footage) each have a text-based alternative. For audio-only, this means a full transcript. For video-only, this means either a transcript or an audio track that describes the visual information.'),
        p('The key distinction is that this criterion targets media that uses only one modality. If a video includes both an audio track and visual content, it falls under other 1.2.x criteria instead.'),

        heading('Why it matters'),
        p('Users who are deaf or hard of hearing cannot access information delivered solely through audio. A transcript allows them to read the content at their own pace. Conversely, users who are blind cannot perceive visual-only content, so an audio description or descriptive transcript bridges that gap.'),
        p('Transcripts also benefit users in noisy environments, non-native speakers who read more comfortably than they listen, and search engines that can index text but not audio or video streams.'),

        heading('Related axe-core rules'),
        bullet('audio-caption — Ensures <audio> elements have captions or a transcript reference.'),
        p('Note that automated tools can only detect the presence of certain elements. Manual review is always required to verify transcript accuracy and completeness.'),

        heading('How to test'),
        numbered('Identify all prerecorded audio-only and video-only content on the page.'),
        numbered('For each audio-only clip, confirm that a text transcript is provided nearby or linked directly.'),
        numbered('For each video-only clip, confirm that either a descriptive text transcript or an audio track describing the visuals is available.'),
        numbered('Verify the transcript or description accurately conveys all meaningful information present in the media.'),
        numbered('Check that the alternative is easy to locate — ideally adjacent to or directly linked from the media player.'),

        heading('How to fix'),
        p('For audio-only content, provide a full transcript that includes speaker identification, all spoken words, and descriptions of meaningful sounds:'),
        code('<audio controls>\n  <source src="/podcast-ep-12.mp3" type="audio/mpeg" />\n  Your browser does not support the audio element.\n</audio>\n<details>\n  <summary>Read transcript</summary>\n  <div class="transcript">\n    <p><strong>Host:</strong> Welcome to episode twelve...</p>\n    <p><strong>Guest:</strong> Thanks for having me...</p>\n  </div>\n</details>', 'html'),
        p('For video-only content, provide either a descriptive transcript or an audio alternative:'),
        code('<video controls>\n  <source src="/assembly-instructions.mp4" type="video/mp4" />\n  <track kind="descriptions" src="/assembly-desc.vtt" srclang="en" label="Audio Description" />\n</video>\n<a href="/assembly-transcript.html">Full text description of assembly steps</a>', 'html'),

        heading('Common mistakes'),
        bullet('Providing auto-generated captions without reviewing them for accuracy.'),
        bullet('Omitting non-speech sounds (e.g., applause, background music) from transcripts.'),
        bullet('Placing the transcript on a separate page with no clear link from the media player.'),
        bullet('Assuming video-only content does not need an alternative because there is no dialogue.'),
        bullet('Using an image-based PDF as a transcript, which itself is not accessible to screen readers.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.1, önceden kaydedilmiş yalnızca ses içeriğinin (podcast veya sesli kayıtlar gibi) ve önceden kaydedilmiş yalnızca video içeriğinin (sessiz animasyonlar veya güvenlik kamerası görüntüleri gibi) metin tabanlı bir alternatife sahip olmasını gerektirir. Yalnızca ses için bu, eksiksiz bir transkript anlamına gelir. Yalnızca video için ise görsel bilgileri açıklayan bir transkript veya sesli betimleme parçası gerekir.'),
        p('Temel ayrım, bu kriterin yalnızca tek bir modalite kullanan medyayı hedeflemesidir. Bir video hem ses hem de görsel içerik barındırıyorsa, diğer 1.2.x kriterleri kapsamına girer.'),

        heading('Neden önemlidir'),
        p('İşitme engelli veya işitme güçlüğü yaşayan kullanıcılar, yalnızca ses yoluyla sunulan bilgilere erişemez. Bir transkript, içeriği kendi hızlarında okumalarını sağlar. Öte yandan, görme engelli kullanıcılar yalnızca görsel içeriği algılayamaz; bu nedenle sesli betimleme veya açıklayıcı bir transkript bu boşluğu doldurur.'),
        p('Transkriptler ayrıca gürültülü ortamlardaki kullanıcılara, dinlemekten çok okumayı tercih eden ana dili farklı olan kullanıcılara ve ses veya video akışlarını dizine ekleyemeyen arama motorlarına fayda sağlar.'),

        heading('İlgili axe-core kuralları'),
        bullet('audio-caption — <audio> öğelerinin altyazı veya transkript referansına sahip olmasını kontrol eder.'),
        p('Otomatik araçlar yalnızca belirli öğelerin varlığını tespit edebilir. Transkriptin doğruluğunu ve eksiksizliğini doğrulamak için her zaman manuel inceleme gereklidir.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki tüm önceden kaydedilmiş yalnızca ses ve yalnızca video içeriklerini belirleyin.'),
        numbered('Her ses kaydı için, yakınında veya doğrudan bağlantılı bir metin transkripti olduğunu doğrulayın.'),
        numbered('Her video kaydı için, açıklayıcı bir metin transkripti veya görselleri betimleyen bir ses parçası bulunduğunu doğrulayın.'),
        numbered('Transkript veya betimlemenin medyadaki tüm anlamlı bilgileri doğru şekilde aktardığını kontrol edin.'),
        numbered('Alternatifin kolayca bulunabilir olduğundan emin olun — ideal olarak medya oynatıcının hemen yanında veya doğrudan bağlantılı olmalıdır.'),

        heading('Nasıl düzeltilir'),
        p('Yalnızca ses içerikleri için, konuşmacı tanımlaması, tüm söylenen sözler ve anlamlı seslerin açıklamalarını içeren tam bir transkript sağlayın:'),
        code('<audio controls>\n  <source src="/podcast-bölüm-12.mp3" type="audio/mpeg" />\n  Tarayıcınız ses öğesini desteklemiyor.\n</audio>\n<details>\n  <summary>Transkripti oku</summary>\n  <div class="transcript">\n    <p><strong>Sunucu:</strong> On ikinci bölüme hoş geldiniz...</p>\n    <p><strong>Konuk:</strong> Beni ağırladığınız için teşekkürler...</p>\n  </div>\n</details>', 'html'),
        p('Yalnızca video içerikleri için açıklayıcı bir transkript veya sesli alternatif sağlayın:'),
        code('<video controls>\n  <source src="/montaj-talimatlari.mp4" type="video/mp4" />\n  <track kind="descriptions" src="/montaj-betimleme.vtt" srclang="tr" label="Sesli Betimleme" />\n</video>\n<a href="/montaj-transkript.html">Montaj adımlarının tam metin açıklaması</a>', 'html'),

        heading('Sık yapılan hatalar'),
        bullet('Otomatik oluşturulan altyazıları doğruluk açısından incelemeden kullanmak.'),
        bullet('Konuşma dışı sesleri (alkış, arka plan müziği vb.) transkripte dahil etmemek.'),
        bullet('Transkripti, medya oynatıcıdan net bir bağlantı olmadan ayrı bir sayfaya yerleştirmek.'),
        bullet('Diyalog olmadığı için yalnızca video içeriğin alternatife ihtiyaç duymadığını varsaymak.'),
        bullet('Transkript olarak ekran okuyucuların erişemediği görüntü tabanlı bir PDF kullanmak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.1: Audio-only and Video-only', url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html', source: 'W3C', language: 'en', _key: 'r121w3c1' },
      { title: 'Providing a text transcript for audio-only content', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G158', source: 'W3C', language: 'en', _key: 'r121w3c2' },
      { title: 'Audio and Video Accessibility – WebAIM', url: 'https://webaim.org/techniques/captions/', source: 'WebAIM', language: 'en', _key: 'r121waim' },
      { title: 'Creating Accessible Audio and Video', url: 'https://dequeuniversity.com/rules/axe/4.7/audio-caption', source: 'Deque University', language: 'en', _key: 'r121dequ' },
      { title: 'HTML audio element – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio', source: 'MDN', language: 'en', _key: 'r121mdn1' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.1: Audio-only & Video-only Explained',
        metaDescription: 'Learn how to meet WCAG 1.2.1 by providing transcripts for prerecorded audio-only and video-only content. Includes code examples and testing steps.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.1: Yalnızca Ses ve Video Rehberi',
        metaDescription: 'Önceden kaydedilmiş yalnızca ses ve video içerikleri için transkript sağlayarak WCAG 1.2.1 kriterini nasıl karşılayacağınızı öğrenin.',
      },
    },
  },

  // ── 1.2.2 Captions (Prerecorded) ─────────────────────────────────────
  {
    criterionNumber: '1.2.2',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: ['video-caption'],
    tags: ['media', 'video', 'captions'],
    title: {
      en: 'Captions (Prerecorded)',
      tr: 'Altyazılar (Önceden Kaydedilmiş)',
    },
    description: {
      en: 'Captions must be provided for all prerecorded audio content in synchronized media, enabling deaf and hard-of-hearing users to access the audio information.',
      tr: 'Eşzamanlanmış medyadaki tüm önceden kaydedilmiş ses içerikleri için altyazı sağlanmalıdır; bu, işitme engelli kullanıcıların ses bilgilerine erişmesini mümkün kılar.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.2 mandates that prerecorded synchronized media — videos with audio tracks — must include captions. Captions are text versions of the spoken dialogue and meaningful sound effects, synchronized with the media timeline. They differ from subtitles in that captions also describe non-speech audio cues like music, laughter, or environmental sounds.'),
        p('This criterion applies to all prerecorded video content that includes an audio track. It does not apply to audio-only or video-only content (those are covered by 1.2.1) or live content (covered by 1.2.4).'),

        heading('Why it matters'),
        p('Approximately 466 million people worldwide have disabling hearing loss. Without captions, these users are completely excluded from video content. Captions also benefit people watching in sound-sensitive environments, non-native speakers, and users with cognitive disabilities who process written text more effectively.'),
        p('From a legal standpoint, captioning is one of the most commonly cited accessibility requirements. Failure to provide captions has been the basis for numerous accessibility lawsuits, particularly in education and entertainment.'),
        blockquote('Captions are not optional — they are an essential part of any video content strategy and a legal requirement in most jurisdictions.'),

        heading('Related axe-core rules'),
        bullet('video-caption — Ensures <video> elements have a <track> element with kind="captions".'),
        p('Automated scanning detects the absence of caption tracks but cannot evaluate caption quality, synchronization accuracy, or completeness. Always complement automated testing with manual review.'),

        heading('How to test'),
        numbered('Play each prerecorded video on the page and enable captions.'),
        numbered('Verify that captions are synchronized with the spoken audio within 1-2 seconds.'),
        numbered('Confirm that all dialogue is accurately transcribed, including speaker identification when multiple speakers are present.'),
        numbered('Check that meaningful non-speech sounds (e.g., [door slams], [phone rings], [soft music]) are described.'),
        numbered('Ensure captions do not obscure important visual content and are readable against the video background.'),
        numbered('Run axe-core or a similar automated tool to flag any <video> elements missing a caption track.'),

        heading('How to fix'),
        p('The standard approach is to use the HTML <track> element with a WebVTT caption file:'),
        code('<video controls>\n  <source src="/product-demo.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/product-demo-en.vtt"\n    srclang="en"\n    label="English Captions"\n    default\n  />\n</video>', 'html'),
        p('A WebVTT file follows this format:'),
        code('WEBVTT\n\n1\n00:00:01.000 --> 00:00:04.500\n[Upbeat intro music]\n\n2\n00:00:05.000 --> 00:00:08.200\nWelcome to our product demo.\nToday we will walk through the dashboard.\n\n3\n00:00:09.000 --> 00:00:12.800\n<v Sarah>Let me show you the analytics panel.\n\n4\n00:00:13.500 --> 00:00:16.000\n[Mouse click sound]\nHere you can see real-time data.', 'text'),
        p('For dynamically loaded video players (e.g., custom React players), ensure the caption track is programmatically associated:'),
        code('const video = document.querySelector("video");\nconst track = video.addTextTrack("captions", "English", "en");\ntrack.mode = "showing";\ntrack.addCue(new VTTCue(0, 4.5, "[Upbeat intro music]"));\ntrack.addCue(new VTTCue(5, 8.2, "Welcome to our product demo."));', 'javascript'),

        heading('Common mistakes'),
        bullet('Relying solely on auto-generated captions without human review — accuracy rates can be as low as 60-70%.'),
        bullet('Omitting speaker identification when multiple people are talking.'),
        bullet('Failing to caption non-speech audio such as music, sound effects, or silence used for dramatic effect.'),
        bullet('Using open captions burned into the video with poor contrast or tiny fonts.'),
        bullet('Providing captions only in one language when the video audience is multilingual.'),
        bullet('Setting caption timing too fast for comfortable reading speed (aim for 3 words per second maximum).'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.2, önceden kaydedilmiş eşzamanlanmış medyanın — ses parçası içeren videoların — altyazı içermesini zorunlu kılar. Altyazılar, konuşulan diyalog ve anlamlı ses efektlerinin medya zaman çizelgesiyle eşzamanlanmış metin versiyonlarıdır. Altyazılar, alt yazılardan farklı olarak müzik, kahkaha veya çevresel sesler gibi konuşma dışı ses ipuçlarını da tanımlar.'),
        p('Bu kriter, ses parçası içeren tüm önceden kaydedilmiş video içerikleri için geçerlidir. Yalnızca ses veya yalnızca video içeriklere (1.2.1 tarafından kapsanır) veya canlı içeriğe (1.2.4 tarafından kapsanır) uygulanmaz.'),

        heading('Neden önemlidir'),
        p('Dünya genelinde yaklaşık 466 milyon kişi engelleyici düzeyde işitme kaybı yaşamaktadır. Altyazılar olmadan bu kullanıcılar video içeriklerinden tamamen dışlanır. Altyazılar ayrıca sessiz ortamlarda izleyenlere, ana dili farklı olanlara ve yazılı metni daha etkili işleyen bilişsel engelli kullanıcılara fayda sağlar.'),
        p('Hukuki açıdan, altyazı sağlama en sık atıfta bulunulan erişilebilirlik gereksinimlerinden biridir. Altyazı eksikliği, özellikle eğitim ve eğlence sektörlerinde çok sayıda erişilebilirlik davasının temelini oluşturmuştür.'),
        blockquote('Altyazılar isteğe bağlı değildir — her video içerik stratejisinin temel bir parçası ve çoğu yargı alanında yasal bir gerekliliktir.'),

        heading('İlgili axe-core kuralları'),
        bullet('video-caption — <video> öğelerinin kind="captions" özelliğine sahip bir <track> öğesi içerdiğini kontrol eder.'),
        p('Otomatik tarama, altyazı parçalarının yokluğunu tespit eder ancak altyazı kalitesini, eşzamanlama doğruluğunu veya eksiksizliği değerlendiremez. Otomatik testi her zaman manuel incelemeyle destekleyin.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki her önceden kaydedilmiş videoyu oynatın ve altyazıları etkinleştirin.'),
        numbered('Altyazıların konuşulan sesle 1-2 saniye içinde eşzamanlandığini doğrulayın.'),
        numbered('Tüm diyaloğun doğru şekilde yazıya döküldüğünü, birden fazla konuşmacı varsa konuşmacı tanımlamasının yapıldığını onaylayın.'),
        numbered('Anlamlı konuşma dışı seslerin (örn. [kapı çarpması], [telefon çalması], [hafif müzik]) tanımlandığını kontrol edin.'),
        numbered('Altyazıların önemli görsel içeriği engellemediğinden ve video arka planına karşı okunabilir olduğundan emin olun.'),
        numbered('Altyazı parçası eksik olan <video> öğelerini işaretlemek için axe-core veya benzer bir otomatik aracı çalıştırın.'),

        heading('Nasıl düzeltilir'),
        p('Standart yaklaşım, WebVTT altyazı dosyasıyla HTML <track> öğesini kullanmaktır:'),
        code('<video controls>\n  <source src="/urun-demo.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/urun-demo-tr.vtt"\n    srclang="tr"\n    label="Türkçe Altyazı"\n    default\n  />\n</video>', 'html'),
        p('Bir WebVTT dosyası şu biçimi izler:'),
        code('WEBVTT\n\n1\n00:00:01.000 --> 00:00:04.500\n[Enerjik giriş müziği]\n\n2\n00:00:05.000 --> 00:00:08.200\nÜrün demomuza hoş geldiniz.\nBugün kontrol panelini inceleyeceğiz.\n\n3\n00:00:09.000 --> 00:00:12.800\n<v Ayşe>Analitik panelini göstereyim.\n\n4\n00:00:13.500 --> 00:00:16.000\n[Fare tıklama sesi]\nBurada gerçek zamanlı verileri görebilirsiniz.', 'text'),
        p('Dinamik olarak yüklenen video oynatıcılar için altyazı parçasının programatik olarak ilişkilendirildiğinden emin olun:'),
        code('const video = document.querySelector("video");\nconst track = video.addTextTrack("captions", "Türkçe", "tr");\ntrack.mode = "showing";\ntrack.addCue(new VTTCue(0, 4.5, "[Enerjik giriş müziği]"));\ntrack.addCue(new VTTCue(5, 8.2, "Ürün demomuza hoş geldiniz."));', 'javascript'),

        heading('Sık yapılan hatalar'),
        bullet('Yalnızca otomatik oluşturulan altyazılara güvenmek — doğruluk oranları %60-70 kadar düşük olabilir.'),
        bullet('Birden fazla kişi konuşurken konuşmacı tanımlamasını atlamak.'),
        bullet('Müzik, ses efektleri veya dramatik etki için kullanılan sessizlik gibi konuşma dışı sesleri altyazıya dahil etmemek.'),
        bullet('Videoya gömülü açık altyazıları düşük kontrast veya çok küçük fontlarla kullanmak.'),
        bullet('Video izleyicileri çok dilli olduğunda altyazıları yalnızca tek bir dilde sunmak.'),
        bullet('Altyazı zamanlamasını rahat okuma hızı için çok hızlı ayarlamak (saniyede en fazla 3 kelime hedefleyin).'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.2: Captions (Prerecorded)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html', source: 'W3C', language: 'en', _key: 'r122w3c1' },
      { title: 'Techniques for Captions — G87', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G87', source: 'W3C', language: 'en', _key: 'r122w3c2' },
      { title: 'Captions, Transcripts, and Audio Descriptions – WebAIM', url: 'https://webaim.org/techniques/captions/', source: 'WebAIM', language: 'en', _key: 'r122waim' },
      { title: 'video-caption – Deque axe-core', url: 'https://dequeuniversity.com/rules/axe/4.7/video-caption', source: 'Deque University', language: 'en', _key: 'r122dequ' },
      { title: 'WebVTT: The Web Video Text Tracks Format – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API', source: 'MDN', language: 'en', _key: 'r122mdn1' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.2: Prerecorded Captions Guide',
        metaDescription: 'Complete guide to WCAG 1.2.2 captions for prerecorded video. Includes WebVTT examples, testing procedures, and common captioning mistakes to avoid.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.2: Önceden Kaydedilmiş Altyazı Rehberi',
        metaDescription: 'Önceden kaydedilmiş videolar için WCAG 1.2.2 altyazı rehberi. WebVTT örnekleri, test prosedürleri ve kaçınılması gereken yaygın hatalar.',
      },
    },
  },

  // ── 1.2.3 Audio Description or Media Alternative (Prerecorded) ────────
  {
    criterionNumber: '1.2.3',
    level: 'A',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['media', 'video', 'audio-description'],
    title: {
      en: 'Audio Description or Media Alternative (Prerecorded)',
      tr: 'Sesli Betimleme veya Medya Alternatifi',
    },
    description: {
      en: 'An alternative for time-based media or audio description of the video content must be provided for prerecorded synchronized media, unless the media is a media alternative for text.',
      tr: 'Medya metin için bir alternatif olmadığı sürece, önceden kaydedilmiş eşzamanlanmış medya için zamana dayalı medyanın bir alternatifi veya video içeriğinin sesli betimlenmesi sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.3 requires that prerecorded synchronized media (video with audio) provides either an audio description track or a full text alternative that describes both the visual and auditory content. An audio description narrates important visual information — such as actions, scene changes, on-screen text, and facial expressions — during natural pauses in dialogue.'),
        p('A media alternative is a text document that presents all visual and auditory information in reading order. This can be a screenplay-style transcript or a structured document that describes what happens both visually and aurally throughout the video.'),

        heading('Why it matters'),
        p('Blind and low-vision users rely on audio descriptions to understand visual content that is not conveyed through the existing audio track. Without this alternative, they miss critical context — a presenter pointing at a chart, on-screen demonstrations, or visual humor.'),
        p('A full media alternative benefits users who cannot play media, those with both visual and auditory disabilities, and users of assistive technologies that render text. It also serves as a fallback when audio description tracks are not supported by the media player.'),

        heading('Related axe-core rules'),
        p('There are no axe-core rules that directly test for audio descriptions or media alternatives. This criterion requires manual testing because automated tools cannot evaluate whether visual information has been adequately described.'),

        heading('How to test'),
        numbered('Identify all prerecorded videos with audio tracks on the page.'),
        numbered('Check whether an audio description track is available in the media player controls.'),
        numbered('If no audio description is provided, verify that a complete text alternative (media alternative) is available.'),
        numbered('Play the video with audio description enabled and verify that key visual elements are described during pauses in dialogue.'),
        numbered('If a text alternative is provided, compare it against the video to ensure all visual and auditory information is represented.'),

        heading('How to fix'),
        p('Option 1: Add an audio description track using the <track> element:'),
        code('<video controls>\n  <source src="/training-video.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/training-captions.vtt"\n    srclang="en"\n    label="English Captions"\n    default\n  />\n  <track\n    kind="descriptions"\n    src="/training-descriptions.vtt"\n    srclang="en"\n    label="Audio Descriptions"\n  />\n</video>', 'html'),
        p('The audio description WebVTT file describes visual content:'),
        code('WEBVTT\n\n1\n00:00:03.000 --> 00:00:06.000\nA bar chart shows quarterly revenue\nincreasing from Q1 to Q4.\n\n2\n00:00:15.000 --> 00:00:18.000\nThe presenter clicks on the Q3 bar,\nrevealing a detailed breakdown by region.\n\n3\n00:00:30.000 --> 00:00:33.000\nA world map highlights active markets\nin blue across Europe and Asia.', 'text'),
        p('Option 2: Provide a full media alternative as a linked transcript:'),
        code('<video controls>\n  <source src="/training-video.mp4" type="video/mp4" />\n</video>\n<a href="/training-full-transcript.html">\n  Full media alternative: Complete text description\n  of the training video including visual content\n</a>', 'html'),

        heading('Common mistakes'),
        bullet('Providing captions but no audio description — captions alone do not satisfy this criterion.'),
        bullet('Describing only what is spoken, omitting visual-only information such as on-screen text, charts, or actions.'),
        bullet('Adding audio descriptions that overlap with dialogue, making both difficult to understand.'),
        bullet('Providing a transcript that covers only spoken content without describing visual elements.'),
        bullet('Assuming that an audio description is unnecessary because the presenter verbally describes everything — this is often not the case.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.3, önceden kaydedilmiş eşzamanlanmış medyanın (sesli video) ya bir sesli betimleme parçası ya da hem görsel hem de işitsel içeriği açıklayan tam bir metin alternatifi sağlamasını gerektirir. Sesli betimleme, diyalogdaki doğal duraklamalar sırasında önemli görsel bilgileri — hareketler, sahne değişiklikleri, ekrandaki metinler ve yüz ifadeleri gibi — sesli olarak anlatır.'),
        p('Medya alternatifi, tüm görsel ve işitsel bilgileri okuma sırasına göre sunan bir metin belgesidir. Bu, senaryo tarzı bir transkript veya video boyunca hem görsel hem de işitsel olarak neler olduğunu açıklayan yapılandırılmış bir belge olabilir.'),

        heading('Neden önemlidir'),
        p('Görme engelli ve az gören kullanıcılar, mevcut ses parçası aracılığıyla aktarılmayan görsel içeriği anlamak için sesli betimlemelere güvenir. Bu alternatif olmadan, bir sunucunun grafik göstermesi, ekrandaki gösterimler veya görsel espri gibi kritik bağlamı kaçırırlar.'),
        p('Tam bir medya alternatifi, medya oynatamayan kullanıcılara, hem görsel hem de işitsel engeli olan kullanıcılara ve metni işleyen yardımcı teknoloji kullanıcılarına fayda sağlar. Ayrıca sesli betimleme parçaları medya oynatıcı tarafından desteklenmediğinde bir yedek olarak hizmet eder.'),

        heading('İlgili axe-core kuralları'),
        p('Sesli betimlemeleri veya medya alternatiflerini doğrudan test eden axe-core kuralı bulunmamaktadır. Bu kriter, otomatik araçların görsel bilginin yeterince açıklanıp açıklanmadığını değerlendiremediği için manuel test gerektirir.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki ses parçası içeren tüm önceden kaydedilmiş videoları belirleyin.'),
        numbered('Medya oynatıcı kontrollerinde sesli betimleme parçasının mevcut olup olmadığını kontrol edin.'),
        numbered('Sesli betimleme sağlanmamışsa, eksiksiz bir metin alternatifinin (medya alternatifi) mevcut olduğunu doğrulayın.'),
        numbered('Sesli betimleme etkinleştirilmiş olarak videoyu oynatın ve önemli görsel öğelerin diyalog aralarında betimlendiğini doğrulayın.'),
        numbered('Bir metin alternatifi sağlanmışsa, tüm görsel ve işitsel bilgilerin temsil edildiğinden emin olmak için videoyla karşılaştırın.'),

        heading('Nasıl düzeltilir'),
        p('Seçenek 1: <track> öğesiyle sesli betimleme parçası ekleyin:'),
        code('<video controls>\n  <source src="/egitim-videosu.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/egitim-altyazi.vtt"\n    srclang="tr"\n    label="Türkçe Altyazı"\n    default\n  />\n  <track\n    kind="descriptions"\n    src="/egitim-betimleme.vtt"\n    srclang="tr"\n    label="Sesli Betimleme"\n  />\n</video>', 'html'),
        p('Sesli betimleme WebVTT dosyası görsel içeriği açıklar:'),
        code('WEBVTT\n\n1\n00:00:03.000 --> 00:00:06.000\nBir çubuk grafik, çeyreklik gelirin\nQ1\'den Q4\'e arttığını gösteriyor.\n\n2\n00:00:15.000 --> 00:00:18.000\nSunucu Q3 çubuğuna tıklayarak\nbölgelere göre ayrıntılı dağılımı gösteriyor.\n\n3\n00:00:30.000 --> 00:00:33.000\nDünya haritası, Avrupa ve Asya\'daki\naktif pazarları mavi renkte vurguluyor.', 'text'),
        p('Seçenek 2: Bağlantılı transkript olarak tam bir medya alternatifi sağlayın:'),
        code('<video controls>\n  <source src="/egitim-videosu.mp4" type="video/mp4" />\n</video>\n<a href="/egitim-tam-transkript.html">\n  Tam medya alternatifi: Eğitim videosunun\n  görsel içerik dahil eksiksiz metin açıklaması\n</a>', 'html'),

        heading('Sık yapılan hatalar'),
        bullet('Altyazı sağlamak ancak sesli betimleme sağlamamak — yalnızca altyazılar bu kriteri karşılamaz.'),
        bullet('Yalnızca söyleneni açıklamak, ekrandaki metin, grafikler veya eylemler gibi yalnızca görsel bilgileri atlamak.'),
        bullet('Diyalogla çakışan sesli betimlemeler eklemek ve her ikisini de anlaşılmaz hale getirmek.'),
        bullet('Yalnızca konuşulan içeriği kapsayan, görsel öğeleri açıklamayan bir transkript sağlamak.'),
        bullet('Sunucunun her şeyi sözlü olarak anlattığı için sesli betimlemeye gerek olmadığını varsaymak — bu genellikle doğru değildir.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.3: Audio Description or Media Alternative', url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html', source: 'W3C', language: 'en', _key: 'r123w3c1' },
      { title: 'Providing an audio description – G78', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G78', source: 'W3C', language: 'en', _key: 'r123w3c2' },
      { title: 'Audio Description – WebAIM', url: 'https://webaim.org/techniques/captions/#ad', source: 'WebAIM', language: 'en', _key: 'r123waim' },
      { title: 'Audio Description Guidelines – Described and Captioned Media Program', url: 'https://dcmp.org/learn/description-key', source: 'DCMP', language: 'en', _key: 'r123dcmp' },
      { title: 'HTML track element – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track', source: 'MDN', language: 'en', _key: 'r123mdn1' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.3: Audio Description & Media Alternative',
        metaDescription: 'How to meet WCAG 1.2.3 with audio descriptions or full text alternatives for prerecorded video. Includes WebVTT examples and testing guidance.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.3: Sesli Betimleme ve Medya Alternatifi',
        metaDescription: 'Önceden kaydedilmiş video için sesli betimleme veya metin alternatifi ile WCAG 1.2.3 kriterini karşılama rehberi. WebVTT örnekleri dahil.',
      },
    },
  },

  // ── 1.2.4 Captions (Live) ────────────────────────────────────────────
  {
    criterionNumber: '1.2.4',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'critical',
    axeRuleIds: [],
    tags: ['media', 'video', 'captions', 'live'],
    title: {
      en: 'Captions (Live)',
      tr: 'Altyazılar (Canlı)',
    },
    description: {
      en: 'Captions must be provided for all live audio content in synchronized media, ensuring real-time access for deaf and hard-of-hearing users.',
      tr: 'Eşzamanlanmış medyadaki tüm canlı ses içerikleri için altyazı sağlanmalıdır; bu, işitme engelli kullanıcıların gerçek zamanlı erişimini güvence altına alır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.4 requires that live synchronized media — such as webinars, live streams, virtual meetings, and live news broadcasts — include real-time captions. Unlike prerecorded captions, live captions must be generated and displayed as the audio occurs, typically through CART (Communication Access Realtime Translation), live stenography, or real-time speech recognition with human correction.'),
        p('This criterion specifically targets live events where the audio content is being produced in real time. Prerecorded captions are covered under 1.2.2.'),

        heading('Why it matters'),
        p('Live events are time-sensitive by nature. If a deaf or hard-of-hearing user cannot access the audio content during a live event, they lose the opportunity to participate, ask questions, and engage with the content in real time. A post-event transcript does not provide the same experience as real-time access.'),
        p('Live captions are essential for workplace inclusivity — remote meetings, company town halls, and training sessions all require real-time captions to include employees with hearing disabilities.'),
        blockquote('The value of live captions lies in their immediacy. A delayed transcript cannot replace the experience of participating in a live event in real time.'),

        heading('Related axe-core rules'),
        p('There are no axe-core rules for live captioning. Automated tools cannot detect whether a live stream includes real-time captions. This criterion requires manual testing during actual live events.'),

        heading('How to test'),
        numbered('Attend or simulate a live event or stream on the platform.'),
        numbered('Enable live captions and observe whether text appears in real time as speakers talk.'),
        numbered('Evaluate caption latency — captions should appear within 3-5 seconds of the spoken word.'),
        numbered('Check caption accuracy — while some errors are expected in live captioning, the content must be substantially understandable.'),
        numbered('Verify that speaker identification is provided when multiple speakers are present.'),
        numbered('Confirm that the captioning solution handles technical terminology and proper nouns relevant to the content.'),

        heading('How to fix'),
        p('Integrate a live captioning service into your streaming platform. Many platforms offer built-in live captioning or support third-party CART services:'),
        code('<!-- Example: Embedding a live caption overlay -->\n<div class="live-stream-container" role="region" aria-label="Live stream with captions">\n  <video id="live-player" autoplay>\n    <source src="stream-url" type="application/x-mpegURL" />\n  </video>\n  <div\n    id="live-captions"\n    role="log"\n    aria-live="polite"\n    aria-label="Live captions"\n    class="caption-overlay"\n  >\n    <!-- Captions injected in real time -->\n  </div>\n</div>', 'html'),
        p('For WebRTC-based applications, use the Web Speech API as a fallback with human correction:'),
        code('const recognition = new webkitSpeechRecognition();\nrecognition.continuous = true;\nrecognition.interimResults = true;\nrecognition.lang = "en-US";\n\nrecognition.onresult = (event) => {\n  const transcript = Array.from(event.results)\n    .map(result => result[0].transcript)\n    .join("");\n  document.getElementById("live-captions").textContent = transcript;\n};\n\nrecognition.start();', 'javascript'),
        p('For production environments, consider professional CART services or AI-powered solutions with human-in-the-loop correction for higher accuracy.'),

        heading('Common mistakes'),
        bullet('Relying solely on automated speech recognition without any human correction, resulting in unintelligible captions.'),
        bullet('Not testing the captioning system before going live, leading to technical failures during the event.'),
        bullet('Excessive caption latency (more than 5-6 seconds) that makes real-time interaction impossible.'),
        bullet('Failing to brief the captioning service on technical vocabulary, proper nouns, and acronyms before the event.'),
        bullet('Providing captions only in the recorded version but not during the live broadcast.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.4, canlı eşzamanlanmış medyanın — web seminerleri, canlı yayınlar, sanal toplantılar ve canlı haber yayınları gibi — gerçek zamanlı altyazı içermesini gerektirir. Önceden kaydedilmiş altyazılardan farklı olarak, canlı altyazılar ses üretilirken oluşturulmalı ve görüntülenmelidir; bu genellikle CART (İletişim Erişimi Gerçek Zamanlı Çeviri), canlı stenografi veya insan düzeltmeli gerçek zamanlı konuşma tanıma yoluyla yapılır.'),
        p('Bu kriter özellikle ses içeriğinin gerçek zamanlı olarak üretildiği canlı etkinlikleri hedefler. Önceden kaydedilmiş altyazılar 1.2.2 kapsamında ele alınır.'),

        heading('Neden önemlidir'),
        p('Canlı etkinlikler doğası gereği zamana duyarlıdır. İşitme engelli bir kullanıcı canlı bir etkinlik sırasında ses içeriğine erişemezse, katılma, soru sorma ve içerikle gerçek zamanlı etkileşim fırsatını kaybeder. Etkinlik sonrası bir transkript, gerçek zamanlı erişimle aynı deneyimi sağlamaz.'),
        p('Canlı altyazılar iş yeri kapsayıcılığı için zorunludur — uzaktan toplantılar, şirket genel toplantıları ve eğitim oturumlarının tümü, işitme engelli çalışanları dahil etmek için gerçek zamanlı altyazı gerektirir.'),
        blockquote('Canlı altyazıların değeri anlıklığında yatar. Gecikmiş bir transkript, canlı bir etkinliğe gerçek zamanlı katılım deneyiminin yerini tutamaz.'),

        heading('İlgili axe-core kuralları'),
        p('Canlı altyazılama için axe-core kuralı bulunmamaktadır. Otomatik araçlar, bir canlı yayının gerçek zamanlı altyazı içerip içermediğini tespit edemez. Bu kriter, gerçek canlı etkinlikler sırasında manuel test gerektirir.'),

        heading('Nasıl test edilir'),
        numbered('Platformdaki bir canlı etkinliğe katılın veya simüle edin.'),
        numbered('Canlı altyazıları etkinleştirin ve konuşmacılar konuştukça metnin gerçek zamanlı olarak görünüp görünmediğini gözlemleyin.'),
        numbered('Altyazı gecikmesini değerlendirin — altyazılar söylenen sözden 3-5 saniye içinde görünmelidir.'),
        numbered('Altyazı doğruluğunu kontrol edin — canlı altyazıda bazı hatalar beklenmekle birlikte, içerik büyük ölçüde anlaşılır olmalıdır.'),
        numbered('Birden fazla konuşmacı olduğunda konuşmacı tanımlamasının sağlandığını doğrulayın.'),
        numbered('Altyazılama çözümünün içerikle ilgili teknik terminolojiyi ve özel isimleri doğru işlediğini onaylayın.'),

        heading('Nasıl düzeltilir'),
        p('Yayın platformunuza bir canlı altyazı hizmeti entegre edin. Birçok platform yerleşik canlı altyazı veya üçüncü taraf CART hizmeti desteği sunar:'),
        code('<!-- Örnek: Canlı altyazı yer paylaşımı yerleştirme -->\n<div class="live-stream-container" role="region" aria-label="Altyazılı canlı yayın">\n  <video id="live-player" autoplay>\n    <source src="yayin-url" type="application/x-mpegURL" />\n  </video>\n  <div\n    id="live-captions"\n    role="log"\n    aria-live="polite"\n    aria-label="Canlı altyazılar"\n    class="caption-overlay"\n  >\n    <!-- Altyazılar gerçek zamanlı olarak eklenir -->\n  </div>\n</div>', 'html'),
        p('WebRTC tabanlı uygulamalar için insan düzeltmeli bir yedek olarak Web Speech API kullanın:'),
        code('const recognition = new webkitSpeechRecognition();\nrecognition.continuous = true;\nrecognition.interimResults = true;\nrecognition.lang = "tr-TR";\n\nrecognition.onresult = (event) => {\n  const transcript = Array.from(event.results)\n    .map(result => result[0].transcript)\n    .join("");\n  document.getElementById("live-captions").textContent = transcript;\n};\n\nrecognition.start();', 'javascript'),
        p('Üretim ortamları için daha yüksek doğruluk sağlayan profesyonel CART hizmetlerini veya insan denetimli yapay zeka destekli çözümleri değerlendirin.'),

        heading('Sık yapılan hatalar'),
        bullet('İnsan düzeltmesi olmadan yalnızca otomatik konuşma tanımaya güvenmek ve anlaşılmaz altyazılarla sonuçlanmak.'),
        bullet('Canlı yayına geçmeden önce altyazılama sistemini test etmemek ve etkinlik sırasında teknik arızalara yol açmak.'),
        bullet('Aşırı altyazı gecikmesi (5-6 saniyeden fazla) nedeniyle gerçek zamanlı etkileşimi imkansız kılmak.'),
        bullet('Etkinlikten önce altyazılama hizmetini teknik terimler, özel isimler ve kısaltmalar konusunda bilgilendirmemek.'),
        bullet('Altyazıları yalnızca kayıtlı sürümde sağlamak, canlı yayın sırasında sunmamak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.4: Captions (Live)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html', source: 'W3C', language: 'en', _key: 'r124w3c1' },
      { title: 'Techniques for Live Captions — G9', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G9', source: 'W3C', language: 'en', _key: 'r124w3c2' },
      { title: 'Live Captions – WebAIM', url: 'https://webaim.org/techniques/captions/#realtime', source: 'WebAIM', language: 'en', _key: 'r124waim' },
      { title: 'Web Speech API – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API', source: 'MDN', language: 'en', _key: 'r124mdn1' },
      { title: 'CART Services for Live Captioning', url: 'https://dcmp.org/learn/captioningkey', source: 'DCMP', language: 'en', _key: 'r124dcmp' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.4: Live Captions Requirements Guide',
        metaDescription: 'Learn how to provide real-time captions for live media content to meet WCAG 1.2.4. Covers CART services, speech recognition, and testing procedures.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.4: Canlı Altyazı Gereksinimleri Rehberi',
        metaDescription: 'WCAG 1.2.4 uyumluluğu için canlı medya içeriklerinde gerçek zamanlı altyazı sağlamayı öğrenin. CART hizmetleri ve test yöntemlerini kapsar.',
      },
    },
  },

  // ── 1.2.5 Audio Description (Prerecorded) ────────────────────────────
  {
    criterionNumber: '1.2.5',
    level: 'AA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'serious',
    axeRuleIds: [],
    tags: ['media', 'video', 'audio-description'],
    title: {
      en: 'Audio Description (Prerecorded)',
      tr: 'Sesli Betimleme (Önceden Kaydedilmiş)',
    },
    description: {
      en: 'Audio description must be provided for all prerecorded video content in synchronized media, describing important visual information not available from the audio track alone.',
      tr: 'Eşzamanlanmış medyadaki tüm önceden kaydedilmiş video içerikleri için, yalnızca ses parçasından elde edilemeyen önemli görsel bilgileri açıklayan sesli betimleme sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.5 is a Level AA escalation of criterion 1.2.3. While 1.2.3 allows either an audio description OR a full media alternative, 1.2.5 specifically requires an audio description track for prerecorded synchronized media. A text alternative alone does not satisfy this criterion.'),
        p('Audio description inserts narration into natural pauses in the dialogue to describe significant visual content — settings, actions, body language, graphics, and scene changes — that is not otherwise communicated through the existing audio.'),

        heading('Why it matters'),
        p('For blind and low-vision users, audio description transforms an incomplete audio experience into a comprehensive one. Without it, they may hear dialogue but miss the visual context that gives that dialogue meaning. For example, in a training video, a speaker might say "as you can see here" while pointing at a chart — without audio description, the chart content is lost.'),
        p('Audio description also benefits users with cognitive disabilities who may find it easier to process information when visual content is reinforced verbally.'),

        heading('Related axe-core rules'),
        p('No axe-core rules specifically test for audio description presence. Automated tools cannot determine whether important visual content exists that requires description. Manual testing is essential for this criterion.'),

        heading('How to test'),
        numbered('Identify all prerecorded videos with synchronized audio on the page.'),
        numbered('Determine whether the video contains important visual information not conveyed through dialogue or narration.'),
        numbered('Check for an audio description track in the video player.'),
        numbered('Play the video with audio description enabled and verify it describes key visual content during natural pauses.'),
        numbered('Confirm the audio description does not conflict with or obscure the primary audio track.'),
        numbered('Verify the audio description covers scene changes, on-screen text, charts, and significant actions.'),

        heading('How to fix'),
        p('Create a secondary audio track that includes the original audio plus narrated descriptions. Use the <track> element for delivery:'),
        code('<video controls>\n  <source src="/demo-video.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/demo-captions.vtt"\n    srclang="en"\n    label="English Captions"\n    default\n  />\n  <track\n    kind="descriptions"\n    src="/demo-audiodesc.vtt"\n    srclang="en"\n    label="Audio Description"\n  />\n</video>\n\n<!-- Alternative: provide a separate version with baked-in description -->\n<p>\n  <a href="/demo-video-described.mp4">\n    Watch version with audio description\n  </a>\n</p>', 'html'),
        p('When creating audio descriptions, follow these scripting guidelines:'),
        bullet('Describe only what is visually apparent — do not interpret or editorialize.'),
        bullet('Use present tense: "Sarah walks to the whiteboard" not "Sarah walked to the whiteboard."'),
        bullet('Identify speakers and new characters when they first appear.'),
        bullet('Describe on-screen text verbatim or summarize if time is limited.'),
        bullet('Prioritize information that is essential to understanding the content.'),
        p('Example audio description script snippet:'),
        code('WEBVTT\n\n1\n00:00:02.000 --> 00:00:05.000\nA woman in a blue blazer stands at a podium\nin a modern conference room.\n\n2\n00:00:12.000 --> 00:00:15.500\nA slide reads: "Q3 Revenue: $4.2 million,\nup 18% from Q2." A green upward arrow\nis displayed next to the figure.\n\n3\n00:00:28.000 --> 00:00:31.000\nShe gestures to a pie chart showing\nmarket share by region: Americas 45%,\nEurope 30%, Asia 25%.', 'text'),

        heading('Common mistakes'),
        bullet('Offering only a text transcript instead of an actual audio description track at Level AA.'),
        bullet('Cramming too much description into short pauses, making the narration rushed and hard to follow.'),
        bullet('Omitting description of on-screen text, assuming viewers can read it.'),
        bullet('Using inconsistent terminology for recurring visual elements across the description.'),
        bullet('Failing to describe who is speaking when camera angles change.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.5, kriter 1.2.3\'ün Seviye AA seviyesine yükseltilmiş halidir. 1.2.3 sesli betimleme VEYA tam bir medya alternatifine izin verirken, 1.2.5 önceden kaydedilmiş eşzamanlanmış medya için özellikle bir sesli betimleme parçası gerektirir. Yalnızca metin alternatifi bu kriteri karşılamaz.'),
        p('Sesli betimleme, diyalogdaki doğal duraklamalara anlatım ekleyerek mevcut ses yoluyla aktarılmayan önemli görsel içeriği — ortamlar, eylemler, beden dili, grafikler ve sahne değişiklikleri — açıklar.'),

        heading('Neden önemlidir'),
        p('Görme engelli ve az gören kullanıcılar için sesli betimleme, eksik bir ses deneyimini kapsamlı bir deneyime dönüştürür. Bu olmadan diyaloğu duyabilirler ancak o diyaloğa anlam katan görsel bağlamı kaçırırlar. Örneğin, bir eğitim videosunda konuşmacı bir grafiği göstererek "burada gördüğünüz gibi" diyebilir — sesli betimleme olmadan grafik içeriği kaybolur.'),
        p('Sesli betimleme ayrıca görsel içerik sözlü olarak pekiştirildiğinde bilgiyi daha kolay işleyen bilişsel engelli kullanıcılara da fayda sağlar.'),

        heading('İlgili axe-core kuralları'),
        p('Sesli betimleme varlığını özellikle test eden axe-core kuralı yoktur. Otomatik araçlar, açıklama gerektiren önemli görsel içeriğin olup olmadığını belirleyemez. Bu kriter için manuel test şarttır.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki eşzamanlanmış sese sahip tüm önceden kaydedilmiş videoları belirleyin.'),
        numbered('Videonun diyalog veya anlatım yoluyla aktarılmayan önemli görsel bilgi içerip içermediğini belirleyin.'),
        numbered('Video oynatıcıda sesli betimleme parçasını kontrol edin.'),
        numbered('Sesli betimleme etkinleştirilmiş olarak videoyu oynatın ve doğal duraklamalar sırasında önemli görsel içeriğin açıklandığını doğrulayın.'),
        numbered('Sesli betimlemenin birincil ses parçasıyla çakışmadığını veya onu engellemediğini onaylayın.'),
        numbered('Sesli betimlemenin sahne değişikliklerini, ekrandaki metinleri, grafikleri ve önemli eylemleri kapsadığını doğrulayın.'),

        heading('Nasıl düzeltilir'),
        p('Orijinal ses ile anlatılmış açıklamaları içeren ikincil bir ses parçası oluşturun. Sunumda <track> öğesini kullanın:'),
        code('<video controls>\n  <source src="/demo-video.mp4" type="video/mp4" />\n  <track\n    kind="captions"\n    src="/demo-altyazi.vtt"\n    srclang="tr"\n    label="Türkçe Altyazı"\n    default\n  />\n  <track\n    kind="descriptions"\n    src="/demo-seslibetimleme.vtt"\n    srclang="tr"\n    label="Sesli Betimleme"\n  />\n</video>\n\n<!-- Alternatif: gömülü betimlemeli ayrı bir sürüm sunun -->\n<p>\n  <a href="/demo-video-betimlemeli.mp4">\n    Sesli betimlemeli sürümü izle\n  </a>\n</p>', 'html'),
        p('Sesli betimleme oluştururken şu senaryo yazım kurallarına uyun:'),
        bullet('Yalnızca görsel olarak belirgin olanı açıklayın — yorum yapmayın.'),
        bullet('Şimdiki zaman kullanın: "Ayşe tahtaya yürür" ifadesini kullanın.'),
        bullet('Konuşmacıları ve yeni karakterleri ilk göründüklerinde tanımlayın.'),
        bullet('Ekrandaki metni birebir aktarın veya zaman sınırlıysa özetleyin.'),
        bullet('İçeriği anlamak için kritik olan bilgilere öncelik verin.'),
        p('Örnek sesli betimleme senaryosu:'),
        code('WEBVTT\n\n1\n00:00:02.000 --> 00:00:05.000\nMavi blazer giyen bir kadın modern\nbir konferans salonundaki kürsüde duruyor.\n\n2\n00:00:12.000 --> 00:00:15.500\nSlayt şunu gösteriyor: "3. Çeyrek Gelir:\n4,2 milyon dolar, 2. Çeyreğe göre %18 artış."\nRakamın yanında yeşil bir yukarı ok görünüyor.\n\n3\n00:00:28.000 --> 00:00:31.000\nBölgelere göre pazar payını gösteren\nbir pasta grafiğe işaret ediyor: Amerika %45,\nAvrupa %30, Asya %25.', 'text'),

        heading('Sık yapılan hatalar'),
        bullet('Seviye AA\'da gerçek bir sesli betimleme parçası yerine yalnızca metin transkripti sunmak.'),
        bullet('Kısa duraklamalara çok fazla açıklama sığdırmaya çalışmak ve anlatımı aceleye getirmek.'),
        bullet('İzleyicilerin okuyabileceğini varsayarak ekrandaki metnin açıklamasını atlamak.'),
        bullet('Betimleme boyunca tekrarlayan görsel öğeler için tutarsız terminoloji kullanmak.'),
        bullet('Kamera açıları değiştiğinde kimin konuştuğunu açıklamamak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.5: Audio Description (Prerecorded)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html', source: 'W3C', language: 'en', _key: 'r125w3c1' },
      { title: 'Providing audio description – G78', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G78', source: 'W3C', language: 'en', _key: 'r125w3c2' },
      { title: 'Audio Description – WebAIM', url: 'https://webaim.org/techniques/captions/#ad', source: 'WebAIM', language: 'en', _key: 'r125waim' },
      { title: 'Audio Description Project', url: 'https://www.acb.org/adp', source: 'American Council of the Blind', language: 'en', _key: 'r125acb1' },
      { title: 'DCMP Description Key', url: 'https://dcmp.org/learn/description-key', source: 'DCMP', language: 'en', _key: 'r125dcmp' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.5: Audio Description for Video Guide',
        metaDescription: 'Meet WCAG 1.2.5 Level AA by providing audio descriptions for prerecorded video. Scripting guidelines, WebVTT examples, and testing steps.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.5: Video İçin Sesli Betimleme Rehberi',
        metaDescription: 'Önceden kaydedilmiş video için sesli betimleme sağlayarak WCAG 1.2.5 Seviye AA uyumluluğunu karşılayın. Senaryo kuralları ve test adımları.',
      },
    },
  },

  // ── 1.2.6 Sign Language (Prerecorded) ─────────────────────────────────
  {
    criterionNumber: '1.2.6',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['media', 'video', 'sign-language'],
    title: {
      en: 'Sign Language (Prerecorded)',
      tr: 'İşaret Dili (Önceden Kaydedilmiş)',
    },
    description: {
      en: 'Sign language interpretation must be provided for all prerecorded audio content in synchronized media, offering an alternative for users whose primary language is sign language.',
      tr: 'Eşzamanlanmış medyadaki tüm önceden kaydedilmiş ses içerikleri için işaret dili çevirisi sağlanmalıdır; bu, birincil dili işaret dili olan kullanıcılara alternatif sunar.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.6 requires that prerecorded synchronized media include a sign language interpretation of the audio content. This is a Level AAA criterion that goes beyond captions by providing communication in the native language of many deaf individuals. While captions represent audio as written text, sign language conveys meaning through visual-gestural communication with its own grammar and syntax.'),
        p('The sign language interpretation can be embedded as a picture-in-picture overlay within the video or provided as a separate synchronized video.'),

        heading('Why it matters'),
        p('For many people who are deaf from birth or early childhood, sign language is their first and most fluent language. Written text — even in the form of captions — represents a second language that may be more difficult to process. Sign language interpretation provides content in their most accessible communication form.'),
        p('This is particularly important for complex content such as educational materials, legal proceedings, medical information, and government communications where comprehension is critical.'),
        blockquote('Captions are essential, but they do not replace the need for sign language. For many deaf individuals, sign language is their primary mode of communication and comprehension.'),

        heading('Related axe-core rules'),
        p('No axe-core rules test for sign language interpretation. This is entirely a manual testing criterion that requires human evaluation to verify the presence and quality of sign language content.'),

        heading('How to test'),
        numbered('Identify all prerecorded videos with audio content on the page.'),
        numbered('Check whether a sign language interpretation is available — either embedded in the video or as a separate synchronized option.'),
        numbered('Have a sign language user evaluate whether the interpretation accurately conveys the audio content.'),
        numbered('Verify the sign language interpreter is clearly visible with adequate lighting, contrast, and resolution.'),
        numbered('Confirm the interpretation is synchronized with the audio and covers all spoken content.'),

        heading('How to fix'),
        p('Embed a sign language interpretation window within the video:'),
        code('<video controls>\n  <source src="/presentation-with-signer.mp4" type="video/mp4" />\n  <track kind="captions" src="/presentation.vtt" srclang="en" label="English" default />\n</video>\n\n<!-- Or provide as a separate synchronized video -->\n<div class="media-container" style="display: flex; gap: 1rem;">\n  <video id="main-video" controls style="flex: 3;">\n    <source src="/presentation.mp4" type="video/mp4" />\n  </video>\n  <video id="sign-video" style="flex: 1;" aria-label="Sign language interpretation">\n    <source src="/presentation-sign.mp4" type="video/mp4" />\n  </video>\n</div>', 'html'),
        p('Synchronize both videos programmatically:'),
        code('const main = document.getElementById("main-video");\nconst sign = document.getElementById("sign-video");\n\nmain.addEventListener("play", () => {\n  sign.currentTime = main.currentTime;\n  sign.play();\n});\n\nmain.addEventListener("pause", () => sign.pause());\nmain.addEventListener("seeked", () => {\n  sign.currentTime = main.currentTime;\n});', 'javascript'),

        heading('Common mistakes'),
        bullet('Using a sign language window that is too small for the interpreter to be clearly seen.'),
        bullet('Poor lighting or low contrast behind the interpreter, making signs difficult to distinguish.'),
        bullet('Using a sign language interpreter who is not fluent in the specific sign language of the target audience (e.g., using ASL for a BSL audience).'),
        bullet('Not synchronizing the sign language video with the main video, causing timing mismatches.'),
        bullet('Placing the interpreter window over important visual content in the main video.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.6, önceden kaydedilmiş eşzamanlanmış medyanın ses içeriğinin işaret dili çevirisini içermesini gerektirir. Bu, altyazıların ötesine geçerek birçok işitme engelli bireyin ana dilinde iletişim sağlayan Seviye AAA kriteridir. Altyazılar sesi yazılı metin olarak temsil ederken, işaret dili kendi dilbilgisi ve söz dizimine sahip görsel-jestsel iletişimle anlam aktarır.'),
        p('İşaret dili çevirisi, video içinde resim içinde resim (picture-in-picture) olarak yerleştirilebilir veya ayrı bir eşzamanlanmış video olarak sunulabilir.'),

        heading('Neden önemlidir'),
        p('Doğuştan veya erken çocukluktan itibaren işitme engelli olan birçok kişi için işaret dili, birincil ve en akıcı dilleridir. Yazılı metin — altyazı formunda bile — daha zor işlenebilen ikinci bir dili temsil eder. İşaret dili çevirisi, içeriği en erişilebilir iletişim biçimlerinde sunar.'),
        p('Bu özellikle eğitim materyalleri, hukuki süreçler, tıbbi bilgiler ve kavramanın kritik olduğu devlet iletişimleri gibi karmaşık içerikler için önemlidir.'),
        blockquote('Altyazılar zorunludur ancak işaret dili ihtiyaçının yerini tutmaz. Birçok işitme engelli birey için işaret dili, birincil iletişim ve anlama biçimidir.'),

        heading('İlgili axe-core kuralları'),
        p('İşaret dili çevirisini test eden axe-core kuralı yoktur. Bu tamamen, işaret dili içeriğinin varlığını ve kalitesini doğrulamak için insan değerlendirmesi gerektiren manuel bir test kriteridir.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki ses içeriğine sahip tüm önceden kaydedilmiş videoları belirleyin.'),
        numbered('İşaret dili çevirisinin mevcut olup olmadığını kontrol edin — videoya gömülü veya ayrı bir eşzamanlanmış seçenek olarak.'),
        numbered('Çevirinin ses içeriğini doğru bir şekilde aktarıp aktarmadığını değerlendirmek için bir işaret dili kullanıcısından yardım alın.'),
        numbered('İşaret dili çevirmeninin yeterli aydınlatma, kontrast ve çözünürlükle net bir şekilde görülebildiğini doğrulayın.'),
        numbered('Çevirinin sesle eşzamanlandığini ve tüm konuşulan içeriği kapsadığını onaylayın.'),

        heading('Nasıl düzeltilir'),
        p('Video içine bir işaret dili çevirisi penceresi yerleştirin:'),
        code('<video controls>\n  <source src="/sunum-isaretdili.mp4" type="video/mp4" />\n  <track kind="captions" src="/sunum.vtt" srclang="tr" label="Türkçe" default />\n</video>\n\n<!-- Veya ayrı eşzamanlanmış video olarak sunun -->\n<div class="media-container" style="display: flex; gap: 1rem;">\n  <video id="ana-video" controls style="flex: 3;">\n    <source src="/sunum.mp4" type="video/mp4" />\n  </video>\n  <video id="isaret-video" style="flex: 1;" aria-label="İşaret dili çevirisi">\n    <source src="/sunum-isaret.mp4" type="video/mp4" />\n  </video>\n</div>', 'html'),
        p('Her iki videoyu programatik olarak eşzamanlayın:'),
        code('const ana = document.getElementById("ana-video");\nconst isaret = document.getElementById("isaret-video");\n\nana.addEventListener("play", () => {\n  isaret.currentTime = ana.currentTime;\n  isaret.play();\n});\n\nana.addEventListener("pause", () => isaret.pause());\nana.addEventListener("seeked", () => {\n  isaret.currentTime = ana.currentTime;\n});', 'javascript'),

        heading('Sık yapılan hatalar'),
        bullet('Çevirmenin net görülemeyeceği kadar küçük bir işaret dili penceresi kullanmak.'),
        bullet('Çevirmenin arkasında yetersiz aydınlatma veya düşük kontrast olması ve işaretlerin ayırt edilmesini zorlaştırması.'),
        bullet('Hedef kitlenin işaret diline hakim olmayan bir çevirmen kullanmak (örn. BSL izleyicileri için ASL kullanmak).'),
        bullet('İşaret dili videosunu ana videoyla eşzamanlamamak ve zamanlama uyumsuzluklarına neden olmak.'),
        bullet('Çevirmen penceresini ana videodaki önemli görsel içeriğin üzerine yerleştirmek.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.6: Sign Language (Prerecorded)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html', source: 'W3C', language: 'en', _key: 'r126w3c1' },
      { title: 'Techniques for Sign Language — G54', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G54', source: 'W3C', language: 'en', _key: 'r126w3c2' },
      { title: 'Sign Language Accessibility – WebAIM', url: 'https://webaim.org/techniques/captions/#sign', source: 'WebAIM', language: 'en', _key: 'r126waim' },
      { title: 'World Federation of the Deaf – Sign Language Rights', url: 'https://wfdeaf.org/our-work/human-rights-of-the-deaf/', source: 'WFD', language: 'en', _key: 'r126wfd1' },
      { title: 'NAD – Sign Language Interpreting', url: 'https://www.nad.org/resources/technology/captioning-for-access/', source: 'NAD', language: 'en', _key: 'r126nad1' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.6: Sign Language for Prerecorded Media',
        metaDescription: 'Guide to providing sign language interpretation for prerecorded video content per WCAG 1.2.6 Level AAA. Includes implementation and synchronization examples.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.6: Kaydedilmiş Medya İçin İşaret Dili',
        metaDescription: 'WCAG 1.2.6 Seviye AAA uyarınca önceden kaydedilmiş video içeriği için işaret dili çevirisi sağlama rehberi. Uygulama örnekleri dahil.',
      },
    },
  },

  // ── 1.2.7 Extended Audio Description (Prerecorded) ───────────────────
  {
    criterionNumber: '1.2.7',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['media', 'video', 'audio-description'],
    title: {
      en: 'Extended Audio Description (Prerecorded)',
      tr: 'Genişletilmiş Sesli Betimleme',
    },
    description: {
      en: 'Where pauses in foreground audio are insufficient for audio descriptions, extended audio description must be provided by pausing the video to allow complete descriptions of visual content.',
      tr: 'Ön plan sesindeki duraklamalar sesli betimleme için yetersiz olduğunda, görsel içeriğin eksiksiz açıklanmasına olanak tanımak üzere video duraklatılarak genişletilmiş sesli betimleme sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.7 addresses situations where the natural pauses in a video\'s audio track are too short to fit adequate audio descriptions. In these cases, the video must be paused to allow the description to play, then resumed önce the description is complete. This is known as "extended audio description."'),
        p('This Level AAA criterion builds on 1.2.5 by removing the constraint that descriptions must fit within natural pauses. It ensures that even dialogue-heavy or fast-paced content can be fully described for blind and low-vision users.'),

        heading('Why it matters'),
        p('Many videos — particularly educational content, documentaries, and dramatic productions — have continuous dialogue or narration with few natural pauses. Standard audio description (1.2.5) cannot adequately describe complex visual content when there is no room in the audio timeline. Extended audio description solves this by temporarily freezing the video.'),
        p('Without extended audio description, blind users watching dialogue-heavy content with significant visual elements receive an incomplete experience. The descriptions are either crammed into inadequate spaces or omitted entirely.'),

        heading('Related axe-core rules'),
        p('No axe-core rules address extended audio description. This criterion requires manual testing and human judgment about the adequacy of existing pause durations for audio descriptions.'),

        heading('How to test'),
        numbered('Identify prerecorded videos where standard audio description cannot fit all necessary visual information into natural pauses.'),
        numbered('Verify that an extended audio description option is available.'),
        numbered('Play the video with extended audio description enabled.'),
        numbered('Confirm that the video pauses automatically to allow descriptions to complete before resuming playback.'),
        numbered('Verify that all critical visual information is described, even for scenes with continuous dialogue.'),
        numbered('Check that the user experience is not jarring — transitions between paused and playing states should be smooth.'),

        heading('How to fix'),
        p('Implement a custom video player that supports pausing for extended descriptions:'),
        code('class ExtendedAudioDescPlayer {\n  constructor(videoEl, descriptions) {\n    this.video = videoEl;\n    this.descriptions = descriptions; // sorted by time\n    this.synth = window.speechSynthesis;\n    this.video.addEventListener("timeupdate", () => this.check());\n  }\n\n  check() {\n    const t = this.video.currentTime;\n    const desc = this.descriptions.find(\n      d => Math.abs(d.time - t) < 0.5 && !d.played\n    );\n    if (desc) {\n      this.video.pause();\n      desc.played = true;\n      const utterance = new SpeechSynthesisUtterance(desc.text);\n      utterance.onend = () => this.video.play();\n      this.synth.speak(utterance);\n    }\n  }\n}\n\nconst player = new ExtendedAudioDescPlayer(\n  document.querySelector("video"),\n  [\n    { time: 5.0, text: "A complex diagram shows the network topology with six interconnected nodes.", played: false },\n    { time: 22.0, text: "The screen splits into four quadrants, each showing a different camera angle.", played: false },\n  ]\n);', 'javascript'),
        p('For server-side implementation, create an alternate version of the video with built-in pauses:'),
        code('<div role="region" aria-label="Video with extended audio description">\n  <video controls>\n    <source src="/lecture-extended-ad.mp4" type="video/mp4" />\n    <track kind="captions" src="/lecture-captions.vtt" srclang="en" default />\n  </video>\n  <p>This version includes extended pauses for complete audio descriptions.</p>\n</div>\n\n<p>\n  <a href="/lecture-standard.mp4">Watch standard version (without extended descriptions)</a>\n</p>', 'html'),

        heading('Common mistakes'),
        bullet('Assuming standard audio description is always sufficient without evaluating the actual pause durations.'),
        bullet('Implementing extended description in a way that causes audio/video synchronization issues when playback resumes.'),
        bullet('Not providing a toggle to switch between standard and extended description modes.'),
        bullet('Pausing the video at awkward moments that disrupt the viewing experience unnecessarily.'),
        bullet('Using only text-to-speech for extended descriptions without professional narration for quality content.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.7, bir videonun ses parçasındaki doğal duraklamaların yeterli sesli betimlemeye sığmayacak kadar kısa olduğu durumları ele alır. Bu durumlarda, açıklamanın oynatılmasına izin vermek üzere video duraklatılmalı ve açıklama tamamlandığında devam edilmelidir. Bu "genişletilmiş sesli betimleme" olarak bilinir.'),
        p('Bu Seviye AAA kriteri, 1.2.5\'in üzerine inşa edilerek açıklamaların doğal duraklamalara sığması gerektiği kısıtlamasını kaldırır. Diyalog yoğun veya hızlı tempolu içeriğin bile görme engelli kullanıcılar için tam olarak açıklanabilmesini sağlar.'),

        heading('Neden önemlidir'),
        p('Birçok video — özellikle eğitim içerikleri, belgeseller ve dramatik yapımlar — az sayıda doğal duraklamayla sürekli diyalog veya anlatım içerir. Standart sesli betimleme (1.2.5), ses zaman çizelgesinde yer olmadığında karmaşık görsel içeriği yeterince açıklayamaz. Genişletilmiş sesli betimleme, videoyu geçici olarak dondurarak bu sorunu çözer.'),
        p('Genişletilmiş sesli betimleme olmadan, önemli görsel öğelere sahip diyalog yoğun içerikleri izleyen görme engelli kullanıcılar eksik bir deneyim yaşar. Açıklamalar ya yetersiz alanlara sıkıştırılır ya da tamamen atlanır.'),

        heading('İlgili axe-core kuralları'),
        p('Genişletilmiş sesli betimlemeyi ele alan axe-core kuralı yoktur. Bu kriter, mevcut duraklama sürelerinin sesli betimlemeler için yeterliliği hakkında manuel test ve insan değerlendirmesi gerektirir.'),

        heading('Nasıl test edilir'),
        numbered('Standart sesli betimlemenin gerekli tüm görsel bilgileri doğal duraklamalara sığdıramadığı önceden kaydedilmiş videoları belirleyin.'),
        numbered('Genişletilmiş sesli betimleme seçeneğinin mevcut olduğunu doğrulayın.'),
        numbered('Genişletilmiş sesli betimleme etkinleştirilmiş olarak videoyu oynatın.'),
        numbered('Videonun, oynatmaya devam etmeden önce açıklamaların tamamlanmasına izin vermek üzere otomatik olarak durduğunu onaylayın.'),
        numbered('Sürekli diyalog olan sahneler dahil tüm kritik görsel bilgilerin açıklandığını doğrulayın.'),
        numbered('Kullanıcı deneyiminin rahatsız edici olmadığını kontrol edin — duraklatılmış ve oynatılan durumlar arasındaki geçişler akıcı olmalıdır.'),

        heading('Nasıl düzeltilir'),
        p('Genişletilmiş açıklamalar için duraklatmayı destekleyen özel bir video oynatıcı uygulayın:'),
        code('class GenisletilmisSesliBetimOynatici {\n  constructor(videoEl, betimlemeler) {\n    this.video = videoEl;\n    this.betimlemeler = betimlemeler;\n    this.synth = window.speechSynthesis;\n    this.video.addEventListener("timeupdate", () => this.kontrol());\n  }\n\n  kontrol() {\n    const t = this.video.currentTime;\n    const betim = this.betimlemeler.find(\n      b => Math.abs(b.zaman - t) < 0.5 && !b.oynadi\n    );\n    if (betim) {\n      this.video.pause();\n      betim.oynadi = true;\n      const soyleme = new SpeechSynthesisUtterance(betim.metin);\n      soyleme.lang = "tr-TR";\n      soyleme.onend = () => this.video.play();\n      this.synth.speak(soyleme);\n    }\n  }\n}\n\nconst oynatici = new GenisletilmisSesliBetimOynatici(\n  document.querySelector("video"),\n  [\n    { zaman: 5.0, metin: "Karmaşık bir diyagram, altı birbirine bağlı düğümle ağ topolojisini gösteriyor.", oynadi: false },\n    { zaman: 22.0, metin: "Ekran dört bölüme ayrılıyor, her biri farklı bir kamera açısını gösteriyor.", oynadi: false },\n  ]\n);', 'javascript'),
        p('Sunucu tarafı uygulama için, yerleşik duraklamalara sahip videonun alternatif bir sürümünü oluşturun:'),
        code('<div role="region" aria-label="Genişletilmiş sesli betimlemeli video">\n  <video controls>\n    <source src="/ders-genisletilmis-sb.mp4" type="video/mp4" />\n    <track kind="captions" src="/ders-altyazi.vtt" srclang="tr" default />\n  </video>\n  <p>Bu sürüm, eksiksiz sesli betimlemeler için genişletilmiş duraklamalar içerir.</p>\n</div>\n\n<p>\n  <a href="/ders-standart.mp4">Standart sürümü izle (genişletilmiş betimlemesiz)</a>\n</p>', 'html'),

        heading('Sık yapılan hatalar'),
        bullet('Gerçek duraklama sürelerini değerlendirmeden standart sesli betimlemenin her zaman yeterli olduğunu varsaymak.'),
        bullet('Genişletilmiş betimlemeyi, oynatma devam ettiğinde ses/video eşzamanlama sorunlarına neden olacak şekilde uygulamak.'),
        bullet('Standart ve genişletilmiş betimleme modları arasında geçiş yapma seçeneği sunmamak.'),
        bullet('Videoyu, izleme deneyimini gereksiz yere bozan uygunsuz anlarda duraklatmak.'),
        bullet('Kaliteli içerik için profesyonel anlatım olmadan yalnızca metinden konuşmaya teknolojisi kullanmak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.7: Extended Audio Description', url: 'https://www.w3.org/WAI/WCAG22/Understanding/extended-audio-description-prerecorded.html', source: 'W3C', language: 'en', _key: 'r127w3c1' },
      { title: 'Techniques for Extended Audio Description — G8', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G8', source: 'W3C', language: 'en', _key: 'r127w3c2' },
      { title: 'Extended Audio Description – WebAIM', url: 'https://webaim.org/techniques/captions/#extended', source: 'WebAIM', language: 'en', _key: 'r127waim' },
      { title: 'Web Speech API – SpeechSynthesis – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis', source: 'MDN', language: 'en', _key: 'r127mdn1' },
      { title: 'DCMP Description Key', url: 'https://dcmp.org/learn/description-key', source: 'DCMP', language: 'en', _key: 'r127dcmp' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.7: Extended Audio Description Guide',
        metaDescription: 'How to implement extended audio description for prerecorded video per WCAG 1.2.7 Level AAA. Includes player implementation and pause-based techniques.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.7: Genişletilmiş Sesli Betimleme Rehberi',
        metaDescription: 'WCAG 1.2.7 Seviye AAA uyarınca önceden kaydedilmiş video için genişletilmiş sesli betimleme uygulama rehberi. Oynatıcı uygulama örnekleri dahil.',
      },
    },
  },

  // ── 1.2.8 Media Alternative (Prerecorded) ────────────────────────────
  {
    criterionNumber: '1.2.8',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['media', 'video', 'transcript'],
    title: {
      en: 'Media Alternative (Prerecorded)',
      tr: 'Medya Alternatifi (Önceden Kaydedilmiş)',
    },
    description: {
      en: 'A full text alternative must be provided for all prerecorded synchronized media and all prerecorded video-only media, presenting all visual and auditory information in text form.',
      tr: 'Tüm önceden kaydedilmiş eşzamanlanmış medya ve yalnızca video medyası için, tüm görsel ve işitsel bilgileri metin biçiminde sunan tam bir metin alternatifi sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.8 requires a complete text-based alternative for prerecorded synchronized media. This alternative must describe everything that happens in the video — all dialogue, all meaningful sounds, and all significant visual information — in a document that can be read sequentially. This is sometimes called an "enhanced transcript" or "media alternative."'),
        p('Unlike a simple transcript that only captures dialogue, a media alternative must include descriptions of visual actions, scene changes, on-screen text, and non-verbal communication such as facial expressions and gestures, presented in the correct temporal order.'),

        heading('Why it matters'),
        p('A full media alternative serves users who are deafblind and access content through refreshable braille displays. It also helps users who cannot play media due to bandwidth constraints, technology limitations, or environmental factors. Additionally, it provides a comprehensive text resource for search engines and supports users with cognitive disabilities who may prefer to read content at their own pace.'),
        p('This Level AAA criterion recognizes that neither captions nor audio descriptions alone provide a complete text-based experience of the media content.'),

        heading('Related axe-core rules'),
        p('No axe-core rules test for media alternatives. Verifying the completeness and accuracy of a media alternative document requires human evaluation comparing the text against the full audiovisual content.'),

        heading('How to test'),
        numbered('Identify all prerecorded synchronized media and video-only media on the page.'),
        numbered('Locate the media alternative — it should be linked directly from or adjacent to the media player.'),
        numbered('Play the video while reading the media alternative simultaneously.'),
        numbered('Verify that all spoken dialogue is accurately transcribed with speaker identification.'),
        numbered('Confirm that visual-only information (actions, scene changes, on-screen text, graphics) is described.'),
        numbered('Check that non-speech audio (music, sound effects, silence) is noted.'),
        numbered('Ensure the temporal order of events is preserved in the text.'),

        heading('How to fix'),
        p('Create a structured media alternative document and link it from the video player:'),
        code('<video controls>\n  <source src="/product-overview.mp4" type="video/mp4" />\n  <track kind="captions" src="/product-overview.vtt" srclang="en" default />\n</video>\n<a href="/product-overview-transcript.html">\n  Complete media alternative (full transcript with visual descriptions)\n</a>', 'html'),
        p('The media alternative document should follow this structure:'),
        code('<article class="media-alternative">\n  <h1>Media Alternative: Product Overview Video</h1>\n  <p><strong>Duration:</strong> 4 minutes 32 seconds</p>\n\n  <section>\n    <h2>Scene 1: Introduction (0:00 – 0:45)</h2>\n    <p><em>[Upbeat background music plays]</em></p>\n    <p><em>[Wide shot of a modern office. The company logo appears\n    centered on screen in white text on a blue background.]</em></p>\n    <p><strong>Narrator:</strong> Welcome to the product overview.\n    Today we will explore the three core features of our platform.</p>\n    <p><em>[The screen transitions to a dashboard interface showing\n    a sidebar navigation and a main content area with charts.]</em></p>\n  </section>\n\n  <section>\n    <h2>Scene 2: Feature Demo (0:45 – 2:30)</h2>\n    <p><em>[Close-up of the dashboard. The cursor clicks on\n    "Analytics" in the sidebar.]</em></p>\n    <p><strong>Narrator:</strong> The analytics dashboard gives you\n    real-time insights into your team\'s performance.</p>\n    <p><em>[A bar chart animates in, showing monthly data.\n    The Y-axis is labeled "Tasks Completed" and ranges from 0 to 500.\n    March shows the highest bar at approximately 450.]</em></p>\n  </section>\n</article>', 'html'),

        heading('Common mistakes'),
        bullet('Providing only a dialogue transcript without descriptions of visual content.'),
        bullet('Omitting speaker identification, making it unclear who is saying what.'),
        bullet('Not describing on-screen text, charts, or infographics that convey essential information.'),
        bullet('Placing the media alternative at a URL that is not clearly linked from the media player.'),
        bullet('Failing to note meaningful silences, music changes, or ambient sounds that set context.'),
        bullet('Writing the alternative in a disorganized way that does not follow the temporal order of the video.'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.8, önceden kaydedilmiş eşzamanlanmış medya için eksiksiz bir metin tabanlı alternatif gerektirir. Bu alternatif, videoda olan her şeyi — tüm diyaloglar, tüm anlamlı sesler ve tüm önemli görsel bilgiler — sıralı olarak okunabilecek bir belgede açıklamalıdır. Bu bazen "geliştirilmiş transkript" veya "medya alternatifi" olarak adlandırılır.'),
        p('Yalnızca diyaloğu yakalayan basit bir transkripten farklı olarak, bir medya alternatifi görsel eylemlerin, sahne değişikliklerinin, ekrandaki metnin ve yüz ifadeleri ile jestler gibi sözel olmayan iletişimin açıklamalarını doğru zamansal sırayla içermelidir.'),

        heading('Neden önemlidir'),
        p('Tam bir medya alternatifi, içeriğe yenilenebilir braille ekranları aracılığıyla erişen işitme ve görme engelli kullanıcılara hizmet eder. Ayrıca bant genişliği kısıtlamaları, teknoloji sınırlamaları veya çevresel faktörler nedeniyle medya oynatamayan kullanıcılara yardımcı olur. Buna ek olarak, arama motorları için kapsamlı bir metin kaynağı sağlar ve içeriği kendi hızlarında okumayı tercih eden bilişsel engelli kullanıcıları destekler.'),
        p('Bu Seviye AAA kriteri, ne altyazıların ne de sesli betimlemelerin tek başına medya içeriğinin eksiksiz bir metin tabanlı deneyimini sağlamadığını kabul eder.'),

        heading('İlgili axe-core kuralları'),
        p('Medya alternatiflerini test eden axe-core kuralı yoktur. Bir medya alternatifi belgesinin eksiksizliğini ve doğruluğunu doğrulamak, metnin tam görsel-işitsel içerikle karşılaştırılmasını gerektiren insan değerlendirmesi gerektirir.'),

        heading('Nasıl test edilir'),
        numbered('Sayfadaki tüm önceden kaydedilmiş eşzamanlanmış medya ve yalnızca video medyasını belirleyin.'),
        numbered('Medya alternatifini bulun — medya oynatıcıdan doğrudan bağlantılı veya yanında olmalıdır.'),
        numbered('Medya alternatifini aynı anda okurken videoyu oynatın.'),
        numbered('Tüm konuşulan diyaloğun konuşmacı tanımlamasıyla doğru şekilde yazıya döküldüğünü doğrulayın.'),
        numbered('Yalnızca görsel bilgilerin (eylemler, sahne değişiklikleri, ekrandaki metin, grafikler) açıklandığını onaylayın.'),
        numbered('Konuşma dışı sesin (müzik, ses efektleri, sessizlik) belirtildiğini kontrol edin.'),
        numbered('Olayların zamansal sırasının metinde korunduğundan emin olun.'),

        heading('Nasıl düzeltilir'),
        p('Yapılandırılmış bir medya alternatifi belgesi oluşturun ve video oynatıcıdan bağlantı verin:'),
        code('<video controls>\n  <source src="/urun-tanıtım.mp4" type="video/mp4" />\n  <track kind="captions" src="/urun-tanıtım.vtt" srclang="tr" default />\n</video>\n<a href="/urun-tanıtım-transkript.html">\n  Eksiksiz medya alternatifi (görsel açıklamalarla tam transkript)\n</a>', 'html'),
        p('Medya alternatifi belgesi şu yapıyı izlemelidir:'),
        code('<article class="media-alternatifi">\n  <h1>Medya Alternatifi: Ürün Tanıtım Videosu</h1>\n  <p><strong>Süre:</strong> 4 dakika 32 saniye</p>\n\n  <section>\n    <h2>Sahne 1: Giriş (0:00 – 0:45)</h2>\n    <p><em>[Enerjik arka plan müziği çalar]</em></p>\n    <p><em>[Modern bir ofisin geniş çekimi. Şirket logosu\n    mavi arka plan üzerinde beyaz metinle ekranın ortasında belirir.]</em></p>\n    <p><strong>Anlatıcı:</strong> Ürün tanıtımına hoş geldiniz.\n    Bugün platformumuzun üç temel özelliğini inceleyeceğiz.</p>\n    <p><em>[Ekran, kenar çubuğu gezintisi ve grafiklerle\n    ana içerik alanı gösteren bir kontrol paneli arayüzüne geçer.]</em></p>\n  </section>\n\n  <section>\n    <h2>Sahne 2: Özellik Demosu (0:45 – 2:30)</h2>\n    <p><em>[Kontrol panelinin yakın çekimi. İmleç kenar çubuğundaki\n    "Analitik" seçeneğine tıklar.]</em></p>\n    <p><strong>Anlatıcı:</strong> Analitik paneli, ekibinizin\n    performansı hakkında gerçek zamanlı bilgiler sunar.</p>\n    <p><em>[Aylık verileri gösteren bir çubuk grafik animasyonla belirir.\n    Y ekseni "Tamamlanan Görevler" olarak etiketlenmiştir ve 0-500 aralığındadır.\n    Mart ayı yaklaşık 450 ile en yüksek çubuğu gösterir.]</em></p>\n  </section>\n</article>', 'html'),

        heading('Sık yapılan hatalar'),
        bullet('Görsel içerik açıklamaları olmadan yalnızca diyalog transkripti sağlamak.'),
        bullet('Konuşmacı tanımlamasını atlamak ve kimin ne söylediğini belirsiz bırakmak.'),
        bullet('Temel bilgi aktaran ekrandaki metinleri, grafikleri veya infografikleri açıklamamak.'),
        bullet('Medya alternatifini, medya oynatıcıdan net bir şekilde bağlantı verilmemiş bir URL\'ye yerleştirmek.'),
        bullet('Bağlam oluşturan anlamlı sessizlikleri, müzik değişikliklerini veya ortam seslerini belirtmemek.'),
        bullet('Alternatifi, videonun zamansal sırasını takip etmeyen düzensiz bir şekilde yazmak.'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.8: Media Alternative (Prerecorded)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded.html', source: 'W3C', language: 'en', _key: 'r128w3c1' },
      { title: 'Techniques for Media Alternative — G69', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G69', source: 'W3C', language: 'en', _key: 'r128w3c2' },
      { title: 'Transcripts – WebAIM', url: 'https://webaim.org/techniques/captions/#transcripts', source: 'WebAIM', language: 'en', _key: 'r128waim' },
      { title: 'Creating Accessible Transcripts – Deque University', url: 'https://dequeuniversity.com/resources/transcripts', source: 'Deque University', language: 'en', _key: 'r128dequ' },
      { title: 'HTML article element – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article', source: 'MDN', language: 'en', _key: 'r128mdn1' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.8: Media Alternative for Prerecorded Video',
        metaDescription: 'How to create full text alternatives for prerecorded media per WCAG 1.2.8 Level AAA. Includes document structure examples and completeness checklists.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.8: Kaydedilmiş Video İçin Medya Alternatifi',
        metaDescription: 'WCAG 1.2.8 Seviye AAA uyarınca önceden kaydedilmiş medya için tam metin alternatifi oluşturma rehberi. Belge yapısı örnekleri dahil.',
      },
    },
  },

  // ── 1.2.9 Audio-only (Live) ──────────────────────────────────────────
  {
    criterionNumber: '1.2.9',
    level: 'AAA',
    principle: 'perceivable',
    introducedIn: '2.0',
    wcagVersions: ['2.0', '2.1', '2.2'],
    impact: 'moderate',
    axeRuleIds: [],
    tags: ['media', 'audio', 'live'],
    title: {
      en: 'Audio-only (Live)',
      tr: 'Yalnızca Ses (Canlı)',
    },
    description: {
      en: 'A text alternative must be provided for live audio-only content, delivering equivalent information in real time for users who cannot hear the audio.',
      tr: 'Canlı yalnızca ses içerikleri için, sesi duyamayan kullanıcılara gerçek zamanlı eşdeğer bilgi sunan bir metin alternatifi sağlanmalıdır.',
    },
    content: {
      en: [
        heading('What this rule means'),
        p('WCAG 1.2.9 requires that live audio-only content — such as live radio broadcasts, audio-only podcasts streamed in real time, conference call audio, and emergency audio announcements — provide a real-time text alternative. This is typically delivered as live captions or a real-time text stream that conveys the spoken content as it happens.'),
        p('This Level AAA criterion extends the concept of live captions (1.2.4, which covers synchronized media) to audio-only live content. The key difference is that there is no video component — only audio being broadcast in real time.'),

        heading('Why it matters'),
        p('Live audio events exclude deaf and hard-of-hearing users entirely without a text alternative. Unlike prerecorded content where a transcript can be provided after the fact, live audio is time-sensitive — the information has immediate value that diminishes or disappears önce the event is over.'),
        p('Real-time text alternatives are critical for emergency communications, live news audio feeds, and interactive audio events like radio call-in shows where participation depends on understanding the content as it happens.'),
        blockquote('A post-event transcript is better than nothing, but it does not satisfy this criterion. The requirement is for real-time access during the live broadcast.'),

        heading('Related axe-core rules'),
        p('No axe-core rules address live audio-only content. Automated tools cannot detect live audio streams or verify whether real-time text alternatives are being provided. This criterion requires testing during actual live events.'),

        heading('How to test'),
        numbered('Identify all live audio-only content on the platform (live radio, audio streams, conference calls).'),
        numbered('During a live audio event, check whether a real-time text alternative is displayed.'),
        numbered('Evaluate the latency — text should appear within a few seconds of the spoken content.'),
        numbered('Verify that the text accurately represents the spoken content, including speaker identification.'),
        numbered('Check that the text alternative is accessible via screen readers and other assistive technologies.'),
        numbered('Confirm that meaningful non-speech sounds are described in the text stream.'),

        heading('How to fix'),
        p('Implement a live text stream alongside the audio player:'),
        code('<div role="region" aria-label="Live audio broadcast with real-time transcript">\n  <audio controls autoplay>\n    <source src="/live-stream" type="audio/mpeg" />\n    Your browser does not support the audio element.\n  </audio>\n\n  <div\n    id="live-transcript"\n    role="log"\n    aria-live="polite"\n    aria-label="Real-time transcript"\n    class="live-transcript-panel"\n  >\n    <!-- Transcript lines injected in real time -->\n  </div>\n</div>', 'html'),
        p('Connect to a real-time captioning service via WebSocket:'),
        code('const transcriptEl = document.getElementById("live-transcript");\nconst ws = new WebSocket("wss://caption-service.example.com/stream");\n\nws.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  const line = document.createElement("p");\n\n  if (data.speaker) {\n    const speaker = document.createElement("strong");\n    speaker.textContent = `${data.speaker}: `;\n    line.appendChild(speaker);\n  }\n\n  line.appendChild(document.createTextNode(data.text));\n  transcriptEl.appendChild(line);\n\n  // Auto-scroll to the latest line\n  transcriptEl.scrollTop = transcriptEl.scrollHeight;\n};', 'javascript'),
        p('For a simpler approach using the Web Speech API as a real-time fallback:'),
        code('const recognition = new webkitSpeechRecognition();\nrecognition.continuous = true;\nrecognition.interimResults = true;\nrecognition.lang = "en-US";\n\nconst transcriptEl = document.getElementById("live-transcript");\nlet currentParagraph = null;\n\nrecognition.onresult = (event) => {\n  if (!currentParagraph) {\n    currentParagraph = document.createElement("p");\n    transcriptEl.appendChild(currentParagraph);\n  }\n\n  const result = event.results[event.results.length - 1];\n  currentParagraph.textContent = result[0].transcript;\n\n  if (result.isFinal) {\n    currentParagraph = null;\n  }\n};\n\nrecognition.start();', 'javascript'),

        heading('Common mistakes'),
        bullet('Providing only a post-event transcript instead of real-time text during the live broadcast.'),
        bullet('Using automated speech recognition without monitoring for errors, producing unreliable text.'),
        bullet('Not providing speaker identification in the real-time text stream.'),
        bullet('Placing the text alternative in a location that is difficult to find or not associated with the audio player.'),
        bullet('Failing to describe non-speech audio elements such as music, sound effects, or significant pauses.'),
        bullet('Not making the text stream accessible to assistive technologies (missing ARIA roles or live regions).'),
      ],
      tr: [
        heading('Bu kural ne anlama gelir'),
        p('WCAG 1.2.9, canlı yalnızca ses içeriklerinin — canlı radyo yayınları, gerçek zamanlı olarak yayınlanan yalnızca ses podcast\'leri, konferans çağrı sesleri ve acil durum ses duyuruları gibi — gerçek zamanlı bir metin alternatifi sağlamasını gerektirir. Bu genellikle, konuşulan içeriği gerçekleştiği anda aktaran canlı altyazılar veya gerçek zamanlı bir metin akışı olarak sunulur.'),
        p('Bu Seviye AAA kriteri, canlı altyazı kavramını (eşzamanlanmış medyayı kapsayan 1.2.4) yalnızca ses içeren canlı içeriğe genişletir. Temel fark, bir video bileşeninin olmamasıdır — yalnızca gerçek zamanlı olarak yayınlanan ses vardır.'),

        heading('Neden önemlidir'),
        p('Canlı ses etkinlikleri, metin alternatifi olmadan işitme engelli kullanıcıları tamamen dışlar. Sonradan transkript sağlanabilecek önceden kaydedilmiş içeriğin aksine, canlı ses zamana duyarlıdır — bilgi, etkinlik sona erdiğinde azalan veya kaybolan anlık bir değere sahiptir.'),
        p('Gerçek zamanlı metin alternatifleri, acil durum iletişimleri, canlı haber ses akışları ve katılımın içeriği anlamaya bağlı olduğu radyo aramalı programları gibi etkileşimli ses etkinlikleri için kritik öneme sahiptir.'),
        blockquote('Etkinlik sonrası transkript hiç yoktan iyidir, ancak bu kriteri karşılamaz. Gereksinim, canlı yayın sırasında gerçek zamanlı erişim içindir.'),

        heading('İlgili axe-core kuralları'),
        p('Canlı yalnızca ses içeriğini ele alan axe-core kuralı yoktur. Otomatik araçlar, canlı ses akışlarını tespit edemez veya gerçek zamanlı metin alternatiflerinin sağlanıp sağlanmadığını doğrulayamaz. Bu kriter, gerçek canlı etkinlikler sırasında test gerektirir.'),

        heading('Nasıl test edilir'),
        numbered('Platformdaki tüm canlı yalnızca ses içeriklerini belirleyin (canlı radyo, ses akışları, konferans çağrıları).'),
        numbered('Canlı bir ses etkinliği sırasında, gerçek zamanlı bir metin alternatifinin görüntülenip görüntülenmediğini kontrol edin.'),
        numbered('Gecikmeyi değerlendirin — metin, konuşulan içerikten birkaç saniye içinde görünmelidir.'),
        numbered('Metnin, konuşmacı tanımlaması dahil olmak üzere konuşulan içeriği doğru şekilde temsil ettiğini doğrulayın.'),
        numbered('Metin alternatifinin ekran okuyucular ve diğer yardımcı teknolojiler aracılığıyla erişilebilir olduğunu kontrol edin.'),
        numbered('Anlamlı konuşma dışı seslerin metin akışında açıklandığını onaylayın.'),

        heading('Nasıl düzeltilir'),
        p('Ses oynatıcının yanına bir canlı metin akışı uygulayın:'),
        code('<div role="region" aria-label="Gerçek zamanlı transkriptli canlı ses yayını">\n  <audio controls autoplay>\n    <source src="/canli-yayin" type="audio/mpeg" />\n    Tarayıcınız ses öğesini desteklemiyor.\n  </audio>\n\n  <div\n    id="canli-transkript"\n    role="log"\n    aria-live="polite"\n    aria-label="Gerçek zamanlı transkript"\n    class="live-transcript-panel"\n  >\n    <!-- Transkript satırları gerçek zamanlı olarak eklenir -->\n  </div>\n</div>', 'html'),
        p('WebSocket aracılığıyla gerçek zamanlı bir altyazılama hizmetine bağlanın:'),
        code('const transkriptEl = document.getElementById("canli-transkript");\nconst ws = new WebSocket("wss://altyazi-hizmeti.ornek.com/akis");\n\nws.onmessage = (event) => {\n  const veri = JSON.parse(event.data);\n  const satir = document.createElement("p");\n\n  if (veri.konusmaci) {\n    const konusmaci = document.createElement("strong");\n    konusmaci.textContent = `${veri.konusmaci}: `;\n    satir.appendChild(konusmaci);\n  }\n\n  satir.appendChild(document.createTextNode(veri.metin));\n  transkriptEl.appendChild(satir);\n\n  // En son satıra otomatik kaydır\n  transkriptEl.scrollTop = transkriptEl.scrollHeight;\n};', 'javascript'),
        p('Gerçek zamanlı bir yedek olarak Web Speech API kullanan daha basit bir yaklaşım için:'),
        code('const recognition = new webkitSpeechRecognition();\nrecognition.continuous = true;\nrecognition.interimResults = true;\nrecognition.lang = "tr-TR";\n\nconst transkriptEl = document.getElementById("canli-transkript");\nlet mevcutParagraf = null;\n\nrecognition.onresult = (event) => {\n  if (!mevcutParagraf) {\n    mevcutParagraf = document.createElement("p");\n    transkriptEl.appendChild(mevcutParagraf);\n  }\n\n  const sonuç = event.results[event.results.length - 1];\n  mevcutParagraf.textContent = sonuç[0].transcript;\n\n  if (sonuç.isFinal) {\n    mevcutParagraf = null;\n  }\n};\n\nrecognition.start();', 'javascript'),

        heading('Sık yapılan hatalar'),
        bullet('Canlı yayın sırasında gerçek zamanlı metin yerine yalnızca etkinlik sonrası transkript sağlamak.'),
        bullet('Hataları izlemeden otomatik konuşma tanıma kullanmak ve güvenilmez metin üretmek.'),
        bullet('Gerçek zamanlı metin akışında konuşmacı tanımlaması sağlamamak.'),
        bullet('Metin alternatifini bulunması zor veya ses oynatıcıyla ilişkilendirilmemiş bir konuma yerleştirmek.'),
        bullet('Müzik, ses efektleri veya önemli duraklamalar gibi konuşma dışı ses öğelerini açıklamamak.'),
        bullet('Metin akışını yardımcı teknolojiler için erişilebilir hale getirmemek (ARIA rolleri veya canlı bölgelerin eksikliği).'),
      ],
    },
    resources: [
      { title: 'Understanding SC 1.2.9: Audio-only (Live)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live.html', source: 'W3C', language: 'en', _key: 'r129w3c1' },
      { title: 'Techniques for Live Audio Text Alternative — G151', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G151', source: 'W3C', language: 'en', _key: 'r129w3c2' },
      { title: 'Live Captions and Transcripts – WebAIM', url: 'https://webaim.org/techniques/captions/#realtime', source: 'WebAIM', language: 'en', _key: 'r129waim' },
      { title: 'Web Speech API – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API', source: 'MDN', language: 'en', _key: 'r129mdn1' },
      { title: 'WebSocket API – MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', source: 'MDN', language: 'en', _key: 'r129mdn2' },
    ],
    seo: {
      en: {
        metaTitle: 'WCAG 1.2.9: Live Audio-only Text Alternative',
        metaDescription: 'How to provide real-time text alternatives for live audio-only content per WCAG 1.2.9 Level AAA. WebSocket and Web Speech API examples included.',
      },
      tr: {
        metaTitle: 'WCAG 1.2.9: Canlı Ses İçin Metin Alternatifi',
        metaDescription: 'WCAG 1.2.9 Seviye AAA uyarınca canlı yalnızca ses içerikleri için gerçek zamanlı metin alternatifi sağlama rehberi. WebSocket örnekleri dahil.',
      },
    },
  },
]

export default rules
