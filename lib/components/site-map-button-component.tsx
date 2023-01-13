import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";

import aresImage from "../../public/ares.jpg";
import {useRouter} from "next/router";

export interface SiteMapButtonProps {
    text: string;
    link: string;
    shouldHaveText?: boolean;
}

export const SiteMapButtonComponent = (props: SiteMapButtonProps) => {
    const router = useRouter();

    return (
        <Card sx={{
            borderRadius: "2em",
            height: "6em",
            backgroundColor: "var(--reinhard-secondary-medium)"
        }}>
            <CardActionArea
                onClick={() => {
                    void router.push(props.link);
                }}
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "var(--reinhard-secondary-medium)",
                    textAlign: "start",
                }}>
                <CardMedia
                    component={"img"}
                    alt={"todo:"}
                    src={aresImage.src}
                    sx={{
                        width: "7.5em",
                    }}
                ></CardMedia>
                {
                    props.shouldHaveText &&
                    <CardContent sx={{
                        flex: "1"
                    }}>
                        {props.text}
                    </CardContent>
                }
            </CardActionArea>
        </Card>
    );
};
