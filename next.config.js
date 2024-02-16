/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US', 'fr'],
    defaultLocale: 'en-US',
  },
  images: {
    remotePatterns: [
      {hostname: 'next-app-demo-bucket.s3.eu-central-1.amazonaws.com'}
    ]
  }

}

module.exports = nextConfig
