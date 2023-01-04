import React from 'react';
import Head from "next/head";
import styles from "../styles/HomeIndex.module.css";
import "../styles/HomeIndex.module.css";
import Image from "next/image";
import backgroundImage from "../public/background-image.jpg";
import {HomeProjectCard} from "../lib/components/home-project-card";
import {fromContentListToGameProjectList, GameProjectProps} from "../lib/models/game-project-props";
import {GetStaticProps} from "next";
import {createClient} from "../lib/util/app-context";
import {TurnipClient} from "turnip_api";
import {RpcOptions} from "@protobuf-ts/runtime-rpc";
import {loginAwait} from "../lib/clients/turnip/api/login";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import ReactMarkdown from "react-markdown";

export interface PageMetaProps {
    about: string;
    header: string;
    social: string;
}

export interface HomeIndexProps {
    gameProjectList: GameProjectProps[];
    pageMeta: PageMetaProps;
}

export default function HomeIndex(props: HomeIndexProps) {
    const projectList = props.gameProjectList;

    return (<>
            <Head>
                <title>turnipxenon</title> {/*todo: fix dynamic*/}
                <meta charSet="utf-8"/>
                <meta name="twitter:card" content="summary"/>
                <link rel="icon" href="/ushi.jpg"/>
                {/*todo: fix dynamic*/}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito"/>
                <meta name="twitter:site" content="@turnipxenon"/>
                {/*todo: fix dynamic*/}
                <meta name="twitter:creator" content="@turnipxenon"/>
                {/*todo: fix dynamic*/}
                <meta name="og:url" content="https://www.turnipxenon.com/"/>
                {/*todo: fix dynamic*/}
                <meta name="og:title" content="turnipxenon | Home"/>
                {/*todo: fix dynamic*/}
                <meta name="og:description"
                      content="I have no idea! Anyway... Hi! We blogging with more power now! Also check out my games!"/>
                {/*todo: fix dynamic*/}
                {/*<meta property="og:image"*/}
                {/*      content="https://www.reinhardluvr69.com/find-a-turnip.png"/> /!*todo: fix dynamic*!/*/}
            </Head>

            <div className={styles.homeIndex}>
                <Image src={backgroundImage} className={styles.backgroundImage} alt="background image"
                       placeholder="blur"/>

                <header></header>

                <div className={styles.mainContainer}>
                    <div className={styles.mainSpace}></div>

                    <main>

                        {
                            props.pageMeta.header &&
                            <section className={styles.majorSection}>
                                <ReactMarkdown>{props.pageMeta.header}</ReactMarkdown>
                                <video playsInline autoPlay muted loop>
                                    <source
                                        src="https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4"
                                        type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </section>
                        }

                        {
                            props.pageMeta.about &&
                            <section className={styles.majorSection}>
                                <ReactMarkdown>{props.pageMeta.about}</ReactMarkdown>
                            </section>
                        }

                        <section>
                            <h1 className={styles.majorSection}>Projects</h1>

                            {
                                projectList.map((value) => {
                                    return <HomeProjectCard key={value.title} content={value}/>;
                                })
                            }

                            <section className={styles.majorSection}>
                                <div className="content-padded">
                                    <p>A lot of my other stuff isn&apos;t here yet</p>
                                    <b>MORE STUFF COMING!</b>
                                </div>
                            </section>
                        </section>
                    </main>
                </div>

                <aside className={styles.sidebar}>
                    {
                        props.pageMeta.social &&
                        <section>
                            <ReactMarkdown>{props.pageMeta.social}</ReactMarkdown>
                        </section>
                    }
                </aside>

                <footer></footer>
            </div>
        </>
    );
};

export interface ServerSideSetupProps {
    turnipClient: TurnipClient;
    options: RpcOptions;
}

export const createServerSideClient = async (): Promise<ServerSideSetupProps> => {
    const t = createClient();
    const o = await loginAwait({
        turnipClient: t,
        username: process.env.HOST_USERNAME ?? "a",
        password: process.env.HOST_PASSWORD ?? "a",
    });
    return {
        turnipClient: t,
        options: o,
    };
};

export const getStaticProps: GetStaticProps<HomeIndexProps> = async () => {
    // todo get contents from database
    const hostCode = process.env.HOST_CODE ?? "";
    const {turnipClient, options} = await createServerSideClient();
    const response = await turnipClient.getContentsByTagStrict({
        tagList: [hostCode, "home"]
    }, options).response;

    // todo response.itemList: Content -> GameProjectProp
    const gameRawList: Content[] = [];
    const pageMeta: PageMetaProps = {
        about: "",
        header: "",
        social: ""
    };
    for (const content of response.itemList) {
        if (content.tagList.includes("game")) {
            gameRawList.push(content);
        } else if (content.title === `${hostCode} home`) {
            pageMeta.about = content.meta['about'] ?? "";
            pageMeta.header = content.meta['header'] ?? "";
            pageMeta.social = content.meta['social'] ?? "";
        }
    }

    const gameShowCase = fromContentListToGameProjectList(gameRawList);

    return {
        props: {
            gameProjectList: gameShowCase,
            pageMeta: pageMeta,
        },
    };
};
