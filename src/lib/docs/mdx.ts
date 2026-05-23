import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { TocItem } from "@/components/docs";
import { mdxComponents } from "./mdx-components";

const DOCS_DIR = path.join(process.cwd(), "src", "content", "docs");

// ── Frontmatter type ──────────────────────────────────────────────────────

export interface DocFrontmatter {
  title: string;
  description?: string;
}

// ── Load a single doc page ─────────────────────────────────────────────────

export async function loadDocPage(slugParts: string[]) {
  const slug = slugParts.join("/");
  const filePath = path.join(DOCS_DIR, ...slugParts) + ".mdx";

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(raw);
  const frontmatter = data as DocFrontmatter;

  // Extract TOC from raw content (before MDX compilation)
  const toc = extractToc(rawContent);

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return { frontmatter, content, toc, slug };
}

// ── Extract headings for TOC ───────────────────────────────────────────────

function extractToc(rawMdx: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(rawMdx)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim().replace(/`([^`]+)`/g, "$1");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s\u0600-\u06FF]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    items.push({ id, text, level });
  }

  return items;
}

// ── Get all valid slugs for generateStaticParams ──────────────────────────

export function getAllDocSlugs(): string[][] {
  return collectSlugs(DOCS_DIR, []);
}

function collectSlugs(dir: string, prefix: string[]): string[][] {
  const slugs: string[][] = [];

  if (!fs.existsSync(dir)) return slugs;

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      slugs.push(...collectSlugs(full, [...prefix, entry]));
    } else if (entry.endsWith(".mdx")) {
      const name = entry.replace(/\.mdx$/, "");
      slugs.push([...prefix, name]);
    }
  }

  return slugs;
}
