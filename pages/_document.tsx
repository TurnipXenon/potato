import {Html, Head, Main, NextScript} from 'next/document';
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
