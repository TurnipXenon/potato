import './ReinhardGlobals.css';
import type {AppProps} from 'next/app';
import {createTheme, ThemeProvider} from "@mui/material";
import {AppProvider} from "../lib/util/app-context";

const darkTheme = createTheme({});

export default function App({Component, pageProps}: AppProps) {
    // todo: storage


    return <ThemeProvider theme={darkTheme}>
        <AppProvider>
            <Component {...pageProps}/>
        </AppProvider>
    </ThemeProvider>;
}
