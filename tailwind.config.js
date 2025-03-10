module.exports = {
    darkMode: 'class', // Enable class-based dark mode
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#6d28d9', // Your purple color
            dark: '#5b21b6', // Darker purple for dark mode
          },
          secondary: '#8b5cf6', // Your secondary color
        },
        spacing: {
          '128': '32rem', // Custom spacing
        },
      },
    },
    plugins: [],
}