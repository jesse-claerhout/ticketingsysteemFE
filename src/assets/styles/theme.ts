import { createTheme } from "@mui/material";

//light mode
export const optisTheme = createTheme({
    palette: {
        mode: 'light',
        common: {
            black: '#1a1a1a',
            white: '#e6e6e6'
        },
        primary: {
            main: '#3db8ad',
            light: '#0a9396',
            dark: '#194d48',
            contrastText: '#fff'
        },
        secondary: {
            main: '#3d8fb8',
            light: '#d9eaf2',
            dark: '#193c4d',
            contrastText: '#fff'
        },
        error: {
            main: '#f50c00',
            light: '#f50c00',
            dark: '#660500',
            contrastText: '#fff'
        },
        warning: {
            main: '#f5b800',
            light: '#fff2cc',
            dark: '#664d00',
            contrastText: '#fff'
        },
        background: {
            default: "#fff",
            paper: "#fff"
        },

    },
    typography: {
        fontFamily: `sans-serif, "Serif", "Monospace"`,
    },
    components: {
      },

    breakpoints:{
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1100,
            xl: 1300,
          },
    }
});

export const optisThemeDark = createTheme({
    palette: {
        mode: 'dark',
        common: {
            black: '#1a1a1a',
            white: '#e6e6e6'
        },
        primary: {
            main: '#3db8ad',
            light: '#0a9396',
            dark: '#194d48',
            contrastText: '#fff'
        },
        secondary: {
            main: '#3d8fb8',
            light: '#d9eaf2',
            dark: '#193c4d',
            contrastText: '#fff'
        },
        error: {
            main: '#f50c00',
            light: '#ffcfcc',
            dark: '#660500',
            contrastText: '#fff'
        },
        warning: {
            main: '#f5b800',
            light: '#fff2cc',
            dark: '#664d00',
            contrastText: '#fff'
        },
        background: {
            default: "#000000",
            paper: "#fff"
        },
        
    },
    typography: {
        fontFamily: `sans-serif, "Serif", "Monospace"`,
    },
    components: {
        
      },
    
})