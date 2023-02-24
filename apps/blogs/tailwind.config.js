module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        primary: '#04315E',
        secondary: '#044F90',
        tertiary: {
          full: '#930000',
          hover: '#bb0202',
        },
        body: '#343A40',
        quartenary: '#5AE7ED',
        danger: '#E40000',
        success: '#00E165',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
        uber: 1.3,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      fontFamily: {
        sans: ['Roboto', 'Open-Sans'],
        mono: ['Fira Code', 'ui-monospace'],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        instagram:
          'linear-gradient(45deg, #515BD4 0%, #8134AF 27.62%, #DD2A7B 56.17%, #FEDA77 80.04%, #F58529 100%)',
      },
      screens: {
        xxl: '1536px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
