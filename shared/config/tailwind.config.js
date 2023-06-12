const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../shared/react-components/**/*.{js,ts,jsx,tsx}',
    '../../shared/ui/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/flowbite-react/lib/esm/theme.js'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      averta: 'Averta',
      inter: 'Inter'
    },
    extend: {
      colors: {
        pt: {
          purple: {
            50: '#F5F0FF',
            100: '#DECEFF',
            200: '#C8ADFF',
            300: '#B18CFF',
            400: '#9B6AFF',
            500: '#8050E3',
            600: '#6538C1',
            700: '#4C249F',
            800: '#36147D',
            900: '#24095B',
            DEFAULT: '#8050E3'
          },
          teal: {
            light: '#35F0D0',
            dark: '#0DC5A5',
            DEFAULT: '#35F0D0'
          },
          pink: {
            light: '#FA48E8',
            dark: '#B623A7',
            DEFAULT: '#FA48E8'
          },
          bg: {
            purple: {
              light: '#5D3A97',
              dark: '#2D0C66',
              darker: '#21064E',
              DEFAULT: '#2D0C66'
            }
          },
          warning: {
            light: '#FFB6B6',
            dark: '#8B0000',
            DEFAULT: '#8B0000'
          },
          gold: '#FFB636',
          transparent: '#F5F0FF1A'
        }
      },
      fontSize: {
        'clamp-xs': 'clamp(.4rem, .6vw + .2rem, 1rem)',
        'clamp-sm': 'clamp(.5rem, .7vw + .25rem, 1.3rem)',
        'clamp-base': 'clamp(.6rem, .8vw + .3rem, 1.5rem)',
        'clamp-xl': 'clamp(.8rem, .95vw + .4rem, 1.8rem)',
        'clamp-2xl': 'clamp(.8rem, 1.2vw + .4rem, 2rem)',
        'clamp-3xl': 'clamp(1rem, 1.5vw + .5rem, 2.8rem)',
        'clamp-4xl': 'clamp(1.5rem, 2vw + .75rem, 3.6rem)',
        'clamp-5xl': 'clamp(2rem, 2.8vw + 1rem, 4.5rem)'
      }
    },
    screens: {
      'smSonner': '601px',
      ...defaultTheme.screens,
      '3xl': '1900px',
      '4xl': '2200px',
      '5xl': '2500px'
    }
  },
  plugins: [
    plugin(({ addUtilities }) => addUtilities({
      '.no-scrollbar::-webkit-scrollbar': {
        'display': 'none'
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }
    }))
  ]
}
