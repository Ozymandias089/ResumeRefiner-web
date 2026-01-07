import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    return [
      // API
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
      // OAuth2 시작 엔드포인트
      {
        source: "/oauth2/:path*",
        destination: "http://localhost:8080/oauth2/:path*",
      },

      // OAuth2 콜백 엔드포인트
      {
        source: "/login/oauth2/:path*",
        destination: "http://localhost:8080/login/oauth2/:path*",
      },
    ];
  },
};

export default nextConfig;
