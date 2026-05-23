import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/lib/docs/mdx-components";

const GUIDES_DIR = path.join(process.cwd(), "src", "content", "guides");

// ── Frontmatter type ──────────────────────────────────────────────────────

export interface GuideFrontmatter {
  title: string;
  description?: string;
}

// ── Load a single guide ───────────────────────────────────────────────────

export async function loadGuide(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(raw);
  const frontmatter = data as GuideFrontmatter;

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

  return { frontmatter, content, slug };
}

// ── Get all valid guide slugs ─────────────────────────────────────────────

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
