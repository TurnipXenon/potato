import Head from "next/head";
import styles from "../../../pages/HomeIndex.module.css";
import Image from "next/image";
import backgroundImage from "../../../public/background-image.jpg";
import {CustomMarkdown} from "../custom-markdown";
import ReactMarkdown from "react-markdown";
import {HomeProjectCard} from "../home-project-card";
import React from "react";
import {HomeIndexProps} from "../../../pages";

export const OriginalHome = (props: HomeIndexProps) => {
    const projectList = props.gameProjectList;

    return (<>
            <Head>
                <title>turnipxenon</title> {/*todo: fix dynamic*/}
                <meta charSet="utf-8"/>
                <meta name="twitter:card" content="summary"/>
                <link rel="icon" href="/ushi.jpg"/>
                {/*todo: fix dynamic*/}
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
                                <CustomMarkdown>{props.pageMeta.header}</CustomMarkdown>
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