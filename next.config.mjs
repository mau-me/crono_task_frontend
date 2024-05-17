// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProd ? '/crono_task_frontend' : '',
    assetPrefix: isProd ? '/crono_task_frontend/' : '',
    images: {
        loader: 'imgix',
        path: '',
    },
    trailingSlash: true,
    exportPathMap: async function () {
        return {
            '/': { page: '/' },
            '/register': { page: '/register' },
            '/todos': { page: '/todos' },
            '/todos/add': { page: '/todos/add' },
        };
    },
    output: 'export',
};

export default nextConfig;
