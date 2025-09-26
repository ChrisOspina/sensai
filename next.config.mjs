/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'randomuser.me',
        },
    ],
    },
    transpilePackages: ['@prisma/client'],
};

export default nextConfig;
