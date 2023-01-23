/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                port: '',
                pathname: '/media/**',
            },
            {
                protocol: 'https',
                hostname: 'static.itch.io',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};