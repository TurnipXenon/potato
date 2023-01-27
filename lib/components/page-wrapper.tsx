import {SiteMapButtonList} from "./site-map-button-list";
import {Card} from "@mui/material";
import aresBgImage from "../../public/home/bg_tiled/bg_tiled_ares.png";
import reinhardBgImage from "../../public/home/bg_tiled/bg_tiled_reinhard.png";
import cornBgImage from "../../public/home/bg_tiled/bg_tiled_corn.png";
import pineappleBgImage from "../../public/home/bg_tiled/bg_tiled_pineapple.png";
import tomatoBgImage from "../../public/home/bg_tiled/bg_tiled_tomato.png";
import turnipBgImage from "../../public/home/bg_tiled/bg_tiled_turnip.png";
import React, {useState} from "react";
import useEffectOnce from "../util/use-effect-once";
import {RandomizedImage} from "./home/randomized-image";

export interface PageWrapperProps {
    children: JSX.Element;
    shouldHideDefaultSiteMap?: boolean;
}

const shuffle = (array: any[]): any[] => {
    // from: community wiki @ https://stackoverflow.com/a/2450976/17836168
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

const imageList = [
    aresBgImage,
    reinhardBgImage,
    cornBgImage,
    pineappleBgImage,
    tomatoBgImage,
    turnipBgImage
];

export const PageWrapper = ({children, shouldHideDefaultSiteMap}: PageWrapperProps) => {
    const [bg, setBg] = useState<JSX.Element[] | undefined>();

    useEffectOnce(() => {
        if (bg) {
            return;
        }

        let props: JSX.Element[] = [];

        for (let i = 0; i < 20; i++) {
            shuffle(imageList);
            props = props.concat(imageList.map((value, index) => {
                return <RandomizedImage key={index + (i * props.length)} src={value}/>;
            }));
        }
        setBg(props);
    });

    return <div>

        <div style={{position: "relative", zIndex: -10}}>
            <div style={{
                position: "fixed",
                marginLeft: "-225px",
                width: "2270px",
                height: "1080px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                overflow: "hidden"
            }}>
                {
                    bg
                }
            </div>
        </div>
        {children}
        {
            !shouldHideDefaultSiteMap &&
            <>
                <Card style={{
                    position: "fixed",
                    bottom: "0",
                    right: "0",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5em",
                    gap: "0.5em",
                    backgroundColor: "var(--reinhard-main-light)",
                    borderRadius: "2em 0 0"
                }}>
                    <SiteMapButtonList buttonSize={3}/>
                </Card>
                <div style={{
                    height: "15em"
                }}></div>
            </>
        }
    </div>;
};
