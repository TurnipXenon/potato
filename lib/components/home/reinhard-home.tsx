import {HomeIndexProps} from "../../../pages";
import Head from "next/head";
import React from "react";
import aresBgImage from "../../../public/home/bg_tiled/bg_tiled_ares.png";
import reinhardBgImage from "../../../public/home/bg_tiled/bg_tiled_reinhard.png";
import cornBgImage from "../../../public/home/bg_tiled/bg_tiled_corn.png";
import pineappleBgImage from "../../../public/home/bg_tiled/bg_tiled_pineapple.png";
import tomatoBgImage from "../../../public/home/bg_tiled/bg_tiled_tomato.png";
import turnipBgImage from "../../../public/home/bg_tiled/bg_tiled_turnip.png";
import aresImage from "../../../public/ares.jpg";
import styles from "../../../pages/ReinhardHome.module.css";
import {Card, CardContent} from "@mui/material";
import Image from "next/image";
import {BriefGameCard} from "./brief-game-card";
import ReactMarkdown from "react-markdown";
import {UnderConstructionCard} from "../under-construction-card";
import {SiteMapButtonList} from "../site-map-button-list";
import {PageWrapper} from "../page-wrapper";

const ReinhardHomeLayout = (props: HomeIndexProps) => {
    return <div className={`reinhardGlobal ${styles.reinhardHome}`}>

        <Card className={styles.sidebar} style={{
            margin: "4em auto",
            paddingTop: "1em",
        }}>
            <CardContent>
                {/*todo: find a way to make the image mesh better with the color scheme like in AC*/}
                <div style={{
                    display: "flex",
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
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gridGap: "1em",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <SiteMapButtonList shouldHaveText={true}/>
                </div>
            </CardContent>
        </Card>

        <main style={{
            marginTop: "4em"
        }}>
            <UnderConstructionCard sx={{
                maxWidth: "40em",
                margin: "auto",
                marginBottom: "4em"
            }}/>

            <div style={{
                height: "6em"
            }}></div>
            <section className={styles.majorSectionCard}>
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

    </div>;
};

export const ReinhardHome = (props: HomeIndexProps) => {
    // todo: refactor css styles

    return <>
        <Head>
            <title>turnip</title> {/*todo: fix dynamic*/}
            <meta charSet="utf-8"/>
            <link rel="icon" href="/ushi.jpg"/>
            {/* todo: all the other twitter card props */}
        </Head>

        <PageWrapper shouldHideDefaultSiteMap={true}>
            <ReinhardHomeLayout {...props}/>
        </PageWrapper>
    </>;
};