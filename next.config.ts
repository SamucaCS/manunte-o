import type { NextConfig } from "next";

// Site estático publicado na Vercel (na raiz do domínio).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
