import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'fs/promises';
import path from 'path';

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), 'app', 'about', 'content.mdx');
  const source = await readFile(filePath, 'utf8');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <article className="prose prose-zinc dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 prose-code:text-blue-600">
        <MDXRemote source={source} />
      </article>
    </div>
  );
}
