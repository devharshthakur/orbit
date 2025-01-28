import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Let typography plugin handle most styles, just add animations and gradients
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'duration-500 animate-in slide-in-from-left',
          'bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'delay-100 duration-500 animate-in slide-in-from-left',
          'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn('delay-200 duration-500 animate-in slide-in-from-left', className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p className={cn('delay-300 duration-700 animate-in fade-in', className)} {...props} />
    ),
    // Improved list styling with custom bullets
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'my-6 ml-6 list-none space-y-4',
          'text-foreground/70 [&>li]:relative [&>li]:pl-6',
          '[&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-3',
          '[&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full',
          '[&>li]:before:bg-primary/60',
          'delay-300 duration-700 animate-in slide-in-from-left',
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'my-6 ml-6 list-decimal space-y-4',
          'text-foreground/70 marker:font-semibold marker:text-primary/60',
          'delay-300 duration-700 animate-in slide-in-from-left',
          className,
        )}
        {...props}
      />
    ),
    // Enhanced link styling with animated underline
    a: ({ className, ...props }) => (
      <Link
        className={cn(
          'font-medium text-primary decoration-primary/30 underline-offset-4',
          'hover:text-primary/80',
          'transition-all duration-300',
          'relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full',
          'after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100',
          'after:bg-primary/60 after:transition-transform after:duration-300',
          className,
        )}
        {...props}
      />
    ),
    // Improved code block styling
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'my-8 overflow-x-auto rounded-lg border',
          'bg-black/95 p-4',
          'ring-1 ring-primary/20',
          'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/10',
          'hover:scrollbar-thumb-primary/20',
          'delay-200 duration-300 animate-in zoom-in',
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'relative rounded font-mono text-sm',
          'bg-primary/10 px-[0.3rem] py-[0.2rem]',
          'ring-1 ring-primary/20',
          className,
        )}
        {...props}
      />
    ),
    // Add responsive image support
    img: ({ className, alt, ...props }) => (
      <div className="my-10 overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <Image
          className={cn('w-full object-cover duration-500 animate-in zoom-in', className)}
          alt={alt || ''}
          {...props}
          width={1200}
          height={630}
          quality={95}
        />
      </div>
    ),
    // Add blockquote styling
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'my-8 border-l-4 border-primary/40 bg-primary/5 py-4 pl-6',
          'italic text-foreground/75',
          'duration-500 animate-in slide-in-from-left',
          className,
        )}
        {...props}
      />
    ),
  };
}
