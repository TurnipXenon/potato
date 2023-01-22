import {HomeIndexProps} from "../../../pages";
import Head from "next/head";
import React, {useState} from "react";
import aresBgImage from "../../../public/home/bg_tiled/bg_tiled_ares.png";
import reinhardBgImage from "../../../public/home/bg_tiled/bg_tiled_reinhard.png";
import cornBgImage from "../../../public/home/bg_tiled/bg_tiled_corn.png";
import pineappleBgImage from "../../../public/home/bg_tiled/bg_tiled_pineapple.png";
import tomatoBgImage from "../../../public/home/bg_tiled/bg_tiled_tomato.png";
import turnipBgImage from "../../../public/home/bg_tiled/bg_tiled_turnip.png";
import aresImage from "../../../public/ares.jpg";
import styles from "../../../pages/ReinhardHome.module.css";
import useEffectOnce from "../../util/use-effect-once";
import {RandomizedImage} from "./randomized-image";
import {Card, CardContent} from "@mui/material";
import Image from "next/image";
import {BriefGameCard} from "./brief-game-card";
import ReactMarkdown from "react-markdown";
import {UnderConstructionCard} from "../under-construction-card";
import {SiteMapButtonList} from "../site-map-button-list";

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

    // todo: refactor css styles

    return <>
        <Head>
            <title>turnip</title> {/*todo: fix dynamic*/}
            <meta charSet="utf-8"/>
            <link rel="icon" href="/ushi.jpg"/>
            {/* todo: all the other twitter card props */}
        </Head>

        <div className={`reinhardGlobal ${styles.reinhardHome}`}>
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

            <Card className={styles.sidebar} style={{
                margin: "4em auto",
                paddingTop: "1em",
            }}>
                <CardContent>
                    {/*todo: find a way to make the image mesh better with the color scheme like in AC*/}
                    <div style={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "center",
                    }}>

                        <Image src={aresImage} alt="Ares from Rune Factory 5" style={{
                            border: "0.4em solid var(--reinhard-secondary-dark)",
                            borderRadius: "50%",
                            width: "7em",
                            height: "7em",
                            zIndex: 10
                        }}/>
                        <Card style={{
                            paddingInlineStart: "5em",
                            marginInlineStart: "-6.5em",
                            paddingInlineEnd: "2em",
                            borderRadius: "5em",
                            minWidth: "10em",
                            backgroundColor: "var(--reinhard-secondary-dark)",
                            boxShadow: "none"
                        }}>
                            <CardContent style={{
                                height: "100%",
                                alignItems: "center",
                                display: "flex"
                            }}>
                                <div style={{
                                    marginTop: "-2em",
                                    marginBottom: "0",
                                    marginInlineStart: "2em"
                                }}>
                                    <h1>Turnip</h1>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div style={{height: "1em"}}></div>
                    <div style={{maxWidth: "24em", margin: "auto"}}>
                        <ReactMarkdown>
                            {props.pageMeta.aboutLite}
                        </ReactMarkdown>
                    </div>
                    <div style={{height: "2em"}}></div>

                    <div className={styles.sidebarButtonContainer} style={{
                        display: "grid",
                        gridAutoFlow: "row",
                        gridTemplateColumns: "12em 12em",
                        gridGap: "1em",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <SiteMapButtonList shouldHaveText={true}/>
                    </div>
                </CardContent>
            </Card>

            <main style={{
                paddingTop: "4em"
            }}>
                <UnderConstructionCard sx={{
                    maxWidth: "40em",
                    margin: "auto"
                }}/>

                <div style={{
                    height: "6em"
                }}></div>
                <section style={{
                    border: "var(--normal-border)",
                    borderRadius: "2em",
                    marginLeft: "3em",
                    marginRight: "3em",
                    backgroundColor: "var(--reinhard-blue-transparent)",
                }}>
                    <Card style={{
                        border: "0.5em solid var(--text-color)",
                        marginTop: "-4em",
                        display: "inline-block",
                        paddingLeft: "2em",
                        paddingRight: "2em",
                        borderRadius: "2em",
                        backgroundColor: "var(--reinhard-blue)",
                    }}>
                        <CardContent>
                            <h1>Games I{"'"}ve made {">"}:3c</h1>
                        </CardContent>
                    </Card>

                    <div style={{
                        height: "2em"
                    }}></div>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {
                            props.gameProjectList.map((value) => {
                                return <BriefGameCard key={value.title} project={value}/>;
                            })
                        }
                    </div>

                    <div style={{
                        height: "2em"
                    }}></div>
                </section>
            </main>

            <div style={{
                height: "40vh",
            }}></div>

        </div>
    </>;
};