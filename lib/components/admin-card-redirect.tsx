import {NextRouter} from "next/router";
import {Card, CardActionArea, CardContent} from "@mui/material";
import React from "react";

export interface AdminCardRedirectProps {
    label: string;
    url: string;
    router: NextRouter;
}

export const AdminCardRedirect = (props: AdminCardRedirectProps) => {
    return <Card>
        <CardActionArea>
            <CardContent
                onClick={() => {
                    void props.router.push(props.url);
                }}>
                <h1>{props.label}</h1>
            </CardContent>
        </CardActionArea>
    </Card>;
};
