const colors = require('tailwindcss/colors')

const mediaQueryVariants = ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl']

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: false,
    content: [
        './src/**/*.{html,js,ts,vue}',
    ],
    safelist: [],
    theme: {
        extend: {},
        screens: {
            'mb': '0px',
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    variants: {
        extend: {},
    },
}
