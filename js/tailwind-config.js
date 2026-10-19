// Paleta Outubro Rosa: rosa profundo nas bases e rosa-claro nos destaques.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                rose: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724',
                },
                blush: {
                    400: '#fbcfe8',
                    500: '#f9a8d4',
                    600: '#f472b6',
                    700: '#db2777',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif']
            }
        }
    }
}
