import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    return [
      // API
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      // OAuth2 시작 엔드포인트
      {
        source: "/oauth2/:path*",
        destination: `${backendUrl}/oauth2/:path*`,
      },

      // OAuth2 콜백 엔드포인트
      {
        source: "/login/oauth2/:path*",
        destination: `${backendUrl}/login/oauth2/:path*`,
      },
    ];
  },
};

export default nextConfig;
