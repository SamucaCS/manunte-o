import type { NextConfig } from "next";

// No GitHub Pages o site fica em /<repositório>; o workflow de deploy
// informa esse caminho em PAGES_BASE_PATH. Localmente fica vazio.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
