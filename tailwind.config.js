/** @type {import('tailwindcss').Config} */

const mediaQueryVariants = ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl']

module.exports = {
    important: true,
    content: [
        './src/**/*.{html,js,ts,vue}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
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
