import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
                '2xl': '1400px',
                '3xl': '1600px'
            },
        },
    },
    plugins: [],
    safelist: [
        'border-[var(--accent)]',
        'border-[var(--text-primary)]',
        'hover:bg-[var(--accent-transparent)]',
        'hover:bg-[var(--text-primary-transparent)]',
        'aspect-square',
    ],
};
export default config;
