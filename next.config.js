/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_FIREBASE_API_KEY: process.env.NEXT_FIREBASE_API_KEY,
    NEXT_FIREBASE_APP_ID: process.env.NEXT_FIREBASE_APP_ID,
  },
};

module.exports = nextConfig;
