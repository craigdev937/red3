import React from "react";
import Head from "next/head";
import { Title } from "./Title";

type PProps = {
    title: string,
    children: React.ReactNode
};

export const Page = 
({ title, children }: PProps): JSX.Element => {
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Title>{title}</Title>
                {children}
            </main>
        </React.Fragment>
    );
};






