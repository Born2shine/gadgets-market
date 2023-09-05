/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: "mongodb://localhost:27017/buynow",
    URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "nextauthbuynowdamilola20",
    cloud_name: "doezbegbo",
    api_key: "262169284966112",
    api_secret: "yM68K3_wi9ET8YDUfiLNcntDDYk",
    stripe_publishable_key:
      "pk_test_51NmwSbFKNIl4RqjzSc6wMXL5wvNPILzI8Uw9mI8fHmgdzdIi4ZRp4W2eMfQ5ajDl7jgSp2f4dTe9a9ife0fkQcyb002vWK4QCf",
    stripe_secret_key:
      "sk_test_51NmwSbFKNIl4RqjzL7MvILaDWcUB9yTfefrKez2BCANaWnAVnuzaGX5kAkiShz8kFzyvEL7HKapDNdaqHeda5VJL00P7Tv9Z4G",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
