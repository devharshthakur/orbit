import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Style headings
    h1: ({ className, ...props }) => <h1 className={cn('mb-4 mt-8 text-4xl font-bold', className)} {...props} />,
    h2: ({ className, ...props }) => <h2 className={cn('mb-4 mt-8 text-3xl font-bold', className)} {...props} />,
    h3: ({ className, ...props }) => <h3 className={cn('mb-4 mt-8 text-2xl font-bold', className)} {...props} />,
    // Style paragraphs
    p: ({ className, ...props }) => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />,
    // Style lists
    ul: ({ className, ...props }) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
    ol: ({ className, ...props }) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
    // Style links
    a: ({ className, ...props }) => (
      <a className={cn('font-medium underline underline-offset-4 hover:text-primary', className)} {...props} />
    ),
    // Style code blocks
    pre: ({ className, ...props }) => (
      <pre className={cn('mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4', className)} {...props} />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
        {...props}
      />
    ),
  };
}
