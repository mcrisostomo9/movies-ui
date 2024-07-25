/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    redirects: async () => {
        return [
            {
                source: '/movies',
                destination: '/',
                permanent: true
            }
        ];
    }
};

export default nextConfig;
