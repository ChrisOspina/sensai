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
        serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    },
};

export default nextConfig;
