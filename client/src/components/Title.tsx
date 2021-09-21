import React from "react";

type Props = {
    children: React.ReactNode,
};

export const Title = ({children}: Props) => {
    return (
        <React.Fragment>
            <h1>{children}</h1>
        </React.Fragment>
    );
};





