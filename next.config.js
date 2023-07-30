/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_TOKEN_HASH: process.env.NEXT_PUBLIC_HASH,
  },
};

module.exports = nextConfig;
