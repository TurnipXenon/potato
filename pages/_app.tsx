import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from "@mui/material";
import {AppProvider} from "../lib/util/app-context";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App({Component, pageProps}: AppProps) {
    // todo: storage


    return <ThemeProvider theme={darkTheme}>
        <AppProvider>
            <Component {...pageProps}/>
        </AppProvider>
    </ThemeProvider>
}
