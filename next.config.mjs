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
       experimental: {
        serverExternalPackages: ['@prisma/client', 'prisma'],
    },
};

export default nextConfig;
