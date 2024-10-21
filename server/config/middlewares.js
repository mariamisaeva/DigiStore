module.exports = [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:', process.env.FRONTEND_URL],
                    'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
                    'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            origin: [process.env.FRONTEND_URL], //Vercel frontend domain
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
            headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
