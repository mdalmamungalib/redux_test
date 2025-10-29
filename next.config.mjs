/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude uploadthing files that cause parsing errors
    config.externals.push({
      '@uploadthing/mime-types': 'commonjs @uploadthing/mime-types',
      '@uploadthing/shared': 'commonjs @uploadthing/shared',
    });
    return config;
  },
};

export default nextConfig;
