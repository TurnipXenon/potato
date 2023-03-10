import React, {useEffect, useState} from 'react';
import {useAppContext} from "../../../lib/util/app-context";
import {useRouter} from "next/router";
import {Content} from "turnip_api/ts/rpc/turnip/service";
import {ContentCard} from "../../../lib/components/content-card";
import Head from "next/head";
import useAuthAdminRedirect from "../../../lib/util/use-auth-admin-redirect";
import {Button} from "@mui/material";

export default function ContentIndex() {
    const {profile, turnipClient, options, setContentListProp} = useAppContext();
    const router = useRouter();
    const [contentList, setContentList] = useState<Content[]>([]);

    // get all contents only if logged in
    useEffect(() => {
        if (!profile) {
            return;
        }

        turnipClient?.getAllContent(
            {},
            options
        ).then(allContentResponse => {
            setContentList(allContentResponse.response.itemList);
        }).catch(err => {
            console.log(err);
        });
    }, [turnipClient, profile, options]);

    const createContentListUi = (contentList: Content[]) => {
        return contentList.map((content) => {
            return ContentCard({content, router, setContentListProp});
        });
    };

    useAuthAdminRedirect();
    if (!profile) {
        return <></>;
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
                <h1>Contents</h1>
                <br/>
                <Button onClick={() => {
                    void router.push('/admin/contents/new');
                }}>Create new Content</Button>
                <Button onClick={() => {
                    void router.push('/admin/contents/new-game');
                }}>Create new Game content</Button>
                {createContentListUi(contentList)}
                {/*todo: add bottom padding here*/}
            </main>
        </>
    );
}
