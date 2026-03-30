import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0w6yrm5e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// Helper to create a Portable Text block
function block(text, style = "normal") {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
  };
}

function blockWithMarks(segments, style = "normal") {
  const markDefs = [];
  const children = segments.map((seg) => {
    const child = {
      _type: "span",
      _key: Math.random().toString(36).slice(2, 10),
      text: seg.text,
      marks: [],
    };
    if (seg.bold) {
      child.marks.push("strong");
    }
    if (seg.link) {
      const markKey = Math.random().toString(36).slice(2, 10);
      markDefs.push({ _type: "link", _key: markKey, href: seg.link });
      child.marks.push(markKey);
    }
    return child;
  });
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs,
    children,
  };
}

const posts = [
  {
    _type: "post",
    title: "The Business Case for Web Accessibility in 2025: SEO, UX, and ROI",
    slug: { _type: "slug", current: "business-case-web-accessibility-2025" },
    description:
      "Discover how investing in web accessibility can improve SEO, expand your audience, reduce legal risk, and boost your overall return on investment.",
    publishedAt: "2025-03-22T10:00:00Z",
    content: [
      block(
        "Web accessibility is no longer just a legal mandate — it is a critical driver for business growth. In 2025, an accessible website directly impacts your SEO performance, user experience, and brand reputation.",
      ),
      block("Why Accessibility Improves SEO", "h2"),
      block(
        "When you optimize your website for screen readers, you naturally improve its structure with semantic HTML, descriptive alt text, and clear heading hierarchy. These exact changes make it easier for search engine crawlers to understand and index your site, leading to higher rankings. Google has confirmed that page experience signals — including accessibility-related factors like mobile usability and content structure — influence search results.",
      ),
      block("Expanding Your Market Reach", "h2"),
      block(
        "Over one billion people worldwide live with some form of disability. By making your digital experience inclusive, you open your business to a massive and often underserved market segment. Assistive technology users represent significant purchasing power, and brands that welcome them earn lasting loyalty.",
      ),
      block("Measurable ROI", "h2"),
      block(
        "Companies that prioritize accessibility consistently report higher conversion rates, lower bounce rates, and improved customer satisfaction scores. A study by the Click-Away Pound Survey found that 69% of disabled users will leave a website that presents barriers, taking their spending elsewhere. Fixing those barriers is not charity — it is revenue recovery.",
      ),
      block(
        "The bottom line: accessibility is not a cost center. It is a strategic investment that strengthens SEO, widens your audience, and directly contributes to your bottom line.",
      ),
    ],
  },
  {
    _type: "post",
    title: "ADA Compliance Checklist 2025: Key Requirements for Your Website",
    slug: { _type: "slug", current: "ada-compliance-checklist-2025" },
    description:
      "A comprehensive checklist of ADA requirements for websites, including color contrast, alt text, keyboard navigation, and more to help you avoid legal issues.",
    publishedAt: "2025-03-15T10:00:00Z",
    content: [
      block(
        "Navigating ADA website compliance can seem daunting, but breaking it down into an actionable checklist is the best way to start. Here are the core areas you need to address in 2025.",
      ),
      block("1. Text Alternatives", "h2"),
      block(
        "Every non-text element — images, icons, charts, and media — must have a descriptive text alternative. Alt text should convey the purpose of the image, not just describe it literally. Decorative images should use an empty alt attribute so screen readers skip them.",
      ),
      block("2. Keyboard Navigation", "h2"),
      block(
        "Every interactive element on your site (buttons, links, form fields, menus) must be fully operable using only a keyboard. Users should be able to tab through content in a logical order, activate controls with Enter or Space, and never get trapped in a component.",
      ),
      block("3. Color Contrast", "h2"),
      block(
        "Maintain a contrast ratio of at least 4.5:1 for normal body text and 3:1 for large text (18px bold or 24px regular). This ensures readability for users with low vision or color blindness. Tools like the WebAIM Contrast Checker make verification easy.",
      ),
      block("4. Accessible Forms", "h2"),
      block(
        "Form fields must have visible, programmatically associated labels. Error messages should be descriptive and appear near the relevant field. Required fields must be clearly indicated, and focus order should follow a logical sequence.",
      ),
      block("5. Video and Audio Content", "h2"),
      block(
        "Provide captions for all video content and transcripts for audio-only content. Media players must be keyboard accessible and offer controls for pausing, stopping, and adjusting volume.",
      ),
      block("6. Consistent Navigation", "h2"),
      block(
        "Navigation menus should appear in the same location across pages, use clear labels, and include skip-to-content links so keyboard users can bypass repetitive elements.",
      ),
      block(
        "Using an automated solution like inculva's accessibility widget can help you instantly remediate many of these issues without extensive manual code changes, while you work on deeper structural improvements over time.",
      ),
    ],
  },
  {
    _type: "post",
    title: "WCAG 2.2 Explained: What You Need to Know",
    slug: { _type: "slug", current: "wcag-22-explained" },
    description:
      "Explore the latest WCAG 2.2 guidelines, their new success criteria, and how they impact your digital accessibility efforts.",
    publishedAt: "2025-03-10T10:00:00Z",
    content: [
      block(
        "The Web Content Accessibility Guidelines (WCAG) set the global standard for digital accessibility. WCAG 2.2, finalized in October 2023, introduces nine new success criteria that address gaps in the previous version — particularly for users with cognitive disabilities, low vision, and motor impairments.",
      ),
      block("Key New Success Criteria", "h2"),
      blockWithMarks([
        { text: "Focus Not Obscured: ", bold: true },
        {
          text: "When a component receives keyboard focus, it must not be entirely hidden by other page content like sticky headers or modal overlays. Users need to see where their focus is at all times.",
        },
      ]),
      blockWithMarks([
        { text: "Target Size (Minimum): ", bold: true },
        {
          text: "Interactive targets must be at least 24×24 CSS pixels, with exceptions for inline links and elements where the spacing meets minimum requirements. This helps users with motor impairments tap or click accurately.",
        },
      ]),
      blockWithMarks([
        { text: "Accessible Authentication: ", bold: true },
        {
          text: "Login processes must not rely solely on cognitive function tests like remembering passwords or solving puzzles. Sites should support password managers, passkeys, or verification links as alternatives.",
        },
      ]),
      blockWithMarks([
        { text: "Consistent Help: ", bold: true },
        {
          text: "If your site provides help mechanisms (contact info, chat, FAQ links), they must appear in the same relative location across pages so users can reliably find assistance.",
        },
      ]),
      block("Why It Matters", "h2"),
      block(
        "WCAG 2.2 is already being adopted into legal frameworks worldwide. The European Accessibility Act (EAA), which takes effect in June 2025, references WCAG standards. Upgrading now ensures your website remains compliant, future-proof, and genuinely inclusive.",
      ),
    ],
  },
  {
    _type: "post",
    title: "AI-Powered Accessibility vs. Manual Remediation: A Practical Guide",
    slug: { _type: "slug", current: "ai-vs-manual-accessibility" },
    description:
      "A practical comparison of AI accessibility tools and manual code remediation — when to use each and why a hybrid approach delivers the best results.",
    publishedAt: "2025-03-05T10:00:00Z",
    content: [
      block(
        "The debate between automated AI accessibility tools and manual code remediation is one of the most discussed topics in digital inclusivity. The truth is that neither approach alone is sufficient — but understanding their strengths helps you build the right strategy.",
      ),
      block("What AI Accessibility Tools Do Well", "h2"),
      block(
        "AI-powered widgets like inculva provide rapid, cost-effective adjustments that work immediately. They can automatically fix heading hierarchy issues, generate alt text using computer vision, inject ARIA attributes where they are missing, and give end users a customizable interface to adjust text size, contrast, spacing, and cursor visibility in real time.",
      ),
      block(
        "The biggest advantage is speed. An AI widget can be deployed in minutes and provides continuous monitoring, catching new issues as your site changes. For organizations that publish content frequently or rely on third-party components, this layer of protection is essential.",
      ),
      block("Where Manual Remediation Excels", "h2"),
      block(
        "Manual remediation involves a developer auditing and modifying the source code to fix accessibility issues at the root level. This approach produces the most robust, native results — proper semantic structure, custom keyboard interactions, and fully accessible dynamic components that work without any overlay.",
      ),
      block(
        "However, manual remediation is time-intensive, expensive, and requires specialized expertise. A full audit and fix cycle for a medium-sized site can take weeks to months.",
      ),
      block("The Hybrid Approach", "h2"),
      block(
        "The most effective strategy combines both methods. Deploy an AI accessibility widget for immediate, continuous coverage — ensuring your site is usable right now. In parallel, invest in manual remediation to address deep architectural issues over time. This way you get instant protection without waiting for a lengthy development cycle.",
      ),
      block(
        "Think of the AI layer as your safety net and the manual work as your long-term foundation. Together, they deliver the most accessible and legally defensible experience for your users.",
      ),
    ],
  },
];

async function seed() {
  console.log("Creating blog posts in Sanity...\n");

  for (const post of posts) {
    try {
      const result = await client.create(post);
      console.log(`✓ Created: "${post.title}" (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: "${post.title}"`, err.message);
    }
  }

  console.log("\nDone!");
}

seed();
