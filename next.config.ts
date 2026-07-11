import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx files to be imported as components / routed as pages.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // remark/rehype plugins go here (as strings, for Turbopack compat)
});

export default withMDX(nextConfig);
