const colors = require("tailwindcss/colors");

module.exports = {
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/simplebar-react/**/*",
    "./node_modules/apexcharts/**/*",
    "./node_modules/@fullcalendar/**/*",
    "./node_modules/swiper/**/*",
    "./node_modules/prismjs/**/**/*",
    "./node_modules/flatpickr/**/*",
    "./node_modules/react-toastify/**/*",
    "./node_modules/lightbox.js-react/**/*",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    fontFamily: {
      public: ['"Public Sans", sans-serif'],
      tourney: ['"Tourney", sans-serif'],
      remix: ["remixicon"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        sm: "0.8125rem", //13px
        base: "0.875rem", //14px
        15: "0.9375rem", //15px
        16: "1rem", //16px
        "vertical-menu-item-font-size": "0.875rem",
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        body: colors.slate[800],
        "body-bg": colors.slate[100],
        "body-bordered": colors.white,

        //sidebar light
        "vertical-menu": colors.white,
        "vertical-menu-border": colors.slate[200],
        "vertical-menu-item": colors.slate[400],
        "vertical-menu-item-hover": colors.blue[500],
        "vertical-menu-item-bg-hover": colors.blue[50],
        "vertical-menu-item-active": colors.blue[500],
        "vertical-menu-item-bg-active": colors.blue[50],
        "vertical-menu-sub-item": colors.slate[400],
        "vertical-menu-sub-item-hover": colors.blue[500],
        "vertical-menu-sub-item-active": colors.blue[500],

        //sidebar dark
        "vertical-menu-dark": colors.slate[900],
        "vertical-menu-border-dark": colors.slate[900],
        "vertical-menu-item-dark": colors.slate[500],
        "vertical-menu-item-hover-dark": colors.blue[500],
        "vertical-menu-item-bg-hover-dark": colors.slate[800],
        "vertical-menu-item-active-dark": colors.blue[500],
        "vertical-menu-item-bg-active-dark": colors.slate[800],
        "vertical-menu-sub-item-dark": colors.slate[500],
        "vertical-menu-sub-item-hover-dark": colors.blue[500],
        "vertical-menu-sub-item-active-dark": colors.blue[500],

        //sidebar brand
        "vertical-menu-brand": colors.blue[900],
        "vertical-menu-border-brand": colors.blue[900],
        "vertical-menu-item-brand": colors.blue[300],
        "vertical-menu-item-hover-brand": colors.blue[50],
        "vertical-menu-item-bg-hover-brand": "#224097",
        "vertical-menu-item-active-brand": colors.blue[50],
        "vertical-menu-item-bg-active-brand": "#224097",
        "vertical-menu-sub-item-brand": "#a4bbfd",
        "vertical-menu-sub-item-hover-brand": colors.blue[50],
        "vertical-menu-sub-item-active-brand": colors.blue[50],

        //sidebar modern
        "vertical-menu-to-modern": colors.blue[900],
        "vertical-menu-form-modern": colors.green[900],
        "vertical-menu-border-modern": colors.blue[900],
        "vertical-menu-item-modern": "rgba(255, 255, 255, 0.60)",
        "vertical-menu-item-hover-modern": "rgba(255, 255, 255)",
        "vertical-menu-item-bg-hover-modern": "rgba(255, 255, 255, 0.06)",
        "vertical-menu-item-active-modern": colors.blue[50],
        "vertical-menu-item-bg-active-modern": "rgba(255, 255, 255, 0.06)",
        "vertical-menu-sub-item-modern": "rgba(255, 255, 255, 0.50)",
        "vertical-menu-sub-item-hover-modern": colors.white,
        "vertical-menu-sub-item-active-modern": colors.white,

        //TOPBAR
        topbar: colors.white,
        "topbar-border": colors.slate[200],
        "topbar-item": colors.slate[700],
        "topbar-item-hover": colors.slate[800],
        "topbar-item-bg-hover": colors.slate[100],

        "topbar-dark": colors.slate[900],
        "topbar-border-dark": colors.slate[700],
        "topbar-item-dark": colors.slate[400],
        "topbar-item-hover-dark": colors.slate[100],
        "topbar-item-bg-hover-dark": colors.slate[800],

        "topbar-brand": colors.blue[900],
        "topbar-border-brand": colors.blue[800],
        "topbar-item-brand": "#a4bbfd",
        "topbar-item-hover-brand": colors.white,
        "topbar-item-bg-hover-brand": "#224097",

        "topbar-modern": colors.white,

        custom: {
          50: colors.blue[50],
          100: colors.blue[100],
          200: colors.blue[200],
          300: colors.blue[300],
          400: colors.blue[400],
          500: colors.blue[500], // Using Tailwind's color palette
          600: colors.blue[600],
          700: colors.blue[700],
          800: colors.blue[800],
          900: colors.blue[900],
          950: colors.blue[950],
        },
        red: {
          50: colors.red[50],
          100: colors.red[100],
          200: colors.red[200],
          300: colors.red[300],
          400: colors.red[400],
          500: colors.red[500], // Using Tailwind's color palette
          600: colors.red[600],
          700: colors.red[700],
          800: colors.red[800],
          900: colors.red[900],
          950: colors.red[950],
        },
        green: {
          50: "#EAFAF7",
          100: "#D2F4EE",
          200: "#A0E8DB",
          300: "#56D7BF",
          400: "#2DBDA3",
          500: "#249782", // Using Tailwind's color palette
          600: "#208875",
          700: "#1C7767",
          800: "#186355",
          900: "#11463C",
          950: "#0B2D27",
        },

        yellow: {
          50: colors.yellow[50],
          100: colors.yellow[100],
          200: colors.yellow[200],
          300: colors.yellow[300],
          400: colors.yellow[400],
          500: colors.yellow[500], // Using Tailwind's color palette
          600: colors.yellow[600],
          700: colors.yellow[700],
          800: colors.yellow[800],
          900: colors.yellow[900],
          950: colors.yellow[950],
        },

        orange: {
          50: colors.orange[50],
          100: colors.orange[100],
          200: colors.orange[200],
          300: colors.orange[300],
          400: colors.orange[400],
          500: colors.orange[500], // Using Tailwind's color palette
          600: colors.orange[600],
          700: colors.orange[700],
          800: colors.orange[800],
          900: colors.orange[900],
          950: colors.orange[950],
        },

        sky: {
          50: colors.sky[50],
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500], // Using Tailwind's color palette
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900],
          950: colors.sky[950],
        },

        purple: {
          50: colors.purple[50],
          100: colors.purple[100],
          200: colors.purple[200],
          300: colors.purple[300],
          400: colors.purple[400],
          500: colors.purple[500], // Using Tailwind's color palette
          600: colors.purple[600],
          700: colors.purple[700],
          800: colors.purple[800],
          900: colors.purple[900],
          950: colors.purple[950],
        },

        zink: {
          50: "#E2EAF3",
          100: "#C8D7E9",
          200: "#92AFD3",
          300: "#5885BC",
          400: "#395F8E",
          500: "#233A57",
          600: "#1C2E45",
          700: "#132337",
          800: "#0F1824",
          900: "#070C12",
          950: "#030507",
        },
      },
      spacing: {
        header: "4.375rem", // 70px
        "vertical-menu": "16.25rem", // 260px
        "vertical-menu-md": "10.3125rem", // 165px
        "vertical-menu-sm": "4.375rem", // 70px
      },
      maxWidth: {
        boxed: "87.5rem", // 1400px
      },
      minHeight: {
        sm: "1650px", // 1650px
      },
      zIndex: {
        drawer: "1050",
      },
      backgroundImage: {
        "auth-pattern": "url('assets/images/auth-bg.jpg')",
        "auth-pattern-dark": "url('assets/images/auth-bg-dark.jpg')",
      },
      animation: {
        icons: "iconsAnimation 50s",
        progress: "progressAnimation 2s",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        iconsAnimation: {
          to: { strokeDashoffset: "500" },
        },
        progressAnimation: {
          "0%": {
            width: "0",
          },
        },
      },animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      aspectRatio: {
        "1/1": "1 / 1",
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "21/9": "21 / 9",
      },
      clipPath: {
        triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("./plugins/headings.js"),
    require("./plugins/buttons.js"),
    require("./plugins/forms.js"),
    require("./plugins/card.js"),
    require("./plugins/drawer.js"),
    //third party libraries
    require("./plugins/flatpicker.js"),
    require("./plugins/simplebar.js"),
    require("./plugins/swiper.js"),
    require("./plugins/toastify.js"),
    require("./plugins/dropzone.js"),
    // require('./plugins/colorpicker.js'),  // instead react-color picker
    require("./plugins/ckeditor.js"),
    require("./plugins/apexcharts.js"),
    require("./plugins/maps.js"), // google-maps-react
    // require('./plugins/multijs.js'), // instead react-dual-listbox
    require("./plugins/fullcalendar.js"),
    require("./plugins/lightbox.js"),
    require("./plugins/prismjs.js"),
    //apps pages
    require("./plugins/apps.js"),
  ],
};