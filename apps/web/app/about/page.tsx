import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), 'app', 'about', 'content.mdx');
  const source = await readFile(filePath, 'utf8');

  return (
    <div>
      <div className="relative min-h-screen">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        {/* Content container */}
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-20">
          <article className="prose-headings:font-display prose prose-sm prose-zinc max-w-none dark:prose-invert prose-h1:text-3xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-bold prose-h3:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 prose-blockquote:border-l-primary/50 prose-blockquote:bg-primary/5 prose-strong:text-foreground/90 prose-code:rounded prose-code:bg-primary/10 prose-code:px-1 prose-code:text-primary prose-pre:bg-black/95 prose-pre:shadow-md prose-ol:space-y-4 prose-ul:space-y-4 prose-li:text-foreground/70 prose-img:rounded-lg prose-img:shadow-md lg:prose-h1:text-4xl lg:prose-h2:text-3xl lg:prose-h3:text-2xl">
            <MDXRemote source={source} />
          </article>
        </div>
      </div>
    </div>
  );
}
