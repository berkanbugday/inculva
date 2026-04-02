interface Block {
  _type: string;
  _key?: string;
  style?: string;
  children?: Span[];
  listItem?: string;
  level?: number;
  markDefs?: MarkDef[];
  asset?: { url: string };
  alt?: string;
  code?: string;
  language?: string;
}

interface Span {
  _type: string;
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSpan(span: Span, markDefs: MarkDef[] = []): string {
  let html = escapeHtml(span.text);

  for (const mark of span.marks || []) {
    const def = markDefs.find((d) => d._key === mark);
    if (def?._type === "link" && def.href) {
      html = `<a href="${escapeHtml(
        def.href,
      )}" rel="noopener noreferrer">${html}</a>`;
    } else if (mark === "strong") {
      html = `<strong>${html}</strong>`;
    } else if (mark === "em") {
      html = `<em>${html}</em>`;
    } else if (mark === "code") {
      html = `<code>${html}</code>`;
    } else if (mark === "underline") {
      html = `<u>${html}</u>`;
    }
  }

  return html;
}

function renderBlock(block: Block): string {
  if (block._type === "image") {
    const alt = block.alt ? escapeHtml(block.alt) : "";
    const url = escapeHtml(block.asset?.url || "");
    return `<figure><img src="${url}" alt="${alt}" loading="lazy" />${
      alt ? `<figcaption>${alt}</figcaption>` : ""
    }</figure>`;
  }

  if (block._type === "code") {
    const lang = escapeHtml(block.language || "");
    const code = escapeHtml(block.code || "");
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  }

  if (block._type !== "block") return "";

  const children = (block.children || [])
    .map((span) => renderSpan(span, block.markDefs))
    .join("");

  switch (block.style) {
    case "h2":
      return `<h2>${children}</h2>`;
    case "h3":
      return `<h3>${children}</h3>`;
    case "h4":
      return `<h4>${children}</h4>`;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    default:
      return `<p>${children}</p>`;
  }
}

export function portableTextToHtml(blocks: Block[]): string {
  if (!blocks || blocks.length === 0) return "";

  const result: string[] = [];
  let currentList: string | null = null;
  let listItems: string[] = [];

  for (const block of blocks) {
    if (block.listItem) {
      if (currentList !== block.listItem) {
        if (currentList) {
          const tag = currentList === "number" ? "ol" : "ul";
          result.push(`<${tag}>${listItems.join("")}</${tag}>`);
          listItems = [];
        }
        currentList = block.listItem;
      }
      const children = (block.children || [])
        .map((span) => renderSpan(span, block.markDefs))
        .join("");
      listItems.push(`<li>${children}</li>`);
    } else {
      if (currentList) {
        const tag = currentList === "number" ? "ol" : "ul";
        result.push(`<${tag}>${listItems.join("")}</${tag}>`);
        listItems = [];
        currentList = null;
      }
      result.push(renderBlock(block));
    }
  }

  if (currentList) {
    const tag = currentList === "number" ? "ol" : "ul";
    result.push(`<${tag}>${listItems.join("")}</${tag}>`);
  }

  return result.join("\n");
}
