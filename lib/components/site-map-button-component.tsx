import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import styles from "../../pages/ReinhardHome.module.css";
import aresImage from "../../public/ares.jpg";
import {useRouter} from "next/router";

export interface SiteMapButtonProps {
    text: string;
    link: string;
    shouldHaveText?: boolean;
    imgSrc?: string;
    buttonSize?: number; // em
}

export const SiteMapButtonComponent = (props: SiteMapButtonProps) => {
    const router = useRouter();
    const buttonSize = props.buttonSize ?? 6;
    const cardHeight = `${buttonSize}em`;
    const imageSize = `${buttonSize + 1.5}em`;

    return (
        <Card className={styles.siteMapButtonComponent}
              sx={{
                  borderRadius: `2em`,
                  height: cardHeight,
                  backgroundColor: "rgba(255, 255, 255, 0)",
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
                    textAlign: "start",
                }}>
                <CardMedia
                    component={"img"}
                    alt={"todo:"}
                    src={props.imgSrc ?? aresImage.src}
                    sx={{
                        width: imageSize
                    }}
                ></CardMedia>
                {
                    props.shouldHaveText &&
                    <CardContent sx={{
                        flex: "1",
                        fontSize: "1.3em",
                        backgroundColor: "var(--reinhard-secondary-medium)",
                    }}>
                        {props.text}
                    </CardContent>
                }
            </CardActionArea>
        </Card>
    );
};
