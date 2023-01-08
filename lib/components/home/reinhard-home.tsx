import {HomeIndexProps} from "../../../pages";
import Head from "next/head";
import React, {useState} from "react";
import aresBgImage from "../../../public/home/bg_tiled/bg_tiled_ares.png";
import reinhardBgImage from "../../../public/home/bg_tiled/bg_tiled_reinhard.png";
import cornBgImage from "../../../public/home/bg_tiled/bg_tiled_corn.png";
import pineappleBgImage from "../../../public/home/bg_tiled/bg_tiled_pineapple.png";
import tomatoBgImage from "../../../public/home/bg_tiled/bg_tiled_tomato.png";
import turnipBgImage from "../../../public/home/bg_tiled/bg_tiled_turnip.png";
import styles from "../../../pages/ReinhardHome.module.css";
import useEffectOnce from "../../util/use-effect-once";
import {RandomizedImage} from "./randomized-image";

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

export const ReinhardHome = (props: HomeIndexProps) => {
    const imageList = [
        aresBgImage,
        reinhardBgImage,
        cornBgImage,
        pineappleBgImage,
        tomatoBgImage,
        turnipBgImage
    ];

    const [bg, setBg] = useState<JSX.Element[] | undefined>();

    useEffectOnce(() => {
        let props: JSX.Element[] = [];
        // todo: randomization

        for (let i = 0; i < 20; i++) {
            shuffle(imageList);
            // todo: add rotation random
            // todo: add spacing random
            props = props.concat(imageList.map((value, index) => {
                return <RandomizedImage key={index} src={value}/>;
            }));
        }
        setBg(props);
    });

    // todo: async generate background

    return (<>
            <Head>
                <title>turnip</title> {/*todo: fix dynamic*/}
                <meta charSet="utf-8"/>
                <link rel="icon" href="/ushi.jpg"/>
                {/* todo: all the other twitter card props */}
            </Head>

            <div className={styles.homeIndex}>
                <div style={{position: "relative"}}>
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

                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
                <p>Testing</p>
            </div>
        </>
    );
};