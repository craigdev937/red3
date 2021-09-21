import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import "../styles/globals.css";

const QClient = new QueryClient();

export default function 
App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={QClient}>
            <React.StrictMode>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </React.StrictMode>
        </QueryClientProvider>
    );
};





