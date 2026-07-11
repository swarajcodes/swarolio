import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Global component overrides for all MDX content.
// Required by @next/mdx with the App Router.
const components: MDXComponents = {
  // Route internal links through next/link for client-side navigation.
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
