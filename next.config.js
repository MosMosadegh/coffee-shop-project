/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // turbo: {
    //   // ...
    // },
    
    serverComponentsExternalPackages: ["mongoose"],
  },
  transpilePackages: ["three"],
  webpack: (config) => {
    // اضافه کردن rule برای فایل‌های GLSL
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
