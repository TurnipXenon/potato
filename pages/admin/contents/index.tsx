import React, {useEffect, useState} from 'react';
import {useAppContext} from "../../../lib/util/app-context";
import {useRouter} from "next/router";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {ContentCard} from "../../../lib/components/content-card";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";

export default function Index() {
    const {profile, turnipClient, options} = useAppContext();
    const router = useRouter();
    const [contentList, setContentList] = useState<Content[]>([]);

    // re-route to login if not in the right location
    useEffect(() => {
        if (!profile) {
            void router.push("/admin/login/");
        }
    }, [profile, router])
    // get all contents only if logged in
    useEffect(() => {
        if (!profile) {
            return;
        }

        turnipClient?.getAllContent(
            {},
            options
        ).then(allContentResponse => {
            setContentList(allContentResponse.response.itemList)
        }).catch(err => {
            console.log(err);
        })
    }, [turnipClient, profile, options])

    const createContentListUi = (contentList: Content[]) => {
        return contentList.map((content) => {
            return ContentCard({content, router})
        })
    }

    if (!profile) {
        return <></>
    }


    return (
        <>
            <Head>
                <title>Contents - Admin</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <form className={styles.center} style={{["display"]: "flex", ["flexDirection"]: "column"}}>
                    <h1>Contents</h1>
                </form>
                {createContentListUi(contentList)}
                {/*todo: add bottom padding here*/}
            </main>
        </>
    );
}
