import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";

import aresImage from "../../public/ares.jpg";
import {useRouter} from "next/router";

export interface SiteMapButtonProps {
    text: string;
    link: string;
    shouldHaveText?: boolean;
    imgSrc?: string;
}

export const SiteMapButtonComponent = (props: SiteMapButtonProps) => {
    const router = useRouter();

    return (
        <Card sx={{
            borderRadius: "2em",
            height: "6em",
            backgroundColor: "var(--reinhard-secondary-medium)",
            // border: "var(--normal-border)",
            boxShadow: "none"
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
                    src={props.imgSrc ?? aresImage.src}
                    sx={{
                        width: "7.5em",
                    }}
                ></CardMedia>
                {
                    props.shouldHaveText &&
                    <CardContent sx={{
                        flex: "1",
                        fontSize: "1.3em"
                    }}>
                        {props.text}
                    </CardContent>
                }
            </CardActionArea>
        </Card>
    );
};
