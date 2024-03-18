/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/libs/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/libs/**",
      },
    ],
  },
};

export default nextConfig;
