/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: "mongodb://localhost:27017/buynow",
    URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "nextauthbuynowdamilola20",
    cloud_name: "doezbegbo",
    api_key: "262169284966112",
    api_secret: "yM68K3_wi9ET8YDUfiLNcntDDYk",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
