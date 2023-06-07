/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '512px',
            // => @media (min-width: 512px) { ... }
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#F3722C',
                    opacity: {
                        100: '#F3722C10',
                    },
                },
                secondary: {
                    DEFAULT: '#F94144',
                },
                gray: {
                    100: '#17171B',
                    200: '#27272D',
                    300: '#35353D',
                    400: '#484854',
                    500: '#737380',
                    600: '#C8C6C6',
                    700: '#E3E3E3',
                    900: '#F9F9F9',
                },
                facebook: {
                    DEFAULT: '#1877F2',
                },
                green: {
                    DEFAULT: '#83BF6E',
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                smd: '15px',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
}
