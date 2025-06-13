// theme.js
export default {
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
    brand: {
      50: '#fff6d8',
      100: '#ffeaa8',
      200: '#ffdf79',
      300: '#ffd44a',
      400: '#ffca1b',
      500: '#e6b100', // color lego yellow
      600: '#b38800',
      700: '#806000',
      800: '#4d3800',
      900: '#1f1000',
    },
    red: {
      500: '#e53935', // rojo lego
    },
    blue: {
      500: '#1e88e5', // azul lego
    },
    green: {
      500: '#43a047',
    },
  },
  fonts: {
    heading: `'Rubik', sans-serif`, // LEGO-like
    body: `'Open Sans', sans-serif`,
  },
  space: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
  },
};