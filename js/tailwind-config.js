// Paleta do ateliê: roxo profundo e detalhes em lilás.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                rose: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                blush: {
                    400: '#e9d5ff',
                    500: '#d8b4fe',
                    600: '#c084fc',
                    700: '#9333ea',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif']
            }
        }
    }
}
