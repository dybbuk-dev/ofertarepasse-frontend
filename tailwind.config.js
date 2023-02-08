/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#F3722C',
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
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
