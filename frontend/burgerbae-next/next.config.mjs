/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
    {
        protocol: "https",
        hostname: "www.burgerbaeclothing.com",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: 'https',
        hostname: 'www.burgerbaeclothing.com',
      },
      {
        protocol: 'https',
        hostname: 'burgerbaeclothing.com',
      },
      {
        protocol: 'https',
        hostname: 'judgeme-public-images.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'judgeme.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'assets.gokwik.co',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'd3jr4uzi9y3yv6.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'static-assets-web.flixcart.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
};

export default nextConfig;
